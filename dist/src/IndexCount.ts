import IIndexCount from './IIndexCount';

/**
 * "Index-count" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
 * to specify item segments to remove.
 */
export default class IndexCount implements IIndexCount {
	constructor(public index: number, public count: number) {
	}

	/**
	 * Clones pair.
	 */
	clone(): IIndexCount {
		return new IndexCount(this.index, this.count);
	}
}
