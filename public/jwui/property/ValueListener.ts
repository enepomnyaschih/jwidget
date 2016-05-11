/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
		 */
		export class ValueListener extends JW.Class {
			public target: JW.Property<string>;
			private simple: boolean;
			private _timer: number;
			private update: () => void;

			constructor(private el: JQuery, config: ValueListener.Config = {}) {
				super();
				this.update = () => this._update();
				this.target = config.target || this.own(new JW.Property<string>());
				this.simple = config.simple || !isLifeInput(el);
				this.update();
				this.el.bind("change", this.update);
				if (!this.simple) {
					this._timer = setInterval(this.update, 100);
				}
			}

			destroy() {
				if (!this.simple) {
					clearInterval(this._timer);
				}
				this.el.unbind("change", this.update);
				super.destroy();
			}

			_update() {
				this.target.set(this.el.val());
			}
		}

		export module ValueListener {
			export interface Config {
				target?: JW.Property<string>;
				simple?: boolean;
			}
		}
	}
}
