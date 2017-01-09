import IArray from '../../IArray';
import IClass from '../../IClass';

/**
 * Array reverser. Builds array containing all items of source array in reversed order.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var reverser = source.createReverser();
 *     var target = reverser.target;
 *     assert(target.equal([3, 2, 1]));
 *
 *     source.add(4);
 *     assert(target.equal([4, 3, 2, 1]));
 *
 *     source.remove(2);
 *     assert(target.equal([4, 2, 1]));
 *
 *     reverser.destroy();
 *
 * Use [[JW.AbstractArray.createReverser|createReverser]] method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var reverser = source.createReverser({
 *         target: target
 *     });
 *
 * In simple cases, [[JW.AbstractArray.$$toReversed|$$toReversed]] shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.$$toReversed();
 *     assert(target.equal([3, 2, 1]));
 *
 *     source.add(4);
 *     assert(target.equal([4, 3, 2, 1]));
 *
 *     source.remove(2);
 *     assert(target.equal([4, 2, 1]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source array are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in [[Reverser.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Reverser.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * @param T Array item type.
 */
interface IArrayReverser<T> extends IClass {
	/**
	 * Target array.
	 */
	target: IArray<T>;
}

export default IArrayReverser;
