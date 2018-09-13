Ext.data.JsonP.JW_Plugins_Router({"tagname":"class","name":"JW.Plugins.Router","autodetected":{},"files":[{"filename":"router.js","href":"router.html#JW-Plugins-Router"}],"extends":"JW.Class","members":[{"name":"handler","tagname":"cfg","owner":"JW.Plugins.Router","id":"cfg-handler","meta":{}},{"name":"path","tagname":"cfg","owner":"JW.Plugins.Router","id":"cfg-path","meta":{}},{"name":"scope","tagname":"cfg","owner":"JW.Plugins.Router","id":"cfg-scope","meta":{}},{"name":"separator","tagname":"cfg","owner":"JW.Plugins.Router","id":"cfg-separator","meta":{}},{"name":"target","tagname":"cfg","owner":"JW.Plugins.Router","id":"cfg-target","meta":{}},{"name":"_iid","tagname":"property","owner":"JW.Class","id":"property-_iid","meta":{}},{"name":"constructor","tagname":"property","owner":"JW.Class","id":"property-constructor","meta":{}},{"name":"route","tagname":"property","owner":"JW.Plugins.Router","id":"property-route","meta":{}},{"name":"target","tagname":"property","owner":"JW.Plugins.Router","id":"property-target","meta":{}},{"name":"constructor","tagname":"method","owner":"JW.Plugins.Router","id":"method-constructor","meta":{}},{"name":"_super","tagname":"method","owner":"JW.Class","id":"method-_super","meta":{}},{"name":"destroy","tagname":"method","owner":"JW.Class","id":"method-destroy","meta":{}},{"name":"destroyObject","tagname":"method","owner":"JW.Class","id":"method-destroyObject","meta":{}},{"name":"own","tagname":"method","owner":"JW.Class","id":"method-own","meta":{}},{"name":"update","tagname":"method","owner":"JW.Plugins.Router","id":"method-update","meta":{}},{"name":"makeHandler","tagname":"method","owner":"JW.Plugins.Router","id":"static-method-makeHandler","meta":{"static":true}},{"name":"makeSeparator","tagname":"method","owner":"JW.Plugins.Router","id":"static-method-makeSeparator","meta":{"static":true}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.Plugins.Router","short_doc":"URL router. ...","component":false,"superclasses":["JW.Class"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/JW.Class' rel='JW.Class' class='docClass'>JW.Class</a><div class='subclass '><strong>JW.Plugins.Router</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/router.html#JW-Plugins-Router' target='_blank'>router.js</a></div></pre><div class='doc-contents'><p>URL router. Converts incoming URL part (hash or pathname) to a target object and passes tail string to it\nfor further routing.</p>\n\n<p>Router takes an incoming string <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a> (for example, <a href=\"#!/api/JW.UI-static-property-hash\" rel=\"JW.UI-static-property-hash\" class=\"docClass\">JW.UI.hash</a>), parses it and provides an outcoming\n<a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>. Outcoming property may contain any object you want. If it implements <a href=\"#!/api/JW.Plugins.Router.Routable\" rel=\"JW.Plugins.Router.Routable\" class=\"docClass\">JW.Plugins.Router.Routable</a>\ninterface (i.e. has <a href=\"#!/api/JW.Plugins.Router.Routable-method-setPath\" rel=\"JW.Plugins.Router.Routable-method-setPath\" class=\"docClass\">setPath</a> method), path tail is passed to it\nfor further routing. It is convenient to use a nested router object to process path tail as well.</p>\n\n<p>Example:</p>\n\n<iframe style=\"border: 1px solid green; padding: 10px;\" width=\"600\" height=\"300\" src=\"http://enepomnyaschih.github.io/mt/1.3/router.html\"></iframe>\n\n\n<p>Source code of the example is not minified so you can review it using \"View source code of the frame\" context\nmenu item in your browser.</p>\n\n<p>In this example, <a href=\"#!/api/JW.UI-static-property-hash\" rel=\"JW.UI-static-property-hash\" class=\"docClass\">JW.UI.hash</a> is passed to Application's router object, and it builds a target property containing\na child component to render:</p>\n\n<ul>\n<li>\"inbox/*\" URL is mapped to Inbox component</li>\n<li>\"compose/*\" URL is mapped to Compose component</li>\n<li>\"settings/*\" URL is mapped to Settings component</li>\n<li>blank URL is mapped to a simple <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> as a blank page placeholder</li>\n<li>any other URL is mapped to NotFound component</li>\n</ul>\n\n\n<p>Code:</p>\n\n<pre><code><a href=\"#!/api/JW.UI.Component-method-beforeRender\" rel=\"JW.UI.Component-method-beforeRender\" class=\"docClass\">beforeRender</a>: function(el) {\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n    this.router = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Plugins.Router\" rel=\"JW.Plugins.Router\" class=\"docClass\">JW.Plugins.Router</a>({\n        <a href=\"#!/api/JW.Plugins.Router-cfg-path\" rel=\"JW.Plugins.Router-cfg-path\" class=\"docClass\">path</a>: <a href=\"#!/api/JW.UI-static-property-hash\" rel=\"JW.UI-static-property-hash\" class=\"docClass\">JW.UI.hash</a>,\n        <a href=\"#!/api/JW.Plugins.Router-cfg-handler\" rel=\"JW.Plugins.Router-cfg-handler\" class=\"docClass\">handler</a>: {\n            <a href=\"#!/api/JW.Plugins.Router.Handler-cfg-routes\" rel=\"JW.Plugins.Router.Handler-cfg-routes\" class=\"docClass\">routes</a>: {\n                \"inbox\"   : function() { return new Inbox();           },\n                \"compose\" : function() { return new Compose();         },\n                \"settings\": function() { return new Settings();        },\n                \"\"        : function() { return new <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>(); }\n            },\n            <a href=\"#!/api/JW.Plugins.Router.Handler-cfg-notFound\" rel=\"JW.Plugins.Router.Handler-cfg-notFound\" class=\"docClass\">notFound</a>: function(route) { return new NotFound(route); }\n        },\n        <a href=\"#!/api/JW.Plugins.Router-cfg-scope\" rel=\"JW.Plugins.Router-cfg-scope\" class=\"docClass\">scope</a>: this\n    }));\n},\n\nrenderPage: function() {\n    return this.router.target;\n},\n</code></pre>\n\n<p>Inbox implements <a href=\"#!/api/JW.Plugins.Router.Routable\" rel=\"JW.Plugins.Router.Routable\" class=\"docClass\">JW.Plugins.Router.Routable</a> interface, and therefore provides further routing for all\n\"inbox/*\" URL's. Applacation router passes URL tail string to\nInbox.<a href=\"#!/api/JW.Plugins.Router.Routable-method-setPath\" rel=\"JW.Plugins.Router.Routable-method-setPath\" class=\"docClass\">setPath</a> method to do that.</p>\n\n<ul>\n<li>\"inbox\" URL is mapped to EmailList component</li>\n<li>\"inbox/&lt;id&gt;\" URL is mapped to Email component if an email with such ID exists</li>\n<li>\"inbox/&lt;id&gt;\" URL is mapped to EmailNotFound component if there's no email with such ID</li>\n</ul>\n\n\n<p>Code:</p>\n\n<pre><code>renderContent: function() {\n    return this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Plugins.Router\" rel=\"JW.Plugins.Router\" class=\"docClass\">JW.Plugins.Router</a>({\n        <a href=\"#!/api/JW.Plugins.Router-cfg-path\" rel=\"JW.Plugins.Router-cfg-path\" class=\"docClass\">path</a>: this.path,\n        <a href=\"#!/api/JW.Plugins.Router-cfg-handler\" rel=\"JW.Plugins.Router-cfg-handler\" class=\"docClass\">handler</a>: function(id) {\n            if (!id) {\n                return new EmailList(this.emails);\n            }\n            var email = this.emails.search(<a href=\"#!/api/JW-static-method-byValue\" rel=\"JW-static-method-byValue\" class=\"docClass\">JW.byValue</a>(\"id\", id));\n            return (email != null) ? new Email(email) : new EmailNotFound(id);\n        },\n        <a href=\"#!/api/JW.Plugins.Router-cfg-scope\" rel=\"JW.Plugins.Router-cfg-scope\" class=\"docClass\">scope</a>: this\n    })).<a href=\"#!/api/JW.Plugins.Router-property-target\" rel=\"JW.Plugins.Router-property-target\" class=\"docClass\">target</a>;\n},\n\n<a href=\"#!/api/JW.Plugins.Router.Routable-method-setPath\" rel=\"JW.Plugins.Router.Routable-method-setPath\" class=\"docClass\">setPath</a>: function(path) {\n    this.path.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(path);\n}\n</code></pre>\n\n<p>Routing is performed in three steps:</p>\n\n<ul>\n<li>Incoming path string is parsed using <a href=\"#!/api/JW.Plugins.Router-cfg-separator\" rel=\"JW.Plugins.Router-cfg-separator\" class=\"docClass\">separator</a> callback into two tokens:\nroute and argument. Route will be used to process this single routing step, and argument will be passed to a\n<a href=\"#!/api/JW.Plugins.Router-property-target\" rel=\"JW.Plugins.Router-property-target\" class=\"docClass\">target</a> for further routing. Make sure that separator never returns two\nroutes which have the same target. For example, if both \"\" and \"inbox\"\nlead to Inbox component, make sure that separator function returns the same route for them, for example, \"\".\nOtherwise, expect your target component to be recreated when user switches back and forth between \"\" and \"inbox\".\nIf separator function returns null or undefined route, it is automatically mapped to blank string.\nSeparator can be specified as a string. In this case, it is passed to <a href=\"#!/api/JW.Plugins.Router-static-method-makeSeparator\" rel=\"JW.Plugins.Router-static-method-makeSeparator\" class=\"docClass\">JW.Plugins.Router.makeSeparator</a>\nmethod - see it for more details. Separator defaults to \"/\".</li>\n<li>The route returned by separator is assigned to <a href=\"#!/api/JW.Plugins.Router-property-route\" rel=\"JW.Plugins.Router-property-route\" class=\"docClass\">route</a> property. If it\nis changed, the next steps are following:<ul>\n<li>Null is assigned to <a href=\"#!/api/JW.Plugins.Router-property-target\" rel=\"JW.Plugins.Router-property-target\" class=\"docClass\">target</a> property</li>\n<li>Previous target is being destroyed</li>\n<li><a href=\"#!/api/JW.Plugins.Router-cfg-handler\" rel=\"JW.Plugins.Router-cfg-handler\" class=\"docClass\">handler</a> function is called to build a new target</li>\n<li>Result is assigned to <a href=\"#!/api/JW.Plugins.Router-property-target\" rel=\"JW.Plugins.Router-property-target\" class=\"docClass\">target</a> property</li></ul></li>\n<li>If target implements <a href=\"#!/api/JW.Plugins.Router.Routable\" rel=\"JW.Plugins.Router.Routable\" class=\"docClass\">JW.Plugins.Router.Routable</a> interface, its <a href=\"#!/api/JW.Plugins.Router.Routable-method-setPath\" rel=\"JW.Plugins.Router.Routable-method-setPath\" class=\"docClass\">setPath</a>\nmethod is called with an argument string provided by separator callback</li>\n</ul>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-handler' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-cfg-handler' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-cfg-handler' class='name expandable'>handler</a> : Function|<a href=\"#!/api/JW.Plugins.Router.Handler\" rel=\"JW.Plugins.Router.Handler\" class=\"docClass\">JW.Plugins.Router.Handler</a><span class=\"signature\"></span></div><div class='description'><div class='short'>handler(route: string): JW.Plugins.Router.Routable\n\nRoute handler. ...</div><div class='long'><p><code>handler(route: string): <a href=\"#!/api/JW.Plugins.Router.Routable\" rel=\"JW.Plugins.Router.Routable\" class=\"docClass\">JW.Plugins.Router.Routable</a></code></p>\n\n<p>Route handler. Creates a routable object by route string.</p>\n\n<p>Example:</p>\n\n<pre><code>handler: function(route) {\n    var doc = this.docs.get(route);\n    return doc ? doc.createView(this.data) : new Page404(route);\n},\nscope: this\n</code></pre>\n\n<p>Handler can be specified as an object matching <a href=\"#!/api/JW.Plugins.Router.Handler\" rel=\"JW.Plugins.Router.Handler\" class=\"docClass\">JW.Plugins.Router.Handler</a> interface.\nIn this case, it is built with <a href=\"#!/api/JW.Plugins.Router-static-method-makeHandler\" rel=\"JW.Plugins.Router-static-method-makeHandler\" class=\"docClass\">JW.Plugins.Router.makeHandler</a> method - see it for more details.</p>\n\n<p>Default handler function returns null no matter what which makes no sense. Please specify always.</p>\n</div></div></div><div id='cfg-path' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-cfg-path' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-cfg-path' class='name expandable'>path</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'>&lt;string&gt; Source path string. ...</div><div class='long'><p><code>&lt;string&gt;</code> Source path string. If omitted, router creates and aggregates this property\nautomatically.</p>\n</div></div></div><div id='cfg-scope' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-cfg-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-cfg-scope' class='name expandable'>scope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Call scope for <a href=\"#!/api/JW.Plugins.Router-cfg-separator\" rel=\"JW.Plugins.Router-cfg-separator\" class=\"docClass\">separator</a> and <a href=\"#!/api/JW.Plugins.Router-cfg-handler\" rel=\"JW.Plugins.Router-cfg-handler\" class=\"docClass\">handler</a>.</p>\n</div><div class='long'><p>Call scope for <a href=\"#!/api/JW.Plugins.Router-cfg-separator\" rel=\"JW.Plugins.Router-cfg-separator\" class=\"docClass\">separator</a> and <a href=\"#!/api/JW.Plugins.Router-cfg-handler\" rel=\"JW.Plugins.Router-cfg-handler\" class=\"docClass\">handler</a>.</p>\n</div></div></div><div id='cfg-separator' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-cfg-separator' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-cfg-separator' class='name expandable'>separator</a> : Function|string<span class=\"signature\"></span></div><div class='description'><div class='short'>separator(path: string): string|Array&lt;string&gt;\n\nPath separator. ...</div><div class='long'><p><code>separator(path: string): string|Array&lt;string&gt;</code></p>\n\n<p>Path separator. Parses incoming path to two tokens: route and argument. Route will be used to process this\nsingle routing step, and argument will be passed to a <a href=\"#!/api/JW.Plugins.Router-property-target\" rel=\"JW.Plugins.Router-property-target\" class=\"docClass\">target</a> for further routing.</p>\n\n<p>Make sure that separator never returns two routes which have the same target. For example, if both \"\" and \"inbox\"\nlead to Inbox component, make sure that separator function returns the same route for them, for example, \"\".\nOtherwise, expect your target component to be recreated when user switches back and forth between \"\" and \"inbox\".</p>\n\n<p>If separator function returns null or undefined route, it is automatically mapped to blank string.</p>\n\n<p>Separator can be specified as a string. In this case, it is built with <a href=\"#!/api/JW.Plugins.Router-static-method-makeSeparator\" rel=\"JW.Plugins.Router-static-method-makeSeparator\" class=\"docClass\">JW.Plugins.Router.makeSeparator</a>\nmethod - see it for more details.</p>\n\n<p>Defaults to \"/\".</p>\n</div></div></div><div id='cfg-target' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-cfg-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'>&lt;JW.Plugins.Router.Routable&gt; Target routable object. ...</div><div class='long'><p><code>&lt;<a href=\"#!/api/JW.Plugins.Router.Routable\" rel=\"JW.Plugins.Router.Routable\" class=\"docClass\">JW.Plugins.Router.Routable</a>&gt;</code> Target routable object. If omitted, router creates and\naggregates this property automatically.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_iid' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-_iid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-_iid' class='name expandable'>_iid</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Instance ID. ...</div><div class='long'><p>Instance ID.</p>\n\n<p>Auto-incremental object unique ID. Each <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> instance gets such identifier.\nUsed in <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a> as map key for quick item access.</p>\n</div></div></div><div id='property-constructor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-property-constructor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-property-constructor' class='name expandable'>constructor</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor as class. ...</div><div class='long'><p>Constructor as class. If you have an object, you can get its class using this field.</p>\n</div></div></div><div id='property-route' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-property-route' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-property-route' class='name expandable'>route</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'>&lt;string&gt; Current route. ...</div><div class='long'><p><code>&lt;string&gt;</code> Current route. Read-only.</p>\n</div></div></div><div id='property-target' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-property-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-property-target' class='name expandable'>target</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><code>&lt;<a href=\"#!/api/JW.Plugins.Router.Routable\" rel=\"JW.Plugins.Router.Routable\" class=\"docClass\">JW.Plugins.Router.Routable</a>&gt;</code> Target routable object.</p>\n</div><div class='long'><p><code>&lt;<a href=\"#!/api/JW.Plugins.Router.Routable\" rel=\"JW.Plugins.Router.Routable\" class=\"docClass\">JW.Plugins.Router.Routable</a>&gt;</code> Target routable object.</p>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance methods</h3><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/JW.Plugins.Router-method-constructor' class='name expandable'>JW.Plugins.Router</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/JW.Plugins.Router\" rel=\"JW.Plugins.Router\" class=\"docClass\">JW.Plugins.Router</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration (see Config options).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Plugins.Router\" rel=\"JW.Plugins.Router\" class=\"docClass\">JW.Plugins.Router</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_super' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-_super' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-_super' class='name expandable'>_super</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>This method is available only inside class methods that were passed into JW.extend method. ...</div><div class='long'><p>This method is available only inside class methods that were passed into <a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a> method.\nThis method is an easy way of the same superclass method calling:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>(a, b) + c;\n}\n...\n</code></pre>\n\n<p>Equivalent code without <a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a> usage:</p>\n\n<pre><code>...\n// Class method\nmyMethod: function(a, b, c) {\n    return MyClass.<a href=\"#!/api/JW.Class-static-property-superclass\" rel=\"JW.Class-static-property-superclass\" class=\"docClass\">superclass</a>.myMethod.call(this, a, b) + c;\n}\n...\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor invocation method. ...</div><div class='long'><p>Class destructor invocation method. Destroys all aggregated objects and calls <a href=\"#!/api/JW.Class-method-destroyObject\" rel=\"JW.Class-method-destroyObject\" class=\"docClass\">destroyObject</a> method.\nYou must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor\ncalling. Alternatively (and optimally), you should use method <a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a> to aggregate this object inside some another.</p>\n\n<pre><code>var object = new MyClass();\n\n// ...\n\n// Once object is not needed anymore, destroy it\nobject.<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>();\n</code></pre>\n\n<p>You can override this method in a subclass to do some preliminary work before aggregated objects destruction.\nFor example, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> overrides this method to remove child components before their destruction,\nbefore child components are usually aggregated inside the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroyObject' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-destroyObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-destroyObject' class='name expandable'>destroyObject</a>( <span class='pre'></span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Class destructor implementation. ...</div><div class='long'><p>Class destructor implementation. Called inside <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a> method after aggregated objects destruction.\nThe logic of class instance destruction should be implemented here. If you override this method,\ndon't forget to call superclass destructor at the end of the method:</p>\n\n<pre><code>destroyObject: function() {\n    // Release resources\n    ...\n    // Call superclass destructor\n    this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-own' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/JW.Class' rel='JW.Class' class='defined-in docClass'>JW.Class</a><br/><a href='source/class.html#JW-Class-method-own' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Class-method-own' class='name expandable'>own</a>( <span class='pre'>obj</span> ) : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Aggregate a specified object in a current one. ...</div><div class='long'><p>Aggregate a specified object in a current one. It means that the specified object will be destroyed automatically\non this object destruction. The aggregated objects are destroyed in a reversive order.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a><div class='sub-desc'><p>An aggregated object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a></span><div class='sub-desc'><p>An aggregated object (obj).</p>\n</div></li></ul></div></div></div><div id='method-update' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-method-update' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-method-update' class='name expandable'>update</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Updates route focibly. ...</div><div class='long'><p>Updates route focibly.</p>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static methods</h3><div id='static-method-makeHandler' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-static-method-makeHandler' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-static-method-makeHandler' class='name expandable'>makeHandler</a>( <span class='pre'>configuration</span> ) : Function<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Converts handler configuration object to handler function. ...</div><div class='long'><p>Converts handler configuration object to handler function. Configuration has two optional fields:</p>\n\n<ul>\n<li><a href=\"#!/api/JW.Plugins.Router.Handler-cfg-routes\" rel=\"JW.Plugins.Router.Handler-cfg-routes\" class=\"docClass\">routes</a> is a mapping from route string to a handler function for\nthis specific route.</li>\n<li><a href=\"#!/api/JW.Plugins.Router.Handler-cfg-notFound\" rel=\"JW.Plugins.Router.Handler-cfg-notFound\" class=\"docClass\">notFound</a> is a handler function for all routes which don't\nmatch <a href=\"#!/api/JW.Plugins.Router.Handler-cfg-routes\" rel=\"JW.Plugins.Router.Handler-cfg-routes\" class=\"docClass\">routes</a> mapping.</li>\n</ul>\n\n\n<p>Example:</p>\n\n<pre><code>this.router = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Plugins.Router\" rel=\"JW.Plugins.Router\" class=\"docClass\">JW.Plugins.Router</a>({\n    <a href=\"#!/api/JW.Plugins.Router-cfg-path\" rel=\"JW.Plugins.Router-cfg-path\" class=\"docClass\">path</a>: <a href=\"#!/api/JW.UI-static-property-hash\" rel=\"JW.UI-static-property-hash\" class=\"docClass\">JW.UI.hash</a>,\n    <a href=\"#!/api/JW.Plugins.Router-cfg-handler\" rel=\"JW.Plugins.Router-cfg-handler\" class=\"docClass\">handler</a>: {\n        <a href=\"#!/api/JW.Plugins.Router.Handler-cfg-routes\" rel=\"JW.Plugins.Router.Handler-cfg-routes\" class=\"docClass\">routes</a>: {\n            \"inbox\"   : function() { return new Inbox();           },\n            \"compose\" : function() { return new Compose();         },\n            \"settings\": function() { return new Settings();        },\n            \"\"        : function() { return new <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>(); }\n        },\n        <a href=\"#!/api/JW.Plugins.Router.Handler-cfg-notFound\" rel=\"JW.Plugins.Router.Handler-cfg-notFound\" class=\"docClass\">notFound</a>: function(route) { return new NotFound(route); }\n    },\n    <a href=\"#!/api/JW.Plugins.Router-cfg-scope\" rel=\"JW.Plugins.Router-cfg-scope\" class=\"docClass\">scope</a>: this\n}));\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>configuration</span> : <a href=\"#!/api/JW.Plugins.Router.Handler\" rel=\"JW.Plugins.Router.Handler\" class=\"docClass\">JW.Plugins.Router.Handler</a><div class='sub-desc'><p>Handler configuration object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function</span><div class='sub-desc'><p>Handler function.</p>\n</div></li></ul></div></div></div><div id='static-method-makeSeparator' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Plugins.Router'>JW.Plugins.Router</span><br/><a href='source/router.html#JW-Plugins-Router-static-method-makeSeparator' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Plugins.Router-static-method-makeSeparator' class='name expandable'>makeSeparator</a>( <span class='pre'>separator</span> ) : Function<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Converts separator symbol/string to separator function. ...</div><div class='long'><p>Converts separator symbol/string to separator function. A first token of path before separator symbol is used as a\nroute, and a remaining part of the path after separator symbol is used as an argument. Leading separator symbols are\ntrimmed. If separator symbol is not found in trimmed path, the entire path is used as a route, and argument is null.</p>\n\n<p>Examples:</p>\n\n<table>\n  <tr><td>Incoming path</td><td>Separator</td><td>Resulting route</td><td>Resulting argument</td></tr>\n  <tr><td>\"\" or null</td><td>\"/\"</td><td>\"\"</td><td>null</td></tr>\n  <tr><td>\"inbox\"</td><td>\"/\"</td><td>\"inbox\"</td><td>null</td></tr>\n  <tr><td>\"inbox/\"</td><td>\"/\"</td><td>\"inbox\"</td><td>\"\"</td></tr>\n  <tr><td>\"inbox/1\"</td><td>\"/\"</td><td>\"inbox\"</td><td>\"1\"</td></tr>\n  <tr><td>\"inbox/1/edit\"</td><td>\"/\"</td><td>\"inbox\"</td><td>\"1/edit\"</td></tr>\n  <tr><td>\"/inbox\"</td><td>\"/\"</td><td>\"inbox\"</td><td>null</td></tr>\n  <tr><td>\"/inbox/\"</td><td>\"/\"</td><td>\"inbox\"</td><td>\"\"</td></tr>\n  <tr><td>\"///inbox///\"</td><td>\"/\"</td><td>\"inbox\"</td><td>\"//\"</td></tr>\n</table>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>separator</span> : string<div class='sub-desc'><p>Separator symbol/string.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function</span><div class='sub-desc'><p>Separator function.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});