/// <reference path="../tests.ref.ts" />

QUnit.module("core/core");

TestHelper.test("isArray", function(assert) {
	assert.strictEqual(JW.isArray(undefined), false);
	assert.strictEqual(JW.isArray(null), false);
	assert.strictEqual(JW.isArray(0), false);
	assert.strictEqual(JW.isArray(1), false);
	assert.strictEqual(JW.isArray(true), false);
	assert.strictEqual(JW.isArray(false), false);
	assert.strictEqual(JW.isArray(''), false);
	assert.strictEqual(JW.isArray('lala'), false);
	assert.strictEqual(JW.isArray({}), false);
	assert.strictEqual(JW.isArray({ length: 1 }), false);
	assert.strictEqual(JW.isArray([]), true);
	assert.strictEqual(JW.isArray([ 1 ]), true);
	assert.strictEqual(JW.isArray(JW.emptyFn), false);
	assert.strictEqual(JW.isArray(/abc/i), false);
	assert.strictEqual(JW.isArray(new Date()), false);
});

TestHelper.test("isObject", function(assert) {
	assert.strictEqual(JW.isObject(undefined), false);
	assert.strictEqual(JW.isObject(null), false);
	assert.strictEqual(JW.isObject(0), false);
	assert.strictEqual(JW.isObject(1), false);
	assert.strictEqual(JW.isObject(true), false);
	assert.strictEqual(JW.isObject(false), false);
	assert.strictEqual(JW.isObject(''), false);
	assert.strictEqual(JW.isObject('lala'), false);
	assert.strictEqual(JW.isObject({}), true);
	assert.strictEqual(JW.isObject({ length: 1 }), true);
	assert.strictEqual(JW.isObject([]), false);
	assert.strictEqual(JW.isObject([ 1 ]), false);
	assert.strictEqual(JW.isObject(JW.emptyFn), false);
	assert.strictEqual(JW.isObject(/abc/i), false);
	assert.strictEqual(JW.isObject(new Date()), false);
});

TestHelper.test("isUndefined", function(assert) {
	assert.strictEqual(JW.isUndefined(undefined), true);
	assert.strictEqual(JW.isUndefined(null), false);
	assert.strictEqual(JW.isUndefined(0), false);
	assert.strictEqual(JW.isUndefined(1), false);
	assert.strictEqual(JW.isUndefined(true), false);
	assert.strictEqual(JW.isUndefined(false), false);
	assert.strictEqual(JW.isUndefined(''), false);
	assert.strictEqual(JW.isUndefined('lala'), false);
	assert.strictEqual(JW.isUndefined({}), false);
	assert.strictEqual(JW.isUndefined({ length: 1 }), false);
	assert.strictEqual(JW.isUndefined([]), false);
	assert.strictEqual(JW.isUndefined([ 1 ]), false);
	assert.strictEqual(JW.isUndefined(JW.emptyFn), false);
	assert.strictEqual(JW.isUndefined(/abc/i), false);
	assert.strictEqual(JW.isUndefined(new Date()), false);
});

TestHelper.test("isDefined", function(assert) {
	assert.strictEqual(JW.isDefined(undefined), false);
	assert.strictEqual(JW.isDefined(null), true);
	assert.strictEqual(JW.isDefined(0), true);
	assert.strictEqual(JW.isDefined(1), true);
	assert.strictEqual(JW.isDefined(true), true);
	assert.strictEqual(JW.isDefined(false), true);
	assert.strictEqual(JW.isDefined(''), true);
	assert.strictEqual(JW.isDefined('lala'), true);
	assert.strictEqual(JW.isDefined({}), true);
	assert.strictEqual(JW.isDefined({ length: 1 }), true);
	assert.strictEqual(JW.isDefined([]), true);
	assert.strictEqual(JW.isDefined([ 1 ]), true);
	assert.strictEqual(JW.isDefined(JW.emptyFn), true);
	assert.strictEqual(JW.isDefined(/abc/i), true);
	assert.strictEqual(JW.isDefined(new Date()), true);
});

