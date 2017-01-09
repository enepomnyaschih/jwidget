import MapInserter from './MapInserter';
import IMap from '../../IMap';
import IMapInserter from './IMapInserter';
import IMapInserterConfig from './IMapInserterConfig';
import ObservableMap from '../../ObservableMap';
import ObservableMapInserter from './ObservableMapInserter';

export function createMapInserter<T>(source: IMap<T>, config: IMapInserterConfig<T>): IMapInserter {
	return (source instanceof ObservableMap) ?
		new ObservableMapInserter<T>(source, config) :
		new MapInserter<T>(source, config);
}
