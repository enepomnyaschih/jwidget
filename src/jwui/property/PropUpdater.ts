/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
		 */
		export class PropUpdater extends JW.Class {
			/**
			 * @param el DOM element.
			 * @param prop Element's property name.
			 * @param property Source property.
			 */
			constructor(private el: JQuery, private prop: string, private property: JW.Property<boolean>) {
				super();
				this._update();
				this.own(property.changeEvent.bind(this._update, this));
			}

			private _update() {
				this.el.prop(this.prop, this.property.get());
				if (this.prop === "checked") {
					this.el.change();
				}
			}
		}
	}
}
