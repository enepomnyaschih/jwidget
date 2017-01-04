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

JW.Tests.Collection.ObservableArray.ReverserTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5]);
		var target = source.$$toReversed();
		var subscription = JW.Tests.Collection.subscribeToArray(this, target);

		this.assertTarget([5, 4, 3, 2, 1], target);

		this.setExpectedOutput(
			"Changed length from 5 to 8",
			"Spliced -[1:[4],3:[2,1]] +[0:[11,10],3:[9,8],6:[7,6]] to [5,4,3,2,1]",
			"Changed"
		);
		source.splice( // 6,7,3,8,9,1,10,11
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertTarget([11, 10, 5, 9, 8, 3, 7, 6], target);

		this.setExpectedOutput();
		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5]);
		var target = new JW.Array();
		
		var reverser = this.createReverser(source, target);
		this.assertTarget([5, 4, 3, 2, 1], target);
		
		source.splice( // 6,7,3,8,9,1,10,11
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertTarget([11, 10, 5, 9, 8, 3, 7, 6], target);
		
		source.set(7, 6); // 6,7,3,8,9,5,7,11
		this.assertTarget([11, 7, 5, 9, 8, 3, 7, 6], target);
		
		source.move(4, 6); // 6,7,3,8,5,7,9,11
		this.assertTarget([11, 9, 7, 5, 8, 3, 7, 6], target);
		
		source.reorder([2, 3, 1, 5, 0, 4, 6, 7]); // 5,3,6,7,7,8,9,11
		this.assertTarget([11, 9, 8, 7, 7, 6, 3, 5], target);
		
		source.splice(
			[new JW.AbstractArray.IndexCount(3, 3),
			 new JW.AbstractArray.IndexCount(7, 1)],
			[new JW.AbstractArray.IndexItems(0, [1, 2]),
			 new JW.AbstractArray.IndexItems(4, [4]),
			 new JW.AbstractArray.IndexItems(7, [7, 8, 9])]); // 1,2,5,3,4,6,9,7,8,9
		this.assertTarget([9, 8, 7, 9, 6, 4, 3, 5, 2, 1], target);
		
		source.clear();
		this.assertTarget([], target);
		
		source.addAll([1, 2, 3]);
		this.assertTarget([3, 2, 1], target);
		
		reverser.destroy()
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableArray([1, 2, 3, 4, 5]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 5",
			"Spliced -[] +[0:[5,4,3,2,1]] to []",
			"Changed"
		);
		var reverser = this.createReverser(source, target);
		this.assertTarget([5, 4, 3, 2, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 8",
			"Spliced -[1:[4],3:[2,1]] +[0:[11,10],3:[9,8],6:[7,6]] to [5,4,3,2,1]",
			"Changed"
		);
		source.splice( // 6,7,3,8,9,1,10,11
			[new JW.AbstractArray.IndexCount(0, 2),
			 new JW.AbstractArray.IndexCount(3, 1)],
			[new JW.AbstractArray.IndexItems(0, [6, 7]),
			 new JW.AbstractArray.IndexItems(3, [8, 9]),
			 new JW.AbstractArray.IndexItems(6, [10, 11])]);
		this.assertTarget([11, 10, 5, 9, 8, 3, 7, 6], target);
		
		this.setExpectedOutput(
			"Replaced 10 with 7 at 1",
			"Changed"
		);
		source.set(7, 6); // 6,7,3,8,9,5,7,11
		this.assertTarget([11, 7, 5, 9, 8, 3, 7, 6], target);
		
		this.setExpectedOutput(
			"Moved 9 from 3 to 1",
			"Changed"
		);
		source.move(4, 6); // 6,7,3,8,5,7,9,11
		this.assertTarget([11, 9, 7, 5, 8, 3, 7, 6], target);
		
		this.setExpectedOutput(
			"Reordered [11,9,7,5,8,3,7,6] by [0,1,3,7,2,6,4,5]",
			"Changed"
		);
		source.reorder([2, 3, 1, 5, 0, 4, 6, 7]); // 5,3,6,7,7,8,9,11
		this.assertTarget([11, 9, 8, 7, 7, 6, 3, 5], target);
		
		this.setExpectedOutput(
			"Changed length from 8 to 10",
			"Spliced -[0:[11],2:[8,7,7]] +[0:[9,8,7],5:[4],8:[2,1]] to [11,9,8,7,7,6,3,5]",
			"Changed"
		);
		source.splice(
			[new JW.AbstractArray.IndexCount(3, 3),
			 new JW.AbstractArray.IndexCount(7, 1)],
			[new JW.AbstractArray.IndexItems(0, [1, 2]),
			 new JW.AbstractArray.IndexItems(4, [4]),
			 new JW.AbstractArray.IndexItems(7, [7, 8, 9])]); // 1,2,5,3,4,6,9,7,8,9
		this.assertTarget([9, 8, 7, 9, 6, 4, 3, 5, 2, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 10 to 0",
			"Cleared [9,8,7,9,6,4,3,5,2,1]",
			"Changed"
		);
		source.clear();
		this.assertTarget([], target);
		
		this.setExpectedOutput(
			"Changed length from 0 to 3",
			"Spliced -[] +[0:[3,2,1]] to []",
			"Changed"
		);
		source.addAll([1, 2, 3]);
		this.assertTarget([3, 2, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 0",
			"Cleared [3,2,1]",
			"Changed"
		);
		reverser.destroy()
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var reverser = this.createReverser(source, target);
		reverser.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableArray([1, 2, 3]);
		var reverser = this.createReverser(source);
		this.assertTrue(reverser.target instanceof JW.ObservableArray);
		this.assertTarget([3, 2, 1], reverser.target);
		reverser.destroy();
		source.destroy();
	},
	
	createTarget: function(target) {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createReverser: function(source, target) {
		return source.createReverser({target: target});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
