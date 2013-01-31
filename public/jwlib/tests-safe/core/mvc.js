/*
	JW MVC utility methods tests.
	
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

JW.Tests.Core.MvcTestCase = function(config) {
	JW.Tests.Core.MvcTestCase._super.call(this, config);
	this.Model = null;
	this.model = null;
};

JW.extend(JW.Tests.Core.MvcTestCase, JW.Unit.TestCase, {
	setupAll: function()
	{
		var EventParams = function(sender, value) {
			EventParams._super.call(this, sender);
			this.value = value;
		};
		JW.extend(EventParams, JW.EventParams, {
			/*
			Model sender;
			String value;
			*/
		});
		var Model = function() {
			Model._super.call(this);
			this.aValue = "aa";
			this.bValue = "bb";
			this.changeEvent = new JW.Event();
		};
		JW.extend(Model, JW.Class, {
			/*
			Fields
			String aValue;
			String bValue;
			JW.Event<EventParams> changeEvent;
			*/
			
			destroy: function() {
				this.changeEvent.destroy();
				this._super();
			},
			
			getAValue: function() {
				return this.aValue.toUpperCase();
			},
			
			setAValue: function(value) {
				value = value.toUpperCase();
				this.aValue = value;
				this.changeEvent.trigger(new EventParams(this, value));
			}
		});
		this.Model = Model;
	},
	
	setup: function()
	{
		this.model = new this.Model();
	},
	
	teardown: function()
	{
		this.model.destroy();
		this.model = null;
	},
	
	testGetField: function()
	{
		this.assertStrictEqual(null, JW.getField(this.model));
		this.assertStrictEqual("AA", JW.getField(this.model,  "aValue"));
		this.assertStrictEqual("aa", JW.getField(this.model, "-aValue"));
		this.assertStrictEqual("bb", JW.getField(this.model,  "bValue"));
		this.assertStrictEqual("bb", JW.getField(this.model, "-bValue"));
	},
	
	testSetField: function()
	{
		var attachment = this.model.changeEvent.bind(function(params) {
			this.output("Success!");
			this.assertStrictEqual("LALA", params.value);
		}, this);
		
		this.assertStrictEqual(this.model, JW.setField(this.model));
		
		// Test that if value isn't changed, nothing happens
		this.assertStrictEqual(this.model, JW.setField(this.model, "aValue", "AA"));
		this.assertStrictEqual("aa", this.model.aValue);
		
		this.setExpectedOutput("Success!");
		this.assertStrictEqual(this.model, JW.setField(this.model, "aValue", "lala"));
		this.assertStrictEqual("LALA", this.model.aValue);
		this.setExpectedOutput();
		
		this.assertStrictEqual(this.model, JW.setField(this.model, "-aValue", "lalala"));
		this.assertStrictEqual("lalala", this.model.aValue);
		
		this.assertStrictEqual(this.model, JW.setField(this.model, "bValue", "gaga"));
		this.assertStrictEqual("gaga", this.model.bValue);
		
		this.assertStrictEqual(this.model, JW.setField(this.model, "-bValue", "gagaga"));
		this.assertStrictEqual("gagaga", this.model.bValue);
		
		attachment.destroy();
	}
});
