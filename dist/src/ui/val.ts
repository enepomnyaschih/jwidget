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
import DestroyableWatchable from '../DestroyableWatchable';
import {isLifeInput} from '../DomUtils';
import IProperty from '../IProperty';
import Property from '../Property';
import Watchable from '../Watchable';

class ValueBinding extends Class {
	constructor(el: JQuery, property: Watchable<any>, simple?: boolean);
	constructor(el: JQuery, property: IProperty<string>, binding: Binding, simple?: boolean);
	constructor(el: JQuery, property: any, binding: any = UPDATE, simple?: boolean) {
		super();
		if (typeof binding === "boolean") {
			simple = binding;
			binding = UPDATE;
		}
		if (binding & UPDATE) {
			this.own(new ValueUpdater(el, property));
		}
		if (binding & WATCH) {
			this.own(new ValueListener(el, {target: property, simple: simple}));
		}
	}
}

class ValueUpdater extends Class {
	constructor(private el: JQuery, private property: Watchable<any>) {
		super();
		this._update();
		this.own(property.changeEvent.listen(this._update, this));
	}

	private _update() {
		this.el.val(this.property.get());
	}
}

class ValueListener extends Class {
	private _target: IProperty<string>;
	private _simple: boolean;
	private _timer: number;
	private update: () => void;

	constructor(private el: JQuery, config: ValueListener.Config = {}) {
		super();
		this.update = () => this._update();
		this._target = config.target || this.own(new Property<string>());
		this._simple = config.simple || !isLifeInput(el);
		this.update();
		this.el.bind("change", this.update);
		if (!this._simple) {
			this._timer = window.setInterval(this.update, 100);
		}
	}

	get target(): Watchable<string> {
		return this._target;
	}

	destroy() {
		if (!this._simple) {
			clearInterval(this._timer);
		}
		this.el.unbind("change", this.update);
		super.destroy();
	}

	_update() {
		this._target.set(this.el.val());
	}
}

namespace ValueListener {
	export interface Config {
		readonly target?: IProperty<string>;
		readonly simple?: boolean;
	}
}

/**
 * DOM element value management method.
 *
 * Returns a string property containing current element value and starts watching for value modification.
 * Destroy the result property to stop synchronization.
 *
 *     // Watch input element value
 *     var value = this.own(el.jwval());
 *
 * @param simple If true, listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
export default function val(el: JQuery, simple?: boolean): DestroyableWatchable<string>;

/**
 * DOM element value management method.
 *
 * Binds DOM text input value to string property and/or vice versa.
 * Returns [[JW.UI.ValueBinding]] instance. Destroy it to stop synchronization.
 *
 *     // Bind element value to property
 *     this.own(el.jwval(value));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="285" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval.html"></iframe>
 *
 * Two way binding:
 *
 *     this.own(el.jwval(this.value, JW.TWOWAY));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwval-two.html"></iframe>
 *
 * @param property Element value.
 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
 * @param simple If true, watch-binding listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
export default function val(el: JQuery, value: Watchable<any>, simple?: boolean): Destroyable;
export default function val(el: JQuery, value: IProperty<string>, binding: Binding, simple?: boolean): Destroyable;
export default function val(el: JQuery, value: any, binding?: any, simple?: any): Destroyable {
	if (value != null && (typeof value !== "boolean")) {
		return new ValueBinding(el, value, binding, simple);
	}
	var target = new Property<string>();
	target.own(new ValueListener(el, {target: target, simple: simple}));
	return target;
}
