import {createArrayMapper} from '../mapper/array';
import Class from '../Class';
import Component from '../Component';
import IArray from '../IArray';
import * as SetUtils from '../SetUtils';

/**
 * Child component array wrapper in [[JW.UI.Component]].
 *
 * Returned by [[JW.UI.Component.addArray|addArray]] method. If you'll destroy this object, child components will be removed
 * from parent.
 */
export default class ComponentArray extends Class {
	/**
	 * @hidden
	 */
	constructor(public parent: Component, public source: IArray<Component>, el: JQuery) {
		super();
		SetUtils.add(parent._arrays, this);

		var mapper = this.own(createArrayMapper<Component, Component>(source, {
			createItem: (child) => {
				this.parent._initChild(child);
				return child;
			},
			destroyItem: (child) => {
				this.parent._doneChild(child);
			}
		}));

		this.own(new Component.Inserter(mapper.target, el[0]));
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		JW.Set.remove(this.parent._arrays, this);
		super.destroy();
	}

	/**
	 * @inheritdoc
	 */
	_afterAppend() {
		this.source.each(_afterAppend);
	}
}
