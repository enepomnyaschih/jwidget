import SourceFile from "../SourceFile";
import Extension from "../models/Extension";
import AbstractSymbol from "./AbstractSymbol";
import {repeat} from "../utils/String";
import Context from "../Context";
import Reference from "../models/Reference";
import {getReferenceUrl, renderDefinitions, renderParams, renderText} from "../utils/Doc";
import Dictionary from "../Dictionary";
import * as DictionaryUtils from "../utils/Dictionary";

export default class StructSymbol extends AbstractSymbol {

	readonly kind: string;
	readonly typevars: Dictionary<string>;
	private _extendsThe: Extension[] = [];
	readonly extendedBy: StructSymbol[] = [];
	readonly description: string;
	readonly showInheritanceLevels: number;
	readonly methods: Dictionary<IMethod> = {};
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: StructJson) {
		super(file, id);
		this.kind = json.kind || "class";
		this.typevars = json.typevars || {};
		this._extendsThe = json.extends || [];
		this.description = json.description;
		this.showInheritanceLevels = json.showInheritanceLevels;
		this.methods = json.methods || {};
		this.context = new StructContext(this, json.references);

		file.structs[id] = this;
	}

	get inheritanceLevel(): number {
		return this._extendsThe.reduce<number>((result, extension) => (
			Math.max(result, this.project.getStructByExtension(extension).inheritanceLevel)
		), 0);
	}

	link() {
		this._extendsThe = this._extendsThe.filter((extension) => {
			try {
				this.project.getStructByExtension(extension).extendedBy.push(this);
				return true;
			} catch (error) {
				console.warn(`Unable to extend [${this.file.id} -> ${this.id}] from ` +
					`[${extension.file} -> ${extension.symbol || "default"}]: ${error.message}`);
				return false;
			}
		});
	}

	render(): string {
		const cache: StructSymbol[] = [];
		return `
${this.renderId()}
<h4>Hierarchy</h4>
<ul class="hierarchy">
${this.renderHierarchyHead(this.inheritanceLevel - 1, cache)}
<li>${repeat("\t", this.inheritanceLevel, "")}${this.kind} <b>${this.objectName}</b>${this.renderTypeVars()}</li>
${this.renderHierarchyTail(this.inheritanceLevel + 1, cache)}
</ul>
<h4>Description</h4>
${renderDefinitions(this.context, this.typevars)}
${renderText(this.context, this.description)}
${this.renderMethods()}`;
	}

	renderHierarchyHead(level: number, cache: StructSymbol[]): string {
		return this._extendsThe.map((extension) => {
			const struct = this.project.getStructByExtension(extension);
			if (cache.indexOf(struct) !== -1) {
				return "";
			}
			cache.push(struct);
			const url = getReferenceUrl(struct.selfReference, this.file.id);
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
			const url = getReferenceUrl(struct.selfReference, this.file.id);
			return `
<li>${repeat("\t", level, "")}${struct.kind} <a href="${url}">${struct.objectName}</a>${struct.renderTypeVars()}</li>
${struct.renderHierarchyTail(level + 1, cache, levelsLeft != null ? levelsLeft - 1 : null)}`;
		}).join("");
	}

	renderTypeVars() {
		if (DictionaryUtils.isEmpty(this.typevars)) {
			return "";
		}
		return `<span class="monospace">&lt;${Object.keys(this.typevars).join(", ")}&gt;</span>`;
	}

	renderMethods() {
		if (DictionaryUtils.isEmpty(this.methods)) {
			return "";
		}
		const dict = DictionaryUtils.map(this.methods, (method, name) => this.renderMethod(method, name));
		return `
<h4>Methods</h4>
<ul>
${DictionaryUtils.join(dict, "\n")}
</ul>`
	}

	renderMethod(method: IMethod, name: string) {
		return `
<h5>${name}</h5>
<pre>${method.modifier} ${renderText(this.context, method.signature)}</pre>
${renderParams(this.context, method.params, method.returns)}
${renderText(this.context, method.description)}`;
	}
}

export interface StructJson {

	readonly kind?: string;
	readonly typevars?: Dictionary<string>;
	readonly extends?: Extension[];
	readonly description?: string;
	readonly showInheritanceLevels?: number;
	readonly methods?: Dictionary<IMethod>;
	readonly references?: Dictionary<Reference>;
}

export interface IMember {

	readonly modifier?: string;
	readonly description?: string;
	readonly static?: boolean;
}

export interface IMethod extends IMember {

	readonly signature?: string;
	readonly params?: Dictionary<string>;
	readonly returns?: string;
}

class StructContext extends Context {

	constructor(readonly symbol: StructSymbol, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.symbol.file.context;
	}

	get file(): SourceFile {
		return this.symbol.file;
	}

	protected get name(): string {
		return this.symbol.id;
	}

	protected getDefaultReference(key: string): Reference {
		if (key === this.name) {
			return {};
		}
		if (this.symbol.typevars.hasOwnProperty(key)) {
			return {
				...this.symbol.selfReference,
				member: key
			};
		}
		const member = this.symbol.methods[key];
		if (member) {
			return {
				...this.symbol.selfReference,
				member: member.static ? (key + "-static") : key
			};
		}
		return null;
	}
}
