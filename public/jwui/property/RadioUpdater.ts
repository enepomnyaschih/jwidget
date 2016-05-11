/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Use [[JQuery.jwradio|jwradio]] instead.
		 */
		export class RadioUpdater extends JW.Class {
			private _selector: string;

			constructor(private el: JQuery, private name: string, private property: JW.Property<string>) {
				super();
				this._selector = "input[type=radio][name='" + name + "']";
				this._update();
				this.own(property.changeEvent.bind(this._update, this));
			}

			private _update() {
				var value = this.property.get();
				if (value != null) {
					var els = this.el.find(this._selector + "[value='" + value + "']");
					if (els.length !== 0) {
						els.prop("checked", true).change();
						return;
					}
				}
				this.el.find(this._selector + ":checked").prop("checked", false).change();
			}
		}
	}
}
