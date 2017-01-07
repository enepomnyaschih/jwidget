import Class from '../Class';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionLister from './ICollectionLister';
import ICollectionListerConfig from './ICollectionListerConfig';
import ISet from '../ISet';

/**
 * Converter to set.
 * If original collection is observable, starts continuous synchronization.
 * Can be used for fast item existance detection.
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collection and synchronizer
 *     var array = new JW.ObservableArray<JW.Class>([x]);
 *     var lister = array.createLister();
 *     var set = lister.target;
 *
 *     assert.ok(set.contains(x));
 *     assert.ok(!set.contains(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert.ok(set.contains(y));
 *
 *     lister.destroy();
 *
 * **Notice:** All items of source collection must be different (i.e. have unique _iid).
 *
 * Use [[JW.AbstractCollection.createLister|createLister]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var set = new JW.Set<JW.Class>();
 *     var lister = collection.createLister({
 *         target: set
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$toSet|$$toSet]] shorthand can be used instead.
 * It returns the target set right away:
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collections
 *     var array = new JW.ObservableArray<JW.Class>([x]);
 *     var set = array.$$toSet();
 *
 *     assert.ok(set.contains(x));
 *     assert.ok(!set.contains(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert.ok(set.contains(y));
 *
 *     set.destroy();
 *
 * Synchronizer rules:
 *
 * - Target set is stored in [[target]] property.
 * - All items of source collection are added to [[target]] immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target set in
 * [[Lister.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Lister.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 * - You can convert multiple collections into one set, if all items are different.
 *
 * @param T Collection item type.
 */
abstract class AbstractCollectionLister<T extends IClass> extends Class implements ICollectionLister<T> {
	private _targetCreated: boolean;

	/**
	 * Target set.
	 */
	target: ISet<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractCollection.createLister|createLister]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(public source: ICollection<T>, config: ICollectionListerConfig<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? source.createEmptySet<T>() : config.target;
		this.target.tryAddAll(source.asArray());
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		super.destroyObject();
	}
}

export default AbstractCollectionLister;
