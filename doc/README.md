# What is jWidget?

jWidget is an object-oriented TypeScript Model-View framework. Being direct competitor to Backbone, AngularJS and EmberJS, jWidget is a good choice for developers who respect the principles of object-oriented programming and appreciate good application performance.

jWidget 2 is a migration of jWidget framework to a modern toolkit (see [jWidget advantages](#jwidget-advantages) below).

### jWidget features

* Base class [jwidget/Class](jwidget/Class.md) for object aggregation.
* Event class [jwidget/Event](jwidget/Event.md) for change notification.
* Property class [jwidget/Property](jwidget/Property.md) for basic binding support.
* Collection classes [jwidget/List](jwidget/List.md), [jwidget/Map](jwidget/Map.md), [jwidget/Set](jwidget/Set.md) for collection binding support.
* Base class [jwidget/Component](jwidget/Component.md) for UI component creation and inheritance with HTML templates and full DOM control. Fully compatible with [jQuery](http://jquery.com).

### jWidget advantages

* Clear object-oriented design.
* Great performance.
* Well-thought engine for object life time control.
* It perfectly lines up with the majority of modern front end development tools such as:
    * [NPM](https://www.npmjs.com/) (the whole framework can be installed from NPM quickly and efficiently)
    * [EcmaScript 6](http://es6-features.org/) (modules, arrow functions, properties, promises etc.)
    * [TypeScript](https://www.typescriptlang.org/) (of course, since TypeScript was created to fully support OOD)
    * [WebPack](https://webpack.github.io/) (any jWidget application can be built with just WebPack)
    * [Stylus](http://stylus-lang.com/) or [LESS](http://lesscss.org/) (common CSS prefix in a jWidget template provides a way to shorten your stylesheets greatly)

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
            // Bind element value to the property
            this.own(val(el, this.name, TWOWAY));
        },

        protected renderGreeting(el: JQuery) {
            // Build greeting message by the property
            var text = this.own(this.name.map((name) => "Hello, " + name + "!"));

            // Bind element text to the message
            this.own(text(el, text));
        }
    });

    new Greeter().renderTo("body");

Reference: [jwidget/Component](jwidget/Component.md), [jwidget/Property](jwidget/Property.md), [jwidget/template](jwidget/template.md), [jwidget/ui/text](jwidget/ui/text.md), [jwidget/ui/val](jwidget/ui/val.md).

<iframe frameborder="0" width="100%" height="100" src="http://enepomnyaschih.github.io/mt/1.4/greeter.html"></iframe>

Sure, in Angular and Ember this code would be much shorter, but in jWidget you see clearly how it works. This makes you feel confident that you're able to implement as complicated and big MV application as you would like to. You can be confident to use all well-known OOD patterns and follow OOD [SOLID principles](http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)). Also, you can use static typing capabilities provided by TypeScript in a full scale. Read the [Tutorial](Tutorial1.md) for more examples.

The difference between jWidget and the other Model-View frameworks is the approach of working with properties and collections. In other frameworks, data binding is performed implicitly via HTML templates. In jWidget, data binding is performed explicitly via [jwidget/Property](jwidget/Property.md) and its bindings. Instead of special tags-repeaters in HTML templates, you work with collections explicitly using [jwidget/ICollection](jwidget/ICollection.md) and its synchronizers.

This approach is more efficient: data binding is not restricted to model and view communication: all the same practices can be used to bind model objects to each other and view components to each other.

Project license is LGPL v3.

Current version: 2.1

### Installation

    npm install --save jwidget

Then you can import its classes directly via ES6 syntax:

    import Class from "jwidget/Class";

## API documentation

Unfortunately, code documentation tools for TypeScript are not yet mature enough to generate comprehensive code documentation, so we've decided to document the API manually as Markdown files in GitHub. Please find all neccessary info in the list below.

Core functions and interfaces:

- [jwidget/Core](jwidget/Core.md) - Core utilities.
- [jwidget/Dictionary](jwidget/Dictionary.md) - Interface for a native map.
- [jwidget/Proxy](jwidget/Proxy.md) - Interface for value proxy.
- [jwidget/Destroyable](jwidget/Destroyable.md) - Interface for a destroyable object.
- [jwidget/Bindable](jwidget/Bindable.md) - Interface for an event.
- [jwidget/Watchable](jwidget/Watchable.md) - Interface for a read-only property.
- [jwidget/IProperty](jwidget/IProperty.md) - Interface for a read-write property.

Core classes and their interfaces:

- [jwidget/Class](jwidget/Class.md), [jwidget/IClass](jwidget/IClass.md) - For object aggregation.
- [jwidget/Event](jwidget/Event.md), [jwidget/IEvent](jwidget/IEvent.md) - For change notification.
- [jwidget/Property](jwidget/Property.md), [jwidget/IProperty](jwidget/IProperty.md) - For basic binding support.
- [jwidget/Component](jwidget/Component.md) - Base class for UI component.
- [jwidget/template](jwidget/template.md) - Annotation supply a [jwidget/Component](jwidget/Component.md) subclass with an HTML template.

Model bindings for [jwidget/Watchable](jwidget/Watchable.md) and [jwidget/IProperty](jwidget/IProperty.md):

- [jwidget/Copier](jwidget/Copier.md) - Keeps one property equal to another.
- [jwidget/Functor](jwidget/Functor.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Mapper](jwidget/Mapper.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Updater](jwidget/Updater.md) - Observes several properties.
- [jwidget/Switcher](jwidget/Switcher.md) - Observes several properties.

View bindings for [jwidget/Watchable](jwidget/Watchable.md) and [jwidget/IProperty](jwidget/IProperty.md):

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

Observable collections:

- [jwidget/AbstractCollection](jwidget/AbstractCollection.md) - Base class for all collections. This page provides the overview of jWidget collections.
- [jwidget/IndexedCollection](jwidget/IndexedCollection.md) - Base class for indexed collections ([jwidget/AbstractArray](jwidget/AbstractArray.md) and [jwidget/AbstractMap](jwidget/AbstractMap.md)).
- [jwidget/AbstractArray](jwidget/AbstractArray.md) aka ordered collection.
- [jwidget/AbstractMap](jwidget/AbstractMap.md) aka associative array.
- [jwidget/AbstractSet](jwidget/AbstractSet.md) aka unordered collection.

Collection synchronizers:

- [jwidget/mapper/collection](jwidget/mapper/collection.md) - Item mapper.
- [jwidget/filterer/collection](jwidget/filterer/collection.md) - Filterer.
- [jwidget/counter/collection](jwidget/counter/collection.md) - Matching item counter.
- [jwidget/lister/collection](jwidget/lister/collection.md) - Converter to a set.
- [jwidget/indexer/collection](jwidget/indexer/collection.md) - Converter to a map (indexer).
- [jwidget/orderer/collection](jwidget/orderer/collection.md) - Converter to an array (orderer).
- [jwidget/sortercomparing/collection](jwidget/sortercomparing/collection.md) - Converter to an array (sorter by comparer).
- [jwidget/observer/collection](jwidget/observer/collection.md) - Observer.
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

References (low level stuff):

- [jwidget/AbstractTemplate](jwidget/AbstractTemplate.md)
- [jwidget/dummyDestroyable](jwidget/dummyDestroyable.md) - Dummy implementation of [jwidget/Destroyable](jwidget/Destroyable.md).
- [jwidget/dummyEvent](jwidget/dummyEvent.md) - Dummy implementation of [jwidget/IEvent](jwidget/IEvent.md).
- [jwidget/TemplateOutput](jwidget/TemplateOutput.md)
- [jwidget/ValueChangeEventParams](jwidget/ValueChangeEventParams.md)
