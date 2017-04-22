/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {destroy} from './Core';
import AbstractMap from './AbstractMap';
import Class from './Class';
import Destroyable from './Destroyable';
import Dictionary from './Dictionary';
import Event from './Event';
import IArray from './IArray';
import IMap from './IMap';
import IMapSpliceResult from './IMapSpliceResult';
import ISet from './ISet';
import JWArray from './JWArray';
import JWMap from './JWMap';
import JWSet from './JWSet';
import ObservableArray from './ObservableArray';
import ObservableSet from './ObservableSet';
import Property from './Property';
import Proxy from './Proxy';
import * as ArrayUtils from './ArrayUtils';
import * as MapUtils from './MapUtils';

/**
 * Observable implementation of [[JW.AbstractMap]].
 *
 * @param T Collection item type.
 */
export default class ObservableMap<T> extends AbstractMap<T> {
	/**
	 * Collection length. **Don't modify manually!**
	 */
	length: Property<number>;

	/**
	 * Items are removed from map, items are added to map and items are updated in map.
	 * Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 * * [[setAll]]
	 * * [[trySetAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	spliceEvent: Event<MapSpliceEventParams<T>> = new Event<MapSpliceEventParams<T>>();

	/**
	 * Keys of items are changed in map. Triggered in result of calling:
	 *
	 * * [[setKey]]
	 * * [[trySetKey]]
	 * * [[reindex]]
	 * * [[tryReindex]]
	 * * [[performReindex]]
	 */
	reindexEvent: Event<MapReindexEventParams<T>> = new Event<MapReindexEventParams<T>>();

	/**
	 * Map is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<MapItemsEventParams<T>> = new Event<MapItemsEventParams<T>>();

	/**
	 * Map is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[reindexEvent]]
	 * * [[clearEvent]]
	 */
	changeEvent: Event<MapEventParams<T>> = new Event<MapEventParams<T>>();

	/**
	 * @inheritdoc
	 */
	constructor(items?: Dictionary<T>, adapter?: boolean) {
		super(items, adapter);
		this.length = new Property<number>(this.getLength());
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		super.destroyObject();
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IArray<string> {
		return new JWArray<string>(this.getKeys(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<string> {
		return new JWArray<string>(this.getSortingKeys(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<string> {
		return new JWArray<string>(this.getSortingKeysComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T> {
		return new JWMap<T>(this.filter(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, key: string) => U, scope?: any): IMap<U> {
		return new JWMap<U>(this.map(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: string) => string, scope?: any): IMap<T> {
		return new JWMap<T>(this.index(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$toArray(): IArray<T> {
		return new JWArray<T>(this.toArray(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asArray(): IArray<T> {
		return new JWArray<T>(this.asArray(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toMap(): IMap<T> {
		return new JWMap<T>(this.toMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T> {
		return new JWMap<T>(this.asMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<any> {
		return new JWSet<any>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<any> {
		return new JWSet<any>(this.asSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	trySet(item: T, key: string): Proxy<T> {
		var result = this._trySet(item, key);
		if (result === undefined) {
			return undefined;
		}
		var removedItems: Dictionary<T> = {};
		var removedItem = result.value;
		if (removedItem !== undefined) {
			removedItems[key] = removedItem;
		}
		var addedItems: Dictionary<T> = {};
		addedItems[key] = item;
		var spliceResult = { removedItems: removedItems, addedItems: addedItems };
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (removedItem !== undefined && this._ownsItems) {
			(<Destroyable><any>removedItem).destroy();
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	setAll(items: Dictionary<T>) {
		this.trySetAll(items);
	}

	/**
	 * @inheritdoc
	 */
	trySetKey(oldKey: string, newKey: string): T {
		var item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		this.reindexEvent.trigger({ sender: this, keyMap: MapUtils.single(oldKey, newKey) });
		this.changeEvent.trigger({ sender: this });
		return item;
	}

	/**
	 * @inheritdoc
	 */
	tryRemove(key: string): T {
		var item = this._tryRemove(key);
		if (item === undefined) {
			return undefined;
		}
		var spliceResult: IMapSpliceResult<T> = { addedItems: {}, removedItems: MapUtils.single(key, item) };
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			(<Destroyable><any>item).destroy();
		}
		return item;
	}

	/**
	 * @inheritdoc
	 */
	removeAll(keys: string[]) {
		this.tryRemoveAll(keys);
	}

	/**
	 * @inheritdoc
	 */
	$removeAllVerbose(keys: string[]): IMap<T> {
		return new JWMap<T>(this.removeAllVerbose(keys), true);
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IMapSpliceResult<T> {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(MapUtils.toArray(spliceResult.removedItems), destroy);
		}
		return spliceResult;
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): Dictionary<T> {
		var items = this._tryClear();
		if (items === undefined) {
			return undefined;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: items });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(MapUtils.toArray(items), destroy);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IMap<T> {
		return new JWMap<T>(this.clear(), true);
	}

	/**
	 * @inheritdoc
	 */
	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = super.tryReindex(keyMap);
		if (result === undefined) {
			return undefined;
		}
		this.reindexEvent.trigger({ sender: this, keyMap: result });
		this.changeEvent.trigger({ sender: this });
		return result;
	}

	/**
	 * @inheritdoc
	 */
	createEmpty<U>(): ObservableMap<U> {
		return new ObservableMap<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyArray<U>(): ObservableArray<U> {
		return new ObservableArray<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyMap<U>(): ObservableMap<U> {
		return new ObservableMap<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptySet<U extends Class>(): ObservableSet<U> {
		return new ObservableSet<U>();
	}
}

/**
 * [[JW.ObservableMap]] event parameters.
 */
export interface MapEventParams<T> {
	/**
	 * Event sender.
	 */
	sender: ObservableMap<T>;
}

/**
 * Parameters of [[JW.ObservableMap]]'s [[JW.ObservableMap.spliceEvent]].
 */
export interface MapSpliceEventParams<T> extends MapEventParams<T> {
	/**
	 * Result of [[JW.ObservableMap.splice]] method.
	 */
	spliceResult: IMapSpliceResult<T>;
}

/**
 * Parameters of [[JW.ObservableMap]]'s [[JW.ObservableMap.reindexEvent]].
 */
export interface MapReindexEventParams<T> extends MapEventParams<T> {
	/**
	 * Map of changed keys.
	 */
	keyMap: Dictionary<string>;
}

/**
 * Parameters of [[JW.ObservableMap]]'s [[JW.ObservableMap.clearEvent]].
 */
export interface MapItemsEventParams<T> extends MapEventParams<T> {
	/**
	 * Old map contents.
	 */
	items: Dictionary<T>;
}
