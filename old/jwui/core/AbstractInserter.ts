/// <reference path="../jwui.ref.ts" />

module JW {
	export module UI {
		/**
		 * Abstract view synchronizer. See [[Inserter]] for details.
		 */
		export class AbstractInserter<T> extends JW.Class {
			/**
			 * @param source Source array.
			 * @param el Parent element.
			 */
			constructor(source: JW.AbstractArray<T>, public el: HTMLElement) {
				super();
				this.own(source.createInserter({
					addItem: this._addItem,
					removeItem: this._removeItem,
					scope: this
				}));
			}

			/**
			 * @hidden
			 */
			_getElement(item: T): HTMLElement {
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
				remove(this._getElement(item));
			}
		}
	}
}
