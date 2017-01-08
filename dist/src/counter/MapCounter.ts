import AbstractCollectionCounter from './AbstractCollectionCounter';
import ICollectionCounterConfig from './ICollectionCounterConfig';
import IMap from '../IMap';
import IMapCounter from './IMapCounter';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Map]].
 */
export default class MapCounter<T> extends AbstractCollectionCounter<T> implements IMapCounter<T> {
	/**
	 * @inheritdoc
	 */
	public source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
	}
}
