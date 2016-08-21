/**
 * Object which has **destroy** method. Can be aggregated in JW.Class via **own** method.
 */
export interface Destroyable {
	/**
	 * Class destructor invocation method.
	 */
	destroy(): void;
}
