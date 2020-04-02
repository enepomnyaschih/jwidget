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
 * @class
 *
 * Child component collection wrapper in JW.UI.Component.
 *
 * Returned by JW.UI.Component#addCollection method. If you'll destroy this object, child components will be removed
 * from parent.
 *
 * @extends JW.Class
 */
JW.UI.Component.Collection = function(parent, source, el) {
	JW.UI.Component.Collection._super.call(this);
	this.parent = parent;
	this.source = source;
	JW.Set.add(parent._collections, this);

	this._mapper = source.createMapper({
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	});

	this._inserter = new JW.UI.Component.CollectionInserter(this._mapper.target, el[0]);
};

JW.extend(JW.UI.Component.Collection, JW.Class, {
	// JW.UI.Component parent;
	// JW.AbstractCollection<JW.UI.Component> source;

	// override
	destroyObject: function() {
		this._inserter.destroy();
		this._inserter = null;
		this._mapper.destroy();
		this._mapper = null;
		JW.Set.remove(this.parent._collections, this);
		this._super();
	},

	_afterAppend: function() {
		this.source.each(JW.UI._afterAppend);
	}
});
