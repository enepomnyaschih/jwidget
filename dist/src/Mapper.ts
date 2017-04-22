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
import {destroy, isNotNil} from './Core';
import Destroyable from './Destroyable';
import IProperty from './IProperty';
import Property from './Property';
import Watchable from './Watchable';

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
 * In simple cases, [[JW.Property.$$mapValue|$$mapValue]] and
 * [[JW.Property.$$mapObject|$$mapObject]] shorthand methods
 * can be used instead. They return the target property right away:
 *
 *     let source = new JW.Property<number>(1);
 *     let target = source.$$mapValue((value) => { return value + " apples"; });
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
 *             return this.own(this.document.$$mapObject((document) => {
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
 *             this.own(this.selectedFolder.$$mapObject((folder) => {
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
	private _createValue: Mapper.CreateCallback<T>;
	private _destroyValue: Mapper.DestroyCallback<T>;
	private _scope: any;
	private _acceptNull: boolean;
	private _sourceValues: any[];
	private _targetValue: T;
	private _targetCreated: boolean;
	private _target: IProperty<T>;

	/**
	 * @param sources Source properties.
	 * @param config Configuration.
	 */
	constructor(
		public sources: Watchable<any>[],
		config: Mapper.Config<T>)
	{
		super();
		this._createValue = config.createValue;
		this._destroyValue = config.destroyValue;
		this._scope = config.scope || this;
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new Property<T>() : config.target;
		this._acceptNull = config.acceptNull || false;
		this._sourceValues = null;
		this._targetValue = null;
		this.update();
		sources.forEach(this.watch, this);
	}

	/**
	 * Target property.
	 */
	get target(): Watchable<T> {
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
		this.sources = null;
		this._createValue = null;
		this._destroyValue = null;
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
	bind(event: Bindable<any>): this {
		return this.owning(event.bind(this.update, this));
	}

	/**
	 * Watches specified property and issues target value recalculation on
	 * the property change.
	 * @param property Property.
	 * @returns this
	 */
	watch(property: Watchable<any>): this {
		return this.bind(property.changeEvent);
	}

	/**
	 * Updates target property focibly.
	 */
	update() {
		let values = this.sources.map((source) => source.get());
		let newValue: T;
		if (this._acceptNull || values.every(isNotNil)) {
			newValue = this._createValue.apply(this._scope, values);
		} else {
			newValue = null;
			values = null;
		}
		this._target.set(newValue);
		this._done();
		this._targetValue = newValue;
		this._sourceValues = values;
	}

	private _done() {
		if (this._destroyValue && this._sourceValues) {
			this._destroyValue.apply(this._scope, [this._targetValue].concat(this._sourceValues));
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

	/**
	 * [[JW.Mapper]] configuration.
	 *
	 * @param T Target property value type.
	 */
	export interface Config<T> {
		/**
		 * Target property. By default, created automatically.
		 */
		target?: IProperty<T>;

		/**
		 * Calculates target property value based on source property values.
		 */
		createValue: CreateCallback<T>;

		/**
		 * Destroys target property value.
		 */
		destroyValue?: DestroyCallback<T>;

		/**
		 * [[createValue]] and [[destroyValue]] call scope.
		 * Defaults to mapper itself.
		 */
		scope?: any;

		/**
		 * If false, functions won't be called if at least one of the source values is null. Target value
		 * is resetted to null in this case.
		 *
		 * Defaults to false.
		 */
		acceptNull?: boolean;
	}
}

export default Mapper;

export function mapProperties<U>(properties: Watchable<any>[], callback: Mapper.CreateCallback<U>, scope?: any): Watchable<U> {
	if (properties.every((property) => property.isSilent())) {
		const values = properties.map((property) => property.get());
		return new Property<U>(callback.apply(scope, values), true);
	}
	const result = new Property<U>();
	result.own(new Mapper(properties, {
		target: result,
		createValue: callback,
		scope: scope
	}));
	return result;
}

export function mapDestroyableProperties<U extends Destroyable>(properties: Watchable<any>[], callback: Mapper.CreateCallback<U>, scope?: any): Watchable<U> {
	if (properties.every((property) => property.isSilent())) {
		const values = properties.map((property) => property.get());
		return new Property<U>(callback.apply(scope, values), true).ownValue();
	}
	const result = new Property<U>();
	result.own(new Mapper(properties, {
		target: result,
		createValue: callback,
		destroyValue: destroy,
		scope: scope
	}));
	return result;
}
