import Reference from "../models/Reference";
import SymbolVisitor from "../SymbolVisitor";
import SourceFile from "../SourceFile";
import Project from "../Project";
import Context from "../Context";

interface ISymbol {

	readonly project: Project;

	readonly file: SourceFile;

	readonly id: string;

	readonly objectName: string;

	readonly selfReference: Reference;

	readonly context: Context;

	visit<U>(visitor: SymbolVisitor<U>): U;
}

export default ISymbol;
