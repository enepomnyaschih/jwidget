﻿/*
	jWidget UI source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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
 *         {@link #renderComponent renderComponent}: function() {
 *             this.{@link JW.Class#method-_super _super}();
 *             this.{@link #getElement getElement}("hello-message").text(message);
 *             this.{@link #getElement getElement}("link").attr("href", this.link);
 *         }
 *     });
 *     
 *     JW.UI.template(MyApp.Component, {
 *         main:
 *             '<div jwclass="myapp-component">' +
 *                 '<div jwid="hello-message" />' +
 *                 '<a href="#" jwid="link">Click me!</a>' +
 *             '</div>'
 *     });
 *
 * Let's learn, how HTML-template works. Each component has main template, which is passed into
 * JW.UI.template function with name `main` and defaults to
 * <code>&lt;div /&gt;</code>. You can add other templates as well, they'll be available in component's field
 * <code>{@link #templates this.templates}.&lt;template_name&gt;</code> (but they are not used usually).
 * Subclass inherits superclass templates.
 *
 * Take a note at special attributes `jwclass` and `jwid`. `jwclass` is root CSS-class of component,
 * `jwid` is a suffix to `jwclass` in this element. So, next HTML fragment will be rendered in result
 * of this component rendering:
 *
 *     <div class="myapp-component">
 *         <div class="myapp-component-hello-message" />
 *         <a href="#" class="myapp-component-link">Click me!</a>
 *     </div>
 *
 * You can retrieve an element by its `jwid` using method #getElement. Result of this method is
 * a [jQuery-wrapper](http://api.jquery.com/) over this element. In addition, the component
 * has field #el, which refers to root jQuery-element of the component.
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
 * There are 4 ways to add a child component:
 * 
 * - Add a child component into #children map with a key equal to `jwid` of element to replace with the child
 * component. Usually it is done in #renderComponent method.
 * - Add an easily replaceable child component using #addReplaceable method. Pass JW.Property there and
 * the framework will provide the continuous synchronization with this property during application running.
 * - Add an array of child components into some element using #addArray method. If the passed array
 * is JW.ObservableArray, then framework will provide the continuous synchronization with this array during
 * application running.
 * - Define method <code>render&lt;ChildId&gt;</code>, where <code>&lt;ChildId&gt;</code> is `jwid` of element,
 * written in CamelCase with capitalized first letter. Example: `renderArticle` (renders element `jwid="article"`).
 * If the method returns JW.UI.Component, JW.Property or JW.AbstractArray, then result will be treated as child component
 * or child component array. See **More about render&lt;ChildId&gt; method** paragraph for details.
 * 
 * Such interface provides simplicity, at one hand, and flexibility in Model-View architecture following regard,
 * at another hand.
 * 
 * [Getting started. Part 1. Model and view](#!/guide/ensample1)
 * 
 * ### More about child component arrays
 * 
 * It is convenient to use JW.AbstractCollection.Mapper to convert data arrays into UI component arrays.
 * Thanks to it, view will be updated on data update automatically.
 * 
 * That's the reason why we recommend to use jWidget JW.AbstractCollection in data model instead of native JavaScript
 * Array and Object: these collections have Observable-implementations and can be synchronized with each other.
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
 * - If method returns JW.Property, then it will be added as easily replaceable child component by
 * method #addReplaceable
 * - If method returns JW.AbstractArray, then it will be added as child array by method #addArray.
 * - If method returns `false` (===), then element will be removed from component HTML.
 * - In any other case, framework won't perform any additional action.
 * 
 * ### Components removal and destruction
 * 
 * You can destroy the component via #destroy method. But you can not destroy a component which is added into another one as a child (framework will
 * throw an exception in this case). You must remove child component from a parent first. To remove the component
 * from a parent, you must perform the operation opposite to adding operation. So, to remove a component
 * with `jwid="comments"` you must call {@link JW.AbstractMap#method-remove} method of #children object.
 * You can destroy this component immediately:
 * 
 *     this.{@link JW.UI.Component#children children}.{@link JW.AbstractMap#method-remove remove}("comments").{@link JW.Class#destroy destroy}();
 * 
 * In this case, the element of HTML template with such `jwid` will return back to its original state.
 *
 * You can destroy child components freely in {@link #destroyComponent} method of parent component. In this method,
 * child components are already removed from the parent by the framework and are ready to be destroyed.
 *
 * Also, you can use aggregation method {@link JW.Class#own} to destroy the child component.
 *
 * Child arrays are a bit more complicated. First way to remove a child which is added to the parent via array is to
 * remove this child from this array (if it is JW.ObservableArray). Second way: #addArray method returns an instance of
 * JW.UI.Component.Array. If you destroy it, the array will be removed from parent component:
 * 
 *         // override
 *         {@link #renderComponent renderComponent}: function() {
 *             this._labelMapper = this.labels.{@link JW.AbstractArray#createMapper createMapper}({
 *                 {@link JW.AbstractCollection.Mapper#createItem createItem}: function(label) { return new LabelView(label); },
 *                 {@link JW.AbstractCollection.Mapper#destroyItem destroyItem}: JW.destroy,
 *                 {@link JW.AbstractCollection.Mapper#scope scope}: this
 *             });
 *             // Add labels into element with jwid="labels"
 *             this._labelArray = this.{@link #addArray addArray}(this._labelMapper.{@link JW.AbstractCollection.Mapper#property-target target}, "labels");
 *         },
 *         
 *         clearLabels: function() {
 *             this._labelArray.{@link JW.Class#destroy destroy}();
 *         }
 * 
 * **Notice:** All arrays are already destroyed before #destroyComponent method call, i.e. all such child components
 * are already removed from a parent. But the components themselves are still not destroyed. You must destroy a
 * corresponding sychronizer for this usually:
 * 
 *         {@link #destroyComponent destroyComponent}: function() {
 *             this._labelMapper.{@link JW.Class#destroy destroy}(); // destroys all label views
 *             this.{@link JW.Class#method-_super _super}();
 *         }
 * 
 * Likely, the rules which were described in this paragraph seem too complicated for you, but their reasoning
 * will become clear in next paragraph.
 * 
 * ### Common practices of child component management
 *
 * **Internal named child component**
 *
 * This example describes how to create and destroy the child component with `jwid="title-box"`.
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
 *                 '<div jwid="title-box" />' +
 *             '</div>'
 *     });
 *
 * **Internal replaceable child component**
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
 *             return this.{@link JW.Class#own own}(new JW.Mapper([this.document], {
 *                 {@link JW.Mapper#createValue createValue}: function(document) {
 *                     return new DocumentView(document);
 *                 },
 *                 {@link JW.Mapper#destroyValue destroyValue}: JW.destroy,
 *                 {@link JW.Mapper#scope scope}: this
 *             })).{@link JW.Mapper#property-target target};
 *         }
 *     });
 *     
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="document" />' +
 *             '</div>'
 *     });
 *
 * **Internal immutable child array**
 *
 * This example describes how to create and destroy child components by data array, and insert them into
 * element with `jwid="labels"`.
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
 *             return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#$map $map}(function(label) {
 *                 return new LabelView(label);
 *             }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
 *         }
 *     });
 *     
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="labels" />' +
 *             '</div>'
 *     });
 *
 * **Internal mutable child array**
 *
 * This example describes how to create and destroy child components by data array, and insert them into
 * element with `jwid="labels"`. Child array will be being synchronized with data on fly.
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
 *             return this.{@link JW.Class#own own}(this.labels.{@link JW.AbstractArray#createMapper createMapper}({
 *                 {@link JW.AbstractCollection.Mapper#createItem createItem}: function(label) {
 *                     return new LabelView(label);
 *                 },
 *                 {@link JW.AbstractCollection.Mapper#destroyItem destroyItem}: JW.destroy,
 *                 {@link JW.AbstractCollection.Mapper#scope scope}: this
 *             })).{@link JW.AbstractCollection.Mapper#property-target target};
 *         }
 *     });
 *     
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="labels" />' +
 *             '</div>'
 *     });
 *
 * **External child components**
 *
 * This example describes how to insert child components which were created by someone else, and therefore
 * shouldn't be destroyed automatically. Here, "titleBox" can be either JW.UI.Component, or
 * JW.Property<JW.UI.Component>, or JW.AbstractArray<JW.UI.Component>.
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
 *                 '<div jwid="title-box" />' +
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
 * fields #el and #children, #addArray method won't work. The main reason of that is to give you ability to
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
 * 1. Method #renderComponent is called. You should assign all elements' attributes here, create child components,
 * bind to events and fill component with interactivity. <code>this._super()</code> call is performed at first line of
 * method.
 * 1. Method #afterAppend is called after first-time component appearing in HTML DOM and UI components tree.
 * Component layouting should be performed here (calculate element sizes).
 * Component rendering is finished here. <code>this._super()</code> call is performed at first line of method.
 * 1. Method #destroyComponent is called during component destruction. Everything that was performed during component
 * rendering, i.e. on steps 2-5, should be reverted here. All child components are already removed by framework
 * before this method call, but the components themselves are not destroyed. You must destroy them explicitly unless
 * you used {@link JW.Class#own own} method to aggregate them.
 * <code>this._super()</code> method call is performed at last line of method.
 * 1. Method #destroyObject is called during component destruction. Everything that was performed during component
 * construction, i.e. on step 1, should be reverted here. <code>this._super()</code> method call is performed
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
 *         {@link #renderComponent renderComponent}: function() {
 *             this.{@link JW.Class#method-_super _super}();
 *             this.{@link #getElement getElement}("hello-message").text(message);
 *             this.{@link #getElement getElement}("link").attr("href", this.link);
 *         }
 *     });
 * 
 * **component.jw.html**
 * 
 *     <div jwclass="myapp-component">
 *         <div jwid="hello-message" />
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
 * @extends JW.Class
 * @constructor
 */
