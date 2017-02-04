import BaseTimeout from './BaseTimeout';

export default class Timeout extends BaseTimeout {
	protected _init(callback: () => any, delay?: number): number {
		return setTimeout(callback, delay);
	}

	protected _done(timeout: number): void {
		clearTimeout(timeout);
	}
}
