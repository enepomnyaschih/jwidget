/// <reference path="../tests.ref.ts" />

QUnit.module("core/class");

TestHelper.test("own", function(assert, helper) {
	class Cls extends JW.Class {
		constructor(private value: string) {
			super();
		}

		destroyObject() {
			helper.output("destroy " + this.value);
			super.destroyObject();
		}
	}

	var a = new Cls("a");
	var b = new Cls("b");
	var c = new Cls("c");
	var d = new Cls("d");
	a.own(b);
	a.own(c);
	b.own(d);
	helper.setExpectedOutput(
		"destroy c",
		"destroy d",
		"destroy b",
		"destroy a"
	);
	a.destroy();
});

TestHelper.test("coverSample", function(assert, helper) {
	class Book extends JW.Class {
		cover: Cover = this.own(new Cover());

		destroyObject() {
			helper.output("Destroying book");
			super.destroyObject();
		}
	}

	class Cover implements JW.Destroyable {
		destroy() {
			helper.output("Destroying cover");
		}
	}

	var book = new Book();

	helper.setExpectedOutput(
		"Destroying cover",
		"Destroying book"
	);
	book.destroy();
});
