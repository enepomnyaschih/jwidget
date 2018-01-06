import StructSymbol from "../symbols/Struct";
import SourceFile from "../SourceFile";
import Renderable from "../Renderable";

export default abstract class AbstractMember implements Renderable {

	readonly modifiers: string;
	readonly description: string;

	constructor(readonly struct: StructSymbol, readonly id: string, json: AbstractMemberJson) {
		this.modifiers = json.modifiers;
		this.description = json.description;
	}

	get file(): SourceFile {
		return this.struct.file;
	}

	abstract render(): string;
}

export interface AbstractMemberJson {

	readonly modifiers?: string;
	readonly description?: string;
}
