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

Extension of [jwidget/DestroyableBindable](DestroyableBindable.md) interface with [set](#set) method to modify the property value. It is smart to store the property as **IProperty** internally, and expose it as [jwidget/Bindable](Bindable.md) or [jwidget/DestroyableBindable](DestroyableBindable.md) externally to deny direct control over the property by clients.

Can be used as a target property in [jwidget/Copier](Copier.md) and [jwidget/Mapper](Mapper.md) model bindings.

Also, can be used as a target property in [jwidget/ui/prop](ui/prop.md), [jwidget/ui/radio](ui/radio.md) and [jwidget/ui/val](ui/val.md) view bindings.

All bindings are independent - you can implement your own binding if you want.

## Methods

### set

	set(value: V)

* **value** - New value to set.

Changes property value and triggers [changeEvent](Watchable.md#changeevent) if the value has been changed.

### ownValue

	ownValue(): this

Makes this property an owner of its value. It means that the value is destroyed automatically on reassignment or destruction of the property.
