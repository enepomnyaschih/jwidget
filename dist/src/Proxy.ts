/**
 * Value proxy. The interface which hash only one field: "value".
 */
interface Proxy<T> {
	/**
	 * The proxied value.
	 */
	value: T;
}

export default Proxy;
