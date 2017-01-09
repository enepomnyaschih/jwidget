import ArrayReverser from './ArrayReverser';
import IArray from '../../IArray';
import IArrayReverser from './IArrayReverser';
import IArrayReverserConfig from './IArrayReverserConfig';
import ObservableArray from '../../ObservableArray';
import ObservableArrayReverser from './ObservableArrayReverser';

export function createArrayReverser<T>(source: IArray<T>, config: IArrayReverserConfig<T>): IArrayReverser<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayReverser<T>(source, config) :
		new ArrayReverser<T>(source, config);
}

export function reverseArray<T>(source: IArray<T>): IArray<T> {
	if (!(source instanceof ObservableArray)) {
		return source.$toReversed();
	}
	var result = new ObservableArray<T>();
	result.own(new ObservableArrayReverser<T>(source, {
		target: result
	}));
	return result;
}
