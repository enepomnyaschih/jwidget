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
