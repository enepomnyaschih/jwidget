JW.Functor = function(sources, func, scope, config) {
	JW.Functor._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this._update();
	this._attachments = JW.Array.map(sources, function(property) {
		return property.changeEvent.bind(this._update, this);
	}, this);
};

JW.extend(JW.Functor, JW.Class, {
	/*
	Array<JW.Property> sources;
	JW.Property<T> target;
	T func(Any... values);
	Object scope;
	Boolean _targetCreated;
	Array<JW.EventAttachment> _attachments;
	*/
	
	destroy: function() {
		JW.Array.each(this._attachments, JW.destroy);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	bind: function(event) {
		this._attachments.push(event.bind(this._update, this));
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
