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

JW.Tests.Collection.ObservableMap.ObserverTestCase = JW.Unit.TestCase.extend({
	testObserver: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		
		this.setExpectedOutput(
			"Added D"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item); },
			removeItem : function(item) { this.output("Removed " + item); },
			clearItems : function(items) {
				items = items.concat();
				items.sort();
				this.output("Cleared " + items.join(", "));
			},
			scope      : this
		});
		
		this.setExpectedOutput(
			"Added F"
		);
		source.setAll({ "f": "F" });
		
		this.setExpectedOutput(
			"Added C"
		);
		source.set("C", "c");
		
		this.setExpectedOutput(
			"Added B",
			"Added M"
		);
		source.setAll({ "b": "B", "m": "M" });
		
		this.setExpectedOutput();
		source.setAll({});
		
		this.setExpectedOutput(
			"Removed M"
		);
		source.remove("m");
		
		this.setExpectedOutput();
		source.remove("m");
		
		this.setExpectedOutput(
			"Removed F",
			"Added T"
		);
		source.set("T", "f");
		
		this.setExpectedOutput();
		source.setKey("c", "a");
		
		this.setExpectedOutput(
			"Removed T",
			"Removed C",
			"Added M"
		);
		source.splice([ "a", "f" ], { "m": "M" });
		
		this.setExpectedOutput();
		source.performReindex({ "a": "D", "b": "B", "d": "M" });
		
		this.setExpectedOutput(
			"Removed M",
			"Added C"
		);
		source.performSplice({ "a": "D", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Removed C",
			"Removed B"
		);
		source.removeAll([ "b", "c" ]);
		
		this.setExpectedOutput(
			"Cleared D"
		);
		source.clear();
		
		this.setExpectedOutput(
			"Added H"
		);
		source.set("H", "h");
		
		this.setExpectedOutput(
			"Cleared H"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var source = new JW.ObservableMap({ "a": "A", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Added A",
			"Added B",
			"Added C"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item); },
			removeItem : function(item) { this.output("Removed " + item); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed C",
			"Removed B",
			"Removed A"
		);
		syncher.destroy();
	}
});
