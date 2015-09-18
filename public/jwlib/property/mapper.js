/*
	jWidget Lib source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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
 * `<T>` Watches source {@link JW.Property properties} modification and recreates
 * a target property using specified functions. Unlike JW.Functor,
 * lets you destroy a previously created value. Also, mapper resets the target
 * property value to null on destruction.
 *
 *     var count = new JW.Property(1);
 *     var units = new JW.Property("apples");
 *     var target = new JW.Property();
 *     // Next command prints "Init 1 apples" to console
 *     var mapper = new JW.Mapper([ count, units ], {
 *         {@link #cfg-target target}: target,
 *         {@link JW.Mapper#createValue createValue}: function(value, units) {
 *             var result = value + " " + units;
 *             console.log("Init " + result);
 *             return result;
 *         },
 *         {@link JW.Mapper#destroyValue destroyValue}: function(result, value, units) {
 *             console.log("Done " + result);
 *         },
 *         {@link JW.Mapper#scope scope}: this
 *     });
 *     assert("1 apples", target.{@link JW.Property#get get}());
 *
 *     // Next command prints "Done 1 apples" and "Init 2 apples"
 *     count.{@link JW.Property#set set}(2);
 *     assert("2 apples", target.{@link JW.Property#get get}());
 *
 *     // Next command prints "Done 2 apples"
 *     mapper.{@link JW.Mapper#destroy destroy}();
 *     assert(null, target.{@link JW.Property#get get}());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that mapper owns it in this case.
 *
 *     var source = new JW.Property(1);
 *     var mapper = new JW.Mapper([ source ], {
 *         {@link JW.Mapper#createValue createValue}: function(value) {
 *             return value + " apples";
 *         },
 *         {@link JW.Mapper#scope scope}: this
 *     });
 *     var target = mapper.{@link JW.Mapper#property-target target};
 *     assert("1 apples", target.{@link JW.Property#get get}());
 *     mapper.{@link JW.Mapper#destroy destroy}();
 *
 * In simple cases, JW.Property#$$mapValue and JW.Property#$$mapObject shorthand methods
 * can be used instead. They return the target property right away:
 *
 *     var source = new JW.Property(1);
 *     var target = source.{@link JW.Property#$$mapValue $$mapValue}(function(value) { return value + " apples"; });
 *     assert("1 apples", target.{@link JW.Property#get get}());
 *     target.{@link JW.Property#destroy destroy}();
 *
 * On source property change, next flow will take a place:
 *
 * 1. New value is created
 * 1. Target property is set to new value
 * 1. Old value is destroyed
 *
 * In contrast, JW.Switcher's flow is opposite:
 *
 * 1. {@link JW.Switcher#done done} method is called
 * 1. {@link JW.Switcher#init init} method is called
 *
 * Common use case for mapper is replaceable child component creation by data:
 *
 *     var MyComponent = function(document) {
 *         MyComponent.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.document = document;
 *     };
 *     
 *     JW.extend(MyComponent, JW.UI.Component, {
 *         // JW.Property<Document> document;
 *         
 *         renderDocument: function() {
 *             return this.{@link JW.Class#own own}(this.document.{@link JW.Property#$$mapObject $$mapObject}(function(document) {
 *                 return new DocumentView(document);
 *             }, this);
 *         }
 *     });
 *     
 *     JW.UI.template(MyComponent, {
 *         main:
 *             '<div jwclass="my-component">' +
 *                 '<div jwid="document"></div>' +
 *             '</div>'
 *     });
 *
 * Also, mapper allows you to chain property calculations. Assume that you have several folders and
 * several documents in each folder. One folder is selected, and each folder has a selected document there. You
 * want to create a document view by a currently selected folder and a currently selected document there. Do this:
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
 *         this.documentView = this.{@link JW.Class#own own}(new JW.Property());
 *         this.{@link JW.Class#own own}(new JW.Mapper([this.selectedFolder], {
 *             {@link JW.Mapper#cfg-createValue createValue}: function(folder) {
 *                 return new JW.Mapper([folder.selectedDocument], {
 *                     {@link JW.Mapper#cfg-target target}: this.documentView,
 *                     {@link JW.Mapper#cfg-createValue createValue}: function(document) {
 *                         return new DocumentView(folder, document);
 *                     },
 *                     {@link JW.Mapper#cfg-destroyValue destroyValue}: JW.destroy,
 *                     {@link JW.Mapper#cfg-scope scope}: this
 *                 });
 *             },
 *             {@link JW.Mapper#cfg-destroyValue destroyValue}: JW.destroy,
 *             {@link JW.Mapper#cfg-scope scope}: this
 *         }));
 *     };
 *     
 *     JW.extend(App, JW.Class);
 *
 * By default, mapper doesn't calls the callbacks if at least one of the source values is null. You can change it
 * via {@link JW.Mapper#acceptNull acceptNull} option.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} source `<JW.Property>` Source properties.
 * @param {Object} config Configuration (see Config options).
 */
JW.Mapper = function(sources, config) {
	JW.Mapper._super.call(this);
	this.sources = sources;
	this.createValue = config.createValue;
	this.destroyValue = config.destroyValue;
	this.scope = config.scope || this;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.acceptNull = config.acceptNull || false;
	this._sourceValues = null;
	this._targetValue = null;
	this.update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Mapper, JW.Class, {
	/**
	 * @cfg {JW.Property} target
	 * `<T>` Target property. By default, created automatically.
	 */
	/**
	 * @cfg {Function} createValue
	 *
	 * `createValue(... sourceValues): T`
	 *
	 * Calculates target property value based on source property values.
	 */
	/**
	 * @cfg {Function} [destroyValue]
	 *
	 * `destroyValue(targetValue: T, ... sourceValues)`
	 *
	 * Optional. Destroys target property value.
	 */
	/**
	 * @cfg {Object} scope
	 * Optional. Call scope of #createValue and #destroyValue.
	 */
	/**
	 * @cfg {Boolean} [acceptNull=false]
	 * Optional. If false, functions won't be called if at least one of the source values is null. Target value
	 * is resetted to null in this case.
	 */
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	/**
	 * @property {JW.Property} target `<T>` Target property.
	 */
	
	// override
	destroyObject: function() {
		var oldValue = this.target.get();
		if (oldValue === this._targetValue) {
			this.target.set(null);
		}
		this._done();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.sources = null;
		this.createValue = null;
		this.destroyValue = null;
		this.scope = null;
		this.target = null;
		this._sourceValues = null;
		this._targetValue = null;
		this._super();
	},
	
	/**
	 * Watches specified event and triggers target value recalculation on
	 * the event triggering.
	 * @param {JW.Event} event Event.
	 * @returns {JW.Functor} this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers target value recalculation on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns {JW.Functor} this
	 */
	watch: function(property) {
		this.bind(property.changeEvent);
		return this;
	},
	
	/**
	 * Updates target property focibly.
	 */
	update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		var newValue;
		if (this.acceptNull || JW.Array.every(values, JW.isSet)) {
			newValue = this.createValue.apply(this.scope, values);
		} else {
			newValue = null;
			values = null;
		}
		this.target.set(newValue);
		this._done();
		this._targetValue = newValue;
		this._sourceValues = values;
	},
	
	_done: function() {
		if (this.destroyValue && this._sourceValues) {
			this.destroyValue.apply(this.scope, [this._targetValue].concat(this._sourceValues));
		}
	}
});
