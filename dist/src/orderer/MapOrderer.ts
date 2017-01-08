import AbstractCollectionOrderer from './AbstractCollectionOrderer';
import IClass from '../IClass';
import ICollectionOrdererConfig from './ICollectionOrdererConfig';
import IMap from '../IMap';
import IMapOrderer from './IMapOrderer';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Map]].
 */
export default class MapOrderer<T extends IClass> extends AbstractCollectionOrderer<T> implements IMapOrderer<T> {
	/**
	 * @inheritdoc
	 */
	public source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionOrdererConfig<T>) {
		super(source, config);
	}
}
