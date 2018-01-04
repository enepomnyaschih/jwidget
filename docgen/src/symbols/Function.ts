import SourceFile from "../SourceFile";
import AbstractSymbol from "./AbstractSymbol";
import {renderText} from "../utils/Doc";
import Context from "../Context";
import ReferenceDictionary from "../models/ReferenceDictionary";
import Reference from "../models/Reference";

export default class FunctionSymbol extends AbstractSymbol {

	readonly signature: string;
	readonly params: { [key: string]: string };
	readonly returns: string;
	readonly description: string;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: FunctionJson) {
		super(file, id);
		this.signature = json.signature.trim();
		this.params = json.params || {};
		this.returns = json.returns;
		this.description = json.description.trim();
		this.context = new FunctionContext(this, json.references);
	}

	render(): string {
		return `
<h2>Signature</h2>
<pre>${renderText(this.context, this.signature)}</pre>
<dl>${this.renderParams()}</dl>
${renderText(this.context, this.description)}`;
	}

	private renderParams() {
		let buffer = '';
		for (let key in this.params) {
			if (this.params.hasOwnProperty(key)) {
				buffer += `\n<dt>${key}</dt><dd>${this.params[key]}</dd>`;
			}
		}
		buffer += `\n<dt>returns</dt><dd>${this.returns}</dd>\n`;
		return buffer;
	}
}

export interface FunctionJson {

	readonly signature: string;
	readonly params?: { [key: string]: string };
	readonly returns?: string;
	readonly description?: string;
	readonly references?: ReferenceDictionary;
}

class FunctionContext extends Context {

	constructor(readonly symbol: FunctionSymbol, references: ReferenceDictionary) {
		super(references);
	}

	get parent(): Context {
		return this.symbol.file.context;
	}

	get selfReference(): Reference {
		return {
			file: this.symbol.file.id,
			symbol: this.symbol.id
		};
	}

	protected get name(): string {
		return this.symbol.id;
	}

	protected getDefaultReference(): Reference {
		return null;
	}
}
