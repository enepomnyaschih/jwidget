# JW.Event

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Event

`<P>`

Класс события. Используется для того, чтобы оповещать какие-то объекты (клиенты) о каких-то событиях (например, об
изменении значения какой-то переменной).

**Замечание:** Не забывайте уничтожать события и подписки на события.

Полный пример класса, выбрасывающего события:

    var Dispatcher = function() {
        Dispatcher.{@link JW.Class#static-property-_super _super}.call(this);
        this.items = [];
        this.addEvent = this.{@link JW.Class#own own}(new JW.Event()); // <Dispatcher.EventParams>
        this.removeEvent = this.{@link JW.Class#own own}(new JW.Event()); // <Dispatcher.EventParams>
    };

    JW.extend(Dispatcher, JW.Class, {
        addItem: function(item, index) {
            this.items.splice(index, 0, item);
            this.addEvent.{@link JW.Event#trigger trigger}({sender: this, item: item, index: index});
        },

        removeItem: function(index) {
            var item = this.items.splice(index, 1)[0];
            this.removeEvent.{@link JW.Event#trigger trigger}({sender: this, item: item, index: index});
        }
    });

    // interface Dispatcher.EventParams {
    //     Dispatcher sender;
    //     Object item;
    //     number index;
    // }

Пример использования этих событий:

    var Client = function(dispatcher) {
        Client.{@link JW.Class#static-property-_super _super}.call(this);
        this.{@link JW.Class#own own}(dispatcher.addEvent.{@link JW.Event#bind bind}(this._onAdd, this));
        this.{@link JW.Class#own own}(dispatcher.removeEvent.{@link JW.Event#bind bind}(this._onRemove, this));
    };

    JW.extend(Client, JW.Class, {
        _onAdd: function(params) {
            console.log(params.item, " item is added at ", params.index);
        },

        _onRemove: function(params) {
            console.log(params.item, " item is removed at ", params.index);
        }
    });
