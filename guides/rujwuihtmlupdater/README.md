# JW.UI.HtmlUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.HtmlUpdater

Наблюдает за изменением строкового {@link JW.Property свойства} и обновляет HTML внутри DOM элемента.
Также, применяется при инициализации.

    var html = new JW.Property('<img src="loading.gif"> Loading...');
    // Следующая команда меняет HTML элемента на Loading
    var updater = new JW.UI.HtmlUpdater($("#myelem"), html);
    // Следующая команда меняет HTML элемента на Loaded
    html.{@link JW.Property#set set}('<img src="loaded.png"> Loaded!');
