import {default as ObservableSet, ItemsEventParams, SpliceEventParams} from '../../ObservableSet';
import IClass from '../../IClass';
import ISetFiltererConfig from './ISetFiltererConfig';
import SetFilterer from './SetFilterer';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetFilterer<T extends IClass> extends SetFilterer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ISetFiltererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			spliceResult.removedItems,
			spliceResult.addedItems.filter(this._filterItem, this._scope));
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.tryRemoveAll(params.items);
	}
}
