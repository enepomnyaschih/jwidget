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
 * Typical interface for event params. You don't have to use it in your custom events, but jWidget
 * uses it to expose some events.
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} sender Event sender.
 */
JW.EventParams = function(sender) {
	JW.EventParams._super.call(this);
	this.sender = sender;
};

JW.extend(JW.EventParams, JW.Class, {
	/**
	 * @property {Object} sender Event sender.
	 */
});
