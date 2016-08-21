/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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

JW.Tests.Collection.SetTestCase = JW.Tests.Collection.AbstractSetBase.extend({
	// override
	createSet: function(items) {
		return new JW.Set(items);
	},
	
	// override
	invoke: function(set, method, args) {
		return set[method].apply(set, args || []);
	},
	
	testNotAdapter: function() {
		var items = [this.b, this.d];
		var set = new JW.Set(items);
		this.assertStrictEqual(2, set.getLength());
		this.assertFalse(set.isEmpty());
		this.assertTrue(set.contains(this.b));
		this.assertTrue(set.contains(this.d));
		set.add(this.c);
		this.assertTrue(set.contains(this.c));
		this.assertTrue(JW.Array.equal(items, [this.b, this.d]));
	},
	
	testAdapter: function() {
		var items = {};
		JW.Set.addAll(items, [this.b, this.d]);
		var set = new JW.Set(items, this);
		this.assertStrictEqual(2, set.getLength());
		this.assertFalse(set.isEmpty());
		this.assertTrue(set.contains(this.b));
		this.assertTrue(set.contains(this.d));
		this.assertFalse(set.contains(this.c));
		this.assertFalse(JW.Set.contains(items, this.c));
		set.add(this.c);
		this.assertTrue(set.contains(this.c));
		this.assertTrue(JW.Set.contains(items, this.c));
	},
	
	testToSet: function() {
		var set = new JW.Set([this.b, this.d]);
		this.assertTrue(JW.Set.equal(set.toSet(), [this.b, this.d]));
		this.assertTrue(set.$toSet().equal([this.b, this.d]));
		this.assertFalse(set.toSet() === set.getJson());
		this.assertFalse(set.$toSet() === set);
		this.assertTrue(set.equal([this.b, this.d]));
	},
	
	testAsSet: function() {
		var set = new JW.Set([this.b, this.d]);
		this.assertTrue(set.asSet() === set.getJson());
		this.assertTrue(set.$asSet() === set);
		this.assertTrue(set.equal([this.b, this.d]));
	},
	
	testOwnItemsOff: function() {
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroyObject: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var a = new cls(this, "a");
		var b = new cls(this, "b");
		var c = new cls(this, "c");
		var d = new cls(this, "d");
		var e = new cls(this, "e");
		var f = new cls(this, "f");
		var g = new cls(this, "g");
		var set = new JW.Set([a, b, c, d, e]);
		set.remove(a);
		set.removeAll([b, c]);
		set.clear();
		set.addAll([f, g]);
		set.destroy();
	},
	
	testOwnItemsOn: function() {
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroyObject: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var a = new cls(this, "a");
		var b = new cls(this, "b");
		var c = new cls(this, "c");
		var d = new cls(this, "d");
		var e = new cls(this, "e");
		var f = new cls(this, "f");
		var g = new cls(this, "g");
		var set = new JW.Set([a, b, c, d, e]).ownItems();
		this.setExpectedOutput(
			"destroy a"
		);
		set.remove(a);
		this.setExpectedOutput(
			"destroy c",
			"destroy b"
		);
		set.removeAll([b, c]);
		this.setExpectedOutput(
			"destroy e",
			"destroy d"
		);
		set.clear();
		this.setExpectedOutput();
		set.addAll([f, g]);
		this.setExpectedOutput(
			"destroy g",
			"destroy f"
		);
		set.destroy();
	}
});

JW.Tests.Collection.Set = {};
