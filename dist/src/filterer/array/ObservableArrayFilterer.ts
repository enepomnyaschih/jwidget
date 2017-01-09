import {default as ObservableArray, ItemsEventParams, MoveEventParams, ReorderEventParams, ReplaceEventParams, SpliceEventParams} from '../../ObservableArray';
import ArrayFilterer from './ArrayFilterer';
import Dictionary from '../../Dictionary';
import IArrayFiltererConfig from './IArrayFiltererConfig';
import * as ArrayUtils from '../../ArrayUtils';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayFilterer<T> extends ArrayFilterer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: IArrayFiltererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
	}

	private _onReplace(params: ReplaceEventParams<T>) {
		var oldFiltered = this._filtered[params.index] !== 0;
		var newFiltered = this._filterItem.call(this._scope, params.newItem) !== false;
		if (!oldFiltered && !newFiltered) {
			return;
		}
		var index = this._countFiltered(0, params.index);
		this._filtered[params.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.tryRemove(index);
		} else if (!oldFiltered) {
			this.target.tryAdd(params.newItem, index);
		} else {
			this.target.trySet(params.newItem, index);
		}
	}

	private _onMove(params: MoveEventParams<T>) {
		if (this._filtered[params.fromIndex] !== 0) {
			var fromIndex: number, toIndex: number;
			if (params.fromIndex < params.toIndex) {
				fromIndex = this._countFiltered(0, params.fromIndex);
				toIndex = fromIndex + this._countFiltered(params.fromIndex + 1, params.toIndex - params.fromIndex);
			} else {
				toIndex = this._countFiltered(0, params.toIndex);
				fromIndex = toIndex + this._countFiltered(params.toIndex, params.fromIndex - params.toIndex);
			}
			this.target.tryMove(fromIndex, toIndex);
		}
		ArrayUtils.tryMove(this._filtered, params.fromIndex, params.toIndex);
	}

	private _onClear(params: ItemsEventParams<T>) {
		this.target.tryClear();
	}

	private _onReorder(params: ReorderEventParams<T>) {
		var targetIndex = 0;
		var targetIndexWhichMovesToI: Dictionary<number> = {};
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				targetIndexWhichMovesToI[params.indexArray[sourceIndex]] = targetIndex++;
			}
		}
		ArrayUtils.tryReorder(this._filtered, params.indexArray);

		var targetIndex = 0;
		var indexes = new Array<number>(this.target.getLength());
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
			}
		}

		this.target.tryReorder(indexes);
	}
}
