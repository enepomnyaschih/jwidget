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
 * jWidget wrapper over setTimeout function.
 * JW.Timeout destruction causes clearTimeout invocation.
 * Convenient to use in combination with {@link JW.Class#own} method:
 *
 *     this.{@link JW.Class#own own}(new JW.Timeout(JW.inScope(this._update, this), 1000));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Function} handler Timeout handler function.
 * @param {Number} delay Timeout delay.
 */
JW.Timeout = function(callback, delay) {
	JW.Timeout._super.call(this);
	this.timeout = setTimeout(callback, delay);
};

JW.extend(JW.Timeout, JW.Class, {
	destroy: function() {
		clearTimeout(this.timeout);
		this._super();
	}
});
