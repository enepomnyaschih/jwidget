import ICollectionSorterComparing from '../ICollectionSorterComparing';
import IMap from '../../IMap';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Map]].
 */
interface IMapSorterComparing<T> extends ICollectionSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

export default IMapSorterComparing;
