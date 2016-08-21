/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwclass|jwclass]] method call. Destroy it to stop synchronization.
		 *
		 * Was used as a standalone class before jWidget 1.4.
		 * As of jWidget 1.4, [[JQuery.jwclass|jwclass]] is an easier alternative.
		 */
		export class ClassNameUpdater extends JW.Class {
			/**
			 * @param el DOM element.
			 * @param property Source property.
			 */
			constructor(private el: JQuery, property: JW.Property<string>) {
				super();
				this.own(new JW.Switcher([property], {
					init: function(value) { this.el.addClass(value); },
					done: function(value) { this.el.removeClass(value); },
					scope: this
				}));
			}
		}
	}
}
