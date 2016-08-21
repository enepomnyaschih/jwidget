/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * @deprecated 1.4 Use [[JQuery.jwradio|jwradio]] instead.
		 */
		export class RadioListener extends JW.Class {
			public target: JW.Property<string>;
			private _selector: string;
			private update: () => void;

			constructor(private el: JQuery, private name: string, private config: RadioListener.Config = {}) {
				super();
				this.update = () => this._update();
				this.target = config.target || this.own(new JW.Property<string>());
				this._selector = "input[type=radio][name='" + name + "']";
				this._update();
				this.el.on("change", this._selector, this.update);
			}

			destroy() {
				this.el.off("change", this._selector, this.update);
				super.destroy();
			}

			private _update() {
				var radio = this.el.find(this._selector + ":checked");
				this.target.set((radio.length !== 0) ? radio.attr("value") : null);
			}
		}

		export module RadioListener {
			export interface Config {
				target?: JW.Property<string>;
			}
		}
	}
}
