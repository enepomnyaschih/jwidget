import AbstractCollectionObserver from './AbstractCollectionObserver';
import IClass from '../IClass';
import ICollectionObserverConfig from './ICollectionObserverConfig';
import ISet from '../ISet';
import ISetObserver from './ISetObserver';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Set]].
 */
export default class SetObserver<T extends IClass> extends AbstractCollectionObserver<T> implements ISetObserver<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ICollectionObserverConfig<T>) {
		super(source, config);
	}
}
