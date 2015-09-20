Ext.data.JsonP.rujwuivaluelistener({"guide":"<h1 id='rujwuivaluelistener-section-jw.ui.valuelistener'>JW.UI.ValueListener</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.UI.ValueListener\" rel=\"JW.UI.ValueListener\" class=\"docClass\">JW.UI.ValueListener</a></p>\n\n<p>Наблюдает за изменением значения DOM элемента ввода текста и обновляет значение указанного строкового\n<a href=\"#!/guide/rujwproperty\">свойства</a>. Также, применяется при инициализации.</p>\n\n<pre><code>var listener = new <a href=\"#!/api/JW.UI.ValueListener\" rel=\"JW.UI.ValueListener\" class=\"docClass\">JW.UI.ValueListener</a>($(\"#myinput\"));\nvar value = listener.<a href=\"#!/api/JW.UI.ValueListener-property-target\" rel=\"JW.UI.ValueListener-property-target\" class=\"docClass\">target</a>;\n// Предположим, что поле изначально было пустым\nassertEquals(\"\", value.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n// Позже, пользователь ввел в поле \"foo\"\nassertEquals(\"foo\", value.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n</code></pre>\n\n<p>Для обратного биндинга используйте <a href=\"#!/guide/rujwuivalueupdater\">JW.UI.ValueUpdater</a>.</p>\n","title":"JW.UI.ValueListener"});