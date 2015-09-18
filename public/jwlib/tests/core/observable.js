/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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

JW.Tests.Core.ObservableTestCase = function(config) {
	JW.Tests.Core.ObservableTestCase._super.call(this, config);
	this.Observer = null;
};

JW.extend(JW.Tests.Core.ObservableTestCase, JW.Unit.TestCase, {
	setupAll: function()
	{
		var testCase = this;
		
		var Dispatcher = function(name) {
			Dispatcher._super.call(this);
			this.name = name;
			this.eventa = new JW.Event();
			this.eventb = new JW.Event();
		};
		
		JW.extend(Dispatcher, JW.Class, {
			/*
			Fields
			String name;
			JW.Event<EventParams> eventa;
			JW.Event<EventParams> eventb;
			*/
			
			destroyObject: function() {
				this.eventb.destroy();
				this.eventa.destroy();
				this._super();
			},
			
			triggera: function(data) {
				this.eventa.trigger(new EventParams(this, data));
			},
			
			triggerb: function(data) {
				this.eventb.trigger(new EventParams(this, data));
			}
		});
		
		this.Dispatcher = Dispatcher;
		
		var EventParams = function(sender, data) {
			EventParams._super.call(this, sender);
			this.data = data;
		};
		
		JW.extend(EventParams, JW.EventParams, {
			/*
			Fields
			Dispatcher sender;
			String data;
			*/
		});
		
		this.EventParams = EventParams;
		
		var Observer = function(name, dispatcher) {
			Observer._super.call(this);
			this.name = name;
			this.dispatcher = dispatcher;
			this.attachmenta = dispatcher.eventa.bind(this.onEventA, this);
			this.attachmentb = dispatcher.eventb.bind(this.onEventB, this);
		};
		
		JW.extend(Observer, JW.Class, {
			/*
			Fields
			String name;
			Dispatcher dispatcher;
			JW.EventAttachment<EventParams> attachmenta;
			JW.EventAttachment<EventParams> attachmentb;
			*/
			
			destroyObject: function() {
				this.attachmentb.destroy();
				this.attachmenta.destroy();
				this._super();
			},
			
			onEventA: function(params) {
				testCase.output(this.name + " is handling event A from " + params.sender.name + " with data " + params.data);
			},
			
			onEventB: function(params)
			{
				testCase.output(this.name + " is handling event B from " + params.sender.name + " with data " + params.data);
			}
		});
		
		this.Observer = Observer;
	},
	
	testTrigger: function()
	{
		this.addExpectedOutput(
			"observer1 is handling event A from myDispatcher with data 10",
			"observer2 is handling event A from myDispatcher with data 10",
			"observer1 is handling event B from myDispatcher with data 20",
			"observer2 is handling event B from myDispatcher with data 20",
			"observer1 is handling event A from myDispatcher with data 30",
			"observer2 is handling event A from myDispatcher with data 30",
			"observer2 is handling event A from myDispatcher with data 50"
		);
		
		var dispatcher = new this.Dispatcher('myDispatcher');
		
		var observer1 = new this.Observer("observer1", dispatcher);
		var observer2 = new this.Observer("observer2", dispatcher);
		
		dispatcher.triggera(10);   // handled by 1 and 2
		dispatcher.triggerb(20);   // handled by 1 and 2
		
		dispatcher.eventb.purge();
		
		dispatcher.triggera(30);   // handled by 1 and 2
		dispatcher.triggerb(40);
		
		observer1.destroy();
		
		dispatcher.triggera(50);   // handled by 2
		dispatcher.triggerb(60);
		
		dispatcher.eventa.purge();
		
		dispatcher.triggera(70);
		dispatcher.triggerb(80);
		
		observer2.destroy();
		dispatcher.destroy();
	},
	
	testRecursive: function()
	{
		var dispatcher1 = new this.Dispatcher();
		var dispatcher2 = new this.Dispatcher();
		
		dispatcher1.eventa.bind(function() {
			this.output("a11");
			dispatcher2.triggera(10);
		}, this);
		
		dispatcher1.eventa.bind(function() {
			this.output("a12");
		}, this);
		
		dispatcher2.eventa.bind(function() {
			this.output("a2");
		}, this);
		
		this.setExpectedOutput(
			"a11",
			"a2",
			"a12"
		);
		
		dispatcher1.triggera(10);
		
		dispatcher2.destroy();
		dispatcher1.destroy();
	}
});
