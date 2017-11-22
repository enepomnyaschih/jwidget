[Back to index](../README.md)

# IClass

* **Methods**
	* [own](#own)
	* [owning](#owning)

## Consumption

	import IClass from "jwidget/IClass";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Identifiable.md)
	* interface **jwidget/IClass**
		* class [jwidget/Class](Class.md)
		* interface [jwidget/ICollection](ICollection.md)`<T>`

## Description

Interface of [jwidget/Class](Class.md) - see it for details.

## Properties

See inherited properties in [jwidget/Identifiable](Identifiable.md).

## Methods

See inherited methods in [jwidget/Destroyable](Destroyable.md).

### own

	own<T extends Destroyable>(obj: T): T

Reference: [jwidget/Destroyable](Destroyable.md).

Aggregates the object. It means that the specified object is automatically destroyed
on this object destruction. The aggregated objects are destroyed in reverse order.
Returns the aggregated object, which makes it easy to use in field definition:

	private selected = this.own(new Property(false));

### owning

	owning(obj: Destroyable): this

Reference: [jwidget/Destroyable](Destroyable.md).

Aggregates the object. It means that the specified object is automatically destroyed
on this object destruction. The aggregated objects are destroyed in reverse order.
Returns this object, which makes it easy to use in object instantiation:

	const items = new List();
	return new Panel(items).owning(items);
