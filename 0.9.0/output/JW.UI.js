Ext.data.JsonP.JW_UI({"tagname":"class","name":"JW.UI","autodetected":{"members":true},"files":[{"filename":"core.js","href":"core4.html#JW-UI"}],"members":[{"name":"hash","tagname":"property","owner":"JW.UI","id":"static-property-hash","meta":{"static":true}},{"name":"isLifeInput","tagname":"method","owner":"JW.UI","id":"method-isLifeInput","meta":{"private":true}},{"name":"isElement","tagname":"method","owner":"JW.UI","id":"static-method-isElement","meta":{"static":true}},{"name":"preventDefault","tagname":"method","owner":"JW.UI","id":"static-method-preventDefault","meta":{"static":true}},{"name":"template","tagname":"method","owner":"JW.UI","id":"static-method-template","meta":{"static":true}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.UI","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/core4.html#JW-UI' target='_blank'>core.js</a></div></pre><div class='doc-contents'><p>Main jWidget UI library namespace.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static properties</h3><div id='static-property-hash' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI'>JW.UI</span><br/><a href='source/core4.html#JW-UI-static-property-hash' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI-static-property-hash' class='name expandable'>hash</a> : <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a><span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'><p><code>&lt;String&gt;</code> Current page hash (without leading \"#\").</p>\n</div><div class='long'><p><code>&lt;String&gt;</code> Current page hash (without leading \"#\").</p>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance methods</h3><div id='method-isLifeInput' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI'>JW.UI</span><br/><a href='source/core4.html#JW-UI-method-isLifeInput' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI-method-isLifeInput' class='name expandable'>isLifeInput</a>( <span class='pre'>el</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static methods</h3><div id='static-method-isElement' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI'>JW.UI</span><br/><a href='source/core4.html#JW-UI-static-method-isElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI-static-method-isElement' class='name expandable'>isElement</a>( <span class='pre'>x</span> ) : boolean<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Checks whether x is jQuery element. ...</div><div class='long'><p>Checks whether x is <a href=\"http://api.jquery.com/\">jQuery element</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>x</span> : Mixed<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>Result.</p>\n</div></li></ul></div></div></div><div id='static-method-preventDefault' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI'>JW.UI</span><br/><a href='source/core4.html#JW-UI-static-method-preventDefault' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI-static-method-preventDefault' class='name expandable'>preventDefault</a>( <span class='pre'>event</span> )<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Calls preventDefault method for jQuery event. ...</div><div class='long'><p>Calls <code>preventDefault</code> method for <a href=\"http://api.jquery.com/category/events/event-object/\">jQuery event</a>.</p>\n\n<p>Use this way:</p>\n\n<pre><code>el.click(<a href=\"#!/api/JW.UI-static-method-preventDefault\" rel=\"JW.UI-static-method-preventDefault\" class=\"docClass\">JW.UI.preventDefault</a>);\n</code></pre>\n\n<p>Shorthand for</p>\n\n<pre><code>el.click(<a href=\"#!/api/JW-static-method-byMethod\" rel=\"JW-static-method-byMethod\" class=\"docClass\">JW.byMethod</a>(\"preventDefault\"));\n</code></pre>\n\n<p>and</p>\n\n<pre><code>el.click(function(e) { e.preventDefault(); });\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'><p>jQuery event.</p>\n</div></li></ul></div></div></div><div id='static-method-template' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.UI'>JW.UI</span><br/><a href='source/core4.html#JW-UI-static-method-template' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.UI-static-method-template' class='name expandable'>template</a>( <span class='pre'>cls, tpls</span> )<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Defines HTML templates for specified JW.UI.Component subclass. ...</div><div class='long'><p>Defines HTML templates for specified <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> subclass.</p>\n\n<p>You can define multiple templates for any subclass of <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>. Each template has a name.\nYou can get component template via <a href=\"#!/api/JW.UI.Component-property-templates\" rel=\"JW.UI.Component-property-templates\" class=\"docClass\">JW.UI.Component.templates</a> dictionary.</p>\n\n<p>Templates are inherited together with component classes.</p>\n\n<p>Each component class has at least one template, its name is <code>main</code>. This is the main template which is\nused to render the component. By default, <code>main</code> equals to <code>&lt;div /&gt;</code>.\nUsually, <code>main</code> template is enough for the majority of components. This template is applied automatically,\nunlike other templates which should be applied manually.</p>\n\n<p><a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a> function is called automatically if you attach <code>jw.html</code> files via\n<a href=\"https://github.com/enepomnyaschih/jwsdk/wiki/en\">jWidget SDK</a>. See\n<a href=\"#!/guide/ensample7\">Getting started. Part 7. Project infrastructure</a> for details.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cls</span> : Function<div class='sub-desc'><p><a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> subclass.</p>\n</div></li><li><span class='pre'>tpls</span> : Object<div class='sub-desc'><p>Templates to add or override.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});