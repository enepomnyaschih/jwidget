import IClass from '../IClass';
import ICollection from '../ICollection';

/**
 * Collection filterer.
 * Builds new collection of the same type, consisting of items for which callback
 * function returns !== false.
 * If original collection is observable, starts continuous synchronization.
 * Keeps item order in array.
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var filterer = source.createFilterer({
 *         filterItem: function(x) { return x % 2 === 1; }
 *     });
 *     var target = filterer.target;
 *     assert.ok(target.equal([1, 3]));
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.ok(target.equal([1, 3, 7, 1]));
 *
 *     source.move(2, 6); // move "3" item to the end
 *     assert.ok(target.equal([1, 7, 1, 3]));
 *
 *     filterer.destroy();
 *
 * Use [[JW.AbstractCollection.createFilterer|createFilterer]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Set();
 *     var filterer = source.createFilterer({
 *         target: target,
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$filter|$$filter]] shorthand can be used instead.
 * It returns the target collection right away:
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var target = source.$$filter(function(x) { return x % 2 === 1; });
 *     assert.ok(target.equal([1, 3]));
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.ok(target.equal([1, 3, 7, 1]));
 *
 *     source.move(2, 6); // move "3" item to the end
 *     assert.ok(target.equal([1, 7, 1, 3]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in [[target]] property.
 * - Filtered items are added to [[target]] immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target collection in
 * [[Filterer.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Filterer.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * **Additional rules for different collection types**
 *
 * [[JW.AbstractArray]]:
 *
 * - Target collection must be empty before initialization.
 * - A target collection can be synchronized with one source collection only.
 *
 * [[JW.AbstractMap]]:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from source collection keys.
 *
 * [[JW.AbstractSet]]:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from source collection items.
 *
 * @param T Collection item type.
 */
interface ICollectionFilterer<T> extends IClass {
	/**
	 * Target collection.
	 */
	target: ICollection<T>;
}

export default ICollectionFilterer;
