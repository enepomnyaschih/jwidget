[Back to index](../README.md)

# Bindable

[](BEGIN_INDEX)
* **Properties**
    * [changeEvent](#changeevent)
    * [silent](#silent)
* **Methods**
    * [get](#get)
    * [map](#map)
[](END_INDEX)

## Consumption

	import Bindable from "jwidget/Bindable";

## Hierarchy

* interface **jwidget/Bindable**`<V>`
	* interface [jwidget/DestroyableBindable](DestroyableBindable.md)`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class [jwidget/Property](Property.md)`<V>`

## Description

Read-only container for a value. Provides basic data binding functionality.

Has a sub-interface [jwidget/IProperty](IProperty.md), which exposes [set](#Property.md#set) method to modify the property. It is sometimes smart to store the property as [jwidget/IProperty](IProperty.md) internally, and expose it as **Bindable** externally to deny direct control over the property by the clients.

	class Example {
		private _size = new Property<number>(0);

		get size(): Bindable<number> {
			return this._size;
		}

		// ...

			// We can't set public size, but we can set private _size
			this._size.set(value);

		// ...
	}

**Bindable** can be used as a source property in the next model bindings:

- [jwidget/Copier](Copier.md) - Keeps one property equal to another.
- [jwidget/Mapper](Mapper.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Switcher](Switcher.md) - Observes several properties.

Also, it can be used as a source property in the next view bindings:

- [jwidget/ui/attr](ui/attr.md) - Binds attribute to a property.
- [jwidget/ui/class](ui/class.md) - Binds CSS class to a property.
- [jwidget/ui/css](ui/css.md) - Binds CSS style to a property.
- [jwidget/ui/html](ui/html.md) - Binds inner HTML to a property.
- [jwidget/ui/prop](ui/prop.md) - Binds jQuery property to a jWidget property and/or vice versa.
- [jwidget/ui/radio](ui/radio.md) - Binds radio selection to a property and/or vice versa.
- [jwidget/ui/show](ui/show.md) - Binds visibility to a property.
- [jwidget/ui/text](ui/text.md) - Binds inner text to a property.
- [jwidget/ui/val](ui/val.md) - Binds input value to a property and/or vice versa.

All bindings are independent - you can implement your own bindings if you want.

## Properties

### changeEvent

	readonly changeEvent: Listenable<Bindable.ChangeEventParams<V>>

Reference: [jwidget/Listenable](Listenable.md).

Property value is changed. Triggered in result of [set](Property.md#set) method call if the value has been changed.

Parameters:

* sender: **Bindable**`<V>`
* oldValue: **V**
* value: **V**

### silent

	readonly silent: boolean

Checks if this property never triggers events. This knowledge may help you do certain code optimizations.

## Methods

### get

	get(): V

Returns property value. Think twice before calling this method - probably it makes sense to use some kind of binding instead?

### map

	map<U>(create: (value: V) => U, config?: Mapper.Config<U>): DestroyableBindable<U>;

* **create** - Mapping function.
* **config** - Configuration options.
	* destroy?: (targetValue: U, sourceValue: V) => any - Destroys target property value.
	* scope?: any - **create** and **destroy** call scope.
	* viaNull?: boolean - Reverses mapper updating flow. Default flow is:

		1. Create a new value.
		2. Reassign target property.
		3. Destroy the old value.

		Setting this option to true changes the flow the next way:

		1. Set target value to null.
		2. Destroy the old value.
		3. Create a new value.
		4. Assign target property.

Builds a new property containing the result of the callback function called on this property value. To stop synchronization, destroy the resulting property. To map multiple properties, use [jwidget/Mapper](Mapper.md).

**Example 1.** Double number.

	const num = new Property<number>(3);
	const double = num.map((value) => 2 * value);
	console.log(double.get()); // 6
	num.set(5);
	console.log(double.get()); // 10

Pass **destroy** callback to destroy the previously mapped values.

**Example 2.** Typical bindable model mapping to UI component.

	import {destroy} from "jwidget";
	import Bindable from "jwidget/Bindable";
	import Component from "jwidget/Component";

	class App extends Component {
		constructor(private report: Bindable<Report>) {}

		protected renderReport() {
			return this.own(report.map((report) => new ReportView(report), {destroy}));
		}
	}

Reference: [destroy](index.md#destroy), [own](Class.md#own), [jwidget/Component](Component.md).
