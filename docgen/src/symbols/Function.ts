import SourceFile from "../SourceFile";
import AbstractSymbol from "./AbstractSymbol";
import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";
import {htmlEncode} from "../utils/String";
import SymbolVisitor from "../SymbolVisitor";

export default class FunctionSymbol extends AbstractSymbol {

	readonly signature: string;
	readonly params: Dictionary<string>;
	readonly returns: string;
	readonly description: string;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: FunctionJson) {
		super(file, id);
		this.signature = htmlEncode(json.signature);
		this.params = json.params || {};
		this.returns = json.returns;
		this.description = json.description;
		this.context = new FunctionContext(this, json.references);
	}

	visit<U>(visitor: SymbolVisitor<U>): U {
		return visitor.visitFunction(this);
	}
}

export interface FunctionJson {

	readonly signature: string;
	readonly params?: Dictionary<string>;
	readonly returns?: string;
	readonly description?: string;
	readonly references?: Dictionary<Reference>;
}

class FunctionContext extends Context {

	constructor(readonly symbol: FunctionSymbol, references: Dictionary<Reference>) {
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
		return (key === this.name || this.symbol.params.hasOwnProperty(key)) ? {} : null;
	}
}
