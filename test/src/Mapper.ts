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
import Mapper, {mapProperties} from "jwidget/Mapper";
import Property from "jwidget/Property";
import {sum} from "jwidget/Reducer";

describe("Mapper", () => {
	it("should create a new target by default", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true),
			mapper = new Mapper([source1, source2], (a, b) => a + b);
		expect(mapper.target).not.equal(source1);
		expect(mapper.target).not.equal(source2);
	});

	it("should use the existing target if specified", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true),
			target = new Property(0),
			mapper = new Mapper([source1, source2], (a, b) => a + b, {target});
		expect(mapper.target).equal(target);
	});

	it("should initialize a silent target property if there are no sources", () => {
		expect(new Mapper([], () => 2).target.silent).equal(true);
	});

	it("should initialize a silent target property if all sources are silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true);
		expect(new Mapper([source1, source2], (a, b) => a + b).target.silent).equal(true);
	});

	it("should initialize a non-silent target property if some sources are not silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3);
		expect(new Mapper([source1, source2], (a, b) => a + b).target.silent).equal(false);
	});

	it("should initialize the target property with a proper value if there are no sources", () => {
		expect(new Mapper([], () => 2).target.get()).equal(2);
	});

	it("should initialize the target property with a proper value if all sources are silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true);
		expect(new Mapper([source1, source2], (a, b) => a + b).target.get()).equal(5);
	});

	it("should initialize the target property with a proper value if some sources are not silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3);
		expect(new Mapper([source1, source2], (a, b) => a + b).target.get()).equal(5);
	});

	it("should update the target property with a changed value", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			mapper = new Mapper([source1, source2], (a, b) => a + b);
		source2.set(6);
		expect(mapper.target.get()).equal(8);
	});

	it("should change the target property only once", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			mapper = new Mapper([source1, source2], (a, b) => a + b);
		mapper.target.onChange.listen(() => {
			++step;
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(1);
	});

	it("should change the target property twice in viaNull mode", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			mapper = new Mapper([source1, source2], (a, b) => a + b, {viaNull: true});
		mapper.target.onChange.listen(({value}) => {
			if (step === 0) {
				expect(value).equal(null);
			} else if (step === 1) {
				expect(value).equal(8);
			} else {
				assert.fail();
			}
			++step;
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(2);
	});

	it("should call destruction callback after reassignment", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			mapper = new Mapper([source1, source2], (a, b) => a + b, {
				destroy: value => {
					expect(value).equal(5);
					expect(step++).equal(1);
				}
			})
		mapper.target.onChange.listen(() => {
			expect(step++).equal(0);
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(2);
	});

	it("should call destruction callback between reassignments in viaNull mode", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			mapper = new Mapper([source1, source2], (a, b) => a + b, {
				destroy: value => {
					expect(value).equal(5);
					expect(step++).equal(1);
				},
				viaNull: true
			});
		mapper.target.onChange.listen(({value}) => {
			if (value == null) {
				expect(step++).equal(0);
			} else if (value === 8) {
				expect(step++).equal(2);
			} else {
				assert.fail();
			}
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(3);
	});

	it("should call destruction callback on destruction", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			mapper = new Mapper([source1, source2], (a, b) => a + b, {
				destroy: value => {
					expect(value).equal(5);
					++step;
				}
			});
		expect(step).equal(0);
		mapper.destroy();
		expect(step).equal(1);
	});

	it("should leave the target's current value on destruction if no destruction callback specified", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = new Property(0),
			mapper = new Mapper([source1, source2], (a, b) => a + b, {target});
		source2.set(6);
		mapper.destroy();
		expect(target.get()).equal(8);
	});

	it("should reset the target to null on destruction if a destruction callback is specified", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = new Property(0),
			mapper = new Mapper([source1, source2], (a, b) => a + b, {
				target,
				destroy: () => {}
			});
		source2.set(6);
		mapper.destroy();
		expect(target.get()).equal(null);
	});

	it("should unbind the listener on destruction", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			mapper = new Mapper([source1, source2], (a, b) => a + b);
		expect((<any>source2.onChange)._listeners.size).equal(1);
		mapper.destroy();
		expect((<any>source2.onChange)._listeners.size).equal(0);
	});
});

