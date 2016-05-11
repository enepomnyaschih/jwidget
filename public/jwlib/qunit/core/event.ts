/// <reference path="../tests.ref.ts" />

(function() {
	interface EventParams {
		sender: Dispatcher;
		data: string;
	}

	class Dispatcher extends JW.Class {
		eventa: JW.Event<any> = this.own(new JW.Event());
		eventb: JW.Event<any> = this.own(new JW.Event());

		constructor(public name: string) {
			super();
		}

		triggera(data: string) {
			this.eventa.trigger({ sender: this, data: data });
		}

		triggerb(data: string) {
			this.eventb.trigger({ sender: this, data: data });
		}
	}

	class Observer extends JW.Class {
		constructor(public name: string, dispatcher: Dispatcher, private helper: TestHelper) {
			super();
			this.own(dispatcher.eventa.bind(this.onEventA, this));
			this.own(dispatcher.eventb.bind(this.onEventB, this));
		}

		onEventA(params: EventParams) {
			this.helper.output(this.name + " is handling event A from " + params.sender.name + " with data " + params.data);
		}

		onEventB(params: EventParams) {
			this.helper.output(this.name + " is handling event B from " + params.sender.name + " with data " + params.data);
		}
	}

	QUnit.module("core/event");

	TestHelper.test("trigger", function(assert, helper) {
		helper.setExpectedOutput(
			"observer1 is handling event A from myDispatcher with data 10",
			"observer2 is handling event A from myDispatcher with data 10",
			"observer1 is handling event B from myDispatcher with data 20",
			"observer2 is handling event B from myDispatcher with data 20",
			"observer1 is handling event A from myDispatcher with data 30",
			"observer2 is handling event A from myDispatcher with data 30",
			"observer2 is handling event A from myDispatcher with data 50"
		);

		var dispatcher = new Dispatcher('myDispatcher');

		var observer1 = new Observer("observer1", dispatcher, helper);
		var observer2 = new Observer("observer2", dispatcher, helper);

		dispatcher.triggera("10");   // handled by 1 and 2
		dispatcher.triggerb("20");   // handled by 1 and 2

		dispatcher.eventb.purge();

		dispatcher.triggera("30");   // handled by 1 and 2
		dispatcher.triggerb("40");

		observer1.destroy();

		dispatcher.triggera("50");   // handled by 2
		dispatcher.triggerb("60");

		dispatcher.eventa.purge();

		dispatcher.triggera("70");
		dispatcher.triggerb("80");

		observer2.destroy();
		dispatcher.destroy();
	});

	TestHelper.test("recursive", function(assert, helper) {
		var dispatcher1 = new Dispatcher("x");
		var dispatcher2 = new Dispatcher("y");

		dispatcher1.eventa.bind(function() {
			helper.output("a11");
			dispatcher2.triggera("10");
		}, this);

		dispatcher1.eventa.bind(function() {
			helper.output("a12");
		}, this);

		dispatcher2.eventa.bind(function() {
			helper.output("a2");
		}, this);

		helper.setExpectedOutput(
			"a11",
			"a2",
			"a12"
		);

		dispatcher1.triggera("10");

		dispatcher2.destroy();
		dispatcher1.destroy();
	});
})();
