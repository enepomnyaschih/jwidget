Ext.data.JsonP.JW_UI_ClassUpdater({"tagname":"class","name":"JW.UI.ClassUpdater","autodetected":{},"files":[{"filename":"classUpdater.js","href":"classUpdater.html#JW-UI-ClassUpdater"}],"extends":"JW.Class","members":[{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"cls","tagname":"property","owner":"JW.UI.ClassUpdater","id":"property-cls","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"el","tagname":"property","owner":"JW.UI.ClassUpdater","id":"property-el","meta":{}},{"name":"property","tagname":"property","owner":"JW.UI.ClassUpdater","id":"property-property","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.UI.ClassUpdater","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"destroyObject","tagname":"method","owner":"JW.Class","id":"method-destroyObject","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.UI.ClassUpdater","short_doc":"Watches source boolean property modification and updates the\nspecified CSS class presence in the DOM element. ...","component":false,"superclasses":["JW.Class"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.UI.ClassUpdater</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/classUpdater.html#JW-UI-ClassUpdater' target='_blank'>classUpdater.js</a></div></pre><div class='doc-contents'><p>Watches source boolean <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">property</a> modification and updates the\nspecified CSS class presence in the DOM element.\nApplied on initialization as well.</p>\n\n<pre><code>var selected = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(true);\n// Next command adds \"selected\" CSS class to element\nvar updater = new <a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a>($(\"#myelem\"), \"selected\", selected);\n// Next command removes \"selected\" CSS class from element\nselected.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(false);\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-cls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI.ClassUpdater'>JW.UI.ClassUpdater</span><br/><a href='source/classUpdater.html#JW-UI-ClassUpdater-property-cls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI.ClassUpdater-property-cls' class='name expandable'>cls</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'><p>CSS class name.</p>\n</div><div class='long'><p>CSS class name.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-el' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI.ClassUpdater'>JW.UI.ClassUpdater</span><br/><a href='source/classUpdater.html#JW-UI-ClassUpdater-property-el' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI.ClassUpdater-property-el' class='name expandable'>el</a> : <a href=\"#!/api/jQuery\" rel=\"jQuery\" class=\"docClass\">jQuery</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>DOM element.</p>\n</div><div class='long'><p>DOM element.</p>\n</div></div></div><div id='property-property' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI.ClassUpdater'>JW.UI.ClassUpdater</span><br/><a href='source/classUpdater.html#JW-UI-ClassUpdater-property-property' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI.ClassUpdater-property-property' class='name expandable'>property</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;Boolean&gt;</code> Source property.</p>\n</div><div class='long'><p><code>&lt;Boolean&gt;</code> Source property.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI.ClassUpdater'>JW.UI.ClassUpdater</span><br/><a href='source/classUpdater.html#JW-UI-ClassUpdater-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.UI.ClassUpdater-method-constructor' class='name expandable'>JW.UI.ClassUpdater</a>( <span class='pre'>el, cls, property</span> ) : <a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : <a href=\"#!/api/jQuery\" rel=\"jQuery\" class=\"docClass\">jQuery</a><div class='sub-desc'><p>DOM element.</p>\n</div></li><li><span class='pre'>cls</span> : String<div class='sub-desc'><p>CSS class name.</p>\n</div></li><li><span class='pre'>property</span> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><div class='sub-desc'><p><code>&lt;Boolean&gt;</code> Source property.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor invocation method. ...</div><div class='long'><p>Class destructor invocation method. Destroys all aggregated objects and calls <a href=\"#!/api/JW.Class-method-destroyObject\" rel=\"JW.Class-method-destroyObject\" class=\"docClass\">destroyObject</a> method.\nYou must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor\ncalling. Alternatively (and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate this object inside some another.</p>\n\n<pre><code>var object = new MyClass();\n\n// ...\n\n// Once object is not needed anymore, destroy it\nobject.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>You can override this method in a subclass to do some preliminary work before aggregated objects destruction.\nFor example, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> overrides this method to remove child components before their destruction,\nbefore child components are usually aggregated inside the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroyObject' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroyObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroyObject' class='name expandable'>destroyObject</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor implementation. ...</div><div class='long'><p>Class destructor implementation. Called inside <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a> method after aggregated objects destruction.\nThe logic of class instance destruction should be implemented here. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroyObject: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});