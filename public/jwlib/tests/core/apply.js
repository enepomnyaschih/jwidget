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
