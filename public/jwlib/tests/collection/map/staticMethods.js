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

JW.Tests.Collection.Map.StaticMethodsTestCase = JW.Tests.Collection.AbstractMapBase.extend({
	// override
	createMap: function(items) {
		return items || {};
	},
	
	// override
	invoke: function(map, method, args) {
		return JW.Map[method].apply(window, [map].concat(JW.args(args || [])));
	},
	
	testToMap: function() {
		var map = this.createMap({a: 2, b: 4});
		this.assertTrue(JW.Map.equal(JW.Map.toMap(map), map));
		this.assertTrue(JW.Map.$toMap(map).equal(map));
		this.assertFalse(JW.Map.toMap(map) === map);
		this.assertFalse(JW.Map.$toMap(map).getJson() === map);
		this.assertTrue(JW.Map.equal(map, {a: 2, b: 4}));
	},
	
	testAsMap: function() {
		var map = this.createMap({a: 2, b: 4});
		this.assertTrue(JW.Map.asMap(map) === map);
		this.assertTrue(JW.Map.$asMap(map).getJson() === map);
		this.assertTrue(JW.Map.equal(map, {a: 2, b: 4}));
	}
});
