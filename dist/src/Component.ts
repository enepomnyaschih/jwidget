﻿/*
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

import {apply, destroy, isWatchable} from './Core';
import List from './List';
import AbstractCollection from './AbstractCollection';
import AbstractTemplate from './AbstractTemplate';
import Class from './Class';
import ComponentArray from './component/ComponentArray';
import ComponentChildren from './component/ComponentChildren';
import ComponentCollection from './component/ComponentCollection';
import ComponentReplaceable from './component/ComponentReplaceable';
import Dictionary from './Dictionary';
import DomTemplate from './DomTemplate';
import IArray from './IArray';
import ICollection from './ICollection';
import HtmlTemplate from './HtmlTemplate';
import TemplateOutput from './TemplateOutput';
import Watchable from './Watchable';
import * as DomUtils from './DomUtils';
import * as MapUtils from './MapUtils';
import * as SetUtils from './SetUtils';
import * as StringUtils from './StringUtils';

/**
 * Base class of UI component.
 *
 * Features:
 *
 * - Rendering by HTML template.
 * - Direct access to component elements.
 * - jQuery interface for element manipulations.
 * - Convenient API for data binding and child component management.
 */
export default class Component extends Class {
	/**
	 * Parent component. Field is available from component rendering beginning.
	 */
	parent: Component = null;

	/**
	 * @hidden
	 */
	wasAfterAppend: boolean = false;

	/**
	 * Root element. Field is available from component rendering beginning.
	 */
	el: JQuery = null;

	/**
	 * Mutable named child components. Use this map to add child components in place of
	 * elements with corresponding `jwid`. Field is available from component rendering beginning.
	 */
	children: ComponentChildren = null;

	/**
	 * Map from template ID to the template. Templates are defined by `template` annotation.
	 */
	templates: Dictionary<AbstractTemplate>;

	/**
	 * @hidden
	 */
	_template: AbstractTemplate = null;

	/**
	 * @hidden
	 */
	_elements: Dictionary<JQuery> = null;

	/**
	 * @hidden
	 */
	_replaceables: Dictionary<ComponentReplaceable> = null;

	/**
	 * @hidden
	 */
	_arrays: Dictionary<ComponentArray> = null;

	/**
	 * @hidden
	 */
	_collections: Dictionary<ComponentCollection> = null;

	/**
	 * Yes, objects of this class can be constructed.
	 * They can be used as dummy components or simple containers.
	 */
	constructor() {
		super();
		if (!Component.prototype.templates) {
			DomUtils.template(Component, {main: '<div></div>'});
		}
		this._template = this.templates['main'];
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		if (this.parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this.wasAfterAppend) {
			this.releaseDom();
		}
		if (this.el) {
			DomUtils.remove(this.el[0]);
			SetUtils.each(this._collections, destroy);
			this._collections = null;
			SetUtils.each(this._arrays, destroy);
			this._arrays = null;
			SetUtils.each(this._replaceables, destroy);
			this._replaceables = null;

			this.children.unrender();
			this.unrender();

			this.children.destroy();
			this.children = null;
			this.el.remove();
		}
		this._elements = null;
		this.el = null;
		this.afterDestroy();
		super.destroy();
	}

	/**
	 * Component life stage method. Called during component rendering after HTML template parsing and initialization
	 * of references to all elements of the template. Called before `render<ChildId>` methods and
	 * `afterRender` method. It is convenient to perform some preliminary action here before child
	 * components creation. But you are already able to create child components here.
	 * Call `super.beforeRender()` at the first line of the method.
	 */
	protected beforeRender() {
	}

	/**
	 * Component life stage method. Called after `beforeRender` method and `render<ChildId>` methods.
	 * You should assign all elements' attributes here, create child components,
	 * bind to events and fill component with interactivity.
	 * Call `super.afterRender()` at the first line of the method.
	 */
	protected afterRender() {
	}

	/**
	 * Component life stage method. Called after first-time component appearing in HTML DOM and UI components tree.
	 * Component layouting should be performed here (element size computing).
	 * Component rendering is finished here.
	 * Call `super.afterAppend()` at the first line of the method.
	 */
	protected afterAppend() {
	}

	/**
	 * Component life stage method. Called during component destruction before `unrender` method call.
	 * Everything that was performed in `afterAppend` method should be reverted here.
	 * Call `super.releaseDom()` at the last line of the method.
	 */
	protected releaseDom() {
	}

	/**
	 * Component life stage method. Called during component destruction before `afterDestroy` method call.
	 * Everything that was performed during component
	 * rendering should be reverted here. All child components are already removed by framework
	 * before this method call, but the components themselves are not destroyed. You must destroy them explicitly.
	 * Call `super.unrender()` at the last line of the method.
	 */
	protected unrender() {
	}

	/**
	 * Component life stage method. Called during component destruction after `unrender` method call.
	 * Everything that was performed during component construction should be reverted here.
	 * Call `super.afterDestroy()` at the last line of the method.
	 */
	protected afterDestroy() {
	}

	/**
	 * Virtual method to render the component document fragment.
	 * By default, renders `main` HTML template.
	 */
	protected createElement(): TemplateOutput {
		return this._template.createElement();
	}

	/**
	 * Selects component rendering strategy. This method is needed only in very rare cases.
	 * By default, component is rendered outside of DOM based on `main` HTML
	 * template specified by `template` annotation. You can change this by `using` method call.
	 */
	using(value: string | AbstractTemplate | HTMLElement | JQuery): this {
		this._template =
			(typeof value === "string") ? new HtmlTemplate(value) :
			(value instanceof HtmlTemplate) ? value : new DomTemplate(<any>value);
		return this;
	}

