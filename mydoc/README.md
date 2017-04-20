# What is jWidget?

jWidget is an object-oriented TypeScript Model-View framework. Being direct competitor to Backbone, AngularJS and EmberJS, jWidget is a good choice for developers who respect the principles of object-oriented programming and appreciate good application performance.

### jWidget features

* Base class [jwidget/Class](jwidget/Class.md) for object aggregation.
* Event class [jwidget/Event](jwidget/Event.md) for change notification.
* Observable property class [jwidget/Property](jwidget/Property.md) for basic binding support.
* Collection classes, algorithms, synchronizers [jwidget/AbstractCollection](jwidget/AbstractCollection.md).
* Base class [jwidget/Component](jwidget/Component.md) for UI component creation and inheritance with HTML templates and full DOM control. Fully compatible with [jQuery](http://jquery.com).

jWidget is a pure object-oriented solution which doesn't rely on mystical custom HTML templates and unclear update cycles. Each object simply listens to some events and handles them in very straightforward fashion. Look at the next example:

    @template(
        '<div class="greeter">' +
            '<p>Your name: <input jwid="name-field"></p>' +
            '<div jwid="greeting"></div>' +
        '</div>'
    )
    class Greeter extends Component {
        private name = this.own(new Property("guest"));

        protected renderNameField(el: JQuery) {
            // Bind element value to property
            this.own(val(el, this.name, TWOWAY));
        },

        protected renderGreeting(el: JQuery) {
            // Build greeting message
            var text = this.own(this.name.mapValue((name) => "Hello, " + name + "!"));

            // Bind element text to message
            this.own(text(el, text));
        }
    });

    new Greeter().renderTo("body");

<iframe frameborder="0" width="100%" height="100" src="http://enepomnyaschih.github.io/mt/1.4/greeter.html"></iframe>

Sure, in Angular and Ember this code would be much shorter, but in jWidget you see clearly how it works. This makes you feel confident that you're able to implement as complicated and big MV application as you would like to. You can be confident to use all well-known OOD patterns and follow OOD [SOLID principles](http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)). Also, you can use static typing capabilities provided by TypeScript in a full scale. Read the [Tutorial](Tutorial1.md) for more examples.

The difference between jWidget and the other Model-View frameworks is the approach of working with properties and collections. In other frameworks, data binding is performed implicitly via HTML templates. In jWidget, data binding is performed explicitly via [jwidget/Property](jwidget/Property.md) and its helpers. Instead of special tags-repeaters in HTML templates, you work with collections explicitly using [jwidget/AbstractCollection](jwidget/AbstractCollection.md) and their synchronizers.

This approach is more effective: data binding is not restricted to model and view communication: all the same practices can be used to bind model objects to each other and view components to each other.

Project license is LGPL.

Current version: 2.1

### Installation

    npm install --save jwidget

Then you can import its classes directly via ES6 syntax:

    import Class from "jwidget/Class";

### API documentation

Unfortunately, code documentation tools for TypeScript are not yet mature enough to generate comprehensive code documentation, so we've decided to document the API manually as Markdown files at GitHub. Here's documentation index.

Core:

- [jwidget/Core](jwidget/Core.md) - Core utilities.
- [jwidget/Class](jwidget/Class.md) - Base class for object aggregation.
- [jwidget/Event](jwidget/Event.md) - Event class for change notification.
- [jwidget/Property](jwidget/Property.md) - Observable property for basic binding support.

Model bindings for [jwidget/Property](jwidget/Property.md):

- JW.Copier
- JW.Functor
- JW.Mapper
- JW.Updater
- JW.Switcher

Collections:

- JW.AbstractCollection
- JW.IndexedCollection
- JW.AbstractArray
- JW.AbstractMap
- JW.AbstractSet

Synchronizers:

- Item mapper: JW.AbstractCollection.Mapper
- Filterer: JW.AbstractCollection.Filterer
- Matching item counter: JW.AbstractCollection.Counter
- Converter to set: JW.AbstractCollection.Lister
- Converter to map (indexer): JW.AbstractCollection.Indexer
- Converter to array (orderer): JW.AbstractCollection.Orderer
- Converter to array (sorter by comparer): JW.AbstractCollection.SorterComparing
- Observer: JW.AbstractCollection.Observer
- View synchronizers: JW.AbstractArray.Inserter, JW.AbstractMap.Inserter, JW.UI.Inserter
- Arrays merger: JW.AbstractArray.Merger
- Array reverser: JW.AbstractArray.Reverser

UI:

- JW.UI.Component
- {@link jQuery jQuery} extension methods
