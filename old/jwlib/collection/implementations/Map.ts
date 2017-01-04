import {Dictionary} from '../../core/Core';
import {IClass} from '../../core/IClass';
import {AbstractMap} from '../abstracts/AbstractMap';
import {IMap} from '../interfaces/IMap';
import {Array} from './Array';
import {IArray} from '../interfaces/IArray';
import {Set} from './Set';
import {ISet} from '../interfaces/ISet';

/**
 * Simple implementation of [[JW.AbstractMap]].
 *
 * @param T Collection item type.
 */
export class Map<T> extends AbstractMap<T> {
	/**
	 * @inheritdoc
	 */
	constructor(items?: Dictionary<T>, adapter?: boolean) {
		super(items, adapter);
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): Map<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IArray<string> {
		return new Array<string>(this.getKeys(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<string> {
		return new Array<string>(this.getSortingKeys(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<string> {
		return new Array<string>(this.getSortingKeysComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T> {
		return new Map<T>(this.filter(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, key: string) => U, scope?: any): IMap<U> {
		return new Map<U>(this.map(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: string) => string, scope?: any): IMap<T> {
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
	$toMap(): IMap<T> {
		return new Map<T>(this.toMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T> {
		return new Map<T>(this.asMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<any> {
		return new Set<any>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<any> {
		return new Set<any>(this.asSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$removeAllVerbose(keys: string[]): IMap<T> {
		return new Map<T>(this.removeAllVerbose(keys), true);
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IMap<T> {
		return new Map<T>(this.clear(), true);
	}

	/**
	 * @inheritdoc
	 */
	createEmpty<U>(): Map<U> {
		return new Map<U>();
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
