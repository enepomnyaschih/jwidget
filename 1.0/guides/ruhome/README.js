Ext.data.JsonP.ruhome({"guide":"<h1 id='ruhome-section-%D0%A7%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%BE%D0%B5-jwidget%3F'>Что такое jWidget?</h1>\n\n<p>jWidget - это объектно-ориентированный JavaScript Model-View фреймворк.\nБудучи прямым конкурентом Backbone, AngularJS и EmberJS, jWidget пригодится тем разработчикам,\nкто уважает принципы объектно-ориентированного программирования и ценит высокую скорость работы приложения.</p>\n\n<p>Возможности jWidget:</p>\n\n<ul>\n<li>Базовый класс <a href=\"#!/guide/rujwclass\">JW.Class</a> для создания и наследования классов</li>\n<li>Класс события <a href=\"#!/guide/rujwevent\">JW.Event</a></li>\n<li>Класс оповещающего свойства <a href=\"#!/guide/rujwproperty\">JW.Property</a></li>\n<li>Классы коллекций, алгоритмы, синхронизаторы (<a href=\"#!/guide/rujwabstractcollection\">JW.AbstractCollection</a>)</li>\n<li>Базовый класс <a href=\"#!/guide/rujwuicomponent\">JW.UI.Component</a> для создания и наследования визуальных компонентов по HTML-шаблону</li>\n<li>Древесная структура приложения (наличие родительских и дочерних компонентов)</li>\n<li>Интеграция с <a href=\"https://github.com/enepomnyaschih/jwsdk/wiki/\">jWidget SDK</a>, позволяющая отделить HTML-шаблон от JS-кода</li>\n</ul>\n\n\n<p>jWidget - чисто объектно-ориентированное решение, не полагающееся на мистические необычные HTML-шаблоны и циклы\nобновлений, которые работают не понятно как. Каждый объект просто слушает какие-то события и обрабатывает их\nсовершенно простым и прозрачным алгоритмом. Взгляните на следующий пример:</p>\n\n<pre><code>var Greeter = function() {\n    Greeter.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>.call(this);\n    this.name = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(\"wanderer\"));\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Greeter, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    renderNameField: function(el) {\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ValueUpdater\" rel=\"JW.UI.ValueUpdater\" class=\"docClass\">JW.UI.ValueUpdater</a>(el, this.name)); // привязываем значение элемента к свойству\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ValueListener\" rel=\"JW.UI.ValueListener\" class=\"docClass\">JW.UI.ValueListener</a>(el, this.name)); // привязываем свойство к значению элемента\n    },\n\n    renderGreeting: function(el) {\n        var text = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a>([this.name], function(name) {\n            return \"Hello, \" + name + \"!\";\n        }, this)).<a href=\"#!/api/JW.Functor-property-target\" rel=\"JW.Functor-property-target\" class=\"docClass\">target</a>; // строим сообщение приветствия\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>(el, text)); // привязываем текст элемента к сообщению\n    }\n});\n\n<a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a>(Greeter, {\n    main:\n        '&lt;div class=\"greeter\"&gt;' +\n            '&lt;p&gt;Your name: &lt;input jwid=\"name-field\"&gt;&lt;/p&gt;' +\n            '&lt;div jwid=\"greeting\"&gt;&lt;/div&gt;' +\n        '&lt;/div&gt;'\n});\n\nnew Greeter().<a href=\"#!/api/JW.UI.Component-method-renderTo\" rel=\"JW.UI.Component-method-renderTo\" class=\"docClass\">renderTo</a>(\"body\");\n</code></pre>\n\n<iframe frameborder=\"0\" width=\"400\" height=\"100\" src=\"http://enepomnyaschih.github.io/mt/1.0.0/greeter.html\"></iframe>\n\n\n<p>Конечно, в Angular и Ember этот пример выглядел бы гораздо короче, но зато с jWidget вы ясно видите, что происходит в\nэтом коде. Благодаря этому вы можете быть абсолютно уверены в том, что с помощью jWidget можно реализовать сколь\nугодно сложное и запутанное MVC-приложение. Вы можете быть уверены в том, что здесь доступны все известные\nпаттерны ООП и соблюдаются <a href=\"http://ru.wikipedia.org/wiki/SOLID_(%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)\">SOLID-принципы</a>.\nПочитайте <a href=\"#!/guide/rusample1\">руководство</a> для других примеров.</p>\n\n<p>Отличие фреймворка jWidget от остальных Model-View фреймворков заключается в подходе к работе со свойствами и коллекциями.\nВ других фреймворках data binding осуществляется неявно через HTML-шаблоны. В jWidget же data binding осуществляется\nявно с помощью свойств (<a href=\"#!/guide/rujwproperty\">JW.Property</a>) и его хелперов.\nВместо специальных неявных тэгов-repeater'ов в HTML-шаблонах вы работаете с коллекциями\nявно с помощью <a href=\"#!/guide/rujwabstractcollection\">классов коллекций</a> и синхронизаторов.\nЭто очень похоже на основы теории баз данных, но только на уровне UI.</p>\n\n<p>Такой подход более эффективен: data binding не ограничивается связью между моделью и представлением. Все те же самые\nтехники используются для связи объектов модели между собой и классов представления между собой.</p>\n\n<p>Лицензия проекта - LGPL.</p>\n\n<p>Текущая версия: 1.0.0</p>\n\n<p><font size=\"5\"><a href=\"guides/endownload/jwidget.zip\">Скачать jWidget</a></font></p>\n\n<p><font size=\"5\"><a href=\"https://github.com/enepomnyaschih/jwidget\">Исходный код и баг-трекер на GitHub</a></font></p>\n\n<p>jWidget доступен как пакет <a href=\"http://bower.io/\">Bower</a>:</p>\n\n<pre><code>bower install jwidget\n</code></pre>\n\n<p>Все замечания, предложения, отчеты об ошибках в программе и документации присылайте по адресу\n<a href=\"mailto:jwidgetproject@gmail.com\">jwidgetproject@gmail.com</a></p>\n","title":"Что такое jWidget?"});