[Back to index](../README.md)

# Destroyable

## Consumption

	import Destroyable from "jwidget/Destroyable";

## Hierarchy

* interface **jwidget/Destroyable**
	* interface [jwidget/IClass](Class.md)
		* class [jwidget/Class](Class.md)

The majority of jWidget classes and interfaces inherit these three.

## Description

Object which has **destroy** method. Can be aggregated in [jwidget/Class](Class.md) via **own** method.

## Methods

### destroy

	destroy(): void

Class destructor invocation method.
