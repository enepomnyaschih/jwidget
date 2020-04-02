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

JW.Canvas.Event = JW.Class.extend({
	type          : null, // [readonly] String
	originalEvent : null, // [readonly] jQuery event
	target        : null, // [readonly] JW.Canvas.Component
	currentTarget : null, // [readonly] JW.Canvas.Component
	
	isBubble      : true, // [readonly] Boolean
	isDefault     : true, // [readonly] Boolean
	
	init: function(originalEvent, target)
	{
		this.type = originalEvent.type;
		this.originalEvent = originalEvent;
		this.target = target;
	},
	
	stopPropagation: function()
	{
		this.isBubble = false;
	},
	
	preventDefault: function()
	{
		this.isDefault = false;
	},
	
	_setCurrentTarget: function(target)
	{
		this.currentTarget = target;
	}
});
