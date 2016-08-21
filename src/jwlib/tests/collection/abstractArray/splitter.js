/*
	jWidget library tests.
	
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

JW.Tests.Collection.AbstractArray.SplitterTestCase = JW.Unit.TestCase.extend({
	testSplitter: function() {
		var testCase = this;
		var rowId = 0;
		
		var source = new JW.Array([
			"a", "b", "c",
			"d", "e", "f",
			"g"
		]);
		
		var splitter = source.createSplitter({
			capacity : 3
		});
		
		this.assertStrictEqual(3, splitter.rows.getLength());
		this.assertTrue(splitter.rows.get(0) instanceof JW.Array);
		this.assertTrue(splitter.rows.get(1) instanceof JW.Array);
		this.assertTrue(splitter.rows.get(2) instanceof JW.Array);
		
		this.assertTarget([ "a", "b", "c" ], splitter.rows.get(0));
		this.assertTarget([ "d", "e", "f" ], splitter.rows.get(1));
		this.assertTarget([ "g" ], splitter.rows.get(2));
		
		splitter.destroy();
		source.destroy();
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getLength());
		for (var i = 0; i < target.getLength(); ++i) {
			this.assertStrictEqual(values[i], target.get(i));
		}
	}
});
