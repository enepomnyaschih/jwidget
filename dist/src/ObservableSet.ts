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
import AbstractSet from './AbstractSet';
import Dictionary from './Dictionary';
import Event from './Event';
import IArray from './IArray';
import IClass from './IClass';
import IMap from './IMap';
import ISet from './ISet';
import ISetSpliceResult from './ISetSpliceResult';
import JWArray from './JWArray';
import JWMap from './JWMap';
import JWSet from './JWSet';
import ObservableArray from './ObservableArray';
import ObservableMap from './ObservableMap';
import Property from './Property';
import * as ArrayUtils from './ArrayUtils';

/**
 * Observable implementation of [[JW.AbstractSet]].
 *
 * @param T Collection item type.
 */
export default class ObservableSet<T extends IClass> extends AbstractSet<T> {
	/**
	 * Collection length. **Don't modify manually!**
	 */
	length: Property<number>;

	/**
	 * Items are removed from set, items are added to set.
	 * Triggered in result of calling:
	 *
	 * * [[add]]
	 * * [[tryAdd]]
	 * * [[addAll]]
	 * * [[$addAll]]
	 * * [[tryAddAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[removeAll]]
	 * * [[$removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	spliceEvent: Event<SetSpliceEventParams<T>> = new Event<SetSpliceEventParams<T>>();

	/**
	 * Set is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<SetItemsEventParams<T>> = new Event<SetItemsEventParams<T>>();

	/**
	 * Set is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[clearEvent]]
	 */
	changeEvent: Event<SetEventParams<T>> = new Event<SetEventParams<T>>();

	/**
	 * @inheritdoc
	 */
	constructor();

	/**
	 * @inheritdoc
	 */
	constructor(items: T[]);

	/**
	 * @inheritdoc
	 */
	constructor(items: Dictionary<T>, adapter: boolean);
	constructor(items?: any, adapter?: boolean) {
		super(items, adapter);
		this.length = new Property<number>(true, this.getLength());
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		super.destroyObject();
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T) => boolean, scope?: any): ISet<T> {
		return new JWSet<T>(this.filter(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U extends IClass>(callback: (item: T) => U, scope?: any): ISet<U> {
		return new JWSet<U>(this.map(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T) => any, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T) => string, scope?: any): IMap<T> {
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
	$toSet(): ISet<T> {
		return new JWSet<T>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$addAll(items: T[]): IArray<T> {
		return new JWArray<T>(this.addAll(items), true);
	}

	/**
	 * @inheritdoc
	 */
	$removeAll(items: T[]): IArray<T> {
		return new JWArray<T>(this.removeAll(items), true);
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IArray<T> {
		return new JWArray<T>(this.clear(), true);
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): T[] {
		var items = this._tryClear();
		if (items === undefined) {
			return undefined;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: items });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(items, destroy);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T> {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.removedItems, destroy);
		}
		return spliceResult;
	}

	/**
	 * @inheritdoc
	 */
	createEmpty<U extends IClass>(): ObservableSet<U> {
		return new ObservableSet<U>();
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
	createEmptySet<U extends IClass>(): ObservableSet<U> {
		return new ObservableSet<U>();
	}
}

/**
 * [[JW.ObservableSet]] event parameters.
 */
export interface SetEventParams<T extends IClass> {
	/**
	 * Event sender.
	 */
	sender: ObservableSet<T>;
}

/**
 * Parameters of [[JW.ObservableSet]]'s [[JW.ObservableSet.spliceEvent]].
 */
export interface SetSpliceEventParams<T extends IClass> extends SetEventParams<T> {
	/**
	 * Result of [[splice]] method.
	 */
	spliceResult: ISetSpliceResult<T>;
}

/**
 * Parameters of [[JW.ObservableSet]]'s [[JW.ObservableSet.clearEvent]].
 */
export interface SetItemsEventParams<T extends IClass> extends SetEventParams<T> {
	/**
	 * Old set contents.
	 */
	items: T[];
}
