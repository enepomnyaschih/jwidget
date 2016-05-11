/// <reference path="../build/d.ts/jwui.d.ts" />

module JW {
	export module Plugins {
		/**
		 * URL router. Converts incoming URL part (hash or pathname) to a target object and passes tail string to it
		 * for further routing.
		 *
		 * ## How it works
		 *
		 * Router takes an incoming string JW.Property (for example, [[JW.UI.hash]]), parses it and provides an outcoming
		 * [[JW.Property]]. Outcoming property may contain any object you want. If it implements [[JW.Plugins.Router.Routable]]
		 * interface (i.e. has [[JW.Plugins.Router.Routable.setPath|setPath]] method), path tail is passed to it
		 * for further routing. It is convenient to use a nested router object to process path tail as well.
		 *
		 * Example:
		 *
		 * <iframe style="border: 1px solid green; padding: 10px;" width="700" height="300" src="http://enepomnyaschih.github.io/mt/1.4.1/router.html"></iframe>
		 *
		 * Source code of the example is not minified so you can review it using "View source code of the frame" context
		 * menu item in your browser.
		 *
		 * In this example, [[JW.UI.hash]] is passed to Application's router object, and it builds a target property containing
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
		 *     beforeRender: function(el) {
		 *         this._super();
		 *         this.router = this.own(new JW.Plugins.Router({
		 *             path: JW.UI.hash,
		 *             handler: {
		 *                 routes: {
		 *                     // passing path to inbox constructor lets us avoid an unneccessary redirection
		 *                     "inbox"   : function(path) { return new Inbox(path); },
		 *                     "compose" : function() { return new Compose(); },
		 *                     "settings": function() { return new Settings(); },
		 *                     ""        : function() { return new JW.Plugins.Router.Redirector("inbox"); }
		 *                 },
		 *                 notFound: function(route) { return new NotFound(route); }
		 *             },
		 *             scope: this
		 *         }));
		 *         this.router.update();
		 *     },
		 *
		 *     renderPage: function() {
		 *         return this.router.target;
		 *     },
		 *
		 * Notice that [[update]] method is called separately, after router construction.
		 * It is implemented so to make sure that this.router field is assigned before routing. Sometimes it is crucial
		 * (in an example below, this.router is used in [[JW.Plugins.Router.Config.handler|handler]]).
		 *
		 * Inbox implements [[JW.Plugins.Router.Routable]] interface, and therefore provides further routing for all
		 * "inbox/*" URL's. Applacation router passes URL tail string to
		 * Inbox constructor and [[JW.Plugins.Router.Routable.setPath|setPath]] method to do that.
		 *
		 * - "inbox" URL is mapped to EmailList component
		 * - "inbox/&lt;id&gt;" URL is mapped to Email component if an email with such ID exists
		 * - "inbox/&lt;id&gt;" URL is mapped to EmailNotFound component if there's no email with such ID
		 *
		 * Code:
		 *
		 *     renderContent: function() {
		 *         this.router = this.own(new JW.Plugins.Router({
		 *             path: this.path,
		 *             handler: function(id) {
		 *                 if (!id) {
		 *                     return new EmailList(this.emails);
		 *                 }
		 *                 var email = this.emails.search(JW.byValue("id", id));
		 *                 return (email != null) ? new Email(email, this.router) : new EmailNotFound(id);
		 *             },
		 *             scope: this
		 *         }));
		 *         this.router.update();
		 *         return this.router.target;
		 *     },
		 *
		 *     setPath: function(path) {
		 *         this.path.set(path);
		 *     }
		 *
		 * ## Routing flow
		 *
		 * Routing is performed in three steps:
		 *
		 * - Incoming path string is parsed using [[JW.Plugins.Router.Config.separator|separator]] callback into two tokens:
		 * route and argument. Route will be used to process this single routing step, and argument will be passed to a
		 * [[target]] for further routing. Make sure that separator never returns two
		 * routes which have the same target. For example, if both "" and "inbox"
		 * lead to Inbox component, make sure that separator function returns the same route for them, for example, "".
		 * Otherwise, expect your target component to be recreated when user switches back and forth between "" and "inbox".
		 * If separator function returns null or undefined route, it is automatically mapped to blank string.
		 * Separator can be specified as a string. In this case, it is passed to [[makeSeparator]]
		 * method - see it for more details.
		 * - The route returned by separator is assigned to [[route]] property. If it
		 * is changed, the next steps are following:<ul>
		 * <li>Null is assigned to [[target]] property</li>
		 * <li>Previous target is being destroyed</li>
		 * <li>[[JW.Plugins.Router.Config.handler|handler]] function is called to build a new target</li>
		 * <li>Result is assigned to [[target]] property</li></ul>
		 * - If target implements [[JW.Plugins.Router.Routable]] interface, its [[JW.Plugins.Router.Routable.setPath|setPath]]
		 * method is called with an argument string provided by separator callback
		 *
		 * ## Redirection
		 *
		 * As of jWidget 1.4.1, router supports redirection logic. You can perform redirections manually, whenever you need,
		 * or automatically when some route is entered.
		 *
		 * For manual redirection, use router.[[JW.Plugins.Router.redirect|redirect]] instance method or
		 * static method. The instance method performs redirection inside
		 * this router. The static method performs redirection in a current top router - it is easier to use, because you
		 * are not obligated to pass the router into child components explicitly, however, it is suitable only if you know
		 * exactly which router sits on top of router stack at any moment.
		 *
		 *     this.router.redirect("inbox"); // redirection in this router
		 *     JW.Plugins.Router.redirect("inbox"); // redirection in top router
		 *
		 * You may modify the redirection scope by passing a second argument. Passing 0 changes absolute path.
		 * This is useful for global navigation.
		 *
		 *     JW.Plugins.Router.redirect("inbox", 0); // absolute redirection
		 *
		 * Passing positive number performs redirection in N'th router up from the bottom of router stack. Assume that current
		 * full path is "inbox/123/reply" or "all-emails/123/reply" and you want to get back to "inbox" or "all-emails",
		 * depending on what is currently opened - here's the easiest way to do that:
		 *
		 *     JW.Plugins.Router.redirect("", 1); // absolute redirection shifted by 1
		 *
		 * Passing negative number performs redirection in -N'th router down from the top of router stack. For example,
		 * passing -1 gets you back to a parent router and changes its subpath to a specified one. Assume that your
		 * Inbox component needs to have a link to settings page. Considering that you don't know how many routers
		 * are active above inbox at the moment, it is a smart choice to use instance redirection with -1 shift.
		 *
		 *     this.router.redirect("settings", -1); // redirection in parent router
		 *
		 * Redirections should not occur inside router's update cycle, otherwise an error is thrown. That's why you can
		 * not call redirection methods inside a handler function. Use JW.Plugins.Router.Redirector instead - this is a
		 * UI component which waits for current isolate to complete and performs a redirection after that.
		 *
		 *     this.router = this.own(new JW.Plugins.Router({
		 *         path: JW.UI.hash,
		 *         handler: {
		 *             routes: {
		 *                 "inbox" : function(path) { return new Inbox(path); },
		 *                 ""      : function() { return new JW.Plugins.Router.Redirector("inbox"); }
		 *             }
		 *         },
		 *         scope: this
		 *     }));
		 *
		 * **IMPORTANT:** If you define custom [[JW.Plugins.Router.Config.separator|separator]] function, you must also define
		 * an opposite [[JW.Plugins.Router.Config.joiner|joiner]] function for redirections to work properly.
		 */
		export class Router extends JW.Class {
			/**
			 * Default separator value. See [[JW.Plugins.Router.Config.separator|separator]] and [[makeSeparator]] for details.
			 */
			public defaultSeparator = /^\/*([^?\/]+)(?:\/(.*)|(\?.*))?$/;

			/**
			 * Default joiner value. See [[JW.Plugins.Router.Config.joiner|joiner]] and [[makeJoiner]] for details.
			 */
			public defaultJoiner = "/";

