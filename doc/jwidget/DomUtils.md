[Back to index](../README.md)

# DOM utilities

* **Functions**
	* [template](#template)
	* [isElement](#iselement)
	* [isTextInput](#istextinput)
	* [inDom](#indom)
	* [inEl](#inel)
	* [hasClass](#hasclass)
	* [addClass](#addclass)
	* [parseHtml](#parsehtml)
	* [insert](#insert)
	* [remove](#remove)
	* [replace](#replace)

## Consumption

	import * as DomUtils from "jwidget/DomUtils";

## Description

jWidget utilities for HTML DOM in addition to [jQuery](http://api.jquery.com/). Usually you don't need them if you use [jwidget/Component](Component.md) to manipulate DOM. These are low-level alternatives to existing jQuery methods which work much faster, because they don't perform any safety checks.

## Functions

### template

    template(cls: any, tpls: Dictionary<string>)

Reference: [jwidget/Dictionary](Dictionary.md).

Defines HTML templates for specified [jwidget/Component](Component.md) subclass.
See [jwidget/template](template.md) for details.

### isElement

    isElement(value: any): boolean

Checks if value is a [jQuery](http://api.jquery.com/) element.

### isTextInput

    isTextInput(el: JQuery): boolean
    isTextInput(el: Element): boolean

Checks if the element is a text input, i.e. one of:

* `<input type="text">`
* `<input type="password">`
* `<input type="email">`
* `<input type="number">`
* `<input type="search">`
* `<input type="tel">`
* `<input type="url">`
* `<textarea></textarea>`

### inDom

    inDom(el: HTMLElement): boolean

Checks if current HTML document body contains the specified element.

### inEl

    inEl(descendantEl: HTMLElement, ancestorEl: HTMLElement): boolean

Checks recursively if one HTML element is a descendant of another element.

### hasClass

    hasClass(el: HTMLElement, cls: string): boolean

Checks if element contains the specified CSS class name.

### addClass

    addClass(el: HTMLElement, cls: string)

Adds the specified CSS class name to element unless it already contains it.

### parseHtml

    parseHtml(html: string): HTMLElement

Parses HTML and builds a new DOM element. Doesn't perform any validation, but works much faster than jQuery alternatives. Use it only if you are author of this HTML code.

### insert

    insert(parent: Node, child: Node, index?: number)

Inserts element as a child at specified position.

### remove

    remove(el: Node)

Removes element from DOM.

### replace

    replace(removeEl: HTMLElement, insertEl: HTMLElement, attrs?: boolean)

Replaces one HTML element with another.

If `attrs` is true, it retains element `id` and `class`, i.e.:

* assigns `insertEl.id` to `removeEl.id` if one is defined;
* adds all CSS class names of `removeEl` to `insertEl`.

This is how root element of [jwidget/Component](Component.md) is enhanced when inserted to another Component as a child.
