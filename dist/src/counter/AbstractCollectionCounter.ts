import Class from '../Class';
import ICollection from '../ICollection';
import ICollectionCounter from './ICollectionCounter';
import ICollectionCounterConfig from './ICollectionCounterConfig';
import ICollectionCounterReconfig from './ICollectionCounterReconfig';
import Property from '../Property';

/**
 * Counter for collection items which match the specified filter.
 * Builds new JW.Property&lt;number&gt;, containing the number of items for which callback
 * function returns !== false.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var counter = source.createCounter({
 *         filterItem: function(x) { return x % 2 === 1; }
 *     });
 *     var target = counter.target;
 *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
 *
 *     counter.destroy();
 *
 * Use [[JW.AbstractCollection.createCounter|createCounter]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target property in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Property<number>(0);
 *     var counter = source.createCounter({
 *         target: target,
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$count|$$count]] shorthand can be used instead.
 * It returns the target property right away:
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var target = source.$$count(function(x) { return x % 2 === 1; });
 *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
 *
 *     target.destroy();
 *
 * You may use [[JW.AbstractCollection.Filterer|Filterer]] instead
 * of counter, but counter works much faster because it doesn't create a filtered collection.
 *
 *     var source = new JW.ObservableArray();
 *
 *     // via filterer
 *     var filterer = source.createFilterer({
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *     var count = filterer.target.length; // JW.Property<number>
 *
 *     // via counter, works faster
 *     var counter = source.createCounter({
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *     var count = counter.target; // JW.Property<number>
 *
 * Counter works correctly for observable collections only.
 *
 * @param T Collection item type.
 */
abstract class AbstractCollectionCounter<T> extends Class implements ICollectionCounter<T> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _filterItem: (item: T) => boolean;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Target property.
	 */
	target: Property<number>;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractCollection.createCounter|createCounter]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(public source: ICollection<T>, config: ICollectionCounterConfig<T>) {
		super();
		this._filterItem = config.filterItem;
		this._scope = config.scope || this;
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Property<number>(0) : config.target;
		this.target.set(source.count(this._filterItem, this._scope));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.set(0);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this._filterItem = null;
		this.target = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * Changes counter configuration and recounts matching items.
	 * @param config Options to modify.
	 */
	reconfigure(config: ICollectionCounterReconfig<T>) {
		this._filterItem = config.filterItem || this._filterItem;
		this._scope = config.scope || this._scope;
		this.recount();
	}

	/**
	 * Recounts matching items. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	recount() {
		this.target.set(this.source.count(this._filterItem, this._scope));
	}
}

export default AbstractCollectionCounter;
