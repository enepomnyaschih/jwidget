import AbstractCollectionObserver from '../AbstractCollectionObserver';
import ICollectionObserverConfig from '../ICollectionObserverConfig';
import IMap from '../../IMap';
import IMapObserver from './IMapObserver';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Map]].
 */
export default class MapObserver<T> extends AbstractCollectionObserver<T> implements IMapObserver<T> {
	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionObserverConfig<T>) {
		super(source, config);
	}
}
