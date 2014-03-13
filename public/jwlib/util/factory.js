/*
	jWidget Lib source file.
	
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

JW.makeFactory = function(cls, idField) {
	idField = idField || "id";
	
	JW.apply(cls, {
		items: {},
		
		registerItem: function(item) {
			cls.items[item[idField]] = item;
		},
		
		getItem: function(value) {
			return (value instanceof cls) ? value : cls.items[value];
		},
		
		getId: function(value) {
			return (value instanceof cls) ? value[idField] : value;
		}
	});
	
	return cls;
};
