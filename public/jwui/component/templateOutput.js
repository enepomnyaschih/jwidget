/*
	jWidget UI source file.
	
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

/**
 * @class JW.UI.Component.TemplateOutput
 * 
 * Result of JW.UI.Component.Template#createElement method. HTML template rendering output.
 * 
 * @extends JW.Class
 * @constructor
 * @param {DOMElement} root The rendered element.
 * @param {Object} groups `<Array<DOMElement>>` Map from jwid to the elements with this jwid.
 */
JW.UI.Component.TemplateOutput = function(root, groups) {
	JW.UI.Component.TemplateOutput._super.call(this);
	this.root = root;
	this.groups = groups;
};

JW.extend(JW.UI.Component.TemplateOutput, JW.Class, {
	/**
	 * @property {DOMElement} root The rendered element.
	 */
	/**
	 * @property {Object} groups `<Array<DOMElement>>` Map from jwid to the elements with this jwid.
	 */
});
