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

JW.Tests.Collection.Array.StaticMethodsTestCase = JW.Tests.Collection.AbstractArrayBase.extend({
	// override
	createArray: function(items) {
		return items || [];
	},

	// override
	invoke: function(array, method, args) {
		return JW.Array[method].apply(window, [array].concat(JW.args(args || [])));
	},

	testToArray: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Array.equal(JW.Array.toArray(array), array));
		this.assertTrue(JW.Array.$toArray(array).equal(array));
		this.assertFalse(JW.Array.toArray(array) === array);
		this.assertFalse(JW.Array.$toArray(array).getItems() === array);
		this.assertTrue(JW.Array.equal(array, [2, 4]));
	},

	testAsArray: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Array.asArray(array) === array);
		this.assertTrue(JW.Array.$asArray(array).getItems() === array);
		this.assertTrue(JW.Array.equal(array, [2, 4]));
	}
});
