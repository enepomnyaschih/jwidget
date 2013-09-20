﻿/*
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

JW.Tests.Collection.ObservableArray.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.ObservableArray([ "d" ]);
		var target = new JW.Array();
		
		this.setExpectedOutput(
			"Created by d"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ "D" ], target);
		
		this.setExpectedOutput(
			"Created by f"
		);
		source.addAll([ "f" ]);
		this.assertTarget([ "D", "F" ], target);
		
		this.setExpectedOutput(
			"Created by c"
		);
		source.add("c", 1);
		this.assertTarget([ "D", "C", "F" ], target);
		
		this.setExpectedOutput(
			"Created by b",
			"Created by m"
		);
		source.addAll([ "b", "m" ], 0);
		this.assertTarget([ "B", "M", "D", "C", "F" ], target);
		
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertTarget([ "B", "M", "D", "C", "F" ], target);
		
		this.setExpectedOutput(
			"Created by a"
		);
		source.add("a", 5);
		this.assertTarget([ "B", "M", "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Destroyed M by m"
		);
		source.remove(1);
		this.assertTarget([ "B", "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Destroyed B by b"
		);
		source.remove(0);
		this.assertTarget([ "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Created by k"
		);
		source.add("k");
		this.assertTarget([ "D", "C", "F", "A", "K" ], target);
		
		this.setExpectedOutput(
			"Created by g",
			"Destroyed F by f"
		);
		source.set("g", 2);
		this.assertTarget([ "D", "C", "G", "A", "K" ], target);
		
		this.setExpectedOutput();
		source.set("a", 3);
		this.assertTarget([ "D", "C", "G", "A", "K" ], target);
		
		this.setExpectedOutput();
		source.move(2, 1);
		this.assertTarget([ "D", "G", "C", "A", "K" ], target);
		
		this.setExpectedOutput();
		source.move(0, 4);
		this.assertTarget([ "G", "C", "A", "K", "D" ], target);
		
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertTarget([ "G", "C", "A", "K", "D" ], target);
		
		this.setExpectedOutput();
		var items = source.getItems().concat();
		items.sort();
		source.performReorder(items);
		this.assertTarget([ "A", "C", "D", "G", "K" ], target);
		
		this.setExpectedOutput(
			"Destroyed C by c",
			"Destroyed A by a"
		);
		source.performSplice([ "d", "g", "k" ]);
		this.assertTarget([ "D", "G", "K" ], target);
		
		this.setExpectedOutput(
			"Created by u",
			"Created by t",
			"Created by c",
			"Destroyed K by k",
			"Destroyed G by g",
			"Destroyed D by d"
		);
		source.performSplice([ "u", "t", "c" ]);
		this.assertTarget([ "U", "T", "C" ], target);
		
		this.setExpectedOutput(
			"Destroyed C by c",
			"Destroyed T by t",
			"Destroyed U by u"
		);
		source.clear();
		this.assertTarget([  ], target);
		
		this.setExpectedOutput(
			"Created by h"
		);
		source.add("h");
		this.assertTarget([ "H" ], target);
		
		this.setExpectedOutput(
			"Destroyed H by h"
		);
		mapper.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableArray([ "d" ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created by d",
			"Spliced -[] +[0:[D]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ "D" ], target);
		
		this.setExpectedOutput(
			"Created by f",
			"Spliced -[] +[1:[F]] to [D]",
			"Changed",
			"Changed length from 1 to 2"
		);
		source.addAll([ "f" ]);
		this.assertTarget([ "D", "F" ], target);
		
		this.setExpectedOutput(
			"Created by c",
			"Spliced -[] +[1:[C]] to [D,F]",
			"Changed",
			"Changed length from 2 to 3"
		);
		source.add("c", 1);
		this.assertTarget([ "D", "C", "F" ], target);
		
		this.setExpectedOutput(
			"Created by b",
			"Created by m",
			"Spliced -[] +[0:[B,M]] to [D,C,F]",
			"Changed",
			"Changed length from 3 to 5"
		);
		source.addAll([ "b", "m" ], 0);
		this.assertTarget([ "B", "M", "D", "C", "F" ], target);
		
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertTarget([ "B", "M", "D", "C", "F" ], target);
		
		this.setExpectedOutput(
			"Created by a",
			"Spliced -[] +[5:[A]] to [B,M,D,C,F]",
			"Changed",
			"Changed length from 5 to 6"
		);
		source.add("a", 5);
		this.assertTarget([ "B", "M", "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Spliced -[1:[M]] +[] to [B,M,D,C,F,A]",
			"Changed",
			"Changed length from 6 to 5",
			"Destroyed M by m"
		);
		source.remove(1);
		this.assertTarget([ "B", "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[B]] +[] to [B,D,C,F,A]",
			"Changed",
			"Changed length from 5 to 4",
			"Destroyed B by b"
		);
		source.remove(0);
		this.assertTarget([ "D", "C", "F", "A" ], target);
		
		this.setExpectedOutput(
			"Created by k",
			"Spliced -[] +[4:[K]] to [D,C,F,A]",
			"Changed",
			"Changed length from 4 to 5"
		);
		source.add("k");
		this.assertTarget([ "D", "C", "F", "A", "K" ], target);
		
		this.setExpectedOutput(
			"Created by g",
			"Replaced F with G at 2",
			"Changed",
			"Destroyed F by f"
		);
		source.set("g", 2);
		this.assertTarget([ "D", "C", "G", "A", "K" ], target);
		
		this.setExpectedOutput();
		source.set("a", 3);
		this.assertTarget([ "D", "C", "G", "A", "K" ], target);
		
		this.setExpectedOutput(
			"Moved G from 2 to 1",
			"Changed"
		);
		source.move(2, 1);
		this.assertTarget([ "D", "G", "C", "A", "K" ], target);
		
		this.setExpectedOutput(
			"Moved D from 0 to 4",
			"Changed"
		);
		source.move(0, 4);
		this.assertTarget([ "G", "C", "A", "K", "D" ], target);
		
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertTarget([ "G", "C", "A", "K", "D" ], target);
		
		this.setExpectedOutput(
			"Reordered [G,C,A,K,D] by [3,1,0,4,2]",
			"Changed"
		);
		var items = source.getItems().concat();
		items.sort();
		source.performReorder(items);
		this.assertTarget([ "A", "C", "D", "G", "K" ], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[A],2:[D]] +[] to [A,C,D,G,K]",
			"Changed",
			"Changed length from 5 to 3",
			"Destroyed D by d",
			"Destroyed A by a"
		);
		source.performSplice([ "c", "g", "k" ]);
		this.assertTarget([ "C", "G", "K" ], target);
		
		this.setExpectedOutput(
			"Created by u",
			"Created by t",
			"Spliced -[1:[G,K]] +[0:[U,T]] to [C,G,K]",
			"Changed",
			"Destroyed K by k",
			"Destroyed G by g"
		);
		source.performSplice([ "u", "t", "c" ]);
		this.assertTarget([ "U", "T", "C" ], target);
		
		this.setExpectedOutput(
			"Cleared [U,T,C]",
			"Changed",
			"Changed length from 3 to 0",
			"Destroyed C by c",
			"Destroyed T by t",
			"Destroyed U by u"
		);
		source.clear();
		this.assertTarget([  ], target);
		
		this.setExpectedOutput(
			"Created by h",
			"Spliced -[] +[0:[H]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		source.add("h");
		this.assertTarget([ "H" ], target);
		
		this.setExpectedOutput(
			"Cleared [H]",
			"Changed",
			"Changed length from 1 to 0",
			"Destroyed H by h"
		);
		mapper.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var mapper = this.createMapper(source, target);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableArray([ "d" ]);
		this.setExpectedOutput("Created by d");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.ObservableArray);
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