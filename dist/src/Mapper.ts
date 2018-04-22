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

import * as ArrayUtils from './ArrayUtils';
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
	private _targetCreated: boolean;
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
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ?
			new Property<T>(null, this.sources.every((source) => source.silent)) : config.target;
		this._viaNull = config.viaNull || false;
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
		if (oldValue === this._targetValue) {
			this._target.set(null);
		}
		this._done();
		if (this._targetCreated) {
			this._target.destroy();
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
	 * Listens specified event and issues target value recalculation on event triggering.
	 * @param event Event.
	 * @returns this
	 */
	listen(event: Listenable<any>): this {
		return this.owning(event.listen(this.update, this));
	}

	/**
	 * Watches specified property and issues target value recalculation on its change.
	 * @param property Property.
	 * @returns this
	 */
	bind(property: Bindable<any>): this {
		return this.listen(property.changeEvent);
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
			this._target = target || this.own(new Property<U>());
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
			const values = this.sources.map((source) => source.get());
			this._target.set(ArrayUtils.reduce(values, this.reducer));
		}

		private _bind(property: Bindable<any>): this {
			return this.owning(property.changeEvent.listen(this._update, this));
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
		}) : new Mapper.ByReducer(sources, reducer));
	}
	const sourceValues = sources.map((source) => source.get());
	if (typeof reducer !== "function") {
		return new Property<T>(ArrayUtils.reduce(sourceValues, reducer), true);
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