TestHelper.test("isNull", function(assert) {
	assert.strictEqual(JW.isNull(undefined), false);
	assert.strictEqual(JW.isNull(null), true);
	assert.strictEqual(JW.isNull(0), false);
	assert.strictEqual(JW.isNull(1), false);
	assert.strictEqual(JW.isNull(true), false);
	assert.strictEqual(JW.isNull(false), false);
	assert.strictEqual(JW.isNull(''), false);
	assert.strictEqual(JW.isNull('lala'), false);
	assert.strictEqual(JW.isNull({}), false);
	assert.strictEqual(JW.isNull({ length: 1 }), false);
	assert.strictEqual(JW.isNull([]), false);
	assert.strictEqual(JW.isNull([ 1 ]), false);
	assert.strictEqual(JW.isNull(JW.emptyFn), false);
	assert.strictEqual(JW.isNull(/abc/i), false);
	assert.strictEqual(JW.isNull(new Date()), false);
});

TestHelper.test("isNotNull", function(assert) {
	assert.strictEqual(JW.isNotNull(undefined), true);
	assert.strictEqual(JW.isNotNull(null), false);
	assert.strictEqual(JW.isNotNull(0), true);
	assert.strictEqual(JW.isNotNull(1), true);
	assert.strictEqual(JW.isNotNull(true), true);
	assert.strictEqual(JW.isNotNull(false), true);
	assert.strictEqual(JW.isNotNull(''), true);
	assert.strictEqual(JW.isNotNull('lala'), true);
	assert.strictEqual(JW.isNotNull({}), true);
	assert.strictEqual(JW.isNotNull({ length: 1 }), true);
	assert.strictEqual(JW.isNotNull([]), true);
	assert.strictEqual(JW.isNotNull([ 1 ]), true);
	assert.strictEqual(JW.isNotNull(JW.emptyFn), true);
	assert.strictEqual(JW.isNotNull(/abc/i), true);
	assert.strictEqual(JW.isNotNull(new Date()), true);
});

TestHelper.test("isSet", function(assert) {
	assert.strictEqual(JW.isSet(undefined), false);
	assert.strictEqual(JW.isSet(null), false);
	assert.strictEqual(JW.isSet(0), true);
	assert.strictEqual(JW.isSet(1), true);
	assert.strictEqual(JW.isSet(true), true);
	assert.strictEqual(JW.isSet(false), true);
	assert.strictEqual(JW.isSet(''), true);
	assert.strictEqual(JW.isSet('lala'), true);
	assert.strictEqual(JW.isSet({}), true);
	assert.strictEqual(JW.isSet({ length: 1 }), true);
	assert.strictEqual(JW.isSet([]), true);
	assert.strictEqual(JW.isSet([ 1 ]), true);
	assert.strictEqual(JW.isSet(JW.emptyFn), true);
	assert.strictEqual(JW.isSet(/abc/i), true);
	assert.strictEqual(JW.isSet(new Date()), true);
});

TestHelper.test("isNotSet", function(assert) {
	assert.strictEqual(JW.isNotSet(undefined), true);
	assert.strictEqual(JW.isNotSet(null), true);
	assert.strictEqual(JW.isNotSet(0), false);
	assert.strictEqual(JW.isNotSet(1), false);
	assert.strictEqual(JW.isNotSet(true), false);
	assert.strictEqual(JW.isNotSet(false), false);
	assert.strictEqual(JW.isNotSet(''), false);
	assert.strictEqual(JW.isNotSet('lala'), false);
	assert.strictEqual(JW.isNotSet({}), false);
	assert.strictEqual(JW.isNotSet({ length: 1 }), false);
	assert.strictEqual(JW.isNotSet([]), false);
	assert.strictEqual(JW.isNotSet([ 1 ]), false);
	assert.strictEqual(JW.isNotSet(JW.emptyFn), false);
	assert.strictEqual(JW.isNotSet(/abc/i), false);
	assert.strictEqual(JW.isNotSet(new Date()), false);
});

