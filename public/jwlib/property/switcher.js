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

/**
 * @class
 * `<V>` Watches source {@link JW.Property property} modification and calls
 * the specified functions.
 *
 * {@link #init} function is called on switcher initialization and on property change. The new value of the property
 * is passed as an argument, and the function can return an arbitrary object as a tracker for this value.
 *
 * {@link #done} function is called on property change and on switcher destruction. The tracker object returned by
 * {@link #init} function is passed as a first argument, and the old value of the property is passed as a second one.
 *
 * The functions are not called if the property value is null.
 *
 *     var property = new JW.Property(1);
 *     var switcher = new JW.Switcher(property, {
 *         {@link #init}: function(value) {
 *             console.log("Init " + value);
 *             return value + 1;
 *         },
 *         {@link #done}: function(tracker, value) {
 *             console.log("Done " + value + " tracked by " + tracker);
 *         },
 *         {@link #scope}: this
 *     }); // output: Init 1
 *     property.{@link JW.Property#set set}(2); // output: Done 1 tracked by 2, Init 2
 *     property.{@link JW.Property#set set}(null); // output: Done 2 tracked by 3
 *     property.{@link JW.Property#set set}(3); // output: Init 3
 *     switcher.{@link #destroy}(); // output: Done 3 tracked by 4
 *
 * Realistic use case for switcher is represented in next example:
 *
 *     this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
 *     this.{@link JW.Class#own own}(new JW.Switcher(this.selectedDocument, {
 *         {@link #init}: function(document) { document.selected.{@link JW.Property#set set}(true); },
 *         {@link #done}: function(unused, document) { document.selected.{@link JW.Property#set set}(false); },
 *         {@link #scope}: this
 *     }));
 *
 * Tracked value can be used to chain a switcher with a {@link JW.Functor functor} or {@link JW.Copier copier}.
 * For example, assume that you have
 * a number of folders and a number of documents in each folder. One of the folders is selected, and each folder has
 * one selected document. You want to track a currently selected document in a currently selected folder:
 *
 *     var Folder = function() {
 *         Folder.{@link JW.Class#_super _super}.call(this);
 *         this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
 *     };
 *     
 *     JW.extend(Folder, JW.Class);
 *     
 *     var App = function() {
 *         App.{@link JW.Class#_super _super}.call(this);
 *         this.selectedFolder = this.{@link JW.Class#own own}(new JW.Property());
 *         this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
 *         this.{@link JW.Class#own own}(new JW.Switcher(this.selectedFolder, {
 *             {@link JW.Switcher#cfg-init init}: function(folder) {
 *                 return new JW.Copier(folder.selectedDocument, {{@link JW.Copier#cfg-target target}: this.selectedDocument});
 *             },
 *             {@link JW.Switcher#cfg-done done}: JW.destroy,
 *             {@link JW.Switcher#cfg-scope scope}: this
 *         }));
 *     };
 *     
 *     JW.extend(App, JW.Class);
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {JW.Property} property `V` Property.
 * @param {Object} config Configuration (see Config options).
 */
JW.Switcher = function(property, config) {
	JW.Switcher._super.call(this);
	config = config || {};
	this.property = property;
	this.init = config.init;
	this.done = config.done;
	this.scope = config.scope || this;
	this._value = null;
	this._tracker = null;
	this.own(new JW.Updater([property], this._update, this));
};

JW.extend(JW.Switcher, JW.Class, {
	/**
	 * @property {JW.Property} property Property.
	 */
	/**
	 * @cfg {Function} init
	 *
	 * `init(value: V): Mixed`
	 *
	 * Value initialization function.
	 */
	/**
	 * @cfg {Function} done
	 *
	 * `done(tracker: Mixed, value: V)`
	 *
	 * Value releasing function.
	 */
	/**
	 * @cfg {Object} scope
	 * {@link #init} and {@link #done} call scope.
	 */
	
	destroy: function() {
		this._update();
		this._super();
	},
	
	_update: function(value) {
		if (JW.isSet(this._value) && this.done) {
			this.done.call(this.scope, this._tracker, this._value);
			this._tracker = null;
		}
		this._value = value;
		if (JW.isSet(this._value) && this.init) {
			this._tracker = this.init.call(this.scope, this._value);
		}
	}
});
