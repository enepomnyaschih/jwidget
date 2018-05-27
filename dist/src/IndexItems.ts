/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import IList from './IList';
import IndexCount from './IndexCount';

/**
 * Index and items pair. Used in IList.splice method arguments to specify item segments to insert, and in
 * ListSpliceResult class to specify removed and added item segments.
 */
export default class IndexItems<T> implements IList.IndexItems<T> {
	/**
	 * @param index Index.
	 * @param items Items.
	 */
	constructor(readonly index: number, readonly items: T[]) {
	}

	/**
	 * Converts to index and count pair.
	 */
	toIndexCount(): IList.IndexCount {
		return new IndexCount(this.index, this.items.length);
	}

	/**
	 * Clones pair.
	 */
	clone(): IList.IndexItems<T> {
		return new IndexItems<T>(this.index, this.items.concat());
	}
}
