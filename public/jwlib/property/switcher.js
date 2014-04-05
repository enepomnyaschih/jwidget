/*
	jWidget Lib source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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
 * `<V>` Watches source {@link JW.Property property} modification and calls
 * the specified {@link #init} and {@link #done} functions passing property
 * value as argument. Also, {@link #init} function is called on switcher
 * initialization, {@link #done} function is called on destruction. The
 * functions are not called if property value is null.
 *
 *     var property = new JW.Property(1);
 *     var switcher = new JW.Switcher(property, {
 *         {@link #init}: function(value) { console.log("Init " + value); },
 *         {@link #done}: function(value) { console.log("Done " + value); },
 *         {@link #scope}: this
 *     }); // output: Init 1
 *     property.{@link JW.Property#set set}(2); // output: Done 1, Init 2
 *     property.{@link JW.Property#set set}(null); // output: Done 2
 *     property.{@link JW.Property#set set}(3); // output: Init 3
 *     switcher.{@link #destroy}(); // output: Done 3
 *
 * Realistic use case for switcher is represented in next example:
 *
 *     this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
 *     this.own(new JW.Switcher(this.selectedDocument, {
 *         {@link #init}: function(document) { document.selected.{@link JW.Property#set set}(true); },
 *         {@link #done}: function(document) { document.selected.{@link JW.Property#set set}(false); },
 *         {@link #scope}: this
 *     }));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {JW.Property} property `V` Property.
 * @param {Object} config Configuration (see Config options).
 */
JW.Switcher = function(property, config) {
	JW.Switcher._super.call(this);
	config = config || {};
	this.property = property;
	this.init = config.init;
	this.done = config.done;
	this.scope = config.scope || this;
	this._value = null;
	this.own(new JW.Updater([property], this._update, this));
};

JW.extend(JW.Switcher, JW.Class, {
	/**
	 * @property {JW.Property} property Property.
	 */
	/**
	 * @cfg {Function} init
	 *
	 * `init(value: V)`
	 *
	 * Value initialization function.
	 */
	/**
	 * @cfg {Function} done
	 *
	 * `done(value: V)`
	 *
	 * Value releasing function.
	 */
	/**
	 * @cfg {Object} scope
	 * {@link #init} and {@link #done} call scope.
	 */
	
	destroy: function() {
		this._update();
		this._super();
	},
	
	_update: function(value) {
		if (JW.isSet(this._value) && this.done) {
			this.done.call(this.scope, this._value);
		}
		this._value = value;
		if (JW.isSet(this._value) && this.init) {
			this.init.call(this.scope, this._value);
		}
	}
});
