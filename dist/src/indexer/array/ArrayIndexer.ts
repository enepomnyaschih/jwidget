import AbstractCollectionIndexer from '../AbstractCollectionIndexer';
import IArray from '../../IArray';
import IArrayIndexer from './IArrayIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Array]].
 */
export default class ArrayIndexer<T> extends AbstractCollectionIndexer<T> implements IArrayIndexer<T> {
	/**
	 * @inheritdoc
	 */
	public source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
	}
}
