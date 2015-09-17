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

JW.Tests.Collection.AbstractArray.CounterTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.Array([1, 2, 3, 4, 5, 7]);
		var target = source.$$count(this.countFunc, this);
		JW.Tests.Collection.subscribeToProperty(this, target);

		this.assertStrictEqual(4, target.get());

		target.destroy();
		source.destroy();
	},

	testCounter: function() {
		var source = new JW.Array([1, 2, 3, 4, 5, 7]);
		var target = this.createTarget();

		this.setExpectedOutput("0 > 4");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(4, target.get());

		this.setExpectedOutput("4 > 0");
		counter.destroy()
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},

	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var counter = this.createCounter(source, target);
		counter.destroy();
		target.destroy();
		source.destroy();
	},

	testAutoTarget: function() {
		var source = new JW.Array([1, 2, 3]);
		var counter = this.createCounter(source);
		this.assertTrue(counter.target instanceof JW.Property);
		this.assertStrictEqual(2, counter.target.get());
		counter.destroy();
		source.destroy();
	},

	testRecount: function() {
		var source = new JW.Array([1, 3, 2, 4, 6, 5, 7, 9, 11, 8, 10, 12, 14, 16]); // 11000111100000
		var target = this.createTarget();

		this.setExpectedOutput("0 > 6");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(6, target.get());

		source.clear();
		source.addAll([1, 20, 2, 21, 23, 22, 24, 9, 11, 25, 10, 27, 14, 16]);

		this.setExpectedOutput("6 > 7");
		counter.recount();
		this.assertStrictEqual(7, target.get());

		source.clear();
		source.addAll([1, 20, 2, 21, 23, 22, 3, 9, 11, 25, 5, 27, 14, 16]);

		this.setExpectedOutput("7 > 9");
		counter.recount();
		this.assertStrictEqual(9, target.get());

		this.setExpectedOutput("9 > 6");
		counter.reconfigure({filterItem: function(x) { return x >= 20; }});
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput("6 > 0");
		counter.destroy();

		target.destroy();
		source.destroy();
	},

	createTarget: function(target) {
		var target = new JW.Property(0);
		JW.Tests.Collection.subscribeToProperty(this, target);
		return target;
	},

	createCounter: function(source, target) {
		return source.createCounter({
			target: target,
			filterItem: this.countFunc,
			scope: this
		});
	},

	countFunc: function(x) {
		this.assertTrue(this instanceof JW.Unit.TestCase);
		return x % 2 === 1;
	}
});
