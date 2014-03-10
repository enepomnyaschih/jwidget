JW.UI.AttrUpdater = function(el, attr, property) {
	JW.UI.AttrUpdater._super.call(this);
	this.el = el;
	this.attr = attr;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.AttrUpdater, JW.Class, {
	/*
	Element el;
	String attr;
	JW.Property<String> property;
	*/
	
	_update: function() {
		this.el.attr(this.attr, this.property.get());
	}
});
