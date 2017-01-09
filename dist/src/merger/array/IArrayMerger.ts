import IArray from '../../IArray';
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
interface IArrayMerger<T> extends IClass {
	/**
	 * Target array.
	 */
	target: IArray<T>;
}

export default IArrayMerger;
