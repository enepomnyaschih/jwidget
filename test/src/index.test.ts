import {
	apply,
	def,
	defn,
	get,
	isArray,
	isBoolean,
	isDate,
	isDefined,
	isFalsy,
	isFunction,
	isInt,
	isNil,
	isNotNil,
	isNotNull,
	isNull,
	isNumber,
	isRegExp,
	isString,
	isTruthy,
	isUndefined,
	smartCmp
} from "jwidget";
import Class from "jwidget/Class";
import Dictionary from "jwidget/Dictionary";

function emptyFn() {
}

describe("isUndefined", () => {
	it("should work", () => {
		expect(isUndefined(undefined)).toBe(true);
		expect(isUndefined(null)).toBe(false);
		expect(isUndefined(0)).toBe(false);
		expect(isUndefined(1)).toBe(false);
		expect(isUndefined(true)).toBe(false);
		expect(isUndefined(false)).toBe(false);
		expect(isUndefined('')).toBe(false);
		expect(isUndefined('lala')).toBe(false);
		expect(isUndefined({})).toBe(false);
		expect(isUndefined({length: 1})).toBe(false);
		expect(isUndefined([])).toBe(false);
		expect(isUndefined([1])).toBe(false);
		expect(isUndefined(emptyFn)).toBe(false);
		expect(isUndefined(/abc/i)).toBe(false);
		expect(isUndefined(new Date())).toBe(false);
	});
});

describe("isDefined", () => {
	it("should work", () => {
		expect(isDefined(undefined)).toBe(false);
		expect(isDefined(null)).toBe(true);
		expect(isDefined(0)).toBe(true);
		expect(isDefined(1)).toBe(true);
		expect(isDefined(true)).toBe(true);
		expect(isDefined(false)).toBe(true);
		expect(isDefined('')).toBe(true);
		expect(isDefined('lala')).toBe(true);
		expect(isDefined({})).toBe(true);
		expect(isDefined({length: 1})).toBe(true);
		expect(isDefined([])).toBe(true);
		expect(isDefined([1])).toBe(true);
		expect(isDefined(emptyFn)).toBe(true);
		expect(isDefined(/abc/i)).toBe(true);
		expect(isDefined(new Date())).toBe(true);
	});
});

describe("isNull", () => {
	it("should work", () => {
		expect(isNull(undefined)).toBe(false);
		expect(isNull(null)).toBe(true);
		expect(isNull(0)).toBe(false);
		expect(isNull(1)).toBe(false);
		expect(isNull(true)).toBe(false);
		expect(isNull(false)).toBe(false);
		expect(isNull('')).toBe(false);
		expect(isNull('lala')).toBe(false);
		expect(isNull({})).toBe(false);
		expect(isNull({length: 1})).toBe(false);
		expect(isNull([])).toBe(false);
		expect(isNull([1])).toBe(false);
		expect(isNull(emptyFn)).toBe(false);
		expect(isNull(/abc/i)).toBe(false);
		expect(isNull(new Date())).toBe(false);
	});
});

describe("isNotNull", () => {
	it("should work", () => {
		expect(isNotNull(undefined)).toBe(true);
		expect(isNotNull(null)).toBe(false);
		expect(isNotNull(0)).toBe(true);
		expect(isNotNull(1)).toBe(true);
		expect(isNotNull(true)).toBe(true);
		expect(isNotNull(false)).toBe(true);
		expect(isNotNull('')).toBe(true);
		expect(isNotNull('lala')).toBe(true);
		expect(isNotNull({})).toBe(true);
		expect(isNotNull({length: 1})).toBe(true);
		expect(isNotNull([])).toBe(true);
		expect(isNotNull([1])).toBe(true);
		expect(isNotNull(emptyFn)).toBe(true);
		expect(isNotNull(/abc/i)).toBe(true);
		expect(isNotNull(new Date())).toBe(true);
	});
});

