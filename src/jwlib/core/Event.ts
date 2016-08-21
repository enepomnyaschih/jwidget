import {Class} from './Class';
import {Dictionary} from './Core';
import {EventAttachment} from './EventAttachment';
import {Map} from '../collection/Map';

/**
 * Used to notify some objects (clients) about certain events (for example, field value change).
 *
 * **Notice:** Remember to destroy the events and event listeners to prevent side effects.
 *
 * Full example of class that triggers the events:
 *
 *     class Dispatcher extends JW.Class {
 *         private items: any[] = [];
 *
 *         addEvent = this.own(new JW.Event<dispatcher.EventParams>());
 *         removeEvent = this.own(new JW.Event<dispatcher.EventParams>());
 *
 *         addItem(item: any, index: number) {
 *             this.items.splice(index, 0, item);
 *             this.addEvent.trigger({sender: this, item: item, index: index});
 *         }
 *
 *         removeItem(index) {
 *             var item = this.items.splice(index, 1)[0];
 *             this.removeEvent.trigger({sender: this, item: item, index: index});
 *         }
 *     }
 *
 *     module dispatcher {
 *         export interface EventParams {
 *             sender: Dispatcher;
 *             item: any;
 *             index: number;
 *         }
 *     }
 *
 * Full example of event listener:
 *
 *     class Listener extends JW.Class {
 *         constructor(dispatcher: Dispatcher) {
 *             super();
 *             this.own(dispatcher.addEvent.bind(this._onAdd, this));
 *             this.own(dispatcher.removeEvent.bind(this._onRemove, this));
 *         }
 *
 *         _onAdd(params: dispatcher.EventParams) {
 *             console.log(params.item, " item is added at ", params.index);
 *         }
 *
 *         _onRemove(params: dispatcher.EventParams) {
 *             console.log(params.item, " item is removed at ", params.index);
 *         }
 *     }
 */
export class Event<P> extends Class {
	private _attachments: Dictionary<EventAttachment<P>> = null;

	protected destroyObject() {
		this.purge();
		super.destroyObject();
	}

	/**
	 * Starts listening to event.
	 *
	 * Whenever the event is triggered with **trigger** method, specified handler function
	 * is called in specified scope.
	 *
	 * You can stop listening the event by destroying the returned JW.EventAttachment instance.
	 *
	 * @param callback Event handler function.
	 * @param scope **callback** call scope.
	 * @returns Event attachment object.
	 */
	bind(handler: (params: P) => void, scope?: any): EventAttachment<P> {
		if (this._attachments === null) {
			this._attachments = {};
		}
		var attachment = new EventAttachment<P>(this, handler, scope);
		this._attachments[attachment._iid] = attachment;
		return attachment;
	}

	/**
	 * Stops listening the event with specific handler.
	 *
	 * Equivalent to `attachment.destroy()`.
	 *
	 * @param attachment Event attachment.
	 */
	unbind(attachment: EventAttachment<P>) {
		if (this._attachments !== null) {
			delete this._attachments[attachment._iid];
		}
	}

	/**
	 * Unbinds all event handlers. Called automatically in event destructor.
	 */
	purge() {
		this._attachments = null;
	}

	/**
	 * Triggers event, i.e. calls all bound handlers.
	 *
	 *     this.myEvent.trigger({sender: this});
	 *
	 * This way, we've called all handlers of `myEvent` with argument `{sender: this}`.
	 *
	 * @param params Event params.
	 */
	trigger(params?: P) {
		if (this._attachments === null) {
			return;
		}
		for (var iid in this._attachments) {
			var attachment = this._attachments[iid];
			attachment.handler.call(attachment.scope || attachment, params);
		}
	}

	/**
	 * Checks if the event has attachments.
	 */
	hasAttachments(): boolean {
		return (this._attachments === null) || !Map.isEmpty(this._attachments);
	}
}
