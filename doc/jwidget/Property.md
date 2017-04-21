[Back to index](../README.md)

# Property

## Consumption

	import Property from "jwidget/Property";

## Hierarchy

* class Property<V> extends [jwidget/Class](Class.md)

## Description

The observable property. A convenient way to keep an object in sync with another object.

Provides the next model bindings:

- [jwidget/Copier](Copier.md) - Keeps one property equal to another.
- [jwidget/Functor](Functor.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Mapper](Mapper.md) - Keeps one property as a result of the function from several other properties.
- [jwidget/Updater](Updater.md) - Observes several properties.
- [jwidget/Switcher](Switcher.md) - Observes several properties.

Also, provides the next view bindings:

- [jwidget/ui/attr](ui/attr.md) - Binds attribute to a property.
- [jwidget/ui/class](ui/class.md) - Binds CSS class to a property.
- [jwidget/ui/css](ui/css.md) - Binds CSS style to a property.
- [jwidget/ui/html](ui/html.md) - Binds inner HTML to a property.
- [jwidget/ui/on](ui/on.md) - Event subscription with aggregation support.
- [jwidget/ui/prop](ui/prop.md) - Binds jQuery property to a jWidget property.
- [jwidget/ui/radio](ui/radio.md) - Binds radio selection to a property.
- [jwidget/ui/show](ui/show.md) - Binds visibility to a property.
- [jwidget/ui/text](ui/text.md) - Binds inner text to a property.
- [jwidget/ui/val](ui/val.md) - Binds input value to a property.

All bindings are standalone classes and functions - you can implement your own binding if you want.

You can use the next algorithm to change localization on fly in your Web application:

	import Property from "jwidget/Property";
	import text from "jwidget/ui/text";

	const locale: any = {
		en: {
			hi: "Hi",
			bye: "Bye"
		},
		ru: {
			hi: "Привет",
			bye: "Пока"
		}
	};
	const language = new Property("en");
	const hi = language.mapValue((language) => locale[language].hi);
	const bye = language.mapValue((language) => locale[language].bye);
	text($("#hi"), hi);
	text($("#bye"), bye);

	// Now you can change localization easily
	language.set("ru");

In reality, you should [aggregate](Class.md) results of [mapValue](#mapValue) and [text](ui/text.md) calls to release the resources properly and prevent side effects.

## Constructor

	new Property(value: V = null)

* **value** - Initial value.

## Properties

### changeEvent

	changeEvent: Event<PropertyChangeEventParams<V>>

Reference: [jwidget/Event](Event.md), [PropertyChangeEventParams](#propertychangeeventparams).

Property value is changed. Triggered in result of [set](#set) method call if the value has been changed.

## Methods

### get

	get(): V

Returns current property value. Think twice before calling this method - probably it makes sense to use some kind of binding instead?

### set

	set(value: V)

Changes property value and triggers [changeEvent](#changeevent) if the value has been changed.

### ownValue

	ownValue(): this

Makes this property an owner of its value. It means that the value is destroyed automatically on reassignment or destruction of the property.

### bindTo

	bindTo<U extends V>(source?: Property<U>)

* **source** - Source property to bind to. Omit to simply unbind.

Binds this property to another property using a [jwidget/Copier](Copier.md). Unbinds a previously bound property.

### mapValue

	mapValue<U>(callback: (value: V) => U, scope?: any): Property<U>

* **callback** - Mapping function.
* **scope** - **callback** call scope. Defaults to the property itself.

Builds a new property containing the result of the callback function called on this property value. To stop synchronization, destroy the result property. In comparison to [mapObject](#mapobject) method, doesn't destroy the previously assigned target values.

### mapObject

	mapObject<U extends Destroyable>(callback: (value: V) => U, scope?: any): Property<U>

* **callback** - Mapping function.
* **scope** - **callback** call scope. Defaults to the property itself.

Reference: [jwidget/Destroyable](Destroyable.md).

Builds a new property containing the result of the callback function called
on this property value. To stop synchronization, destroy the result property.
In comparison to [mapValue](#mapvalue) method, destroys the previously assigned target values.

# PropertyChangeEventParams

## Consumption

	import {PropertyChangeEventParams} from "jwidget/Property";

## Hierarchy

* interface PropertyChangeEventParams<V>

## Description

[Property.changeEvent](#changeevent) params.

* **sender**: Property<V> - Sender property.
* **value**: V - New value.
* **oldValue**: V - Old value.
