import * as path from "path";
import SourceFile from "./SourceFile";
import StructSymbol from "./symbols/Struct";
import Context from "./Context";
import Reference from "./models/Reference";
import ReferenceDictionary from "./models/ReferenceDictionary";
import Extension from "./models/Extension";

export default class Project {

	readonly context: Context;
	readonly files: { [id: string]: SourceFile } = {};
	readonly filesByToken: { [token: string]: SourceFile } = {}; // null value indicates ambiguity

	constructor(readonly fileAbsolutePath: string, readonly outputRelativePath: string, references: ReferenceDictionary) {
		this.context = new ProjectContext(this, references);
	}

	get dirAbsolutePath() {
		return path.resolve(path.dirname(this.fileAbsolutePath), "doc");
	}

	link() {
		for (let id in this.files) {
			if (this.files.hasOwnProperty(id)) {
				this.files[id].link();
			}
		}
	}

	getStruct(fileId: string, symbol: string = "default"): StructSymbol {
		const file = this.files[fileId];
		if (!file) {
			throw new Error(`Invalid struct reference: File ${fileId} does not exist.`);
		}
		const struct = file.structs[symbol];
		if (!struct) {
			throw new Error(`Invalid struct reference: Struct ${symbol} does not exist in file ${fileId}.`);
		}
		return struct;
	}

	getStructByExtension(extension: Extension): StructSymbol {
		return this.getStruct(extension.file, extension.symbol);
	}
}

class ProjectContext extends Context {

	constructor(readonly project: Project, references: ReferenceDictionary) {
		super(references);
	}

	get parent(): Context {
		return null;
	}

	get selfReference(): Reference {
		throw new Error("Absolute references are not supported. " +
			"Please build all references relative to files, symbols or members.");
	}

	protected get name() {
		return "PROJECT";
	}

	protected getDefaultReference(key: string): Reference {
		const file = this.project.filesByToken[key];
		if (file === null) {
			throw new Error(`${key} has multiple definitions.`);
		}
		return file ? {file: file.id} : null;
	}
}