describe("mapProperties(function)", () => {
	it("should initialize a silent target property if there are no sources", () => {
		expect(mapProperties([], () => 2).silent).equal(true);
	});

	it("should initialize a silent target property if all sources are silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true);
		expect(mapProperties([source1, source2], (a, b) => a + b).silent).equal(true);
	});

	it("should initialize a non-silent target property if some sources are not silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3);
		expect(mapProperties([source1, source2], (a, b) => a + b).silent).equal(false);
	});

	it("should initialize the target property with a proper value if there are no sources", () => {
		expect(mapProperties([], () => 2).get()).equal(2);
	});

	it("should initialize the target property with a proper value if all sources are silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true);
		expect(mapProperties([source1, source2], (a, b) => a + b).get()).equal(5);
	});

	it("should initialize the target property with a proper value if some sources are not silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3);
		expect(mapProperties([source1, source2], (a, b) => a + b).get()).equal(5);
	});

	it("should update the target property with a changed value", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], (a, b) => a + b);
		source2.set(6);
		expect(target.get()).equal(8);
	});

	it("should change the target property only once", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], (a, b) => a + b);
		target.onChange.listen(() => {
			++step;
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(1);
	});

	it("should change the target property twice in viaNull mode", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], (a, b) => a + b, {viaNull: true});
		target.onChange.listen(({value}) => {
			if (step === 0) {
				expect(value).equal(null);
			} else if (step === 1) {
				expect(value).equal(8);
			} else {
				assert.fail();
			}
			++step;
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(2);
	});

	it("should call destruction callback after reassignment", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], (a, b) => a + b, {
				destroy: value => {
					expect(value).equal(5);
					expect(step++).equal(1);
				}
			});
		target.onChange.listen(() => {
			expect(step++).equal(0);
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(2);
	});

	it("should call destruction callback between reassignments in viaNull mode", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], (a, b) => a + b, {
				destroy: value => {
					expect(value).equal(5);
					expect(step++).equal(1);
				},
				viaNull: true
			});
		target.onChange.listen(({value}) => {
			if (value == null) {
				expect(step++).equal(0);
			} else if (value === 8) {
				expect(step++).equal(2);
			} else {
				assert.fail();
			}
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(3);
	});

	it("should call destruction callback on target destruction", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], (a, b) => a + b, {
				destroy: value => {
					expect(value).equal(5);
					++step;
				}
			});
		expect(step).equal(0);
		target.destroy();
		expect(step).equal(1);
	});

	it("should unbind the listener on target destruction", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], (a, b) => a + b);
		expect((<any>source2.onChange)._listeners.size).equal(1);
		target.destroy();
		expect((<any>source2.onChange)._listeners.size).equal(0);
	});
});

describe("mapProperties(reducer)", () => {
	it("should initialize a silent target property if there are no sources", () => {
		expect(mapProperties([], sum).silent).equal(true);
	});

	it("should initialize a silent target property if all sources are silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true);
		expect(mapProperties([source1, source2], sum).silent).equal(true);
	});

	it("should initialize a non-silent target property if some sources are not silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3);
		expect(mapProperties([source1, source2], sum).silent).equal(false);
	});

	it("should initialize the target property with a proper value if there are no sources", () => {
		expect(mapProperties([], sum).get()).equal(0);
	});

	it("should initialize the target property with a proper value if all sources are silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3, true);
		expect(mapProperties([source1, source2], sum).get()).equal(5);
	});

	it("should initialize the target property with a proper value if some sources are not silent", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3);
		expect(mapProperties([source1, source2], sum).get()).equal(5);
	});

	it("should update the target property with a changed value", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], sum);
		source2.set(6);
		expect(target.get()).equal(8);
	});

	it("should change the target property only once", () => {
		let step = 0;
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], sum);
		target.onChange.listen(() => {
			++step;
		});
		expect(step).equal(0);
		source2.set(6);
		expect(step).equal(1);
	});

	it("should unbind the listener on target destruction", () => {
		const source1 = new Property(2, true),
			source2 = new Property(3),
			target = mapProperties([source1, source2], sum);
		expect((<any>source2.onChange)._listeners.size).equal(1);
		target.destroy();
		expect((<any>source2.onChange)._listeners.size).equal(0);
	});
});