	/**
	 * Renders the component. Call this method to initialize references to all elements of component and create
	 * child components.
	 */
	render(): this {
		if (this.el) {
			return this;
		}
		var output = this.createElement();
		this.el = jQuery(output.root);
		this._elements = MapUtils.map(output.groups, function(x) { return jQuery(x); });
		this.children = new ComponentChildren(this);
		this._replaceables = {};
		this._arrays = {};
		this._collections = {};
		this.beforeRender();
		var elements = apply({}, this._elements);
		for (var jwId in elements) {
			var element = elements[jwId];
			var aliveElements = Array.prototype.filter.call(element, (el: HTMLElement) => {
				return DomUtils.inEl(el, this.el[0]);
			});
			if (aliveElements.length === 0) {
				delete this._elements[jwId];
				continue;
			}
			if (aliveElements.length !== element.length) {
				element = jQuery(aliveElements);
				this._elements[jwId] = element;
			}
			var jwIdCamel = StringUtils.camel(jwId);
			var renderMethodName = "render" + StringUtils.capitalize(jwIdCamel);
			if (typeof (<any>this)[renderMethodName] === "function") {
				var result = (<any>this)[renderMethodName](element);
				if (jwId === "root") {
					if (result instanceof List) {
						this.addArray(result, jwId);
					} else if (result instanceof AbstractCollection) {
						this.addCollection(result, jwId);
					}
				} else {
					if (result instanceof Component) {
						this.children.set(result, jwId);
					} else if (isWatchable(result)) {
						this.addReplaceable(result, jwId);
					} else if (result instanceof List) {
						this.addArray(result, jwId);
					} else if (result instanceof AbstractCollection) {
						this.addCollection(result, jwId);
					} else if (result === false) {
						this.removeElement(jwId);
					}
				}
			}
		}
		this.afterRender();
		if (this._template.requiresAfterAppend) {
			this._afterAppend();
		}
		return this;
	}

	/**
	 * Renders component into an element. Use it to render root component only: its children must be rendered
	 * using `children`, `addArray`, `addCollection`, `addReplaceable` members.
	 *
	 * @param el Element to render component into.
	 */
	renderTo(el: string | HTMLElement | JQuery): this {
		this.render();
		jQuery(el)[0].appendChild(this.el[0]);
		this._afterAppend();
		return this;
	}

	/**
	 * Render component in place of an element. Use it to render root component only: its children must be rendered
	 * using `children`, `addArray`, `addCollection`, `addReplaceable` members.
	 *
	 * @param el Element to render component in place of.
	 */
	renderAs(el: string | HTMLElement | JQuery): this {
		this.render();
		DomUtils.replace(jQuery(el)[0], this.el[0], true);
		this._afterAppend();
		return this;
	}

	/**
	 * Remove the component from DOM. Can be used for root component only (which was added via `renderTo` or `renderAs`
	 * method). All child components should be removed using `children` map or owning object deletion.
	 *
	 * See online documentation for details.
	 */
	remove(): this {
		if (this.parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		DomUtils.remove(this.el[0]);
		return this;
	}

	/**
	 * Get element by its `jwid`.
	 * @param id `jwid` of the element.
	 */
	getElement(id: string): JQuery {
		return this._elements[id];
	}

	/**
	 * Remove element by `jwid`. Element gets removed from DOM and destroyed. It is now impossible to get it by `getElement` method.
	 * @param id `jwid` of the element.
	 */
	removeElement(id: string): this {
		var el = this._elements[id];
		if (!el) {
			return this;
		}
		el.remove();
		delete this._elements[id];
		return this;
	}

	/**
	 * Add an easily replaceable child component into an element.
	 *
	 * @param component Child component property.
	 * @param id `jwid` of element to replace.
	 */
	addReplaceable(component: Watchable<Component>, id: string): ComponentReplaceable {
		return new ComponentReplaceable(this, component, id);
	}

	/**
	 * Add child component array into an element. As opposed to `addCollection` method, keeps
	 * component order. However, it works slower and accepts array only.
	 *
	 * @param source Child component array.
	 * @param el `jwid` of element to add child components into. Defaults to root element (`el`) of component.
	 */
	addArray(source: IArray<Component>, el?: string | HTMLElement | JQuery): ComponentArray {
		return new ComponentArray(this, source, this._getContainerElement(el));
	}

	/**
	 * Add child component collection into an element. As opposed to `addArray` method, ignores
	 * component order. However, it works faster and accepts any kind of collection, not array only.
	 *
	 * @param components Child component collection.
	 * @param el `jwid` of element to add child components into. Defaults to root element (`el`) of component.
	 */
	addCollection(source: ICollection<Component>, el?: string | HTMLElement | JQuery): ComponentCollection {
		return new ComponentCollection(this, source, this._getContainerElement(el));
	}

	/**
	 * @hidden
	 */
	_afterAppend() {
		if (this.wasAfterAppend || !this.el) {
			return;
		}
		if (this.parent && !this.parent.wasAfterAppend) {
			return;
		}
		if (!this.parent && !DomUtils.inDom(this.el[0])) {
			return;
		}
		this.wasAfterAppend = true;
		this.afterAppend();
		this.children.each(DomUtils._afterAppend);
		SetUtils.each<ComponentArray>(this._arrays, DomUtils._afterAppend);
		SetUtils.each<ComponentCollection>(this._collections, DomUtils._afterAppend);
	}

	/**
	 * @hidden
	 */
	_initChild(component: Component) {
		component.render();
		component.parent = this;
	}

	/**
	 * @hidden
	 */
	_doneChild(component: Component) {
		component.parent = null;
	}

	/**
	 * @hidden
	 */
	_getContainerElement(el?: any) {
		return (el === undefined) ? this.el :
			(typeof el === "string") ? this._elements[el] : jQuery(el);
	}
}