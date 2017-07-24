[Back to index](../README.md)

## Consumption

	import Identifiable from "jwidget/Identifiable";

## Hierarchy

* interface **jwidget/Identifiable**
    * interface [jwidget/IClass](IClass.md)

## Description

An object which has unique [iid](#iid) value assigned via core [newIid](index.md#newiid) method.
Makes this object viable for efficient storage in `ISet`.

## Methods

## Properties

### iid

	readonly iid: number

Instance ID.

Auto-incrementing object unique ID. Each [jwidget/Class] instance has such an identifier.
