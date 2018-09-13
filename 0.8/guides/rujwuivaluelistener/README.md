﻿# JW.UI.ValueListener

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.ValueListener

Наблюдает за изменением значения DOM элемента и обновляет значение указанного {@link JW.Property свойства}.
Также, применяется при инициализации.

    var value = new JW.Property();
    var listener = new JW.UI.ValueListener($("#myelem"), value);
    // Предположим, что поле изначально было пустым
    assertEquals("", value.{@link JW.Property#get get}());
    // Позже, пользователь ввел в поле "foo"
    assertEquals("foo", value.{@link JW.Property#get get}());