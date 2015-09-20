Ext.data.JsonP.rujwswitcher({"guide":"<h1 id='rujwswitcher-section-jw.switcher'>JW.Switcher</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.Switcher\" rel=\"JW.Switcher\" class=\"docClass\">JW.Switcher</a></p>\n\n<p><code>&lt;V&gt;</code> Наблюдает за изменением <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">свойства</a> и вызывает\nуказанные функции <a href=\"#!/api/JW.Switcher-cfg-init\" rel=\"JW.Switcher-cfg-init\" class=\"docClass\">init</a> и <a href=\"#!/api/JW.Switcher-cfg-done\" rel=\"JW.Switcher-cfg-done\" class=\"docClass\">done</a>,\nпередавая в них значение свойства в качестве аргумента.\nТакже, функция <a href=\"#!/api/JW.Switcher-cfg-init\" rel=\"JW.Switcher-cfg-init\" class=\"docClass\">init</a> вызывается при инициализации switcher'а,\nа функция <a href=\"#!/api/JW.Switcher-cfg-done\" rel=\"JW.Switcher-cfg-done\" class=\"docClass\">done</a> вызывается при уничтожении switcher'а.\nФункции не вызываются, если значение свойства - null.</p>\n\n<pre><code>var property = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(1);\nvar switcher = new <a href=\"#!/api/JW.Switcher\" rel=\"JW.Switcher\" class=\"docClass\">JW.Switcher</a>(property, {\n    <a href=\"#!/api/JW.Switcher-cfg-init\" rel=\"JW.Switcher-cfg-init\" class=\"docClass\">init</a>: function(value) { console.log(\"Init \" + value); },\n    <a href=\"#!/api/JW.Switcher-cfg-done\" rel=\"JW.Switcher-cfg-done\" class=\"docClass\">done</a>: function(value) { console.log(\"Done \" + value); },\n    <a href=\"#!/api/JW.Switcher-cfg-scope\" rel=\"JW.Switcher-cfg-scope\" class=\"docClass\">scope</a>: this\n}); // вывод: Init 1\nproperty.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(2); // вывод: Done 1, Init 2\nproperty.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(null); // вывод: Done 2\nproperty.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(3); // вывод: Init 3\nswitcher.<a href=\"#!/api/JW.Switcher-method-destroy\" rel=\"JW.Switcher-method-destroy\" class=\"docClass\">destroy</a>(); // вывод: Done 3\n</code></pre>\n\n<p>Реалистичный сценарий использования switcher'а представлен ниже:</p>\n\n<pre><code>this.selectedDocument = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>());\nthis.own(new <a href=\"#!/api/JW.Switcher\" rel=\"JW.Switcher\" class=\"docClass\">JW.Switcher</a>(this.selectedDocument, {\n    <a href=\"#!/api/JW.Switcher-cfg-init\" rel=\"JW.Switcher-cfg-init\" class=\"docClass\">init</a>: function(document) { document.selected.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(true); },\n    <a href=\"#!/api/JW.Switcher-cfg-done\" rel=\"JW.Switcher-cfg-done\" class=\"docClass\">done</a>: function(document) { document.selected.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(false); },\n    <a href=\"#!/api/JW.Switcher-cfg-scope\" rel=\"JW.Switcher-cfg-scope\" class=\"docClass\">scope</a>: this\n}));\n</code></pre>\n","title":"JW.Switcher"});