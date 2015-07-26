/*
	jWidget Lib source file.

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
