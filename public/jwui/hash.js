/*
	jWidget UI source file.

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
