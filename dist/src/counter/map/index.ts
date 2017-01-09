import MapCounter from './MapCounter';
import IMap from '../../IMap';
import IMapCounter from './IMapCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import ObservableMap from '../../ObservableMap';
import ObservableMapCounter from './ObservableMapCounter';
import Property from '../../Property';

export function createMapCounter<T>(source: IMap<T>, config: ICollectionCounterConfig<T>): IMapCounter<T> {
	return (source instanceof ObservableMap) ?
		new ObservableMapCounter<T>(source, config) :
		new MapCounter<T>(source, config);
}

export function countMap<T>(source: IMap<T>, callback: (item: T) => boolean, scope?: any): Property<number> {
	if (!(source instanceof ObservableMap)) {
		return source.$count(callback, scope);
	}
	var result = new Property(0);
	result.own(new ObservableMapCounter<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
