/*
	JW base UI component.
	
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

JW.UI.Component = function(config) {
	JW.UI.Component.superclass.call(this);
	this.rootClass = config.rootClass;
	this.template = config.template;
	this._childrenCreated = !config.children;
	this.children = config.children || new JW.Map();
	this.parent = null;
	this.el = null;
	this.appended = false;
	this.destroyed = false;
	this.allChildren = new JW.Set();
	this._childMapper = null;
	this._lists = [];
	this._invokeRemoveEvent = new JW.Event();
},

JW.extend(JW.UI.Component, JW.Class, {
	/*
	Optional
	String rootClass;
	String template;
	JW.Map<JW.UI.Component> children; // named children
	
	Fields
	Boolean _childrenCreated;
	JW.UI.Component parent;
	Element el;
	Boolean appended;
	Boolean destroyed;
	JW.Set<JW.UI.Component> allChildren; // children + (lists' contents)
	JW.Map.Mapper<JW.UI.Component, JW.UI.Component.Child> _childMapper;
	Array<JW.UI.Component.List> _lists;
	JW.Event<JW.UI.Component.EventParams> _invokeRemoveEvent;
	*/
	
	destroy: function() {
		if (this.destroyed) {
			return;
		}
		this.destroyed = true;
		if (this.el) {
			this.remove();
			this.el.remove();
			this.destroyComponent();
			this._childMapper.destroy();
		}
		this._invokeRemoveEvent.destroy();
		JW.eachByMethod(this._lists, "destroy");
		this.allChildren.destroy();
		if (this._childrenCreated) {
			this.children.destroy();
		}
		this._invokeRemoveEvent = null;
		this._lists = null;
		this._childMapper = null;
		this.allChildren = null;
		this.children = null;
		this.parent = null;
		this.el = null;
		this._super();
	},
	
	renderComponent: function() {},
	
	afterAppend: function() {},
	
	destroyComponent: function() {},
	
	render: function() {
		if (this.el) {
			return;
		}
		this.el = jQuery(this.template || this.templates.main);
		this.rootClass = this.rootClass || this.el.attr("jwclass");
		if (this.rootClass) {
			this.el.removeAttr("jwclass");
			this.el.addClass(this.rootClass);
		}
		var anchorEls = this.el.find("[jwid]");
		for (var i = 0; i < anchorEls.length; ++i) {
			var anchorEl = jQuery(anchorEls[i]);
			var jwId = anchorEl.attr("jwid");
			var jwIdCamel = JW.String.camel(jwId);
			this[jwIdCamel + "El"] = anchorEl;
			anchorEl.addClass(this.getElementClass(jwId));
		}
		this._childMapper = new JW.Map.InstanceMapper({
			source    : this.children,
			provider  : JW.UI.Component.Child,
			dataField : "component",
			keyField  : "name",
			extraCfg  : {
				parent : this
			}
		});
		this.renderComponent();
		for (var i = 0; i < anchorEls.length; ++i) {
			var anchorEl = jQuery(anchorEls[i]);
			var jwId = anchorEl.attr("jwid");
			var jwIdCamel = JW.String.camel(jwId);
			anchorEl.removeAttr("jwid");
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				this.children.set(this[renderMethodName].call(this), jwId);
			}
		}
	},
	
	renderTo: function(el) {
		this.render();
		this.remove();
		jQuery(el).insert(this.el);
		this._afterAppend();
	},
	
	renderAs: function(el) {
		this.render();
		this.remove();
		jQuery(el).replaceBy(this.el);
		this._afterAppend();
	},
	
	remove: function() {
		if (!this.el) {
			return;
		}
		this._invokeRemoveEvent.trigger(new JW.UI.Component.EventParams(this));
		this.el.detach();
	},
	
	getElement: function(id) {
		return JW.isSet(id) ? this[this.getElementName(id)] : null;
	},
	
	getElementName: function(id) {
		return JW.isSet(id) ? (JW.String.camel(id) + "El") : "el";
	},
	
	getElementClass: function(id) {
		return JW.map(JW.filter([ this.rootClass, id ], JW.isSet), JW.String.hyphen).join("-");
	},
	
	removeElement: function(id) {
		var elName = this.getElementName(id);
		if (!this[elName]) {
			return;
		}
		this[elName].remove();
		delete this[elName];
	},
	
	addList: function(collection, el) {
		this._lists.push(new JW.UI.Component.List({
			parent     : this,
			collection : collection,
			el         : el
		}));
	},
	
	_afterAppend: function() {
		if (this.appended || !this.el) {
			return;
		}
		if (this.parent && !this.parent.appended) {
			return;
		}
		if (!this.parent && !this.el.parents("body").length) {
			return;
		}
		this.appended = true;
		this.afterAppend();
		this.allChildren.eachByMethod("_afterAppend");
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div />'
});

JW.UI.Component.EventParams = function(sender) {
	JW.UI.Component.EventParams.superclass.call(this, sender);
};

JW.extend(JW.UI.Component.EventParams, JW.EventParams, {
	/*
	Fields
	JW.UI.Component sender;
	*/
});
