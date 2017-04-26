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

import {apply, destroy, isBindable} from './index';
import List from './List';
import AbstractCollection from './AbstractCollection';
import AbstractTemplate from './AbstractTemplate';
import Class from './Class';
import ComponentList from './component/ComponentList';
import ComponentChildren from './component/ComponentChildren';
import ComponentCollection from './component/ComponentCollection';
import ComponentReplaceable from './component/ComponentReplaceable';
import Dictionary from './Dictionary';
import DomTemplate from './DomTemplate';
import IList from './IList';
import ICollection from './ICollection';
import HtmlTemplate from './HtmlTemplate';
import TemplateOutput from './TemplateOutput';
import Bindable from './Bindable';
import * as DomUtils from './DomUtils';
import * as DictionaryUtils from './DictionaryUtils';
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
	private _parent: Component = null;
	private _el: JQuery = null;
	private _children: ComponentChildren = null;

	private _wasAfterAppend: boolean = false;
	private _template: AbstractTemplate = null;

	private __elements     : Dictionary<JQuery> = null;
	private __replaceables : Dictionary<ComponentReplaceable> = null;
	private __arrays       : Dictionary<ComponentList> = null;
	private __collections  : Dictionary<ComponentCollection> = null;

	/**
	 * Map from template ID to the template. Templates are defined by `template` annotation.
	 */
	readonly templates: Dictionary<AbstractTemplate>;

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
	 * Parent component. The property is available from component rendering beginning.
	 */
	get parent() {
		return this._parent;
	}

	/**
	 * Root element. Field is available from component rendering beginning.
	 */
	get el() {
		return this._el;
	}

	/**
	 * Mutable named child components. Use this map to add child components in place of
	 * elements with corresponding `jwid`. Field is available from component rendering beginning.
	 */
	get children() {
		return this._children;
	}

	/**
	 * @hidden
	 */
	get _elements() {
		return this.__elements;
	}

	/**
	 * @hidden
	 */
	get _replaceables() {
		return this.__replaceables;
	}

	/**
	 * @hidden
	 */
	get _arrays() {
		return this.__arrays;
	}

	/**
	 * @hidden
	 */
	get _collections() {
		return this.__collections;
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		if (this._parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this._wasAfterAppend) {
			this.releaseDom();
		}
		if (this._el) {
			DomUtils.remove(this._el[0]);
			DictionaryUtils.each(this.__collections, destroy);
			this.__collections = null;
			DictionaryUtils.each(this.__arrays, destroy);
			this.__arrays = null;
			DictionaryUtils.each(this.__replaceables, destroy);
			this.__replaceables = null;

			this._children.unrender();
			this.unrender();

			this._children.destroy();
			this._children = null;
			this._el.remove();
		}
		this.__elements = null;
		this._el = null;
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
		if (this._el) {
			return this;
		}
		var output = this.createElement();
		this._el = jQuery(output.root);
		this.__elements = DictionaryUtils.map(output.groups, function(x) { return jQuery(x); });
		this._children = new ComponentChildren(this);
		this.__replaceables = {};
		this.__arrays = {};
		this.__collections = {};
		this.beforeRender();
		var elements = apply({}, this.__elements);
		for (var jwId in elements) {
			var element = elements[jwId];
			var aliveElements = Array.prototype.filter.call(element, (el: HTMLElement) => {
				return DomUtils.inEl(el, this._el[0]);
			});
			if (aliveElements.length === 0) {
				delete this.__elements[jwId];
				continue;
			}
			if (aliveElements.length !== element.length) {
				element = jQuery(aliveElements);
				this.__elements[jwId] = element;
			}
			var jwIdCamel = StringUtils.camel(jwId);
			var renderMethodName = "render" + StringUtils.capitalize(jwIdCamel);
			if (typeof (<any>this)[renderMethodName] === "function") {
				var result = (<any>this)[renderMethodName](element);
				if (jwId === "root") {
					if (result instanceof List) {
						this.addList(result, jwId);
					} else if (result instanceof AbstractCollection) {
						this.addCollection(result, jwId);
					}
				} else {
					if (result instanceof Component) {
						this._children.set(result, jwId);
					} else if (isBindable(result)) {
						this.addReplaceable(result, jwId);
					} else if (result instanceof List) {
						this.addList(result, jwId);
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
		jQuery(el)[0].appendChild(this._el[0]);
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
		DomUtils.replace(jQuery(el)[0], this._el[0], true);
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
		if (this._parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		DomUtils.remove(this._el[0]);
		return this;
	}

	/**
	 * Get element by its `jwid`.
	 * @param id `jwid` of the element.
	 */
	getElement(id: string): JQuery {
		return this.__elements[id];
	}

	/**
	 * Remove element by `jwid`. Element gets removed from DOM and destroyed. It is now impossible to get it by `getElement` method.
	 * @param id `jwid` of the element.
	 */
	removeElement(id: string): this {
		var el = this.__elements[id];
		if (!el) {
			return this;
		}
		el.remove();
		delete this.__elements[id];
		return this;
	}

	/**
	 * Add an easily replaceable child component into an element.
	 *
	 * @param component Child component property.
	 * @param id `jwid` of element to replace.
	 */
	addReplaceable(component: Bindable<Component>, id: string): ComponentReplaceable {
		return new ComponentReplaceable(this, component, id);
	}

	/**
	 * Add child component array into an element. As opposed to `addCollection` method, keeps
	 * component order. However, it works slower and accepts array only.
	 *
	 * @param source Child component array.
	 * @param el `jwid` of element to add child components into. Defaults to root element (`el`) of component.
	 */
	addList(source: IList<Component>, el?: string | HTMLElement | JQuery): ComponentList {
		return new ComponentList(this, source, this._getContainerElement(el));
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
		if (this._wasAfterAppend || !this._el) {
			return;
		}
		if (this._parent && !this._parent._wasAfterAppend) {
			return;
		}
		if (!this._parent && !DomUtils.inDom(this._el[0])) {
			return;
		}
		this._wasAfterAppend = true;
		this.afterAppend();
		this._children.each(DomUtils._afterAppend);
		DictionaryUtils.each<ComponentList>(this.__arrays, DomUtils._afterAppend);
		DictionaryUtils.each<ComponentCollection>(this.__collections, DomUtils._afterAppend);
	}

	/**
	 * @hidden
	 */
	_initChild(component: Component) {
		component.render();
		component._parent = this;
	}

	/**
	 * @hidden
	 */
	_doneChild(component: Component) {
		component._parent = null;
	}

	/**
	 * @hidden
	 */
	_getContainerElement(el?: any) {
		return (el === undefined) ? this._el :
			(typeof el === "string") ? this.__elements[el] : jQuery(el);
	}
}
