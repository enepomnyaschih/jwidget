JW.ObservableCollection = {
	$$toSortedComparing: function(compare, scope, order) {
		var result = new JW.ObservableArray();
		result.own(this.createSorterComparing({
			target: result,
			compare: compare,
			scope: scope || this,
			order: order
		}));
		return result;
	},

	$$index: function(callback, scope) {
		var result = new JW.ObservableMap();
		result.own(this.createIndexer({
			target: result,
			getKey: callback,
			scope: scope || this
		}));
		return result;
	},

	$$toArray: function() {
		var result = new JW.ObservableArray();
		result.own(this.createOrderer({
			target: result
		}));
		return result;
	},

	$$toSet: function() {
		var result = new JW.ObservableSet();
		result.own(this.createLister({
			target: result
		}));
		return result;
	},

	$$filter: function(callback, scope) {
		var result = this.createEmpty();
		result.own(this.createFilterer({
			target: result,
			filterItem: callback,
			scope: scope || this
		}));
		return result;
	},

	$$count: function(callback, scope) {
		var result = new JW.Property(0);
		result.own(this.createCounter({
			target: result,
			filterItem: callback,
			scope: scope || this
		}));
		return result;
	},

	$$mapValues: function(callback, scope) {
		var result = this.createEmpty();
		result.own(this.createMapper({
			target: result,
			createItem: callback,
			scope: scope || this
		}));
		return result;
	},

	$$mapObjects: function(callback, scope) {
		var result = this.createEmpty();
		result.own(this.createMapper({
			target: result,
			createItem: callback,
			destroyItem: JW.destroy,
			scope: scope || this
		}));
		return result;
	}
};
