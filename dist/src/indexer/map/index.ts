import MapIndexer from './MapIndexer';
import IMapIndexer from './IMapIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import IMap from '../../IMap';
import ObservableMap from '../../ObservableMap';
import ObservableMapIndexer from './ObservableMapIndexer';

export function createMapIndexer<T>(source: IMap<T>, config: ICollectionIndexerConfig<T>): IMapIndexer<T> {
	return (source instanceof ObservableMap) ?
		new ObservableMapIndexer<T>(source, config) :
		new MapIndexer<T>(source, config);
}

export function indexMap<T>(source: IMap<T>, callback: (item: T) => string, scope?: any): IMap<T> {
	if (!(source instanceof ObservableMap)) {
		return source.$index(callback, scope);
	}
	var result = new ObservableMap<T>();
	result.own(new ObservableMapIndexer<T>(source, {
		target: result,
		getKey: callback,
		scope: scope
	}));
	return result;
}
