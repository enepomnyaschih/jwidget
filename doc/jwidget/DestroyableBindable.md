[Back to index](../README.md)

# DestroyableBindable

## Consumption

	import DestroyableBindable from "jwidget/DestroyableBindable";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)`<V>`
* interface [jwidget/Bindable](Bindable.md)`<V>`
	* interface **jwidget/DestroyableBindable**`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class [jwidget/Property](Property.md)`<V>`

## Description

Extension of [jwidget/Bindable](Bindable.md) interface with [destroy](Destroyable.md#destroy) method. If some method returns **DestroyableBindable**, probably it establishes some kind of binding and wants you to take control over this binding life time. Usually that means that you must aggregate it via [own](Class.md#own) method.

In the next example, the life time of ValueLogger can be shorter than "el" element life time, so ValueLogger must clear all its consequences on destruction, so it aggregates the binding.

**Example 1.** Value logger.

	import Class from "jwidget/Class";
	import val from "jwidget/ui/val";

	class ValueLogger extends Class {
		constructor(el: JQuery) {
			// val function returns DestroyableBindable<string>,
			// so we are supposed to aggregate it
			const value = this.own(val(el));

			// Log all input value updates to console
			value.map((value) => console.log(value));
		}
	}

In some cases, binding destruction is not obligatory. In the next example, the component binds a property to its own element, so garbage collector will take everything away on component destruction anyway. So, it doesn't make much sense to aggregate the binding explicitly.

**Example 2.** Typical binding to own DOM element.

	import Component from "jwidget/Component";
	import template from "jwidget/template";
	import val from "jwidget/ui/val";

	@template('<div><input type="text" jwid="input"></div>')
	class App extends Component {
		renderInput(el: JQuery) {
			// el is a child element, so the binding won't
			// take effect after component destruction even without "own" call
			const value = val(el);

			// logs all input value updates to console
			value.map((value) => console.log(value));
		}
	}

## Members

See the inherited members in [jwidget/Destroyable](Destroyable.md) and [jwidget/Bindable](Bindable.md).
