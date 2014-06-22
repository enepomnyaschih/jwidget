# JW.UI.PropUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.PropUpdater

Наблюдает за изменением булевого [свойства](#!/guide/rujwproperty) и обновляет значение указанного свойства DOM элемента.
Также, применяется при инициализации.

    var checked = new JW.Property(true);
    // Следующая команда выбирает checkbox
    var updater = new JW.UI.PropUpdater($("#myelem"), "checked", checked);
    // Следующая команда снимает выбор checkbox'а
    checked.{@link JW.Property#set set}(false);

Для обратного биндинга, используйте [JW.UI.CheckedListener](#!/guide/rujwuicheckedlistener) для чекбоксов
и [JW.UI.RadioListener](#!/guide/rujwuiradiolistener) для радиокнопок.
