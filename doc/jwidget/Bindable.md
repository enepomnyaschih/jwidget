[Back to index](../README.md)

# Bindable

## Consumption

	import Bindable from "jwidget/Bindable";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface **jwidget/Bindable**`<P>`
		* class [jwidget/Event](Event.md)`<P>`
		* const [jwidget/dummyEvent](dummyEvent.md)

## Description

Used to notify some objects (clients) about certain events (for example, field value change). Remember to destroy the event attachments to prevent side effects.

Has two implementations:

* [jwidget/Event](Event.md) - Real implementation that you can use to trigger real events.
* [jwidget/dummyEvent](dummyEvent.md) - An object that implements Bindable interface, but never triggers real events.

## Methods

### bind

	bind(handler: (params: P) => void, scope?: any): Destroyable

* **handler** - Event handler function.
* **scope** - **handler** call scope.

Starts listening to the event.

Whenever the event is triggered, the specified handler function is called in the specified scope. Handlers are called in the same order as they were bound.

You can stop listening the event by destroying the returned object.
