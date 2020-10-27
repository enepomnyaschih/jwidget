/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {assert, expect} from "chai";
import BindableMap from "jwidget/BindableMap";
import IBindableMap from "jwidget/IBindableMap";

describe("new BindableMap", () => {
	it("should assign silent flag properly", () => {
		expect(new BindableMap().silent).equal(false);
		expect(new BindableMap(true).silent).equal(true);
		expect(new BindableMap([]).silent).equal(false);
		expect(new BindableMap([], true).silent).equal(true);
	});

	it("should contain a native map", () => {
		assert.isTrue(new BindableMap().native instanceof Map);
		assert.isTrue(new BindableMap(true).native instanceof Map);
		assert.isTrue(new BindableMap([]).native instanceof Map);
		assert.isTrue(new BindableMap([], true).native instanceof Map);
	});

	it("should create a new map", () => {
		const input = new Map();
		expect(new BindableMap(input).native).not.equal(input);
		expect(new BindableMap(input, true).native).not.equal(input);
	});
});

describe("BindableMap.size", () => {
	it("should not be silent for a non-silent map", () => {
		expect(new BindableMap().size.silent).equal(false);
	});

	it("should be silent for a silent map", () => {
		expect(new BindableMap(true).size.silent).equal(true);
	});

	it("should be zero for an empty map", () => {
		expect(new BindableMap().size.get()).equal(0);
	});

	it("should return number of items for a non-empty map", () => {
		expect(new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]).size.get()).equal(5);
	});

	// ... all tests for reaction to concrete mutation methods are among tests for those methods
});

describe("BindableMap.destroy", () => {
	it("should clear the map", () => {
		const map = new BindableMap([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]);
		const messages = listen(map);
		map.destroy();
		expect(Array.from(map.native)).eql([]);
		expect(map.size.get()).eql(0);
		expect(messages).eql([
			["size", 5, 0],
			["clear", [["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]]],
			["change"]
		]);
	});

	it("should not destroy keys if not owned", () => {
		const map = new BindableMap([
			[{
				destroy: () => {
					assert.fail();
				}
			}, "a"],
			[{
				destroy: () => {
					assert.fail();
				}
			}, "b"]
		]);
		map.destroy();
	});

	it("should not destroy values if not owned", () => {
		const map = new BindableMap([
			["a", {
				destroy: () => {
					assert.fail();
				}
			}],
			["b", {
				destroy: () => {
					assert.fail();
				}
			}]
		]);
		map.destroy();
	});

	it("should destroy all keys in direct order if owned", () => {
		let step = 0;
		const map = new BindableMap([
			[{
				destroy: () => {
					expect(++step).equal(1)
				}
			}, "a"],
			[{
				destroy: () => {
					expect(++step).equal(2)
				}
			}, "b"]
		]).ownKeys();
		map.destroy();
		expect(step).eql(2);
	});

	it("should destroy all values in direct order if owned", () => {
		let step = 0;
		const map = new BindableMap([
			["a", {
				destroy: () => {
					expect(++step).equal(1)
				}
			}],
			["b", {
				destroy: () => {
					expect(++step).equal(2)
				}
			}]
		]).ownValues();
		map.destroy();
		expect(step).eql(2);
	});

	it("should destroy each key before the respective value if owned", () => {
		let step = 0;
		const map = new BindableMap([
			[{
				destroy: () => {
					expect(++step).equal(1)
				}
			}, {
				destroy: () => {
					expect(++step).equal(2)
				}
			}],
			[{
				destroy: () => {
					expect(++step).equal(3)
				}
			}, {
				destroy: () => {
					expect(++step).equal(4)
				}
			}]
		]).ownKeys().ownValues();
		map.destroy();
		expect(step).eql(4);
	});
});

function listen(map: BindableMap<any, any>) {
	const result: any[] = [];
	map.onSplice.listen(spliceResult => {
		result.push(["splice", ...parseSpliceResult(spliceResult)]);
	});
	map.onReindex.listen(mapping => {
		result.push(["reindex", Array.from(mapping)]);
	});
	map.onClear.listen(oldContents => {
		result.push(["clear", Array.from(oldContents)]);
	});
	map.onChange.listen(() => {
		result.push(["change"]);
	});
	map.size.onChange.listen(message => {
		result.push(["size", message.oldValue, message.value]);
	});
	return result;
}

function parseSpliceResult(spliceResult: IBindableMap.SpliceResult<any, any>) {
	return [
		Array.from(spliceResult.removedEntries.entries()),
		Array.from(spliceResult.addedEntries.entries())
	];
}
