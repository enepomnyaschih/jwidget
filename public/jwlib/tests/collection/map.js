/*
	JW tests.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.Tests.Collection.MapTestCase = JW.Tests.Collection.AbstractMapBase.extend({
	// override
	createMap: function(items) {
		return new JW.Map(items);
	},
	
	// override
	invoke: function(map, method, args) {
		return map[method].apply(map, args || []);
	},
	
	testNotAdapter: function() {
		var items = {a: 2, b: 4};
		var map = new JW.Map(items);
		this.assertStrictEqual(2, map.getLength());
		this.assertFalse(map.isEmpty());
		this.assertStrictEqual(2, map.get("a"));
		this.assertStrictEqual(4, map.get("b"));
		map.set(3, "a");
		this.assertStrictEqual(3, map.get("a"));
		this.assertStrictEqual(2, items.a);
	},
	
	testAdapter: function() {
		var items = {a: 2, b: 4};
		var map = new JW.Map(items, true);
		this.assertStrictEqual(2, map.getLength());
		this.assertFalse(map.isEmpty());
		this.assertStrictEqual(2, map.get("a"));
		this.assertStrictEqual(4, map.get("b"));
		map.set(3, "a");
		this.assertStrictEqual(3, map.get("a"));
		this.assertStrictEqual(3, items.a);
	},
	
	testToMap: function() {
		var map = new JW.Map({a: 2, b: 4});
		this.assertTrue(JW.Map.equal(map.toMap(), map.getJson()));
		this.assertTrue(map.$toMap().equal(map.getJson()));
		this.assertFalse(map.toMap() === map.getJson());
		this.assertFalse(map.$toMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	},
	
	testAsMap: function() {
		var map = new JW.Map({a: 2, b: 4});
		this.assertTrue(map.asMap() === map.getJson());
		this.assertTrue(map.$asMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	}
});

JW.Tests.Collection.Map = {};
