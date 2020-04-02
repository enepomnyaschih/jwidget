/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

JW.Tests.Collection.AbstractArray.MapperTestCase = JW.Unit.TestCase.extend({
	testMapValues: function() {
		var source = new JW.Array([ "a", "b", "c" ]);

		this.setExpectedOutput(
			"Created by a",
			"Created by b",
			"Created by c"
		);
		var target = source.$$mapValues(this.createFunc, this);
		this.assertTarget([ "A", "B", "C" ], target);

		target.destroy();
		source.destroy();
	},

	testMapObjects: function() {
		var source = new JW.Array([ "a", "b", "c" ]);

		this.setExpectedOutput(
			"Created by a",
			"Created by b",
			"Created by c"
		);
		var target = source.$$mapObjects(function(x) {
			this.output("Created by " + x);
			var self = this;
			return {
				x: x,
				destroy: function() {
					self.output("Destroyed by " + x);
				}
			};
		}, this);
		this.assertTarget([ "a", "b", "c" ], target.$map(JW.byField("x")));

		this.setExpectedOutput(
			"Destroyed by c",
			"Destroyed by b",
			"Destroyed by a"
		);
		target.destroy();
		source.destroy();
	},

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
			"Changed length from 0 to 3",
			"Spliced -[] +[0:[A,B,C]] to []",
			"Changed"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget([ "A", "B", "C" ], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 0",
			"Cleared [A,B,C]",
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
			
			createItem: this.createFunc,
			
			destroyItem: function(item, data) {
				this.output("Destroyed " + item + " by " + data);
			}
		});
	},

	createFunc: function(data) {
		this.output("Created by " + data);
		return data.toUpperCase();
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getLength());
		for (var i = 0; i < target.getLength(); ++i) {
			this.assertStrictEqual(values[i], target.get(i));
		}
	}
});
