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

import jQuery from 'jquery';
import AbstractTemplate from './AbstractTemplate';
import Bindable from './Bindable';
import BindableArray from './BindableArray';
import BindableSet from './BindableSet';
import Class from './Class';
import ComponentArray from './component/ComponentArray';
import ComponentBindable from './component/ComponentBindable';
import ComponentChildren from './component/ComponentChildren';
import ComponentSet from './component/ComponentSet';
import Destroyable from "./Destroyable";
import DomTemplate from './DomTemplate';
import * as DomUtils from './DomUtils';
import HtmlTemplate from './HtmlTemplate';
import IBindableMap from "./IBindableMap";
import {destroy} from './index';
import {map} from "./MapUtils";
import Property from './Property';
import ReadonlyBindableArray from './ReadonlyBindableArray';
import ReadonlyBindableSet from './ReadonlyBindableSet';
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

	private __elements: Map<string, JQuery> = null;
	private __bindables: Map<string, ComponentBindable> = null;
	private __arrays: Set<ComponentArray> = null;
	private __sets: Set<ComponentSet> = null;

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
	get children(): IBindableMap<string, Component> {
		return this._children;
	}

	/**
	 * Component template.
	 */
	get template(): AbstractTemplate {
		return this._template;
	}

	get _elements() {
		return this.__elements;
	}

	get _bindables() {
		return this.__bindables;
	}

	get _arrays() {
		return this.__arrays;
	}

	get _sets() {
		return this.__sets;
	}

	destroy() {
		if (this._parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this._wasAfterAppend) {
			this.releaseDom();
		}
		if (this._el) {
			DomUtils.remove(this._el[0]);
			this.__sets.forEach(destroy);
			this.__sets = null;
			this.__arrays.forEach(destroy);
			this.__arrays = null;
			this.__bindables.forEach(destroy);
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
	 * bind event handlers and fill component with interactivity.
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
		this.__elements = map(output.groups, group => jQuery(group));
		this._children = new ComponentChildren(this);
		this.__bindables = new Map<string, ComponentBindable>();
		this.__arrays = new Set<ComponentArray>();
		this.__sets = new Set<ComponentSet>();
		this.beforeRender();
		const elements = new Map(this.__elements);
		for (let [jwId, element] of elements) {
			const aliveElements = Array.from(element).filter(el => DomUtils.inEl(el, this._el[0]));
			if (aliveElements.length === 0) {
				this.__elements.delete(jwId);
				continue;
			}
			if (aliveElements.length !== element.length) {
				element = jQuery(aliveElements);
				this.__elements.set(jwId, element);
			}
			const jwIdCamel = StringUtils.camel(jwId);
			const renderMethodName = "render" + StringUtils.capitalize(jwIdCamel);
			if (typeof (<any>this)[renderMethodName] === "function") {
				const result = (<any>this)[renderMethodName](element);
				if (jwId === "root") {
					if (result instanceof BindableArray) {
						this.addArray(result, jwId);
					} else if (result instanceof BindableSet) {
						this.addSet(result, jwId);
					}
				} else {
					if (result instanceof Component) {
						this._children.set(jwId, result);
					} else if (result instanceof Property) {
						this.addBindable(result, jwId);
					} else if (result instanceof BindableArray) {
						this.addArray(result, jwId);
					} else if (result instanceof BindableSet) {
						this.addSet(result, jwId);
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
	 * using `children`, `addArray`, `addSet`, `addBindable` members.
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
	 * using `children`, `addArray`, `addSet`, `addBindable` members.
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
		return this.__elements.get(id);
	}

	/**
	 * Remove element by `jwid`. Element gets removed from DOM and destroyed. It is then impossible to get it by `getElement` method.
	 * @param id `jwid` of the element.
	 */
	removeElement(id: string): this {
		const el = this.__elements.get(id);
		if (!el) {
			return this;
		}
		el.remove();
		this.__elements.delete(id);
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
	 * Adds an array of child components and synchronizes the component with it. As opposed to `addSet` method,
	 * keeps component order.
	 *
	 * @param source Child component array.
	 * @param el `jwid` of element to add child components into. Defaults to root element (`el`) of component.
	 */
	addArray(source: ReadonlyBindableArray<Component>, el?: string | HTMLElement | JQuery): Destroyable {
		return new ComponentArray(this, source, this._getContainerElement(el));
	}

	/**
	 * Add child component set into an element. As opposed to `addArray` method, ignores
	 * component order.
	 *
	 * @param source Child component set.
	 * @param el `jwid` of element to add child components into. Defaults to root element (`el`) of component.
	 */
	addSet(source: ReadonlyBindableSet<Component>, el?: string | HTMLElement | JQuery): Destroyable {
		return new ComponentSet(this, source, this._getContainerElement(el));
	}

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
		this.__arrays.forEach(DomUtils._afterAppend);
		this.__sets.forEach(DomUtils._afterAppend);
	}

	_initChild(component: Component) {
		component.render();
		component._parent = this;
	}

	_doneChild(component: Component) {
		component._parent = null;
	}

	_getContainerElement(el?: any) {
		return (el === undefined) ? this._el :
			(typeof el === "string") ? this.__elements.get(el) : jQuery(el);
	}
}
