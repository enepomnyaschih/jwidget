# What is jWidget?

jWidget is object-oriented JavaScript library for applications development based on Model-View architecture.

jWidget Lib unit is responsible for Model implementation, jWidget UI - for View implementation.

**jWidget Lib** provides a number of utility classes and functions. jWidget Lib doesn't depend on any third-party
libraries and frameworks. jWidget Lib is equally good for JavaScript and NodeJS applications development.

jWidget Lib features:

* Base class JW.Class for classes creation and inheritance
* Class JW.Event for user events management
* Collection classes, algorithms, **synchronizers** (see JW.AbstractCollection)

**jWidget UI** is a small object-oriented unit for arbitrary UI components creation in JavaScript based on
HTML templates. jWidget UI is based on [jQuery](http://jquery.com) and it is the perfect solution for applications
development with custom UI.

jWidget UI features:

* Base class JW.UI.Component for UI components creation and inheritance with HTML templates
* Application tree structure (parent and child components management)
* Integration with collections of jWidget Lib which automatically synchronizes view with model
* Integration with [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/) which lets you to extract
HTML templates into separate files

Project license is LGPL.

Current version: 0.8

<font size="5">[Download jWidget](guides/endownload/jwidget.zip)</font>

<font size="5">[Source code and bug tracker on GitHub](https://github.com/enepomnyaschih/jwidget)</font>

Feel free to contact me by email [enepomnyaschih@gmail.com](mailto:enepomnyaschih@gmail.com) if you have any questions
or bug reports.
