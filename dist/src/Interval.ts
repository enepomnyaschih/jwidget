import BaseTimeout from './BaseTimeout';

export default class Interval extends BaseTimeout {
	protected _init(callback: () => any, delay?: number): number {
		return setInterval(callback, delay);
	}

	protected _done(timeout: number): void {
		clearInterval(timeout);
	}
}
