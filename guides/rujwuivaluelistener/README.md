# JW.UI.ValueListener

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.ValueListener

Наблюдает за изменением значения DOM элемента ввода текста и обновляет значение указанного строкового
[свойства](#!/guide/rujwproperty). Также, применяется при инициализации.

    var listener = new JW.UI.ValueListener($("#myinput"));
    var value = listener.{@link JW.UI.ValueListener#property-target target};
    // Предположим, что поле изначально было пустым
    assertEquals("", value.{@link JW.Property#get get}());
    // Позже, пользователь ввел в поле "foo"
    assertEquals("foo", value.{@link JW.Property#get get}());

Для обратного биндинга используйте [JW.UI.ValueUpdater](#!/guide/rujwuivalueupdater).
