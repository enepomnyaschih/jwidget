/*
	jWidget Lib tests.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.Tests.Util.Collection.IndexerTestCase = JW.Unit.TestCase.extend({
	testIndexer: function() {
		var d = JW("d");
		var source = new JW.Collection([ d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Added d at d",
			"Changed",
			"Changed size from 0 to 1"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTrue(JW.equal({ "d": d }, target.base));
		
		// d
		var f = JW("f");
		this.setExpectedOutput(
			"Added f at f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.addAll([ f ]);
		this.assertTrue(JW.equal({ "d": d, "f": f }, target.base));
		
		// d f
		var c = JW("c");
		this.setExpectedOutput(
			"Added c at c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.add(c, 1);
		this.assertTrue(JW.equal({ "d": d, "f": f, "c": c }, target.base));
		
		// d c f
		var b = JW("b");
		var m = JW("m");
		this.setExpectedOutput(
			"Added b at b",
			"Added m at m",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.addAll([ b, m ], 0);
		this.assertTrue(JW.equal({ "d": d, "f": f, "c": c, "b": b, "m": m }, target.base));
		
		// b m d c f
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertTrue(JW.equal({ "d": d, "f": f, "c": c, "b": b, "m": m }, target.base));
		
		var a = JW("a");
		this.setExpectedOutput(
			"Added a at a",
			"Changed",
			"Changed size from 5 to 6"
		);
		source.add(a, 5);
		this.assertTrue(JW.equal({ "d": d, "f": f, "c": c, "b": b, "m": m, "a": a }, target.base));
		
		// b m d c f a
		this.setExpectedOutput(
			"Removed m at m",
			"Changed",
			"Changed size from 6 to 5"
		);
		source.remove(1);
		this.assertTrue(JW.equal({ "d": d, "f": f, "c": c, "b": b, "a": a }, target.base));
		
		// b d c f a
		this.setExpectedOutput(
			"Removed b at b",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.remove(0);
		this.assertTrue(JW.equal({ "d": d, "f": f, "c": c, "a": a }, target.base));
		
		// d c f a
		var k = JW("k");
		this.setExpectedOutput(
			"Added k at k",
			"Changed",
			"Changed size from 4 to 5"
		);
		source.add(k);
		this.assertTrue(JW.equal({ "d": d, "f": f, "c": c, "a": a, "k": k }, target.base));
		
		// d c f a k
		var g = JW("g");
		this.setExpectedOutput(
			"Removed f at f",
			"Added g at g",
			"Changed"
		);
		source.set(g, 2);
		this.assertTrue(JW.equal({ "d": d, "c": c, "a": a, "k": k, "g": g }, target.base));
		
		// d c g a k
		this.setExpectedOutput();
		source.set(a, 3);
		this.assertTrue(JW.equal({ "d": d, "c": c, "a": a, "k": k, "g": g }, target.base));
		
		this.setExpectedOutput();
		source.move(2, 1);
		this.assertTrue(JW.equal({ "d": d, "c": c, "a": a, "k": k, "g": g }, target.base));
		
		// d g c a k
		this.setExpectedOutput();
		source.move(0, 4);
		this.assertTrue(JW.equal({ "d": d, "c": c, "a": a, "k": k, "g": g }, target.base));
		
		// g c a k d
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertTrue(JW.equal({ "d": d, "c": c, "a": a, "k": k, "g": g }, target.base));
		
		this.setExpectedOutput();
		JW.Array.sortBy(source.base, "base");
		source.triggerReorder();
		this.assertTrue(JW.equal({ "d": d, "c": c, "a": a, "k": k, "g": g }, target.base));
		
		// a c d g k
		this.setExpectedOutput(
			"Removed c at c",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.base.splice(1, 1);
		source.triggerFilter();
		this.assertTrue(JW.equal({ "d": d, "a": a, "k": k, "g": g }, target.base));
		
		// a d g k
		this.setExpectedOutput(
			"Removed d at d",
			"Removed a at a",
			"Removed g at g",
			"Changed",
			"Changed size from 4 to 1"
		);
		source.base.splice(0, 3);
		source.triggerFilter();
		this.assertTrue(JW.equal({ "k": k }, target.base));
		
		// k
		var u = JW("u");
		var t = JW("t");
		var c = JW("c");
		this.setExpectedOutput(
			"Removed k at k",
			"Added u at u",
			"Added t at t",
			"Added c at c",
			"Changed",
			"Changed size from 1 to 3"
		);
		source.base = [ u, t, c ];
		source.triggerReset();
		this.assertTrue(JW.equal({ "u": u, "t": t, "c": c }, target.base));
		
		// u t c
		this.setExpectedOutput(
			"Removed u at u",
			"Removed t at t",
			"Removed c at c",
			"Changed",
			"Changed size from 3 to 0"
		);
		source.clear();
		this.assertTrue(JW.equal({}, target.base));
		
		// (empty)
		var h = JW("h");
		this.setExpectedOutput(
			"Added h at h",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.add(h);
		this.assertTrue(JW.equal({ "h": h }, target.base));
		
		// h
		this.setExpectedOutput(
			"Removed h at h",
			"Changed",
			"Changed size from 1 to 0"
		);
		indexer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testEmptyChange: function() {
		var source = new JW.Collection();
		var target = this.createTarget();
		var indexer = this.createIndexer(source, target);
		indexer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = JW("d");
		var source = new JW.Collection([ d ]);
		var indexer = this.createIndexer(source);
		this.assertTrue(JW.equal({ "d": d }, indexer.target.base));
		indexer.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.Map();
		target.addEvent.bind(this.onAdd, this);
		target.removeEvent.bind(this.onRemove, this);
		target.changeEvent.bind(this.onChange, this);
		target.sizeChangeEvent.bind(this.onSizeChange, this);
		return target;
	},
	
	createIndexer: function(source, target) {
		return new JW.Collection.Indexer({
			source : source,
			target : target,
			getKey : function(item) { return item.base; },
			scope  : this
		});
	},
	
	onAdd: function(params) {
		this.output("Added " + params.item.base + " at " + params.key);
	},
	
	onRemove: function(params) {
		this.output("Removed " + params.item.base + " at " + params.key);
	},
	
	onChange: function(params) {
		this.output("Changed");
	},
	
	onSizeChange: function(params) {
		this.output("Changed size from " + params.oldSize + " to " + params.newSize);
	}
});
