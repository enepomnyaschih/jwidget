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

JW.UI.Component.List = function(config) {
	JW.UI.Component.List._super.call(this);
	this.parent = config.parent;
	this.collection = config.collection;
	this.el = config.el;
	
	this._instanceMapper = new JW.Collection.InstanceMapper({
		source    : this.collection,
		provider  : JW.UI.Component.List.Item,
		dataField : "component",
		extraCfg  : {
			list : this
		}
	});
	
	this._fieldMapper = new JW.Collection.FieldMapper({
		source : this._instanceMapper.target,
		field  : "component"
	});
	
	this._inserter = new JW.UI.Inserter({
		source : this._fieldMapper.target,
		el     : this.el
	});
};

JW.extend(JW.UI.Component.List, JW.Class, {
	/*
	Required
	JW.UI.Component parent;
	JW.Collection<JW.UI.Component> collection;
	Element el;
	
	Fields
	JW.Collection.InstanceMapper<JW.UI.Component, JW.UI.Component.List.Item> _instanceMapper;
	JW.Collection.FieldMapper<JW.UI.Component.List.Item, JW.UI.Component> _fieldMapper;
	JW.UI.Inserter _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		this._fieldMapper.destroy();
		this._instanceMapper.destroy();
		this._super();
	}
});
