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

JW.Tests.Util.Set.MapperTestCase = JW.Unit.TestCase.extend({
	testMapper: function() {
		var d = JW("d");
		var source = new JW.Set([ d ]);
		var target = new JW.Set();
		this.subscribe(target);
		
		this.setExpectedOutput(
			"Created D by d",
			"Added D",
			"Changed",
			"Changed size from 0 to 1"
		);
		var mapper = new JW.Set.Mapper({
			source : source,
			target : target,
			scope  : this,
			
			createItem: function(data) {
				var item = JW(data.base.toUpperCase());
				data.result = item;
				this.output("Created " + item.base + " by " + data.base);
				return item;
			},
			
			destroyItem: function(item, data) {
				this.output("Destroyed " + item.base + " by " + data.base);
			}
		});
		this.assertSet([ d ], target);
		
		var f = JW("f");
		this.setExpectedOutput(
			"Created F by f",
			"Added F",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.addAll([ f ]);
		this.assertSet([ d, f ], target);
		
		var c = JW("c");
		this.setExpectedOutput(
			"Created C by c",
			"Added C",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.add(c);
		this.assertSet([ d, f, c ], target);
		
		var b = JW("b");
		var m = JW("m");
		this.setExpectedOutput(
			"Created B by b",
			"Added B",
			"Created M by m",
			"Added M",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.addAll([ b, m ]);
		this.assertSet([ d, f, c, b, m ], target);
		
		this.setExpectedOutput();
		source.addAll([]);
		this.assertSet([ d, f, c, b, m ], target);
		
		this.setExpectedOutput(
			"Removed M",
			"Changed",
			"Changed size from 5 to 4",
			"Destroyed M by m"
		);
		source.remove(m);
		this.assertSet([ d, f, c, b ], target);
		
		this.setExpectedOutput();
		source.remove(m);
		this.assertSet([ d, f, c, b ], target);
		
		this.setExpectedOutput(
			"Removed D",
			"Removed F",
			"Removed C",
			"Removed B",
			"Changed",
			"Changed size from 4 to 0",
			"Destroyed D by d",
			"Destroyed F by f",
			"Destroyed C by c",
			"Destroyed B by b"
		);
		source.clear();
		this.assertSet([], target);
		
		var h = JW("h");
		this.setExpectedOutput(
			"Created H by h",
			"Added H",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.add(h);
		this.assertSet([ h ], target);
		
		this.setExpectedOutput(
			"Removed H",
			"Changed",
			"Changed size from 1 to 0",
			"Destroyed H by h"
		);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	subscribe: function(set) {
		set.addEvent.bind(this.onAdd, this);
		set.removeEvent.bind(this.onRemove, this);
		set.changeEvent.bind(this.onChange, this);
		set.sizeChangeEvent.bind(this.onSizeChange, this);
	},
	
	assertSet: function(expected, set) {
		this.assertStrictEqual(expected.length, set.getSize());
		for (var i = 0; i < expected.length; ++i) {
			this.assertTrue(set.contains(expected[i].result));
		}
	},
	
	onAdd: function(params) {
		this.output("Added " + params.item.base);
	},
	
	onRemove: function(params) {
		this.output("Removed " + params.item.base);
	},
	
	onChange: function(params) {
		this.output("Changed");
	},
	
	onSizeChange: function(params) {
		this.output("Changed size from " + params.oldSize + " to " + params.newSize);
	}
});
