/*
	jWidget UI source file.

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
 * Child component collection wrapper in JW.UI.Component.
 *
 * Returned by JW.UI.Component#addCollection method. If you'll destroy this object, child components will be removed
 * from parent.
 *
 * @extends JW.Class
 */
JW.UI.Component.Collection = function(parent, source, el) {
	JW.UI.Component.Collection._super.call(this);
	this.parent = parent;
	this.source = source;
	JW.Set.add(parent._collections, this);

	var mapper = this.own(source.createMapper({
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	}));

	this.own(new JW.UI.Component.CollectionInserter(mapper.target, el[0]));
};

JW.extend(JW.UI.Component.Collection, JW.Class, {
	// JW.UI.Component parent;
	// JW.AbstractCollection<JW.UI.Component> source;

	// override
	destroy: function() {
		JW.Set.remove(this.parent._collections, this);
		this._super();
	},

	_afterAppend: function() {
		this.source.each(JW.UI._afterAppend);
	}
});
