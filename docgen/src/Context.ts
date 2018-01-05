import Reference from "./models/Reference";
import Dictionary from "./Dictionary";

export default abstract class Context {

	readonly references: Dictionary<Reference>;

	constructor(references: Dictionary<Reference>) {
		this.references = references || {};
	}

	abstract readonly parent: Context;

	abstract readonly selfReference: Reference;

	protected abstract readonly name: string;

	protected abstract getDefaultReference(key: string): Reference;

	get path(): string {
		return this.parent ? `${this.parent.path} -> ${this.name}` : this.name;
	}

	resolveReference(key: string): Reference {
		try {
			const reference = this.getReference(key);
			if (!reference) {
				throw new Error(`${key} is not defined.`);
			}
			return reference;
		} catch (error) {
			throw new Error(`Invalid reference: ${error.message} [${this.path}]`);
		}
	}

	private getReference(key: string): Reference {
		return this.references[key] || this.getDefaultReference(key) ||
			(this.parent ? this.parent.getReference(key) : null);
	}
}
