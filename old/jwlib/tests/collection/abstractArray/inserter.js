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

JW.Tests.Collection.AbstractArray.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var collection = new JW.Array([ "a", "b", "c", "d", "e" ]);
		
		this.setExpectedOutput(
			"Added a at 0",
			"Added b at 1",
			"Added c at 2",
			"Added d at 3",
			"Added e at 4"
		);
		var inserter = collection.createInserter({
			addItem    : function(item, index) { this.output("Added " + item + " at " + index); },
			removeItem : function(item, index) { this.output("Removed " + item + " at " + index); },
			clearItems : function(items) { this.output("Cleared " + items.join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Cleared a, b, c, d, e"
		);
		inserter.destroy();
		
		this.setExpectedOutput();
		collection.destroy();
	},
	
	testAutoClear: function() {
		var collection = new JW.Array([ "a", "b", "c", "d", "e" ]);
		
		this.setExpectedOutput(
			"Added a at 0",
			"Added b at 1",
			"Added c at 2",
			"Added d at 3",
			"Added e at 4"
		);
		var inserter = collection.createInserter({
			addItem    : function(item, index) { this.output("Added " + item + " at " + index); },
			removeItem : function(item, index) { this.output("Removed " + item + " at " + index); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed e at 4",
			"Removed d at 3",
			"Removed c at 2",
			"Removed b at 1",
			"Removed a at 0"
		);
		inserter.destroy();
		
		this.setExpectedOutput();
		collection.destroy();
	}
});
