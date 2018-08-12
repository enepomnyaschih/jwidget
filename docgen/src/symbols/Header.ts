import AbstractSymbol from "./AbstractSymbol";
import SourceFile from "../SourceFile";
import SymbolVisitor from "../SymbolVisitor";
import Dictionary from "../Dictionary";
import Reference from "../models/Reference";
import Context from "../Context";
import Project from "../Project";

export default class HeaderSymbol extends AbstractSymbol {

	readonly header: string;
	readonly description: string;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: HeaderJson) {
		super(file, id);
		this.header = json.header;
		this.description = json.description;
		this.context = new HeaderContext(this, json.references);

		file.currentGroupId = id;
		file.groupTitles[id] = this.header;
	}

	visit<U>(visitor: SymbolVisitor<U>): U {
		return visitor.visitHeader(this);
	}
}

export interface HeaderJson {

	readonly header: string;
	readonly description?: string;
	readonly references?: Dictionary<Reference>;
}

class HeaderContext extends Context {

	constructor(readonly symbol: HeaderSymbol, references: Dictionary<Reference>) {
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
