/// <reference path="../tests.ref.ts" />

QUnit.module("core/apply", {
	beforeEach: function() {
		this.a = {
			a: undefined,
			b: null,
			c: 0,
			d: 1,
			e: true,
			f: false,
			g: '',
			h: 'lala',
			i: {},
			j: { length: 1 },
			k: [],
			l: [1],
			n: 10
		};

		this.b = {
			a: 10,
			b: 10,
			c: 10,
			d: 10,
			e: 10,
			f: 10,
			g: 10,
			h: 10,
			i: 10,
			j: 10,
			k: 10,
			l: 10,
			m: 10,
			n: undefined
		};

		this._testApply = function(c, fields, assert: QUnitAssert) {
			fields = this._getFields(fields);
			for (var i in this.a) {
				if (fields[i])
					assert.strictEqual(this.b[i], c[i]);
				else
					assert.strictEqual(this.a[i], c[i]);
			}
		};

		this._testClean = function(c, fields, assert: QUnitAssert) {
			fields = this._getFields(fields);
			for (var i in this.a) {
				if (!fields[i])
					assert.strictEqual(this.a[i], c[i]);
			}

			for (var i in c) {
				if (fields[i])
					throw new Error("Field '" + i + "' is not cleaned up");
			}
		};

		this._getFields = function(fields) {
			var o = {};
			for (var i = 0; i < fields.length; ++i)
				o[fields[i]] = true;

			return o;
		};
	}
});

TestHelper.test("apply", function(assert, helper) {
	var c = JW.apply({}, this.a);
	this._testApply(c, [], assert);

	var d = JW.apply(c, this.b);
	assert.strictEqual(c, d);

	this._testApply(c, ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"], assert);
});

TestHelper.test("applyIf", function(assert, helper) {
	var c = JW.apply({}, this.a);
	JW.applyIf(c, this.b);
	this._testApply(c, ["a"], assert);
});

TestHelper.test("applyIfn", function(assert, helper) {
	var c = JW.apply({}, this.a);
	JW.applyIfn(c, this.b);
	this._testApply(c, ["a", "b"], assert);
});

TestHelper.test("clean", function(assert, helper) {
	var c = JW.apply({}, this.a);
	c = JW.clean(c);
	this._testClean(c, ["a"], assert);
});

TestHelper.test("cleann", function(assert, helper) {
	var c = JW.apply({}, this.a);
	c = JW.cleann(c);
	this._testClean(c, ["a", "b"], assert);
});
