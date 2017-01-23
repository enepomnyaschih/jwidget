import {createArrayInserter} from '../inserter/array';
import Class from '../Class';
import IArray from '../IArray';
import * as DomUtils from '../DomUtils';

/**
 * Abstract view synchronizer. See [[Inserter]] for details.
 */
export default class AbstractInserter<T> extends Class {
	/**
	 * @param source Source array.
	 * @param el Parent element.
	 */
	constructor(source: IArray<T>, public el: HTMLElement) {
		super();
		this.own(createArrayInserter(source, {
			addItem: this._addItem,
			removeItem: this._removeItem,
			scope: this
		}));
	}

	/**
	 * @hidden
	 */
	_getElement(item: T): HTMLElement {
		item = item;
		throw new SyntaxError("Method not implemented");
	}

	/**
	 * @hidden
	 */
	_addItem(item: T, index: number) {
		var parent = this.el;
		var anchor = parent.childNodes[index];
		var child = this._getElement(item);
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
	}

	/**
	 * @hidden
	 */
	_removeItem(item: T, index: number) {
		index = index;
		DomUtils.remove(this._getElement(item));
	}
}
