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
 * @class JW.UI.Component.TemplateOutput
 * 
 * Result of JW.UI.Component.Template#createElement method. HTML template rendering output.
 * 
 * @extends JW.Class
 * @constructor
 * @param {DOMElement} root The rendered element.
 * @param {Object} groups `<Array<DOMElement>>` Map from jwid to the elements with this jwid.
 */
JW.UI.Component.TemplateOutput = function(root, groups) {
	JW.UI.Component.TemplateOutput._super.call(this);
	this.root = root;
	this.groups = groups;
};

JW.extend(JW.UI.Component.TemplateOutput, JW.Class, {
	/**
	 * @property {DOMElement} root The rendered element.
	 */
	/**
	 * @property {Object} groups `<Array<DOMElement>>` Map from jwid to the elements with this jwid.
	 */
});
