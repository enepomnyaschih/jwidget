import {createArrayLister, arrayToSet} from './array';
import {createMapLister, mapToSet} from './map';
import {createSetLister, setToSet} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import IClass from '../IClass';
import ICollection from '../ICollection';
import ICollectionLister from './ICollectionLister';
import ICollectionListerConfig from './ICollectionListerConfig';
import ISet from '../ISet';

export function createLister<T extends IClass>(source: ICollection<T>, config: ICollectionListerConfig<T>): ICollectionLister<T> {
	return (source instanceof AbstractArray) ? createArrayLister(source, config) :
		(source instanceof AbstractMap) ? createMapLister(source, config) :
		(source instanceof AbstractSet) ? createSetLister(source, config) : null;
}

export function collectionToSet<T extends IClass>(source: ICollection<T>): ISet<T> {
	return (source instanceof AbstractArray) ? arrayToSet(source) :
		(source instanceof AbstractMap) ? mapToSet(source) :
		(source instanceof AbstractSet) ? setToSet(source) : null;
}
