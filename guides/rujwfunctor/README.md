# JW.Functor

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Functor

`<T>` Наблюдает за изменением исходных [свойств](#!/guide/rujwproperty) и обновляет
целевое свойство на основе их значений.

    var value = new JW.Property(1000);
    var unit = new JW.Property("MW");
    var target = new JW.Property();
    var functor = new JW.Functor([ value, unit ], function(value, unit) {
        return value + " " + unit;
    }, this, { {@link JW.Functor#cfg-target target}: target });
    assert("1000 MW", target.{@link JW.Property#get get}());
    value.{@link JW.Property#set set}(1500);
    assert("1500 MW", target.{@link JW.Property#get get}());
    unit.{@link JW.Property#set set}("МВт"); // включаем русскую локализацию
    assert("1500 МВт", target.{@link JW.Property#get get}());

Если целевое свойство в конструктор не передано, то оно создается автоматически.
Обратите внимание, что в таком случае функтор агрегирует его.

    var value = new JW.Property(1000);
    var unit = new JW.Property("MW");
    var functor = new JW.Functor([ value, unit ], function(value, unit) {
        return value + " " + unit;
    }, this);
    var target = functor.{@link JW.Functor#property-target target};
    assert("1000 MW", target.{@link JW.Property#get get}());

Также, функтор позволяет уничтожать предыдущее созданное значение. Чтобы это сделать,
сконструируйте функтор со следующей нотацией:

    var document = new JW.Property();
    var documentView = new JW.Property();
    new JW.Functor([ document ], {
        {@link JW.Functor#cfg-target target}: documentView,
        {@link JW.Functor#cfg-createValue createValue}: function(document) {
            return new DocumentView(document);
        },
        {@link JW.Functor#cfg-destroyValue destroyValue}: function(documentView, document) {
            documentView.{@link JW.Class#destroy destroy}();
        },
        {@link JW.Functor#cfg-scope scope}: this
    });

Когда меняется значение исходного свойства, запускается следующий алгоритм:
1. Создается новое значение
1. Целевому свойству присваивается новое значение
1. Уничтожается старое значение

[JW.Switcher](#!/guide/rujwswitcher) работает наоборот:
1. Вызывается метод {@link JW.Switcher#done done}
1. Вызывается метод {@link JW.Switcher#init init}

Другое отличие между этими классами заключается в том, что функтор принимает null в качестве значения исходного
свойства, когда Switcher его игнорирует.

Если определен метод #destroyValue, то целевое свойство сбрасывается в null при уничтожении функтора.
