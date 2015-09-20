/*!
	jWidget Router plugin

	http://enepomnyaschih.github.io/jwidget/#!/api/JW.Plugins.Router

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

JW.Plugins = JW.Plugins || {};

/**
 * @class
 *
 * URL router. Converts incoming URL part (hash or pathname) to a target object and passes tail string to it
 * for further routing.
 *
 * Router takes an incoming JW.Property<string> (for example, JW.UI.hash), parses it and provides an outcoming
 * JW.Property. Outcoming property may contain any object you want. If it implements JW.Plugins.Router.Routable
 * interface (i.e. has {@link JW.Plugins.Router.Routable#setPath setPath} method), path tail is passed to it
 * for further routing. It is convenient to use a nested router object to process path tail as well.
 *
 * Example:
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="400" height="350" src="http://enepomnyaschih.github.io/mt/1.3/router.html"></iframe>
 *
 * Source code of the example is not minified so you can review it using "View source code of the frame" context
 * menu item in your browser.
 *
 * In this example, JW.UI.hash is passed to Application's router object, and it builds a target property containing
 * a child component to render:
 *
 * - "inbox/*" URL is mapped to Inbox component
 * - "compose/*" URL is mapped to Compose component
 * - "settings/*" URL is mapped to Settings component
 * - blank URL is mapped to a simple JW.UI.Component as a blank page placeholder
 * - any other URL is mapped to NotFound component
 *
 *     {@link JW.UI.Component#beforeRender beforeRender}: function(el) {
 *         this.{@link JW.Class#method-_super _super}();
 *         this.router = this.own(new JW.Plugins.Router({
 *             {@link JW.Plugins.Router#cfg-path path}: JW.UI.hash,
 *             {@link JW.Plugins.Router#cfg-handler handler}: {
 *                 {@link JW.Plugins.Router.Handler#cfg-routes routes}: {
 *                     "inbox"   : function() { return new Inbox();           },
 *                     "compose" : function() { return new Compose();         },
 *                     "settings": function() { return new Settings();        },
 *                     ""        : function() { return new JW.UI.Component(); }
 *                 },
 *                 {@link JW.Plugins.Router.Handler#cfg-notFound notFound}: function(route) { return new NotFound(route); }
 *             },
 *             {@link JW.Plugins.Router#cfg-scope scope}: this
 *         }));
 *     },
 *
 *     renderPage: function() {
 *         return this.router.target;
 *     },
 *
 * Inbox implements JW.Plugins.Router.Routable interface, and therefore provides further routing for all
 * "inbox/*" URL's. Applacation router passes URL tail string to
 * Inbox.{@link JW.Plugins.Router.Routable#setPath setPath} method to do that.
 *
 * - "inbox/<id>" URL is mapped to Email component if an email with such ID exists
 * - "inbox/<id>" URL is mapped to EmailNotFounc component if there's no email with such ID
 * - "inbox" URL is mapped to EmailList component
 *
 *     renderContent: function() {
 *         return this.own(new JW.Plugins.Router({
 *             {@link JW.Plugins.Router#cfg-path path}: this.path,
 *             {@link JW.Plugins.Router#cfg-handler handler}: function(id) {
 *                 if (!id) {
 *                     return new EmailList(this.emails);
 *                 }
 *                 var email = this.emails.search(JW.byValue("id", id));
 *                 return (email != null) ? new Email(email) : new EmailNotFound(id);
 *             },
 *             {@link JW.Plugins.Router#cfg-scope scope}: this
 *         })).{@link JW.Plugins.Router#property-target target};
 *     },
 *
 *     {@link JW.Plugins.Router.Routable#setPath setPath}: function(path) {
 *         this.path.{@link JW.Property#set set}(path);
 *     }
 *
 * Routing is performed in three steps:
 *
 * - Incoming path string is parsed using {@link JW.Plugins.Router#cfg-separator separator} callback into two tokens:
 * route and argument. Route will be used to process this single routing step, and argument will be passed to a target
 * for further routing. Make sure that separator never returns two routes which have the same meaning.
 * For example, if both "" and "inbox"
 * lead to Inbox component, make sure that separator function returns the same route for them, for example, "".
 * Otherwise, expect your target component to be recreated when user switches back and forth between "" and "inbox".
 * If separator function returns null or undefined route, it is automatically mapped to blank string.
 * Separator can be specified as a string. In this case, it is passed to JW.Plugins.Router#makeSeparator
 * method - see it for more details. Separator defaults to "/".
 * - The route returned by separator is assigned to {@link JW.Plugins.Router#property-route route} property. If it
 * is changed, the next steps are following:
 * -- Null is assigned to {@link JW.Plugins.Router#property-target target} property
 * -- Previous target is being destroyed
 * -- {@link JW.Plugins.Router#cfg-handler handler} function is called to build a new target
 * -- Result is assigned to {@link JW.Plugins.Router#property-target target} property
 * - If target implements JW.Plugins.Router.Routable interface, its {@link JW.Plugins.Router.Routable#setPath setPath}
 * method is called with an argument string provided by separator callback
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} config Configuration (see Config options).
 */
