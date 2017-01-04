/*
	JW Schema validation data collector.
	
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
