/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwradio|jwradio]] method call. Destroy it to stop synchronization.
		 */
		export class RadioBinding extends JW.Class {
			/**
			 * @param el Container DOM element.
			 * @param name Radios "name" attribute.
			 * @param property Property.
			 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
			 */
			constructor(el: JQuery, name: string, property: JW.Property<string>, binding: JW.Binding = JW.UPDATE) {
				super();
				if (binding & JW.UPDATE) {
					this.own(new JW.UI.RadioUpdater(el, name, property));
				}
				if (binding & JW.WATCH) {
					this.own(new JW.UI.RadioListener(el, name, {target: property}));
				}
			}
		}
	}
}
