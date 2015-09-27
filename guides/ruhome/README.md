# Что такое jWidget?

jWidget - это объектно-ориентированный JavaScript Model-View фреймворк.
Будучи прямым конкурентом Backbone, AngularJS и EmberJS, jWidget пригодится тем разработчикам,
кто уважает принципы объектно-ориентированного программирования и ценит высокую скорость работы приложения.

Возможности jWidget:

* Базовый класс [JW.Class](#!/guide/rujwclass) для создания и наследования классов
* Класс события [JW.Event](#!/guide/rujwevent)
* Класс оповещающего свойства [JW.Property](#!/guide/rujwproperty)
* Классы коллекций, алгоритмы, синхронизаторы ([JW.AbstractCollection](#!/guide/rujwabstractcollection))
* Базовый класс [JW.UI.Component](#!/guide/rujwuicomponent) для создания и наследования визуальных компонентов по HTML-шаблону
* Древесная структура приложения (наличие родительских и дочерних компонентов)
* Интеграция с [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/), позволяющая отделить HTML-шаблон от JS-кода

jWidget - чисто объектно-ориентированное решение, не полагающееся на мистические необычные HTML-шаблоны и циклы
обновлений, которые работают не понятно как. Каждый объект просто слушает какие-то события и обрабатывает их
совершенно простым и прозрачным алгоритмом. Взгляните на следующий пример:

    var Greeter = function() {
        Greeter.{@link JW.Class#_super _super}.call(this);
        this.name = this.{@link JW.Class#own own}(new JW.Property("wanderer"));
    };

    JW.extend(Greeter, JW.UI.Component, {
        renderNameField: function(el) {
            this.{@link JW.Class#own own}(new JW.UI.ValueUpdater(el, this.name)); // привязываем значение элемента к свойству
            this.{@link JW.Class#own own}(new JW.UI.ValueListener(el, this.name)); // привязываем свойство к значению элемента
        },

        renderGreeting: function(el) {
            var text = this.{@link JW.Class#own own}(this.name.{@link JW.Property#$$mapValue $$mapValue}(function(name) { // строим сообщение приветствия
                return "Hello, " + name + "!";
            }, this));
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

<iframe frameborder="0" width="400" height="100" src="http://enepomnyaschih.github.io/mt/1.3/greeter.html"></iframe>

Конечно, в Angular и Ember этот пример выглядел бы гораздо короче, но зато с jWidget вы ясно видите, что происходит в
этом коде. Благодаря этому вы можете быть абсолютно уверены в том, что с помощью jWidget можно реализовать сколь
угодно сложное и запутанное MVC-приложение. Вы можете быть уверены в том, что здесь доступны все известные
паттерны ООП и соблюдаются <a href="http://ru.wikipedia.org/wiki/SOLID_(%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)">SOLID-принципы</a>.
Почитайте [руководство](#!/guide/rusample1) для других примеров.

Отличие фреймворка jWidget от остальных Model-View фреймворков заключается в подходе к работе со свойствами и коллекциями.
В других фреймворках data binding осуществляется неявно через HTML-шаблоны. В jWidget же data binding осуществляется
явно с помощью свойств ([JW.Property](#!/guide/rujwproperty)) и его хелперов.
Вместо специальных неявных тэгов-repeater'ов в HTML-шаблонах вы работаете с коллекциями
явно с помощью [классов коллекций](#!/guide/rujwabstractcollection) и синхронизаторов.
Это очень похоже на основы теории баз данных, но только на уровне UI.

Такой подход более эффективен: data binding не ограничивается связью между моделью и представлением. Все те же самые
техники используются для связи объектов модели между собой и классов представления между собой.

Лицензия проекта - LGPL.

Текущая версия: 1.4

<font size="5">[Скачать jWidget](guides/endownload/jwidget.zip)</font>

<font size="5">[Исходный код и баг-трекер на GitHub](https://github.com/enepomnyaschih/jwidget)</font>

jWidget доступен как пакет [Bower](http://bower.io/):

    bower install jwidget

Все замечания, предложения, отчеты об ошибках в программе и документации присылайте по адресу
[jwidgetproject@gmail.com](mailto:jwidgetproject@gmail.com)
