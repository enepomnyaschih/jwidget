JW.Plugins = JW.Plugins || {};

JW.Plugins.Router = function(config) {
	JW.Plugins.Router._super.call(this);
	config = config || {};
	this.separator = config.separator || "/";
	if (typeof this.separator === "string") {
		this.separator = this._createStringSeparator(this.separator);
	}
	this.handler = config.handler;
	if (typeof this.handler === "object") {
		this.handler = JW.Plugins.Router.makeHandler(this.handler);
	}
	this.scope = config.scope || this;
	this._pathCreated = config.path == null;
	this.path = this._pathCreated ? new JW.Property() : config.path;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this._route = null;
	this.update();
	this.own(this.path.changeEvent.bind(this.update, this));
};

JW.extend(JW.Plugins.Router, JW.Class, {
	/**
	 * @cfg {JW.Property} path `<string>` Source path string.
	 */
	/**
	 * @cfg {JW.Property} target `<JW.Plugins.Router.Routable>` Target routable object.
	 */
	/**
	 * @cfg {string|Function} separator
	 *
	 * `separator(path: string): string|Array<string>`
	 *
	 * Path separator. Can be a string or a function.
	 *
	 * - If specified as string, a first token of path before separator is used as a route, and a remaining part of the
	 * path after separator is used as an argument. Leading separators are trimmed. If separator is not
	 * found in trimmed path, the entire path is used as a route, and argument is null.
	 * - If specified as function, it takes the path as a parameter, and must return a route string or an array
	 * containing one or two items: route and an argument.
	 *
	 * Make sure that each kind of target routable object is mapped from a single route string. Otherwise, expect
	 * target object to be recreated on route string change.
	 *
	 * Defaults to "/".
	 */
	/**
	 * @cfg {Function} handler `<Function>`
	 *
	 * `handler(route: string): JW.Plugins.Router.Routable`
	 *
	 * Path handler. Maps route string to a routable object.
	 *
	 * Example:
	 *
	 *     handler: function(route) {
	 *         var doc = this.docs.get(route);
	 *         return doc ? doc.createView(this.data) : new Page404(route);
	 *     },
	 *     scope: this
	 */
	/**
	 * @cfg {Object} scope #cfg-handler's call scope.
	 */

	destroyObject: function() {
		this._done();
		if (this._targetCreated) {
			this.target.destroy();
		}
		if (this._pathCreated) {
			this.path.destroy();
		}
		this.separator = null;
		this.handler = null;
		this.scope = null;
		this.path = null;
		this.target = null;
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
		if (route == null) {
			this._done();
			return;
		}
		if (route !== this._route) {
			this._done();
			this._route = route;
			this.target.set(this.handler.call(this.scope, route) || null);
		}
		var target = this.target.get();
		if (target != null) {
			target.setPath(arg);
		}
	},

	_createStringSeparator: function(separator) {
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
	},

	_done: function() {
		var target = this.target.get();
		this.target.set(null);
		if (target != null) {
			target.destroy();
		}
		this._route = null;
	}
});

JW.Plugins.Router.makeHandler = function(config) {
	return function(route) {
		var handler = config.routes[route] || config.notFound;
		return handler ? handler.call(this, route) : null;
	};
};
