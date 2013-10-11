Ext.data.JsonP.JW_AbstractArray_Merger({"tagname":"class","name":"JW.AbstractArray.Merger","autodetected":{},"files":[{"filename":"merger.js","href":"merger.html#JW-AbstractArray-Merger"}],"extends":"JW.Class","members":[{"name":"target","tagname":"cfg","owner":"JW.AbstractArray.Merger","id":"cfg-target","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractArray.Merger","id":"property-source","meta":{}},{"name":"target","tagname":"property","owner":"JW.AbstractArray.Merger","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.AbstractArray.Merger","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.AbstractArray.Merger","short_doc":"&lt;T&gt;\n\nОбъединитель массивов. ...","component":false,"superclasses":["JW.Class"],"subclasses":["JW.ObservableArray.Merger"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.AbstractArray.Merger</strong></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.ObservableArray.Merger' rel='JW.ObservableArray.Merger' class='docClass'>JW.ObservableArray.Merger</a></div><h4>Files</h4><div class='dependency'><a href='source/merger.html#JW-AbstractArray-Merger' target='_blank'>merger.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt;</code></p>\n\n<p>Объединитель массивов. Создает массив, содержащий все элементы исходных массивов в том же порядке.</p>\n\n<pre><code>var source = new <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>([\n    new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>([1, 2, 3]),\n    new <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>(),\n    new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>([4])\n]);\nvar merger = source.<a href=\"#!/api/JW.AbstractArray-method-createMerger\" rel=\"JW.AbstractArray-method-createMerger\" class=\"docClass\">createMerger</a>();\nassert(merger.<a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a>.<a href=\"#!/api/JW.AbstractArray-method-equal\" rel=\"JW.AbstractArray-method-equal\" class=\"docClass\">equal</a>([1, 2, 3, 4]));\n\nsource.<a href=\"#!/api/JW.AbstractArray-method-add\" rel=\"JW.AbstractArray-method-add\" class=\"docClass\">add</a>(new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>([5, 6]));\nassert(merger.<a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a>.<a href=\"#!/api/JW.AbstractArray-method-equal\" rel=\"JW.AbstractArray-method-equal\" class=\"docClass\">equal</a>([1, 2, 3, 4, 5, 6]));\n\nsource.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(1).<a href=\"#!/api/JW.AbstractArray-method-addAll\" rel=\"JW.AbstractArray-method-addAll\" class=\"docClass\">addAll</a>([7, 8, 9]);\nassert(merger.<a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a>.<a href=\"#!/api/JW.AbstractArray-method-equal\" rel=\"JW.AbstractArray-method-equal\" class=\"docClass\">equal</a>([1, 2, 3, 7, 8, 9, 4, 5, 6]));\n</code></pre>\n\n<p>Создавайте синхронизатор с помощью метода <a href=\"#!/api/JW.AbstractArray-method-createMerger\" rel=\"JW.AbstractArray-method-createMerger\" class=\"docClass\">JW.AbstractArray.createMerger</a>:</p>\n\n<pre><code>var merger = array.<a href=\"#!/api/JW.AbstractArray-method-createMerger\" rel=\"JW.AbstractArray-method-createMerger\" class=\"docClass\">createMerger</a>();\nvar array = merger.<a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a>;\n</code></pre>\n\n<p>Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).</p>\n\n<p>Целевой массив можно передать в качестве конфигурационной опции:</p>\n\n<pre><code>var source = new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>();\nvar target = new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>();\nvar merger = source.<a href=\"#!/api/JW.AbstractArray-method-createMerger\" rel=\"JW.AbstractArray-method-createMerger\" class=\"docClass\">createMerger</a>({\n    <a href=\"#!/api/JW.AbstractArray.Merger-cfg-target\" rel=\"JW.AbstractArray.Merger-cfg-target\" class=\"docClass\">target</a>: target\n});\n</code></pre>\n\n<p>Правила работы синхронизатора:</p>\n\n<ul>\n<li>Целевой массив находится в поле <a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a>.</li>\n<li>Перед конструированием синхронизатора целевой массив должен быть пуст, в целевой массив нельзя добавлять элементы\nвручную, нельзя создавать другие синхронизаторы с тем же целевым массивом.</li>\n<li>При конструировании синхронизатора все элементы исходных коллекций сразу добавляются в <a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a>.</li>\n<li>При уничтожении синхронизатора все элементы исходных коллекций удаляются из <a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a>.</li>\n<li>Целевой массив можно передать в качестве конфигурационной опции <a href=\"#!/api/JW.AbstractArray.Merger-cfg-target\" rel=\"JW.AbstractArray.Merger-cfg-target\" class=\"docClass\">target</a>.\nВ этом случае, вся забота о его уничтожении ложится на вас.</li>\n<li>Если <a href=\"#!/api/JW.AbstractArray.Merger-cfg-target\" rel=\"JW.AbstractArray.Merger-cfg-target\" class=\"docClass\">target</a> не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую\nреализацию <a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a> (простая или observable). В этом\nслучае, <a href=\"#!/api/JW.AbstractArray.Merger-property-target\" rel=\"JW.AbstractArray.Merger-property-target\" class=\"docClass\">target</a> будет уничтожен автоматически при уничтожении синхронизатора.</li>\n</ul>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-target' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Merger'>JW.AbstractArray.Merger</span><br/><a href='source/merger.html#JW-AbstractArray-Merger-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Merger-cfg-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Целевая коллекция.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Целевая коллекция.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Автоинкрементный уникальный идентификатор объекта. Каждый экземпляр <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> получает такой идентификатор.\nИспользуется в множестве <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> в качестве ключа словаря для быстрого поиска.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Конструктор как класс. ...</div><div class='long'><p>Конструктор как класс. Если в вашем распоряжении есть некоторый объект, то вы с легкостью можете узнать его класс\nвоспользовавшись полем <a href=\"#!/api/JW.Class-property-constructor\" rel=\"JW.Class-property-constructor\" class=\"docClass\">constructor</a>.</p>\n</div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Merger'>JW.AbstractArray.Merger</span><br/><a href='source/merger.html#JW-AbstractArray-Merger-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Merger-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;? extends <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>&lt;T&gt;&gt;</code> Исходная коллекция.</p>\n</div><div class='long'><p><code>&lt;? extends <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>&lt;T&gt;&gt;</code> Исходная коллекция.</p>\n</div></div></div><div id='property-target' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Merger'>JW.AbstractArray.Merger</span><br/><a href='source/merger.html#JW-AbstractArray-Merger-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Merger-property-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Целевая коллекция.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Целевая коллекция.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Merger'>JW.AbstractArray.Merger</span><br/><a href='source/merger.html#JW-AbstractArray-Merger-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.AbstractArray.Merger-method-constructor' class='name expandable'>JW.AbstractArray.Merger</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.AbstractArray.Merger\" rel=\"JW.AbstractArray.Merger\" class=\"docClass\">JW.AbstractArray.Merger</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Конструирует синхронизатор. ...</div><div class='long'><p>Конструирует синхронизатор. Предпочтительнее использовать метод <a href=\"#!/api/JW.AbstractArray-method-createMerger\" rel=\"JW.AbstractArray-method-createMerger\" class=\"docClass\">JW.AbstractArray.createMerger</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Исходная коллекция.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Конфигурация (см. Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.AbstractArray.Merger\" rel=\"JW.AbstractArray.Merger\" class=\"docClass\">JW.AbstractArray.Merger</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Этот метод доступен только внутри методов класса, переданных в функцию JW.extend при создании данного класса. ...</div><div class='long'><p>Этот метод доступен только внутри методов класса, переданных в функцию <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> при создании данного класса. Метод\n<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> - это простой способ вызова того же метода базового класса:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return this._super(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Эквивалентный вариант:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return MyClass.superclass.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Деструктор класса. ...</div><div class='long'><p>Деструктор класса. Сюда рекомендуется помещать всю логику уничтожения экземпляра класса. Этот метод нужно явно\nвызывать снаружи, поскольку JavaScript не поддерживает автоматические деструкторы классов. Этот метод можно\nперегружать, не забывая вызывать деструктор базового класса:</p>\n\n<pre><code>destroy: function() {\n    // Освобождаем ресурсы\n    ...\n    // Вызываем деструктор базового класса\n    this._super();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});