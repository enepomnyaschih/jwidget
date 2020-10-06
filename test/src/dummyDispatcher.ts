import {assert, expect} from "chai";
import dummyDestroyable from "../../main/src/dummyDestroyable";
import dummyDispatcher from "../../main/src/dummyDispatcher";

describe("dummyDispatcher", () => {
	it("should not call handlers", () => {
		dummyDispatcher.listen(() => {
			assert.fail();
		});
		dummyDispatcher.dispatch();
	});

	it("should return dummy destroyable when listened", () => {
		expect(dummyDispatcher.listen(() => {})).equal(dummyDestroyable);
	});

	it("should allow dummy purge calls", () => {
		dummyDispatcher.purge();
	});
});
