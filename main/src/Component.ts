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

import jQuery from 'jquery';
import AbstractTemplate from './AbstractTemplate';
import Bindable from './Bindable';
import Class from './Class';
import ComponentBindable from './component/ComponentBindable';
import ComponentChildren from './component/ComponentChildren';
import ComponentCollection from './component/ComponentCollection';
import ComponentList from './component/ComponentList';
import Destroyable from "./Destroyable";
import Dictionary from './Dictionary';
import * as DictionaryUtils from './DictionaryUtils';
import DomTemplate from './DomTemplate';
import * as DomUtils from './DomUtils';
import HtmlTemplate from './HtmlTemplate';
import IMap from "./IMap";
import {apply, destroy} from './index';
import List from './List';
import Map from './Map';
import Property from './Property';
import ReadonlyCollection from './ReadonlyCollection';
import ReadonlyList from './ReadonlyList';
import Set from './Set';
import * as StringUtils from './StringUtils';
import TemplateOutput from './TemplateOutput';

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
	private _template: AbstractTemplate;

	private __elements: Dictionary<JQuery> = null;
	private __bindables: Dictionary<ComponentBindable> = null;
	private __arrays: Dictionary<ComponentList> = null;
	private __collections: Dictionary<ComponentCollection> = null;

	/**
	 * Plain objects of this class can be constructed. They can be used as dummy components or simple containers.
	 */
	constructor() {
		super();
		if (!Component.prototype._template) {
			Component.prototype._template = new HtmlTemplate('<div></div>');
		}
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
	get children(): IMap<Component> {
		return this._children;
	}

	/**
	 * Component template.
	 */
	get template(): AbstractTemplate {
		return this._template;
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
	get _bindables() {
		return this.__bindables;
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
	 * @inheritDoc
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
			DictionaryUtils.forEach(this.__collections, destroy);
			this.__collections = null;
			DictionaryUtils.forEach(this.__arrays, destroy);
			this.__arrays = null;
			DictionaryUtils.forEach(this.__bindables, destroy);
			this.__bindables = null;

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
	 * By default, renders by template.
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
		const output = this.createElement();
		this._el = jQuery(output.root);
		this.__elements = DictionaryUtils.map(output.groups, function (x) {
			return jQuery(x);
		});
		this._children = new ComponentChildren(this);
		this.__bindables = {};
		this.__arrays = {};
		this.__collections = {};
		this.beforeRender();
		const elements = apply({}, this.__elements);
		for (const jwId in elements) {
			let element = elements[jwId];
			const aliveElements = Array.prototype.filter.call(element, (el: HTMLElement) => {
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
			const jwIdCamel = StringUtils.camel(jwId);
			const renderMethodName = "render" + StringUtils.capitalize(jwIdCamel);
			if (typeof (<any>this)[renderMethodName] === "function") {
				const result = (<any>this)[renderMethodName](element);
				if (jwId === "root") {
					if (result instanceof List) {
						this.addList(result, jwId);
					} else if (result instanceof Map || result instanceof Set) {
						this.addCollection(result, jwId);
					}
				} else {
					if (result instanceof Component) {
						this._children.put(jwId, result);
					} else if (result instanceof Property) {
						this.addBindable(result, jwId);
					} else if (result instanceof List) {
						this.addList(result, jwId);
					} else if (result instanceof Map || result instanceof Set) {
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
	 * using `children`, `addList`, `addCollection`, `addBindable` members.
	 *
	 * @param el Element to render component into.
	 */
	renderTo(el: string | HTMLElement | JQuery): this {
		this.render();
		jQuery(<any>el)[0].appendChild(this._el[0]);
		this._afterAppend();
		return this;
	}

	/**
	 * Render component in place of an element. Use it to render root component only: its children must be rendered
	 * using `children`, `addList`, `addCollection`, `addBindable` members.
	 *
	 * @param el Element to render component in place of.
	 */
	renderAs(el: string | HTMLElement | JQuery): this {
		this.render();
		DomUtils.replace(jQuery(<any>el)[0], this._el[0], true);
		this._afterAppend();
		return this;
	}

	/**
	 * Remove the component from DOM. Can be used for root component only (which was added via `renderTo` or `renderAs`
	 * method). All child components should be removed using `children` map or owning object deletion.
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
	getElement(id: string) {
		return this.__elements[id];
	}

	/**
	 * Remove element by `jwid`. Element gets removed from DOM and destroyed. It is then impossible to get it by `getElement` method.
	 * @param id `jwid` of the element.
	 */
	removeElement(id: string): this {
		const el = this.__elements[id];
		if (!el) {
			return this;
		}
		el.remove();
		delete this.__elements[id];
		return this;
	}

	/**
	 * Adds child component and synchronizes the component with the bindable.
	 *
	 * @param component Child component bindable.
	 * @param id `jwid` of element to replace.
	 */
	addBindable(component: Bindable<Component>, id: string): Destroyable {
		return new ComponentBindable(this, component, id);
	}

	/**
	 * Adds list of child components and synchronizes the component with it. As opposed to `addCollection` method,
	 * keeps component order. However, it works slower and accepts list only.
	 *
	 * @param source Child component list.
	 * @param el `jwid` of element to add child components into. Defaults to root element (`el`) of component.
	 */
	addList(source: ReadonlyList<Component>, el?: string | HTMLElement | JQuery): Destroyable {
		return new ComponentList(this, source, this._getContainerElement(el));
	}

	/**
	 * Add child component collection into an element. As opposed to `addArray` method, ignores
	 * component order. However, it works faster and accepts any kind of collection, not array only.
	 *
	 * @param source Child component collection.
	 * @param el `jwid` of element to add child components into. Defaults to root element (`el`) of component.
	 */
	addCollection(source: ReadonlyCollection<Component>, el?: string | HTMLElement | JQuery): Destroyable {
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
		this._children.forEach(DomUtils._afterAppend);
		DictionaryUtils.forEach<ComponentList>(this.__arrays, DomUtils._afterAppend);
		DictionaryUtils.forEach<ComponentCollection>(this.__collections, DomUtils._afterAppend);
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
