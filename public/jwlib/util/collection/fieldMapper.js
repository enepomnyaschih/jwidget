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

JW.Collection.FieldMapper = function(config) {
	this.source = null;
	this.field = null;
	
	JW.Collection.FieldMapper.superclass.call(this, config);
	
	this.mapper = new JW.Collection.Mapper({
		source      : this.source,
		target      : this.target,
		createItem  : this._createItem,
		destroyItem : this._destroyItem,
		scope       : this
	});
	
	this.target = this.mapper.target;
};

JW.extend(JW.Collection.FieldMapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Config, {
	/*
	Required
	JW.Collection<S> source;
	String field;
	
	Optional
	JW.Collection<T> target;
	
	Fields
	JW.Collection.Mapper<S, T> mapper;
	*/
	
	_createItem: function(data) {
		return JW.get(data, this.field);
	},
	
	_destroyItem: function() {}
});
