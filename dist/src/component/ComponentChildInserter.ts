import IMapSpliceResult from '../IMapSpliceResult';
import ComponentChild from './ComponentChild';
import Dictionary from '../Dictionary';
import JWMap from '../JWMap';
import Proxy from '../Proxy';
import * as MapUtils from '../MapUtils';

/**
 * @hidden
 */
export default class ComponentChildInserter extends JWMap<ComponentChild> {
	trySet(item: ComponentChild, key: string): Proxy<ComponentChild> {
		var result = super.trySet(item, key);
		if (result === undefined) {
			return undefined;
		}
		var removedItem = result.value;
		if (removedItem) {
			removedItem.detach();
		}
		item.attach(key);
		return result;
	}

	trySetKey(oldKey: string, newKey: string): ComponentChild {
		var item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		item.detach();
		item.attach(newKey);
		return item;
	}

	tryRemove(key: string): ComponentChild {
		var item = super.tryRemove(key);
		if (item === undefined) {
			return undefined;
		}
		item.detach();
		return item;
	}

	trySplice(removedKeys: string[], updatedItems: Dictionary<ComponentChild>): IMapSpliceResult<ComponentChild> {
		var spliceResult = super.trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		MapUtils.each(spliceResult.removedItems, this._detach, this);
		MapUtils.each(spliceResult.addedItems, this._attach, this);
		return spliceResult;
	}

	tryClear(): Dictionary<ComponentChild> {
		var items = super.tryClear();
		if (items === undefined) {
			return undefined;
		}
		MapUtils.each(items, this._detach, this);
		return items;
	}

	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = super.tryReindex(keyMap);
		if (result === undefined) {
			return undefined;
		}
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.get(newKey);
			item.detach();
			item.attach(newKey);
		}
		return result;
	}

	_attach(item: ComponentChild, key: string) {
		item.attach(key);
	}

	_detach(item: ComponentChild) {
		item.detach();
	}
}
