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

JW.UI.Component.Child = function(config) {
	JW.UI.Component.Child._super.call(this);
	this.parent = config.parent;
	this.component = config.component;
	this.name = config.name;
	this.component.render();
	this.component.remove();
	this._el = this.parent.getElement(this.name);
	this._el.replaceBy(this.component.el);
	this.component.parent = this.parent;
	this.parent.allChildren.add(this.component);
	this._invokeRemoveAttachment = this.component._invokeRemoveEvent.bind(this._onInvokeRemove, this);
	this.component._afterAppend();
};

JW.extend(JW.UI.Component.Child, JW.Class, {
	/*
	Required
	JW.UI.Component parent;
	JW.UI.Component component;
	String name;
	
	Fields
	Element _el;
	JW.EventAttachment _invokeRemoveAttachment;
	*/
	
	destroy: function() {
		this._invokeRemoveAttachment.destroy();
		this.parent.allChildren.remove(this.component);
		this.component.parent = null;
		this.component.el.after(this._el);
		this.component.el.detach();
		this._super();
	},
	
	_onInvokeRemove: function() {
		this.parent.children.remove(this.name);
	}
});
