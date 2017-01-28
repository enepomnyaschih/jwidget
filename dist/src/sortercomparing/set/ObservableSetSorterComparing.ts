import {default as ObservableSet, SetItemsEventParams, SetSpliceEventParams} from '../../ObservableSet';
import IClass from '../../IClass';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import SetSorterComparing from './SetSorterComparing';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetSorterComparing<T extends IClass> extends SetSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ICollectionSorterComparingConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SetSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onClear(params: SetItemsEventParams<T>) {
		this._splice(params.items, []);
	}
}
