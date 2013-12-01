JW.ObservableArray.Merger.Bunch = function(merger, bunch) {
	JW.ObservableArray.Merger.Bunch._super.call(this);
	this.source = merger.source;
	this.target = merger.target;
	this.bunch = bunch;
	this._spliceAttachment = bunch.spliceEvent.bind(this._onSplice, this);
	this._replaceAttachment = bunch.replaceEvent.bind(this._onReplace, this);
	this._moveAttachment = bunch.moveEvent.bind(this._onMove, this);
	this._clearAttachment = bunch.clearEvent.bind(this._onClear, this);
	this._reorderAttachment = bunch.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Merger.Bunch, JW.AbstractArray.Merger.Bunch, {
	/*
	Fields
	JW.AbstractArray<? extends JW.ObservableArray<T>> source;
	JW.AbstractArray<T> target;
	JW.AbstractArray<T> bunch;
	JW.EventAttachment _spliceAttachment;
	JW.EventAttachment _replaceAttachment;
	JW.EventAttachment _moveAttachment;
	JW.EventAttachment _clearAttachment;
	JW.EventAttachment _reorderAttachment;
	*/
	
	// override
	destroy: function() {
		this._reorderAttachment.destroy();
		this._clearAttachment.destroy();
		this._moveAttachment.destroy();
		this._replaceAttachment.destroy();
		this._spliceAttachment.destroy();
		this._super();
	},
	
	_getIndex: function() {
		var bunches = this.source.getItems();
		var index = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i];
			if (bunch === this.bunch) {
				return index;
			}
			index += bunch.getLength();
		}
		console.warn("JW.ObservableArray.Merger object is corrupted");
		return 0;
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var index = this._getIndex();
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexCount(indexItems.index + index, indexItems.items.length);
		}, this);
		var addParamsList = JW.Array.map(spliceResult.addedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexItems(indexItems.index + index, indexItems.items.concat());
		}, this);
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		this.target.trySet(params.newItem, this._getIndex() + params.index);
	},
	
	_onMove: function(params) {
		var index = this._getIndex();
		this.target.tryMove(index + params.fromIndex, index + params.toIndex);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(this._getIndex(), params.items.length);
	},
	
	_onReorder: function(params) {
		var index = this._getIndex();
		var bunchIndexArray = params.indexArray;
		var bunchLength = bunchIndexArray.length;
		var targetLength = this.target.getLength();
		var targetIndexArray = new Array(targetLength);
		for (var i = 0; i < index; ++i) {
			targetIndexArray[i] = i;
		}
		for (var i = 0; i < bunchLength; ++i) {
			targetIndexArray[index + i] = index + bunchIndexArray[i];
		}
		for (var i = index + bunchLength; i < targetLength; ++i) {
			targetIndexArray[i] = i;
		}
		this.target.tryReorder(targetIndexArray);
	}
});
