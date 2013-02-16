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

JW.UI.Component.Array = function(parent, source, el) {
	JW.UI.Component.Array._super.call(this);
	this.parent = parent;
	this.source = source;
	JW.Set.add(parent._arrays, this);
	
	for (var i = 0, l = source.length; i < l; ++i) {
		var component = source[i];
		parent._initChild(component);
		el.append(component.el);
		component._afterAppend();
	}
};

JW.extend(JW.UI.Component.Array, JW.Class, {
	/*
	Fields
	JW.UI.Component parent;
	Array<JW.UI.Component> source;
	*/
	
	destroy: function() {
		var source = this.source;
		for (var i = 0, l = source.length; i < l; ++i) {
			var component = source[i];
			component.el.detach();
			this.parent._doneChild(component);
		}
		JW.Set.remove(this.parent._arrays, this);
		this._super();
	},
	
	destroyAll: function() {
		var source = this.source;
		this.destroy();
		JW.Array.eachByMethod(source, "destroy");
	}
});
