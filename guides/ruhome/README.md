# Что такое jWidget?

jWidget - это объектно-ориентированная библиотека JavaScript для реализации приложений по архитектуре Model-View
(Модель-Представление). jWidget мощнее, чем Backbone, но в то же время прозрачнее и понятнее, чем Angular и Ember.

За модель приложения отвечает модуль jWidget Lib, а за представление - jWidget UI.

**jWidget Lib** предоставляет ряд утилитарных классов и функций. jWidget Lib не зависит ни от каких сторонних библиотек и
фреймворков. jWidget Lib одинаково хорошо подходит для разработки как JavaScript-приложений, так и NodeJS-приложений.

Возможности jWidget Lib:

* Базовый класс JW.Class для создания и наследования классов
* Класс JW.Event для работы с пользовательскими событиями
* Класс JW.Property для работы с изменяемыми значениями
* Классы коллекций, алгоритмы, **синхронизаторы** (см. JW.AbstractCollection)

**jWidget UI** - это небольшой объектно-ориентированный модуль для создания произвольных визуальных компонентов JavaScript
на основе HTML-шаблонов. jWidget UI работает на основе [jQuery](http://jquery.com) и jWidget UI и идеально подходит
для разработки сайтов с произвольным визуальным интерфейсом.

Возможности jWidget UI:

* Базовый класс JW.UI.Component для создания и наследования визуальных компонентов по HTML-шаблону
* Древесная структура приложения (наличие родительских и дочерних компонентов)
* Интеграция со свойствами и коллекциями jWidget Lib, позволяющая автоматически синхронизировать представление с моделью
* Интеграция с [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/), позволяющая отделить HTML-шаблон от JS-кода

jWidget - чисто объектно-ориентированное решение, не полагающееся на мистические необычные HTML-шаблоны и циклы
обновлений, которые работают не понятно как. Каждый объект просто слушает какие-то события и обрабатывает их
совершенно простым и прозрачным алгоритмом. Взгляните на следующий пример:

    var Greeter = function() {
        Greeter.{@link JW.Class#_super _super}.call(this);
        this.name = this.{@link JW.Class#own own}(new JW.Property("guest"));
    };
    
    JW.extend(Greeter, JW.UI.Component, {
        renderNameField: function(el) {
            this.{@link JW.Class#own own}(new JW.UI.ValueUpdater(el, this.name)); // привязываем значение элемента к свойству
            this.{@link JW.Class#own own}(new JW.UI.ValueListener(el, this.name)); // привязываем свойство к значению элемента
        },
        
        renderGreeting: function(el) {
            var text = this.{@link JW.Class#own own}(new JW.Functor([this.name], function(name) {
                return "Hello, " + name + "!";
            }, this)).{@link JW.Functor#property-target target}; // строим сообщение приветствия
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text)); // привязываем текст элемента к сообщению
        }
    });
    
    JW.UI.template(Greeter, {
        main:
            '<div class="greeter">' +
                '<p>Your name: <input jwid="name-field"></p>' +
                '<div jwid="greeting"></div>' +
            '</div>'
    });
    
    new Greeter().{@link JW.UI.Component#renderTo renderTo}("body");

<iframe frameborder="0" width="400" height="100" src="http://enepomnyaschih.github.io/mt/0.8/greeter.html"></iframe>

Конечно, в Angular и Ember этот пример выглядел бы гораздо короче, но зато с jWidget вы ясно видите, что происходит в
этом коде. Благодаря этому вы можете быть абсолютно уверены в том, что с помощью jWidget можно реализовать сколь
угодно сложное и запутанное MVC-приложение. Почитайте [руководство](#!/guide/rusample1) для других примеров.

У jWidget есть одно преимущество, что отличает его от всех других Model-View фреймворков - это
**синхронизаторы коллекций** (см. JW.AbstractCollection).
Эту идею я не встречал ни в одном фреймворке и ни в одном языке программирования.

Лицензия проекта - LGPL.

Текущая версия: 0.8

<font size="5">[Скачать jWidget](guides/endownload/jwidget.zip)</font>

<font size="5">[Исходный код и баг-трекер на GitHub](https://github.com/enepomnyaschih/jwidget)</font>

Все замечания, предложения, отчеты об ошибках в программе и документации присылайте по адресу
[enepomnyaschih@gmail.com](mailto:enepomnyaschih@gmail.com)
