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

JW.Tests.Property.CopierTestCase = JW.Unit.TestCase.extend({
	testCopier: function()
	{
		var source = new JW.Property(1);
		var target = new JW.Property();
		target.changeEvent.bind(function(params) {
			this.output(params.oldValue + " to " + params.value);
		}, this);
		
		this.setExpectedOutput("null to 1");
		var copier = new JW.Copier(source, {target: target});
		this.assertStrictEqual(1, target.get());
		
		this.setExpectedOutput("1 to 2");
		source.set(2);
		this.assertStrictEqual(2, target.get());
		
		this.setExpectedOutput("2 to null");
		source.set(null);
		this.assertStrictEqual(null, target.get());
		
		this.setExpectedOutput("null to 3");
		source.set(3);
		this.assertStrictEqual(3, target.get());
		
		this.setExpectedOutput();
		copier.destroy();
		source.set(4);
		this.assertStrictEqual(3, target.get());
	},
	
	testAutoTarget: function()
	{
		var source = new JW.Property(1);
		var copier = new JW.Copier(source);
		var target = copier.target;
		target.changeEvent.bind(function(params) {
			this.output(params.oldValue + " to " + params.value);
		}, this);
		this.assertStrictEqual(1, target.get());
		
		this.setExpectedOutput("1 to 2");
		source.set(2);
		this.assertStrictEqual(2, target.get());
		
		this.setExpectedOutput("2 to null");
		source.set(null);
		this.assertStrictEqual(null, target.get());
		
		this.setExpectedOutput("null to 3");
		source.set(3);
		this.assertStrictEqual(3, target.get());
		
		this.setExpectedOutput();
		copier.destroy();
		source.set(4);
	}
});
