Ext.data.JsonP.rujwabstractarrayinserter({"guide":"<h1 id='rujwabstractarrayinserter-section-jw.abstractarray.inserter'>JW.AbstractArray.Inserter</h1>\n\n<p>Это краткое описание класса на русском языке.</p>\n\n<p>Полная документация на английском: <a href=\"#!/api/JW.AbstractArray.Inserter\" rel=\"JW.AbstractArray.Inserter\" class=\"docClass\">JW.AbstractArray.Inserter</a></p>\n\n<p><code>&lt;T&gt;</code></p>\n\n<p>Синхронизатор представления массива. Прослушивает все события массива и сводит их к 2 элементарным функциям:\nэлемент добавлен в указанное место и элемент удален из указанного места. В целях оптимизации, можно определить\nтретью функцию: коллекция очищена (в случае, если есть более эффективный алгоритм очистки, чем удаление всех\nэлементов простым перебором). В отличие от <a href=\"#!/api/JW.AbstractCollection.Observer\" rel=\"JW.AbstractCollection.Observer\" class=\"docClass\">JW.AbstractCollection.Observer</a>, следит за порядком элементов.\nСинхронизатор используется, прежде всего, для синхронизации DOM-элемента с массивом дочерних элементов.</p>\n\n<p>Создавайте синхронизатор с помощью метода <a href=\"#!/api/JW.AbstractArray-method-createInserter\" rel=\"JW.AbstractArray-method-createInserter\" class=\"docClass\">JW.AbstractArray.createInserter</a>:</p>\n\n<pre><code>var inserter = array.<a href=\"#!/api/JW.AbstractArray-method-createInserter\" rel=\"JW.AbstractArray-method-createInserter\" class=\"docClass\">createInserter</a>({\n    <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-addItem\" rel=\"JW.AbstractArray.Inserter-cfg-addItem\" class=\"docClass\">addItem</a>: function(el, index) { this.el.<a href=\"#!/api/jQuery-method-insert\" rel=\"jQuery-method-insert\" class=\"docClass\">insert</a>(el, index); },\n    <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-removeItem\" rel=\"JW.AbstractArray.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a>: function(el, index) { el.detach(); },\n    <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-scope\" rel=\"JW.AbstractArray.Inserter-cfg-scope\" class=\"docClass\">scope</a>: this\n});\n</code></pre>\n\n<p>Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).</p>\n\n<p>Правила работы синхронизатора:</p>\n\n<ul>\n<li>При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция\n<a href=\"#!/api/JW.AbstractArray.Inserter-cfg-addItem\" rel=\"JW.AbstractArray.Inserter-cfg-addItem\" class=\"docClass\">addItem</a>.</li>\n<li>При уничтожении синхронизатора вызывается функция <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-clearItems\" rel=\"JW.AbstractArray.Inserter-cfg-clearItems\" class=\"docClass\">clearItems</a>, либо для всех элементов\nвызывается функция <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-removeItem\" rel=\"JW.AbstractArray.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a>.</li>\n<li>При перемещении/переупорядочении элементов вызовами функций синхронизируется порядок элементов.</li>\n</ul>\n\n","title":"JW.AbstractArray.Inserter"});