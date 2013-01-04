/*
	JW observer pattern implementation tests.
	
	Copyright (C) 2011 Egor Nepomnyaschih
	
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

JW.ns("JW.Tests.Core");

JW.Tests.Core.ObservableTestCase = JW.Unit.TestCase.extend({
	setupAll: function()
	{
		var testCase = this;
		
		this.Observer = JW.Class.extend({
			name        : null, // [property] String
			dispatcher  : null, // [readonly] JW.Observable
			
			init: function(name, dispatcher)
			{
				this._super();
				
				this.name = name;
				this.dispatcher = dispatcher;
				
				this.dispatcher.bind('eventa', this.onEventA, this);
				this.dispatcher.bind('eventb', this.onEventB, this);
			},
			
			destroy: function()
			{
				this.dispatcher.purge(this);
			},
			
			onEventA: function(event, data)
			{
				testCase.output(this.name + " is handling event A from " + event.target.name + " with data " + data);
			},
			
			onEventB: function(event, data)
			{
				testCase.output(this.name + " is handling event B from " + event.target.name + " with data " + data);
			}
		});
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
		
		var dispatcher = new JW.Observable();
		dispatcher.name = 'myDispatcher';
		
		var observer1 = new (this.Observer)("observer1", dispatcher);
		var observer2 = new (this.Observer)("observer2", dispatcher);
		
		dispatcher.trigger("eventa", 10);   // handled by 1 and 2
		dispatcher.trigger("eventb", 20);   // handled by 1 and 2
		
		dispatcher.unbind("eventb");
		
		dispatcher.trigger("eventa", 30);   // handled by 1 and 2
		dispatcher.trigger("eventb", 40);
		
		observer1.destroy();
		
		dispatcher.trigger("eventa", 50);   // handled by 2
		dispatcher.trigger("eventb", 60);
		
		dispatcher.purgeAll();
		
		dispatcher.trigger("eventa", 70);
		dispatcher.trigger("eventa", 80);
		
		dispatcher.destroy();
		observer2.destroy();
	},
	
	testRelay: function()
	{
		this.addExpectedOutput(
			"observer3 is handling event A from myRelayer with data 15"
		);
		
		var dispatcher = new JW.Observable();
		dispatcher.name = 'myDispatcher';
		
		var relayer = new JW.Observable();
		relayer.name = "myRelayer";
		relayer.relay(dispatcher, "eventa");
		
		var observer3 = new (this.Observer)("observer3", relayer);
		
		dispatcher.trigger("eventa", 15);   // handled by 3
		dispatcher.trigger("eventb", 25);
		
		dispatcher.destroy();
		relayer.destroy();
		observer3.destroy();
	},
	
	testUnbindByHandler: function()
	{
		var dispatcher = new JW.Observable();
		dispatcher.name = 'myDispatcher';
		
		var observer1 = new (this.Observer)("observer1", dispatcher);
		var observer2 = new (this.Observer)("observer2", dispatcher);
		
		/*
			Note: specified handler method is the same function for both
			observers, because it belongs to prototype. That's why both
			observers will be unbound. Output will be empty.
		*/
		dispatcher.unbind("eventa", observer1.onEventA);
		dispatcher.trigger("eventa", 4);
	},
	
	testUnbindByScope: function()
	{
		this.addExpectedOutput(
			"observer2 is handling event A from myDispatcher with data 4"
		);
		
		var dispatcher = new JW.Observable();
		dispatcher.name = 'myDispatcher';
		
		var observer1 = new (this.Observer)("observer1", dispatcher);
		var observer2 = new (this.Observer)("observer2", dispatcher);
		
		dispatcher.unbind("eventa", observer1.onEventA, observer1);
		dispatcher.trigger("eventa", 4);
	},
	
	testDisposable: function()
	{
		function onMyEvent()
		{
			this.output("Handle!");
		}
		
		var dispatcher = new JW.Observable();
		dispatcher.bind("myevent", onMyEvent, this, true);
		
		this.setExpectedOutput("Handle!");
		dispatcher.trigger("myevent");
		dispatcher.trigger("myevent");
	},
	
	testFlagEvents: function()
	{
		function onMyEvent(event, arg)
		{
			this.output("Handle: " + arg);
		}
		
		var dispatcher = new JW.Observable();
		dispatcher.resetFlagEvents("myevent");
		
		dispatcher.bind("myevent", JW.Function.withArgs(onMyEvent, "\0", "a"), this, true);
		dispatcher.bind("myevent", JW.Function.withArgs(onMyEvent, "\0", "b"), this);
		
		this.setExpectedOutput(
			"Handle: a",
			"Handle: b"
		);
		dispatcher.trigger("myevent");
		
		this.setExpectedOutput(
			"Handle: c"
		);
		dispatcher.bind("myevent", JW.Function.withArgs(onMyEvent, "\0", "c"), this, true);
		
		this.setExpectedOutput(
			"Handle: d"
		);
		dispatcher.bind("myevent", JW.Function.withArgs(onMyEvent, "\0", "d"), this);
		
		this.setExpectedOutput(
			"Handle: b",
			"Handle: d"
		);
		dispatcher.trigger("myevent");
		
		dispatcher.resetFlagEvents("myevent");
		dispatcher.bind("myevent", JW.Function.withArgs(onMyEvent, "\0", "a"), this, true);
		
		this.setExpectedOutput(
			"Handle: b",
			"Handle: d",
			"Handle: a"
		);
		dispatcher.trigger("myevent");
	},
	
	testSignature2: function()
	{
		function onEventA()
		{
			this.output("Handle A");
		}
		
		function onEventB()
		{
			this.output("Handle B");
		}
		
		var dispatcher = new JW.Observable();
		dispatcher.bind(
			{
				type        : "eventa",
				handler     : onEventA,
				scope       : this,
				disposable  : true
			},
			{
				type        : "eventb",
				handler     : onEventB,
				scope       : this
			}
		);
		
		this.setExpectedOutput(
			"Handle A",
			"Handle B",
			"Handle B"
		);
		dispatcher.trigger("eventa");
		dispatcher.trigger("eventb");
		dispatcher.trigger("eventb");
		
		dispatcher.unbind(
			{
				type        : "eventa",
				handler     : onEventA,
				scope       : this
			},
			{
				type        : "eventb",
				handler     : onEventB,
				scope       : this
			}
		);
		dispatcher.trigger("eventa");
		dispatcher.trigger("eventb");
	},
	
	testSignature3: function()
	{
		function onEventA()
		{
			this.output("Handle A");
		}
		
		function onEventB()
		{
			this.output("Handle B");
		}
		
		var dispatcher = new JW.Observable();
		dispatcher.bind([
			{
				type        : "eventa",
				handler     : onEventA,
				scope       : this,
				disposable  : true
			},
			{
				type        : "eventb",
				handler     : onEventB,
				scope       : this
			}
		]);
		
		this.setExpectedOutput(
			"Handle A",
			"Handle B",
			"Handle B"
		);
		dispatcher.trigger("eventa");
		dispatcher.trigger("eventb");
		dispatcher.trigger("eventb");
		
		dispatcher.unbind([
			{
				type        : "eventa",
				handler     : onEventA,
				scope       : this
			},
			{
				type        : "eventb",
				handler     : onEventB,
				scope       : this
			}
		]);
		dispatcher.trigger("eventa");
		dispatcher.trigger("eventb");
	},
	
	testSignature4: function()
	{
		function onEventA()
		{
			this.output("Handle A");
		}
		
		function onEventB()
		{
			this.output("Handle B");
		}
		
		var dispatcher = new JW.Observable();
		dispatcher.bind({
			"eventa"    : onEventA,
			"eventb"    : {
				handler     : onEventB,
				disposable  : false
			},
			scope       : this,
			disposable  : true
		});
		
		this.setExpectedOutput(
			"Handle A",
			"Handle B",
			"Handle B"
		);
		dispatcher.trigger("eventa");
		dispatcher.trigger("eventb");
		dispatcher.trigger("eventb");
		
		dispatcher.unbind({
			"eventa"    : onEventA,
			"eventb"    : {
				handler     : onEventB
			},
			scope       : this
		});
		dispatcher.trigger("eventa");
		dispatcher.trigger("eventb");
	},
	
	testRecursive: function()
	{
		var dispatcher1 = new JW.Observable();
		var dispatcher2 = new JW.Observable();
		
		dispatcher1.bind("a", function() {
			this.output("a11");
			dispatcher2.trigger("a");
		}, this);
		
		dispatcher1.bind("a", function() {
			this.output("a12");
		}, this);
		
		dispatcher2.bind("a", function() {
			this.output("a2");
		}, this);
		
		this.setExpectedOutput(
			"a11",
			"a2",
			"a12"
		);
		
		dispatcher1.trigger("a");
	}
});
