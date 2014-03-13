/*
	jWidget Lib source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.Functor = function(sources, func, scope, config) {
	JW.Functor._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this.target = config.target || this.own(new JW.Property());
	this._update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Functor, JW.Class, {
	/*
	Array<JW.Property> sources;
	JW.Property<T> target;
	T func(Any... values);
	Object scope;
	*/
	
	bind: function(event) {
		this.own(event.bind(this._update, this));
		return this;
	},
	
	watch: function(property) {
		return this.bind(property.changeEvent);
	},
	
	_update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this.target.set(this.func.apply(this.scope, values));
	}
});
