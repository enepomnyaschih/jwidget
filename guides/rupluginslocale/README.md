# JW.Plugins.Locale

Это краткое описание класса на русском языке.

Полная документация на английском: JW.Plugins.Locale

Класс для управления локализацией приложения.

## Постановка задачи

Предположим, в вашем распоряжении есть следующий словарь локализации:

    var dictionary = {
        en: {
            _lang: "English",
            name: "Name",
            submit: "Submit",
            equipment: {
                monitor: "Monitor",
                keyboard: "Keyboard",
                mouse: "Mouse"
            },
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        ru: {
            _lang: "Русский",
            name: "Имя",
            submit: "Отправить",
            equipment: {
                monitor: "Монитор",
                keyboard: "Клавиатура",
                mouse: "Мышь"
            },
            monthsShort: ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн",
                          "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
        }
    };

Вам необходимо реализовать компонент для динамического переключения локализации приложения без перезагрузки страницы.
С классом JW.Plugins.Locale это делается очень легко. JW.Plugins.Locale работает на базе JW.Property.

<iframe style="border: 1px solid green; padding: 10px;" width="400" height="120" src="http://enepomnyaschih.github.io/mt/1.0.0/locale.html"></iframe>

## Метод getString

С помощью метода {@link JW.Plugins.Locale#getString getString} вы можете получить указанную строку в текущей или указанной локализации.

    // ... выше объявляем словарь dictionary

    function assert(x) {
        if (!x) {
            throw "Assertion failed";
        }
    }

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);
        assert("Name" === locale.{@link JW.Plugins.Locale#getString getString}("name"));
        assert("Monitor" === locale.{@link JW.Plugins.Locale#getString getString}("equipment.monitor"));
        assert("Feb" === locale.{@link JW.Plugins.Locale#getString getString}(["monthsShort", 1]));

        lang.{@link JW.Property#set set}("ru");
        assert("Имя" === locale.{@link JW.Plugins.Locale#getString getString}("name"));
        assert("Монитор" === locale.{@link JW.Plugins.Locale#getString getString}("equipment.monitor"));
        assert("Фев" === locale.{@link JW.Plugins.Locale#getString getString}(["monthsShort", 1]));

        assert("English" === locale.{@link JW.Plugins.Locale#getString getString}("en", "_lang"));
        assert("Русский" === locale.{@link JW.Plugins.Locale#getString getString}("ru", "_lang"));
    });

## Метод getFunctor

Если локализацию приложения необходимо переключать динамически, то одного метода {@link JW.Plugins.Locale#getString getString} не достаточно.
Воспользуемся методом {@link JW.Plugins.Locale#getFunctor getFunctor}, который формирует новый экземпляр JW.Property, содержащий указанную строку в
текущей локализации и обновляющий ее при изменении текущей локализации.

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);

        var submitFunctor = locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("submit");
        assert("Submit" === submitFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());

        lang.{@link JW.Property#set set}("ru");
        assert("Отправить" === submitFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());

        submitFunctor.{@link JW.Functor#destroy destroy}(); // если функтор больше не нужен, его необходимо уничтожить
    });

## Использование метода getFunctor в компонентах

Предположим, вам нужно вывести строку "name" в качестве метки внутри некоторой формы и "submit" в качестве текста для
кнопки отправления формы. Воспользуемся хелперами JW.UI.TextUpdater и JW.UI.ValueUpdater.

    var Form = function(locale) {
        Form.{@link JW.Class#static-property-_super _super}.call(this);
        this.locale = locale; // JW.Plugins.Locale
    };

    JW.extend(Form, JW.UI.Component, {
        renderNameLabel: function(el) {
            var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("name")).{@link JW.Functor#property-target target};
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
        },

        renderSubmit: function(el) {
            var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("submit")).{@link JW.Functor#property-target target};
            this.{@link JW.Class#own own}(new JW.UI.ValueUpdater(el, text));
        }
    });

    JW.UI.template(Form, {
        main:
            '<form>' +
                '<label><span jwid="name-label"></span><input type="text"></label>' +
                '<input jwid="submit" type="submit">' +
            '</form>'
    });

Протестируем нашу форму.

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);

        var form = new Form(locale).{@link JW.UI.Component#renderTo renderTo}("body");

        // Спустя 2 секунды меняем локализацию на русскую
        setTimeout(function() { lang.{@link JW.Property#set set}("ru"); }, 2000);
    });

## Компонент для переключения локализации

Теперь нам нужен нормальный компонент для переключения локализации. Воспользуемся радиокнопками и
хелперами JW.UI.RadioUpdater и JW.UI.RadioListener.

    var LocaleSwitch = function(locale) {
        LocaleSwitch.{@link JW.Class#static-property-_super _super}.call(this);
        this.locale = locale; // JW.Plugins.Locale
    };

    JW.extend(LocaleSwitch, JW.UI.Component, {
        renderRoot: function() {
            return JW.Array.$map(this.locale.getLanguages(), function(lang) {
                return this.{@link JW.Class#own own}(new LocaleSwitchItem(this.locale, lang));
            }, this);
        },

        afterRender: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.Class#own own}(new JW.UI.RadioUpdater(this.{@link JW.UI.Component#el el}, "lang", this.locale.{@link JW.Plugins.Locale#lang lang}));
            this.{@link JW.Class#own own}(new JW.UI.RadioListener(this.{@link JW.UI.Component#el el}, "lang", this.locale.{@link JW.Plugins.Locale#lang lang}));
        }
    });

    JW.UI.template(LocaleSwitch, {
        main: '<form></form>'
    });

    //--------

    var LocaleSwitchItem = function(locale, lang) {
        LocaleSwitchItem.{@link JW.Class#static-property-_super _super}.call(this);
        this.locale = locale; // JW.Plugins.Locale
        this.lang = lang; // string
    };

    JW.extend(LocaleSwitchItem, JW.UI.Component, {
        renderInput: function(el) {
            el.attr("value", this.lang);
        },

        renderLabel: function(el) {
            el.text(this.locale.{@link JW.Plugins.Locale#getString getString}(this.lang, "_lang"));
        }
    });

    JW.UI.template(LocaleSwitchItem, {
        main:
            '<div><label>' +
                '<input type="radio" name="lang" jwid="input"><span jwid="label"></span>' +
            '</label></div>'
    });

Попробуем протестировать его.

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);
        var switcher = new LocaleSwitch(locale).{@link JW.UI.Component#renderTo renderTo}("body");
    });

## Дочерняя локализация (метод getSubLocale)

Посмотрим, как еще можно упростить работу с локализацией. Иногда некоторому компоненту нужна лишь некоторая часть
локализации (например, строки в "equipment"), и, чтобы не писать каждый раз длинные выражения, заведем дочерний
объект локализации.

    var EquipmentSelector = function(locale) {
        EquipmentSelector.{@link JW.Class#static-property-_super _super}.call(this);
        this.locale = locale; // JW.Plugins.Locale, дочерний объект локализации
    };

    JW.extend(EquipmentSelector, JW.UI.Component, {
        renderMonitor: function(el) {
            var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("monitor")).{@link JW.Functor#property-target target};
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
        },

        renderKeyboard: function(el) {
            var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("keyboard")).{@link JW.Functor#property-target target};
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
        },

        renderMouse: function(el) {
            var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("mouse")).{@link JW.Functor#property-target target};
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
        }
    });

    JW.UI.template(EquipmentSelector, {
        main:
            '<form>' +
                '<button jwid="monitor"></button>' +
                '<button jwid="keyboard"></button>' +
                '<button jwid="mouse"></button>' +
            '</form>'
    });

Воспользуемся методом {@link JW.Plugins.Locale#getSubLocale getSubLocale}, чтобы сформировать искомый дочерний объект локализации.

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);
        var equipmentLocale = locale.{@link JW.Plugins.Locale#getSubLocale getSubLocale}("equipment");
        var equipmentSelector = new EquipmentSelector(equipmentLocale).{@link JW.UI.Component#renderTo renderTo}("body");
    });

Как видите, внутри компонента EquipmentSelector мы теперь можем кратко записывать ключ локализации:

- "monitor", а не "equipment.monitor"
- "keyboard", а не "equipment.keyboard"
- "mouse", а не "equipment.mouse"

## Локализация по шаблону (методы expandTemplate и getTemplateFunctor)

Даты форматировать непросто. Во-первых, строка даты зависит от маски (например, "mmm'yy"). Во-вторых - от текущей локализации
("Jan" или "Янв"). Для форматирования дат воспользуемся методом форматирования строки по шаблону.

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);
        assert("Jan'10" === locale.{@link JW.Plugins.Locale#expandTemplate expandTemplate}("${monthsShort.0}'10");
    });

Метод JW.Plugins.Locale.formatDate позволяет сформировать шаблон для форматирования даты.

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);
        var date = new Date(2010, 0, 1);
        var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
        assert("Jan'10" === locale.{@link JW.Plugins.Locale#expandTemplate expandTemplate}(format);
    });

Метод {@link JW.Plugins.Locale#getTemplateFunctor getTemplateFunctor} позволяет наладить динамическое изменение строки даты при изменении текущей локализации.

    $(function() {
        var lang = new JW.Property("en");
        var locale = new JW.Plugins.Locale(dictionary, lang);

        var date = new Date(2010, 0, 1);
        var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
        var dateFunctor = locale.{@link JW.Plugins.Locale#getTemplateFunctor getTemplateFunctor}(format);
        assert("Jan'10" === dateFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());

        lang.{@link JW.Property#set set}("ru");
        assert("Янв'10" === dateFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());

        dateFunctor.{@link JW.Functor#destroy destroy}();
    });

Теперь по аналогии с предыдущими примерами можно легко привязать текст внутри любого DOM-элемента к dateFunctor.{@link JW.Functor#property-target target}.
