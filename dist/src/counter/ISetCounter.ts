import IClass from '../IClass';
import ICollectionCounter from './ICollectionCounter';
import ISet from '../ISet';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Set]].
 */
interface ISetCounter<T extends IClass> extends ICollectionCounter<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;
}

export default ISetCounter;
