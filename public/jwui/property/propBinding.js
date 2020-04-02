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
 * Result of {@link jQuery#jwprop jwprop} method call. Destroy it to stop synchronization.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} prop Element's property name.
 * @param {JW.Property} property `<Boolean>` Property.
 * @param {JW.Binding} [binding] Binding mode. Defaults to JW.Binding.UPDATE.
 */
JW.UI.PropBinding = function(el, prop, property, binding) {
	JW.UI.PropBinding._super.call(this);
	binding = binding || JW.UPDATE;
	if (binding & JW.UPDATE) {
		this.own(new JW.UI.PropUpdater(el, prop, property));
	}
	if (prop === "checked" && (binding & JW.WATCH)) {
		this.own(new JW.UI.CheckedListener(el, {target: property}));
	}
};

JW.extend(JW.UI.PropBinding, JW.Class);
