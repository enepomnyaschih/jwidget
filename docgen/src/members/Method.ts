import Dictionary from "../Dictionary";
import AbstractMember, {AbstractMemberJson} from "./AbstractMember";
import StructSymbol from "../symbols/Struct";
import Reference from "../models/Reference";
import Context from "../Context";
import Project from "../Project";

export default class MethodMember extends AbstractMember {

	readonly signature: string;
	readonly params: Dictionary<string>;
	readonly returns: string;
	readonly context: Context;

	constructor(struct: StructSymbol, inheritedFrom: StructSymbol, id: string, isStatic: boolean,
	            json: MethodMemberJson) {
		super(struct, inheritedFrom, id, isStatic, json);
		this.signature = json.signature;
		this.params = json.params || {};
		this.returns = json.returns;
		this.context = new MethodContext(this, json.references);
	}

	inherit(toStruct: StructSymbol): MethodMember {
		return new MethodMember(toStruct, this.inheritedFrom, this.id, this.isStatic, {
			signature: this.signature,
			params: this.params,
			returns: this.returns,
			modifiers: this.modifiers,
			description: this.description,
			references: this.references
		});
	}
}

export interface MethodMemberJson extends AbstractMemberJson {

	readonly signature?: string;
	readonly params?: Dictionary<string>;
	readonly returns?: string;
}

class MethodContext extends Context {

	constructor(readonly method: MethodMember, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.method.struct.context;
	}

	get project(): Project {
		return this.method.struct.project;
	}

	get fileId(): string {
		return this.method.file.id;
	}

	protected get name(): string {
		return this.method.id;
	}

	protected getDefaultReference(key: string): Reference {
		return (key === this.name || this.method.params.hasOwnProperty(key)) ? {} : null;
	}
}
