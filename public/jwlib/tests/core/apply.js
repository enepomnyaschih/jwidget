﻿/*
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

JW.Tests.Core.ApplyTestCase = function(config) {
	JW.Tests.Core.ApplyTestCase._super.call(this, config);
	this.a = null;
	this.b = null;
};

JW.extend(JW.Tests.Core.ApplyTestCase, JW.Unit.TestCase, {
	setup: function()
	{
		this.a = {
			a: undefined,
			b: null,
			c: 0,
			d: 1,
			e: true,
			f: false,
			g: '',
			h: 'lala',
			i: {},
			j: { length: 1 },
			k: [],
			l: [ 1 ],
			n: 10
		};

		this.b = {
			a: 10,
			b: 10,
			c: 10,
			d: 10,
			e: 10,
			f: 10,
			g: 10,
			h: 10,
			i: 10,
			j: 10,
			k: 10,
			l: 10,
			m: 10,
			n: undefined
		};
	},
	
	testApply: function()
	{
		var c = JW.apply({}, this.a);
		this._testApply(c, []);
		
		var d = JW.apply(c, this.b);
		this.assertStrictEqual(c, d);
		
		this._testApply(c, [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m" ]);
	},
	
	testApplyIf: function()
	{
		var c = JW.apply({}, this.a);
		JW.applyIf(c, this.b);
		this._testApply(c, [ "a" ]);
	},
	
	testApplyIfn: function()
	{
		var c = JW.apply({}, this.a);
		JW.applyIfn(c, this.b);
		this._testApply(c, [ "a", "b" ]);
	},
	
	testClean: function()
	{
		var c = JW.apply({}, this.a);
		c = JW.clean(c);
		this._testClean(c, [ "a" ]);
	},
	
	testCleann: function()
	{
		var c = JW.apply({}, this.a);
		c = JW.cleann(c);
		this._testClean(c, [ "a", "b" ]);
	},
	
	_testApply: function(c, fields)
	{
		fields = this._getFields(fields);
		for (var i in this.a)
		{
			if (fields[i])
				this.assertStrictEqual(this.b[i], c[i]);
			else
				this.assertStrictEqual(this.a[i], c[i]);
		}
	},
	
	_testClean: function(c, fields)
	{
		fields = this._getFields(fields);
		for (var i in this.a)
		{
			if (!fields[i])
				this.assertStrictEqual(this.a[i], c[i]);
		}
		
		for (var i in c)
		{
			if (fields[i])
				this.fail("Field '" + i + "' is not cleaned up");
		}
	},
	
	_getFields: function(fields)
	{
		var o = {};
		for (var i = 0; i < fields.length; ++i)
			o[fields[i]] = true;
		
		return o;
	}
});
