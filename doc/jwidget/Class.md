# Class

## Consumption

	import IClass from "jwidget/IClass";
	import Class from "jwidget/Class";

## Description

Introduces object aggregation support.
If you call `a.own(b)`, then **b** is destroyed automatically on **a** destruction.
You can aggregate any object implementing [jwidget/Destroyable](Destroyable.md).

	class Book extends Class {
		cover = this.own(new Cover());

		destroyObject() {
			console.log("Destroying book");
			super.destroyObject();
		}
	}

	class Cover implements Destroyable {
		destroy() {
			console.log("Destroying cover");
		}
	}

	const book = new Book();
	book.destroy();

Output:

	Destroying cover
	Destroying book

Aggregated objects are destroyed in reverse order.

## Properties

### _iid: number

_iid: number

Instance ID.

Auto-incremental object unique ID. Each IClass instance has such an identifier.
Used, say, in [jwidget/AbstractSet](AbstractSet.md) as map key for quick item access.

### own

own<T extends [jwidget/Destroyable](Destroyable.md)>(obj: T): T;

Aggregates the object. It means that the specified object is automatically destroyed
on this object destruction. The aggregated objects are destroyed in reverse order.
Returns the aggregated object, which makes it easy to use in field definition:

    private selected = this.own(new Property(false));

### owning

owning(obj: [jwidget/Destroyable](Destroyable.md)): this;

Aggregates the object. It means that the specified object is automatically destroyed
on this object destruction. The aggregated objects are destroyed in reverse order.
Returns this object, which makes it easy to use in object instantiation:

    const items = new ObservableArray();
    return new Panel(items).owning(items);
