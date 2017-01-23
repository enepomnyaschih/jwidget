import {createObserver} from '../observer';
import Class from '../Class';
import Component from '../Component';
import ICollection from '../ICollection';
import * as DomUtils from '../DomUtils';

/**
 * @hidden
 */
export default class ComponentCollectionInserter extends Class {
	private len: number = 0;

	constructor(source: ICollection<Component>, public el: HTMLElement) {
		super();
		this.own(createObserver(source, {
			addItem: this._addItem,
			removeItem: this._removeItem,
			scope: this
		}));
	}

	_addItem(item: Component) {
		var parent = this.el;
		var anchor = parent.childNodes[this.len];
		var child = item.el[0];
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
		++this.len;
		item._afterAppend();
	}

	_removeItem(item: Component) {
		DomUtils.remove(item.el[0]);
		--this.len;
	}
}
