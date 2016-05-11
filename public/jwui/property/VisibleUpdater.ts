/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwshow|jwshow]] method call. Destroy it to stop synchronization.
		 *
		 * Was used as a standalone class before jWidget 1.4.
		 * As of jWidget 1.4, [[JQuery.jwshow|jwshow]] is an easier alternative.
		 */
		export class VisibleUpdater extends JW.Class {
			/**
			 * @param el DOM element.
			 * @param property Source property.
			 */
			constructor(private el: JQuery, private property: JW.Property<boolean>) {
				super();
				this._update();
				this.own(property.changeEvent.bind(this._update, this));
			}

			private _update() {
				this.el.css("display", this.property.get() ? "" : "none");
			}
		}
	}
}