TestHelper.test("isBlank", function(assert) {
	assert.strictEqual(JW.isBlank(undefined), true);
	assert.strictEqual(JW.isBlank(null), true);
	assert.strictEqual(JW.isBlank(0), true);
	assert.strictEqual(JW.isBlank(1), false);
	assert.strictEqual(JW.isBlank(true), false);
	assert.strictEqual(JW.isBlank(false), true);
	assert.strictEqual(JW.isBlank(''), true);
	assert.strictEqual(JW.isBlank('lala'), false);
	assert.strictEqual(JW.isBlank({}), false);
	assert.strictEqual(JW.isBlank({ length: 1 }), false);
	assert.strictEqual(JW.isBlank([]), false);
	assert.strictEqual(JW.isBlank([ 1 ]), false);
	assert.strictEqual(JW.isBlank(JW.emptyFn), false);
	assert.strictEqual(JW.isBlank(/abc/i), false);
	assert.strictEqual(JW.isBlank(new Date()), false);
});

TestHelper.test("isNotBlank", function(assert) {
	assert.strictEqual(JW.isNotBlank(undefined), false);
	assert.strictEqual(JW.isNotBlank(null), false);
	assert.strictEqual(JW.isNotBlank(0), false);
	assert.strictEqual(JW.isNotBlank(1), true);
	assert.strictEqual(JW.isNotBlank(true), true);
	assert.strictEqual(JW.isNotBlank(false), false);
	assert.strictEqual(JW.isNotBlank(''), false);
	assert.strictEqual(JW.isNotBlank('lala'), true);
	assert.strictEqual(JW.isNotBlank({}), true);
	assert.strictEqual(JW.isNotBlank({ length: 1 }), true);
	assert.strictEqual(JW.isNotBlank([]), true);
	assert.strictEqual(JW.isNotBlank([ 1 ]), true);
	assert.strictEqual(JW.isNotBlank(JW.emptyFn), true);
	assert.strictEqual(JW.isNotBlank(/abc/i), true);
	assert.strictEqual(JW.isNotBlank(new Date()), true);
});

TestHelper.test("isInt", function(assert) {
	assert.strictEqual(JW.isInt(0), true);
	assert.strictEqual(JW.isInt(-1), true);
	assert.strictEqual(JW.isInt(1), true);
	assert.strictEqual(JW.isInt(0.5), false);
	assert.strictEqual(JW.isInt(-0.001), false);
	assert.strictEqual(JW.isInt(undefined), false);
	assert.strictEqual(JW.isInt(null), false);
	assert.strictEqual(JW.isInt(true), false);
	assert.strictEqual(JW.isInt(false), false);
	assert.strictEqual(JW.isInt(''), false);
	assert.strictEqual(JW.isInt('lala'), false);
	assert.strictEqual(JW.isInt({}), false);
	assert.strictEqual(JW.isInt({ length: 1 }), false);
	assert.strictEqual(JW.isInt([]), false);
	assert.strictEqual(JW.isInt([ 1 ]), false);
	assert.strictEqual(JW.isInt(JW.emptyFn), false);
	assert.strictEqual(JW.isInt(/abc/i), false);
	assert.strictEqual(JW.isInt(new Date()), false);
});

