Ext.data.JsonP.rujwfunctor({"guide":"<h1 id='rujwfunctor-section-jw.functor'>JW.Functor</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a></p>\n\n<p><code>&lt;T&gt;</code> Наблюдает за изменением исходных <a href=\"#!/guide/rujwproperty\">свойств</a> и обновляет\nцелевое свойство на основе их значений.</p>\n\n<pre><code>var value = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(1000);\nvar unit = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(\"MW\");\nvar target = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>();\nvar functor = new <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a>([ value, unit ], function(value, unit) {\n    return value + \" \" + unit;\n}, this, { <a href=\"#!/api/JW.Functor-cfg-target\" rel=\"JW.Functor-cfg-target\" class=\"docClass\">target</a>: target });\nassert(\"1000 MW\", target.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\nvalue.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(1500);\nassert(\"1500 MW\", target.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\nunit.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(\"МВт\"); // включаем русскую локализацию\nassert(\"1500 МВт\", target.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n</code></pre>\n\n<p>Если целевое свойство в конструктор не передано, то оно создается автоматически.\nОбратите внимание, что в таком случае функтор агрегирует его.</p>\n\n<pre><code>var value = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(1000);\nvar unit = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(\"MW\");\nvar functor = new <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a>([ value, unit ], function(value, unit) {\n    return value + \" \" + unit;\n}, this);\nvar target = functor.<a href=\"#!/api/JW.Functor-property-target\" rel=\"JW.Functor-property-target\" class=\"docClass\">target</a>;\nassert(\"1000 MW\", target.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n</code></pre>\n\n<p>Функтор не уничтожает предыдущее присвоенное значение. Также, функтор не сбрасывает значение целевого свойства при\nсвоем уничтожении. Если вам нужны эти возможности, используйте <a href=\"#!/guide/rujwmapper\">JW.Mapper</a>.</p>\n","title":"JW.Functor"});