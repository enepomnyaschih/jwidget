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
import Dictionary from './Dictionary';
import IArray from './IArray';
import IClass from './IClass';
import IMap from './IMap';
import ISet from './ISet';
import JWArray from './JWArray';
import JWMap from './JWMap';

/**
 * Simple implementation of [[JW.AbstractSet]].
 *
 * @param T Collection item type.
 */
export default class JWSet<T extends IClass> extends AbstractSet<T> {
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
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): JWSet<T> {
		super.ownItems();
		return this;
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
	createEmpty<U extends IClass>(): JWSet<U> {
		return new JWSet<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyArray<U>(): JWArray<U> {
		return new JWArray<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyMap<U>(): JWMap<U> {
		return new JWMap<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptySet<U extends IClass>(): JWSet<U> {
		return new JWSet<U>();
	}
}
