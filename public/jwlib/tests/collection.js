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
		
		function formatItems(items) {
			return JW.Tests.Collection.formatMap(JW.Map.map(items, formatter))
		}
		
		map.spliceEvent.bind(function(params) {
			var spliceResult = params.spliceResult;
			testCase.output(
				"Spliced -" + formatItems(spliceResult.removedItems) +
				" +" + formatItems(spliceResult.addedItems));
		});
		
		map.reindexEvent.bind(function(params) {
			testCase.output("Reindexed by " + JW.Tests.Collection.formatMap(params.keyMap));
		});
		
		map.clearEvent.bind(function(params) {
			testCase.output("Cleared " + formatItems(params.items));
		});
		
		map.changeEvent.bind(function(params) {
			testCase.output("Changed");
		});
		
		map.lengthChangeEvent.bind(function(params) {
			testCase.output("Changed size from " + params.oldLength + " to " + params.newLength);
		});
	},
	
	subscribeToSet: function(testCase, set, formatter) {
		formatter = formatter || function(x) { return x.value; };
		
		function formatItems(items) {
			items = items.concat();
			items.sort(compareItems);
			return "[" + JW.Array.map(items, formatter).join(",") + "]";
		}
		
		function compareItems(x, y) {
			return JW.cmp(formatter(x), formatter(y));
		}
		
		set.spliceEvent.bind(function(params) {
			var spliceResult = params.spliceResult;
			testCase.output(
				"Spliced -" + formatItems(spliceResult.removedItems) +
				" +" + formatItems(spliceResult.addedItems));
		});
		
		set.clearEvent.bind(function(params) {
			testCase.output("Cleared " + formatItems(params.items));
		});
		
		set.changeEvent.bind(function(params) {
			testCase.output("Changed");
		});
		
		set.lengthChangeEvent.bind(function(params) {
			testCase.output("Changed size from " + params.oldLength + " to " + params.newLength);
		});
	},
	
	assertArray: function(testCase, values, array) {
		testCase.assertStrictEqual(values.length, array.getLength());
		for (var i = 0; i < array.getLength(); ++i) {
			testCase.assertStrictEqual(values[i], array.get(i));
		}
	},
	
	assertMap: function(testCase, expected, map) {
		testCase.assertStrictEqual(JW.Map.getLength(expected), map.getLength());
		for (var key in expected) {
			testCase.assertStrictEqual(expected[key], map.get(key));
		}
	},
	
	assertSet: function(testCase, expected, unexpected, set) {
		testCase.assertStrictEqual(expected.length, set.getLength());
		for (var i = 0; i < expected.length; ++i) {
			testCase.assertTrue(set.contains(expected[i]));
		}
		for (var i = 0; i < unexpected.length; ++i) {
			testCase.assertFalse(set.contains(unexpected[i]));
		}
	},
	
	assertArraySpliceParams: function(testCase, expected, spliceParams) {
		testCase.assertTrue(spliceParams instanceof JW.AbstractArray.SpliceParams);
		
		testCase.assertStrictEqual(expected.removeParamsList.length, spliceParams.removeParamsList.length);
		for (var i = 0; i < spliceParams.removeParamsList.length; ++i) {
			var expectedParams = expected.removeParamsList[i];
			var params = spliceParams.removeParamsList[i];
			testCase.assertTrue(params instanceof JW.AbstractArray.IndexCount);
			testCase.assertStrictEqual(expectedParams.index, params.index);
			testCase.assertStrictEqual(expectedParams.count, params.count);
		}
		
		testCase.assertStrictEqual(expected.addParamsList.length, spliceParams.addParamsList.length);
		for (var i = 0; i < spliceParams.addParamsList.length; ++i) {
			var expectedParams = expected.addParamsList[i];
			var params = spliceParams.addParamsList[i];
			testCase.assertTrue(params instanceof JW.AbstractArray.IndexItems);
			testCase.assertStrictEqual(expectedParams.index, params.index);
			testCase.assertTrue(JW.Array.equal(expectedParams.items, params.items));
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
	
	assertMapSpliceParams: function(testCase, expected, spliceParams) {
		testCase.assertTrue(spliceParams instanceof JW.AbstractMap.SpliceParams);
		testCase.assertTrue(JW.Array.equal(expected.removedKeys, spliceParams.removedKeys));
		testCase.assertTrue(JW.Map.equal(expected.updatedItems, spliceParams.updatedItems));
	},
	
	assertMapSpliceResult: function(testCase, expected, spliceResult) {
		testCase.assertTrue(spliceResult instanceof JW.AbstractMap.SpliceResult);
		testCase.assertTrue(JW.Map.equal(expected.removedItems, spliceResult.removedItems));
		testCase.assertTrue(JW.Map.equal(expected.addedItems, spliceResult.addedItems));
	},
	
	assertSetSpliceParams: function(testCase, expected, spliceParams) {
		testCase.assertTrue(spliceParams instanceof JW.AbstractSet.SpliceParams);
		testCase.assertTrue(new JW.Set(expected.removedItems).equal(spliceParams.removedItems));
		testCase.assertTrue(new JW.Set(expected.addedItems).equal(spliceParams.addedItems));
	},
	
	assertSetSpliceResult: function(testCase, expected, spliceResult) {
		testCase.assertTrue(spliceResult instanceof JW.AbstractSet.SpliceResult);
		testCase.assertTrue(new JW.Set(expected.removedItems).equal(spliceResult.removedItems));
		testCase.assertTrue(new JW.Set(expected.addedItems).equal(spliceResult.addedItems));
	},
	
	formatMap: function(items) {
		var pairs = [];
		for (var key in items) {
			pairs.push([ key, items[key] ]);
		}
		pairs.sort(function(x, y) {
			return JW.cmp(x[0], y[0]);
		});
		var strs = JW.Array.map(pairs, function(pair) {
			return pair[0] + ":" + pair[1];
		});
		return "{" + strs.join(",") + "}";
	}
};
