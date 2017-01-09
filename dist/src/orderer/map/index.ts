import IArray from '../../IArray';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import IMap from '../../IMap';
import IMapOrderer from './IMapOrderer';
import MapOrderer from './MapOrderer';
import ObservableArray from '../../ObservableArray';
import ObservableMap from '../../ObservableMap';
import ObservableMapOrderer from './ObservableMapOrderer';

export function createMapOrderer<T extends IClass>(source: IMap<T>, config: ICollectionOrdererConfig<T>): IMapOrderer<T> {
	return (source instanceof ObservableMap) ?
		new ObservableMapOrderer<T>(source, config) :
		new MapOrderer<T>(source, config);
}

export function mapToArray<T extends IClass>(source: IMap<T>): IArray<T> {
	if (!(source instanceof ObservableMap)) {
		return source.$toArray();
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableMapOrderer<T>(source, {
		target: result
	}));
	return result;
}
