[Back to index](../README.md)

# Listenable

## Consumption

	import Listenable from "jwidget/Listenable";

## Hierarchy

* interface **jwidget/Listenable**`<P>`
	* interface [jwidget/IEvent](IEvent.md)`<P>`
		* class [jwidget/Event](Event.md)`<P>`
		* const [jwidget/dummyEvent](dummyEvent.md)

## Description

Container for callback functions. Provides basic event listening functionality.

Has a sub-interface [jwidget/IEvent](IEvent.md), which exposes [trigger](#IEvent.md#trigger) method to trigger the event. It is smart to store the event as [jwidget/IEvent](IEvent.md) internally, and expose it as **Bindable** externally to deny direct control over the event by the clients.

	class Example {
		private _changeEvent = new Event<number>();

		get changeEvent(): Listenable<number> {
			return this._changeEvent;
		}

		// ...

			// We can't trigger public changeEvent, but can trigger private _changeEvent
			this._changeEvent.trigger(value);

		// ...
	}

## Properties

### dummy

	readonly dummy: boolean

Checks if this event is dummy. This knowledge may help you do certain code optimizations.

## Methods

### listen

	listen(handler: (params: P) => void, scope?: any): Destroyable

* **handler** - Event handler function.
* **scope** - **handler** call scope.

Reference: [jwidget/Destroyable](Destroyable.md).

Starts listening to the event.

Whenever the event is triggered, the specified handler function is called in the specified scope. Handlers are called in the same order as they were bound.

You can stop listening the event by destroying the returned object.
