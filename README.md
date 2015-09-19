﻿## Guides and API documentation

http://enepomnyaschih.github.io/jwidget/#!/guide/home

http://enepomnyaschih.github.io/jwidget/#!/api

## Changelog

### 1.3

Breaking changes:

- New virtual method [destroyObject](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroyObject) is introduced. In the majority of cases, you should override [destroyObject](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroyObject) method instead of [destroy](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroy) in subclasses. Here's the difference:
-- Code of [destroy](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroy) method is executed **before** aggregated objects destruction. `_super` method should be called at the end. We recommend you to keep pre-destruction logic here. For example, [JW.UI.Component](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.UI.Component) removes child components in [destroy](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroy) method to make sure that aggregated child components can be destroyed properly.
-- Code of [destroyObject](http://enepomnyaschih.github.io/jwidget/index.html#!/api/JW.Class-method-destroyObject) method is executed **after** aggregated objects destruction. `_super` method should be called at the end. We recommend you to release object resources here. The majority of jWidget classes release their resources here now, after aggregated objects destruction.

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
