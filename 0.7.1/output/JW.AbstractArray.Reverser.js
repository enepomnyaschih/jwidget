Ext.data.JsonP.JW_AbstractArray_Reverser({"tagname":"class","name":"JW.AbstractArray.Reverser","autodetected":{},"files":[{"filename":"reverser.js","href":"reverser.html#JW-AbstractArray-Reverser"}],"extends":"JW.Class","members":[{"name":"target","tagname":"cfg","owner":"JW.AbstractArray.Reverser","id":"cfg-target","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractArray.Reverser","id":"property-source","meta":{}},{"name":"target","tagname":"property","owner":"JW.AbstractArray.Reverser","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.AbstractArray.Reverser","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.AbstractArray.Reverser","short_doc":"&lt;T&gt;\n\nArray reverser. ...","component":false,"superclasses":["JW.Class"],"subclasses":["JW.ObservableArray.Reverser"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.AbstractArray.Reverser</strong></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.ObservableArray.Reverser' rel='JW.ObservableArray.Reverser' class='docClass'>JW.ObservableArray.Reverser</a></div><h4>Files</h4><div class='dependency'><a href='source/reverser.html#JW-AbstractArray-Reverser' target='_blank'>reverser.js</a></div></pre><div class='doc-contents'><p><code>&lt;T&gt;</code></p>\n\n<p>Array reverser. Builds array containing all items of source array in reversed order.</p>\n\n<pre><code>var source = new <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>([1, 2, 3]);\nvar reverser = source.<a href=\"#!/api/JW.AbstractArray-method-createReverser\" rel=\"JW.AbstractArray-method-createReverser\" class=\"docClass\">createReverser</a>();\nassert(reverser.<a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a>.<a href=\"#!/api/JW.AbstractArray-method-equal\" rel=\"JW.AbstractArray-method-equal\" class=\"docClass\">equal</a>([3, 2, 1]));\n\nsource.<a href=\"#!/api/JW.AbstractArray-method-add\" rel=\"JW.AbstractArray-method-add\" class=\"docClass\">add</a>(4);\nassert(reverser.<a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a>.<a href=\"#!/api/JW.AbstractArray-method-equal\" rel=\"JW.AbstractArray-method-equal\" class=\"docClass\">equal</a>([4, 3, 2, 1]));\n\nsource.<a href=\"#!/api/JW.AbstractArray-method-remove\" rel=\"JW.AbstractArray-method-remove\" class=\"docClass\">remove</a>(2);\nassert(reverser.<a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a>.<a href=\"#!/api/JW.AbstractArray-method-equal\" rel=\"JW.AbstractArray-method-equal\" class=\"docClass\">equal</a>([4, 2, 1]));\n</code></pre>\n\n<p>Use <a href=\"#!/api/JW.AbstractArray-method-createReverser\" rel=\"JW.AbstractArray-method-createReverser\" class=\"docClass\">JW.AbstractArray.createReverser</a> method to create the synchronizer.\nThe method will select which synchronizer implementation fits better (simple or observable).</p>\n\n<p>You can pass target array in config option:</p>\n\n<pre><code>var source = new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>();\nvar target = new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>();\nvar reverser = source.<a href=\"#!/api/JW.AbstractArray-method-createReverser\" rel=\"JW.AbstractArray-method-createReverser\" class=\"docClass\">createReverser</a>({\n    <a href=\"#!/api/JW.AbstractArray.Reverser-cfg-target\" rel=\"JW.AbstractArray.Reverser-cfg-target\" class=\"docClass\">target</a>: target\n});\n</code></pre>\n\n<p>Synchronizer rules:</p>\n\n<ul>\n<li>Target array is stored in <a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a> property.</li>\n<li>Target array must be empty before initialization.</li>\n<li>You can't modify target array manually and/or create other synchronizers with the same target array.</li>\n<li>All items of source array are added to <a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a>\nimmediately on synchronizer initialization.</li>\n<li>All items are removed from <a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a> on synchronizer destruction.</li>\n<li>You can pass target array in <a href=\"#!/api/JW.AbstractArray.Reverser-cfg-target\" rel=\"JW.AbstractArray.Reverser-cfg-target\" class=\"docClass\">target</a> config option.\nIn this case, you are responsible for its destruction (though items will be removed\nautomatically on synchronizer destruction anyway).</li>\n<li>If <a href=\"#!/api/JW.AbstractArray.Reverser-cfg-target\" rel=\"JW.AbstractArray.Reverser-cfg-target\" class=\"docClass\">target</a> is not passed, it will be created automatically. Synchronizer will select\nappropriate <a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a> implementation (simple or observable). In this\ncase, <a href=\"#!/api/JW.AbstractArray.Reverser-property-target\" rel=\"JW.AbstractArray.Reverser-property-target\" class=\"docClass\">target</a> will be destroyed automatically on synchronizer destruction.</li>\n</ul>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-target' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Reverser'>JW.AbstractArray.Reverser</span><br/><a href='source/reverser.html#JW-AbstractArray-Reverser-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Reverser-cfg-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Target array.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Target array.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Reverser'>JW.AbstractArray.Reverser</span><br/><a href='source/reverser.html#JW-AbstractArray-Reverser-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Reverser-property-source' class='name expandable'>source</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Source array.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Source array.</p>\n</div></div></div><div id='property-target' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Reverser'>JW.AbstractArray.Reverser</span><br/><a href='source/reverser.html#JW-AbstractArray-Reverser-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractArray.Reverser-property-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Target array.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Target array.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractArray.Reverser'>JW.AbstractArray.Reverser</span><br/><a href='source/reverser.html#JW-AbstractArray-Reverser-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.AbstractArray.Reverser-method-constructor' class='name expandable'>JW.AbstractArray.Reverser</a>( <span class='pre'>source, config</span> ) : <a href=\"#!/api/JW.AbstractArray.Reverser\" rel=\"JW.AbstractArray.Reverser\" class=\"docClass\">JW.AbstractArray.Reverser</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates synchronizer. ...</div><div class='long'><p>Creates synchronizer. <a href=\"#!/api/JW.AbstractArray-method-createReverser\" rel=\"JW.AbstractArray-method-createReverser\" class=\"docClass\">JW.AbstractArray.createReverser</a> method is preferrable instead.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Source array.</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration (see Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.AbstractArray.Reverser\" rel=\"JW.AbstractArray.Reverser\" class=\"docClass\">JW.AbstractArray.Reverser</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor. ...</div><div class='long'><p>Class destructor. The logic of class instance destruction should be implemented here. You must call this method\nexplicitly from outside, because JavaScript doesn't support automatic class destructor calling. Don't forget to\ncall superclass destructor at the end of the method:</p>\n\n<pre><code>destroy: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});