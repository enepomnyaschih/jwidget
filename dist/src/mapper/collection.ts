import {createArrayMapper, mapArray} from './array';
import {createMapMapper, mapMap} from './map';
import {createSetMapper, mapSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionMapper from './ICollectionMapper';
import ICollectionMapperConfig from './ICollectionMapperConfig';

export function createMapper<T extends IClass, U extends IClass>(source: ICollection<T>, config: ICollectionMapperConfig<T, U>): ICollectionMapper<T, U> {
	return (source instanceof AbstractArray) ? createArrayMapper(source, config) :
		(source instanceof AbstractMap) ? createMapMapper(source, config) :
		(source instanceof AbstractSet) ? createSetMapper(source, config) : null;
}

export function mapCollection<T extends IClass, U extends IClass>(source: ICollection<T>, callback: (item: T) => U, scope?: any): ICollection<U> {
	return (source instanceof AbstractArray) ? mapArray(source, callback, scope) :
		(source instanceof AbstractMap) ? mapMap(source, callback, scope) :
		(source instanceof AbstractSet) ? mapSet(source, callback, scope) : null;
}