describe("isNil", () => {
	it("should work", () => {
		expect(isNil(undefined)).toBe(true);
		expect(isNil(null)).toBe(true);
		expect(isNil(0)).toBe(false);
		expect(isNil(1)).toBe(false);
		expect(isNil(true)).toBe(false);
		expect(isNil(false)).toBe(false);
		expect(isNil('')).toBe(false);
		expect(isNil('lala')).toBe(false);
		expect(isNil({})).toBe(false);
		expect(isNil({length: 1})).toBe(false);
		expect(isNil([])).toBe(false);
		expect(isNil([1])).toBe(false);
		expect(isNil(emptyFn)).toBe(false);
		expect(isNil(/abc/i)).toBe(false);
		expect(isNil(new Date())).toBe(false);
	});
});

describe("isNotNil", () => {
	it("should work", () => {
		expect(isNotNil(undefined)).toBe(false);
		expect(isNotNil(null)).toBe(false);
		expect(isNotNil(0)).toBe(true);
		expect(isNotNil(1)).toBe(true);
		expect(isNotNil(true)).toBe(true);
		expect(isNotNil(false)).toBe(true);
		expect(isNotNil('')).toBe(true);
		expect(isNotNil('lala')).toBe(true);
		expect(isNotNil({})).toBe(true);
		expect(isNotNil({length: 1})).toBe(true);
		expect(isNotNil([])).toBe(true);
		expect(isNotNil([1])).toBe(true);
		expect(isNotNil(emptyFn)).toBe(true);
		expect(isNotNil(/abc/i)).toBe(true);
		expect(isNotNil(new Date())).toBe(true);
	});
});

describe("isFalsy", () => {
	it("should work", () => {
		expect(isFalsy(undefined)).toBe(true);
		expect(isFalsy(null)).toBe(true);
		expect(isFalsy(0)).toBe(true);
		expect(isFalsy(1)).toBe(false);
		expect(isFalsy(true)).toBe(false);
		expect(isFalsy(false)).toBe(true);
		expect(isFalsy('')).toBe(true);
		expect(isFalsy('lala')).toBe(false);
		expect(isFalsy({})).toBe(false);
		expect(isFalsy({length: 1})).toBe(false);
		expect(isFalsy([])).toBe(false);
		expect(isFalsy([1])).toBe(false);
		expect(isFalsy(emptyFn)).toBe(false);
		expect(isFalsy(/abc/i)).toBe(false);
		expect(isFalsy(new Date())).toBe(false);
	});
});

describe("isTruthy", () => {
	it("should work", () => {
		expect(isTruthy(undefined)).toBe(false);
		expect(isTruthy(null)).toBe(false);
		expect(isTruthy(0)).toBe(false);
		expect(isTruthy(1)).toBe(true);
		expect(isTruthy(true)).toBe(true);
		expect(isTruthy(false)).toBe(false);
		expect(isTruthy('')).toBe(false);
		expect(isTruthy('lala')).toBe(true);
		expect(isTruthy({})).toBe(true);
		expect(isTruthy({length: 1})).toBe(true);
		expect(isTruthy([])).toBe(true);
		expect(isTruthy([1])).toBe(true);
		expect(isTruthy(emptyFn)).toBe(true);
		expect(isTruthy(/abc/i)).toBe(true);
		expect(isTruthy(new Date())).toBe(true);
	});
});

describe("isInt", () => {
	it("should work", () => {
		expect(isInt(undefined)).toBe(false);
		expect(isInt(null)).toBe(false);
		expect(isInt(0)).toBe(true);
		expect(isInt(1)).toBe(true);
		expect(isInt(-1)).toBe(true);
		expect(isInt(0.5)).toBe(false);
		expect(isInt(-0.001)).toBe(false);
		expect(isInt(true)).toBe(false);
		expect(isInt(false)).toBe(false);
		expect(isInt('')).toBe(false);
		expect(isInt('lala')).toBe(false);
		expect(isInt({})).toBe(false);
		expect(isInt({length: 1})).toBe(false);
		expect(isInt([])).toBe(false);
		expect(isInt([1])).toBe(false);
		expect(isInt(emptyFn)).toBe(false);
		expect(isInt(/abc/i)).toBe(false);
		expect(isInt(new Date())).toBe(false);
	});
});

