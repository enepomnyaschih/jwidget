/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwtext|jwtext]] method call. Destroy it to stop synchronization.
		 *
		 * Was used as a standalone class before jWidget 1.4.
		 * As of jWidget 1.4, [[JQuery.jwtext|jwtext]] is an easier alternative.
		 */
		export class TextUpdater extends JW.Class {
			/**
			 * @param el DOM element.
			 * @param property Source property.
			 */
			constructor(private el: JQuery, private property: JW.Property<string>) {
				super();
				this._update();
				this.own(property.changeEvent.bind(this._update, this));
			}

			private _update() {
				this.el[0].textContent = this.property.get();
			}
		}
	}
}
