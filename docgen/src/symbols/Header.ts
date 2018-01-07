import AbstractSymbol from "./AbstractSymbol";
import SourceFile from "../SourceFile";
import SymbolVisitor from "../SymbolVisitor";

export default class HeaderSymbol extends AbstractSymbol {

	constructor(file: SourceFile, id: string, readonly text: string) {
		super(file, id);
		file.currentGroupId = id;
		file.groupTitles[id] = text;
	}

	visit<U>(visitor: SymbolVisitor<U>): U {
		return visitor.visitHeader(this);
	}
}
