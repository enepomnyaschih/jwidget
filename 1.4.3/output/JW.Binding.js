Ext.data.JsonP.JW_Binding({"tagname":"class","name":"JW.Binding","autodetected":{"members":true},"files":[{"filename":"core.js","href":"core.html#JW-Binding"}],"enum":{"type":"number","default":null,"doc_only":null},"members":[{"name":"TWOWAY","tagname":"property","owner":"JW.Binding","id":"property-TWOWAY","meta":{}},{"name":"UPDATE","tagname":"property","owner":"JW.Binding","id":"property-UPDATE","meta":{}},{"name":"WATCH","tagname":"property","owner":"JW.Binding","id":"property-WATCH","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-JW.Binding","short_doc":"jWidget binding mode. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/core.html#JW-Binding' target='_blank'>core.js</a></div></pre><div class='doc-contents'><p>jWidget binding mode. All properties have shorthands in <a href=\"#!/api/JW\" rel=\"JW\" class=\"docClass\">JW</a> namespace.</p>\n<div class='rounded-box enum-box'><p><strong>ENUM:</strong> This enumeration defines a set of number values.</p></div></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-TWOWAY' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Binding'>JW.Binding</span><br/><a href='source/core.html#JW-Binding-property-TWOWAY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Binding-property-TWOWAY' class='name expandable'>TWOWAY</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Bind invoker and argument to each other. ...</div><div class='long'><p>Bind invoker and argument to each other.\nUPDATE-binding is applied first.</p>\n\n<pre><code>// Assign element value to property and setup two-way binding\nthis.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(el.<a href=\"#!/api/jQuery-method-jwval\" rel=\"jQuery-method-jwval\" class=\"docClass\">jwval</a>(property, <a href=\"#!/api/JW-property-TWOWAY\" rel=\"JW-property-TWOWAY\" class=\"docClass\">JW.TWOWAY</a>));\n</code></pre>\n\n<p>Shorthand: <a href=\"#!/api/JW-property-TWOWAY\" rel=\"JW-property-TWOWAY\" class=\"docClass\">JW.TWOWAY</a>.</p>\n<p>Defaults to: <code>3</code></p></div></div></div><div id='property-UPDATE' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Binding'>JW.Binding</span><br/><a href='source/core.html#JW-Binding-property-UPDATE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Binding-property-UPDATE' class='name expandable'>UPDATE</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Bind invoker to argument. ...</div><div class='long'><p>Bind invoker to argument.</p>\n\n<pre><code>// Bind element value to property\nthis.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(el.<a href=\"#!/api/jQuery-method-jwval\" rel=\"jQuery-method-jwval\" class=\"docClass\">jwval</a>(property, <a href=\"#!/api/JW-property-UPDATE\" rel=\"JW-property-UPDATE\" class=\"docClass\">JW.UPDATE</a>));\n</code></pre>\n\n<p>Always used as default binding. Hence, the next code is equivalent:</p>\n\n<pre><code>this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(el.<a href=\"#!/api/jQuery-method-jwval\" rel=\"jQuery-method-jwval\" class=\"docClass\">jwval</a>(property));\n</code></pre>\n\n<p>Shorthand: <a href=\"#!/api/JW-property-UPDATE\" rel=\"JW-property-UPDATE\" class=\"docClass\">JW.UPDATE</a>.</p>\n<p>Defaults to: <code>1</code></p></div></div></div><div id='property-WATCH' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='JW.Binding'>JW.Binding</span><br/><a href='source/core.html#JW-Binding-property-WATCH' target='_blank' class='view-source'>view source</a></div><a href='#!/api/JW.Binding-property-WATCH' class='name expandable'>WATCH</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Bind argument to invoker. ...</div><div class='long'><p>Bind argument to invoker.</p>\n\n<pre><code>// Bind property to element value\nthis.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(el.<a href=\"#!/api/jQuery-method-jwval\" rel=\"jQuery-method-jwval\" class=\"docClass\">jwval</a>(property, <a href=\"#!/api/JW-property-WATCH\" rel=\"JW-property-WATCH\" class=\"docClass\">JW.WATCH</a>));\n</code></pre>\n\n<p>Always supplied with a no-argument method, which creates the property automatically.</p>\n\n<pre><code>// Watch element value\nvar property = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(el.<a href=\"#!/api/jQuery-method-jwval\" rel=\"jQuery-method-jwval\" class=\"docClass\">jwval</a>());\n</code></pre>\n\n<p>Shorthand: <a href=\"#!/api/JW-property-WATCH\" rel=\"JW-property-WATCH\" class=\"docClass\">JW.WATCH</a>.</p>\n<p>Defaults to: <code>2</code></p></div></div></div></div></div></div></div>","meta":{}});