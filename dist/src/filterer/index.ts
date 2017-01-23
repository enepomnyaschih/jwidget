import {createArrayFilterer, filterArray} from './array';
import {createMapFilterer, filterMap} from './map';
import {createSetFilterer, filterSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import ICollection from '../ICollection';
import ICollectionFilterer from './ICollectionFilterer';
import ICollectionFiltererConfig from './ICollectionFiltererConfig';

export function createFilterer<T>(source: ICollection<T>, config: ICollectionFiltererConfig<T>): ICollectionFilterer<T> {
	return (source instanceof AbstractArray) ? createArrayFilterer(source, config) :
		(source instanceof AbstractMap) ? createMapFilterer(source, config) :
		(source instanceof AbstractSet) ? createSetFilterer(source, config) : null;
}

export function filterCollection<T>(source: ICollection<T>, callback: (item: T) => boolean, scope?: any): ICollection<T> {
	return (source instanceof AbstractArray) ? filterArray(source, callback, scope) :
		(source instanceof AbstractMap) ? filterMap(source, callback, scope) :
		(source instanceof AbstractSet) ? filterSet(source, callback, scope) : null;
}
