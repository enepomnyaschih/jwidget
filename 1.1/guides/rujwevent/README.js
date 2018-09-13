Ext.data.JsonP.rujwevent({"guide":"<h1 id='rujwevent-section-jw.event'>JW.Event</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a></p>\n\n<p><code>&lt;P extends <a href=\"#!/api/JW.EventParams\" rel=\"JW.EventParams\" class=\"docClass\">JW.EventParams</a>&gt;</code></p>\n\n<p>Класс события. Используется для того, чтобы оповещать какие-то объекты (клиенты) о каких-то событиях (например, об\nизменении значения какой-то переменной).</p>\n\n<p><strong>Замечание:</strong> Уничтожение событий объекта и отписка от сторонних событий, как правило, осуществляется в деструкторе.</p>\n\n<p>Полный пример класса, выбрасывающего события:</p>\n\n<pre><code>var Dispatcher = function() {\n    Dispatcher.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.items = [];\n    this.addEvent = new <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>();\n    this.removeEvent = new <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>();\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Dispatcher, // &lt;T&gt;\n          <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    // Array&lt;T&gt; items;\n    // <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>&lt;Dispatcher.EventParams&lt;T&gt;&gt; addEvent;\n    // <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>&lt;Dispatcher.EventParams&lt;T&gt;&gt; removeEvent;\n\n    // override\n    <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>: function() {\n        this.removeEvent.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n        this.addEvent.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n        this._super();\n    },\n\n    addItem: function(item, index) {\n        this.items.splice(index, 0, item);\n        this.addEvent.<a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a>(new Dispatcher.EventParams(this, item, index));\n    },\n\n    removeItem: function(index) {\n        var item = this.items.splice(index, 1)[0];\n        this.removeEvent.<a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a>(new Dispatcher.EventParams(this, item, index));\n    }\n});\n\nDispatcher.EventParams = function(sender, item, index) {\n    Dispatcher.EventParams.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this, sender);\n    this.item = item;\n    this.index = index;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Dispatcher.EventParams, // &lt;T&gt;\n          <a href=\"#!/api/JW.EventParams\" rel=\"JW.EventParams\" class=\"docClass\">JW.EventParams</a>, {\n    // Dispatcher sender;\n    // T item;\n    // number index;\n});\n</code></pre>\n\n<p>Пример использования этих событий:</p>\n\n<pre><code>var Client = function(dispatcher) {\n    Client.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.dispatcher = dispatcher;\n    this._addAttachment = this.dispatcher.addEvent.<a href=\"#!/api/JW.Event-method-bind\" rel=\"JW.Event-method-bind\" class=\"docClass\">bind</a>(this._onAdd, this);\n    this._removeAttachment = this.dispatcher.removeEvent.<a href=\"#!/api/JW.Event-method-bind\" rel=\"JW.Event-method-bind\" class=\"docClass\">bind</a>(this._onRemove, this);\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Client, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    // Dispatcher dispatcher;\n    // <a href=\"#!/api/JW.EventAttachment\" rel=\"JW.EventAttachment\" class=\"docClass\">JW.EventAttachment</a> _addAttachment;\n    // <a href=\"#!/api/JW.EventAttachment\" rel=\"JW.EventAttachment\" class=\"docClass\">JW.EventAttachment</a> _removeAttachment;\n\n    // override\n    <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>: function() {\n        this._removeAttachment.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n        this._addAttachment.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n        this._super();\n    },\n\n    _onAdd: function(params) {\n        console.log(params.item, \" item is added at \", params.index);\n    },\n\n    _onRemove: function(params) {\n        console.log(params.item, \" item is removed at \", params.index);\n    }\n});\n</code></pre>\n","title":"JW.Event"});