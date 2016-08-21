import {Class} from './Class';
import {Event} from './Event';

/**
 * Result of JW.Event **bind** method call. Destroy it to unbind the event handler.
 */
export class EventAttachment<P> extends Class {
	constructor(private _event: Event<P>, public handler: (params: P) => void, public scope: any) {
		super();
	}

	protected destroyObject() {
		this._event.unbind(this);
		super.destroyObject();
	}
}
