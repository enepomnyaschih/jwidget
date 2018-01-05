import ISymbol from "./ISymbol";
import SourceFile from "../SourceFile";
import Project from "../Project";

abstract class AbstractSymbol implements ISymbol {

	constructor(readonly file: SourceFile, readonly id: string) {
		if (file.currentGroupId) {
			file.groups[file.currentGroupId].push(id);
		}
	}

	get project(): Project {
		return this.file.project;
	}

	get objectName() {
		return this.id === "default" ? this.file.token : this.id;
	}

	get selfReference() {
		return {
			file: this.file.id,
			symbol: this.id
		};
	}

	abstract render(): string;

	protected renderId() {
		return `<h3>${this.id === "default" ? "Default export" : this.id}</h3>`;
	}
}

export default AbstractSymbol;