JW.Plugins.Router = function(config) {
	JW.Plugins.Router._super.call(this);
	config = config || {};
	this.separator = config.separator || "/";
	if (typeof this.separator === "string") {
		this.separator = JW.Plugins.Router.makeSeparator(this.separator);
	}
	this.handler = config.handler || {};
	if (typeof this.handler === "object") {
		this.handler = JW.Plugins.Router.makeHandler(this.handler);
	}
	this.scope = config.scope || this;
	this._pathCreated = config.path == null;
	this.path = this._pathCreated ? new JW.Property() : config.path;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.route = new JW.Property();
	this.own(new JW.Switcher([this.route], {
		init: function(route) {
			this.target.set(this.handler.call(this.scope, route) || null);
		},
		done: function(route) {
			var target = this.target.get();
			this.target.set(null);
			if (target != null) {
				target.destroy();
			}
		},
		scope: this
	}));
	this.update();
	this.own(this.path.changeEvent.bind(this.update, this));
};

JW.extend(JW.Plugins.Router, JW.Class, {
	/**
	 * @cfg {JW.Property} path `<string>` Source path string. If omitted, router creates and aggregates this property
	 * automatically.
	 */
	/**
	 * @cfg {JW.Property} target `<JW.Plugins.Router.Routable>` Target routable object. If omitted, router creates and
	 * aggregates this property automatically.
	 */
	/**
	 * @cfg {Function|string} separator
	 *
	 * `separator(path: string): string|Array<string>`
	 *
	 * Path separator. Parses incoming path to two tokens: route and argument. Route will be used to process this
	 * single routing step, and argument will be passed to a target for further routing.
	 *
	 * Make sure that separator never returns two routes which have the same meaning. For example, if both "" and "inbox"
	 * lead to Inbox component, make sure that separator function returns the same route for them, for example, "".
	 * Otherwise, expect your target component to be recreated when user switches back and forth between "" and "inbox".
	 *
	 * If separator function returns null or undefined route, it is automatically mapped to blank string.
	 *
	 * Separator can be specified as a string. In this case, it is passed to JW.Plugins.Router#makeSeparator
	 * method - see it for more details.
	 *
	 * Defaults to "/".
	 */
	/**
	 * @cfg {Function|Object} handler `<Function>`
	 *
	 * `handler(route: string): JW.Plugins.Router.Routable`
	 *
	 * Route handler. Creates a routable object by route string.
	 *
	 * Example:
	 *
	 *     handler: function(route) {
	 *         var doc = this.docs.get(route);
	 *         return doc ? doc.createView(this.data) : new Page404(route);
	 *     },
	 *     scope: this
	 *
	 * Handler can be specified as an Object. In this case, it is passed to JW.Plugins.Router#makeHandler
	 * method - see it for more details.
	 *
	 * Default handler function returns null no matter what which makes no sense. Please specify always.
	 */
	/**
	 * @cfg {Object} scope #cfg-handler's call scope.
	 */
	/**
	 * @property {JW.Property} target `<JW.Plugins.Router.Routable>` Target routable object.
	 */
	/**
	 * @property {JW.Property} route `<string>` Current route.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		if (this._pathCreated) {
			this.path.destroy();
		}
		this.route.destroy();
		this.separator = null;
		this.handler = null;
		this.scope = null;
		this.path = null;
		this.target = null;
		this.route = null;
		this._super();
	},

	/**
	 * Updates route focibly.
	 */
	update: function() {
		var path = this.path.get();
		var pair = (path == null) ? null : this.separator.call(this.scope, path);
		var route = pair;
		var arg = null;
		if (pair != null && (typeof pair !== "string")) {
			route = pair[0];
			arg = pair[1];
		}
		this.route.set(route || "");
		var target = this.target.get();
		if (target != null && (typeof target.setPath === "function")) {
			target.setPath(arg);
		}
	}
});

