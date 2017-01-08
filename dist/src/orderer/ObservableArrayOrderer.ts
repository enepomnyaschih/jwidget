import {default as ObservableArray, ItemsEventParams, ReplaceEventParams, SpliceEventParams} from '../ObservableArray';
import ArrayOrderer from './ArrayOrderer';
import IClass from '../IClass';
import ICollectionOrdererConfig from './ICollectionOrdererConfig';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import * as ArrayUtils from '../ArrayUtils';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayOrderer<T extends IClass> extends ArrayOrderer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionOrdererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			ArrayUtils.toSet(spliceResult.getRemovedItems()),
			ArrayUtils.toSet(spliceResult.getAddedItems()));
	}

	private _onReplace(params: ReplaceEventParams<T>) {
		var index = this.target.keyOf(params.oldItem);
		this.target.trySplice(
			[new IndexCount(index, 1)],
			[new IndexItems(this.target.getLength() - 1, [params.newItem])]);
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.removeItems(params.items);
	}
}
