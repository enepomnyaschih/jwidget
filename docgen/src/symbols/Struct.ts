import SourceFile from "../SourceFile";
import TypeVar from "../models/TypeVar";
import Extension from "../models/Extension";
import AbstractSymbol from "./AbstractSymbol";
import {repeat} from "../utils/String";
import Context from "../Context";
import ReferenceDictionary from "../models/ReferenceDictionary";
import Reference from "../models/Reference";
import {getReferenceUrl} from "../utils/Doc";

export default class StructSymbol extends AbstractSymbol {

	readonly kind: string;
	readonly typevars: TypeVar[];
	readonly extendsThe: Extension[] = [];
	readonly extendedBy: StructSymbol[] = [];
	readonly description: string;
	readonly showInheritanceLevels: number;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: StructJson) {
		super(file, id);
		this.kind = json.kind || "class";
		this.typevars = json.typevars || [];
		this.extendsThe = json.extends || [];
		this.description = json.description;
		this.showInheritanceLevels = json.showInheritanceLevels;
		this.context = new StructContext(this, json.references);

		file.structs[id] = this;
	}

	get inheritanceLevel(): number {
		return this.extendsThe.reduce<number>((result, extension) => (
			Math.max(result, this.project.getStructByExtension(extension).inheritanceLevel)
		), 0);
	}

	link() {
		this.extendsThe.forEach((extension) => {
			this.project.getStructByExtension(extension).extendedBy.push(this);
		});
	}

	render(): string {
		const cache: StructSymbol[] = [];
		return `
<h2>Hierarchy</h2>
<ul class="hierarchy">
${this.renderHierarchyHead(this.inheritanceLevel - 1, cache)}
<li>${repeat("\t", this.inheritanceLevel, "")}${this.kind} <b>${this.objectName}</b>${this.renderTypeVars()}</li>
${this.renderHierarchyTail(this.inheritanceLevel + 1, cache)}
</ul>`;
	}

	renderHierarchyHead(level: number, cache: StructSymbol[]): string {
		return this.extendsThe.map((extension) => {
			const struct = this.project.getStructByExtension(extension);
			if (cache.indexOf(struct) !== -1) {
				return "";
			}
			cache.push(struct);
			const url = getReferenceUrl(struct.context.selfReference, this.file.id);
			return `
${struct.renderHierarchyHead(level - 1, cache)}
<li>${repeat("\t", level, "")}${struct.kind} <a href="${url}">${struct.objectName}</a>${struct.renderTypeVars()}</li>`;
		}).join("");
	}

	renderHierarchyTail(level: number, cache: StructSymbol[], levelsLeft?: number): string {
		if (levelsLeft == null) {
			levelsLeft = this.showInheritanceLevels;
		} else if (this.showInheritanceLevels != null) {
			levelsLeft = Math.min(levelsLeft, this.showInheritanceLevels);
		}
		if (levelsLeft != null && levelsLeft <= 0) {
			return "";
		}
		return this.extendedBy.map((struct) => {
			if (cache.indexOf(struct) !== -1) {
				return "";
			}
			cache.push(name);
			const url = getReferenceUrl(struct.context.selfReference, this.file.id);
			return `
<li>${repeat("\t", level, "")}${struct.kind} <a href="${url}">${struct.objectName}</a>${struct.renderTypeVars()}</li>
${struct.renderHierarchyTail(level + 1, cache, levelsLeft != null ? levelsLeft - 1 : null)}`;
		}).join("");
	}

	renderTypeVars() {
		return this.typevars.length ? `<pre>&lt;${this.typevars.join(", ")}&gt;</pre>` : "";
	}
}

export interface StructJson {

	readonly kind?: string;
	readonly typevars?: TypeVar[];
	readonly extends?: Extension[];
	readonly description?: string;
	readonly showInheritanceLevels?: number;
	readonly references?: ReferenceDictionary;
}

class StructContext extends Context {

	constructor(readonly symbol: StructSymbol, references: ReferenceDictionary) {
		super(references);
	}

	get parent(): Context {
		return this.symbol.file.context;
	}

	get selfReference(): Reference {
		return {
			file: this.symbol.file.id,
			symbol: this.symbol.id
		};
	}

	protected get name(): string {
		return this.symbol.id;
	}

	protected getDefaultReference(key: string): Reference {
		const typevar = this.symbol.typevars.find((typevar) => typevar.name === key);
		if (typevar) {
			return {
				...this.selfReference,
				member: typevar.name
			};
		}
		return null;
	}
}
