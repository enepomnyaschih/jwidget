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

JW.Tests.Collection.AbstractArray.IndexerTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var d = new JW.Proxy("d");
		var c = new JW.Proxy("c");
		var source = new JW.Array([ a, d, c, b ]);
		var target = source.$$index(this.indexFunc, this);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d }, target);

		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var d = new JW.Proxy("d");
		var c = new JW.Proxy("c");
		var source = new JW.Array([ a, d, c, b ]);
		var target = new JW.Map();
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d }, target);
		
		indexer.destroy();
		this.assertTarget({}, target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var d = new JW.Proxy("d");
		var c = new JW.Proxy("c");
		var source = new JW.Array([ a, d, c, b ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 4",
			"Spliced -{} +{a:a,b:b,c:c,d:d}",
			"Changed"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d }, target);
		
		this.setExpectedOutput(
			"Changed size from 4 to 0",
			"Spliced -{a:a,b:b,c:c,d:d} +{}",
			"Changed"
		);
		indexer.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var d = new JW.Proxy("d");
		var x = new JW.Proxy("x");
		
		var source1 = new JW.Array([ a, b ]);
		var source2 = new JW.Array([ c, d ]);
		
		var target = this.createTarget();
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{x:x}",
			"Changed"
		);
		target.set(x, "x");
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 3",
			"Spliced -{} +{a:a,b:b}",
			"Changed"
		);
		var indexer1 = this.createIndexer(source1, target);
		this.assertTarget({ "x": x, "a": a, "b": b }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -{} +{c:c,d:d}",
			"Changed"
		);
		var indexer2 = this.createIndexer(source2, target);
		this.assertTarget({ "x": x, "a": a, "b": b, "c": c, "d": d }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 3",
			"Spliced -{c:c,d:d} +{}",
			"Changed"
		);
		indexer2.destroy();
		this.assertTarget({ "x": x, "a": a, "b": b }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -{a:a,b:b} +{}",
			"Changed"
		);
		indexer1.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput();
		target.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var indexer = this.createIndexer(source, target);
		indexer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.Array([ d ]);
		var indexer = this.createIndexer(source);
		this.assertTrue(indexer.target instanceof JW.Map);
		this.assertTarget({ "d": d }, indexer.target);
		indexer.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableMap();
		JW.Tests.Collection.subscribeToMap(this, target, function(x) { return x.value; });
		return target;
	},
	
	createIndexer: function(source, target) {
		return source.createIndexer({
			target : target,
			getKey : this.indexFunc,
			scope  : this
		});
	},

	indexFunc: function(item) {
		this.assertTrue(this instanceof JW.Unit.TestCase);
		return item.value;
	},
	
	assertTarget: function(expected, target) {
		this.assertTrue(JW.Map.equal(expected, target.getJson()));
	}
});
