/*
	jWidget Lib source file.
	
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

JW.ObservableSet.InstanceMapper = function(config) {
	JW.ObservableSet.InstanceMapper._super.call(this);
	this.source = config.source;
	this.provider = config.provider;
	this.dataField = JW.def(config.dataField, "data");
	this.extraCfg = config.extraCfg;
	
	this.mapper = new JW.ObservableSet.Mapper({
		source      : this.source,
		target      : config.target,
		createItem  : this._createItem,
		destroyItem : this._destroyItem,
		scope       : this
	});
	
	this.target = this.mapper.target;
};

JW.extend(JW.ObservableSet.InstanceMapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.ObservableSet<S> source;
	Subclass<T> provider;
	
	Optional
	JW.ObservableSet<T> target;
	String dataField;
	Object extraCfg;
	
	Fields
	JW.ObservableSet.Mapper<S, T> mapper;
	*/
	
	_createItem: function(data) {
		var config = JW.Map.clone(this.extraCfg);
		config[this.dataField] = data;
		return new this.provider(config);
	},
	
	_destroyItem: function(item) {
		item.destroy();
	}
});
