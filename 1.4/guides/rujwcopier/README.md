# JW.Copier

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Copier

`<T>` Наблюдает за изменением исходного [свойства](#!/guide/rujwproperty) и копирует его значение
в целевое свойство.

    var source = new JW.Property(1);
    var target = new JW.Property();
    var copier = new JW.Copier(source, { {@link JW.Copier#cfg-target target}: target });
    assert(1, target.{@link JW.Property#get get}());
    source.{@link JW.Property#set set}(2);
    assert(2, target.{@link JW.Property#get get}());

Если целевое свойство в конструктор не передано, то оно создается автоматически.
Обратите внимание, что в таком случае Copier агрегирует его.

    var source = new JW.Property(1);
    var target = new JW.Copier(this.source).{@link JW.Copier#property-target target};
    assert(1, target.{@link JW.Property#get get}());

У [JW.Property](#!/guide/rujwproperty) есть метод {@link JW.Property#bindTo bindTo} для сокращения записи:

    var source = new JW.Property(1);
    var target = new JW.Property();
    target.{@link JW.Property#bindTo bindTo}(source);
    assert(1, target.{@link JW.Property#get get}());
