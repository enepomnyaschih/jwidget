import AbstractCollectionIndexer from '../AbstractCollectionIndexer';
import IClass from '../../IClass';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import ISet from '../../ISet';
import ISetIndexer from './ISetIndexer';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Set]].
 */
export default class SetIndexer<T extends IClass> extends AbstractCollectionIndexer<T> implements ISetIndexer<T> {
	/**
	 * @inheritdoc
	 */
	public source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
	}
}
