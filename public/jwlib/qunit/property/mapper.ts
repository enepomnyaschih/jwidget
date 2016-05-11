/// <reference path="../tests.ref.ts" />

QUnit.module("property/mapper");

TestHelper.test("mapper", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");
	var target = new JW.Property<string>();

	helper.setExpectedOutput("Create 1a");
	var mapper = new JW.Mapper<string>([ source1, source2 ], {
		target: target,
		createValue: function(a: number, b: string) {
			var result = "" + a + b;
			helper.output("Create " + result);
			return result;
		},
		destroyValue: function(result: string) {
			helper.output("Destroy " + result);
		},
		scope: this
	});
	assert.strictEqual("1a", target.get());

	helper.setExpectedOutput("Create 2a", "Destroy 1a");
	source1.set(2);
	assert.strictEqual("2a", target.get());

	helper.setExpectedOutput("Destroy 2a");
	source2.set(null)
	assert.strictEqual(null, target.get());

	helper.setExpectedOutput("Create 2b");
	source2.set("b");
	assert.strictEqual("2b", target.get());

	helper.setExpectedOutput("Destroy 2b");
	mapper.destroy();
	assert.strictEqual(null, target.get());

	source1.set(3);
	source2.set("c");
	assert.strictEqual(null, target.get());
});

TestHelper.test("watchAndScope", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");
	var value = 1;
	var event = new JW.Event();
	var property = new JW.Property();
	var target = new JW.Property<string>();

	var mapper = new JW.Mapper<string>([ source1, source2 ], {
		target: target,
		createValue: function(a: number, b: string) {
			assert.strictEqual(2, arguments.length);
			return a + b + value;
		},
		scope: this
	});
	mapper.bind(event);
	mapper.watch(property);
	assert.strictEqual("1a1", target.get());

	source1.set(2);
	assert.strictEqual("2a1", target.get());

	source2.set("b");
	assert.strictEqual("2b1", target.get());

	value = 2;
	assert.strictEqual("2b1", target.get());

	event.trigger();
	assert.strictEqual("2b2", target.get());

	value = 3;
	property.set(false);
	assert.strictEqual("2b3", target.get());

	helper.setExpectedOutput();
	mapper.destroy();
	assert.strictEqual(null, target.get());

	source1.set(3);
	source2.set("c");
	event.trigger();
	property.set(true);
	assert.strictEqual(null, target.get());
});

TestHelper.test("autoTarget", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");

	var mapper = new JW.Mapper<string>([ source1, source2 ], {
		createValue: function(a: number, b: string) {
			return a + b;
		},
		scope: this
	});
	var target = mapper.target;
	assert.strictEqual("1a", target.get());

	source1.set(2);
	assert.strictEqual("2a", target.get());

	source2.set("b");
	assert.strictEqual("2b", target.get());

	mapper.destroy();
	source1.set(3);
	source2.set("c");
});

TestHelper.test("destroyValue", function(assert, helper) {
	var source = new JW.Property("a");

	helper.setExpectedOutput(
		"Create by a"
	);
	var mapper = new JW.Mapper<string>([ source ], {
		createValue: function(source: string) {
			helper.output("Create by " + source);
			return source.toUpperCase();
		},
		destroyValue: function(target: string, source: string) {
			helper.output("Destroy " + target + " by " + source);
		},
		scope: this
	});

	var target = mapper.target;
	assert.strictEqual("A", target.get());

	helper.setExpectedOutput(
		"Create by b",
		"Destroy A by a"
	);
	source.set("b");
	assert.strictEqual("B", target.get());;

	helper.setExpectedOutput(
		"Destroy B by b"
	);
	mapper.destroy();

	helper.setExpectedOutput();
	source.set("c");
});

