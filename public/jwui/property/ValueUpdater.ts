/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
		 */
		export class ValueUpdater extends JW.Class {
			constructor(private el: JQuery, private property: JW.Property<string>) {
				super();
				this._update();
				this.own(property.changeEvent.bind(this._update, this));
			}

			private _update() {
				this.el.val(this.property.get());
			}
		}
	}
}
