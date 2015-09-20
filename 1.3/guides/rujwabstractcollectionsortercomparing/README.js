Ext.data.JsonP.rujwabstractcollectionsortercomparing({"guide":"<h1 id='rujwabstractcollectionsortercomparing-section-jw.abstractcollection.sortercomparing'>JW.AbstractCollection.SorterComparing</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.AbstractCollection.SorterComparing\" rel=\"JW.AbstractCollection.SorterComparing\" class=\"docClass\">JW.AbstractCollection.SorterComparing</a></p>\n\n<p><code>&lt;T, C extends <a href=\"#!/api/JW.AbstractCollection\" rel=\"JW.AbstractCollection\" class=\"docClass\">JW.AbstractCollection</a>&lt;T&gt;&gt;</code></p>\n\n<p>Конвертер в массив (сортировщик по компаратору). Преобразует исходную коллекцию в массив. Новые элементы\nдобавляются в такое место массива, что массив всегда остается в отсортированном состоянии.\nЕсли исходная коллекция наблюдаемая (observable), начинает непрерывную синхронизацию.\nСортировка осуществляется по функции-компаратору, указанной пользователем.</p>\n\n<pre><code>var source = new <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>([\n    {title: \"apple\", id: 3},\n    {title: \"Carrot\", id: 1},\n    {title: \"Apple\", id: 2}\n]);\n\n// Сортируем по заголовку без учета регистра, а потом по id\nvar sorter = source.<a href=\"#!/api/JW.AbstractCollection-method-createSorterComparing\" rel=\"JW.AbstractCollection-method-createSorterComparing\" class=\"docClass\">createSorterComparing</a>({\n    <a href=\"#!/api/JW.AbstractCollection.SorterComparing-cfg-compare\" rel=\"JW.AbstractCollection.SorterComparing-cfg-compare\" class=\"docClass\">compare</a>: function(x, y) {\n        return <a href=\"#!/api/JW-static-method-cmp\" rel=\"JW-static-method-cmp\" class=\"docClass\">JW.cmp</a>(x.title, y.title, true) || <a href=\"#!/api/JW-static-method-cmp\" rel=\"JW-static-method-cmp\" class=\"docClass\">JW.cmp</a>(x.id, y.id);\n    },\n    <a href=\"#!/api/JW.AbstractCollection.SorterComparing-cfg-scope\" rel=\"JW.AbstractCollection.SorterComparing-cfg-scope\" class=\"docClass\">scope</a>: this\n});\nvar target = sorter.<a href=\"#!/api/JW.AbstractCollection.SorterComparing-property-target\" rel=\"JW.AbstractCollection.SorterComparing-property-target\" class=\"docClass\">target</a>;\n\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(0).id === 2); // Apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(1).id === 3); // apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(2).id === 1); // Carrot\n\n// Целевой массив автоматически синхронизируется с исходной наблюдаемой коллекцией\nsource.add({title: \"Banana\", id: 4});\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(0).id === 2); // Apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(1).id === 3); // apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(2).id === 4); // Banana\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(3).id === 1); // Carrot\n\nsorter.<a href=\"#!/api/JW.AbstractCollection.SorterComparing-method-destroy\" rel=\"JW.AbstractCollection.SorterComparing-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p><strong>Замечание:</strong> Элементы исходной коллекции не должны повторяться.</p>\n\n<p>Создавайте конвертер с помощью метода <a href=\"#!/api/JW.AbstractCollection-method-createSorterComparing\" rel=\"JW.AbstractCollection-method-createSorterComparing\" class=\"docClass\">JW.AbstractCollection.createSorterComparing</a>.\nМетод сам определит, какая реализация конвертера лучше подойдет (простая или observable).</p>\n\n<p>Массив можно передать в качестве конфигурационной опции:</p>\n\n<pre><code>var array = new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>();\nvar sorter = collection.<a href=\"#!/api/JW.AbstractCollection-method-createSorterComparing\" rel=\"JW.AbstractCollection-method-createSorterComparing\" class=\"docClass\">createSorterComparing</a>({\n    <a href=\"#!/api/JW.AbstractCollection.SorterComparing-cfg-target\" rel=\"JW.AbstractCollection.SorterComparing-cfg-target\" class=\"docClass\">target</a>: array,\n    <a href=\"#!/api/JW.AbstractCollection.SorterComparing-cfg-compare\" rel=\"JW.AbstractCollection.SorterComparing-cfg-compare\" class=\"docClass\">compare</a>: function(x, y) {\n        return <a href=\"#!/api/JW-static-method-cmp\" rel=\"JW-static-method-cmp\" class=\"docClass\">JW.cmp</a>(x.title, y.title, true) || <a href=\"#!/api/JW-static-method-cmp\" rel=\"JW-static-method-cmp\" class=\"docClass\">JW.cmp</a>(x.id, y.id);\n    },\n    <a href=\"#!/api/JW.AbstractCollection.SorterComparing-cfg-scope\" rel=\"JW.AbstractCollection.SorterComparing-cfg-scope\" class=\"docClass\">scope</a>: this\n});\n</code></pre>\n\n<p>В простых случаях, вы можете использовать упрощенный метод <a href=\"#!/api/JW.AbstractCollection-method-S-S-toSortedComparing\" rel=\"JW.AbstractCollection-method-S-S-toSortedComparing\" class=\"docClass\">JW.AbstractCollection.$$toSortedComparing</a>. Он сразу возвращает целевой словарь:</p>\n\n<pre><code>var source = new <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>([\n    {title: \"apple\", id: 3},\n    {title: \"Carrot\", id: 1},\n    {title: \"Apple\", id: 2}\n]);\n\n// Сортируем по заголовку без учета регистра, а потом по id\nvar target = source.<a href=\"#!/api/JW.AbstractCollection-method-S-S-toSortedComparing\" rel=\"JW.AbstractCollection-method-S-S-toSortedComparing\" class=\"docClass\">$$toSortedComparing</a>(function(x, y) {\n    return <a href=\"#!/api/JW-static-method-cmp\" rel=\"JW-static-method-cmp\" class=\"docClass\">JW.cmp</a>(x.title, y.title, true) || <a href=\"#!/api/JW-static-method-cmp\" rel=\"JW-static-method-cmp\" class=\"docClass\">JW.cmp</a>(x.id, y.id);\n});\n\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(0).id === 2); // Apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(1).id === 3); // apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(2).id === 1); // Carrot\n\n// Целевой массив автоматически синхронизируется с исходной наблюдаемой коллекцией\nsource.add({title: \"Banana\", id: 4});\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(0).id === 2); // Apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(1).id === 3); // apple\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(2).id === 4); // Banana\nassert(target.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(3).id === 1); // Carrot\n\ntarget.<a href=\"#!/api/JW.AbstractArray-method-destroy\" rel=\"JW.AbstractArray-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>Правила работы конвертера:</p>\n\n<ul>\n<li>Целевой массив находится в поле <a href=\"#!/api/JW.AbstractCollection.SorterComparing-property-target\" rel=\"JW.AbstractCollection.SorterComparing-property-target\" class=\"docClass\">target</a>.</li>\n<li>При конструировании конвертера все элементы исходной коллекции сразу добавляются в <a href=\"#!/api/JW.AbstractCollection.SorterComparing-property-target\" rel=\"JW.AbstractCollection.SorterComparing-property-target\" class=\"docClass\">target</a>.</li>\n<li>При уничтожении конвертера все элементы исходной коллекции удаляются из <a href=\"#!/api/JW.AbstractCollection.SorterComparing-property-target\" rel=\"JW.AbstractCollection.SorterComparing-property-target\" class=\"docClass\">target</a>.</li>\n<li>Массив можно передать в качестве конфигурационной опции <a href=\"#!/api/JW.AbstractCollection.SorterComparing-cfg-target\" rel=\"JW.AbstractCollection.SorterComparing-cfg-target\" class=\"docClass\">target</a>.\nВ этом случае, вся забота о его уничтожении ложится на вас.</li>\n<li>Если <a href=\"#!/api/JW.AbstractCollection.SorterComparing-cfg-target\" rel=\"JW.AbstractCollection.SorterComparing-cfg-target\" class=\"docClass\">target</a> не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую\nреализацию <a href=\"#!/api/JW.AbstractCollection.SorterComparing-property-target\" rel=\"JW.AbstractCollection.SorterComparing-property-target\" class=\"docClass\">target</a> (простая или observable). В этом\nслучае, <a href=\"#!/api/JW.AbstractCollection.SorterComparing-property-target\" rel=\"JW.AbstractCollection.SorterComparing-property-target\" class=\"docClass\">target</a> будет уничтожен автоматически при уничтожении конвертера.</li>\n<li>Можно конвертировать несколько коллекций в один и тот же массив, если все элементы различны.</li>\n</ul>\n\n","title":"JW.AbstractCollection.SorterComparing"});