			/**
			 * Source path string.
			 */
			public path: JW.Property<string>;

			/**
			 * Target routable object.
			 */
			public target: JW.Property<JW.UI.Component>;

			/**
			 * Current route. Read-only.
			 */
			public route: JW.Property<string>;

			/**
			 * Current path argument. Assigned right before [[route]] modification. Read-only.
			 */
			public arg: string;

			private separator: Router.Separator;
			private joiner: Router.Joiner;
			private handler: Router.Handler;
			private scope: any;
			private _pathCreated: boolean;
			private _targetCreated: boolean;
			private _active: boolean;

			constructor(config: Router.Config = {}) {
				super();
				this.separator = Router.makeSeparator(config.separator || this.defaultSeparator);
				this.joiner = Router.makeJoiner(config.joiner || this.defaultJoiner);
				this.handler = Router.makeHandler(config.handler);
				this.scope = config.scope || this;
				this._pathCreated = config.path == null;
				this.path = this._pathCreated ? new JW.Property<string>() : config.path;
				this._targetCreated = config.target == null;
				this.target = this._targetCreated ? new JW.Property<JW.UI.Component>() : config.target;
				this.route = new JW.Property<string>();
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
				Router._routerStack.push(this);
				this._active = false;
				this.own(this.path.changeEvent.bind(this.update, this));
			}

