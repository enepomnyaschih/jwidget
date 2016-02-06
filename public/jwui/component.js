/*
	jWidget UI source file.

	Copyright (C) 2015 Egor Nepomnyaschih

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

/**
 * @class JW.UI.Component
 *
 * Base class of UI component.
 *
 * Features:
 *
 * - Rendering by HTML template
 * - Direct access to component elements
 * - [jQuery-interface](http://api.jquery.com/) for element manipulations
 * - Convenient API for child component management
 *
 * jWidget has very simple interface, but pretty unusual philosophy, which guarantees Model-View architecture
 * following without a lot of effort. Let's start with examples.
 *
 * ### jWidget UI-component example
 *
 *     // Define namespace
 *     var MyApp = {};
 *
 *     // Define component constructor
 *     MyApp.Component = function(message, link) {
 *         MyApp.Component.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.message = message;
 *         this.link = link;
 *     };
 *
 *     // Inherit from JW.UI.Component
 *     JW.extend(MyApp.Component, JW.UI.Component, {
 *         // String message;
 *         // String link;
 *
 *         // override
 *         {@link #afterRender afterRender}: function() {
 *             this.{@link JW.Class#method-_super _super}();
 *             this.{@link #getElement getElement}("hello-message").text(this.message);
 *             this.{@link #getElement getElement}("link").attr("href", this.link);
 *         }
 *     });
 *
 *     JW.UI.template(MyApp.Component, {
 *         main:
 *             '<div jwclass="myapp-component">' +
 *                 '<div jwid="hello-message"></div>' +
 *                 '<a href="#" jwid="link">Click me!</a>' +
 *             '</div>'
 *     });
 *
 * Let's learn, how HTML-template works. Each component has main template, which is passed into
 * JW.UI.template function with name `main` and defaults to
 * <code>&lt;div&gt;&lt;/div&gt;</code>. You can add other templates as well, they'll be available in component's field
 * <code>{@link #templates this.templates}.&lt;template_name&gt;</code> (but they are not used usually).
 * Subclass inherits superclass templates.
 *
 * Take a note at special attributes `jwclass` and `jwid`. `jwclass` is root CSS-class of component,
 * `jwid` is a suffix to `jwclass` in this element. So, next HTML fragment will be rendered in result
 * of this component rendering:
 *
 *     <div class="myapp-component">
 *         <div class="myapp-component-hello-message"></div>
 *         <a href="#" class="myapp-component-link">Click me!</a>
 *     </div>
 *
 * You can retrieve an element by its `jwid` using method #getElement. Result of this method is
 * a [jQuery-wrapper](http://api.jquery.com/) over this element. Root element always has jwid "root".
 * In addition, root element of the component is stored in #el property.
 *
 * ### Component creation in code
 *
 * Component can be created by simple construction of component object. After that, you can use method #renderTo
 * or #renderAs in order to insert this component into DOM.
 *
 *     var component;
 *
 *     jQuery(function() {
 *         component = new MyApp.Component("Hello world!", "http://google.com");
 *         component.{@link #renderTo renderTo}("body");
 *     });
 *
 * ### Child components
 *
 * There are 5 ways to add a child component:
 *
 * - Add a child component into #children map with a key equal to `jwid` of element to replace with the child
 * component. Usually it is done in #afterRender method.
 * - Add an easily replaceable child component using #addReplaceable method. Pass JW.Property there and
 * the framework will provide the continuous synchronization with this property during application running.
 * - Add an array of child components into some element using #addArray method. If the passed array
 * is JW.ObservableArray, then framework will provide the continuous synchronization with this array during
 * application running.
 * - Add a collection of child components into some element using #addCollection method. As opposed to #addArray
 * method, #addCollection doesn't keep the child component order. A newly added component is always appended to the
 * end. If the passed collection is observable, then framework will provide the continuous synchronization with this
 * collection during application running.
 * - Define method <code>render&lt;ChildId&gt;</code>, where <code>&lt;ChildId&gt;</code> is `jwid` of element,
 * written in CamelCase with capitalized first letter. Example: `renderArticle` (renders element `jwid="article"`).
 * If the method returns JW.UI.Component, JW.Property or JW.AbstractCollection, then result will be treated as child component
 * or child component collection. Define method `renderRoot` to render root element, but you can return JW.AbstractCollection
 * only there.
 * See **More about render&lt;ChildId&gt; method** paragraph for details.
 *
 * Such interface provides simplicity, at one hand, and flexibility in Model-View architecture following regard,
 * at another hand.
 *
 * [Getting started. Part 1. Model and view](#!/guide/ensample1)
 *
 * ### More about child component collections
 *
 * It is convenient to use JW.AbstractCollection#$$mapObjects method to convert data collections into UI component collections.
 * Thanks to it, view will be updated on data update automatically.
 *
 * That's the reason why we recommend to use jWidget collections in data model instead of native JavaScript
 * Array and Object: jWidget collections have observable implementations which can be synchronized to each other.
 *
 * [Getting started. Part 6. Collection synchronizers](#!/guide/ensample6)
 *
 * ### More about render&lt;ChildId&gt; method
 *
 * You can define method `render<ChildId>` for every element in HTML template that has attribute `jwid`.
 * `<ChildId>` equals to this `jwid`, written in CamelCase with capitalized first letter. Method signature:
 *
 * <code>renderChildId(el: [jQuery](http://api.jquery.com/)): Mixed</code>
 *
 * `el` - element with corresponding `jwid`.
 *
 * Depending on the returned result of this method, there are next capabilities:
 *
 * - If method returns JW.UI.Component, then it will be added into #children map and will become a child component.
 * Doesn't work for root element.
 * - If method returns JW.Property, then it will be added as easily replaceable child component by
 * method #addReplaceable. Doesn't work for root element.
 * - If method returns JW.AbstractArray, then it will be added as child array by method #addArray.
 * - If method returns JW.AbstractCollection (which is not JW.AbstractArray), then it will be added as child
 * collection by method #addCollection.
 * - If method returns `false` (===), then element will be removed from component HTML. Doesn't work for root element.
 * - In any other case, framework won't perform any additional action.
 *
 * ### Components removal and destruction
 *
 * You can destroy the component via #destroy method. However you can not destroy a component which is added into
 * another one as a child (framework will throw an exception in this case). You must remove child component from a
 * parent first. To remove the component from a parent, you must perform the operation opposite to adding operation.
 *
 * - If you have added a component to #children object, you must remove it via
 * {@link JW.AbstractMap#method-remove remove} method.
 * - Method #addReplaceable returns an instance of JW.UI.Component.Replaceable. Its destruction removes the
 * replaceable child.
 * - Method #addArray returns an instance of JW.UI.Component.Array. Its destruction removes the array.
 * - Method #addCollection returns an instance of JW.UI.Component.Collection. Its destruction removes the collection.
 *
 * As soon as child component is removed, you can destroy it:
 *
 *     this.{@link JW.UI.Component#children children}.{@link JW.AbstractMap#method-remove remove}("comments").{@link JW.Class#destroy destroy}();
 *
 * Another example:
 *
 *     // should be called not before the rendering initiation
 *     initLabels: function() {
 *         this._labelViews = this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
 *             return new LabelView(label);
 *         }, this);
 *         // Add labels into element with jwid="labels"
 *         this._labelArray = this.{@link #addArray addArray}(this._labelViews, "labels");
 *     },
 *
 *     clearLabels: function() {
 *         this._labelArray.{@link JW.Class#destroy destroy}();
 *         this._labelArray = null;
 *         this._labelViews.{@link JW.Class#destroy destroy}();
 *         this._labelViews = null;
 *     }
 *
 * You don't need to remove child components explicitly all the time. On parent component destruction, framework
 * automatically removes all the children before {@link #unrender} method call. However, it doesn't destroy them.
 * You can use aggregation method {@link JW.Class#own own} to destroy the child components. So, usually your code will
 * look as simple as this:
 *
 *     renderTitleBox: function() {
 *         return this.{@link JW.Class#own own}(new TitleBox());
 *     },
 *
 *     renderLabels: function() {
 *         return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
 *             return new LabelView(label);
 *         }, this));
 *     }
 *
 * ### Common practices of child component management
 *
 * **Create child component**
 *
 * This example describes how to create and destroy a child component with `jwid="title-box"`.
 *
 *     var MyComponent = function() {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         renderTitleBox: function() {
 *             return this.{@link JW.Class#own own}(new TitleBox());
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="title-box"></div>' +
 *             '</div>'
 *     });
 *
 * **Create replaceable child component**
 *
 * This example describes how to create an easily replaceable child component with `jwid="document"`.
 * Assume that you have a property "document" and want to replace an old document view with a new one
 * on document change.
 *
 *     var MyComponent = function(document) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.document = document;
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // JW.Property<Document> document;
 *
 *         renderDocument: function() {
 *             return this.{@link JW.Class#own own}(this.document.{@link JW.Property#$$mapObject $$mapObject}(function(document) {
 *                 return new DocumentView(document);
 *             }, this));
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="document"></div>' +
 *             '</div>'
 *     });
 *
 * **Create child collection**
 *
 * This example describes how to create and destroy child components by data collection, and insert them into
 * element with `jwid="labels"`. If data collection is observable, child collection will be constantly synchronized with data.
 *
 *     var MyComponent = function(labels) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.labels = labels;
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // JW.AbstractArray<Label> labels;
 *
 *         renderLabels: function() {
 *             return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(label) {
 *                 return new LabelView(label);
 *             }, this));
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="labels"></div>' +
 *             '</div>'
 *     });
 *
 * **Add existing components as children**
 *
 * This example describes how to insert child components which were created by someone else, and therefore
 * shouldn't be destroyed automatically. Here, "titleBox" can be either JW.UI.Component, or
 * JW.Property<JW.UI.Component>, or JW.AbstractCollection<JW.UI.Component>.
 *
 *     var MyComponent = function(titleBox) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.titleBox = titleBox;
 *     };
 *
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // Mixed titleBox;
 *
 *         renderTitleBox: function() {
 *             return this.titleBox;
 *         }
 *     });
 *
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="title-box"></div>' +
 *             '</div>'
 *     });
 *
 * ### Component life stages
 *
 * Each component has several stages of life.
 *
 * 1. Like in all other classes, **constructor** is called first. Usually all fields are defined and assigned to
 * their initial values here, events are created etc. Only component model should be touched here, view is completely
 * ignored. Notice that component is not rendered after construction yet, so it doesn't have
 * fields #el and #children, methods #addArray, #addCollection and #addReplaceable won't work.
 * The main reason of that is to give you ability to
 * do something else between component construction and rendering, for example, change some field values and call
 * some methods. Second reason: it is not recommended to call virtual methods in constructor in any object-oriented
 * language. You can render the component directly by calling #render, #renderTo, #renderAs,
 * or by adding this component into another component as a child. For example, component will be rendered immediately
 * after adding into #children map. You can invoke component rendering multiple times, but it will be rendered only
 * on first invokation.
 * 1. Method #beforeRender is called during rendering, after HTML template reading and initialization of all links to
 * this template elements. It is convenient to perform some preliminary action here before child components creation.
 * But you are already able to create child components here. <code>this._super()</code> call is performed at first line
 * of method.
 * 1. All <code>render&lt;ChildId&gt;</code> methods are called for HTML template elements, i.e. child component
 * creation is performed.
 * 1. Method #afterRender is called. You should assign all elements' attributes here, create child components,
 * bind to events and fill component with interactivity. Component rendering is finished here.
 * <code>this._super()</code> call is performed at first line of method.
 * 1. Method #afterAppend is called after first-time component appearing in HTML DOM and UI components tree.
 * Component layouting should be performed here (calculate element sizes).
 * <code>this._super()</code> call is performed at first line of method.
 * 1. Method #releaseDom is called during component destruction. Everything that was performed in #afterAppend method,
 * i.e. on step 5, should be reverted here. <code>this._super()</code> method call is performed at last line of method.
 * 1. Method #unrender is called during component destruction. Everything that was performed during component
 * rendering, i.e. on steps 2-4, should be reverted here. All child components are already removed by framework
 * before this method call, but the components themselves are not destroyed. You must destroy them explicitly unless
 * you used {@link JW.Class#own own} method to aggregate them.
 * <code>this._super()</code> method call is performed at last line of method.
 * 1. Method #afterDestroy is called during component destruction. Everything that was performed in component
 * constructor, i.e. on step 1, should be reverted here. <code>this._super()</code> method call is performed
 * at last line of method.
 *
 * ### Intergration with jWidget SDK
 *
 * jWidget UI library is integrated with [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/en) perfectly, and
 * it gives you nice code optimizations of JS-code out of the box and capability to extract HTML templates into
 * separate files. For example, you can simplify the very first example by splitting code into 2 files:
 *
 * **component.js**
 *
 *     // Define namespace
 *     var MyApp = {};
 *
 *     // Define component constructor
 *     MyApp.Component = function(message, link) {
 *         MyApp.Component.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.message = message;
 *         this.link = link;
 *     };
 *
 *     // Inherit from JW.UI.Component
 *     JW.extend(MyApp.Component, JW.UI.Component, {
 *         // String message;
 *         // String link;
 *
 *         // override
 *         {@link #afterRender afterRender}: function() {
 *             this.{@link JW.Class#method-_super _super}();
 *             this.{@link #getElement getElement}("hello-message").text(this.message);
 *             this.{@link #getElement getElement}("link").attr("href", this.link);
 *         }
 *     });
 *
 * **component.jw.html**
 *
 *     <div jwclass="myapp-component">
 *         <div jwid="hello-message"></div>
 *         <a href="#" jwid="link">Click me!</a>
 *     </div>
 *
 * To make this work, you just need to register the next resources in corresponding jWidget SDK package:
 *
 *     {
 *         "resources" : [
 *             "component.js",
 *             "component.jw.html : MyApp.Component",
 *             ...
 *         ]
 *     }
 *
 * Sure, you can use jWidget even without jWidget SDK, but in this case you'll need to either load HTML templates
 * dinamically or define them explicitly right in JavaScript code using JW.UI.template function.
 *
 * See more complicated example in article:
 *
 * [Getting started. Part 7. Project infrastructure](#!/guide/ensample7)
 *
 * ### Clear-div persistence
 *
 * As of jWidget 1.4, you may render child collections to non-blank DOM elements. In this case, all existing nodes
 * stay at the end of the element. The most common application of this feature
 * is <a href="https://css-tricks.com/the-how-and-why-of-clearing-floats/" target="_blank">clear-div usage</a>.
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="600" height="260" src="http://enepomnyaschih.github.io/mt/1.4/jwui-clear-div.html"></iframe>
 *
 * @extends JW.Class
 * @constructor
 */
