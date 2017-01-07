import Property from './Property';

/**
 * [[JW.Property]]'s [[JW.Property.changeEvent|changeEvent]] params.
 *
 * @param V Property value type.
 */
interface PropertyChangeEventParams<V> {
	/**
	 * Sender property.
	 */
	sender: Property<V>;

	/**
	 * New value.
	 */
	value: V;

	/**
	 * Old value.
	 */
	oldValue: V;
}

export default PropertyChangeEventParams;