/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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

import Bindable from './Bindable';
import Class from './Class';
import Destroyable from './Destroyable';
import IProperty from './IProperty';
import Property from './Property';

/**
 * URL router. Converts incoming part of URL (hash) to a target object and passes tail string to it
 * for further routing.
 */
class Router<T extends Destroyable> extends Class {

	/**
	 * Router name. Must be equal to the route name in the `parent` router. Required for proper `getFullPath` and
	 * `redirect` method processing. Root router does not have a name.
	 */
	readonly name: string;

	/**
	 * Parent router. Required for proper `getFullPath` and `redirect` method processing. Root router does not have
	 * a parent.
	 */
	readonly parent: Router<any>;

	/**
	 * Path that the router is bound to. Path is a final part of URL (hash) relevant to this
	 * router. Any path change results in `update` method call.
	 */
	readonly path: Bindable<string>;

	/**
	 * Path separator function used by the router.
	 */
	readonly separator: Router.Separator;

	/**
	 * Path joiner function used by the router.
	 */
	readonly joiner: Router.Joiner;

	/**
	 * Route handler function used by the router.
	 */
	readonly handler: Router.Handler<T>;

	/**
	 * `separator`, `joiner` and `handler` call scope.
	 */
	readonly scope: any;

	private _target: IProperty<T>;
	private _route: IProperty<string> = new Property<string>();
	private _arg: IProperty<string> = new Property<string>();
	private _updating: boolean = false;

	/**
	 * Creates router instance. Please notice that the router doesn't process current route immediately on
	 * initialization. To process the route, call `update` method.
	 * @param config Router configuration.
	 */
	constructor(config: Router.Config<T> = {}) {
		super();
		this.name = config.name;
		this.parent = config.parent;
		if ((this.name == null) !== (this.parent == null)) {
			throw new Error("Router configuration error: you have specified router name or parent, but haven't specified another. These two options must come together.");
		}
		this.path = config.path || new Property<string>(); // we don't own it because its value is being used in destroyObject method - after ownage pool releasing
		this.separator = Router.makeSeparator(config.separator);
		this.joiner = Router.makeJoiner(config.joiner);
		this.handler = Router.makeHandler(config.handler);
		this.scope = config.scope || this;
		this._target = config.target || this.own(new Property<T>());
		this.own(this.path.onChange.listen(() => this.update()));
	}

	/**
	 * Router target. Main purpose of the router is to convert `path` to `target`. In particular, UIRouter
	 * creates Component instances based on current `path` value so you could render them.
	 */
	get target(): Bindable<T> {
		return this._target;
	}

	/**
	 * Current route. First chunk of the path detected by `separator` function. You can watch this property
	 * to activate and deactivate items in your menu.
	 */
	get route(): Bindable<string> {
		return this._route;
	}

	/**
	 * Remainder of current route after `separator` function call. This property is passed to `handler`
	 * function and can be passed over to child components for further routing.
	 */
	get arg(): Bindable<string> {
		return this._arg;
	}

