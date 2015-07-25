## Guides and API documentation

http://enepomnyaschih.github.io/jwidget/#!/guide/home

http://enepomnyaschih.github.io/jwidget/#!/api

## Changelog

### 1.1

Breaking changes:

- Removed synchronizer creation static methods from JW.Array, JW.Map, JW.Set, because they are useless

New features:

- Matching item counting method and synchronizer: JW.AbstractCollection.count, JW.AbstractCollection.Counter ([#90](https://github.com/enepomnyaschih/jwidget/issues/90))
- "target" is now a config option in JW.UI.*Listener for consistency ([#87](https://github.com/enepomnyaschih/jwidget/issues/87))
