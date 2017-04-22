[Back to index](../README.md)

# Event

## Consumption

	import Event from "jwidget/Event";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
	* interface [jwidget/Bindable](Bindable.md)`<P>`
		* class **jwidget/Event**`<P>`
		* const [jwidget/dummyEvent](dummyEvent.md)

## Description

Real implementation of [jwidget/Bindable](Bindable.md) interface.

Used to notify some objects (clients) about certain events (for example, field value changes). Remember to destroy the event attachments to prevent side effects. It is smart to expose event objects in getters returning [jwidget/Bindable](Bindable.md) to deny direct control over the event by the clients.

Full example of the class that triggers the events:

	class Dispatcher extends Class {
		private _items: any[] = [];
		private _addEvent = this.own(new Event<DispatcherEventParams>());
		private _removeEvent = this.own(new Event<DispatcherEventParams>());

		get addEvent(): Bindable {
			return this._addEvent;
		}

		get removeEvent(): Bindable {
			return this._removeEvent;
		}

		addItem(item: any, index: number) {
			this._items.splice(index, 0, item);
			this._addEvent.trigger({sender: this, item: item, index: index});
		}

		removeItem(index) {
			var item = this._items.splice(index, 1)[0];
			this._removeEvent.trigger({sender: this, item: item, index: index});
		}
	}

	interface DispatcherEventParams {
		sender: Dispatcher;
		item: any;
		index: number;
	}

Reference: [jwidget/Class](Class.md), [jwidget/Bindable](Bindable.md).

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

## Constructor

	new Event<P>()

Constructs an event.

## Methods

### bind

	bind(handler: (params: P) => void, scope?: any): Destroyable

* **handler** - Event handler function.
* **scope** - **handler** call scope.

Starts listening to the event.

Whenever the event is triggered with [trigger](#trigger) method, the specified handler function
is called in specified scope.

You can stop listening the event by destroying the returned object.

### trigger

	trigger(params?: P)

* **params** - Event params.

Triggers event, i.e. calls all bound handlers with specified argument.

    this.myEvent.trigger({sender: this});

This way, we've called all handlers of `myEvent` with argument `{sender: this}`.

### hasAttachments

	hasAttachments(): boolean

Checks if the event has attachments.

### destroy

	destroy()

Class destructor invocation method. Unbinds all event handlers. As opposed to the majority of classes, you can call event's **destroy** method multiple times.
