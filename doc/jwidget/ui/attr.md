[Back to index](../../README.md)

# ui/attr



## Consumption

	import * as ui/attr from "jwidget/ui/attr";

## Description

Watches string property modification and updates the specified attribute of the DOM element. Destroy the returned object to stop synchronization.

    // Bind "title" attribute to title property value
    this.own(attr("title", title));

<iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwattr.html"></iframe>

## Signature

	(el: JQuery, attr: string, property: Bindable<any>): Destroyable

* **el** - DOM element.
* **attr** - DOM element attribute name.
* **property** - Attribute value to assign.

Reference: [jwidget/Bindable](../Bindable.md), [jwidget/Destroyable](../Destroyable.md).
