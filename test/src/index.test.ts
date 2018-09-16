import {isUndefined} from "jwidget";

describe("isUndefined", () => {
	it("should detect undefined", () => {
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
		expect(isUndefined(() => {
		})).toBe(false);
		expect(isUndefined(/abc/i)).toBe(false);
		expect(isUndefined(new Date())).toBe(false);
	});
});
