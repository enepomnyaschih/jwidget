import * as path from "path";
import * as DictionaryUtils from "./utils/Dictionary";
import SourceFile from "./SourceFile";
import StructSymbol from "./symbols/Struct";
import Context from "./Context";
import Reference from "./models/Reference";
import Extension from "./models/Extension";
import Dictionary from "./Dictionary";
import DocError from "./DocError";

export default class Project {

	readonly files: Dictionary<SourceFile> = {};
	readonly filesByToken: Dictionary<SourceFile> = {}; // null value indicates ambiguity
	readonly name: string;
	readonly inputRelativePath: string;
	readonly outputRelativePath: string;
	readonly staticRelativePath: string;
	readonly context: Context;
	readonly includes: Dictionary<string> = {};

	constructor(readonly fileAbsolutePath: string, json: ProjectJson) {
		this.name = json.name;
		this.inputRelativePath = json.input || "doc";
		this.outputRelativePath = json.output || "docoutput";
		this.staticRelativePath = json.static || "docstatic";
		this.context = new ProjectContext(this, json.references);
		this.includes = json.includes || {};
	}

	get dirAbsolutePath() {
		return path.dirname(this.fileAbsolutePath);
	}

	get inputAbsolutePath() {
		return path.resolve(this.dirAbsolutePath, this.inputRelativePath);
	}

	get outputAbsolutePath() {
		return path.resolve(this.dirAbsolutePath, this.outputRelativePath);
	}

	get staticAbsolutePath() {
		return path.resolve(this.dirAbsolutePath, this.staticRelativePath);
	}

	link() {
		DictionaryUtils.forEach(this.files, (file) => file.link());
	}

	inheritMembers() {
		DictionaryUtils.forEach(this.files, (file) => file.inheritMembers());
	}

	getStruct(fileId: string, symbol: string = "default"): StructSymbol {
		const file = this.files[fileId];
		if (!file) {
			throw new DocError(`Invalid struct reference: File ${fileId} does not exist.`);
		}
		const struct = file.structs[symbol];
		if (!struct) {
			throw new DocError(`Invalid struct reference: Struct ${symbol} does not exist in file ${fileId}.`);
		}
		return struct;
	}

	getStructByExtension(extension: Extension): StructSymbol {
		return this.getStruct(extension.file, extension.symbol);
	}
}

export interface ProjectJson {

	readonly name?: string;
	readonly input?: string;
	readonly output?: string;
	readonly static?: string;
	readonly references?: Dictionary<Reference>;
	readonly includes?: Dictionary<string>;
}

class ProjectContext extends Context {

	constructor(readonly project: Project, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return null;
	}

	get file(): SourceFile {
		throw new DocError("Absolute references are not supported. " +
			"Please build all references relative to files, symbols or members.");
	}

	protected get name() {
		return "PROJECT";
	}

	protected getDefaultReference(key: string): Reference {
		const file = this.project.filesByToken[key];
		if (file === null) {
			throw new DocError(`${key} has multiple definitions.`);
		}
		return file ? {file: file.id} : null;
	}
}
