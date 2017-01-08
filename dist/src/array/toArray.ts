import ArrayOrderer from '../orderer/ArrayOrderer';
import IArray from '../IArray';
import IArrayOrderer from '../orderer/IArrayOrderer';
import IClass from '../IClass';
import ICollectionOrdererConfig from '../orderer/ICollectionOrdererConfig';
import ObservableArray from '../ObservableArray';
import ObservableArrayOrderer from '../orderer/ObservableArrayOrderer';

export function createArrayOrderer<T extends IClass>(source: IArray<T>, config: ICollectionOrdererConfig<T>): IArrayOrderer<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayOrderer<T>(source, config) :
		new ArrayOrderer<T>(source, config);
}

export function convertArrayToArray<T extends IClass>(source: IArray<T>): IArray<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$toArray();
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableArrayOrderer<T>(source, {
		target: result
	}));
	return result;
}
