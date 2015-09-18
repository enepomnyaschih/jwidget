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
 * Replaceable child component wrapper in JW.UI.Component.
 * 
 * Returned by JW.UI.Component#addReplaceable method. If you'll destroy this object, replaceables child component
 * will be removed from parent and element will return to its original state.
 *
 * @extends JW.Class
 */
JW.UI.Component.Replaceable = function(parent, component, id) {
	JW.UI.Component.Replaceable._super.call(this);
	this.parent = parent;
	this.id = id;
	JW.Set.add(parent._replaceables, this);
	
	this._switcher = new JW.Switcher([component], {
		init: function(child) {
			this.parent.children.set(child, this.id);
		},
		done: function() {
			this.parent.children.remove(this.id);
		},
		scope: this
	});
};

JW.extend(JW.UI.Component.Replaceable, JW.Class, {
	// JW.UI.Component parent;
	
	// override
	destroyObject: function() {
		this._switcher.destroy();
		this._switcher = null;
		JW.Set.remove(this.parent._replaceables, this);
		this._super();
	}
});
