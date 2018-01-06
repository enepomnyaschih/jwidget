import StructSymbol from "./symbols/Struct";
import Dictionary from "./Dictionary";
import Context from "./Context";
import {htmlEncode} from "./utils/String";
import {renderDefinitions, renderText} from "./utils/Doc";
import Reference from "./models/Reference";
import SourceFile from "./SourceFile";

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

	render() {
		return `
<h4>Constructor</h4>
<pre>new ${this.struct.objectName}${this.struct.renderTypeVars()}${renderText(this.context, this.signature)}</pre>
${renderDefinitions(this.context, this.params)}
${renderText(this.context, this.description)}`;
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

	get file(): SourceFile {
		return this.constr.struct.file;
	}

	protected get name(): string {
		return "constructor";
	}

	protected getDefaultReference(key: string): Reference {
		return this.constr.params.hasOwnProperty(key) ? {} : null;
	}
}