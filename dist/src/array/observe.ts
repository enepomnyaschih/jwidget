import ArrayObserver from '../observer/ArrayObserver';
import IArray from '../IArray';
import IArrayObserver from '../observer/IArrayObserver';
import ICollectionObserverConfig from '../observer/ICollectionObserverConfig';
import ObservableArray from '../ObservableArray';
import ObservableArrayObserver from '../observer/ObservableArrayObserver';

export function createArrayObserver<T>(source: IArray<T>, config: ICollectionObserverConfig<T>): IArrayObserver<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayObserver<T>(source, config) :
		new ArrayObserver<T>(source, config);
}
