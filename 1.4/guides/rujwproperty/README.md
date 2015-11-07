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

Также, смотрите методы расширения {@link jQuery jQuery}.

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
    $("#hi").{@link jQuery#jwtext jwtext}(hi);
    $("#bye").{@link jQuery#jwtext jwtext}(bye);
    // Теперь можно легко менять локализацию
    language.{@link JW.Property#set set}("ru");
