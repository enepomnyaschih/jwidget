# JW.UI.CheckedListener

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.CheckedListener

Наблюдает за изменением выбора DOM чекбокса и обновляет значение указанного булевого [свойства](#!/guide/rujwproperty).
Также, применяется при инициализации.

    var listener = new JW.UI.CheckedListener($("#mycheckbox"));
    var checked = listener.{@link JW.UI.CheckedListener#property-target target};
    // Предположим, что чекбокс изначально не выбран
    assertEquals(false, value.{@link JW.Property#get get}());
    // Позже, пользователь выбрал чекбокс
    assertEquals(true, value.{@link JW.Property#get get}());

Для обратного биндинга, используйте [JW.UI.PropUpdater](#!/guide/rujwuipropupdater), передав "checked" в качестве значения аргумента "prop".
