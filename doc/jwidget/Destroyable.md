[Back to index](../README.md)

# Destroyable

## Consumption

	import Destroyable from "jwidget/Destroyable";

## Hierarchy

* interface **jwidget/Destroyable**
    * The majority of jWidget classes implement this interface

## Description

Object which has [destroy](#destroy) method. Can be aggregated in [jwidget/IClass](IClass.md) via [own](IClass.md#own) method.

## Methods

### destroy

	destroy(): void

Class destructor. You must override it in a subclass and call this method explicitly from outside, because JavaScript doesn't support automatic class destructor calling.

	const object = new MyClass();

	// ...

	// Once object is not needed anymore, destroy it
	object.destroy();

Alternatively (and optimally), you should use [own](#own) method to aggregate this object inside another one.