TestHelper.test("chaining", function(assert, helper) {
	class Document extends JW.Class {
		constructor(public name: string) {
			super();
		}
	}

	class Folder extends JW.Class {
		public selectedDocument: JW.Property<Document>;

		constructor(public name: string, document: Document) {
			super();
			this.selectedDocument = this.own(new JW.Property(document));
		}
	}

	var document1 = new Document("d1");
	var document2 = new Document("d2");
	var folder1 = new Folder("f1", document1);
	var folder2 = new Folder("f2", document2);

	var selectedFolder = new JW.Property(folder1);
	var fullName = new JW.Property<string>();

	helper.setExpectedOutput(null);
	var updater = new JW.Updater([fullName], helper.output, helper);

	helper.setExpectedOutput("f1/d1");
	var mapper = new JW.Mapper<JW.Destroyable>([selectedFolder], {
		createValue: function(folder: Folder) {
			return new JW.Functor<string>([folder.selectedDocument], function(document: Document) {
				return folder.name + "/" + document.name;
			}, this, { target: fullName });
		},
		destroyValue: JW.destroy,
		scope: this
	});

	helper.setExpectedOutput("f1/d2");
	folder1.selectedDocument.set(document2);

	helper.setExpectedOutput("f2/d2");
	selectedFolder.set(folder2);

	helper.setExpectedOutput();
	mapper.destroy();
	updater.destroy();
});

TestHelper.test("chaining2", function(assert, helper) {
	class Document extends JW.Class {
		constructor(public name: string) {
			super();
		}
	}

	class Folder extends JW.Class {
		public selectedDocument: JW.Property<Document>;

		constructor(public name: string, document: Document) {
			super();
			this.selectedDocument = this.own(new JW.Property(document));
		}
	}

	var document1 = new Document("d1");
	var document2 = new Document("d2");
	var folder1 = new Folder("f1", document1);
	var folder2 = new Folder("f2", document2);

	var selectedFolder = new JW.Property(folder1);
	var fullName = new JW.Property<string>();

	helper.setExpectedOutput(null);
	var updater = new JW.Updater([fullName], helper.output, helper);

	helper.setExpectedOutput("f1/d1");
	var mapper = new JW.Mapper<JW.Destroyable>([selectedFolder], {
		createValue: function(folder: Folder) {
			return new JW.Mapper<string>([folder.selectedDocument], {
				target: fullName,
				createValue: function(document: Document) {
					return folder.name + "/" + document.name;
				},
				scope: this
			});
		},
		destroyValue: JW.destroy,
		scope: this
	});

	helper.setExpectedOutput("f1/d2");
	folder1.selectedDocument.set(document2);

	helper.setExpectedOutput("f2/d2");
	selectedFolder.set(folder2);

	helper.setExpectedOutput(null);
	mapper.destroy();
	updater.destroy();
});

TestHelper.test("acceptNull", function(assert, helper) {
	var source1 = new JW.Property(1);
	var source2 = new JW.Property("a");
	var target = new JW.Property<string>();

	helper.setExpectedOutput("Create 1a");
	var mapper = new JW.Mapper<string>([ source1, source2 ], {
		target: target,
		acceptNull: true,
		createValue: function(a: number, b: string) {
			var result = "" + a + b;
			helper.output("Create " + result);
			return result;
		},
		destroyValue: function(result: string) {
			helper.output("Destroy " + result);
		},
		scope: this
	});
	assert.strictEqual("1a", target.get());

	helper.setExpectedOutput("Create 2a", "Destroy 1a");
	source1.set(2);
	assert.strictEqual("2a", target.get());

	helper.setExpectedOutput("Create 2null", "Destroy 2a");
	source2.set(null)
	assert.strictEqual("2null", target.get());

	helper.setExpectedOutput("Create 2b", "Destroy 2null");
	source2.set("b");
	assert.strictEqual("2b", target.get());

	helper.setExpectedOutput("Destroy 2b");
	mapper.destroy();
	assert.strictEqual(null, target.get());

	source1.set(3);
	source2.set("c");
	assert.strictEqual(null, target.get());
});

TestHelper.test("null", function(assert, helper) {
	var source = new JW.Property();
	var target = new JW.Property();
	var mapper = new JW.Mapper([ source ], {
		target: target,
		createValue: function() {
			assert.ok(false);
			return null;
		},
		destroyValue: function() {
			assert.ok(false);
		},
		scope: this
	});
	mapper.destroy();
});

TestHelper.test("blank", function(assert, helper) {
	var target = new JW.Property<string>();

	helper.setExpectedOutput("Create");
	var mapper = new JW.Mapper<string>([], {
		target: target,
		createValue: function() {
			helper.output("Create");
			return "a";
		},
		destroyValue: function(x: string) {
			assert.strictEqual("a", x);
			helper.output("Destroy");
		},
		scope: this
	});
	assert.strictEqual("a", target.get());

	helper.setExpectedOutput("Destroy");
	mapper.destroy();
	assert.strictEqual(null, target.get());
});
