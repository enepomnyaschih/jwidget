/*
	jWidget UI source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.UI.Component.List.Item = JW.Config.extend({
	/*
	Required
	JW.UI.Component.List list;
	JW.UI.Component component;
	
	Fields
	JW.EventAttachment<JW.UI.Component.EventParams> _invokeRemoveAttachment;
	*/
	
	init: function(config) {
		this._super(config);
		this.component.remove();
		this.component.parent = this.list.parent;
		this.list.parent.allChildren.add(this.component);
		this._invokeRemoveAttachment = this.component._invokeRemoveEvent.bind(this._onInvokeRemove, this);
	},
	
	destroy: function() {
		this._invokeRemoveAttachment.destroy();
		this.list.parent.allChildren.remove(this.component);
		delete this.component.parent;
		this._super();
	},
	
	_onInvokeRemove: function() {
		var index = this.list.collection.indexOf(this.component);
		this.list.collection.remove(index);
	}
});
