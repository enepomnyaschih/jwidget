# JW.UI.CssUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.CssUpdater

Наблюдает за изменением строкового {@link JW.Property свойства} и обновляет значение указанного CSS стиля DOM элемента.
Также, применяется при инициализации.

    var color = new JW.Property("red");
    // Следующая команда меняет значение стиля "color" на "red"
    var updater = new JW.UI.CssUpdater($("#myelem"), "color", color);
    // Следующая команда меняет значение стиля "color" на "blue"
    color.{@link JW.Property#set set}("blue");
