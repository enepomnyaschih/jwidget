[Back to index](../README.md)

# Component

## Consumption

	import Component from "jwidget/Component";

## Hierarchy

* class Component extends [jwidget/Class](Class.md)

## Description

Base class of UI component.

Features:

- Rendering by HTML template.
- Direct access to component elements.
- [jQuery interface](http://api.jquery.com/) for element manipulations.
- Convenient API for data binding and child component management.

jWidget has very simple API, but pretty unusual philosophy to build up Model-View architecture without a lot of effort. Let's start with examples.

### jWidget UI component example

	import Component from "jwidget/Component";
	import template from "jwidget/template";

	@template(
		'<div jwclass="my-component">' +
			'<div jwid="hello-message"></div>' +
			'<a href="#" jwid="link">Click me!</a>' +
		'</div>'
	)
	class MyComponent extends Component {
		constructor(private message: string, private link: string) {
			super();
		}

		afterRender() {
			super.afterRender();
			this.getElement("hello-message").text(this.message);
			this.getElement("link").attr("href", this.link);
		}
	}

References: [jwidget/template](template.md), [getElement](#getelement).

Let's find out how HTML template works. Each component has a main template, which is passed into `@template` annotation and defaults to `<div></div>`. You can add more templates - see [jwidget/template](template.md) for details. Subclass inherits superclass templates.

Pay attention to special attributes `jwclass` and `jwid` in the template. `jwclass` is a root CSS class of the component, and `jwid` is a suffix to `jwclass` in this element. So, the next HTML snippet is created in DOM as a result of this component rendering:

	<div class="my-component">
		<div class="my-component-hello-message"></div>
		<a href="#" class="my-component-link">Click me!</a>
	</div>

You can retrieve an element by its `jwid` using method [getElement](#getelement). The result of this method is a [jQuery wrapper](http://api.jquery.com/) over this element. The root element always has jwid "root". In addition, the root element of the component is stored in [el](#el) property of the component.

### Component creation in code

Component can be created by simple construction of component object. After that, you can use one of the methods [render](#render), [renderTo](#renderto), [renderAs](#renderas) to render this component and optionally insert it into DOM.

	$(function() {
		const component = new MyComponent("Hello world!", "http://google.com").renderTo("body");
	});

### Child components

There are 5 ways to add a child component (**note**: examples are not complete - see [Component removal and destruction](#component-removal-and-destruction)):

- Add a child component into [children](#children) map with a key equal to `jwid` of the element to replace with the child component. Usually it is done in [afterRender](#afterrender) method.

		afterRender() {
			super.afterRender();
			this.children.set(new LabelView("Hello"), "label");
		}
- Add an easily replaceable child component using [addReplaceable](#addreplaceable) method. Pass an instance of [jwidget/Property](Property.md)`<Component>` there and the framework will provide the synchronization with this property during application running.

		afterRender() {
			super.afterRender();
			this.contentView = new Property(new LabelView("Hello"));
			this.addReplaceable(this.contentView, "label");
		}
		changeLabel(value: string) {
			this.contentView.set(new LabelView(value));
		}
- Add an array of child components into some element using [addArray](#addarray) method. If the passed array is an instance of [jwidget/ObservableArray](ObservableArray.md), then framework will provide the continuous synchronization with this array during application running.

		afterRender() {
			super.afterRender();
			this.labelViews = new JWArray([new LabelView("one"), new LabelView("two")]);
			this.addArray(this.labelViews, "labels");
		}
- Add a collection of child components into some element using [addCollection](#addcollection) method. As opposed to [addArray](#addarray) method, [addCollection](#addcollection) doesn't keep the child component order. A newly added component is always appended to the end. If the passed collection is observable, then framework will provide the continuous synchronization with this collection during application running.

		afterRender() {
			super.afterRender();
			this.labelViews = new JWSet([new LabelView("one"), new LabelView("two")]);
			this.addCollection(this.labelViews, "labels");
		}
- Define method `render<ChildId>`, where `<ChildId>` is a `jwid` of an element in CamelCase with capitalized first letter. Example: `renderArticle` (renders element with `jwid="article"`). If the method returns an instance of Component, [jwidget/Property](Property.md) or [jwidget/ICollection](AbstractCollection.md), then result will be treated as a child component or a child component collection. Define method `renderRoot` to render the root element, but you can return only [ICollection] there, because it is impossible to replace the root element of the component.

		renderLabel() {
			return new LabelView("Hello");
		}

See [More about renderChild methods](#more-about-renderchild-methods) paragraph for details.

Such API provides simplicity, at one hand, and flexibility in Model-View regard, at another hand.

Reference: [Getting started. Part 1. Model and view](../Tutorial1.md).

### More about child component collections

It is convenient to use [mapDestroyableColletion](jwidget/mapper/collection#mapdestroyablecollection) method to convert data collections into UI component collections. Thanks to it, view is updated on data update automatically.

That's the reason why we recommend to use jWidget collections in data model instead of native JavaScript Array and Object: jWidget collections have observable implementations which can be synchronized to each other.

[Getting started. Part 6. Collection synchronizers](../Tutorial6.md)

### More about renderChild methods

You can define method `render<ChildId>` for every element in HTML template that has attribute `jwid`.
`<ChildId>` equals to this `jwid`, written in CamelCase with capitalized first letter. Method signature:

	renderChildId(el: JQuery): any

* **el** - element with corresponding `jwid`.

Depending on the returned result of this method, you have the next capabilities:

- If the method returns an instance of Component, then it gets added into [children](#children) map and becomes a child component. This option doesn't work for the root element.
- If the method returns an instance of [jwidget/Property](Property.md), then it gets added as an easily replaceable child component via method [addReplaceable](#addreplaceable). This option doesn't work for the root element.
- If the method returns an instance of [jwidget/IArray](AbstractArray.md), then it gets added as a child array via method [addArray](#addarray).
- If the method returns an instance of [jwidget/ICollection](AbstractCollection.md), which is not IArray, then it gets added as a child
collection via method [addCollection](#addcollection).
- If the method returns `false` (===), then element gets removed from the HTML document. This option doesn't work for the root element.
- In any other case, framework doesn't perform any additional actions with the element.

### Component removal and destruction

You can destroy the component via [destroy](Class.md#destroy) method. However you can not destroy a component which is added into another component as a child (framework throws an exception in this case). You must remove the child component from its parent first. To remove the component from its parent, you must perform the operation opposite to the adding operation.

- If you have added a component to [children](#children) object, you must remove it via
[remove](AbstractMap.md#remove) method.
- Method [addReplaceable](#addreplaceable) returns an instance of [jwidget/component/ComponentReplaceable](component/ComponentReplaceable.md). Its destruction removes the replaceable child.
- Method [addArray](#addarray) returns an instance of [jwidget/component/ComponentArray](component/ComponentArray.md). Its destruction removes the array.
- Method [addCollection](#addcollection) returns an instance of [jwidget/component/ComponentCollection](component/ComponentCollection.md). Its destruction removes the collection.

As soon as child component is removed, you can destroy it:

	this.children.remove("comments").destroy();

For arrays, you should do something like this (**note**: this code is not optimal, see the next example):

	// should be called after the rendering initiation
	initLabels() {
		// Map label data array to view array
		this._labelViews = mapDestroyableArray(this.labels, (label) => new LabelView(label));

		// Add labels into element with jwid="labels"
		this._labelArray = this.addArray(this._labelViews, "labels");
	}

	clearLabels() {
		this._labelArray.destroy();
		this._labelArray = null;
		this._labelViews.destroy();
		this._labelViews = null;
	}

Reference: [jwidget/mapper/array](mapper/array.md).

You don't need to remove the child components explicitly all the time. On parent component destruction, framework automatically removes all the children before [unrender](#unrender) method call. However, it doesn't destroy them. You can use aggregation method [own](Class.md#own) to destroy the child components. So, usually your code will look as simple as this:

	renderTitleBox() {
		return this.own(new TitleBox());
	}

	renderLabels() {
		return this.own(mapDestroyableArray(this.labels, (label) => new LabelView(label)));
	}

### Common practices in child component management

**Create child component**

This example describes how to create and destroy a child component with `jwid="title-box"`.

	@template(
		'<div jwclass="my-component">' +
			'<div jwid="title-box"></div>' +
		'</div>'
	)
	class MyComponent extends Component {
		renderTitleBox: function() {
			return this.own(new TitleBox());
		}
	}

Reference: [jwidget/template](template.md), [jwidget/Class.own](Class.md#own).

**Create replaceable child component**

This example describes how to create and destroy an easily replaceable child component with `jwid="document"`. Assume that you have a property "document" and want to replace an old document view with a new one on document change.

	@template(
		'<div jwclass="my-component">' +
			'<div jwid="document"></div>' +
		'</div>'
	)
	class MyComponent extends Component {
		constructor(private document: Property<Document>) {
			super();
		}

		renderDocument() {
			return this.own(this.document.mapObject((document) => new DocumentView(document)));
		}
	}

Reference: [jwidget/template](template.md), [jwidget/Property](Property.md), [jwidget/Class.own](Class.md#own).

**Create child collection**

This example describes how to create and destroy child components by data collection, and insert them into element with `jwid="labels"`. If data collection is observable, child collection gets constantly synchronized with the data.

	@template(
		'<div jwclass="my-component">' +
			'<div jwid="labels"></div>' +
		'</div>'
	)
	class MyComponent extends Component {
		constructor(private labels: IArray<Label>) {
			super();
		}

		renderLabels() {
			return this.own(mapDestroyableArray(this.labels, (label) => new LabelView(label)));
		}
	}

Reference: [jwidget/template](template.md), [jwidget/IArray](AbstractArray.md), [jwidget/Class.own](Class.md#own), [jwidget/mapper/array](mapper/array.md).

**Add existing components as children**

This example describes how to insert child components which have lifetime controlled by someone else, and therefore shouldn't be destroyed by parent component.

	@template(
		'<div jwclass="my-component">' +
			'<div jwid="title-box"></div>' +
		'</div>'
	)
	class MyComponent extends Component {
		constructor(private titleBox: Component | Property<Component> | ICollection<Component>) {
			super();
		}

		renderTitleBox: function() {
			return this.titleBox;
		}
	}

### Component life stages

Each component has several stages of life.

1. Like in all other classes, **constructor** is called first. Usually all fields are defined and assigned to their initial values here, events are created etc. Only component model should be touched here, view is completely ignored. Notice that component is not rendered after construction yet, so it doesn't have fields [el](#el) and [children](#children) assigned, and methods [addArray](#addarray), [addcollection](#addcollection), [addReplaceable](#addreplaceable) won't work. The main reason for that is that we want to give you ability to do something else between component construction and rendering, for example, change some field values and call some methods. Second reason: it is not recommended to call virtual methods in constructor in any object-oriented language. If may result in undesired side effects. You can render the component directly by calling [render](#render), [renderTo](#renderto), [renderAs](#renderas), or by adding this component into another component as a child. For example, component gets rendered immediately after adding into [children](#children) map. You can invoke component rendering multiple times, but it gets rendered only once.
1. Method [beforeRender](#beforerender) is called during rendering, after HTML template reading and initialization of all links to this template elements. It is convenient to perform some preliminary action here before child component creation. You are already able to create child components here anyway. Call `super.beforeRender()` at the first line of the method.
1. All `render<ChildId>` methods are called for HTML template elements, i.e. child component creation is performed. The methods are called in the same order as these `jwid`'s are written in the template.
1. Method [afterRender](#afterrender) is called at the end of rendering procedure. You should assign all elements' attributes here, create child components, bind event handlers and fill the component with interactivity. Component rendering is finished here. Call `super.afterRender()` at the first line of the method.
1. Method [afterAppend](#afterappend) is called once the component first time appears in HTML DOM and UI component tree. Component layouting should be performed here (i.e. element size computation). Call `super.afterAppend()` at the first line of the method.
1. Method [releaseDom](#releasedom) is called during component destruction. Everything that was performed in [afterAppend](#afterappend) method, i.e. on step 5, should be reverted here. Call `super.releaseDom()` at the last line of the method.
1. Method [unrender](#unrender) is called during component destruction. Everything that was performed during component rendering, i.e. on steps 2-4, should be reverted here. All child components are already removed by framework before this method call, but the components themselves are not destroyed. You must destroy them explicitly unless you use [own](Class.md#own) method to aggregate them. Call `super.unrender()` at the last line of the method.
1. Method [afterDestroy](#afterdestroy) is called during component destruction. Everything that was performed in component constructor, i.e. on step 1, should be reverted here. Call `super.afterDestroy()` at the last line of the method.

### Intergration with WebPack

There's an easy way to attach HTML templates via WebPack. The first example from this topic can be splitted into two files:

**MyComponent.ts**

	import Component from "jwidget/Component";
	import template from "jwidget/template";

	@template(require<string>("./MyComponent.jw.html"))
	class MyComponent extends Component {
		constructor(private message: string, private link: string) {
			super();
		}

		afterRender() {
			super.afterRender();
			this.getElement("hello-message").text(this.message);
			this.getElement("link").attr("href", this.link);
		}
	}

**MyComponent.jw.html**

	<div jwclass="my-component">
		<div jwid="hello-message"></div>
		<a href="#" jwid="link">Click me!</a>
	</div>

To make this work, you need to install `html-loader` NPM module:

	npm install --save html-loader

And use it in WebPack configuration:

	module: {
		rules: [
			// ...
			{ test: /\.html$/, loader: "html-loader", query: {minimize: true, attrs: false} }
		]
	}

Also, you need to provide TypeScript compiler with `require` method semantics. Just create a globals.d.ts file somewhere in sources folder with the next lines of code:

	// hack to make this a module
	export default null;

	// hack to use CommonJS syntax in TypeScript files (e.g. to load CSS)
	// https://github.com/TypeStrong/ts-loader#loading-other-resources-and-code-splitting
	declare global {
		const require: {
			<T>(path: string): T;
			(paths: string[], callback: (...modules: any[]) => void): void;
			ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
		};
	}

## Properties

### parent

	parent: Component

Parent component. Field is available from component rendering beginning.

### el

	el: JQuery

Reference: [JQuery](http://api.jquery.com).

Root element. Field is available from component rendering beginning.

### children

	children: IMap<Component>

Reference: [jwidget/IMap](AbstractMap.md).

Mutable named child components. Use this map to add child components in place of elements with corresponding `jwid`. Field is available from component rendering beginning.

### templates

	templates: Dictionary<AbstractTemplate>

Reference: [jwidget/Dictionary](Dictionary.md), [jwidget/AbstractTemplate](AbstractTemplate.md).

Map from template ID to the template. Templates are defined by [jwidget/template](template.md) annotation.

## Methods

### render

	render(): this

Renders the component. Call this method to initialize references to all elements of component and create child components. This method is called automatically in the next cases:

- One of methods `renderTo`, `renderAs` is called.
- The component is added into another component as a child.

Feel free to call component rendering multiple times: it gets rendered only once.

### renderTo

	renderTo(el: string | HTMLElement | JQuery): this

* **el** - Element to render component into.

Renders component into an element. Use it to render root component only: its children must be rendered using [children](#children), [addArray](#addarray), [addCollection](#addcollection), [addReplaceable](#addreplaceable) members.

### renderAs

	renderAs(el: string | HTMLElement | JQuery): this

* **el** - Element to render component in place of.

Render component in place of an element. Use it to render root component only: its children must be rendered using [children](#children), [addArray](#addarray), [addCollection](#addcollection), [addReplaceable](#addreplaceable)  members.

### remove

	remove(): this

Remove the component from DOM. Can be used for root component only (which was added via [renderTo](#renderto) or [renderAs](#renderas) method). All child components should be removed using [children](#children) map or owning object deletion.

See [Component removal and destruction](#component-removal-and-destruction) for details.

### getElement

	getElement(id: string): JQuery

* **id** - `jwid` of the element.

Gets element by its `jwid`.

### removeElement

	removeElement(id: string): this

* **id** - `jwid` of the element.

Remove element by `jwid`. Element gets removed from DOM and destroyed. It is now impossible to get it by `getElement` method.

### addReplaceable

	addReplaceable(component: Property<Component>, id: string): ComponentReplaceable

* **component** - Child component property.
* **id** - `jwid` of element to replace.

Reference: [jwidget/Property](Property.md), [jwidget/ComponentReplaceable](ComponentReplaceable.md).

Add an easily replaceable child component into an element.

Pass an instance of [jwidget/Property](Property.md)`<Component>`. The view gets synchronized with this property. It is convenient to create "component" property from data property using [jwidget/Property.mapObject](Property.md#mapobject) method.

**addReplaceable** method returns an instance of [jwidget/ComponentReplaceable](ComponentReplaceable.md). This object is purposed for replaceable child removal from parent component. Use [destroy](Class.md#destroy) method to do this. Also, the replaceable is removed from parent component on parent component destruction right before [unrender](#unrender) method call. But notice that child component inside this property ain't destroyed automatically. Usually it can be done by corresponding [jwidget/Mapper](Mapper.md) or property destruction in [unrender](#unrender) method.

### addArray

	addArray(source: IArray<Component>, el?: string | HTMLElement | JQuery): ComponentArray

* **source** - Child component array.
* **el** - `jwid` of element to add child components into. Defaults to root element ([el](#el)) of component.

Reference: [jwidget/IArray](AbstractArray.md), [jwidget/ComponentArray](ComponentArray.md).

Add child component array into an element. As opposed to [addCollection](#addcollection) method, retains component order. However, it works slower and accepts array only.

If you pass an instance of [jwidget/ObservableArray](ObservableArray.md), then view gets synchronized with this array contents. It is convenient to create "components" array from data array using [mapDestroyableArray](mapper/array.md) method.

**addArray** method returns an instance of [jwidget/ComponentArray](ComponentArray.md). This object is purposed for child component array removal from parent component. Use [destroy](Class.md#destroy) method to do this. Also, the array is removed from parent component on parent component destruction right before [unrender](#unrender) method call. But notice that child components inside this array are not destroyed automatically. Usually it can be done by corresponding [jwidget/mapper/array/IArrayMapper](mapper/array/IArrayMapper.md) or array destruction in [unrender](#unrender) method.

### addCollection

	addCollection(source: ICollection<Component>, el?: string | HTMLElement | JQuery): ComponentCollection

* **source** - Child component collection.
* **el** - `jwid` of element to add child components into. Defaults to root element ([el](#el)) of component.

Reference: [jwidget/ICollection](AbstractCollection.md), [jwidget/ComponentCollection](ComponentCollection.md).

Add child component collection into an element. As opposed to [addArray](#addarray) method, ignores component order. However, it works faster and accepts any kind of collection, not array only.

If you pass an instance of observable collection, then view gets synchronized with this collection contents. It is convenient to create "components" collection from data collection using [mapDestroyableCollection](mapper/collection.md) method.

**addCollection** method returns an instance of [jwidget/ComponentCollection](ComponentCollection.md). This object is purposed for child component collection removal from parent component. Use [destroy](Class.md#destroy) method to do this. Also, the collection is removed from parent component on parent component destruction right before [unrender](#unrender) method call. But notice that child components inside this collection are not destroyed automatically. Usually it can be done by corresponding [jwidget/mapper/collection/ICollectionMapper](mapper/collection/ICollectionMapper.md) or collection destruction in [unrender](#unrender) method.

### using

	using(value: string | AbstractTemplate | HTMLElement | JQuery): this

* **value** - Template or element to use for component rendering.

Reference: [jwidget/AbstractTemplate](AbstractTemplate.md).

Selects component rendering strategy. This method is needed only in very rare cases. By default, component is rendered outside of DOM based on `main` HTML template specified by [jwidget/template](template.md) annotation. You can change this by passing one of the next values into using method of the component:

- [jwidget/AbstractTemplate](AbstractTemplate.md) or **string** - use this template explicitly for rendering.
- **HTMLElement** or **JQuery** - build component on top of existing DOM element. Special attributes `jwclass` and `jwid` get processed in the usual way.

**Disclaimer:** We strongly encourage you to use the standard rendering strategy via [jwidget/template](template.md), or at least create [jwidget/HtmlTemplate](HtmlTemplate.md) instances to store your HTML templates. They work 3 times faster compared to raw HTML rendering thanks to preliminary compilation and node cloning method.

## Protected methods

### beforeRender

	protected beforeRender()

Component life stage method. Called during component rendering after HTML template parsing and initialization of references to all elements of the template. Called before `render<ChildId>` methods and [afterRender](#afterrender) method. It is convenient to perform some preliminary action here before child components creation. But you are already able to create child components here. Call `super.beforeRender()` at the first line of the method.

### afterRender

	protected afterRender()

Component life stage method. Called after [beforeRender](#beforerender) method and `render<ChildId>` methods. You should assign all elements' attributes here, create child components, bind to events and fill component with interactivity. Call `super.afterRender()` at the first line of the method.

### afterAppend

	protected afterAppend()

Component life stage method. Called after first-time component appearing in HTML DOM and UI components tree. Component layouting should be performed here (element size computing). Component rendering is finished here. Call `super.afterAppend()` at the first line of the method.

### releaseDom

	protected releaseDom()

Component life stage method. Called during component destruction before [unrender](#unrender) method call. Everything that was performed in [afterAppend](#afterAppend) method should be reverted here. Call `super.releaseDom()` at the last line of the method.

### unrender

	protected unrender()

Component life stage method. Called during component destruction before [afterDestroy](#afterDestroy) method call. Everything that was performed during component rendering should be reverted here. All child components are already removed by framework before this method call, but the components themselves are not destroyed. You must destroy them explicitly. Call `super.unrender()` at the last line of the method.

### afterDestroy

	protected afterDestroy()

Component life stage method. Called during component destruction after [unrender](#unrender) method call. Everything that was performed during component construction should be reverted here. Call `super.afterDestroy()` at the last line of the method.

### createElement

	protected createElement(): TemplateOutput

Reference: [jwidget/TemplateOutput](TemplateOutput.md)

Virtual method to render the component document fragment. By default, renders `main` HTML template defined by [jwidget/template](template.md) annotation.
