import ISymbol from "./ISymbol";
import SourceFile from "../SourceFile";
import Project from "../Project";
import Context from "../Context";

abstract class AbstractSymbol implements ISymbol {

	constructor(readonly file: SourceFile, readonly id: string) {
	}

	get project(): Project {
		return this.file.project;
	}

	get objectName() {
		return this.id === "default" ? this.file.token : this.id;
	}

	abstract readonly context: Context;

	abstract render(): string;
}

export default AbstractSymbol;
