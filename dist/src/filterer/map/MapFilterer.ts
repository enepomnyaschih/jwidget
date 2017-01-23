import AbstractCollectionFilterer from '../AbstractCollectionFilterer';
import IMap from '../../IMap';
import IMapFilterer from './IMapFilterer';
import IMapFiltererConfig from './IMapFiltererConfig';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
 */
export default class MapFilterer<T> extends AbstractCollectionFilterer<T> implements IMapFilterer<T> {
	private _targetCreated: boolean;

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
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? this.source.createEmpty<T>() : config.target;
		this.target.trySetAll(source.filter(this._filterItem, this._scope));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.getKeys());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}
}
