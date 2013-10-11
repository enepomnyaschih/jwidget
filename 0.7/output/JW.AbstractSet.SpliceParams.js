Ext.data.JsonP.JW_AbstractSet_SpliceParams({"tagname":"class","name":"JW.AbstractSet.SpliceParams","autodetected":{},"files":[{"filename":"abstractSet.js","href":"abstractSet.html#JW-AbstractSet-SpliceParams"}],"extends":"JW.Class","members":[{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"addedItems","tagname":"property","owner":"JW.AbstractSet.SpliceParams","id":"property-addedItems","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"removedItems","tagname":"property","owner":"JW.AbstractSet.SpliceParams","id":"property-removedItems","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.AbstractSet.SpliceParams","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.AbstractSet.SpliceParams","component":false,"superclasses":["JW.Class"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.AbstractSet.SpliceParams</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/abstractSet.html#JW-AbstractSet-SpliceParams' target='_blank'>abstractSet.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt;</code> Параметры метода <a href=\"#!/api/JW.AbstractSet-method-splice\" rel=\"JW.AbstractSet-method-splice\" class=\"docClass\">JW.AbstractSet.splice</a>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Автоинкрементный уникальный идентификатор объекта. Каждый экземпляр <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> получает такой идентификатор.\nИспользуется в множестве <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> в качестве ключа словаря для быстрого поиска.</p>\n</div></div></div><div id='property-addedItems' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractSet.SpliceParams'>JW.AbstractSet.SpliceParams</span><br/><a href='source/abstractSet.html#JW-AbstractSet-SpliceParams-property-addedItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractSet.SpliceParams-property-addedItems' class='name expandable'>addedItems</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Элементы для добавления.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Элементы для добавления.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Конструктор как класс. ...</div><div class='long'><p>Конструктор как класс. Если в вашем распоряжении есть некоторый объект, то вы с легкостью можете узнать его класс\nвоспользовавшись полем <a href=\"#!/api/JW.Class-property-constructor\" rel=\"JW.Class-property-constructor\" class=\"docClass\">constructor</a>.</p>\n</div></div></div><div id='property-removedItems' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractSet.SpliceParams'>JW.AbstractSet.SpliceParams</span><br/><a href='source/abstractSet.html#JW-AbstractSet-SpliceParams-property-removedItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractSet.SpliceParams-property-removedItems' class='name expandable'>removedItems</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Элементы для удаления.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Элементы для удаления.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractSet.SpliceParams'>JW.AbstractSet.SpliceParams</span><br/><a href='source/abstractSet.html#JW-AbstractSet-SpliceParams-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.AbstractSet.SpliceParams-method-constructor' class='name expandable'>JW.AbstractSet.SpliceParams</a>( <span class='pre'>removedItems, addedItems</span> ) : <a href=\"#!/api/JW.AbstractSet.SpliceParams\" rel=\"JW.AbstractSet.SpliceParams\" class=\"docClass\">JW.AbstractSet.SpliceParams</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>removedItems</span> : Array<div class='sub-desc'><p><code>&lt;T&gt;</code> Элементы для удаления.</p>\n</div></li><li><span class='pre'>addedItems</span> : Array<div class='sub-desc'><p><code>&lt;T&gt;</code> Элементы для добавления.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.AbstractSet.SpliceParams\" rel=\"JW.AbstractSet.SpliceParams\" class=\"docClass\">JW.AbstractSet.SpliceParams</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Этот метод доступен только внутри методов класса, переданных в функцию JW.extend при создании данного класса. ...</div><div class='long'><p>Этот метод доступен только внутри методов класса, переданных в функцию <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> при создании данного класса. Метод\n<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> - это простой способ вызова того же метода базового класса:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return this._super(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Эквивалентный вариант:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return MyClass.superclass.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Деструктор класса. ...</div><div class='long'><p>Деструктор класса. Сюда рекомендуется помещать всю логику уничтожения экземпляра класса. Этот метод нужно явно\nвызывать снаружи, поскольку JavaScript не поддерживает автоматические деструкторы классов. Этот метод можно\nперегружать, не забывая вызывать деструктор базового класса:</p>\n\n<pre><code>destroy: function() {\n    // Освобождаем ресурсы\n    ...\n    // Вызываем деструктор базового класса\n    this._super();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});