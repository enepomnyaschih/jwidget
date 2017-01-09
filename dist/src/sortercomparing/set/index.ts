import IArray from '../../IArray';
import IClass from '../../IClass';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import ISet from '../../ISet';
import ISetSorterComparing from './ISetSorterComparing';
import ObservableArray from '../../ObservableArray';
import ObservableSet from '../../ObservableSet';
import ObservableSetSorterComparing from './ObservableSetSorterComparing';
import SetSorterComparing from './SetSorterComparing';

export function createSetSorterComparing<T extends IClass>(source: ISet<T>, config: ICollectionSorterComparingConfig<T>): ISetSorterComparing<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetSorterComparing<T>(source, config) :
		new SetSorterComparing<T>(source, config);
}

export function sortSetComparing<T extends IClass>(source: ISet<T>, callback: (x: T, y: T) => number, scope?: any): IArray<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$toSortedComparing(callback, scope);
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableSetSorterComparing<T>(source, {
		target: result,
		compare: callback,
		scope: scope
	}));
	return result;
}
