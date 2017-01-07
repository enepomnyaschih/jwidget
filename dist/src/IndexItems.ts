import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';
import IndexCount from './IndexCount';

/**
 * "Index-items" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
 * to specify item segments to insert, and in [[JW.AbstractArray.SpliceResult|SpliceResult]]
 * class to specify removed and added item segments.
 *
 * @param T Item type.
 */
export default class IndexItems<T> implements IIndexItems<T> {
	constructor(public index: number, public items: T[]) {
	}

	/**
	 * Converts to "index-count" pair.
	 */
	toIndexCount(): IIndexCount {
		return new IndexCount(this.index, this.items.length);
	}

	/**
	 * Clones pair.
	 */
	clone(): IIndexItems<T> {
		return new IndexItems<T>(this.index, this.items.concat());
	}
}
