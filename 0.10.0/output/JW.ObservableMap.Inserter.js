Ext.data.JsonP.JW_ObservableMap_Inserter({"tagname":"class","name":"JW.ObservableMap.Inserter","autodetected":{},"files":[{"filename":"inserter.js","href":"inserter4.html#JW-ObservableMap-Inserter"}],"extends":"JW.AbstractMap.Inserter","members":[{"name":"addItem","tagname":"cfg","owner":"JW.AbstractMap.Inserter","id":"cfg-addItem","meta":{}},{"name":"clearItems","tagname":"cfg","owner":"JW.AbstractMap.Inserter","id":"cfg-clearItems","meta":{}},{"name":"removeItem","tagname":"cfg","owner":"JW.AbstractMap.Inserter","id":"cfg-removeItem","meta":{}},{"name":"scope","tagname":"cfg","owner":"JW.AbstractMap.Inserter","id":"cfg-scope","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractMap.Inserter","id":"property-source","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.ObservableMap.Inserter","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.ObservableMap.Inserter","component":false,"superclasses":["JW.Class","JW.AbstractMap.Inserter"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><a href='#!/api/JW.AbstractMap.Inserter' rel='JW.AbstractMap.Inserter' class='docClass'>JW.AbstractMap.Inserter</a><div class='subclass '><strong>JW.ObservableMap.Inserter</strong></div></div></div><h4>Files</h4><div class='dependency'><a href='source/inserter4.html#JW-ObservableMap-Inserter' target='_blank'>inserter.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt; extends <a href=\"#!/api/JW.AbstractMap.Inserter\" rel=\"JW.AbstractMap.Inserter\" class=\"docClass\">JW.AbstractMap.Inserter</a>&lt;T&gt;</code></p>\n\n<p>See <a href=\"#!/api/JW.AbstractMap.Inserter\" rel=\"JW.AbstractMap.Inserter\" class=\"docClass\">JW.AbstractMap.Inserter</a> for details.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-addItem' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractMap.Inserter' rel='JW.AbstractMap.Inserter' class='defined-in docClass'>JW.AbstractMap.Inserter</a><br/><a href='source/inserter2.html#JW-AbstractMap-Inserter-cfg-addItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractMap.Inserter-cfg-addItem' class='name expandable'>addItem</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>addItem(item: T, key: string): void</code></p>\n\n<p>Item is added to map with specific key.</p>\n</div><div class='long'><p><code>addItem(item: T, key: string): void</code></p>\n\n<p>Item is added to map with specific key.</p>\n</div></div></div><div id='cfg-clearItems' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractMap.Inserter' rel='JW.AbstractMap.Inserter' class='defined-in docClass'>JW.AbstractMap.Inserter</a><br/><a href='source/inserter2.html#JW-AbstractMap-Inserter-cfg-clearItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractMap.Inserter-cfg-clearItems' class='name expandable'>clearItems</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>clearItems(items: Object): void\n\nMap is cleared. ...</div><div class='long'><p><code>clearItems(items: Object): void</code></p>\n\n<p>Map is cleared. By default, calls <a href=\"#!/api/JW.AbstractMap.Inserter-cfg-removeItem\" rel=\"JW.AbstractMap.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a> for all map items.</p>\n</div></div></div><div id='cfg-removeItem' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractMap.Inserter' rel='JW.AbstractMap.Inserter' class='defined-in docClass'>JW.AbstractMap.Inserter</a><br/><a href='source/inserter2.html#JW-AbstractMap-Inserter-cfg-removeItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractMap.Inserter-cfg-removeItem' class='name expandable'>removeItem</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>removeItem(item: T, key: string): void</code></p>\n\n<p>Item is removed from map with specific key.</p>\n</div><div class='long'><p><code>removeItem(item: T, key: string): void</code></p>\n\n<p>Item is removed from map with specific key.</p>\n</div></div></div><div id='cfg-scope' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractMap.Inserter' rel='JW.AbstractMap.Inserter' class='defined-in docClass'>JW.AbstractMap.Inserter</a><br/><a href='source/inserter2.html#JW-AbstractMap-Inserter-cfg-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractMap.Inserter-cfg-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p><a href=\"#!/api/JW.AbstractMap.Inserter-cfg-addItem\" rel=\"JW.AbstractMap.Inserter-cfg-addItem\" class=\"docClass\">addItem</a>, <a href=\"#!/api/JW.AbstractMap.Inserter-cfg-removeItem\" rel=\"JW.AbstractMap.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a>, <a href=\"#!/api/JW.AbstractMap.Inserter-cfg-clearItems\" rel=\"JW.AbstractMap.Inserter-cfg-clearItems\" class=\"docClass\">clearItems</a> call scope.</p>\n</div><div class='long'><p><a href=\"#!/api/JW.AbstractMap.Inserter-cfg-addItem\" rel=\"JW.AbstractMap.Inserter-cfg-addItem\" class=\"docClass\">addItem</a>, <a href=\"#!/api/JW.AbstractMap.Inserter-cfg-removeItem\" rel=\"JW.AbstractMap.Inserter-cfg-removeItem\" class=\"docClass\">removeItem</a>, <a href=\"#!/api/JW.AbstractMap.Inserter-cfg-clearItems\" rel=\"JW.AbstractMap.Inserter-cfg-clearItems\" class=\"docClass\">clearItems</a> call scope.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-source' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractMap.Inserter' rel='JW.AbstractMap.Inserter' class='defined-in docClass'>JW.AbstractMap.Inserter</a><br/><a href='source/inserter2.html#JW-AbstractMap-Inserter-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractMap.Inserter-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Source map.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Source map.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.ObservableMap.Inserter'>JW.ObservableMap.Inserter</span><br/><a href='source/inserter4.html#JW-ObservableMap-Inserter-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.ObservableMap.Inserter-method-constructor' class='name expandable'>JW.ObservableMap.Inserter</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.ObservableMap.Inserter\" rel=\"JW.ObservableMap.Inserter\" class=\"docClass\">JW.ObservableMap.Inserter</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates synchronizer. ...</div><div class='long'><p>Creates synchronizer. <a href=\"#!/api/JW.AbstractMap-method-createInserter\" rel=\"JW.AbstractMap-method-createInserter\" class=\"docClass\">JW.AbstractMap.createInserter</a> method is preferrable instead.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.ObservableMap\" rel=\"JW.ObservableMap\" class=\"docClass\">JW.ObservableMap</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Source collection.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration (see Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.ObservableMap.Inserter\" rel=\"JW.ObservableMap.Inserter\" class=\"docClass\">JW.ObservableMap.Inserter</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/JW.AbstractMap.Inserter-method-constructor\" rel=\"JW.AbstractMap.Inserter-method-constructor\" class=\"docClass\">JW.AbstractMap.Inserter.constructor</a></p></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor. ...</div><div class='long'><p>Class destructor. The logic of class instance destruction should be implemented here. You must call this method\nexplicitly from outside, because JavaScript doesn't support automatic class destructor calling. Alternatively\n(and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate objects inside each other. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroy: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});