import Class from '../Class';
import Component from '../Component';
import Property from '../Property';
import Switcher from '../Switcher';
import * as SetUtils from '../SetUtils';

/**
 * Replaceable child component wrapper in [[JW.UI.Component]].
 *
 * Returned by [[JW.UI.Component.addReplaceable|addReplaceable]] method. If you'll destroy this object, replaceables child component
 * will be removed from parent and element will return to its original state.
 */
export default class ComponentReplaceable extends Class {
	/**
	 * @hidden
	 */
	constructor(public parent: Component, component: Property<Component>, public id: string) {
		super();
		SetUtils.add(parent._replaceables, this);

		this.own(new Switcher([component], {
			init: (child: Component) => {
				this.parent.children.set(child, this.id);
			},
			done: () => {
				this.parent.children.remove(this.id);
			}
		}));
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		SetUtils.remove(this.parent._replaceables, this);
		super.destroy();
	}
}
