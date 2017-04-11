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

import AbstractCollectionCounter from '../AbstractCollectionCounter';
import IArray from '../../IArray';
import IArrayCounter from './IArrayCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Array]].
 */
export default class ArrayCounter<T> extends AbstractCollectionCounter<T> implements IArrayCounter<T> {
	/**
	 * @inheritdoc
	 */
	public source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
	}
}
