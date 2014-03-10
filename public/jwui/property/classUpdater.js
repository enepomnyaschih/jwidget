JW.UI.ClassUpdater = function(el, cls, property) {
	JW.UI.ClassUpdater._super.call(this);
	this.el = el;
	this.cls = cls;
	this.property = property;
	this._update();
	this._attachment = property.changeEvent.bind(this._update, this);
};

JW.extend(JW.UI.ClassUpdater, JW.Class, {
	/*
	Element el;
	String cls;
	JW.Property<Boolean> property;
	JW.EventAttachment _attachment;
	*/
	
	destroy: function() {
		this._attachment.destroy();
		this._super();
	},
	
	_update: function() {
		this.el.toggleClass(this.cls, this.property.get());
	}
});
