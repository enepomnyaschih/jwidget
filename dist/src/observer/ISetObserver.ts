import IClass from '../IClass';
import ICollectionObserver from './ICollectionObserver';
import ISet from '../ISet';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Set]].
 */
interface ISetObserver<T extends IClass> extends ICollectionObserver {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;
}

export default ISetObserver;
