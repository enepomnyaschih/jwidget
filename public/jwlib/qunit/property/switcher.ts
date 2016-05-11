/// <reference path="../tests.ref.ts" />

QUnit.module("property/switcher");

TestHelper.test("switcher", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");

	helper.setExpectedOutput("init 1a");
	var switcher = new JW.Switcher([source1, source2], {
		init: function(x: number, y: string) { helper.output("init " + x + y); },
		done: function(x: number, y: string) { helper.output("done " + x + y); },
		scope: this
	});

	helper.setExpectedOutput("done 1a", "init 2a");
	source1.set(2);

	helper.setExpectedOutput("done 2a");
	source2.set(null);

	helper.setExpectedOutput("init 2b");
	source2.set("b");

	helper.setExpectedOutput("done 2b");
	switcher.destroy();

	source1.set(3);
	source2.set("c");
});

TestHelper.test("watch", function(assert, helper) {
	var source = new JW.Property(1);
	var event = new JW.Event();
	var property = new JW.Property("a");

	helper.setExpectedOutput("init 1");
	var switcher = new JW.Switcher([source], {
		init: function(x: number) { helper.output("init " + x); },
		done: function(x: number) { helper.output("done " + x); },
		scope: this
	});

	helper.setExpectedOutput();
	switcher.bind(event);
	switcher.watch(property);

	helper.setExpectedOutput("done 1", "init 2");
	source.set(2);

	helper.setExpectedOutput("done 2", "init 2");
	event.trigger();

	helper.setExpectedOutput("done 2", "init 2");
	property.set("b");

	helper.setExpectedOutput("done 2");
	source.set(null);

	helper.setExpectedOutput();
	event.trigger();
	property.set("c");

	helper.setExpectedOutput("init 3");
	source.set(3);

	helper.setExpectedOutput("done 3");
	switcher.destroy();

	helper.setExpectedOutput();
	source.set(4);
	event.trigger();
	property.set("d");
});

TestHelper.test("optional", function(assert, helper) {
	var property = new JW.Property(1);
	var switcher = new JW.Switcher([property]);
	switcher.destroy();
});

TestHelper.test("acceptNull", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");

	helper.setExpectedOutput("Create 1a");
	var switcher = new JW.Switcher([ source1, source2 ], {
		acceptNull: true,
		init: function(a: number, b: string) {
			helper.output("Create " + a + b);
		},
		done: function(a: number, b: string) {
			helper.output("Destroy " + a + b);
		},
		scope: this
	});

	helper.setExpectedOutput("Destroy 1a", "Create 2a");
	source1.set(2);

	helper.setExpectedOutput("Destroy 2a", "Create 2null");
	source2.set(null)

	helper.setExpectedOutput("Destroy 2null", "Create 2b");
	source2.set("b");

	helper.setExpectedOutput("Destroy 2b");
	switcher.destroy();

	source1.set(3);
	source2.set("c");
});

TestHelper.test("null", function(assert, helper) {
	var source = new JW.Property();
	var switcher = new JW.Switcher([ source ], {
		init: function() {
			assert.ok(false);
		},
		done: function() {
			assert.ok(false);
		},
		scope: this
	});
	switcher.destroy();
});

TestHelper.test("blank", function(assert, helper) {
	helper.setExpectedOutput("Create");
	var switcher = new JW.Switcher([], {
		init: function() {
			helper.output("Create");
		},
		done: function() {
			helper.output("Destroy");
		},
		scope: this
	});

	helper.setExpectedOutput("Destroy");
	switcher.destroy();
});
