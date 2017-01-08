import ArrayLister from '../lister/ArrayLister';
import IArray from '../IArray';
import IArrayLister from '../lister/IArrayLister';
import IClass from '../IClass';
import ICollectionListerConfig from '../lister/ICollectionListerConfig';
import ISet from '../ISet';
import ObservableArray from '../ObservableArray';
import ObservableArrayLister from '../lister/ObservableArrayLister';
import ObservableSet from '../ObservableSet';

export function createArrayLister<T extends IClass>(source: IArray<T>, config: ICollectionListerConfig<T>): IArrayLister<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayLister<T>(source, config) :
		new ArrayLister<T>(source, config);
}

export function convertArrayToSet<T extends IClass>(source: IArray<T>): ISet<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$toSet();
	}
	var result = new ObservableSet<T>();
	result.own(new ObservableArrayLister<T>(source, {
		target: result
	}));
	return result;
}
