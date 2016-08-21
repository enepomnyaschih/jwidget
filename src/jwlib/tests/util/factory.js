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

JW.Tests.Util.FactoryTestCase = JW.Unit.TestCase.extend({
	testFactory: function() {
		// Base time unit
		var TimeUnit = function() {
		    TimeUnit._super.call(this);
		};

		JW.extend(TimeUnit, JW.Class, {
		    // abstract id: String;
		    // abstract add(date: Date, count: number): Date;
		});

		JW.makeRegistry(TimeUnit);

		// Date time unit
		TimeUnit.Day = function() {
		    TimeUnit.Day._super.call(this);
		};

		JW.extend(TimeUnit.Day, TimeUnit, {
		    id: "day",
		    add: function(date, count) { date.setDate(date.getDate() + count); }
		});

		TimeUnit.registerItem(new TimeUnit.Day());

		// Month time unit
		TimeUnit.Month = function() {
		    TimeUnit.Month._super.call(this);
		};

		JW.extend(TimeUnit.Month, TimeUnit, {
		    id: "month",
		    add: function(date, count) { date.setMonth(date.getMonth() + count); }
		});

		TimeUnit.registerItem(new TimeUnit.Month());

		// Example of how to utilize this
		function addDate(date, count, unit) {
		    TimeUnit.getItem(unit).add(date, count);
		}

		var date = new Date(2000, 0, 1);
		addDate(date, 40, "day");
		this.assertStrictEqual(2000, date.getFullYear());
		this.assertStrictEqual(1, date.getMonth());
		this.assertStrictEqual(10, date.getDate());
		this.assertTrue(TimeUnit.itemArray[0] instanceof TimeUnit.Day);
		this.assertTrue(TimeUnit.itemArray[1] instanceof TimeUnit.Month);
	}
});
