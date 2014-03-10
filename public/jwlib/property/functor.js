JW.Functor = function(sources, func, scope, config) {
	JW.Functor._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this.target = config.target || this.own(new JW.Property());
	this._update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Functor, JW.Class, {
	/*
	Array<JW.Property> sources;
	JW.Property<T> target;
	T func(Any... values);
	Object scope;
	*/
	
	bind: function(event) {
		this.own(event.bind(this._update, this));
		return this;
	},
	
	watch: function(property) {
		return this.bind(property.changeEvent);
	},
	
	_update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this.target.set(this.func.apply(this.scope, values));
	}
});
