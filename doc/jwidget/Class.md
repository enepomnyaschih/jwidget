[Back to index](../README.md)

# Class

## Consumption

	import Class from "jwidget/Class";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Destroyable.md)
	* interface [jwidget/IClass](IClass.md)
		* class **jwidget/Class**

The majority of jWidget classes and interfaces inherit these four.

## Description

Introduces object aggregation support. If you call `a.own(b)`, then **b** is destroyed automatically on **a** destruction. You can aggregate any object implementing [jwidget/Destroyable](Destroyable.md). Aggregated objects are destroyed in reverse order.

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

## Constructor

	new Class()

Constructs **Class** instance. Usually contructor is called in subclass, but you can also create pure **Class** instances as dummy objects or aggregators for other objects. By destroying the object returned from the next method you cancel both animation and request.

	startOperation() {
		return new Class().
			owning(new Animation()).
			owning(new Request());
	}

Reference: [owning](#owning).

## Properties

See inherited properties in [jwidget/Identifiable].

## Methods

See inherited methods in [jwidget/IClass].

### destroy

	destroy()

Class destructor invocation method. Destroys all aggregated objects and calls destroyObject method. You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor calling.

	const object = new MyClass();

	// ...

	// Once object is not needed anymore, destroy it
	object.destroy();

Alternatively (and optimally), you should use [own](#own) method to aggregate this object inside another one.

Unlike the other [jwidget/Destroyable] subclasses, **Class** subclasses are not recommended to override `destroy` method directly. Instead, please use [destroyObject](#destroyobject) if you want the aggregated objects to be already destroyed.

You can override `destroy` method in a subclass to do some preliminary work before aggregated object destruction. For example, [jwidget/Component](Component.md) overrides this method to remove child components before their destruction, because child components are usually aggregated inside the component. However, in the majority of cases, you should override [destroyObject](#destroyobject) method instead to customize destruction logic.

## Protected methods

### destroyObject

	destroyObject()

Class destructor implementation. Called inside [destroy](#destroy) method *after aggregated object destruction*.
The logic of class instance destruction should be implemented here. If you override this method,
remember to call `super.destroyObject()` at the end of the method:

	destroyObject: function() {
		// Release resources
		...

		// Call superclass destructor
		super.destroyObject();
	}
