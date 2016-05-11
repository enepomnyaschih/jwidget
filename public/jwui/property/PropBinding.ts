/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Result of [[JQuery.jwprop|jwprop]] method call. Destroy it to stop synchronization.
		 */
		export class PropBinding extends JW.Class {
			/**
			 * @param el DOM element.
			 * @param prop Element's property name.
			 * @param property Property.
			 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
			 */
			constructor(el: JQuery, prop: string, property: JW.Property<boolean>, binding: JW.Binding = JW.UPDATE) {
				super();
				if (binding & JW.UPDATE) {
					this.own(new JW.UI.PropUpdater(el, prop, property));
				}
				if (prop === "checked" && (binding & JW.WATCH)) {
					this.own(new JW.UI.CheckedListener(el, {target: property}));
				}
			}
		}
	}
}
