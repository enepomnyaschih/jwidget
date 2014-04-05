Ext.data.JsonP.JW_ObservableArray_Indexer({"tagname":"class","name":"JW.ObservableArray.Indexer","autodetected":{},"files":[{"filename":"indexer.js","href":"indexer5.html#JW-ObservableArray-Indexer"}],"extends":"JW.AbstractArray.Indexer","members":[{"name":"getKey","tagname":"cfg","owner":"JW.AbstractCollection.Indexer","id":"cfg-getKey","meta":{"required":true}},{"name":"scope","tagname":"cfg","owner":"JW.AbstractCollection.Indexer","id":"cfg-scope","meta":{}},{"name":"target","tagname":"cfg","owner":"JW.AbstractCollection.Indexer","id":"cfg-target","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractArray.Indexer","id":"property-source","meta":{}},{"name":"target","tagname":"property","owner":"JW.AbstractCollection.Indexer","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.ObservableArray.Indexer","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.ObservableArray.Indexer","component":false,"superclasses":["JW.Class","JW.AbstractCollection.Indexer","JW.AbstractArray.Indexer"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='docClass'>JW.AbstractCollection.Indexer</a><div class='subclass '><a href='#!/api/JW.AbstractArray.Indexer' rel='JW.AbstractArray.Indexer' class='docClass'>JW.AbstractArray.Indexer</a><div class='subclass '><strong>JW.ObservableArray.Indexer</strong></div></div></div></div><h4>Files</h4><div class='dependency'><a href='source/indexer5.html#JW-ObservableArray-Indexer' target='_blank'>indexer.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt; extends <a href=\"#!/api/JW.AbstractArray.Indexer\" rel=\"JW.AbstractArray.Indexer\" class=\"docClass\">JW.AbstractArray.Indexer</a>&lt;T&gt;</code></p>\n\n<p>See <a href=\"#!/api/JW.AbstractCollection.Indexer\" rel=\"JW.AbstractCollection.Indexer\" class=\"docClass\">JW.AbstractCollection.Indexer</a> for details.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Required config options</h3><div id='cfg-getKey' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-cfg-getKey' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-cfg-getKey' class='name expandable'>getKey</a> : Function<span class=\"signature\"><span class='required' >required</span></span></div><div class='description'><div class='short'>getKey(item: T): string\n\nIndexing function. ...</div><div class='long'><p><code>getKey(item: T): string</code></p>\n\n<p>Indexing function. Determines item key in map.</p>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Optional config options</h3><div id='cfg-scope' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-cfg-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-cfg-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p><a href=\"#!/api/JW.AbstractCollection.Indexer-cfg-getKey\" rel=\"JW.AbstractCollection.Indexer-cfg-getKey\" class=\"docClass\">getKey</a> call scope.</p>\n</div><div class='long'><p><a href=\"#!/api/JW.AbstractCollection.Indexer-cfg-getKey\" rel=\"JW.AbstractCollection.Indexer-cfg-getKey\" class=\"docClass\">getKey</a> call scope.</p>\n</div></div></div><div id='cfg-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-cfg-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Target map.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Target map.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-source' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractArray.Indexer' rel='JW.AbstractArray.Indexer' class='defined-in docClass'>JW.AbstractArray.Indexer</a><br/><a href='source/indexer.html#JW-AbstractArray-Indexer-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Indexer-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Source collection.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Source collection.</p>\n<p>Overrides: <a href=\"#!/api/JW.AbstractCollection.Indexer-property-source\" rel=\"JW.AbstractCollection.Indexer-property-source\" class=\"docClass\">JW.AbstractCollection.Indexer.source</a></p></div></div></div><div id='property-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='defined-in docClass'>JW.AbstractCollection.Indexer</a><br/><a href='source/indexer2.html#JW-AbstractCollection-Indexer-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Indexer-property-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Target map.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Target map.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.ObservableArray.Indexer'>JW.ObservableArray.Indexer</span><br/><a href='source/indexer5.html#JW-ObservableArray-Indexer-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.ObservableArray.Indexer-method-constructor' class='name expandable'>JW.ObservableArray.Indexer</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.ObservableArray.Indexer\" rel=\"JW.ObservableArray.Indexer\" class=\"docClass\">JW.ObservableArray.Indexer</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates synchronizer. ...</div><div class='long'><p>Creates synchronizer. <a href=\"#!/api/JW.AbstractCollection-method-createIndexer\" rel=\"JW.AbstractCollection-method-createIndexer\" class=\"docClass\">JW.AbstractCollection.createIndexer</a> method is preferrable instead.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Source collection.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration (see Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.ObservableArray.Indexer\" rel=\"JW.ObservableArray.Indexer\" class=\"docClass\">JW.ObservableArray.Indexer</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/JW.AbstractArray.Indexer-method-constructor\" rel=\"JW.AbstractArray.Indexer-method-constructor\" class=\"docClass\">JW.AbstractArray.Indexer.constructor</a></p></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor. ...</div><div class='long'><p>Class destructor. The logic of class instance destruction should be implemented here. You must call this method\nexplicitly from outside, because JavaScript doesn't support automatic class destructor calling. Don't forget to\ncall superclass destructor at the end of the method:</p>\n\n<pre><code>destroy: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});