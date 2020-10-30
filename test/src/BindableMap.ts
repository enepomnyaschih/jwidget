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
import {cmpPrimitives} from "jwidget/internal";

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
		expect(new BindableMap(getTestInput()).size.get()).equal(5);
	});

	// ... all tests for reaction to concrete mutation methods are among tests for those methods
});

describe("BindableMap.destroy", () => {
	it("should clear the map", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.destroy();
		expect(Array.from(map.native)).eql([]);
		expect(map.size.get()).eql(0);
		expect(messages).eql([
			["size", 5, 0],
			["clear", getTestInput()],
			["change"]
		]);
	});

	it("should not destroy values if not owned", () => {
		const map = new BindableMap([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()]
		]);
		map.destroy();
	});

	it("should destroy all values in direct order if owned", () => {
		let step = 0;
		const map = new BindableMap([
			["a", newDestroyStepObject(() => ++step, 1)],
			["b", newDestroyStepObject(() => ++step, 2)]
		]).ownValues();
		map.destroy();
		expect(step).eql(2);
	});
});

describe("BindableMap[Symbol.iterator]", () => {
	it("should support empty maps", () => {
		const map = new BindableMap();
		for (let _entry of map) {
			assert.fail();
		}
	});

	it("should iterate through entries", () => {
		const input = getTestInput();
		const map = new BindableMap(input);
		let i = 0;
		for (let entry of map) {
			expect(entry).eql(input[i++]);
		}
		expect(i).equal(5);
	});
});

describe("BindableMap.get", () => {
	it("should return a proper value", () => {
		const map = new BindableMap(getTestInput());
		expect(map.get("a")).equal(5);
		expect(map.get("b")).equal(2);
		expect(map.get("c")).equal(8);
		expect(map.get("d")).equal(7);
		expect(map.get("e")).equal(8);
	});

	it("should return undefined if doesn't have the specified key", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.get(""));
		assert.isUndefined(map.get(null));
		assert.isUndefined(map.get("f"));
	});
});

// ... testing methods-delegators any further would just be testing of the native Map methods. Skipping...

describe("BindableMap.set", () => {
	it("should add a new entry if the key is absent", () => {
		const map = new BindableMap(getTestInput());
		map.set("f", 3);
		expect(Array.from(map.native)).eql([...getTestInput(), ["f", 3]]);
	});

	it("should change an existing entry if the key is present", () => {
		const map = new BindableMap(getTestInput());
		map.set("c", 3);
		expect(Array.from(map.native)).eql([...getTestInput().slice(0, 2), ["c", 3], ...getTestInput().slice(3, 5)]);
	});

	it("should dispatch proper messages if the key is absent", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.set("f", 3);
		expect(messages).eql([
			["size", 5, 6],
			["splice", [], [["f", 3]]],
			["change"]
		]);
	});

	it("should dispatch proper messages if the key is present", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.set("c", 3);
		expect(messages).eql([
			["splice", [["c", 8]], [["c", 3]]],
			["change"]
		]);
	});

	it("should return undefined if absent", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.set("f", 3));
	});

	it("should return the old value if present", () => {
		const map = new BindableMap(getTestInput());
		expect(map.set("c", 3)).equal(8);
	});

	it("should not change the map if the value is the same", () => {
		const map = new BindableMap(getTestInput());
		map.set("c", 8);
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the value is the same", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.set("c", 8);
		expect(messages).eql([]);
	});

	it("should return the value if it is the same", () => {
		const map = new BindableMap(getTestInput());
		expect(map.set("c", 8)).equal(8);
	});

	it("should not destroy the value by default", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()]
		]);
		map.set("b", newDestroyFailObject());
	});

	it("should destroy the value if owned", () => {
		let step = 0;
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyStepObject(() => ++step, 1)],
			["c", newDestroyFailObject()]
		]).ownValues();
		expect(step).equal(0);
		map.set("b", newDestroyFailObject());
		expect(step).equal(1);
	});
});

describe("BindableMap.trySet", () => {
	// While set delegates its logic to trySet, it doesn't make sense to copy all tests over here.

	it("should return a wrapper over the old value if changed", () => {
		const map = new BindableMap(getTestInput());
		expect(map.trySet("c", 3)).eql({value: 8});
	});

	it("should return a wrapper over undefined if absent", () => {
		const map = new BindableMap(getTestInput());
		expect(map.trySet("f", 3)).eql({value: undefined});
	});

	it("should return undefined if the value is the same", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.trySet("c", 8));
	});
});

