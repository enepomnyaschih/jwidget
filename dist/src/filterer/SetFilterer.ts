import AbstractCollectionFilterer from './AbstractCollectionFilterer';
import ISet from '../ISet';
import ISetFilterer from './ISetFilterer';
import ISetFiltererConfig from './ISetFiltererConfig';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Set]].
 */
export default class SetFilterer<T extends IClass> extends AbstractCollectionFilterer<T> implements ISetFilterer<T> {
	/**
	 * @inheritdoc
	 */
	source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	target: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ISetFiltererConfig<T>) {
		super(source, config);
		this.target.tryAddAll(source.$toArray().filter(this._filterItem, this._scope));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.toArray());
		super.destroyObject();
	}
}
