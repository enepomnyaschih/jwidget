import * as DictionaryUtils from "./utils/Dictionary";
import ISymbol from "./symbols/ISymbol";
import Project from "./Project";
import StructSymbol from "./symbols/Struct";
import Context from "./Context";
import Reference from "./models/Reference";
import Dictionary from "./Dictionary";
import parseSymbol from "./parseSymbol";

export default class SourceFile {

	readonly description: string;
	readonly symbols: Dictionary<ISymbol>;
	readonly groupTitles: Dictionary<string> = {};
	readonly groups: Dictionary<string[]> = {};
	readonly structs: Dictionary<StructSymbol> = {};
	readonly tokens: string[];
	readonly context: Context;

	currentGroupId: string = "";

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
