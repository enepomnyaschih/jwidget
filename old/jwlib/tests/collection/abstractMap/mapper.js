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

JW.Tests.Collection.AbstractMap.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		var target = new JW.Map();
		
		this.setExpectedOutput(
			"Created A! by A",
			"Created B! by B",
			"Created C! by C"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Destroyed A! by A",
			"Destroyed B! by B",
			"Destroyed C! by C"
		);
		mapper.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created A! by A",
			"Created B! by B",
			"Created C! by C",
			"Changed size from 0 to 3",
			"Spliced -{} +{a:A!,b:B!,c:C!}",
			"Changed"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -{a:A!,b:B!,c:C!} +{}",
			"Changed",
			"Destroyed A! by A",
			"Destroyed B! by B",
			"Destroyed C! by C"
		);
		mapper.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.Map({ "a": "A", "b": "B" });
		var source2 = new JW.Map({ "c": "C", "d": "D" });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{x:X!}",
			"Changed"
		);
		target.set("X!", "x");
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Created A! by A",
			"Created B! by B",
			"Changed size from 1 to 3",
			"Spliced -{} +{a:A!,b:B!}",
			"Changed"
		);
		var mapper1 = this.createMapper(source1, target);
		this.assertTarget({ "a": "A!", "b": "B!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C",
			"Created D! by D",
			"Changed size from 3 to 5",
			"Spliced -{} +{c:C!,d:D!}",
			"Changed"
		);
		var mapper2 = this.createMapper(source2, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!", "d": "D!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 3",
			"Spliced -{a:A!,b:B!} +{}",
			"Changed",
			"Destroyed A! by A",
			"Destroyed B! by B"
		);
		mapper1.destroy();
		this.assertTarget({ "c": "C!", "d": "D!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -{c:C!,d:D!} +{}",
			"Changed",
			"Destroyed C! by C",
			"Destroyed D! by D"
		);
		mapper2.destroy();
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Map();
		var target = this.createTarget();
		var mapper = this.createMapper(source, target);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Map({ "d": "D" });
		this.setExpectedOutput("Created D! by D");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.Map);
		this.assertTarget({ "d": "D!" }, mapper.target);
		this.setExpectedOutput("Destroyed D! by D");
		mapper.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableMap();
		JW.Tests.Collection.subscribeToMap(this, target);
		return target;
	},
	
	createMapper: function(source, target) {
		return source.createMapper({
			target : target,
			scope  : this,
			
			createItem: function(data) {
				var item = data + "!";
				this.output("Created " + item + " by " + data);
				return item;
			},
			
			destroyItem: function(item, data) {
				this.output("Destroyed " + item + " by " + data);
			}
		});
	},
	
	assertTarget: function(expected, map) {
		JW.Tests.Collection.assertMap(this, expected, map);
	}
});
