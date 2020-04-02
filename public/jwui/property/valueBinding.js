/*
	jWidget UI source file.
	
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
 * Result of {@link jQuery#jwval jwval} method call. Destroy it to stop synchronization.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Property.
 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
 * @param {Boolean} [simple=false]
 * If true, watch-binding listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
JW.UI.ValueBinding = function(el, property, binding, simple) {
	JW.UI.ValueBinding._super.call(this);
	binding = binding || JW.UPDATE;
	if (binding & JW.UPDATE) {
		this.own(new JW.UI.ValueUpdater(el, property));
	}
	if (binding & JW.WATCH) {
		this.own(new JW.UI.ValueListener(el, {target: property, simple: simple}));
	}
};

JW.extend(JW.UI.ValueBinding, JW.Class);
