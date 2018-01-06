import ISymbol from "./ISymbol";
import SourceFile from "../SourceFile";
import Project from "../Project";
import SymbolVisitor from "../SymbolVisitor";

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

	abstract visit<U>(visitor: SymbolVisitor<U>): U;
}

export default AbstractSymbol;
