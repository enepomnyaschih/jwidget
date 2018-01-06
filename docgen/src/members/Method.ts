import Dictionary from "../Dictionary";
import AbstractMember, {AbstractMemberJson} from "./AbstractMember";
import StructSymbol from "../symbols/Struct";
import Reference from "../models/Reference";
import Context from "../Context";
import SourceFile from "../SourceFile";
import {renderParams, renderText} from "../utils/Doc";
import {htmlEncode} from "../utils/String";

export default class MethodMember extends AbstractMember {

	readonly signature: string;
	readonly params: Dictionary<string>;
	readonly returns: string;
	readonly context: Context;

	constructor(struct: StructSymbol, id: string, json: MethodMemberJson) {
		super(struct, id, json);
		this.signature = htmlEncode(json.signature);
		this.params = json.params || {};
		this.returns = json.returns;
		this.context = new MethodContext(this, json.references);
	}

	render() {
		return `
<li>
<h5>${this.id}</h5>
<pre>${this.modifiers ? this.modifiers + " " : ""}${this.static ? "static " : ""}${renderText(this.context, this.signature)}</pre>
${renderParams(this.context, this.params, this.returns)}
${renderText(this.context, this.description)}
</li>`;
	}
}

export interface MethodMemberJson extends AbstractMemberJson {

	readonly signature?: string;
	readonly params?: Dictionary<string>;
	readonly returns?: string;
	readonly references?: Dictionary<Reference>
}

class MethodContext extends Context {

	constructor(readonly method: MethodMember, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.method.struct.context;
	}

	get file(): SourceFile {
		return this.method.file;
	}

	protected get name(): string {
		return this.method.id;
	}

	protected getDefaultReference(key: string): Reference {
		return (key === this.name || this.method.params.hasOwnProperty(key)) ? {} : null;
	}
}
