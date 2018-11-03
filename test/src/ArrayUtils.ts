import {getLast, isEmpty} from "jwidget/ArrayUtils";

describe("getLast", () => {
	it("should work", () => {
		expect(getLast([])).toBe(undefined);
		expect(getLast(["a", "b", "c"])).toBe("c");
	});
});

describe("isEmpty", () => {
	it("should work", () => {
		expect(isEmpty([])).toBe(true);
		expect(isEmpty(["a", "b", "c"])).toBe(false);
	});
});
