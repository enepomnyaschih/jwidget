/*
	JW Schema number validation class.
	
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

JW.Schema.Class.Number = JW.Schema.Class.extend({
	type    : "Number",
	
	integer : false,    // [optional] Boolean
	min     : null,     // [optional] Number
	max     : null,     // [optional] Number
	minOut  : false,    // [optional] Boolean
	maxOut  : false,    // [optional] Boolean
	
	_validateData: function(data, validation)
	{
		if (typeof data !== "number")
			return validation.addError("number expected");
		
		(this.integer && data !== Math.round(data) && validation.addError("integer expected")) ||
		(JW.isSet(this.min) && !this.minOut && data < this.min && validation.addError("must be minimum of " + this.min)) ||
		(JW.isSet(this.max) && !this.maxOut && data > this.max && validation.addError("must be maximum of " + this.max)) ||
		(JW.isSet(this.min) && this.minOut && data <= this.min && validation.addError("must be more than " + this.min)) ||
		(JW.isSet(this.max) && this.maxOut && data >= this.max && validation.addError("must be less than " + this.max));
	}
});
