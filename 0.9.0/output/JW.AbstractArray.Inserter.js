Ext.data.JsonP.JW_AbstractArray_Inserter({"tagname":"class","name":"JW.AbstractArray.Inserter","autodetected":{},"files":[{"filename":"inserter.js","href":"inserter.html#JW-AbstractArray-Inserter"}],"extends":"JW.Class","members":[{"name":"addItem","tagname":"cfg","owner":"JW.AbstractArray.Inserter","id":"cfg-addItem","meta":{}},{"name":"clearItems","tagname":"cfg","owner":"JW.AbstractArray.Inserter","id":"cfg-clearItems","meta":{}},{"name":"removeItem","tagname":"cfg","owner":"JW.AbstractArray.Inserter","id":"cfg-removeItem","meta":{}},{"name":"scope","tagname":"cfg","owner":"JW.AbstractArray.Inserter","id":"cfg-scope","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractArray.Inserter","id":"property-source","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.AbstractArray.Inserter","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.AbstractArray.Inserter","short_doc":"&lt;T&gt;\n\nView synchronizer with array. ...","component":false,"superclasses":["JW.Class"],"subclasses":["JW.ObservableArray.Inserter"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.AbstractArray.Inserter</strong></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.ObservableArray.Inserter' rel='JW.ObservableArray.Inserter' class='docClass'>JW.ObservableArray.Inserter</a></div><h4>Files</h4><div class='dependency'><a href='source/inserter.html#JW-AbstractArray-Inserter' target='_blank'>inserter.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt;</code></p>\n\n<p>View synchronizer with array. Listens all array events and reduces them to 2 granular functions:\nitem is added into specific position and item is removed from specific position. In optimization purposes,\nyou can define a third function: array is cleared\n(in case if there is more effective clearing algorithm than iterative items deletion).\nUnlike <a href=\"#!/api/JW.AbstractCollection.Observer\" rel=\"JW.AbstractCollection.Observer\" class=\"docClass\">JW.AbstractCollection.Observer</a>, tracks items order.\nCan be used mainly for DOM-element synchronization with array of child elements.</p>\n\n<p>Use <a href=\"#!/api/JW.AbstractArray-method-createInserter\" rel=\"JW.AbstractArray-method-createInserter\" class=\"docClass\">JW.AbstractArray.createInserter</a> method to create the synchronizer.</p>\n\n<pre><code>var inserter = array.<a href=\"#!/api/JW.AbstractArray-method-createInserter\" rel=\"JW.AbstractArray-method-createInserter\" class=\"docClass\">createInserter</a>({\n    <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-addItem\" rel=\"JW.AbstractArray.Inserter-cfg-addItem\" class=\"docClass\">addItem</a>: function(el, index) { this.el.<a href=\"#!/api/jQuery-method-insert\" rel=\"jQuery-method-insert\" class=\"docClass\">insert</a>(el, index); },\n    <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-removeItem\" rel=\"JW.AbstractArray.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a>: function(el, index) { el.detach(); },\n    <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-scope\" rel=\"JW.AbstractArray.Inserter-cfg-scope\" class=\"docClass\">scope</a>: this\n});\n</code></pre>\n\n<p>The method will select which synchronizer implementation fits better (simple or observable).</p>\n\n<p>Synchronizer rules:</p>\n\n<ul>\n<li>Function <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-addItem\" rel=\"JW.AbstractArray.Inserter-cfg-addItem\" class=\"docClass\">addItem</a> is called for all items of source array on synchronizer initialization.</li>\n<li>Function <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-clearItems\" rel=\"JW.AbstractArray.Inserter-cfg-clearItems\" class=\"docClass\">clearItems</a> is called for array, or function <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-removeItem\" rel=\"JW.AbstractArray.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a> is called for\nall items of source array on synchronizer destruction.</li>\n<li>On source array reordering, items order is synchorinized by callback functions calls.</li>\n</ul>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-addItem' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Inserter'>JW.AbstractArray.Inserter</span><br/><a href='source/inserter.html#JW-AbstractArray-Inserter-cfg-addItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Inserter-cfg-addItem' class='name expandable'>addItem</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>addItem(item: T, index: number): void</code></p>\n\n<p>Item is added to specific position in array.</p>\n</div><div class='long'><p><code>addItem(item: T, index: number): void</code></p>\n\n<p>Item is added to specific position in array.</p>\n</div></div></div><div id='cfg-clearItems' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Inserter'>JW.AbstractArray.Inserter</span><br/><a href='source/inserter.html#JW-AbstractArray-Inserter-cfg-clearItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Inserter-cfg-clearItems' class='name expandable'>clearItems</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>clearItems(items: Array&lt;T&gt;): void\n\nArray is cleared. ...</div><div class='long'><p><code>clearItems(items: Array&lt;T&gt;): void</code></p>\n\n<p>Array is cleared. By default, calls <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-removeItem\" rel=\"JW.AbstractArray.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a> for all array items.</p>\n</div></div></div><div id='cfg-removeItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Inserter'>JW.AbstractArray.Inserter</span><br/><a href='source/inserter.html#JW-AbstractArray-Inserter-cfg-removeItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Inserter-cfg-removeItem' class='name expandable'>removeItem</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>removeItem(item: T, index: number): void</code></p>\n\n<p>Item is removed from specific position in array.</p>\n</div><div class='long'><p><code>removeItem(item: T, index: number): void</code></p>\n\n<p>Item is removed from specific position in array.</p>\n</div></div></div><div id='cfg-scope' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Inserter'>JW.AbstractArray.Inserter</span><br/><a href='source/inserter.html#JW-AbstractArray-Inserter-cfg-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Inserter-cfg-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p><a href=\"#!/api/JW.AbstractArray.Inserter-cfg-addItem\" rel=\"JW.AbstractArray.Inserter-cfg-addItem\" class=\"docClass\">addItem</a>, <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-removeItem\" rel=\"JW.AbstractArray.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a>, <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-clearItems\" rel=\"JW.AbstractArray.Inserter-cfg-clearItems\" class=\"docClass\">clearItems</a> call scope.</p>\n</div><div class='long'><p><a href=\"#!/api/JW.AbstractArray.Inserter-cfg-addItem\" rel=\"JW.AbstractArray.Inserter-cfg-addItem\" class=\"docClass\">addItem</a>, <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-removeItem\" rel=\"JW.AbstractArray.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a>, <a href=\"#!/api/JW.AbstractArray.Inserter-cfg-clearItems\" rel=\"JW.AbstractArray.Inserter-cfg-clearItems\" class=\"docClass\">clearItems</a> call scope.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Inserter'>JW.AbstractArray.Inserter</span><br/><a href='source/inserter.html#JW-AbstractArray-Inserter-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Inserter-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Source array.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Source array.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Inserter'>JW.AbstractArray.Inserter</span><br/><a href='source/inserter.html#JW-AbstractArray-Inserter-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.AbstractArray.Inserter-method-constructor' class='name expandable'>JW.AbstractArray.Inserter</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.AbstractArray.Inserter\" rel=\"JW.AbstractArray.Inserter\" class=\"docClass\">JW.AbstractArray.Inserter</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates synchronizer. ...</div><div class='long'><p>Creates synchronizer. <a href=\"#!/api/JW.AbstractArray-method-createInserter\" rel=\"JW.AbstractArray-method-createInserter\" class=\"docClass\">JW.AbstractArray.createInserter</a> method is preferrable instead.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Source array.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration (see Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.AbstractArray.Inserter\" rel=\"JW.AbstractArray.Inserter\" class=\"docClass\">JW.AbstractArray.Inserter</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor. ...</div><div class='long'><p>Class destructor. The logic of class instance destruction should be implemented here. You must call this method\nexplicitly from outside, because JavaScript doesn't support automatic class destructor calling. Alternatively\n(and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate objects inside each other. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroy: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});