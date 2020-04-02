/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * @class
 *
 * `<P>`
 *
 * Used to notify some objects (clients) about some events (for example, about some field value change).
 *
 * **Notice:** Remember to destroy the events and event listeners.
 *
 * Full example of class that triggers the events:
 *
 *     var Dispatcher = function() {
 *         Dispatcher.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.items = [];
 *         this.addEvent = this.{@link JW.Class#own own}(new JW.Event()); // <Dispatcher.EventParams>
 *         this.removeEvent = this.{@link JW.Class#own own}(new JW.Event()); // <Dispatcher.EventParams>
 *     };
 *
 *     JW.extend(Dispatcher, JW.Class, {
 *         addItem: function(item, index) {
 *             this.items.splice(index, 0, item);
 *             this.addEvent.{@link JW.Event#trigger trigger}({sender: this, item: item, index: index});
 *         },
 *
 *         removeItem: function(index) {
 *             var item = this.items.splice(index, 1)[0];
 *             this.removeEvent.{@link JW.Event#trigger trigger}({sender: this, item: item, index: index});
 *         }
 *     });
 *
 *     // interface Dispatcher.EventParams {
 *     //     Dispatcher sender;
 *     //     Object item;
 *     //     number index;
 *     // }
 *
 * Full example of these events listening:
 *
 *     var Client = function(dispatcher) {
 *         Client.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.{@link JW.Class#own own}(dispatcher.addEvent.{@link JW.Event#bind bind}(this._onAdd, this));
 *         this.{@link JW.Class#own own}(dispatcher.removeEvent.{@link JW.Event#bind bind}(this._onRemove, this));
 *     };
 *
 *     JW.extend(Client, JW.Class, {
 *         _onAdd: function(params) {
 *             console.log(params.item, " item is added at ", params.index);
 *         },
 *
 *         _onRemove: function(params) {
 *             console.log(params.item, " item is removed at ", params.index);
 *         }
 *     });
 *
 * @extends JW.Class
 * @constructor
 */
JW.Event = function() {
	JW.Event._super.call(this);
	this.attachments = {};
};

JW.extend(JW.Event, JW.Class, {
	/*
	Map<JW.EventAttachment> attachments;
	*/

	destroyObject: function() {
		this.purge();
		this._super();
	},

	/**
	 * Starts listening the event.
	 *
	 * Whenever the event will be triggered with #trigger method, specified handler function
	 * will be called in specified scope.
	 *
	 * You can stop listening the event by destroying the returned JW.EventAttachment instance.
	 *
	 * @param {Function} callback
	 *
	 * `callback(params: P): void`
	 *
	 * Event handler function.
	 *
	 * @param {Object} scope `callback` call scope.
	 *
	 * @returns {JW.EventAttachment} `<P>` Event attachment object.
	 */
	bind: function(callback, scope) {
		var attachment = new JW.EventAttachment(this, callback, scope);
		this.attachments[attachment._iid] = attachment;
		return attachment;
	},

	/**
	 * Stops listening the event with specific handler.
	 *
	 * Equivalent to `attachment.destroy()`.
	 *
	 * @param {JW.EventAttachment} attachment `<P>` Event attachment.
	 * @returns {void}
	 */
	unbind: function(attachment) {
		delete this.attachments[attachment._iid];
	},

	/**
	 * Unbinds all event handlers. Called automatically in event destructor.
	 * @returns {void}
	 */
	purge: function() {
		this.attachments = {};
	},

	/**
	 * Triggers event, i.e. calls all bound handlers.
	 *
	 *     this.myEvent.{@link JW.Event#trigger trigger}({sender: this});
	 *
	 * This way, we've called all handlers of `myEvent` with argument `{sender: this}`.
	 *
	 * @param {P} params Event params.
	 * @returns {void}
	 */
	trigger: function(params) {
		// haven't splitted to simpler methods for debugging purposes
		for (var iid in this.attachments) {
			var attachment = this.attachments[iid];
			attachment.callback.call(attachment.scope || attachment, params);
		}
	}
});
