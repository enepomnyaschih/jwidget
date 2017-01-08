import AbstractMap from './AbstractMap';
import Dictionary from './Dictionary';
import IArray from './IArray';
import IClass from './IClass';
import IMap from './IMap';
import ISet from './ISet';
import JWArray from './JWArray';
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
	constructor(items?: Dictionary<T>, adapter?: boolean) {
		super(items, adapter);
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): JWMap<T> {
		super.ownItems();
		return this;
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
	$removeAllVerbose(keys: string[]): IMap<T> {
		return new JWMap<T>(this.removeAllVerbose(keys), true);
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
	createEmpty<U>(): JWMap<U> {
		return new JWMap<U>();
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
