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

import Bindable from './Bindable';
import Class from './Class';
import DestroyableBindable from './DestroyableBindable';
import Destructor from './Destructor';
import {destroy} from './index';
import IProperty from './IProperty';
import Listenable from './Listenable';
import Property from './Property';
import Reducer from './Reducer';

/**
 * Listens source properties modification and recreates target value via mapping function.
 *
 * @param T Target property value type.
 */
class Mapper<T> extends Class {
	private _create: Mapper.CreateCallback<T>;
	private _destroy: Mapper.DestroyCallback<T>;
	private _scope: any;
	private _sourceValues: any[];
	private _targetValue: T;
	private _target: IProperty<T>;
	private _viaNull: boolean;

	/**
	 * @param sources Source properties.
	 * @param create Mapping function.
	 * @param config Configuration.
	 */
	constructor(readonly sources: Bindable<any>[], create: Mapper.CreateCallback<T>, config: Mapper.FullConfig<T> = {}) {
		super();
		this._create = create;
		this._destroy = config.destroy;
		this._scope = config.scope || this;
		this._target = config.target ?? new Property<T>(null, this.sources.every(source => source.silent));
		this._viaNull = config.viaNull ?? false;
		this._sourceValues = null;
		this._targetValue = null;
		this.update();
		this.sources.forEach(this.bind, this);
	}

	/**
	 * Target property.
	 */
	get target(): Bindable<T> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		const oldValue = this.target.get();
		if (this._destroy && oldValue === this._targetValue) {
			this._target.set(null);
			this._done();
		}
		this._create = null;
		this._destroy = null;
		this._scope = null;
		this._target = null;
		this._sourceValues = null;
		this._targetValue = null;
		super.destroyObject();
	}

	/**
	 * Listens to the specified dispatcher and issues target value recalculation on any message.
	 * @param dispatcher Dispatcher.
	 * @returns this
	 */
	listen(dispatcher: Listenable<unknown>): this {
		return this.owning(dispatcher.listen(this.update, this));
	}

	/**
	 * Watches over the specified property and issues target value recalculation on its change.
	 * @param property Property.
	 * @returns this
	 */
	bind(property: Bindable<unknown>): this {
		return this.listen(property.onChange);
	}

	/**
	 * Updates target property forcibly.
	 */
	update() {
		if (this._viaNull) {
			this._target.set(null);
			this._done();
		}
		const values = this.sources.map((source) => source.get());
		const newValue: T = this._create.apply(this._scope, values);
		this._target.set(newValue);
		if (!this._viaNull) {
			this._done();
		}
		this._targetValue = newValue;
		this._sourceValues = values;
	}

	private _done() {
		if (this._destroy && this._sourceValues) {
			this._destroy.apply(this._scope, [this._targetValue].concat(this._sourceValues));
		}
	}
}

namespace Mapper {
	/**
	 * Mapper's `create` callback signature.
	 *
	 * @param T Target property value type.
	 */
	export interface CreateCallback<T> {
		(...sourceValues: any[]): T;
	}

	/**
	 * Mapper's `destroy` callback signature.
	 *
	 * @param T Target property value type.
	 */
	export interface DestroyCallback<T> {
		(targetValue: T, ...sourceValues: any[]): any;
	}

	/**
	 * Configuration of `mapProperties` function. Partial configuration of Mapper.
	 */
	export interface Config<T> {
		/**
		 * Destroys target property value if specified.
		 */
		readonly destroy?: DestroyCallback<T>;

		/**
		 * `create` and `destroy` call scope.
		 * Defaults to mapper itself.
		 */
		readonly scope?: any;

		/**
		 * Reverses mapper updating flow.
		 */
		readonly viaNull?: boolean;
	}

	/**
	 * Full configuration of Mapper.
	 *
	 * @param T Target property value type.
	 */
	export interface FullConfig<T> extends Config<T> {
		/**
		 * Target property. By default, created automatically.
		 */
		readonly target?: IProperty<T>;
	}

	/**
	 * Mapper by reducer. Kind of mapper optimized for working with collections of similar properties.
	 */
	export class ByReducer<T, U> extends Class {
		private _target: IProperty<U>;

		/**
		 * @param sources Source bindables.
		 * @param reducer Mapping reducer.
		 * @param target Target property.
		 */
		constructor(readonly sources: Bindable<T>[], readonly reducer: Reducer<T, U>, target?: IProperty<U>) {
			super();
			this._target = target ?? new Property<U>(null, this.sources.every(source => source.silent));
			this._update();
			this.sources.forEach(this._bind, this);
		}

		/**
		 * Target property.
		 */
		get target(): Bindable<U> {
			return this._target;
		}

		private _update() {
			const values = this.sources.map(source => source.get()),
				{initial, callback} = this.reducer;
			this._target.set(values.reduce(callback, initial));
		}

		private _bind(property: Bindable<any>): this {
			return this.owning(property.onChange.listen(this._update, this));
		}
	}
}

export default Mapper;

/**
 * Optimized way to create a mapper with new target value.
 *
 * @param sources Source properties.
 * @param reducer Mapping reducer.
 * @returns Target property.
 */
export function mapProperties<T>(sources: Bindable<any>[], reducer: Reducer<any, T>): DestroyableBindable<T>;

/**
 * @param sources Source properties.
 * @param create Mapping function.
 * @param config Configuration.
 * @returns Target property.
 */
export function mapProperties<T>(sources: Bindable<any>[],
		create: Mapper.CreateCallback<T>, config?: Mapper.Config<T>): DestroyableBindable<T>;
export function mapProperties<T>(sources: Bindable<any>[],
		reducer: Reducer<any, T> | Mapper.CreateCallback<T>, config: Mapper.Config<T> = {}): DestroyableBindable<T> {
	if (!sources.every((source) => source.silent)) {
		const target = new Property<T>();
		return target.owning((typeof reducer === "function") ? new Mapper(sources, reducer, {
			target,
			destroy: config.destroy,
			scope: config.scope,
			viaNull: config.viaNull
		}) : new Mapper.ByReducer(sources, reducer, target));
	}
	const sourceValues = sources.map((source) => source.get());
	if (typeof reducer !== "function") {
		const {initial, callback} = reducer;
		return new Property<T>(sourceValues.reduce(callback, initial), true);
	}
	const targetValue = reducer.apply(config.scope, sourceValues);
	const target = new Property<T>(targetValue, true);
	if (config.destroy === destroy) {
		target.ownValue();
	} else if (config.destroy) {
		target.own(new Destructor(() => config.destroy.apply(config.scope, [targetValue].concat(sourceValues))));
	}
	return target;
}
