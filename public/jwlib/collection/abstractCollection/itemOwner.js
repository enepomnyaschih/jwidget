JW.AbstractCollection.ItemOwner = function(collection) {
	JW.AbstractCollection.ItemOwner._super.call(this);
	this.collection = collection;
};

JW.extend(JW.AbstractCollection.ItemOwner, JW.Class, {
	// override
	destroy: function() {
		this.collection.$clear().each(JW.destroy);
		this._super();
	}
});
