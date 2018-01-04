import ReferenceDictionary from "./models/ReferenceDictionary";
import Reference from "./models/Reference";

export default abstract class Context {

	readonly references: ReferenceDictionary;

	constructor(references: ReferenceDictionary) {
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
