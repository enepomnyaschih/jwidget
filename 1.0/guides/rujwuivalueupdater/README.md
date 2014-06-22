# JW.UI.ValueUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.ValueUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет значение внутри DOM элемента ввода текста.
Также, применяется при инициализации.

    var value = new JW.Property("Submit");
    // Следующая команда меняет значение элемента на "Submit"
    var updater = new JW.UI.ValueUpdater($("#myelem"), value);
    // Следующая команда меняет значение элемента на "Отправить"
    value.{@link JW.Property#set set}("Отправить");

Для обратного биндинга используйте [JW.UI.ValueListener](#!/guide/rujwuivaluelistener).
