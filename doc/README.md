# What is jWidget?

jWidget is an object-oriented TypeScript Model-View framework. Being direct competitor to Backbone, AngularJS and EmberJS, jWidget is a good choice for developers who respect the principles of object-oriented programming and appreciate good application performance.

jWidget 2 is a migration of jWidget framework to the modern toolkit of TypeScript and WebPack.

### jWidget features

* Base class [jwidget/Class](jwidget/Class.md) for object aggregation.
* Event class [jwidget/Event](jwidget/Event.md) for change notification.
* Observable property class [jwidget/Property](jwidget/Property.md) for basic binding support.
* Collection classes [jwidget/AbstractArray](jwidget/AbstractArray.md), [jwidget/AbstractMap](jwidget/AbstractMap.md), [jwidget/AbstractSet](jwidget/AbstractSet.md) for collection binding support.
* Base class [jwidget/Component](jwidget/Component.md) for UI component creation and inheritance with HTML templates and full DOM control. Fully compatible with [jQuery](http://jquery.com).

### jWidget advantages

* Clean object-oriented design
* Great performance
* Perfectly lines up with the majority of modern front end development tools such as:
    * NPM (the whole framework can be installed from NPM quickly and efficiently)
    * TypeScript (of course, since TypeScript was created to fully support OOD)
    * WebPack (any jWidget application can be built with just WebPack)
    * Stylus or LESS (common CSS prefix in jWidget template provides a way to shorten your stylesheets greatly)

jWidget is a pure object-oriented solution which doesn't rely on inefficiently complicated HTML templates and unclear update cycles. Each object simply listens to some events and handles them in very straightforward fashion. Look at the next example:

    import Component from "jwidget/Component";
    import Property from "jwidget/Property";
    import template from "jwidget/template";
    import text from "jwidget/ui/text";
    import val from "jwidget/ui/val";

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

## API documentation

Unfortunately, code documentation tools for TypeScript are not yet mature enough to generate comprehensive code documentation, so we've decided to document the API manually as Markdown files in GitHub. Please find all neccessary info in the list below.

Core:

- [jwidget/Core](jwidget/Core.md) - Core utilities.
- [jwidget/Destroyable](jwidget/Destroyable.md) - Interface for a destroyable object.
- [jwidget/Dictionary](jwidget/Dictionary.md) - Interface for a native map.
- [jwidget/Proxy](jwidget/Proxy.md) - Interface for value proxy.
- [jwidget/Class](jwidget/Class.md) - Base class for object aggregation.
- [jwidget/Event](jwidget/Event.md) - Event class for change notification.
- [jwidget/EventAttachment](jwidget/EventAttachment.md) - Destroyable event attachment.
- [jwidget/Property](jwidget/Property.md) - Observable property for basic binding support.
- [jwidget/Component](jwidget/Component.md) - Base class for UI component.
- [jwidget/template](jwidget/template.md) - Annotation for HTML template attachment to a [jwidget/Component](jwidget/Component.md) subclass.

Model bindings for [jwidget/Property](jwidget/Property.md):

- [jwidget/Copier](jwidget/Copier.md) - Keeps one property equal to another.
- [jwidget/Functor](jwidget/Functor.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Mapper](jwidget/Mapper.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Updater](jwidget/Updater.md) - Observes several properties.
- [jwidget/Switcher](jwidget/Switcher.md) - Observes several properties.

View bindings for [jwidget/Property](jwidget/Property.md):

- [jwidget/ui/attr](jwidget/ui/attr.md) - Binds attribute to a property.
- [jwidget/ui/class](jwidget/ui/class.md) - Binds CSS class to a property.
- [jwidget/ui/css](jwidget/ui/css.md) - Binds CSS style to a property.
- [jwidget/ui/html](jwidget/ui/html.md) - Binds inner HTML to a property.
- [jwidget/ui/on](jwidget/ui/on.md) - Event subscription with aggregation support.
- [jwidget/ui/prop](jwidget/ui/prop.md) - Binds jQuery property to a jWidget property.
- [jwidget/ui/radio](jwidget/ui/radio.md) - Binds radio selection to a property.
- [jwidget/ui/show](jwidget/ui/show.md) - Binds visibility to a property.
- [jwidget/ui/text](jwidget/ui/text.md) - Binds inner text to a property.
- [jwidget/ui/val](jwidget/ui/val.md) - Binds input value to a property.

Collections:

- [jwidget/AbstractCollection](jwidget/AbstractCollection.md) - Base class for all collections. This page provides the overview of jWidget collections.
- [jwidget/IndexedCollection](jwidget/IndexedCollection.md) - Base class for indexed collections ([jwidget/AbstractArray](jwidget/AbstractArray.md) and [jwidget/AbstractMap](jwidget/AbstractMap.md)).
- [jwidget/AbstractArray](jwidget/AbstractArray.md) aka ordered collection.
- [jwidget/AbstractMap](jwidget/AbstractMap.md) aka associative array.
- [jwidget/AbstractSet](jwidget/AbstractSet.md) aka unordered collection.

Collection synchronizers:

- [jwidget/mapper](jwidget/mapper.md) - Item mapper.
- [jwidget/filterer](jwidget/filterer.md) - Filterer.
- [jwidget/counter](jwidget/counter.md) - Matching item counter.
- [jwidget/lister](jwidget/lister.md) - Converter to a set.
- [jwidget/indexer](jwidget/indexer.md) - Converter to a map (indexer).
- [jwidget/orderer](jwidget/orderer.md) - Converter to an array (orderer).
- [jwidget/sortercomparing](jwidget/sortercomparing.md) - Converter to an array (sorter by comparer).
- [jwidget/observer](jwidget/observer.md) - Observer.
- [jwidget/inserter/array](jwidget/inserter/array.md), [jwidget/inserter/map](jwidget/inserter/map.md) - View synchronizers.
- [jwidget/merger/array](jwidget/merger/array.md) - Array merger.
- [jwidget/reverser/array](jwidget/reverser/array.md) - Array reverser.

Collection utilities:

- [jwidget/ArrayUtils](jwidget/ArrayUtils.md)
- [jwidget/MapUtils](jwidget/MapUtils.md)
- [jwidget/SetUtils](jwidget/SetUtils.md)

Other tools:

- [jwidget/HtmlTemplate](jwidget/HtmlTemplate.md) - Well-optimized template engine with `jwclass` and `jwid` support.
- [jwidget/Timeout](jwidget/Timeout.md) - Destroyable version of setTimeout.
- [jwidget/Interval](jwidget/Interval.md) - Destroyable version of setInterval.
- [jwidget/StringUtils](jwidget/StringUtils.md) - String utilities.

## Low-level stuff

Collection interface & class hierarchy

- [jwidget/AbstractCollection](jwidget/AbstractCollection.md) implements [jwidget/ICollection](jwidget/AbstractCollection.md)
    - [jwidget/IndexedCollection](jwidget/IndexedCollection.md) implements [jwidget/IIndexedCollection](jwidget/IndexedCollection.md)
        - [jwidget/AbstractArray](jwidget/AbstractArray.md) implements [jwidget/IArray](jwidget/AbstractArray.md)
            - [jwidget/JWArray](jwidget/JWArray.md)
            - [jwidget/ObservableArray](jwidget/ObservableArray.md)
        - [jwidget/AbstractMap](jwidget/AbstractMap.md) implements [jwidget/IMap](jwidget/AbstractMap.md)
            - [jwidget/JWMap](jwidget/JWMap.md)
            - [jwidget/ObservableMap](jwidget/ObservableMap.md)
    - [jwidget/AbstractSet](jwidget/AbstractSet.md) implements [jwidget/ISet](jwidget/AbstractSet.md)
        - [jwidget/JWSet](jwidget/JWSet.md)
        - [jwidget/ObservableSet](jwidget/ObservableSet.md)
