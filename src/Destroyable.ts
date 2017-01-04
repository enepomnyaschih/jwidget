/**
 * Object which has **destroy** method. Can be aggregated in JW.Class via **own** method.
 */
interface Destroyable {
	/**
	 * Class destructor invocation method.
	 */
	destroy(): void;
}

export default Destroyable;
