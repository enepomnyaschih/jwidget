/*
	JW ordered collection syncher with UI component.
	
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

JW.UI.Inserter = function(config) {
	JW.UI.Inserter._super.call(this);
	this.el = config.el;
	this.source = config.source;
	
	this._inserter = new JW.ObservableArray.Inserter({
		source     : this.source,
		addItem    : this._addItem,
		removeItem : this._removeItem,
		clearItems : this._clearItems,
		scope      : this
	});
};

JW.extend(JW.UI.Inserter, JW.Class, {
	/*
	Required
	Element el;
	JW.ObservableArray<JW.UI.Component> source;
	
	Fields
	JW.ObservableArray.Inserter<JW.UI.Component> _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		this._super();
	},
	
	_addItem: function(item, index) {
		this.el.insert(item.el, index);
		item._afterAppend();
	},
	
	_removeItem: function(index, item) {
		item.el.detach();
	},
	
	_clearItems: function() {
		this.el.empty();
	}
});
