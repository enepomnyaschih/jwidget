[Back to index](../README.md)

# IEvent

## Consumption

	import IEvent from "jwidget/IEvent";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Bindable](Bindable.md)`<P>`
	* interface **jwidget/IEvent**`<P>`
		* class [jwidget/Event](Event.md)`<P>`
		* const [jwidget/dummyEvent](dummyEvent.md)

## Description

Extension of [jwidget/Bindable](Bindable.md) interface with [trigger](#trigger) method. It is smart to store the event as **IEvent** internally, and expose it as [jwidget/Bindable](Bindable.md) externally to deny direct control over the event by the clients.

Has two implementations:

* [jwidget/Event](Event.md) - Real implementation that calls handler functions on [trigger](#trigger) call.
* [jwidget/dummyEvent](dummyEvent.md) - Dummy implementation that doesn't store handler functions and never calls them.

## Methods

### trigger

	trigger(params?: P)

* **params** - Event params.

Triggers event, i.e. calls all bound handlers with specified argument.

    this.myEvent.trigger({sender: this});

This way, we've called all handlers of `myEvent` with argument `{sender: this}`.

### destroy

	destroy()

Class destructor invocation method. Unbinds all event handlers. As opposed to the majority of classes, you can call event's **destroy** method multiple times.
