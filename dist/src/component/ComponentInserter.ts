import AbstractInserter from '../ui/AbstractInserter';
import Component from '../Component';

/**
 * @hidden
 */
export default class ComponentInserter extends AbstractInserter<Component> {
	_getElement(item: Component): HTMLElement {
		return item.el[0];
	}

	_addItem(item: Component, index: number) {
		super._addItem(item, index);
		item._afterAppend();
	}
}
