/*
	jWidget library tests.
	
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

JW.Tests.Collection = {
	subscribeToArray: function(testCase, array, formatter) {
		formatter = formatter || function(x) { return x; };
		
		function formatItems(items) {
			return "[" + JW.Array.map(items, formatter).join(",") + "]";
		}
		
		function formatParams(params) {
			return params.index + ":" + formatItems(params.items);
		}
		
		function formatItemsList(itemsList) {
			return "[" + JW.Array.map(itemsList, formatParams).join(",") + "]";
		}
		
		array.spliceEvent.bind(function(params) {
			var spliceResult = params.spliceResult;
			testCase.output(
				"Spliced -" + formatItemsList(spliceResult.removedItemsList) +
				" +" + formatItemsList(spliceResult.addedItemsList) +
				" to " + formatItems(spliceResult.oldItems));
		});
		
		array.replaceEvent.bind(function(params) {
			testCase.output("Replaced " + formatter(params.oldItem) + " with " + formatter(params.newItem) +
				" at " + params.index);
		});
		
		array.moveEvent.bind(function(params) {
			testCase.output("Moved " + formatter(params.item) + " from " + params.fromIndex + " to " + params.toIndex);
		});
		
		array.clearEvent.bind(function(params) {
			testCase.output("Cleared " + formatItems(params.items));
		});
		
		array.reorderEvent.bind(function(params) {
			testCase.output("Reordered " + formatItems(params.items) + " by [" + params.indexArray.join(",") + "]");
		});
		
		array.changeEvent.bind(function(params) {
			testCase.output("Changed");
		});
		
		array.lengthChangeEvent.bind(function(params) {
			testCase.output("Changed length from " + params.oldLength + " to " + params.newLength);
		});
	},
	
	subscribeToMap: function(testCase, map, formatter) {
		formatter = formatter || function(x) { return x; };
		
		function formatMap(items) {
			return "{" + JW.Map.getValuesArray(JW.Map.map(items, function(item, key) {
				return key + ":" + item;
			})).join(",") + "}";
		}
		
		function formatItems(items) {
			return formatMap(JW.Map.map(items, formatter))
		}
		
		map.spliceEvent.bind(function(params) {
			var spliceResult = params.spliceResult;
			testCase.output(
				"Spliced -" + formatItems(spliceResult.removedItems) +
				" +" + formatItems(spliceResult.addedItems));
		});
		
		map.reindexEvent.bind(function(params) {
			testCase.output("Reindexed by " + formatMap(params.keyMap));
		});
		
		map.clearEvent.bind(function(params) {
			testCase.output("Cleared " + formatItems(params.items));
		});
		
		map.changeEvent.bind(function(params) {
			testCase.output("Changed");
		});
		
		map.sizeChangeEvent.bind(function(params) {
			testCase.output("Changed size from " + params.oldSize + " to " + params.newSize);
		});
	},
	
	assertArray: function(testCase, values, array) {
		testCase.assertStrictEqual(values.length, array.getLength());
		for (var i = 0; i < array.getLength(); ++i) {
			testCase.assertStrictEqual(values[i], array.get(i));
		}
	},
	
	assertMap: function(testCase, expected, map) {
		testCase.assertStrictEqual(JW.Map.getSize(expected), map.getSize());
		for (var key in expected) {
			testCase.assertStrictEqual(expected[key], map.get(key));
		}
	},
	
	assertArraySpliceResult: function(testCase, expected, spliceResult) {
		testCase.assertTrue(spliceResult instanceof JW.AbstractArray.SpliceResult);
		testCase.assertTrue(JW.Array.equal(expected.oldItems, spliceResult.oldItems));
		
		testCase.assertStrictEqual(expected.removedItemsList.length, spliceResult.removedItemsList.length);
		for (var i = 0; i < spliceResult.removedItemsList.length; ++i) {
			var expectedParams = expected.removedItemsList[i];
			var params = spliceResult.removedItemsList[i];
			testCase.assertTrue(params instanceof JW.AbstractArray.IndexItems);
			testCase.assertStrictEqual(expectedParams.index, params.index);
			testCase.assertTrue(JW.Array.equal(expectedParams.items, params.items));
		}
		
		testCase.assertStrictEqual(expected.addedItemsList.length, spliceResult.addedItemsList.length);
		for (var i = 0; i < spliceResult.addedItemsList.length; ++i) {
			var expectedParams = expected.addedItemsList[i];
			var params = spliceResult.addedItemsList[i];
			testCase.assertTrue(params instanceof JW.AbstractArray.IndexItems);
			testCase.assertStrictEqual(expectedParams.index, params.index);
			testCase.assertTrue(JW.Array.equal(expectedParams.items, params.items));
		}
	},
	
	assertMapSpliceResult: function(testCase, expected, spliceResult) {
		testCase.assertTrue(spliceResult instanceof JW.AbstractMap.SpliceResult);
		testCase.assertTrue(JW.Map.equal(expected.removedItems, spliceResult.removedItems));
		testCase.assertTrue(JW.Map.equal(expected.addedItems, spliceResult.addedItems));
	}
};
