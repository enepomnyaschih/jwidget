import SourceFile from "../SourceFile";
import AbstractSymbol from "./AbstractSymbol";
import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";
import {htmlEncode} from "../utils/String";
import SymbolVisitor from "../SymbolVisitor";
import Topic, {TopicJson} from "../Topic";
import * as DictionaryUtils from "../utils/Dictionary";
import Project from "../Project";

export default class FunctionSymbol extends AbstractSymbol {

	readonly signature: string;
	readonly params: Dictionary<string>;
	readonly returns: string;
	readonly description: string;
	readonly topics: Dictionary<Topic>;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: FunctionJson) {
		super(file, id);
		this.signature = htmlEncode(json.signature);
		this.params = json.params || {};
		this.returns = json.returns;
		this.description = json.description;
		this.topics = DictionaryUtils.map(json.topics || {}, (json, id) => new Topic(id, this, json));
		this.context = new FunctionContext(this, json.references);
		this.addToGroup();
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
	readonly topics?: Dictionary<TopicJson>;
	readonly references?: Dictionary<Reference>;
}

class FunctionContext extends Context {

	constructor(readonly symbol: FunctionSymbol, references: Dictionary<Reference>) {
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
		return (key === this.name || this.symbol.params.hasOwnProperty(key)) ? {} : null;
	}
}
