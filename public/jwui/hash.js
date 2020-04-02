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
 * Current page hash (without leading "#"). Available as JW.UI.hash.
 *
 * @extends JW.Property
 */
JW.UI.Hash = function() {
	JW.UI.Hash._super.call(this, location.hash.substr(1));
	jQuery(window).jwon("hashchange", function() {
		JW.UI.hash.set(location.hash.substr(1));
	}, this);
};

JW.extend(JW.UI.Hash, JW.Property, {
	/**
	 * Changes window hash and triggers event #changeEvent.
	 * @param {String} value New hash value.
	 * @param {boolean} [replaceState] Replaces current history entry rather than creating a new one.
	 */
	set: function(value, replaceState) {
		value = value || "";
		var oldValue = this._value;
		if (oldValue === value) {
			return;
		}
		this._value = value;
		if (replaceState && window.history && history.replaceState) {
			history.replaceState(null, "", location.pathname + "#" + value);
		} else {
			location.hash = "#" + value;
		}
		this.changeEvent.trigger(new JW.ValueChangeEventParams(this, value, oldValue));
	}
});

JW.UI.hash = new JW.UI.Hash();
