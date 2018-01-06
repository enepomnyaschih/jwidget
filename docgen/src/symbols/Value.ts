import SourceFile from "../SourceFile";
import AbstractSymbol from "./AbstractSymbol";
import {renderText} from "../utils/Doc";
import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";
import {htmlEncode} from "../utils/String";

export default class ValueSymbol extends AbstractSymbol {

	readonly type: string;
	readonly description: string;
	readonly context: Context;

	constructor(file: SourceFile, id: string, json: ValueJson) {
		super(file, id);
		this.type = htmlEncode(json.type);
		this.description = json.description;
		this.context = new ValueContext(this, json.references);
	}

	render(): string {
		return `
${this.renderId()}
<pre>${this.objectName}: ${renderText(this.context, this.type)}</pre>
${renderText(this.context, this.description)}`;
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

	get file(): SourceFile {
		return this.symbol.file;
	}

	protected get name(): string {
		return this.symbol.id;
	}

	protected getDefaultReference(key: string): Reference {
		return (key === this.name) ? {} : null;
	}
}