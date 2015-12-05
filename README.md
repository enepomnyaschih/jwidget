## Guides and API documentation

http://enepomnyaschih.github.io/jwidget/#!/guide/home

http://enepomnyaschih.github.io/jwidget/#!/api

## Changelog

### 1.4.2 (December 5, 2015)

- Fixed a bug in [addAll](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-addAll) and [tryAddAll](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-tryAddAll) causing stack overflow on big data arrays

### 1.4.1 (November 29, 2015)

[JW.Plugins.Router](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Router) enhancements.

Breaking changes:

- [update](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Router-method-update) method call is mandatory on initialization. It is not called in constructor anymore. This allows you to assign router instance to a class field before initial routing
- [separator](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Router-cfg-separator) can not be specified as string anymore. Instead, you may use a regular expression
- Default [separator](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Router-cfg-separator) considers questionmarks in addition to slashes
- Only one router stack is supported at any moment. Two routers can not work in parallel - the second router is assumed to be a subrouter of the first one
- [JW.UI.hash](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI-static-property-hash) is two-way bound to location.hash now. Before, JW.UI.hash reassignment didn't impact location.hash

New features:

- Introduced redirections. See [JW.Plugins.Router](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Router) class description

### 1.4 (November 7, 2015)

New features:

- Introduced [jQuery adapter methods](http://enepomnyaschih.github.io/jwidget/index.html#!/api/jQuery), deprecated corresponding [JW.Property](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Property) helper classes ([#122](https://github.com/enepomnyaschih/jwidget/issues/122))
- Added clear-div persistence feature for [JW.UI.Component](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI.Component) child collections ([#116](https://github.com/enepomnyaschih/jwidget/issues/116))

### 1.3.1 (October 10, 2015)

- Fixed critical bug causing exceptions in component destruction method

### 1.3

Breaking changes:

- New virtual method [destroyObject](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroyObject) is introduced. In the majority of cases, you should override [destroyObject](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroyObject) method instead of [destroy](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroy) in subclasses. Here's the difference:
  - Code of [destroy](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroy) method is executed **before** aggregated objects destruction. `_super` method should be called at the end. We recommend you to keep pre-destruction logic here. For example, [JW.UI.Component](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI.Component) removes child components in [destroy](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroy) method to make sure that aggregated child components can be destroyed properly
  - Code of [destroyObject](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroyObject) method is executed **after** aggregated objects destruction. `_super` method should be called at the end. We recommend you to release object resources here. The majority of jWidget classes release their resources here now, after aggregated objects destruction

New features:

- Added simplified methods to create property mapper: [$$mapValue](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Property-method-S-S-mapValue), [$$mapObject](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Property-method-S-S-mapObject) ([#103](https://github.com/enepomnyaschih/jwidget/issues/103))
- Added simplified methods to create all kinds of synchronizers: [$$mapValues](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-mapValues), [$$mapObjects](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-mapObjects), [$$filter](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-filter), [$$count](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-count), [$$toSet](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-toSet), [$$index](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-index), [$$toArray](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-toArray), [$$toSortedComparing](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-S-toSortedComparing), [$$merge](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-S-S-merge), [$$toReversed](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-S-S-toReversed) ([#103](https://github.com/enepomnyaschih/jwidget/issues/103))
- Added new collection methods for consistency: [$count](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-S-count), [merge](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-merge), [$merge](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-S-merge), [reverse](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-reverse), [toReversed](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-toReversed), [$toReversed](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-S-toReversed) ([#103](https://github.com/enepomnyaschih/jwidget/issues/103))
- Added [JW.Plugins.Router](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Router) plugin ([#121](https://github.com/enepomnyaschih/jwidget/issues/121))

Improvements:

- Improved many samples in documentation

### 1.2

Breaking changes:

- All variations of Maps' [setAll](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractMap-method-setAll) and [removeAll](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractMap-method-removeAll) methods don't return anything (performance optimization). Item destruction order in "ownItems" mode may differ, but you shouldn't rely on that anyway in Maps. To find old behaviour, use [setAllVerbose](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractMap-method-setAllVerbose) and [removeAllVerbose](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractMap-method-removeAllVerbose) methods. Methods [trySetAll](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractMap-method-trySetAll) and [tryRemoveAll](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractMap-method-tryRemoveAll) work as before ([#100](https://github.com/enepomnyaschih/jwidget/issues/100))

New features:

- Added [unordered child component collections support](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI.Component-method-addCollection) for JW.UI.Component ([#106](https://github.com/enepomnyaschih/jwidget/issues/106))
- Added [JW.UI.JQEventAttachment](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI.JQEventAttachment) along with a shorthand jQuery method [jwon](http://enepomnyaschih.github.io/jwidget/index.html#!/api/jQuery-method-jwon) ([#107](https://github.com/enepomnyaschih/jwidget/issues/107))
- Added [JW.UI.ClassNameUpdater](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI.ClassNameUpdater) ([#96](https://github.com/enepomnyaschih/jwidget/issues/96))
- Added `order` argument to [JW.AbstractArray.binarySearch](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractArray-method-binarySearch) method. Added [`order`](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection.SorterComparing-cfg-order) config option to JW.AbstractCollection.SorterComparing ([#94](https://github.com/enepomnyaschih/jwidget/issues/94))
- Added `lang` argument to JW.Plugins.Locale [expandTemplate](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Locale-method-expandTemplate) method. Added new methods: [getRawString](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Locale-method-getRawString), [hasString](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Locale-method-hasString), [getProperty](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Locale-method-getProperty), [getTemplateProperty](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Locale-method-getTemplateProperty) ([#108](https://github.com/enepomnyaschih/jwidget/issues/108))
- Added `config` argument to JW.Plugins.Locale [getFunctor](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Locale-method-getFunctor) and [getTemplateFunctor](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Plugins.Locale-method-getTemplateFunctor) methods ([#97](https://github.com/enepomnyaschih/jwidget/issues/97))

Improvements:

- Improved performance drastically for the majority of [JW.Map](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Map) methods ([#100](https://github.com/enepomnyaschih/jwidget/issues/100))
- Improved JW.AbstractSet.tryClear method performance for non-adapters ([#113](https://github.com/enepomnyaschih/jwidget/issues/113))
- Reworked all item removal methods in observable collections to destroy the owned items *after* events triggering. As an outcome, you can use [ownItems](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.AbstractCollection-method-ownItems) method now to destroy the UI component collections ([#112](https://github.com/enepomnyaschih/jwidget/issues/112))
- Protected JW.Property.destroy method to memory leaks

Bug fixes:

- Fixed return value for JW.UI.Component [render](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI.Component-method-render) method - now it is always chainable ([#98](https://github.com/enepomnyaschih/jwidget/issues/98))
- Fixed context loss in JW.IndexedCollection [getSortingKeysComparing](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.IndexedCollection-method-getSortingKeysComparing) method ([#101](https://github.com/enepomnyaschih/jwidget/issues/101))

### 1.1

Breaking changes:

- Removed synchronizer creation static methods from JW.Array, JW.Map, JW.Set, because they are useless

New features:

- Matching item counting method and synchronizer: JW.AbstractCollection.count, JW.AbstractCollection.Counter ([#90](https://github.com/enepomnyaschih/jwidget/issues/90))
- "target" is now a config option in JW.UI.*Listener for consistency ([#87](https://github.com/enepomnyaschih/jwidget/issues/87))
