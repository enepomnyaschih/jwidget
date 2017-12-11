[Back to index](../README.md)

# DestroyableBindable



## Consumption

	import DestroyableBindable from "jwidget/DestroyableBindable";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Bindable](Bindable.md)`<V>`
	* interface **jwidget/DestroyableBindable**`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class [jwidget/Property](Property.md)`<V>`

## Description

Extension of [jwidget/Bindable](Bindable.md) interface with [destroy](Destroyable.md#destroy) method. If some method returns **DestroyableBindable**, probably it establishes some kind of binding and wants you to take control over this binding life time. Usually that means that you must aggregate it via [own](Class.md#own) method.

In the next example, val function returns **DestroyableBindable**<string>, so we are supposed to aggregate it. Life time of ValueLogger can be shorter than "el" element life time, so ValueLogger must aggregate the binding to cancel it on destruction.

**Example 1.** Value logger.

	class ValueLogger extends Class {
		constructor(el: JQuery) {
			const value = this.own(val(el));
			value.map((value) => console.log(value));
		}
	}

References: [jwidget/Class](Class.md), [jwidget/ui/val](ui/val.md).

In some cases, binding destruction is not obligatory. In the next example, the component binds a property to its own element, so garbage collector will take everything away on component destruction anyway. So, it doesn't make much sense to aggregate the binding explicitly.

**Example 2.** Typical binding to own DOM element.

	@template('<div><input type="text" jwid="input"></div>')
	class App extends Component {
		renderInput(el: JQuery) {
			const value = val(el);
			value.map((value) => console.log(value));
		}
	}

References: [jwidget/Component](Component.md), [jwidget/template](template.md), [jwidget/ui/val](ui/val.md).

## Members

See the inherited members in [jwidget/Destroyable](Destroyable.md) and [jwidget/Bindable](Bindable.md).
