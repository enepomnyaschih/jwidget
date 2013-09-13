Ext.data.JsonP.JW_AbstractMap_Indexer({"tagname":"class","name":"JW.AbstractMap.Indexer","autodetected":{},"files":[{"filename":"indexer.js","href":"indexer3.html#JW-AbstractMap-Indexer"}],"extends":"JW.AbstractCollection.Indexer","members":[{"name":"getKey","tagname":"cfg","owner":"JW.AbstractCollection.Indexer","id":"cfg-getKey","meta":{"required":true}},{"name":"scope","tagname":"cfg","owner":"JW.AbstractCollection.Indexer","id":"cfg-scope","meta":{}},{"name":"target","tagname":"cfg","owner":"JW.AbstractCollection.Indexer","id":"cfg-target","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractMap.Indexer","id":"property-source","meta":{}},{"name":"target","tagname":"property","owner":"JW.AbstractCollection.Indexer","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.AbstractMap.Indexer","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.AbstractMap.Indexer","short_doc":"&lt;T&gt; extends JW.AbstractCollection.Indexer&lt;T, JW.AbstractMap&lt;T&gt;&gt;\n\nИндексатор словаря. ...","component":false,"superclasses":["JW.Class","JW.AbstractCollection.Indexer"],"subclasses":["JW.ObservableMap.Indexer"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='docClass'>JW.AbstractCollection.Indexer</a><div class='subclass '><strong>JW.AbstractMap.Indexer</strong></div></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.ObservableMap.Indexer' rel='JW.ObservableMap.Indexer' class='docClass'>JW.ObservableMap.Indexer</a></div><h4>Files</h4><div class='dependency'><a href='source/indexer3.html#JW-AbstractMap-Indexer' target='_blank'>indexer.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt; extends <a href=\"#!/api/JW.AbstractCollection.Indexer\" rel=\"JW.AbstractCollection.Indexer\" class=\"docClass\">JW.AbstractCollection.Indexer</a>&lt;T, <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a>&lt;T&gt;&gt;</code></p>\n\n<p>Индексатор словаря. Подробнее читайте <a href=\"#!/api/JW.AbstractCollection.Indexer\" rel=\"JW.AbstractCollection.Indexer\" class=\"docClass\">JW.AbstractCollection.Indexer</a>.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Required config options</h3><div id='cfg-getKey' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-cfg-getKey' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-cfg-getKey' class='name expandable'>getKey</a> : Function<span class=\"signature\"><span class='required' >required</span></span></div><div class='description'><div class='short'>getKey(item: T): string\n\nИндексирующая функция. ...</div><div class='long'><p><code>getKey(item: T): string</code></p>\n\n<p>Индексирующая функция. Определяет ключ элемента в целевом словаре.</p>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Optional config options</h3><div id='cfg-scope' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-cfg-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-cfg-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Контекст вызова getKey.</p>\n</div><div class='long'><p>Контекст вызова getKey.</p>\n</div></div></div><div id='cfg-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-cfg-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Целевой словарь.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Целевой словарь.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Автоинкрементный уникальный идентификатор объекта. Каждый экземпляр <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> получает такой идентификатор.\nИспользуется в множестве <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> в качестве ключа словаря для быстрого поиска.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Конструктор как класс. ...</div><div class='long'><p>Конструктор как класс. Если в вашем распоряжении есть некоторый объект, то вы с легкостью можете узнать его класс\nвоспользовавшись полем <a href=\"#!/api/JW.Class-property-constructor\" rel=\"JW.Class-property-constructor\" class=\"docClass\">constructor</a>.</p>\n</div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractMap.Indexer'>JW.AbstractMap.Indexer</span><br/><a href='source/indexer3.html#JW-AbstractMap-Indexer-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractMap.Indexer-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Исходная коллекция.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Исходная коллекция.</p>\n<p>Overrides: <a href=\"#!/api/JW.AbstractCollection.Indexer-property-source\" rel=\"JW.AbstractCollection.Indexer-property-source\" class=\"docClass\">JW.AbstractCollection.Indexer.source</a></p></div></div></div><div id='property-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-property-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Целевой словарь.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Целевой словарь.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractMap.Indexer'>JW.AbstractMap.Indexer</span><br/><a href='source/indexer3.html#JW-AbstractMap-Indexer-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.AbstractMap.Indexer-method-constructor' class='name expandable'>JW.AbstractMap.Indexer</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.AbstractMap.Indexer\" rel=\"JW.AbstractMap.Indexer\" class=\"docClass\">JW.AbstractMap.Indexer</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Конструирует синхронизатор. ...</div><div class='long'><p>Конструирует синхронизатор. Предпочтительнее использовать метод <a href=\"#!/api/JW.AbstractCollection-method-createIndexer\" rel=\"JW.AbstractCollection-method-createIndexer\" class=\"docClass\">JW.AbstractCollection.createIndexer</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Исходная коллекция.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Конфигурация (см. Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.AbstractMap.Indexer\" rel=\"JW.AbstractMap.Indexer\" class=\"docClass\">JW.AbstractMap.Indexer</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/JW.AbstractCollection.Indexer-method-constructor\" rel=\"JW.AbstractCollection.Indexer-method-constructor\" class=\"docClass\">JW.AbstractCollection.Indexer.constructor</a></p></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Этот метод доступен только внутри методов класса, переданных в функцию JW.extend при создании данного класса. ...</div><div class='long'><p>Этот метод доступен только внутри методов класса, переданных в функцию <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> при создании данного класса. Метод\n<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> - это простой способ вызова того же метода базового класса:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return this._super(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Эквивалентный вариант:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return MyClass.superclass.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Деструктор класса. ...</div><div class='long'><p>Деструктор класса. Сюда рекомендуется помещать всю логику уничтожения экземпляра класса. Этот метод нужно явно\nвызывать снаружи, поскольку JavaScript не поддерживает автоматические деструкторы классов. Этот метод можно\nперегружать, не забывая вызывать деструктор базового класса:</p>\n\n<pre><code>destroy: function() {\n    // Освобождаем ресурсы\n    ...\n    // Вызываем деструктор базового класса\n    this._super();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});