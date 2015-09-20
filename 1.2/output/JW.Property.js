Ext.data.JsonP.JW_Property({"tagname":"class","name":"JW.Property","autodetected":{},"files":[{"filename":"property.js","href":"property2.html#JW-Property"}],"extends":"JW.Class","members":[{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.Property","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"bindTo","tagname":"method","owner":"JW.Property","id":"method-bindTo","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"get","tagname":"method","owner":"JW.Property","id":"method-get","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}},{"name":"ownValue","tagname":"method","owner":"JW.Property","id":"method-ownValue","meta":{"chainable":true}},{"name":"set","tagname":"method","owner":"JW.Property","id":"method-set","meta":{}},{"name":"changeEvent","tagname":"event","owner":"JW.Property","id":"event-changeEvent","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.Property","short_doc":"&lt;V&gt; The observable property. ...","component":false,"superclasses":["JW.Class"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.Property</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/property2.html#JW-Property' target='_blank'>property.js</a></div></pre><div class='doc-contents'><p><code>&lt;V&gt;</code> The observable property. A convenient way to keep one object in sync\nwith another object. Has next helpers:</p>\n\n<ul>\n<li><a href=\"#!/api/JW.Copier\" rel=\"JW.Copier\" class=\"docClass\">JW.Copier</a> - keeps one property equal to another property</li>\n<li><a href=\"#!/api/JW.Updater\" rel=\"JW.Updater\" class=\"docClass\">JW.Updater</a> - watches several properties in order to update something by\na callback</li>\n<li><a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a> - watches several properties in order to reassign target\nproperty value to a callback result</li>\n<li><a href=\"#!/api/JW.Mapper\" rel=\"JW.Mapper\" class=\"docClass\">JW.Mapper</a> - watches several properties in order to recreate and destroy\ntarget property value by callbacks</li>\n<li><a href=\"#!/api/JW.Switcher\" rel=\"JW.Switcher\" class=\"docClass\">JW.Switcher</a> - watches a property to initialize and release its value</li>\n<li><a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a> - watches a string property and updates the text in a\nDOM element</li>\n<li><a href=\"#!/api/JW.UI.HtmlUpdater\" rel=\"JW.UI.HtmlUpdater\" class=\"docClass\">JW.UI.HtmlUpdater</a> - watches a string property and updates the HTML in a\nDOM element</li>\n<li><a href=\"#!/api/JW.UI.ValueUpdater\" rel=\"JW.UI.ValueUpdater\" class=\"docClass\">JW.UI.ValueUpdater</a> - watches a string property and updates the value in a\nDOM element</li>\n<li><a href=\"#!/api/JW.UI.AttrUpdater\" rel=\"JW.UI.AttrUpdater\" class=\"docClass\">JW.UI.AttrUpdater</a> - watches a string property and updates the specified\nattribute in a DOM element</li>\n<li><a href=\"#!/api/JW.UI.PropUpdater\" rel=\"JW.UI.PropUpdater\" class=\"docClass\">JW.UI.PropUpdater</a> - watches a boolean property and updates the specified\nDOM property in a DOM element</li>\n<li><a href=\"#!/api/JW.UI.CssUpdater\" rel=\"JW.UI.CssUpdater\" class=\"docClass\">JW.UI.CssUpdater</a> - watches a string property and updates the specified\nCSS style in a DOM element</li>\n<li><a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a> - watches a boolean property and updates the specified\nCSS class presence in a DOM element</li>\n<li><a href=\"#!/api/JW.UI.ClassNameUpdater\" rel=\"JW.UI.ClassNameUpdater\" class=\"docClass\">JW.UI.ClassNameUpdater</a> - watches a string property and updates\nthe CSS class name in the DOM element</li>\n<li><a href=\"#!/api/JW.UI.VisibleUpdater\" rel=\"JW.UI.VisibleUpdater\" class=\"docClass\">JW.UI.VisibleUpdater</a> - watches a boolean property and updates visibility\nof the specified DOM element</li>\n<li><a href=\"#!/api/JW.UI.RadioUpdater\" rel=\"JW.UI.RadioUpdater\" class=\"docClass\">JW.UI.RadioUpdater</a> - watches a string property and updates the selection\nof DOM radio elements</li>\n<li><a href=\"#!/api/JW.UI.ValueListener\" rel=\"JW.UI.ValueListener\" class=\"docClass\">JW.UI.ValueListener</a> - watches the value in a DOM text input and updates a\nstring property</li>\n<li><a href=\"#!/api/JW.UI.CheckedListener\" rel=\"JW.UI.CheckedListener\" class=\"docClass\">JW.UI.CheckedListener</a> - watches the value in a DOM checkbox element and\nupdates a boolean property</li>\n<li><a href=\"#!/api/JW.UI.RadioListener\" rel=\"JW.UI.RadioListener\" class=\"docClass\">JW.UI.RadioListener</a> - watches the selection of DOM radio elements and\nupdates a string property</li>\n</ul>\n\n\n<p>For example, you can use the next algorithm to change localization on fly\nin your Web application:</p>\n\n<pre><code>var locale = {\n    en: {\n        hi: \"Hi\",\n        bye: \"Bye\"\n    },\n    ru: {\n        hi: \"Привет\",\n        bye: \"Пока\"\n    }\n};\nvar language = new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(\"en\");\nvar hiFunctor = new <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a>([ language ], function(language) {\n    return locale[language].hi;\n});\nvar byeFunctor = new <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a>([ language ], function(language) {\n    return locale[language].bye;\n});\nnew <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>($(\"#hi\"), hiFunctor.<a href=\"#!/api/JW.Functor-property-target\" rel=\"JW.Functor-property-target\" class=\"docClass\">target</a>);\nnew <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>($(\"#bye\"), byeFunctor.<a href=\"#!/api/JW.Functor-property-target\" rel=\"JW.Functor-property-target\" class=\"docClass\">target</a>);\n// Now you can change localization easily\nlanguage.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(\"ru\");\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Property'>JW.Property</span><br/><a href='source/property2.html#JW-Property-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.Property-method-constructor' class='name expandable'>JW.Property</a>( <span class='pre'>value</span> ) : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : V<div class='sub-desc'><p>Initial value.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-bindTo' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Property'>JW.Property</span><br/><a href='source/property2.html#JW-Property-method-bindTo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Property-method-bindTo' class='name expandable'>bindTo</a>( <span class='pre'>source</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Binds this property to another property using a JW.Copier. ...</div><div class='long'><p>Binds this property to another property using a <a href=\"#!/api/JW.Copier\" rel=\"JW.Copier\" class=\"docClass\">JW.Copier</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><div class='sub-desc'><p><code>&lt;V&gt;</code> Source property to bind to.</p>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor. ...</div><div class='long'><p>Class destructor. The logic of class instance destruction should be implemented here. You must call this method\nexplicitly from outside, because JavaScript doesn't support automatic class destructor calling. Alternatively\n(and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate objects inside each other. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroy: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Property'>JW.Property</span><br/><a href='source/property2.html#JW-Property-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Property-method-get' class='name expandable'>get</a>( <span class='pre'></span> ) : V<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns property value. ...</div><div class='long'><p>Returns property value.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>V</span><div class='sub-desc'><p>Property value.</p>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div><div id='method-ownValue' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Property'>JW.Property</span><br/><a href='source/property2.html#JW-Property-method-ownValue' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Property-method-ownValue' class='name expandable'>ownValue</a>( <span class='pre'></span> ) : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Makes this property an owner of its value. ...</div><div class='long'><p>Makes this property an owner of its value. It means that the value will\nbe destroyed automatically on reassignment and on destruction of the\nproperty.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-set' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Property'>JW.Property</span><br/><a href='source/property2.html#JW-Property-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Property-method-set' class='name expandable'>set</a>( <span class='pre'>value</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Changes property value and triggers event changeEvent. ...</div><div class='long'><p>Changes property value and triggers event <a href=\"#!/api/JW.Property-event-changeEvent\" rel=\"JW.Property-event-changeEvent\" class=\"docClass\">changeEvent</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : V<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-event'>Events</h3><div class='subsection'><div id='event-changeEvent' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Property'>JW.Property</span><br/><a href='source/property2.html#JW-Property-event-changeEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Property-event-changeEvent' class='name expandable'>changeEvent</a>( <span class='pre'>params</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Property value is changed. ...</div><div class='long'><p>Property value is changed. Triggered in result of calling <a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a> method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>params</span> : <a href=\"#!/api/JW.ValueChangeEventParams\" rel=\"JW.ValueChangeEventParams\" class=\"docClass\">JW.ValueChangeEventParams</a><div class='sub-desc'><p><code>&lt;V&gt;</code> Parameters.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});