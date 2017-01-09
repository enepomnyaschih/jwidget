import IClass from '../../IClass';
import ICollectionLister from '../ICollectionLister';
import IMap from '../../IMap';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Map]].
 */
interface IMapLister<T extends IClass> extends ICollectionLister<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;
}

export default IMapLister;
