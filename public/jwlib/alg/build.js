/*
	JW collection building methods.
	
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

JW.Alg.createBuildFunctions = function(every, createEmpty, pushItem) {
	var namespace = JW.Alg.createSimpleFunctions(every);
	
	namespace.merge = function(target, source) {
		every(source, function(item, key) {
			pushItem(target, item, key);
		});
		return target;
	};
	
	namespace.clone = function(target) {
		var result = createEmpty(target);
		return namespace.merge(result, target);
	};
	
	namespace.filter = function(target, callback, scope) {
		var result = createEmpty(target);
		every(target, function(item, key) {
			if (callback.apply(this, arguments) !== false) {
				pushItem(result, item, key);
			}
		}, scope);
		return result;
	};
	
	namespace.filterBy = JW.Alg._createBy(namespace.filter);
	namespace.filterByMethod = JW.Alg._createByMethod(namespace.filter);
	
	namespace.map = function(target, callback, scope) {
		var result = createEmpty(target);
		every(target, function(item, key) {
			pushItem(result, callback.apply(this, arguments), key);
		}, scope);
		return result;
	};
	
	namespace.mapBy = JW.Alg._createByField(namespace.map);
	namespace.mapByMethod = JW.Alg._createByMethod(namespace.map);
	
	namespace.mapFields = function(target) {
		var result = {};
		every(target, function(item) {
			for (var key in item) {
				result[key] = namespace.mapBy(target, key);
			}
			return false;
		});
		return result;
	};
	
	return namespace;
};

JW.Alg.BuildObjectFunctions = JW.Alg.createBuildFunctions(JW.Alg._every, JW.Alg._createEmpty, JW.Alg._pushItem);

JW.Alg.BuildMethods = JW.apply({}, JW.Alg.SimpleMethods, {
	merge          : function(source)          { return JW.Alg.BuildObjectFunctions.merge         (this, source);          },
	clone          : function()                { return JW.Alg.BuildObjectFunctions.clone         (this);                  },
	filter         : function(callback, scope) { return JW.Alg.BuildObjectFunctions.filter        (this, callback, scope); },
	filterBy       : function(field, value)    { return JW.Alg.BuildObjectFunctions.filterBy      (this, field, value);    },
	filterByMethod : function(method, args)    { return JW.Alg.BuildObjectFunctions.filterByMethod(this, method, args);    },
	map            : function(callback, scope) { return JW.Alg.BuildObjectFunctions.map           (this, callback, scope); },
	mapBy          : function(field)           { return JW.Alg.BuildObjectFunctions.mapBy         (this, field);           },
	mapByMethod    : function(method, args)    { return JW.Alg.BuildObjectFunctions.mapByMethod   (this, method, args);    },
	mapFields      : function()                { return JW.Alg.BuildObjectFunctions.mapFields     (this);                  }
});
