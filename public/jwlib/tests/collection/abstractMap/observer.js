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

JW.Tests.Collection.AbstractMap.ObserverTestCase = JW.Unit.TestCase.extend({
	testObserver: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Added A",
			"Added B",
			"Added C"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item); },
			removeItem : function(item) { this.output("Removed " + item); },
			clearItems : function(items) { this.output("Cleared " + items.join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Cleared A, B, C"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		
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