describe("BindableMap.setAll", () => {
	it("should add new entries and update the existing ones", () => {
		const map = new BindableMap(getTestInput());
		map.setAll(new Map([["c", 3], ["d", 7], ["f", 3]]));
		expect(Array.from(map.native)).eql([...getTestInput().slice(0, 2), ["c", 3], ...getTestInput().slice(3, 5), ["f", 3]]);
	});

	it("should dispatch proper messages", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.setAll(new Map([["c", 3], ["d", 7], ["f", 3]]));
		expect(messages).eql([
			["size", 5, 6],
			["splice", [["c", 8]], [["c", 3], ["f", 3]]],
			["change"]
		]);
	});

	it("should not dispatch any messages if all values are the same", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.setAll(new Map([["c", 8], ["d", 7]]));
		expect(messages).eql([]);
	});

	it("should not destroy the value by default", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()]
		]);
		map.setAll(new Map([["b", newDestroyFailObject()], ["c", newDestroyFailObject()]]));
	});

	it("should destroy the values in direct order if owned", () => {
		let step = 0;
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyStepObject(() => ++step, 1)],
			["c", newDestroyStepObject(() => ++step, 2)]
		]).ownValues();
		expect(step).equal(0);
		map.setAll(new Map([["b", newDestroyFailObject()], ["c", newDestroyFailObject()]]));
		expect(step).equal(2);
	});
});

describe("BindableMap.trySetAll", () => {
	// While setAll delegates its logic to trySetAll, it doesn't make sense to copy all tests over here.

	it("should return a splice result if changed", () => {
		const map = new BindableMap(getTestInput());
		expect(parseSpliceResult(map.trySetAll(new Map([["c", 3], ["d", 7], ["f", 3]]))))
			.eql([[["c", 8]], [["c", 3], ["f", 3]]]);
	});

	it("should return undefined if unchanged", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.trySetAll(new Map([["c", 8], ["d", 7]])));
	});
});

describe("BindableMap.setKey", () => {
	it("should change the entry key", () => {
		const map = new BindableMap(getTestInput());
		map.setKey("c", "f");
		expect(Array.from(map.native)).eql([...getTestInput().filter(x => x[0] !== "c"), ["f", 8]]);
	});

	it("should dispatch proper messages", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.setKey("c", "f");
		expect(messages).eql([
			["reindex", [["c", "f"]]],
			["change"]
		]);
	});

	it("should return the entry value", () => {
		const map = new BindableMap(getTestInput());
		expect(map.setKey("c", "f")).equal(8);
	});

	it("should not change the map if the key is the same", () => {
		const map = new BindableMap(getTestInput());
		map.setKey("c", "c");
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the key is the same", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.setKey("c", "c");
		expect(messages).eql([]);
	});

	it("should return the value if the key is the same", () => {
		const map = new BindableMap(getTestInput());
		expect(map.setKey("c", "c")).equal(8);
	});

	it("should not destroy the value even if owned", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()]
		]).ownValues();
		map.setKey("b", "d");
	});
});

describe("BindableMap.trySetKey", () => {
	// While setKey delegates its logic to trySetKey, it doesn't make sense to copy all tests over here.

	it("should return the entry value if changed", () => {
		const map = new BindableMap(getTestInput());
		expect(map.trySetKey("c", "f")).equal(8);
	});

	it("should return undefined if unchanged", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.trySetKey("c", "c"));
	});
});

describe("BindableMap.remove", () => {
	it("should change the map if the key exists", () => {
		const map = new BindableMap(getTestInput());
		map.remove("c");
		expect(Array.from(map.native)).eql(getTestInput().filter(x => x[0] !== "c"));
	});

	it("should dispatch proper messages if the key exists", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.remove("c");
		expect(messages).eql([
			["size", 5, 4],
			["splice", [["c", 8]], []],
			["change"]
		]);
	});

	it("should return the entry value if the key exists", () => {
		const map = new BindableMap(getTestInput());
		expect(map.remove("c")).equal(8);
	});

	it("should not change the map if the key doesn't exist", () => {
		const map = new BindableMap(getTestInput());
		map.remove("f");
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the key doesn't exist", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.remove("f");
		expect(messages).eql([]);
	});

	it("should return undefined if the key doesn't exist", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.remove("f"));
	});

	it("should not destroy the value by default", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()]
		]);
		map.remove("b");
	});

	it("should destroy the value if owned", () => {
		let step = 0;
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyStepObject(() => ++step, 1)],
			["c", newDestroyFailObject()]
		]).ownValues();
		expect(step).equal(0);
		map.remove("b");
		expect(step).equal(1);
	});
});

