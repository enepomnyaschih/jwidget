import Class from '../../Class';
import IArray from '../../IArray';
import IArrayMerger from './IArrayMerger';
import IArrayMergerConfig from './IArrayMergerConfig';
import IClass from '../../IClass';

/**
 * Arrays merger. Builds array consisting of all source collections items in the same order.
 * If any of the original collections is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var merger = source.createMerger();
 *     var target = merger.target;
 *     assert(target.equal([1, 2, 3, 4]));
 *
 *     source.add(new JW.Array([5, 6]));
 *     assert(target.equal([1, 2, 3, 4, 5, 6]));
 *
 *     source.get(1).addAll([7, 8, 9]);
 *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     merger.destroy();
 *
 * Use [[JW.AbstractArray.createMerger|createMerger]] method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var merger = source.createMerger({
 *         target: target
 *     });
 *
 * In simple cases, [[JW.AbstractArray.$$merge|$$merge]] shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var target = source.$$merge();
 *     assert(target.equal([1, 2, 3, 4]));
 *
 *     source.add(new JW.Array([5, 6]));
 *     assert(target.equal([1, 2, 3, 4, 5, 6]));
 *
 *     source.get(1).addAll([7, 8, 9]);
 *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source arrays are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in [[Merger.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Merger.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * @param T Array item type.
 */
export default class ArrayMerger<T> extends Class implements IArrayMerger<T> {
	private _targetCreated: boolean;
	private _bunches: IArray<IClass>;

	/**
	 * Target array.
	 */
	target: IArray<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractArray.createMerger|createMerger]] method is preferred instead.
	 *
	 * @param source Source array.
	 * @param config Configuration.
	 */
	constructor(public source: IArray<IArray<T>>, config: IArrayMergerConfig<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? source._createMergerTarget<T>() : config.target;
		this._bunches = source.$$mapObjects((bunch) => {
			return bunch.createMergerBunch(this);
		});
		this.target.tryAddAll(this._getAllItems());
	}

	/**
	 * @inheritdoc
	 */
	destroyObject() {
		this.target.tryClear();
		this._bunches.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._bunches = null;
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _getAllItems(): T[] {
		return this._merge(this.source.getItems());
	}

	/**
	 * @hidden
	 */
	protected _merge(bunches: IArray<T>[]): T[] {
		var items = new Array<T>(this._count(bunches));
		var iItems = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i].getItems();
			for (var j = 0, m = bunch.length; j < m; ++j) {
				items[iItems++] = bunch[j];
			}
		}
		return items;
	}

	/**
	 * @hidden
	 */
	protected _count(bunches: IArray<T>[], index?: number, length?: number): number {
		if (index === undefined) {
			index = 0;
		}
		if (length === undefined) {
			length = bunches.length - index;
		}
		var count = 0;
		for (var i = 0; i < length; ++i) {
			count += bunches[index + i].getLength();
		}
		return count;
	}
}
