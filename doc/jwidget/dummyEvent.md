[Back to index](../README.md)

# dummyEvent

## Consumption

	import dummyEvent from "jwidget/dummyEvent";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface [jwidget/Bindable](Bindable.md)`<P>`
		* class [jwidget/Event](Event.md)`<P>`
		* const **jwidget/dummyEvent**

## Description

Dummy implementation of [jwidget/Bindable](Bindable.md)`<any>` interface.

As opposed to [jwidget/Event](Event.md), doesn't really bind the event handlers, just pretends it does that. Can be used as a lightweight implementation of [jwidget/Bindable](Bindable.md) interface if you certainly know that the event never gets triggered. Since the application usually involves many events, this can save quite a bit of memory and CPU.

Used in [jwidget/DimProperty](DimProperty.md), [jwidget/DimList](DimList.md), [jwidget/DimMap](DimMap.md), [jwidget/DimSet](DimSet.md) implementations.
