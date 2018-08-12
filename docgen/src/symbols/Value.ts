import SourceFile from "../SourceFile";
import AbstractSymbol from "./AbstractSymbol";
import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";
import {htmlEncode} from "../utils/String";
import SymbolVisitor from "../SymbolVisitor";
import Project from "../Project";

export default class ValueSymbol extends AbstractSymbol {

	readonly type: string;
	readonly description: string;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: ValueJson) {
		super(file, id);
		this.type = htmlEncode(json.type);
		this.description = json.description;
		this.context = new ValueContext(this, json.references);
		this.addToGroup();
	}

	visit<U>(visitor: SymbolVisitor<U>): U {
		return visitor.visitValue(this);
	}
}

export interface ValueJson {

	readonly type: string;
	readonly description?: string;
	readonly references?: Dictionary<Reference>;
}

class ValueContext extends Context {

	constructor(readonly symbol: ValueSymbol, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.symbol.file.context;
	}

	get project(): Project {
		return this.symbol.project;
	}

	get fileId(): string {
		return this.symbol.file.id;
	}

	protected get name(): string {
		return this.symbol.id;
	}

	protected getDefaultReference(key: string): Reference {
		return (key === this.name) ? {} : null;
	}
}
