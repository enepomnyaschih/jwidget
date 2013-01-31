/*
	JW simple collection methods tests.
	
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

JW.Tests.Alg.SimpleTestCase = function(config) {
	JW.Tests.Alg.SimpleTestCase._super.call(this, config);
	this.obj = null;
	this.objj = null;
	this.arr = null;
	this.cls = null;
};

JW.extend(JW.Tests.Alg.SimpleTestCase, JW.Unit.TestCase, {
	setup: function()
	{
		this.obj = {
			a: 10,
			b: null,
			c: "lala"
		};
		
		this.objj = {
			a: 10,
			c: "lala"
		};
		
		this.arr = [ 10, null, "lala" ];
		
		var Cls = function() {
			Cls._super.call(this);
		};
		
		JW.extend(Cls, JW.Class, {
			items: this.arr,
			every: function(callback, scope)
			{
				for (var i = 0; i < this.items.length; ++i)
				{
					if (!callback.call(scope || this, this.items[i], i))
						return false;
				}
				return true;
			}
		});
		
		JW.apply(Cls.prototype, JW.Alg.SimpleMethods);
		
		this.cls = new Cls();
	},
	
	testEveryObject: function()
	{
		this.assertTrue (JW.every(this.obj, JW.isDefined));
		this.assertFalse(JW.every(this.obj, JW.isSet));
	},
	
	testEveryObjectScope: function()
	{
		this.assertTrue(JW.every(this.obj, function(item, key) {
			return this.obj[key] === item;
		}, this));
		
		this.assertFalse(JW.every(this.obj, function(item, key) {
			return JW.isSet(this.obj[key]);
		}, this));
	},
	
	testEveryObjectSequence: function()
	{
		this.addExpectedOutput(
			"a: 10",
			"b: null"
		);
		
		JW.every(this.obj, function(item, key) {
			this.output(key + ": " + item);
			return JW.isSet(item);
		}, this);
	},
	
	testEveryClass: function()
	{
		// this.cls.every tests nothing
		this.assertTrue (JW.every(this.cls, JW.isDefined));
		this.assertFalse(JW.every(this.cls, JW.isSet));
	},
	
	testEachObject: function()
	{
		this.addExpectedOutput(
			"a: 10",
			"b: null",
			"c: lala"
		);
		
		JW.each(this.obj, function(item, key) {
			this.output(key + ": " + item);
		}, this);
	},
	
	testEachClass: function()
	{
		this.addExpectedOutput(
			"0: 10",
			"1: null",
			"2: lala"
		);
		
		this.cls.each(function(item, key) {
			this.output(key + ": " + item);
		}, this);
	},
	
	testSomeObject: function()
	{
		this.assertTrue (JW.some(this.objj, JW.isDefined));
		this.assertTrue (JW.some(this.objj, JW.isSet));
		this.assertFalse(JW.some(this.objj, JW.isBlank));
	},
	
	testSomeClass: function()
	{
		this.assertTrue (this.cls.some(JW.isDefined));
		this.assertTrue (this.cls.some(JW.isSet));
		this.assertTrue (this.cls.some(JW.isBlank));
		this.assertFalse(this.cls.some(JW.Function.not(JW.isDefined)));
	},
	
	testGetKeysArrayObject: function()
	{
		this.assertTrue(JW.equal([ "a", "b", "c" ], JW.getKeysArray(this.obj), true, true));
	},
	
	testGetKeysArrayClass: function()
	{
		this.assertTrue(JW.equal([ 0, 1, 2 ], this.cls.getKeysArray(), true, true));
	},
	
	testGetValuesArrayObject: function()
	{
		this.assertTrue(JW.equal([ 10, null, "lala" ], JW.getValuesArray(this.obj), true, true));
	},
	
	testGetValuesArrayClass: function()
	{
		this.assertTrue(JW.equal([ 10, null, "lala" ], this.cls.getValuesArray(), true, true));
	},
	
	testGetValuesSetObject: function()
	{
		this.assertTrue(JW.equal({ "10": true, "null": true, "lala": true }, JW.getValuesSet(this.obj), true, true));
	},
	
	testGetValuesSetClass: function()
	{
		this.assertTrue(JW.equal({ "10": true, "null": true, "lala": true }, this.cls.getValuesSet(), true, true));
	},
	
	
	
	
	
	// Next tests specify behavior in unexpected, unusual use cases
	
	testEverySimple: function()
	{
		this.assertTrue(JW.every(undefined, JW.emptyFn));
		this.assertTrue(JW.every(null, JW.emptyFn));
		this.assertTrue(JW.every(0, JW.emptyFn));
		this.assertTrue(JW.every(10, JW.emptyFn));
		this.assertTrue(JW.every(false, JW.emptyFn));
		this.assertTrue(JW.every(true, JW.emptyFn));
		this.assertTrue(JW.every("", JW.emptyFn));
		this.assertTrue(JW.every("lala", JW.emptyFn));
		
		this.assertTrue (JW.every(this.everyTrue,  JW.emptyFn));
		this.assertFalse(JW.every(this.everyFalse, JW.emptyFn));
		
		this.assertTrue (JW.every(this.everyArray, JW.isDefined));
		this.assertFalse(JW.every(this.everyArray, JW.isSet));
	},
	
	testEachSimple: function()
	{
		function callback(item, key)
		{
			this.output(key + ": " + item);
		}
		
		JW.each(undefined, callback, this);
		JW.each(null, callback, this);
		JW.each(0, callback, this);
		JW.each(10, callback, this);
		JW.each(false, callback, this);
		JW.each(true, callback, this);
		JW.each("", callback, this);
		JW.each("lala", callback, this);
		
		JW.each(this.everyTrue, callback, this);
		JW.each(this.everyFalse, callback, this);
		
		this.addExpectedOutput(
			"0: 10",
			"1: null",
			"2: lala"
		);
		
		JW.each(this.everyArray, callback, this);
	},
	
	testSomeSimple: function()
	{
		this.assertFalse(JW.some(undefined, JW.emptyFn));
		this.assertFalse(JW.some(null, JW.emptyFn));
		this.assertFalse(JW.some(0, JW.emptyFn));
		this.assertFalse(JW.some(10, JW.emptyFn));
		this.assertFalse(JW.some(false, JW.emptyFn));
		this.assertFalse(JW.some(true, JW.emptyFn));
		this.assertFalse(JW.some("", JW.emptyFn));
		this.assertFalse(JW.some("lala", JW.emptyFn));
		
		this.assertFalse(JW.some(this.everyTrue,  JW.emptyFn));
		this.assertTrue (JW.some(this.everyFalse, JW.emptyFn));
		
		this.assertTrue (JW.some(this.everyArray, JW.isDefined));
		this.assertTrue (JW.some(this.everyArray, JW.isSet));
		this.assertFalse(JW.some(this.everyArray, JW.Function.not(JW.isDefined)));
		this.assertTrue (JW.some(this.everyArray, JW.Function.not(JW.isSet)));
	},
	
	testGetValuesArraySimple: function()
	{
		this.assertTrue(JW.equal([], JW.getValuesArray(undefined), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray(null), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray(0), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray(10), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray(false), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray(true), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray(""), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray("lala"), true, true));
		
		this.assertTrue(JW.equal([], JW.getValuesArray(this.everyTrue), true, true));
		this.assertTrue(JW.equal([], JW.getValuesArray(this.everyFalse), true, true));
		
		this.assertTrue(JW.equal([ 10, null, "lala" ], JW.getValuesArray(this.everyArray), true, true));
	},
	
	testGetValuesSetSimple: function()
	{
		this.assertTrue(JW.equal({}, JW.getValuesSet(undefined), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet(null), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet(0), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet(10), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet(false), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet(true), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet(""), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet("lala"), true, true));
		
		this.assertTrue(JW.equal({}, JW.getValuesSet(this.everyTrue), true, true));
		this.assertTrue(JW.equal({}, JW.getValuesSet(this.everyFalse), true, true));
		
		this.assertTrue(JW.equal({ "10": true, "null": true, "lala": true }, JW.getValuesSet(this.everyArray), true, true));
	},
	
	testIndex: function()
	{
		var array = [
			{
				id : 10
			}, {
				id : 5
			}, {
				id : 20
			}
		];
		
		var expected = {
			"10" : array[0],
			"5"  : array[1],
			"20" : array[2]
		};
		
		this.assertEqual(JSON.stringify(expected), JSON.stringify(JW.index(array, function(item) { return item.id; })));
	},
	
	testIndexBy: function()
	{
		var array = [
			{
				id : 10
			}, {
				id : 5
			}, {
				id : 20
			}
		];
		
		var expected = {
			"10" : array[0],
			"5"  : array[1],
			"20" : array[2]
		};
		
		this.assertEqual(JSON.stringify(expected), JSON.stringify(JW.indexBy(array, "id")));
	},
	
	testIndexByMethod: function()
	{
		var array = [
			{ getId : function(a) { return a + 5; } },
			{ getId : function(a) { return a + 0; } },
			{ getId : function(a) { return a + 15; } }
		];
		
		var expected = {
			"10" : array[0],
			"5"  : array[1],
			"20" : array[2]
		};
		
		this.assertTrue(JW.equal(expected, JW.indexByMethod(array, "getId", [ 5 ])));
	},
	
	
	
	
	
	// Support methods
	
	everyTrue: function()
	{
		return true;
	},
	
	everyFalse: function()
	{
		return false;
	},
	
	everyArray: function(callback, scope)
	{
		var arr = [ 10, null, "lala" ];
		for (var i = 0; i < arr.length; ++i)
			if (!callback.call(scope || this, arr[i], i))
				return false;
		return true;
	}
});
