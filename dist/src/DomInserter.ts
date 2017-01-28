import AbstractInserter from './ui/AbstractInserter';

/**
 * View synchronizer. Synchronizes DOM element children with the source array. Usually used in conjunction with
 * [[JW.AbstractArray.Mapper]].
 *
 *     var data = new JW.ObservableArray(["apple", "banana", "cherry"]);
 *     var elements = data.$$mapValues(function(value) {
 *         return jQuery('<option />').text(value)[0];
 *     });
 *     var inserter = new JW.UI.Inserter(elements, document.getElementById("myselect"));
 */
export default class Inserter extends AbstractInserter<HTMLElement> {
	/**
	 * @hidden
	 */
	_getElement(item: HTMLElement): HTMLElement {
		return item;
	}
}