describe("isNumber", () => {
	it("should work", () => {
		expect(isNumber(undefined)).toBe(false);
		expect(isNumber(null)).toBe(false);
		expect(isNumber(0)).toBe(true);
		expect(isNumber(1)).toBe(true);
		expect(isNumber(-1)).toBe(true);
		expect(isNumber(0.5)).toBe(true);
		expect(isNumber(-0.001)).toBe(true);
		expect(isNumber(true)).toBe(false);
		expect(isNumber(false)).toBe(false);
		expect(isNumber('')).toBe(false);
		expect(isNumber('lala')).toBe(false);
		expect(isNumber({})).toBe(false);
		expect(isNumber({length: 1})).toBe(false);
		expect(isNumber([])).toBe(false);
		expect(isNumber([1])).toBe(false);
		expect(isNumber(emptyFn)).toBe(false);
		expect(isNumber(/abc/i)).toBe(false);
		expect(isNumber(new Date())).toBe(false);
	});
});

describe("isString", () => {
	it("should work", () => {
		expect(isString(undefined)).toBe(false);
		expect(isString(null)).toBe(false);
		expect(isString(0)).toBe(false);
		expect(isString(1)).toBe(false);
		expect(isString(true)).toBe(false);
		expect(isString(false)).toBe(false);
		expect(isString('')).toBe(true);
		expect(isString('lala')).toBe(true);
		expect(isString({})).toBe(false);
		expect(isString({length: 1})).toBe(false);
		expect(isString([])).toBe(false);
		expect(isString([1])).toBe(false);
		expect(isString(emptyFn)).toBe(false);
		expect(isString(/abc/i)).toBe(false);
		expect(isString(new Date())).toBe(false);
	});
});

describe("isBoolean", () => {
	it("should work", () => {
		expect(isBoolean(undefined)).toBe(false);
		expect(isBoolean(null)).toBe(false);
		expect(isBoolean(0)).toBe(false);
		expect(isBoolean(1)).toBe(false);
		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(false)).toBe(true);
		expect(isBoolean('')).toBe(false);
		expect(isBoolean('lala')).toBe(false);
		expect(isBoolean({})).toBe(false);
		expect(isBoolean({length: 1})).toBe(false);
		expect(isBoolean([])).toBe(false);
		expect(isBoolean([1])).toBe(false);
		expect(isBoolean(emptyFn)).toBe(false);
		expect(isBoolean(/abc/i)).toBe(false);
		expect(isBoolean(new Date())).toBe(false);
	});
});

describe("isFunction", () => {
	it("should work", () => {
		expect(isFunction(undefined)).toBe(false);
		expect(isFunction(null)).toBe(false);
		expect(isFunction(0)).toBe(false);
		expect(isFunction(1)).toBe(false);
		expect(isFunction(true)).toBe(false);
		expect(isFunction(false)).toBe(false);
		expect(isFunction('')).toBe(false);
		expect(isFunction('lala')).toBe(false);
		expect(isFunction({})).toBe(false);
		expect(isFunction({length: 1})).toBe(false);
		expect(isFunction([])).toBe(false);
		expect(isFunction([1])).toBe(false);
		expect(isFunction(emptyFn)).toBe(true);
		expect(isFunction(/abc/i)).toBe(false);
		expect(isFunction(new Date())).toBe(false);
	});
});

