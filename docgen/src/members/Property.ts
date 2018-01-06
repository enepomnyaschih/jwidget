import Dictionary from "../Dictionary";
import AbstractMember, {AbstractMemberJson} from "./AbstractMember";
import StructSymbol from "../symbols/Struct";
import Reference from "../models/Reference";
import Context from "../Context";
import SourceFile from "../SourceFile";
import {renderText} from "../utils/Doc";
import {htmlEncode} from "../utils/String";

export default class PropertyMember extends AbstractMember {

	readonly type: string;
	readonly context: Context;

	constructor(struct: StructSymbol, id: string, json: PropertyMemberJson) {
		super(struct, id, json);
		this.type = htmlEncode(json.type);
		this.context = new MethodContext(this, json.references);
	}

	render() {
		return `
<li>
<h5>${this.id}</h5>
<pre>${this.modifiers ? this.modifiers + " " : ""}${this.static ? "static " : ""}${this.id}: ${renderText(this.context, this.type)}</pre>
${renderText(this.context, this.description)}
</li>`;
	}
}

export interface PropertyMemberJson extends AbstractMemberJson {

	readonly type?: string;
	readonly references?: Dictionary<Reference>
}

class MethodContext extends Context {

	constructor(readonly method: PropertyMember, references: Dictionary<Reference>) {
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
		return (key === this.name) ? {} : null;
	}
}
