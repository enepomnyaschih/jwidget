import StructSymbol from "../symbols/Struct";
import SourceFile from "../SourceFile";
import Context from "../Context";

export default interface IMember {

	readonly struct: StructSymbol;
	readonly inheritedFrom: StructSymbol;
	readonly file: SourceFile;
	readonly id: string;
	readonly hash: string;
	readonly isInherited: boolean;
	readonly isStatic: boolean;
	readonly modifiers: string;
	readonly description: string;
	readonly context: Context;

	inherit(struct: StructSymbol): IMember;
}