TestHelper.test("isNumber", function(assert) {
	assert.strictEqual(JW.isNumber(0), true);
	assert.strictEqual(JW.isNumber(-1), true);
	assert.strictEqual(JW.isNumber(1), true);
	assert.strictEqual(JW.isNumber(0.5), true);
	assert.strictEqual(JW.isNumber(-0.001), true);
	assert.strictEqual(JW.isNumber(undefined), false);
	assert.strictEqual(JW.isNumber(null), false);
	assert.strictEqual(JW.isNumber(true), false);
	assert.strictEqual(JW.isNumber(false), false);
	assert.strictEqual(JW.isNumber(''), false);
	assert.strictEqual(JW.isNumber('lala'), false);
	assert.strictEqual(JW.isNumber({}), false);
	assert.strictEqual(JW.isNumber({ length: 1 }), false);
	assert.strictEqual(JW.isNumber([]), false);
	assert.strictEqual(JW.isNumber([ 1 ]), false);
	assert.strictEqual(JW.isNumber(JW.emptyFn), false);
	assert.strictEqual(JW.isNumber(/abc/i), false);
	assert.strictEqual(JW.isNumber(new Date()), false);
});

TestHelper.test("isString", function(assert) {
	assert.strictEqual(JW.isString(0), false);
	assert.strictEqual(JW.isString(-1), false);
	assert.strictEqual(JW.isString(1), false);
	assert.strictEqual(JW.isString(0.5), false);
	assert.strictEqual(JW.isString(-0.001), false);
	assert.strictEqual(JW.isString(undefined), false);
	assert.strictEqual(JW.isString(null), false);
	assert.strictEqual(JW.isString(true), false);
	assert.strictEqual(JW.isString(false), false);
	assert.strictEqual(JW.isString(''), true);
	assert.strictEqual(JW.isString('lala'), true);
	assert.strictEqual(JW.isString({}), false);
	assert.strictEqual(JW.isString({ length: 1 }), false);
	assert.strictEqual(JW.isString([]), false);
	assert.strictEqual(JW.isString([ 1 ]), false);
	assert.strictEqual(JW.isString(JW.emptyFn), false);
	assert.strictEqual(JW.isString(/abc/i), false);
	assert.strictEqual(JW.isString(new Date()), false);
});

TestHelper.test("isBoolean", function(assert) {
	assert.strictEqual(JW.isBoolean(undefined), false);
	assert.strictEqual(JW.isBoolean(null), false);
	assert.strictEqual(JW.isBoolean(0), false);
	assert.strictEqual(JW.isBoolean(1), false);
	assert.strictEqual(JW.isBoolean(true), true);
	assert.strictEqual(JW.isBoolean(false), true);
	assert.strictEqual(JW.isBoolean(''), false);
	assert.strictEqual(JW.isBoolean('lala'), false);
	assert.strictEqual(JW.isBoolean({}), false);
	assert.strictEqual(JW.isBoolean({ length: 1 }), false);
	assert.strictEqual(JW.isBoolean([]), false);
	assert.strictEqual(JW.isBoolean([ 1 ]), false);
	assert.strictEqual(JW.isBoolean(JW.emptyFn), false);
	assert.strictEqual(JW.isBoolean(/abc/i), false);
	assert.strictEqual(JW.isBoolean(new Date()), false);
});

TestHelper.test("isFunction", function(assert) {
	assert.strictEqual(JW.isFunction(undefined), false);
	assert.strictEqual(JW.isFunction(null), false);
	assert.strictEqual(JW.isFunction(0), false);
	assert.strictEqual(JW.isFunction(1), false);
	assert.strictEqual(JW.isFunction(true), false);
	assert.strictEqual(JW.isFunction(false), false);
	assert.strictEqual(JW.isFunction(''), false);
	assert.strictEqual(JW.isFunction('lala'), false);
	assert.strictEqual(JW.isFunction({}), false);
	assert.strictEqual(JW.isFunction({ length: 1 }), false);
	assert.strictEqual(JW.isFunction([]), false);
	assert.strictEqual(JW.isFunction([ 1 ]), false);
	assert.strictEqual(JW.isFunction(JW.emptyFn), true);
	assert.strictEqual(JW.isFunction(/abc/i), false);
	assert.strictEqual(JW.isFunction(new Date()), false);
});

