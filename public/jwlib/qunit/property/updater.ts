/// <reference path="../tests.ref.ts" />

QUnit.module("property/updater");

TestHelper.test("updater", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");

	helper.setExpectedOutput("1a");
	var updater = new JW.Updater([ source1, source2 ], function(a: number, b: string) {
		helper.output(a + b);
	}, this);

	helper.setExpectedOutput("2a");
	source1.set(2);

	helper.setExpectedOutput("2b");
	source2.set("b");

	helper.setExpectedOutput();
	updater.destroy();
	source1.set(3);
	source2.set("c");
});

TestHelper.test("watch", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");
	var event = new JW.Event();
	var property = new JW.Property();

	helper.setExpectedOutput("1a");
	var updater = new JW.Updater([ source1, source2 ], function(a: number, b: string) {
		assert.strictEqual(2, arguments.length);
		helper.output(a + b);
	}, this);
	updater.bind(event);
	updater.watch(property);

	helper.setExpectedOutput("2a");
	source1.set(2);

	helper.setExpectedOutput("2b");
	source2.set("b");

	helper.setExpectedOutput("2b");
	event.trigger();

	helper.setExpectedOutput("2b");
	property.set(false);

	helper.setExpectedOutput();
	updater.destroy();
	source1.set(3);
	source2.set("c");
	event.trigger();
	property.set(true);
});
