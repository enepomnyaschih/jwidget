JW.UI.HtmlUpdater = function(el, property) {
	JW.UI.HtmlUpdater._super.call(this);
	this.el = el;
	this.property = property;
	this._update();
	this._attachment = property.changeEvent.bind(this._update, this);
};

JW.extend(JW.UI.HtmlUpdater, JW.Class, {
	/*
	Element el;
	JW.Property<String> property;
	JW.EventAttachment _attachment;
	*/
	
	destroy: function() {
		this._attachment.destroy();
		this._super();
	},
	
	_update: function() {
		this.el.html(this.property.get());
	}
});
