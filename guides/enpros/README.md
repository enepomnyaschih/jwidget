# jWidget advantages

jWidget has one main advantage compared to other Model-View frameworks - it is **collection synchronizers**
(see JW.AbstractCollection). This is framework author's own idea which he never met in any other framework
regardless of programming language. It is innovation. But that's not all. Let's compare jWidget with other
similar JS-frameworks in details.

## Backbone.js

[Backbone.js](http://backbonejs.org) - popular Model-View framework, which is the most similar to jWidget.

jWidget advantages compared to Backbone.js:

- Richer collection library, wider range of algorithms and events
- Synchronizers
- Doesn't suppose components to be redrawn totally on each model update
- Works way faster (though code is a bit more dirty)

Backbone fits well for small applications development, where performance is not critical. For larger and more dynamic
applications jWidget will be a better choice.

## ExtJS

[ExtJS](http://www.sencha.com/products/extjs) provides Model-View architecture too, but it has a completely
different philosophy. Entire application logic is focused in controller classes, and it brings UI events handling
out of view. This approach is bound to DOM Query a lot (CSS-selector analogue). In my opinion, it is not really
scalable, because a big number of CSS selectors look like a mess.

jWidget advantages compared to ExtJS:

- Richer collection library (ExtJS doesn't have set and observable map)
- Synchronizers
- Easier to develop new UI components from scratch (though jWidget doesn't provide any components out of the box)
- Lighter by size
- LGPL license

Sure, nothing can compete with ExtJS by amount and quality of UI components, given out of the box. If you are happy
with ExtJS license and ExtJS components are enough to implement your application without any tricks, then it will be
the best choice. But for flexible slicing jWidget or Backbone will fit better. In general, I think that jWidget's
approach to Model-View architecture is way more convenient and effective compared to ExtJS.
