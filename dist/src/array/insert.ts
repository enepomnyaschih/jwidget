import ArrayInserter from '../inserter/ArrayInserter';
import IArray from '../IArray';
import IArrayInserter from '../inserter/IArrayInserter';
import IArrayInserterConfig from '../inserter/IArrayInserterConfig';
import ObservableArray from '../ObservableArray';
import ObservableArrayInserter from '../inserter/ObservableArrayInserter';

export function createArrayInserter<T>(source: IArray<T>, config: IArrayInserterConfig<T>): IArrayInserter {
	return (source instanceof ObservableArray) ?
		new ObservableArrayInserter<T>(source, config) :
		new ArrayInserter<T>(source, config);
}
