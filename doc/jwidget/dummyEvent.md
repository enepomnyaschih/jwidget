[Back to index](../README.md)

# dummyEvent

## Consumption

	import dummyEvent from "jwidget/dummyEvent";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Bindable](Bindable.md)`<P>`
	* interface [jwidget/IEvent](IEvent.md)`<P>`
		* class [jwidget/Event](Event.md)`<P>`
		* const **jwidget/dummyEvent**(dummyEvent.md)

## Description

Dummy implementation of [jwidget/IEvent](IEvent.md)`<any>` interface.

As opposed to [jwidget/Event](Event.md), doesn't really bind the event handlers, just pretends it does that. Can be used as a lightweight implementation of [jwidget/IEvent](IEvent.md) interface if you certainly know that the event should never get triggered. Since the application usually involves many events, this can save quite a bit of memory and CPU.

Based on a boolean **observable** variable, you can create a new [jwidget/Event](Event.md) instance or get **dummyEvent** via [Event.make](Event.md#make) static method.