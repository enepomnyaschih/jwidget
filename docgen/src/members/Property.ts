import Dictionary from "../Dictionary";
import AbstractMember, {AbstractMemberJson} from "./AbstractMember";
import StructSymbol from "../symbols/Struct";
import Reference from "../models/Reference";
import Context from "../Context";
import Project from "../Project";

export default class PropertyMember extends AbstractMember {

	readonly type: string;
	readonly optional: boolean;
	readonly context: Context;

	constructor(struct: StructSymbol, inheritedFrom: StructSymbol, id: string, isStatic: boolean,
	            json: PropertyMemberJson) {
		super(struct, inheritedFrom, id, isStatic, json);
		this.type = json.type;
		this.optional = json.optional;
		this.context = new MethodContext(this, json.references);
	}

	inherit(toStruct: StructSymbol): PropertyMember {
		return new PropertyMember(toStruct, this.inheritedFrom, this.id, this.isStatic, {
			type: this.type,
			optional: this.optional,
			modifiers: this.modifiers,
			description: this.description,
			references: this.references
		});
	}
}

export interface PropertyMemberJson extends AbstractMemberJson {

	readonly type?: string;
	readonly optional?: boolean;
}

class MethodContext extends Context {

	constructor(readonly method: PropertyMember, references: Dictionary<Reference>) {
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
		return (key === this.name) ? {} : null;
	}
}
