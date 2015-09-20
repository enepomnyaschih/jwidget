# JW.Property

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Property

`<V>` Свойство, которое умеет оповещать о своем изменении. Удобный способ наладить
связь между двумя объектами. Имеет следующие хелперы:

- [JW.Copier](#!/guide/rujwcopier) - сохраняет одно свойство равным другому свойству
- [JW.Updater](#!/guide/rujwupdater) - наблюдает за несколькими свойствами, выполняя какое-то действие при их изменении
- [JW.Functor](#!/guide/rujwfunctor) - наблюдает за несколькими свойствами, присваивая результат указанной функции целевому свойству
- [JW.Mapper](#!/guide/rujwmapper) - наблюдает за несколькими свойствами, пересоздавая и уничтожая значение целевого свойства
- [JW.Switcher](#!/guide/rujwswitcher) - наблюдает за свойством, чтобы инициализировать и освобождать его значение
- [JW.UI.TextUpdater](#!/guide/rujwuitextupdater) - наблюдает за строковым свойством и обновляет текст в DOM элементе
- [JW.UI.HtmlUpdater](#!/guide/rujwuihtmlupdater) - наблюдает за строковым свойством и обновляет HTML в DOM элементе
- [JW.UI.ValueUpdater](#!/guide/rujwuivalueupdater) - наблюдает за строковым свойством и обновляет значение в DOM элементе текстового ввода
- [JW.UI.AttrUpdater](#!/guide/rujwuiattrupdater) - наблюдает за строковым свойством и обновляет указанный атрибут в DOM элементе
- [JW.UI.PropUpdater](#!/guide/rujwuipropupdater) - наблюдает за булевым свойством и обновляет указанное свойство в DOM элементе
- [JW.UI.CssUpdater](#!/guide/rujwuicssupdater) - наблюдает за строковым свойством и обновляет указанный CSS стиль в DOM элементе
- [JW.UI.ClassUpdater](#!/guide/rujwuiclassupdater) - наблюдает за булевым свойством и обновляет наличие указанного CSS класса в DOM элементе
- [JW.UI.ClassNameUpdater](#!/guide/rujwuiclassnameupdater) - наблюдает за строковым свойством и обновляет имя CSS класса в DOM элементе
- [JW.UI.VisibleUpdater](#!/guide/rujwuivisibleupdater) - наблюдает за булевым свойством и обновляет видимость указанного DOM элемента
- [JW.UI.RadioUpdater](#!/guide/rujwuiradioupdater) - наблюдает за строковым свойством и обновляет выбор DOM радиокнопок
- [JW.UI.ValueListener](#!/guide/rujwuivaluelistener) - наблюдает за значением в DOM элементе текстового ввода и обновляет указанное строковое свойство
- [JW.UI.CheckedListener](#!/guide/rujwuicheckedlistener) - наблюдает за выбором DOM чекбокса и обновляет указанное булевое свойство
- [JW.UI.RadioListener](#!/guide/rujwuiradiolistener) - наблюдает за выбором DOM радиокнопок и обновляет указанное строковое свойство

Например, вы можете использовать следующий алгоритм для изменения локализации
вашего Web приложения без перезагрузки страницы:

    var locale = {
        en: {
            hi: "Hi",
            bye: "Bye"
        },
        ru: {
            hi: "Привет",
            bye: "Пока"
        }
    };
    var language = new JW.Property("en");
    var hi = language.{@link JW.Property#$$mapValue $$mapValue}(function(language) { return locale[language].hi; });
    var bye = language.{@link JW.Property#$$mapValue $$mapValue}(function(language) { return locale[language].bye; });
    new JW.UI.TextUpdater($("#hi"), hi);
    new JW.UI.TextUpdater($("#bye"), bye);
    // Теперь можно легко менять локализацию
    language.{@link JW.Property#set set}("ru");