JW.UI.Component = function(config) {
	JW.UI.Component._super.call(this);
	config = config || {};
	this.rootClass = config.rootClass;
	this.template = config.template;
	this.parent = null;
	this.wasAfterAppend = false;
	this.destroyed = false;
	this.el = null;
	this.replacedEl = null;
	this.children = null;
	this.allChildren = null;
	this._elements = null;
	this._childMapper = null;
	this._childInserter = null;
	this._replaceables = null;
	this._arrays = null;
},

JW.extend(JW.UI.Component, JW.Class, {
	/**
	 * @property {boolean} wasAfterAppend Was #afterAppend called?
	 */
	/**
	 * @property {boolean} destroyed Was component destroyed?
	 */
	/**
	 * @property {Object} templates Map from template ID to template string. Templates are defined by JW.UI.template method.
	 */
	/**
	 * @property {JW.UI.Component} parent Parent component. Field is available from component rendering beginning.
	 */
	/**
	 * @property {jQuery} el Root element. Field is available from component rendering beginning.
	 */
	/**
	 * @property {jQuery} replacedEl
	 * Element in place of which was this component rendered. Assigned automatically at the moment of component
	 * adding into #children map of parent component. Field is available from component rendering beginning.
	 */
	/**
	 * @property {JW.ObservableMap} children
	 * `<JW.UI.Component>` (mutable) Named child components. Use this map to add child components in place of
	 * elements with corresponding `jwid`. Field is available from component rendering beginning.
	 */
	/**
	 * @property {Object} allChildren
	 * Set of all child components (both named and arrays). Field is available from component rendering beginning.
	 */
	/*
	Optional
	String rootClass;
	String template;
	
	Fields
	Map<Element> _elements;
	JW.ObservableMap.Mapper<JW.UI.Component, JW.UI.Component.Child> _childMapper;
	JW.ObservableMap.Inserter<JW.UI.Component.Child> _childInserter;
	Set<JW.UI.Component.Replaceable> _replaceables;
	Set<JW.UI.Component.Array> _arrays;
	*/
	
	destroy: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this.destroyed) {
			return;
		}
		this.destroyed = true;
		if (this.el) {
			this.el.detach();
			JW.Set.each(this._arrays, JW.destroy);
			this._arrays = null;
			JW.Set.each(this._replaceables, JW.destroy);
			this._replaceables = null;
			
			this._childInserter.destroy();
			this._childInserter = null;
			this._childMapper.destroy();
			this._childMapper = null;
			
			this.destroyComponent();
			
			this.children.destroy();
			this.children = null;
			this.el.remove();
		}
		this.allChildren = null;
		this._elements = null;
		this.el = null;
		this.destroyObject();
		this._super();
	},
	
	/**
	 * Component life stage method. Called during component rendering after HTML template parsing and initialization
	 * of references to all elements of the template. Called before `render<ChildId>` methods and
	 * {@link #renderComponent} method. It is convenient to perform some preliminary action here before child
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
	renderComponent: function() {},
	
	/**
	 * Component life stage method. Called after first-time component appearing in HTML DOM and UI components tree.
	 * Component layouting should be performed here (calculate element sizes).
	 * Component rendering is finished here. <code>this._super()</code> call is performed at first line of method.
	 *
	 * @returns {void}
	 */
	afterAppend: function() {},
	
	/**
	 * Component life stage method. Called during component destruction before {@link #destroyObject} method call.
	 * Everything that was performed during component
	 * rendering should be reverted here. All child component arrays are already removed by framework
	 * before this method call, but the components themselves are not destroyed. You must destroy them explicitly.
	 * Unlike arrays, named child component will be destroyed automatically after #destroyComponent method, so you must
	 * remove them from #children map if you want to keep them alive. <code>this._super()</code> method call is performed
	 * at last line of method.
	 *
	 * @returns {void}
	 */
	destroyComponent: function() {},
	
	/**
	 * Component life stage method. Called during component destruction after {@link #destroyComponent} method call.
	 * Everything that was performed during component construction should be reverted here.
	 * <code>this._super()</code> method call is performed at last line of method.
	 *
	 * @returns {void}
	 */
	destroyObject: function() {},
	
	/**
	 * Renders component. Call this method to initialize references to all elements of component and create
	 * child components. This method is called automatically in next cases:
	 * 
	 * - One of methods #renderTo, #renderAs is called
	 * - The component is added into another component as a child
	 *
	 * Feel free to call component rendering multiple times: it will be rendered only once.
	 *
	 * @param {jQuery} [replacedEl] Element on the place of which render this component (if exists).
	 * @returns {void}
	 */
	render: function(replacedEl) {
		if (this.el) {
			return;
		}
		this.replacedEl = replacedEl;
		this.el = jQuery(this.template || this.templates.main);
		this._elements = {};
		this.allChildren = {};
		this.children = new JW.ObservableMap();
		this._replaceables = {};
		this._arrays = {};
		this.rootClass = JW.String.parseClass(this.rootClass || this.el.attr("jwclass"));
		this.el.removeAttr("jwclass");
		this.el.addClass(this.rootClass.join(" "));
		var anchorEls = this.el.find("[jwid]");
		for (var i = 0; i < anchorEls.length; ++i) {
			var anchorEl = jQuery(anchorEls[i]);
			var jwIds = JW.String.trim(anchorEl.attr("jwid")).split(/\s+/);
			anchorEl.removeAttr("jwid");
			for (var j = 0; j < jwIds.length; ++j) {
				var jwId = jwIds[j];
				this._elements[jwId] = this._elements[jwId] ? this._elements[jwId].add(anchorEl) : anchorEl;
				for (var k = 0; k < this.rootClass.length; ++k) {
					anchorEl.addClass(this.rootClass[k] + "-" + jwId);
				}
			}
		}
		this._childMapper = this.children.createMapper({
			createItem  : function(child) { return new JW.UI.Component.Child(this, child); },
			destroyItem : function(componentChild) { componentChild.destroy(); },
			scope       : this
		});
		this._childInserter = this._childMapper.target.createInserter({
			addItem    : function(componentChild, key) { componentChild.attach(key); },
			removeItem : function(key, componentChild) { componentChild.detach(); },
			scope      : this
		});
		this.beforeRender();
		var elements = JW.apply({}, this._elements);
		for (var jwId in elements) {
			var anchorEl = elements[jwId];
			var jwIdCamel = JW.String.camel(jwId);
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				var result = this[renderMethodName](anchorEl);
				if (result instanceof JW.UI.Component) {
					this.children.set(result, jwId);
				} else if (result instanceof JW.Property) {
					this.addReplaceable(result, jwId);
				} else if (result instanceof JW.AbstractArray) {
					this.addArray(result, jwId);
				} else if (result === false) {
					this.removeElement(jwId);
				}
			}
		}
		this.renderComponent();
	},
	
	/**
	 * Render component into specified element. Use it to render root component only: its children must be rendered
	 * using #children or #addArray stuff.
	 *
	 * @param {jQuery/string} [el] Element to render into, or its jQuery-selector.
	 * @returns {void}
	 */
	renderTo: function(el) {
		this.render();
		jQuery(el).insert(this.el);
		this._afterAppend();
	},
	
	/**
	 * Render component in place of specified element. Use it to render root component only: its children must be rendered
	 * using #children or #addArray stuff.
	 *
	 * @param {jQuery/string} [el] Element to render in place of, or its jQuery-selector.
	 * @returns {void}
	 */
	renderAs: function(el) {
		this.render(el);
		jQuery(el).replaceBy(this.el, true);
		this._afterAppend();
	},
	
	/**
	 * Remove component from DOM. Can be used for root component only (which was added via #renderTo or #renderAs
	 * method. All child components should be removed using #children or JW.UI.Component.Array stuff.
	 *
	 * @returns {void}
	 */
	remove: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		this.el.detach();
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
	 * Register a new element in component.
	 * 
	 * Method is used if HTML content of component is not fixed. For example, you can register a new element on
	 * component inheritance if you don't want to override HTML template from scratch.
	 * You can use an added element for various purposes, for example, to add child components.
	 * 
	 * @param {jQuery} el Element.
	 * @param {string} jwid `jwid` to assign.
	 * @returns {void}
	 */
	setElement: function(el, id) {
		this._elements[id] = el;
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
	 * It is convenient to create "component" property from data property using JW.Mapper class.
	 * 
	 * Method returns an instance of JW.UI.Component.Replaceable. This object is purposed for replaceable child
	 * removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the replaceable will be removed from parent component on parent component destruction right
	 * before #destroyComponent method call.
	 * But notice that child component inside this property won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.Mapper destruction in #destroyComponent method.
	 *
	 * @param {JW.Property} component `<JW.UI.Component>` Child component property.
	 * @param {String} id jwId of element to replace.
	 * @returns {JW.UI.Component.Replaceable} Replaceable child component wrapper.
	 */
	addReplaceable: function(component, id) {
		return new JW.UI.Component.Replaceable(this, component, id);
	},
	
	/**
	 * Add child component array into specified element.
	 * 
	 * Based on JW.AbstractArray.Inserter synchronizer. Thanks to that, if you'll pass an instance of
	 * JW.ObservableArray as "components", then view will be synchronized with this array content of fly.
	 * 
	 * It is convenient to create "components" array from data array using JW.AbstractArray#createMapper method,
	 * i.e. by JW.AbstractCollection.Mapper instantiation.
	 * 
	 * Method returns an instance of JW.UI.Component.Array. This object is purposed for child component array
	 * removal from parent component. Use {@link JW.Class#destroy destroy} method to do this.
	 * Also, the array will be removed from parent component on parent component destruction right
	 * before #destroyComponent method call.
	 * But notice that child components inside this array won't be destroyed automatically.
	 * Usually it can be done by corresponding JW.AbstractCollection.Mapper destruction in #destroyComponent method.
	 *
	 * @param {JW.AbstractArray} components Child component array.
	 * @param {jQuery/string} [el]
	 * Element to add child components into, or its `jwid`.
	 * Defaults to root element (#el) of component.
	 * @returns {JW.UI.Component.Array} Child component array wrapper.
	 */
	addArray: function(source, el) {
		return new JW.UI.Component.Array(this, source, this._getElement(el));
	},
	
	_afterAppend: function() {
		if (this.wasAfterAppend || !this.el) {
			return;
		}
		if (this.parent && !this.parent.wasAfterAppend) {
			return;
		}
		if (!this.parent && !this.el.parents("body").length) {
			return;
		}
		this.wasAfterAppend = true;
		this.afterAppend();
		JW.Set.each(this.allChildren, JW.byMethod("_afterAppend"));
	},
	
	_initChild: function(component, replacedEl) {
		component.render(replacedEl);
		component.parent = this;
		JW.Set.add(this.allChildren, component);
	},
	
	_doneChild: function(component) {
		JW.Set.remove(this.allChildren, component);
		component.parent = null;
	},
	
	_getElement: function(el) {
		return (typeof el === "string") ? this.getElement(el) : (el || this.el);
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div />'
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
