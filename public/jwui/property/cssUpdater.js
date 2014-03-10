JW.UI.CssUpdater = function(el, style, property) {
	JW.UI.CssUpdater._super.call(this);
	this.el = el;
	this.style = style;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.CssUpdater, JW.Class, {
	/*
	Element el;
	String style;
	JW.Property property;
	*/
	
	_update: function() {
		this.el.css(this.style, this.property.get());
	}
});
