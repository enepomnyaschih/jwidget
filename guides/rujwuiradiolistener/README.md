# JW.UI.RadioListener

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.RadioListener

Наблюдает за изменением выбора в группе DOM радиокнопок и обновляет значение указанного строкового
[свойства](#!/guide/rujwproperty).
Также, применяется при инициализации.

    var listener = new JW.UI.RadioListener($("#myform"), "myradio");
    var selected = listener.{@link JW.UI.RadioListener#property-target target};
    // Предположим, что изначально выбрана радиокнопка со значением "apple" атрибута "value"
    assertEquals("apple", selected.{@link JW.Property#get get}());
    // Позже, пользователь выбрал радиокнопку "banana"
    assertEquals("banana", selected.{@link JW.Property#get get}());

Обратите внимание, что объект привязывает обработчик события к элементу-контейнеру и использует механизм бабблинга
(всплытия) для определения изменения выбора. Поэтому не следует прерывать бабблинг в дочерних элементах контейнера.
У всех радиокнопок должен быть одинаковый атрибут "name". Если ни одна радиокнопка не выбрана, значение
свойства сбрасывается в null.

Для обратного биндинга используйте [JW.UI.RadioUpdater](#!/guide/rujwuiradioupdater).
