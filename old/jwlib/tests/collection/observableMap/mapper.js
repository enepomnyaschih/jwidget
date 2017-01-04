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

JW.Tests.Collection.ObservableMap.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		var target = new JW.Map();
		
		this.setExpectedOutput(
			"Created D! by D"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "d": "D!" }, target);
		
		this.setExpectedOutput(
			"Created F! by F"
		);
		source.setAll({ "f": "F" });
		this.assertTarget({ "d": "D!", "f": "F!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C"
		);
		source.set("C", "c");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Created B! by B",
			"Created M! by M"
		);
		source.setAll({ "b": "B", "m": "M" });
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput();
		source.setAll({});
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput(
			"Destroyed M! by M"
		);
		source.remove("m");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!" }, target);
		
		this.setExpectedOutput();
		source.remove("m");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!" }, target);
		
		this.setExpectedOutput();
		source.setKey("c", "a");
		this.assertTarget({ "d": "D!", "f": "F!", "b": "B!", "a": "C!" }, target);
		
		this.setExpectedOutput(
			"Created M! by M",
			"Destroyed C! by C",
			"Destroyed F! by F"
		);
		source.splice([ "a", "f" ], { "m": "M" });
		this.assertTarget({ "d": "D!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput();
		source.performReindex({ "a": "D", "b": "B", "d": "M" });
		this.assertTarget({ "a": "D!", "b": "B!", "d": "M!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C",
			"Destroyed M! by M"
		);
		source.performSplice({ "a": "D", "b": "B", "c": "C" });
		this.assertTarget({ "a": "D!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Destroyed B! by B",
			"Destroyed C! by C"
		);
		source.removeAll([ "b", "c" ]);
		this.assertTarget({ "a": "D!" }, target);
		
		this.setExpectedOutput(
			"Destroyed D! by D"
		);
		source.clear();
		this.assertTarget({}, target);
		
		this.setExpectedOutput(
			"Created H! by H"
		);
		source.set("H", "h");
		this.assertTarget({ "h": "H!" }, target);
		
		this.setExpectedOutput(
			"Destroyed H! by H"
		);
		mapper.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created D! by D",
			"Changed size from 0 to 1",
			"Spliced -{} +{d:D!}",
			"Changed"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "d": "D!" }, target);
		
		this.setExpectedOutput(
			"Created F! by F",
			"Changed size from 1 to 2",
			"Spliced -{} +{f:F!}",
			"Changed"
		);
		source.setAll({ "f": "F" });
		this.assertTarget({ "d": "D!", "f": "F!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C",
			"Changed size from 2 to 3",
			"Spliced -{} +{c:C!}",
			"Changed"
		);
		source.set("C", "c");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Created B! by B",
			"Created M! by M",
			"Changed size from 3 to 5",
			"Spliced -{} +{b:B!,m:M!}",
			"Changed"
		);
		source.setAll({ "b": "B", "m": "M" });
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput();
		source.setAll({});
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 4",
			"Spliced -{m:M!} +{}",
			"Changed",
			"Destroyed M! by M"
		);
		source.remove("m");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!" }, target);
		
		this.setExpectedOutput();
		source.remove("m");
		this.assertTarget({ "d": "D!", "f": "F!", "c": "C!", "b": "B!" }, target);
		
		this.setExpectedOutput(
			"Reindexed by {c:a}",
			"Changed"
		);
		source.setKey("c", "a");
		this.assertTarget({ "d": "D!", "f": "F!", "b": "B!", "a": "C!" }, target);
		
		this.setExpectedOutput(
			"Created M! by M",
			"Changed size from 4 to 3",
			"Spliced -{a:C!,f:F!} +{m:M!}",
			"Changed",
			"Destroyed C! by C",
			"Destroyed F! by F"
		);
		source.splice([ "a", "f" ], { "m": "M" });
		this.assertTarget({ "d": "D!", "b": "B!", "m": "M!" }, target);
		
		this.setExpectedOutput(
			"Reindexed by {d:a,m:d}",
			"Changed"
		);
		source.performReindex({ "a": "D", "b": "B", "d": "M" });
		this.assertTarget({ "a": "D!", "b": "B!", "d": "M!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C",
			"Spliced -{d:M!} +{c:C!}",
			"Changed",
			"Destroyed M! by M"
		);
		source.performSplice({ "a": "D", "b": "B", "c": "C" });
		this.assertTarget({ "a": "D!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -{b:B!,c:C!} +{}",
			"Changed",
			"Destroyed B! by B",
			"Destroyed C! by C"
		);
		source.removeAll([ "b", "c" ]);
		this.assertTarget({ "a": "D!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 0",
			"Spliced -{a:D!} +{}",
			"Changed",
			"Destroyed D! by D"
		);
		source.clear();
		this.assertTarget({}, target);
		
		this.setExpectedOutput(
			"Created H! by H",
			"Changed size from 0 to 1",
			"Spliced -{} +{h:H!}",
			"Changed"
		);
		source.set("H", "h");
		this.assertTarget({ "h": "H!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 0",
			"Spliced -{h:H!} +{}",
			"Changed",
			"Destroyed H! by H"
		);
		mapper.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.ObservableMap({ "a": "A", "b": "B" });
		var source2 = new JW.ObservableMap({ "c": "C", "d": "D" });
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
			"Created E! by E",
			"Changed size from 5 to 6",
			"Spliced -{} +{e:E!}",
			"Changed"
		);
		source1.set("E", "e");
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!", "d": "D!", "e": "E!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Created F! by F",
			"Spliced -{d:D!} +{d:F!}",
			"Changed",
			"Destroyed D! by D"
		);
		source2.set("F", "d");
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!", "d": "F!", "e": "E!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 6 to 3",
			"Spliced -{a:A!,b:B!,e:E!} +{}",
			"Changed",
			"Destroyed A! by A",
			"Destroyed B! by B",
			"Destroyed E! by E"
		);
		source1.clear();
		this.assertTarget({ "c": "C!", "d": "F!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -{c:C!,d:F!} +{}",
			"Changed",
			"Destroyed C! by C",
			"Destroyed F! by F"
		);
		mapper2.destroy();
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput();
		mapper1.destroy();
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput();
		target.destroy();
		
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't cause target to trigger "change" on synchronizer initialization
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
		this.setExpectedOutput("Created D! by D");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.ObservableMap);
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
