import AbstractCollectionMapper from '../AbstractCollectionMapper';
import Dictionary from '../../Dictionary';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetMapper from './ISetMapper';
import ISetMapperConfig from './ISetMapperConfig';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Set]].
 */
export default class SetMapper<T extends IClass, U extends IClass> extends AbstractCollectionMapper<T, U> implements ISetMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _items: Dictionary<U> = {};

	/**
	 * @inheritdoc
	 */
	source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	target: ISet<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ISetMapperConfig<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? this.source.createEmpty<U>() : config.target;
		this.target.tryAddAll(this._createItems(source.toArray()));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		var datas = this.source.toArray();
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _getItems(datas: T[]): U[] {
		return datas.map((data) => {
			return this._items[data._iid];
		}, this);
	}

	/**
	 * @hidden
	 */
	protected _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			var data = datas[i];
			var item = this._createItem.call(this._scope || this, data);
			items.push(item);
			this._items[data._iid] = item;
		}
		return items;
	}

	/**
	 * @hidden
	 */
	protected _destroyItems(datas: T[]) {
		if (this._destroyItem === undefined) {
			return;
		}
		for (var i = datas.length - 1; i >= 0; --i) {
			var data = datas[i];
			var iid = data._iid;
			var item = this._items[iid];
			delete this._items[iid];
			this._destroyItem.call(this._scope || this, item, data);
		}
	}
}
