import MapFilterer from './MapFilterer';
import IMap from '../../IMap';
import IMapFilterer from './IMapFilterer';
import IMapFiltererConfig from './IMapFiltererConfig';
import ObservableMap from '../../ObservableMap';
import ObservableMapFilterer from './ObservableMapFilterer';

export function createMapFilterer<T>(source: IMap<T>, config: IMapFiltererConfig<T>): IMapFilterer<T> {
	return (source instanceof ObservableMap) ?
		new ObservableMapFilterer<T>(source, config) :
		new MapFilterer<T>(source, config);
}

export function filterMap<T>(source: IMap<T>, callback: (item: T) => boolean, scope?: any): IMap<T> {
	if (!(source instanceof ObservableMap)) {
		return source.$filter(callback, scope);
	}
	var result = new ObservableMap<T>();
	result.own(new ObservableMapFilterer<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
