/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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
	private _target: IProperty<V>;

	/**
	 * @param source Source bindable.
	 * @param target Target property.
	 */
	constructor(readonly source: Bindable<V>, target?: IProperty<V>) {
		super();
		this._target = target ?? new Property<V>(null, source.silent);
		this._update();
		this.own(this.source.onChange.listen(this._update, this));
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
		// We don't have to destroy _target, because its destruction doesn't have a purpose. You can't own anything in
		// a Bindable object.
		this._target = null;
		super.destroyObject();
	}

	private _update() {
		this._target.set(this.source.get());
	}
}

export default Copier;
