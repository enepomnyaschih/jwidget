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
			testCase.output(
				"Spliced -" + formatItemsList(params.removedItemsList) +
				" +" + formatItemsList(params.addedItemsList) +
				" to " + formatItems(params.oldItems));
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
			testCase.output("Reordered " + formatItems(params.items) + " by [" + indexArray.join(",") + "]");
		});
		
		array.changeEvent.bind(function(params) {
			testCase.output("Changed");
		});
		
		array.lengthChangeEvent.bind(function(params) {
			testCase.output("Changed length from " + params.oldLength + " to " + params.newLength);
		});
	},
	
	assertArray: function(testCase, values, array) {
		testCase.assertStrictEqual(values.length, array.getLength());
		for (var i = 0; i < array.getLength(); ++i) {
			testCase.assertStrictEqual(values[i], array.get(i));
		}
	}
};
