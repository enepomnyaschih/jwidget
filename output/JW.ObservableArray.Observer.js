Ext.data.JsonP.JW_ObservableArray_Observer({"tagname":"class","name":"JW.ObservableArray.Observer","autodetected":{},"files":[{"filename":"observer.js","href":"observer5.html#JW-ObservableArray-Observer"}],"extends":"JW.AbstractArray.Observer","members":[{"name":"addItem","tagname":"cfg","owner":"JW.AbstractCollection.Observer","id":"cfg-addItem","meta":{}},{"name":"change","tagname":"cfg","owner":"JW.AbstractCollection.Observer","id":"cfg-change","meta":{}},{"name":"clearItems","tagname":"cfg","owner":"JW.AbstractCollection.Observer","id":"cfg-clearItems","meta":{}},{"name":"removeItem","tagname":"cfg","owner":"JW.AbstractCollection.Observer","id":"cfg-removeItem","meta":{}},{"name":"scope","tagname":"cfg","owner":"JW.AbstractCollection.Observer","id":"cfg-scope","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractArray.Observer","id":"property-source","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.ObservableArray.Observer","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.ObservableArray.Observer","short_doc":"&lt;T&gt; extends JW.AbstractArray.Observer&lt;T&gt;\n\nНаблюдатель оповещающего массива. ...","component":false,"superclasses":["JW.Class","JW.AbstractCollection.Observer","JW.AbstractArray.Observer"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><a href='#!/api/JW.AbstractCollection.Observer' rel='JW.AbstractCollection.Observer' class='docClass'>JW.AbstractCollection.Observer</a><div class='subclass '><a href='#!/api/JW.AbstractArray.Observer' rel='JW.AbstractArray.Observer' class='docClass'>JW.AbstractArray.Observer</a><div class='subclass '><strong>JW.ObservableArray.Observer</strong></div></div></div></div><h4>Files</h4><div class='dependency'><a href='source/observer5.html#JW-ObservableArray-Observer' target='_blank'>observer.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt; extends <a href=\"#!/api/JW.AbstractArray.Observer\" rel=\"JW.AbstractArray.Observer\" class=\"docClass\">JW.AbstractArray.Observer</a>&lt;T&gt;</code></p>\n\n<p>Наблюдатель оповещающего массива. Подробнее читайте <a href=\"#!/api/JW.AbstractCollection.Observer\" rel=\"JW.AbstractCollection.Observer\" class=\"docClass\">JW.AbstractCollection.Observer</a>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-addItem' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Observer' rel='JW.AbstractCollection.Observer' class='defined-in docClass'>JW.AbstractCollection.Observer</a><br/><a href='source/observer2.html#JW-AbstractCollection-Observer-cfg-addItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Observer-cfg-addItem' class='name expandable'>addItem</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>addItem(item: T): void</code></p>\n\n<p>Элемент добавлен в коллекцию.</p>\n</div><div class='long'><p><code>addItem(item: T): void</code></p>\n\n<p>Элемент добавлен в коллекцию.</p>\n</div></div></div><div id='cfg-change' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Observer' rel='JW.AbstractCollection.Observer' class='defined-in docClass'>JW.AbstractCollection.Observer</a><br/><a href='source/observer2.html#JW-AbstractCollection-Observer-cfg-change' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Observer-cfg-change' class='name expandable'>change</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>change(): void</code></p>\n\n<p>Коллекция произвольно изменилась.</p>\n</div><div class='long'><p><code>change(): void</code></p>\n\n<p>Коллекция произвольно изменилась.</p>\n</div></div></div><div id='cfg-clearItems' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Observer' rel='JW.AbstractCollection.Observer' class='defined-in docClass'>JW.AbstractCollection.Observer</a><br/><a href='source/observer2.html#JW-AbstractCollection-Observer-cfg-clearItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Observer-cfg-clearItems' class='name expandable'>clearItems</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>clearItems(items: Array&lt;T&gt;): void\n\nКоллекция очищена. ...</div><div class='long'><p><code>clearItems(items: Array&lt;T&gt;): void</code></p>\n\n<p>Коллекция очищена. По умолчанию, вызывает removeItem для всех элементов коллекции.</p>\n</div></div></div><div id='cfg-removeItem' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Observer' rel='JW.AbstractCollection.Observer' class='defined-in docClass'>JW.AbstractCollection.Observer</a><br/><a href='source/observer2.html#JW-AbstractCollection-Observer-cfg-removeItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Observer-cfg-removeItem' class='name expandable'>removeItem</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>removeItem(item: T): void</code></p>\n\n<p>Элемент удален из коллекции.</p>\n</div><div class='long'><p><code>removeItem(item: T): void</code></p>\n\n<p>Элемент удален из коллекции.</p>\n</div></div></div><div id='cfg-scope' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Observer' rel='JW.AbstractCollection.Observer' class='defined-in docClass'>JW.AbstractCollection.Observer</a><br/><a href='source/observer2.html#JW-AbstractCollection-Observer-cfg-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Observer-cfg-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Контекст вызова addItem, removeItem, clearItems, change.</p>\n</div><div class='long'><p>Контекст вызова addItem, removeItem, clearItems, change.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Автоинкрементный уникальный идентификатор объекта. Каждый экземпляр <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> получает такой идентификатор.\nИспользуется в множестве <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> в качестве ключа словаря для быстрого поиска.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Конструктор как класс. ...</div><div class='long'><p>Конструктор как класс. Если в вашем распоряжении есть некоторый объект, то вы с легкостью можете узнать его класс\nвоспользовавшись полем <a href=\"#!/api/JW.Class-property-constructor\" rel=\"JW.Class-property-constructor\" class=\"docClass\">constructor</a>.</p>\n</div></div></div><div id='property-source' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractArray.Observer' rel='JW.AbstractArray.Observer' class='defined-in docClass'>JW.AbstractArray.Observer</a><br/><a href='source/observer.html#JW-AbstractArray-Observer-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Observer-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Исходная коллекция.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Исходная коллекция.</p>\n<p>Overrides: <a href=\"#!/api/JW.AbstractCollection.Observer-property-source\" rel=\"JW.AbstractCollection.Observer-property-source\" class=\"docClass\">JW.AbstractCollection.Observer.source</a></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.ObservableArray.Observer'>JW.ObservableArray.Observer</span><br/><a href='source/observer5.html#JW-ObservableArray-Observer-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.ObservableArray.Observer-method-constructor' class='name expandable'>JW.ObservableArray.Observer</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.ObservableArray.Observer\" rel=\"JW.ObservableArray.Observer\" class=\"docClass\">JW.ObservableArray.Observer</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Конструирует синхронизатор. ...</div><div class='long'><p>Конструирует синхронизатор. Предпочтительнее использовать метод <a href=\"#!/api/JW.AbstractCollection-method-createObserver\" rel=\"JW.AbstractCollection-method-createObserver\" class=\"docClass\">JW.AbstractCollection.createObserver</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Исходная коллекция.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Конфигурация (см. Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.ObservableArray.Observer\" rel=\"JW.ObservableArray.Observer\" class=\"docClass\">JW.ObservableArray.Observer</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/JW.AbstractArray.Observer-method-constructor\" rel=\"JW.AbstractArray.Observer-method-constructor\" class=\"docClass\">JW.AbstractArray.Observer.constructor</a></p></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Этот метод доступен только внутри методов класса, переданных в функцию JW.extend при создании данного класса. ...</div><div class='long'><p>Этот метод доступен только внутри методов класса, переданных в функцию <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> при создании данного класса. Метод\n<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> - это простой способ вызова того же метода базового класса:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return this._super(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Эквивалентный вариант:</p>\n\n<pre><code>...\n// Метод класса\nmyMethod: function(a, b, c) {\n    return MyClass.superclass.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Деструктор класса. ...</div><div class='long'><p>Деструктор класса. Сюда рекомендуется помещать всю логику уничтожения экземпляра класса. Этот метод нужно явно\nвызывать снаружи, поскольку JavaScript не поддерживает автоматические деструкторы классов. Этот метод можно\nперегружать, не забывая вызывать деструктор базового класса:</p>\n\n<pre><code>destroy: function() {\n    // Освобождаем ресурсы\n    ...\n    // Вызываем деструктор базового класса\n    this._super();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});