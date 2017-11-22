[Back to index](../README.md)

# Property



## Consumption

	import Property from "jwidget/Property";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Identifiable.md)
	* interface [jwidget/IClass](IClass.md)
		* class [jwidget/Class](Class.md)
* interface [jwidget/Bindable](Bindable.md)`<V>`
	* interface [jwidget/DestroyableBindable](DestroyableBindable.md)`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class **jwidget/Property**`<V>`

## Description

Container for a value. Provides basic data binding functionality.

See [jwidget/Watchable](Watchable.md) and [jwidget/IProperty](IProperty.md) for details.

## Constructor

	new Property<V>(value: V, silent: boolean = false)

* **value** - Initial value.
* **silent** - If true, uses [jwidget/dummyEvent](dummyEvent.md) implementation for [changeEvent](Watchable.md#changeevent). Use it if you know for sure that the property never gets modified or there are no listeners interested in its modification. Since every jWidget application relies on many properties, this may help you improve application performance.

Constructs a property and sets initial value.
