import SetLister from './SetLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import ISet from '../../ISet';
import ISetLister from './ISetLister';
import ObservableSet from '../../ObservableSet';
import ObservableSetLister from './ObservableSetLister';

export function createSetLister<T extends IClass>(source: ISet<T>, config: ICollectionListerConfig<T>): ISetLister<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetLister<T>(source, config) :
		new SetLister<T>(source, config);
}

export function setToSet<T extends IClass>(source: ISet<T>): ISet<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$toSet();
	}
	var result = new ObservableSet<T>();
	result.own(new ObservableSetLister<T>(source, {
		target: result
	}));
	return result;
}
