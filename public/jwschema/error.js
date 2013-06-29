/*
	JW Schema validation error
	
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

JW.Schema.Error = function(data, path) {
	JW.Schema.Error._super.call(this);
	this.data = data;
	this.path = path;
	this.msg = [];
};

JW.extend(JW.Schema.Error, JW.Class, {
	/*
	Any data;
	Array path;
	Array<String> msg;
	*/
	
	addMessage: function(msg) {
		this.msg.push(msg);
	},
	
	toString: function() {
		return JW.Schema.pathToString(this.path) + ": " + this.msg.join(", ");
	}
});
