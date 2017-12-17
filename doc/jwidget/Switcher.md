[Back to index](../README.md)

# Switcher

* **Properties**
	* [sources](#sources)
* **Methods**
	* [listen](#listen)
	* [bind](#bind)
	* [update](#update)

## Consumption

	import Switcher from "jwidget/Switcher";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Identifiable.md)
	* interface [jwidget/IClass](IClass.md)
		* class [jwidget/Class](Class.md)
			* class **jwidget/Switcher**

## Description

Listens source [jwidget/Property](Property.md) modification and calls the specified functions.

**init** function is called on switcher initialization and property change. New values of the properties are passed as arguments.

**done** function is called on property change and switcher destruction. Old values of the properties are passed as arguments.

    const property = new Property(1);
    const switcher = new Switcher([property], {
        init: (value: number) => console.log("Init " + value),
        done: (value: number) => console.log("Done " + value),
        scope: this
    });                 // output: Init 1
    property.set(2);    // output: Done 1, Init 2
    property.set(null); // output: Done 2
    property.set(3);    // output: Init 3
    switcher.destroy(); // output: Done 3

By default, switcher doesn't call the callbacks if at least one of the source values is null. You can change this behaviour using **acceptNull** option.

The next example demonstrates how you can control "selected" field of your model synchronized to global "selectedModel" property:

    const selectedFile = new Property<File>();
    new Switcher([selectedFile], {
        init: (file: File) => file.selected.set(true),
        done: (file: File) => file.selected.set(false),
        scope: this
    });

## Constructor

	new Switcher(sources: Bindable<any>[], config?: Switcher.Config)

* **sources** - Source properties.
* **config** - Configuration:
	* **init**: Switcher.Callback - Value initialization callback.

		Signature: `(...sourceValues: any[]): any`
	* **done**: Switcher.Callback - Value releasing callback.

		Signature: `(...sourceValues: any[]): any`
	* **scope**: any - **init** and **done** call scope. Defaults to switcher itself.
	* **acceptNull**: boolean - Set to true if you want the callbacks to be called even if one of source values is null.

Reference: [jwidget/Bindable](Bindable.md).

Constructs **Switcher** instance. Calls **init** callback if all source values are not null initially. Starts synchronization.

## Properties

### sources

	sources: Bindable<any>[]

Reference: [jwidget/Bindable](Bindable.md).

Source properties.

## Methods

### listen

	listen(event: Listenable<any>): this

Reference: [jwidget/Listenable](Listenable.md).

Listens specified event and issues callback calls on event triggering.

### bind

	bind(property: Bindable<any>): this

Reference: [jwidget/Bindable](Bindable.md).

Watches specified property and issues callback calls on its change.

### update

	update()

Calls callbacks forcibly.
