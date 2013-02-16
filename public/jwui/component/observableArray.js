/*
	jWidget UI source file.
	
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

JW.UI.Component.ObservableArray = function(parent, source, el) {
	JW.UI.Component.ObservableArray._super.call(this);
	this.parent = parent;
	
	this._mapper = new JW.ObservableArray.Mapper({
		source      : source,
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	});
	
	this._inserter = new JW.UI.Inserter({
		source : this._mapper.target,
		el     : el
	});
};

JW.extend(JW.UI.Component.ObservableArray, JW.Class, {
	/*
	Fields
	JW.UI.Component parent;
	JW.ObservableArray.Mapper<JW.UI.Component, JW.UI.Component> _mapper;
	JW.UI.Inserter _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		this._mapper.destroy();
		this._super();
	}
});
