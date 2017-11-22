[Back to index](../README.md)

# IProperty

* **Methods**
	* [set](#set)
	* [ownValue](#ownvalue)

## Consumption

	import IProperty from "jwidget/IProperty";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Bindable](Bindable.md)`<V>`
	* interface [jwidget/DestroyableBindable](DestroyableBindable.md)`<V>`
		* interface **jwidget/IProperty**`<V>`
			* class [jwidget/Property](Property.md)`<V>`

## Description

Extension of [jwidget/Watchable](Watchable.md) interface with [set](#set) method to modify the property value. It is smart to store the property as **IProperty** internally, and expose it as [jwidget/Watchable](Watchable.md) externally to deny direct control over the property by the clients.

Can be used as a target property in the next model bindings:

- [jwidget/Copier](Copier.md) - Keeps one property equal to another.
- [jwidget/Functor](Functor.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Mapper](Mapper.md) - Keeps one property as a result of the function from several other properties.

Also, can be used as a target property in the next view bindings:

- [jwidget/ui/prop](ui/prop.md) - Binds jQuery property to a jWidget property and/or vice versa.
- [jwidget/ui/radio](ui/radio.md) - Binds radio selection to a property and/or vice versa.
- [jwidget/ui/val](ui/val.md) - Binds input value to a property and/or vice versa.

All bindings are independent - you can implement your own bindings if you want.

## Methods

### set

	set(value: V)

* **value** - New value to set.

Changes property value and triggers [changeEvent](Watchable.md#changeevent) if the value has been changed.

### ownValue

	ownValue(): this

Makes this property an owner of its value. It means that the value is destroyed automatically on reassignment or destruction of the property.
