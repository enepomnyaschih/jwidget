/*
	JW collection building methods tests.
	
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

JW.Tests.Alg.BuildTestCase = function(config) {
	JW.Tests.Alg.BuildTestCase._super.call(this, config);
	this.obj = null;
	this.objDeep = null;
	this.arr = null;
	this.cls = null;
	this.clsDeep = null;
};

JW.extend(JW.Tests.Alg.BuildTestCase, JW.Unit.TestCase, {
	setup: function()
	{
		this.obj = {
			a: 10,
			b: null,
			c: "lala"
		};
		
		this.objDeep = {
			t: {
				q: {
					a: 1,
					b: 0
				}
			},
			x: {
				q: {
					a: 0,
					b: 1
				}
			},
			y: {
				q: {
					a: 0,
					b: 2
				}
			},
			z: {
				q: {
					a: 1,
					b: 3
				}
			}
		};
		
		this.arr = [ 10, null, "lala" ];
		
		var Cls = function() {
			Cls._super.call(this);
			this.items = [];
		};
		
		JW.extend(Cls, JW.Class, {
			items: null,
			
			every: function(callback, scope) {
				for (var i = 0; i < this.items.length; ++i) {
					if (callback.call(scope || this, this.items[i], i) === false) {
						return false;
					}
				}
				return true;
			},
			
			createEmpty: function() {
				return new Cls();
			},
			
			createEmptyUnobservable: function() {
				return new Cls();
			},
			
			pushItem: function(item) {
				this.items.push(item);
				return this;
			}
		});
		
		JW.apply(Cls.prototype, JW.Alg.BuildMethods);
		
		this.cls = new Cls();
		this.cls.items.push(10, null, "lala");
		
		this.clsDeep = new Cls();
		this.clsDeep.items.push(
			{
				q: {
					a: 1,
					b: 0
				}
			}, {
				q: {
					a: 0,
					b: 1
				}
			}, {
				q: {
					a: 0,
					b: 2
				}
			}, {
				q: {
					a: 1,
					b: 3
				}
			}
		);
	},
	
	testCloneObject: function()
	{
		var clone = JW.Map.clone(this.obj);
		
		this.assertNotEqual(this.obj, clone);
		this.assertTrue(JW.Map.equal(this.obj, clone));
	},
	
	testCloneClass: function()
	{
		var clone = this.cls.clone();
		
		this.assertNotEqual(this.cls.items, clone.items);
		this.assertTrue(JW.Map.equal(this.cls.items, clone.items));
	},
	
	testFilterObject: function()
	{
		var result = JW.Map.filter(this.obj, function(item, key) {
			this.assertStrictEqual(this.obj[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.obj, result);
		this.assertTrue(JW.Map.equal({ a: 10, c: "lala" }, result));
	},
	
	testFilterClass: function()
	{
		var result = this.cls.filter(function(item, key) {
			this.assertStrictEqual(this.cls.items[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.Array.equal([ 10, "lala" ], result.items));
	},
	
	testFilterByObject: function()
	{
		var result = JW.Map.filterBy(this.objDeep, "q.a", 1);
		
		var expected = {
			t: this.objDeep.t,
			z: this.objDeep.z
		};
		
		this.assertNotEqual(this.objDeep, result);
		this.assertTrue(JW.Map.equal(expected, result));
	},
	
	testFilterByClass: function()
	{
		var result = this.clsDeep.filterBy("q.a", 1);
		
		var expected = [
			this.clsDeep.items[0],
			this.clsDeep.items[3]
		];
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.Array.equal(expected, result.items));
	},
	
	testMapObject: function()
	{
		var result = JW.Map.map(this.obj, function(item, key) {
			this.assertStrictEqual(this.obj[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.obj, result);
		this.assertTrue(JW.Map.equal({ a: true, b: false, c: true }, result));
	},
	
	testMapClass: function()
	{
		var result = this.cls.map(function(item, key) {
			this.assertStrictEqual(this.cls.items[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.Array.equal([ true, false, true ], result.items));
	},
	
	testMapByObject: function()
	{
		var result = JW.Map.mapBy(this.objDeep, "q.a");
		
		var expected = {
			t: 1,
			x: 0,
			y: 0,
			z: 1
		};
		
		this.assertNotEqual(this.objDeep, result);
		this.assertTrue(JW.Map.equal(expected, result));
	},
	
	testMapByClass: function()
	{
		var result = this.clsDeep.mapBy("q.a");
		
		var expected = [ 1, 0, 0, 1 ];
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.Array.equal(expected, result.items));
	},
	
	testMergeObject: function()
	{
		var target = JW.Map.clone(this.obj);
		this.assertEqual(target, JW.Map.merge(target, this.arr));
		
		var expected = {
			a: 10,
			b: null,
			c: "lala",
			"0": 10,
			"1": null,
			"2": "lala"
		};
		
		this.assertTrue(JW.Map.equal(expected, target));
	},
	
	testMergeClass: function()
	{
		var target = this.cls.clone();
		this.cls.items = [ "a", "b", undefined ];
		this.assertEqual(target, target.merge(this.cls));
		
		var expected = [
			10,
			null,
			"lala",
			"a",
			"b",
			undefined
		];
		
		this.assertTrue(JW.Array.equal(expected, target.items));
	}
});