describe("BindableMap.removeAll", () => {
	it("should change the map if some keys exist", () => {
		const map = new BindableMap(getTestInput());
		map.removeAll(["c", "d", "f"]);
		expect(Array.from(map.native)).eql(getTestInput().filter(x => !["c", "d"].includes(x[0])));
	});

	it("should dispatch proper messages if some keys exist", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.removeAll(["c", "d", "f"]);
		expect(messages).eql([
			["size", 5, 3],
			["splice", [["c", 8], ["d", 7]], []],
			["change"]
		]);
	});

	it("should not change the map if the list of keys is empty", () => {
		const map = new BindableMap(getTestInput());
		map.removeAll([]);
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the list of keys is empty", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.removeAll([]);
		expect(messages).eql([]);
	});

	it("should not change the map if the keys don't exist", () => {
		const map = new BindableMap(getTestInput());
		map.removeAll(["f", "g"]);
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the keys don't exist", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.removeAll(["f", "g"]);
		expect(messages).eql([]);
	});

	it("should not destroy the values by default", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()],
			["d", newDestroyFailObject()],
			["e", newDestroyFailObject()]
		]);
		map.removeAll(["c", "d", "f"]);
	});

	it("should destroy the values in direct order if owned", () => {
		let step = 0;
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyStepObject(() => ++step, 1)],
			["d", newDestroyStepObject(() => ++step, 2)],
			["e", newDestroyFailObject()]
		]).ownValues();
		expect(step).equal(0);
		map.removeAll(["c", "d", "f"]);
		expect(step).equal(2);
	});
});

describe("BindableMap.tryRemoveAll", () => {
	// While removeAll delegates its logic to tryRemoveAll, it doesn't make sense to copy all tests over here.

	it("should return the removed entries if changed", () => {
		const map = new BindableMap(getTestInput());
		expect(Array.from(map.tryRemoveAll(["c", "d", "f"]))).eql([["c", 8], ["d", 7]]);
	});

	it("should return undefined if unchanged", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.tryRemoveAll(["f", "g"]));
	});
});

describe("BindableMap.clear", () => {
	it("should clear the map", () => {
		const map = new BindableMap(getTestInput());
		map.clear();
		expect(Array.from(map.native)).eql([]);
	});

	it("should not change the native reference", () => {
		const map = new BindableMap(getTestInput());
		const native = map.native;
		map.clear();
		expect(map.native).equal(native);
	});

	it("should dispatch proper messages", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.clear();
		expect(messages).eql([
			["size", 5, 0],
			["clear", getTestInput()],
			["change"]
		]);
	});

	it("should return the old contents", () => {
		const map = new BindableMap(getTestInput());
		expect(Array.from(map.clear())).eql(getTestInput());
	});

	it("should not change the map if it is empty", () => {
		const map = new BindableMap();
		map.clear();
		expect(Array.from(map.native)).eql([]);
	});

	it("should not dispatch any messages if the map is empty", () => {
		const map = new BindableMap();
		const messages = listen(map);
		map.clear();
		expect(messages).eql([]);
	});

	it("should return an empty map if the map is empty", () => {
		const map = new BindableMap();
		expect(Array.from(map.clear())).eql([]);
	});

	it("should not destroy the values by default", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()]
		]);
		map.clear();
	});

	it("should destroy the values in direct order if owned", () => {
		let step = 0;
		const map = new BindableMap<string, any>([
			["a", newDestroyStepObject(() => ++step, 1)],
			["b", newDestroyStepObject(() => ++step, 2)],
			["c", newDestroyStepObject(() => ++step, 3)]
		]).ownValues();
		expect(step).equal(0);
		map.clear();
		expect(step).equal(3);
	});
});

