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

Функтор не уничтожает предыдущее присвоенное значение. Также, функтор не сбрасывает значение целевого свойства при
своем уничтожении. Если вам нужны эти возможности, используйте [JW.Mapper](#!/guide/rujwmapper).