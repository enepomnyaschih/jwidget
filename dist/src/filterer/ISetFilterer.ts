import IClass from '../IClass';
import ICollectionFilterer from './ICollectionFilterer';
import ISet from '../ISet';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Set]].
 */
interface ISetFilterer<T extends IClass> extends ICollectionFilterer<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	target: ISet<T>;
}

export default ISetFilterer;