describe("BindableMap.tryClear", () => {
	// While clear delegates its logic to tryClear, it doesn't make sense to copy all tests over here.

	it("should return the old contents", () => {
		const map = new BindableMap(getTestInput());
		expect(Array.from(map.tryClear())).eql(getTestInput());
	});

	it("should return undefined if the map is empty", () => {
		const map = new BindableMap();
		assert.isUndefined(map.tryClear());
	});
});

describe("BindableMap.splice", () => {
	it("should remove and add entries as documented", () => {
		const map = new BindableMap(getTestInput());
		map.splice(["c"], new Map([["b", 3], ["f", 3], ["h", 9]]));
		expect(Array.from(map.native)).eql([["a", 5], ["b", 3], ["d", 7], ["e", 8], ["f", 3], ["h", 9]]);
	});

	it("should dispatch proper messages", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.splice(["c"], new Map([["b", 3], ["f", 3], ["h", 9]]));
		expect(messages).eql([
			["size", 5, 6],
			["splice", [["b", 2], ["c", 8]], [["b", 3], ["f", 3], ["h", 9]]],
			["change"]
		]);
	});

	it("should return the splice result", () => {
		const map = new BindableMap(getTestInput());
		expect(parseSpliceResult(map.splice(["c"], new Map([["b", 3], ["f", 3], ["h", 9]]))))
			.eql([[["b", 2], ["c", 8]], [["b", 3], ["f", 3], ["h", 9]]]);
	});

	it("should not change the map if the arguments are empty", () => {
		const map = new BindableMap(getTestInput());
		map.splice([], new Map());
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the arguments are empty", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.splice([], new Map());
		expect(messages).eql([]);
	});

	it("should return an empty splice result if the arguments are empty", () => {
		const map = new BindableMap(getTestInput());
		expect(parseSpliceResult(map.splice([], new Map()))).eql([[], []]);
	});

	it("should not change the map if the entries stay unchanged", () => {
		const map = new BindableMap(getTestInput());
		map.splice([], new Map([["b", 2], ["c", 8]]));
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the entries stay unchanged", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.splice([], new Map([["b", 2], ["c", 8]]));
		expect(messages).eql([]);
	});

	it("should return an empty splice result if the arguments are empty", () => {
		const map = new BindableMap(getTestInput());
		expect(parseSpliceResult(map.splice([], new Map([["b", 2], ["c", 8]])))).eql([[], []]);
	});

	it("should ignore non-existent keys to remove", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		expect(parseSpliceResult(map.splice(["f", "g"], new Map()))).eql([[], []]);
		expect(Array.from(map.native)).eql(getTestInput());
		expect(messages).eql([]);
	});

	it("should ignore keys to remove that are being also updated", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		expect(parseSpliceResult(map.splice(["b"], new Map([["b", 3]])))).eql([[["b", 2]], [["b", 3]]]);
		expect(Array.from(map.native)).eql([["a", 5], ["b", 3], ["c", 8], ["d", 7], ["e", 8]]);
		expect(messages).eql([
			["splice", [["b", 2]], [["b", 3]]],
			["change"]
		]);
	});

	it("should ignore keys to remove that are being also added", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		expect(parseSpliceResult(map.splice(["f"], new Map([["f", 3]])))).eql([[], [["f", 3]]]);
		expect(Array.from(map.native)).eql([["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8], ["f", 3]]);
		expect(messages).eql([
			["size", 5, 6],
			["splice", [], [["f", 3]]],
			["change"]
		]);
	});

	it("should not destroy the values by default", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()]
		]);
		map.splice(["b"], new Map([["c", newDestroyFailObject()], ["d", newDestroyFailObject()]]));
	});

	it("should destroy the values in direct order if owned", () => {
		let step = 0;
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyStepObject(() => ++step, 1)],
			["c", newDestroyStepObject(() => ++step, 2)]
		]).ownValues();
		expect(step).equal(0);
		map.splice(["b"], new Map([["c", newDestroyFailObject()], ["d", newDestroyFailObject()]]));
		expect(step).equal(2);
	});
});

