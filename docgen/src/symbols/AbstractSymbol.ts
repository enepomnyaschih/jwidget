import ISymbol from "./ISymbol";
import SourceFile from "../SourceFile";
import Project from "../Project";
import SymbolVisitor from "../SymbolVisitor";

abstract class AbstractSymbol implements ISymbol {

	constructor(readonly file: SourceFile, readonly id: string) {
	}

	get hash(): string {
		return this.id.replace(".", "-");
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
			symbol: this.id,
			label: this.objectName
		};
	}

	abstract visit<U>(visitor: SymbolVisitor<U>): U;

	protected addToGroup() {
		this.file.groups[this.file.currentGroupId] = this.file.groups[this.file.currentGroupId] || [];
		this.file.groups[this.file.currentGroupId].push(this.id);
	}
}

export default AbstractSymbol;
