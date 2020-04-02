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

/**
 * @method makeRegistry
 *
 * Converts a class to a {@link Registry Registry}, which means that this class gets special static fields and methods.
 *
 * @static
 * @member JW
 * @param {Function} cls Class.
 * @param {String} [idField="id"] Identifier field name.
 * @returns {Function} Returns cls.
 */
JW.makeRegistry = function(cls, idField) {
	idField = idField || "id";

	/**
	 * @class Registry
	 * Convert a class to a registry by method JW.makeRegistry. After that you'll be able to use several
	 * static fields and methods.
	 *
	 *     // Base time unit
	 *     var TimeUnit = function() {
	 *         TimeUnit.{@link JW.Class#_super _super}.call(this);
	 *     };
	 *
	 *     JW.extend(TimeUnit, JW.Class, {
	 *         // abstract id: String;
	 *         // abstract add(date: Date, count: number): Date;
	 *     });
	 *
	 *     JW.makeRegistry(TimeUnit);
	 *
	 *     // Date time unit
	 *     TimeUnit.Day = function() {
	 *         TimeUnit.Day.{@link JW.Class#_super _super}.call(this);
	 *     };
	 *
	 *     JW.extend(TimeUnit.Day, TimeUnit, {
	 *         id: "day",
	 *         add: function(date, count) { date.setDate(date.getDate() + count); }
	 *     });
	 *
	 *     TimeUnit.{@link Registry#registerItem registerItem}(new TimeUnit.Day());
	 *
	 *     // Month time unit
	 *     TimeUnit.Month = function() {
	 *         TimeUnit.Month.{@link JW.Class#_super _super}.call(this);
	 *     };
	 *
	 *     JW.extend(TimeUnit.Month, TimeUnit, {
	 *         id: "month",
	 *         add: function(date, count) { date.setMonth(date.getMonth() + count); }
	 *     });
	 *
	 *     TimeUnit.{@link Registry#registerItem registerItem}(new TimeUnit.Month());
	 *
	 *     // Example of how to utilize this
	 *     function addDate(date, count, unit) {
	 *         TimeUnit.{@link Registry#getItem getItem}(unit).add(date, count);
	 *     }
	 *
	 *     var date = new Date(2000, 0, 1);
	 *     addDate(date, 40, "day");
	 *     assert(2000 === date.getFullYear());
	 *     assert(1 === date.getMonth());
	 *     assert(10 === date.getDate());
	 */
	JW.apply(cls, {
		/**
		 * @property {Object} items Mapping from item id to an item.
		 * @static
		 */
		items: {},

		/**
		 * @property {Array} itemArray Array of all items in addition order.
		 * @static
		 */
		itemArray: [],

		/**
		 * @method
		 * Registers a new item. Item must have an id field specified by JW.makeRegistry method call.
		 * @static
		 * @param {Mixed} item Item.
		 */
		registerItem: function(item) {
			cls.items[item[idField]] = item;
			cls.itemArray.push(item);
		},

		/**
		 * @method
		 * Returns an item by id.
		 * @static
		 * @param {String} id
		 */
		getItem: function(value) {
			return (value instanceof cls) ? value : cls.items[value];
		},

		getId: function(value) {
			return (value instanceof cls) ? value[idField] : value;
		}
	});

	return cls;
};

JW.makeFactory = JW.makeRegistry;
