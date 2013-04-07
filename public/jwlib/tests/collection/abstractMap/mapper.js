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

JW.Tests.Collection.AbstractMap.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		var target = new JW.Map();
		
		this.setExpectedOutput(
			"Created A! by A at a",
			"Created B! by B at b",
			"Created C! by C at c"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Destroyed A! by A at a",
			"Destroyed B! by B at b",
			"Destroyed C! by C at c"
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
			"Created A! by A at a",
			"Created B! by B at b",
			"Created C! by C at c",
			"Added A! at a",
			"Added B! at b",
			"Added C! at c",
			"Changed",
			"Changed size from 0 to 3"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Removed A! at a",
			"Removed B! at b",
			"Removed C! at c",
			"Changed",
			"Changed size from 3 to 0",
			"Destroyed A! by A at a",
			"Destroyed B! by B at b",
			"Destroyed C! by C at c"
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
			"Added X! at x",
			"Changed",
			"Changed size from 0 to 1"
		);
		target.set("X!", "x");
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Created A! by A at a",
			"Created B! by B at b",
			"Added A! at a",
			"Added B! at b",
			"Changed",
			"Changed size from 1 to 3"
		);
		var mapper1 = this.createMapper(source1, target);
		this.assertTarget({ "a": "A!", "b": "B!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C at c",
			"Created D! by D at d",
			"Added C! at c",
			"Added D! at d",
			"Changed",
			"Changed size from 3 to 5"
		);
		var mapper2 = this.createMapper(source2, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!", "d": "D!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Removed A! at a",
			"Removed B! at b",
			"Changed",
			"Changed size from 5 to 3",
			"Destroyed A! by A at a",
			"Destroyed B! by B at b"
		);
		mapper1.destroy();
		this.assertTarget({ "c": "C!", "d": "D!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Removed C! at c",
			"Removed D! at d",
			"Changed",
			"Changed size from 3 to 1",
			"Destroyed C! by C at c",
			"Destroyed D! by D at d"
		);
		mapper2.destroy();
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Removed X! at x",
			"Changed",
			"Changed size from 1 to 0"
		);
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
		this.setExpectedOutput("Created D! by D at d");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.Map);
		this.assertTarget({ "d": "D!" }, mapper.target);
		this.setExpectedOutput("Destroyed D! by D at d");
		mapper.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableMap();
		
		target.addEvent.bind(function(params) {
			this.output("Added " + params.item + " at " + params.key);
		}, this);
		
		target.removeEvent.bind(function(params) {
			this.output("Removed " + params.item + " at " + params.key);
		}, this);
		
		target.changeEvent.bind(function(params) {
			this.output("Changed");
		}, this);
		
		target.sizeChangeEvent.bind(function(params) {
			this.output("Changed size from " + params.oldSize + " to " + params.newSize);
		}, this);
		
		return target;
	},
	
	createMapper: function(source, target) {
		return source.createMapper({
			target : target,
			scope  : this,
			
			createItem: function(data, key) {
				var item = data + "!";
				this.output("Created " + item + " by " + data + " at " + key);
				return item;
			},
			
			destroyItem: function(item, data, key) {
				this.output("Destroyed " + item + " by " + data + " at " + key);
			}
		});
	},
	
	assertTarget: function(expected, map) {
		this.assertStrictEqual(JW.Map.getSize(expected), map.getSize());
		for (var key in expected) {
			this.assertStrictEqual(expected[key], map.get(key));
		}
	}
});
