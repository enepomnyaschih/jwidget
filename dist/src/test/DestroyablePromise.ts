/*!
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import AbstractDestroyablePromise from "../AbstractDestroyablePromise";

class Timeout extends AbstractDestroyablePromise<number> {
	private timeout: number;

	constructor(ms: number, result: number, fail?: boolean) {
		let timeout;
		super(new Promise((resolve, reject) => {
			timeout = setTimeout(() => fail ? reject(result) : resolve(result), ms);
		}));
		this.timeout = timeout;
	}

	destroyObject() {
		clearTimeout(this.timeout);
		super.destroyObject();
	}
}

export default function() {
	// Note: default timeout for "done" call in Jasmine is 5 seconds

	const DELAY = 200;

	describe('Standard Promise functionality', function() {
		let start: number;

		beforeEach(function() {
			start = Date.now();
		});

		function assertTime(shift: number) {
			expect(Math.abs(Date.now() - start - shift)).toBeLessThan(100);
		}

		it("should get resolved in time", function(done: () => any) {
			new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				assertTime(DELAY);
				done();
			}, fail);
		});
		it("should chain", function(done: () => any) {
			new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return new Timeout(DELAY, 2);
			}).then((result) => {
				expect(result).toBe(2);
				return new Timeout(DELAY, 3);
			}).then((result) => {
				expect(result).toBe(3);
				assertTime(3 * DELAY);
				done();
			}, fail);
		});
		it("should catch errors", function(done: () => any) {
			new Timeout(DELAY, 1, true).catch((result) => {
				expect(result).toBe(1);
				assertTime(DELAY);
				done();
			});
		});
		it("should catch errors via then", function(done: () => any) {
			new Timeout(DELAY, 1, true).then(fail, (result) => {
				expect(result).toBe(1);
				assertTime(DELAY);
				done();
			});
		});
		it("should pass errors through", function(done: () => any) {
			new Timeout(DELAY, 1, true).then(fail).then(fail).catch((result) => {
				expect(result).toBe(1);
				assertTime(DELAY);
				done();
			});
		});
		it("should pass errors through via then", function(done: () => any) {
			new Timeout(DELAY, 1, true).then(fail).then(fail).then(fail, (result) => {
				expect(result).toBe(1);
				assertTime(DELAY);
				done();
			});
		});
		it("should chain errors", function(done: () => any) {
			new Timeout(DELAY, 1, true).catch((result: number) => {
				expect(result).toBe(1);
				return new Timeout(DELAY, 2);
			}).then((result: number) => {
				expect(result).toBe(2);
				assertTime(2 * DELAY);
				done();
			}, fail);
		});
		it("should rethrow errors", function(done: () => any) {
			new Timeout(DELAY, 1, true).catch((result: number) => {
				expect(result).toBe(1);
				throw 2;
			}).then(fail, (result: number) => {
				expect(result).toBe(2);
				assertTime(DELAY);
				done();
			});
		});
		it("should combine with simple value", function(done: () => any) {
			new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return new Timeout(DELAY, 2);
			}).then((result) => {
				expect(result).toBe(2);
				return 3;
			}).then((result) => {
				expect(result).toBe(3);
				assertTime(2 * DELAY);
				done();
			}, fail);
		});
		it("should combine with native promises", function(done: () => any) {
			new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return new Timeout(DELAY, 2);
			}).then((result) => {
				expect(result).toBe(2);
				return new Promise((resolve) => {
					setTimeout(() => resolve(3), DELAY)
				});
			}).then((result) => {
				expect(result).toBe(3);
				assertTime(3 * DELAY);
				done();
			}, fail);
		});
		it("should combine with native failed promises", function(done: () => any) {
			new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return new Timeout(DELAY, 2);
			}).then((result) => {
				expect(result).toBe(2);
				return new Promise((resolve, reject) => {
					resolve = resolve;
					setTimeout(() => reject(3), DELAY)
				});
			}).then(fail, (result) => {
				expect(result).toBe(3);
				assertTime(3 * DELAY);
				done();
			});
		});
	});

	describe('Destruction functionality', function() {
		it("should be destroyable", function(done: () => any) {
			const timeout = new Timeout(DELAY, 1)
			timeout.then(fail, fail);
			setTimeout(() => timeout.destroy(), DELAY / 2);
			setTimeout(done, 3 * DELAY / 2);
		});
		it("should destroy the chain", function(done: () => any) {
			const timeout = new Timeout(DELAY, 1).then(fail, fail);
			setTimeout(() => timeout.destroy(), DELAY / 2);
			setTimeout(done, 3 * DELAY / 2);
		});
		it("should destroy the long chain", function(done: () => any) {
			const timeout = new Timeout(DELAY, 1).then(fail, fail).then(fail, fail);
			setTimeout(() => timeout.destroy(), DELAY / 2);
			setTimeout(done, 3 * DELAY / 2);
		});
		it("should destroy the chained promise", function(done: () => any) {
			let called = false;
			const timeout = new Timeout(DELAY, 1).then((result) => {
				called = true;
				expect(result).toBe(1);
				return new Timeout(DELAY, 2);
			});
			timeout.then(fail, fail);
			setTimeout(() => timeout.destroy(), 3 * DELAY / 2);
			setTimeout(() => {
				expect(called).toBeTruthy();
				done();
			}, 5 * DELAY / 2);
		});
		it("should destroy the chained promise chain", function(done: () => any) {
			let called = false;
			const timeout = new Timeout(DELAY, 1).then((result) => {
				called = true;
				expect(result).toBe(1);
				return new Timeout(DELAY, 2);
			}).then(fail, fail);
			setTimeout(() => timeout.destroy(), 3 * DELAY / 2);
			setTimeout(() => {
				expect(called).toBeTruthy();
				done();
			}, 5 * DELAY / 2);
		});
		it("should combine with simple value", function(done: () => any) {
			const timeout = new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return 2;
			}).then((result) => {
				expect(result).toBe(2);
				return new Timeout(DELAY, 3);
			}, fail).then(fail, fail);
			setTimeout(() => timeout.destroy(), 3 * DELAY / 2);
			setTimeout(done, 5 * DELAY / 2);
		});
		it("should combine with native promises", function(done: () => any) {
			const timeout = new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return new Promise((resolve) => {
					setTimeout(() => resolve(2), DELAY)
				});
			}).then(fail, fail);
			setTimeout(() => timeout.destroy(), DELAY / 2);
			setTimeout(done, 5 * DELAY / 2);
		});
		it("should not destroy the chained native promises", function(done: () => any) {
			const timeout = new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return new Promise((resolve) => {
					setTimeout(() => resolve(2), DELAY)
				});
			}).then((result) => {
				expect(result).toBe(2);
				done();
			}, fail);
			setTimeout(() => timeout.destroy(), 3 * DELAY / 2);
		});
		it("should combine with native failed promises", function(done: () => any) {
			const timeout = new Timeout(DELAY, 1).then((result) => {
				expect(result).toBe(1);
				return new Promise((resolve, reject) => {
					resolve = resolve;
					setTimeout(() => reject(2), DELAY)
				});
			}).then(fail, fail);
			setTimeout(() => timeout.destroy(), DELAY / 2);
			setTimeout(done, 5 * DELAY / 2);
		});
	});
};
