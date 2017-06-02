/*!
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

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

import {defn, identity, isNotNil} from './index';
import Bindable from './Bindable';
import Class from './Class';
import Component from './Component';
import Copier from './Copier';
import Destroyable from './Destroyable';
import Dictionary from './Dictionary';
import hash from './hash';
import IProperty from './IProperty';
import Property from './Property';
import Timeout from './Timeout';
import * as ArrayUtils from './ArrayUtils';
import * as DictionaryUtils from './DictionaryUtils';

/**
 * This router can handle complicated router hierarchies (something more than a single stack of routers) in exchange
 * for neccessity to specify parent router on creation and base router on redirection explicitly.
 *
 * Also, it involves a new experimental feature: `arg` is passed to the handler as JW.Property instead of string.
 * So, `setPath` methods are not needed anymore: just bind to the `arg`.
 */
class Router<T extends Destroyable> extends Class {
	readonly name: string;
	readonly parent: Router<any>;
	readonly path: Bindable<string>;
	readonly separator: Router.Separator;
	readonly joiner: Router.Joiner;
	readonly handler: Router.Handler<T>;
	readonly scope: any;

	private _target: IProperty<T>;
	private _route: IProperty<string> = new Property<string>();
	private _arg: IProperty<string> = new Property<string>();
	private _updating: boolean = false;

	constructor(config: Router.Config<T> = {}) {
		super();
		this.name = config.name;
		this.parent = config.parent;
		if ((this.name == null) !== (this.parent == null)) {
			throw new Error("Router configuration error: you have specified router name or parent, but haven't specified another. These two options must come together.");
		}
		this.path = config.path || this.own(new Property<string>());
		this.separator = Router.makeSeparator(config.separator);
		this.joiner = Router.makeJoiner(config.joiner);
		this.handler = Router.makeHandler(config.handler);
		this.scope = config.scope || this;
		this._target = config.target || this.own(new Property<T>());
		this.own(this.path.changeEvent.listen(this.update, this));
	}

	get target(): Bindable<T> {
		return this._target;
	}

	get route(): Bindable<string> {
		return this._route;
	}

	get arg(): Bindable<string> {
		return this._arg;
	}

	destroyObject() {
		if (this._updating) {
			throw new Error("Router can not be destroyed during its update cycle.");
		}
		super.destroyObject();
	}

