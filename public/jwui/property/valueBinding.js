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
