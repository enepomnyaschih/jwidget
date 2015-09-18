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

JW.Tests.Collection.ObservableArray.SplitterTestCase = JW.Unit.TestCase.extend({
	testSplitter: function() {
		var testCase = this;
		var rowId = 0;

		var source = new JW.ObservableArray([ "a", "b", "c", "d" ]);
		var splitter = source.createSplitter({
			capacity : 3
		});

		var Row = function(items) {
			Row._super.call(this);
			this.id = ++rowId;
			testCase.output("Created row " + this.id);
			this.items = items;
			this._inserter = items.createInserter({
				addItem    : this._addItem,
				removeItem : this._removeItem,
				clearItems : this._clearItems,
				scope      : this
			});
		};

		JW.extend(Row, JW.Class, {
			/*
			Fields
			number id;
			JW.ObservableArray<String> items;
			JW.ObservableArray.Inserter<String> _inserter;
			*/

			// override
			destroyObject: function() {
				this._inserter.destroy();
				testCase.output("Destroyed row " + this.id);
				this._super();
			},

			_addItem: function(item, index) {
				testCase.output("Added item " + item + " at " + this.id + "." + index);
			},

			_removeItem: function(item, index) {
				testCase.output("Removed item " + item + " at " + this.id + "." + index);
			},

			_clearItems: function(items) {
				testCase.output("Cleared items " + items.join(", ") + " at row " + this.id);
			}
		});

		this.setExpectedOutput(
			"Created row 1",
			"Added item a at 1.0",
			"Added item b at 1.1",
			"Added item c at 1.2",
			"Created row 2",
			"Added item d at 2.0"
		);
		var mapper = splitter.rows.createMapper({
			createItem  : function(items) { return new Row(items); },
			destroyItem : function(row) { row.destroy(); }
		});

		// (a b c) (d)

		this.setExpectedOutput(
			"Added item e at 2.1"
		);
		source.add("e");

		// (a b c) (d e)

		this.setExpectedOutput(
			// insert f
			"Removed item c at 1.2",
			"Added item c at 2.0",
			"Added item f at 1.2",
			// insert g
			"Created row 3",
			"Removed item e at 2.2",
			"Added item e at 3.0",
			"Added item g at 2.0",
			// insert h
			"Removed item d at 2.2",
			"Added item d at 3.0",
			"Added item h at 2.1"
		);
		source.addAll([ "f", "g", "h" ], 2);

		// (a b f) (g h c) (d e)

		this.setExpectedOutput(
			"Removed item c at 2.2",
			"Added item c at 3.0",
			"Removed item f at 1.2",
			"Added item f at 2.0",
			"Added item i at 1.0"
		);
		source.add("i", 0);

		// (i a b) (f g h) (c d e)

		this.setExpectedOutput(
			// remove b
			"Removed item b at 1.2",
			"Removed item f at 2.0",
			"Added item f at 1.2",
			"Removed item c at 3.0",
			"Added item c at 2.2",
			// remove a
			"Removed item a at 1.1",
			"Removed item g at 2.0",
			"Added item g at 1.2",
			"Removed item d at 3.0",
			"Added item d at 2.2"
		);
		source.removeAll(1, 2);

		// (i f g) (h c d) (e)

		this.setExpectedOutput(
			// remove h
			"Removed item h at 2.0",
			"Cleared items e at row 3", // inserter's tweak: if 2/3 rows are spliced out, then clear & add items
			"Added item e at 2.2",
			"Destroyed row 3",
			// remove g
			"Removed item g at 1.2",
			"Removed item c at 2.0",
			"Added item c at 1.2"
		);
		source.removeAll(2, 2);

		// (i f c) (d e)

		this.setExpectedOutput(
			// remove e
			"Removed item e at 2.1"
		);
		source.remove(4);

		// (i f c) (d)

		this.setExpectedOutput(
			"Cleared items d at row 2",
			"Destroyed row 2",
			"Cleared items i, f, c at row 1",
			"Destroyed row 1"
		);
		splitter.destroy();

		this.setExpectedOutput();
		mapper.destroy();
		source.destroy();
	}
});
