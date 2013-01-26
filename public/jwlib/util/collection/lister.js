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

JW.Collection.Lister = function(config) {
	JW.Collection.Lister._super.call(this);
	this.source = config.source;
	this.target = config.target;
	
	this._mapper = new JW.Collection.Mapper({
		source      : this.source,
		createItem  : this._createItem,
		destroyItem : this._destroyItem,
		scope       : this
	});
};

JW.extend(JW.Collection.Lister/*<T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.Collection<T> source;
	JW.Set<T> target;
	
	Fields
	JW.Collection.Mapper<T, T> _mapper;
	*/
	
	destroy: function() {
		this._mapper.destroy();
		this._super();
	},
	
	_createItem: function(item) {
		this.target.add(item);
		return item;
	},
	
	_destroyItem: function(item) {
		this.target.remove(item);
	}
});
