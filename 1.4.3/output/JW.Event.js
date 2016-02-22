Ext.data.JsonP.JW_Event({"tagname":"class","name":"JW.Event","autodetected":{},"files":[{"filename":"event.js","href":"event2.html#JW-Event"}],"extends":"JW.Class","members":[{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.Event","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"bind","tagname":"method","owner":"JW.Event","id":"method-bind","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"destroyObject","tagname":"method","owner":"JW.Class","id":"method-destroyObject","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}},{"name":"purge","tagname":"method","owner":"JW.Event","id":"method-purge","meta":{}},{"name":"trigger","tagname":"method","owner":"JW.Event","id":"method-trigger","meta":{}},{"name":"unbind","tagname":"method","owner":"JW.Event","id":"method-unbind","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.Event","short_doc":"&lt;P&gt;\n\nUsed to notify some objects (clients) about some events (for example, about some field value change). ...","component":false,"superclasses":["JW.Class"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.Event</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/event2.html#JW-Event' target='_blank'>event.js</a></div></pre><div class='doc-contents'><p><code>&lt;P&gt;</code></p>\n\n<p>Used to notify some objects (clients) about some events (for example, about some field value change).</p>\n\n<p><strong>Notice:</strong> Remember to destroy the events and event listeners.</p>\n\n<p>Full example of class that triggers the events:</p>\n\n<pre><code>var Dispatcher = function() {\n    Dispatcher.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.items = [];\n    this.addEvent = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>()); // &lt;Dispatcher.EventParams&gt;\n    this.removeEvent = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>()); // &lt;Dispatcher.EventParams&gt;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Dispatcher, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    addItem: function(item, index) {\n        this.items.splice(index, 0, item);\n        this.addEvent.<a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a>({sender: this, item: item, index: index});\n    },\n\n    removeItem: function(index) {\n        var item = this.items.splice(index, 1)[0];\n        this.removeEvent.<a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a>({sender: this, item: item, index: index});\n    }\n});\n\n// interface Dispatcher.EventParams {\n//     Dispatcher sender;\n//     Object item;\n//     number index;\n// }\n</code></pre>\n\n<p>Full example of these events listening:</p>\n\n<pre><code>var Client = function(dispatcher) {\n    Client.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(dispatcher.addEvent.<a href=\"#!/api/JW.Event-method-bind\" rel=\"JW.Event-method-bind\" class=\"docClass\">bind</a>(this._onAdd, this));\n    this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(dispatcher.removeEvent.<a href=\"#!/api/JW.Event-method-bind\" rel=\"JW.Event-method-bind\" class=\"docClass\">bind</a>(this._onRemove, this));\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Client, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    _onAdd: function(params) {\n        console.log(params.item, \" item is added at \", params.index);\n    },\n\n    _onRemove: function(params) {\n        console.log(params.item, \" item is removed at \", params.index);\n    }\n});\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Event'>JW.Event</span><br/><a href='source/event2.html#JW-Event-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.Event-method-constructor' class='name expandable'>JW.Event</a>( <span class='pre'></span> ) : <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-bind' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Event'>JW.Event</span><br/><a href='source/event2.html#JW-Event-method-bind' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Event-method-bind' class='name expandable'>bind</a>( <span class='pre'>callback, scope</span> ) : <a href=\"#!/api/JW.EventAttachment\" rel=\"JW.EventAttachment\" class=\"docClass\">JW.EventAttachment</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Starts listening the event. ...</div><div class='long'><p>Starts listening the event.</p>\n\n<p>Whenever the event will be triggered with <a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a> method, specified handler function\nwill be called in specified scope.</p>\n\n<p>You can stop listening the event by destroying the returned <a href=\"#!/api/JW.EventAttachment\" rel=\"JW.EventAttachment\" class=\"docClass\">JW.EventAttachment</a> instance.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : Function<div class='sub-desc'><p><code>callback(params: P): void</code></p>\n\n<p>Event handler function.</p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p><code>callback</code> call scope.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.EventAttachment\" rel=\"JW.EventAttachment\" class=\"docClass\">JW.EventAttachment</a></span><div class='sub-desc'><p><code>&lt;P&gt;</code> Event attachment object.</p>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor invocation method. ...</div><div class='long'><p>Class destructor invocation method. Destroys all aggregated objects and calls <a href=\"#!/api/JW.Class-method-destroyObject\" rel=\"JW.Class-method-destroyObject\" class=\"docClass\">destroyObject</a> method.\nYou must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor\ncalling. Alternatively (and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate this object inside some another.</p>\n\n<pre><code>var object = new MyClass();\n\n// ...\n\n// Once object is not needed anymore, destroy it\nobject.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>You can override this method in a subclass to do some preliminary work before aggregated objects destruction.\nFor example, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> overrides this method to remove child components before their destruction,\nbefore child components are usually aggregated inside the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroyObject' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroyObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroyObject' class='name expandable'>destroyObject</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor implementation. ...</div><div class='long'><p>Class destructor implementation. Called inside <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a> method after aggregated objects destruction.\nThe logic of class instance destruction should be implemented here. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroyObject: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div><div id='method-purge' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Event'>JW.Event</span><br/><a href='source/event2.html#JW-Event-method-purge' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Event-method-purge' class='name expandable'>purge</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Unbinds all event handlers. ...</div><div class='long'><p>Unbinds all event handlers. Called automatically in event destructor.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-trigger' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Event'>JW.Event</span><br/><a href='source/event2.html#JW-Event-method-trigger' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Event-method-trigger' class='name expandable'>trigger</a>( <span class='pre'>params</span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Triggers event, i.e. ...</div><div class='long'><p>Triggers event, i.e. calls all bound handlers.</p>\n\n<pre><code>this.myEvent.<a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a>({sender: this});\n</code></pre>\n\n<p>This way, we've called all handlers of <code>myEvent</code> with argument <code>{sender: this}</code>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>params</span> : P<div class='sub-desc'><p>Event params.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-unbind' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Event'>JW.Event</span><br/><a href='source/event2.html#JW-Event-method-unbind' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Event-method-unbind' class='name expandable'>unbind</a>( <span class='pre'>attachment</span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Stops listening the event with specific handler. ...</div><div class='long'><p>Stops listening the event with specific handler.</p>\n\n<p>Equivalent to <code>attachment.destroy()</code>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attachment</span> : <a href=\"#!/api/JW.EventAttachment\" rel=\"JW.EventAttachment\" class=\"docClass\">JW.EventAttachment</a><div class='sub-desc'><p><code>&lt;P&gt;</code> Event attachment.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});