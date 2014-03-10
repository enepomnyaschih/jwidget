JW.UI.PropUpdater = function(el, prop, property) {
	JW.UI.PropUpdater._super.call(this);
	this.el = el;
	this.prop = prop;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.PropUpdater, JW.Class, {
	/*
	Element el;
	String prop;
	JW.Property<Boolean> property;
	*/
	
	_update: function() {
		this.el.prop(this.prop, this.property.get());
	}
});
