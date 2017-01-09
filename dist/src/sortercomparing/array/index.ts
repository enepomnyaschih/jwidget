import ArraySorterComparing from './ArraySorterComparing';
import IArray from '../../IArray';
import IArraySorterComparing from './IArraySorterComparing';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import ObservableArray from '../../ObservableArray';
import ObservableArraySorterComparing from './ObservableArraySorterComparing';

export function createArraySorterComparing<T>(source: IArray<T>, config: ICollectionSorterComparingConfig<T>): IArraySorterComparing<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArraySorterComparing<T>(source, config) :
		new ArraySorterComparing<T>(source, config);
}

export function sortArrayComparing<T>(source: IArray<T>, callback: (x: T, y: T) => number, scope?: any): IArray<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$toSortedComparing(callback, scope);
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableArraySorterComparing<T>(source, {
		target: result,
		compare: callback,
		scope: scope
	}));
	return result;
}
