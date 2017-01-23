import Class from '../Class';
import Component from '../Component';
import * as DomUtils from '../DomUtils';

/**
 * @hidden
 */
export default class ComponentChild extends Class {
	name: string;
	_el: JQuery;

	constructor(public parent: Component, public child: Component) {
		super();
	}

	attach(name: string) {
		// JW.assertNull(this.name);
		this.name = name;
		this._el = this.parent._elements[name];
		this.parent._initChild(this.child);
		this.parent._elements[name] = this.child.el;
		DomUtils.replace(this._el[0], this.child.el[0], true);
		this.child._afterAppend();
	}

	detach() {
		// JW.assertString(this.name, JW.isNotBlank);
		if (this.parent._elements[this.name] === this.child.el) {
			this.parent._elements[this.name] = this._el;
		}
		DomUtils.replace(this.child.el[0], this._el[0]);
		this.parent._doneChild(this.child);
		this._el = null;
		this.name = null;
	}
}
