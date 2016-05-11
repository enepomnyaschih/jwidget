/// <reference path="../tests.ref.ts" />

QUnit.module("property/property");

TestHelper.test("property", function(assert, helper) {
	var property = new JW.Property<any>(false);
	assert.strictEqual(property.get(), false);
	property.changeEvent.bind(function(params) {
		helper.output(params.oldValue + " to " + params.value);
	}, this);
	helper.setExpectedOutput("false to 10");
	property.set(10);
	assert.strictEqual(property.get(), 10);
	helper.setExpectedOutput("10 to 15");
	property.set(15);
	assert.strictEqual(property.get(), 15);
	helper.setExpectedOutput();
	property.set(15);
	assert.strictEqual(property.get(), 15);
	property.destroy();
});

TestHelper.test("bindTo", function(assert, helper) {
	var source = new JW.Property(1);
	var target = new JW.Property();
	target.changeEvent.bind(function(params) {
		helper.output(params.oldValue + " to " + params.value);
	}, this);
	helper.setExpectedOutput("null to 1");
	target.bindTo(source);
	assert.strictEqual(1, target.get());
	helper.setExpectedOutput("1 to 2");
	source.set(2);
	assert.strictEqual(2, target.get());
	var source2 = new JW.Property(3);
	helper.setExpectedOutput("2 to 3");
	target.bindTo(source2);
	assert.strictEqual(3, target.get());
	helper.setExpectedOutput();
	source.set(4);
	assert.strictEqual(3, target.get());
	target.bindTo();
	source.set(5);
	source2.set(6);
	assert.strictEqual(3, target.get());
	helper.setExpectedOutput("3 to 5");
	target.bindTo(source);
	assert.strictEqual(5, target.get());
	helper.setExpectedOutput();
	target.destroy();
	source.set(7);
	source2.set(8);
	source.destroy();
	source2.destroy();
});

TestHelper.test("ownValue", function(assert, helper) {
	class Cls extends JW.Class {
		constructor(private value: string) {
			super();
		}

		destroyObject() {
			helper.output("destroy " + this.value);
			super.destroyObject();
		}
	}

	var property = new JW.Property<Cls>();
	var a = new Cls("a");
	var b = new Cls("b");
	var c = new Cls("c");
	property.ownValue();
	property.set(a);
	helper.setExpectedOutput("destroy a");
	property.set(b);
	helper.setExpectedOutput();
	property.set(b);
	helper.setExpectedOutput("destroy b");
	property.set(null);
	helper.setExpectedOutput();
	property.set(c);
	helper.setExpectedOutput("destroy c");
	property.destroy();
});

TestHelper.test("null", function(assert, helper) {
	var property = new JW.Property();
	assert.strictEqual(null, property.get());
	property.set(undefined);
	assert.strictEqual(null, property.get());
});

TestHelper.test("map", function(assert, helper) {
	var context = {};

	function twice(x) {
		assert.strictEqual(context, this);
		return 2 * x;
	}

	function objectize(x) {
		assert.strictEqual(context, this);
		return {
			x: x,
			destroy: function() {
				helper.output("Destroy " + x);
			}
		};
	}

	var property = new JW.Property<number>();
	var result = property.$map(twice, context);
	var targetValue = property.$$mapValue(twice, context);
	var targetObject = property.$$mapObject(objectize, context);
	assert.strictEqual(null, property.map(twice, context));
	assert.strictEqual(null, result.get());
	assert.strictEqual(null, targetValue.get());
	assert.strictEqual(null, targetObject.get());

	property.set(1);
	assert.strictEqual(2, property.map(twice, context));
	assert.strictEqual(null, result.get());
	assert.strictEqual(2, property.$map(twice, context).get());
	assert.strictEqual(2, targetValue.get());
	assert.strictEqual(1, targetObject.get().x);

	helper.setExpectedOutput("Destroy 1");
	property.set(2);
	assert.strictEqual(4, property.map(twice, context));
	assert.strictEqual(4, property.$map(twice, context).get());
	assert.strictEqual(4, targetValue.get());
	assert.strictEqual(2, targetObject.get().x);

	helper.setExpectedOutput("Destroy 2");
	property.set(null);
	assert.strictEqual(null, property.map(twice, context));
	assert.strictEqual(null, property.$map(twice, context).get());
	assert.strictEqual(null, targetValue.get());
	assert.strictEqual(null, targetObject.get());

	helper.setExpectedOutput();
	property.set(3);
	assert.strictEqual(6, property.map(twice, context));
	assert.strictEqual(6, property.$map(twice, context).get());
	assert.strictEqual(6, targetValue.get());
	assert.strictEqual(3, targetObject.get().x);

	targetValue.destroy();

	helper.setExpectedOutput("Destroy 3");
	assert.ok(property.changeEvent.hasAttachments());
	targetObject.destroy();
	assert.ok(!property.changeEvent.hasAttachments());

	helper.setExpectedOutput();
	property.set(4);
	property.destroy();
});
