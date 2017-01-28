import {default as ObservableSet, SetItemsEventParams, SetSpliceEventParams} from '../../ObservableSet';
import IClass from '../../IClass';
import ISetMapperConfig from './ISetMapperConfig';
import SetMapper from './SetMapper';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetMapper<T extends IClass, U extends IClass> extends SetMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ISetMapperConfig<T, U>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SetSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var removedDatas = spliceResult.removedItems;
		var addedDatas = spliceResult.addedItems;
		this.target.trySplice(this._getItems(removedDatas), this._createItems(addedDatas));
		this._destroyItems(removedDatas);
	}

	private _onClear(params: SetItemsEventParams<T>) {
		var datas = params.items;
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
	}
}
