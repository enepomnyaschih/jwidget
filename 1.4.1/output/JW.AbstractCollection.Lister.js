Ext.data.JsonP.JW_AbstractCollection_Lister({"tagname":"class","name":"JW.AbstractCollection.Lister","autodetected":{},"files":[{"filename":"lister.js","href":"lister2.html#JW-AbstractCollection-Lister"}],"extends":"JW.Class","members":[{"name":"target","tagname":"cfg","owner":"JW.AbstractCollection.Lister","id":"cfg-target","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"source","tagname":"property","owner":"JW.AbstractCollection.Lister","id":"property-source","meta":{}},{"name":"target","tagname":"property","owner":"JW.AbstractCollection.Lister","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.AbstractCollection.Lister","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"destroyObject","tagname":"method","owner":"JW.Class","id":"method-destroyObject","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.AbstractCollection.Lister","short_doc":"&lt;T extends JW.Class, C extends JW.AbstractCollection&lt;T&gt;&gt;\n\nConverter to set. ...","component":false,"superclasses":["JW.Class"],"subclasses":["JW.AbstractArray.Lister","JW.AbstractMap.Lister","JW.AbstractSet.Lister"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.AbstractCollection.Lister</strong></div></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.AbstractArray.Lister' rel='JW.AbstractArray.Lister' class='docClass'>JW.AbstractArray.Lister</a></div><div class='dependency'><a href='#!/api/JW.AbstractMap.Lister' rel='JW.AbstractMap.Lister' class='docClass'>JW.AbstractMap.Lister</a></div><div class='dependency'><a href='#!/api/JW.AbstractSet.Lister' rel='JW.AbstractSet.Lister' class='docClass'>JW.AbstractSet.Lister</a></div><h4>Files</h4><div class='dependency'><a href='source/lister2.html#JW-AbstractCollection-Lister' target='_blank'>lister.js</a></div></pre><div class='doc-contents'><p><code>&lt;T extends <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, C extends <a href=\"#!/api/JW.AbstractCollection\" rel=\"JW.AbstractCollection\" class=\"docClass\">JW.AbstractCollection</a>&lt;T&gt;&gt;</code></p>\n\n<p>Converter to set.\nIf original collection is observable, starts continuous synchronization.\nCan be used for fast item existance detection.</p>\n\n<pre><code>// Create two dummy collection items\nvar x = new <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>();\nvar y = new <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>();\n\n// Initialize collection and synchronizer\nvar array = new <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>([x]);\nvar lister = array.<a href=\"#!/api/JW.AbstractCollection-method-createLister\" rel=\"JW.AbstractCollection-method-createLister\" class=\"docClass\">createLister</a>();\nvar set = lister.<a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a>;\n\nassert(set.<a href=\"#!/api/JW.AbstractSet-method-contains\" rel=\"JW.AbstractSet-method-contains\" class=\"docClass\">contains</a>(x));\nassert(!set.<a href=\"#!/api/JW.AbstractSet-method-contains\" rel=\"JW.AbstractSet-method-contains\" class=\"docClass\">contains</a>(y));\n\n// Target set is automatically synchronized with original observable array\narray.add(y);\nassert(set.<a href=\"#!/api/JW.AbstractSet-method-contains\" rel=\"JW.AbstractSet-method-contains\" class=\"docClass\">contains</a>(y));\n\nlister.<a href=\"#!/api/JW.AbstractCollection.Lister-method-destroy\" rel=\"JW.AbstractCollection.Lister-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p><strong>Notice:</strong> All items of source collection must be different (i.e. have unique _iid).</p>\n\n<p>Use <a href=\"#!/api/JW.AbstractCollection-method-createLister\" rel=\"JW.AbstractCollection-method-createLister\" class=\"docClass\">JW.AbstractCollection.createLister</a> method to create the synchronizer.\nThe method will select which synchronizer implementation fits better (simple or observable).</p>\n\n<p>You can pass target collection in config option:</p>\n\n<pre><code>var set = new <a href=\"#!/api/JW.Set\" rel=\"JW.Set\" class=\"docClass\">JW.Set</a>();\nvar lister = collection.<a href=\"#!/api/JW.AbstractCollection-method-createLister\" rel=\"JW.AbstractCollection-method-createLister\" class=\"docClass\">createLister</a>({\n    <a href=\"#!/api/JW.AbstractCollection.Lister-cfg-target\" rel=\"JW.AbstractCollection.Lister-cfg-target\" class=\"docClass\">target</a>: set\n});\n</code></pre>\n\n<p>In simple cases, <a href=\"#!/api/JW.AbstractCollection-method-S-S-toSet\" rel=\"JW.AbstractCollection-method-S-S-toSet\" class=\"docClass\">JW.AbstractCollection.$$toSet</a> shorthand can be used instead. It returns the target set right away:</p>\n\n<pre><code>// Create two dummy collection items\nvar x = new <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>();\nvar y = new <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>();\n\n// Initialize collections\nvar array = new <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>([x]);\nvar set = array.<a href=\"#!/api/JW.AbstractCollection-method-S-S-toSet\" rel=\"JW.AbstractCollection-method-S-S-toSet\" class=\"docClass\">$$toSet</a>();\n\nassert(set.<a href=\"#!/api/JW.AbstractSet-method-contains\" rel=\"JW.AbstractSet-method-contains\" class=\"docClass\">contains</a>(x));\nassert(!set.<a href=\"#!/api/JW.AbstractSet-method-contains\" rel=\"JW.AbstractSet-method-contains\" class=\"docClass\">contains</a>(y));\n\n// Target set is automatically synchronized with original observable array\narray.add(y);\nassert(set.<a href=\"#!/api/JW.AbstractSet-method-contains\" rel=\"JW.AbstractSet-method-contains\" class=\"docClass\">contains</a>(y));\n\nset.<a href=\"#!/api/JW.AbstractSet-method-destroy\" rel=\"JW.AbstractSet-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>Synchronizer rules:</p>\n\n<ul>\n<li>Target set is stored in <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a> property.</li>\n<li>All items of source collection are added to <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a> immediately on synchronizer initialization.</li>\n<li>All items are removed from <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a> on synchronizer destruction.</li>\n<li>You can pass target set in <a href=\"#!/api/JW.AbstractCollection.Lister-cfg-target\" rel=\"JW.AbstractCollection.Lister-cfg-target\" class=\"docClass\">target</a> config option.\nIn this case, you are responsible for its destruction (though items will be removed\nautomatically on synchronizer destruction anyway).</li>\n<li>If <a href=\"#!/api/JW.AbstractCollection.Lister-cfg-target\" rel=\"JW.AbstractCollection.Lister-cfg-target\" class=\"docClass\">target</a> is not passed, it will be created automatically. Synchronizer will select\nappropriate <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a> implementation (simple or observable). In this\ncase, <a href=\"#!/api/JW.AbstractCollection.Lister-property-target\" rel=\"JW.AbstractCollection.Lister-property-target\" class=\"docClass\">target</a> will be destroyed automatically on synchronizer destruction.</li>\n<li>You can convert multiple collections into one set, if all items are different.</li>\n</ul>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-target' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractCollection.Lister'>JW.AbstractCollection.Lister</span><br/><a href='source/lister2.html#JW-AbstractCollection-Lister-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Lister-cfg-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Target set.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Target set.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-source' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractCollection.Lister'>JW.AbstractCollection.Lister</span><br/><a href='source/lister2.html#JW-AbstractCollection-Lister-property-source' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Lister-property-source' class='name expandable'>source</a> : C<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Source collection.</p>\n</div><div class='long'><p>Source collection.</p>\n</div></div></div><div id='property-target' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractCollection.Lister'>JW.AbstractCollection.Lister</span><br/><a href='source/lister2.html#JW-AbstractCollection-Lister-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.AbstractCollection.Lister-property-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;T&gt;</code> Target set.</p>\n</div><div class='long'><p><code>&lt;T&gt;</code> Target set.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.AbstractCollection.Lister'>JW.AbstractCollection.Lister</span><br/><a href='source/lister2.html#JW-AbstractCollection-Lister-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.AbstractCollection.Lister-method-constructor' class='name expandable'>JW.AbstractCollection.Lister</a>( <span class='pre'>source, [config]</span> ) : <a href=\"#!/api/JW.AbstractCollection.Lister\" rel=\"JW.AbstractCollection.Lister\" class=\"docClass\">JW.AbstractCollection.Lister</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates synchronizer. ...</div><div class='long'><p>Creates synchronizer. <a href=\"#!/api/JW.AbstractCollection-method-createLister\" rel=\"JW.AbstractCollection-method-createLister\" class=\"docClass\">JW.AbstractCollection.createLister</a> method is preferrable instead.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.AbstractCollection\" rel=\"JW.AbstractCollection\" class=\"docClass\">JW.AbstractCollection</a><div class='sub-desc'><p><code>&lt;T&gt;</code> Source collection.</p>\n</div></li><li><span class='pre'>config</span> : Object (optional)<div class='sub-desc'><p>Configuration (see Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.AbstractCollection.Lister\" rel=\"JW.AbstractCollection.Lister\" class=\"docClass\">JW.AbstractCollection.Lister</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor invocation method. ...</div><div class='long'><p>Class destructor invocation method. Destroys all aggregated objects and calls <a href=\"#!/api/JW.Class-method-destroyObject\" rel=\"JW.Class-method-destroyObject\" class=\"docClass\">destroyObject</a> method.\nYou must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor\ncalling. Alternatively (and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate this object inside some another.</p>\n\n<pre><code>var object = new MyClass();\n\n// ...\n\n// Once object is not needed anymore, destroy it\nobject.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>You can override this method in a subclass to do some preliminary work before aggregated objects destruction.\nFor example, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> overrides this method to remove child components before their destruction,\nbefore child components are usually aggregated inside the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroyObject' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroyObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroyObject' class='name expandable'>destroyObject</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor implementation. ...</div><div class='long'><p>Class destructor implementation. Called inside <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a> method after aggregated objects destruction.\nThe logic of class instance destruction should be implemented here. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroyObject: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});