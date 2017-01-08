import AbstractCollectionFilterer from './AbstractCollectionFilterer';
import IMap from '../IMap';
import IMapFilterer from './IMapFilterer';
import IMapFiltererConfig from './IMapFiltererConfig';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
 */
export default class MapFilterer<T> extends AbstractCollectionFilterer<T> implements IMapFilterer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: IMapFiltererConfig<T>) {
		super(source, config);
		this.target.trySetAll(source.filter(this._filterItem, this._scope));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.getKeys());
		super.destroyObject();
	}
}
