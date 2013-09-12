/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
 * Класс события. Используется для того, чтобы оповещать какие-то объекты (клиенты) о каких-то событиях (например, об
 * изменении значения какой-то переменной).
 * 
 * **Замечание:** Уничтожение событий объекта и отписка от сторонних событий, как правило, осуществляется в деструкторе.
 * 
 * Полный пример класса, выбрасывающего события:
 * 
 *     var Dispatcher = function() {
 *         Dispatcher._super.call(this);
 *         this.items = [];
 *         this.addEvent = new JW.Event();
 *         this.removeEvent = new JW.Event();
 *     };
 *     
 *     JW.extend(Dispatcher, // <T>
 *               JW.Class, {
 *         // Array<T> items;
 *         // JW.Event<Dispatcher.EventParams<T>> addEvent;
 *         // JW.Event<Dispatcher.EventParams<T>> removeEvent;
 *         
 *         // override
 *         destroy: function() {
 *             this.removeEvent.destroy();
 *             this.addEvent.destroy();
 *             this._super();
 *         },
 *         
 *         addItem: function(item, index) {
 *             this.items.splice(index, 0, item);
 *             this.addEvent.trigger(new Dispatcher.EventParams(this, item, index));
 *         },
 *         
 *         removeItem: function(index) {
 *             var item = this.items.splice(index, 1)[0];
 *             this.removeEvent.trigger(new Dispatcher.EventParams(this, item, index));
 *         }
 *     });
 *     
 *     Dispatcher.EventParams = function(sender, item, index) {
 *         Dispatcher.EventParams._super.call(this, sender);
 *         this.item = item;
 *         this.index = index;
 *     };
 *     
 *     JW.extend(Dispatcher.EventParams, // <T>
 *               JW.EventParams, {
 *         // Dispatcher sender;
 *         // T item;
 *         // Integer index;
 *     });
 * 
 * Пример использования этих событий:
 * 
 *     var Client = function(dispatcher) {
 *         Client._super.call(this);
 *         this.dispatcher = dispatcher;
 *         this._addAttachment = this.dispatcher.addEvent.bind(this._onAdd, this);
 *         this._removeAttachment = this.dispatcher.removeEvent.bind(this._onRemove, this);
 *     };
 *     
 *     JW.extend(Client, JW.Class, {
 *         // Dispatcher dispatcher;
 *         // JW.EventAttachment _addAttachment;
 *         // JW.EventAttachment _removeAttachment;
 *         
 *         // override
 *         destroy: function() {
 *             this._removeAttachment.destroy();
 *             this._addAttachment.destroy();
 *             this._super();
 *         },
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
	},
	
	/**
	 * Подписаться на событие.
	 * 
	 * Всякий раз, когда методом #trigger будет выброшено событие, будет вызван обработчик callback в контексте scope.
	 * 
	 * Обработчик можно отписать путем уничтожения возвращенного экземпляра JW.EventAttachment.
	 *
	 * @param {Function} callback
	 *
	 * `void callback(params: P)`
	 *
	 * Функция-обработчик события.
	 *
	 * @param {Object} scope Контекст вызова callback.
	 *
	 * @returns {JW.EventAttachment} `<P>` Подписка на событие.
	 */
	bind: function(callback, scope) {
		var attachment = new JW.EventAttachment(this, callback, scope);
		this.attachments[attachment._iid] = attachment;
		return attachment;
	},
	
	/**
	 * Отписывает обработчик, подписанный методом #bind.
	 * 
	 * Эквивалентен вызову `attachment.destroy()`.
	 *
	 * @param {JW.EventAttachment} attachment `<P>` Подписка на событие.
	 * @returns {void}
	 */
	unbind: function(attachment) {
		delete this.attachments[attachment._iid];
	},
	
	/**
	 * Отписывает все обработчики событий. Автоматически вызывается в деструкторе события.
	 * @returns {void}
	 */
	purge: function() {
		this.attachments = {};
	},
	
	/**
	 * Выбрасывает событие, оповещает клиенты.
	 * 
	 *     this.myEvent.trigger(new JW.EventParams(this));
	 * 
	 * Тем самым мы вызвали все обработчики, подписанные методом #bind на событие myEvent, с параметрами
	 * `new JW.EventParams(this)`.
	 *
	 * @param {P} params Параметры события.
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
