[Back to index](../README.md)

# Mapper

* ****
	* [Flow](#flow)
	* [View binding](#view binding)
	* [Chaining](#chaining)
* **Properties**
	* [sources](#sources)
	* [target](#target)
* **Methods**
	* [listen](#listen)
	* [bind](#bind)
	* [update](#update)
* **Properties**
	* [sources](#sources)
	* [target](#target)
	* [reducer](#reducer)

## Consumption

	import Mapper from "jwidget/Mapper";
	import {mapProperties} from "jwidget/Mapper";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Identifiable.md)
	* interface [jwidget/IClass](IClass.md)
		* class [jwidget/Class](Class.md)
			* class **jwidget/Mapper**`<T>`

## Description

Listens source [jwidget/Bindable](Bindable.md) instances modification and recreates target value via mapping function.

    const count  = new Property(1);
    const unit   = new Property("apples");
    const target = new Property<string>();

    const mapper = new Mapper([count, units], (count: number, units: string) => count + " " + units, {target});
    expect(target.get()).toBe("1 apples");

    count.set(2);
    expect(target.get()).toBe("2 apples");

    mapper.destroy(); // stops synchronization and resets target value to null
    expect(target.get()).toBe(null);

Reference: [jwidget/Property](Property.md).

If `target` is omitted in constructor, it is created automatically.

    const source = new Property(1);
    const mapper = new Mapper([source], (value: number) => value + " apples");
    const target = mapper.target;
    expect(target.get()).toBe("1 apples");
    mapper.destroy(); // stops synchronization

In this case, it is optimal to use [mapProperties](#mapproperties) function instead. It returns target property right away:

    const source = new Property(1);
    const target = mapProperties([source], (value: number) => value + " apples");
    expect(target.get()).toBe("1 apples");
    target.destroy(); // stops synchronization

And even better, if you have just one source property, simply call its [map](Bindable.md#map) method:

    const source = new Property(1);
    const target = source.map((value) => value + " apples");
    expect(target.get()).toBe("1 apples");
    target.destroy(); // stops synchronization

If target value is [jwidget/Destroyable](Destroyable.md) instance, **Mapper** can destroy it for you. Just pass `destroy` config option:

	const source = new Property(1);
	const target = source.map((value) => new View(value), {destroy});
	source.set(2); // assigns target value to new View instance and destroys the previous one
	target.destroy(); // stops synchronization and destroys the View

Reference: [jwidget.destroy](index.md#destroy).

### Flow

On source property change, next flow takes place:

1. Create a new value.
2. Reassign target property.
3. Destroy the old value.

You can override this behaviour by passing **viaNull** config option. Setting it to true changes the flow the next way:

1. Set target value to null.
2. Destroy the old value.
3. Create a new value.
4. Assign target property.

This can be useful if you want the old value to be destroyed before the new value is created.

### View binding

Common use case for mapper is bindable child component creation by data:

	@template('<div><div jwid="avatar"></div></div>')
    class ProfileView extends Component {
        constructor(private avatar: Bindable<Avatar>) {
            super();
        }

        protected renderAvatar() {
            return this.own(this.avatar.map((avatar) => new AvatarView(avatar), {destroy}));
        }
    }

Reference: [jwidget/template](template.md), [jwidget/Component](Component.md), [jwidget/Bindable](Bindable.md), [jwidget.destroy](index.md#destroy).

### Chaining

Mapper allows you to chain property calculations. Assume that you have several folders and several files in each folder. One folder is selected, and each folder has a selected file inside. You
want to create a file view by currently selected file in currently selected folder. You can do it the next way:

	class File extends Class {
		// ... whatever
	}

    class Folder extends Class {
        readonly selectedFile = new Property<File>();
    }

    @template('<div><div jwid="file"></div></div>')
    class AppView extends Component {
    	constructor(private selectedFolder: Bindable<Folder>) {
    		super();
    	}

        protected renderFile() {
        	const target = new Property<FileView>();
            this.own(this.selectedFolder.map((folder) => {
                return folder.selectedFile.map((file) => new FileView(file), {target, destroy});
            }, {destroy}));
            return target;
        }
    }

Reference: [jwidget/Class](Class.md), [jwidget/template](template.md), [jwidget/Component](Component.md), [jwidget/Bindable](Bindable.md), [jwidget/Property](Property.md), [jwidget.destroy](index.md#destroy).

## Constructor

	new Mapper<T>(sources: Bindable<any>[], create: Mapper.CreateCallback<T>, config: Mapper.FullConfig<T> = {})

* **sources** - Source properties.
* **create** - Mapping function. Signature: `(...sourceValues: any[]) => T`
* **config** - Configuration:
	* **target**?: [jwidget/IProperty](IProperty.md)<T> - Target property.
	* **destroy**?: Mapper.DestroyCallback<T> - Destroys target property value if specified.
	Signature: `(targetValue: T, ...sourceValues: any[]) => any`
	* **scope**?: any - **create** and **destroy** call scope. Defaults to mapper itself.
	* **viaNull**?: boolean - Reverses [mapper updating flow](#flow).

Reference: [jwidget/Bindable](Bindable.md).

Constructs **Mapper** instance. Computes [target](#target) property value as result of **create** callback and synchronizes it to all **sources**. If **target** is omitted in **config**, creates it automatically.

## Properties

### sources

	source: Bindable<any>[]

Reference: [jwidget/Bindable](Bindable.md).

Source properties.

### target

	target: Bindable<T>

Reference: [jwidget/Bindable](Bindable.md).

Target property.

## Methods

### listen

	listen(event: Listenable<any>): this

Reference: [jwidget/Listenable](Listenable.md).

Listens specified event and issues target value recalculation on event triggering.

### bind

	bind(property: Bindable<any>): this

Reference: [jwidget/Bindable](Bindable.md).

Watches specified property and issues target value recalculation on its change.

### update

	update()

Updates target property forcibly.

# Mapper.ByReducer

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Identifiable.md)
	* interface [jwidget/IClass](IClass.md)
		* class [jwidget/Class](Class.md)
			* class **jwidget/Mapper.ByReducer**`<T>`

## Description

Mapper by reducer. Kind of mapper optimized for working with collections of similar properties.

	const sources: Bindable<number>[] = [
		new Property(3),
		new Property(2),
		new Property(2)
	];
	const target = new Property<number>();

	const mapper = new Mapper.ByReducer(sources, sum, target);
	expect(target.get()).toBe(7);

	sources[0].set(5);
	expect(target.get()).toBe(9);

Reference: [jwidget/Bindable](Bindable.md), [jwidget/Property](Property.md), [jwidget/Reducer.sum](Reducer.md#sum).

## Constructor

	new Mapper.ByReducer<T, U>(sources: Bindable<T>[], reducer: Reducer<T, U>, target?: IProperty<U>)

* **sources** - Source properties.
* **reducer** - Mapping reducer.
* **target** - Target property.

Reference: [jwidget/Bindable](Bindable.md), [jwidget/Reducer](Reducer.md), [jwidget/IProperty](IProperty.md).

Constructs **Mapper.ByReducer** instance. Computes [target](#target) property value as result of reducer and synchronizes it to all **sources**. If **target** is omitted, creates it automatically.

## Properties

### sources

	source: Bindable<T>[]

Reference: [jwidget/Bindable](Bindable.md).

Source properties.

### target

	target: Bindable<U>

Reference: [jwidget/Bindable](Bindable.md).

Target property.

### reducer

	reducer: Reducer<T, U>

Reference: [jwidget/Reducer](Reducer.md).

Mapping reducer.

# mapProperties

Optimized way to create a mapper with new target value. Returns target property. Destroy it to stop synchronization.

## Signatures

	mapProperties<T>(sources: Bindable<any>[], reducer: Reducer<any, T>): DestroyableBindable<T>

* **sources** - Source properties.
* **reducer** - Mapping reducer.

Reference: [jwidget/Bindable](Bindable.md), [jwidget/Reducer](Reducer.md).

	mapProperties<T>(sources: Bindable<any>[], create: Mapper.CreateCallback<T>, config?: Mapper.Config<T>): DestroyableBindable<T>

* **sources** - Source properties.
* **create** - Mapping function. Signature: `(...sourceValues: any[]) => T`
* **config** - Configuration:
	* **destroy**?: Mapper.DestroyCallback<T> - Destroys target property value if specified.
	Signature: `(targetValue: T, ...sourceValues: any[]) => any`
	* **scope**?: any - **create** and **destroy** call scope. Defaults to mapper itself.
	* **viaNull**?: boolean - Reverses [mapper updating flow](#flow).

Reference: [jwidget/Bindable](Bindable.md).
