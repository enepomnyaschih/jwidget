import {createArrayObserver} from './array';
import {createMapObserver} from './map';
import {createSetObserver} from './set';
import AbstractArray from '../AbstractArray';
import AbstractMap from '../AbstractMap';
import AbstractSet from '../AbstractSet';
import ICollection from '../ICollection';
import ICollectionObserver from './ICollectionObserver';
import ICollectionObserverConfig from './ICollectionObserverConfig';

export function createObserver<T>(source: ICollection<T>, config: ICollectionObserverConfig<T>): ICollectionObserver {
	return (source instanceof AbstractArray) ? createArrayObserver(source, config) :
		(source instanceof AbstractMap) ? createMapObserver(source, config) :
		(source instanceof AbstractSet) ? createSetObserver(source, config) : null;
}
}
