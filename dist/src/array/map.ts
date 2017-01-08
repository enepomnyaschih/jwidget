import {destroy} from '../Core';
import ArrayMapper from '../mapper/ArrayMapper';
import Destroyable from '../Destroyable';
import IArray from '../IArray';
import IArrayMapper from '../mapper/IArrayMapper';
import IArrayMapperConfig from '../mapper/IArrayMapperConfig';
import ObservableArray from '../ObservableArray';
import ObservableArrayMapper from '../mapper/ObservableArrayMapper';

export function createArrayMapper<T, U>(source: IArray<T>, config: IArrayMapperConfig<T, U>): IArrayMapper<T, U> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayMapper<T, U>(source, config) :
		new ArrayMapper<T, U>(source, config);
}

export function mapArray<T, U>(source: IArray<T>, callback: (item: T) => U, scope?: any): IArray<U> {
	if (!(source instanceof ObservableArray)) {
		return source.$map(callback, scope);
	}
	var result = new ObservableArray<U>();
	result.own(new ObservableArrayMapper<T, U>(source, {
		target: result,
		createItem: callback,
		scope: scope
	}));
	return result;
}

export function mapDestroyableArray<T, U extends Destroyable>(source: IArray<T>, callback: (item: T) => U, scope?: any): IArray<U> {
	if (!(source instanceof ObservableArray)) {
		return source.$map(callback, scope).ownItems();
	}
	var result = new ObservableArray<U>();
	result.own(new ObservableArrayMapper<T, U>(source, {
		target: result,
		createItem: callback,
		destroyItem: destroy,
		scope: scope
	}));
	return result;
}
