import Reference from "../models/Reference";
import SymbolVisitor from "../SymbolVisitor";
import SourceFile from "../SourceFile";
import Project from "../Project";

interface ISymbol {

	readonly project: Project;

	readonly file: SourceFile;

	readonly id: string;

	readonly objectName: string;

	readonly selfReference: Reference;

	visit<U>(visitor: SymbolVisitor<U>): U;
}

export default ISymbol;
