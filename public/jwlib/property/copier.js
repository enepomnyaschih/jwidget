/*
	jWidget Lib source file.
	
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
 * `<V>` Watches source {@link JW.Property property} modification and copies
 * its value to target property.
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Property();
 *     var copier = new JW.Copier(source, { {@link #cfg-target target}: target });
 *     assert(1, target.{@link JW.Property#get get}());
 *     source.{@link JW.Property#set set}(2);
 *     assert(2, target.{@link JW.Property#get get}());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that copier owns it in this case.
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Copier(this.source).{@link #property-target target};
 *     assert(1, target.{@link JW.Property#get get}());
 *
 * JW.Property has a shorthand method {@link JW.Property#bindTo bindTo}:
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Property();
 *     target.{@link JW.Property#bindTo bindTo}(source);
 *     assert(1, target.{@link JW.Property#get get}());
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {JW.Property} source `<V>` Source property.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.Copier = function(source, config) {
	JW.Copier._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this._update();
	this.own(source.changeEvent.bind(this._update, this));
};

JW.extend(JW.Copier, JW.Class, {
	/**
	 * @property {JW.Property} source `<V>` Source property.
	 */
	/**
	 * @cfg {JW.Property} target
	 * `<V>` Target property. By default, created automatically.
	 */
	/**
	 * @property {JW.Property} target `<V>` Target property.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	},
	
	_update: function() {
		this.target.set(this.source.get());
	}
});
