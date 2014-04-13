# jWidget philosophy

Below, see common rules which jWidget framework philosophy is built on top of:

**Model and view**

1. All main application classes are classified to model and view.
1. Model classes store the data. All data is stored in model. All model classes should be inherited from JW.Class.
1. View classes (components) render data to the screen. All components should be inherited from JW.UI.Component.
1. Component has direct references to corresponding models. On user action, component calls corresponding
method of model in order to modify it.
1. Model doesn't have direct references to any views, but it triggers events about its modification.
1. View listens model events to make neccessary updates on the screen in time.

**Object destruction**

1. All objects must be issued for destruction when you don't need them anymore. It is neccessary for resource
releasing and events unbinding.
1. The one who issued an object creation must destroy it.
1. It is optimal to destroy the objects using aggregation mechanism implemented by method {@link JW.Class#own own}, or
using the internal features of the classes:
    - Method JW.Property#ownValue
    - Method JW.AbstractCollection#ownItems
    - Config options JW.Switcher#done and JW.AbstractCollection.Mapper#destroyItem
1. Sometimes it is acceptable to destroy the objects explicitly using method {@link JW.Class#destroy destroy}.

**Data binding**

1. Objects and DOM-elements should never be recreated without a strong reason. Instead, they must be updated using
data binding.
1. Data binding of single values is performed using JW.Property class and its helpers.

**Data binding in collections**

1. Data and components are structured based on three collection types: JW.AbstractArray, JW.AbstractMap and
JW.AbstractSet. All collections have common interfaces: JW.AbstractCollection, JW.IndexedCollection.
Read common theory of algorithms and data structures to understand each collection type area of usage, pros and cons.
1. Each collection has two implementations: simple (JW.Array, JW.Map, JW.Set) and observable
(JW.ObservableArray, JW.ObservableMap, JW.ObservableSet). Observable collections trigger events about their
modification.
1. You don't need to listen all collection events manually. Instead, we recommend you to use standard jWidget
{@link JW.AbstractCollection synchronizers}. Synchronizers provide a simple way to connect collections to each other.
1. Collections are closed inside synchronizer methods. In other words, any modification of one collection triggers
at most one modification of another collection, which is connected to the first one using standard synchronizer.
1. Almost any user action can be handled by a single manual collection modification in model. All other collections
(including component collections in the view) must be synchronized automatically via synchronizers.
1. For proper and fast application running, it is enough to configure all synchronizers only once, similarly to
indexes and foreign keys configuration in data bases.
