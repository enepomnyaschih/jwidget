# What is jWidget?

jWidget is object-oriented JavaScript library for applications development based on Model-View architecture.
jWidget is more powerful than Backbone, but at the same time more transparent and clear than Angular and Ember.

jWidget Lib unit is responsible for Model implementation, jWidget UI - for View implementation.

**jWidget Lib** provides a number of utility classes and functions. jWidget Lib doesn't depend on any third-party
libraries and frameworks. jWidget Lib is equally good for JavaScript and NodeJS applications development.

jWidget Lib features:

* Base class JW.Class for classes creation and inheritance
* Class JW.Event for user events management
* Class JW.Property for mutable values management
* Collection classes, algorithms, **synchronizers** (see JW.AbstractCollection)

**jWidget UI** is a small object-oriented unit for arbitrary UI components creation in JavaScript based on
HTML templates. jWidget UI is based on [jQuery](http://jquery.com) and it is the perfect solution for applications
development with custom UI.

jWidget UI features:

* Base class JW.UI.Component for UI components creation and inheritance with HTML templates
* Application tree structure (parent and child components management)
* Integration with properties and collections of jWidget Lib which automatically synchronizes view with model
* Integration with [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/) which lets you to extract
HTML templates into separate files

jWidget is a purely object-oriented solution which doesn't rely on mystic custom HTML templates and unclear
update cycles. Each object simply listens events and handles them in very straightforward fashion. Look at the next
example:

    var Greeter = function() {
        Greeter.{@link JW.Class#_super _super}.call(this);
        this.name = this.{@link JW.Class#own own}(new JW.Property("guest"));
    };
    
    JW.extend(Greeter, JW.UI.Component, {
        renderNameField: function(el) {
            this.{@link JW.Class#own own}(new JW.UI.ValueUpdater(el, this.name)); // bind element value to property
            this.{@link JW.Class#own own}(new JW.UI.ValueListener(el, this.name)); // bind property to element value
        },
        
        renderGreeting: function(el) {
            var text = this.{@link JW.Class#own own}(new JW.Functor([this.name], function(name) {
                return "Hello, " + name + "!";
            }, this)).{@link JW.Functor#property-target target}; // build greeting message
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text)); // bind element text to message
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

<iframe frameborder="0" width="400" height="100" src="http://enepomnyaschih.github.io/mt/0.8/greeter.html"></iframe>

Sure, in Angular and Ember this code would be much shorter, but in jWidget you see clearly how it works. This makes
you confident in that you're able to implement as complicated and big MVC application as you would like to. Read the
[tutorial](#!/guide/ensample1) for more examples.

Project license is LGPL.

Current version: 0.8

<font size="5">[Download jWidget](guides/endownload/jwidget.zip)</font>

<font size="5">[Source code and bug tracker on GitHub](https://github.com/enepomnyaschih/jwidget)</font>

Feel free to contact me by email [enepomnyaschih@gmail.com](mailto:enepomnyaschih@gmail.com) if you have any questions
or bug reports.
