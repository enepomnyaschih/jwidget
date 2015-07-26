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

JW.Tests.Collection.AbstractArray.MergerTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.Array([
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
		
		source.get(1).clear();
		this.assertTarget(["a", "b", "f"], target);
		
		merger.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Array([
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
		source.get(1).clear();
		this.assertTarget(["a", "b", "f"], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 0",
			"Cleared [a,b,f]",
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
		var source = new JW.Array([
			new JW.Array()
		]);
		var target = this.createTarget();
		var merger = this.createMerger(source, target);
		merger.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTargetUnobservable: function() {
		var source = new JW.Array([
			new JW.Array(["d"])
		]);
		var mapper = this.createMerger(source);
		this.assertTrue(mapper.target instanceof JW.Array);
		this.assertTarget(["d"], mapper.target);
		mapper.destroy();
		source.destroy();
	},
	
	testAutoTargetObservable: function() {
		var source = new JW.Array([
			new JW.ObservableArray(["d"])
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
