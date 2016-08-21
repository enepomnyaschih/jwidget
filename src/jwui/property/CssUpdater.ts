/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwcss|jwcss]] method call. Destroy it to stop synchronization.
		 *
		 * Was used as a standalone class before jWidget 1.4.
		 * As of jWidget 1.4, [[JQuery.jwcss|jwcss]] is an easier alternative.
		 */
		export class CssUpdater extends JW.Class {
			/**
			 * @param el DOM element.
			 * @param style CSS style name.
			 * @param property Source property.
			 */
			constructor(private el: JQuery, private style: string, private property: JW.Property<any>) {
				super();
				this._update();
				this.own(property.changeEvent.bind(this._update, this));
			}

			private _update() {
				this.el.css(this.style, this.property.get());
			}
		}
	}
}
