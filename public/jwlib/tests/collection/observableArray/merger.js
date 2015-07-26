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

JW.Tests.Collection.ObservableArray.MergerTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.ObservableArray([
			new JW.Array(["a", "b"]),
			new JW.ObservableArray(["c", "d", "e"]),
			new JW.Array(),
			new JW.ObservableArray(["f"])
		]);
		var target = new JW.Array();
		
		var merger = this.createMerger(source, target);
		this.assertTarget(["a", "b", "c", "d", "e", "f"], target);
		
		source.get(1).splice(
			[new JW.AbstractArray.IndexCount(1, 2)],
			[new JW.AbstractArray.IndexItems(0, ["g", "h"]),
			 new JW.AbstractArray.IndexItems(3, ["i"])]);
		this.assertTarget(["a", "b", "g", "h", "c", "i", "f"], target);
		
		source.get(1).set("j", 1);
		this.assertTarget(["a", "b", "g", "j", "c", "i", "f"], target);
		
		source.get(1).move(2, 0);
		this.assertTarget(["a", "b", "c", "g", "j", "i", "f"], target);
		
		source.get(1).move(1, 3);
		this.assertTarget(["a", "b", "c", "j", "i", "g", "f"], target);
		
		source.get(1).reorder([3, 0, 2, 1]);
		this.assertTarget(["a", "b", "j", "g", "i", "c", "f"], target);
		
		source.get(1).clear(); // [a,b] []! [] [f]!
		this.assertTarget(["a", "b", "f"], target);
		
		source.splice( // []! [f]! [c,d]! [e]
			[new JW.AbstractArray.IndexCount(0, 1),
			 new JW.AbstractArray.IndexCount(2, 1)],
			[new JW.AbstractArray.IndexItems(2, [new JW.ObservableArray(["c", "d"]), new JW.Array(["e"])])]);
		this.assertTarget(["f", "c", "d", "e"], target);
		
		source.set(new JW.Array(["a", "b", "g"]), 1); // []! [a,b,g] [c,d]! [e]
		this.assertTarget(["a", "b", "g", "c", "d", "e"], target);
		
		source.get(0).add("f"); // [f]! [a,b,g] [c,d]! [e]
		this.assertTarget(["f", "a", "b", "g", "c", "d", "e"], target);
		
		source.move(0, 3); // [a,b,g] [c,d]! [e] [f]!
		this.assertTarget(["a", "b", "g", "c", "d", "e", "f"], target);
		
		source.move(2, 0); // [e] [a,b,g] [c,d]! [f]!
		this.assertTarget(["e", "a", "b", "g", "c", "d", "f"], target);
		
		source.move(1, 3); // [e] [c,d]! [f]! [a,b,g]
		this.assertTarget(["e", "c", "d", "f", "a", "b", "g"], target);
		
		source.addAll([new JW.Array(["h", "i"]), new JW.Array(["j", "k"])], 0); // [h,i] [j,k] [e] [c,d]! [f]! [a,b,g]
		this.assertTarget(["h", "i", "j", "k", "e", "c", "d", "f", "a", "b", "g"], target);
		
		source.move(3, 1);
		this.assertTarget(["h", "i", "c", "d", "j", "k", "e", "f", "a", "b", "g"], target);
		
		source.clear();
		this.assertTarget([], target);
		
		source.addAll([new JW.Array(["a", "b"]), new JW.Array(["c", "d"])]);
		this.assertTarget(["a", "b", "c", "d"], target);
		
		merger.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableArray([
			new JW.Array(["a", "b"]),
			new JW.ObservableArray(["c", "d", "e"]),
			new JW.Array(),
			new JW.ObservableArray(["f"])
		]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 6",
			"Spliced -[] +[0:[a,b,c,d,e,f]] to []",
			"Changed"
		);
		var merger = this.createMerger(source, target);
		this.assertTarget(["a", "b", "c", "d", "e", "f"], target);
		
		this.setExpectedOutput(
			"Changed length from 6 to 7",
			"Spliced -[3:[d,e]] +[2:[g,h],5:[i]] to [a,b,c,d,e,f]",
			"Changed"
		);
		source.get(1).splice(
			[new JW.AbstractArray.IndexCount(1, 2)],
			[new JW.AbstractArray.IndexItems(0, ["g", "h"]),
			 new JW.AbstractArray.IndexItems(3, ["i"])]);
		this.assertTarget(["a", "b", "g", "h", "c", "i", "f"], target);
		
		this.setExpectedOutput(
			"Replaced h with j at 3",
			"Changed"
		);
		source.get(1).set("j", 1);
		this.assertTarget(["a", "b", "g", "j", "c", "i", "f"], target);
		
		this.setExpectedOutput(
			"Moved c from 4 to 2",
			"Changed"
		);
		source.get(1).move(2, 0);
		this.assertTarget(["a", "b", "c", "g", "j", "i", "f"], target);
		
		this.setExpectedOutput(
			"Moved g from 3 to 5",
			"Changed"
		);
		source.get(1).move(1, 3);
		this.assertTarget(["a", "b", "c", "j", "i", "g", "f"], target);
		
		this.setExpectedOutput(
			"Reordered [a,b,c,j,i,g,f] by [0,1,5,2,4,3,6]",
			"Changed"
		);
		source.get(1).reorder([3, 0, 2, 1]);
		this.assertTarget(["a", "b", "j", "g", "i", "c", "f"], target);
		
		this.setExpectedOutput(
			"Changed length from 7 to 3",
			"Spliced -[2:[j,g,i,c]] +[] to [a,b,j,g,i,c,f]",
			"Changed"
		);
		source.get(1).clear(); // [a,b] [] [] [f]
		this.assertTarget(["a", "b", "f"], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 4",
			"Spliced -[0:[a,b]] +[1:[c,d,e]] to [a,b,f]",
			"Changed"
		);
		source.splice( // []! [f]! [c,d]! [e]
			[new JW.AbstractArray.IndexCount(0, 1),
			 new JW.AbstractArray.IndexCount(2, 1)],
			[new JW.AbstractArray.IndexItems(2, [new JW.ObservableArray(["c", "d"]), new JW.Array(["e"])])]);
		this.assertTarget(["f", "c", "d", "e"], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 6",
			"Spliced -[0:[f]] +[0:[a,b,g]] to [f,c,d,e]",
			"Changed"
		);
		source.set(new JW.Array(["a", "b", "g"]), 1); // []! [a,b,g] [c,d]! [e]
		this.assertTarget(["a", "b", "g", "c", "d", "e"], target);
		
		this.setExpectedOutput(
			"Changed length from 6 to 7",
			"Spliced -[] +[0:[f]] to [a,b,g,c,d,e]",
			"Changed"
		);
		source.get(0).add("f"); // [f]! [a,b,g] [c,d]! [e]
		this.assertTarget(["f", "a", "b", "g", "c", "d", "e"], target);
		
		this.setExpectedOutput(
			"Reordered [f,a,b,g,c,d,e] by [6,0,1,2,3,4,5]",
			"Changed"
		);
		source.move(0, 3); // [a,b,g] [c,d]! [e] [f]!
		this.assertTarget(["a", "b", "g", "c", "d", "e", "f"], target);
		
		this.setExpectedOutput(
			"Reordered [a,b,g,c,d,e,f] by [1,2,3,4,5,0,6]",
			"Changed"
		);
		source.move(2, 0); // [e] [a,b,g] [c,d]! [f]!
		this.assertTarget(["e", "a", "b", "g", "c", "d", "f"], target);
		
		this.setExpectedOutput(
			"Reordered [e,a,b,g,c,d,f] by [0,4,5,6,1,2,3]",
			"Changed"
		);
		source.move(1, 3); // [e] [c,d]! [f]! [a,b,g]
		this.assertTarget(["e", "c", "d", "f", "a", "b", "g"], target);
		
		this.setExpectedOutput(
			"Changed length from 7 to 11",
			"Spliced -[] +[0:[h,i,j,k]] to [e,c,d,f,a,b,g]",
			"Changed"
		);
		source.addAll([new JW.Array(["h", "i"]), new JW.Array(["j", "k"])], 0); // [h,i] [j,k] [e] [c,d]! [f]! [a,b,g]
		this.assertTarget(["h", "i", "j", "k", "e", "c", "d", "f", "a", "b", "g"], target);
		
		this.setExpectedOutput(
			"Reordered [h,i,j,k,e,c,d,f,a,b,g] by [0,1,4,5,6,2,3,7,8,9,10]",
			"Changed"
		);
		source.move(3, 1);
		this.assertTarget(["h", "i", "c", "d", "j", "k", "e", "f", "a", "b", "g"], target);
		
		this.setExpectedOutput(
			"Changed length from 11 to 0",
			"Cleared [h,i,c,d,j,k,e,f,a,b,g]",
			"Changed"
		);
		source.clear();
		this.assertTarget([], target);
		
		this.setExpectedOutput(
			"Changed length from 0 to 4",
			"Spliced -[] +[0:[a,b,c,d]] to []",
			"Changed"
		);
		source.addAll([new JW.Array(["a", "b"]), new JW.Array(["c", "d"])]);
		this.assertTarget(["a", "b", "c", "d"], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 0",
			"Cleared [a,b,c,d]",
			"Changed"
		);
		merger.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray([
			new JW.ObservableArray()
		]);
		var target = this.createTarget();
		var merger = this.createMerger(source, target);
		merger.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableArray([
			new JW.Array(["d"])
		]);
		var mapper = this.createMerger(source);
		this.assertTrue(mapper.target instanceof JW.ObservableArray);
		this.assertTarget(["d"], mapper.target);
		mapper.destroy();
		source.destroy();
	},
	
	createTarget: function(target) {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createMerger: function(source, target) {
		return source.createMerger({target: target});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
