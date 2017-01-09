import AbstractCollectionLister from '../AbstractCollectionLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import IMap from '../../IMap';
import IMapLister from './IMapLister';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Map]].
 */
export default class MapLister<T extends IClass> extends AbstractCollectionLister<T> implements IMapLister<T> {
	/**
	 * @inheritdoc
	 */
	public source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionListerConfig<T>) {
		super(source, config);
	}
}
