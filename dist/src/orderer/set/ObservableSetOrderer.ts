import {default as ObservableSet, SetItemsEventParams, SetSpliceEventParams} from '../../ObservableSet';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import SetOrderer from './SetOrderer';
import * as ArrayUtils from '../../ArrayUtils';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetOrderer<T extends IClass> extends SetOrderer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ICollectionOrdererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SetSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			ArrayUtils.toSet(spliceResult.removedItems),
			ArrayUtils.toSet(spliceResult.addedItems));
	}

	private _onClear(params: SetItemsEventParams<T>) {
		this.target.removeItems(params.items);
	}
}
