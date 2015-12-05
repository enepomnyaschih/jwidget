# What is jWidget?

jWidget is object-oriented JavaScript Model-View framework.
Being straight competitor to Backbone, AngularJS and EmberJS, jWidget is good for developers who respect the principles
of object-oriented programming and appreciate good application performance.

jWidget features:

* Base class JW.Class for classes creation and inheritance
* Event class JW.Event
* Observable property class JW.Property
* Collection classes, algorithms, synchronizers (JW.AbstractCollection)
* Base class JW.UI.Component for UI components creation and inheritance with HTML templates
* Application tree structure (parent and child components management)
* Integration with [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/) which lets you to extract
HTML templates into separate files

jWidget is a pure object-oriented solution which doesn't rely on mystic custom HTML templates and unclear
update cycles. Each object simply listens events and handles them in very straightforward fashion. Look at the next
example:

    var Greeter = function() {
        Greeter.{@link JW.Class#_super _super}.call(this);
        this.name = this.{@link JW.Class#own own}(new JW.Property("guest"));
    };

    JW.extend(Greeter, JW.UI.Component, {
        renderNameField: function(el) {
            // Bind element value to property
            this.{@link JW.Class#own own}(el.{@link jQuery#jwval jwval}(this.name));

            // Bind property to element value
            this.name.{@link JW.Property#bindTo bindTo}(this.{@link JW.Class#own own}(el.{@link jQuery#jwval jwval}()));
        },

        renderGreeting: function(el) {
            // Build greeting message
            var text = this.{@link JW.Class#own own}(this.name.{@link JW.Property#$$mapValue $$mapValue}(function(name) {
                return "Hello, " + name + "!";
            }, this));

            // Bind element text to message
            this.{@link JW.Class#own own}(el.{@link jQuery#jwtext jwtext}(text));
        }
    });

    JW.UI.template(Greeter, {
        main:
            '<div class="greeter">' +
                '<p>Your name: <input jwid="name-field"></p>' +
                '<div jwid="greeting"></div>' +
            '</div>'
    });

    new Greeter().{@link JW.UI.Component#renderTo renderTo}("body");

<iframe frameborder="0" width="400" height="100" src="http://enepomnyaschih.github.io/mt/1.4/greeter.html"></iframe>

Sure, in Angular and Ember this code would be much shorter, but in jWidget you see clearly how it works. This makes
you confident in that you're able to implement as complicated and big MV application as you would like to. You
can be confident to use all well-known OOD patterns and follow OOD
<a href="http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)">SOLID principles</a>. Read the
[tutorial](#!/guide/ensample1) for more examples.

The difference between jWidget and other Model-View frameworks is the approach of working with properties and
collections. In other frameworks, data binding is performed implicitly via HTML templates. In jWidget, data binding
is performed explicitly using JW.Property and its helpers. Instead of special tags-repeaters in HTML templates, you work with
collections explicitly using {@link JW.AbstractCollection collection classes} and their synchronizers.

This approach is more effective: data binding is not constrained by connection between model and view. All the same
practices are used to bind model objects to each other and to bind view components to each other.

Project license is LGPL.

Current version: 1.4.2

<font size="5">[Download jWidget](guides/endownload/jwidget.zip)</font>

<font size="5">[Source code and bug tracker on GitHub](https://github.com/enepomnyaschih/jwidget)</font>

jWidget is available as [Bower](http://bower.io/) package:

    bower install jwidget

Feel free to contact me by email [jwidgetproject@gmail.com](mailto:jwidgetproject@gmail.com) if you have any questions
or bug reports.
