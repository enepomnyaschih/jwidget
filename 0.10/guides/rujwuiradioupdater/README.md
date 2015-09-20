﻿# JW.UI.RadioUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.RadioUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет выбор DOM радиокнопок.
Также, применяется при инициализации.

    var value = new JW.Property("apple");
    // Следующая команда выберет радиокнопку группы со значением "apple"
    var updater = new JW.UI.RadioUpdater($("#myform"), "myradio", value);
    // Следующая команда выберет радиокнопку группы со значением "banana"
    value.{@link JW.Property#set set}("banana");

У всех радиокнопок должен быть одинаковый атрибут "name". Если свойство сбросить в null, все радиокнопки теряют выбор.

Для обратного биндинга, используйте [JW.UI.RadioListener](#!/guide/rujwuiradiolistener).