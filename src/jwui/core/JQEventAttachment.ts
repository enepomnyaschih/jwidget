/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwon|jwon]] method call. Destroy it to unbind event handler.
		 */
		export class JQEventAttachment extends JW.Class {
			private selector: string;
			private handler: (eventObject: JQueryEventObject) => any;

			/**
			 * Creates the attachment, subscribes to the event. Shorthand: [[JQuery.jwon|jwon]]
			 * @param el jQuery element collection.
			 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
			 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
			 * @param scope Function call scope.
			 */
			constructor(el: JQuery, events: string, handler: (eventObject: JQueryEventObject) => any, scope?: any)

			/**
			 * Creates the attachment, subscribes to the event. Shorthand: [[JQuery.jwon|jwon]]
			 * @param el jQuery element collection.
			 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
			 * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
			 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
			 * @param scope Function call scope.
			 */
			constructor(el: JQuery, events: string, selector: string, handler: (eventObject: JQueryEventObject) => any, scope?: any)
			constructor(private el: JQuery, private events: string, selector: any, handler?: any, scope?: any) {
				super();
				if (typeof selector === "function" || typeof selector === "boolean") {
					scope = handler;
					handler = selector;
					selector = null;
				}
				this.selector = selector;
				if (scope && typeof handler === "function") {
					this.handler = function(eventObject) {
						return handler.call(scope || this, eventObject, this);
					};
				} else {
					this.handler = handler;
				}
				el.on(events, this.selector, this.handler);
			}

			/**
			 * @inheritdoc
			 */
			destroyObject() {
				this.el.off(this.events, this.selector, this.handler);
				super.destroyObject();
			}
		}
	}
}
