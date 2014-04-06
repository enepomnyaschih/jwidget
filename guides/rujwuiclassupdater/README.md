# JW.UI.ClassUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.ClassUpdater

Наблюдает за изменением булевого {@link JW.Property свойства} и обновляет наличие указанного CSS класса в DOM элементе.
Также, применяется при инициализации.

    var selected = new JW.Property(true);
    // Следующая команда добавляет CSS класс "selected" в элемент
    var updater = new JW.UI.ClassUpdater($("#myelem"), "selected", selected);
    // Следующая команда удаляет CSS класс "selected" из элемента
    selected.{@link JW.Property#set set}(false);
