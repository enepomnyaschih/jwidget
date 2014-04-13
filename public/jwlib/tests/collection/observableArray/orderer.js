﻿/*
	jWidget Lib tests.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.Tests.Collection.ObservableArray.OrdererTestCase = JW.Unit.TestCase.extend({
	setup: function() {
		this.a = new JW.Proxy("a");
		this.b = new JW.Proxy("b");
		this.c = new JW.Proxy("c");
		this.d = new JW.Proxy("d");
		this.e = new JW.Proxy("e");
		this.f = new JW.Proxy("f");
		this.x = new JW.Proxy("x");
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableArray([this.a, this.b, this.c, this.d]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 4",
			"Spliced -[] +[0:[a,b,c,d]] to []",
			"Changed"
		);
		var orderer = this.createOrderer(source, target);
		this.assertTarget([this.a, this.b, this.c, this.d], target);
		
		this.setExpectedOutput(
			"Spliced -[1:[b],3:[d]] +[2:[e,f]] to [a,b,c,d]",
			"Changed"
		);
		source.splice([
			new JW.AbstractArray.IndexCount(0, 2),
			new JW.AbstractArray.IndexCount(3, 1)
		], [
			new JW.AbstractArray.IndexItems(0, [this.e, this.f]),
			new JW.AbstractArray.IndexItems(3, [this.a])
		]); // e,f,c,a
		this.assertTarget([this.a, this.c, this.e, this.f], target);
		
		this.setExpectedOutput(
			"Spliced -[1:[c]] +[3:[b]] to [a,c,e,f]",
			"Changed"
		);
		source.set(this.b, 2); // e,f,b,a
		this.assertTarget([this.a, this.e, this.f, this.b], target);
		
		this.setExpectedOutput();
		source.move(0, 2); // f,b,e,a
		this.assertTarget([this.a, this.e, this.f, this.b], target);
		
		this.setExpectedOutput();
		source.reorder([2, 0, 1, 3]); // b,e,f,a
		this.assertTarget([this.a, this.e, this.f, this.b], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 0",
			"Spliced -[0:[a,e,f,b]] +[] to [a,e,f,b]",
			"Changed"
		);
		source.clear();
		this.assertTarget([], target);
		
		this.setExpectedOutput(
			"Changed length from 0 to 1",
			"Spliced -[] +[0:[c]] to []",
			"Changed"
		);
		source.add(this.c);
		this.assertTarget([this.c], target);
		
		this.setExpectedOutput(
			"Changed length from 1 to 0",
			"Spliced -[0:[c]] +[] to [c]",
			"Changed"
		);
		orderer.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	
	testUnobservableTarget: function() {
		var source = new JW.ObservableArray([this.a, this.b, this.c, this.d]);
		var target = new JW.Array();
		
		var orderer = this.createOrderer(source, target);
		this.assertTarget([this.a, this.b, this.c, this.d], target);
		
		source.splice([
			new JW.AbstractArray.IndexCount(0, 2),
			new JW.AbstractArray.IndexCount(3, 1)
		], [
			new JW.AbstractArray.IndexItems(0, [this.e, this.f]),
			new JW.AbstractArray.IndexItems(3, [this.a])
		]); // e,f,c,a
		this.assertTarget([this.a, this.c, this.e, this.f], target);
		
		source.set(this.b, 2); // e,f,b,a
		this.assertTarget([this.a, this.e, this.f, this.b], target);
		
		source.move(0, 2); // f,b,e,a
		this.assertTarget([this.a, this.e, this.f, this.b], target);
		
		source.reorder([2, 0, 1, 3]); // b,e,f,a
		this.assertTarget([this.a, this.e, this.f, this.b], target);
		
		source.clear();
		this.assertTarget([], target);
		
		source.add(this.c);
		this.assertTarget([this.c], target);
		
		orderer.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.ObservableArray([this.a, this.b]);
		var source2 = new JW.ObservableArray([this.c, this.d]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 1",
			"Spliced -[] +[0:[x]] to []",
			"Changed"
		);
		target.add(this.x);
		this.assertTarget([this.x], target);
		
		this.setExpectedOutput(
			"Changed length from 1 to 3",
			"Spliced -[] +[1:[a,b]] to [x]",
			"Changed"
		);
		var orderer1 = this.createOrderer(source1, target);
		this.assertTarget([this.x, this.a, this.b], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 5",
			"Spliced -[] +[3:[c,d]] to [x,a,b]",
			"Changed"
		);
		var orderer2 = this.createOrderer(source2, target);
		this.assertTarget([this.x, this.a, this.b, this.c, this.d], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 6",
			"Spliced -[1:[a]] +[4:[e,f]] to [x,a,b,c,d]",
			"Changed"
		);
		source1.splice(
			[new JW.AbstractArray.IndexCount(0, 1)],
			[new JW.AbstractArray.IndexItems(1, [this.e, this.f])]
		); // b,e,f
		this.assertTarget([this.x, this.b, this.c, this.d, this.e, this.f], target);
		
		this.setExpectedOutput(
			"Spliced -[3:[d]] +[5:[a]] to [x,b,c,d,e,f]",
			"Changed"
		);
		source2.splice(
			[new JW.AbstractArray.IndexCount(1, 1)],
			[new JW.AbstractArray.IndexItems(0, [this.a])]
		); // a,c
		this.assertTarget([this.x, this.b, this.c, this.e, this.f, this.a], target);
		
		this.setExpectedOutput(
			"Changed length from 6 to 3",
			"Spliced -[1:[b],3:[e,f]] +[] to [x,b,c,e,f,a]",
			"Changed"
		);
		orderer1.destroy();
		this.assertTarget([this.x, this.c, this.a], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 1",
			"Spliced -[1:[c,a]] +[] to [x,c,a]",
			"Changed"
		);
		orderer2.destroy();
		this.assertTarget([this.x], target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var orderer = this.createOrderer(source, target);
		orderer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableArray([this.d]);
		var orderer = this.createOrderer(source);
		this.assertTrue(orderer.target instanceof JW.ObservableArray);
		this.assertTarget([this.d], orderer.target);
		orderer.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target, function(x) { return x.value; });
		return target;
	},
	
	createOrderer: function(source, target) {
		return source.createOrderer({
			target : target
		});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
