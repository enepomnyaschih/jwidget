/// <reference path="../tests.ref.ts" />

QUnit.module("property/copier");

TestHelper.test("copier", function(assert, helper) {
	var source = new JW.Property<number>(1);
	var target = new JW.Property<number>();
	target.changeEvent.bind(function(params) {
		helper.output(params.oldValue + " to " + params.value);
	}, this);

	helper.setExpectedOutput("null to 1");
	var copier = new JW.Copier(source, {target: target});
	assert.strictEqual(1, target.get());

	helper.setExpectedOutput("1 to 2");
	source.set(2);
	assert.strictEqual(2, target.get());

	helper.setExpectedOutput("2 to null");
	source.set(null);
	assert.strictEqual(null, target.get());

	helper.setExpectedOutput("null to 3");
	source.set(3);
	assert.strictEqual(3, target.get());

	helper.setExpectedOutput();
	copier.destroy();
	source.set(4);
	assert.strictEqual(3, target.get());
});

TestHelper.test("autoTarget", function(assert, helper) {
	var source = new JW.Property(1);
	var copier = new JW.Copier(source);
	var target = copier.target;
	target.changeEvent.bind(function(params) {
		helper.output(params.oldValue + " to " + params.value);
	}, this);
	assert.strictEqual(1, target.get());

	helper.setExpectedOutput("1 to 2");
	source.set(2);
	assert.strictEqual(2, target.get());

	helper.setExpectedOutput("2 to null");
	source.set(null);
	assert.strictEqual(null, target.get());

	helper.setExpectedOutput("null to 3");
	source.set(3);
	assert.strictEqual(3, target.get());

	helper.setExpectedOutput();
	copier.destroy();
	source.set(4);
});
