import {getLast} from "jwidget/ArrayUtils";

describe("getLast", () => {
	it("should work", () => {
		expect(getLast([])).toBe(undefined);
		expect(getLast(["a", "b", "c"])).toBe("c");
	});
});
