import ArrayCounter from '../counter/ArrayCounter';
import IArray from '../IArray';
import IArrayCounter from '../counter/IArrayCounter';
import ICollectionCounterConfig from '../counter/ICollectionCounterConfig';
import ObservableArray from '../ObservableArray';
import ObservableArrayCounter from '../counter/ObservableArrayCounter';
import Property from '../Property';

export function createArrayCounter<T>(source: IArray<T>, config: ICollectionCounterConfig<T>): IArrayCounter<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayCounter<T>(source, config) :
		new ArrayCounter<T>(source, config);
}

export function countArray<T>(source: IArray<T>, callback: (item: T) => boolean, scope?: any): Property<number> {
	if (!(source instanceof ObservableArray)) {
		return source.$count(callback, scope);
	}
	var result = new Property(0);
	result.own(new ObservableArrayCounter<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
