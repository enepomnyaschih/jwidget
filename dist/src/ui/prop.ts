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

/// <reference types="jquery" />

import {Binding, UPDATE, WATCH} from '../Core';
import Class from '../Class';
import Destroyable from '../Destroyable';
import DestroyableBindable from '../DestroyableBindable';
import IProperty from '../IProperty';
import Property from '../Property';
import Bindable from '../Bindable';

class PropBinding extends Class {
	constructor(el: JQuery, prop: string, property: Bindable<any>);
	constructor(el: JQuery, prop: string, property: IProperty<boolean>, binding: Binding);
	constructor(el: JQuery, prop: string, property: any, binding: Binding = UPDATE) {
		super();
		if (binding & UPDATE) {
			this.own(new PropUpdater(el, prop, property));
		}
		if (prop === "checked" && (binding & WATCH)) {
			this.own(new CheckedListener(el, {target: property}));
		}
	}
}

class PropUpdater extends Class {
	constructor(private el: JQuery, private prop: string, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
	}

	private _update() {
		this.el.prop(this.prop, this.property.get());
		if (this.prop === "checked") {
			this.el.change();
		}
	}
}

class CheckedListener extends Class {
	private _target: IProperty<boolean>;
	private update: () => void;

	constructor(private el: JQuery, config: CheckedListener.Config = {}) {
		super();
		this.update = () => this._update();
		this._target = config.target || this.own(new Property<boolean>());
		this._update();
		this.el.bind("change", this.update);
	}

	get target(): Bindable<boolean> {
		return this._target;
	}

	protected destroyObject() {
		this.el.unbind("change", this.update);
		super.destroy();
	}

	private _update() {
		this._target.set(this.el.prop("checked"));
	}
}

namespace CheckedListener {
	export interface Config {
		readonly target?: IProperty<boolean>;
	}
}

/**
 * DOM element property management method.
 *
 * Returns a boolean property containing current checkbox state and starts watching for its modification.
 * Destroy the result property to stop synchronization.
 *
 *     // Watch checkbox state
 *     var property = this.own(el.jwprop("checked"));
 *
 * @param prop Element's property name.
 */
export default function prop(el: JQuery, prop: string): DestroyableBindable<boolean>;

/**
 * DOM element property management method.
 *
 * Binds specified property of the DOM element to boolean property and/or vice versa.
 * Returns [[JW.UI.PropBinding]] instance. Destroy it to stop synchronization.
 *
 *     // Bind element state to property
 *     this.own(el.jwprop("disabled", property));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="140" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop.html"></iframe>
 *
 * Two way binding:
 *
 *     this.own(el.jwprop("checked", this.value, JW.TWOWAY));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="150" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwprop-two.html"></iframe>
 *
 * @param prop Element's property name.
 * @param property Property value.
 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
 */
export default function prop(el: JQuery, prop: string, property: Bindable<any>): Destroyable;
export default function prop(el: JQuery, prop: string, property: IProperty<boolean>, binding: Binding): Destroyable;
export default function prop(el: JQuery, prop: string, property?: any, binding?: Binding): Destroyable {
	if (property != null) {
		return new PropBinding(el, prop, property, binding);
	}
	if (prop === "checked") {
		const target = new Property<boolean>();
		return target.owning(new CheckedListener(el, {target: target}));
	}
	throw new Error("Invalid argument");
}
