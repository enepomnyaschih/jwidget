import Class from '../Class';
import ICollection from '../ICollection';
import ICollectionObserver from './ICollectionObserver';
import ICollectionObserverConfig from './ICollectionObserverConfig';

/**
 * Collection observer. Listens all collection events and reduces them to 2 granular functions:
 * item is added and item is removed. In optimization purposes, you can define a third function: collection is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Also, you can define a function which is called on each collection modification.
 * For example, this synchronizer can be used to notify the items if they are added to collection.
 *
 *     var observer = collection.createObserver({
 *         addItem: function(item) { item.setInCollection(true); },
 *         removeItem: function(item) { item.setInCollection(false); },
 *         scope: this
 *     });
 *
 * Use [[JW.AbstractCollection.createObserver|createObserver]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * Just another observer use case: if you have an abstract collection on input (and you don't know whether it is
 * simple or observable), and you want to listen collection change event if it is observable,
 * then you can do it meeting OOD principles:
 *
 *     var observer = collection.createObserver({
 *         change: function() { console.log("Collection is changed"); }
 *     });
 *
 * Synchronizer rules:
 *
 * - Function [[Observer.Config.addItem|addItem]]
 * is called for all items of source collection on synchronizer initialization.
 * - Function [[Observer.Config.clearItems|clearItems]]
 * is called for collection, or function
 * [[Observer.Config.removeItem|removeItem]] is called for
 * all items of source collection on synchronizer destruction.
 * - Functions [[Observer.Config.addItem|addItem]],
 * [[Observer.Config.removeItem|removeItem]] and
 * [[Observer.Config.clearItems|clearItems]] are
 * not called on source collection reordering/reindexing.
 *
 * @param T Collection item type.
 */
abstract class AbstractCollectionObserver<T> extends Class implements ICollectionObserver {
	/**
	 * @hidden
	 */
	protected _addItem: (item: T) => void;

	/**
	 * @hidden
	 */
	protected _removeItem: (item: T) => void;

	/**
	 * @hidden
	 */
	protected _clearItems: (items: T[]) => void;

	/**
	 * @hidden
	 */
	protected _change: () => void;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractCollection.createObserver|createObserver]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(public source: ICollection<T>, config: ICollectionObserverConfig<T>) {
		super();
		config = config || {};
		this._addItem = config.addItem;
		this._removeItem = config.removeItem;
		this._clearItems = config.clearItems;
		this._change = config.change;
		this._scope = config.scope || this;
		this._addItems(source.asArray());
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._doClearItems(this.source.asArray());
		this.source = null;
		this._addItem = null;
		this._removeItem = null;
		this._clearItems = null;
		this._change = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _addItems(items: T[]) {
		if (!this._addItem) {
			return;
		}
		for (var i = 0, l = items.length; i < l; ++i) {
			this._addItem.call(this._scope, items[i]);
		}
	}

	/**
	 * @hidden
	 */
	protected _removeItems(items: T[]) {
		if (!this._removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._removeItem.call(this._scope, items[i]);
		}
	}

	/**
	 * @hidden
	 */
	protected _doClearItems(items: T[]) {
		if (items.length === 0) {
			return;
		}
		if (this._clearItems) {
			this._clearItems.call(this._scope, items);
		} else {
			this._removeItems(items);
		}
	}

	/**
	 * @hidden
	 */
	protected _onChange() {
		this._change.call(this._scope);
	}
}

export default AbstractCollectionObserver;
