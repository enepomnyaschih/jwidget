import ArrayOrderer from './ArrayOrderer';
import IArray from '../../IArray';
import IArrayOrderer from './IArrayOrderer';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import ObservableArray from '../../ObservableArray';
import ObservableArrayOrderer from './ObservableArrayOrderer';

export function createArrayOrderer<T extends IClass>(source: IArray<T>, config: ICollectionOrdererConfig<T>): IArrayOrderer<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayOrderer<T>(source, config) :
		new ArrayOrderer<T>(source, config);
}

export function arrayToArray<T extends IClass>(source: IArray<T>): IArray<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$toArray();
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableArrayOrderer<T>(source, {
		target: result
	}));
	return result;
}
