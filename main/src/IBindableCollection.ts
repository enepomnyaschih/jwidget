/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import DestroyableReadonlyBindableCollection from './DestroyableReadonlyBindableCollection';
import IClass from './IClass';

/**
 * Extension of DestroyableReadonlyCollection with modification methods.
 */
interface IBindableCollection<T> extends IClass, DestroyableReadonlyBindableCollection<T> {
	/**
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 */
	ownItems(): this;

	/**
	 * Removes the first occurrence of the item in the collection.
	 * @param item Item to remove.
	 */
	removeItem(item: T): void;

	/**
	 * Removes all occurrences of the items in the collection.
	 * For efficient performance, you should define an optimal getKey callback for this collection.
	 * @param items Items to remove.
	 */
	removeItems(items: T[]): void;

	/**
	 * Clears the collection and dispatches a cleanup message.
	 * @returns Old collection contents.
	 */
	clear(): any;
}

export default IBindableCollection;

namespace IBindableCollection {
	/**
	 * Message of ICollection.
	 */
	export interface Message<T> {
		/**
		 * A collection that dispatched the message.
		 */
		readonly sender: IBindableCollection<T>;
	}
}
