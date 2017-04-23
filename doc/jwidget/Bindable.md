[Back to index](../README.md)

# Bindable

## Consumption

	import Bindable from "jwidget/Bindable";

## Hierarchy

* interface **jwidget/Bindable**`<P>`
	* interface [jwidget/IEvent](IEvent.md)`<P>`
		* class [jwidget/Event](Event.md)`<P>`
		* const [jwidget/dummyEvent](dummyEvent.md)

## Description

Container for callback functions. Provides basic event listening functionality.

Has a sub-interface [jwidget/IEvent](IEvent.md), which exposes [trigger](#IEvent.md#trigger) method to trigger the event. It is smart to store the event as [jwidget/IEvent](IEvent.md) internally, and expose it as **Bindable** externally to deny direct control over the event by the clients.

## Properties

### dummy

	readonly dummy: boolean

Checks if this event is dummy. This knowledge may help you do certain code optimizations.

## Methods

### bind

	bind(handler: (params: P) => void, scope?: any): Destroyable

* **handler** - Event handler function.
* **scope** - **handler** call scope.

Starts listening to the event.

Whenever the event is triggered, the specified handler function is called in the specified scope. Handlers are called in the same order as they were bound.

You can stop listening the event by destroying the returned object.
