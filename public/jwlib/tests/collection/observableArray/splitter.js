/*
	jWidget Lib tests.

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
