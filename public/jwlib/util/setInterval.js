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

JW.setInterval = function(callback, ms) {
	if (!ms) {
		return setInterval(callback, ms);
	}
	if (typeof callback == "string") {
		callback = function() { eval(callback); };
	}
	
	var lastTime = Date.getTime();
	
	function onInterval() {
		var curTime = Date.getTime();
		
		// Prevent inactive time lapses
		if (curTime - lastTime > 10 * ms) {
			lastTime = curTime - ms;
		}
		var b = true;
		while (b || (lastTime < curTime)) {
			b = false;
			lastTime += ms;
			callback();
		}
	}
	
	return setInterval(onInterval, ms);
};
