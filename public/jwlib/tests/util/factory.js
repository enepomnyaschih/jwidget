/*
	jWidget Lib tests.

MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
