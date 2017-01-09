import IArray from '../../IArray';
import IArrayFiltererReconfig from './IArrayFiltererReconfig';
import ICollectionFilterer from '../ICollectionFilterer';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Array]].
 */
interface IArrayFilterer<T> extends ICollectionFilterer<T> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	target: IArray<T>;

	/**
	 * Changes filterer configuration and refilters target collection.
	 * @param config Options to modify.
	 */
	reconfigure(config: IArrayFiltererReconfig<T>): void;

	/**
	 * Refilters target collection item. Call this method when collection item properties change the way that
	 * it must be refiltered.
	 * @param item Item to refilter.
	 */
	refilterItem(item: T): void;

	/**
	 * Refilters target collection. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	refilter(): void;

	/**
	 * Refilters target collection item at specified position in source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 * @param index Index of source collection item to refilter.
	 */
	refilterAt(sourceIndex: number): void;
}

export default IArrayFilterer;
