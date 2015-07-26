# JW.UI.JQEventAttachment

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.JQEventAttachment

Адаптер подписки на событие jQuery.

- Позволяет вам использовать события jQuery совместно с состемой агрегации объектов jWidget.
Уничтожение подписки влечет отписку от события.
- Позволяет вам передавать контекст вызова функции-обработчика.
- Тем не менее, не поддерживает аргумент "data" - используйте замыкания вместо него.

Метод {@link jQuery#jwon jwon} является коротким способом создания адаптера.

**Пример**

Предположим, у вас есть следующий класс:

    var MyForm = function(el) {
        this._onSubmit = JW.inScope(this._onSubmit, this);
        this._onTextChange = JW.inScope(this._onTextChange, this);
        MyForm.{@link JW.Class#static-property-_super _super}.call(this);
        el.on("submit", this._onSubmit);
        el.on("change", "input[type=text]", this._onTextChange);
    };

    JW.extend(MyForm, JW.Class, {
        _onSubmit: function(event) {...},
        _onTextChange: function(event) {...},

        {@link JW.Class#destroy destroy}: function() {
            el.off("submit", this._onSubmit);
            el.off("change", "input[type=text]", this._onTextChange);
            this.{@link JW.Class#_super _super}();
        }
    });

Благодаря адаптеру, мы можем избавиться от накладных расходов по закреплению контекста вызова метода
и явной отписке от события в методе {@link JW.Class#destroy destroy}:

    var MyForm = function(el) {
        MyForm.{@link JW.Class#static-property-_super _super}.call(this);
        this.own(el.{@link jQuery#jwon jwon}("submit", this._onSubmit, this));
        this.own(el.{@link jQuery#jwon jwon}("change", "input[type=text]", this._onTextChange, this));
    };

    JW.extend(MyForm, JW.Class, {
        _onSubmit: function(event, target) {...},
        _onTextChange: function(event, target) {...}
    });

Обратите внимание, что target события, которому jQuery обычно присваивает контекст вызова, передается
в функцию-обработчик вторым аргументом.
