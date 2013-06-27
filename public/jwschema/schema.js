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

JW.Schema = function(source) {
	JW.Schema._super.call(this, source);
	this.providers = {};
	this.classes = {};
	this._registerDefaultProviders();
	this._registerDefaultClasses();
	if (source) {
		this.parse(source);
	}
};

JW.extend(JW.Schema, JW.Class, {
	/*
	Map<Class<JW.Schema.Class>> providers;
	Map<JW.Schema.Class> classes;
	*/
	
	parse: function(source) {
		for (var type in source.classes) {
			this._parseClass(source.classes[type], type);
		}
	},
	
	parseClass: function(cls, type) {
		this._parseClass(cls, type);
	},
	
	getProvider: function(type) {
		return this.providers[type];
	},
	
	getClass: function(type) {
		return (typeof type === "string") ? this.classes[type] : type;
	},
	
	registerProvider: function(provider) {
		this.providers[provider.prototype.type] = provider;
	},
	
	registerClass: function(cls) {
		cls.schema = this;
		if (cls.type) {
			this.classes[cls.type] = cls;
		}
		cls.onRegister(this);
	},
	
	unregisterClass: function(type) {
		var cls = this.getClass(type);
		if (!cls) {
			return;
		}
		cls.schema = null;
		delete this.classes[type];
	},
	
	validate: function(type, data, full) {
		var cls = this.getClass(type);
		if (!cls) {
			throw new Error("Validation class '" + type + "' is not registered");
		}
		return cls.validate(data, full);
	},
	
	_validate: function(type, data, validation, key) {
		var cls = this.getClass(type);
		if (!cls) {
			throw new Error("Validation class '" + type + "' is not registered");
		}
		return cls._validate(data, validation, key);
	},
	
	_runValidate: function(type, validation) {
		return this.getClass(type)._runValidate(validation);
	},
	
	_registerDefaultProviders: function() {
		this.registerProvider(JW.Schema.Class);
		
		// Simple types
		this.registerProvider(JW.Schema.Class.Value);
		this.registerProvider(JW.Schema.Class.String);
		this.registerProvider(JW.Schema.Class.Number);
		
		// Complex types
		this.registerProvider(JW.Schema.Class.Array);
		this.registerProvider(JW.Schema.Class.Dictionary);
		this.registerProvider(JW.Schema.Class.Enum);
		this.registerProvider(JW.Schema.Class.FixedArray);
		this.registerProvider(JW.Schema.Class.Object);
		this.registerProvider(JW.Schema.Class.TypedObject);
		
		// Logical types
		this.registerProvider(JW.Schema.Class.And);
		this.registerProvider(JW.Schema.Class.Or);
	},
	
	_registerDefaultClasses: function() {
		this.registerClass(new JW.Schema.Class());
		
		// Existance types
		this.registerClass(new JW.Schema.Class.Defined());
		this.registerClass(new JW.Schema.Class.Undefined());
		this.registerClass(new JW.Schema.Class.Set());
		this.registerClass(new JW.Schema.Class.Unset());
		this.registerClass(new JW.Schema.Class.Null());
		
		// Simple types
		this.registerClass(new JW.Schema.Class.Simple());
		this.registerClass(new JW.Schema.Class.Boolean());
		this.registerClass(new JW.Schema.Class.String());
		this.registerClass(new JW.Schema.Class.Number());
		
		// Complex types
		this.registerClass(new JW.Schema.Class.Object());
		this.registerClass(new JW.Schema.Class.Array());
		this.registerClass(new JW.Schema.Class.Dictionary());
		
		// Numeric types
		this.registerClass(new JW.Schema.Class.Number.Int());
		this.registerClass(new JW.Schema.Class.Number.Unsigned());
		this.registerClass(new JW.Schema.Class.Number.UnsignedInt());
		this.registerClass(new JW.Schema.Class.Number.Positive());
		this.registerClass(new JW.Schema.Class.Number.PositiveInt());
		this.registerClass(new JW.Schema.Class.Number.Part());
		this.registerClass(new JW.Schema.Class.Number.Percent());
	},
	
	_parseClass: function(data, type) {
		return (typeof data === "string") ? this._parseClassString(data, type) : this._parseClassObject(data, type);
	},
	
	_parseClassString: function(data, type) {
		var tokens = JW.Array.map(data.split(","), JW.String.trim);
		if (tokens.length == 1) {
			return tokens[0];
		}
		var config = {
			wrap: tokens[0]
		};
		for (var i = 1; i < tokens.length; ++i) {
			config[tokens[i]] = true;
		}
		var cls = new JW.Schema.Class.Wrapper(config);
		cls.type = type;
		this.registerClass(cls);
		return cls;
	},
	
	_parseClassObject: function(data, type) {
		var provider = this.getProvider(data.provider);
		var config = JW.apply({}, data);
		delete config.provider;
		
		var cls = new provider(config);
		cls.type = type;
		this.registerClass(cls);
		return cls;
	}
});
