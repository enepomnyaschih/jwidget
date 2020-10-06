import {expect} from "chai";
import Class from "jwidget/Class";

describe("Class", () => {
	it("should destroy owned objects in the reverse order", () => {
		let step = 0;

		const owner = new Class(),
			obj1 = {
				destroy: () => {
					expect(++step).equal(1);
				}
			},
			obj2 = {
				destroy: () => {
					expect(++step).equal(2);
				}
			};

		owner.own(obj2);
		owner.owning(obj1);
		owner.destroy();

		expect(step).equal(2);
	});

	it("should destroy owned objects before calling destroyObject", () => {
		let step = 0;

		class MyClass extends Class {

			protected destroyObject() {
				expect(++step).equal(2);
				super.destroyObject();
			}
		}

		const owner = new MyClass(),
			obj = {
				destroy: () => {
					expect(++step).equal(1);
				}
			};

		owner.own(obj);
		owner.destroy();

		expect(step).equal(2);
	});
});
