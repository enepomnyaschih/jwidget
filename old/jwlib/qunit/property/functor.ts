/// <reference path="../tests.ref.ts" />

QUnit.module("property/functor");

TestHelper.test("functor", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");
	var target = new JW.Property<string>();

	var functor = new JW.Functor<string>([ source1, source2 ], function(a: number, b: string) {
		return a + b;
	}, this, { target: target });
	assert.strictEqual("1a", target.get());

	source1.set(2);
	assert.strictEqual("2a", target.get());

	source2.set("b");
	assert.strictEqual("2b", target.get());

	functor.destroy();
	assert.strictEqual("2b", target.get());

	source1.set(3);
	source2.set("c");
	assert.strictEqual("2b", target.get());
});

TestHelper.test("watch", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");
	var value = 1;
	var event = new JW.Event();
	var property = new JW.Property();
	var target = new JW.Property<string>();

	var functor = new JW.Functor([ source1, source2 ], function(a: number, b: string) {
		assert.strictEqual(2, arguments.length);
		return a + b + value;
	}, this, { target: target });
	functor.bind(event);
	functor.watch(property);
	assert.strictEqual("1a1", target.get());

	source1.set(2);
	assert.strictEqual("2a1", target.get());

	source2.set("b");
	assert.strictEqual("2b1", target.get());

	value = 2;
	assert.strictEqual("2b1", target.get());

	event.trigger();
	assert.strictEqual("2b2", target.get());

	value = 3;
	property.set(false);
	assert.strictEqual("2b3", target.get());

	helper.setExpectedOutput();
	functor.destroy();
	assert.strictEqual("2b3", target.get());

	source1.set(3);
	source2.set("c");
	event.trigger();
	property.set(true);
	assert.strictEqual("2b3", target.get());
});

TestHelper.test("autoTarget", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");

	var functor = new JW.Functor<string>([ source1, source2 ], function(a: number, b: string) {
		return a + b;
	}, this);
	var target = functor.target;
	assert.strictEqual("1a", target.get());

	source1.set(2);
	assert.strictEqual("2a", target.get());

	source2.set("b");
	assert.strictEqual("2b", target.get());

	functor.destroy();
	source1.set(3);
	source2.set("c");
});
