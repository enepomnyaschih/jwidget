import {createArrayCounter, countArray} from './array';
import {createMapCounter, countMap} from './map';
import {createSetCounter, countSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import ICollection from '../ICollection';
import ICollectionCounter from './ICollectionCounter';
import ICollectionCounterConfig from './ICollectionCounterConfig';
import Property from '../Property';

export function createCounter<T>(source: ICollection<T>, config: ICollectionCounterConfig<T>): ICollectionCounter<T> {
	return (source instanceof AbstractArray) ? createArrayCounter(source, config) :
		(source instanceof AbstractMap) ? createMapCounter(source, config) :
		(source instanceof AbstractSet) ? createSetCounter(source, config) : null;
}

export function countCollection<T>(source: ICollection<T>, callback: (item: T) => boolean, scope?: any): Property<number> {
	return (source instanceof AbstractArray) ? countArray(source, callback, scope) :
		(source instanceof AbstractMap) ? countMap(source, callback, scope) :
		(source instanceof AbstractSet) ? countSet(source, callback, scope) : null;
}
