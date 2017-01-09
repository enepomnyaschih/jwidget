import ArrayIndexer from './ArrayIndexer';
import IArray from '../../IArray';
import IArrayIndexer from './IArrayIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import IMap from '../../IMap';
import ObservableArray from '../../ObservableArray';
import ObservableArrayIndexer from './ObservableArrayIndexer';
import ObservableMap from '../../ObservableMap';

export function createArrayIndexer<T>(source: IArray<T>, config: ICollectionIndexerConfig<T>): IArrayIndexer<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayIndexer<T>(source, config) :
		new ArrayIndexer<T>(source, config);
}

export function indexArray<T>(source: IArray<T>, callback: (item: T) => string, scope?: any): IMap<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$index(callback, scope);
	}
	var result = new ObservableMap<T>();
	result.own(new ObservableArrayIndexer<T>(source, {
		target: result,
		getKey: callback,
		scope: scope
	}));
	return result;
}
