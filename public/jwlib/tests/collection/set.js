﻿/*
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
		var set = new JW.Set([ this.a, this.b, this.c, this.d, this.e ]);
		this.assertUndefined(set.removeItem(this.b));
		this.assertTrue(set.equal(new JW.Set([ this.a, this.c, this.d, this.e ])));
	},
	
	testRemoveItemStatic: function() {
		var set = {};
		set.addAll([ this.a, this.b, this.c, this.d, this.e ]);
		this.assertUndefined(JW.Set.removeItem(set, this.b));
		
		var expected = {};
		expected.addAll([ this.a, this.c, this.d, this.e ]);
		this.assertTrue(JW.Set.equal(expected, set));
	},
	
	testEqual: function() {
		var a = new JW.Set([ this.a, this.b, this.c, this.d ]);
		var b = new JW.Set([ this.a, this.b, this.c, this.d ]);
		var c = new JW.Set([ this.a, this.d, this.b, this.c ]);
		var d = new JW.Set([ this.a, this.b, this.e, this.d ]);
		var e = new JW.Set([ this.a, this.b, this.c, this.d, this.e ]);
		var f = new JW.Set([ this.a, this.b, this.c ]);
		this.assertTrue(a.equal(a));
		this.assertTrue(a.equal(b));
		this.assertTrue(a.equal(c));
		this.assertFalse(a.equal(d));
		this.assertFalse(a.equal(e));
		this.assertFalse(a.equal(f));
	},
	
	testEqualStatic: function() {
		var a = {};
		var b = {};
		var c = {};
		var d = {};
		var e = {};
		var f = {};
		var g = {};
		a.addAll([ this.a, this.b, this.c, this.d ]);
		b.addAll([ this.a, this.b, this.c, this.d ]);
		c.addAll([ this.a, this.d, this.b, this.c ]);
		d.addAll([ this.a, this.b, this.e, this.d ]);
		e.addAll([ this.a, this.b, this.c, this.d, this.e ]);
		f.addAll([ this.a, this.b, this.c ]);
		this.assertTrue(JW.Set.equal(a, a));
		this.assertTrue(JW.Set.equal(a, b));
		this.assertTrue(JW.Set.equal(a, c));
		this.assertFalse(JW.Set.equal(a, d));
		this.assertFalse(JW.Set.equal(a, e));
		this.assertFalse(JW.Set.equal(a, f));
	}
});
