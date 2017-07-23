[Back to index](../README.md)

# DestroyablePromise

## Consumption

	import DestroyablePromise from "jwidget/DestroyablePromise";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface **jwidget/DestroyablePromise**`<T>`
		* class [jwidget/ChainedDestroyablePromise](IProperty.md)`<T>`
		* class [jwidget/HttpRequest](Property.md)`<T>`

## Description

Extension of native Promise with [destroy](Destroyable.md#destroy) method. If some method returns **DestroyablePromise**, probably it establishes some kind of cancellable asynchronous operation and wants you to take control over its life time. Destroying the **DestroyablePromise** instance cancels the operation, so that neither **onFulfilled** nor **onRejected** callback gets called.

The next example demonstrates **DestroyablePromise** implementation for native setTimeout function.

	import ChainedDestroyablePromise from "jwidget/ChainedDestroyablePromise";
	import DestroyablePromise from "jwidget/DestroyablePromise";

	class Timeout implements DestroyablePromise<any> {
		readonly native: Promise<T>;
		private timeout: number;

		constructor(ms?: number) {
			this.native = new Promise<any>((resolve) => {
				this.timeout = setTimeout(resolve, ms);
			});
		}

		destroy() {
			clearTimeout(this.timeout);
		}

		// Typical implementation of `then` and `catch` methods - use it as the pattern.
		then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
		then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;
		then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => any): DestroyablePromise<U> {
			return new ChainedDestroyablePromise(this.native.then(onFulfilled, onRejected), this);
		}

		catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U> {
			return new ChainedDestroyablePromise(this.native.catch(onRejected), this);
		}
	}

References: [jwidget/ChainedDestroyablePromise];

Please note that neither **DestroyablePromise** implementation can extend native Promise, because it is prohibited by language specification. So the promise engine can not understand if you want to chain **DestroyablePromise** instances. You must return [native](#native) Promise to chain it properly.

	new HttpRequest($.get("/user")).then(function(user) {
		return new HttpRequest($.get(`/user/${user.id}/profile`)).native; // Required for chaining
	});



In some cases, binding destruction is not obligatory. In the next example, the component binds a property to its own element, so garbage collector will take everything away on component destruction anyway. So, it doesn't make much sense to aggregate the binding explicitly.

**Example 2.** Typical binding to own DOM element.

	import Component from "jwidget/Component";
	import template from "jwidget/template";
	import val from "jwidget/ui/val";

	@template('<div><input type="text" jwid="input"></div>')
	class App extends Component {
		renderInput(el: JQuery) {
			// el is a child element, so the binding won't
			// take effect after component destruction even without "own" call
			const value = val(el);

			// logs all input value updates to console
			value.map((value) => console.log(value));
		}
	}

## Members

See the inherited members in [jwidget/Destroyable](Destroyable.md) and [jwidget/Bindable](Bindable.md).