TestHelper.test("isRegExp", function(assert) {
	assert.strictEqual(JW.isRegExp(undefined), false);
	assert.strictEqual(JW.isRegExp(null), false);
	assert.strictEqual(JW.isRegExp(0), false);
	assert.strictEqual(JW.isRegExp(1), false);
	assert.strictEqual(JW.isRegExp(true), false);
	assert.strictEqual(JW.isRegExp(false), false);
	assert.strictEqual(JW.isRegExp(''), false);
	assert.strictEqual(JW.isRegExp('lala'), false);
	assert.strictEqual(JW.isRegExp({}), false);
	assert.strictEqual(JW.isRegExp({ length: 1 }), false);
	assert.strictEqual(JW.isRegExp([]), false);
	assert.strictEqual(JW.isRegExp([ 1 ]), false);
	assert.strictEqual(JW.isRegExp(JW.emptyFn), false);
	assert.strictEqual(JW.isRegExp(/abc/i), true);
	assert.strictEqual(JW.isRegExp(new Date()), false);
});

TestHelper.test("isDate", function(assert) {
	assert.strictEqual(JW.isDate(undefined), false);
	assert.strictEqual(JW.isDate(null), false);
	assert.strictEqual(JW.isDate(0), false);
	assert.strictEqual(JW.isDate(1), false);
	assert.strictEqual(JW.isDate(true), false);
	assert.strictEqual(JW.isDate(false), false);
	assert.strictEqual(JW.isDate(''), false);
	assert.strictEqual(JW.isDate('lala'), false);
	assert.strictEqual(JW.isDate({}), false);
	assert.strictEqual(JW.isDate({ length: 1 }), false);
	assert.strictEqual(JW.isDate([]), false);
	assert.strictEqual(JW.isDate([ 1 ]), false);
	assert.strictEqual(JW.isDate(JW.emptyFn), false);
	assert.strictEqual(JW.isDate(/abc/i), false);
	assert.strictEqual(JW.isDate(new Date()), true);
});

TestHelper.test("def", function(assert) {
	assert.strictEqual(10, JW.def(undefined, 10));
	assert.strictEqual(null, JW.def(null, 10));
	assert.strictEqual(0, JW.def(0, 10));
	assert.strictEqual(1, JW.def(1, 10));
	assert.strictEqual(true, JW.def<any>(true, 10));
	assert.strictEqual(false, JW.def<any>(false, 10));
	assert.strictEqual('', JW.def<any>('', 10));
	assert.strictEqual('lala', JW.def<any>('lala', 10));

	var a = {};
	var b = { length: 1 };
	var c = [];
	var d = [1];

	assert.strictEqual(a, JW.def(a, 10));
	assert.strictEqual(b, JW.def<any>(b, 10));
	assert.strictEqual(c, JW.def<any>(c, 10));
	assert.strictEqual(d, JW.def<any>(d, 10));
});

TestHelper.test("defn", function(assert) {
	assert.strictEqual(10, JW.defn(undefined, 10));
	assert.strictEqual(10, JW.defn(null, 10));
	assert.strictEqual(0, JW.defn(0, 10));
	assert.strictEqual(1, JW.defn(1, 10));
	assert.strictEqual(true, JW.defn<any>(true, 10));
	assert.strictEqual(false, JW.defn<any>(false, 10));
	assert.strictEqual('', JW.defn<any>('', 10));
	assert.strictEqual('lala', JW.defn<any>('lala', 10));

	var a = {};
	var b = { length: 1 };
	var c = [];
	var d = [1];

	assert.strictEqual(a, JW.defn(a, 10));
	assert.strictEqual(b, JW.defn<any>(b, 10));
	assert.strictEqual(c, JW.defn<any>(c, 10));
	assert.strictEqual(d, JW.defn<any>(d, 10));
});

TestHelper.test("removeScripts", function(assert) {
	var html = '<div width="100" height="100" style="background-color: red;">&nbsp;<script type="text/javascript">while(1)alert();</script></div>';
	var expected = '<div width="100" height="100" style="background-color: red;">&nbsp;</div>';
	assert.strictEqual(expected, JW.String.removeScripts(html));
});

