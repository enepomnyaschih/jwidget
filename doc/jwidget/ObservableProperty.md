[Back to index](../README.md)

# ObservableProperty

## Consumption

	import ObservableProperty from "jwidget/ObservableProperty";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface [jwidget/Watchable](Watchable.md)`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class **jwidget/ObservableProperty**`<V>` extends [jwidget/Class](Class.md)
			* class [jwidget/DimProperty](DimProperty.md)`<V>` extends [jwidget/Class](Class.md)

## Description

Real implementation of [jwidget/IProperty](IProperty.md) interface. As opposed to [jwidget/DimProperty](DimProperty.md), really triggers [changeEvent](Watchable.md#changeevent) on value modification.

See [jwidget/Watchable](Watchable.md) and [jwidget/IProperty](IProperty.md) for details.

## Constructor

	new ObservableProperty<V>(value: V = null)

Constructs a property and sets initial value.
