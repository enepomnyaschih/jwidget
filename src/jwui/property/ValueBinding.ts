/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwval|jwval]] method call. Destroy it to stop synchronization.
		 */
		export class ValueBinding extends JW.Class {
			/**
			 * @param el DOM element.
			 * @param property Property.
			 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
			 * @param simple
			 * If true, watch-binding listens "change" event only. Defaults to false which enables
			 * reaction to any real-time field modification.
			 */
			constructor(el: JQuery, property: JW.Property<string>, binding: JW.Binding = JW.UPDATE, simple?: boolean) {
				super();
				if (binding & JW.UPDATE) {
					this.own(new JW.UI.ValueUpdater(el, property));
				}
				if (binding & JW.WATCH) {
					this.own(new JW.UI.ValueListener(el, {target: property, simple: simple}));
				}
			}
		}
	}
}
