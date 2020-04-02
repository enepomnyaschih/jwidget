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
 * @class
 *
 * `<T> extends JW.AbstractCollection.Filterer<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Filterer = function(source, config) {
	JW.AbstractMap.Filterer._super.call(this, source, config);
	this.target.trySetAll(source.filter(this.filterItem, this.scope));
};

JW.extend(JW.AbstractMap.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Target collection.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Target collection.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this.source.getKeys());
		this._super();
	}
});
