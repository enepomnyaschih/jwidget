import StructSymbol from "../symbols/Struct";
import SourceFile from "../SourceFile";
import IMember from "./IMember";
import Dictionary from "../Dictionary";
import Reference from "../models/Reference";
import Context from "../Context";

export default abstract class AbstractMember implements IMember {

	readonly modifiers: string;
	readonly description: string;
	readonly references: Dictionary<Reference>;
	readonly context: Context;

	constructor(readonly struct: StructSymbol, readonly inheritedFrom: StructSymbol, readonly id: string,
				readonly isStatic: boolean, json: AbstractMemberJson) {
		this.modifiers = json.modifiers;
		this.description = json.description;
		this.references = json.references;
	}

	get file(): SourceFile {
		return this.struct.file;
	}

	get hash(): string {
		return `${this.struct.hash}--${this.id}${this.isStatic ? "-static" : ""}`;
	}

	get isInherited(): boolean {
		return this.struct !== this.inheritedFrom;
	}

	abstract inherit(struct: StructSymbol): AbstractMember;
}

export interface AbstractMemberJson {

	readonly modifiers?: string;
	readonly description?: string;
	readonly references?: Dictionary<Reference>
}
