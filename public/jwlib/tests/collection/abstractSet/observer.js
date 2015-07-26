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

JW.Tests.Collection.AbstractSet.ObserverTestCase = JW.Unit.TestCase.extend({
	testObserver: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.Set([ a, b, c ]);
		
		this.setExpectedOutput(
			"Added a",
			"Added b",
			"Added c"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item.value); },
			removeItem : function(item) { this.output("Removed " + item.value); },
			clearItems : function(items) { this.output("Cleared " + JW.Array.map(items, JW.byField("value")).join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Cleared a, b, c"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.Set([ a, b, c ]);
		
		this.setExpectedOutput(
			"Added a",
			"Added b",
			"Added c"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item.value); },
			removeItem : function(item) { this.output("Removed " + item.value); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed c",
			"Removed b",
			"Removed a"
		);
		syncher.destroy();
	}
});