describe("BindableMap.trySplice", () => {
	// While splice delegates its logic to trySplice, it doesn't make sense to copy all tests over here.

	it("should return the splice result", () => {
		const map = new BindableMap(getTestInput());
		expect(parseSpliceResult(map.splice(["c"], new Map([["b", 3], ["f", 3], ["h", 9]]))))
			.eql([[["b", 2], ["c", 8]], [["b", 3], ["f", 3], ["h", 9]]]);
	});

	it("should return undefined if the map is empty", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.trySplice([], new Map()));
	});

	it("should return undefined if the keys to remove don't exist", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.trySplice(["f", "g"], new Map()));
	});
});

describe("BindableMap.reindex", () => {
	it("should reindex map entries", () => {
		const map = new BindableMap(getTestInput());
		map.reindex(new Map([["b", "f"], ["c", "g"]]));
		expect(Array.from(map.native)).eql([["a", 5], ["d", 7], ["e", 8], ["f", 2], ["g", 8]]);
	});

	it("should dispatch proper messages", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.reindex(new Map([["b", "f"], ["c", "g"]]));
		expect(messages).eql([
			["reindex", [["b", "f"], ["c", "g"]]],
			["change"]
		]);
	});

	it("should return the key mapping", () => {
		const map = new BindableMap(getTestInput());
		expect(Array.from(map.reindex(new Map([["b", "f"], ["c", "g"]])))).eql([["b", "f"], ["c", "g"]]);
	});

	it("should not change the map if the mapping empty", () => {
		const map = new BindableMap(getTestInput());
		map.reindex(new Map());
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should not dispatch any messages if the mapping is empty", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		map.reindex(new Map());
		expect(messages).eql([]);
	});

	it("should return an empty mapping if the mapping empty", () => {
		const map = new BindableMap(getTestInput());
		expect(Array.from(map.reindex(new Map([["b", "f"], ["c", "g"]])))).eql([["b", "f"], ["c", "g"]]);
	});

	it("should ignore unchanged keys", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		const result = map.reindex(new Map([["b", "b"], ["c", "c"]]));
		expect(Array.from(map.native)).eql(getTestInput());
		expect(messages).eql([]);
		expect(Array.from(result)).eql([]);
	});

	it("should ignore non-existent keys", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		const result = map.reindex(new Map([["f", "a"], ["g", "h"]]));
		expect(Array.from(map.native)).eql(getTestInput());
		expect(messages).eql([]);
		expect(Array.from(result)).eql([]);
	});

	it("should return a sanitized key mapping", () => {
		const map = new BindableMap(getTestInput());
		expect(Array.from(map.reindex(new Map([["b", "f"], ["c", "c"], ["g", "d"]])))).eql([["b", "f"]]);
	});

	it("should support key exchange", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		const result = map.reindex(new Map([["b", "c"], ["c", "b"]]));
		expect(Array.from(map.native)).eql([["a", 5], ["b", 8], ["c", 2], ["d", 7], ["e", 8]]);
		expect(messages).eql([
			["reindex", [["b", "c"], ["c", "b"]]],
			["change"]
		]);
		expect(Array.from(result)).eql([["b", "c"], ["c", "b"]]);
	});

	it("should support key loop", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		const result = map.reindex(new Map([["b", "c"], ["c", "d"], ["d", "b"]]));
		expect(Array.from(map.native)).eql([["a", 5], ["b", 7], ["c", 2], ["d", 8], ["e", 8]]);
		expect(messages).eql([
			["reindex", [["b", "c"], ["c", "d"], ["d", "b"]]],
			["change"]
		]);
		expect(Array.from(result)).eql([["b", "c"], ["c", "d"], ["d", "b"]]);
	});

	it("should support key back loop", () => {
		const map = new BindableMap(getTestInput());
		const messages = listen(map);
		const result = map.reindex(new Map([["b", "c"], ["d", "b"], ["c", "d"]]));
		expect(Array.from(map.native)).eql([["a", 5], ["b", 7], ["c", 2], ["d", 8], ["e", 8]]);
		expect(messages).eql([
			["reindex", [["b", "c"], ["d", "b"], ["c", "d"]]],
			["change"]
		]);
		expect(Array.from(result)).eql([["b", "c"], ["d", "b"], ["c", "d"]]);
	});

	it("should not destroy the values even if owned", () => {
		const map = new BindableMap<string, any>([
			["a", newDestroyFailObject()],
			["b", newDestroyFailObject()],
			["c", newDestroyFailObject()],
			["d", newDestroyFailObject()],
			["e", newDestroyFailObject()]
		]).ownValues();
		map.reindex(new Map([["b", "f"], ["c", "d"], ["d", "c"]]));
	});
});

