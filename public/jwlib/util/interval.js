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
 *
 * jWidget wrapper over setInterval function.
 * JW.Interval destruction causes clearInterval invocation.
 * Convenient to use in combination with {@link JW.Class#own} method:
 *
 *     this.{@link JW.Class#own own}(new JW.Interval(JW.inScope(this._update, this), 1000));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Function} handler Interval handler function.
 * @param {Number} delay Interval delay.
 */
JW.Interval = function(callback, delay) {
	JW.Interval._super.call(this);
	this.interval = setInterval(callback, delay);
};

JW.extend(JW.Interval, JW.Class, {
	destroy: function() {
		clearInterval(this.interval);
		this._super();
	}
});