describe("isArray", () => {
	it("should work", () => {
		expect(isArray(undefined)).toBe(false);
		expect(isArray(null)).toBe(false);
		expect(isArray(0)).toBe(false);
		expect(isArray(1)).toBe(false);
		expect(isArray(true)).toBe(false);
		expect(isArray(false)).toBe(false);
		expect(isArray('')).toBe(false);
		expect(isArray('lala')).toBe(false);
		expect(isArray({})).toBe(false);
		expect(isArray({length: 1})).toBe(false);
		expect(isArray([])).toBe(true);
		expect(isArray([1])).toBe(true);
		expect(isArray(emptyFn)).toBe(false);
		expect(isArray(/abc/i)).toBe(false);
		expect(isArray(new Date())).toBe(false);
	});
});

describe("isRegExp", () => {
	it("should work", () => {
		expect(isRegExp(undefined)).toBe(false);
		expect(isRegExp(null)).toBe(false);
		expect(isRegExp(0)).toBe(false);
		expect(isRegExp(1)).toBe(false);
		expect(isRegExp(true)).toBe(false);
		expect(isRegExp(false)).toBe(false);
		expect(isRegExp('')).toBe(false);
		expect(isRegExp('lala')).toBe(false);
		expect(isRegExp({})).toBe(false);
		expect(isRegExp({length: 1})).toBe(false);
		expect(isRegExp([])).toBe(false);
		expect(isRegExp([1])).toBe(false);
		expect(isRegExp(emptyFn)).toBe(false);
		expect(isRegExp(/abc/i)).toBe(true);
		expect(isRegExp(new RegExp("abc"))).toBe(true);
		expect(isRegExp(new Date())).toBe(false);
	});
});

describe("isDate", () => {
	it("should work", () => {
		expect(isDate(undefined)).toBe(false);
		expect(isDate(null)).toBe(false);
		expect(isDate(0)).toBe(false);
		expect(isDate(1)).toBe(false);
		expect(isDate(true)).toBe(false);
		expect(isDate(false)).toBe(false);
		expect(isDate('')).toBe(false);
		expect(isDate('lala')).toBe(false);
		expect(isDate({})).toBe(false);
		expect(isDate({length: 1})).toBe(false);
		expect(isDate([])).toBe(false);
		expect(isDate([1])).toBe(false);
		expect(isDate(emptyFn)).toBe(false);
		expect(isDate(/abc/i)).toBe(false);
		expect(isDate(new RegExp("abc"))).toBe(false);
		expect(isDate(new Date())).toBe(true);
	});
});

describe("def", () => {
	it("should work", () => {
		expect(def(undefined, 10)).toBe(10);
		expect(def(null, 10)).toBe(null);
		expect(def(0, 10)).toBe(0);
		expect(def(1, 10)).toBe(1);
		expect(def<any>(true, 10)).toBe(true);
		expect(def<any>(false, 10)).toBe(false);
		expect(def<any>('', 10)).toBe('');
		expect(def<any>('lala', 10)).toBe('lala');

		const a = {};
		const b = {length: 1};
		const c: any[] = [];
		const d = [1];

		expect(def(a, 10)).toBe(a);
		expect(def<any>(b, 10)).toBe(b);
		expect(def<any>(c, 10)).toBe(c);
		expect(def<any>(d, 10)).toBe(d);
	});
});

describe("defn", () => {
	it("should work", () => {
		expect(defn(undefined, 10)).toBe(10);
		expect(defn(null, 10)).toBe(10);
		expect(defn(0, 10)).toBe(0);
		expect(defn(1, 10)).toBe(1);
		expect(defn<any>(true, 10)).toBe(true);
		expect(defn<any>(false, 10)).toBe(false);
		expect(defn<any>('', 10)).toBe('');
		expect(defn<any>('lala', 10)).toBe('lala');

		const a = {};
		const b = {length: 1};
		const c: any[] = [];
		const d = [1];

		expect(defn(a, 10)).toBe(a);
		expect(defn<any>(b, 10)).toBe(b);
		expect(defn<any>(c, 10)).toBe(c);
		expect(defn<any>(d, 10)).toBe(d);
	});
});

