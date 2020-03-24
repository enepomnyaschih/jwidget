import {expect} from "chai";
import {getLast, isEmpty} from "jwidget/ArrayUtils";

describe("getLast", () => {
	it("should work", () => {
		expect(getLast([])).equal(undefined);
		expect(getLast(["a", "b", "c"])).equal("c");
	});
});

describe("isEmpty", () => {
	it("should work", () => {
		expect(isEmpty([])).equal(true);
		expect(isEmpty(["a", "b", "c"])).equal(false);
	});
});
