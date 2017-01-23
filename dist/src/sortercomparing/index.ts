import {createArraySorterComparing, sortArrayComparing} from './array';
import {createMapSorterComparing, sortMapComparing} from './map';
import {createSetSorterComparing, sortSetComparing} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import ICollection from '../ICollection';
import ICollectionSorterComparing from './ICollectionSorterComparing';
import ICollectionSorterComparingConfig from './ICollectionSorterComparingConfig';
import IArray from '../IArray';

export function createSorterComparing<T>(source: ICollection<T>, config: ICollectionSorterComparingConfig<T>): ICollectionSorterComparing<T> {
	return (source instanceof AbstractArray) ? createArraySorterComparing(source, config) :
		(source instanceof AbstractMap) ? createMapSorterComparing(source, config) :
		(source instanceof AbstractSet) ? createSetSorterComparing(source, config) : null;
}

export function collectionToArray<T>(source: ICollection<T>, callback: (x: T, y: T) => number, scope?: any): IArray<T> {
	return (source instanceof AbstractArray) ? sortArrayComparing(source, callback, scope) :
		(source instanceof AbstractMap) ? sortMapComparing(source, callback, scope) :
		(source instanceof AbstractSet) ? sortSetComparing(source, callback, scope) : null;
}
