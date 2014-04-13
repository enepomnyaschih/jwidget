# JW.Property

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Property

`<V>` Свойство, которое умеет оповещать о своем изменении. Удобный способ наладить
связь между двумя объектами. Имеет следующие хелперы:

- JW.Copier - сохраняет одно свойство равным другому свойству
- JW.Updater - наблюдает за несколькими свойствами, выполняя какое-то действие при их изменении
- JW.Functor - наблюдает за несколькими свойствами, присваивая результат указанной функции целевому свойству
- JW.Switcher - наблюдает за свойством, чтобы инициализировать и освобождать его значение
- JW.UI.TextUpdater - наблюдает за строковым свойством и обновляет текст в DOM элементе
- JW.UI.HtmlUpdater - наблюдает за строковым свойством и обновляет HTML в DOM элементе
- JW.UI.ValueUpdater - наблюдает за строковым свойством и обновляет значение в DOM элементе текстового ввода
- JW.UI.AttrUpdater - наблюдает за строковым свойством и обновляет указанный атрибут в DOM элементе
- JW.UI.PropUpdater - наблюдает за булевым свойством и обновляет указанное свойство в DOM элементе
- JW.UI.CssUpdater - наблюдает за строковым свойством и обновляет указанный CSS стиль в DOM элементе
- JW.UI.ClassUpdater - наблюдает за булевым свойством и обновляет наличие укзанного CSS класса в DOM элементе
- JW.UI.RadioUpdater - наблюдает за строковым свойством и обновляет выбор DOM радиокнопок
- JW.UI.ValueListener - наблюдает за значением в DOM элементе текстового ввода и обновляет указанное строковое свойство
- JW.UI.CheckedListener - наблюдает за выбором DOM чекбокса и обновляет указанное булевое свойство
- JW.UI.RadioListener - наблюдает за выбором DOM радиокнопок и обновляет указанное строковое свойство

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
    var hiFunctor = new JW.Functor([ language ], function(language) {
        return locale[language].hi;
    });
    var byeFunctor = new JW.Functor([ language ], function(language) {
        return locale[language].bye;
    });
    new JW.UI.TextUpdater($("#hi"), hiFunctor.{@link JW.Functor#property-target target});
    new JW.UI.TextUpdater($("#bye"), byeFunctor.{@link JW.Functor#property-target target});
    // Теперь можно легко менять локализацию
    language.{@link JW.Property#set set}("ru");
