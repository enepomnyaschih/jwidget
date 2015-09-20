Ext.data.JsonP.JW_UI_JQEventAttachment({"tagname":"class","name":"JW.UI.JQEventAttachment","autodetected":{},"files":[{"filename":"jqEventAttachment.js","href":"jqEventAttachment.html#JW-UI-JQEventAttachment"}],"extends":"JW.Class","members":[{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.UI.JQEventAttachment","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"destroyObject","tagname":"method","owner":"JW.Class","id":"method-destroyObject","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.UI.JQEventAttachment","short_doc":"jQuery event attachment adapter. ...","component":false,"superclasses":["JW.Class"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.UI.JQEventAttachment</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/jqEventAttachment.html#JW-UI-JQEventAttachment' target='_blank'>jqEventAttachment.js</a></div></pre><div class='doc-contents'><p>jQuery event attachment adapter.</p>\n\n<ul>\n<li>Allows you to use jQuery events in conjunction with jWidget object aggregation feature.\nAttachment destruction results in event unbinding.</li>\n<li>Allows you to pass callback context.</li>\n<li>However, it doesn't support \"data\" argument - use closures instead.</li>\n</ul>\n\n\n<p>Method <a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a> is a shorthand for adapter creation.</p>\n\n<p><strong>Example</strong></p>\n\n<p>Assume you have the next class:</p>\n\n<pre><code>var MyForm = function(el) {\n    this._onSubmit = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onSubmit, this);\n    this._onTextChange = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onTextChange, this);\n    MyForm.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    el.on(\"submit\", this._onSubmit);\n    el.on(\"change\", \"input[type=text]\", this._onTextChange);\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(MyForm, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    _onSubmit: function(event) {...},\n    _onTextChange: function(event) {...},\n\n    <a href=\"#!/api/JW.UI.JQEventAttachment-method-destroyObject\" rel=\"JW.UI.JQEventAttachment-method-destroyObject\" class=\"docClass\">destroyObject</a>: function() {\n        el.off(\"submit\", this._onSubmit);\n        el.off(\"change\", \"input[type=text]\", this._onTextChange);\n        this.<a href=\"#!/api/JW.UI.JQEventAttachment-method-_super\" rel=\"JW.UI.JQEventAttachment-method-_super\" class=\"docClass\">_super</a>();\n    }\n});\n</code></pre>\n\n<p>Thanks to the adapter, we can remove the overhead of locking the method call context and\nexplicit event unsubscribing in the <a href=\"#!/api/JW.UI.JQEventAttachment-method-destroyObject\" rel=\"JW.UI.JQEventAttachment-method-destroyObject\" class=\"docClass\">destroyObject</a> method:</p>\n\n<pre><code>var MyForm = function(el) {\n    MyForm.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.own(el.<a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a>(\"submit\", this._onSubmit, this));\n    this.own(el.<a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a>(\"change\", \"input[type=text]\", this._onTextChange, this));\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(MyForm, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    _onSubmit: function(event, target) {...},\n    _onTextChange: function(event, target) {...}\n});\n</code></pre>\n\n<p>Notice that event target which jQuery usually assigns the call context to is passed as a second callback argument.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI.JQEventAttachment'>JW.UI.JQEventAttachment</span><br/><a href='source/jqEventAttachment.html#JW-UI-JQEventAttachment-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.UI.JQEventAttachment-method-constructor' class='name expandable'>JW.UI.JQEventAttachment</a>( <span class='pre'>el, events, selector, handler, [scope]</span> ) : <a href=\"#!/api/JW.UI.JQEventAttachment\" rel=\"JW.UI.JQEventAttachment\" class=\"docClass\">JW.UI.JQEventAttachment</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates the attachment, subscribes to the event. ...</div><div class='long'><p>Creates the attachment, subscribes to the event. Shorthand: <a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : <a href=\"#!/api/jQuery\" rel=\"jQuery\" class=\"docClass\">jQuery</a><div class='sub-desc'><p>jQuery element collection.</p>\n</div></li><li><span class='pre'>events</span> : string<div class='sub-desc'><p>One or more space-separated event types and optional namespaces, such as \"click\" or \"keydown.myPlugin\".</p>\n</div></li><li><span class='pre'>selector</span> : string<div class='sub-desc'><p>A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.</p>\n</div></li><li><span class='pre'>handler</span> : Function<div class='sub-desc'><p><code>handler(event: Event, target: DOMElement)</code></p>\n\n<p>A function to execute when the event is triggered. The value <code>false</code> is also allowed as a shorthand for a function that simply does <code>return false</code>.</p>\n</div></li><li><span class='pre'>scope</span> : Object (optional)<div class='sub-desc'><p>Function call scope.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.UI.JQEventAttachment\" rel=\"JW.UI.JQEventAttachment\" class=\"docClass\">JW.UI.JQEventAttachment</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor invocation method. ...</div><div class='long'><p>Class destructor invocation method. Destroys all aggregated objects and calls <a href=\"#!/api/JW.Class-method-destroyObject\" rel=\"JW.Class-method-destroyObject\" class=\"docClass\">destroyObject</a> method.\nYou must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor\ncalling. Alternatively (and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate this object inside some another.</p>\n\n<pre><code>var object = new MyClass();\n\n// ...\n\n// Once object is not needed anymore, destroy it\nobject.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>You can override this method in a subclass to do some preliminary work before aggregated objects destruction.\nFor example, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> overrides this method to remove child components before their destruction,\nbefore child components are usually aggregated inside the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroyObject' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroyObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroyObject' class='name expandable'>destroyObject</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor implementation. ...</div><div class='long'><p>Class destructor implementation. Called inside <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a> method after aggregated objects destruction.\nThe logic of class instance destruction should be implemented here. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroyObject: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});