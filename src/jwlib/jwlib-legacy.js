// Deprecated methods, not really needed in TypeScript.
JW.args = JW.toArray;
JW.iid = JW.iidForcibly;
JW.destroy = JW.destroyForcibly;

// In jWidget 2, every object can be destroyed only once, because _ownagePool is assigned to null value.
JW.Class.prototype.destroy = (function(base) {
	return function() {
		base.apply(this, arguments);
		this._ownagePool = [];
	};
})(JW.Class.prototype.destroy);

// In jWidget 2, JW.Registry class is introduced instead of JW.makeRegistry.
JW.makeRegistry = function(cls, idField) {
	idField = idField || "id";

	JW.apply(cls, {
		items: {},

		itemArray: [],

		registerItem: function(item) {
			cls.items[item[idField]] = item;
			cls.itemArray.push(item);
		},

		getItem: function(value) {
			return (value instanceof cls) ? value : cls.items[value];
		},

		getId: function(value) {
			return (value instanceof cls) ? value[idField] : value;
		}
	});

	return cls;
};

// makeFactory is an alias to makeRegistry.
JW.makeFactory = JW.makeRegistry;

// In jWidget 2, all the next structures are interfaces, not classes.
JW.EventParams = function(sender) {
	JW.EventParams._super.call(this);
	this.sender = sender;
};
JW.extend(JW.EventParams, JW.Class);

JW.ItemEventParams = function(sender, item) {
	JW.ItemEventParams._super.call(this, sender);
	this.item = item;
};
JW.extend(JW.ItemEventParams, JW.EventParams);

JW.ValueEventParams = function(sender, value) {
	JW.ValueEventParams._super.call(this, sender);
	this.value = value;
};
JW.extend(JW.ValueEventParams, JW.EventParams);

JW.ItemValueEventParams = function(sender, item, value) {
	JW.ItemValueEventParams._super.call(this, sender, value);
	this.item = item;
};
JW.extend(JW.ItemValueEventParams, JW.ValueEventParams);

JW.ValueChangeEventParams = function(sender, value, oldValue) {
	JW.ValueChangeEventParams._super.call(this, sender, value);
	this.oldValue = oldValue;
};
JW.extend(JW.ValueChangeEventParams, JW.ValueEventParams);

JW.Proxy = function(value) {
	JW.Proxy._super.call(this);
	this.value = value;
	this._ownsValue = false;
};
JW.extend(JW.Proxy, JW.Class, {
	destroyObject: function() {
		if (this._ownsValue && JW.isSet(this.value)) {
			this.value.destroy();
		}
		this.value = null;
		this._super();
	},
	get: function() {
		return this.value;
	},
	set: function(value) {
		var oldValue = this.value;
		if (oldValue === value) {
			return;
		}
		this.value = value;
		if (this._ownsValue && JW.isSet(oldValue)) {
			oldValue.destroy();
		}
	},
	ownValue: function() {
		this._ownsValue = true;
		return this;
	}
});

JW.AbstractArray.SpliceParams = function(removeParamsList, addParamsList) {
	JW.AbstractArray.SpliceParams._super.call(this);
	this.removeParamsList = removeParamsList;
	this.addParamsList = addParamsList;
};
JW.extend(JW.AbstractArray.SpliceParams, JW.Class);

JW.AbstractMap.SpliceParams = function(removedKeys, updatedItems) {
	JW.AbstractMap.SpliceParams._super.call(this);
	this.removedKeys = removedKeys;
	this.updatedItems = updatedItems;
};
JW.extend(JW.AbstractMap.SpliceParams, JW.Class);

JW.AbstractMap.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractMap.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};
JW.extend(JW.AbstractMap.SpliceResult, JW.Class);

JW.AbstractSet.SpliceParams = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceParams._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};
JW.extend(JW.AbstractSet.SpliceParams, JW.Class);

JW.AbstractSet.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};
JW.extend(JW.AbstractSet.SpliceResult, JW.Class);
