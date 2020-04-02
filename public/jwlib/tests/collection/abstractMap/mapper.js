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

JW.Tests.Collection.AbstractMap.MapperTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		var target = new JW.Map();
		
		this.setExpectedOutput(
			"Created A! by A",
			"Created B! by B",
			"Created C! by C"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Destroyed A! by A",
			"Destroyed B! by B",
			"Destroyed C! by C"
		);
		mapper.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Created A! by A",
			"Created B! by B",
			"Created C! by C",
			"Changed size from 0 to 3",
			"Spliced -{} +{a:A!,b:B!,c:C!}",
			"Changed"
		);
		var mapper = this.createMapper(source, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -{a:A!,b:B!,c:C!} +{}",
			"Changed",
			"Destroyed A! by A",
			"Destroyed B! by B",
			"Destroyed C! by C"
		);
		mapper.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.Map({ "a": "A", "b": "B" });
		var source2 = new JW.Map({ "c": "C", "d": "D" });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{x:X!}",
			"Changed"
		);
		target.set("X!", "x");
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Created A! by A",
			"Created B! by B",
			"Changed size from 1 to 3",
			"Spliced -{} +{a:A!,b:B!}",
			"Changed"
		);
		var mapper1 = this.createMapper(source1, target);
		this.assertTarget({ "a": "A!", "b": "B!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Created C! by C",
			"Created D! by D",
			"Changed size from 3 to 5",
			"Spliced -{} +{c:C!,d:D!}",
			"Changed"
		);
		var mapper2 = this.createMapper(source2, target);
		this.assertTarget({ "a": "A!", "b": "B!", "c": "C!", "d": "D!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 3",
			"Spliced -{a:A!,b:B!} +{}",
			"Changed",
			"Destroyed A! by A",
			"Destroyed B! by B"
		);
		mapper1.destroy();
		this.assertTarget({ "c": "C!", "d": "D!", "x": "X!" }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -{c:C!,d:D!} +{}",
			"Changed",
			"Destroyed C! by C",
			"Destroyed D! by D"
		);
		mapper2.destroy();
		this.assertTarget({ "x": "X!" }, target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Map();
		var target = this.createTarget();
		var mapper = this.createMapper(source, target);
		mapper.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Map({ "d": "D" });
		this.setExpectedOutput("Created D! by D");
		var mapper = this.createMapper(source);
		this.assertTrue(mapper.target instanceof JW.Map);
		this.assertTarget({ "d": "D!" }, mapper.target);
		this.setExpectedOutput("Destroyed D! by D");
		mapper.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableMap();
		JW.Tests.Collection.subscribeToMap(this, target);
		return target;
	},
	
	createMapper: function(source, target) {
		return source.createMapper({
			target : target,
			scope  : this,
			
			createItem: function(data) {
				var item = data + "!";
				this.output("Created " + item + " by " + data);
				return item;
			},
			
			destroyItem: function(item, data) {
				this.output("Destroyed " + item + " by " + data);
			}
		});
	},
	
	assertTarget: function(expected, map) {
		JW.Tests.Collection.assertMap(this, expected, map);
	}
});
