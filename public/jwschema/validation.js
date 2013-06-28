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

JW.Schema.Validation = function(data, full) {
	JW.Schema.Validation._super.call(this);
	this.data = data;
	this.full = full;
	this.items = [];
	this.errors = [];
	this.store = [];
};

JW.extend(JW.Schema.Validation, JW.Class, {
	/*
	Any data;
	Boolean full;
	Array<JW.Schema.Validation.Item> items;
	Array<JW.Schema.Error> errors;
	Array<JW.Schema.Validation.StoreItem> store;
	*/
	
	addError: function(msg) {
		var error = this._getCurrentItem().addMessage(msg);
		if (JW.isSet(error)) {
			this.errors.push(error);
		}
		return this.isStopped();
	},
	
	isValid: function() {
		return this.errors.length == 0;
	},
	
	isStopped: function() {
		return !this.full && !this.isValid();
	},
	
	getCurrentData: function() {
		return this._getCurrentItem().data;
	},
	
	push: function(data, key) {
		//if (key)
		//    console.log("Push: ", key);
		
		var path = this.items.length ? this._getCurrentItem().path : [];
		path = JW.isSet(key) ? path.concat(key) : path.concat();
		
		var item = new JW.Schema.Validation.Item(data, key, path);
		this.items.push(item);
	},
	
	pop: function() {
		//if (this._getCurrentItem().key)
		//    console.log("Pop : ", this._getCurrentItem().key);
		
		this.items.pop();
	},
	
	saveErrors: function() {
		var storeItem = new JW.Schema.Validation.StoreItem(this.errors.length);
		if (this.items.length) {
			storeItem.topError = this._getCurrentItem().error;
			this._getCurrentItem().error = null;
		}
		
		this.store.push(storeItem);
	},
	
	resetErrors: function() {
		var storeItem = this.store.pop();
		if (this.items.length)
			this._getCurrentItem().error = storeItem.error;
		
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
	},
	
	getStack: function() {
		return this.isValid() ? null : JW.Array.mapByMethod(this.errors, "toString");
	},
	
	getFirstError: function() {
		return this.errors[0];
	},
	
	_getCurrentItem: function() {
		return JW.Array.top(this.items);
	}
});