TestHelper.test("cmp", function(assert) {
	assert.strictEqual(0, JW.cmp(10, 10));
	assert.strictEqual(1, JW.cmp(20, 10));
	assert.strictEqual(-1, JW.cmp(10, 20));
	assert.strictEqual(0, JW.cmp("10", "10"));
	assert.strictEqual(1, JW.cmp("20", "10"));
	assert.strictEqual(-1, JW.cmp("10", "20"));
	assert.strictEqual(1, JW.cmp("100", "10"));
	assert.strictEqual(-1, JW.cmp("10", "100"));
	assert.strictEqual(1, JW.cmp("aB", "Ab"));
	assert.strictEqual(0, JW.cmp("aB", "Ab", true));
	assert.strictEqual(1, JW.cmp("aBc", "Ab", true));
	assert.strictEqual(-1, JW.cmp("aB", "Abc", true));
	assert.strictEqual(1, JW.cmp(["aB"], ["Ab"]));
	assert.strictEqual(0, JW.cmp(["aB"], ["Ab"], true));
	assert.strictEqual(1, JW.cmp(["aBc"], ["Ab"], true));
	assert.strictEqual(-1, JW.cmp(["aB"], ["Abc"], true));
	assert.strictEqual(0, JW.cmp(["ab", "cd"], ["ab", "cd"]));
	assert.strictEqual(1, JW.cmp(["ab", "ce"], ["ab", "cd"]));
	assert.strictEqual(-1, JW.cmp(["ab", "cd"], ["ab", "ce"]));
	assert.strictEqual(1, JW.cmp(["ab", "cd", "ef"], ["ab", "cd"]));
	assert.strictEqual(-1, JW.cmp(["ab", "cd"], ["ab", "cd", "ef"]));
	assert.strictEqual(-1, JW.cmp(["ab", "cd"], ["ab!cd"]));
});

TestHelper.test("get", function(assert) {
	var api = {
		_base: "/app",
		details: "/details",
		calculationlines: {
			_base: "/calclines",
			add: "/create",
			modify: "/modify",
			delet_: "/delete",
			"0": "/zero"
		},
		extractor: {
			_base: "/extractor",
			launch: "/launch",
			status: "/status"
		}
	};

	assert.strictEqual("/details", JW.get(api.details));
	assert.strictEqual("/status", JW.get(api, "extractor.status"));
	assert.strictEqual("/status", JW.get(api, ["extractor", "status"]));

	assert.strictEqual(JW.get(api["lala"]), undefined);
	assert.strictEqual(JW.get(api, "extractor.launch.now"), undefined);
	assert.strictEqual(JW.get(api, ["extractor", "launch", "now"]), undefined);
	assert.strictEqual(JW.get(api, "extractor.run.now"), undefined);
	assert.strictEqual(JW.get(api, ["extractor", "run", "now"]), undefined);

	assert.strictEqual("/details", JW.get(api.details, null, "default!"));
	assert.strictEqual("/status", JW.get(api, "extractor.status", "default!"));
	assert.strictEqual("/status", JW.get(api, ["extractor", "status"], "default!"));

	assert.strictEqual("default!", JW.get(api["lala"], null, "default!"));
	assert.strictEqual("default!", JW.get(api, "extractor.launch.now", "default!"));
	assert.strictEqual("default!", JW.get(api, ["extractor", "launch", "now"], "default!"));
	assert.strictEqual("default!", JW.get(api, "extractor.run.now", "default!"));
	assert.strictEqual("default!", JW.get(api, ["extractor", "run", "now"], "default!"));

	assert.strictEqual("/zero", JW.get(api, "calculationlines.0"));
	assert.strictEqual("/zero", JW.get(api, ["calculationlines", 0]));
});

