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
 * Watches source [[JW.Property|properties]] modification and recreates
 * a target property using specified functions. Unlike [[JW.Functor]],
 * lets you destroy a previously created value. Also, mapper resets the target
 * property value to null on destruction.
 *
 *     let count = new JW.Property<number>(1);
 *     let units = new JW.Property<string>("apples");
 *     let target = new JW.Property<string>();
 *
 *     // Next command prints "Init 1 apples" to console
 *     let mapper = new JW.Mapper<string>([count, units], {
 *         target: target,
 *         createValue: (value: number, units: string) => {
 *             let result = value + " " + units;
 *             console.log("Init " + result);
 *             return result;
 *         },
 *         destroyValue: (result: string, value: number, units: string) {
 *             console.log("Done " + result);
 *         },
 *         scope: this
 *     });
 *     assert.strictEqual("1 apples", target.get());
 *
 *     // Next command prints "Done 1 apples" and "Init 2 apples"
 *     count.set(2);
 *     assert.strictEqual("2 apples", target.get());
 *
 *     // Next command prints "Done 2 apples"
 *     mapper.destroy();
 *     assert.strictEqual(null, target.get());
 *
 * If **target** is omitted in constructor, it is created automatically. Notice
 * that mapper owns it in this case.
 *
 *     let source = new JW.Property<number>(1);
 *     let mapper = new JW.Mapper<string>([source], {
 *         createValue: (value: number): string {
 *             return value + " apples";
 *         },
 *         scope: this
 *     });
 *     let target = mapper.target;
 *     assert.strictEqual("1 apples", target.get());
 *     mapper.destroy();
 *
 * In simple cases, [[JW.Property.$mapValue|$mapValue]] and
 * [[JW.Property.$mapObject|$mapObject]] shorthand methods
 * can be used instead. They return the target property right away:
 *
 *     let source = new JW.Property<number>(1);
 *     let target = source.$mapValue((value) => { return value + " apples"; });
 *     assert.strictEqual("1 apples", target.get());
 *     target.destroy();
 *
 * On source property change, next flow will take a place:
 *
 * 1. New value is created
 * 1. Target property is set to new value
 * 1. Old value is destroyed
 *
 * In contrast, [[JW.Switcher]]'s flow is opposite:
 *
 * 1. [[JW.Switcher.Config.done|done]] method is called
 * 1. [[JW.Switcher.Config.init|init]] method is called
 *
 * Common use case for mapper is replaceable child component creation by data:
 *
 *     class MyComponent extends JW.UI.Component {
 *         constructor(private document: JW.Property<MyDocument>) {
 *             super();
 *         }
 *
 *         renderDocument(): any {
 *             return this.own(this.document.$mapObject((document) => {
 *                 return new MyDocumentView(document);
 *             }));
 *         }
 *     }
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="document"></div>' +
 *             '</div>'
 *     });
 *
 * Also, mapper allows you to chain property calculations. Assume that you have several folders and
 * several files in each folder. One folder is selected, and each folder has a selected file inside. You
 * want to create a file view by a currently selected folder and a currently selected file there. Do this:
 *
 *     class Folder extends JW.Class {
 *         selectedFile = this.own(new JW.Property<File>());
 *     }
 *
 *     class App extends JW.Class {
 *         selectedFolder = this.own(new JW.Property<Folder>());
 *         fileView = this.own(new JW.Property<FileView>());
 *
 *         constructor() {
 *             super();
 *             this.own(this.selectedFolder.$mapObject((folder) => {
 *                 return new JW.Mapper<FileView>([folder.selectedFile], {
 *                     target: this.fileView,
 *                     createValue: (file: File) => {
 *                         return new FileView(folder, file);
 *                     },
 *                     destroyValue: JW.destroy,
 *                     scope: this
 *                 });
 *             }, this));
 *         }
 *     }
 *
 * By default, mapper doesn't call the callbacks if at least one of the source values is null. You can change it
 * via [[JW.Mapper.Config.acceptNull|acceptNull]] option.
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
	 * Watches specified event and issues target value recalculation on
	 * the event triggering.
	 * @param event Event.
	 * @returns this
	 */
	listen(event: Listenable<any>): this {
		return this.owning(event.listen(this.update, this));
	}

	/**
	 * Watches specified property and issues target value recalculation on
	 * the property change.
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
	 * [[JW.Mapper]]'s [[JW.Mapper.Config.createValue|createValue]] callback.
	 *
	 * @param T Target property value type.
	 */
	export interface CreateCallback<T> {
		(...sourceValues: any[]): T;
	}

	/**
	 * [[JW.Mapper]]'s [[JW.Mapper.Config.destroyValue|destroyValue]] callback.
	 *
	 * @param T Target property value type.
	 */
	export interface DestroyCallback<T> {
		(targetValue: T, ...sourceValues: any[]): any;
	}

	export interface Config<T> {
		/**
		 * Destroys target property value.
		 */
		readonly destroy?: DestroyCallback<T>;

		/**
		 * [[createValue]] and [[destroyValue]] call scope.
		 * Defaults to mapper itself.
		 */
		readonly scope?: any;

		/**
		 * Reverses mapper updating flow. Default flow is:
		 *
		 * 1. Create a new value.
		 * 2. Reassign target property.
		 * 3. Destroy the old value.
		 *
		 * Setting this option to true changes the flow the next way:
		 *
		 * 1. Set target value to null.
		 * 2. Destroy the old value.
		 * 3. Create a new value.
		 * 4. Assign target property.
		 */
		readonly viaNull?: boolean;
	}

	/**
	 * [[JW.Mapper]] configuration.
	 *
	 * @param T Target property value type.
	 */
	export interface FullConfig<T> extends Config<T> {
		/**
		 * Target property. By default, created automatically.
		 */
		readonly target?: IProperty<T>;
	}

	export class ByReducer<T> extends Class {
		private _target: IProperty<T>;

		/**
		 * @param config Configuration.
		 */
		constructor(readonly sources: Bindable<any>[], readonly reducer: Reducer<any, T>, target?: IProperty<T>) {
			super();
			this._target = target || this.own(new Property<T>());
			this._update();
			this.sources.forEach(this._bind, this);
		}

		/**
		 * Target property.
		 */
		get target(): Bindable<T> {
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

export function mapProperties<T>(sources: Bindable<any>[], reducer: Reducer<any, T>): DestroyableBindable<T>;
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
