import StructSymbol from "./symbols/Struct";
import Dictionary from "./Dictionary";
import Context from "./Context";
import {htmlEncode} from "./utils/String";
import Reference from "./models/Reference";
import Project from "./Project";

export default class Constructor {

	readonly struct: StructSymbol;
	readonly signature: string;
	readonly params: Dictionary<string>;
	readonly description: string;
	readonly context: Context;

	constructor(struct: StructSymbol, json: ConstructorJson) {
		this.struct = struct;
		this.signature = htmlEncode(json.signature);
		this.params = json.params || {};
		this.description = json.description;
		this.context = new ConstructorContext(this, json.references);
	}
}

export interface ConstructorJson {

	readonly signature: string;
	readonly params?: Dictionary<string>;
	readonly description?: string;
	readonly references?: Dictionary<Reference>
}

class ConstructorContext extends Context {

	constructor(readonly constr: Constructor, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.constr.struct.context;
	}

	get project(): Project {
		return this.constr.struct.project;
	}

	get fileId(): string {
		return this.constr.struct.file.id;
	}

	protected get name(): string {
		return "constructor";
	}

	protected getDefaultReference(key: string): Reference {
		return this.constr.params.hasOwnProperty(key) ? {} : null;
	}
}
