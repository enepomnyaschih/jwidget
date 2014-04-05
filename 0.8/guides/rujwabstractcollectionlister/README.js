Ext.data.JsonP.rujwabstractcollectionlister({"guide":"<h1 id='rujwabstractcollectionlister-section-jw.abstractcollection.lister'>JW.AbstractCollection.Lister</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.AbstractCollection.Lister\" rel=\"JW.AbstractCollection.Lister\" class=\"docClass\">JW.AbstractCollection.Lister</a></p>\n\n<p><code>&lt;T extends <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, C extends <a href=\"#!/api/JW.AbstractCollection\" rel=\"JW.AbstractCollection\" class=\"docClass\">JW.AbstractCollection</a>&lt;T&gt;&gt;</code></p>\n\n<p>Конвертер в множество. Преобразует исходную коллекцию в множество. Можно использовать для быстрой проверки\nпринадлежности элемента коллекции.</p>\n\n<pre><code>var lister = collection.<a href=\"#!/api/JW.AbstractCollection-method-createLister\" rel=\"JW.AbstractCollection-method-createLister\" class=\"docClass\">createLister</a>();\nvar set = lister.<a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a>;\n\n// Assert that some item x exists in source collection\nassert(set.<a href=\"#!/api/JW.AbstractSet-method-contains\" rel=\"JW.AbstractSet-method-contains\" class=\"docClass\">contains</a>(x));\n</code></pre>\n\n<p><strong>Замечание:</strong> Элементы исходной коллекции не должны повторяться.</p>\n\n<p>Создавайте конвертер с помощью метода <a href=\"#!/api/JW.AbstractCollection-method-createLister\" rel=\"JW.AbstractCollection-method-createLister\" class=\"docClass\">JW.AbstractCollection.createLister</a>.\nМетод сам определит, какая реализация конвертера лучше подойдет (простая или observable).</p>\n\n<p>Множество можно передать в качестве конфигурационной опции:</p>\n\n<pre><code>var set = new <a href=\"#!/api/JW.Set\" rel=\"JW.Set\" class=\"docClass\">JW.Set</a>();\nvar lister = collection.<a href=\"#!/api/JW.AbstractCollection-method-createLister\" rel=\"JW.AbstractCollection-method-createLister\" class=\"docClass\">createLister</a>({\n    <a href=\"#!/api/JW.AbstractCollection.Lister-cfg-target\" rel=\"JW.AbstractCollection.Lister-cfg-target\" class=\"docClass\">target</a>: set\n});\n</code></pre>\n\n<p>Правила работы конвертера:</p>\n\n<ul>\n<li>Целевое множество находится в поле <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a>.</li>\n<li>При конструировании конвертера все элементы исходной коллекции сразу добавляются в <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a>.</li>\n<li>При уничтожении конвертера все элементы исходной коллекции удаляются из <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a>.</li>\n<li>Множество можно передать в качестве конфигурационной опции <a href=\"#!/api/JW.AbstractCollection.Lister-cfg-target\" rel=\"JW.AbstractCollection.Lister-cfg-target\" class=\"docClass\">target</a>.\nВ этом случае, вся забота о его уничтожении ложится на вас.</li>\n<li>Если <a href=\"#!/api/JW.AbstractCollection.Lister-cfg-target\" rel=\"JW.AbstractCollection.Lister-cfg-target\" class=\"docClass\">target</a> не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую\nреализацию <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a> (простая или observable). В этом\nслучае, <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a> будет уничтожен автоматически при уничтожении конвертера.</li>\n<li>Можно конвертировать несколько коллекций в одно и то же множество, если все элементы различны.</li>\n</ul>\n\n","title":"JW.AbstractCollection.Lister"});