﻿/*
	jWidget Lib tests.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.Tests.Collection.AbstractArray.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.Array([ "a", "b", "c" ]);
		var target = new JW.Array();
		
		this.setExpectedOutput(
			"Created by a",
			"Created by b",
			"Created by c"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ "A", "B", "C" ], target);
		
		this.setExpectedOutput(
			"Destroyed C by c",
			"Destroyed B by b",
			"Destroyed A by a"
		);
		mapper.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Array([ "a", "b", "c" ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created by a",
			"Created by b",
			"Created by c",
			"Spliced -[] +[0:[A,B,C]] to []",
			"Changed",
			"Changed length from 0 to 3"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ "A", "B", "C" ], target);
		
		this.setExpectedOutput(
			"Cleared [A,B,C]",
			"Changed",
			"Changed length from 3 to 0",
			"Destroyed C by c",
			"Destroyed B by b",
			"Destroyed A by a"
		);
		mapper.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var mapper = this.createMapper(source, target);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Array([ "d" ]);
		this.setExpectedOutput("Created by d");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.Array);
		this.assertTarget([ "D" ], mapper.target);
		this.setExpectedOutput("Destroyed D by d");
		mapper.destroy();
		source.destroy();
	},
	
	createTarget: function(target) {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createMapper: function(source, target) {
		return source.createMapper({
			target : target,
			scope  : this,
			
			createItem: function(data) {
				this.output("Created by " + data);
				return data.toUpperCase();
			},
			
			destroyItem: function(item, data) {
				this.output("Destroyed " + item + " by " + data);
			}
		});
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getLength());
		for (var i = 0; i < target.getLength(); ++i) {
			this.assertStrictEqual(values[i], target.get(i));
		}
	}
});
