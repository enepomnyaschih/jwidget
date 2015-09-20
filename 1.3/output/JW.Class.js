Ext.data.JsonP.JW_Class({"tagname":"class","name":"JW.Class","autodetected":{},"files":[{"filename":"class.js","href":"class.html#JW-Class"}],"members":[{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"_super","tagname":"property","owner":"JW.Class","id":"static-property-_super","meta":{"static":true}},{"name":"prototype","tagname":"property","owner":"JW.Class","id":"static-property-prototype","meta":{"static":true}},{"name":"superclass","tagname":"property","owner":"JW.Class","id":"static-property-superclass","meta":{"static":true}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"destroyObject","tagname":"method","owner":"JW.Class","id":"method-destroyObject","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}},{"name":"extend","tagname":"method","owner":"JW.Class","id":"static-method-extend","meta":{"static":true}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.Class","short_doc":"The base class of all jWidget classes. ...","component":false,"superclasses":[],"subclasses":["JW.AbstractArray.IndexCount","JW.AbstractArray.IndexItems","JW.AbstractArray.Inserter","JW.AbstractArray.Merger","JW.AbstractArray.Reverser","JW.AbstractArray.SpliceParams","JW.AbstractArray.SpliceResult","JW.AbstractCollection","JW.AbstractCollection.Counter","JW.AbstractCollection.Filterer","JW.AbstractCollection.Indexer","JW.AbstractCollection.Lister","JW.AbstractCollection.Mapper","JW.AbstractCollection.Observer","JW.AbstractCollection.Orderer","JW.AbstractCollection.SorterComparing","JW.AbstractMap.Inserter","JW.AbstractMap.SpliceParams","JW.AbstractMap.SpliceResult","JW.AbstractSet.SpliceParams","JW.AbstractSet.SpliceResult","JW.Copier","JW.Event","JW.EventAttachment","JW.EventParams","JW.Functor","JW.Interval","JW.Mapper","JW.Plugins.Locale","JW.Plugins.Router","JW.Property","JW.Proxy","JW.Switcher","JW.Timeout","JW.UI.AttrUpdater","JW.UI.CheckedListener","JW.UI.ClassNameUpdater","JW.UI.ClassUpdater","JW.UI.Component","JW.UI.Component.Array","JW.UI.Component.Collection","JW.UI.Component.Replaceable","JW.UI.Component.Template","JW.UI.Component.TemplateOutput","JW.UI.CssUpdater","JW.UI.HtmlUpdater","JW.UI.Inserter","JW.UI.JQEventAttachment","JW.UI.PropUpdater","JW.UI.RadioListener","JW.UI.RadioUpdater","JW.UI.TextUpdater","JW.UI.ValueListener","JW.UI.ValueUpdater","JW.UI.VisibleUpdater","JW.Updater"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Subclasses</h4><div class='dependency'><a href='#!/api/JW.AbstractArray.IndexCount' rel='JW.AbstractArray.IndexCount' class='docClass'>JW.AbstractArray.IndexCount</a></div><div class='dependency'><a href='#!/api/JW.AbstractArray.IndexItems' rel='JW.AbstractArray.IndexItems' class='docClass'>JW.AbstractArray.IndexItems</a></div><div class='dependency'><a href='#!/api/JW.AbstractArray.Inserter' rel='JW.AbstractArray.Inserter' class='docClass'>JW.AbstractArray.Inserter</a></div><div class='dependency'><a href='#!/api/JW.AbstractArray.Merger' rel='JW.AbstractArray.Merger' class='docClass'>JW.AbstractArray.Merger</a></div><div class='dependency'><a href='#!/api/JW.AbstractArray.Reverser' rel='JW.AbstractArray.Reverser' class='docClass'>JW.AbstractArray.Reverser</a></div><div class='dependency'><a href='#!/api/JW.AbstractArray.SpliceParams' rel='JW.AbstractArray.SpliceParams' class='docClass'>JW.AbstractArray.SpliceParams</a></div><div class='dependency'><a href='#!/api/JW.AbstractArray.SpliceResult' rel='JW.AbstractArray.SpliceResult' class='docClass'>JW.AbstractArray.SpliceResult</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection' rel='JW.AbstractCollection' class='docClass'>JW.AbstractCollection</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.Counter' rel='JW.AbstractCollection.Counter' class='docClass'>JW.AbstractCollection.Counter</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.Filterer' rel='JW.AbstractCollection.Filterer' class='docClass'>JW.AbstractCollection.Filterer</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.Indexer' rel='JW.AbstractCollection.Indexer' class='docClass'>JW.AbstractCollection.Indexer</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.Lister' rel='JW.AbstractCollection.Lister' class='docClass'>JW.AbstractCollection.Lister</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.Mapper' rel='JW.AbstractCollection.Mapper' class='docClass'>JW.AbstractCollection.Mapper</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.Observer' rel='JW.AbstractCollection.Observer' class='docClass'>JW.AbstractCollection.Observer</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.Orderer' rel='JW.AbstractCollection.Orderer' class='docClass'>JW.AbstractCollection.Orderer</a></div><div class='dependency'><a href='#!/api/JW.AbstractCollection.SorterComparing' rel='JW.AbstractCollection.SorterComparing' class='docClass'>JW.AbstractCollection.SorterComparing</a></div><div class='dependency'><a href='#!/api/JW.AbstractMap.Inserter' rel='JW.AbstractMap.Inserter' class='docClass'>JW.AbstractMap.Inserter</a></div><div class='dependency'><a href='#!/api/JW.AbstractMap.SpliceParams' rel='JW.AbstractMap.SpliceParams' class='docClass'>JW.AbstractMap.SpliceParams</a></div><div class='dependency'><a href='#!/api/JW.AbstractMap.SpliceResult' rel='JW.AbstractMap.SpliceResult' class='docClass'>JW.AbstractMap.SpliceResult</a></div><div class='dependency'><a href='#!/api/JW.AbstractSet.SpliceParams' rel='JW.AbstractSet.SpliceParams' class='docClass'>JW.AbstractSet.SpliceParams</a></div><div class='dependency'><a href='#!/api/JW.AbstractSet.SpliceResult' rel='JW.AbstractSet.SpliceResult' class='docClass'>JW.AbstractSet.SpliceResult</a></div><div class='dependency'><a href='#!/api/JW.Copier' rel='JW.Copier' class='docClass'>JW.Copier</a></div><div class='dependency'><a href='#!/api/JW.Event' rel='JW.Event' class='docClass'>JW.Event</a></div><div class='dependency'><a href='#!/api/JW.EventAttachment' rel='JW.EventAttachment' class='docClass'>JW.EventAttachment</a></div><div class='dependency'><a href='#!/api/JW.EventParams' rel='JW.EventParams' class='docClass'>JW.EventParams</a></div><div class='dependency'><a href='#!/api/JW.Functor' rel='JW.Functor' class='docClass'>JW.Functor</a></div><div class='dependency'><a href='#!/api/JW.Interval' rel='JW.Interval' class='docClass'>JW.Interval</a></div><div class='dependency'><a href='#!/api/JW.Mapper' rel='JW.Mapper' class='docClass'>JW.Mapper</a></div><div class='dependency'><a href='#!/api/JW.Plugins.Locale' rel='JW.Plugins.Locale' class='docClass'>JW.Plugins.Locale</a></div><div class='dependency'><a href='#!/api/JW.Plugins.Router' rel='JW.Plugins.Router' class='docClass'>JW.Plugins.Router</a></div><div class='dependency'><a href='#!/api/JW.Property' rel='JW.Property' class='docClass'>JW.Property</a></div><div class='dependency'><a href='#!/api/JW.Proxy' rel='JW.Proxy' class='docClass'>JW.Proxy</a></div><div class='dependency'><a href='#!/api/JW.Switcher' rel='JW.Switcher' class='docClass'>JW.Switcher</a></div><div class='dependency'><a href='#!/api/JW.Timeout' rel='JW.Timeout' class='docClass'>JW.Timeout</a></div><div class='dependency'><a href='#!/api/JW.UI.AttrUpdater' rel='JW.UI.AttrUpdater' class='docClass'>JW.UI.AttrUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.CheckedListener' rel='JW.UI.CheckedListener' class='docClass'>JW.UI.CheckedListener</a></div><div class='dependency'><a href='#!/api/JW.UI.ClassNameUpdater' rel='JW.UI.ClassNameUpdater' class='docClass'>JW.UI.ClassNameUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.ClassUpdater' rel='JW.UI.ClassUpdater' class='docClass'>JW.UI.ClassUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.Component' rel='JW.UI.Component' class='docClass'>JW.UI.Component</a></div><div class='dependency'><a href='#!/api/JW.UI.Component.Array' rel='JW.UI.Component.Array' class='docClass'>JW.UI.Component.Array</a></div><div class='dependency'><a href='#!/api/JW.UI.Component.Collection' rel='JW.UI.Component.Collection' class='docClass'>JW.UI.Component.Collection</a></div><div class='dependency'><a href='#!/api/JW.UI.Component.Replaceable' rel='JW.UI.Component.Replaceable' class='docClass'>JW.UI.Component.Replaceable</a></div><div class='dependency'><a href='#!/api/JW.UI.Component.Template' rel='JW.UI.Component.Template' class='docClass'>JW.UI.Component.Template</a></div><div class='dependency'><a href='#!/api/JW.UI.Component.TemplateOutput' rel='JW.UI.Component.TemplateOutput' class='docClass'>JW.UI.Component.TemplateOutput</a></div><div class='dependency'><a href='#!/api/JW.UI.CssUpdater' rel='JW.UI.CssUpdater' class='docClass'>JW.UI.CssUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.HtmlUpdater' rel='JW.UI.HtmlUpdater' class='docClass'>JW.UI.HtmlUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.Inserter' rel='JW.UI.Inserter' class='docClass'>JW.UI.Inserter</a></div><div class='dependency'><a href='#!/api/JW.UI.JQEventAttachment' rel='JW.UI.JQEventAttachment' class='docClass'>JW.UI.JQEventAttachment</a></div><div class='dependency'><a href='#!/api/JW.UI.PropUpdater' rel='JW.UI.PropUpdater' class='docClass'>JW.UI.PropUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.RadioListener' rel='JW.UI.RadioListener' class='docClass'>JW.UI.RadioListener</a></div><div class='dependency'><a href='#!/api/JW.UI.RadioUpdater' rel='JW.UI.RadioUpdater' class='docClass'>JW.UI.RadioUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.TextUpdater' rel='JW.UI.TextUpdater' class='docClass'>JW.UI.TextUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.ValueListener' rel='JW.UI.ValueListener' class='docClass'>JW.UI.ValueListener</a></div><div class='dependency'><a href='#!/api/JW.UI.ValueUpdater' rel='JW.UI.ValueUpdater' class='docClass'>JW.UI.ValueUpdater</a></div><div class='dependency'><a href='#!/api/JW.UI.VisibleUpdater' rel='JW.UI.VisibleUpdater' class='docClass'>JW.UI.VisibleUpdater</a></div><div class='dependency'><a href='#!/api/JW.Updater' rel='JW.Updater' class='docClass'>JW.Updater</a></div><h4>Files</h4><div class='dependency'><a href='source/class.html#JW-Class' target='_blank'>class.js</a></div></pre><div class='doc-contents'><p>The base class of all jWidget classes. You can inherit your classes from <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> and its subclasses.</p>\n\n<p>Class inheritance sample:</p>\n\n<pre><code>// Constructor\nvar Shape = function(name) {\n    // Call superclass constructor\n    Shape.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    // Define fields\n    this.name = name;\n};\n\n// Inherit Shape from <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Shape, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    // string name;\n    // abstract number getArea();\n});\n\n// --------\n\nvar Rectangle = function(name, width, height) {\n    Rectangle.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this, name);\n    this.width = width;\n    this.height = height;\n    // For optimization, you should define all class fields (even null) in constructor\n    this.el = null;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Rectangle, Shape, {\n    // number width;\n    // number height;\n    // Element el;\n\n    // Destructor\n    <a href=\"#!/api/JW.Class-method-destroyObject\" rel=\"JW.Class-method-destroyObject\" class=\"docClass\">destroyObject</a>: function() {\n        // Release resources\n        if (this.el) {\n            this.el.remove();\n        }\n        // Call superclass destructor\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n    },\n\n    // Override method\n    getArea: function() {\n        return this.width * this.height;\n    },\n\n    getElement: function() {\n        if (!this.el) {\n            this.el = jQuery('&lt;div&gt;&lt;/div&gt;');\n            this.el.width(this.width);\n            this.el.height(this.height);\n        }\n        return this.el;\n    }\n});\n</code></pre>\n\n<p>jWidget classes support object aggregation feature. If you register object A\nas aggregated by object B using method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>, it means that\nobject A will be destroyed automatically on object B destruction.</p>\n\n<pre><code>var Door = function() {\n    Door.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.knockEvent = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>());\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Door, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>);\n</code></pre>\n\n<p>Aggregated objects are destroyed in reversive order.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance properties</h3><div id='property-_iid' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static properties</h3><div id='static-property-_super' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-static-property-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-static-property-_super' class='name expandable'>_super</a> : Function<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Superclass. ...</div><div class='long'><p>Superclass. Thanks to this static field, you can call superclass constructor:</p>\n\n<pre><code>var MyClass = function() {\n    MyClass.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(MyClass, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>);\n</code></pre>\n\n<p>All classes inherited from <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> gain this field automatically.</p>\n</div></div></div><div id='static-property-prototype' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-static-property-prototype' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-static-property-prototype' class='name expandable'>prototype</a> : Object<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'><p>Class prototype.</p>\n</div><div class='long'><p>Class prototype.</p>\n</div></div></div><div id='static-property-superclass' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-static-property-superclass' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-static-property-superclass' class='name expandable'>superclass</a> : Object<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Superclass prototype. ...</div><div class='long'><p>Superclass prototype.</p>\n\n<p>All classes inherited from <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> gain this field automatically.</p>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance methods</h3><div id='method-_super' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor invocation method. ...</div><div class='long'><p>Class destructor invocation method. Destroys all aggregated objects and calls <a href=\"#!/api/JW.Class-method-destroyObject\" rel=\"JW.Class-method-destroyObject\" class=\"docClass\">destroyObject</a> method.\nYou must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor\ncalling. Alternatively (and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate this object inside some another.</p>\n\n<pre><code>var object = new MyClass();\n\n// ...\n\n// Once object is not needed anymore, destroy it\nobject.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>You can override this method in a subclass to do some preliminary work before aggregated objects destruction.\nFor example, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> overrides this method to remove child components before their destruction,\nbefore child components are usually aggregated inside the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroyObject' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-method-destroyObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroyObject' class='name expandable'>destroyObject</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor implementation. ...</div><div class='long'><p>Class destructor implementation. Called inside <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a> method after aggregated objects destruction.\nThe logic of class instance destruction should be implemented here. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroyObject: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static methods</h3><div id='static-method-extend' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Class'>JW.Class</span><br/><a href='source/class.html#JW-Class-static-method-extend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-static-method-extend' class='name expandable'>extend</a>( <span class='pre'>body</span> ) : Function<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Shortcut of empty constructor definition and JW.extend calling. ...</div><div class='long'><p>Shortcut of empty constructor definition and <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> calling. Example:</p>\n\n<pre><code>var MyClass = BaseClass.<a href=\"#!/api/JW.Class-static-method-extend\" rel=\"JW.Class-static-method-extend\" class=\"docClass\">extend</a>({ ... });\n</code></pre>\n\n<p>Equivalent code:</p>\n\n<pre><code>var MyClass = function() {\n    MyClass.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.apply(this, arguments);\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(MyClass, BaseClass, { ... });\n</code></pre>\n\n<p>Though this method is not recommended because it messes up stack traces a bit.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>body</span> : Object<div class='sub-desc'><p>Subclass body.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function</span><div class='sub-desc'><p>Subclass.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});