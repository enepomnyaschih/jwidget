import Reference from "./models/Reference";
import Dictionary from "./Dictionary";
import SourceFile from "./SourceFile";
import DocError from "./DocError";

export default abstract class Context {

	readonly references: Dictionary<Reference>;

	constructor(references: Dictionary<Reference>) {
		this.references = references || {};
	}

	abstract readonly parent: Context;

	abstract readonly file: SourceFile;

	protected abstract readonly name: string;

	protected abstract getDefaultReference(key: string): Reference;

	get path(): string {
		return this.parent ? `${this.parent.path} -> ${this.name}` : this.name;
	}

	resolveReference(key: string): Reference {
		try {
			const reference = this.getReference(key);
			if (!reference) {
				throw new DocError(`${key} is not defined.`);
			}
			return reference;
		} catch (error) {
			if (error instanceof DocError) {
				throw new DocError(`Invalid reference: ${error.message} [${this.path}]`);
			} else {
				throw error;
			}
		}
	}

	private getReference(key: string): Reference {
		return this.references[key] || getBuiltInReference(key) || this.getDefaultReference(key) ||
			(this.parent ? this.parent.getReference(key) : null);
	}
}

function getBuiltInReference(key: string): Reference {
	return (key === "this") ? {} : null;
}
