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

import Class from './Class';
import IProperty from './IProperty';
import Property from './Property';
import Bindable from './Bindable';

/**
 * Watches source [[JW.Property]] modification and copies
 * its value to target property.
 *
 *     var source = new JW.Property<number>(1);
 *     var target = new JW.Property<number>();
 *     var copier = new JW.Copier<number>(source, {target: target});
 *     assert.strictEqual(1, target.get());
 *     source.set(2);
 *     assert.strictEqual(2, target.get());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that copier owns it in this case.
 *
 *     var source = new JW.Property<number>(1);
 *     var target = new JW.Copier<number>(this.source).target;
 *     assert.strictEqual(1, target.get());
 *
 * [[JW.Property]] has a shorthand method [[JW.Property.bindTo|bindTo]] for the same purpose:
 *
 *     var source = new JW.Property<number>(1);
 *     var target = new JW.Property<number>();
 *     target.bindTo(source);
 *     assert.strictEqual(1, target.get());
 *
 * @param T Property value type.
 */
class Copier<T> extends Class {
	private _targetCreated: boolean;
	private _target: IProperty<T>;

	/**
	 * Source property.
	 */
	readonly source: Bindable<T>;

	/**
	 * @param config Configuration.
	 */
	constructor(source: Bindable<T>, target?: IProperty<T>) {
		super();
		this.source = source;
		this._targetCreated = target == null;
		this._target = (target == null) ? new Property<T>(null, this.source.silent) : target;
		this._update();
		this.own(this.source.changeEvent.listen(this._update, this));
	}

	/**
	 * Target property.
	 */
	get target(): Bindable<T> {
		return this._target;
	}

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
