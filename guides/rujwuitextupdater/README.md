# JW.UI.TextUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.TextUpdater

Наблюдает за изменением строкового {@link JW.Property свойства} и обновляет текст внутри DOM элемента.
Также, применяется при инициализации.

    var text = new JW.Property("I like cats");
    // Следующая команда меняет текст на "I like cats"
    var updater = new JW.UI.TextUpdater($("#myelem"), text);
    // Следующая команда меняет текст на "Everyone likes cats"
    text.{@link JW.Property#set set}("Everyone likes cats");
