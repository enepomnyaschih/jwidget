import IArraySpliceResult from './IArraySpliceResult';
import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';

/**
 * [[JW.AbstractArray.splice|splice]] method result.
 *
 * @param T Item type.
 */
export default class ArraySpliceResult<T> implements IArraySpliceResult<T> {
	private removedItems: T[];
	private addedItems: T[];
	private removeParamsList: IIndexCount[];

	/**
	 * @param oldItems Old array contents.
	 * @param removedItemsList Removed item segments.
	 * @param addedItemsList Added item segments.
	 */
	constructor(public oldItems: T[], public removedItemsList: IIndexItems<T>[], public addedItemsList: IIndexItems<T>[]) {
	}

	/**
	 * Returns plain array of removed items.
	 */
	getRemovedItems(): T[]{
		if (!this.removedItems) {
			this.removedItems = merge(map(this.removedItemsList, function (indexItems) {
				return indexItems.items;
			}));
		}
		return this.removedItems;
	}

	/**
	 * Returns plain array of added items.
	 */
	getAddedItems(): T[]{
		if (!this.addedItems) {
			this.addedItems = merge(map(this.addedItemsList, function (indexItems) {
				return indexItems.items;
			}));
		}
		return this.addedItems;
	}

	/**
	 * Converts removed item segments to "index-count" pairs.
	 */
	getRemoveParamsList(): IIndexCount[]{
		if (!this.removeParamsList) {
			this.removeParamsList = map(this.removedItemsList, (x) => x.toIndexCount());
		}
		return this.removeParamsList;
	}

	/**
	 * Checks if [[JW.AbstractArray.splice|splice]] method call didn't change the array.
	 * @returns Array hasn't been changed.
	 */
	isEmpty(): boolean {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
}
