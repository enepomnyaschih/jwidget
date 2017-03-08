import {isArray} from "../Core";

export default function() {
	it("should return true for array", function() {
		expect(isArray([])).toBe(true);
	});
	it("should return false for non array", function() {
		expect(isArray(null)).toBe(false);
	});
};
