// hack to make this a module
// @ts-ignore
export default null;

// hack to use CommonJS syntax in TypeScript files (e.g. to load CSS)
// https://github.com/TypeStrong/ts-loader#loading-other-resources-and-code-splitting
declare global {
	const require: {
		<T>(path: string): T;
		(paths: string[], callback: (...modules: any[]) => void): void;
		ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
	};
}
