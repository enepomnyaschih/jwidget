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
import Bindable from "jwidget/Bindable";
import CancelToken from "jwidget/CancelToken";
import Class from "jwidget/Class";
import defer from "jwidget/defer";
import Destroyable from "jwidget/Destroyable";
import IProperty from "jwidget/IProperty";
import Property from "jwidget/Property";
import Router from "jwidget/Router";

describe("Router", () => {
	it("should initialize the target properly", () => {
		// given
		const path = new Property("inbox");

		// when
		const application = new Application(path);

		// then
		const inbox = application.router.target.get();
		assert.isTrue(inbox instanceof Inbox);

		const emailList = (inbox as Inbox).router.target.get();
		assert.isTrue(emailList instanceof EmailList);
	});

	it("should perform initial redirection if needed", async () => {
		// given
		let step = 0;
		const path = new Property("");

		// when
		const application = new Application(path);
		application.router.target.onChange.listen(({value}) => {
			switch (step++) {
				case 0:
					assert.isNull(value);
					break;
				case 1:
					assert.isTrue(value instanceof Inbox);
					break;
				default:
					assert.fail();
			}
		});

		// then
		expect(path.get()).equal("");

		const redirector = application.router.target.get();
		assert.isTrue(redirector instanceof Redirector);

		// when
		await defer(50);

		// then
		expect(path.get()).equal("inbox");

		const inbox = application.router.target.get();
		assert.isTrue(inbox instanceof Inbox);

		const emailList = (inbox as Inbox).router.target.get();
		assert.isTrue(emailList instanceof EmailList);

		expect(step).equal(2);
	});

	it("should listen path change on top level", () => {
		// given
		let step = 0;
		const path = new Property("inbox");
		const application = new Application(path);
		application.router.target.onChange.listen(({value}) => {
			switch (step++) {
				case 0:
					assert.isNull(value);
					break;
				case 1:
					assert.isTrue(value instanceof Compose);
					break;
				default:
					assert.fail();
			}
		});

		// when
		path.set("compose");

		// then
		const compose = application.router.target.get();
		assert.isTrue(compose instanceof Compose);

		expect(step).equal(2);
	});

	it("should listen path change on nested level", () => {
		// given
		let step = 0;
		const path = new Property("inbox");
		const application = new Application(path);
		const inbox = application.router.target.get() as Inbox;
		application.router.target.onChange.listen(() => {
			assert.fail();
		});
		inbox.router.target.onChange.listen(({value}) => {
			switch (step++) {
				case 0:
					assert.isNull(value);
					break;
				case 1:
					assert.isTrue(value instanceof EmailView);
					break;
				default:
					assert.fail();
			}
		});

		// when
		path.set("inbox/1");

		// then
		const emailView = inbox.router.target.get();
		assert.isTrue(emailView instanceof EmailView);

		expect(step).equal(2);
	});

	it("should detect update cycle interference", async () => {
		expect(() => {
			new Application(new Property(""), true);
		}).throw(Error, "Can't update router because its update cycle is already active. " +
			"Consider using RouteRedirector or moving URL redirection to an asyncronous callback.");
	});
});

// These classes represent examples/src/router.

export default class TestRouter extends Router<Destroyable> {
}

class Application extends Class {

	readonly router: TestRouter;

	constructor(path: IProperty<string>, useBrokenRedirector: boolean = false) {
		super();
		this.router = new TestRouter({
			path,
			handler: {
				routes: {
					"inbox": arg => new Inbox(arg, this.router),
					"compose": () => new Compose(),
					"settings": () => new Settings(),
					"": () => {
						if (useBrokenRedirector) {
							path.set("inbox");
							return null;
						}
						return new Redirector(path, "inbox", this.router);
					}
				},
				notFound: route => new NotFound(route)
			}
		});
		this.router.update();
	}
}

class Inbox extends Class {

	readonly router: Router<Destroyable>;

	constructor(path: Bindable<string>, parent: TestRouter) {
		super();
		this.router = this.own(new TestRouter({
			path,
			parent,
			name: "inbox",
			handler: id => {
				if (!id) {
					return new EmailList();
				}
				if (isNaN(+id)) {
					return new EmailNotFound(id);
				}
				return new EmailView(+id);
			}
		}));
		this.router.update();
	}
}

class EmailList extends Class {
}

class EmailNotFound extends Class {

	constructor(readonly id: string) {
		super();
	}
}

class EmailView extends Class {

	constructor(readonly id: number) {
		super();
	}
}

class Compose extends Class {
}

class Settings extends Class {
}

class NotFound extends Class {

	constructor(readonly id: string) {
		super();
	}
}

class Redirector extends Class {

	constructor(private target: IProperty<string>, private path: string, private router?: Router<any>) {
		super();
		defer(0, this.own(new CancelToken())).then(() => {
			this.target.set(this.router.getFullPath(this.path));
		});
	}
}
