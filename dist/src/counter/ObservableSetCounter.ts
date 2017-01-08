import {default as ObservableSet, SpliceEventParams} from '../ObservableSet';
import IClass from '../IClass';
import ICollectionCounterConfig from './ICollectionCounterConfig';
import SetCounter from './SetCounter';
import * as ArrayUtils from '../ArrayUtils';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetCounter<T extends IClass> extends SetCounter<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.set(this.target.get() -
			ArrayUtils.count(spliceResult.removedItems, this._filterItem, this._scope) +
			ArrayUtils.count(spliceResult.addedItems, this._filterItem, this._scope));
	}

	private _onClear() {
		this.target.set(0);
	}
}
