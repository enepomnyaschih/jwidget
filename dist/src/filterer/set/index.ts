import SetFilterer from './SetFilterer';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetFilterer from './ISetFilterer';
import ISetFiltererConfig from './ISetFiltererConfig';
import ObservableSet from '../../ObservableSet';
import ObservableSetFilterer from './ObservableSetFilterer';

export function createSetFilterer<T extends IClass>(source: ISet<T>, config: ISetFiltererConfig<T>): ISetFilterer<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetFilterer<T>(source, config) :
		new SetFilterer<T>(source, config);
}

export function filterSet<T extends IClass>(source: ISet<T>, callback: (item: T) => boolean, scope?: any): ISet<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$filter(callback, scope);
	}
	var result = new ObservableSet<T>();
	result.own(new ObservableSetFilterer<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
