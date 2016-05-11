/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Current page hash (without leading "#"). As of jWidget 1.4.1, two-way bound to location.hash.
		 * This is a singleton available as [[hash]].
		 */
		export class Hash extends Property<string> {
			constructor() {
				super(location.hash.substr(1));
				new JQEventAttachment(jQuery(window), "hashchange", () => {
					this.set(location.hash.substr(1));
				});
			}

			/**
			 * Changes current page hash to the specified value.
			 *
			 * @param value New page hash value.
			 * @param replaceState If true, browser history forgets the current state, so that
			 * "Back" button returns you two steps back instead of one. Useful for automatic page redirections.
			 */
			set(value: string = "", replaceState?: boolean) {
				var oldValue = this._value;
				if (oldValue === value) {
					return;
				}
				this._value = value;
				if (replaceState && window.history && history.replaceState) {
					history.replaceState(null, "", location.pathname + "#" + value);
				} else {
					location.hash = "#" + value;
				}
				this.changeEvent.trigger({sender: this, value: value, oldValue: oldValue});
			}
		}

		/**
		 * Current page hash (without leading "#"). As of jWidget 1.4.1, two-way bound to location.hash.
		 */
		export var hash: Hash = new Hash();
	}
}
