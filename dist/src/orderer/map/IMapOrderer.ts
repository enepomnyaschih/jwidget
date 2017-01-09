import IClass from '../../IClass';
import ICollectionOrderer from '../ICollectionOrderer';
import IMap from '../../IMap';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Map]].
 */
interface IMapOrderer<T extends IClass> extends ICollectionOrderer<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

export default IMapOrderer;
