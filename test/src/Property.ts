/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {assert, expect} from "chai";
import Property from "jwidget/Property";

describe("Property", () => {
	it("should get the initial value", () => {
		expect(new Property(2).get()).equal(2);
	});

	it("should get the initial value even if silent", () => {
		expect(new Property(2, true).get()).equal(2);
	});
});

describe("Property.silent", () => {
	it("should return false if not silent", () => {
		expect(new Property(2).silent).equal(false);
	});

	it("should return true if silent", () => {
		expect(new Property(2, true).silent).equal(true);
	});
});

describe("Property.set", () => {
	it("should assign a new value", () => {
		const property = new Property(2);
		property.set(5);
		expect(property.get()).equal(5);
	});

	it("should assign a new value even if silent", () => {
		const property = new Property(2, true);
		property.set(5);
		expect(property.get()).equal(5);
	});

	it("should dispatch a message on change", () => {
		let step = 0;
		const property = new Property(2);
		property.onChange.listen(() => {
			++step;
		});
		expect(step).equal(0);
		property.set(5);
		expect(step).equal(1);
	});

	it("should pass a proper message on change", () => {
		const property = new Property(2);
		property.onChange.listen(message => {
			expect(message.oldValue).equal(2);
			expect(message.value).equal(5);
			expect(message.sender).equal(property);
		});
		property.set(5);
	});

	it("should not dispatch a message on assignment of the same value", () => {
		const property = new Property(2);
		property.onChange.listen(() => {
			assert.fail();
		});
		property.set(2);
	});

	it("should not dispatch a message on change if silent", () => {
		const property = new Property(2, true);
		property.onChange.listen(() => {
			assert.fail();
		});
		property.set(5);
	});

	it("should not destroy the value if not owned", () => {
		const property = new Property<any>({
			destroy: () => {
				assert.fail();
			}
		});
		property.set(5);
	});

	it("should not destroy the value if not owned even if silent", () => {
		const property = new Property<any>({
			destroy: () => {
				assert.fail();
			}
		}, true);
		property.set(5);
	});

	it("should destroy the value if owned", () => {
		let step = 0;
		const property = new Property<any>({
			destroy: () => {
				++step;
			}
		}).ownValue();
		expect(step).equal(0);
		property.set(5);
		expect(step).equal(1);
	});

	it("should destroy the value if owned even if silent", () => {
		let step = 0;
		const property = new Property<any>({
			destroy: () => {
				++step;
			}
		}, true).ownValue();
		expect(step).equal(0);
		property.set(5);
		expect(step).equal(1);
	});
});

describe("Property.destroy", () => {
	it("should not destroy the value if not owned", () => {
		const property = new Property<any>({
			destroy: () => {
				assert.fail();
			}
		});
		property.destroy();
	});

	it("should not destroy the value if not owned even if silent", () => {
		const property = new Property<any>({
			destroy: () => {
				assert.fail();
			}
		}, true);
		property.destroy();
	});

	it("should destroy the value if owned", () => {
		let step = 0;
		const property = new Property<any>({
			destroy: () => {
				++step;
			}
		}).ownValue();
		expect(step).equal(0);
		property.destroy();
		expect(step).equal(1);
	});

	it("should destroy the value if owned even if silent", () => {
		let step = 0;
		const property = new Property<any>({
			destroy: () => {
				++step;
			}
		}, true).ownValue();
		expect(step).equal(0);
		property.destroy();
		expect(step).equal(1);
	});
});

describe("Property.map", () => {
	it("should initialize a non-silent target property if not silent", () => {
		expect(new Property(3).map(x => x * 2).silent).equal(false);
	});

	it("should initialize a silent target property if silent", () => {
		expect(new Property(3, true).map(x => x * 2).silent).equal(true);
	});

	it("should initialize the target property with a proper value", () => {
		expect(new Property(3).map(x => x * 2).get()).equal(6);
	});

	it("should initialize the target property with a proper value event if silent", () => {
		expect(new Property(3, true).map(x => x * 2).get()).equal(6);
	});

	it("should update the target property with a changed value", () => {
		const source = new Property(3),
			target = source.map(x => x * 2);
		source.set(5);
		expect(target.get()).equal(10);
	});

	it("should not update the target property with a changed value if silent", () => {
		const source = new Property(3, true),
			target = source.map(x => x * 2);
		source.set(5);
		expect(target.get()).equal(6);
	});

	it("should change the target property only once", () => {
		let step = 0;
		const source = new Property(3),
			target = source.map(x => x * 2);
		target.onChange.listen(() => {
			++step;
		});
		expect(step).equal(0);
		source.set(5);
		expect(step).equal(1);
	});

	it("should change the target property twice in viaNull mode", () => {
		let step = 0;
		const source = new Property(3),
			target = source.map(x => x * 2, {viaNull: true});
		target.onChange.listen(({value}) => {
			if (step === 0) {
				expect(value).equal(null);
			} else if (step === 1) {
				expect(value).equal(10);
			} else {
				assert.fail();
			}
			++step;
		});
		expect(step).equal(0);
		source.set(5);
		expect(step).equal(2);
	});

	it("should call destruction callback after reassignment", () => {
		let step = 0;
		const source = new Property(3),
			target = source.map(x => x * 2, {
				destroy: value => {
					expect(value).equal(6);
					expect(step++).equal(1);
				}
			});
		target.onChange.listen(() => {
			expect(step++).equal(0);
		});
		expect(step).equal(0);
		source.set(5);
		expect(step).equal(2);
	});

	it("should call destruction callback between reassignments in viaNull mode", () => {
		let step = 0;
		const source = new Property(3),
			target = source.map(x => x * 2, {
				destroy: value => {
					expect(value).equal(6);
					expect(step++).equal(1);
				},
				viaNull: true
			});
		target.onChange.listen(({value}) => {
			if (value == null) {
				expect(step++).equal(0);
			} else if (value === 10) {
				expect(step++).equal(2);
			} else {
				assert.fail();
			}
		});
		expect(step).equal(0);
		source.set(5);
		expect(step).equal(3);
	});

	it("should call destruction callback on target destruction", () => {
		let step = 0;
		const source = new Property(3),
			target = source.map(x => x * 2, {
				destroy: value => {
					expect(value).equal(6);
					++step;
				}
			});
		expect(step).equal(0);
		target.destroy();
		expect(step).equal(1);
	});

	it("should unbind the listener on target destruction", () => {
		const source = new Property(3),
			target = source.map(x => x * 2);
		expect((<any>source.onChange)._listeners.size).equal(1);
		target.destroy();
		expect((<any>source.onChange)._listeners.size).equal(0);
	});
});
