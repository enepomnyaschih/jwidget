import DocObject from "./DocObject";
import SourceFile from "../SourceFile";
import Project from "../Project";

export default class FunctionObject implements DocObject {

	readonly signature: string;
	readonly params: { [key: string]: string };
	readonly returns: string;
	readonly description: string;
	readonly references: { [key: string]: Reference };

	constructor(readonly file: SourceFile, readonly key: string, json: any) {
		this.signature = json.signature.trim();
		this.params = json.params;
		this.returns = json.returns;
		this.description = json.description.trim();
		this.references = json.references;
	}

	get project(): Project {
		return this.file.project;
	}

	render(): string {
		return `
<h2>Signature</h2>
<pre>${this.project.renderText(this.signature, this.references)}</pre>
<dl>${this.renderParams()}</dl>
${this.project.renderText(this.description, this.references)}`;
	}

	private renderParams() {
		let buffer = '';
		for (let key in this.params) {
			if (this.params.hasOwnProperty(key)) {
				buffer += `\n<dt>${key}</dt><dd>${this.params[key]}</dd>`;
			}
		}
		buffer += `\n<dt>Returns</dt><dd>${this.returns}</dd>\n`;
		return buffer;
	}
}
