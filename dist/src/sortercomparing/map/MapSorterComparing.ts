import AbstractCollectionSorterComparing from '../AbstractCollectionSorterComparing';
import ICollectionSorterComparingConfig from '../ICollectionSorterComparingConfig';
import IMap from '../../IMap';
import IMapSorterComparing from './IMapSorterComparing';

/**
 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Map]].
 */
export default class MapSorterComparing<T> extends AbstractCollectionSorterComparing<T> implements IMapSorterComparing<T> {
	/**
	 * @inheritdoc
	 */
	public source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionSorterComparingConfig<T>) {
		super(source, config);
	}
}
