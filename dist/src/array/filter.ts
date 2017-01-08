import ArrayFilterer from '../filterer/ArrayFilterer';
import IArray from '../IArray';
import IArrayFilterer from '../filterer/IArrayFilterer';
import IArrayFiltererConfig from '../filterer/IArrayFiltererConfig';
import ObservableArray from '../ObservableArray';
import ObservableArrayFilterer from '../filterer/ObservableArrayFilterer';

export function createArrayFilterer<T>(source: IArray<T>, config: IArrayFiltererConfig<T>): IArrayFilterer<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayFilterer<T>(source, config) :
		new ArrayFilterer<T>(source, config);
}

export function filterArray<T>(source: IArray<T>, callback: (item: T) => boolean, scope?: any): IArray<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$filter(callback, scope);
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableArrayFilterer<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
