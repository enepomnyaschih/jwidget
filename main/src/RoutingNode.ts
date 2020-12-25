/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

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
import Copier from './Copier';
import Destroyable from './Destroyable';
import IProperty from './IProperty';
import {map} from "./IterableUtils";
import Property from './Property';
import Router from "./Router";
import RouteRedirector, {redirectRoute} from './RouteRedirector';

/**
 * Creates a router that manages two mapping of properties:
 *
 * * `paths` which exposes string path properties for child routers if neccessary;
 * * `expanded` which exposes boolean "expanded" properties for child UI panels.
 *
 * This allows you to render your content as a fixed array of panels representing the concurrent routes.
 */
export default class RoutingNode extends Class {
	private _initialized = false; // used to auto-activate the first route on initialization
	private _updating = false; // used to prevent redirection error

	/**
	 * Provides paths to bind child routers to, by name. Only one route is active at a time, but their paths
	 * always exist regardless of their activity.
	 */
	readonly paths: ReadonlyMap<string, IProperty<string>>;

	/**
	 * Provides "expanded" flags to bind child panels to, by name. Support two-way binding.
	 */
	readonly expanded: ReadonlyMap<string, IProperty<boolean>>;

	/**
	 * Default route this node was initialized with.
	 */
	readonly defaultRoute: string;

	/**
	 * Router that manages this node. Node creates this router automatically. You should pass this router to
	 * child components as their parent router for further routing.
	 */
	readonly router: Router<Destroyable>;

	/**
	 * Creates router node, assigns its properties to initial values and starts synchronization.
	 * @param config Node configuration.
	 */
	constructor(config: RoutingNode.Config) {
		super();
		this.defaultRoute = config.defaultRoute;

		this.paths = new Map(map(config.routes, route => [route, new Property<string>()]));
		this.expanded = new Map(map(config.routes, route => [route, new Property(config.expanded === true)]));

		if (config.expanded && (typeof config.expanded !== "boolean")) {
			for (const route of config.expanded) {
				this.expanded.get(route).set(true);
			}
		}

		for (const [route, expanded] of this.expanded) {
			this.own(expanded.onChange.listen(message => {
				if (message.value && !this._updating) {
					redirectRoute(route, this.router);
				}
			}));
		}

		this.router = this.own(new Router<Destroyable>({
			name: config.name,
			parent: config.parent,
			path: config.path,
			handler: (route, arg) => {
				const path = this.paths.get(route);
				if (!path) {
					return (!this._initialized && this.defaultRoute) ?
						new RouteRedirector(this.defaultRoute, this.router) : null;
				}
				this._updating = true;
				const expander = new NodeExpander(this.router, arg, path, this.expanded.get(route));
				this._updating = false;
				return expander;
			}
		}));
		this.router.update();
		this._initialized = true;
	}
}

export namespace RoutingNode {
	/**
	 * Router.Node configuration.
	 */
	export interface Config {
		/**
		 * Router name.
		 */
		readonly name?: string;

		/**
		 * Parent router.
		 */
		readonly parent?: Router<any>;

		/**
		 * Path to bind the router to.
		 */
		readonly path?: Bindable<string>;

		/**
		 * Fixed array of routes to manage by this node. For every name in this list, corresponding properties will be
		 * created in `paths` and `expanded` dictionaries of the node.
		 */
		readonly routes: Iterable<string>;

		/**
		 * Initial "expanded" status of routes or initial routes to expand. Defaults to false (all routes are
		 * collapsed).
		 */
		readonly expanded?: boolean | Iterable<string>;

		/**
		 * Default route. If the initial path is blank (""), the router performs a redirection to this route, i.e.
		 * expands one of the panels. Doesn't work after initialization.
		 */
		readonly defaultRoute?: string;
	}
}

class NodeExpander extends Class {
	constructor(private router: Router<any>, sourcePath: Bindable<string>,
				targetPath: IProperty<string>, expanded: IProperty<boolean>) {
		super();
		this.own(new Copier(sourcePath, targetPath));
		expanded.set(true);
		this.own(expanded.onChange.listen(() => {
			redirectRoute("", this.router);
		}));
	}
}
