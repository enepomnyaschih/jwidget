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
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractArray.Orderer = function(source, config) {
	JW.AbstractArray.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
});
