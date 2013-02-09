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

JW.Alg = {
	_createBy: function(algorithm) {
		return function(target, field, value) {
			return algorithm(target, function(item) {
				return JW.get(item, field) === value;
			});
		};
	},
	
	_createByField: function(algorithm) {
		return function(target, field) {
			return algorithm(target, function(item) {
				return JW.get(item, field);
			});
		};
	},
	
	_createByMethod: function(algorithm) {
		return function(target, method, args) {
			args = args || []; // IE fix
			return algorithm(target, function(item) {
				return item[method].apply(item, args);
			});
		};
	},
	
	_every: function(target, callback, scope) {
		return target.every(callback, scope);
	},
	
	_createEmpty: function(target) {
		return target.createEmpty();
	},
	
	_pushItem: function(target, item, key) {
		return target.pushItem(item, key);
	}
};
