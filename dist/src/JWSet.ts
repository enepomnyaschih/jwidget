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

import AbstractSet from './AbstractSet';
import {CollectionFlags, SILENT, ADAPTER} from './Core';
import Dictionary from './Dictionary';
import IArray from './IArray';
import IClass from './IClass';
import IMap from './IMap';
import ISet from './ISet';
import List from './List';
import Map from './Map';

/**
 * Simple implementation of [[JW.AbstractSet]].
 *
 * @param T Collection item type.
 */
export default class JWSet<T extends IClass> extends AbstractSet<T> {
	constructor(silent?: boolean);
	constructor(items: T[], silent?: boolean);
	constructor(json: Dictionary<T>, flags?: CollectionFlags);
	constructor(a?: any, b?: any) {
		super(a, b);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T) => boolean, scope?: any): ISet<T> {
		return new JWSet<T>(this.filter(callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$map<U extends IClass>(callback: (item: T) => U, scope?: any): ISet<U> {
		return new JWSet<U>(this.map(callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T) => any, scope?: any, order?: number): IArray<T> {
		return new List<T>(this.toSorted(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IArray<T> {
		return new List<T>(this.toSortedComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), SILENT | ADAPTER);
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
	$toSet(): ISet<T> {
		return new JWSet<T>(this.toSet(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$addAll(items: T[]): IArray<T> {
		return new List<T>(this.addAll(items), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$removeAll(items: T[]): IArray<T> {
		return new List<T>(this.removeAll(items), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IArray<T> {
		return new List<T>(this.clear(), SILENT | ADAPTER);
	}
}
