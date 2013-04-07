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

JW.Tests.Collection.AbstractArray.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.Array([ new JW.Proxy("a"), new JW.Proxy("b"), new JW.Proxy("c") ]);
		var target = new JW.Array();
		
		this.setExpectedOutput(
			"Created by a",
			"Created by b",
			"Created by c"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ "A", "B", "C" ], target);
		
		this.setExpectedOutput(
			"Destroyed C by c",
			"Destroyed B by b",
			"Destroyed A by a"
		);
		mapper.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Array([ new JW.Proxy("a"), new JW.Proxy("b"), new JW.Proxy("c") ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created by a",
			"Created by b",
			"Created by c",
			"Added A, B, C at 0",
			"Changed",
			"Changed length from 0 to 3"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ "A", "B", "C" ], target);
		
		this.setExpectedOutput(
			"Cleared",
			"Changed",
			"Changed length from 3 to 0",
			"Destroyed C by c",
			"Destroyed B by b",
			"Destroyed A by a"
		);
		mapper.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var mapper = this.createMapper(source, target);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.Array([ d ]);
		this.setExpectedOutput("Created by d");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.Array);
		this.assertTarget([ "D" ], mapper.target);
		this.setExpectedOutput("Destroyed D by d");
		mapper.destroy();
		source.destroy();
	},
	
	createTarget: function(target) {
		var target = new JW.ObservableArray();
		
		target.addEvent.bind(function(params) {
			this.output("Added " + JW.Array.mapBy(params.items, "value").join(", ") + " at " + params.index);
		}, this);
		
		target.removeEvent.bind(function(params) {
			this.output("Removed " + JW.Array.mapBy(params.items, "value").join(", ") + " at " + params.index);
		}, this);
		
		target.replaceEvent.bind(function(params) {
			this.output("Replaced " + params.oldItem.value + " with " + params.newItem.value + " at " + params.index);
		}, this);
		
		target.moveEvent.bind(function(params) {
			this.output("Moved " + params.item.value + " from " + params.fromIndex + " to " + params.toIndex);
		}, this);
		
		target.clearEvent.bind(function(params) {
			this.output("Cleared");
		}, this);
		
		target.reorderEvent.bind(function(params) {
			this.output("Reordered");
		}, this);
		
		target.filterEvent.bind(function(params) {
			this.output("Filtered");
		}, this);
		
		target.resetEvent.bind(function(params) {
			this.output("Resetted");
		}, this);
		
		target.changeEvent.bind(function(params) {
			this.output("Changed");
		}, this);
		
		target.lengthChangeEvent.bind(function(params) {
			this.output("Changed length from " + params.oldLength + " to " + params.newLength);
		}, this);
		
		return target;
	},
	
	createMapper: function(source, target) {
		return source.createMapper({
			target : target,
			scope  : this,
			
			createItem: function(data) {
				this.output("Created by " + data.value);
				return new JW.Proxy(data.value.toUpperCase());
			},
			
			destroyItem: function(item, data) {
				this.output("Destroyed " + item.value + " by " + data.value);
			}
		});
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getLength());
		for (var i = 0; i < target.getLength(); ++i) {
			this.assertStrictEqual(values[i], target.get(i).value);
		}
	}
});
