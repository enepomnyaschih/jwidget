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

import AbstractMap from './AbstractMap';
import {CollectionFlags, SILENT, ADAPTER} from './Core';
import Dictionary from './Dictionary';
import IArray from './IArray';
import IMap from './IMap';
import ISet from './ISet';
import List from './List';
import JWSet from './JWSet';

/**
 * Simple implementation of [[JW.AbstractMap]].
 *
 * @param T Collection item type.
 */
export default class JWMap<T> extends AbstractMap<T> {
	/**
	 * @inheritdoc
	 */
	constructor(silent?: boolean);
	constructor(json: Dictionary<T>, flags: CollectionFlags);
	constructor(a?: any, b?: CollectionFlags) {
		super(a, b);
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IArray<string> {
		return new List<string>(this.getKeys(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<T> {
		return new List<T>(this.toSorted(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<T> {
		return new List<T>(this.toSortedComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<string> {
		return new List<string>(this.getSortingKeys(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<string> {
		return new List<string>(this.getSortingKeysComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T> {
		return new JWMap<T>(this.filter(callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, key: string) => U, scope?: any): IMap<U> {
		return new JWMap<U>(this.map(callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: string) => string, scope?: any): IMap<T> {
		return new JWMap<T>(this.index(callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toArray(): IArray<T> {
		return new List<T>(this.toArray(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$asArray(): IArray<T> {
		return new List<T>(this.asArray(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toMap(): IMap<T> {
		return new JWMap<T>(this.toMap(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T> {
		return new JWMap<T>(this.asMap(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<any> {
		return new JWSet<any>(this.toSet(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<any> {
		return new JWSet<any>(this.asSet(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$removeAllVerbose(keys: string[]): IMap<T> {
		return new JWMap<T>(this.removeAllVerbose(keys), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IMap<T> {
		return new JWMap<T>(this.clear(), SILENT | ADAPTER);
	}
}
