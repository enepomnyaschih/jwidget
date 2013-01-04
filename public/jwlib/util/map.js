/*
	JW arbitrary mapping.
	
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

JW.Map = JW.Class.extend({
	_gc: 0,
	
	set: function(key, value)
	{
		this._items = this._items || [];
		var item = JW.searchBy(this._items, "key", key);
		if (item)
			item.value = value;
		else
			this._items.push({ key: key, value: value });
	},
	
	get: function(key)
	{
		if (!this._items)
			return undefined;
		
		var item = JW.searchBy(this._items, "key", key);
		return item ? item.value : undefined;
	},
	
	del: function(key)
	{
		if (!this._items)
			return undefined;
		
		var index = JW.findBy(this._items, "key", key);
		if (undefined === index)
			return undefined;
		
		var value = this._items[index].value;
		this._items[index] = {};
		
		if (this._items.length < (2 * ++this._gc))
		{
			this._gc = 0;
			this._items = JW.filter(this._items, this._filterFn);
		}
		
		return value;
	},
	
	_filterFn: function(item)
	{
		return item.key !== undefined;
	}
});
