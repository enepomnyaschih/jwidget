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

JW.UI.Component = JW.Config.extend({
	/*
	Optional
	String elName;
	String rootClass;
	String template;
	JW.Map<JW.UI.Component> children; // named children
	
	Fields
	Boolean childrenCreated;
	JW.UI.Component parent;
	Element el;
	Boolean appended;
	JW.Set<JW.UI.Component> allChildren; // children + (lists' contents)
	JW.Map.Mapper<JW.UI.Component, JW.UI.Component.Child> _childMapper;
	Array<JW.UI.Component.List> _lists;
	JW.Event<JW.UI.Component.EventParams> _invokeRemoveEvent;
	*/
	
	appended : false,
	
	init: function(config) {
		this._super(config);
		this.initComponent();
		this.childrenCreated = !this.children;
		if (this.childrenCreated) {
			this.children = new JW.Map();
		}
		this.allChildren = new JW.Set();
		
		this._childMapper = new JW.Map.InstanceMapper({
			source    : this.children,
			provider  : JW.UI.Component.Child,
			dataField : "component",
			keyField  : "name",
			extraCfg  : {
				parent : this
			}
		});
		
		this._lists = [];
		this._invokeRemoveEvent = new JW.Event();
		this._applyTemplate();
		this.render();
	},
	
	destroy: function() {
		if (!this.el) {
			return;
		}
		this.remove();
		this.destroyComponent();
		this._invokeRemoveEvent.destroy();
		JW.eachByMethod(this._lists, "destroy");
		this._childMapper.destroy();
		this.allChildren.destroy();
		if (this.childrenCreated) {
			this.children.destroy();
		}
		this.el.remove();
		delete this.children;
		delete this.parent;
		delete this.el;
		this._super();
	},
	
	initComponent: function() {},
	
	render: function() {},
	
	afterAppend: function() {},
	
	destroyComponent: function() {},
	
	renderTo: function(el) {
		this.remove();
		jQuery(el).insert(this.el);
		this._afterAppend();
	},
	
	renderAs: function(el) {
		this.remove();
		jQuery(el).replaceBy(this.el);
		this._afterAppend();
	},
	
	remove: function() {
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
	
	_applyTemplate: function() {
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
			anchorEl.removeAttr("jwid");
			anchorEl.addClass(this.getElementClass(jwId));
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				this.children.set(this[renderMethodName](), jwId);
			}
		}
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
