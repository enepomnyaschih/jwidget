import MapLister from './MapLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import IMap from '../../IMap';
import IMapLister from './IMapLister';
import ISet from '../../ISet';
import ObservableMap from '../../ObservableMap';
import ObservableMapLister from './ObservableMapLister';
import ObservableSet from '../../ObservableSet';

export function createMapLister<T extends IClass>(source: IMap<T>, config: ICollectionListerConfig<T>): IMapLister<T> {
	return (source instanceof ObservableMap) ?
		new ObservableMapLister<T>(source, config) :
		new MapLister<T>(source, config);
}

export function mapToSet<T extends IClass>(source: IMap<T>): ISet<T> {
	if (!(source instanceof ObservableMap)) {
		return source.$toSet();
	}
	var result = new ObservableSet<T>();
	result.own(new ObservableMapLister<T>(source, {
		target: result
	}));
	return result;
}
