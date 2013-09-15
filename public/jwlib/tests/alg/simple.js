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
	},
	
	testEveryObject: function()
	{
		this.assertTrue (JW.Map.every(this.obj, JW.isDefined));
		this.assertFalse(JW.Map.every(this.obj, JW.isSet));
		this.assertTrue (JW.Map.every(this.objj, JW.emptyFn));
	},
	
	testEveryObjectScope: function()
	{
		this.assertTrue(JW.Map.every(this.obj, function(item, key) {
			return this.obj[key] === item;
		}, this));
		
		this.assertFalse(JW.Map.every(this.obj, function(item, key) {
			return JW.isSet(this.obj[key]);
		}, this));
	},
	
	testEveryObjectSequence: function()
	{
		this.addExpectedOutput(
			"a: 10",
			"b: null"
		);
		
		JW.Map.every(this.obj, function(item, key) {
			this.output(key + ": " + item);
			return JW.isSet(item);
		}, this);
	},
	
	testEachObject: function()
	{
		this.addExpectedOutput(
			"a: 10",
			"b: null",
			"c: lala"
		);
		
		JW.Map.each(this.obj, function(item, key) {
			this.output(key + ": " + item);
		}, this);
	},
	
	testSomeObject: function()
	{
		this.assertTrue (JW.Map.some(this.objj, JW.isDefined));
		this.assertTrue (JW.Map.some(this.objj, JW.isSet));
		this.assertFalse(JW.Map.some(this.objj, JW.isBlank));
		this.assertTrue (JW.Map.some(this.objj, JW.emptyFn));
	},
	
	testGetKeysArrayObject: function()
	{
		this.assertTrue(JW.Array.equal([ "a", "b", "c" ], JW.Map.getKeys(this.obj)));
	},
	
	testGetValuesArrayObject: function()
	{
		this.assertTrue(JW.Array.equal([ 10, null, "lala" ], JW.Map.toArray(this.obj)));
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
		
		this.assertEqual(JSON.stringify(expected), JSON.stringify(JW.Array.index(array, function(item) { return item.id; })));
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
		
		this.assertEqual(JSON.stringify(expected), JSON.stringify(JW.Array.index(array, JW.byField("id"))));
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
		
		this.assertTrue(JW.Array.equal(expected, JW.Array.index(array, JW.byMethod("getId", [ 5 ]))));
	}
});
