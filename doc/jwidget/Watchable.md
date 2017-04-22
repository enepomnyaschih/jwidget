[Back to index](../README.md)

# Watchable

## Consumption

	import Watchable from "jwidget/Watchable";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface **jwidget/Watchable**`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class [jwidget/ObservableProperty](ObservableProperty.md)`<V>` extends [jwidget/Class](Class.md)
			* class [jwidget/DimProperty](DimProperty.md)`<V>` extends [jwidget/Class](Class.md)

## Description

Read-only container for a value. Provides basic data binding functionality.

Has a sub-interface [jwidget/IProperty](IProperty.md), which exposes [set](#IProperty.md#set) method to modify the property. It is smart to store the property as [jwidget/IProperty](IProperty.md) internally, and expose it as **Watchable** externally to deny direct control over the property by the clients.

Can be used as a source property in the next model bindings:

- [jwidget/Copier](Copier.md) - Keeps one property equal to another.
- [jwidget/Functor](Functor.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Mapper](Mapper.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Updater](Updater.md) - Observes several properties.
- [jwidget/Switcher](Switcher.md) - Observes several properties.

Also, can be used as a source property in the next view bindings:

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

	changeEvent: Bindable<ValueChangeEventParams<V>>

Reference: [jwidget/Bindable](Bindable.md), [jwidget/ValueChangeEventParams](ValueChangeEventParams.md).

Property value is changed. Triggered in result of [set](ObservableProperty.md#set) method call if the value has been changed.

## Methods

### get

	get(): V

Returns current property value. Think twice before calling this method - probably it makes sense to use some kind of binding instead?

### map

	map<U>(callback: (value: V) => U, scope?: any): Watchable<U>

* **callback** - Mapping function.
* **scope** - **callback** call scope. Defaults to the property itself.

Builds a new property containing the result of the callback function called on this property value. To stop synchronization, destroy the result property. In comparison to [mapDestroyable](#mapdestroyable) method, doesn't destroy the previously assigned target values. To map multiple properties, use [jwidget/Mapper](Mapper.md).

### mapDestroyable

	mapDestroyable<U extends Destroyable>(callback: (value: V) => U, scope?: any): Watchable<U>

* **callback** - Mapping function.
* **scope** - **callback** call scope. Defaults to the property itself.

Reference: [jwidget/Destroyable](Destroyable.md).

Builds a new property containing the result of the callback function called on this property value. To stop synchronization, destroy the result property. In comparison to [map](#map) method, destroys the previously assigned target values. To map multiple properties, use [jwidget/Mapper](Mapper.md).

### isSilent

	isSilent(): boolean

Checks if this property never triggers events. This knowledge may help you do certain code optimizations.

### destroy

	destroy(): void

Class destructor invocation method.
