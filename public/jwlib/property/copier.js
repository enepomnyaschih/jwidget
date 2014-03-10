JW.Copier = function(source, config) {
	JW.Copier._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this._update();
	this._attachment = source.changeEvent.bind(this._update, this);
};

JW.extend(JW.Copier, JW.Class, {
	/*
	JW.Property<T> target;
	JW.Property<T> source;
	Boolean _targetCreated;
	JW.EventAttachment _attachment;
	*/
	
	// override
	destroy: function() {
		this._attachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_update: function() {
		this.target.set(this.source.get());
	}
});
