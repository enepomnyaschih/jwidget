import {isNil} from ".";

interface Endpoint<P> {
    (params: P): string;
}

export default Endpoint;

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
    return [...(base ? [base] : []), ...suffix.map(encodeURIComponent)].join("/");
}

function compute<P>(suffix: string | string[] | Suffix<P>, params: P): string[] {
    const result = typeof suffix === "function" ? suffix(params) : suffix;
    return typeof result === "string" ? [result] : result;
}

export function append<P>(base: Endpoint<P>, suffix: string | string[]): Endpoint<P>;
export function append<P, U extends P>(base: Endpoint<P>, suffix: Suffix<U>): Endpoint<U>;
export function append<P, U extends P>(base: Endpoint<P>, suffix: string | string[] | Suffix<U>): Endpoint<U> {
    return (params: U) => join(base(params), compute(suffix, params));
}

export const relativeRoot: Endpoint<{}> = () => "";
export const absoluteRoot: Endpoint<{}> = () => "/";
