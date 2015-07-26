/*
	jWidget Lib source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableArray.Merger.Bunch = function(merger, bunch) {
	JW.ObservableArray.Merger.Bunch._super.call(this);
	this.source = merger.source;
	this.target = merger.target;
	this.bunch = bunch;
	this.own(bunch.spliceEvent.bind(this._onSplice, this));
	this.own(bunch.replaceEvent.bind(this._onReplace, this));
	this.own(bunch.moveEvent.bind(this._onMove, this));
	this.own(bunch.clearEvent.bind(this._onClear, this));
	this.own(bunch.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Merger.Bunch, JW.AbstractArray.Merger.Bunch, {
	/*
	Fields
	JW.AbstractArray<? extends JW.ObservableArray<T>> source;
	JW.AbstractArray<T> target;
	JW.AbstractArray<T> bunch;
	*/
	
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
