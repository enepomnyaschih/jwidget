Ext.data.JsonP.home({"guide":"<h1 id='home-section-what-is-jwidget%3F'>What is jWidget?</h1>\n\n<p>jWidget is object-oriented JavaScript Model-View framework.\nBeing straight competitor to Backbone, AngularJS and EmberJS, jWidget is good for developers who respect the principles\nof object-oriented programming and appreciate good application performance.</p>\n\n<p>jWidget features:</p>\n\n<ul>\n<li>Base class <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a> for classes creation and inheritance</li>\n<li>Event class <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a></li>\n<li>Observable property class <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a></li>\n<li>Collection classes, algorithms, synchronizers (<a href=\"#!/api/JW.AbstractCollection\" rel=\"JW.AbstractCollection\" class=\"docClass\">JW.AbstractCollection</a>)</li>\n<li>Base class <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> for UI components creation and inheritance with HTML templates</li>\n<li>Application tree structure (parent and child components management)</li>\n<li>Integration with <a href=\"https://github.com/enepomnyaschih/jwsdk/wiki/\">jWidget SDK</a> which lets you to extract\nHTML templates into separate files</li>\n</ul>\n\n\n<p>jWidget is a pure object-oriented solution which doesn't rely on mystic custom HTML templates and unclear\nupdate cycles. Each object simply listens events and handles them in very straightforward fashion. Look at the next\nexample:</p>\n\n<pre><code>var Greeter = function() {\n    Greeter.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>.call(this);\n    this.name = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(\"wanderer\"));\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(Greeter, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    renderNameField: function(el) {\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ValueUpdater\" rel=\"JW.UI.ValueUpdater\" class=\"docClass\">JW.UI.ValueUpdater</a>(el, this.name)); // bind element value to property\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ValueListener\" rel=\"JW.UI.ValueListener\" class=\"docClass\">JW.UI.ValueListener</a>(el, this.name)); // bind property to element value\n    },\n\n    renderGreeting: function(el) {\n        var text = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.name.<a href=\"#!/api/JW.Property-method-S-S-mapValue\" rel=\"JW.Property-method-S-S-mapValue\" class=\"docClass\">$$mapValue</a>(function(name) { // build greeting message\n            return \"Hello, \" + name + \"!\";\n        }, this));\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>(el, text)); // bind element text to message\n    }\n});\n\n<a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a>(Greeter, {\n    main:\n        '&lt;div class=\"greeter\"&gt;' +\n            '&lt;p&gt;Your name: &lt;input jwid=\"name-field\"&gt;&lt;/p&gt;' +\n            '&lt;div jwid=\"greeting\"&gt;&lt;/div&gt;' +\n        '&lt;/div&gt;'\n});\n\nnew Greeter().<a href=\"#!/api/JW.UI.Component-method-renderTo\" rel=\"JW.UI.Component-method-renderTo\" class=\"docClass\">renderTo</a>(\"body\");\n</code></pre>\n\n<iframe frameborder=\"0\" width=\"400\" height=\"100\" src=\"http://enepomnyaschih.github.io/mt/1.3/greeter.html\"></iframe>\n\n\n<p>Sure, in Angular and Ember this code would be much shorter, but in jWidget you see clearly how it works. This makes\nyou confident in that you're able to implement as complicated and big MVC application as you would like to. You\ncan be confident to use all well-known OOD patterns and follow OOD\n<a href=\"http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)\">SOLID principles</a>. Read the\n<a href=\"#!/guide/ensample1\">tutorial</a> for more examples.</p>\n\n<p>The difference between jWidget and other Model-View frameworks is the approach of working with properties and\ncollections. In other frameworks, data binding is performed implicitly via HTML templates. In jWidget, data binding\nis performed explicitly using <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a> and its helpers. Instead of special tags-repeaters in HTML templates, you work with\ncollections explicitly using <a href=\"#!/api/JW.AbstractCollection\" rel=\"JW.AbstractCollection\" class=\"docClass\">collection classes</a> and their synchronizers.\nThis is very similar to database theory basics, but on UI level.</p>\n\n<p>This approach is more effective: data binding is not constrained by connection between model and view. All the same\npractices are used to bind model objects to each other and to bind view components to each other.</p>\n\n<p>Project license is LGPL.</p>\n\n<p>Current version: 1.3</p>\n\n<p><font size=\"5\"><a href=\"guides/endownload/jwidget.zip\">Download jWidget</a></font></p>\n\n<p><font size=\"5\"><a href=\"https://github.com/enepomnyaschih/jwidget\">Source code and bug tracker on GitHub</a></font></p>\n\n<p>jWidget is available as <a href=\"http://bower.io/\">Bower</a> package:</p>\n\n<pre><code>bower install jwidget\n</code></pre>\n\n<p>Feel free to contact me by email <a href=\"mailto:jwidgetproject@gmail.com\">jwidgetproject@gmail.com</a> if you have any questions\nor bug reports.</p>\n","title":"What is jWidget?"});