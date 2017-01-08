import {default as ObservableSet, ItemsEventParams, SpliceEventParams} from '../ObservableSet';
import IClass from '../IClass';
import ICollectionObserverConfig from './ICollectionObserverConfig';
import SetObserver from './SetObserver';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetObserver<T extends IClass> extends SetObserver<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ICollectionObserverConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		if (this._change) {
			this.own(source.changeEvent.bind(this._onChange, this));
		}
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	}

	private _onClear(params: ItemsEventParams<T>) {
		this._doClearItems(params.items);
	}
}
