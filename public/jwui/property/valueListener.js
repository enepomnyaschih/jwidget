JW.UI.ValueListener = function(el, property) {
	this._update = JW.inScope(this._update, this);
	JW.UI.ValueListener._super.call(this);
	this.el = el;
	this.property = property;
	this._update();
	this.el.bind("change", this._update);
};

JW.extend(JW.UI.ValueListener, JW.Class, {
	/*
	Element el;
	JW.Property<String> property;
	*/
	
	destroy: function() {
		this.el.unbind("change", this._update);
		this._super();
	},
	
	_update: function() {
		this.property.set(this.el.val());
	}
});
