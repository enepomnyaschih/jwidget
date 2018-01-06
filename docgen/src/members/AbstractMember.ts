import StructSymbol from "../symbols/Struct";
import SourceFile from "../SourceFile";

export default abstract class AbstractMember {

	readonly modifiers: string;
	readonly description: string;

	constructor(readonly struct: StructSymbol, readonly id: string, json: AbstractMemberJson) {
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
