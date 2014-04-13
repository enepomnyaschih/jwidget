﻿/*
	jWidget Lib tests.
	
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

JW.Tests.Property.PropertyTestCase = JW.Unit.TestCase.extend({
	testProperty: function()
	{
		var property = new JW.Property(false);
		this.assertStrictEqual(false, property.get());
		property.changeEvent.bind(function(params) {
			this.output(params.oldValue + " to " + params.value);
		}, this);
		this.setExpectedOutput("false to 10");
		property.set(10);
		this.assertStrictEqual(10, property.get());
		this.setExpectedOutput("10 to 15");
		property.set(15);
		this.assertStrictEqual(15, property.get());
		this.setExpectedOutput();
		property.set(15);
		this.assertStrictEqual(15, property.get());
		property.destroy();
	},
	
	testBindTo: function()
	{
		var source = new JW.Property(1);
		var target = new JW.Property();
		target.changeEvent.bind(function(params) {
			this.output(params.oldValue + " to " + params.value);
		}, this);
		this.setExpectedOutput("null to 1");
		target.bindTo(source);
		this.assertStrictEqual(1, target.get());
		this.setExpectedOutput("1 to 2");
		source.set(2);
		this.assertStrictEqual(2, target.get());
		var source2 = new JW.Property(3);
		this.setExpectedOutput("2 to 3");
		target.bindTo(source2);
		this.assertStrictEqual(3, target.get());
		this.setExpectedOutput();
		source.set(4);
		this.assertStrictEqual(3, target.get());
		target.bindTo();
		source.set(5);
		source2.set(6);
		this.assertStrictEqual(3, target.get());
		this.setExpectedOutput("3 to 5");
		target.bindTo(source);
		this.assertStrictEqual(5, target.get());
		this.setExpectedOutput();
		target.destroy();
		source.set(7);
		source2.set(8);
		source.destroy();
		source2.destroy();
	},
	
	testOwnValue: function() {
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroy: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var property = new JW.Property();
		var a = new cls(this, "a");
		var b = new cls(this, "b");
		var c = new cls(this, "c");
		property.ownValue();
		property.set(a);
		this.setExpectedOutput("destroy a");
		property.set(b);
		this.setExpectedOutput();
		property.set(b);
		this.setExpectedOutput("destroy b");
		property.set(null);
		this.setExpectedOutput();
		property.set(c);
		this.setExpectedOutput("destroy c");
		property.destroy();
	},
	
	testNull: function() {
		var property = new JW.Property();
		this.assertStrictEqual(null, property.get());
		property.set();
		this.assertStrictEqual(null, property.get());
	}
});
