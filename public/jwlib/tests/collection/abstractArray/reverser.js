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

JW.Tests.Collection.AbstractArray.ReverserTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.Array([1, 2, 3, 4, 5]);
		var target = source.$$toReversed();

		this.assertTarget([5, 4, 3, 2, 1], target);

		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.Array([1, 2, 3, 4, 5]);
		var target = new JW.Array();
		
		var reverser = this.createReverser(source, target);
		this.assertTarget([5, 4, 3, 2, 1], target);
		
		reverser.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Array([1, 2, 3, 4, 5]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 5",
			"Spliced -[] +[0:[5,4,3,2,1]] to []",
			"Changed"
		);
		var reverser = this.createReverser(source, target);
		this.assertTarget([5, 4, 3, 2, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 0",
			"Cleared [5,4,3,2,1]",
			"Changed"
		);
		reverser.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var reverser = this.createReverser(source, target);
		reverser.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Array([1, 2, 3]);
		var reverser = this.createReverser(source);
		this.assertTrue(reverser.target instanceof JW.Array);
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
