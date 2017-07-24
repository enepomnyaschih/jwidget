# What is jWidget?

jWidget is a **truly object-oriented TypeScript Model-View framework**. Being direct competitor to Backbone, Angular and React, jWidget is a good choice for developers who respect the principles of object-oriented design and appreciate good application performance.

jWidget 2 is a migration of original jWidget framework to a modern toolkit including [NPM](https://www.npmjs.com/), [EcmaScript 6](http://es6-features.org/), [TypeScript](https://www.typescriptlang.org/) and [WebPack](https://webpack.github.io/).

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
    * [TypeScript](https://www.typescriptlang.org/) (of course jWidget 2 is powered by TypeScript, because TypeScript was created to fully support OOD)
    * [WebPack](https://webpack.github.io/) (any jWidget application can be built with just WebPack)
    * [Stylus](http://stylus-lang.com/) or [LESS](http://lesscss.org/) (common CSS prefix in a jWidget template provides a way to shorten your stylesheets greatly)

jWidget is a truly object-oriented solution which doesn't rely on inefficient and complicated HTML templates and unclear update cycles. Each object simply listens to some events and handles them in very straightforward fashion. Look at the next example:

    import {TWOWAY} from "jwidget";
    import Component from "jwidget/Component";
    import Property from "jwidget/Property";
    import template from "jwidget/template";
    import text from "jwidget/ui/text";
    import val from "jwidget/ui/val";

    @template(
        '<div jwclass="greeter">' +
            '<p>Your name: <input jwid="name-field"></p>' +
            '<div jwid="greeting"></div>' +
        '</div>'
    )
    class Greeter extends Component {
        private name = new Property("guest");

        protected renderNameField(el: JQuery) {
            // Bind element value to the property
            val(el, this.name, TWOWAY);
        },

        protected renderGreeting(el: JQuery) {
            // Build greeting message by the property
            const message = this.name.map((name) => "Hello, " + name + "!");

            // Bind element text to the message
            text(el, message);
        }
    });

    new Greeter().renderTo("body");

Reference: [jwidget/Component](jwidget/Component.md), [jwidget/Property](jwidget/Property.md), [jwidget/template](jwidget/template.md), [jwidget/ui/text](jwidget/ui/text.md), [jwidget/ui/val](jwidget/ui/val.md).

<iframe frameborder="0" width="100%" height="100" src="http://enepomnyaschih.github.io/mt/1.4/greeter.html"></iframe>

Sure, in Angular and React this code would be shorter, but in jWidget you see clearly how it works. This makes you feel confident that you're able to implement as complicated and big MV application as you would like to. You can be confident to use all well-known OOD patterns and follow OOD [SOLID principles](http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)). Also, you can use static typing capabilities provided by TypeScript in a full scale. Read the [Tutorial](Tutorial1.md) for more examples.

The difference between jWidget and the other Model-View frameworks is the approach of working with properties and collections. In other frameworks, data binding is performed implicitly via HTML templates. In jWidget, data binding is performed explicitly via [jwidget/Property](jwidget/Property.md) and its bindings. Instead of special tags-repeaters in HTML templates, you work with collections explicitly using [jwidget/List](jwidget/List.md), [jwidget/Map](jwidget/Map.md), [jwidget/Set](jwidget/Set.md) and their synchronizers.

This approach is more efficient: data binding is not restricted to model-view communication: all the same practices can be used to bind model objects to each other and view components to each other.

Project license is LGPL v3.

Current version: 2.1

### Installation

    npm install --save jwidget

Then you can import its classes directly via ES6 syntax:

    import Class from "jwidget/Class";

## API documentation

Utilities:

- [jwidget](jwidget/index.md)
- [jwidget/ArrayUtils](jwidget/ArrayUtils.md)
- [jwidget/DictionaryUtils](jwidget/DictionaryUtils.md)
- [jwidget/DomUtils](jwidget/DomUtils.md)
- [jwidget/StringUtils](jwidget/StringUtils.md)

Core interfaces:

- [jwidget/Destroyable](jwidget/Destroyable.md) - Provides the object with a destructor.
- [jwidget/Identifiable](jwidget/Identifiable.md) - Provides the object with an unique identifier.
- [jwidget/Listenable](jwidget/Listenable.md) - Interface for an event.
- [jwidget/Bindable](jwidget/Bindable.md) - Interface for a bindable property.
- [jwidget/DestroyableBindable](jwidget/DestroyableBindable.md) - Interface for a destroyable bindable property.
- [jwidget/DestroyablePromise](jwidget/DestroyablePromise.md) - Interface for a promise adapter that can be cancelled.

Auxiliary interfaces:

- [jwidget/Dictionary](jwidget/Dictionary.md) - Interface for a native map.
- [jwidget/Some](jwidget/Some.md) - Interface for some value.

Core class hierarchy and their interfaces:

- [jwidget/Class](jwidget/Class.md), [jwidget/IClass](jwidget/IClass.md) - For life time control.
- [jwidget/Event](jwidget/Event.md), [jwidget/IEvent](jwidget/IEvent.md) - For change notification.
- [jwidget/Property](jwidget/Property.md), [jwidget/IProperty](jwidget/IProperty.md) - For basic binding support.

UI core:

- [jwidget/Component](jwidget/Component.md) - Base class for UI component.
- [jwidget/template](jwidget/template.md) - Annotation supply a [jwidget/Component](jwidget/Component.md) subclass with an HTML template.

Model bindings for [jwidget/Property](jwidget/Property.md):

- [jwidget/Copier](jwidget/Copier.md) - Keeps one property equal to another.
- [jwidget/Mapper](jwidget/Mapper.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Switcher](jwidget/Switcher.md) - Observes several properties.

View bindings for [jwidget/Property](jwidget/Property.md):

- [jwidget/ui/attr](jwidget/ui/attr.md) - Binds attribute to a property.
- [jwidget/ui/cls](jwidget/ui/cls.md) - Binds CSS class to a property.
- [jwidget/ui/css](jwidget/ui/css.md) - Binds CSS style to a property.
- [jwidget/ui/html](jwidget/ui/html.md) - Binds inner HTML to a property.
- [jwidget/ui/on](jwidget/ui/on.md) - Event subscription with aggregation support.
- [jwidget/ui/prop](jwidget/ui/prop.md) - Binds jQuery property to a jWidget property and vice versa.
- [jwidget/ui/radio](jwidget/ui/radio.md) - Binds radio selection to a property and vice versa.
- [jwidget/ui/show](jwidget/ui/show.md) - Binds visibility to a property.
- [jwidget/ui/text](jwidget/ui/text.md) - Binds inner text to a property.
- [jwidget/ui/val](jwidget/ui/val.md) - Binds input value to a property and vice versa.

Collections and their interfaces:

- [jwidget/ReadOnlyCollection](jwidget/ReadOnlyCollection.md) - [jwidget/DestroyableReadOnlyCollection](jwidget/DestroyableReadOnlyCollection.md) - [jwidget/ICollection](jwidget/ICollection.md) - Base interfaces for all collections.
- [jwidget/ReadOnlyList](jwidget/ReadOnlyList.md) - [jwidget/DestroyableReadOnlyList](jwidget/DestroyableReadOnlyList.md) - [jwidget/IList](jwidget/IList.md) - Interfaces for an ordered [jwidget/List](jwidget/List.md).
- [jwidget/ReadOnlyMap](jwidget/ReadOnlyMap.md) - [jwidget/DestroyableReadOnlyMap](jwidget/DestroyableReadOnlyMap.md) - [jwidget/IMap](jwidget/IMap.md) - Interfaces for an associative array aka [jwidget/Map](jwidget/Map.md).
- [jwidget/ReadOnlySet](jwidget/ReadOnlySet.md) - [jwidget/DestroyableReadOnlySet](jwidget/DestroyableReadOnlySet.md) - [jwidget/ISet](jwidget/ISet.md) - Interfaces for an unordered [jwidget/Set](jwidget/Set.md).

Collection synchronizers:

- [jwidget/mapper/list](jwidget/mapper/list.md), [/map](jwidget/mapper/map.md), [/set](jwidget/mapper/collection.md), [/collection](jwidget/mapper/collection.md) - Item mapper.
- [jwidget/filterer/list](jwidget/filterer/list.md), [/map](jwidget/filterer/map.md), [/set](jwidget/filterer/collection.md), [/collection](jwidget/filterer/collection.md) - Filterer.
- [jwidget/counter/list](jwidget/counter/list.md), [/map](jwidget/counter/map.md), [/set](jwidget/counter/collection.md), [/collection](jwidget/counter/collection.md) - Matching item counter.
- [jwidget/indexer/list](jwidget/indexer/list.md), [/map](jwidget/indexer/map.md), [/set](jwidget/indexer/collection.md), [/collection](jwidget/indexer/collection.md) - Converter to a map (indexer).
- [jwidget/convertertoset/list](jwidget/convertertoset/list.md), [/map](jwidget/convertertoset/map.md), [/set](jwidget/convertertoset/collection.md), [/collection](jwidget/convertertoset/collection.md) - Converter to a set.
- [jwidget/convertertolist/list](jwidget/convertertolist/list.md), [/map](jwidget/convertertolist/map.md), [/set](jwidget/convertertolist/collection.md), [/collection](jwidget/convertertolist/collection.md) - Converter to an array (orderer).
- [jwidget/sortercomparing/list](jwidget/sortercomparing/list.md), [/map](jwidget/sortercomparing/map.md), [/set](jwidget/sortercomparing/collection.md), [/collection](jwidget/sortercomparing/collection.md) - Converter to an array (sorter by comparer).
- [jwidget/observer/list](jwidget/observer/list.md), [/map](jwidget/observer/map.md), [/set](jwidget/observer/collection.md), [/collection](jwidget/observer/collection.md) - Content observer.
- [jwidget/inserter/array](jwidget/inserter/array.md), [jwidget/inserter/map](jwidget/inserter/map.md) - View synchronizers.
- [jwidget/merger/array](jwidget/merger/array.md) - Array merger.
- [jwidget/reverser/array](jwidget/reverser/array.md) - Array reverser.

Routing:

- [jwidget/hash](jwidget/hash.md) - Property instance bound to window.location.hash.
- [jwidget/Router](jwidget/Router.md) - URL router.

AJAX and promises:

- [jwidget/AbstractRestProvider](jwidget/AbstractRestProvider.md) - Abstract provider for HTTP requests to RESTful API.
- [jwidget/HttpRequest](jwidget/HttpRequest.md) - Destroyable wrapper around [jqXHR](http://api.jquery.com/jquery.ajax/).
* [jwidget/AllPromise](AllPromise.md) - Destroyable wrapper around [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
* [jwidget/RacePromise](RacePromise.md) - Destroyable wrapper around [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).
- [jwidget/Timeout](jwidget/Timeout.md) - Destroyable wrapper around setTimeout.

Other destroyable adapters:

- [jwidget/Destructor](jwidget/Destructor.md) - Being aggregated, extends object destruction logic.
- [jwidget/Interval](jwidget/Interval.md) - Destroyable version of setInterval.

Other tools:

- [jwidget/DomInserter](jwidget/DomInserter.md) - Provides a way to synchronize view to model without [jwidget/Component](jwidget/Component.md) creation.
- [jwidget/DomTemplate](jwidget/DomTemplate.md) - Provides a way to reuse an existing DOM structure in a new [jwidget/Component](jwidget/Component.md) instance.
- [jwidget/HtmlTemplate](jwidget/HtmlTemplate.md) - Well-optimized template engine with `jwclass` and `jwid` support.
- [jwidget/Reducer](jwidget/Reducer.md) - Various commonly used arguments for [reduce](jwidget/ReadOnlyCollection.md#reduce) method calls.

References (low level stuff):

- [jwidget/AbstractDestroyablePromise] - Abstract implementation of [jwidget/DestroyablePromise].
- [jwidget/AbstractTemplate](jwidget/AbstractTemplate.md) - Abstract template for [jwidget/Component].
- [jwidget/dummyDestroyable](jwidget/dummyDestroyable.md) - Dummy implementation of [jwidget/Destroyable](jwidget/Destroyable.md).
- [jwidget/dummyEvent](jwidget/dummyEvent.md) - Dummy implementation of [jwidget/IEvent](jwidget/IEvent.md).
- [jwidget/IndexCount](jwidget/IndexCount.md) - Number pair for various [jwidget/List](jwidget/List.md) methods.
- [jwidget/IndexItems](jwidget/IndexItems.md) - Number and item array for various [jwidget/List](jwidget/List.md) methods.
- [jwidget/ListSpliceResult](jwidget/ListSpliceResult.md) - Result of List.[splice](jwidget/IList.md#splice) method call.
- [jwidget/TemplateOutput](jwidget/TemplateOutput.md)
