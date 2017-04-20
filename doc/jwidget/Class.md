[Back to index](../README.md)

# Class

## Consumption

	import IClass from "jwidget/IClass";
	import Class from "jwidget/Class";

## Description

The base class of all jWidget classes.
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

### _iid

	_iid: number

Instance ID.

Auto-incrementing object unique ID. Each IClass instance has such an identifier.
Used, say, in [jwidget/AbstractSet](AbstractSet.md) as map key for quick item access.

## Methods

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

	const items = new ObservableArray();
	return new Panel(items).owning(items);

### destroy

	destroy(): void

Class destructor invocation method. Destroys all aggregated objects and calls destroyObject method.
You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor
calling.

	const object = new MyClass();

	// ...

	// Once object is not needed anymore, destroy it
	object.destroy();

Alternatively (and optimally), you should use [own](#own) method to aggregate this object inside another one.

You can override `destroy` method in a subclass to do some preliminary work before aggregated object destruction.
For example, [jwidget/Component](Component.md) overrides this method to remove child components before their destruction,
because child components are usually aggregated inside the component. However, in the majority of cases,
you should override [destroyObject](#destroyObject) method instead to customize destruction logic.

## Protected methods

	destroyObject(): void

Class destructor implementation. Called inside [destroy](#destroy) method *after aggregated object destruction*.
The logic of class instance destruction should be implemented here. If you override this method,
remember to call `super.destroyObject()` at the end of the method:

	destroyObject: function() {
		// Release resources
		...

		// Call superclass destructor
		super.destroyObject();
	}
