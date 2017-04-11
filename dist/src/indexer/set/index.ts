import SetIndexer from './SetIndexer';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetIndexer from './ISetIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import IMap from '../../IMap';
import ObservableSet from '../../ObservableSet';
import ObservableSetIndexer from './ObservableSetIndexer';
import ObservableMap from '../../ObservableMap';

export function createSetIndexer<T extends IClass>(source: ISet<T>, config: ICollectionIndexerConfig<T>): ISetIndexer<T> {
	return (source instanceof ObservableSet) ?
		new ObservableSetIndexer<T>(source, config) :
		new SetIndexer<T>(source, config);
}

export function indexSet<T extends IClass>(source: ISet<T>, callback: (item: T) => any, scope?: any): IMap<T> {
	if (!(source instanceof ObservableSet)) {
		return source.$index(callback, scope);
	}
	var result = new ObservableMap<T>();
	result.own(new ObservableSetIndexer<T>(source, {
		target: result,
		getKey: callback,
		scope: scope
	}));
	return result;
}
