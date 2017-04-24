/*!
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

import IArray from '../../IArray';
import ICollectionFilterer from '../ICollectionFilterer';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Array]].
 */
interface IArrayFilterer<T> extends ICollectionFilterer<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: IArray<T>;

	/**
	 * Changes filterer configuration and refilters target collection.
	 * @param config Options to modify.
	 */
	reconfigure(config: IArrayFilterer.Reconfig<T>): void;

	/**
	 * Refilters target collection item. Call this method when collection item properties change the way that
	 * it must be refiltered.
	 * @param item Item to refilter.
	 */
	refilterItem(item: T): void;

	/**
	 * Refilters target collection. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	refilter(): void;

	/**
	 * Refilters target collection item at specified position in source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 * @param index Index of source collection item to refilter.
	 */
	refilterAt(sourceIndex: number): void;
}

export default IArrayFilterer;

namespace IArrayFilterer {
	/**
	 * @inheritdoc
	 */
	export interface Config<T> extends ICollectionFilterer.Config<T> {
		/**
		 * @inheritdoc
		 */
		readonly target?: IArray<T>;
	}

	/**
	 * [[Filterer]]'s [[Filterer.reconfigure|reconfigure]] method options.
	 * All options are optional. If skipped, an option stays the same.
	 *
	 * @param T Collection item type.
	 */
	export interface Reconfig<T> {
		/**
		 * Filtering criteria.
		 */
		readonly filterer?: (item: T) => boolean;

		/**
		 * [[filterItem]] call scope.
		 */
		readonly scope?: any;
	}
}
