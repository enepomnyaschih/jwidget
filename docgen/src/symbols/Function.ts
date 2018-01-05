import SourceFile from "../SourceFile";
import AbstractSymbol from "./AbstractSymbol";
import {renderParams, renderText} from "../utils/Doc";
import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";

export default class FunctionSymbol extends AbstractSymbol {

	readonly signature: string;
	readonly params: Dictionary<string>;
	readonly returns: string;
	readonly description: string;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: FunctionJson) {
		super(file, id);
		this.signature = json.signature;
		this.params = json.params || {};
		this.returns = json.returns;
		this.description = json.description;
		this.context = new FunctionContext(this, json.references);
	}

	render(): string {
		return `
${this.renderId()}
<pre>${renderText(this.context, this.signature)}</pre>
${renderParams(this.context, this.params, this.returns)}
${renderText(this.context, this.description)}`;
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
