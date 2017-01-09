/// <reference types="jquery" />

import {Binding, UPDATE, WATCH} from '../../Core';
import Class from '../../Class';
import Property from '../../Property';
import ValueListener from './ValueListener';
import ValueUpdater from './ValueUpdater';

/**
 * Result of [[JQuery.jwval|jwval]] method call. Destroy it to stop synchronization.
 */
class ValueBinding extends Class {
	/**
	 * @param el DOM element.
	 * @param property Property.
	 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
	 * @param simple
	 * If true, watch-binding listens "change" event only. Defaults to false which enables
	 * reaction to any real-time field modification.
	 */
	constructor(el: JQuery, property: Property<string>, binding: Binding = UPDATE, simple?: boolean) {
		super();
		if (binding & UPDATE) {
			this.own(new ValueUpdater(el, property));
		}
		if (binding & WATCH) {
			this.own(new ValueListener(el, {target: property, simple: simple}));
		}
	}
}

export default ValueBinding;
