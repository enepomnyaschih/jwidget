import * as path from "path";
import Context from "./Context";
import Dictionary from "./Dictionary";
import DocError from "./DocError";
import Extension from "./models/Extension";
import Reference from "./models/Reference";
import SourceFile from "./SourceFile";
import StructSymbol from "./symbols/Struct";
import * as DictionaryUtils from "./utils/Dictionary";

export default class Project {

	readonly files: Dictionary<SourceFile> = {};
	readonly filesByToken: Dictionary<SourceFile> = {}; // null value indicates ambiguity
	readonly name: string;
	readonly inputRelativePath: string;
	readonly outputRelativePath: string;
	readonly statics: StaticDefinition[];
	readonly context: Context;
	readonly includes: Dictionary<string> = {};

	constructor(readonly fileAbsolutePath: string, json: ProjectJson) {
		this.name = json.name;
		this.inputRelativePath = json.input || "doc";
		this.outputRelativePath = json.output || "docoutput";
		this.statics = json.statics || [];
		this.context = new ProjectContext(this, json.references);
		this.includes = json.includes || {};
	}

	get dirAbsolutePath() {
		return path.dirname(this.fileAbsolutePath);
	}

	get inputAbsolutePath() {
		return this.getAbsolutePath(this.inputRelativePath);
	}

	get outputAbsolutePath() {
		return this.getAbsolutePath(this.outputRelativePath);
	}

	getAbsolutePath(relativePath: string) {
		return path.resolve(this.dirAbsolutePath, relativePath);
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
	readonly statics?: StaticDefinition[];
	readonly references?: Dictionary<Reference>;
	readonly includes?: Dictionary<string>;
}

export interface StaticDefinition {

	readonly src: string;
	readonly dest: string;
}

class ProjectContext extends Context {

	constructor(readonly project: Project, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return null;
	}

	get fileId(): string {
		return "index";
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
