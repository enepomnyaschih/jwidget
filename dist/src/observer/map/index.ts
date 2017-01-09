import ICollectionObserverConfig from '../ICollectionObserverConfig';
import IMap from '../../IMap';
import IMapObserver from './IMapObserver';
import MapObserver from './MapObserver';
import ObservableMap from '../../ObservableMap';
import ObservableMapObserver from './ObservableMapObserver';

export function createMapObserver<T>(source: IMap<T>, config: ICollectionObserverConfig<T>): IMapObserver<T> {
	return (source instanceof ObservableMap) ?
		new ObservableMapObserver<T>(source, config) :
		new MapObserver<T>(source, config);
}
