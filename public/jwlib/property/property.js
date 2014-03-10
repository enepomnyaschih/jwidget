/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
 * `<V>` The observable property.
 * @extends JW.Class
 *
 * @constructor
 * @param {V} value Initial value.
 */
JW.Property = function(value) {
	JW.Property._super.call(this);
	this.value = JW.defn(value, null);
	this.changeEvent = new JW.Event();
};

JW.extend(JW.Property, JW.Class, {
	/**
	 * @event changeEvent
	 * Property value is changed. Triggered in result of calling #set method.
	 * @param {JW.ValueChangeEventParams} params `<V>` Parameters.
	 */
	
	/*
	V value;
	JW.Class _binding;
	*/
	
	destroy: function() {
		this.changeEvent.destroy();
		this._super();
	},
	
	/**
	 * Returns property value.
	 * @returns {V} Property value.
	 */
	get: function() {
		return this.value;
	},
	
	/**
	 * Changes property value and triggers event #changeEvent.
	 * @param {V} Value.
	 */
	set: function(value) {
		var oldValue = this.value;
		if (oldValue === value) {
			return;
		}
		this.value = value;
		this.changeEvent.trigger(new JW.ValueChangeEventParams(this, value, oldValue));
	}
});
