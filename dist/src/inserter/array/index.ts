import ArrayInserter from './ArrayInserter';
import IArray from '../../IArray';
import IArrayInserter from './IArrayInserter';
import IArrayInserterConfig from './IArrayInserterConfig';
import ObservableArray from '../../ObservableArray';
import ObservableArrayInserter from './ObservableArrayInserter';

export function createArrayInserter<T>(source: IArray<T>, config: IArrayInserterConfig<T>): IArrayInserter {
	return (source instanceof ObservableArray) ?
		new ObservableArrayInserter<T>(source, config) :
		new ArrayInserter<T>(source, config);
}
