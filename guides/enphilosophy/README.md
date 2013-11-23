# jWidget philosophy

jWidget framework differs from other well-known UI-frameworks (regardless of programming language) by its philosophy.
Here are common rules for all Model-View frameworks:

1. All main application classes are classified to model and view.
1. Model classes store the data. All data is stored in model. All model classes should be inherited from JW.Class.
1. View classes (components) render data to the screen. All components should be inherited from JW.UI.Component.
1. Component has a direct reference to corresponding model. On user action, component calls corresponding
method of model in order to modify it.
1. Model doesn't have direct references to any views, but it triggers events about its modification.
1. View listens model events to make neccessary updates on the screen in time.

But the difference of jWidget compared to other frameworks is the approach to collection manupulations.
It is very similar to database theory generals, but at the UI level. Collection manipulation rules in jWidget
are listed below:

1. Data and components are structured based on three collection types: JW.AbstractArray, JW.AbstractMap and
JW.AbstractSet. All collections have common interfaces: JW.AbstractCollection, JW.IndexedCollection.
Read common theory of algorithms and data structures to understand each collection type area of usage, pros and cons.
1. Each collection has two implementations: simple (JW.Array, JW.Map, JW.Set) and observable
(JW.ObservableArray, JW.ObservableMap, JW.ObservableSet). Observable collections trigger events about their
modification.
1. You don't need to listen all collection events manually. Instead, we recommend you to use standard jWidget
synchronizers. Synchronizers provide a simple way to connect collections to each other:
    - Item mapper: JW.AbstractCollection.Mapper
    - Filterer: JW.AbstractCollection.Filterer
    - Converter to set: JW.AbstractCollection.Lister
    - Converter to map (indexer): JW.AbstractCollection.Indexer
    - Converter to array (orderer): JW.AbstractCollection.Orderer
    - Converter to array (sorter by comparer): JW.AbstractCollection.SorterComparing
    - Observer: JW.AbstractCollection.Observer
    - View synchronizers: JW.AbstractArray.Inserter, JW.AbstractMap.Inserter
    - Arrays merger: JW.AbstractArray.Merger
    - Array reverser: JW.AbstractArray.Reverser
1. Collections are closed inside synchronizer methods. In other words, any modification of one collection triggers
at most one modification of another collection, which is connected to the first one using standard synchronizer.
1. Almost any user action can be handled by a single manual collection modification in model. All other collections
(including component collections in the view) must be synchronized automatically via synchronizers.
1. For proper and fast application running, it is enough to configure all synchronizers only once, similarly to
indexes and foreign keys configuration in data bases.
1. There should be no difference between simple and observable collection manipulations. Although it is enough to
call some algorithm to convert one simple collection to another
({@link JW.AbstractCollection#method-index index},
{@link JW.AbstractCollection#method-toSortedComparing toSortedComparing},
{@link JW.AbstractCollection#method-toSet toSet} etc.), it is recommended to instantiate a synchronizer instead
({@link JW.AbstractCollection#method-createIndexer createIndexer},
{@link JW.AbstractCollection#method-createSorterComparing createSorterComparing},
{@link JW.AbstractCollection#method-createLister createLister} correspondingly). Code quality, performance and size
won't be damaged too much. But the bonus is you'll be able to replace simple implementation with
observable one by a simple base class change. But in some complicated cases sycnhronizers configuration can be way too
expensive: keep the balance.
1. Objects and DOM-elements should be never recreated: only updated.
1. The one who has created an object must destroy it. The only exception is JW.UI.Component.children, which contents
are destroyed automatically for convenience.
