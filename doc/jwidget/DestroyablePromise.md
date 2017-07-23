[Back to index](../README.md)

# DestroyablePromise

## Consumption

	import DestroyablePromise from "jwidget/DestroyablePromise";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface **jwidget/DestroyablePromise**`<T>`
		* class [jwidget/AbstractDestroyablePromise](AbstractDestroyablePromise.md)`<T>`

## Description

Extension of native [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with [destroy](Destroyable.md#destroy) method. If some method returns **DestroyablePromise**, probably it establishes some kind of cancellable asynchronous operation and wants you to take control over its life time. Destroying the **DestroyablePromise** instance cancels the operation, so that neither **onFulfilled** nor **onRejected** callback gets called.

**Example 1.** DestroyablePromise implementation for native setTimeout function.

	import AbstractDestroyablePromise from "jwidget/AbstractDestroyablePromise";

	class Timeout extends AbstractDestroyablePromise<any> {
		private timeout: number;

		constructor(ms: number) {
			let timeout;
			super(new Promise((resolve) => {
				// TypeScript disallows direct access to `this` before return from `super` call
				timeout = setTimeout(resolve, ms);
			}));
			this.timeout = timeout;
		}

		protected destroyObject() {
			clearTimeout(this.timeout);
			super.destroyObject();
		}
	}

Reference: [destroyObject](Class.md#destroyobject).

[jwidget/AbstractDestroyablePromise](AbstractDestroyablePromise.md) provides a built-in implementation for promise chaining via [then](#then) and [catch](#catch) methods.

Please note that **DestroyablePromise** implementation can not extend native Promise, because it is prohibited by ECMAScript specification. So you can not chain native Promise with **DestroyablePromise**, because native Promise won't treat **DestroyablePromise** as a Promise to chain with. However, you can freely chain **DestroyablePromise** with both **DestroyablePromise** and native Promise.

**Example 2.** DestroyablePromise chaining.

	const chain = new HttpRequest($.get("/user")).then((user) => {
		// Chain DestroyablePromise with another DestroyablePromise
		return new HttpRequest($.get(`/user/${user.id}/profile`));
	}).then((profile) => {
		// Chain DestroyablePromise with native Promise
		return new Promise((resolve) => setTimeout(resolve, 1000));
	}).then(() => {
		// Further chaining with DestroyablePromise is allowed
		return new HttpRequest($.get("/done"));
	}).catch((error) => {
		console.error(error);
	});

	// ...later
	chain.destroy();

Please keep in mind that destroying the chain during the standard Promise waiting won't result in operation cancelling. In the example above, if you destroy the chain during any of three HTTP requests, it will cancel the request and interrupt the chain. If you destroy the chain during setTimeout operation, the chain won't progress further on, but the timeout promise will still get resolved in time. So, to make sure that the promise destruction works properly, please wrap all your promises with **DestroyablePromise**.

Destroying the chained promise will result in cancelling of all promises/operations **before** the end of this chain, **not after**. So, in the third case below, `chain` object destruction won't do any impact.

**Example 3.** Chain destruction logic demonstration.

	const chain = new Timeout(1000).then(function() {
		return new Timeout(1000);
	});

	const nextChain = chain.then(function() {
		return new Timeout(1000);
	});

	nextChain.then(function() {
		console.log("Fail!")
	});

	// Case 1: This test would cancel the chain properly
	setTimeout(() => chain.destroy(), 500);

	// Case 2: This too
	setTimeout(() => chain.destroy(), 1500);

	// Case 3: This test would fail, because `chain` object would already be resolved
	setTimeout(() => chain.destroy(), 2500); // no impact

	// Case 4: The best way to fix the problem is to destroy the whole chain
	setTimeout(() => nextChain.destroy(), 2500);

jWidget provides a bunch of built-in **DestroyablePromise** implementations for you to work with:

* [jwidget/Timeout](Timeout.md) - Destroyable wrapper around setTimeout.
* [jwidget/HttpRequest](HttpRequest.md) - Destroyable wrapper around [jQuery.ajax](http://api.jquery.com/jquery.ajax/).
* [jwidget/AllPromise](AllPromise.md) - Destroyable wrapper around [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
* [jwidget/RacePromise](RacePromise.md) - Destroyable wrapper around [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

## Properties

### native

	readonly native: Promise<T>

Native [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) instance this **DestroyablePromise** is wrapped around.

## Methods

See the inherited methods in [jwidget/Destroyable](Destroyable.md).

### then

	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;

Works the same way as native Promise's [then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method with two differences:

* Supports **DestroyablePromise** as callback result for chaining.
* Returns **DestroyablePromise** instance which destroys the whole chain.

### catch

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>

Works the same way as native Promise's [catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method with two differences:

* Supports **DestroyablePromise** as callback result for chaining.
* Returns **DestroyablePromise** instance which destroys the whole chain.
