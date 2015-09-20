Ext.data.JsonP.rujwuijqeventattachment({"guide":"<h1 id='rujwuijqeventattachment-section-jw.ui.jqeventattachment'>JW.UI.JQEventAttachment</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.UI.JQEventAttachment\" rel=\"JW.UI.JQEventAttachment\" class=\"docClass\">JW.UI.JQEventAttachment</a></p>\n\n<p>Адаптер подписки на событие jQuery.</p>\n\n<ul>\n<li>Позволяет вам использовать события jQuery совместно с состемой агрегации объектов jWidget.\nУничтожение подписки влечет отписку от события.</li>\n<li>Позволяет вам передавать контекст вызова функции-обработчика.</li>\n<li>Тем не менее, не поддерживает аргумент \"data\" - используйте замыкания вместо него.</li>\n</ul>\n\n\n<p>Метод <a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a> является коротким способом создания адаптера.</p>\n\n<p><strong>Пример</strong></p>\n\n<p>Предположим, у вас есть следующий класс:</p>\n\n<pre><code>var MyForm = function(el) {\n    this._onSubmit = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onSubmit, this);\n    this._onTextChange = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onTextChange, this);\n    MyForm.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    el.on(\"submit\", this._onSubmit);\n    el.on(\"change\", \"input[type=text]\", this._onTextChange);\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(MyForm, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    _onSubmit: function(event) {...},\n    _onTextChange: function(event) {...},\n\n    <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>: function() {\n        el.off(\"submit\", this._onSubmit);\n        el.off(\"change\", \"input[type=text]\", this._onTextChange);\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n    }\n});\n</code></pre>\n\n<p>Благодаря адаптеру, мы можем избавиться от накладных расходов по закреплению контекста вызова метода\nи явной отписке от события в методе <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>:</p>\n\n<pre><code>var MyForm = function(el) {\n    MyForm.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.own(el.<a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a>(\"submit\", this._onSubmit, this));\n    this.own(el.<a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a>(\"change\", \"input[type=text]\", this._onTextChange, this));\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(MyForm, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    _onSubmit: function(event, target) {...},\n    _onTextChange: function(event, target) {...}\n});\n</code></pre>\n\n<p>Обратите внимание, что target события, которому jQuery обычно присваивает контекст вызова, передается\nв функцию-обработчик вторым аргументом.</p>\n","title":"JW.UI.JQEventAttachment"});