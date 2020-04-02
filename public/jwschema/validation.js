/*
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

JW.Schema.Validation = JW.Class.extend({
	data    : null,     // [required] *
	full    : false,    // [required] Boolean
	
	items   : null,     // [readonly] Array of JW.Schema.Validation.Item
	errors  : null,     // [readonly] Array of JW.Schema.Error
	store   : null,     // [readonly] Array of JW.Schema.Validation.StoreItem
	
	init: function(data, full)
	{
		this.data   = data;
		this.full   = full;
		
		this.items  = [];
		this.errors = [];
		this.store  = [];
	},
	
	addError: function(msg)
	{
		var error = this.items.top().addMessage(msg);
		if (JW.isSet(error))
			this.errors.push(error);
		
		return this.isStopped();
	},
	
	isValid: function()
	{
		return this.errors.length == 0;
	},
	
	isStopped: function()
	{
		return !this.full && !this.isValid();
	},
	
	getCurrentData: function()
	{
		return this.items.top().data;
	},
	
	push: function(data, key)
	{
		//if (key)
		//    console.log("Push: ", key);
		
		var path = this.items.length ? this.items.top().path : [];
		path = JW.isSet(key) ? path.concat(key) : path.concat();
		
		var item = new JW.Schema.Validation.Item(data, key, path);
		this.items.push(item);
	},
	
	pop: function()
	{
		//if (this.items.top().key)
		//    console.log("Pop : ", this.items.top().key);
		
		this.items.pop();
	},
	
	saveErrors: function()
	{
		var storeItem = new JW.Schema.Validation.StoreItem(this.errors.length);
		if (this.items.length)
		{
			storeItem.topError = this.items.top().error;
			this.items.top().error = null;
		}
		
		this.store.push(storeItem);
	},
	
	resetErrors: function()
	{
		var storeItem = this.store.pop();
		if (this.items.length)
			this.items.top().error = storeItem.error;
		
		return this.errors.splice(storeItem.errorIndex, this.errors.length - storeItem.errorIndex);
	},
	
	toString: function()
	{
		if (this.isValid())
			return "Data is valid";
		
		var buf = [];
		if (this.full)
			buf.push("Data is invalid. Full errors list:");
		else
			buf.push("Data is invalid. First error:");
		
		for (var i = 0; i < this.errors.length; ++i)
			buf.push(this.errors[i].toString());
		
		return buf.join("\n");
	}
});
