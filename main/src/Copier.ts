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

import Bindable from './Bindable';
import Class from './Class';
import IProperty from './IProperty';
import Property from './Property';

/**
 * Listens source `Bindable` modification and copies its value to target property.
 *
 * @param T Property value type.
 */
class Copier<V> extends Class {
	private _targetCreated: boolean;
	private _target: IProperty<V>;

	/**
	 * @param source Source bindable.
	 * @param target Target property.
	 */
	constructor(readonly source: Bindable<V>, target?: IProperty<V>) {
		super();
		this._targetCreated = target == null;
		this._target = (target == null) ? new Property<V>(null, source.silent) : target;
		this._update();
		this.own(this.source.changeEvent.listen(this._update, this));
	}

	/**
	 * Target property.
	 */
	get target(): Bindable<V> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		if (this._targetCreated) {
			this._target.destroy();
		}
		this._target = null;
		super.destroyObject();
	}

	private _update() {
		this._target.set(this.source.get());
	}
}

export default Copier;