	destroyObject() {
		if (this._updating) {
			throw new Error("Router can not be destroyed during its update cycle.");
		}
		const target = this._target.get();
		if (target != null) {
			target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * Issues route processing.
	 */
	update(force = false) {
		if (this._updating) {
			throw new Error("Can't update router because its update cycle is already active. " +
				"Consider using RouteRedirector or moving URL redirection to an asyncronous callback.");
		}
		this._updating = true;
		const path = this.path.get();
		const pair: string[] = (path == null) ? null : this.separator.call(this.scope, path);
		const route = (pair != null) ? (pair[0] || "") : "";
		const arg = (pair != null) ? (pair[1] || null) : null;
		if (!force && route === this.route.get()) {
			this._arg.set(arg);
		} else {
			const target = this.target.get();
			if (target != null) {
				this._target.set(null);
				target.destroy();
			}
			this._arg.set(arg);
			this._route.set(route);
			this._target.set(this.handler.call(this.scope, route, this._arg) || null);
		}
		this._updating = false;
	}

	/**
	 * Returns the result of `joiner` function call for this router.
	 * @param route Route name.
	 * @param arg Remainder of the path.
	 * @returns Full path.
	 */
	join(route: string, arg: string): string {
		return this.joiner.call(this.scope, route, arg);
	}

	/**
	 * Returns full path as the result of `joiner` function call in `parent` router with `name` passed as
	 * `route` and `path` passed as `arg`. Returns `path` if this is the root router.
	 * @param path Path relative to this router.
	 * @returns Full path relative to the root router.
	 */
	getFullPath(path: string): string {
		return this.parent ? this.parent.getFullPath(this.parent.join(this.name, path)) : path;
	}
}

export default Router;

namespace Router {
	/**
	 * Default value of `separator`.
	 */
	export const DEFAULT_SEPARATOR = /^\/*([^?\/]+)(?:\/(.*)|(\?.*))?$/;

	/**
	 * Default value of `joiner`.
	 */
	export const DEFAULT_JOINER = "/";

	/**
	 * Signature of `separator` function. The function splits path to route and argument. Therefore, it must
	 * return two string values. If function returns null, it is assumed to be ["", null].
	 */
	export interface Separator {
		/**
		 * @param path Full path.
		 * @returns Route and argument.
		 */
		(path: string): string[];
	}

	/**
	 * Signature of `joiner` function. The function joins route and argument to a path.
	 */
	export interface Joiner {
		/**
		 * @param route Route.
		 * @param arg Argument.
		 * @returns Full path.
		 */
		(route: string, arg: string): string;
	}

	/**
	 * Signature of `handler` general-purpose function. The function maps the specified route to a target object
	 * (usually, Component) and passes argument to it for further routing.
	 */
	export interface Handler<T> {
		/**
		 * @param route Route.
		 * @param arg Argument.
		 * @returns Target object.
		 */
		(route: string, arg: Bindable<string>): T;
	}

	/**
	 * Signature of a single route in `handler` object. The function maps a single route to a target
	 * object (usually, Component) and passes argument to it for further routing.
	 */
	export interface Route<T> {
		/**
		 * @param arg Argument.
		 * @returns Target object.
		 */
		(arg: Bindable<string>): T;
	}

	/**
	 * Router handler configuration object.
	 */
	export interface HandlerConfig<T> {
		/**
		 * Map of specific route handlers. If current route is present in this dictionary, the router calls its
		 * corresponding handler and passes argument to it. Route and argument themselves are computed with `separator`
		 * callback.
		 */
		readonly routes?: {
			readonly [key: string]: Route<T>;
		};

		/**
		 * If none of the `routes` matches current route, the router calls this handler callback and passes both
		 * route and argument to it. By default, returns null for any input.
		 */
		readonly notFound?: Handler<T>;
	}

	/**
	 * Router configuration object.
	 */
	export interface Config<T> {
		/**
		 * Router name. Router name is a chunk of the path that caused this route to get initialized. Root router
		 * doesn't have a name.
		 */
		readonly name?: string;

		/**
		 * Parent router. It provides `getFullPath` and `redirect` with a clue about all parts of the path. If
		 * your router provides you with wrong paths, check `name` and `parent` of all routers in your hierarchy - they
		 * are likely assigned to wrong values. Root router doesn't have a parent.
		 */
		readonly parent?: Router<any>;

		/**
		 * Path to bind the router to. Root router should usually get bound to `hash` property. Child routers should
		 * receive `path` from their parents.
		 */
		readonly path?: Bindable<string>;

		/**
		 * Target property. Router puts the result of `handler` function call to target property. If `target` is
		 * omitted, the router creates it automatically. Router automatically controls the life time of your targets,
		 * so, if you pass your precreated `target` property to a Router, make sure that it is not aggregating its value,
		 * i.e. `ownValue` method is not called.
		 */
		readonly target?: IProperty<T>;

		/**
		 * Path separator function. Parses incoming path to two tokens: route and argument. Route gets used to
		 * process a single routing step and create a target, argument gets passed to the target for further routing.
		 */
		readonly separator?: Separator | RegExp;

		/**
		 * Path joiner. Opposite to `separator`. Used in `getFullPath` and `redirect` methods to properly build the
		 * path. Joins incoming route and argument to a full path.
		 */
		readonly joiner?: Joiner | string;

		/**
		 * Route handler. Maps the route string to a target object and passes argument to it for further routing.
		 */
		readonly handler?: Handler<T> | HandlerConfig<T>;

		/**
		 * `separator`, `joiner` and `handler` call scope.
		 */
		readonly scope?: any;
	}

	/**
	 * If `separator` is a function, returns it immediately. Else converts the specified regular expression to
	 * a function by the following rule: The first token ($1) of path is used as a route, and the next non-null token
	 * ($2 or further) is used as an argument. If path is null, it is assumed to be "".
	 * @param separator Function or regular expression.
	 * @returns Separator function.
	 */
	export function makeSeparator(separator: Separator | RegExp = DEFAULT_SEPARATOR): Separator {
		if (typeof separator === "function") {
			return separator;
		}
		return function (path: string) {
			const result = separator.exec(path || "");
			return result ? [result[1], result.slice(2).find(x => x != null) ?? null] : null;
		};
	}

	/**
	 * If `joiner` is a function, returns it immediately. Else converts the specified string to a function by the
	 * following rule: joins incoming route/argument pair via the specified string. Leading joiner symbols in argument
	 * are trimmed. If argument starts with "?", joiner symbol is not added. If argument is null or blank, returns
	 * route.
	 * @param joiner Function or separation character.
	 * @returns Joiner function.
	 */
	export function makeJoiner(joiner: Joiner | string = DEFAULT_JOINER): Joiner {
		if (typeof joiner === "function") {
			return joiner;
		}
		const trimmer = new RegExp("^(?:" + joiner.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + ")*");
		return function (route, arg) {
			return !arg ? route : (arg.charAt(0) === "?") ? (route + arg) : (route + joiner + arg.replace(trimmer, ""));
		};
	}

	/**
	 * If handler is a function, returns it immediately. Else converts the specified object to a function.
	 * @param handler Handler configuration object.
	 * @returns Handler function.
	 */
	export function makeHandler<T>(handler: Handler<T> | HandlerConfig<T> = {}): Handler<T> {
		if (typeof handler === "function") {
			return handler;
		}
		const routes = handler.routes || {};
		return function (this: any, route: string, arg: Bindable<string>): T {
			return routes[route] ? routes[route].call(this, arg) :
				handler.notFound ? handler.notFound.call(this, route, arg) : null;
		};
	}

	/**
	 * Returns full path as the result of `joiner` function call in `parent` of `router` with `name` passed as
	 * `route` and `path` passed as `arg`. Returns `path` if this is the root router.
	 * @param path Path relative to `router`.
	 * @param router Compute full path relative to this router.
	 * @returns Full path relative to the `router`.
	 */
	export function getFullPath(path: string, router?: Router<any>) {
		return router ? router.getFullPath(path) : path;
	}
}
