import StructSymbol from "../symbols/Struct";
import SourceFile from "../SourceFile";
import IMember from "./IMember";

export default abstract class AbstractMember implements IMember {

	readonly modifiers: string;
	readonly description: string;

	constructor(readonly struct: StructSymbol, readonly id: string, readonly isStatic: boolean,
				json: AbstractMemberJson) {
		this.modifiers = json.modifiers;
		this.description = json.description;
	}

	get file(): SourceFile {
		return this.struct.file;
	}
}

export interface AbstractMemberJson {

	readonly modifiers?: string;
	readonly description?: string;
}
