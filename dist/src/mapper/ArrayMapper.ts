import AbstractCollectionMapper from './AbstractCollectionMapper';
import IArray from '../IArray';
import IArrayMapper from './IArrayMapper';
import IArrayMapperConfig from './IArrayMapperConfig';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Array]].
 */
export default class ArrayMapper<T, U> extends AbstractCollectionMapper<T, U> implements IArrayMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	target: IArray<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: IArrayMapperConfig<T, U>) {
		super(source, config);
		this.target.tryAddAll(this._createItems(this.source.getItems()));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.clear(), this.source.getItems());
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this._createItem.call(this._scope, datas[i]));
		}
		return items;
	}

	/**
	 * @hidden
	 */
	protected _destroyItems(items: U[], datas: T[]) {
		if (this._destroyItem === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._destroyItem.call(this._scope, items[i], datas[i]);
		}
	}
}