	update() {
		if (this._updating) {
			throw new Error("Can't update router because its update cycle is already active. " +
				"Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
		}
		this._updating = true;
		const path = this.path.get();
		const pair: string[] = (path == null) ? null : this.separator.call(this.scope, path);
		const route = (pair != null) ? (pair[0] || "") : "";
		const arg = (pair != null) ? (pair[1] || null) : null;
		if (route === this.route.get()) {
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

	join(route: string, arg: string): string {
		return this.joiner.call(this.scope, route, arg);
	}

	getFullPath(path: string): string {
		return this.parent ? this.parent.getFullPath(this.parent.join(this.name, path)) : path;
	}

	redirect(path: string, replaceState?: boolean) {
		Router.redirect(path, this, replaceState);
	}
}

export default Router;

namespace Router {
	export const defaultSeparator = /^\/*([^?\/]+)(?:\/(.*)|(\?.*))?$/;
	export const defaultJoiner = "/";

	export interface Separator {
		(path: string): string[];
	}

	export interface Joiner {
		(route: string, arg: string): string;
	}

	export interface Handler<T> {
		(route: string, arg: Bindable<string>): T;
	}

	export interface Route<T> {
		(arg: Bindable<string>): T;
	}

	export interface HandlerConfig<T> {
		routes?: Dictionary<Route<T>>;
		notFound?: Handler<T>;
	}

	export interface Config<T> {
		readonly name?: string;
		readonly parent?: Router<any>;
		readonly path?: Bindable<string>;
		readonly target?: IProperty<T>;
		readonly separator?: Separator | RegExp;
		readonly joiner?: Joiner | string;
		readonly handler?: Handler<T> | HandlerConfig<T>;
		readonly scope?: any;
	}

	/**
	 * Converts RegExp to separator function. The first token ($1) of path is used as a
	 * route, and the next non-null token ($2-...) is used as an argument.
	 * If path is null, it is assumed to be "".
	 *
	 * @param regexp Regular expression.
	 * @returns Separator function.
	 */
	export function makeSeparator(separator: Separator | RegExp = defaultSeparator): Separator {
		if (typeof separator === "function") {
			return separator;
		}
		return function(path: string) {
			const result = separator.exec(path || "");
			return result ? [result[1], defn(ArrayUtils.find(result.slice(2), isNotNil), null)] : null;
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
	export function makeJoiner(joiner: Joiner | string = defaultJoiner): Joiner {
		if (typeof joiner === "function") {
			return joiner;
		}
		var trimmer = new RegExp("^(?:" + joiner.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + ")*");
		return function(route, arg) {
			return !arg ? route : (arg.charAt(0) === "?") ? (route + arg) : (route + joiner + arg.replace(trimmer, ""));
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
	export function makeHandler<T>(handler: Handler<T> | HandlerConfig<T> = {}): Handler<T> {
		if (typeof handler === "function") {
			return handler;
		}
		const routes = handler.routes || {};
		return function(this: any, route: string, arg: Bindable<string>): T {
			return routes[route] ? routes[route].call(this, arg) :
				handler.notFound ? handler.notFound.call(this, route, arg) : null;
		};
	}

	export function getFullPath(path: string, router: Router<any>) {
		return router ? router.getFullPath(path) : path;
	}

	export function redirect(path: string, router: Router<any>, replaceState?: boolean) {
		try {
			path = getFullPath(path, router);
			if (hash.updating) {
				throw new Error("Update cycle is already active. " +
					"Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
			}
		} catch (e) {
			throw new Error("Can not perform URL redirection to " + path + ": " + e.message);
		}
		hash.set(path, replaceState);
	}

	export function bindRouting(component: any, path: Bindable<string>): Destroyable {
		return !component ? null :
			component.bindRouting ? component.bindRouting(path) :
			component.path ? new Copier(path, component.path) : null;
	}

	export class Redirector extends Component {
		constructor(private path: string, private router: Router<any>, private replaceState?: boolean) {
			super();
			this.own(new Timeout(() => {
				redirect(this.path, this.router, defn(this.replaceState, true));
			}, this));
		}
	}

	/**
	 * Creates a router that manages two mapping of properties:
	 *
	 * * `paths` which exposes string path properties for child routers if neccessary;
	 * * `expanded` which exposes boolean "expanded" properties for child UI panels.
	 *
	 * The logic is very similar to FE.CD.UI.Panel.List's routing, but it has some differences in API:
	 *
	 * * Node route array is constant whereas Panel.List may have variable set of panels;
	 * * In exchange, Panel.List requires all children to be AbstractPanels which requires some additional
	 *   configuration. Also, the panels must be initialized in advance, but not to be rendered yet at the moment
	 *   of router initialization.
	 *
	 * Configuration:
	 *
	 * * name, parentRouter, path - See FE.Lib.Multirouter;
	 * * routes: String[] - All possible routes;
	 * * defaultRoute?: String - Default route to redirect the router to (optional);
	 * * expanded?: Boolean | String[] - Panels to expand by default. Set to true to expand all panels.
	 */
	export class Node extends Class {
		private _paths: Dictionary<IProperty<string>>;
		private _expanded: Dictionary<IProperty<boolean>>;
		private _initialized = false; // used to auto-activate the first route on initialization
		private _updating = false; // used to prevent redirection error

		readonly defaultRoute: string;
		readonly router: Router<Destroyable>;

		constructor(config: Node.Config)  {
			super();
			this.defaultRoute = config.defaultRoute;

			const routeMap = ArrayUtils.index(config.routes, identity);
			this._paths    = DictionaryUtils.map(routeMap, () => new Property<string>());
			this._expanded = DictionaryUtils.map(routeMap, () => new Property(config.expanded === true));

			if (config.expanded && (typeof config.expanded !== "boolean")) {
				config.expanded.forEach((route) => {
					this._expanded[route].set(true);
				});
			}

			DictionaryUtils.each(this._expanded, (expanded, route) => {
				this.own(expanded.changeEvent.listen((params) => {
					if (params.value && !this._updating) {
						this.router.redirect(route);
					}
				}));
			});

			this.router = this.own(new Router<Destroyable>({
				name: config.name,
				parent: config.parent,
				path: config.path,
				handler: (route, arg) => {
					const path = this._paths[route];
					if (!path) {
						return (!this._initialized && this.defaultRoute) ?
							new Redirector(this.defaultRoute, this.router) : null;
					}
					this._updating = true;
					const expander = new NodeExpander(this.router, arg, path, this._expanded[route]);
					this._updating = false;
					return expander;
				}
			}));
			this.router.update();
			this._initialized = true;
		}

		get paths(): Dictionary<Bindable<string>> {
			return this._paths;
		}

		get expanded(): Dictionary<Bindable<boolean>> {
			return this._expanded;
		}
	}

	export namespace Node {
		export interface Config {
			readonly name?: string;
			readonly parent?: Router<any>;
			readonly path?: Bindable<string>;
			readonly routes: string[];
			readonly expanded?: boolean | string[];
			readonly defaultRoute?: string;
		}
	}

	class NodeExpander extends Class {
		constructor(private router: Router<any>, sourcePath: Bindable<string>,
				targetPath: IProperty<string>, expanded: IProperty<boolean>) {
			super();
			this.own(new Copier(sourcePath, targetPath));
			expanded.set(true);
			this.own(expanded.changeEvent.listen(() => {this.router.redirect("")}));
		}
	}
}