			/**
			 * @inheritdoc
			 */
			protected destroyObject() {
				if (this._active) {
					throw new Error("Router can not be destroyed during its update cycle.");
				}
				if (JW.Array.getLast(Router._routerStack) !== this) {
					throw new Error("Router can not be destroyed because it is not on top of router stack. " +
						"Make sure that you don't create two subrouters in parallel. " +
						"Make sure that you destroy all routers correctly.");
				}
				Router._routerStack.pop();
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
				super.destroyObject();
			}

			/**
			 * Updates route focibly. Must be called once after router initialization to perform routing.
			 */
			update() {
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
				if (target != null && (typeof target["setPath"] === "function")) {
					target["setPath"](this.arg);
				}
				this._active = false;
			}

			/**
			 * Calls [[joiner]] function with specified arguments.
			 *
			 * @param route The route.
			 * @param arg The path argument.
			 * @returns Path string.
			 */
			join(route: string, arg: string): string {
				return this.joiner.call(this.scope, route, arg);
			}

			/**
			 * Returns full redirection path pretending this router being on top of router stack.
			 * See **Redirection** topic in class description for more details.
			 *
			 * @param path Redirection path.
			 * @param scope Redirection scope. Defaults to current scope.
			 * @returns Full path string.
			 */
			getFullPath(path: string, scope?: number): string {
				return Router.getFullPath(path, this, scope);
			}

			/**
			 * Performs redirection to result of [[getFullPath]] method.
			 *
			 * @param path Redirection path.
			 * @param scope Redirection scope. Defaults to current scope.
			 * @param replaceState Replaces current history entry rather than creating a new one.
			 * Defaults to false, but if used in [[JW.Plugins.Router.Redirector]], defaults to true.
			 */
			redirect(path: string, scope?: number, replaceState?: boolean) {
				Router.redirect(path, this, scope, replaceState);
			}

			/**
			 * Checks if update cycle is active at the moment for this router.
			 */
			isActive(): boolean {
				return this._active;
			}
		}

		export module Router {
			/**
			 * Signature of [[JW.Plugins.Router.Config.separator|separator]] function.
			 */
			export interface Separator {
				(path: string): string|string[];
			}

			/**
			 * Signature of [[JW.Plugins.Router.Config.joiner|joiner]] function.
			 */
			export interface Joiner {
				(route: string, arg: string): string;
			}

			/**
			 * Signature of [[JW.Plugins.Router.Config.handler|handler]] function.
			 */
			export interface Handler {
				(route: string, arg: string): JW.UI.Component;
			}

			/**
			 * Interface for router [[JW.Plugins.Router.Config.handler|handler]] configuration object.
			 * Converted to a function through [[JW.Plugins.Router.makeHandler|makeHandler]] method.
			 */
			export interface RouteMap {
				/**
				 * Mapping from route string to a handler function for this specific route.
				 */
				routes?: Dictionary<(arg: string) => JW.UI.Component>;

				/**
				 * Function for all routes which don't match [[routes]] mapping.
				 */
				notFound?: Handler;
			}

			/**
			 * [[JW.Plugins.Router]] configuration.
			 */
			export interface Config {
				/**
				 * Source path string. If omitted, router creates and aggregates this property
				 * automatically.
				 */
				path?: JW.Property<string>;

				/**
				 * Target routable object. If omitted, router creates and
				 * aggregates this property automatically.
				 */
				target?: JW.Property<JW.UI.Component>;

