import SetCounter from './SetCounter';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetCounter from './ISetCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import ObservableSet from '../../ObservableSet';
import ObservableSetCounter from './ObservableSetCounter';
import Property from '../../Property';

export function createSetCounter<T extends IClass>(source: ISet<T>, config: ICollectionCounterConfig<T>): ISetCounter<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetCounter<T>(source, config) :
		new SetCounter<T>(source, config);
}

export function countSet<T extends IClass>(source: ISet<T>, callback: (item: T) => boolean, scope?: any): Property<number> {
	if (!(source instanceof ObservableSet)) {
		return source.$count(callback, scope);
	}
	var result = new Property(0);
	result.own(new ObservableSetCounter<T>(source, {
		target: result,
		filterItem: callback,
		scope: scope
	}));
	return result;
}
