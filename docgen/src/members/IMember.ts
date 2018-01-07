import StructSymbol from "../symbols/Struct";
import SourceFile from "../SourceFile";

export default interface IMember {

	readonly struct: StructSymbol;
	readonly file: SourceFile;
	readonly id: string;
	readonly modifiers: string;
	readonly description: string;
}
