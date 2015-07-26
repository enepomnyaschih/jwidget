# JW.UI.ClassNameUpdater

Это краткое описание класса на русском языке.

Полная документация на английском: JW.UI.ClassNameUpdater

Наблюдает за изменением строкового [свойства](#!/guide/rujwproperty) и обновляет имя CSS класса в DOM элементе.
Также, применяется при инициализации.

    var el = jQuery('<div class="elem"></div>');
    var color = new JW.Property("red");

    // Следующая команда добавит CSS класс "red" в элемент
    var updater = new JW.UI.ClassNameUpdater(el, color);

    // Следующая команда удалит CSS класс "red" из элемента и добавит "blue" вместо него
    color.{@link JW.Property#set set}("blue");

    // Следующая команда удалит CSS класс "blue" из элемента
    color.{@link JW.Property#set set}(null);

    // Следующая команда добавит CSS класс "green" в элемент
    color.{@link JW.Property#set set}("green");

    // Следующая команда удалит CSS класс "green" из элемента
    updater.{@link JW.Class#destroy destroy}();

**Внимание:** Хелпер не проверяет наличие в элементе класса с таким же именем. Если такое произойдет,
он удалит этот класс при следующем изменении значения свойства. Тем не менее, он не станет трогать
другие классы, например, он не удаляет класс "elem" в примере выше.
