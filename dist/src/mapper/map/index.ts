import {destroy} from '../../Core';
import Destroyable from '../../Destroyable';
import IMap from '../../IMap';
import IMapMapper from './IMapMapper';
import IMapMapperConfig from './IMapMapperConfig';
import MapMapper from './MapMapper';
import ObservableMap from '../../ObservableMap';
import ObservableMapMapper from './ObservableMapMapper';

export function createMapMapper<T, U>(source: IMap<T>, config: IMapMapperConfig<T, U>): IMapMapper<T, U> {
	return (source instanceof ObservableMap) ?
		new ObservableMapMapper<T, U>(source, config) :
		new MapMapper<T, U>(source, config);
}

export function mapMap<T, U>(source: IMap<T>, callback: (item: T) => U, scope?: any): IMap<U> {
	if (!(source instanceof ObservableMap)) {
		return source.$map(callback, scope);
	}
	var result = new ObservableMap<U>();
	result.own(new ObservableMapMapper<T, U>(source, {
		target: result,
		createItem: callback,
		scope: scope
	}));
	return result;
}

export function mapDestroyableMap<T, U extends Destroyable>(source: IMap<T>, callback: (item: T) => U, scope?: any): IMap<U> {
	if (!(source instanceof ObservableMap)) {
		return source.$map(callback, scope).ownItems();
	}
	var result = new ObservableMap<U>();
	result.own(new ObservableMapMapper<T, U>(source, {
		target: result,
		createItem: callback,
		destroyItem: destroy,
		scope: scope
	}));
	return result;
}
