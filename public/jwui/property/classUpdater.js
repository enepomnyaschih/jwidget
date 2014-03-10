JW.UI.ClassUpdater = function(el, cls, property) {
	JW.UI.ClassUpdater._super.call(this);
	this.el = el;
	this.cls = cls;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.ClassUpdater, JW.Class, {
	/*
	Element el;
	String cls;
	JW.Property<Boolean> property;
	*/
	
	_update: function() {
		this.el.toggleClass(this.cls, this.property.get());
	}
});
