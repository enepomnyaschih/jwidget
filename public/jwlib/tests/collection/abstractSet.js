/*
	jWidget Lib tests.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.Tests.Collection.AbstractSet = JW.Unit.TestCase.extend({
	/*
	JW.AbstractSet createSet(items, formatter);
	Mixed invoke(target, method, args);
	*/
	
	setObservableOutput: function() {},
	
	setup: function() {
		this.a = new JW.Proxy(1);
		this.b = new JW.Proxy(2);
		this.c = new JW.Proxy(3);
		this.d = new JW.Proxy(4);
		this.e = new JW.Proxy(5);
		this.f = new JW.Proxy(6);
		this.g = new JW.Proxy(3.5);
		this.A = new JW.Proxy(7);
		this.B = new JW.Proxy(8);
		this.C = new JW.Proxy(9);
		this.D = new JW.Proxy(10);
		this.E = new JW.Proxy(11);
		this.F = new JW.Proxy(12);
		this.G = new JW.Proxy(13);
		this.rel = {};
		this.rel[this.a.value] = this.A;
		this.rel[this.b.value] = this.B;
		this.rel[this.c.value] = this.C;
		this.rel[this.d.value] = this.D;
		this.rel[this.e.value] = this.E;
		this.rel[this.f.value] = this.F;
		this.rel[this.g.value] = this.G;
	},
	
	testEmpty: function() {
		var set = this.createSet();
		this.assertStrictEqual(0, this.invoke(set, "getLength"));
		this.assertTrue(this.invoke(set, "isEmpty"));
		this.assertUndefined(this.invoke(set, "getFirst"));
		this.assertFalse(this.invoke(set, "containsItem", [this.c]));
		this.assertFalse(this.invoke(set, "contains", [this.c]));
		this.assertTrue(this.invoke(set, "every", [this.callFn(JW.isInt)]));
		this.assertFalse(this.invoke(set, "some", [this.callFn(JW.isInt)]));
		this.assertUndefined(this.invoke(set, "search", [this.callFn(JW.isInt)]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "filter", [this.callFn(JW.isInt)]), []));
		this.assertTrue(this.invoke(set, "$filter", [this.callFn(JW.isInt)]).equal([]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "map", [this.mapFn, this]), []));
		this.assertTrue(this.invoke(set, "$map", [this.mapFn, this]).equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSorted"), []));
		this.assertTrue(this.invoke(set, "$toSorted").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSortedComparing"), []));
		this.assertTrue(this.invoke(set, "$toSortedComparing").equal([]));
		this.assertTrue(JW.Map.equal(this.invoke(set, "index", [this.valueFn]), {}));
		this.assertTrue(this.invoke(set, "$index", [this.valueFn]).equal({}));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toArray"), []));
		this.assertTrue(this.invoke(set, "$toArray").equal([]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "toSet"), []));
		this.assertTrue(this.invoke(set, "$toSet").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "asArray"), []));
		this.assertTrue(this.invoke(set, "$asArray").equal([]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "asSet"), []));
		this.assertTrue(this.invoke(set, "$asSet").equal([]));
	},
	
	testItems: function() {
		var set = this.createSet([this.b, this.d]);
		this.assertStrictEqual(2, this.invoke(set, "getLength"));
		this.assertFalse(this.invoke(set, "isEmpty"));
		this.assertStrictEqual(this.b, this.invoke(set, "getFirst"));
		this.assertFalse(this.invoke(set, "containsItem", [this.c]));
		this.assertTrue(this.invoke(set, "containsItem", [this.b]));
		this.assertFalse(this.invoke(set, "contains", [this.c]));
		this.assertTrue(this.invoke(set, "contains", [this.b]));
		this.assertTrue(this.invoke(set, "every", [this.callFn(JW.isInt)]));
		this.assertTrue(this.invoke(set, "some", [this.callFn(JW.isInt)]));
		this.assertStrictEqual(this.b, this.invoke(set, "search", [this.callFn(JW.isInt)]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "filter", [this.callFn(JW.isInt)]), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$filter", [this.callFn(JW.isInt)]).equal([this.b, this.d]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "map", [this.mapFn, this]), [this.B, this.D]));
		this.assertTrue(this.invoke(set, "$map", [this.mapFn, this]).equal([this.B, this.D]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSorted", [this.valueFn]), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$toSorted", [this.valueFn]).equal([this.b, this.d]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSortedComparing", [this.cmpFn]), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$toSortedComparing", [this.cmpFn]).equal([this.b, this.d]));
		this.assertTrue(JW.Map.equal(this.invoke(set, "index", [this.valueFn]), {"2": this.b, "4": this.d}));
		this.assertTrue(this.invoke(set, "$index", [this.valueFn]).equal({"2": this.b, "4": this.d}));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toArray"), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$toArray").equal([this.b, this.d]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "toSet"), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$toSet").equal([this.b, this.d]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "asArray"), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$asArray").equal([this.b, this.d]));
		this.assertTrue(JW.Set.equal(this.invoke(set, "asSet"), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$asSet").equal([this.b, this.d]));
	},
	
	testEvery: function() {
		var set = this.createSet([this.b, this.g, this.d]);
		this.assertTrue(this.invoke(set, "every", [this.callFn(JW.isNumber)]));
		this.assertFalse(this.invoke(set, "every", [this.callFn(JW.isInt)]));
		this.assertFalse(this.invoke(set, "every", [this.callFn(JW.isString)]));
	},
	
	testSome: function() {
		var set = this.createSet([this.b, this.g, this.d]);
		this.assertTrue(this.invoke(set, "some", [this.callFn(JW.isNumber)]));
		this.assertTrue(this.invoke(set, "some", [this.callFn(JW.isInt)]));
		this.assertFalse(this.invoke(set, "some", [this.callFn(JW.isString)]));
	},
	
	testEach: function() {
		var set = this.createSet([this.b, this.g, this.d]);
		var count = 0;
		this.invoke(set, "each", [function(item) {
			count++;
			return false;
		}, this]);
		this.assertStrictEqual(3, count);
	},
	
	testSearch: function() {
		var set = this.createSet([this.b, this.g]);
		this.assertStrictEqual(this.b, this.invoke(set, "search", [this.callFn(JW.isInt)]));
	},
	
	testFilter: function() {
		var set = this.createSet([this.b, this.g, this.d]);
		this.assertTrue(JW.Set.equal(this.invoke(set, "filter", [this.callFn(JW.isInt)]), [this.b, this.d]));
		this.assertTrue(this.invoke(set, "$filter", [this.callFn(JW.isInt)]).equal([this.b, this.d]));
		this.assertTrue(this.invoke(set, "equal", [[this.b, this.g, this.d]]));
	},
	
	testMap: function() {
		var set = this.createSet([this.b, this.d]);
		this.assertTrue(JW.Set.equal(this.invoke(set, "map", [this.mapFn, this]), [this.B, this.D]));
		this.assertTrue(this.invoke(set, "$map", [this.mapFn, this]).equal([this.B, this.D]));
		this.assertTrue(this.invoke(set, "equal", [[this.b, this.d]]));
	},
	
	testToSorted: function() {
		var set = this.createSet([this.c, this.b, this.d]);
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSorted", [this.valueFn]), [this.b, this.c, this.d]));
		this.assertTrue(this.invoke(set, "$toSorted", [this.valueFn]).equal([this.b, this.c, this.d]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSorted", [this.valueFn, this, -1]), [this.d, this.c, this.b]));
		this.assertTrue(this.invoke(set, "$toSorted", [this.valueFn, this, -1]).equal([this.d, this.c, this.b]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSorted", [function(x) { return -x.value; }]), [this.d, this.c, this.b]));
		this.assertTrue(this.invoke(set, "$toSorted", [function(x) { return -x.value; }]).equal([this.d, this.c, this.b]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSorted", [function(x) { return -x.value; }, this, -1]), [this.b, this.c, this.d]));
		this.assertTrue(this.invoke(set, "$toSorted", [function(x) { return -x.value; }, this, -1]).equal([this.b, this.c, this.d]));
		this.assertTrue(this.invoke(set, "equal", [[this.c, this.b, this.d]]));
	},
	
	testToSortedComparing: function() {
		var set = this.createSet([this.c, this.b, this.d]);
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSortedComparing", [this.cmpFn]), [this.b, this.c, this.d]));
		this.assertTrue(this.invoke(set, "$toSortedComparing", [this.cmpFn]).equal([this.b, this.c, this.d]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSortedComparing", [this.cmpFn, this, -1]), [this.d, this.c, this.b]));
		this.assertTrue(this.invoke(set, "$toSortedComparing", [this.cmpFn, this, -1]).equal([this.d, this.c, this.b]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSortedComparing", [function(x, y) { return -JW.cmp(x.value, y.value); }]), [this.d, this.c, this.b]));
		this.assertTrue(this.invoke(set, "$toSortedComparing", [function(x, y) { return -JW.cmp(x.value, y.value); }]).equal([this.d, this.c, this.b]));
		this.assertTrue(JW.Array.equal(this.invoke(set, "toSortedComparing", [function(x, y) { return -JW.cmp(x.value, y.value); }, null, -1]), [this.b, this.c, this.d]));
		this.assertTrue(this.invoke(set, "$toSortedComparing", [function(x, y) { return -JW.cmp(x.value, y.value); }, null, -1]).equal([this.b, this.c, this.d]));
		this.assertTrue(this.invoke(set, "equal", [[this.c, this.b, this.d]]));
	},
	
	testIndex: function() {
		var set = this.createSet([this.b, this.d]);
		this.assertTrue(JW.Map.equal(this.invoke(set, "index", [this.valueFn]), {"2": this.b, "4": this.d}));
		this.assertTrue(this.invoke(set, "$index", [this.valueFn]).equal({"2": this.b, "4": this.d}));
		this.assertTrue(this.invoke(set, "equal", [[this.b, this.d]]));
	},
	
	callFn: function(callback) {
		return function(proxy) {
			return callback.call(this, proxy.value);
		};
	},
	
	valueFn: function(item) {
		return item.value;
	},
	
	mapFn: function(item) {
		return this.rel[item.value];
	},
	
	cmpFn: function(x, y) {
		return JW.cmp(x.value, y.value);
	}
});
