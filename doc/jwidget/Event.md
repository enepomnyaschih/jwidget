[Back to index](../README.md)

# Event

* **Static methods**
	* [make](#make)

## Consumption

	import Event from "jwidget/Event";

## Hierarchy

* interface [jwidget/Listenable](Listenable.md)`<P>`
* interface [jwidget/Destroyable](Destroyable.md)
	* interface [jwidget/IEvent](IEvent.md)`<P>`
		* class **jwidget/Event**`<P>`

## Description

Real implementation of [jwidget/IEvent](IEvent.md) interface that calls handler functions on [trigger](#trigger) method call (as opposed to [jwidget/dummyEvent](dummyEvent.md) which doesn't).

Used to notify some objects (listeners) about certain events (for example, field value changes). Remember to destroy the event attachments to prevent side effects. It is smart to expose event objects in getters returning [jwidget/Bindable](Bindable.md) to deny direct control over the event by the listeners.

Full example of class that triggers the events:

	class Dispatcher extends Class {
		private _items: any[] = [];
		private _addEvent = new Event<DispatcherEventParams>();
		private _removeEvent = new Event<DispatcherEventParams>();

		get addEvent(): Bindable {
			return this._addEvent;
		}

		get removeEvent(): Bindable {
			return this._removeEvent;
		}

		addItem(item: any, index: number) {
			this._items.splice(index, 0, item);
			this._addEvent.trigger({item, index});
		}

		removeItem(index) {
			const item = this._items.splice(index, 1)[0];
			this._removeEvent.trigger({item, index});
		}
	}

	interface DispatcherEventParams {
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

## Static methods

### make

	make<P>(owner: IClass, dummy: boolean): IEvent<P>

* **owner** - An object to aggregate a new event in.
* **dummy** - Determines if dummy event should be used instead.

If **dummy** argument is false, returns a new instance of **Event** aggregated in the **owner** object. Else returns [jwidget/dummyEvent](dummyEvent.md).
