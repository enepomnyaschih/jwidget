import {createArrayIndexer, indexArray} from './array';
import {createMapIndexer, indexMap} from './map';
import {createSetIndexer, indexSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import ICollection from '../ICollection';
import ICollectionIndexer from './ICollectionIndexer';
import ICollectionIndexerConfig from './ICollectionIndexerConfig';
import IMap from '../IMap';

export function createIndexer<T>(source: ICollection<T>, config: ICollectionIndexerConfig<T>): ICollectionIndexer<T> {
	return (source instanceof AbstractArray) ? createArrayIndexer(source, config) :
		(source instanceof AbstractMap) ? createMapIndexer(source, config) :
		(source instanceof AbstractSet) ? createSetIndexer(source, config) : null;
}

export function indexCollection<T>(source: ICollection<T>, callback: (item: T) => string, scope?: any): IMap<T> {
	return (source instanceof AbstractArray) ? indexArray(source, callback, scope) :
		(source instanceof AbstractMap) ? indexMap(source, callback, scope) :
		(source instanceof AbstractSet) ? indexSet(source, callback, scope) : null;
}
