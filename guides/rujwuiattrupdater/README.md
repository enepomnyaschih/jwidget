# JW.UI.AttrUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.AttrUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет значение указанного атрибута DOM элемента.
Также, применяется при инициализации.

    var title = new JW.Property("This is a tooltip");
    // Следующая команда меняет значение атрибута "title" на "This is a tooltip"
    var updater = new JW.UI.AttrUpdater($("#myelem"), "title", title);
    // Следующая команда меняет значение атрибута "title" на "Это подсказка"
    title.{@link JW.Property#set set}("Это подсказка");
