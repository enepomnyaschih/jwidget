/*
	JW simple collection methods.
	
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

JW.Alg.createSimpleFunctions = function(every) {
	var namespace = {};
	
	namespace.everyBy = JW.Alg._createBy(every);
	namespace.everyByMethod = JW.Alg._createByMethod(every);
	
	namespace.each = function(target, callback, scope) {
		every(target, function() {
			callback.apply(this, arguments);
		}, scope);
		return target;
	};
	
	namespace.forEach = namespace.each; // alias
	namespace.eachByMethod = JW.Alg._createByMethod(namespace.each);
	namespace.forEachByMethod = namespace.eachByMethod; // alias
	
	namespace.some = function(target, callback, scope) {
		return !every(target, function() {
			return callback.apply(this, arguments) === false;
		}, scope);
	};
	
	namespace.someBy = JW.Alg._createBy(namespace.some);
	namespace.someByMethod = JW.Alg._createByMethod(namespace.some);
	
	namespace.find = function(target, callback, scope) {
		var result;
		every(target, function(item, key) {
			if (callback.apply(this, arguments) !== false) {
				result = key;
				return false;
			}
		}, scope);
		return result;
	};
	
	namespace.findBy = JW.Alg._createBy(namespace.find);
	namespace.findByMethod = JW.Alg._createByMethod(namespace.find);
	
	namespace.search = function(target, callback, scope) {
		var result;
		every(target, function(item) {
			if (callback.apply(this, arguments) !== false) {
				result = item;
				return false;
			}
		}, scope);
		return result;
	};
	
	namespace.searchBy = JW.Alg._createBy(namespace.search);
	namespace.searchByMethod = JW.Alg._createByMethod(namespace.search);
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		every(target, function(item) {
			if (item === undefined) {
				return;
			}
			var key = callback.apply(this, arguments);
			if (JW.isSet(key)) {
				result[key] = item;
			}
		}, scope);
		return result;
	};
	
	namespace.indexBy = JW.Alg._createByField(namespace.index);
	namespace.indexByMethod = JW.Alg._createByMethod(namespace.index);
	
	namespace.getKeysArray = function(target) {
		var result = [];
		every(target, function(item, key) {
			result.push(key);
		});
		return result;
	};
	
	namespace.getValuesArray = function(target) {
		var result = [];
		every(target, function(item) {
			result.push(item);
		});
		return result;
	};
	
	namespace.getSize = function(target) {
		var result = 0;
		every(target, function() {
			++result;
		});
		return result;
	};
	
	namespace.getLength = namespace.getSize; // alias
	
	namespace.isEmpty = function(target) {
		return every(target, function() { return false; });
	};
	
	return namespace;
};

JW.Alg.SimpleObjectFunctions = JW.Alg.createSimpleFunctions(JW.Alg._every);

JW.Alg.SimpleMethods = {
	everyBy         : function(field, value)    { return JW.Alg.SimpleObjectFunctions.everyBy        (this, field, value);    },
	everyByMethod   : function(method, args)    { return JW.Alg.SimpleObjectFunctions.everyByMethod  (this, method, args);    },
	each            : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.each           (this, callback, scope); },
	eachByMethod    : function(method, args)    { return JW.Alg.SimpleObjectFunctions.eachByMethod   (this, method, args);    },
	forEach         : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.forEach        (this, callback, scope); },
	forEachByMethod : function(method, args)    { return JW.Alg.SimpleObjectFunctions.forEachByMethod(this, method, args);    },
	some            : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.some           (this, callback, scope); },
	someBy          : function(field, value)    { return JW.Alg.SimpleObjectFunctions.someBy         (this, field, value);    },
	someByMethod    : function(method, args)    { return JW.Alg.SimpleObjectFunctions.someByMethod   (this, method, args);    },
	find            : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.find           (this, callback, scope); },
	findBy          : function(field, value)    { return JW.Alg.SimpleObjectFunctions.findBy         (this, field, value);    },
	findByMethod    : function(method, args)    { return JW.Alg.SimpleObjectFunctions.findByMethod   (this, method, args);    },
	search          : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.search         (this, callback, scope); },
	searchBy        : function(field, value)    { return JW.Alg.SimpleObjectFunctions.searchBy       (this, field, value);    },
	searchByMethod  : function(method, args)    { return JW.Alg.SimpleObjectFunctions.searchByMethod (this, method, args);    },
	index           : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.index          (this, callback, scope); },
	indexBy         : function(field)           { return JW.Alg.SimpleObjectFunctions.indexBy        (this, field);           },
	indexByMethod   : function(method, args)    { return JW.Alg.SimpleObjectFunctions.indexByMethod  (this, method, args);    },
	getKeysArray    : function()                { return JW.Alg.SimpleObjectFunctions.getKeysArray   (this);                  },
	getValuesArray  : function()                { return JW.Alg.SimpleObjectFunctions.getValuesArray (this);                  },
	getSize         : function()                { return JW.Alg.SimpleObjectFunctions.getSize        (this);                  },
	getLength       : function()                { return JW.Alg.SimpleObjectFunctions.getLength      (this);                  },
	isEmpty         : function()                { return JW.Alg.SimpleObjectFunctions.isEmpty        (this);                  }
};
