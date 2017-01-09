import IArray from '../../IArray';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import IMap from '../../IMap';
import IMapSorterComparing from './IMapSorterComparing';
import MapSorterComparing from './MapSorterComparing';
import ObservableArray from '../../ObservableArray';
import ObservableMap from '../../ObservableMap';
import ObservableMapSorterComparing from './ObservableMapSorterComparing';

export function createMapSorterComparing<T>(source: IMap<T>, config: ICollectionSorterComparingConfig<T>): IMapSorterComparing<T> {
	return (source instanceof ObservableMap) ?
		new ObservableMapSorterComparing<T>(source, config) :
		new MapSorterComparing<T>(source, config);
}

export function sortMapComparing<T>(source: IMap<T>, callback: (x: T, y: T) => number, scope?: any): IArray<T> {
	if (!(source instanceof ObservableMap)) {
		return source.$toSortedComparing(callback, scope);
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableMapSorterComparing<T>(source, {
		target: result,
		compare: callback,
		scope: scope
	}));
	return result;
}