/**
 * @method makeSeparator
 *
 * Converts separator symbol/string to separator function. A first token of path before separator symbol is used as a
 * route, and a remaining part of the path after separator symbol is used as an argument. Leading separator symbols are
 * trimmed. If separator symbol is not found in trimmed path, the entire path is used as a route, and argument is null.
 *
 * @static
 * @param {string} separator Separator symbol/string.
 * @returns {Function} Separator function.
 */
JW.Plugins.Router.makeSeparator = function(separator) {
	var trimmer = new RegExp("^(?:" + separator.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + ")*");
	return function(path) {
		path = path.replace(trimmer, "");
		var index = path.indexOf(separator);
		if (index === -1) {
			return path;
		}
		return [
			path.substr(0, index),
			path.substr(index + separator.length)
		];
	};
};

/**
 * @method makeHandler
 *
 * Converts handler configuration object to handler function. Configuration has two optional fields:
 *
 * - {@link JW.Plugins.Router.Handler#cfg-routes routes} is a mapping from route string to a handler function for
 * this specific route.
 * - {@link JW.Plugins.Router.Handler#cfg-notFound notFound} is a handler function for all routes which don't
 * match {@link JW.Plugins.Router.Handler#cfg-routes routes} mapping.
 *
 * Example:
 *
 *     this.router = this.own(new JW.Plugins.Router({
 *         {@link JW.Plugins.Router#cfg-path path}: JW.UI.hash,
 *         {@link JW.Plugins.Router#cfg-handler handler}: {
 *             {@link JW.Plugins.Router.Handler#cfg-routes routes}: {
 *                 "inbox"   : function() { return new Inbox();           },
 *                 "compose" : function() { return new Compose();         },
 *                 "settings": function() { return new Settings();        },
 *                 ""        : function() { return new JW.UI.Component(); }
 *             },
 *             {@link JW.Plugins.Router.Handler#cfg-notFound notFound}: function(route) { return new NotFound(route); }
 *         },
 *         {@link JW.Plugins.Router#cfg-scope scope}: this
 *     }));
 *
 * @static
 * @param {string} separator Separator symbol/string.
 * @returns {Function} Separator function.
 */
JW.Plugins.Router.makeHandler = function(config) {
	return function(route) {
		var handler = config.routes[route] || config.notFound;
		return handler ? handler.call(this, route) : null;
	};
};

/**
 * @class JW.Plugins.Router.Handler
 *
 * Interface for router {@link JW.Plugins.Router#cfg-handler handler} configuration object.
 */
/**
 * @cfg {Object} routes Mapping from route string to a handler function for this specific route.
 */
/**
 * @cfg {Function} handler function for all routes which don't match
 * {@link JW.Plugins.Router.Handler#cfg-routes routes} mapping.
 */

/**
 * @class JW.Plugins.Router.Routable
 *
 * Interface for routerable {@link JW.Plugins.Router#cfg-target target} object.
 */
/**
 * @method setPath
 * Accepts a new path argument from parent router for further routing.
 * @param {string} path Path argument.
 */
