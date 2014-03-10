JW.Updater = function(sources, func, scope) {
	JW.Updater._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this._update();
	this._attachments = JW.Array.map(sources, function(property) {
		return property.changeEvent.bind(this._update, this);
	}, this);
};

JW.extend(JW.Updater, JW.Class, {
	/*
	Array<JW.Property> sources;
	void func(Any... values);
	Object scope;
	Array<JW.EventAttachment> _attachments;
	*/
	
	destroy: function() {
		JW.Array.each(this._attachments, JW.destroy);
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
		this.func.apply(this.scope, values);
	}
});
