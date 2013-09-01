/*
	jWidget Lib tests.
	
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

JW.Tests.Collection.SetTestCase = function(config) {
	JW.Tests.Collection.SetTestCase._super.call(this, config);
	this.a = new JW.Class();
	this.b = new JW.Class();
	this.c = new JW.Class();
	this.d = new JW.Class();
	this.e = new JW.Class();
};

JW.extend(JW.Tests.Collection.SetTestCase, JW.Unit.TestCase, {
	testRemoveItem: function() {
		var set = new JW.Set([ this.a, this.b, this.c, this.d ]);
		set.removeItem(this.b);
		set.removeItem(this.e);
		this.assertTrue(set.equal([ this.a, this.c, this.d ]));
	},
	
	testRemoveItemStatic: function() {
		var set = {};
		JW.Set.addAll(set, [ this.a, this.b, this.c, this.d ]);
		JW.Set.removeItem(set, this.b);
		JW.Set.removeItem(set, this.e);
		
		this.assertTrue(JW.Set.equal(set, [ this.a, this.c, this.d ]));
	},
	
	testEqual: function() {
		var a = new JW.Set([ this.a, this.b, this.c, this.d ]);
		this.assertTrue(a.equal([ this.a, this.b, this.c, this.d ]));
		this.assertTrue(a.equal([ this.a, this.d, this.b, this.c ]));
		this.assertFalse(a.equal([ this.a, this.b, this.e, this.d ]));
		this.assertFalse(a.equal([ this.a, this.b, this.c, this.d, this.e ]));
		this.assertFalse(a.equal([ this.a, this.b, this.c ]));
	},
	
	testEqualStatic: function() {
		var a = {};
		JW.Set.addAll(a, [ this.a, this.b, this.c, this.d ]);
		this.assertTrue(JW.Set.equal(a, [ this.a, this.b, this.c, this.d ]));
		this.assertTrue(JW.Set.equal(a, [ this.a, this.d, this.b, this.c ]));
		this.assertFalse(JW.Set.equal(a, [ this.a, this.b, this.e, this.d ]));
		this.assertFalse(JW.Set.equal(a, [ this.a, this.b, this.c, this.d, this.e ]));
		this.assertFalse(JW.Set.equal(a, [ this.a, this.b, this.c ]));
	}
});
