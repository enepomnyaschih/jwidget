/*
	JW Schema validation engine.
	
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

JW.Schema = function() {
	JW.Schema._super.call(this);
	this.providers = {};
	this.classes = {};
	this._registerDefaultProviders();
	this._registerDefaultClasses();
};

JW.extend(JW.Schema, JW.Class, {
	/*
	Map<Class<JW.Schema.Class>> providers;
	Map classes;
	*/
	
	registerProvider: function(provider, type) {
		this.providers[type] = provider;
	},
	
	registerClass: function(cls, type) {
		if (this.classes.hasOwnProperty(type)) {
			throw new Error("Can't register JW.Schema class '" + type + "'. Class is already registered.");
		}
		this.classes[type] = cls;
	},
	
	overrideClass: function(cls, type) {
		if (!this.classes.hasOwnProperty(type)) {
			throw new Error("Can't override JW.Schema class '" + type + "'. Class is not registered.");
		}
		this.classes[type] = cls;
	},
	
	unregisterClass: function(type) {
		if (!this.classes.hasOwnProperty(type)) {
			throw new Error("Can't unregister JW.Schema class '" + type + "'. Class is not registered.");
		}
		delete this.classes[type];
	},
	
	updateClass: function(updates, type) {
		var cls = this.compileClass(this.classes[type]);
		this.classes[type] = cls;
		cls._update(updates, this);
	},
	
	compileClass: function(source) {
		if (source instanceof JW.Schema.Class) {
			return source;
		}
		if (source) {
			var type = typeof source;
			if (type === "object") {
				if (typeof source.provider === "string") {
					return this._createClassByJson(source);
				}
			} else if (type === "string") {
				var cls = this.classes[source];
				if (!cls) {
					return this._createClassByString(source);
				}
				if (!(cls instanceof JW.Schema.Class)) {
					cls = this.compileClass(cls);
					this.classes[source] = cls;
				}
				return cls;
			}
		}
		var message = "Can't compile JW.Schema class: ";
		console && console.warn && console.warn(message, source);
		throw new Error(message + source);
	},
	
	parse: function(source) {
		var deprecates = source.deprecates || [];
		for (var i = 0; i < deprecates.length; ++i) {
			this.unregisterClass(deprecates[i]);
		}
		for (var type in (source.overrides || {})) {
			this.overrideClass(source.overrides[type], type);
		}
		for (var type in (source.classes || {})) {
			this.registerClass(source.classes[type], type);
		}
		for (var type in (source.updates || {})) {
			this.updateClass(source.updates[type], type);
		}
	},
	
	validate: function(data, type, full) {
		if (typeof type === "boolean") {
			full = type;
			type = null;
		}
		var cls = this.compileClass(type || "Schema");
		var validation = new JW.Schema.Validation(this, cls, data, full);
		cls._validate(data, validation);
		return validation;
	},
	
	_validate: function(type, data, validation, key) {
		return this.compileClass(type)._validate(data, validation, key);
	},
	
	_registerDefaultProviders: function() {
		// Simple types
		this.registerProvider(JW.Schema.Class.Value, "Value");
		this.registerProvider(JW.Schema.Class.String, "String");
		this.registerProvider(JW.Schema.Class.Number, "Number");
		
		// Complex types
		this.registerProvider(JW.Schema.Class.Array, "Array");
		this.registerProvider(JW.Schema.Class.Dictionary, "Dictionary");
		this.registerProvider(JW.Schema.Class.Enum, "Enum");
		this.registerProvider(JW.Schema.Class.FixedArray, "FixedArray");
		this.registerProvider(JW.Schema.Class.Object, "Object");
		this.registerProvider(JW.Schema.Class.TypedObject, "TypedObject");
		
		// Logical types
		this.registerProvider(JW.Schema.Class.And, "And");
		this.registerProvider(JW.Schema.Class.Or, "Or");
	},
	
	_registerDefaultClasses: function() {
		this.registerClass(new JW.Schema.Class(), "Any");
		
		// Existance types
		this.registerClass(new JW.Schema.Class.Defined(), "Defined");
		this.registerClass(new JW.Schema.Class.Undefined(), "Undefined");
		this.registerClass(new JW.Schema.Class.Set(), "Set");
		this.registerClass(new JW.Schema.Class.Unset(), "Unset");
		this.registerClass(new JW.Schema.Class.Null(), "Null");
		
		// Simple types
		this.registerClass(new JW.Schema.Class.Simple(), "Simple");
		this.registerClass(new JW.Schema.Class.Boolean(), "Boolean");
		this.registerClass(new JW.Schema.Class.String(), "String");
		this.registerClass(new JW.Schema.Class.Number(), "Number");
		
		// Complex types
		this.registerClass(new JW.Schema.Class.Object(), "Object");
		this.registerClass(new JW.Schema.Class.Array(), "Array");
		this.registerClass(new JW.Schema.Class.Dictionary(), "Dictionary");
		
		// Numeric types
		this.registerClass(new JW.Schema.Class.Number.Int(), "Int");
		this.registerClass(new JW.Schema.Class.Number.Unsigned(), "Unsigned");
		this.registerClass(new JW.Schema.Class.Number.UnsignedInt(), "UnsignedInt");
		this.registerClass(new JW.Schema.Class.Number.Positive(), "Positive");
		this.registerClass(new JW.Schema.Class.Number.PositiveInt(), "PositiveInt");
		this.registerClass(new JW.Schema.Class.Number.Part(), "Part");
		this.registerClass(new JW.Schema.Class.Number.Percent(), "Percent");
	},
	
	_createClassByString: function(str) {
		var tokens = JW.Array.map(str.split(","), JW.String.trim);
		if (!this.classes[tokens[0]]) {
			throw new Error("Can't create JW.Schema class by string. Class '" + tokens[0] + "' is not registered.");
		}
		var config = {wrap: tokens[0]};
		for (var i = 1; i < tokens.length; ++i) {
			config[tokens[i]] = true;
		}
		return new JW.Schema.Class.Wrapper(config);
	},
	
	_createClassByJson: function(json) {
		var provider = this.providers[json.provider];
		if (!provider) {
			throw new Error("Can't create JW.Schema class by JSON. Provider '" + json.provider + "' is not registered.");
		}
		return new provider(json);
	}
});

JW.Schema.pathToString = function(path) {
	if (path.length === 0) {
		return "(root)";
	}
	var buf = [];
	for (var i = 0, l = path.length; i < l; ++i) {
		if (typeof path[i] === "number") {
			buf.push("[", path[i], "]");
		} else {
			buf.push(i ? "." : "", path[i]);
		}
	}
	return buf.join("");
};
