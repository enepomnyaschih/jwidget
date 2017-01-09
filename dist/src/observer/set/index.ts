import IClass from '../../IClass';
import ICollectionObserverConfig from '../ICollectionObserverConfig';
import ISet from '../../ISet';
import ISetObserver from './ISetObserver';
import SetObserver from './SetObserver';
import ObservableSet from '../../ObservableSet';
import ObservableSetObserver from './ObservableSetObserver';

export function createSetObserver<T extends IClass>(source: ISet<T>, config: ICollectionObserverConfig<T>): ISetObserver<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetObserver<T>(source, config) :
		new SetObserver<T>(source, config);
}
