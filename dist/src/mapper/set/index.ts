import {destroy} from '../../Core';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetMapper from './ISetMapper';
import ISetMapperConfig from './ISetMapperConfig';
import ObservableSet from '../../ObservableSet';
import ObservableSetMapper from './ObservableSetMapper';
import SetMapper from './SetMapper';

export function createSetMapper<T extends IClass, U extends IClass>(source: ISet<T>, config: ISetMapperConfig<T, U>): ISetMapper<T, U> {
	return (source instanceof ObservableSet) ?
		new ObservableSetMapper<T, U>(source, config) :
		new SetMapper<T, U>(source, config);
}

export function mapSet<T extends IClass, U extends IClass>(source: ISet<T>, callback: (item: T) => U, scope?: any): ISet<U> {
	if (!(source instanceof ObservableSet)) {
		return source.$map(callback, scope);
	}
	var result = new ObservableSet<U>();
	result.own(new ObservableSetMapper<T, U>(source, {
		target: result,
		createItem: callback,
		scope: scope
	}));
	return result;
}

export function mapDestroyableSet<T extends IClass, U extends IClass>(source: ISet<T>, callback: (item: T) => U, scope?: any): ISet<U> {
	if (!(source instanceof ObservableSet)) {
		return source.$map(callback, scope).ownItems();
	}
	var result = new ObservableSet<U>();
	result.own(new ObservableSetMapper<T, U>(source, {
		target: result,
		createItem: callback,
		destroyItem: destroy,
		scope: scope
	}));
	return result;
}
