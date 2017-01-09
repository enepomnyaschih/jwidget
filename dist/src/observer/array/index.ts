import ArrayObserver from './ArrayObserver';
import IArray from '../../IArray';
import IArrayObserver from './IArrayObserver';
import ICollectionObserverConfig from '../ICollectionObserverConfig';
import ObservableArray from '../../ObservableArray';
import ObservableArrayObserver from './ObservableArrayObserver';

export function createArrayObserver<T>(source: IArray<T>, config: ICollectionObserverConfig<T>): IArrayObserver<T> {
	return (source instanceof ObservableArray) ?
		new ObservableArrayObserver<T>(source, config) :
		new ArrayObserver<T>(source, config);
}
