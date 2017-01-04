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

JW.Tests.Collection.ObservableArray.FiltererTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5, 7]);
		var target = source.$$filter(this.filterFunc, this);
		var subscription = JW.Tests.Collection.subscribeToArray(this, target);

		this.assertTarget([1, 3, 5, 7], target);

		this.setExpectedOutput(
			"Changed length from 4 to 6",
			"Spliced -[0:[1]] +[0:[7],2:[9],4:[11]] to [1,3,5,7]",
			"Changed"
		);
		source.splice( // 6,7,3,8,9,5,10,11,7
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertTarget([7, 3, 9, 5, 11, 7], target);

		subscription.destroy();
		target.destroy()
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5, 7]);
		var target = new JW.Array();
		
		var filterer = this.createFilterer(source, target);
		this.assertTarget([1, 3, 5, 7], target);
		
		source.splice( // 6,7,3,8,9,5,10,11,7
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertTarget([7, 3, 9, 5, 11, 7], target);
		
		source.set(7, 6); // 6,7,3,8,9,5,7,11,7
		this.assertTarget([7, 3, 9, 5, 7, 11, 7], target);
		
		source.set(2, 1); // 6,2,3,8,9,5,7,11,7
		this.assertTarget([3, 9, 5, 7, 11, 7], target);
		
		source.set(0, 3); // 6,2,3,0,9,5,7,11,7
		this.assertTarget([3, 9, 5, 7, 11, 7], target);
		
		source.set(1, 5); // 6,2,3,8,9,1,7,11,7
		this.assertTarget([3, 9, 1, 7, 11, 7], target);
		
		source.move(1, 5); // 6,3,8,9,1,2,7,11,7
		this.assertTarget([3, 9, 1, 7, 11, 7], target);
		
		source.move(3, 6); // 6,3,8,1,2,7,9,11,7
		this.assertTarget([3, 1, 7, 9, 11, 7], target);
		
		source.move(7, 0); // 11,6,3,8,1,2,7,9,7
		this.assertTarget([11, 3, 1, 7, 9, 7], target);
		
		source.move(5, 0); // 2,11,6,3,8,1,7,9,7
		this.assertTarget([11, 3, 1, 7, 9, 7], target);
		
		source.reorder([2, 3, 6, 5, 0, 8, 4, 1, 7]); // 8,9,2,11,7,3,6,7,1
		this.assertTarget([9, 11, 7, 3, 7, 1], target);
		
		source.splice(
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 4)],
			[new JW.AbstractArray.IndexItems(0, [1, 2]),
			 new JW.AbstractArray.IndexItems(3, [4]),
			 new JW.AbstractArray.IndexItems(6, [7, 8, 9])]); // 1,2,2,4,7,1,7,8,9
		this.assertTarget([1, 7, 1, 7, 9], target);
		
		source.clear();
		this.assertTarget([], target);
		
		source.addAll([1, 2, 3]);
		this.assertTarget([1, 3], target);
		
		filterer.destroy()
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5, 7]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 4",
			"Spliced -[] +[0:[1,3,5,7]] to []",
			"Changed"
		);
		var filterer = this.createFilterer(source, target);
		this.assertTarget([1, 3, 5, 7], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 6",
			"Spliced -[0:[1]] +[0:[7],2:[9],4:[11]] to [1,3,5,7]",
			"Changed"
		);
		source.splice( // 6,7,3,8,9,5,10,11,7
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertTarget([7, 3, 9, 5, 11, 7], target);
		
		this.setExpectedOutput(
			"Changed length from 6 to 7",
			"Spliced -[] +[4:[7]] to [7,3,9,5,11,7]",
			"Changed"
		);
		source.set(7, 6); // 6,7,3,8,9,5,7,11,7
		this.assertTarget([7, 3, 9, 5, 7, 11, 7], target);
		
		this.setExpectedOutput(
			"Changed length from 7 to 6",
			"Spliced -[0:[7]] +[] to [7,3,9,5,7,11,7]",
			"Changed"
		);
		source.set(2, 1); // 6,2,3,8,9,5,7,11,7
		this.assertTarget([3, 9, 5, 7, 11, 7], target);
		
		this.setExpectedOutput();
		source.set(0, 3); // 6,2,3,0,9,5,7,11,7
		this.assertTarget([3, 9, 5, 7, 11, 7], target);
		
		this.setExpectedOutput(
			"Replaced 5 with 1 at 2",
			"Changed"
		);
		source.set(1, 5); // 6,2,3,8,9,1,7,11,7
		this.assertTarget([3, 9, 1, 7, 11, 7], target);
		
		this.setExpectedOutput();
		source.move(1, 5); // 6,3,8,9,1,2,7,11,7
		this.assertTarget([3, 9, 1, 7, 11, 7], target);
		
		this.setExpectedOutput(
			"Moved 9 from 1 to 3",
			"Changed"
		);
		source.move(3, 6); // 6,3,8,1,2,7,9,11,7
		this.assertTarget([3, 1, 7, 9, 11, 7], target);
		
		this.setExpectedOutput(
			"Moved 11 from 4 to 0",
			"Changed"
		);
		source.move(7, 0); // 11,6,3,8,1,2,7,9,7
		this.assertTarget([11, 3, 1, 7, 9, 7], target);
		
		this.setExpectedOutput();
		source.move(5, 0); // 2,11,6,3,8,1,7,9,7
		this.assertTarget([11, 3, 1, 7, 9, 7], target);
		
		this.setExpectedOutput(
			"Reordered [11,3,1,7,9,7] by [1,3,5,2,0,4]",
			"Changed"
		);
		source.reorder([2, 3, 6, 5, 0, 8, 4, 1, 7]); // 8,9,2,11,7,3,6,7,1
		this.assertTarget([9, 11, 7, 3, 7, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 6 to 5",
			"Spliced -[0:[9,11,7,3]] +[0:[1],3:[7,9]] to [9,11,7,3,7,1]",
			"Changed"
		);
		source.splice(
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 4)],
			[new JW.AbstractArray.IndexItems(0, [1, 2]),
			 new JW.AbstractArray.IndexItems(3, [4]),
			 new JW.AbstractArray.IndexItems(6, [7, 8, 9])]); // 1,2,2,4,7,1,7,8,9
		this.assertTarget([1, 7, 1, 7, 9], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 0",
			"Cleared [1,7,1,7,9]",
			"Changed"
		);
		source.clear();
		this.assertTarget([], target);
		
		this.setExpectedOutput(
			"Changed length from 0 to 2",
			"Spliced -[] +[0:[1,3]] to []",
			"Changed"
		);
		source.addAll([1, 2, 3]);
		this.assertTarget([1, 3], target);
		
		this.setExpectedOutput(
			"Changed length from 2 to 0",
			"Cleared [1,3]",
			"Changed"
		);
		filterer.destroy()
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var filterer = this.createFilterer(source, target);
		filterer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableArray([1, 2, 3]);
		var filterer = this.createFilterer(source);
		this.assertTrue(filterer.target instanceof JW.ObservableArray);
		this.assertTarget([1, 3], filterer.target);
		filterer.destroy();
		source.destroy();
	},
	
	testReconfigure: function() {
		var Cls = function() {
			Cls._super.call(this);
			this.completed = false;
		};
		
		JW.extend(Cls, JW.Class);
		
		var source = new JW.ObservableArray();
		var filterer = source.createFilterer({
			filterItem: function(item) {
				return true;
			}
		});
		var target = filterer.target;
		
		source.add(new Cls());
		source.add(new Cls());
		source.add(new Cls());
		this.assertStrictEqual(3, target.length.get());
		
		source.get(1).completed = true;
		filterer.refilterAt(1);
		this.assertStrictEqual(3, target.length.get());
		
		filterer.reconfigure({
			filterItem: function(item) {
				return item.completed;
			}
		});
		this.assertStrictEqual(1, target.length.get());
		this.assertTrue(target.get(0).completed);
		
		filterer.reconfigure({
			filterItem: function(item) {
				return true;
			}
		});
		this.assertStrictEqual(3, target.length.get());
		this.assertFalse(target.get(0).completed);
		this.assertTrue(target.get(1).completed);
		this.assertFalse(target.get(2).completed);
		
		filterer.destroy();
		source.destroy();
	},
	
	testFiltererBug: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		var target = new JW.Array();
		
		var filterer = this.createFilterer(source, target);
		this.assertTarget([1, 3, 5, 7, 9], target);
		
		source.splice(
			[new JW.AbstractArray.IndexCount(1, 2),
			 new JW.AbstractArray.IndexCount(5, 2)],
			[]);
		this.assertTarget([1, 5, 9], target);
		
		filterer.destroy()
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	createTarget: function(target) {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createFilterer: function(source, target) {
		return source.createFilterer({
			target: target,
			filterItem: this.filterFunc,
			scope: this
		});
	},

	filterFunc: function(x) {
		this.assertTrue(this instanceof JW.Unit.TestCase);
		return x % 2 === 1;
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
