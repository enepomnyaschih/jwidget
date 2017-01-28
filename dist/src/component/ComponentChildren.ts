import Component from '../Component';
import ComponentChild from './ComponentChild';
import ComponentChildInserter from './ComponentChildInserter';
import Dictionary from '../Dictionary';
import IMapSpliceResult from '../IMapSpliceResult';
import JWMap from '../JWMap';
import Proxy from '../Proxy';
import * as MapUtils from '../MapUtils';

/**
 * Mutable named child component map for [[JW.UI.Component]].
 * Use this map to add child components in place of
 * elements with corresponding `jwid`. Field is available from component rendering beginning.
 */
export default class ComponentChildren extends JWMap<Component> {
	/**
	 * @hidden
	 */
	target: ComponentChildInserter;

	/**
	 * @hidden
	 */
	constructor(public component: Component) {
		super();
		this.target = new ComponentChildInserter();
	}

	/**
	 * @hidden
	 */
	unrender() {
		this.target.destroy();
	}

	/**
	 * @inheritdoc
	 */
	trySet(item: Component, key: string): Proxy<Component> {
		var result = super.trySet(item, key);
		if (result === undefined) {
			return undefined;
		}
		var child = new ComponentChild(this.component, item);
		this.target.trySet(child, key);
		return result;
	}

	/**
	 * @inheritdoc
	 */
	trySetKey(oldKey: string, newKey: string): Component {
		var item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		this.target.trySetKey(oldKey, newKey);
		return item;
	}

	/**
	 * @inheritdoc
	 */
	tryRemove(key: string): Component {
		var item = super.tryRemove(key);
		if (item === undefined) {
			return undefined;
		}
		this.target.tryRemove(key);
		return item;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<Component>): IMapSpliceResult<Component> {
		var spliceResult = super.trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		var removedItems = spliceResult.removedItems;
		var addedItems = spliceResult.addedItems;
		var children = MapUtils.map(addedItems, (item) => {
			return new ComponentChild(this.component, item);
		}, this);
		this.target.trySplice(MapUtils.getRemovedKeys(removedItems, addedItems), children);
		return spliceResult;
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): Dictionary<Component> {
		var items = super.tryClear();
		if (items === undefined) {
			return undefined;
		}
		this.target.tryClear();
		return items;
	}

	/**
	 * @inheritdoc
	 */
	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = super.tryReindex(keyMap);
		if (result === undefined) {
			return undefined;
		}
		this.target.tryReindex(keyMap);
		return result;
	}
}
