[Back to index](../README.md)

# Event

## Consumption

	import Event from "jwidget/Event";

## Hierarchy

* class Event<P> extends [jwidget/Class](Class.md)

## Description

Used to notify some objects (clients) about certain events (for example, field value changes).
Remember to destroy the event attachments to prevent side effects.

Full example of class that triggers the events:

	class Dispatcher extends Class {
		private items: any[] = [];

		addEvent = this.own(new Event<DispatcherEventParams>());
		removeEvent = this.own(new Event<DispatcherEventParams>());

		addItem(item: any, index: number) {
			this.items.splice(index, 0, item);
			this.addEvent.trigger({sender: this, item: item, index: index});
		}

		removeItem(index) {
			var item = this.items.splice(index, 1)[0];
			this.removeEvent.trigger({sender: this, item: item, index: index});
		}
	}

	interface DispatcherEventParams {
		sender: Dispatcher;
		item: any;
		index: number;
	}

Reference: [jwidget/Class](Class.md).

Full example of event listener:

	class Listener extends Class {
		constructor(dispatcher: Dispatcher) {
			super();
			this.own(dispatcher.addEvent.bind(this._onAdd, this));
			this.own(dispatcher.removeEvent.bind(this._onRemove, this));
		}

		_onAdd(params: DispatcherEventParams) {
			console.log(params.item, " item is added at ", params.index);
		}

		_onRemove(params: DispatcherEventParams) {
			console.log(params.item, " item is removed at ", params.index);
		}
	}

## Methods

### bind

	bind(handler: (params: P) => void, scope?: any): EventAttachment<P>

Starts listening to event.

Whenever the event is triggered with **trigger** method, specified handler function
is called in specified scope.

You can stop listening the event by destroying the returned [EventAttachment](#EventAttachment) instance.

* **handler** - Event handler function.
* **scope** - **handler** call scope.

### unbind

	unbind(attachment: EventAttachment<P>)

Reference: [EventAttachment](#EventAttachment).

Stops listening the event with specific handler. Equivalent to `attachment.destroy()`.

### purge

	purge()

Unbinds all event handlers. Called automatically in event destructor.

### trigger

	trigger(params?: P)

Triggers event, i.e. calls all bound handlers with specified argument.

    this.myEvent.trigger({sender: this});

This way, we've called all handlers of `myEvent` with argument `{sender: this}`.

### hasAttachments

	hasAttachments(): boolean

Checks if the event has attachments.

# EventAttachment

## Consumption

	import EventAttachment from "jwidget/EventAttachment";

## Hierarchy

* class EventAttachment<P> extends [jwidget/Class](Class.md)

## Description

Result of [Event.bind](#bind) method call. Destroy it to unbind the event handler.
