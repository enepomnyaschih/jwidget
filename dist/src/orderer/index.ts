import {createArrayOrderer, arrayToArray} from './array';
import {createMapOrderer, mapToArray} from './map';
import {createSetOrderer, setToArray} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionOrderer from './ICollectionOrderer';
import ICollectionOrdererConfig from './ICollectionOrdererConfig';
import IArray from '../IArray';

export function createOrderer<T extends IClass>(source: ICollection<T>, config: ICollectionOrdererConfig<T>): ICollectionOrderer<T> {
	return (source instanceof AbstractArray) ? createArrayOrderer(source, config) :
		(source instanceof AbstractMap) ? createMapOrderer(source, config) :
		(source instanceof AbstractSet) ? createSetOrderer(source, config) : null;
}

export function collectionToArray<T extends IClass>(source: ICollection<T>): IArray<T> {
	return (source instanceof AbstractArray) ? arrayToArray(source) :
		(source instanceof AbstractMap) ? mapToArray(source) :
		(source instanceof AbstractSet) ? setToArray(source) : null;
}
