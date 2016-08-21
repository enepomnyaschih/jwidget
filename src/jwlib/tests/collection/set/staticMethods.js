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

JW.Tests.Collection.Set.StaticMethodsTestCase = JW.Tests.Collection.AbstractSetBase.extend({
	// override
	createSet: function(items) {
		items = items || [];
		var set = {};
		for (var i = 0; i < items.length; ++i) {
			set[items[i]._iid] = items[i];
		}
		return set;
	},
	
	// override
	invoke: function(set, method, args) {
		return JW.Set[method].apply(window, [set].concat(JW.args(args || [])));
	},
	
	testToSet: function() {
		var set = this.createSet([this.b, this.d]);
		this.assertTrue(JW.Set.equal(JW.Set.toSet(set), [this.b, this.d]));
		this.assertTrue(JW.Set.$toSet(set).equal([this.b, this.d]));
		this.assertFalse(JW.Set.toSet(set) === set);
		this.assertFalse(JW.Set.$toSet(set).getJson() === set);
		this.assertTrue(JW.Set.equal(set, [this.b, this.d]));
	},
	
	testAsSet: function() {
		var set = this.createSet([this.b, this.d]);
		this.assertTrue(JW.Set.asSet(set) === set);
		this.assertTrue(JW.Set.$asSet(set).getJson() === set);
		this.assertTrue(JW.Set.equal(set, [this.b, this.d]));
	}
});