				/**
				 * Path separator. Parses incoming path to two tokens: route and argument. Route will be used to process this
				 * single routing step, and argument will be passed to a [[target]] for further routing.
				 *
				 * Make sure that separator never returns two routes which have the same target. For example, if both "" and "inbox"
				 * lead to Inbox component, make sure that separator function returns the same route for them, for example, "".
				 * Otherwise, expect your target component to be recreated when user switches back and forth between "" and "inbox".
				 *
				 * If separator function returns null or undefined route, it is automatically mapped to blank string.
				 *
				 * **IMPORTANT:** If you define custom separator function, you must also define
				 * an opposite [[joiner]] function for redirections to work properly.
				 *
				 * Separator function can be specified as a regular expression.
				 * In this case, it is built with [[JW.Plugins.Router.makeSeparator|makeSeparator]] method - see it for more details.
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
				separator?: Separator|RegExp;

				/**
				 * Path joiner. Opposite to [[separator]]. Used for redirections. Joins incoming route and argument to a full pass.
				 *
				 * Joiner can be specified as a string. In this case, it is built with [[JW.Plugins.Router.makeJoiner|makeJoiner]]
				 * method - see it for more details.
				 *
				 * Defaults to "/".
				 */
				joiner?: Joiner|string;

				/**
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
				 * Handler can be specified as an object matching [[JW.Plugins.Router.Handler]] interface.
				 * In this case, it is built with [[JW.Plugins.Router.makeHandler|makeHandler]] method - see it for more details.
				 *
				 * Default handler function returns null no matter what which makes no sense. Please specify always.
				 */
				handler?: Handler|RouteMap;

				/**
				 * Call scope for [[separator]], [[joiner]] and [[handler]].
				 */
				scope?: any;
			}

			/**
			 * Acceptable interface for routable [[JW.Plugins.Router.target|target]] object.
			 */
			export interface Routable {
				/**
				 * Accepts a new path argument from parent router for further routing. This method is optional.
				 *
				 * @param path Path argument.
				 */
				setPath(path: string);
			}

			/**
			 * Returns full redirection path pretending the specified router being on top of router stack.
			 * See **Redirection** topic in class description for more details.
			 *
			 * @param path Redirection path.
			 * @param scope Redirection scope. Defaults to current scope.
			 * @returns Full path string.
			 */
			export function getFullPath(path: string, scope?: number): string;

			/**
			 * @param path Redirection path.
			 * @param router Top router to pretend. Defaults to top router in current router stack.
			 * @param scope Redirection scope. Defaults to current scope.
			 * @returns Full path string.
			 */
			export function getFullPath(path: string, router: Router, scope?: number): string;
			export function getFullPath(path: string, arg1?: any, scope?: number): string {
				var router: Router = arg1;
				if (typeof arg1 === "number") {
					scope = arg1;
					router = null;
				}
				var routers = Router._routerStack;
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
			}

			/**
			 * Performs redirection to result of [[getFullPath]] method.
			 *
			 * @param path Redirection path.
			 */
			export function redirect(path: string);

			/**
			 * @param path Redirection path.
			 * @param scope Redirection scope. Defaults to current scope.
			 */
			export function redirect(path: string, scope: number);

			/**
			 * @param path Redirection path.
			 * @param router Top router to pretend. Defaults to top router in current router stack.
			 */
			export function redirect(path: string, router: Router);

			/**
			 * @param path Redirection path.
			 * @param router Top router to pretend. Defaults to top router in current router stack.
			 * @param scope Redirection scope. Defaults to current scope.
			 * @param replaceState Replaces current history entry rather than creating a new one.
			 * Defaults to false, but if used in [[JW.Plugins.Router.Redirector]], defaults to true.
			 */
			export function redirect(path: string, router: Router, scope: number, replaceState?: boolean);
			export function redirect(path: string, arg1?: any, arg2?: any, replaceState?: boolean) {
				var router: Router = arg1;
				var scope: number = arg2;
				if (typeof arg1 === "number") {
					scope = arg1;
					router = null;
				}
				var fullPath;
				try {
					fullPath = JW.Plugins.Router.getFullPath(path, router, scope);
					if (Router._routerStack[0].isActive()) {
						throw new Error("Update cycle is already active. " +
							"Suggest using JW.Plugins.Router.Redirector or moving URL redirection to an asyncronous callback.");
					}
				} catch (e) {
					throw new Error("Can not perform URL redirection to " + path + " in scope " +
						((scope == null) ? "CURRENT" : scope) + ": " + e.message);
				}
				var routerPath = Router._routerStack[0].path;
				routerPath.set.call(routerPath, fullPath, replaceState);
			}

