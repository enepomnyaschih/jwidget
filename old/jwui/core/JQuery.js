/*
	jWidget UI source file.

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

jQuery.extend(jQuery.fn, {
	jwon: function(events, selector, handler, scope) {
		return new JW.UI.JQEventAttachment(this, events, selector, handler, scope);
	},

	jwattr: function(attr, property) {
		return new JW.UI.AttrUpdater(this, attr, property);
	},

	jwclass: function() {
		var a = arguments[0], b = arguments[1];
		return (b != null) ? new JW.UI.ClassUpdater(this, a, b) : new JW.UI.ClassNameUpdater(this, a);
	},

	jwcss: function(style, property) {
		return new JW.UI.CssUpdater(this, style, property);
	},

	jwhtml: function(property) {
		return new JW.UI.HtmlUpdater(this, property);
	},

	jwprop: function(prop, property, binding) {
		if (property != null) {
			return new JW.UI.PropBinding(this, prop, property, binding);
		}
		if (prop === "checked") {
			var target = new JW.Property();
			target.own(new JW.UI.CheckedListener(this, {target: target}));
			return target;
		}
		throw new Error("Invalid argument");
	},

	jwradio: function(name, property, binding) {
		if (property != null) {
			return new JW.UI.RadioBinding(this, name, property, binding);
		}
		var target = new JW.Property();
		target.own(new JW.UI.RadioListener(this, name, {target: target}));
		return target;
	},

	jwtext: function(property) {
		return new JW.UI.TextUpdater(this, property);
	},

	jwval: function(property, binding, simple) {
		if (property != null && (typeof property !== "boolean")) {
			return new JW.UI.ValueBinding(this, property, binding, simple);
		}
		var target = new JW.Property();
		target.own(new JW.UI.ValueListener(this, {target: target, simple: simple}));
		return target;
	},

	jwshow: function(property) {
		return new JW.UI.VisibleUpdater(this, property);
	}
});
