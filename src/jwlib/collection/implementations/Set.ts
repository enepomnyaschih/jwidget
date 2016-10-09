import {Dictionary} from '../../core/Core';
import {IClass} from '../../core/IClass';
import {AbstractSet} from '../abstracts/AbstractSet';
import {ISet} from '../interfaces/ISet';
import {Array} from './Array';
import {IArray} from '../interfaces/IArray';
import {Map} from './Map';
import {IMap} from '../interfaces/IMap';

/**
 * Simple implementation of [[JW.AbstractSet]].
 *
 * @param T Collection item type.
 */
export class Set<T extends IClass> extends AbstractSet<T> {
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
	constructor(items?, adapter?: boolean) {
		super(items, adapter);
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): Set<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T) => boolean, scope?: any): ISet<T> {
		return new Set<T>(this.filter(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U extends IClass>(callback: (item: T) => U, scope?: any): ISet<U> {
		return new Set<U>(this.map(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T) => any, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$toArray(): IArray<T> {
		return new Array<T>(this.toArray(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asArray(): IArray<T> {
		return new Array<T>(this.asArray(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<T> {
		return new Set<T>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$addAll(items: T[]): IArray<T> {
		return new Array<T>(this.addAll(items), true);
	}

	/**
	 * @inheritdoc
	 */
	$removeAll(items: T[]): IArray<T> {
		return new Array<T>(this.removeAll(items), true);
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IArray<T> {
		return new Array<T>(this.clear(), true);
	}

	/**
	 * @inheritdoc
	 */
	createEmpty<U extends IClass>(): Set<U> {
		return new Set<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyArray<U>(): Array<U> {
		return new Array<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyMap<U>(): Map<U> {
		return new Map<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptySet<U extends IClass>(): Set<U> {
		return new Set<U>();
	}
}
