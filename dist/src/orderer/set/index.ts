import IArray from '../../IArray';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import ISet from '../../ISet';
import ISetOrderer from './ISetOrderer';
import ObservableArray from '../../ObservableArray';
import ObservableSet from '../../ObservableSet';
import ObservableSetOrderer from './ObservableSetOrderer';
import SetOrderer from './SetOrderer';

export function createSetOrderer<T extends IClass>(source: ISet<T>, config: ICollectionOrdererConfig<T>): ISetOrderer<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetOrderer<T>(source, config) :
		new SetOrderer<T>(source, config);
}

export function setToArray<T extends IClass>(source: ISet<T>): IArray<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$toArray();
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableSetOrderer<T>(source, {
		target: result
	}));
	return result;
}
