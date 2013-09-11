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
	
	testMapObject: function()
	{
		var result = JW.Map.map(this.obj, function(item, key) {
			this.assertStrictEqual(this.obj[key], item);
			return JW.isSet(item);
		}, this);
		
		this.assertNotEqual(this.obj, result);
		this.assertTrue(JW.Map.equal({ a: true, b: false, c: true }, result));
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
	}
});
