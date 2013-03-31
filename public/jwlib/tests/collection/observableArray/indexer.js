﻿/*
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

JW.Tests.Collection.ObservableArray.IndexerTestCase = JW.Unit.TestCase.extend({
	testIndexer: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Added d at d",
			"Changed",
			"Changed size from 0 to 1"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "d": d }, target);
		
		// d
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Added f at f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);
		
		// d f
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Added c at c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.add(c, 1);
		this.assertTarget({ "d": d, "f": f, "c": c }, target);
		
		// d c f
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Added b at b",
			"Added m at m",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.addAll([ b, m ], 0);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		// b m d c f
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		var a = new JW.Proxy("a");
		this.setExpectedOutput(
			"Added a at a",
			"Changed",
			"Changed size from 5 to 6"
		);
		source.add(a, 5);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m, "a": a }, target);
		
		// b m d c f a
		this.setExpectedOutput(
			"Removed m at m",
			"Changed",
			"Changed size from 6 to 5"
		);
		source.remove(1);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "a": a }, target);
		
		// b d c f a
		this.setExpectedOutput(
			"Removed b at b",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.remove(0);
		this.assertTarget({ "d": d, "f": f, "c": c, "a": a }, target);
		
		// d c f a
		var k = new JW.Proxy("k");
		this.setExpectedOutput(
			"Added k at k",
			"Changed",
			"Changed size from 4 to 5"
		);
		source.add(k);
		this.assertTarget({ "d": d, "f": f, "c": c, "a": a, "k": k }, target);
		
		// d c f a k
		var g = new JW.Proxy("g");
		this.setExpectedOutput(
			"Removed f at f",
			"Added g at g",
			"Changed"
		);
		source.set(g, 2);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// d c g a k
		this.setExpectedOutput();
		source.set(a, 3);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		this.setExpectedOutput();
		source.move(2, 1);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// d g c a k
		this.setExpectedOutput();
		source.move(0, 4);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// g c a k d
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		this.setExpectedOutput();
		source.performReorder(function(items) {
			JW.Array.sortBy(items, "value");
		}, this);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// a c d g k
		this.setExpectedOutput(
			"Removed c at c",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.performFilter(function(items) {
			items.splice(1, 1);
		}, this);
		this.assertTarget({ "d": d, "a": a, "k": k, "g": g }, target);
		
		// a d g k
		this.setExpectedOutput(
			"Removed a at a",
			"Removed d at d",
			"Removed g at g",
			"Changed",
			"Changed size from 4 to 1"
		);
		source.performFilter(function(items) {
			items.splice(0, 3);
		}, this);
		this.assertTarget({ "k": k }, target);
		
		// k
		var u = new JW.Proxy("u");
		var t = new JW.Proxy("t");
		this.setExpectedOutput(
			"Removed k at k",
			"Added u at u",
			"Added t at t",
			"Added c at c",
			"Changed",
			"Changed size from 1 to 3"
		);
		source.performReset(function(items) {
			return [ u, t, c ];
		}, this);
		this.assertTarget({ "u": u, "t": t, "c": c }, target);
		
		// u t c
		this.setExpectedOutput(
			"Removed u at u",
			"Removed t at t",
			"Removed c at c",
			"Changed",
			"Changed size from 3 to 0"
		);
		source.clear();
		this.assertTarget({}, target);
		
		// (empty)
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Added h at h",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.add(h);
		this.assertTarget({ "h": h }, target);
		
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
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var indexer = this.createIndexer(source, target);
		indexer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var indexer = this.createIndexer(source);
		this.assertTarget({ "d": d }, indexer.target);
		indexer.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var a = new JW.Proxy("a");
		var source1 = new JW.ObservableArray([ a ]);
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source2 = new JW.ObservableArray([ b, c ]);
		var x = new JW.Proxy("x");
		var target = this.createTarget();
		this.setExpectedOutput(
			"Added x at x",
			"Changed",
			"Changed size from 0 to 1"
		);
		target.set(x, "x");
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Added a at a",
			"Changed",
			"Changed size from 1 to 2"
		);
		var indexer1 = this.createIndexer(source1, target);
		this.assertTarget({ "x": x, "a": a }, target);
		
		this.setExpectedOutput(
			"Added b at b",
			"Added c at c",
			"Changed",
			"Changed size from 2 to 4"
		);
		var indexer2 = this.createIndexer(source2, target);
		this.assertTarget({ "x": x, "a": a, "b": b, "c": c }, target);
		
		var d = new JW.Proxy("d");
		this.setExpectedOutput(
			"Added d at d",
			"Changed",
			"Changed size from 4 to 5"
		);
		source1.add(d);
		this.assertTarget({ "x": x, "a": a, "b": b, "c": c, "d": d }, target);
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Removed b at b",
			"Added e at e",
			"Changed"
		);
		source2.set(e, 0);
		this.assertTarget({ "x": x, "a": a, "c": c, "d": d, "e": e }, target);
		
		this.setExpectedOutput(
			"Removed a at a",
			"Removed d at d",
			"Changed",
			"Changed size from 5 to 3"
		);
		source1.clear();
		this.assertTarget({ "x": x, "c": c, "e": e }, target);
		
		this.setExpectedOutput(
			"Added d at d",
			"Changed",
			"Changed size from 3 to 4"
		);
		source1.performReset(function(items) {
			items.push(d);
		}, this);
		this.assertTarget({ "x": x, "c": c, "e": e, "d": d }, target);
		
		this.setExpectedOutput(
			"Removed e at e",
			"Removed c at c",
			"Changed",
			"Changed size from 4 to 2"
		);
		indexer2.destroy();
		this.assertTarget({ "x": x, "d": d }, target);
		
		this.setExpectedOutput(
			"Removed d at d",
			"Changed",
			"Changed size from 2 to 1"
		);
		indexer1.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Removed x at x",
			"Changed",
			"Changed size from 1 to 0"
		);
		target.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableMap();
		
		target.addEvent.bind(function(params) {
			this.output("Added " + params.item.value + " at " + params.key);
		}, this);
		
		target.removeEvent.bind(function(params) {
			this.output("Removed " + params.item.value + " at " + params.key);
		}, this);
		
		target.changeEvent.bind(function(params) {
			this.output("Changed");
		}, this);
		
		target.sizeChangeEvent.bind(function(params) {
			this.output("Changed size from " + params.oldSize + " to " + params.newSize);
		}, this);
		
		return target;
	},
	
	createIndexer: function(source, target) {
		return source.createIndexer({
			target : target,
			getKey : function(item) { return item.value; },
			scope  : this
		});
	},
	
	assertTarget: function(expected, target) {
		this.assertTrue(JW.Map.equal(expected, target.map.json));
	}
});
