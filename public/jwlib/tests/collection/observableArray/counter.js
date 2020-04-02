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

JW.Tests.Collection.ObservableArray.CounterTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5, 7]);
		var target = source.$$count(this.countFunc, this);
		var subscription = JW.Tests.Collection.subscribeToProperty(this, target);

		this.assertStrictEqual(4, target.get());

		this.setExpectedOutput("4 > 6");
		source.splice( // 6,7,3,8,9,5,10,11,7
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testCounter: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5, 7]);
		var target = this.createTarget();

		this.setExpectedOutput("0 > 4");
		var counter = this.createCounter(source, target);
		this.assertStrictEqual(4, target.get());

		this.setExpectedOutput("4 > 6");
		source.splice( // 6,7,3,8,9,5,10,11,7
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput("6 > 7");
		source.set(7, 6); // 6,7,3,8,9,5,7,11,7
		this.assertStrictEqual(7, target.get());

		this.setExpectedOutput("7 > 6");
		source.set(2, 1); // 6,2,3,8,9,5,7,11,7
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		source.set(0, 3); // 6,2,3,0,9,5,7,11,7
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		source.set(1, 5); // 6,2,3,8,9,1,7,11,7
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		source.move(1, 5); // 6,3,8,9,1,2,7,11,7
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		source.move(3, 6); // 6,3,8,1,2,7,9,11,7
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		source.move(7, 0); // 11,6,3,8,1,2,7,9,7
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		source.move(5, 0); // 2,11,6,3,8,1,7,9,7
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput();
		source.reorder([2, 3, 6, 5, 0, 8, 4, 1, 7]); // 8,9,2,11,7,3,6,7,1
		this.assertStrictEqual(6, target.get());

		this.setExpectedOutput("6 > 5");
		source.splice(
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 4)],
			[new JW.AbstractArray.IndexItems(0, [1, 2]),
			 new JW.AbstractArray.IndexItems(3, [4]),
			 new JW.AbstractArray.IndexItems(6, [7, 8, 9])]); // 1,2,2,4,7,1,7,8,9
		this.assertStrictEqual(5, target.get());

		this.setExpectedOutput("5 > 0");
		source.clear();
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput("0 > 2");
		source.addAll([1, 2, 3]);
		this.assertStrictEqual(2, target.get());

		this.setExpectedOutput("2 > 0");
		counter.destroy()
		this.assertStrictEqual(0, target.get());

		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},

	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var counter = this.createCounter(source, target);
		counter.destroy();
		target.destroy();
		source.destroy();
	},

	testAutoTarget: function() {
		var source = new JW.ObservableArray([1, 2, 3]);
		var counter = this.createCounter(source);
		this.assertTrue(counter.target instanceof JW.Property);
		this.assertStrictEqual(2, counter.target.get());
		counter.destroy();
		source.destroy();
	},

	testReconfigure: function() {
		var Cls = function() {
			Cls._super.call(this);
			this.completed = false;
		};

		JW.extend(Cls, JW.Class);

		var source = new JW.ObservableArray();
		var counter = source.createCounter({
			filterItem: function(item) {
				return true;
			}
		});
		var target = counter.target;

		source.add(new Cls());
		source.add(new Cls());
		source.add(new Cls());
		this.assertStrictEqual(3, target.get());

		source.get(1).completed = true;
		counter.recount();
		this.assertStrictEqual(3, target.get());

		counter.reconfigure({
			filterItem: function(item) {
				return item.completed;
			}
		});
		this.assertStrictEqual(1, target.get());

		counter.reconfigure({
			filterItem: function(item) {
				return true;
			}
		});
		this.assertStrictEqual(3, target.get());

		counter.destroy();
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
