/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

JW.Schema.Validation.Item = JW.Class.extend({
	data    : null,     // [readonly] *
	key     : null,     // [readonly] String
	path    : null,     // [readonly] Array of (String or Number)
	error   : null,     // [property] JW.Schema.Validation.Error or null
	
	init: function(data, key, path)
	{
		this.data = data;
		this.key  = key;
		this.path = path;
	},
	
	addMessage: function(msg)
	{
		var newError = !JW.isSet(this.error);
		if (newError)
			this.error = new JW.Schema.Error(this.data, this.path);
		
		this.error.addMessage(msg);
		
		return newError ? this.error : null;
	}
});