describe("BindableMap.tryReindex", () => {
	// While reindex delegates its logic to tryReindex, it doesn't make sense to copy all tests over here.

	it("should return a sanitized key mapping", () => {
		const map = new BindableMap(getTestInput());
		expect(Array.from(map.tryReindex(new Map([["b", "f"], ["c", "c"], ["g", "d"]])))).eql([["b", "f"]]);
	});

	it("should return undefined if the mapping is empty", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.tryReindex(new Map()));
	});

	it("should return undefined if the mapping contains only repeating and non-existent keys", () => {
		const map = new BindableMap();
		assert.isUndefined(map.tryReindex(new Map([["b", "b"], ["f", "g"]])));
	});
});

describe("BindableMap.detectSplice", () => {
	it("should infer proper splice parameters", () => {
		const map = new BindableMap(getTestInput());
		expect(parseSpliceParams(map.detectSplice(new Map([["a", 5], ["c", 5], ["d", 7], ["e", 8], ["f", 3]]))))
			.eql([["b"], [["c", 5], ["f", 3]]]);
	});

	it("should not change the map", () => {
		const map = new BindableMap(getTestInput());
		map.detectSplice(new Map([["a", 5], ["c", 5], ["d", 7], ["e", 8], ["f", 3]]))
		expect(Array.from(map.native)).eql(getTestInput());
	});

	it("should return undefined if the map is empty", () => {
		const map = new BindableMap();
		assert.isUndefined(map.detectSplice(new Map()));
	});

	it("should return undefined if the contents are identical", () => {
		const map = new BindableMap(getTestInput());
		assert.isUndefined(map.detectSplice(new Map(getTestInput())));
	});
});

describe("BindableMap.detectReindex", () => {
	it("should infer a proper key mapping", () => {
		const map = new BindableMap([["a", 1], ["b", 2], ["c", 3], ["d", 4]]);
		expect(normalizeEntries(map.detectReindex(new Map([["d", 3], ["a", 1], ["f", 2], ["c", 4]]))))
			.eql([["b", "f"], ["c", "d"], ["d", "c"]]);
	});

	it("should not change the map", () => {
		const map = new BindableMap([["a", 1], ["b", 2], ["c", 3], ["d", 4]]);
		map.detectReindex(new Map([["d", 3], ["a", 1], ["f", 2], ["c", 4]]))
		expect(normalizeEntries(map.native)).eql([["a", 1], ["b", 2], ["c", 3], ["d", 4]]);
	});

	it("should return undefined if the map is empty", () => {
		const map = new BindableMap();
		assert.isUndefined(map.detectReindex(new Map()));
	});

	it("should return undefined if the contents are identical", () => {
		const map = new BindableMap([["a", 1], ["b", 2], ["c", 3], ["d", 4]]);
		assert.isUndefined(map.detectReindex(new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])));
	});
});

function getTestInput(): [string, number][] {
	return [["a", 5], ["b", 2], ["c", 8], ["d", 7], ["e", 8]];
}

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

function parseSpliceParams<K, V>(spliceParams: IBindableMap.SpliceParams<K, V>) {
	return [
		normalizeKeys(spliceParams.keysToRemove),
		normalizeEntries(spliceParams.entriesToUpdate.entries())
	];
}

function parseSpliceResult<K, V>(spliceResult: IBindableMap.SpliceResult<K, V>) {
	return [
		normalizeEntries(spliceResult.removedEntries.entries()),
		normalizeEntries(spliceResult.addedEntries.entries())
	];
}

function normalizeKeys<K>(keys: Iterable<K>) {
	return Array.from(keys).sort();
}

function normalizeEntries<K, V>(entries: Iterable<readonly [K, V]>) {
	return Array.from(entries).sort((x, y) => cmpPrimitives(x[0], y[0]))
}

function newDestroyFailObject() {
	return {
		destroy: () => {
			assert.fail();
		}
	};
}

function newDestroyStepObject(postIncrement: () => number, expectedValue: number) {
	return {
		destroy: () => {
			expect(postIncrement()).equal(expectedValue);
		}
	};
}
