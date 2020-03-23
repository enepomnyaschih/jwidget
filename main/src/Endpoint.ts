import {isNil} from ".";

/**
 * Signature of an endpoint resolution function. The function returns a specific URL by parameters. The endpoints
 * can define routes to use with Router or backend API methods to access with request.
 */
interface Endpoint<P> {
	(params: P): string;
}

export default Endpoint;

/**
 * Signature of an endpoint suffix resolution function. The functions returns a URL component or an array of URL
 * components by parameters. The components get auto-encoded being passed to append function.
 */
export interface Suffix<P> {
	(params: P): string | string[];
}

function join(base: string, suffix: string[]): string {
    if (base == null) {
        return null;
    }
    if (suffix.some(isNil)) {
        console.warn("Endpoint with base ", base, " and suffix ", suffix,
            " contains blank parts - it may cause improper URL to be generated. Returned null URL.");
        return null;
    }
    return [...(base === "/" ? [""] : base ? [base] : []), ...suffix.map(encodeURIComponent)].join("/");
}

function compute<P>(suffix: string | string[] | Suffix<P>, params: P): string[] {
    const result = typeof suffix === "function" ? suffix(params) : suffix;
    return typeof result === "string" ? [result] : result;
}

/**
 * Defines a new endpoint by appending a suffix to an existing endpoint. If the suffix is defined as a function,
 * the new endpoint may take additional parameters (because U should extend P).
 * @param base Base endpoint to extend.
 * @param suffix URI components to append to the endpoint or a function returning the components by parameters.
 * @returns Endpoint representing the base endpoint with the suffix appended.
 */
export function append<P>(base: Endpoint<P>, suffix: string | string[]): Endpoint<P>;
export function append<P, U extends P>(base: Endpoint<P>, suffix: Suffix<U>): Endpoint<U>;
export function append<P, U extends P>(base: Endpoint<P>, suffix: string | string[] | Suffix<U>): Endpoint<U> {
    return (params: U) => join(base(params), compute(suffix, params));
}

/**
 * Endpoint referring to "" (empty) URL. Use %append function to create new endpoints from this one.
 */
export const relativeRoot: Endpoint<{}> = () => "";

/**
 * Endpoint referring to "/" URL. Use %append function to create new endpoints from this one.
 */
export const absoluteRoot: Endpoint<{}> = () => "/";
