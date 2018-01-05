import * as fs from "fs";
import ISymbol from "./symbols/ISymbol";
import Project from "./Project";
import {mkdir} from "./utils/File";
import StructSymbol from "./symbols/Struct";
import Context from "./Context";
import Reference from "./models/Reference";
import Dictionary from "./Dictionary";

export default class SourceFile {

	readonly context: Context;
	readonly symbols: { [id: string]: ISymbol } = {};
	readonly structs: { [id: string]: StructSymbol } = {};
	readonly tokens: string[];

	constructor(readonly project: Project, readonly id: string, references: Dictionary<Reference>) {
		this.context = new SourceFileContext(this, references);
		this.tokens = this.id.split('/');
	}

	get url() {
		return `${this.id}.html`;
	}

	get token() {
		return this.tokens[this.tokens.length - 1];
	}

	link() {
		for (let id in this.structs) {
			if (this.structs.hasOwnProperty(id)) {
				this.structs[id].link();
			}
		}
	}

	write(path: string) {
		console.log(`Writing ${this.id}...`);
		mkdir(path);
		fs.writeFileSync(path, this.render());
	}

	private get index() {
		return this.tokens.map(() => '..').join('/');
	}

	private get consumption() {
		if (!this.symbols.default) {
			return `import * as ${this.token} from "${this.id}";`;
		}
		const imports = Object.keys(this.symbols).map((key) => key === 'default' ? this.token : `{${key}}`).join(', ');
		return `import ${imports} from "${this.id}";`;
	}

	private render() {
		return `<!DOCTYPE html>
<html>
	<head>
		<title>${this.id} - jWidget</title>
	</head>
	<body>
		<a href="${this.index}">Back to index</a>
		<h1>${this.id}</h1>
		<h2>Consumption</h2>
		<pre>${this.consumption}</pre>
		${this.renderSymbols()}
	</body>
</html>`;
	}

	private renderSymbols() {
		let buffer = "";
		for (let key in this.symbols) {
			if (this.symbols.hasOwnProperty(key)) {
				if (key !== "default") {
					buffer += `\n<h1>${key}</h1>`;
				}
				buffer += this.symbols[key].render();
			}
		}
		return buffer;
	}
}

class SourceFileContext extends Context {

	constructor(readonly sourceFile: SourceFile, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.sourceFile.project.context;
	}

	get selfReference(): Reference {
		return {
			file: this.sourceFile.id
		};
	}

	protected get name(): string {
		return this.sourceFile.id;
	}

	protected getDefaultReference(key: string): Reference {
		const symbol = this.sourceFile.symbols[key];
		return symbol ? symbol.context.selfReference : null;
	}
}
