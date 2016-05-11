/// <reference path="../tests.ref.ts" />

QUnit.module("core/callback");

TestHelper.test("byField", function(assert, helper) {
	var obj = {
		p: {
			q: 2
		}
	};
	assert.strictEqual(2, JW.byField("p.q")(obj));
	assert.strictEqual(2, JW.byField(["p", "q"])(obj));
});

TestHelper.test("byFieldBlank", function(assert, helper) {
	var obj = {
		p: {
			q: 2
		}
	};
	assert.strictEqual(obj, JW.byField()(obj));
	assert.strictEqual(obj, JW.byField("")(obj));
	assert.strictEqual(obj, JW.byField([])(obj));
});

TestHelper.test("byFieldUndefined", function(assert, helper) {
	assert.strictEqual(undefined, JW.byField("p.q")({}));
	assert.strictEqual(undefined, JW.byField(["p", "q"])({}));
});

TestHelper.test("byValue", function(assert, helper) {
	var obj = {
		p: {
			q: 2
		}
	};
	assert.ok(JW.byValue("p.q", 2)(obj));
	assert.ok(JW.byValue(["p", "q"], 2)(obj));
	assert.ok(!JW.byValue("p.q", 3)(obj));
	assert.ok(!JW.byValue(["p", "q"], 3)(obj));
});

TestHelper.test("byValueBlank", function(assert, helper) {
	var obj = {
		p: {
			q: 2
		}
	};
	assert.ok(JW.byValue(null, obj)(obj));
	assert.ok(JW.byValue("", obj)(obj));
	assert.ok(JW.byValue([], obj)(obj));
	assert.ok(!JW.byValue(null, obj)(1));
	assert.ok(!JW.byValue("", obj)(1));
	assert.ok(!JW.byValue([], obj)(1));
});

TestHelper.test("byValueTypeCast", function(assert, helper) {
	var obj = {
		p: {
			q: "2"
		}
	};
	assert.ok(!JW.byValue("p.q", 2)(obj));
});

TestHelper.test("byValueUndefined", function(assert, helper) {
	assert.ok(!JW.byValue("p.q", 2)({}));
	assert.ok(!JW.byValue(["p", "q"], 2)({}));
});

TestHelper.test("byMethod", function(assert, helper) {
	var obj = {
		z: 2,
		m: function(x, y) { return x + y + this.z; }
	};
	assert.strictEqual(9, JW.byMethod("m", [3, 4])(obj));
});

TestHelper.test("byMethodNoArgs", function(assert, helper) {
	var obj = {
		m: function() { return 2; }
	};
	assert.strictEqual(2, JW.byMethod("m")(obj));
});