TestHelper.test("set", function(assert) {
	var api = {
		_base: "/app",
		details: "/details",
		calculationlines: {
			_base: "/calclines",
			add: "/create",
			modify: "/modify",
			delet_: "/delete"
		},
		extractor: {
			_base: "/extractor",
			launch: "/launch",
			status: "/status"
		}
	};

	JW.set(api, "Status", "extractor.status");
	JW.set(api, "Base", ["extractor", "_base"]);

	JW.set(api, "Run", "extractor.run.now");
	JW.set(api, "Update", ["calculationlines", "update", "now"]);
	JW.set(api, "Zero", ["calculationlines", 0, "now"]);

	var expected = {
		_base: "/app",
		details: "/details",
		calculationlines: {
			_base: "/calclines",
			add: "/create",
			modify: "/modify",
			delet_: "/delete",
			update: {
				now: "Update"
			},
			"0": {
				now: "Zero"
			}
		},
		extractor: {
			_base: "Base",
			launch: "/launch",
			status: "Status",
			run: {
				now: "Run"
			}
		}
	};

	assert.strictEqual(JSON.stringify(expected), JSON.stringify(api));
});

TestHelper.test("mod", function(assert, helper) {
	helper.assertEpsEqual(0, JW.mod(0, 1), .001);
	helper.assertEpsEqual(0, JW.mod(0, 2), .001);
	helper.assertEpsEqual(0, JW.mod(1, 1), .001);
	helper.assertEpsEqual(1, JW.mod(1, 2), .001);
	helper.assertEpsEqual(0, JW.mod(2, 1), .001);
	helper.assertEpsEqual(0, JW.mod(2, 2), .001);
	helper.assertEpsEqual(2, JW.mod(2, 3), .001);
	helper.assertEpsEqual(0, JW.mod(3, 1), .001);
	helper.assertEpsEqual(1, JW.mod(3, 2), .001);
	helper.assertEpsEqual(0, JW.mod(3, 3), .001);
	helper.assertEpsEqual(3, JW.mod(3, 4), .001);
	helper.assertEpsEqual(5, JW.mod(26, 7), .001);
	helper.assertEpsEqual(1, JW.mod(-1, 2), .001);
	helper.assertEpsEqual(0, JW.mod(-2, 2), .001);
	helper.assertEpsEqual(3, JW.mod(-25, 7), .001);
	helper.assertEpsEqual(.6, JW.mod(.6, 7), .001);
	helper.assertEpsEqual(1.6, JW.mod(1.6, 7), .001);
	helper.assertEpsEqual(.6, JW.mod(7.6, 7), .001);
	helper.assertEpsEqual(.7, JW.mod(7.6, 2.3), .001);
	helper.assertEpsEqual(.5, JW.mod(-7.6, 2.7), .001);
});

TestHelper.test("iid", function(assert) {
	assert.strictEqual(undefined, JW.iidForcibly(undefined));
	assert.strictEqual(null, JW.iidForcibly(null));
	assert.strictEqual(1, JW.iidForcibly(1));
	assert.strictEqual(true, JW.iidForcibly(true));
	assert.strictEqual(false, JW.iidForcibly(false));
	assert.strictEqual("", JW.iidForcibly(""));
	assert.strictEqual(undefined, JW.iidForcibly({}));
	assert.strictEqual(10, JW.iidForcibly({ _iid: 10 }));
});

TestHelper.test("destroy", function(assert, helper) {
	JW.destroyForcibly(undefined);
	JW.destroyForcibly(null);
	JW.destroyForcibly(1);
	JW.destroyForcibly(true);
	JW.destroyForcibly(false);
	JW.destroyForcibly("");
	JW.destroyForcibly({ destroy: 0 });

	helper.setExpectedOutput("hello");
	JW.destroyForcibly({
		value: 10,
		destroy: function() {
			helper.output("hello");
			assert.strictEqual(10, this.value);
		}
	});
});
