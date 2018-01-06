import StructSymbol from "../symbols/Struct";
import SourceFile from "../SourceFile";

export default abstract class AbstractMember {

	readonly modifiers: string;
	readonly description: string;
	readonly static: boolean;

	constructor(readonly struct: StructSymbol, readonly id: string, json: AbstractMemberJson) {
		this.modifiers = json.modifiers;
		this.description = json.description;
		this.static = json.static;
	}

	get file(): SourceFile {
		return this.struct.file;
	}

	abstract render(): string;
}

export interface AbstractMemberJson {

	readonly modifiers?: string;
	readonly description?: string;
	readonly static?: boolean;
}
