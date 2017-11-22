[Back to index](../README.md)

# template



## Consumption

	import * as template from "jwidget/template";

## Description

Defines HTML templates for a [jwidget/Component](Component.md) subclass.

You can define multiple templates for any subclass of [jwidget/Component](Component.md). Each template has a name. You can get component template via [jwidget/Component.templates](Component.md#templates) dictionary.

Templates are inherited along with component classes.

Each component class has at least one template, its name is `main`. This is the main template which is used to render the component. By default, `main` equals to `<div></div>`. Usually, `main` template is enough for the majority of components. This template is applied automatically, unlike other templates which should be applied manually.

With WebPack, you can easily extract the templates to separate HTML files. See [Integration with WebPack](Component.md#integration-with-webpack).

## Semantics

	function(template: string, id?: string): any

* **template** - Template HTML string.
* **id** - Template name to add or override. Defaults to "main".

	function(tpls: Dictionary<string>): any;

* **tpls** - Templates to add or override.
