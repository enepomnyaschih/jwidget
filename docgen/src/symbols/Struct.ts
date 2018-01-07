import SourceFile from "../SourceFile";
import Extension from "../models/Extension";
import AbstractSymbol from "./AbstractSymbol";
import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";
import * as DictionaryUtils from "../utils/Dictionary";
import MethodMember, {MethodMemberJson} from "../members/Method";
import DocError from "../DocError";
import PropertyMember, {PropertyMemberJson} from "../members/Property";
import {ConstructorJson, default as Constructor} from "../Constructor";
import SymbolVisitor from "../SymbolVisitor";

export default class StructSymbol extends AbstractSymbol {

	readonly kind: string;
	readonly typevars: Dictionary<string>;
	private _extending: Extension[] = [];
	readonly extendedBy: StructSymbol[] = [];
	readonly description: string;
	readonly showInheritanceLevels: number;
	readonly _constructor: Constructor;
	readonly properties: Dictionary<PropertyMember>;
	readonly methods: Dictionary<MethodMember>;
	readonly staticProperties: Dictionary<PropertyMember>;
	readonly staticMethods: Dictionary<MethodMember>;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: StructJson) {
		super(file, id);
		this.kind = json.kind || "class";
		this.typevars = json.typevars || {};
		this._extending = json.extends || [];
		this.description = json.description;
		this.showInheritanceLevels = json.showInheritanceLevels;
		this._constructor = json.hasOwnProperty("constructor") ? new Constructor(this, json.constructor) : null;
		this.properties = this.readProperties(json.properties);
		this.methods = this.readMethods(json.methods);
		this.staticProperties = this.readProperties(json.staticProperties);
		this.staticMethods = this.readMethods(json.staticMethods);
		this.context = new StructContext(this, json.references);

		file.structs[id] = this;
		this.addToGroup();
	}

	get extending(): Extension[] {
		return this._extending;
	}

	private readProperties(json: Dictionary<PropertyMemberJson>) {
		return DictionaryUtils.map(json || {}, (propertyJson, id) => new PropertyMember(this, id, propertyJson));
	}

	private readMethods(json: Dictionary<MethodMemberJson>) {
		return DictionaryUtils.map(json || {}, (methodJson, id) => new MethodMember(this, id, methodJson));
	}

	get inheritanceLevel(): number {
		return this._extending.reduce<number>((result, extension) => (
			Math.max(result, this.project.getStructByExtension(extension).inheritanceLevel + 1)
		), 0);
	}

	link() {
		this._extending = this._extending.filter((extension) => {
			try {
				this.project.getStructByExtension(extension).extendedBy.push(this);
				return true;
			} catch (error) {
				if (error instanceof DocError) {
					console.warn(`Unable to extend [${this.file.id} -> ${this.id}] from ` +
						`[${extension.file} -> ${extension.symbol || "default"}]: ${error.message}`);
					return false;
				} else {
					throw error;
				}
			}
		});
	}

	visit<U>(visitor: SymbolVisitor<U>): U {
		return visitor.visitStruct(this);
	}
}

export interface StructJson {

	readonly kind?: string;
	readonly typevars?: Dictionary<string>;
	readonly extends?: Extension[];
	readonly description?: string;
	readonly showInheritanceLevels?: number;
	readonly constructor?: ConstructorJson;
	readonly properties?: Dictionary<PropertyMemberJson>;
	readonly methods?: Dictionary<MethodMemberJson>;
	readonly staticProperties?: Dictionary<PropertyMemberJson>;
	readonly staticMethods?: Dictionary<MethodMemberJson>;
	readonly references?: Dictionary<Reference>;
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
		if (this.symbol.typevars.hasOwnProperty(key) ||
			this.symbol.properties.hasOwnProperty(key) ||
			this.symbol.methods.hasOwnProperty(key)) {
			return {
				...this.symbol.selfReference,
				member: key
			};
		}
		if (this.symbol.staticProperties.hasOwnProperty(key) ||
			this.symbol.staticMethods.hasOwnProperty(key)) {
			return {
				...this.symbol.selfReference,
				member: `${key}-static`
			};
		}
		return null;
	}
}