			/**
			 * Converts RegExp to separator function. The first token ($1) of path is used as a
			 * route, and the next non-null token ($2-...) is used as an argument.
			 * If path is null, it is assumed to be "".
			 *
			 * @param regexp Regular expression.
			 * @returns Separator function.
			 */
			export function makeSeparator(separator: Separator|RegExp): Separator {
				if (typeof separator === "function") {
					return <Separator>separator;
				}
				var regexp = <RegExp>separator;
				return function(path: string) {
					var result = regexp.exec(path || "");
					return result ? [result[1], JW.def(JW.Array.search(result.slice(2), JW.isSet), null)] : "";
				};
			}

			/**
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
			 * @param joiner Joiner symbol/string.
			 * @returns Joiner function.
			 */
			export function makeJoiner(joiner: Joiner|string): Joiner {
				if (typeof joiner === "function") {
					return <Joiner>joiner;
				}
				var symbol = <string>joiner;
				var trimmer = new RegExp("^(?:" + symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + ")*");
				return function(route, arg) {
					return !arg ? route : (arg.charAt(0) === "?") ? (route + arg) : (route + symbol + arg.replace(trimmer, ""));
				};
			}

			/**
			 * Converts handler configuration object to handler function. Configuration has two optional fields:
			 *
			 * - [[RouteMap.routes|routes]] is a mapping from route string to a handler function for
			 * this specific route. The function takes the path argument as an argument.
			 * - [[RouteMap.notFound|notFound]] is a handler function for all routes which don't
			 * match [[RouteMap.routes|routes]] mapping. The function takes route and path argument as
			 * arguments.
			 *
			 * Example:
			 *
			 *     this.router = this.own(new JW.Plugins.Router({
			 *         path: JW.UI.hash,
			 *         handler: {
			 *             routes: {
			 *                 "inbox"   : function(arg) { return new Inbox(arg);        },
			 *                 ""        : function(arg) { return new JW.UI.Component(); }
			 *             },
			 *             notFound: function(route, arg) { return new NotFound(route, arg); }
			 *         },
			 *         scope: this
			 *     }));
			 *
			 * @param handler Handler configuration object.
			 * @returns Handler function.
			 */
			export function makeHandler(handler?: Handler|RouteMap): Handler {
				if (typeof handler === "function") {
					return <Handler>handler;
				}
				var config = <RouteMap>handler || {};
				var routes = config.routes || {};
				return function(route: string, arg: string) {
					return routes[route] ? routes[route].call(this, arg) :
						config.notFound ? config.notFound.call(this, route, arg) : null;
				};
			}

			/**
			 * @hidden
			 */
			export var _routerStack: Router[] = [];

			/**
			 * UI component which performs router redirection once current isolate is complete (asyncronously).
			 * See **Redirection** topic in [[JW.Plugins.Router]] class description for details.
			 *
			 * You may destroy redirector to cancel redirection before it occurs.
			 */
			export class Redirector extends JW.UI.Component {
				private args;

				/**
				 * @param path Redirection path.
				 */
				constructor(path: string);

				/**
				 * @param path Redirection path.
				 * @param scope Redirection scope. Defaults to current scope.
				 */
				constructor(path: string, scope: number);

				/**
				 * @param path Redirection path.
				 * @param router Top router to pretend. Defaults to top router in current router stack.
				 */
				constructor(path: string, router: Router);

				/**
				 * @param path Redirection path.
				 * @param router Top router to pretend. Defaults to top router in current router stack.
				 * @param scope Redirection scope. Defaults to current scope.
				 * @param replaceState Replaces current history entry rather than creating a new one. Defaults to true.
				 */
				constructor(path: string, router: Router, scope: number, replaceState?: boolean);
				constructor(path: string, arg1?: any, arg2?: any, replaceState?: boolean) {
					super();
					this.args = JW.toArray(arguments);
					if (this.args[3] == null) {
						this.args[3] = true;
					}
					this.own(new JW.Timeout(this.redirect, this));
				}

				private redirect() {
					Router.redirect.apply(Router, this.args);
				}
			}
		}
	}
}
