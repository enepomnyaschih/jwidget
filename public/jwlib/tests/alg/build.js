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

JW.ns("JW.Tests.Alg");

JW.Tests.Alg.BuildTestCase = JW.Unit.TestCase.extend({
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
		
		var Cls = JW.Class.extend({
			items: null,
			
			init: function()
			{
				this.items = [];
			},
			
			every: function(callback, scope)
			{
				for (var i = 0; i < this.items.length; ++i)
				{
					if (!callback.call(scope || this, this.items[i], i))
						return false;
				}
				return true;
			},
			
			createEmpty: function()
			{
				return new Cls();
			},
			
			pushItem: function(item)
			{
				this.items.push(item);
				return this;
			}
		});
		
		JW.apply(Cls.prototype, JW.Alg.SimpleMethods);
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
	
	testCreateEmptyObject: function()
	{
		this.assertTrue(JW.equal({}, JW.createEmpty(this.obj), true, true));
	},
	
	testCreateEmptyClass: function()
	{
		// this.cls.createEmpty tests nothing
		this.assertTrue(JW.equal([], JW.createEmpty(this.cls).items, true, true));
	},
	
	testPushItemObject: function()
	{
		this.assertStrictEqual(this.obj, JW.pushItem(this.obj, [ "item", "key" ]));
		this.assertTrue(JW.equal({ a: 10, b: null, c: "lala", key: "item" }, this.obj, true, true));
	},
	
	testPushItemClass: function()
	{
		// this.cls.pushItem tests nothing
		this.assertStrictEqual(this.cls, JW.pushItem(this.cls, [ "item", 60 ]));
		this.assertTrue(JW.equal([ 10, null, "lala", "item" ], this.cls.items, true, true));
	},
	
	testCloneObject: function()
	{
		var clone = JW.clone(this.obj);
		
		this.assertNotEqual(this.obj, clone);
		this.assertTrue(JW.equal(this.obj, clone, true, true));
	},
	
	testCloneClass: function()
	{
		var clone = this.cls.clone();
		
		this.assertNotEqual(this.cls.items, clone.items);
		this.assertTrue(JW.equal(this.cls.items, clone.items, true, true));
	},
	
	testFilterObject: function()
	{
		var result = JW.filter(this.obj, function(item, key) {
			this.assertStrictEqual(this.obj[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.obj, result);
		this.assertTrue(JW.equal({ a: 10, c: "lala" }, result, true, true));
	},
	
	testFilterClass: function()
	{
		var result = this.cls.filter(function(item, key) {
			this.assertStrictEqual(this.cls.items[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.equal([ 10, "lala" ], result.items, true, true));
	},
	
	testFilterByObject: function()
	{
		var result = JW.filterBy(this.objDeep, "q.a", 1);
		
		var expected = {
			t: this.objDeep.t,
			z: this.objDeep.z
		};
		
		this.assertNotEqual(this.objDeep, result);
		this.assertTrue(JW.equal(expected, result));
	},
	
	testFilterByClass: function()
	{
		var result = this.clsDeep.filterBy("q.a", 1);
		
		var expected = [
			this.clsDeep.items[0],
			this.clsDeep.items[3]
		];
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.equal(expected, result.items));
	},
	
	testMapObject: function()
	{
		var result = JW.map(this.obj, function(item, key) {
			this.assertStrictEqual(this.obj[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.obj, result);
		this.assertTrue(JW.equal({ a: true, b: false, c: true }, result, true, true));
	},
	
	testMapClass: function()
	{
		var result = this.cls.map(function(item, key) {
			this.assertStrictEqual(this.cls.items[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.equal([ true, false, true ], result.items, true, true));
	},
	
	testMapByObject: function()
	{
		var result = JW.mapBy(this.objDeep, "q.a");
		
		var expected = {
			t: 1,
			x: 0,
			y: 0,
			z: 1
		};
		
		this.assertNotEqual(this.objDeep, result);
		this.assertTrue(JW.equal(expected, result, true, true));
	},
	
	testMapByClass: function()
	{
		var result = this.clsDeep.mapBy("q.a");
		
		var expected = [ 1, 0, 0, 1 ];
		
		this.assertNotEqual(this.cls.items, result.items);
		this.assertTrue(JW.equal(expected, result.items, true, true));
	},
	
	testMergeObject: function()
	{
		var target = JW.clone(this.obj);
		this.assertEqual(target, JW.merge(target, this.cls));
		
		var expected = {
			a: 10,
			b: null,
			c: "lala",
			"0": 10,
			"1": null,
			"2": "lala"
		};
		
		this.assertTrue(JW.equal(expected, target, true, true));
	},
	
	testMergeClass: function()
	{
		var target = this.cls.clone();
		this.assertEqual(target, target.merge(this.obj));
		
		var expected = [
			10,
			null,
			"lala",
			10,
			null,
			"lala"
		];
		
		this.assertTrue(JW.equal(expected, target.items, true, true));
	},
	
	
	
	
	
	// Next tests specify behavior in unexpected, unusual use cases
	
	testCreateEmptySimple: function()
	{
		this.assertStrictEqual(null, JW.createEmpty(undefined));
		this.assertStrictEqual(null, JW.createEmpty(null));
		this.assertStrictEqual(null, JW.createEmpty(0));
		this.assertStrictEqual(null, JW.createEmpty(10));
		this.assertStrictEqual(null, JW.createEmpty(false));
		this.assertStrictEqual(null, JW.createEmpty(true));
		this.assertStrictEqual(null, JW.createEmpty(""));
		this.assertStrictEqual(null, JW.createEmpty("lala"));
		
		this.assertTrue(JW.equal([], JW.createEmpty(this.createEmptyArray), true, true));
	},
	
	testPushItemSimple: function()
	{
		this.assertStrictEqual(undefined,   JW.pushItem(undefined,  [ "item", "key" ]));
		this.assertStrictEqual(null,        JW.pushItem(null,       [ "item", "key" ]));
		this.assertStrictEqual(0,           JW.pushItem(0,          [ "item", "key" ]));
		this.assertStrictEqual(10,          JW.pushItem(10,         [ "item", "key" ]));
		this.assertStrictEqual(false,       JW.pushItem(false,      [ "item", "key" ]));
		this.assertStrictEqual(true,        JW.pushItem(true,       [ "item", "key" ]));
		this.assertStrictEqual("",          JW.pushItem("",         [ "item", "key" ]));
		this.assertStrictEqual("lala",      JW.pushItem("lala",     [ "item", "key" ]));
	},
	
	
	
	
	
	// Support methods
	
	createEmptyArray: function()
	{
		return [];
	}
});
