import IClass from '../IClass';
import ICollection from '../ICollection';

/**
 * Collection item converter.
 * Builds new collection of the same type, consisting of results of callback function
 * call for each collection item.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray<number>([1, 2]);
 *     var mapper = source.createMapper<number>({
 *         createItem: function(x) { return 2 * x }
 *     });
 *     var target = source.target;
 *
 *     assert.strictEqual(target.get(0), 2);
 *     assert.strictEqual(target.get(1), 4);
 *
 *     // Target collection is automatically synchronized with original observable collection
 *     source.add(3);
 *     assert.strictEqual(target.get(2), 6);
 *
 *     mapper.destroy();
 *
 * Can be used for data convertion into view.
 *
 *     var mapper = dataCollection.createMapper<View>({
 *         createItem: (data) => { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *     var viewCollection = mapper.target;
 *
 * Use [[JW.AbstractCollection.createMapper|createMapper]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var viewCollection = new JW.Array<View>();
 *     var mapper = dataCollection.createMapper<View>({
 *         target: viewCollection,
 *         createItem: (data) => { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$mapValues|$$mapValues]]
 * and [[JW.AbstractCollection.$$mapObjects|$$mapObjects]] shorthands can be used instead.
 * They return the target collection right away:
 *
 *     var viewCollection = dataCollection.$$mapObjects<View>((data) => {
 *         return new View(this, data);
 *     }, this);
 *
 *     // Once not needed anymore, destroy
 *     viewCollection.destroy();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in [[target]] property.
 * - All items of source collection are converted and added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] and destroyed on synchronizer destruction.
 * - You can pass target map in
 * [[Mapper.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed and destroyed
 * automatically on synchronizer destruction anyway).
 * - If [[Mapper.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 * - The items are not recreated in target collection on source items reordering/reindexing,
 * but they are reordered/reindexed according to source collection modification.
 *
 * **Additional rules for different collection types**
 *
 * [[JW.AbstractArray]]:
 *
 * - Target collection must be empty before initialization.
 * - You can't modify target collection manually and/or create other synchronizers with the same target collection.
 *
 * [[JW.AbstractMap]]:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from other collection keys.
 *
 * [[JW.AbstractSet]]:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from other collection items.
 *
 * @param T Source collection item type.
 * @param U Target collection item type.
 */
interface ICollectionMapper<U> extends IClass {
	/**
	 * Target collection.
	 */
	target: ICollection<U>;
}

export default ICollectionMapper;