JW.UI.Component = function() {
	JW.UI.Component._super.call(this);
	this.parent = null;
	this.wasAfterAppend = false;
	this.el = null;
	this.children = null;
	this._template = this.templates.main;
	this._elements = null; // Map<jQuery>
	this._replaceables = null; // Set<JW.UI.Component.Replaceable>
	this._arrays = null; // Set<JW.UI.Component.Array>
	this._collections = null; // Set<JW.UI.Component.Collection>
},

JW.extend(JW.UI.Component, JW.Class, {
	/**
	 * @property {boolean} wasAfterAppend Was #afterAppend called?
	 */
	/**
	 * @property {Object} templates `<JW.UI.Component.Template>` Map from template ID to the template. Templates are defined by JW.UI.template method.
	 */
	/**
	 * @property {JW.UI.Component} parent Parent component. Field is available from component rendering beginning.
	 */
	/**
	 * @property {jQuery} el Root element. Field is available from component rendering beginning.
	 */
	/**
	 * @property {JW.AbstractMap} children
	 * `<JW.UI.Component>` (mutable) Named child components. Use this map to add child components in place of
	 * elements with corresponding `jwid`. Field is available from component rendering beginning.
	 */

	destroy: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this.wasAfterAppend) {
			this.releaseDom();
		}
		if (this.el) {
			JW.UI.remove(this.el[0]);
			JW.Set.each(this._collections, JW.destroy);
			this._collections = null;
			JW.Set.each(this._arrays, JW.destroy);
			this._arrays = null;
			JW.Set.each(this._replaceables, JW.destroy);
			this._replaceables = null;
			this.children.unrender();
		}
		this._super();
	},

	destroyObject: function() {
		if (this.el) {
			this.unrender();

			this.children.destroy();
			this.children = null;
			this.el.remove();
		}
		this._elements = null;
		this.el = null;
		this.afterDestroy();
		this._super();
	},

	/**
	 * Component life stage method. Called during component rendering after HTML template parsing and initialization
	 * of references to all elements of the template. Called before `render<ChildId>` methods and
	 * {@link #afterRender} method. It is convenient to perform some preliminary action here before child
	 * components creation. But you are already able to create child components here. <code>this._super()</code>
	 * call is performed at first line of method.
	 *
	 * @returns {void}
	 */
	beforeRender: function() {},

	/**
	 * Component life stage method. Called after #beforeRender method and `render<ChildId>` methods.
	 * You should assign all elements' attributes here, create child components,
	 * bind to events and fill component with interactivity. <code>this._super()</code> call is performed at
	 * first line of method.
	 *
	 * @returns {void}
	 */
	afterRender: function() {},

	/**
	 * Component life stage method. Called after first-time component appearing in HTML DOM and UI components tree.
	 * Component layouting should be performed here (calculate element sizes).
	 * Component rendering is finished here. <code>this._super()</code> call is performed at first line of method.
	 *
	 * @returns {void}
	 */
	afterAppend: function() {},

	/**
	 * Component life stage method. Called during component destruction before {@link #unrender} method call.
	 * Everything that was performed in #afterAppend method should be reverted here.
	 *
	 * @returns {void}
	 */
	releaseDom: function() {},

	/**
	 * Component life stage method. Called during component destruction before {@link #afterDestroy} method call.
	 * Everything that was performed during component
	 * rendering should be reverted here. All child component arrays are already removed by framework
	 * before this method call, but the components themselves are not destroyed. You must destroy them explicitly.
	 * Unlike arrays, named child component will be destroyed automatically after #unrender method, so you must
	 * remove them from #children map if you want to keep them alive. <code>this._super()</code> method call is performed
	 * at last line of method.
	 *
	 * @returns {void}
	 */
	unrender: function() {},

	/**
	 * Component life stage method. Called during component destruction after {@link #unrender} method call.
	 * Everything that was performed during component construction should be reverted here.
	 * <code>this._super()</code> method call is performed at last line of method.
	 *
	 * @returns {void}
	 */
	afterDestroy: function() {},

	/**
	 * Selects component rendering strategy. By default, component is rendered outside of DOM based on `main` HTML
	 * template specified by JW.UI.template method. You can change this by passing one of the next values
	 * into #using method of the component:
	 *
	 * - JW.UI.Component.Template or String - use this template explicitly for rendering
	 * - DOMElement or jQuery - build component on top of existing DOM element. Special attributes `jwclass` and `jwid`
	 * will be processed the usual way
	 *
	 * **Disclaimer:** We strongly encourage you to use standard rendering strategy via JW.UI.template, or at least
	 * create JW.UI.Component.Template instances to store your HTML templates. They work 3 times faster compared to
	 * raw HTML rendering thanks to preliminary compilation and node cloning method.
	 *
	 * @param {Object} value Template or element to use for component rendering.
	 * @returns {JW.UI.Component} this
	 */
	using: function(value) {
		this._template =
			(typeof value === "string") ? new JW.UI.Component.Template(value) :
			(value instanceof JW.UI.Component.Template) ? value : new JW.UI.Component.DomTemplate(value);
		return this;
	},

	/**
	 * Renders component. Call this method to initialize references to all elements of component and create
	 * child components. This method is called automatically in next cases:
	 *
	 * - One of methods #renderTo, #renderAs is called
	 * - The component is added into another component as a child
	 *
	 * Feel free to call component rendering multiple times: it will be rendered only once.
	 *
	 * @returns {JW.UI.Component} this
	 */
	render: function() {
		if (this.el) {
			return this;
		}
		var output = this._template.createElement();
		this.el = jQuery(output.root);
		this._elements = JW.Map.map(output.groups, jQuery);
		this.children = new JW.UI.Component.Children(this);
		this._replaceables = {};
		this._arrays = {};
		this._collections = {};
		this.beforeRender();
		var elements = JW.apply({}, this._elements);
		for (var jwId in elements) {
			var element = elements[jwId];
			var aliveElements = JW.Array.filter(element, function(el) {
				return JW.UI.inEl(el, this.el[0]);
			}, this);
			if (aliveElements.length === 0) {
				delete this._elements[jwId];
				continue;
			}
			if (aliveElements.length !== element.length) {
				element = jQuery(aliveElements);
				this._elements[jwId] = element;
			}
			var jwIdCamel = JW.String.camel(jwId);
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				var result = this[renderMethodName](element);
				if (jwId === "root") {
					if (result instanceof JW.AbstractArray) {
						this.addArray(result, jwId);
					} else if (result instanceof JW.AbstractCollection) {
						this.addCollection(result, jwId);
					}
				} else {
					if (result instanceof JW.UI.Component) {
						this.children.set(result, jwId);
					} else if (result instanceof JW.Property) {
						this.addReplaceable(result, jwId);
					} else if (result instanceof JW.AbstractArray) {
						this.addArray(result, jwId);
					} else if (result instanceof JW.AbstractCollection) {
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
	},

	/**
	 * Render component into specified element. Use it to render root component only: its children must be rendered
	 * using #children or #addArray stuff.
	 *
	 * @param {jQuery} [el] Element to render into.
	 * @returns {JW.UI.Component} this
	 */
	renderTo: function(el) {
		this.render();
		jQuery(el)[0].appendChild(this.el[0]);
		this._afterAppend();
		return this;
	},

	/**
	 * Render component in place of specified element. Use it to render root component only: its children must be rendered
	 * using #children or #addArray stuff.
	 *
	 * @param {jQuery} [el] Element to render in place of.
	 * @returns {JW.UI.Component} this
	 */
	renderAs: function(el) {
		this.render();
		JW.UI.replace(jQuery(el)[0], this.el[0], true);
		this._afterAppend();
		return this;
	},

	/**
	 * Remove component from DOM. Can be used for root component only (which was added via #renderTo or #renderAs
	 * method. All child components should be removed using #children or JW.UI.Component.Array stuff.
	 *
	 * @returns {JW.UI.Component} this
	 */
	remove: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		JW.UI.remove(this.el[0]);
		return this;
	},

	/**
	 * Get element by its `jwid`.
	 * @param {string} jwid
	 * @returns {jQuery} Element.
	 */
	getElement: function(id) {
		return this._elements[id];
	},

	/**
	 * Remove element by `jwid`. Element will be removed from DOM and it will be impossible to get it
	 * by #getElement method.
	 * @param {string} jwid
	 * @returns {void}
	 */
	removeElement: function(id) {
		var el = this._elements[id];
		if (!el) {
			return;
		}
		el.remove();
		delete this._elements[id];
	},

	/**
	 * Add an easily replaceable child component into specified element.
	 *
	 * Pass an instance of JW.Property<JW.UI.Component>, and view will be synchronized with this property of fly.
	 *
	 * It is convenient to create "component" property from data property using JW.Property#$$mapObject method.
	 *
	 * Method returns an instance of JW.UI.Component.Replaceable. This object is purposed for replaceable child
	 * removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the replaceable will be removed from parent component on parent component destruction right
	 * before #unrender method call.
	 * But notice that child component inside this property won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.Mapper or property destruction in #unrender method.
	 *
	 * @param {JW.Property} component `<JW.UI.Component>` Child component property.
	 * @param {String} id jwId of element to replace.
	 * @returns {JW.UI.Component.Replaceable} Replaceable child component wrapper.
	 */
	addReplaceable: function(component, id) {
		return new JW.UI.Component.Replaceable(this, component, id);
	},

	/**
	 * Add child component array into specified element. As opposed to #addCollection method, keeps
	 * component order. However, it works slower and accepts array only.
	 *
	 * Based on JW.UI.Inserter synchronizer. Thanks to that, if you'll pass an instance of
	 * JW.ObservableArray as "components", then view will be synchronized with this array content of fly.
	 *
	 * It is convenient to create "components" array from data array using JW.AbstractArray#$$mapObjects method,
	 * i.e. by JW.AbstractCollection.Mapper instantiation.
	 *
	 * Method returns an instance of JW.UI.Component.Array. This object is purposed for child component array
	 * removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the array will be removed from parent component on parent component destruction right
	 * before #unrender method call.
	 * But notice that child components inside this array won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.AbstractCollection.Mapper or array destruction in #unrender method.
	 *
	 * @param {JW.AbstractArray} components Child component array.
	 * @param {jQuery/string} [el]
	 * Element to add child components into, or its `jwid`.
	 * Defaults to root element (#el) of component.
	 * @returns {JW.UI.Component.Array} Child component array wrapper.
	 */
	addArray: function(source, el) {
		return new JW.UI.Component.Array(this, source, this._getContainerElement(el));
	},

	/**
	 * Add child component collection into specified element. As opposed to #addArray method, ignores
	 * component order. However, it works faster and accepts any kind of collection, not array only.
	 *
	 * If you'll pass an instance of JW.ObservableCollection as "components",
	 * then view will be synchronized with this collection content of fly.
	 *
	 * It is convenient to create "components" collection from data collection using
	 * JW.AbstractCollection#$$mapObjects method, i.e. by JW.AbstractCollection.Mapper instantiation.
	 *
	 * Method returns an instance of JW.UI.Component.Collection. This object is purposed for child component
	 * collection removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the collection will be removed from parent component on parent component destruction right
	 * before #unrender method call.
	 * But notice that child components inside this collection won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.AbstractCollection.Mapper or collection destruction in #unrender method.
	 *
	 * @param {JW.AbstractCollection} components Child component collection.
	 * @param {jQuery/string} [el]
	 * Element to add child components into, or its `jwid`.
	 * Defaults to root element (#el) of component.
	 * @returns {JW.UI.Component.Collection} Child component collection wrapper.
	 */
	addCollection: function(source, el) {
		return new JW.UI.Component.Collection(this, source, this._getContainerElement(el));
	},

	_afterAppend: function() {
		if (this.wasAfterAppend || !this.el) {
			return;
		}
		if (this.parent && !this.parent.wasAfterAppend) {
			return;
		}
		if (!this.parent && !JW.UI.inDom(this.el[0])) {
			return;
		}
		this.wasAfterAppend = true;
		this.afterAppend();
		this.children.each(JW.UI._afterAppend);
		JW.Set.each(this._arrays, JW.UI._afterAppend);
	},

	_initChild: function(component) {
		component.render();
		component.parent = this;
	},

	_doneChild: function(component) {
		component.parent = null;
	},

	_getContainerElement: function(el) {
		return (el === undefined) ? this.el :
			(typeof el === "string") ? this._elements[el] : jQuery(el);
	}
});

JW.UI.Component.EventParams = function(sender) {
	JW.UI.Component.EventParams._super.call(this, sender);
};

JW.extend(JW.UI.Component.EventParams, JW.EventParams, {
	/*
	Fields
	JW.UI.Component sender;
	*/
});
