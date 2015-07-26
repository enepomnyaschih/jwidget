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

JW.Tests.Collection.AbstractSet.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.Set([ a, b, c ]);
		var target = new JW.Set();
		
		this.setExpectedOutput(
			"Created A by a",
			"Created B by b",
			"Created C by c"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ a, b, c ], target);
		
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
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.Set([ a, b, c ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created A by a",
			"Created B by b",
			"Created C by c",
			"Changed size from 0 to 3",
			"Spliced -[] +[A,B,C]",
			"Changed"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ a, b, c ], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -[A,B,C] +[]",
			"Changed",
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
	
	testMultiSource: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var d = new JW.Proxy("d");
		var x = new JW.Proxy("x");
		x.result = new JW.Proxy("X");
		
		var source1 = new JW.Set([ a, b ]);
		var source2 = new JW.Set([ c, d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -[] +[X]",
			"Changed"
		);
		target.add(x.result);
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput(
			"Created A by a",
			"Created B by b",
			"Changed size from 1 to 3",
			"Spliced -[] +[A,B]",
			"Changed"
		);
		var mapper1 = this.createMapper(source1, target);
		this.assertTarget([ a, b, x ], target);
		
		this.setExpectedOutput(
			"Created C by c",
			"Created D by d",
			"Changed size from 3 to 5",
			"Spliced -[] +[C,D]",
			"Changed"
		);
		var mapper2 = this.createMapper(source2, target);
		this.assertTarget([ a, b, c, d, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 3",
			"Spliced -[A,B] +[]",
			"Changed",
			"Destroyed B by b",
			"Destroyed A by a"
		);
		mapper1.destroy();
		this.assertTarget([ c, d, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -[C,D] +[]",
			"Changed",
			"Destroyed D by d",
			"Destroyed C by c"
		);
		mapper2.destroy();
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableSet();
		var target = this.createTarget();
		var mapper = this.createMapper(source, target);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.Set([ d ]);
		this.setExpectedOutput("Created D by d");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.Set);
		this.assertTarget([ d ], mapper.target);
		this.setExpectedOutput("Destroyed D by d");
		mapper.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableSet();
		JW.Tests.Collection.subscribeToSet(this, target);
		return target;
	},
	
	createMapper: function(source, target) {
		return source.createMapper({
			target : target,
			scope  : this,
			
			createItem: function(data) {
				var item = new JW.Proxy(data.value.toUpperCase());
				data.result = item;
				this.output("Created " + item.value + " by " + data.value);
				return item;
			},
			
			destroyItem: function(item, data) {
				this.output("Destroyed " + item.value + " by " + data.value);
			}
		});
	},
	
	assertTarget: function(expected, target) {
		this.assertStrictEqual(expected.length, target.getLength());
		for (var i = 0; i < expected.length; ++i) {
			this.assertTrue(target.contains(expected[i].result));
		}
	}
});
