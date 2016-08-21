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

JW.Tests.Collection.AbstractMap.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Added A at a",
			"Added B at b",
			"Added C at c"
		);
		var syncher = source.createInserter({
			addItem    : function(item, key) { this.output("Added " + item + " at " + key); },
			removeItem : function(key, item) { this.output("Removed " + item + " at " + key); },
			clearItems : function(items) { this.output("Cleared " + JW.Tests.Collection.formatMap(items)); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Cleared {a:A,b:B,c:C}"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		
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
