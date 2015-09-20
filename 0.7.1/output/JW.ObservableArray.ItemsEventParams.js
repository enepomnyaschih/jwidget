Ext.data.JsonP.JW_ObservableArray_ItemsEventParams({"tagname":"class","name":"JW.ObservableArray.ItemsEventParams","autodetected":{},"files":[{"filename":"observableArray.js","href":"observableArray.html#JW-ObservableArray-ItemsEventParams"}],"extends":"JW.ObservableArray.EventParams","members":[{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"items","tagname":"property","owner":"JW.ObservableArray.ItemsEventParams","id":"property-items","meta":{}},{"name":"sender","tagname":"property","owner":"JW.ObservableArray.EventParams","id":"property-sender","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.ObservableArray.ItemsEventParams","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.ObservableArray.ItemsEventParams","short_doc":"&lt;T&gt; extends JW.ObservableArray.EventParams&lt;T&gt;\n\nParameters of JW.ObservableArray event which bring its old...","component":false,"superclasses":["JW.Class","JW.EventParams","JW.ObservableArray.EventParams"],"subclasses":["JW.ObservableArray.ReorderEventParams"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><a href='#!/api/JW.EventParams' rel='JW.EventParams' class='docClass'>JW.EventParams</a><div class='subclass '><a href='#!/api/JW.ObservableArray.EventParams' rel='JW.ObservableArray.EventParams' class='docClass'>JW.ObservableArray.EventParams</a><div class='subclass '><strong>JW.ObservableArray.ItemsEventParams</strong></div></div></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.ObservableArray.ReorderEventParams' rel='JW.ObservableArray.ReorderEventParams' class='docClass'>JW.ObservableArray.ReorderEventParams</a></div><h4>Files</h4><div class='dependency'><a href='source/observableArray.html#JW-ObservableArray-ItemsEventParams' target='_blank'>observableArray.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt; extends <a href=\"#!/api/JW.ObservableArray.EventParams\" rel=\"JW.ObservableArray.EventParams\" class=\"docClass\">JW.ObservableArray.EventParams</a>&lt;T&gt;</code></p>\n\n<p>Parameters of <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a> event which bring its old contents.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-items' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.ObservableArray.ItemsEventParams'>JW.ObservableArray.ItemsEventParams</span><br/><a href='source/observableArray.html#JW-ObservableArray-ItemsEventParams-property-items' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.ObservableArray.ItemsEventParams-property-items' class='name expandable'>items</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Old array contents.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Old array contents.</p>\n</div></div></div><div id='property-sender' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.ObservableArray.EventParams' rel='JW.ObservableArray.EventParams' class='defined-in docClass'>JW.ObservableArray.EventParams</a><br/><a href='source/observableArray.html#JW-ObservableArray-EventParams-property-sender' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.ObservableArray.EventParams-property-sender' class='name expandable'>sender</a> : <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Event sender.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Event sender.</p>\n<p>Overrides: <a href=\"#!/api/JW.EventParams-property-sender\" rel=\"JW.EventParams-property-sender\" class=\"docClass\">JW.EventParams.sender</a></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.ObservableArray.ItemsEventParams'>JW.ObservableArray.ItemsEventParams</span><br/><a href='source/observableArray.html#JW-ObservableArray-ItemsEventParams-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.ObservableArray.ItemsEventParams-method-constructor' class='name expandable'>JW.ObservableArray.ItemsEventParams</a>( <span class='pre'>sender, items</span> ) : <a href=\"#!/api/JW.ObservableArray.ItemsEventParams\" rel=\"JW.ObservableArray.ItemsEventParams\" class=\"docClass\">JW.ObservableArray.ItemsEventParams</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>sender</span> : <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Event sender.</p>\n</div></li><li><span class='pre'>items</span> : Array<div class='sub-desc'><p><code>&lt;T&gt;</code> Old array contents.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.ObservableArray.ItemsEventParams\" rel=\"JW.ObservableArray.ItemsEventParams\" class=\"docClass\">JW.ObservableArray.ItemsEventParams</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/JW.ObservableArray.EventParams-method-constructor\" rel=\"JW.ObservableArray.EventParams-method-constructor\" class=\"docClass\">JW.ObservableArray.EventParams.constructor</a></p></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor. ...</div><div class='long'><p>Class destructor. The logic of class instance destruction should be implemented here. You must call this method\nexplicitly from outside, because JavaScript doesn't support automatic class destructor calling. Don't forget to\ncall superclass destructor at the end of the method:</p>\n\n<pre><code>destroy: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});