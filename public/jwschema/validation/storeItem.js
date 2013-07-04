/*
	JW Schema validation store item.
	
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

JW.Schema.Validation.StoreItem = function(errorIndex, topError) {
	JW.Schema.Validation.StoreItem._super.call(this);
	this.errorIndex = errorIndex || 0;
	this.topError = topError;
};

JW.extend(JW.Schema.Validation.StoreItem, JW.Class, {
	/*
	Integer errorIndex;
	JW.Schema.Error topError;
	*/
});
