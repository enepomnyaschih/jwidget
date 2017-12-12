[Back to index](../README.md)

# Copier

* **Properties**
	* [source](#source)
	* [target](#target)

## Consumption

	import Copier from "jwidget/Copier";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Identifiable.md)
	* interface [jwidget/IClass](IClass.md)
		* class [jwidget/Class](Class.md)
			* class **jwidget/Copier**`<T>`

## Description

Listens source [jwidget/Bindable](Bindable.md) modification and copies its value to target property.

	const source = new Property(1);
	const target = new Property<number>();
	const copier = new Copier(source, target);
	expect(target.get()).toBe(1);
	source.set(2);
	expect(target.get()).toBe(2);
	copier.destroy(); // stop synchronization

Reference: [jwidget/Property](Property.md).

## Constructor

	new Copier<T>(source: Bindable<T>, target?: IProperty<T>)

Reference: [jwidget/Bindable](Bindable.md), [jwidget/IProperty](IProperty.md).

Constructs **Copier** instance. Synchronizes `target` property to `source`. If `target` is omitted, creates it automatically. Copier [owns](IClass.md#own) it in this case.

## Properties

### source

	source: Bindable<T>

Reference: [jwidget/Bindable](Bindable.md).

Source bindable.

### target

	target: Bindable<T>

Reference: [jwidget/Bindable](Bindable.md).

Target bindable.
