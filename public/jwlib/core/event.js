/*
	jWidget Lib source file.

	Copyright (C) 2015 Egor Nepomnyaschih

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @class
 *
 * `<P extends JW.EventParams>`
 *
 * Used to notify some objects (clients) about some events (for example, about some field value change).
 *
 * **Notice:** You must destroy the events and event listeners in class destructor.
 *
 * Full example of class that triggers the events:
 *
 *     var Dispatcher = function() {
 *         Dispatcher.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.items = [];
 *         this.addEvent = this.{@link JW.Class#own own}(new JW.Event());
 *         this.removeEvent = this.{@link JW.Class#own own}(new JW.Event());
 *     };
 *
 *     JW.extend(Dispatcher, JW.Class, {
 *         // Array items;
 *         // JW.Event<Dispatcher.EventParams> addEvent;
 *         // JW.Event<Dispatcher.EventParams> removeEvent;
 *
 *         addItem: function(item, index) {
 *             this.items.splice(index, 0, item);
 *             this.addEvent.{@link JW.Event#trigger trigger}(new Dispatcher.EventParams(this, item, index));
 *         },
 *
 *         removeItem: function(index) {
 *             var item = this.items.splice(index, 1)[0];
 *             this.removeEvent.{@link JW.Event#trigger trigger}(new Dispatcher.EventParams(this, item, index));
 *         }
 *     });
 *
 *     Dispatcher.EventParams = function(sender, item, index) {
 *         Dispatcher.EventParams.{@link JW.Class#static-property-_super _super}.call(this, sender);
 *         this.item = item;
 *         this.index = index;
 *     };
 *
 *     JW.extend(Dispatcher.EventParams, // <T>
 *               JW.EventParams, {
 *         // Dispatcher sender;
 *         // T item;
 *         // number index;
 *     });
 *
 * Full example of these events listening:
 *
 *     var Client = function(dispatcher) {
 *         Client.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.dispatcher = dispatcher;
 *         this.{@link JW.Class#own own}(this.dispatcher.addEvent.{@link JW.Event#bind bind}(this._onAdd, this));
 *         this.{@link JW.Class#own own}(this.dispatcher.removeEvent.{@link JW.Event#bind bind}(this._onRemove, this));
 *     };
 *
 *     JW.extend(Client, JW.Class, {
 *         // Dispatcher dispatcher;
 *
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

	destroy: function() {
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
	 *     this.myEvent.{@link JW.Event#trigger trigger}(new JW.EventParams(this));
	 *
	 * This way, we've called all handlers of `myEvent` with argument `new JW.EventParams(this)`.
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
