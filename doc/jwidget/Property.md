[Back to index](../README.md)

# Property



## Consumption

	import Property from "jwidget/Property";

## Hierarchy

* interface [jwidget/Destroyable](Destroyable.md)
* interface [jwidget/Identifiable](Identifiable.md)
	* interface [jwidget/IClass](IClass.md)
		* class [jwidget/Class](Class.md)
* interface [jwidget/Bindable](Bindable.md)`<V>`
	* interface [jwidget/DestroyableBindable](DestroyableBindable.md)`<V>`
		* interface [jwidget/IProperty](IProperty.md)`<V>`
			* class **jwidget/Property**`<V>`

## Description

Container for a value. Provides basic data binding functionality.

**Example 1.** Property demonstration.

The next example demonstrates basic property functionality:

	const prop = new Property('foo');
	console.log(prop.get());  // output: foo

	prop.changeEvent.listen(({value}) => console.log(value));
	prop.set('bar');          // output: bar
	prop.set('bar');          // no change - no output
	prop.set('10');           // output: 10
	prop.set(10);             // output: 10 (different type)

	const doubl = prop.map((value) => value * 2);
	console.log(doubl.get()); // output: 20
	prop.set(6);              // output: 6
	console.log(doubl.get()); // output: 12

**Example 2.** Model & View two-way binding.

Example of model class that exposes properties for two-way binding:

	class User extends Class {
		readonly name : IProperty<string> = new Property('');
		readonly age  : IProperty<number> = new Property(0);
	}

References: [jwidget/Class].

And this is an example of view class that uses these bindings:

	@template(
		'<div>' +
			'<input type="text" jwid="name">' +
			'<input type="text" jwid="age">' +
		'</div>'
	)
	class UserView extends Component {
		constructor(private user: User) {
			super();
		}

		protected renderName(el: JQuery) {
			this.own(val(el, this.user.name, TWOWAY));
		}

		protected renderAge(el: JQuery) {
			// map age to string property
			const ageString = this.own(this.user.age.map(String));

			// bind it back
			this.own(new Mapper([ageString], Number, {target: this.user.age}));

			// bind input element value to age string
			this.own(val(el, ageString, TWOWAY));
		}
	}

References: [jwidget/template], [jwidget/Component], [jwidget/Mapper], [jwidget/ui/val], [TWOWAY](index.md#Binding), [map](#map).

**Example 3.** One-way binding.

If you want to forbid property modification by the clients, use [jwidget/Bindable] getters:

	class Counter extends Class {
		private _seconds = new Property(0);

		constructor() {
			super();
			this.own(new Interval(() => this._seconds.set(this._seconds.get() + 1), 1000));
		}

		get seconds(): Bindable<number> {
			return this._seconds;
		}
	}

References: [jwidget/Class], [jwidget/Interval].

Now the client can only use one-way binding:

	class CounterView extends Component {
		constructor(private counter: Counter) {
			super();
		}

		protected renderRoot(el: JQuery) {
			this.own(val(el, this.counter.seconds));
		}
	}

References: [jwidget/Component], [jwidget/ui/val].

## Constructor

	new Property<V>(value: V, silent: boolean = false)

* **value** - Initial value.
* **silent** - If true, uses [jwidget/dummyEvent](dummyEvent.md) implementation for [changeEvent](Watchable.md#changeevent). Use it if you know for sure that the property never gets modified or there are no listeners interested in its modification. Since every jWidget application relies on many properties, this may help you improve application performance.

Constructs a property and sets initial value.
