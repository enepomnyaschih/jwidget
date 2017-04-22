[Back to index](../README.md)

# DimProperty

## Consumption

	import DimProperty from "jwidget/DimProperty";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface [jwidget/Watchable](Watchable.md)`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class [jwidget/ObservableProperty](ObservableProperty.md)`<V>`
			* class **jwidget/DimProperty**`<V>`

## Description

Dummy implementation of [jwidget/IProperty](IProperty.md) interface.

As opposed to [jwidget/ObservableProperty](ObservableProperty.md), doesn't really trigger [changeEvent](Watchable.md#changeevent), just pretends it does that. Can be used as a lightweight implementation of [jwidget/IProperty](IProperty.md) interface if you certainly know that the value will never get changed, or there are no listeners certainly interested in the event. Since the application usually involves many properties, this can save quite a bit of memory and CPU.

See [jwidget/Watchable](Watchable.md) and [jwidget/IProperty](IProperty.md) for details.

## Constructor

	new DimProperty<V>(value: V = null)

Constructs a property and sets initial value.
