/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
		 */
		export class CheckedListener extends JW.Class {
			public target: JW.Property<boolean>;
			private update: () => void;

			constructor(private el: JQuery, config: CheckedListener.Config = {}) {
				super();
				this.update = () => this._update();
				this.target = config.target || this.own(new JW.Property<boolean>());
				this._update();
				this.el.bind("change", this.update);
			}

			destroy() {
				this.el.unbind("change", this.update);
				super.destroy();
			}

			private _update() {
				this.target.set(this.el.prop("checked"));
			}
		}

		export module CheckedListener {
			export interface Config {
				target?: JW.Property<boolean>;
			}
		}
	}
}
