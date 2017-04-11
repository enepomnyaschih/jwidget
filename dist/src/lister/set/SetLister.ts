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

import AbstractCollectionLister from '../AbstractCollectionLister';
import IClass from '../../IClass';
import ICollectionListerConfig from '../ICollectionListerConfig';
import ISet from '../../ISet';
import ISetLister from './ISetLister';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Set]].
 */
export default class SetLister<T extends IClass> extends AbstractCollectionLister<T> implements ISetLister<T> {
	/**
	 * @inheritdoc
	 */
	public source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ICollectionListerConfig<T>) {
		super(source, config);
	}
}
