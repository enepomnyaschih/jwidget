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

JW.Tests.Collection.ObservableMap.MapperTestCase = JW.Unit.TestCase.extend({
	testMapper: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created D! by D at d",
			"Added D! at d",
			"Changed",
			"Changed size from 0 to 1"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "d": "D!" }, target);
		
		this.setExpectedOutput(
			"Created F! by F at f",
			"Added F! at f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.setAll({ "f": "F" });
		this.assertTarget({ "d": "D!", "f": "F!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C at c",
			"Added C! at c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.set("C", "c");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Created B! by B at b",
			"Added B! at b",
			"Created M! by M at m",
			"Added M! at m",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.setAll({ "b": "B", "m": "M" });
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput();
		source.setAll({});
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput(
			"Removed M! at m",
			"Changed",
			"Changed size from 5 to 4",
			"Destroyed M! by M at m"
		);
		source.remove("m");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!" }, target);
		
		this.setExpectedOutput();
		source.remove("m");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!" }, target);
		
		this.setExpectedOutput(
			"Removed D! at d",
			"Removed F! at f",
			"Removed C! at c",
			"Removed B! at b",
			"Changed",
			"Changed size from 4 to 0",
			"Destroyed D! by D at d",
			"Destroyed F! by F at f",
			"Destroyed C! by C at c",
			"Destroyed B! by B at b"
		);
		source.clear();
		this.assertTarget({}, target);
		
		this.setExpectedOutput(
			"Created H! by H at h",
			"Added H! at h",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.set("H", "h");
		this.assertTarget({ "h": "H!" }, target);
		
		this.setExpectedOutput(
			"Removed H! at h",
			"Changed",
			"Changed size from 1 to 0",
			"Destroyed H! by H at h"
		);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testEmptyChange: function() {
		var source = new JW.ObservableMap();
		var target = this.createTarget();
		var mapper = this.createMapper(source, target);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		this.setExpectedOutput("Created D! by D at d");
		var mapper = this.createMapper(source);
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
		return new JW.ObservableMap.Mapper({
			source : source,
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
