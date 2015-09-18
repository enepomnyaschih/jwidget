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
 * Child component array wrapper in JW.UI.Component.
 *
 * Returned by JW.UI.Component#addArray method. If you'll destroy this object, child components will be removed
 * from parent.
 *
 * @extends JW.Class
 */
JW.UI.Component.Array = function(parent, source, el) {
	JW.UI.Component.Array._super.call(this);
	this.parent = parent;
	this.source = source;
	JW.Set.add(parent._arrays, this);

	this._mapper = source.createMapper({
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	});

	this._inserter = new JW.UI.Component.Inserter(this._mapper.target, el[0]);
};

JW.extend(JW.UI.Component.Array, JW.Class, {
	// JW.UI.Component parent;
	// JW.AbstractArray<JW.UI.Component> source;

	// override
	destroyObject: function() {
		this._inserter.destroy();
		this._inserter = null;
		this._mapper.destroy();
		this._mapper = null;
		JW.Set.remove(this.parent._arrays, this);
		this._super();
	},

	_afterAppend: function() {
		this.source.each(JW.UI._afterAppend);
	}
});
