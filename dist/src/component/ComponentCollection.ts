import {createMapper} from '../mapper/collection';
import Class from '../Class';
import Component from '../Component';
import ComponentCollectionInserter from './ComponentCollectionInserter';
import ICollection from '../ICollection';
import * as DomUtils from '../DomUtils';
import * as SetUtils from '../SetUtils';

/**
 * Child component collection wrapper in [[JW.UI.Component]].
 *
 * Returned by [[JW.UI.Component.addCollection|addCollection]] method. If you'll destroy this object, child components will be removed
 * from parent.
 */
export default class ComponentCollection extends Class {
	/**
	 * @hidden
	 */
	constructor(public parent: Component, public source: ICollection<Component>, el: JQuery) {
		super();
		SetUtils.add(parent._collections, this);

		var mapper = this.own(createMapper<Component, Component>(source, {
			createItem: (child) => {
				this.parent._initChild(child);
				return child;
			},
			destroyItem: (child) => {
				this.parent._doneChild(child);
			}
		}));

		this.own(new ComponentCollectionInserter(mapper.target, el[0]));
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		SetUtils.remove(this.parent._collections, this);
		super.destroy();
	}

	/**
	 * @inheritdoc
	 */
	_afterAppend() {
		this.source.each(DomUtils._afterAppend);
	}
}
