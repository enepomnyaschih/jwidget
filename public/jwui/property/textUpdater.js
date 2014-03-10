JW.UI.TextUpdater = function(el, property) {
	JW.UI.TextUpdater._super.call(this);
	this.el = el;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.TextUpdater, JW.Class, {
	/*
	Element el;
	JW.Property<String> property;
	*/
	
	_update: function() {
		this.el.text(this.property.get());
	}
});
