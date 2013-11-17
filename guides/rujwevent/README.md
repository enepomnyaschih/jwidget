# JW.Event

`<P extends JW.EventParams>`

Класс события. Используется для того, чтобы оповещать какие-то объекты (клиенты) о каких-то событиях (например, об
изменении значения какой-то переменной).

**Замечание:** Уничтожение событий объекта и отписка от сторонних событий, как правило, осуществляется в деструкторе.

Полный пример класса, выбрасывающего события:

    var Dispatcher = function() {
        Dispatcher.{@link JW.Class#static-property-_super _super}.call(this);
        this.items = [];
        this.addEvent = new JW.Event();
        this.removeEvent = new JW.Event();
    };
    
    JW.extend(Dispatcher, // <T>
              JW.Class, {
        // Array<T> items;
        // JW.Event<Dispatcher.EventParams<T>> addEvent;
        // JW.Event<Dispatcher.EventParams<T>> removeEvent;
        
        // override
        {@link JW.Class#destroy destroy}: function() {
            this.removeEvent.{@link JW.Class#destroy destroy}();
            this.addEvent.{@link JW.Class#destroy destroy}();
            this._super();
        },
        
        addItem: function(item, index) {
            this.items.splice(index, 0, item);
            this.addEvent.{@link JW.Event#trigger trigger}(new Dispatcher.EventParams(this, item, index));
        },
        
        removeItem: function(index) {
            var item = this.items.splice(index, 1)[0];
            this.removeEvent.{@link JW.Event#trigger trigger}(new Dispatcher.EventParams(this, item, index));
        }
    });
    
    Dispatcher.EventParams = function(sender, item, index) {
        Dispatcher.EventParams.{@link JW.Class#static-property-_super _super}.call(this, sender);
        this.item = item;
        this.index = index;
    };
    
    JW.extend(Dispatcher.EventParams, // <T>
              JW.EventParams, {
        // Dispatcher sender;
        // T item;
        // Integer index;
    });

Пример использования этих событий:

    var Client = function(dispatcher) {
        Client.{@link JW.Class#static-property-_super _super}.call(this);
        this.dispatcher = dispatcher;
        this._addAttachment = this.dispatcher.addEvent.{@link JW.Event#bind bind}(this._onAdd, this);
        this._removeAttachment = this.dispatcher.removeEvent.{@link JW.Event#bind bind}(this._onRemove, this);
    };
    
    JW.extend(Client, JW.Class, {
        // Dispatcher dispatcher;
        // JW.EventAttachment _addAttachment;
        // JW.EventAttachment _removeAttachment;
        
        // override
        {@link JW.Class#destroy destroy}: function() {
            this._removeAttachment.{@link JW.Class#destroy destroy}();
            this._addAttachment.{@link JW.Class#destroy destroy}();
            this._super();
        },
        
        _onAdd: function(params) {
            console.log(params.item, " item is added at ", params.index);
        },
        
        _onRemove: function(params) {
            console.log(params.item, " item is removed at ", params.index);
        }
    });
