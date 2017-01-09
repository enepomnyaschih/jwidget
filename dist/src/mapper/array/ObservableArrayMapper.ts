import {default as ObservableArray, ItemsEventParams, MoveEventParams, ReorderEventParams, ReplaceEventParams, SpliceEventParams} from '../../ObservableArray';
import ArrayMapper from './ArrayMapper';
import IArrayMapperConfig from './IArrayMapperConfig';
import IIndexItems from '../../IIndexItems';
import IndexItems from '../../IndexItems';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableArray]].
 */
export default class Mapper<T, U> extends ArrayMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: IArrayMapperConfig<T, U>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	private _onSplice(params: SpliceEventParams<T>) {
		var sourceResult = params.spliceResult;
		var sourceAddedItemsList = sourceResult.addedItemsList;
		var targetAddParamsList: IIndexItems<U>[] = [];
		for (var i = 0, l = sourceAddedItemsList.length; i < l; ++i) {
			var addParams = sourceAddedItemsList[i];
			targetAddParamsList.push(new IndexItems(
				addParams.index, this._createItems(addParams.items)));
		}
		var targetResult = this.target.trySplice(sourceResult.getRemoveParamsList(), targetAddParamsList);
		var sourceRemovedItemsList = sourceResult.removedItemsList;
		var targetRemovedItemsList = targetResult.removedItemsList;
		for (var i = targetRemovedItemsList.length - 1; i >= 0; --i) {
			this._destroyItems(targetRemovedItemsList[i].items, sourceRemovedItemsList[i].items);
		}
	}

	private _onReplace(params: ReplaceEventParams<T>) {
		var newItem = this._createItem.call(this._scope, params.newItem);
		var oldItem = this.target.trySet(newItem, params.index).value;
		this._destroyItem.call(this._scope, oldItem, params.oldItem);
	}

	private _onMove(params: MoveEventParams<T>) {
		this.target.tryMove(params.fromIndex, params.toIndex);
	}

	private _onClear(params: ItemsEventParams<T>) {
		this._destroyItems(this.target.tryClear(), params.items);
	}

	private _onReorder(params: ReorderEventParams<T>) {
		this.target.tryReorder(params.indexArray);
	}
}
