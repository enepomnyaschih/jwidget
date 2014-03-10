JW.UI.HtmlUpdater = function(el, property) {
	JW.UI.HtmlUpdater._super.call(this);
	this.el = el;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.HtmlUpdater, JW.Class, {
	/*
	Element el;
	JW.Property<String> property;
	*/
	
	_update: function() {
		this.el.html(this.property.get());
	}
});
