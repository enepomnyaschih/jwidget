/// <reference path="../jwlib.ref.ts" />

module JW {
	/**
	 * Registry of objects indexed by id.
	 *
	 * Unlike enum, registry operates real objects, not integers.
	 *
	 * Unlike dictionary, forces objects to have an id field and provides immediate array representation.
	 *
	 * * [[items]] field contains item dictionary.
	 * * [[itemArray]] field contains item array in registering order.
	 *
	 * The next example demonstrates the registry of time units: days and months.
	 *
	 *     interface TimeUnit {
	 *         id: string;
	 *         add(date: Date, count: number);
	 *     }
	 *
	 *     var timeUnits = new JW.Registry<TimeUnit>();
	 *
	 *     timeUnits.registerItem({
	 *         id: "day",
	 *         add: function(date: Date, count: number) {
	 *             date.setDate(date.getDate() + count);
	 *         }
	 *     });
	 *
	 *     timeUnits.registerItem({
	 *         id: "month",
	 *         add: function(date: Date, count: number) {
	 *             date.setMonth(date.getMonth() + count);
	 *         }
	 *     });
	 *
	 * Now we can operate abstract time units in code:
	 *
	 *     function addDate(date: Date, count: number, unit: string) {
	 *         timeUnits.items[unit].add(date, count);
	 *     }
	 *
	 *     var date = new Date(2000, 0, 1); // January 1st
	 *     addDate(date, 40, "day");
	 *     assert.strictEqual(date.getFullYear(), 2000);
	 *     assert.strictEqual(date.getMonth(), 1); // February
	 *     assert.strictEqual(date.getDate(), 10); // 10th
	 *
	 * @param T Registry item type.
	 */
	export class Registry<T> {
		/**
		 * Mapping from item id to an item.
		 */
		items: Dictionary<T> = {};

		/**
		 * Array of all items in registering order.
		 */
		itemArray: T[] = [];

		/**
		 * @param idField id field name.
		 */
		constructor(private idField: string = "id") {
		}

		/**
		 * Registers a new item. Item must have an id field specified in registry constructor.
		 */
		registerItem(item: T) {
			this.items[item[this.idField]] = item;
			this.itemArray.push(item);
		}

		/**
		 * Returns id of an item.
		 */
		getId(item: T): any {
			return item[this.idField];
		}
	}
}
