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
 * ## How it works
 *
 * Router takes an incoming string JW.Property (for example, JW.UI.hash), parses it and provides an outcoming
 * JW.Property. Outcoming property may contain any object you want. If it implements JW.Plugins.Router.Routable
 * interface (i.e. has {@link JW.Plugins.Router.Routable#setPath setPath} method), path tail is passed to it
 * for further routing. It is convenient to use a nested router object to process path tail as well.
 *
 * Example:
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="700" height="300" src="http://enepomnyaschih.github.io/mt/1.4.1/router.html"></iframe>
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
 * - blank URL is automatically redirected to inbox
 * - any other URL is mapped to NotFound component
 *
 * Code:
 *
 *     {@link JW.UI.Component#beforeRender beforeRender}: function(el) {
 *         this.{@link JW.Class#method-_super _super}();
 *         this.router = this.{@link JW.Class#own own}(new JW.Plugins.Router({
 *             {@link JW.Plugins.Router#cfg-path path}: JW.UI.hash,
 *             {@link JW.Plugins.Router#cfg-handler handler}: {
 *                 {@link JW.Plugins.Router.Handler#cfg-routes routes}: {
 *                     // passing path to inbox constructor lets us avoid an unneccessary redirection
 *                     "inbox"   : function(path) { return new Inbox(path); },
 *                     "compose" : function() { return new Compose(); },
 *                     "settings": function() { return new Settings(); },
 *                     ""        : function() { return new JW.Plugins.Router.Redirector("inbox"); }
 *                 },
 *                 {@link JW.Plugins.Router.Handler#cfg-notFound notFound}: function(route) { return new NotFound(route); }
 *             },
 *             {@link JW.Plugins.Router#cfg-scope scope}: this
 *         }));
 *         this.router.{@link JW.Plugins.Router#update update}();
 *     },
 *
 *     renderPage: function() {
 *         return this.router.target;
 *     },
 *
 * Notice that {@link JW.Plugins.Router#update update} method is called separately, after router construction.
 * It is implemented so to make sure that this.router field is assigned before routing. Sometimes it is crucial
 * (in an example below, this.router is used in {@link JW.Plugins.Router#cfg-handler handler}).
 *
 * Inbox implements JW.Plugins.Router.Routable interface, and therefore provides further routing for all
 * "inbox/*" URL's. Applacation router passes URL tail string to
 * Inbox constructor and {@link JW.Plugins.Router.Routable#setPath setPath} method to do that.
 *
 * - "inbox" URL is mapped to EmailList component
 * - "inbox/&lt;id&gt;" URL is mapped to Email component if an email with such ID exists
 * - "inbox/&lt;id&gt;" URL is mapped to EmailNotFound component if there's no email with such ID
 *
 * Code:
 *
 *     renderContent: function() {
 *         this.router = this.{@link JW.Class#own own}(new JW.Plugins.Router({
 *             {@link JW.Plugins.Router#cfg-path path}: this.path,
 *             {@link JW.Plugins.Router#cfg-handler handler}: function(id) {
 *                 if (!id) {
 *                     return new EmailList(this.emails);
 *                 }
 *                 var email = this.emails.search(JW.byValue("id", id));
 *                 return (email != null) ? new Email(email, this.router) : new EmailNotFound(id);
 *             },
 *             {@link JW.Plugins.Router#cfg-scope scope}: this
 *         }));
 *         this.router.update();
 *         return this.router.{@link JW.Plugins.Router#property-target target}
 *     },
 *
 *     {@link JW.Plugins.Router.Routable#setPath setPath}: function(path) {
 *         this.path.{@link JW.Property#set set}(path);
 *     }
 *
 * ## Routing flow
 *
 * Routing is performed in three steps:
 *
 * - Incoming path string is parsed using {@link JW.Plugins.Router#cfg-separator separator} callback into two tokens:
 * route and argument. Route will be used to process this single routing step, and argument will be passed to a
 * {@link JW.Plugins.Router#property-target target} for further routing. Make sure that separator never returns two
 * routes which have the same target. For example, if both "" and "inbox"
 * lead to Inbox component, make sure that separator function returns the same route for them, for example, "".
 * Otherwise, expect your target component to be recreated when user switches back and forth between "" and "inbox".
 * If separator function returns null or undefined route, it is automatically mapped to blank string.
 * Separator can be specified as a string. In this case, it is passed to JW.Plugins.Router#makeSeparator
 * method - see it for more details. Separator defaults to "/".
 * - The route returned by separator is assigned to {@link JW.Plugins.Router#property-route route} property. If it
 * is changed, the next steps are following:<ul>
 * <li>Null is assigned to {@link JW.Plugins.Router#property-target target} property</li>
 * <li>Previous target is being destroyed</li>
 * <li>{@link JW.Plugins.Router#cfg-handler handler} function is called to build a new target</li>
 * <li>Result is assigned to {@link JW.Plugins.Router#property-target target} property</li></ul>
 * - If target implements JW.Plugins.Router.Routable interface, its {@link JW.Plugins.Router.Routable#setPath setPath}
 * method is called with an argument string provided by separator callback
 *
 * ## Redirection
 *
 * As of jWidget 1.4.1, router supports redirection logic. You can perform redirections manually, whenever you need,
 * or automatically when some route is entered.
 *
 * For manual redirection, use router.{@link JW.Plugins.Router#method-redirect redirect} instance method or
 * JW.Plugins.Router.{@link JW.Plugins.Router#static-method-redirect redirect} static method. The instance method performs redirection inside
 * this router. The static method performs redirection in a current top router - it is easier to use, because you
 * are not obligated to pass the router into child components explicitly, however, it is suitable only if you know
 * exactly which router sits on top of router stack at any moment.
 *
 *     this.router.{@link JW.Plugins.Router#method-redirect redirect}("inbox"); // redirection in this router
 *     JW.Plugins.Router.{@link JW.Plugins.Router#static-method-redirect redirect}("inbox"); // redirection in top router
 *
 * You may modify the redirection scope by passing a second argument. Passing 0 changes absolute path.
 * This is useful for global navigation.
 *
 *     JW.Plugins.Router.{@link JW.Plugins.Router#static-method-redirect redirect}("inbox", 0); // absolute redirection
 *
 * Passing positive number performs redirection in N'th router up from the bottom of router stack. Assume that current
 * full path is "inbox/123/reply" or "all-emails/123/reply" and you want to get back to "inbox" or "all-emails",
 * depending on what is currently opened - here's the easiest way to do that:
 *
 *     JW.Plugins.Router.{@link JW.Plugins.Router#static-method-redirect redirect}("", 1); // absolute redirection shifted by 1
 *
 * Passing negative number performs redirection in -N'th router down from the top of router stack. For example,
 * passing -1 gets you back to a parent router and changes its subpath to a specified one. Assume that your
 * Inbox component needs to have a link to settings page. Considering that you don't know how many routers
 * are active above inbox at the moment, it is a smart choice to use instance redirection with -1 shift.
 *
 *     this.router.{@link JW.Plugins.Router#method-redirect redirect}("settings", -1); // redirection in parent router
 *
 * Redirections should not occur inside router's update cycle, otherwise an error is thrown. That's why you can
 * not call redirection methods inside a handler function. Use JW.Plugins.Router.Redirector instead - this is a
 * UI component which waits for current isolate to complete and performs a redirection after that.
 *
 *     this.router = this.{@link JW.Class#own own}(new JW.Plugins.Router({
 *         {@link JW.Plugins.Router#cfg-path path}: JW.UI.hash,
 *         {@link JW.Plugins.Router#cfg-handler handler}: {
 *             {@link JW.Plugins.Router.Handler#cfg-routes routes}: {
 *                 "inbox" : function(path) { return new Inbox(path); },
 *                 ""      : function() { return new JW.Plugins.Router.Redirector("inbox"); }
 *             }
 *         }
 *         {@link JW.Plugins.Router#cfg-scope scope}: this
 *     }));
 *
 * **IMPORTANT:** If you define custom {@link JW.Plugins.Router#cfg-separator separator} function, you must also define
 * an opposite {@link JW.Plugins.Router#cfg-joiner joiner} function for redirections to work properly.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} config Configuration (see Config options).
 */
JW.Plugins.Router = function(config) {
	JW.Plugins.Router._super.call(this);
	config = config || {};
	this.separator = config.separator || this.defaultSeparator;
	if (JW.isRegExp(this.separator)) {
		this.separator = JW.Plugins.Router.makeSeparator(this.separator);
	}
	this.joiner = config.joiner || this.defaultJoiner;
	if (typeof this.joiner === "string") {
		this.joiner = JW.Plugins.Router.makeJoiner(this.joiner);
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
			this.target.set(this.handler.call(this.scope, route, this.arg) || null);
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
	this.arg = null;
	JW.Plugins.Router._routerStack.push(this);
	this._active = false;
	this.own(this.path.changeEvent.bind(this.update, this));
};

JW.extend(JW.Plugins.Router, JW.Class, {
	/**
	 * @property {Function|RegExp} defaultSeparator Default separator value. See #separator for details.
	 */
	defaultSeparator: /^\/*([^?\/]+)(?:\/(.*)|(\?.*))?$/,

	/**
	 * @property {Function|string} defaultJoiner Default joiner value. See #joiner for details.
	 */
	defaultJoiner: "/",

	/**
	 * @cfg {JW.Property} path `<string>` Source path string. If omitted, router creates and aggregates this property
	 * automatically.
	 */
	/**
	 * @cfg {JW.Property} target `<JW.Plugins.Router.Routable>` Target routable object. If omitted, router creates and
	 * aggregates this property automatically.
	 */
	/**
	 * @cfg {Function|RegExp} separator
	 *
	 * `separator(path: string): string|Array<string>`
	 *
	 * Path separator. Parses incoming path to two tokens: route and argument. Route will be used to process this
	 * single routing step, and argument will be passed to a {@link #property-target} for further routing.
	 *
	 * Make sure that separator never returns two routes which have the same target. For example, if both "" and "inbox"
	 * lead to Inbox component, make sure that separator function returns the same route for them, for example, "".
	 * Otherwise, expect your target component to be recreated when user switches back and forth between "" and "inbox".
	 *
	 * If separator function returns null or undefined route, it is automatically mapped to blank string.
	 *
	 * **IMPORTANT:** If you define custom {@link JW.Plugins.Router#cfg-separator separator} function, you must also define
	 * an opposite {@link JW.Plugins.Router#cfg-joiner joiner} function for redirections to work properly.
	 *
	 * Separator function can be specified as a regular expression.
	 * In this case, it is built with JW.Plugins.Router#makeSeparator method - see it for more details.
	 *
	 * Defaults to `/^\/*([^?\/]+)(?:\/(.*)|(\?.*))?$/`, which:
	 *
	 * - Trims leading /
	 * - Looks for the first / or ?
	 * - Uses first part as route
	 * - Uses second part as argument. Questionmark ? is included to the argument, slash / is not
	 *
	 * Examples:
	 *
	 * <table>
	 *   <tr><td>Incoming path</td><td>Resulting route</td><td>Resulting argument</td></tr>
	 *   <tr><td>"" or null</td><td>""</td><td>null</td></tr>
	 *   <tr><td>"inbox"</td><td>"inbox"</td><td>null</td></tr>
	 *   <tr><td>"inbox/"</td><td>"inbox"</td><td>""</td></tr>
	 *   <tr><td>"inbox/1"</td><td>"inbox"</td><td>"1"</td></tr>
	 *   <tr><td>"inbox/1/edit"</td><td>"inbox"</td><td>"1/edit"</td></tr>
	 *   <tr><td>"/inbox"</td><td>"inbox"</td><td>null</td></tr>
	 *   <tr><td>"/inbox/"</td><td>"inbox"</td><td>""</td></tr>
	 *   <tr><td>"///inbox///"</td><td>"inbox"</td><td>"//"</td></tr>
	 *   <tr><td>"inbox?id=1"</td><td>"inbox"</td><td>"?id=1"</td></tr>
	 * </table>
	 */
	/**
	 * @cfg {Function|string} joiner
	 *
	 * `joiner(route: string, arg: string): string`
	 *
	 * Path joiner. Opposite to #separator. Used for redirections. Joins incoming route and argument to a full pass.
	 *
	 * Joiner can be specified as a string. In this case, it is built with JW.Plugins.Router#makeJoiner
	 * method - see it for more details.
	 *
	 * Defaults to "/".
	 */
	/**
	 * @cfg {Function|JW.Plugins.Router.Handler} handler
	 *
	 * `handler(route: string, arg: string): JW.Plugins.Router.Routable`
	 *
	 * Route handler. Creates a routable object by route string.
	 *
	 * Example:
	 *
	 *     handler: function(route, arg) {
	 *         var doc = this.docs.get(route);
	 *         return doc ? doc.createView(this.data, arg) : new Page404(route);
	 *     },
	 *     scope: this
	 *
	 * Handler can be specified as an object matching JW.Plugins.Router.Handler interface.
	 * In this case, it is built with JW.Plugins.Router#makeHandler method - see it for more details.
	 *
	 * Default handler function returns null no matter what which makes no sense. Please specify always.
	 */
	/**
	 * @cfg {Object} scope Call scope for {@link #cfg-separator} and {@link #cfg-handler}.
	 */
	/**
	 * @property {JW.Property} target `<JW.Plugins.Router.Routable>` Target routable object.
	 */
	/**
	 * @property {JW.Property} route `<string>` Current route. Read-only.
	 */
	/**
	 * @property {string} arg Current path argument. Assigned right before #route modification. Read-only.
	 */

	destroyObject: function() {
		if (this._active) {
			throw new Error("Router can not be destroyed during its update cycle.");
		}
		if (JW.Array.getLast(JW.Plugins.Router._routerStack) !== this) {
			throw new Error("Router can not be destroyed because it is not on top of router stack. " +
				"Make sure that you don't create two subrouters in parallel. " +
				"Make sure that you destroy all routers correctly.");
		}
		JW.Plugins.Router._routerStack.pop();
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
		if (this._active) {
			throw new Error("Can't update router because its update cycle is already active. " +
				"Suggest using JW.Plugins.Router.Redirector or moving URL redirection to an asyncronous callback.");
		}
		this._active = true;
		var path = this.path.get();
		var pair = (path == null) ? null : this.separator.call(this.scope, path);
		var route = pair;
		this.arg = null;
		if (pair != null && (typeof pair !== "string")) {
			route = pair[0];
			if (pair.length > 1) {
				this.arg = pair[1];
			}
		}
		this.route.set(route || "");
		var target = this.target.get();
		if (target != null && (typeof target.setPath === "function")) {
			target.setPath(this.arg);
		}
		this._active = false;
	},

	/**
	 * Calls #joiner function with specified arguments.
	 *
	 * @param {string} route The route.
	 * @param {string} arg=null The path argument.
	 * @returns {string} Path string.
	 */
	join: function(route, arg) {
		return this.joiner.call(this.scope, route, arg);
	},

	/**
	 * Returns full redirection path pretending this router being on top of router stack.
	 * See **Redirection** topic in class description for more details.
	 *
	 * @param {string} path Redirection path.
	 * @param {number} [scope] Redirection scope. Defaults to current scope.
	 * @returns {string} Full path string.
	 */
	getFullPath: function(path, scope) {
		return JW.Plugins.Router.getFullPath(path, this, scope);
	},

	/**
	 * Performs redirection to result of {@link #method-getFullPath} method.
	 *
	 * @param {string} path Redirection path.
	 * @param {number} [scope] Redirection scope. Defaults to current scope.
	 * @param {boolean} [replaceState] Replaces current history entry rather than creating a new one.
	 * Defaults to false, but if used in JW.Plugins.Router.Redirector, defaults to true.
	 */
	redirect: function(path, scope, replaceState) {
		JW.Plugins.Router.redirect(path, this, scope, replaceState);
	}
});

JW.apply(JW.Plugins.Router, {
	_routerStack: [],

	/**
	 * Returns full redirection path pretending the specified router being on top of router stack.
	 * See **Redirection** topic in class description for more details.
	 *
	 * @static
	 * @param {string} path Redirection path.
	 * @param {JW.Plugins.Router} [router] Top router to pretend. Defaults to top router in current router stack.
	 * @param {number} [scope] Redirection scope. Defaults to current scope.
	 * @returns {string} Full path string.
	 */
	getFullPath: function(path, router, scope) {
		if (typeof router === "number") {
			scope = router;
			router = null;
		}
		var routers = JW.Plugins.Router._routerStack;
		if (routers.length == 0) {
			throw new Error("No routers exist in the system.");
		}
		var routerIndex = router ? JW.Array.indexOf(routers, router) : (routers.length - 1);
		if (routerIndex === -1) {
			throw new Error("Current router stack doesn't contain the specified router.");
		}
		var index = (scope == null) ? routerIndex :
			(scope >= 0) ? scope : (routerIndex + scope);
		if (index < 0 || index > routerIndex) {
			throw new Error(router ?
				("The specified router has index " + routerIndex + " in current router stack") :
				("Current router stack contains only " + routers.length + " routers."));
		}
		for (var i = index - 1; i >= 0; --i) {
			path = routers[i].join(routers[i].route.get(), path);
		}
		return path;
	},

	/**
	 * Performs redirection to result of {@link #static-method-getFullPath} method.
	 *
	 * @static
	 * @param {string} path Redirection path.
	 * @param {JW.Plugins.Router} [router] Top router to pretend. Defaults to top router in current router stack.
	 * @param {number} [scope] Redirection scope. Defaults to current scope.
	 * @param {boolean} [replaceState] Replaces current history entry rather than creating a new one.
	 * Defaults to false, but if used in JW.Plugins.Router.Redirector, defaults to true.
	 */
	redirect: function(path, router, scope, replaceState) {
		if (typeof router === "number") {
			scope = router;
			router = null;
		}
		var fullPath;
		try {
			fullPath = JW.Plugins.Router.getFullPath(path, router, scope);
			if (JW.Plugins.Router._routerStack[0]._active) {
				throw new Error("Update cycle is already active. " +
					"Suggest using JW.Plugins.Router.Redirector or moving URL redirection to an asyncronous callback.");
			}
		} catch (e) {
			throw new Error("Can not perform URL redirection to " + path + " in scope " +
				((scope == null) ? "CURRENT" : scope) + ": " + e.message);
		}
		JW.Plugins.Router._routerStack[0].path.set(fullPath, replaceState);
	},

	/**
	 * @method makeSeparator
	 *
	 * Converts RegExp to separator function. The first token ($1) of path is used as a
	 * route, and second on ($2) is used as an argument. If path is null, it is assumed to be "".
	 *
	 * @static
	 * @param {RegExp} regexp Regular expression.
	 * @returns {Function} Separator function.
	 */
	makeSeparator: function(regexp) {
		return function(path) {
			var result = regexp.exec(path || "");
			return result ? [result[1], JW.def(JW.Array.search(result.slice(2), JW.isSet), null)] : "";
		};
	},

	/**
	 * @method makeJoiner
	 *
	 * Converts joiner symbol/string to joiner function. Joins incoming route/argument pair via the specified string.
	 * Leading joiner symbols in argument are trimmed. If argument starts with "?", joiner symbol is not added.
	 * If argument is null or blank, returns route.
	 *
	 * Examples:
	 *
	 * <table>
	 *   <tr><td>Incoming route</td><td>Incoming argument</td><td>Separator</td><td>Resulting path</td></tr>
	 *   <tr><td>""</td><td>""</td><td>"/"</td><td>""</td></tr>
	 *   <tr><td>"inbox"</td><td>""</td><td>"/"</td><td>"inbox"</td></tr>
	 *   <tr><td>"inbox"</td><td>"1"</td><td>"/"</td><td>"inbox/1"</td></tr>
	 *   <tr><td>"inbox"</td><td>"1/reply"</td><td>"/"</td><td>"inbox/1/reply"</td></tr>
	 *   <tr><td>"inbox"</td><td>"/1/reply"</td><td>"/"</td><td>"inbox/1/reply"</td></tr>
	 *   <tr><td>"inbox"</td><td>"/1/reply/"</td><td>"/"</td><td>"inbox/1/reply/"</td></tr>
	 *   <tr><td>"inbox"</td><td>"///1/reply///"</td><td>"/"</td><td>"inbox/1/reply///"</td></tr>
	 *   <tr><td>"inbox"</td><td>"?id=1"</td><td>"/"</td><td>"inbox?id=1"</td></tr>
	 * </table>
	 *
	 * @static
	 * @param {string} joiner Joiner symbol/string.
	 * @returns {Function} Joiner function.
	 */
	makeJoiner: function(joiner) {
		var trimmer = new RegExp("^(?:" + joiner.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + ")*");
		return function(route, arg) {
			return !arg ? route : (arg.charAt(0) === "?") ? (route + arg) : (route + joiner + arg.replace(trimmer, ""));
		};
	},

	/**
	 * @method makeHandler
	 *
	 * Converts handler configuration object to handler function. Configuration has two optional fields:
	 *
	 * - {@link JW.Plugins.Router.Handler#cfg-routes routes} is a mapping from route string to a handler function for
	 * this specific route. The function takes the path argument as an argument.
	 * - {@link JW.Plugins.Router.Handler#cfg-notFound notFound} is a handler function for all routes which don't
	 * match {@link JW.Plugins.Router.Handler#cfg-routes routes} mapping. The function takes route and path argument as
	 * arguments.
	 *
	 * Example:
	 *
	 *     this.router = this.{@link JW.Class#own own}(new JW.Plugins.Router({
	 *         {@link JW.Plugins.Router#cfg-path path}: JW.UI.hash,
	 *         {@link JW.Plugins.Router#cfg-handler handler}: {
	 *             {@link JW.Plugins.Router.Handler#cfg-routes routes}: {
	 *                 "inbox"   : function(arg) { return new Inbox(arg);        },
	 *                 ""        : function(arg) { return new JW.UI.Component(); }
	 *             },
	 *             {@link JW.Plugins.Router.Handler#cfg-notFound notFound}: function(route, arg) { return new NotFound(route, arg); }
	 *         },
	 *         {@link JW.Plugins.Router#cfg-scope scope}: this
	 *     }));
	 *
	 * @static
	 * @param {JW.Plugins.Router.Handler} configuration Handler configuration object.
	 * @returns {Function} Handler function.
	 */
	makeHandler: function(config) {
		config = config || {};
		var routes = config.routes || {};
		return function(route, arg) {
			return routes[route] ? routes[route].call(this, arg) :
				config.notFound ? config.notFound.call(this, route, arg) : null;
		};
	}
});

/**
 * @class JW.Plugins.Router.Handler
 *
 * Interface for router {@link JW.Plugins.Router#cfg-handler handler} configuration object.
 * Converted to a function by JW.Plugins.Router#makeHandler method.
 */
/**
 * @cfg {Object} routes
 *
 * Mapping from route string to a handler function for this specific route.
 * The function is determined as:
 *
 * `route(arg: string): JW.Plugins.Router.Routable`
 */
/**
 * @cfg {Function} notFound
 *
 * Function for all routes which don't match {@link JW.Plugins.Router.Handler#cfg-routes routes} mapping.
 * The function is determined as:
 *
 * `notFound(route: string, arg: string): JW.Plugins.Router.Routable`
 */

/**
 * @class JW.Plugins.Router.Routable
 *
 * Interface for routable {@link JW.Plugins.Router#cfg-target target} object.
 */
/**
 * @method setPath
 *
 * Accepts a new path argument from parent router for further routing. This method is optional.
 *
 * @param {string} path Path argument.
 */

/**
 * @class JW.Plugins.Router.Redirector
 *
 * UI component which performs router redirection once current isolate is complete (asyncronously).
 * See **Redirection** topic in JW.Plugins.Router class description for details.
 *
 * You may destroy redirector to cancel redirection before it occurs.
 *
 * @extends JW.UI.Component
 * @constructor
 * @param {string} path Redirection path.
 * @param {JW.Plugins.Router} [router] Top router to pretend. Defaults to top router in current router stack.
 * @param {number} [scope] Redirection scope. Defaults to current scope.
 * @param {boolean} [replaceState] Replaces current history entry rather than creating a new one. Defaults to true.
 */
JW.Plugins.Router.Redirector = function() {
	JW.Plugins.Router.Redirector._super.call(this);
	this.args = JW.args(arguments);
	if (this.args[3] == null) {
		this.args[3] = true;
	}
	this.own(new JW.Timeout(this.redirect, this));
};

JW.extend(JW.Plugins.Router.Redirector, JW.UI.Component, {
	redirect: function() {
		JW.Plugins.Router.redirect.apply(JW.Plugins.Router, this.args);
	}
});
;