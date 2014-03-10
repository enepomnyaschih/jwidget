JW.Copier = function(source, config) {
	JW.Copier._super.call(this);
	config = config || {};
	this.source = source;
	this.target = config.target || this.own(new JW.Property());
	this._update();
	this.own(source.changeEvent.bind(this._update, this));
};

JW.extend(JW.Copier, JW.Class, {
	/*
	JW.Property<T> target;
	JW.Property<T> source;
	*/
	
	_update: function() {
		this.target.set(this.source.get());
	}
});