describe("defn", () => {
	it("should work", () => {
		expect(defn(undefined, 10)).toBe(10);
		expect(defn(null, 10)).toBe(10);
		expect(defn(0, 10)).toBe(0);
		expect(defn(1, 10)).toBe(1);
		expect(defn<any>(true, 10)).toBe(true);
		expect(defn<any>(false, 10)).toBe(false);
		expect(defn<any>('', 10)).toBe('');
		expect(defn<any>('lala', 10)).toBe('lala');

		const a = {};
		const b = {length: 1};
		const c: any[] = [];
		const d = [1];

		expect(defn(a, 10)).toBe(a);
		expect(defn<any>(b, 10)).toBe(b);
		expect(defn<any>(c, 10)).toBe(c);
		expect(defn<any>(d, 10)).toBe(d);
	});
});

describe("apply", () => {
	const a: Dictionary<any> = {
		a: undefined,
		b: null,
		c: 0,
		d: 1,
		e: true,
		f: false,
		g: '',
		h: 'lala',
		i: {},
		j: {length: 1},
		k: [],
		l: [1],
		n: 10
	};

	const b: Dictionary<any> = {
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

	function getFieldSet(fields: string[]) {
		const o: Dictionary<boolean> = {};
		for (let i = 0; i < fields.length; ++i) {
			o[fields[i]] = true;
		}
		return o;
	}

	function testApply(c: Dictionary<any>, fields: string[]) {
		const fieldSet = getFieldSet(fields);
		for (let i in a) {
			expect(c[i]).toBe(fieldSet[i] ? b[i] : a[i]);
		}
	}

	it("should work", () => {
		const c = apply({}, a);
		testApply(c, []);

		const d = apply(c, b);
		expect(d).toBe(c);

		testApply(c, ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"]);
	});
});

describe("smartCmp", () => {
	it("should compare numbers", () => {
		expect(smartCmp(10, 10)).toBe(0);
		expect(smartCmp(20, 10)).toBe(1);
		expect(smartCmp(10, 20)).toBe(-1);
	});

	it("should compare strings", () => {
		expect(smartCmp("10", "10")).toBe(0);
		expect(smartCmp("20", "10")).toBe(1);
		expect(smartCmp("10", "20")).toBe(-1);
		expect(smartCmp("100", "10")).toBe(1);
		expect(smartCmp("10", "100")).toBe(-1);
		expect(smartCmp("aB", "Ab")).toBe(1);
		expect(smartCmp("ab2", "ab10")).toBe(1);
	});

	it("should compare arrays", () => {
		expect(smartCmp(["aB"], ["Ab"])).toBe(1);
		expect(smartCmp(["ab", "cd"], ["ab", "cd"])).toBe(0);
		expect(smartCmp(["ab", "ce"], ["ab", "cd"])).toBe(1);
		expect(smartCmp(["ab", "cd"], ["ab", "ce"])).toBe(-1);
		expect(smartCmp(["ab", "cd", "ef"], ["ab", "cd"])).toBe(1);
		expect(smartCmp(["ab", "cd"], ["ab", "cd", "ef"])).toBe(-1);
		expect(smartCmp(["ab", "cd"], ["ab!cd"])).toBe(-1);
	});

	it("should compare booleans", () => {
		expect(smartCmp(false, false)).toBe(0);
		expect(smartCmp(false, true)).toBe(-1);
		expect(smartCmp(true, false)).toBe(1);
		expect(smartCmp(true, true)).toBe(0);
	});

	it("should compare identifiables", () => {
		const x = new Class(),
			y = new Class();
		expect(smartCmp(x, x)).toBe(0);
		expect(smartCmp(x, y)).toBe(-1);
		expect(smartCmp(y, x)).toBe(1);
		expect(smartCmp(y, y)).toBe(0);
	});

	it("should compare types", () => {
		expect(smartCmp(null, undefined)).toBe(1);
		expect(smartCmp([], null)).toBe(1);
		expect(smartCmp(true, [])).toBe(1);
		expect(smartCmp(new Class(), true)).toBe(1);
		expect(smartCmp(1, new Class())).toBe(1);
		expect(smartCmp("", 1)).toBe(1);

		expect(smartCmp(undefined, null)).toBe(-1);
		expect(smartCmp(null, [])).toBe(-1);
		expect(smartCmp([], true)).toBe(-1);
		expect(smartCmp(true, new Class())).toBe(-1);
		expect(smartCmp(new Class(), 1)).toBe(-1);
		expect(smartCmp(1, "")).toBe(-1);
	});

	it("should support case insensitive comparison", () => {
		expect(smartCmp("aB", "Ab", {caseInsensitive: true})).toBe(0);
		expect(smartCmp("aBc", "Ab", {caseInsensitive: true})).toBe(1);
		expect(smartCmp("aB", "Abc", {caseInsensitive: true})).toBe(-1);
		expect(smartCmp(["aB"], ["Ab"], {caseInsensitive: true})).toBe(0);
		expect(smartCmp(["aBc"], ["Ab"], {caseInsensitive: true})).toBe(1);
		expect(smartCmp(["aB"], ["Abc"], {caseInsensitive: true})).toBe(-1);
	});

	it("should support string with numbers comparison", () => {
		expect(smartCmp("", "", {compareNumbersInStrings: true})).toBe(0);
		expect(smartCmp("a", "b", {compareNumbersInStrings: true})).toBe(-1);
		expect(smartCmp("a", "a", {compareNumbersInStrings: true})).toBe(0);
		expect(smartCmp("2", "10", {compareNumbersInStrings: true})).toBe(-1);
		expect(smartCmp("ab2", "ab10", {compareNumbersInStrings: true})).toBe(-1);
		expect(smartCmp("ab2", "Ab10", {compareNumbersInStrings: true})).toBe(1);
		expect(smartCmp("ab2c", "ab10", {compareNumbersInStrings: true})).toBe(-1);
		expect(smartCmp("ab10c", "ab10", {compareNumbersInStrings: true})).toBe(1);
		expect(smartCmp("ab2", "ab02", {compareNumbersInStrings: true})).toBe(0);
		expect(smartCmp("ab-2", "ab2", {compareNumbersInStrings: true})).toBe(1);
		expect(smartCmp("ab2cd4ef6gh", "ab2cd4ef6gh", {compareNumbersInStrings: true})).toBe(0);
		expect(smartCmp("ab2cd4ef6gh", "ab2cd4ef6gj", {compareNumbersInStrings: true})).toBe(-1);
		expect(smartCmp("ab2cd4ef6gh", "ab2cd4ef22gh", {compareNumbersInStrings: true})).toBe(-1);
	});

	it("should support combined string comparison", () => {
		expect(smartCmp("", "", {caseInsensitive: true, compareNumbersInStrings: true})).toBe(0);
		expect(smartCmp("aB02", "Ab2", {caseInsensitive: true, compareNumbersInStrings: true})).toBe(0);
		expect(smartCmp("ab2cd4ef6gh", "AB2CD4EF22GH", {
			caseInsensitive: true,
			compareNumbersInStrings: true
		})).toBe(-1);
	});
});

describe("get", () => {
	it("should work", () => {
		const api: any = {
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

		expect(get(api.details)).toBe("/details");
		expect(get(api, "details")).toBe("/details");
		expect(get(api, ["extractor", "status"])).toBe("/status");

		expect(get(api.lala)).toBe(undefined);
		expect(get(api, ["extractor", "launch", "now"])).toBe(undefined);
		expect(get(api, ["extractor", "run", "now"])).toBe(undefined);

		expect(get(api, ["calculationlines", 0])).toBe("/zero");
	});
});
