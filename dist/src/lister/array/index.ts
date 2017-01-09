import ArrayLister from './ArrayLister';
import IArray from '../../IArray';
import IArrayLister from './IArrayLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import ISet from '../../ISet';
import ObservableArray from '../../ObservableArray';
import ObservableArrayLister from './ObservableArrayLister';
import ObservableSet from '../../ObservableSet';

export function createArrayLister<T extends IClass>(source: IArray<T>, config: ICollectionListerConfig<T>): IArrayLister<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayLister<T>(source, config) :
		new ArrayLister<T>(source, config);
}

export function arrayToSet<T extends IClass>(source: IArray<T>): ISet<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$toSet();
	}
	var result = new ObservableSet<T>();
	result.own(new ObservableArrayLister<T>(source, {
		target: result
	}));
	return result;
}
