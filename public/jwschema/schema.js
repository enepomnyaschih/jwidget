﻿/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

JW.Schema = JW.Class.extend({
	providers   : null,     // [readonly] Map from type to JW.Schema.Class subclass
	classes     : null,     // [readonly] Map from type to JW.Schema.Class
	
	init: function(source)
	{
		this._registerDefaultProviders();
		this._registerDefaultClasses();
		
		if (source)
			this.parse(source);
	},
	
	parse: function(source)
	{
		for (var type in source.classes)
			this._parseClass(source.classes[type], type);
	},
	
	getProvider: function(type)
	{
		return this.providers[type];
	},
	
	getClass: function(type)
	{
		return (typeof type === "string") ? this.classes[type] : type;
	},
	
	registerProvider: function(provider)
	{
		this.providers[provider.prototype.type] = provider;
	},
	
	registerClass: function(cls)
	{
		cls.schema = this;
		if (cls.type)
			this.classes[cls.type] = cls;
		cls.onRegister(this);
	},
	
	unregisterClass: function(type)
	{
		var cls = this.getClass(type);
		if (!cls)
			return;
		
		delete cls.schema;
		delete this.classes[type];
	},
	
	validate: function(type, data, full)
	{
		return this.getClass(type).validate(data, full);
	},
	
	_validate: function(type, data, validation, key)
	{
		return this.getClass(type)._validate(data, validation, key);
	},
	
	_runValidate: function(type, validation)
	{
		return this.getClass(type)._runValidate(validation);
	},
	
	_registerDefaultProviders: function()
	{
		this.providers = {};
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
	
	_registerDefaultClasses: function()
	{
		this.classes = {};
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
	
	_parseClass: function(data, type)
	{
		return (typeof data === "string") ? this._parseClassString(data, type) : this._parseClassObject(data, type);
	},
	
	_parseClassString: function(data, type)
	{
		var tokens = data.split(",").map($.trim, $);
		if (tokens.length == 1)
			return tokens[0];
		
		var config = {
			wrap: tokens[0]
		};
		
		for (var i = 1; i < tokens.length; ++i)
			config[tokens[i]] = true;
		
		var cls = new JW.Schema.Class.Wrapper(config);
		cls.type = type;
		this.registerClass(cls);
		return cls;
	},
	
	_parseClassObject: function(data, type)
	{
		var provider = this.getProvider(data.provider);
		var config = JW.apply({}, data);
		delete config.provider;
		
		var cls = new provider(config);
		cls.type = type;
		this.registerClass(cls);
		return cls;
	}
});
