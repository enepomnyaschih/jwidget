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

JW.Tests.Util.Collection.MapperTestCase = JW.Unit.TestCase.extend({
	testMapper: function() {
		var source = new JW.Collection([ JW("d") ]);
		var target = new JW.Collection();
		this.subscribe(target);
		
		this.setExpectedOutput(
			"Created by d",
			"Added D at 0",
			"Changed",
			"Changed length from 0 to 1"
		);
		var mapper = new JW.Collection.Mapper({
			source      : source,
			target      : target,
			createItem  : function(data) { this.output("Created by " + data.base); return JW(data.base.toUpperCase()); },
			destroyItem : function(item, data) { this.output("Destroyed " + item.base + " by " + data.base); },
			scope       : this
		});
		this.assertCollection([ "D" ], target);
		
		this.setExpectedOutput(
			"Created by f",
			"Added F at 1",
			"Changed",
			"Changed length from 1 to 2"
		);
		source.addAll([ JW("f") ]);
		this.assertCollection([ "D", "F" ], target);
		
		this.setExpectedOutput(
			"Created by c",
			"Added C at 1",
			"Changed",
			"Changed length from 2 to 3"
		);
		source.add(JW("c"), 1);
		this.assertCollection([ "D", "C", "F" ], target);
		
		this.setExpectedOutput(
			"Created by b",
			"Created by m",
			"Added B, M at 0",
			"Changed",
			"Changed length from 3 to 5"
		);
		source.addAll([ JW("b"), JW("m") ], 0);
		this.assertCollection([ "B", "M", "D", "C", "F" ], target);
		
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertCollection([ "B", "M", "D", "C", "F" ], target);
		
		var a = JW("a");
		
		this.setExpectedOutput(
			"Created by a",
			"Added A at 5",
			"Changed",
			"Changed length from 5 to 6"
		);
		source.add(a, 5);
		this.assertCollection([ "B", "M", "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Removed M at 1",
			"Changed",
			"Changed length from 6 to 5",
			"Destroyed M by m"
		);
		source.remove(1);
		this.assertCollection([ "B", "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Removed B at 0",
			"Changed",
			"Changed length from 5 to 4",
			"Destroyed B by b"
		);
		source.remove(0);
		this.assertCollection([ "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Created by k",
			"Added K at 4",
			"Changed",
			"Changed length from 4 to 5"
		);
		source.add(JW("k"));
		this.assertCollection([ "D", "C", "F", "A", "K" ], target);
		
		this.setExpectedOutput(
			"Created by g",
			"Replaced F with G at 2",
			"Changed",
			"Destroyed F by f"
		);
		source.set(JW("g"), 2);
		this.assertCollection([ "D", "C", "G", "A", "K" ], target);
		
		this.setExpectedOutput();
		source.set(a, 3);
		this.assertCollection([ "D", "C", "G", "A", "K" ], target);
		
		this.setExpectedOutput(
			"Moved G from 2 to 1",
			"Changed"
		);
		source.move(2, 1);
		this.assertCollection([ "D", "G", "C", "A", "K" ], target);
		
		this.setExpectedOutput(
			"Moved D from 0 to 4",
			"Changed"
		);
		source.move(0, 4);
		this.assertCollection([ "G", "C", "A", "K", "D" ], target);
		
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertCollection([ "G", "C", "A", "K", "D" ], target);
		
		this.setExpectedOutput(
			"Reordered",
			"Changed"
		);
		JW.Array.sortBy(source.base, "base");
		source.triggerReorder();
		this.assertCollection([ "A", "C", "D", "G", "K" ], target);
		
		this.setExpectedOutput(
			"Filtered",
			"Changed",
			"Changed length from 5 to 3",
			"Destroyed A by a",
			"Destroyed C by c"
		);
		source.base.splice(0, 2);
		source.triggerFilter();
		this.assertCollection([ "D", "G", "K" ], target);
		
		this.setExpectedOutput(
			"Created by u",
			"Created by t",
			"Created by c",
			"Resetted",
			"Changed",
			"Destroyed D by d",
			"Destroyed G by g",
			"Destroyed K by k"
		);
		source.base = [ JW("u"), JW("t"), JW("c") ];
		source.triggerReset();
		this.assertCollection([ "U", "T", "C" ], target);
		
		this.setExpectedOutput(
			"Cleared",
			"Changed",
			"Changed length from 3 to 0",
			"Destroyed U by u",
			"Destroyed T by t",
			"Destroyed C by c"
		);
		source.clear();
		this.assertCollection([  ], target);
		
		this.setExpectedOutput(
			"Created by h",
			"Added H at 0",
			"Changed",
			"Changed length from 0 to 1"
		);
		source.add(JW("h"));
		this.assertCollection([ "H" ], target);
		
		this.setExpectedOutput(
			"Cleared",
			"Changed",
			"Changed length from 1 to 0",
			"Destroyed H by h"
		);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	subscribe: function(collection) {
		collection.addEvent.bind(this.onAdd, this);
		collection.removeEvent.bind(this.onRemove, this);
		collection.replaceEvent.bind(this.onReplace, this);
		collection.moveEvent.bind(this.onMove, this);
		collection.clearEvent.bind(this.onClear, this);
		collection.reorderEvent.bind(this.onReorder, this);
		collection.filterEvent.bind(this.onFilter, this);
		collection.resetEvent.bind(this.onReset, this);
		collection.changeEvent.bind(this.onChange, this);
		collection.lengthChangeEvent.bind(this.onLengthChange, this);
	},
	
	assertCollection: function(values, collection) {
		this.assertStrictEqual(values.length, collection.getLength());
		for (var i = 0; i < collection.getLength(); ++i) {
			this.assertStrictEqual(values[i], collection.get(i).base);
		}
	},
	
	onAdd: function(params) {
		this.output("Added " + JW.mapBy(params.items, "base").join(", ") + " at " + params.index);
	},
	
	onRemove: function(params) {
		this.output("Removed " + JW.mapBy(params.items, "base").join(", ") + " at " + params.index);
	},
	
	onReplace: function(params) {
		this.output("Replaced " + params.oldItem.base + " with " + params.newItem.base + " at " + params.index);
	},
	
	onMove: function(params) {
		this.output("Moved " + params.item.base + " from " + params.fromIndex + " to " + params.toIndex);
	},
	
	onClear: function(params) {
		this.output("Cleared");
	},
	
	onReorder: function(params) {
		this.output("Reordered");
	},
	
	onFilter: function(params) {
		this.output("Filtered");
	},
	
	onReset: function(params) {
		this.output("Resetted");
	},
	
	onChange: function(params) {
		this.output("Changed");
	},
	
	onLengthChange: function(params) {
		this.output("Changed length from " + params.oldLength + " to " + params.newLength);
	}
});
