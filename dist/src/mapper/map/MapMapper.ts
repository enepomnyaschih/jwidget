import AbstractCollectionMapper from '../AbstractCollectionMapper';
import Dictionary from '../../Dictionary';
import IMap from '../../IMap';
import IMapMapper from './IMapMapper';
import IMapMapperConfig from './IMapMapperConfig';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
 */
export default class MapMapper<T, U> extends AbstractCollectionMapper<T, U> implements IMapMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: IMapMapperConfig<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? this.source.createEmpty<U>() : config.target;
		this.target.trySetAll(this._createItems(source.getJson()));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.removeAllVerbose(this.source.getKeys()), this.source.getJson());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _createItems(datas: Dictionary<T>): Dictionary<U> {
		var items: Dictionary<U> = {};
		for (var key in datas) {
			items[key] = this._createItem.call(this._scope, datas[key]);
		}
		return items;
	}

	/**
	 * @hidden
	 */
	protected _destroyItems(items: Dictionary<U>, datas: Dictionary<T>) {
		if (this._destroyItem === undefined) {
			return;
		}
		for (var key in items) {
			this._destroyItem.call(this._scope, items[key], datas[key]);
		}
	}
}
