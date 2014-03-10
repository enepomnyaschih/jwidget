JW.Updater = function(sources, func, scope) {
	JW.Updater._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this._update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Updater, JW.Class, {
	/*
	Array<JW.Property> sources;
	void func(Any... values);
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
		this.func.apply(this.scope, values);
	}
});
