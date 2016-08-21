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

JW.Tests.Collection.ObservableMap.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		
		this.setExpectedOutput(
			"Added D at d"
		);
		var syncher = source.createInserter({
			addItem    : function(item, key) { this.output("Added " + item + " at " + key); },
			removeItem : function(key, item) { this.output("Removed " + item + " at " + key); },
			clearItems : function(items) { this.output("Cleared " + JW.Tests.Collection.formatMap(items)); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Added F at f"
		);
		source.setAll({ "f": "F" });
		
		this.setExpectedOutput(
			"Added C at c"
		);
		source.set("C", "c");
		
		this.setExpectedOutput(
			"Added B at b",
			"Added M at m"
		);
		source.setAll({ "b": "B", "m": "M" });
		
		this.setExpectedOutput();
		source.setAll({});
		
		this.setExpectedOutput(
			"Removed M at m"
		);
		source.remove("m");
		
		this.setExpectedOutput();
		source.remove("m");
		
		this.setExpectedOutput(
			"Removed F at f",
			"Added T at f"
		);
		source.set("T", "f");
		
		this.setExpectedOutput(
			"Removed C at c",
			"Added C at a"
		);
		source.setKey("c", "a");
		
		this.setExpectedOutput(
			"Removed C at a",
			"Removed T at f",
			"Added M at m"
		);
		source.splice([ "a", "f" ], { "m": "M" });
		
		this.setExpectedOutput(
			"Removed D at d",
			"Added D at a",
			"Removed M at m",
			"Added M at d"
		);
		source.performReindex({ "a": "D", "b": "B", "d": "M" });
		
		this.setExpectedOutput(
			"Removed M at d",
			"Added C at c"
		);
		source.performSplice({ "a": "D", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Removed B at b",
			"Removed C at c"
		);
		source.removeAll([ "b", "c" ]);
		
		this.setExpectedOutput(
			"Cleared {a:D}"
		);
		source.clear();
		
		this.setExpectedOutput(
			"Added H at h"
		);
		source.set("H", "h");
		
		this.setExpectedOutput(
			"Cleared {h:H}"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var source = new JW.ObservableMap({ "a": "A", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Added A at a",
			"Added B at b",
			"Added C at c"
		);
		var syncher = source.createInserter({
			addItem    : function(item, key) { this.output("Added " + item + " at " + key); },
			removeItem : function(key, item) { this.output("Removed " + item + " at " + key); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed A at a",
			"Removed B at b",
			"Removed C at c"
		);
		syncher.destroy();
	}
});
