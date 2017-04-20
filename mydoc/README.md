# What is jWidget?

jWidget is an object-oriented TypeScript Model-View framework. Being direct competitor to Backbone, AngularJS and EmberJS, jWidget is a good choice for developers who respect the principles of object-oriented programming and appreciate good application performance.

### jWidget features

* Base class [jwidget/Class](jwidget/Class.md) for object aggregation.
* Event class [jwidget/Event](jwidget/Event.md) for change notification.
* Observable property class [jwidget/Property](jwidget/Property.md) for basic binding support.
* Collection classes [jwidget/AbstractArray](jwidget/AbstractCollection.md), [jwidget/AbstractMap], [jwidget/AbstractSet] for collection binding support.
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

## API documentation

Unfortunately, code documentation tools for TypeScript are not yet mature enough to generate comprehensive code documentation, so we've decided to document the API manually as Markdown files in GitHub. Please find all neccessary info in the list below.

Core:

- [jwidget/Core](jwidget/Core.md) - Core utilities.
- [jwidget/Destroyable] - Interface for a destroyable object.
- [jwidget/Dictionary] - Interface for a native map.
- [jwidget/Class](jwidget/Class.md) - Base class for object aggregation.
- [jwidget/Event](jwidget/Event.md) - Event class for change notification.
- [jwidget/EventAttachment](jwidget/Event.md) - Destroyable event attachment.
- [jwidget/Property](jwidget/Property.md) - Observable property for basic binding support.
- [jwidget/Component] - Base class for UI component.
- [jwidget/template] - Annotation for HTML template attachment to a [jwidget/Component] subclass.

Model bindings for [jwidget/Property](jwidget/Property.md):

- [jwidget/Copier] - Keeps one property equal to another.
- [jwidget/Functor] - Keeps one property as a result of the function from several other properties.
- [jwidget/Mapper] - Keeps one property as a result of the function from several other properties.
- [jwidget/Updater] - Observes several properties.
- [jwidget/Switcher] - Observes several properties.

View bindings for [jwidget/Property]:

- [jwidget/ui/attr] - Binds attribute to a property.
- [jwidget/ui/class] - Binds CSS class to a property.
- [jwidget/ui/css] - Binds CSS style to a property.
- [jwidget/ui/html] - Binds inner HTML to a property.
- [jwidget/ui/on] - Event subscription with aggregation support.
- [jwidget/ui/prop] - Binds jQuery property to a jWidget property.
- [jwidget/ui/radio] - Binds radio selection to a property.
- [jwidget/ui/show] - Binds visibility to a property.
- [jwidget/ui/text] - Binds inner text to a property.
- [jwidget/ui/val] - Binds input value to a property.

Collections:

- [jwidget/AbstractCollection] - Base class for all collections.
- [jwidget/IndexedCollection] - Base class for indexed collections ([jwidget/AbstractArray] and [jwidget/AbstractMap]).
- [jwidget/AbstractArray] aka ordered collection.
- [jwidget/AbstractMap] aka associative array.
- [jwidget/AbstractSet] aka unordered collection.

Collection synchronizers:

- [jwidget/mapper] - Item mapper.
- [jwidget/filterer] - Filterer.
- [jwidget/counter] - Matching item counter.
- [jwidget/lister] - Converter to a set.
- [jwidget/indexer] - Converter to a map (indexer).
- [jwidget/orderer] - Converter to an array (orderer).
- [jwidget/sortercomparing] - Converter to an array (sorter by comparer).
- [jwidget/observer] - Observer.
- [jwidget/inserter/array], [jwidget/inserter/map] - View synchronizers.
- [jwidget/merger/array] - Array merger.
- [jwidget/reverser/array] - Array reverser.

Collection utilities:

- [jwidget/ArrayUtils]
- [jwidget/MapUtils]
- [jwidget/SetUtils]

Other tools:

- [jwidget/HtmlTemplate] - Well-optimized template engine with `jwclass` and `jwid` support.

## Low-level stuff

Collection interface & class hierarchy

- [jwidget/AbstractCollection]<T> implements [jwidget/ICollection]<T>
-- [jwidget/IndexedCollection]<K, T> extends [jwidget/AbstractCollection]<T> implements [jwidget/IIndexedCollection]<K, T>
--- [jwidget/AbstractArray]<T> extends [jwidget/IndexedCollection]<number, T> implements [jwidget/IArray]<T>
---- [jwidget/JWArray]<T> extends [jwidget/AbstractArray]<T>
---- [jwidget/ObservableArray]<T> extends [jwidget/AbstractArray]<T>
--- [jwidget/AbstractMap]<T> extends [jwidget/IndexedCollection]<string, T> implements [jwidget/IMap]<T>
---- [jwidget/JWMap]<T> extends [jwidget/AbstractMap]<T>
---- [jwidget/ObservableMap]<T> extends [jwidget/AbstractMap]<T>
-- [jwidget/AbstractSet]<T extends [jwidget/IClass]> extends [jwidget/AbstractCollection]<T> implements [jwidget/ISet]<T>
--- [jwidget/JWSet]<T extends [jwidget/IClass]> extends [jwidget/AbstractSet]<T>
--- [jwidget/ObservableSet]<T extends [jwidget/IClass]> extends [jwidget/AbstractSet]<T>
