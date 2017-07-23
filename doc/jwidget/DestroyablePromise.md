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

	const chain = new HttpRequest($.get("/user")).then(function(user) {
		// Chain DestroyablePromise with another DestroyablePromise
		return new HttpRequest($.get(`/user/${user.id}/profile`));
	}).then(function(profile) {
		// Chain DestroyablePromise with native Promise
		return new Promise(function(resolve) {
			setTimeout(resolve, 1000);
		});
	}).then(function() {
		// Further chaining with DestroyablePromise is allowed
		return new HttpRequest($.get("/done"));
	}).catch(function(error) {
		console.error(error);
	});

	// ...later
	chain.destroy();

Please keep in mind that destroying the chain during the standard Promise waiting won't result in operation cancelling. In the example above, if you destroy the chain during any of three HTTP requests, it will cancel the request and interrupt the chain. If you destroy the chain during setTimeout operation, the chain won't progress further on, but the timeout promise will still get resolved in time. So, to make sure that the promise destruction works properly, please wrap all your promises with **DestroyablePromise**.

Destroying the chained promise will result in cancelling of all promises/operations **before** the end of this chain, **not after**. So, in the example above, if you continue the chain from `chain` instance, and destroy the `chain` object after the third HTTP request completion, it won't do any impact. To cancel the chained operations, destroy the last promise in this chain.

jWidget provides a bunch of built-in **DestroyablePromise** implementations for you to work with:

* [jwidget/Timeout](Timeout.md) - Destroyable wrapper around setTimeout.
* [jwidget/HttpRequest](HttpRequest.md) - Destroyable wrapper around [jQuery.ajax](http://api.jquery.com/jquery.ajax/).
* [jwidget/AllPromise](AllPromise.md) - Destroyable wrapper around [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
* [jwidget/RacePromise](RacePromise.md) - Destroyable wrapper around [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

## Properties

### native

	readonly native: Promise<T>

Native Promise instance this **DestroyablePromise** is wrapped around.

## Methods

See the inherited methods in [jwidget/Destroyable](Destroyable.md).

### then

	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;

Reference: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Works the same way as native Promise's [then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method with two differences:

* Supports **DestroyablePromise** as callback result for chaining.
* Returns **DestroyablePromise** instance which destroys the whole chain.

### catch

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>

Reference: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Works the same way as native Promise's [catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method with two differences:

* Supports **DestroyablePromise** as callback result for chaining.
* Returns **DestroyablePromise** instance which destroys the whole chain.
