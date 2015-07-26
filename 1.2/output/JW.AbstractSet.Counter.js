Ext.data.JsonP.JW_AbstractSet_Counter({"tagname":"class","name":"JW.AbstractSet.Counter","autodetected":{},"files":[{"filename":"counter.js","href":"counter4.html#JW-AbstractSet-Counter"}],"extends":"JW.AbstractCollection.Counter","members":[{"name":"filterItem","tagname":"cfg","owner":"JW.AbstractCollection.Counter","id":"cfg-filterItem","meta":{"required":true}},{"name":"scope","tagname":"cfg","owner":"JW.AbstractCollection.Counter","id":"cfg-scope","meta":{}},{"name":"target","tagname":"cfg","owner":"JW.AbstractCollection.Counter","id":"cfg-target","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractSet.Counter","id":"property-source","meta":{}},{"name":"target","tagname":"property","owner":"JW.AbstractCollection.Counter","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.AbstractSet.Counter","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}},{"name":"reconfigure","tagname":"method","owner":"JW.AbstractCollection.Counter","id":"method-reconfigure","meta":{}},{"name":"recount","tagname":"method","owner":"JW.AbstractCollection.Counter","id":"method-recount","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.AbstractSet.Counter","short_doc":"&lt;T extends JW.Class&gt; extends JW.AbstractCollection.Counter&lt;T&gt;\n\nSee JW.AbstractCollection.Counter for deta...","component":false,"superclasses":["JW.Class","JW.AbstractCollection.Counter"],"subclasses":["JW.ObservableSet.Counter"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='docClass'>JW.AbstractCollection.Counter</a><div class='subclass '><strong>JW.AbstractSet.Counter</strong></div></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.ObservableSet.Counter' rel='JW.ObservableSet.Counter' class='docClass'>JW.ObservableSet.Counter</a></div><h4>Files</h4><div class='dependency'><a href='source/counter4.html#JW-AbstractSet-Counter' target='_blank'>counter.js</a></div></pre><div class='doc-contents'><p><code>&lt;T extends <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>&gt; extends <a href=\"#!/api/JW.AbstractCollection.Counter\" rel=\"JW.AbstractCollection.Counter\" class=\"docClass\">JW.AbstractCollection.Counter</a>&lt;T&gt;</code></p>\n\n<p>See <a href=\"#!/api/JW.AbstractCollection.Counter\" rel=\"JW.AbstractCollection.Counter\" class=\"docClass\">JW.AbstractCollection.Counter</a> for details.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Required config options</h3><div id='cfg-filterItem' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='defined-in docClass'>JW.AbstractCollection.Counter</a><br/><a href='source/counter2.html#JW-AbstractCollection-Counter-cfg-filterItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Counter-cfg-filterItem' class='name expandable'>filterItem</a> : Function<span class=\"signature\"><span class='required' >required</span></span></div><div class='description'><div class='short'>filterItem(item: T): boolean\n\nFiltering function. ...</div><div class='long'><p><code>filterItem(item: T): boolean</code></p>\n\n<p>Filtering function. Target property will count an item if filtering function\nreturns !== <code>false</code> for this item.</p>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Optional config options</h3><div id='cfg-scope' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='defined-in docClass'>JW.AbstractCollection.Counter</a><br/><a href='source/counter2.html#JW-AbstractCollection-Counter-cfg-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Counter-cfg-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p><a href=\"#!/api/JW.AbstractCollection.Counter-cfg-filterItem\" rel=\"JW.AbstractCollection.Counter-cfg-filterItem\" class=\"docClass\">filterItem</a> call scope.</p>\n</div><div class='long'><p><a href=\"#!/api/JW.AbstractCollection.Counter-cfg-filterItem\" rel=\"JW.AbstractCollection.Counter-cfg-filterItem\" class=\"docClass\">filterItem</a> call scope.</p>\n</div></div></div><div id='cfg-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='defined-in docClass'>JW.AbstractCollection.Counter</a><br/><a href='source/counter2.html#JW-AbstractCollection-Counter-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Counter-cfg-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;number&gt;</code> Target property.</p>\n</div><div class='long'><p><code>&lt;number&gt;</code> Target property.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractSet.Counter'>JW.AbstractSet.Counter</span><br/><a href='source/counter4.html#JW-AbstractSet-Counter-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractSet.Counter-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Source collection.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Source collection.</p>\n<p>Overrides: <a href=\"#!/api/JW.AbstractCollection.Counter-property-source\" rel=\"JW.AbstractCollection.Counter-property-source\" class=\"docClass\">JW.AbstractCollection.Counter.source</a></p></div></div></div><div id='property-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='defined-in docClass'>JW.AbstractCollection.Counter</a><br/><a href='source/counter2.html#JW-AbstractCollection-Counter-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Counter-property-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;number&gt;</code> Target property.</p>\n</div><div class='long'><p><code>&lt;number&gt;</code> Target property.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractSet.Counter'>JW.AbstractSet.Counter</span><br/><a href='source/counter4.html#JW-AbstractSet-Counter-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.AbstractSet.Counter-method-constructor' class='name expandable'>JW.AbstractSet.Counter</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.AbstractSet.Counter\" rel=\"JW.AbstractSet.Counter\" class=\"docClass\">JW.AbstractSet.Counter</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates synchronizer. ...</div><div class='long'><p>Creates synchronizer. <a href=\"#!/api/JW.AbstractCollection-method-createCounter\" rel=\"JW.AbstractCollection-method-createCounter\" class=\"docClass\">JW.AbstractCollection.createCounter</a> method is preferrable instead.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Source collection.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration (see Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.AbstractSet.Counter\" rel=\"JW.AbstractSet.Counter\" class=\"docClass\">JW.AbstractSet.Counter</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/JW.AbstractCollection.Counter-method-constructor\" rel=\"JW.AbstractCollection.Counter-method-constructor\" class=\"docClass\">JW.AbstractCollection.Counter.constructor</a></p></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor. ...</div><div class='long'><p>Class destructor. The logic of class instance destruction should be implemented here. You must call this method\nexplicitly from outside, because JavaScript doesn't support automatic class destructor calling. Alternatively\n(and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate objects inside each other. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroy: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div><div id='method-reconfigure' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='defined-in docClass'>JW.AbstractCollection.Counter</a><br/><a href='source/counter2.html#JW-AbstractCollection-Counter-method-reconfigure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Counter-method-reconfigure' class='name expandable'>reconfigure</a>( <span class='pre'>config</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Changes counter configuration and recounts matching items. ...</div><div class='long'><p>Changes counter configuration and recounts matching items. Accepts next\noptions: <a href=\"#!/api/JW.AbstractCollection.Counter-cfg-filterItem\" rel=\"JW.AbstractCollection.Counter-cfg-filterItem\" class=\"docClass\">filterItem</a>, <a href=\"#!/api/JW.AbstractCollection.Counter-cfg-scope\" rel=\"JW.AbstractCollection.Counter-cfg-scope\" class=\"docClass\">scope</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration.</p>\n</div></li></ul></div></div></div><div id='method-recount' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='defined-in docClass'>JW.AbstractCollection.Counter</a><br/><a href='source/counter2.html#JW-AbstractCollection-Counter-method-recount' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Counter-method-recount' class='name expandable'>recount</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Recounts matching items. ...</div><div class='long'><p>Recounts matching items. Call this method when collection items properties change the way that\nthey must be refiltered.</p>\n</div></div></div></div></div></div></div>","meta":{}});