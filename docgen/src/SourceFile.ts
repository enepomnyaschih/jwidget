import * as fs from "fs";
import * as DictionaryUtils from "./utils/Dictionary";
import ISymbol from "./symbols/ISymbol";
import Project from "./Project";
import {mkdir} from "./utils/File";
import StructSymbol from "./symbols/Struct";
import Context from "./Context";
import Reference from "./models/Reference";
import Dictionary from "./Dictionary";
import parseSymbol from "./parseSymbol";
import {renderText} from "./utils/Doc";

export default class SourceFile {

	readonly description: string;
	readonly symbols: Dictionary<ISymbol>;
	readonly groups: Dictionary<string[]> = {};
	readonly structs: Dictionary<StructSymbol> = {};
	readonly tokens: string[];
	readonly context: Context;

	currentGroupId: string;

	constructor(readonly project: Project, readonly id: string, json: SourceFileJson) {
		this.description = json.description;
		this.tokens = this.id.split('/');
		this.context = new SourceFileContext(this, json.references);
		this.symbols = DictionaryUtils.map(json.symbols, (symbolJson, key) => parseSymbol(this, key, symbolJson)) || {};
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
		${renderText(this.context, this.description)}
		<h3>Consumption</h3>
		<pre>${this.consumption}</pre>
		${this.renderSymbols()}
	</body>
</html>`;
	}

	private renderSymbols() {
		let buffer = "";
		for (let key in this.symbols) {
			if (this.symbols.hasOwnProperty(key)) {
				buffer += this.symbols[key].render();
			}
		}
		return buffer;
	}
}

export interface SourceFileJson {

	readonly description?: string;
	readonly symbols?: any;
	readonly references?: Dictionary<Reference>;
}

class SourceFileContext extends Context {

	constructor(readonly sourceFile: SourceFile, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.sourceFile.project.context;
	}

	get file(): SourceFile {
		return this.sourceFile;
	}

	protected get name(): string {
		return this.sourceFile.id;
	}

	protected getDefaultReference(key: string): Reference {
		if (key === this.sourceFile.token) {
			return {};
		}
		const symbol = this.sourceFile.symbols[key];
		return symbol ? symbol.selfReference : null;
	}
}
