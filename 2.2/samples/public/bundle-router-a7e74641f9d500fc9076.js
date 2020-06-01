(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["router"],{

/***/ "../../main/dist/Copier.js":
/*!******************************************!*\
  !*** C:/jwidget/git/main/dist/Copier.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));
const Property_1 = __importDefault(__webpack_require__(/*! ./Property */ "../../main/dist/Property.js"));
/**
 * Listens source `Bindable` modification and copies its value to target property.
 *
 * @param T Property value type.
 */
class Copier extends Class_1.default {
    /**
     * @param source Source bindable.
     * @param target Target property.
     */
    constructor(source, target) {
        super();
        this.source = source;
        this._targetCreated = target == null;
        this._target = (target == null) ? new Property_1.default(null, source.silent) : target;
        this._update();
        this.own(this.source.changeEvent.listen(this._update, this));
    }
    /**
     * Target property.
     */
    get target() {
        return this._target;
    }
    /**
     * @inheritDoc
     */
    destroyObject() {
        if (this._targetCreated) {
            this._target.destroy();
        }
        this._target = null;
        super.destroyObject();
    }
    _update() {
        this._target.set(this.source.get());
    }
}
exports.default = Copier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29waWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvcGllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQkU7Ozs7O0FBR0Ysb0RBQTRCO0FBRTVCLDBEQUFrQztBQUVsQzs7OztHQUlHO0FBQ0gsTUFBTSxNQUFVLFNBQVEsZUFBSztJQUk1Qjs7O09BR0c7SUFDSCxZQUFxQixNQUFtQixFQUFFLE1BQXFCO1FBQzlELEtBQUssRUFBRSxDQUFDO1FBRFksV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUV2QyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBUSxDQUFJLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNoRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNPLGFBQWE7UUFDdEIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLE9BQU87UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNEO0FBRUQsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IEJpbmRhYmxlIGZyb20gJy4vQmluZGFibGUnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vQ2xhc3MnO1xuaW1wb3J0IElQcm9wZXJ0eSBmcm9tICcuL0lQcm9wZXJ0eSc7XG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi9Qcm9wZXJ0eSc7XG5cbi8qKlxuICogTGlzdGVucyBzb3VyY2UgYEJpbmRhYmxlYCBtb2RpZmljYXRpb24gYW5kIGNvcGllcyBpdHMgdmFsdWUgdG8gdGFyZ2V0IHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSBUIFByb3BlcnR5IHZhbHVlIHR5cGUuXG4gKi9cbmNsYXNzIENvcGllcjxWPiBleHRlbmRzIENsYXNzIHtcblx0cHJpdmF0ZSBfdGFyZ2V0Q3JlYXRlZDogYm9vbGVhbjtcblx0cHJpdmF0ZSBfdGFyZ2V0OiBJUHJvcGVydHk8Vj47XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBzb3VyY2UgU291cmNlIGJpbmRhYmxlLlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBwcm9wZXJ0eS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHJlYWRvbmx5IHNvdXJjZTogQmluZGFibGU8Vj4sIHRhcmdldD86IElQcm9wZXJ0eTxWPikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fdGFyZ2V0Q3JlYXRlZCA9IHRhcmdldCA9PSBudWxsO1xuXHRcdHRoaXMuX3RhcmdldCA9ICh0YXJnZXQgPT0gbnVsbCkgPyBuZXcgUHJvcGVydHk8Vj4obnVsbCwgc291cmNlLnNpbGVudCkgOiB0YXJnZXQ7XG5cdFx0dGhpcy5fdXBkYXRlKCk7XG5cdFx0dGhpcy5vd24odGhpcy5zb3VyY2UuY2hhbmdlRXZlbnQubGlzdGVuKHRoaXMuX3VwZGF0ZSwgdGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRhcmdldCBwcm9wZXJ0eS5cblx0ICovXG5cdGdldCB0YXJnZXQoKTogQmluZGFibGU8Vj4ge1xuXHRcdHJldHVybiB0aGlzLl90YXJnZXQ7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHByb3RlY3RlZCBkZXN0cm95T2JqZWN0KCkge1xuXHRcdGlmICh0aGlzLl90YXJnZXRDcmVhdGVkKSB7XG5cdFx0XHR0aGlzLl90YXJnZXQuZGVzdHJveSgpO1xuXHRcdH1cblx0XHR0aGlzLl90YXJnZXQgPSBudWxsO1xuXHRcdHN1cGVyLmRlc3Ryb3lPYmplY3QoKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHR0aGlzLl90YXJnZXQuc2V0KHRoaXMuc291cmNlLmdldCgpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb3BpZXI7XG4iXX0=

/***/ }),

/***/ "../../main/dist/Router.js":
/*!******************************************!*\
  !*** C:/jwidget/git/main/dist/Router.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayUtils = __importStar(__webpack_require__(/*! ./ArrayUtils */ "../../main/dist/ArrayUtils.js"));
const CancelToken_1 = __importDefault(__webpack_require__(/*! ./CancelToken */ "../../main/dist/CancelToken.js"));
const Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));
const Component_1 = __importDefault(__webpack_require__(/*! ./Component */ "../../main/dist/Component.js"));
const Copier_1 = __importDefault(__webpack_require__(/*! ./Copier */ "../../main/dist/Copier.js"));
const defer_1 = __importDefault(__webpack_require__(/*! ./defer */ "../../main/dist/defer.js"));
const DictionaryUtils = __importStar(__webpack_require__(/*! ./DictionaryUtils */ "../../main/dist/DictionaryUtils.js"));
const hash_1 = __importDefault(__webpack_require__(/*! ./hash */ "../../main/dist/hash.js"));
const index_1 = __webpack_require__(/*! ./index */ "../../main/dist/index.js");
const Property_1 = __importDefault(__webpack_require__(/*! ./Property */ "../../main/dist/Property.js"));
/**
 * URL router. Converts incoming part of URL (hash) to a target object and passes tail string to it
 * for further routing.
 */
class Router extends Class_1.default {
    /**
     * Creates router instance. Please notice that the router doesn't process current route immediately on
     * initialization. To process the route, call `update` method.
     * @param config Router configuration.
     */
    constructor(config = {}) {
        super();
        this._route = new Property_1.default();
        this._arg = new Property_1.default();
        this._updating = false;
        this.name = config.name;
        this.parent = config.parent;
        if ((this.name == null) !== (this.parent == null)) {
            throw new Error("Router configuration error: you have specified router name or parent, but haven't specified another. These two options must come together.");
        }
        this.path = config.path || new Property_1.default(); // we don't own it because its value is being used in destroyObject method - after ownage pool releasing
        this.separator = Router.makeSeparator(config.separator);
        this.joiner = Router.makeJoiner(config.joiner);
        this.handler = Router.makeHandler(config.handler);
        this.scope = config.scope || this;
        this._target = config.target || this.own(new Property_1.default());
        this.own(this.path.changeEvent.listen(this.update, this));
    }
    /**
     * Router target. Main purpose of the router is to convert `path` to `target`. In particular, UIRouter
     * creates Component instances based on current `path` value so you could render them.
     */
    get target() {
        return this._target;
    }
    /**
     * Current route. First chunk of the path detected by `separator` function. You can watch this property
     * to activate and deactivate items in your menu.
     */
    get route() {
        return this._route;
    }
    /**
     * Remainder of current route after `separator` function call. This property is passed to `handler`
     * function and can be passed over to child components for further routing.
     */
    get arg() {
        return this._arg;
    }
    /**
     * @inheritDoc
     */
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
    update() {
        if (this._updating) {
            throw new Error("Can't update router because its update cycle is already active. " +
                "Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
        }
        this._updating = true;
        const path = this.path.get();
        const pair = (path == null) ? null : this.separator.call(this.scope, path);
        const route = (pair != null) ? (pair[0] || "") : "";
        const arg = (pair != null) ? (pair[1] || null) : null;
        if (route === this.route.get()) {
            this._arg.set(arg);
        }
        else {
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
    join(route, arg) {
        return this.joiner.call(this.scope, route, arg);
    }
    /**
     * Returns full path as the result of `joiner` function call in `parent` router with `name` passed as
     * `route` and `path` passed as `arg`. Returns `path` if this is the root router.
     * @param path Path relative to this router.
     * @returns Full path relative to the root router.
     */
    getFullPath(path) {
        return this.parent ? this.parent.getFullPath(this.parent.join(this.name, path)) : path;
    }
    /**
     * Immediately performs the redirection, i.e. sets `hash` to `getFullPath(path)`.
     * @param path Path relative to this router.
     * @param replaceState Replace the current browser historical state rather than pushing a new state to the stack.
     */
    redirect(path, replaceState) {
        Router.redirect(path, this, replaceState);
    }
}
exports.default = Router;
(function (Router) {
    /**
     * Default value of `separator`.
     */
    Router.DEFAULT_SEPARATOR = /^\/*([^?\/]+)(?:\/(.*)|(\?.*))?$/;
    /**
     * Default value of `joiner`.
     */
    Router.DEFAULT_JOINER = "/";
    /**
     * If `separator` is a function, returns it immediately. Else converts the specified regular expression to
     * a function by the following rule: The first token ($1) of path is used as a route, and the next non-null token
     * ($2 or further) is used as an argument. If path is null, it is assumed to be "".
     * @param separator Function or regular expression.
     * @returns Separator function.
     */
    function makeSeparator(separator = Router.DEFAULT_SEPARATOR) {
        if (typeof separator === "function") {
            return separator;
        }
        return function (path) {
            const result = separator.exec(path || "");
            return result ? [result[1], index_1.defn(ArrayUtils.find(result.slice(2), index_1.isNotNil), null)] : null;
        };
    }
    Router.makeSeparator = makeSeparator;
    /**
     * If `joiner` is a function, returns it immediately. Else converts the specified string to a function by the
     * following rule: joins incoming route/argument pair via the specified string. Leading joiner symbols in argument
     * are trimmed. If argument starts with "?", joiner symbol is not added. If argument is null or blank, returns
     * route.
     * @param joiner Function or separation character.
     * @returns Joiner function.
     */
    function makeJoiner(joiner = Router.DEFAULT_JOINER) {
        if (typeof joiner === "function") {
            return joiner;
        }
        const trimmer = new RegExp("^(?:" + joiner.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + ")*");
        return function (route, arg) {
            return !arg ? route : (arg.charAt(0) === "?") ? (route + arg) : (route + joiner + arg.replace(trimmer, ""));
        };
    }
    Router.makeJoiner = makeJoiner;
    /**
     * If handler is a function, returns it immediately. Else converts the specified object to a function.
     * @param handler Handler configuration object.
     * @returns Handler function.
     */
    function makeHandler(handler = {}) {
        if (typeof handler === "function") {
            return handler;
        }
        const routes = handler.routes || {};
        return function (route, arg) {
            return routes[route] ? routes[route].call(this, arg) :
                handler.notFound ? handler.notFound.call(this, route, arg) : null;
        };
    }
    Router.makeHandler = makeHandler;
    /**
     * Returns full path as the result of `joiner` function call in `parent` of `router` with `name` passed as
     * `route` and `path` passed as `arg`. Returns `path` if this is the root router.
     * @param path Path relative to `router`.
     * @param router Compute full path relative to this router.
     * @returns Full path relative to the `router`.
     */
    function getFullPath(path, router) {
        return router ? router.getFullPath(path) : path;
    }
    Router.getFullPath = getFullPath;
    /**
     * Immediately performs the redirection, i.e. sets `hash` to `getFullPath(path, router)`.
     * @param path Path relative to `router`.
     * @param router Redirect relative to this router.
     * @param replaceState Replace the current browser historical state rather than pushing a new state to the stack.
     */
    function redirect(path, router, replaceState) {
        try {
            path = getFullPath(path, router);
            if (hash_1.default.updating) {
                throw new Error("Update cycle is already active. " +
                    "Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
            }
        }
        catch (e) {
            throw new Error("Can not perform URL redirection to " + path + ": " + e.message);
        }
        hash_1.default.set(path, replaceState);
    }
    Router.redirect = redirect;
    /**
     * Recommended way to perform an asyncronous redirection in Router `handler` function.
     */
    class Redirector extends Component_1.default {
        /**
         * Creates a new redirector.
         * @param path Path relative to router.
         * @param router Redirect relative to this router.
         * @param replaceState Replace the current browser historical state rather than pushing a new state to the
         * stack. Defaults to true.
         */
        constructor(path, router, replaceState) {
            super();
            this.path = path;
            this.router = router;
            this.replaceState = replaceState;
            defer_1.default(0, this.own(new CancelToken_1.default())).then(() => {
                redirect(this.path, this.router, index_1.defn(this.replaceState, true));
            });
        }
    }
    Router.Redirector = Redirector;
    /**
     * Creates a router that manages two mapping of properties:
     *
     * * `paths` which exposes string path properties for child routers if neccessary;
     * * `expanded` which exposes boolean "expanded" properties for child UI panels.
     *
     * This allows you to render your content as a fixed list of panels representing the concurrent routes.
     */
    class Node extends Class_1.default {
        /**
         * Creates router node, assigns its properties to initial values and starts synchronization.
         * @param config Node configuration.
         */
        constructor(config) {
            super();
            this._initialized = false; // used to auto-activate the first route on initialization
            this._updating = false; // used to prevent redirection error
            this.defaultRoute = config.defaultRoute;
            const routeMap = ArrayUtils.index(config.routes, index_1.identity);
            this._paths = DictionaryUtils.map(routeMap, () => new Property_1.default());
            this._expanded = DictionaryUtils.map(routeMap, () => new Property_1.default(config.expanded === true));
            if (config.expanded && (typeof config.expanded !== "boolean")) {
                config.expanded.forEach((route) => {
                    this._expanded[route].set(true);
                });
            }
            DictionaryUtils.forEach(this._expanded, (expanded, route) => {
                this.own(expanded.changeEvent.listen((params) => {
                    if (params.value && !this._updating) {
                        this.router.redirect(route);
                    }
                }));
            });
            this.router = this.own(new Router({
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
        /**
         * Provides paths to bind child routers to, by name. Only one route is active at a time, but their paths
         * always exist regardless of their activity.
         */
        get paths() {
            return this._paths;
        }
        /**
         * Provides "expanded" flags to bind child panels to, by name. Support two-way binding.
         */
        get expanded() {
            return this._expanded;
        }
    }
    Router.Node = Node;
    class NodeExpander extends Class_1.default {
        constructor(router, sourcePath, targetPath, expanded) {
            super();
            this.router = router;
            this.own(new Copier_1.default(sourcePath, targetPath));
            expanded.set(true);
            this.own(expanded.changeEvent.listen(() => {
                this.router.redirect("");
            }));
        }
    }
})(Router || (Router = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVGLHlEQUEyQztBQUUzQyxnRUFBd0M7QUFDeEMsb0RBQTRCO0FBQzVCLDREQUFvQztBQUNwQyxzREFBOEI7QUFDOUIsb0RBQTRCO0FBRzVCLG1FQUFxRDtBQUNyRCxrREFBMEI7QUFDMUIsbUNBQWlEO0FBRWpELDBEQUFrQztBQUVsQzs7O0dBR0c7QUFDSCxNQUFNLE1BQThCLFNBQVEsZUFBSztJQTZDaEQ7Ozs7T0FJRztJQUNILFlBQVksU0FBMkIsRUFBRTtRQUN4QyxLQUFLLEVBQUUsQ0FBQztRQVZELFdBQU0sR0FBc0IsSUFBSSxrQkFBUSxFQUFVLENBQUM7UUFDbkQsU0FBSSxHQUFzQixJQUFJLGtCQUFRLEVBQVUsQ0FBQztRQUNqRCxjQUFTLEdBQVksS0FBSyxDQUFDO1FBU2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsNElBQTRJLENBQUMsQ0FBQztTQUM5SjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLGtCQUFRLEVBQVUsQ0FBQyxDQUFDLHdHQUF3RztRQUMzSixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFD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R0FBTixNQUFNLENBQWE7WUFHdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGdCQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRDtBQUNGLENBQUMsRUFsWFMsTUFBTSxLQUFOLE1BQU0sUUFrWGYiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgKiBhcyBBcnJheVV0aWxzIGZyb20gJy4vQXJyYXlVdGlscyc7XG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSBcIi4vQ2FuY2VsVG9rZW5cIjtcbmltcG9ydCBDbGFzcyBmcm9tICcuL0NsYXNzJztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9Db21wb25lbnQnO1xuaW1wb3J0IENvcGllciBmcm9tICcuL0NvcGllcic7XG5pbXBvcnQgZGVmZXIgZnJvbSBcIi4vZGVmZXJcIjtcbmltcG9ydCBEZXN0cm95YWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcbmltcG9ydCBEaWN0aW9uYXJ5IGZyb20gJy4vRGljdGlvbmFyeSc7XG5pbXBvcnQgKiBhcyBEaWN0aW9uYXJ5VXRpbHMgZnJvbSAnLi9EaWN0aW9uYXJ5VXRpbHMnO1xuaW1wb3J0IGhhc2ggZnJvbSAnLi9oYXNoJztcbmltcG9ydCB7ZGVmbiwgaWRlbnRpdHksIGlzTm90TmlsfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCBJUHJvcGVydHkgZnJvbSAnLi9JUHJvcGVydHknO1xuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4vUHJvcGVydHknO1xuXG4vKipcbiAqIFVSTCByb3V0ZXIuIENvbnZlcnRzIGluY29taW5nIHBhcnQgb2YgVVJMIChoYXNoKSB0byBhIHRhcmdldCBvYmplY3QgYW5kIHBhc3NlcyB0YWlsIHN0cmluZyB0byBpdFxuICogZm9yIGZ1cnRoZXIgcm91dGluZy5cbiAqL1xuY2xhc3MgUm91dGVyPFQgZXh0ZW5kcyBEZXN0cm95YWJsZT4gZXh0ZW5kcyBDbGFzcyB7XG5cblx0LyoqXG5cdCAqIFJvdXRlciBuYW1lLiBNdXN0IGJlIGVxdWFsIHRvIHRoZSByb3V0ZSBuYW1lIGluIHRoZSBgcGFyZW50YCByb3V0ZXIuIFJlcXVpcmVkIGZvciBwcm9wZXIgYGdldEZ1bGxQYXRoYCBhbmRcblx0ICogYHJlZGlyZWN0YCBtZXRob2QgcHJvY2Vzc2luZy4gUm9vdCByb3V0ZXIgZG9lcyBub3QgaGF2ZSBhIG5hbWUuXG5cdCAqL1xuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFBhcmVudCByb3V0ZXIuIFJlcXVpcmVkIGZvciBwcm9wZXIgYGdldEZ1bGxQYXRoYCBhbmQgYHJlZGlyZWN0YCBtZXRob2QgcHJvY2Vzc2luZy4gUm9vdCByb3V0ZXIgZG9lcyBub3QgaGF2ZVxuXHQgKiBhIHBhcmVudC5cblx0ICovXG5cdHJlYWRvbmx5IHBhcmVudDogUm91dGVyPGFueT47XG5cblx0LyoqXG5cdCAqIFBhdGggdGhhdCB0aGUgcm91dGVyIGlzIGJvdW5kIHRvLiBQYXRoIGlzIGEgZmluYWwgcGFydCBvZiBVUkwgKGhhc2gpIHJlbGV2YW50IHRvIHRoaXNcblx0ICogcm91dGVyLiBBbnkgcGF0aCBjaGFuZ2UgcmVzdWx0cyBpbiBgdXBkYXRlYCBtZXRob2QgY2FsbC5cblx0ICovXG5cdHJlYWRvbmx5IHBhdGg6IEJpbmRhYmxlPHN0cmluZz47XG5cblx0LyoqXG5cdCAqIFBhdGggc2VwYXJhdG9yIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIHJvdXRlci5cblx0ICovXG5cdHJlYWRvbmx5IHNlcGFyYXRvcjogUm91dGVyLlNlcGFyYXRvcjtcblxuXHQvKipcblx0ICogUGF0aCBqb2luZXIgZnVuY3Rpb24gdXNlZCBieSB0aGUgcm91dGVyLlxuXHQgKi9cblx0cmVhZG9ubHkgam9pbmVyOiBSb3V0ZXIuSm9pbmVyO1xuXG5cdC8qKlxuXHQgKiBSb3V0ZSBoYW5kbGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIHJvdXRlci5cblx0ICovXG5cdHJlYWRvbmx5IGhhbmRsZXI6IFJvdXRlci5IYW5kbGVyPFQ+O1xuXG5cdC8qKlxuXHQgKiBgc2VwYXJhdG9yYCwgYGpvaW5lcmAgYW5kIGBoYW5kbGVyYCBjYWxsIHNjb3BlLlxuXHQgKi9cblx0cmVhZG9ubHkgc2NvcGU6IGFueTtcblxuXHRwcml2YXRlIF90YXJnZXQ6IElQcm9wZXJ0eTxUPjtcblx0cHJpdmF0ZSBfcm91dGU6IElQcm9wZXJ0eTxzdHJpbmc+ID0gbmV3IFByb3BlcnR5PHN0cmluZz4oKTtcblx0cHJpdmF0ZSBfYXJnOiBJUHJvcGVydHk8c3RyaW5nPiA9IG5ldyBQcm9wZXJ0eTxzdHJpbmc+KCk7XG5cdHByaXZhdGUgX3VwZGF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgcm91dGVyIGluc3RhbmNlLiBQbGVhc2Ugbm90aWNlIHRoYXQgdGhlIHJvdXRlciBkb2Vzbid0IHByb2Nlc3MgY3VycmVudCByb3V0ZSBpbW1lZGlhdGVseSBvblxuXHQgKiBpbml0aWFsaXphdGlvbi4gVG8gcHJvY2VzcyB0aGUgcm91dGUsIGNhbGwgYHVwZGF0ZWAgbWV0aG9kLlxuXHQgKiBAcGFyYW0gY29uZmlnIFJvdXRlciBjb25maWd1cmF0aW9uLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY29uZmlnOiBSb3V0ZXIuQ29uZmlnPFQ+ID0ge30pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuXHRcdHRoaXMucGFyZW50ID0gY29uZmlnLnBhcmVudDtcblx0XHRpZiAoKHRoaXMubmFtZSA9PSBudWxsKSAhPT0gKHRoaXMucGFyZW50ID09IG51bGwpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZXIgY29uZmlndXJhdGlvbiBlcnJvcjogeW91IGhhdmUgc3BlY2lmaWVkIHJvdXRlciBuYW1lIG9yIHBhcmVudCwgYnV0IGhhdmVuJ3Qgc3BlY2lmaWVkIGFub3RoZXIuIFRoZXNlIHR3byBvcHRpb25zIG11c3QgY29tZSB0b2dldGhlci5cIik7XG5cdFx0fVxuXHRcdHRoaXMucGF0aCA9IGNvbmZpZy5wYXRoIHx8IG5ldyBQcm9wZXJ0eTxzdHJpbmc+KCk7IC8vIHdlIGRvbid0IG93biBpdCBiZWNhdXNlIGl0cyB2YWx1ZSBpcyBiZWluZyB1c2VkIGluIGRlc3Ryb3lPYmplY3QgbWV0aG9kIC0gYWZ0ZXIgb3duYWdlIHBvb2wgcmVsZWFzaW5nXG5cdFx0dGhpcy5zZXBhcmF0b3IgPSBSb3V0ZXIubWFrZVNlcGFyYXRvcihjb25maWcuc2VwYXJhdG9yKTtcblx0XHR0aGlzLmpvaW5lciA9IFJvdXRlci5tYWtlSm9pbmVyKGNvbmZpZy5qb2luZXIpO1xuXHRcdHRoaXMuaGFuZGxlciA9IFJvdXRlci5tYWtlSGFuZGxlcihjb25maWcuaGFuZGxlcik7XG5cdFx0dGhpcy5zY29wZSA9IGNvbmZpZy5zY29wZSB8fCB0aGlzO1xuXHRcdHRoaXMuX3RhcmdldCA9IGNvbmZpZy50YXJnZXQgfHwgdGhpcy5vd24obmV3IFByb3BlcnR5PFQ+KCkpO1xuXHRcdHRoaXMub3duKHRoaXMucGF0aC5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy51cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3V0ZXIgdGFyZ2V0LiBNYWluIHB1cnBvc2Ugb2YgdGhlIHJvdXRlciBpcyB0byBjb252ZXJ0IGBwYXRoYCB0byBgdGFyZ2V0YC4gSW4gcGFydGljdWxhciwgVUlSb3V0ZXJcblx0ICogY3JlYXRlcyBDb21wb25lbnQgaW5zdGFuY2VzIGJhc2VkIG9uIGN1cnJlbnQgYHBhdGhgIHZhbHVlIHNvIHlvdSBjb3VsZCByZW5kZXIgdGhlbS5cblx0ICovXG5cdGdldCB0YXJnZXQoKTogQmluZGFibGU8VD4ge1xuXHRcdHJldHVybiB0aGlzLl90YXJnZXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3VycmVudCByb3V0ZS4gRmlyc3QgY2h1bmsgb2YgdGhlIHBhdGggZGV0ZWN0ZWQgYnkgYHNlcGFyYXRvcmAgZnVuY3Rpb24uIFlvdSBjYW4gd2F0Y2ggdGhpcyBwcm9wZXJ0eVxuXHQgKiB0byBhY3RpdmF0ZSBhbmQgZGVhY3RpdmF0ZSBpdGVtcyBpbiB5b3VyIG1lbnUuXG5cdCAqL1xuXHRnZXQgcm91dGUoKTogQmluZGFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3JvdXRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbWFpbmRlciBvZiBjdXJyZW50IHJvdXRlIGFmdGVyIGBzZXBhcmF0b3JgIGZ1bmN0aW9uIGNhbGwuIFRoaXMgcHJvcGVydHkgaXMgcGFzc2VkIHRvIGBoYW5kbGVyYFxuXHQgKiBmdW5jdGlvbiBhbmQgY2FuIGJlIHBhc3NlZCBvdmVyIHRvIGNoaWxkIGNvbXBvbmVudHMgZm9yIGZ1cnRoZXIgcm91dGluZy5cblx0ICovXG5cdGdldCBhcmcoKTogQmluZGFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX2FyZztcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0ZGVzdHJveU9iamVjdCgpIHtcblx0XHRpZiAodGhpcy5fdXBkYXRpbmcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJvdXRlciBjYW4gbm90IGJlIGRlc3Ryb3llZCBkdXJpbmcgaXRzIHVwZGF0ZSBjeWNsZS5cIik7XG5cdFx0fVxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuX3RhcmdldC5nZXQoKTtcblx0XHRpZiAodGFyZ2V0ICE9IG51bGwpIHtcblx0XHRcdHRhcmdldC5kZXN0cm95KCk7XG5cdFx0fVxuXHRcdHN1cGVyLmRlc3Ryb3lPYmplY3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJc3N1ZXMgcm91dGUgcHJvY2Vzc2luZy5cblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHRpZiAodGhpcy5fdXBkYXRpbmcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IHVwZGF0ZSByb3V0ZXIgYmVjYXVzZSBpdHMgdXBkYXRlIGN5Y2xlIGlzIGFscmVhZHkgYWN0aXZlLiBcIiArXG5cdFx0XHRcdFwiU3VnZ2VzdCB1c2luZyBSb3V0ZXIuUmVkaXJlY3RvciBvciBtb3ZpbmcgVVJMIHJlZGlyZWN0aW9uIHRvIGFuIGFzeW5jcm9ub3VzIGNhbGxiYWNrLlwiKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xuXHRcdGNvbnN0IHBhdGggPSB0aGlzLnBhdGguZ2V0KCk7XG5cdFx0Y29uc3QgcGFpcjogc3RyaW5nW10gPSAocGF0aCA9PSBudWxsKSA/IG51bGwgOiB0aGlzLnNlcGFyYXRvci5jYWxsKHRoaXMuc2NvcGUsIHBhdGgpO1xuXHRcdGNvbnN0IHJvdXRlID0gKHBhaXIgIT0gbnVsbCkgPyAocGFpclswXSB8fCBcIlwiKSA6IFwiXCI7XG5cdFx0Y29uc3QgYXJnID0gKHBhaXIgIT0gbnVsbCkgPyAocGFpclsxXSB8fCBudWxsKSA6IG51bGw7XG5cdFx0aWYgKHJvdXRlID09PSB0aGlzLnJvdXRlLmdldCgpKSB7XG5cdFx0XHR0aGlzLl9hcmcuc2V0KGFyZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0LmdldCgpO1xuXHRcdFx0aWYgKHRhcmdldCAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3RhcmdldC5zZXQobnVsbCk7XG5cdFx0XHRcdHRhcmdldC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hcmcuc2V0KGFyZyk7XG5cdFx0XHR0aGlzLl9yb3V0ZS5zZXQocm91dGUpO1xuXHRcdFx0dGhpcy5fdGFyZ2V0LnNldCh0aGlzLmhhbmRsZXIuY2FsbCh0aGlzLnNjb3BlLCByb3V0ZSwgdGhpcy5fYXJnKSB8fCBudWxsKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGpvaW5lcmAgZnVuY3Rpb24gY2FsbCBmb3IgdGhpcyByb3V0ZXIuXG5cdCAqIEBwYXJhbSByb3V0ZSBSb3V0ZSBuYW1lLlxuXHQgKiBAcGFyYW0gYXJnIFJlbWFpbmRlciBvZiB0aGUgcGF0aC5cblx0ICogQHJldHVybnMgRnVsbCBwYXRoLlxuXHQgKi9cblx0am9pbihyb3V0ZTogc3RyaW5nLCBhcmc6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuam9pbmVyLmNhbGwodGhpcy5zY29wZSwgcm91dGUsIGFyZyk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBmdWxsIHBhdGggYXMgdGhlIHJlc3VsdCBvZiBgam9pbmVyYCBmdW5jdGlvbiBjYWxsIGluIGBwYXJlbnRgIHJvdXRlciB3aXRoIGBuYW1lYCBwYXNzZWQgYXNcblx0ICogYHJvdXRlYCBhbmQgYHBhdGhgIHBhc3NlZCBhcyBgYXJnYC4gUmV0dXJucyBgcGF0aGAgaWYgdGhpcyBpcyB0aGUgcm9vdCByb3V0ZXIuXG5cdCAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXG5cdCAqIEByZXR1cm5zIEZ1bGwgcGF0aCByZWxhdGl2ZSB0byB0aGUgcm9vdCByb3V0ZXIuXG5cdCAqL1xuXHRnZXRGdWxsUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmdldEZ1bGxQYXRoKHRoaXMucGFyZW50LmpvaW4odGhpcy5uYW1lLCBwYXRoKSkgOiBwYXRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEltbWVkaWF0ZWx5IHBlcmZvcm1zIHRoZSByZWRpcmVjdGlvbiwgaS5lLiBzZXRzIGBoYXNoYCB0byBgZ2V0RnVsbFBhdGgocGF0aClgLlxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxuXHQgKiBAcGFyYW0gcmVwbGFjZVN0YXRlIFJlcGxhY2UgdGhlIGN1cnJlbnQgYnJvd3NlciBoaXN0b3JpY2FsIHN0YXRlIHJhdGhlciB0aGFuIHB1c2hpbmcgYSBuZXcgc3RhdGUgdG8gdGhlIHN0YWNrLlxuXHQgKi9cblx0cmVkaXJlY3QocGF0aDogc3RyaW5nLCByZXBsYWNlU3RhdGU/OiBib29sZWFuKSB7XG5cdFx0Um91dGVyLnJlZGlyZWN0KHBhdGgsIHRoaXMsIHJlcGxhY2VTdGF0ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyO1xuXG5uYW1lc3BhY2UgUm91dGVyIHtcblx0LyoqXG5cdCAqIERlZmF1bHQgdmFsdWUgb2YgYHNlcGFyYXRvcmAuXG5cdCAqL1xuXHRleHBvcnQgY29uc3QgREVGQVVMVF9TRVBBUkFUT1IgPSAvXlxcLyooW14/XFwvXSspKD86XFwvKC4qKXwoXFw/LiopKT8kLztcblxuXHQvKipcblx0ICogRGVmYXVsdCB2YWx1ZSBvZiBgam9pbmVyYC5cblx0ICovXG5cdGV4cG9ydCBjb25zdCBERUZBVUxUX0pPSU5FUiA9IFwiL1wiO1xuXG5cdC8qKlxuXHQgKiBTaWduYXR1cmUgb2YgYHNlcGFyYXRvcmAgZnVuY3Rpb24uIFRoZSBmdW5jdGlvbiBzcGxpdHMgcGF0aCB0byByb3V0ZSBhbmQgYXJndW1lbnQuIFRoZXJlZm9yZSwgaXQgbXVzdFxuXHQgKiByZXR1cm4gdHdvIHN0cmluZyB2YWx1ZXMuIElmIGZ1bmN0aW9uIHJldHVybnMgbnVsbCwgaXQgaXMgYXNzdW1lZCB0byBiZSBbXCJcIiwgbnVsbF0uXG5cdCAqL1xuXHRleHBvcnQgaW50ZXJmYWNlIFNlcGFyYXRvciB7XG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIHBhdGggRnVsbCBwYXRoLlxuXHRcdCAqIEByZXR1cm5zIFJvdXRlIGFuZCBhcmd1bWVudC5cblx0XHQgKi9cblx0XHQocGF0aDogc3RyaW5nKTogc3RyaW5nW107XG5cdH1cblxuXHQvKipcblx0ICogU2lnbmF0dXJlIG9mIGBqb2luZXJgIGZ1bmN0aW9uLiBUaGUgZnVuY3Rpb24gam9pbnMgcm91dGUgYW5kIGFyZ3VtZW50IHRvIGEgcGF0aC5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgSm9pbmVyIHtcblx0XHQvKipcblx0XHQgKiBAcGFyYW0gcm91dGUgUm91dGUuXG5cdFx0ICogQHBhcmFtIGFyZyBBcmd1bWVudC5cblx0XHQgKiBAcmV0dXJucyBGdWxsIHBhdGguXG5cdFx0ICovXG5cdFx0KHJvdXRlOiBzdHJpbmcsIGFyZzogc3RyaW5nKTogc3RyaW5nO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNpZ25hdHVyZSBvZiBgaGFuZGxlcmAgZ2VuZXJhbC1wdXJwb3NlIGZ1bmN0aW9uLiBUaGUgZnVuY3Rpb24gbWFwcyB0aGUgc3BlY2lmaWVkIHJvdXRlIHRvIGEgdGFyZ2V0IG9iamVjdFxuXHQgKiAodXN1YWxseSwgQ29tcG9uZW50KSBhbmQgcGFzc2VzIGFyZ3VtZW50IHRvIGl0IGZvciBmdXJ0aGVyIHJvdXRpbmcuXG5cdCAqL1xuXHRleHBvcnQgaW50ZXJmYWNlIEhhbmRsZXI8VD4ge1xuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSByb3V0ZSBSb3V0ZS5cblx0XHQgKiBAcGFyYW0gYXJnIEFyZ3VtZW50LlxuXHRcdCAqIEByZXR1cm5zIFRhcmdldCBvYmplY3QuXG5cdFx0ICovXG5cdFx0KHJvdXRlOiBzdHJpbmcsIGFyZzogQmluZGFibGU8c3RyaW5nPik6IFQ7XG5cdH1cblxuXHQvKipcblx0ICogU2lnbmF0dXJlIG9mIGEgc2luZ2xlIHJvdXRlIGluIGBoYW5kbGVyYCBvYmplY3QuIFRoZSBmdW5jdGlvbiBtYXBzIGEgc2luZ2xlIHJvdXRlIHRvIGEgdGFyZ2V0XG5cdCAqIG9iamVjdCAodXN1YWxseSwgQ29tcG9uZW50KSBhbmQgcGFzc2VzIGFyZ3VtZW50IHRvIGl0IGZvciBmdXJ0aGVyIHJvdXRpbmcuXG5cdCAqL1xuXHRleHBvcnQgaW50ZXJmYWNlIFJvdXRlPFQ+IHtcblx0XHQvKipcblx0XHQgKiBAcGFyYW0gYXJnIEFyZ3VtZW50LlxuXHRcdCAqIEByZXR1cm5zIFRhcmdldCBvYmplY3QuXG5cdFx0ICovXG5cdFx0KGFyZzogQmluZGFibGU8c3RyaW5nPik6IFQ7XG5cdH1cblxuXHQvKipcblx0ICogUm91dGVyIGhhbmRsZXIgY29uZmlndXJhdGlvbiBvYmplY3QuXG5cdCAqL1xuXHRleHBvcnQgaW50ZXJmYWNlIEhhbmRsZXJDb25maWc8VD4ge1xuXHRcdC8qKlxuXHRcdCAqIE1hcCBvZiBzcGVjaWZpYyByb3V0ZSBoYW5kbGVycy4gSWYgY3VycmVudCByb3V0ZSBpcyBwcmVzZW50IGluIHRoaXMgZGljdGlvbmFyeSwgdGhlIHJvdXRlciBjYWxscyBpdHNcblx0XHQgKiBjb3JyZXNwb25kaW5nIGhhbmRsZXIgYW5kIHBhc3NlcyBhcmd1bWVudCB0byBpdC4gUm91dGUgYW5kIGFyZ3VtZW50IHRoZW1zZWx2ZXMgYXJlIGNvbXB1dGVkIHdpdGggYHNlcGFyYXRvcmBcblx0XHQgKiBjYWxsYmFjay5cblx0XHQgKi9cblx0XHRyZWFkb25seSByb3V0ZXM/OiBEaWN0aW9uYXJ5PFJvdXRlPFQ+PjtcblxuXHRcdC8qKlxuXHRcdCAqIElmIG5vbmUgb2YgdGhlIGByb3V0ZXNgIG1hdGNoZXMgY3VycmVudCByb3V0ZSwgdGhlIHJvdXRlciBjYWxscyB0aGlzIGhhbmRsZXIgY2FsbGJhY2sgYW5kIHBhc3NlcyBib3RoXG5cdFx0ICogcm91dGUgYW5kIGFyZ3VtZW50IHRvIGl0LiBCeSBkZWZhdWx0LCByZXR1cm5zIG51bGwgZm9yIGFueSBpbnB1dC5cblx0XHQgKi9cblx0XHRyZWFkb25seSBub3RGb3VuZD86IEhhbmRsZXI8VD47XG5cdH1cblxuXHQvKipcblx0ICogUm91dGVyIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBDb25maWc8VD4ge1xuXHRcdC8qKlxuXHRcdCAqIFJvdXRlciBuYW1lLiBSb3V0ZXIgbmFtZSBpcyBhIGNodW5rIG9mIHRoZSBwYXRoIHRoYXQgY2F1c2VkIHRoaXMgcm91dGUgdG8gZ2V0IGluaXRpYWxpemVkLiBSb290IHJvdXRlclxuXHRcdCAqIGRvZXNuJ3QgaGF2ZSBhIG5hbWUuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgbmFtZT86IHN0cmluZztcblxuXHRcdC8qKlxuXHRcdCAqIFBhcmVudCByb3V0ZXIuIEl0IHByb3ZpZGVzIGBnZXRGdWxsUGF0aGAgYW5kIGByZWRpcmVjdGAgd2l0aCBhIGNsdWUgYWJvdXQgYWxsIHBhcnRzIG9mIHRoZSBwYXRoLiBJZlxuXHRcdCAqIHlvdXIgcm91dGVyIHByb3ZpZGVzIHlvdSB3aXRoIHdyb25nIHBhdGhzLCBjaGVjayBgbmFtZWAgYW5kIGBwYXJlbnRgIG9mIGFsbCByb3V0ZXJzIGluIHlvdXIgaGllcmFyY2h5IC0gdGhleVxuXHRcdCAqIGFyZSBsaWtlbHkgYXNzaWduZWQgdG8gd3JvbmcgdmFsdWVzLiBSb290IHJvdXRlciBkb2Vzbid0IGhhdmUgYSBwYXJlbnQuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgcGFyZW50PzogUm91dGVyPGFueT47XG5cblx0XHQvKipcblx0XHQgKiBQYXRoIHRvIGJpbmQgdGhlIHJvdXRlciB0by4gUm9vdCByb3V0ZXIgc2hvdWxkIHVzdWFsbHkgZ2V0IGJvdW5kIHRvIGBoYXNoYCBwcm9wZXJ0eS4gQ2hpbGQgcm91dGVycyBzaG91bGRcblx0XHQgKiByZWNlaXZlIGBwYXRoYCBmcm9tIHRoZWlyIHBhcmVudHMuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgcGF0aD86IEJpbmRhYmxlPHN0cmluZz47XG5cblx0XHQvKipcblx0XHQgKiBUYXJnZXQgcHJvcGVydHkuIFJvdXRlciBwdXRzIHRoZSByZXN1bHQgb2YgYGhhbmRsZXJgIGZ1bmN0aW9uIGNhbGwgdG8gdGFyZ2V0IHByb3BlcnR5LiBJZiBgdGFyZ2V0YCBpc1xuXHRcdCAqIG9taXR0ZWQsIHRoZSByb3V0ZXIgY3JlYXRlcyBpdCBhdXRvbWF0aWNhbGx5LiBSb3V0ZXIgYXV0b21hdGljYWxseSBjb250cm9scyB0aGUgbGlmZSB0aW1lIG9mIHlvdXIgdGFyZ2V0cyxcblx0XHQgKiBzbywgaWYgeW91IHBhc3MgeW91ciBwcmVjcmVhdGVkIGB0YXJnZXRgIHByb3BlcnR5IHRvIGEgUm91dGVyLCBtYWtlIHN1cmUgdGhhdCBpdCBpcyBub3QgYWdncmVnYXRpbmcgaXRzIHZhbHVlLFxuXHRcdCAqIGkuZS4gYG93blZhbHVlYCBtZXRob2QgaXMgbm90IGNhbGxlZC5cblx0XHQgKi9cblx0XHRyZWFkb25seSB0YXJnZXQ/OiBJUHJvcGVydHk8VD47XG5cblx0XHQvKipcblx0XHQgKiBQYXRoIHNlcGFyYXRvciBmdW5jdGlvbi4gUGFyc2VzIGluY29taW5nIHBhdGggdG8gdHdvIHRva2Vuczogcm91dGUgYW5kIGFyZ3VtZW50LiBSb3V0ZSBnZXRzIHVzZWQgdG9cblx0XHQgKiBwcm9jZXNzIGEgc2luZ2xlIHJvdXRpbmcgc3RlcCBhbmQgY3JlYXRlIGEgdGFyZ2V0LCBhcmd1bWVudCBnZXRzIHBhc3NlZCB0byB0aGUgdGFyZ2V0IGZvciBmdXJ0aGVyIHJvdXRpbmcuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgc2VwYXJhdG9yPzogU2VwYXJhdG9yIHwgUmVnRXhwO1xuXG5cdFx0LyoqXG5cdFx0ICogUGF0aCBqb2luZXIuIE9wcG9zaXRlIHRvIGBzZXBhcmF0b3JgLiBVc2VkIGluIGBnZXRGdWxsUGF0aGAgYW5kIGByZWRpcmVjdGAgbWV0aG9kcyB0byBwcm9wZXJseSBidWlsZCB0aGVcblx0XHQgKiBwYXRoLiBKb2lucyBpbmNvbWluZyByb3V0ZSBhbmQgYXJndW1lbnQgdG8gYSBmdWxsIHBhdGguXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgam9pbmVyPzogSm9pbmVyIHwgc3RyaW5nO1xuXG5cdFx0LyoqXG5cdFx0ICogUm91dGUgaGFuZGxlci4gTWFwcyB0aGUgcm91dGUgc3RyaW5nIHRvIGEgdGFyZ2V0IG9iamVjdCBhbmQgcGFzc2VzIGFyZ3VtZW50IHRvIGl0IGZvciBmdXJ0aGVyIHJvdXRpbmcuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgaGFuZGxlcj86IEhhbmRsZXI8VD4gfCBIYW5kbGVyQ29uZmlnPFQ+O1xuXG5cdFx0LyoqXG5cdFx0ICogYHNlcGFyYXRvcmAsIGBqb2luZXJgIGFuZCBgaGFuZGxlcmAgY2FsbCBzY29wZS5cblx0XHQgKi9cblx0XHRyZWFkb25seSBzY29wZT86IGFueTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiBgc2VwYXJhdG9yYCBpcyBhIGZ1bmN0aW9uLCByZXR1cm5zIGl0IGltbWVkaWF0ZWx5LiBFbHNlIGNvbnZlcnRzIHRoZSBzcGVjaWZpZWQgcmVndWxhciBleHByZXNzaW9uIHRvXG5cdCAqIGEgZnVuY3Rpb24gYnkgdGhlIGZvbGxvd2luZyBydWxlOiBUaGUgZmlyc3QgdG9rZW4gKCQxKSBvZiBwYXRoIGlzIHVzZWQgYXMgYSByb3V0ZSwgYW5kIHRoZSBuZXh0IG5vbi1udWxsIHRva2VuXG5cdCAqICgkMiBvciBmdXJ0aGVyKSBpcyB1c2VkIGFzIGFuIGFyZ3VtZW50LiBJZiBwYXRoIGlzIG51bGwsIGl0IGlzIGFzc3VtZWQgdG8gYmUgXCJcIi5cblx0ICogQHBhcmFtIHNlcGFyYXRvciBGdW5jdGlvbiBvciByZWd1bGFyIGV4cHJlc3Npb24uXG5cdCAqIEByZXR1cm5zIFNlcGFyYXRvciBmdW5jdGlvbi5cblx0ICovXG5cdGV4cG9ydCBmdW5jdGlvbiBtYWtlU2VwYXJhdG9yKHNlcGFyYXRvcjogU2VwYXJhdG9yIHwgUmVnRXhwID0gREVGQVVMVF9TRVBBUkFUT1IpOiBTZXBhcmF0b3Ige1xuXHRcdGlmICh0eXBlb2Ygc2VwYXJhdG9yID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHJldHVybiBzZXBhcmF0b3I7XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiAocGF0aDogc3RyaW5nKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBzZXBhcmF0b3IuZXhlYyhwYXRoIHx8IFwiXCIpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdCA/IFtyZXN1bHRbMV0sIGRlZm4oQXJyYXlVdGlscy5maW5kKHJlc3VsdC5zbGljZSgyKSwgaXNOb3ROaWwpLCBudWxsKV0gOiBudWxsO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogSWYgYGpvaW5lcmAgaXMgYSBmdW5jdGlvbiwgcmV0dXJucyBpdCBpbW1lZGlhdGVseS4gRWxzZSBjb252ZXJ0cyB0aGUgc3BlY2lmaWVkIHN0cmluZyB0byBhIGZ1bmN0aW9uIGJ5IHRoZVxuXHQgKiBmb2xsb3dpbmcgcnVsZTogam9pbnMgaW5jb21pbmcgcm91dGUvYXJndW1lbnQgcGFpciB2aWEgdGhlIHNwZWNpZmllZCBzdHJpbmcuIExlYWRpbmcgam9pbmVyIHN5bWJvbHMgaW4gYXJndW1lbnRcblx0ICogYXJlIHRyaW1tZWQuIElmIGFyZ3VtZW50IHN0YXJ0cyB3aXRoIFwiP1wiLCBqb2luZXIgc3ltYm9sIGlzIG5vdCBhZGRlZC4gSWYgYXJndW1lbnQgaXMgbnVsbCBvciBibGFuaywgcmV0dXJuc1xuXHQgKiByb3V0ZS5cblx0ICogQHBhcmFtIGpvaW5lciBGdW5jdGlvbiBvciBzZXBhcmF0aW9uIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMgSm9pbmVyIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZXhwb3J0IGZ1bmN0aW9uIG1ha2VKb2luZXIoam9pbmVyOiBKb2luZXIgfCBzdHJpbmcgPSBERUZBVUxUX0pPSU5FUik6IEpvaW5lciB7XG5cdFx0aWYgKHR5cGVvZiBqb2luZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0cmV0dXJuIGpvaW5lcjtcblx0XHR9XG5cdFx0Y29uc3QgdHJpbW1lciA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBqb2luZXIucmVwbGFjZSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSArIFwiKSpcIik7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChyb3V0ZSwgYXJnKSB7XG5cdFx0XHRyZXR1cm4gIWFyZyA/IHJvdXRlIDogKGFyZy5jaGFyQXQoMCkgPT09IFwiP1wiKSA/IChyb3V0ZSArIGFyZykgOiAocm91dGUgKyBqb2luZXIgKyBhcmcucmVwbGFjZSh0cmltbWVyLCBcIlwiKSk7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiBoYW5kbGVyIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCBvYmplY3QgdG8gYSBmdW5jdGlvbi5cblx0ICogQHBhcmFtIGhhbmRsZXIgSGFuZGxlciBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICogQHJldHVybnMgSGFuZGxlciBmdW5jdGlvbi5cblx0ICovXG5cdGV4cG9ydCBmdW5jdGlvbiBtYWtlSGFuZGxlcjxUPihoYW5kbGVyOiBIYW5kbGVyPFQ+IHwgSGFuZGxlckNvbmZpZzxUPiA9IHt9KTogSGFuZGxlcjxUPiB7XG5cdFx0aWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHJldHVybiBoYW5kbGVyO1xuXHRcdH1cblx0XHRjb25zdCByb3V0ZXMgPSBoYW5kbGVyLnJvdXRlcyB8fCB7fTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHRoaXM6IGFueSwgcm91dGU6IHN0cmluZywgYXJnOiBCaW5kYWJsZTxzdHJpbmc+KTogVCB7XG5cdFx0XHRyZXR1cm4gcm91dGVzW3JvdXRlXSA/IHJvdXRlc1tyb3V0ZV0uY2FsbCh0aGlzLCBhcmcpIDpcblx0XHRcdFx0aGFuZGxlci5ub3RGb3VuZCA/IGhhbmRsZXIubm90Rm91bmQuY2FsbCh0aGlzLCByb3V0ZSwgYXJnKSA6IG51bGw7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGZ1bGwgcGF0aCBhcyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgaW4gYHBhcmVudGAgb2YgYHJvdXRlcmAgd2l0aCBgbmFtZWAgcGFzc2VkIGFzXG5cdCAqIGByb3V0ZWAgYW5kIGBwYXRoYCBwYXNzZWQgYXMgYGFyZ2AuIFJldHVybnMgYHBhdGhgIGlmIHRoaXMgaXMgdGhlIHJvb3Qgcm91dGVyLlxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIGByb3V0ZXJgLlxuXHQgKiBAcGFyYW0gcm91dGVyIENvbXB1dGUgZnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxuXHQgKiBAcmV0dXJucyBGdWxsIHBhdGggcmVsYXRpdmUgdG8gdGhlIGByb3V0ZXJgLlxuXHQgKi9cblx0ZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxQYXRoKHBhdGg6IHN0cmluZywgcm91dGVyPzogUm91dGVyPGFueT4pIHtcblx0XHRyZXR1cm4gcm91dGVyID8gcm91dGVyLmdldEZ1bGxQYXRoKHBhdGgpIDogcGF0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbW1lZGlhdGVseSBwZXJmb3JtcyB0aGUgcmVkaXJlY3Rpb24sIGkuZS4gc2V0cyBgaGFzaGAgdG8gYGdldEZ1bGxQYXRoKHBhdGgsIHJvdXRlcilgLlxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIGByb3V0ZXJgLlxuXHQgKiBAcGFyYW0gcm91dGVyIFJlZGlyZWN0IHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxuXHQgKiBAcGFyYW0gcmVwbGFjZVN0YXRlIFJlcGxhY2UgdGhlIGN1cnJlbnQgYnJvd3NlciBoaXN0b3JpY2FsIHN0YXRlIHJhdGhlciB0aGFuIHB1c2hpbmcgYSBuZXcgc3RhdGUgdG8gdGhlIHN0YWNrLlxuXHQgKi9cblx0ZXhwb3J0IGZ1bmN0aW9uIHJlZGlyZWN0KHBhdGg6IHN0cmluZywgcm91dGVyPzogUm91dGVyPGFueT4sIHJlcGxhY2VTdGF0ZT86IGJvb2xlYW4pIHtcblx0XHR0cnkge1xuXHRcdFx0cGF0aCA9IGdldEZ1bGxQYXRoKHBhdGgsIHJvdXRlcik7XG5cdFx0XHRpZiAoaGFzaC51cGRhdGluZykge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgY3ljbGUgaXMgYWxyZWFkeSBhY3RpdmUuIFwiICtcblx0XHRcdFx0XHRcIlN1Z2dlc3QgdXNpbmcgUm91dGVyLlJlZGlyZWN0b3Igb3IgbW92aW5nIFVSTCByZWRpcmVjdGlvbiB0byBhbiBhc3luY3Jvbm91cyBjYWxsYmFjay5cIik7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuIG5vdCBwZXJmb3JtIFVSTCByZWRpcmVjdGlvbiB0byBcIiArIHBhdGggKyBcIjogXCIgKyBlLm1lc3NhZ2UpO1xuXHRcdH1cblx0XHRoYXNoLnNldChwYXRoLCByZXBsYWNlU3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlY29tbWVuZGVkIHdheSB0byBwZXJmb3JtIGFuIGFzeW5jcm9ub3VzIHJlZGlyZWN0aW9uIGluIFJvdXRlciBgaGFuZGxlcmAgZnVuY3Rpb24uXG5cdCAqL1xuXHRleHBvcnQgY2xhc3MgUmVkaXJlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhIG5ldyByZWRpcmVjdG9yLlxuXHRcdCAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gcm91dGVyLlxuXHRcdCAqIEBwYXJhbSByb3V0ZXIgUmVkaXJlY3QgcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXG5cdFx0ICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZVxuXHRcdCAqIHN0YWNrLiBEZWZhdWx0cyB0byB0cnVlLlxuXHRcdCAqL1xuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aDogc3RyaW5nLCBwcml2YXRlIHJvdXRlcj86IFJvdXRlcjxhbnk+LCBwcml2YXRlIHJlcGxhY2VTdGF0ZT86IGJvb2xlYW4pIHtcblx0XHRcdHN1cGVyKCk7XG5cdFx0XHRkZWZlcigwLCB0aGlzLm93bihuZXcgQ2FuY2VsVG9rZW4oKSkpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRyZWRpcmVjdCh0aGlzLnBhdGgsIHRoaXMucm91dGVyLCBkZWZuKHRoaXMucmVwbGFjZVN0YXRlLCB0cnVlKSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHJvdXRlciB0aGF0IG1hbmFnZXMgdHdvIG1hcHBpbmcgb2YgcHJvcGVydGllczpcblx0ICpcblx0ICogKiBgcGF0aHNgIHdoaWNoIGV4cG9zZXMgc3RyaW5nIHBhdGggcHJvcGVydGllcyBmb3IgY2hpbGQgcm91dGVycyBpZiBuZWNjZXNzYXJ5O1xuXHQgKiAqIGBleHBhbmRlZGAgd2hpY2ggZXhwb3NlcyBib29sZWFuIFwiZXhwYW5kZWRcIiBwcm9wZXJ0aWVzIGZvciBjaGlsZCBVSSBwYW5lbHMuXG5cdCAqXG5cdCAqIFRoaXMgYWxsb3dzIHlvdSB0byByZW5kZXIgeW91ciBjb250ZW50IGFzIGEgZml4ZWQgbGlzdCBvZiBwYW5lbHMgcmVwcmVzZW50aW5nIHRoZSBjb25jdXJyZW50IHJvdXRlcy5cblx0ICovXG5cdGV4cG9ydCBjbGFzcyBOb2RlIGV4dGVuZHMgQ2xhc3Mge1xuXHRcdHByaXZhdGUgX3BhdGhzOiBEaWN0aW9uYXJ5PElQcm9wZXJ0eTxzdHJpbmc+Pjtcblx0XHRwcml2YXRlIF9leHBhbmRlZDogRGljdGlvbmFyeTxJUHJvcGVydHk8Ym9vbGVhbj4+O1xuXHRcdHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7IC8vIHVzZWQgdG8gYXV0by1hY3RpdmF0ZSB0aGUgZmlyc3Qgcm91dGUgb24gaW5pdGlhbGl6YXRpb25cblx0XHRwcml2YXRlIF91cGRhdGluZyA9IGZhbHNlOyAvLyB1c2VkIHRvIHByZXZlbnQgcmVkaXJlY3Rpb24gZXJyb3JcblxuXHRcdC8qKlxuXHRcdCAqIERlZmF1bHQgcm91dGUgdGhpcyBub2RlIHdhcyBpbml0aWFsaXplZCB3aXRoLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IGRlZmF1bHRSb3V0ZTogc3RyaW5nO1xuXG5cdFx0LyoqXG5cdFx0ICogUm91dGVyIHRoYXQgbWFuYWdlcyB0aGlzIG5vZGUuIE5vZGUgY3JlYXRlcyB0aGlzIHJvdXRlciBhdXRvbWF0aWNhbGx5LiBZb3Ugc2hvdWxkIHBhc3MgdGhpcyByb3V0ZXIgdG9cblx0XHQgKiBjaGlsZCBjb21wb25lbnRzIGFzIHRoZWlyIHBhcmVudCByb3V0ZXIgZm9yIGZ1cnRoZXIgcm91dGluZy5cblx0XHQgKi9cblx0XHRyZWFkb25seSByb3V0ZXI6IFJvdXRlcjxEZXN0cm95YWJsZT47XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIHJvdXRlciBub2RlLCBhc3NpZ25zIGl0cyBwcm9wZXJ0aWVzIHRvIGluaXRpYWwgdmFsdWVzIGFuZCBzdGFydHMgc3luY2hyb25pemF0aW9uLlxuXHRcdCAqIEBwYXJhbSBjb25maWcgTm9kZSBjb25maWd1cmF0aW9uLlxuXHRcdCAqL1xuXHRcdGNvbnN0cnVjdG9yKGNvbmZpZzogTm9kZS5Db25maWcpIHtcblx0XHRcdHN1cGVyKCk7XG5cdFx0XHR0aGlzLmRlZmF1bHRSb3V0ZSA9IGNvbmZpZy5kZWZhdWx0Um91dGU7XG5cblx0XHRcdGNvbnN0IHJvdXRlTWFwID0gQXJyYXlVdGlscy5pbmRleChjb25maWcucm91dGVzLCBpZGVudGl0eSk7XG5cdFx0XHR0aGlzLl9wYXRocyA9IERpY3Rpb25hcnlVdGlscy5tYXAocm91dGVNYXAsICgpID0+IG5ldyBQcm9wZXJ0eTxzdHJpbmc+KCkpO1xuXHRcdFx0dGhpcy5fZXhwYW5kZWQgPSBEaWN0aW9uYXJ5VXRpbHMubWFwKHJvdXRlTWFwLCAoKSA9PiBuZXcgUHJvcGVydHkoY29uZmlnLmV4cGFuZGVkID09PSB0cnVlKSk7XG5cblx0XHRcdGlmIChjb25maWcuZXhwYW5kZWQgJiYgKHR5cGVvZiBjb25maWcuZXhwYW5kZWQgIT09IFwiYm9vbGVhblwiKSkge1xuXHRcdFx0XHRjb25maWcuZXhwYW5kZWQuZm9yRWFjaCgocm91dGUpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9leHBhbmRlZFtyb3V0ZV0uc2V0KHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0RGljdGlvbmFyeVV0aWxzLmZvckVhY2godGhpcy5fZXhwYW5kZWQsIChleHBhbmRlZCwgcm91dGUpID0+IHtcblx0XHRcdFx0dGhpcy5vd24oZXhwYW5kZWQuY2hhbmdlRXZlbnQubGlzdGVuKChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRpZiAocGFyYW1zLnZhbHVlICYmICF0aGlzLl91cGRhdGluZykge1xuXHRcdFx0XHRcdFx0dGhpcy5yb3V0ZXIucmVkaXJlY3Qocm91dGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMucm91dGVyID0gdGhpcy5vd24obmV3IFJvdXRlcjxEZXN0cm95YWJsZT4oe1xuXHRcdFx0XHRuYW1lOiBjb25maWcubmFtZSxcblx0XHRcdFx0cGFyZW50OiBjb25maWcucGFyZW50LFxuXHRcdFx0XHRwYXRoOiBjb25maWcucGF0aCxcblx0XHRcdFx0aGFuZGxlcjogKHJvdXRlLCBhcmcpID0+IHtcblx0XHRcdFx0XHRjb25zdCBwYXRoID0gdGhpcy5fcGF0aHNbcm91dGVdO1xuXHRcdFx0XHRcdGlmICghcGF0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICghdGhpcy5faW5pdGlhbGl6ZWQgJiYgdGhpcy5kZWZhdWx0Um91dGUpID9cblx0XHRcdFx0XHRcdFx0bmV3IFJlZGlyZWN0b3IodGhpcy5kZWZhdWx0Um91dGUsIHRoaXMucm91dGVyKSA6IG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRjb25zdCBleHBhbmRlciA9IG5ldyBOb2RlRXhwYW5kZXIodGhpcy5yb3V0ZXIsIGFyZywgcGF0aCwgdGhpcy5fZXhwYW5kZWRbcm91dGVdKTtcblx0XHRcdFx0XHR0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdHJldHVybiBleHBhbmRlcjtcblx0XHRcdFx0fVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5yb3V0ZXIudXBkYXRlKCk7XG5cdFx0XHR0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUHJvdmlkZXMgcGF0aHMgdG8gYmluZCBjaGlsZCByb3V0ZXJzIHRvLCBieSBuYW1lLiBPbmx5IG9uZSByb3V0ZSBpcyBhY3RpdmUgYXQgYSB0aW1lLCBidXQgdGhlaXIgcGF0aHNcblx0XHQgKiBhbHdheXMgZXhpc3QgcmVnYXJkbGVzcyBvZiB0aGVpciBhY3Rpdml0eS5cblx0XHQgKi9cblx0XHRnZXQgcGF0aHMoKTogRGljdGlvbmFyeTxCaW5kYWJsZTxzdHJpbmc+PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fcGF0aHM7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUHJvdmlkZXMgXCJleHBhbmRlZFwiIGZsYWdzIHRvIGJpbmQgY2hpbGQgcGFuZWxzIHRvLCBieSBuYW1lLiBTdXBwb3J0IHR3by13YXkgYmluZGluZy5cblx0XHQgKi9cblx0XHRnZXQgZXhwYW5kZWQoKTogRGljdGlvbmFyeTxJUHJvcGVydHk8Ym9vbGVhbj4+IHtcblx0XHRcdHJldHVybiB0aGlzLl9leHBhbmRlZDtcblx0XHR9XG5cdH1cblxuXHRleHBvcnQgbmFtZXNwYWNlIE5vZGUge1xuXHRcdC8qKlxuXHRcdCAqIFJvdXRlci5Ob2RlIGNvbmZpZ3VyYXRpb24uXG5cdFx0ICovXG5cdFx0ZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBSb3V0ZXIgbmFtZS5cblx0XHRcdCAqL1xuXHRcdFx0cmVhZG9ubHkgbmFtZT86IHN0cmluZztcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBQYXJlbnQgcm91dGVyLlxuXHRcdFx0ICovXG5cdFx0XHRyZWFkb25seSBwYXJlbnQ/OiBSb3V0ZXI8YW55PjtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBQYXRoIHRvIGJpbmQgdGhlIHJvdXRlciB0by5cblx0XHRcdCAqL1xuXHRcdFx0cmVhZG9ubHkgcGF0aD86IEJpbmRhYmxlPHN0cmluZz47XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogRml4ZWQgbGlzdCBvZiByb3V0ZXMgdG8gbWFuYWdlIGJ5IHRoaXMgbm9kZS4gRm9yIGV2ZXJ5IG5hbWUgaW4gdGhpcyBsaXN0LCBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgd2lsbCBiZVxuXHRcdFx0ICogY3JlYXRlZCBpbiBgcGF0aHNgIGFuZCBgZXhwYW5kZWRgIGRpY3Rpb25hcmllcyBvZiB0aGUgbm9kZS5cblx0XHRcdCAqL1xuXHRcdFx0cmVhZG9ubHkgcm91dGVzOiBzdHJpbmdbXTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJbml0aWFsIFwiZXhwYW5kZWRcIiBzdGF0dXMgb2Ygcm91dGVzIG9yIGluaXRpYWwgcm91dGVzIHRvIGV4cGFuZC4gRGVmYXVsdHMgdG8gZmFsc2UgKGFsbCByb3V0ZXMgYXJlXG5cdFx0XHQgKiBjb2xsYXBzZWQpLlxuXHRcdFx0ICovXG5cdFx0XHRyZWFkb25seSBleHBhbmRlZD86IGJvb2xlYW4gfCBzdHJpbmdbXTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBEZWZhdWx0IHJvdXRlLiBJZiB0aGUgaW5pdGlhbCBwYXRoIGlzIGJsYW5rIChcIlwiKSwgdGhlIHJvdXRlciBwZXJmb3JtcyBhIHJlZGlyZWN0aW9uIHRvIHRoaXMgcm91dGUsIGkuZS5cblx0XHRcdCAqIGV4cGFuZHMgb25lIG9mIHRoZSBwYW5lbHMuIERvZXNuJ3Qgd29yayBhZnRlciBpbml0aWFsaXphdGlvbi5cblx0XHRcdCAqL1xuXHRcdFx0cmVhZG9ubHkgZGVmYXVsdFJvdXRlPzogc3RyaW5nO1xuXHRcdH1cblx0fVxuXG5cdGNsYXNzIE5vZGVFeHBhbmRlciBleHRlbmRzIENsYXNzIHtcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyPGFueT4sIHNvdXJjZVBhdGg6IEJpbmRhYmxlPHN0cmluZz4sXG5cdFx0XHRcdFx0dGFyZ2V0UGF0aDogSVByb3BlcnR5PHN0cmluZz4sIGV4cGFuZGVkOiBJUHJvcGVydHk8Ym9vbGVhbj4pIHtcblx0XHRcdHN1cGVyKCk7XG5cdFx0XHR0aGlzLm93bihuZXcgQ29waWVyKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpKTtcblx0XHRcdGV4cGFuZGVkLnNldCh0cnVlKTtcblx0XHRcdHRoaXMub3duKGV4cGFuZGVkLmNoYW5nZUV2ZW50Lmxpc3RlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMucm91dGVyLnJlZGlyZWN0KFwiXCIpXG5cdFx0XHR9KSk7XG5cdFx0fVxuXHR9XG59XG4iXX0=

/***/ }),

/***/ "../../main/dist/UIRouter.js":
/*!********************************************!*\
  !*** C:/jwidget/git/main/dist/UIRouter.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(__webpack_require__(/*! ./Router */ "../../main/dist/Router.js"));
/**
 * Shorthand for Router<Component>.
 */
class UIRouter extends Router_1.default {
}
exports.default = UIRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUlSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVUlSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0JFOzs7OztBQUdGLHNEQUE4QjtBQUU5Qjs7R0FFRztBQUNILE1BQXFCLFFBQVMsU0FBUSxnQkFBaUI7Q0FDdEQ7QUFERCwyQkFDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgUm91dGVyIGZyb20gXCIuL1JvdXRlclwiO1xuXG4vKipcbiAqIFNob3J0aGFuZCBmb3IgUm91dGVyPENvbXBvbmVudD4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUm91dGVyIGV4dGVuZHMgUm91dGVyPENvbXBvbmVudD4ge1xufVxuIl19

/***/ }),

/***/ "../../main/dist/defer.js":
/*!*****************************************!*\
  !*** C:/jwidget/git/main/dist/defer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
const CancelToken_1 = __webpack_require__(/*! ./CancelToken */ "../../main/dist/CancelToken.js");
/**
 * Promise wrapper over setTimeout function with CancelToken support. Resolves the promise after specified
 * period of time. Never rejects the promise. If the operation gets cancelled via the token, the promise never gets
 * resolved or rejected.
 * @param ms Timeout duration in milliseconds.
 * @param cancelToken Cancellation token to bind the operation to.
 * @returns Promise object representing the timeout.
 */
function default_1(ms, cancelToken) {
    let timeout;
    return CancelToken_1.runAsync((resolve) => {
        timeout = window.setTimeout(resolve, ms);
    }, () => {
        clearTimeout(timeout);
    }, cancelToken);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0JFOztBQUVGLCtDQUFvRDtBQUVwRDs7Ozs7OztHQU9HO0FBQ0gsbUJBQXlCLEVBQVcsRUFBRSxXQUF5QjtJQUM5RCxJQUFJLE9BQWUsQ0FBQztJQUNwQixPQUFPLHNCQUFRLENBQ2QsQ0FBQyxPQUFpRCxFQUFFLEVBQUU7UUFDckQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUMsRUFDRCxHQUFHLEVBQUU7UUFDSixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxFQUNELFdBQVcsQ0FDWCxDQUFDO0FBQ0gsQ0FBQztBQVhELDRCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IENhbmNlbFRva2VuLCB7cnVuQXN5bmN9IGZyb20gXCIuL0NhbmNlbFRva2VuXCI7XG5cbi8qKlxuICogUHJvbWlzZSB3cmFwcGVyIG92ZXIgc2V0VGltZW91dCBmdW5jdGlvbiB3aXRoIENhbmNlbFRva2VuIHN1cHBvcnQuIFJlc29sdmVzIHRoZSBwcm9taXNlIGFmdGVyIHNwZWNpZmllZFxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xuICogcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXG4gKiBAcGFyYW0gbXMgVGltZW91dCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cbiAqIEByZXR1cm5zIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdGltZW91dC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG1zPzogbnVtYmVyLCBjYW5jZWxUb2tlbj86IENhbmNlbFRva2VuKTogUHJvbWlzZTx2b2lkPiB7XG5cdGxldCB0aW1lb3V0OiBudW1iZXI7XG5cdHJldHVybiBydW5Bc3luYzx2b2lkPihcblx0XHQocmVzb2x2ZTogKHZhbHVlPzogKFByb21pc2U8dm9pZD4gfCB2b2lkKSkgPT4gdm9pZCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcblx0XHR9LFxuXHRcdCgpID0+IHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR9LFxuXHRcdGNhbmNlbFRva2VuXG5cdCk7XG59XG4iXX0=

/***/ }),

/***/ "../../main/dist/hash.js":
/*!****************************************!*\
  !*** C:/jwidget/git/main/dist/hash.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));
const Property_1 = __importDefault(__webpack_require__(/*! ./Property */ "../../main/dist/Property.js"));
class Hash extends Property_1.default {
    constructor() {
        super(location.hash.substr(1));
        this.redirectionDetectionInterval = 1000;
        this.redirectionDetectionLimit = 25;
        this.redirectionStartTime = Number.NEGATIVE_INFINITY;
        this.redirectionUrls = [];
        this.redirectionLocked = false;
        this._updating = false;
        if (hash != null) {
            throw new Error("Hash is a singleton. Unable to create more instances.");
        }
        hash = this;
        jquery_1.default(window).on("hashchange", () => {
            this.set(location.hash.substr(1));
        });
    }
    get updating() {
        return this._updating;
    }
    set(value = "", replaceState) {
        if (this.redirectionLocked) {
            return;
        }
        const oldValue = this.value;
        if (oldValue === value) {
            return;
        }
        const time = new Date().getTime();
        if (time - this.redirectionStartTime < this.redirectionDetectionInterval) {
            this.redirectionUrls.push(value);
            if (this.redirectionUrls.length > this.redirectionDetectionLimit) {
                console.error("Endless URL redirection detected. Preventing all further redirections. See URLs below. " +
                    "If this information is not enough, please set breakpoint to this method and find out what causes " +
                    "unexpected redirection calls. Probably you have misconfigured some router - " +
                    "please check router names and parents.");
                console.log(this.redirectionUrls);
                this.redirectionLocked = true;
                return;
            }
        }
        else {
            this.redirectionStartTime = time;
            this.redirectionUrls = [value];
        }
        this._updating = true;
        this.value = value;
        if (replaceState && window.history && history.replaceState) {
            history.replaceState(null, "", location.pathname + "#" + value);
        }
        else {
            location.hash = "#" + value;
        }
        this._changeEvent.trigger({ sender: this, value, oldValue });
        this._updating = false;
    }
}
/**
 * Instance of IHash singleton. Provides a transparent Property-compatible interface over `location.hash`
 * manipulations. Value of this property is always equal to `location.hash` without leading "#" symbol.
 * Has a built-in protection against infinite redirections.
 */
let hash = null; // An extra variable helps IntelliSense to find this import
new Hash();
exports.default = hash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXNCRTs7Ozs7QUFFRixvREFBNEI7QUFFNUIsMERBQWtDO0FBd0JsQyxNQUFNLElBQUssU0FBUSxrQkFBZ0I7SUFXbEM7UUFDQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQVZmLGlDQUE0QixHQUFHLElBQUksQ0FBQztRQUNwQyw4QkFBeUIsR0FBRyxFQUFFLENBQUM7UUFFeEMseUJBQW9CLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hELG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUUxQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBSXpCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUE7U0FDeEU7UUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osZ0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFLFlBQXNCO1FBQzdDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLE9BQU87U0FDUDtRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ3ZCLE9BQU87U0FDUDtRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUN6RSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtnQkFDakUsT0FBTyxDQUFDLEtBQUssQ0FBQyx5RkFBeUY7b0JBQ3RHLG1HQUFtRztvQkFDbkcsOEVBQThFO29CQUM5RSx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztnQkFDOUIsT0FBTzthQUNQO1NBQ0Q7YUFBTTtZQUNOLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxZQUFZLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQzNELE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ04sUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7Q0FDRDtBQUVEOzs7O0dBSUc7QUFDSCxJQUFJLElBQUksR0FBVSxJQUFJLENBQUMsQ0FBQywyREFBMkQ7QUFDbkYsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNYLGtCQUFlLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBqUXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IElQcm9wZXJ0eSBmcm9tIFwiLi9JUHJvcGVydHlcIjtcbmltcG9ydCBQcm9wZXJ0eSBmcm9tIFwiLi9Qcm9wZXJ0eVwiO1xuXG4vKipcbiAqIEludGVyZmFjZSBvZiBgaGFzaGAgb2JqZWN0LiBFeHRlbnNpb24gb2YgSVByb3BlcnR5PHN0cmluZz4gaW50ZXJmYWNlIHdpdGggYHVwZGF0aW5nYCBzdGF0dXMgaW5kaWNhdG9yIGFuZFxuICogYHJlcGxhY2VTdGF0ZWAgb3B0aW9uYWwgcGFyYW1ldGVyIG9mIGBzZXRgIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJSGFzaCBleHRlbmRzIElQcm9wZXJ0eTxzdHJpbmc+IHtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIGhhc2ggYXNzaWdubWVudCBpcyBpbiBwcm9ncmVzcyBhdCB0aGUgbW9tZW50LiBXaGlsZSBgdXBkYXRpbmdgIGlzIHRydWUsIGBsb2NhdGlvbi5oYXNoYFxuXHQgKiBnZXRzIG1vZGlmaWVkIGFuZCBgY2hhbmdlRXZlbnRgIGdldHMgdHJpZ2dlcmVkLiBDaGVja2luZyB0aGlzIGZsYWcgaW4gY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVycyBtYXkgcHJldmVudFxuXHQgKiBpbmZpbml0ZSBsb29wcyBhbmQgdW5leHBlY3RlZCBjYWxsYmFjayBjb25mbGljdHMuXG5cdCAqL1xuXHRyZWFkb25seSB1cGRhdGluZzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQXNzaWducyBgbG9jYXRpb24uaGFzaGAgdG8gYSBuZXcgdmFsdWUgYW5kIHRyaWdnZXJzIGBjaGFuZ2VFdmVudGAuIFJpc2VzIGB1cGRhdGluZ2AgZmxhZyB0byBwcmV2ZW50XG5cdCAqIGluZmluaXRlIGxvb3BzIGFuZCBjYWxsYmFjayBjb25mbGljdHMgZHVyaW5nIHRoaXMgdGltZS5cblx0ICogQHBhcmFtIHZhbHVlIE5ldyBoYXNoIHZhbHVlIHRvIGFzc2lnbi5cblx0ICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZSBzdGFjay5cblx0ICovXG5cdHNldCh2YWx1ZTogc3RyaW5nLCByZXBsYWNlU3RhdGU/OiBib29sZWFuKTogdm9pZDtcbn1cblxuY2xhc3MgSGFzaCBleHRlbmRzIFByb3BlcnR5PHN0cmluZz4gaW1wbGVtZW50cyBJSGFzaCB7XG5cblx0cHJpdmF0ZSByZWFkb25seSByZWRpcmVjdGlvbkRldGVjdGlvbkludGVydmFsID0gMTAwMDtcblx0cHJpdmF0ZSByZWFkb25seSByZWRpcmVjdGlvbkRldGVjdGlvbkxpbWl0ID0gMjU7XG5cblx0cHJpdmF0ZSByZWRpcmVjdGlvblN0YXJ0VGltZSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblx0cHJpdmF0ZSByZWRpcmVjdGlvblVybHM6IHN0cmluZ1tdID0gW107XG5cdHByaXZhdGUgcmVkaXJlY3Rpb25Mb2NrZWQgPSBmYWxzZTtcblxuXHRwcml2YXRlIF91cGRhdGluZyA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKGxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcblx0XHRpZiAoaGFzaCAhPSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJIYXNoIGlzIGEgc2luZ2xldG9uLiBVbmFibGUgdG8gY3JlYXRlIG1vcmUgaW5zdGFuY2VzLlwiKVxuXHRcdH1cblx0XHRoYXNoID0gdGhpcztcblx0XHRqUXVlcnkod2luZG93KS5vbihcImhhc2hjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0dGhpcy5zZXQobG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0IHVwZGF0aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl91cGRhdGluZztcblx0fVxuXG5cdHNldCh2YWx1ZTogc3RyaW5nID0gXCJcIiwgcmVwbGFjZVN0YXRlPzogYm9vbGVhbikge1xuXHRcdGlmICh0aGlzLnJlZGlyZWN0aW9uTG9ja2VkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcblx0XHRpZiAob2xkVmFsdWUgPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdGlmICh0aW1lIC0gdGhpcy5yZWRpcmVjdGlvblN0YXJ0VGltZSA8IHRoaXMucmVkaXJlY3Rpb25EZXRlY3Rpb25JbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5yZWRpcmVjdGlvblVybHMucHVzaCh2YWx1ZSk7XG5cdFx0XHRpZiAodGhpcy5yZWRpcmVjdGlvblVybHMubGVuZ3RoID4gdGhpcy5yZWRpcmVjdGlvbkRldGVjdGlvbkxpbWl0KSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFbmRsZXNzIFVSTCByZWRpcmVjdGlvbiBkZXRlY3RlZC4gUHJldmVudGluZyBhbGwgZnVydGhlciByZWRpcmVjdGlvbnMuIFNlZSBVUkxzIGJlbG93LiBcIiArXG5cdFx0XHRcdFx0XCJJZiB0aGlzIGluZm9ybWF0aW9uIGlzIG5vdCBlbm91Z2gsIHBsZWFzZSBzZXQgYnJlYWtwb2ludCB0byB0aGlzIG1ldGhvZCBhbmQgZmluZCBvdXQgd2hhdCBjYXVzZXMgXCIgK1xuXHRcdFx0XHRcdFwidW5leHBlY3RlZCByZWRpcmVjdGlvbiBjYWxscy4gUHJvYmFibHkgeW91IGhhdmUgbWlzY29uZmlndXJlZCBzb21lIHJvdXRlciAtIFwiICtcblx0XHRcdFx0XHRcInBsZWFzZSBjaGVjayByb3V0ZXIgbmFtZXMgYW5kIHBhcmVudHMuXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnJlZGlyZWN0aW9uVXJscyk7XG5cdFx0XHRcdHRoaXMucmVkaXJlY3Rpb25Mb2NrZWQgPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVkaXJlY3Rpb25TdGFydFRpbWUgPSB0aW1lO1xuXHRcdFx0dGhpcy5yZWRpcmVjdGlvblVybHMgPSBbdmFsdWVdO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0aWYgKHJlcGxhY2VTdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeSAmJiBoaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgXCJcIiwgbG9jYXRpb24ucGF0aG5hbWUgKyBcIiNcIiArIHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bG9jYXRpb24uaGFzaCA9IFwiI1wiICsgdmFsdWU7XG5cdFx0fVxuXHRcdHRoaXMuX2NoYW5nZUV2ZW50LnRyaWdnZXIoe3NlbmRlcjogdGhpcywgdmFsdWUsIG9sZFZhbHVlfSk7XG5cdFx0dGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcblx0fVxufVxuXG4vKipcbiAqIEluc3RhbmNlIG9mIElIYXNoIHNpbmdsZXRvbi4gUHJvdmlkZXMgYSB0cmFuc3BhcmVudCBQcm9wZXJ0eS1jb21wYXRpYmxlIGludGVyZmFjZSBvdmVyIGBsb2NhdGlvbi5oYXNoYFxuICogbWFuaXB1bGF0aW9ucy4gVmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBhbHdheXMgZXF1YWwgdG8gYGxvY2F0aW9uLmhhc2hgIHdpdGhvdXQgbGVhZGluZyBcIiNcIiBzeW1ib2wuXG4gKiBIYXMgYSBidWlsdC1pbiBwcm90ZWN0aW9uIGFnYWluc3QgaW5maW5pdGUgcmVkaXJlY3Rpb25zLlxuICovXG5sZXQgaGFzaDogSUhhc2ggPSBudWxsOyAvLyBBbiBleHRyYSB2YXJpYWJsZSBoZWxwcyBJbnRlbGxpU2Vuc2UgdG8gZmluZCB0aGlzIGltcG9ydFxubmV3IEhhc2goKTtcbmV4cG9ydCBkZWZhdWx0IGhhc2g7XG4iXX0=

/***/ }),

/***/ "./router/Application.jw.html":
/*!************************************!*\
  !*** ./router/Application.jw.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div jwid=\"header\"><form jwid=\"url-form\"><b>Current URL hash:</b> #\n\t\t\t<input type=\"text\" jwid=\"url\"><input type=\"submit\" value=\"Change now!\"></form><div><b>Pages:</b><a jwid=\"route\" data-route=\"inbox\">Inbox</a> |\n\t\t\t<a jwid=\"route\" data-route=\"compose\">Compose</a> |\n\t\t\t<a jwid=\"route\" data-route=\"settings\">Settings</a></div></div><div jwid=\"page\"></div></div>\n";

/***/ }),

/***/ "./router/Application.ts":
/*!*******************************!*\
  !*** ./router/Application.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var hash_1 = __importDefault(__webpack_require__(/*! jwidget/hash */ "../../main/dist/hash.js"));

var Router_1 = __importDefault(__webpack_require__(/*! jwidget/Router */ "../../main/dist/Router.js"));

var Switcher_1 = __importDefault(__webpack_require__(/*! jwidget/Switcher */ "../../main/dist/Switcher.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var UIRouter_1 = __importDefault(__webpack_require__(/*! jwidget/UIRouter */ "../../main/dist/UIRouter.js"));

var Compose_1 = __importDefault(__webpack_require__(/*! ./Compose */ "./router/Compose.ts"));

var Inbox_1 = __importDefault(__webpack_require__(/*! ./Inbox */ "./router/Inbox.ts"));

var NotFound_1 = __importDefault(__webpack_require__(/*! ./NotFound */ "./router/NotFound.ts"));

var Settings_1 = __importDefault(__webpack_require__(/*! ./Settings */ "./router/Settings.ts"));

var Application =
/** @class */
function () {
  var Application = /*#__PURE__*/function (_Component_1$default) {
    _inherits(Application, _Component_1$default);

    var _super = _createSuper(Application);

    function Application() {
      _classCallCheck(this, Application);

      return _super.apply(this, arguments);
    }

    _createClass(Application, [{
      key: "beforeRender",
      value: function beforeRender() {
        var _this = this;

        _get(_getPrototypeOf(Application.prototype), "beforeRender", this).call(this);

        this.router = this.own(new UIRouter_1.default({
          path: hash_1.default,
          handler: {
            routes: {
              "inbox": function inbox(arg) {
                return new Inbox_1.default(arg, _this.router);
              },
              "compose": function compose() {
                return new Compose_1.default();
              },
              "settings": function settings() {
                return new Settings_1.default();
              },
              "": function _() {
                return new Router_1.default.Redirector("inbox", _this.router);
              }
            },
            notFound: function notFound(route) {
              return new NotFound_1.default(route);
            }
          }
        }));
        this.router.update();
      } // This method simulates browser query string submitting

    }, {
      key: "renderUrlForm",
      value: function renderUrlForm(el) {
        var _this2 = this;

        el.on("submit", function (event) {
          event.preventDefault();
          location.hash = "#" + _this2.getElement("url").val();
        });
      } // This method simulates browser query string output

    }, {
      key: "renderUrl",
      value: function renderUrl(el) {
        this.own(bindVal_1.default(el, hash_1.default));
      }
    }, {
      key: "renderPage",
      value: function renderPage() {
        return this.router.target;
      }
    }, {
      key: "renderRoute",
      value: function renderRoute(el) {
        // Assign href attributes using getFullPath method
        var router = this.router;
        el.each(function () {
          var route = jquery_1.default(this).attr("data-route");
          jquery_1.default(this).attr("href", "#" + router.getFullPath(route));
        }); // The next structure highlights the active menu item

        var activeElement = this.router.route.map(function (route) {
          return el.filter('[data-route="' + route + '"]');
        });
        new Switcher_1.default(activeElement, {
          init: function init(el) {
            return el.css("font-weight", "bold");
          },
          done: function done(el) {
            return el.css("font-weight", "");
          }
        });
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./router/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./router/Compose.ts":
/*!***************************!*\
  !*** ./router/Compose.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var Compose =
/** @class */
function () {
  var Compose = /*#__PURE__*/function (_Component_1$default) {
    _inherits(Compose, _Component_1$default);

    var _super = _createSuper(Compose);

    function Compose() {
      _classCallCheck(this, Compose);

      return _super.apply(this, arguments);
    }

    return Compose;
  }(Component_1.default);

  Compose = __decorate([template_1.default('<textarea jwclass="compose" cols="80" rows="5">Compose email! (to be fair, this text area has no real purpose)</textarea>')], Compose);
  return Compose;
}();

exports.default = Compose;

/***/ }),

/***/ "./router/EmailList.ts":
/*!*****************************!*\
  !*** ./router/EmailList.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var list_1 = __webpack_require__(/*! jwidget/mapper/list */ "../../main/dist/mapper/list.js");

var EmailListItem_1 = __importDefault(__webpack_require__(/*! ./EmailListItem */ "./router/EmailListItem.ts"));

var EmailList = /*#__PURE__*/function (_Component_1$default) {
  _inherits(EmailList, _Component_1$default);

  var _super = _createSuper(EmailList);

  function EmailList(emails) {
    var _this;

    _classCallCheck(this, EmailList);

    _this = _super.call(this);
    _this.emails = emails;
    return _this;
  }

  _createClass(EmailList, [{
    key: "renderRoot",
    value: function renderRoot(el) {
      el.addClass("email-list");
      return this.own(list_1.mapList(this.emails, function (email) {
        return new EmailListItem_1.default(email);
      }));
    }
  }]);

  return EmailList;
}(Component_1.default);

exports.default = EmailList;

/***/ }),

/***/ "./router/EmailListItem.ts":
/*!*********************************!*\
  !*** ./router/EmailListItem.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var EmailListItem =
/** @class */
function () {
  var EmailListItem = /*#__PURE__*/function (_Component_1$default) {
    _inherits(EmailListItem, _Component_1$default);

    var _super = _createSuper(EmailListItem);

    function EmailListItem(email) {
      var _this;

      _classCallCheck(this, EmailListItem);

      _this = _super.call(this);
      _this.email = email;
      return _this;
    }

    _createClass(EmailListItem, [{
      key: "renderRoot",
      value: function renderRoot(el) {
        el.text(this.email.summary).attr("href", "#inbox/" + this.email.id);
      }
    }]);

    return EmailListItem;
  }(Component_1.default);

  EmailListItem = __decorate([template_1.default('<a jwclass="email-list-item" style="display: block;"></a>')], EmailListItem);
  return EmailListItem;
}();

exports.default = EmailListItem;

/***/ }),

/***/ "./router/EmailNotFound.jw.html":
/*!**************************************!*\
  !*** ./router/EmailNotFound.jw.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"email-not-found\"><div>Email with id <span jwid=\"id\"></span> is not found</div><div><a jwid=\"back\" href=\"#\">Back</a></div></div>\n";

/***/ }),

/***/ "./router/EmailNotFound.ts":
/*!*********************************!*\
  !*** ./router/EmailNotFound.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var Router_1 = __importDefault(__webpack_require__(/*! jwidget/Router */ "../../main/dist/Router.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var EmailNotFound =
/** @class */
function () {
  var EmailNotFound = /*#__PURE__*/function (_Component_1$default) {
    _inherits(EmailNotFound, _Component_1$default);

    var _super = _createSuper(EmailNotFound);

    function EmailNotFound(id) {
      var _this;

      _classCallCheck(this, EmailNotFound);

      _this = _super.call(this);
      _this.id = id;
      return _this;
    }

    _createClass(EmailNotFound, [{
      key: "renderId",
      value: function renderId(el) {
        el.text(this.id);
      }
    }, {
      key: "renderBack",
      value: function renderBack(el) {
        el.on("click", function (event) {
          event.preventDefault(); // In this particular case we know that there is no router below, so we can skip
          // router selection on redirection. The next call uses a current top router

          Router_1.default.redirect("inbox");
        });
      }
    }]);

    return EmailNotFound;
  }(Component_1.default);

  EmailNotFound = __decorate([template_1.default(__webpack_require__(/*! ./EmailNotFound.jw.html */ "./router/EmailNotFound.jw.html"))], EmailNotFound);
  return EmailNotFound;
}();

exports.default = EmailNotFound;

/***/ }),

/***/ "./router/EmailView.jw.html":
/*!**********************************!*\
  !*** ./router/EmailView.jw.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"email\"><h3 jwid=\"summary\"></h3><div jwid=\"content\"></div><div><a jwid=\"back\" href=\"#\">Back</a></div></div>\n";

/***/ }),

/***/ "./router/EmailView.ts":
/*!*****************************!*\
  !*** ./router/EmailView.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var EmailView =
/** @class */
function () {
  var EmailView = /*#__PURE__*/function (_Component_1$default) {
    _inherits(EmailView, _Component_1$default);

    var _super = _createSuper(EmailView);

    function EmailView(email, parentRouter) {
      var _this;

      _classCallCheck(this, EmailView);

      _this = _super.call(this);
      _this.email = email;
      _this.parentRouter = parentRouter;
      return _this;
    }

    _createClass(EmailView, [{
      key: "renderSummary",
      value: function renderSummary(el) {
        el.text(this.email.summary);
      }
    }, {
      key: "renderContent",
      value: function renderContent(el) {
        el.html(this.email.content);
      }
    }, {
      key: "renderBack",
      value: function renderBack(el) {
        var _this2 = this;

        el.on("click", function (event) {
          event.preventDefault(); // If you don't know exactly how many routers can be above or below this component,
          // using parent router on redirection is a smart choice

          _this2.parentRouter.redirect("");
        });
      }
    }]);

    return EmailView;
  }(Component_1.default);

  EmailView = __decorate([template_1.default(__webpack_require__(/*! ./EmailView.jw.html */ "./router/EmailView.jw.html"))], EmailView);
  return EmailView;
}();

exports.default = EmailView;

/***/ }),

/***/ "./router/Inbox.jw.html":
/*!******************************!*\
  !*** ./router/Inbox.jw.html ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"inbox\"><h2>Inbox</h2><div jwid=\"content\"></div></div>\n";

/***/ }),

/***/ "./router/Inbox.ts":
/*!*************************!*\
  !*** ./router/Inbox.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jwidget_1 = __webpack_require__(/*! jwidget */ "../../main/dist/index.js");

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var List_1 = __importDefault(__webpack_require__(/*! jwidget/List */ "../../main/dist/List.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var UIRouter_1 = __importDefault(__webpack_require__(/*! jwidget/UIRouter */ "../../main/dist/UIRouter.js"));

var data_1 = __webpack_require__(/*! ./data */ "./router/data.ts");

var EmailList_1 = __importDefault(__webpack_require__(/*! ./EmailList */ "./router/EmailList.ts"));

var EmailNotFound_1 = __importDefault(__webpack_require__(/*! ./EmailNotFound */ "./router/EmailNotFound.ts"));

var EmailView_1 = __importDefault(__webpack_require__(/*! ./EmailView */ "./router/EmailView.ts"));

var Inbox =
/** @class */
function () {
  var Inbox = /*#__PURE__*/function (_Component_1$default) {
    _inherits(Inbox, _Component_1$default);

    var _super = _createSuper(Inbox);

    function Inbox(path, parentRouter) {
      var _this;

      _classCallCheck(this, Inbox);

      _this = _super.call(this);
      _this.path = path;
      _this.parentRouter = parentRouter;
      _this.emails = new List_1.default(data_1.EMAILS, function (email) {
        return email.id;
      }, jwidget_1.SILENT);
      return _this;
    }

    _createClass(Inbox, [{
      key: "beforeRender",
      value: function beforeRender() {
        var _this2 = this;

        _get(_getPrototypeOf(Inbox.prototype), "beforeRender", this).call(this);

        this.router = this.own(new UIRouter_1.default({
          name: "inbox",
          parent: this.parentRouter,
          path: this.path,
          handler: function handler(id) {
            if (!id) {
              return new EmailList_1.default(_this2.emails);
            }

            var email = _this2.emails.find(function (email) {
              return email.id === id;
            });

            return email != null ? new EmailView_1.default(email, _this2.router) : new EmailNotFound_1.default(id);
          }
        }));
        this.router.update();
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        return this.router.target;
      }
    }]);

    return Inbox;
  }(Component_1.default);

  Inbox = __decorate([template_1.default(__webpack_require__(/*! ./Inbox.jw.html */ "./router/Inbox.jw.html"))], Inbox);
  return Inbox;
}();

exports.default = Inbox;

/***/ }),

/***/ "./router/NotFound.ts":
/*!****************************!*\
  !*** ./router/NotFound.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var NotFound = /*#__PURE__*/function (_Component_1$default) {
  _inherits(NotFound, _Component_1$default);

  var _super = _createSuper(NotFound);

  function NotFound(route) {
    var _this;

    _classCallCheck(this, NotFound);

    _this = _super.call(this);
    _this.route = route;
    return _this;
  }

  _createClass(NotFound, [{
    key: "renderRoot",
    value: function renderRoot(el) {
      el.text('The requested page "' + this.route + '" is not found');
    }
  }]);

  return NotFound;
}(Component_1.default);

exports.default = NotFound;

/***/ }),

/***/ "./router/Settings.ts":
/*!****************************!*\
  !*** ./router/Settings.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var Settings =
/** @class */
function () {
  var Settings = /*#__PURE__*/function (_Component_1$default) {
    _inherits(Settings, _Component_1$default);

    var _super = _createSuper(Settings);

    function Settings() {
      _classCallCheck(this, Settings);

      return _super.apply(this, arguments);
    }

    return Settings;
  }(Component_1.default);

  Settings = __decorate([template_1.default('<div jwclass="settings">There\'s nothing to configure!</div>')], Settings);
  return Settings;
}();

exports.default = Settings;

/***/ }),

/***/ "./router/data.ts":
/*!************************!*\
  !*** ./router/data.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMAILS = void 0;
exports.EMAILS = [{
  id: "1",
  summary: "Hello",
  content: "Hello there!"
}, {
  id: "2",
  summary: "Router",
  content: "Router is an important part of any single page application!"
}];

/***/ }),

/***/ "./router/index.ts":
/*!*************************!*\
  !*** ./router/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var initExample_1 = __importDefault(__webpack_require__(/*! ../common/initExample */ "./common/initExample.ts"));

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./router/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("router", ["index.ts", "data.ts", "Application.ts", "Application.jw.html", "Compose.ts", "Email.ts", "EmailList.ts", "EmailListItem.ts", "EmailNotFound.ts", "EmailNotFound.jw.html", "EmailView.ts", "EmailView.jw.html", "Inbox.ts", "Inbox.jw.html", "NotFound.ts", "Settings.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},[["./router/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router","defer~request~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L0NvcGllci5qcyIsIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L1JvdXRlci5qcyIsIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L1VJUm91dGVyLmpzIiwid2VicGFjazovLy9DOi9qd2lkZ2V0L2dpdC9tYWluL2Rpc3QvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vL0M6L2p3aWRnZXQvZ2l0L21haW4vZGlzdC9oYXNoLmpzIiwid2VicGFjazovLy8uL3JvdXRlci9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uLi8uLi9zcmMvcm91dGVyL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvcm91dGVyL0NvbXBvc2UudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvRW1haWxMaXN0LnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvcm91dGVyL0VtYWlsTGlzdEl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVyL0VtYWlsTm90Rm91bmQuancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JvdXRlci9FbWFpbE5vdEZvdW5kLnRzIiwid2VicGFjazovLy8uL3JvdXRlci9FbWFpbFZpZXcuancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JvdXRlci9FbWFpbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVyL0luYm94Lmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvSW5ib3gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvTm90Rm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JvdXRlci9pbmRleC50cyJdLCJuYW1lcyI6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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsQ0FBQyx3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YUFGNUMsQ0FBdEI7QUFJQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FORCxFIiwiZmlsZSI6ImJ1bmRsZS1yb3V0ZXItYTdlNzQ2NDFmOWQ1MDBmYzkwNzYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xyXG5jb25zdCBQcm9wZXJ0eV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Byb3BlcnR5XCIpKTtcclxuLyoqXHJcbiAqIExpc3RlbnMgc291cmNlIGBCaW5kYWJsZWAgbW9kaWZpY2F0aW9uIGFuZCBjb3BpZXMgaXRzIHZhbHVlIHRvIHRhcmdldCBwcm9wZXJ0eS5cclxuICpcclxuICogQHBhcmFtIFQgUHJvcGVydHkgdmFsdWUgdHlwZS5cclxuICovXHJcbmNsYXNzIENvcGllciBleHRlbmRzIENsYXNzXzEuZGVmYXVsdCB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBzb3VyY2UgU291cmNlIGJpbmRhYmxlLlxyXG4gICAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcHJvcGVydHkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLl90YXJnZXRDcmVhdGVkID0gdGFyZ2V0ID09IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gKHRhcmdldCA9PSBudWxsKSA/IG5ldyBQcm9wZXJ0eV8xLmRlZmF1bHQobnVsbCwgc291cmNlLnNpbGVudCkgOiB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5vd24odGhpcy5zb3VyY2UuY2hhbmdlRXZlbnQubGlzdGVuKHRoaXMuX3VwZGF0ZSwgdGhpcykpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUYXJnZXQgcHJvcGVydHkuXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXJnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXREb2NcclxuICAgICAqL1xyXG4gICAgZGVzdHJveU9iamVjdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0Q3JlYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl90YXJnZXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3lPYmplY3QoKTtcclxuICAgIH1cclxuICAgIF91cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0LnNldCh0aGlzLnNvdXJjZS5nZXQoKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gQ29waWVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMjl3YVdWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMME52Y0dsbGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdSVUZ6UWtVN096czdPMEZCUjBZc2IwUkJRVFJDTzBGQlJUVkNMREJFUVVGclF6dEJRVVZzUXpzN096dEhRVWxITzBGQlEwZ3NUVUZCVFN4TlFVRlZMRk5CUVZFc1pVRkJTenRKUVVrMVFqczdPMDlCUjBjN1NVRkRTQ3haUVVGeFFpeE5RVUZ0UWl4RlFVRkZMRTFCUVhGQ08xRkJRemxFTEV0QlFVc3NSVUZCUlN4RFFVRkRPMUZCUkZrc1YwRkJUU3hIUVVGT0xFMUJRVTBzUTBGQllUdFJRVVYyUXl4SlFVRkpMRU5CUVVNc1kwRkJZeXhIUVVGSExFMUJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVTTdVVUZEY2tNc1NVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNTVUZCU1N4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeHJRa0ZCVVN4RFFVRkpMRWxCUVVrc1JVRkJSU3hOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJRenRSUVVOb1JpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNN1VVRkRaaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRE9VUXNRMEZCUXp0SlFVVkVPenRQUVVWSE8wbEJRMGdzU1VGQlNTeE5RVUZOTzFGQlExUXNUMEZCVHl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRE8wbEJRM0pDTEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVOUExHRkJRV0U3VVVGRGRFSXNTVUZCU1N4SlFVRkpMRU5CUVVNc1kwRkJZeXhGUVVGRk8xbEJRM2hDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03VTBGRGRrSTdVVUZEUkN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU53UWl4TFFVRkxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU03U1VGRGRrSXNRMEZCUXp0SlFVVlBMRTlCUVU4N1VVRkRaQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEVOQlFVTTdTVUZEY2tNc1EwRkJRenREUVVORU8wRkJSVVFzYTBKQlFXVXNUVUZCVFN4RFFVRkRJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlwY2JrMUpWQ0JNYVdObGJuTmxYRzVjYmtOdmNIbHlhV2RvZENBb1l5a2dNakF5TUNCRloyOXlJRTVsY0c5dGJubGhjMk5vYVdoY2JseHVVR1Z5YldsemMybHZiaUJwY3lCb1pYSmxZbmtnWjNKaGJuUmxaQ3dnWm5KbFpTQnZaaUJqYUdGeVoyVXNJSFJ2SUdGdWVTQndaWEp6YjI0Z2IySjBZV2x1YVc1bklHRWdZMjl3ZVZ4dWIyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVWdYQ0pUYjJaMGQyRnlaVndpS1N3Z2RHOGdaR1ZoYkZ4dWFXNGdkR2hsSUZOdlpuUjNZWEpsSUhkcGRHaHZkWFFnY21WemRISnBZM1JwYjI0c0lHbHVZMngxWkdsdVp5QjNhWFJvYjNWMElHeHBiV2wwWVhScGIyNGdkR2hsSUhKcFoyaDBjMXh1ZEc4Z2RYTmxMQ0JqYjNCNUxDQnRiMlJwWm5rc0lHMWxjbWRsTENCd2RXSnNhWE5vTENCa2FYTjBjbWxpZFhSbExDQnpkV0pzYVdObGJuTmxMQ0JoYm1RdmIzSWdjMlZzYkZ4dVkyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRDQndaWEp6YjI1eklIUnZJSGRvYjIwZ2RHaGxJRk52Wm5SM1lYSmxJR2x6WEc1bWRYSnVhWE5vWldRZ2RHOGdaRzhnYzI4c0lITjFZbXBsWTNRZ2RHOGdkR2hsSUdadmJHeHZkMmx1WnlCamIyNWthWFJwYjI1ek9seHVYRzVVYUdVZ1lXSnZkbVVnWTI5d2VYSnBaMmgwSUc1dmRHbGpaU0JoYm1RZ2RHaHBjeUJ3WlhKdGFYTnphVzl1SUc1dmRHbGpaU0J6YUdGc2JDQmlaU0JwYm1Oc2RXUmxaQ0JwYmlCaGJHeGNibU52Y0dsbGN5QnZjaUJ6ZFdKemRHRnVkR2xoYkNCd2IzSjBhVzl1Y3lCdlppQjBhR1VnVTI5bWRIZGhjbVV1WEc1Y2JsUklSU0JUVDBaVVYwRlNSU0JKVXlCUVVrOVdTVVJGUkNCY0lrRlRJRWxUWENJc0lGZEpWRWhQVlZRZ1YwRlNVa0ZPVkZrZ1QwWWdRVTVaSUV0SlRrUXNJRVZZVUZKRlUxTWdUMUpjYmtsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBZZ1RVVlNRMGhCVGxSQlFrbE1TVlJaTEZ4dVJrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzVCVlZSSVQxSlRJRTlTSUVOUFVGbFNTVWRJVkNCSVQweEVSVkpUSUVKRklFeEpRVUpNUlNCR1QxSWdRVTVaSUVOTVFVbE5MQ0JFUVUxQlIwVlRJRTlTSUU5VVNFVlNYRzVNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxGeHVUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUaUJVU0VWY2JsTlBSbFJYUVZKRkxseHVLaTljYmx4dWFXMXdiM0owSUVKcGJtUmhZbXhsSUdaeWIyMGdKeTR2UW1sdVpHRmliR1VuTzF4dWFXMXdiM0owSUVOc1lYTnpJR1p5YjIwZ0p5NHZRMnhoYzNNbk8xeHVhVzF3YjNKMElFbFFjbTl3WlhKMGVTQm1jbTl0SUNjdUwwbFFjbTl3WlhKMGVTYzdYRzVwYlhCdmNuUWdVSEp2Y0dWeWRIa2dabkp2YlNBbkxpOVFjbTl3WlhKMGVTYzdYRzVjYmk4cUtseHVJQ29nVEdsemRHVnVjeUJ6YjNWeVkyVWdZRUpwYm1SaFlteGxZQ0J0YjJScFptbGpZWFJwYjI0Z1lXNWtJR052Y0dsbGN5QnBkSE1nZG1Gc2RXVWdkRzhnZEdGeVoyVjBJSEJ5YjNCbGNuUjVMbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQlVJRkJ5YjNCbGNuUjVJSFpoYkhWbElIUjVjR1V1WEc0Z0tpOWNibU5zWVhOeklFTnZjR2xsY2p4V1BpQmxlSFJsYm1SeklFTnNZWE56SUh0Y2JseDBjSEpwZG1GMFpTQmZkR0Z5WjJWMFEzSmxZWFJsWkRvZ1ltOXZiR1ZoYmp0Y2JseDBjSEpwZG1GMFpTQmZkR0Z5WjJWME9pQkpVSEp2Y0dWeWRIazhWajQ3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRUJ3WVhKaGJTQnpiM1Z5WTJVZ1UyOTFjbU5sSUdKcGJtUmhZbXhsTGx4dVhIUWdLaUJBY0dGeVlXMGdkR0Z5WjJWMElGUmhjbWRsZENCd2NtOXdaWEowZVM1Y2JseDBJQ292WEc1Y2RHTnZibk4wY25WamRHOXlLSEpsWVdSdmJteDVJSE52ZFhKalpUb2dRbWx1WkdGaWJHVThWajRzSUhSaGNtZGxkRDg2SUVsUWNtOXdaWEowZVR4V1Bpa2dlMXh1WEhSY2RITjFjR1Z5S0NrN1hHNWNkRngwZEdocGN5NWZkR0Z5WjJWMFEzSmxZWFJsWkNBOUlIUmhjbWRsZENBOVBTQnVkV3hzTzF4dVhIUmNkSFJvYVhNdVgzUmhjbWRsZENBOUlDaDBZWEpuWlhRZ1BUMGdiblZzYkNrZ1B5QnVaWGNnVUhKdmNHVnlkSGs4Vmo0b2JuVnNiQ3dnYzI5MWNtTmxMbk5wYkdWdWRDa2dPaUIwWVhKblpYUTdYRzVjZEZ4MGRHaHBjeTVmZFhCa1lYUmxLQ2s3WEc1Y2RGeDBkR2hwY3k1dmQyNG9kR2hwY3k1emIzVnlZMlV1WTJoaGJtZGxSWFpsYm5RdWJHbHpkR1Z1S0hSb2FYTXVYM1Z3WkdGMFpTd2dkR2hwY3lrcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRlJoY21kbGRDQndjbTl3WlhKMGVTNWNibHgwSUNvdlhHNWNkR2RsZENCMFlYSm5aWFFvS1RvZ1FtbHVaR0ZpYkdVOFZqNGdlMXh1WEhSY2RISmxkSFZ5YmlCMGFHbHpMbDkwWVhKblpYUTdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nUUdsdWFHVnlhWFJFYjJOY2JseDBJQ292WEc1Y2RIQnliM1JsWTNSbFpDQmtaWE4wY205NVQySnFaV04wS0NrZ2UxeHVYSFJjZEdsbUlDaDBhR2x6TGw5MFlYSm5aWFJEY21WaGRHVmtLU0I3WEc1Y2RGeDBYSFIwYUdsekxsOTBZWEpuWlhRdVpHVnpkSEp2ZVNncE8xeHVYSFJjZEgxY2JseDBYSFIwYUdsekxsOTBZWEpuWlhRZ1BTQnVkV3hzTzF4dVhIUmNkSE4xY0dWeUxtUmxjM1J5YjNsUFltcGxZM1FvS1R0Y2JseDBmVnh1WEc1Y2RIQnlhWFpoZEdVZ1gzVndaR0YwWlNncElIdGNibHgwWEhSMGFHbHpMbDkwWVhKblpYUXVjMlYwS0hSb2FYTXVjMjkxY21ObExtZGxkQ2dwS1R0Y2JseDBmVnh1ZlZ4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCRGIzQnBaWEk3WEc0aVhYMD0iLCJcInVzZSBzdHJpY3RcIjtcclxuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn0pO1xyXG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEFycmF5VXRpbHMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vQXJyYXlVdGlsc1wiKSk7XHJcbmNvbnN0IENhbmNlbFRva2VuXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2FuY2VsVG9rZW5cIikpO1xyXG5jb25zdCBDbGFzc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NsYXNzXCIpKTtcclxuY29uc3QgQ29tcG9uZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ29tcG9uZW50XCIpKTtcclxuY29uc3QgQ29waWVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ29waWVyXCIpKTtcclxuY29uc3QgZGVmZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9kZWZlclwiKSk7XHJcbmNvbnN0IERpY3Rpb25hcnlVdGlscyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9EaWN0aW9uYXJ5VXRpbHNcIikpO1xyXG5jb25zdCBoYXNoXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vaGFzaFwiKSk7XHJcbmNvbnN0IGluZGV4XzEgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcclxuY29uc3QgUHJvcGVydHlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qcm9wZXJ0eVwiKSk7XHJcbi8qKlxyXG4gKiBVUkwgcm91dGVyLiBDb252ZXJ0cyBpbmNvbWluZyBwYXJ0IG9mIFVSTCAoaGFzaCkgdG8gYSB0YXJnZXQgb2JqZWN0IGFuZCBwYXNzZXMgdGFpbCBzdHJpbmcgdG8gaXRcclxuICogZm9yIGZ1cnRoZXIgcm91dGluZy5cclxuICovXHJcbmNsYXNzIFJvdXRlciBleHRlbmRzIENsYXNzXzEuZGVmYXVsdCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgcm91dGVyIGluc3RhbmNlLiBQbGVhc2Ugbm90aWNlIHRoYXQgdGhlIHJvdXRlciBkb2Vzbid0IHByb2Nlc3MgY3VycmVudCByb3V0ZSBpbW1lZGlhdGVseSBvblxyXG4gICAgICogaW5pdGlhbGl6YXRpb24uIFRvIHByb2Nlc3MgdGhlIHJvdXRlLCBjYWxsIGB1cGRhdGVgIG1ldGhvZC5cclxuICAgICAqIEBwYXJhbSBjb25maWcgUm91dGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yb3V0ZSA9IG5ldyBQcm9wZXJ0eV8xLmRlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLl9hcmcgPSBuZXcgUHJvcGVydHlfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBjb25maWcubmFtZTtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKCh0aGlzLm5hbWUgPT0gbnVsbCkgIT09ICh0aGlzLnBhcmVudCA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZXIgY29uZmlndXJhdGlvbiBlcnJvcjogeW91IGhhdmUgc3BlY2lmaWVkIHJvdXRlciBuYW1lIG9yIHBhcmVudCwgYnV0IGhhdmVuJ3Qgc3BlY2lmaWVkIGFub3RoZXIuIFRoZXNlIHR3byBvcHRpb25zIG11c3QgY29tZSB0b2dldGhlci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGF0aCA9IGNvbmZpZy5wYXRoIHx8IG5ldyBQcm9wZXJ0eV8xLmRlZmF1bHQoKTsgLy8gd2UgZG9uJ3Qgb3duIGl0IGJlY2F1c2UgaXRzIHZhbHVlIGlzIGJlaW5nIHVzZWQgaW4gZGVzdHJveU9iamVjdCBtZXRob2QgLSBhZnRlciBvd25hZ2UgcG9vbCByZWxlYXNpbmdcclxuICAgICAgICB0aGlzLnNlcGFyYXRvciA9IFJvdXRlci5tYWtlU2VwYXJhdG9yKGNvbmZpZy5zZXBhcmF0b3IpO1xyXG4gICAgICAgIHRoaXMuam9pbmVyID0gUm91dGVyLm1ha2VKb2luZXIoY29uZmlnLmpvaW5lcik7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gUm91dGVyLm1ha2VIYW5kbGVyKGNvbmZpZy5oYW5kbGVyKTtcclxuICAgICAgICB0aGlzLnNjb3BlID0gY29uZmlnLnNjb3BlIHx8IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gY29uZmlnLnRhcmdldCB8fCB0aGlzLm93bihuZXcgUHJvcGVydHlfMS5kZWZhdWx0KCkpO1xyXG4gICAgICAgIHRoaXMub3duKHRoaXMucGF0aC5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy51cGRhdGUsIHRoaXMpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUm91dGVyIHRhcmdldC4gTWFpbiBwdXJwb3NlIG9mIHRoZSByb3V0ZXIgaXMgdG8gY29udmVydCBgcGF0aGAgdG8gYHRhcmdldGAuIEluIHBhcnRpY3VsYXIsIFVJUm91dGVyXHJcbiAgICAgKiBjcmVhdGVzIENvbXBvbmVudCBpbnN0YW5jZXMgYmFzZWQgb24gY3VycmVudCBgcGF0aGAgdmFsdWUgc28geW91IGNvdWxkIHJlbmRlciB0aGVtLlxyXG4gICAgICovXHJcbiAgICBnZXQgdGFyZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEN1cnJlbnQgcm91dGUuIEZpcnN0IGNodW5rIG9mIHRoZSBwYXRoIGRldGVjdGVkIGJ5IGBzZXBhcmF0b3JgIGZ1bmN0aW9uLiBZb3UgY2FuIHdhdGNoIHRoaXMgcHJvcGVydHlcclxuICAgICAqIHRvIGFjdGl2YXRlIGFuZCBkZWFjdGl2YXRlIGl0ZW1zIGluIHlvdXIgbWVudS5cclxuICAgICAqL1xyXG4gICAgZ2V0IHJvdXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVtYWluZGVyIG9mIGN1cnJlbnQgcm91dGUgYWZ0ZXIgYHNlcGFyYXRvcmAgZnVuY3Rpb24gY2FsbC4gVGhpcyBwcm9wZXJ0eSBpcyBwYXNzZWQgdG8gYGhhbmRsZXJgXHJcbiAgICAgKiBmdW5jdGlvbiBhbmQgY2FuIGJlIHBhc3NlZCBvdmVyIHRvIGNoaWxkIGNvbXBvbmVudHMgZm9yIGZ1cnRoZXIgcm91dGluZy5cclxuICAgICAqL1xyXG4gICAgZ2V0IGFyZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXJnO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXHJcbiAgICBkZXN0cm95T2JqZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZXIgY2FuIG5vdCBiZSBkZXN0cm95ZWQgZHVyaW5nIGl0cyB1cGRhdGUgY3ljbGUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLl90YXJnZXQuZ2V0KCk7XHJcbiAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3lPYmplY3QoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSXNzdWVzIHJvdXRlIHByb2Nlc3NpbmcuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBkYXRpbmcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgdXBkYXRlIHJvdXRlciBiZWNhdXNlIGl0cyB1cGRhdGUgY3ljbGUgaXMgYWxyZWFkeSBhY3RpdmUuIFwiICtcclxuICAgICAgICAgICAgICAgIFwiU3VnZ2VzdCB1c2luZyBSb3V0ZXIuUmVkaXJlY3RvciBvciBtb3ZpbmcgVVJMIHJlZGlyZWN0aW9uIHRvIGFuIGFzeW5jcm9ub3VzIGNhbGxiYWNrLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnBhdGguZ2V0KCk7XHJcbiAgICAgICAgY29uc3QgcGFpciA9IChwYXRoID09IG51bGwpID8gbnVsbCA6IHRoaXMuc2VwYXJhdG9yLmNhbGwodGhpcy5zY29wZSwgcGF0aCk7XHJcbiAgICAgICAgY29uc3Qgcm91dGUgPSAocGFpciAhPSBudWxsKSA/IChwYWlyWzBdIHx8IFwiXCIpIDogXCJcIjtcclxuICAgICAgICBjb25zdCBhcmcgPSAocGFpciAhPSBudWxsKSA/IChwYWlyWzFdIHx8IG51bGwpIDogbnVsbDtcclxuICAgICAgICBpZiAocm91dGUgPT09IHRoaXMucm91dGUuZ2V0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJnLnNldChhcmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YXJnZXQuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0LnNldChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYXJnLnNldChhcmcpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZS5zZXQocm91dGUpO1xyXG4gICAgICAgICAgICB0aGlzLl90YXJnZXQuc2V0KHRoaXMuaGFuZGxlci5jYWxsKHRoaXMuc2NvcGUsIHJvdXRlLCB0aGlzLl9hcmcpIHx8IG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGpvaW5lcmAgZnVuY3Rpb24gY2FsbCBmb3IgdGhpcyByb3V0ZXIuXHJcbiAgICAgKiBAcGFyYW0gcm91dGUgUm91dGUgbmFtZS5cclxuICAgICAqIEBwYXJhbSBhcmcgUmVtYWluZGVyIG9mIHRoZSBwYXRoLlxyXG4gICAgICogQHJldHVybnMgRnVsbCBwYXRoLlxyXG4gICAgICovXHJcbiAgICBqb2luKHJvdXRlLCBhcmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5qb2luZXIuY2FsbCh0aGlzLnNjb3BlLCByb3V0ZSwgYXJnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBmdWxsIHBhdGggYXMgdGhlIHJlc3VsdCBvZiBgam9pbmVyYCBmdW5jdGlvbiBjYWxsIGluIGBwYXJlbnRgIHJvdXRlciB3aXRoIGBuYW1lYCBwYXNzZWQgYXNcclxuICAgICAqIGByb3V0ZWAgYW5kIGBwYXRoYCBwYXNzZWQgYXMgYGFyZ2AuIFJldHVybnMgYHBhdGhgIGlmIHRoaXMgaXMgdGhlIHJvb3Qgcm91dGVyLlxyXG4gICAgICogQHBhcmFtIHBhdGggUGF0aCByZWxhdGl2ZSB0byB0aGlzIHJvdXRlci5cclxuICAgICAqIEByZXR1cm5zIEZ1bGwgcGF0aCByZWxhdGl2ZSB0byB0aGUgcm9vdCByb3V0ZXIuXHJcbiAgICAgKi9cclxuICAgIGdldEZ1bGxQYXRoKHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5nZXRGdWxsUGF0aCh0aGlzLnBhcmVudC5qb2luKHRoaXMubmFtZSwgcGF0aCkpIDogcGF0aDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSW1tZWRpYXRlbHkgcGVyZm9ybXMgdGhlIHJlZGlyZWN0aW9uLCBpLmUuIHNldHMgYGhhc2hgIHRvIGBnZXRGdWxsUGF0aChwYXRoKWAuXHJcbiAgICAgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxyXG4gICAgICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZSBzdGFjay5cclxuICAgICAqL1xyXG4gICAgcmVkaXJlY3QocGF0aCwgcmVwbGFjZVN0YXRlKSB7XHJcbiAgICAgICAgUm91dGVyLnJlZGlyZWN0KHBhdGgsIHRoaXMsIHJlcGxhY2VTdGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xyXG4oZnVuY3Rpb24gKFJvdXRlcikge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHZhbHVlIG9mIGBzZXBhcmF0b3JgLlxyXG4gICAgICovXHJcbiAgICBSb3V0ZXIuREVGQVVMVF9TRVBBUkFUT1IgPSAvXlxcLyooW14/XFwvXSspKD86XFwvKC4qKXwoXFw/LiopKT8kLztcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCB2YWx1ZSBvZiBgam9pbmVyYC5cclxuICAgICAqL1xyXG4gICAgUm91dGVyLkRFRkFVTFRfSk9JTkVSID0gXCIvXCI7XHJcbiAgICAvKipcclxuICAgICAqIElmIGBzZXBhcmF0b3JgIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCByZWd1bGFyIGV4cHJlc3Npb24gdG9cclxuICAgICAqIGEgZnVuY3Rpb24gYnkgdGhlIGZvbGxvd2luZyBydWxlOiBUaGUgZmlyc3QgdG9rZW4gKCQxKSBvZiBwYXRoIGlzIHVzZWQgYXMgYSByb3V0ZSwgYW5kIHRoZSBuZXh0IG5vbi1udWxsIHRva2VuXHJcbiAgICAgKiAoJDIgb3IgZnVydGhlcikgaXMgdXNlZCBhcyBhbiBhcmd1bWVudC4gSWYgcGF0aCBpcyBudWxsLCBpdCBpcyBhc3N1bWVkIHRvIGJlIFwiXCIuXHJcbiAgICAgKiBAcGFyYW0gc2VwYXJhdG9yIEZ1bmN0aW9uIG9yIHJlZ3VsYXIgZXhwcmVzc2lvbi5cclxuICAgICAqIEByZXR1cm5zIFNlcGFyYXRvciBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbWFrZVNlcGFyYXRvcihzZXBhcmF0b3IgPSBSb3V0ZXIuREVGQVVMVF9TRVBBUkFUT1IpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHNlcGFyYXRvciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXBhcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBzZXBhcmF0b3IuZXhlYyhwYXRoIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ID8gW3Jlc3VsdFsxXSwgaW5kZXhfMS5kZWZuKEFycmF5VXRpbHMuZmluZChyZXN1bHQuc2xpY2UoMiksIGluZGV4XzEuaXNOb3ROaWwpLCBudWxsKV0gOiBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBSb3V0ZXIubWFrZVNlcGFyYXRvciA9IG1ha2VTZXBhcmF0b3I7XHJcbiAgICAvKipcclxuICAgICAqIElmIGBqb2luZXJgIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCBzdHJpbmcgdG8gYSBmdW5jdGlvbiBieSB0aGVcclxuICAgICAqIGZvbGxvd2luZyBydWxlOiBqb2lucyBpbmNvbWluZyByb3V0ZS9hcmd1bWVudCBwYWlyIHZpYSB0aGUgc3BlY2lmaWVkIHN0cmluZy4gTGVhZGluZyBqb2luZXIgc3ltYm9scyBpbiBhcmd1bWVudFxyXG4gICAgICogYXJlIHRyaW1tZWQuIElmIGFyZ3VtZW50IHN0YXJ0cyB3aXRoIFwiP1wiLCBqb2luZXIgc3ltYm9sIGlzIG5vdCBhZGRlZC4gSWYgYXJndW1lbnQgaXMgbnVsbCBvciBibGFuaywgcmV0dXJuc1xyXG4gICAgICogcm91dGUuXHJcbiAgICAgKiBAcGFyYW0gam9pbmVyIEZ1bmN0aW9uIG9yIHNlcGFyYXRpb24gY2hhcmFjdGVyLlxyXG4gICAgICogQHJldHVybnMgSm9pbmVyIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBtYWtlSm9pbmVyKGpvaW5lciA9IFJvdXRlci5ERUZBVUxUX0pPSU5FUikge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygam9pbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpvaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdHJpbW1lciA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBqb2luZXIucmVwbGFjZSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSArIFwiKSpcIik7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyb3V0ZSwgYXJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhYXJnID8gcm91dGUgOiAoYXJnLmNoYXJBdCgwKSA9PT0gXCI/XCIpID8gKHJvdXRlICsgYXJnKSA6IChyb3V0ZSArIGpvaW5lciArIGFyZy5yZXBsYWNlKHRyaW1tZXIsIFwiXCIpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgUm91dGVyLm1ha2VKb2luZXIgPSBtYWtlSm9pbmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBoYW5kbGVyIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCBvYmplY3QgdG8gYSBmdW5jdGlvbi5cclxuICAgICAqIEBwYXJhbSBoYW5kbGVyIEhhbmRsZXIgY29uZmlndXJhdGlvbiBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyBIYW5kbGVyIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBtYWtlSGFuZGxlcihoYW5kbGVyID0ge30pIHtcclxuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgcm91dGVzID0gaGFuZGxlci5yb3V0ZXMgfHwge307XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyb3V0ZSwgYXJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByb3V0ZXNbcm91dGVdID8gcm91dGVzW3JvdXRlXS5jYWxsKHRoaXMsIGFyZykgOlxyXG4gICAgICAgICAgICAgICAgaGFuZGxlci5ub3RGb3VuZCA/IGhhbmRsZXIubm90Rm91bmQuY2FsbCh0aGlzLCByb3V0ZSwgYXJnKSA6IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFJvdXRlci5tYWtlSGFuZGxlciA9IG1ha2VIYW5kbGVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGZ1bGwgcGF0aCBhcyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgaW4gYHBhcmVudGAgb2YgYHJvdXRlcmAgd2l0aCBgbmFtZWAgcGFzc2VkIGFzXHJcbiAgICAgKiBgcm91dGVgIGFuZCBgcGF0aGAgcGFzc2VkIGFzIGBhcmdgLiBSZXR1cm5zIGBwYXRoYCBpZiB0aGlzIGlzIHRoZSByb290IHJvdXRlci5cclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gYHJvdXRlcmAuXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIENvbXB1dGUgZnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxyXG4gICAgICogQHJldHVybnMgRnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoZSBgcm91dGVyYC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0RnVsbFBhdGgocGF0aCwgcm91dGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlciA/IHJvdXRlci5nZXRGdWxsUGF0aChwYXRoKSA6IHBhdGg7XHJcbiAgICB9XHJcbiAgICBSb3V0ZXIuZ2V0RnVsbFBhdGggPSBnZXRGdWxsUGF0aDtcclxuICAgIC8qKlxyXG4gICAgICogSW1tZWRpYXRlbHkgcGVyZm9ybXMgdGhlIHJlZGlyZWN0aW9uLCBpLmUuIHNldHMgYGhhc2hgIHRvIGBnZXRGdWxsUGF0aChwYXRoLCByb3V0ZXIpYC5cclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gYHJvdXRlcmAuXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIFJlZGlyZWN0IHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxyXG4gICAgICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZSBzdGFjay5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVkaXJlY3QocGF0aCwgcm91dGVyLCByZXBsYWNlU3RhdGUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBwYXRoID0gZ2V0RnVsbFBhdGgocGF0aCwgcm91dGVyKTtcclxuICAgICAgICAgICAgaWYgKGhhc2hfMS5kZWZhdWx0LnVwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgY3ljbGUgaXMgYWxyZWFkeSBhY3RpdmUuIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlN1Z2dlc3QgdXNpbmcgUm91dGVyLlJlZGlyZWN0b3Igb3IgbW92aW5nIFVSTCByZWRpcmVjdGlvbiB0byBhbiBhc3luY3Jvbm91cyBjYWxsYmFjay5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG5vdCBwZXJmb3JtIFVSTCByZWRpcmVjdGlvbiB0byBcIiArIHBhdGggKyBcIjogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoYXNoXzEuZGVmYXVsdC5zZXQocGF0aCwgcmVwbGFjZVN0YXRlKTtcclxuICAgIH1cclxuICAgIFJvdXRlci5yZWRpcmVjdCA9IHJlZGlyZWN0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNvbW1lbmRlZCB3YXkgdG8gcGVyZm9ybSBhbiBhc3luY3Jvbm91cyByZWRpcmVjdGlvbiBpbiBSb3V0ZXIgYGhhbmRsZXJgIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBjbGFzcyBSZWRpcmVjdG9yIGV4dGVuZHMgQ29tcG9uZW50XzEuZGVmYXVsdCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyByZWRpcmVjdG9yLlxyXG4gICAgICAgICAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gcm91dGVyLlxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZXIgUmVkaXJlY3QgcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXHJcbiAgICAgICAgICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZVxyXG4gICAgICAgICAqIHN0YWNrLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBhdGgsIHJvdXRlciwgcmVwbGFjZVN0YXRlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VTdGF0ZSA9IHJlcGxhY2VTdGF0ZTtcclxuICAgICAgICAgICAgZGVmZXJfMS5kZWZhdWx0KDAsIHRoaXMub3duKG5ldyBDYW5jZWxUb2tlbl8xLmRlZmF1bHQoKSkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3QodGhpcy5wYXRoLCB0aGlzLnJvdXRlciwgaW5kZXhfMS5kZWZuKHRoaXMucmVwbGFjZVN0YXRlLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJvdXRlci5SZWRpcmVjdG9yID0gUmVkaXJlY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHJvdXRlciB0aGF0IG1hbmFnZXMgdHdvIG1hcHBpbmcgb2YgcHJvcGVydGllczpcclxuICAgICAqXHJcbiAgICAgKiAqIGBwYXRoc2Agd2hpY2ggZXhwb3NlcyBzdHJpbmcgcGF0aCBwcm9wZXJ0aWVzIGZvciBjaGlsZCByb3V0ZXJzIGlmIG5lY2Nlc3Nhcnk7XHJcbiAgICAgKiAqIGBleHBhbmRlZGAgd2hpY2ggZXhwb3NlcyBib29sZWFuIFwiZXhwYW5kZWRcIiBwcm9wZXJ0aWVzIGZvciBjaGlsZCBVSSBwYW5lbHMuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBhbGxvd3MgeW91IHRvIHJlbmRlciB5b3VyIGNvbnRlbnQgYXMgYSBmaXhlZCBsaXN0IG9mIHBhbmVscyByZXByZXNlbnRpbmcgdGhlIGNvbmN1cnJlbnQgcm91dGVzLlxyXG4gICAgICovXHJcbiAgICBjbGFzcyBOb2RlIGV4dGVuZHMgQ2xhc3NfMS5kZWZhdWx0IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIHJvdXRlciBub2RlLCBhc3NpZ25zIGl0cyBwcm9wZXJ0aWVzIHRvIGluaXRpYWwgdmFsdWVzIGFuZCBzdGFydHMgc3luY2hyb25pemF0aW9uLlxyXG4gICAgICAgICAqIEBwYXJhbSBjb25maWcgTm9kZSBjb25maWd1cmF0aW9uLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlOyAvLyB1c2VkIHRvIGF1dG8tYWN0aXZhdGUgdGhlIGZpcnN0IHJvdXRlIG9uIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7IC8vIHVzZWQgdG8gcHJldmVudCByZWRpcmVjdGlvbiBlcnJvclxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRSb3V0ZSA9IGNvbmZpZy5kZWZhdWx0Um91dGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlTWFwID0gQXJyYXlVdGlscy5pbmRleChjb25maWcucm91dGVzLCBpbmRleF8xLmlkZW50aXR5KTtcclxuICAgICAgICAgICAgdGhpcy5fcGF0aHMgPSBEaWN0aW9uYXJ5VXRpbHMubWFwKHJvdXRlTWFwLCAoKSA9PiBuZXcgUHJvcGVydHlfMS5kZWZhdWx0KCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9leHBhbmRlZCA9IERpY3Rpb25hcnlVdGlscy5tYXAocm91dGVNYXAsICgpID0+IG5ldyBQcm9wZXJ0eV8xLmRlZmF1bHQoY29uZmlnLmV4cGFuZGVkID09PSB0cnVlKSk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcuZXhwYW5kZWQgJiYgKHR5cGVvZiBjb25maWcuZXhwYW5kZWQgIT09IFwiYm9vbGVhblwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmV4cGFuZGVkLmZvckVhY2goKHJvdXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhwYW5kZWRbcm91dGVdLnNldCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlVdGlscy5mb3JFYWNoKHRoaXMuX2V4cGFuZGVkLCAoZXhwYW5kZWQsIHJvdXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm93bihleHBhbmRlZC5jaGFuZ2VFdmVudC5saXN0ZW4oKHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudmFsdWUgJiYgIXRoaXMuX3VwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLnJlZGlyZWN0KHJvdXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlciA9IHRoaXMub3duKG5ldyBSb3V0ZXIoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogY29uZmlnLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGNvbmZpZy5wYXJlbnQsXHJcbiAgICAgICAgICAgICAgICBwYXRoOiBjb25maWcucGF0aCxcclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IChyb3V0ZSwgYXJnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuX3BhdGhzW3JvdXRlXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICghdGhpcy5faW5pdGlhbGl6ZWQgJiYgdGhpcy5kZWZhdWx0Um91dGUpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWRpcmVjdG9yKHRoaXMuZGVmYXVsdFJvdXRlLCB0aGlzLnJvdXRlcikgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZXIgPSBuZXcgTm9kZUV4cGFuZGVyKHRoaXMucm91dGVyLCBhcmcsIHBhdGgsIHRoaXMuX2V4cGFuZGVkW3JvdXRlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwYW5kZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdmlkZXMgcGF0aHMgdG8gYmluZCBjaGlsZCByb3V0ZXJzIHRvLCBieSBuYW1lLiBPbmx5IG9uZSByb3V0ZSBpcyBhY3RpdmUgYXQgYSB0aW1lLCBidXQgdGhlaXIgcGF0aHNcclxuICAgICAgICAgKiBhbHdheXMgZXhpc3QgcmVnYXJkbGVzcyBvZiB0aGVpciBhY3Rpdml0eS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQgcGF0aHMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXRocztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdmlkZXMgXCJleHBhbmRlZFwiIGZsYWdzIHRvIGJpbmQgY2hpbGQgcGFuZWxzIHRvLCBieSBuYW1lLiBTdXBwb3J0IHR3by13YXkgYmluZGluZy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQgZXhwYW5kZWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSb3V0ZXIuTm9kZSA9IE5vZGU7XHJcbiAgICBjbGFzcyBOb2RlRXhwYW5kZXIgZXh0ZW5kcyBDbGFzc18xLmRlZmF1bHQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHJvdXRlciwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcbiAgICAgICAgICAgIHRoaXMub3duKG5ldyBDb3BpZXJfMS5kZWZhdWx0KHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpKTtcclxuICAgICAgICAgICAgZXhwYW5kZWQuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLm93bihleHBhbmRlZC5jaGFuZ2VFdmVudC5saXN0ZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIucmVkaXJlY3QoXCJcIik7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKFJvdXRlciB8fCAoUm91dGVyID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVW05MWRHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDFKdmRYUmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UlVGelFrVTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0QlFVVkdMSGxFUVVFeVF6dEJRVVV6UXl4blJVRkJkME03UVVGRGVFTXNiMFJCUVRSQ08wRkJRelZDTERSRVFVRnZRenRCUVVOd1F5eHpSRUZCT0VJN1FVRkRPVUlzYjBSQlFUUkNPMEZCUnpWQ0xHMUZRVUZ4UkR0QlFVTnlSQ3hyUkVGQk1FSTdRVUZETVVJc2JVTkJRV2xFTzBGQlJXcEVMREJFUVVGclF6dEJRVVZzUXpzN08wZEJSMGM3UVVGRFNDeE5RVUZOTEUxQlFUaENMRk5CUVZFc1pVRkJTenRKUVRaRGFFUTdPenM3VDBGSlJ6dEpRVU5JTEZsQlFWa3NVMEZCTWtJc1JVRkJSVHRSUVVONFF5eExRVUZMTEVWQlFVVXNRMEZCUXp0UlFWWkVMRmRCUVUwc1IwRkJjMElzU1VGQlNTeHJRa0ZCVVN4RlFVRlZMRU5CUVVNN1VVRkRia1FzVTBGQlNTeEhRVUZ6UWl4SlFVRkpMR3RDUVVGUkxFVkJRVlVzUTBGQlF6dFJRVU5xUkN4alFVRlRMRWRCUVZrc1MwRkJTeXhEUVVGRE8xRkJVMnhETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU40UWl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTTdVVUZETlVJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEpRVUZKTEVsQlFVa3NRMEZCUXl4RlFVRkZPMWxCUTJ4RUxFMUJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNORWxCUVRSSkxFTkJRVU1zUTBGQlF6dFRRVU01U2p0UlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzVFVGQlRTeERRVUZETEVsQlFVa3NTVUZCU1N4SlFVRkpMR3RDUVVGUkxFVkJRVlVzUTBGQlF5eERRVUZETEhkSFFVRjNSenRSUVVNelNpeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRTFCUVUwc1EwRkJReXhoUVVGaExFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTNoRUxFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZETDBNc1NVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eE5RVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU5zUkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eExRVUZMTEVsQlFVa3NTVUZCU1N4RFFVRkRPMUZCUTJ4RExFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTFCUVUwc1NVRkJTU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NhMEpCUVZFc1JVRkJTeXhEUVVGRExFTkJRVU03VVVGRE5VUXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpORUxFTkJRVU03U1VGRlJEczdPMDlCUjBjN1NVRkRTQ3hKUVVGSkxFMUJRVTA3VVVGRFZDeFBRVUZQTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1NVRkRja0lzUTBGQlF6dEpRVVZFT3pzN1QwRkhSenRKUVVOSUxFbEJRVWtzUzBGQlN6dFJRVU5TTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJRenRKUVVOd1FpeERRVUZETzBsQlJVUTdPenRQUVVkSE8wbEJRMGdzU1VGQlNTeEhRVUZITzFGQlEwNHNUMEZCVHl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRE8wbEJRMnhDTEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVOSUxHRkJRV0U3VVVGRFdpeEpRVUZKTEVsQlFVa3NRMEZCUXl4VFFVRlRMRVZCUVVVN1dVRkRia0lzVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4elJFRkJjMFFzUTBGQlF5eERRVUZETzFOQlEzaEZPMUZCUTBRc1RVRkJUU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVOc1F5eEpRVUZKTEUxQlFVMHNTVUZCU1N4SlFVRkpMRVZCUVVVN1dVRkRia0lzVFVGQlRTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMU5CUTJwQ08xRkJRMFFzUzBGQlN5eERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRPMGxCUTNaQ0xFTkJRVU03U1VGRlJEczdUMEZGUnp0SlFVTklMRTFCUVUwN1VVRkRUQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFRRVUZUTEVWQlFVVTdXVUZEYmtJc1RVRkJUU3hKUVVGSkxFdEJRVXNzUTBGQlF5eHJSVUZCYTBVN1owSkJRMnBHTEhWR1FVRjFSaXhEUVVGRExFTkJRVU03VTBGRE1VWTdVVUZEUkN4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU4wUWl4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUXpkQ0xFMUJRVTBzU1VGQlNTeEhRVUZoTEVOQlFVTXNTVUZCU1N4SlFVRkpMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGNrWXNUVUZCVFN4TFFVRkxMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU03VVVGRGNFUXNUVUZCVFN4SFFVRkhMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU03VVVGRGRFUXNTVUZCU1N4TFFVRkxMRXRCUVVzc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUlR0WlFVTXZRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRUUVVOdVFqdGhRVUZOTzFsQlEwNHNUVUZCVFN4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0WlFVTnFReXhKUVVGSkxFMUJRVTBzU1VGQlNTeEpRVUZKTEVWQlFVVTdaMEpCUTI1Q0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU4yUWl4TlFVRk5MRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03WVVGRGFrSTdXVUZEUkN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTnVRaXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRaUVVOMlFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1NVRkJTU3hEUVVGRExFTkJRVU03VTBGRE1VVTdVVUZEUkN4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCUlVRN096czdPMDlCUzBjN1NVRkRTQ3hKUVVGSkxFTkJRVU1zUzBGQllTeEZRVUZGTEVkQlFWYzdVVUZET1VJc1QwRkJUeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0SlFVTnFSQ3hEUVVGRE8wbEJSVVE3T3pzN08wOUJTMGM3U1VGRFNDeFhRVUZYTEVOQlFVTXNTVUZCV1R0UlFVTjJRaXhQUVVGUExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETzBsQlEzaEdMRU5CUVVNN1NVRkZSRHM3T3p0UFFVbEhPMGxCUTBnc1VVRkJVU3hEUVVGRExFbEJRVmtzUlVGQlJTeFpRVUZ6UWp0UlFVTTFReXhOUVVGTkxFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1dVRkJXU3hEUVVGRExFTkJRVU03U1VGRE0wTXNRMEZCUXp0RFFVTkVPMEZCUlVRc2EwSkJRV1VzVFVGQlRTeERRVUZETzBGQlJYUkNMRmRCUVZVc1RVRkJUVHRKUVVObU96dFBRVVZITzBsQlExVXNkMEpCUVdsQ0xFZEJRVWNzYTBOQlFXdERMRU5CUVVNN1NVRkZjRVU3TzA5QlJVYzdTVUZEVlN4eFFrRkJZeXhIUVVGSExFZEJRVWNzUTBGQlF6dEpRVEpJYkVNN096czdPenRQUVUxSE8wbEJRMGdzVTBGQlowSXNZVUZCWVN4RFFVRkRMRmxCUVdkRExFOUJRVUVzYVVKQlFXbENPMUZCUXpsRkxFbEJRVWtzVDBGQlR5eFRRVUZUTEV0QlFVc3NWVUZCVlN4RlFVRkZPMWxCUTNCRExFOUJRVThzVTBGQlV5eERRVUZETzFOQlEycENPMUZCUTBRc1QwRkJUeXhWUVVGVkxFbEJRVms3V1VGRE5VSXNUVUZCVFN4TlFVRk5MRWRCUVVjc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRNVU1zVDBGQlR5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEZsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1owSkJRVkVzUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU0xUml4RFFVRkRMRU5CUVVNN1NVRkRTQ3hEUVVGRE8wbEJVbVVzYjBKQlFXRXNaMEpCVVRWQ0xFTkJRVUU3U1VGRlJEczdPenM3T3p0UFFVOUhPMGxCUTBnc1UwRkJaMElzVlVGQlZTeERRVUZETEZOQlFUQkNMRTlCUVVFc1kwRkJZenRSUVVOc1JTeEpRVUZKTEU5QlFVOHNUVUZCVFN4TFFVRkxMRlZCUVZVc1JVRkJSVHRaUVVOcVF5eFBRVUZQTEUxQlFVMHNRMEZCUXp0VFFVTmtPMUZCUTBRc1RVRkJUU3hQUVVGUExFZEJRVWNzU1VGQlNTeE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zY1VKQlFYRkNMRVZCUVVVc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETVVZc1QwRkJUeXhWUVVGVkxFdEJRVXNzUlVGQlJTeEhRVUZITzFsQlF6RkNMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEVkQlFVY3NUVUZCVFN4SFFVRkhMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkROMGNzUTBGQlF5eERRVUZETzBsQlEwZ3NRMEZCUXp0SlFWSmxMR2xDUVVGVkxHRkJVWHBDTEVOQlFVRTdTVUZGUkRzN096dFBRVWxITzBsQlEwZ3NVMEZCWjBJc1YwRkJWeXhEUVVGSkxGVkJRWGxETEVWQlFVVTdVVUZEZWtVc1NVRkJTU3hQUVVGUExFOUJRVThzUzBGQlN5eFZRVUZWTEVWQlFVVTdXVUZEYkVNc1QwRkJUeXhQUVVGUExFTkJRVU03VTBGRFpqdFJRVU5FTEUxQlFVMHNUVUZCVFN4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFbEJRVWtzUlVGQlJTeERRVUZETzFGQlEzQkRMRTlCUVU4c1ZVRkJjVUlzUzBGQllTeEZRVUZGTEVkQlFYRkNPMWxCUXk5RUxFOUJRVThzVFVGQlRTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTnlSQ3hQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdVVUZEY0VVc1EwRkJReXhEUVVGRE8wbEJRMGdzUTBGQlF6dEpRVlJsTEd0Q1FVRlhMR05CVXpGQ0xFTkJRVUU3U1VGRlJEczdPenM3TzA5QlRVYzdTVUZEU0N4VFFVRm5RaXhYUVVGWExFTkJRVU1zU1VGQldTeEZRVUZGTEUxQlFXOUNPMUZCUXpkRUxFOUJRVThzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNN1NVRkRha1FzUTBGQlF6dEpRVVpsTEd0Q1FVRlhMR05CUlRGQ0xFTkJRVUU3U1VGRlJEczdPenM3VDBGTFJ6dEpRVU5JTEZOQlFXZENMRkZCUVZFc1EwRkJReXhKUVVGWkxFVkJRVVVzVFVGQmIwSXNSVUZCUlN4WlFVRnpRanRSUVVOc1JpeEpRVUZKTzFsQlEwZ3NTVUZCU1N4SFFVRkhMRmRCUVZjc1EwRkJReXhKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdXVUZEYWtNc1NVRkJTU3hqUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTzJkQ1FVTnNRaXhOUVVGTkxFbEJRVWtzUzBGQlN5eERRVUZETEd0RFFVRnJRenR2UWtGRGFrUXNkVVpCUVhWR0xFTkJRVU1zUTBGQlF6dGhRVU14Ump0VFFVTkVPMUZCUVVNc1QwRkJUeXhEUVVGRExFVkJRVVU3V1VGRFdDeE5RVUZOTEVsQlFVa3NTMEZCU3l4RFFVRkRMSEZEUVVGeFF5eEhRVUZITEVsQlFVa3NSMEZCUnl4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFOQlEycEdPMUZCUTBRc1kwRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNXVUZCV1N4RFFVRkRMRU5CUVVNN1NVRkRPVUlzUTBGQlF6dEpRVmhsTEdWQlFWRXNWMEZYZGtJc1EwRkJRVHRKUVVWRU96dFBRVVZITzBsQlEwZ3NUVUZCWVN4VlFVRlhMRk5CUVZFc2JVSkJRVk03VVVGRGVFTTdPenM3T3p0WFFVMUhPMUZCUTBnc1dVRkJiMElzU1VGQldTeEZRVUZWTEUxQlFXOUNMRVZCUVZVc1dVRkJjMEk3V1VGRE4wWXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkVWeXhUUVVGSkxFZEJRVW9zU1VGQlNTeERRVUZSTzFsQlFWVXNWMEZCVFN4SFFVRk9MRTFCUVUwc1EwRkJZenRaUVVGVkxHbENRVUZaTEVkQlFWb3NXVUZCV1N4RFFVRlZPMWxCUlRkR0xHVkJRVXNzUTBGQlF5eERRVUZETEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxIRkNRVUZYTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJUdG5Ra0ZETDBNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3haUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZsQlFWa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBvc1EwRkJRenRMUVVORU8wbEJaRmtzYVVKQlFWVXNZVUZqZEVJc1EwRkJRVHRKUVVWRU96czdPenM3TzA5QlQwYzdTVUZEU0N4TlFVRmhMRWxCUVVzc1UwRkJVU3hsUVVGTE8xRkJhVUk1UWpzN08xZEJSMGM3VVVGRFNDeFpRVUZaTEUxQlFXMUNPMWxCUXpsQ0xFdEJRVXNzUlVGQlJTeERRVUZETzFsQmJrSkVMR2xDUVVGWkxFZEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTXNNRVJCUVRCRU8xbEJRMmhHTEdOQlFWTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1EwRkJReXh2UTBGQmIwTTdXVUZ0UWpsRUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NUVUZCVFN4RFFVRkRMRmxCUVZrc1EwRkJRenRaUVVWNFF5eE5RVUZOTEZGQlFWRXNSMEZCUnl4VlFVRlZMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVWQlFVVXNaMEpCUVZFc1EwRkJReXhEUVVGRE8xbEJRek5FTEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1pVRkJaU3hEUVVGRExFZEJRVWNzUTBGQlF5eFJRVUZSTEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNc1NVRkJTU3hyUWtGQlVTeEZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTXhSU3hKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEdWQlFXVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1VVRkJVU3hGUVVGRkxFZEJRVWNzUlVGQlJTeERRVUZETEVsQlFVa3NhMEpCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zVVVGQlVTeExRVUZMTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkZOMFlzU1VGQlNTeE5RVUZOTEVOQlFVTXNVVUZCVVN4SlFVRkpMRU5CUVVNc1QwRkJUeXhOUVVGTkxFTkJRVU1zVVVGQlVTeExRVUZMTEZOQlFWTXNRMEZCUXl4RlFVRkZPMmRDUVVNNVJDeE5RVUZOTEVOQlFVTXNVVUZCVVN4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFdEJRVXNzUlVGQlJTeEZRVUZGTzI5Q1FVTnFReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEYWtNc1EwRkJReXhEUVVGRExFTkJRVU03WVVGRFNEdFpRVVZFTEdWQlFXVXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUlVGQlJTeERRVUZETEZGQlFWRXNSVUZCUlN4TFFVRkxMRVZCUVVVc1JVRkJSVHRuUWtGRE0wUXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU1zVjBGQlZ5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRTFCUVUwc1JVRkJSU3hGUVVGRk8yOUNRVU12UXl4SlFVRkpMRTFCUVUwc1EwRkJReXhMUVVGTExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RlFVRkZPM2RDUVVOd1F5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dHhRa0ZETlVJN1owSkJRMFlzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTk1MRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJSVWdzU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzVFVGQlRTeERRVUZqTzJkQ1FVTTVReXhKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEVsQlFVazdaMEpCUTJwQ0xFMUJRVTBzUlVGQlJTeE5RVUZOTEVOQlFVTXNUVUZCVFR0blFrRkRja0lzU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpPMmRDUVVOcVFpeFBRVUZQTEVWQlFVVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1IwRkJSeXhGUVVGRkxFVkJRVVU3YjBKQlEzWkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN2IwSkJRMmhETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVN2QwSkJRMVlzVDBGQlR5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRmxCUVZrc1NVRkJTU3hKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXpzMFFrRkRha1FzU1VGQlNTeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenR4UWtGRGRrUTdiMEpCUTBRc1NVRkJTU3hEUVVGRExGTkJRVk1zUjBGQlJ5eEpRVUZKTEVOQlFVTTdiMEpCUTNSQ0xFMUJRVTBzVVVGQlVTeEhRVUZITEVsQlFVa3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUTJwR0xFbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NTMEZCU3l4RFFVRkRPMjlDUVVOMlFpeFBRVUZQTEZGQlFWRXNRMEZCUXp0blFrRkRha0lzUTBGQlF6dGhRVU5FTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTBvc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0WlFVTnlRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTXhRaXhEUVVGRE8xRkJSVVE3T3p0WFFVZEhPMUZCUTBnc1NVRkJTU3hMUVVGTE8xbEJRMUlzVDBGQlR5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRPMUZCUTNCQ0xFTkJRVU03VVVGRlJEczdWMEZGUnp0UlFVTklMRWxCUVVrc1VVRkJVVHRaUVVOWUxFOUJRVThzU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXp0UlFVTjJRaXhEUVVGRE8wdEJRMFE3U1VFM1JWa3NWMEZCU1N4UFFUWkZhRUlzUTBGQlFUdEpRVEJEUkN4TlFVRk5MRmxCUVdFc1UwRkJVU3hsUVVGTE8xRkJReTlDTEZsQlFXOUNMRTFCUVcxQ0xFVkJRVVVzVlVGQk5FSXNSVUZEYkVVc1ZVRkJOa0lzUlVGQlJTeFJRVUUwUWp0WlFVTTNSQ3hMUVVGTExFVkJRVVVzUTBGQlF6dFpRVVpYTEZkQlFVMHNSMEZCVGl4TlFVRk5MRU5CUVdFN1dVRkhkRU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMR2RDUVVGTkxFTkJRVU1zVlVGQlZTeEZRVUZGTEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROME1zVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVOdVFpeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhYUVVGWExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlR0blFrRkRla01zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVUU3V1VGRGVrSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOTUxFTkJRVU03UzBGRFJEdEJRVU5HTEVOQlFVTXNSVUZzV0ZNc1RVRkJUU3hMUVVGT0xFMUJRVTBzVVVGcldHWWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2x4dVRVbFVJRXhwWTJWdWMyVmNibHh1UTI5d2VYSnBaMmgwSUNoaktTQXlNREl3SUVWbmIzSWdUbVZ3YjIxdWVXRnpZMmhwYUZ4dVhHNVFaWEp0YVhOemFXOXVJR2x6SUdobGNtVmllU0JuY21GdWRHVmtMQ0JtY21WbElHOW1JR05vWVhKblpTd2dkRzhnWVc1NUlIQmxjbk52YmlCdlluUmhhVzVwYm1jZ1lTQmpiM0I1WEc1dlppQjBhR2x6SUhOdlpuUjNZWEpsSUdGdVpDQmhjM052WTJsaGRHVmtJR1J2WTNWdFpXNTBZWFJwYjI0Z1ptbHNaWE1nS0hSb1pTQmNJbE52Wm5SM1lYSmxYQ0lwTENCMGJ5QmtaV0ZzWEc1cGJpQjBhR1VnVTI5bWRIZGhjbVVnZDJsMGFHOTFkQ0J5WlhOMGNtbGpkR2x2Yml3Z2FXNWpiSFZrYVc1bklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpYRzUwYnlCMWMyVXNJR052Y0hrc0lHMXZaR2xtZVN3Z2JXVnlaMlVzSUhCMVlteHBjMmdzSUdScGMzUnlhV0oxZEdVc0lITjFZbXhwWTJWdWMyVXNJR0Z1WkM5dmNpQnpaV3hzWEc1amIzQnBaWE1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMQ0JoYm1RZ2RHOGdjR1Z5YldsMElIQmxjbk52Ym5NZ2RHOGdkMmh2YlNCMGFHVWdVMjltZEhkaGNtVWdhWE5jYm1aMWNtNXBjMmhsWkNCMGJ5QmtieUJ6Ynl3Z2MzVmlhbVZqZENCMGJ5QjBhR1VnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNWNibFJvWlNCaFltOTJaU0JqYjNCNWNtbG5hSFFnYm05MGFXTmxJR0Z1WkNCMGFHbHpJSEJsY20xcGMzTnBiMjRnYm05MGFXTmxJSE5vWVd4c0lHSmxJR2x1WTJ4MVpHVmtJR2x1SUdGc2JGeHVZMjl3YVdWeklHOXlJSE4xWW5OMFlXNTBhV0ZzSUhCdmNuUnBiMjV6SUc5bUlIUm9aU0JUYjJaMGQyRnlaUzVjYmx4dVZFaEZJRk5QUmxSWFFWSkZJRWxUSUZCU1QxWkpSRVZFSUZ3aVFWTWdTVk5jSWl3Z1YwbFVTRTlWVkNCWFFWSlNRVTVVV1NCUFJpQkJUbGtnUzBsT1JDd2dSVmhRVWtWVFV5QlBVbHh1U1UxUVRFbEZSQ3dnU1U1RFRGVkVTVTVISUVKVlZDQk9UMVFnVEVsTlNWUkZSQ0JVVHlCVVNFVWdWMEZTVWtGT1ZFbEZVeUJQUmlCTlJWSkRTRUZPVkVGQ1NVeEpWRmtzWEc1R1NWUk9SVk5USUVaUFVpQkJJRkJCVWxSSlExVk1RVklnVUZWU1VFOVRSU0JCVGtRZ1RrOU9TVTVHVWtsT1IwVk5SVTVVTGlCSlRpQk9UeUJGVmtWT1ZDQlRTRUZNVENCVVNFVmNia0ZWVkVoUFVsTWdUMUlnUTA5UVdWSkpSMGhVSUVoUFRFUkZVbE1nUWtVZ1RFbEJRa3hGSUVaUFVpQkJUbGtnUTB4QlNVMHNJRVJCVFVGSFJWTWdUMUlnVDFSSVJWSmNia3hKUVVKSlRFbFVXU3dnVjBoRlZFaEZVaUJKVGlCQlRpQkJRMVJKVDA0Z1QwWWdRMDlPVkZKQlExUXNJRlJQVWxRZ1QxSWdUMVJJUlZKWFNWTkZMQ0JCVWtsVFNVNUhJRVpTVDAwc1hHNVBWVlFnVDBZZ1QxSWdTVTRnUTA5T1RrVkRWRWxQVGlCWFNWUklJRlJJUlNCVFQwWlVWMEZTUlNCUFVpQlVTRVVnVlZORklFOVNJRTlVU0VWU0lFUkZRVXhKVGtkVElFbE9JRlJJUlZ4dVUwOUdWRmRCVWtVdVhHNHFMMXh1WEc1cGJYQnZjblFnS2lCaGN5QkJjbkpoZVZWMGFXeHpJR1p5YjIwZ0p5NHZRWEp5WVhsVmRHbHNjeWM3WEc1cGJYQnZjblFnUW1sdVpHRmliR1VnWm5KdmJTQW5MaTlDYVc1a1lXSnNaU2M3WEc1cGJYQnZjblFnUTJGdVkyVnNWRzlyWlc0Z1puSnZiU0JjSWk0dlEyRnVZMlZzVkc5clpXNWNJanRjYm1sdGNHOXlkQ0JEYkdGemN5Qm1jbTl0SUNjdUwwTnNZWE56Snp0Y2JtbHRjRzl5ZENCRGIyMXdiMjVsYm5RZ1puSnZiU0FuTGk5RGIyMXdiMjVsYm5Rbk8xeHVhVzF3YjNKMElFTnZjR2xsY2lCbWNtOXRJQ2N1TDBOdmNHbGxjaWM3WEc1cGJYQnZjblFnWkdWbVpYSWdabkp2YlNCY0lpNHZaR1ZtWlhKY0lqdGNibWx0Y0c5eWRDQkVaWE4wY205NVlXSnNaU0JtY205dElDY3VMMFJsYzNSeWIzbGhZbXhsSnp0Y2JtbHRjRzl5ZENCRWFXTjBhVzl1WVhKNUlHWnliMjBnSnk0dlJHbGpkR2x2Ym1GeWVTYzdYRzVwYlhCdmNuUWdLaUJoY3lCRWFXTjBhVzl1WVhKNVZYUnBiSE1nWm5KdmJTQW5MaTlFYVdOMGFXOXVZWEo1VlhScGJITW5PMXh1YVcxd2IzSjBJR2hoYzJnZ1puSnZiU0FuTGk5b1lYTm9KenRjYm1sdGNHOXlkQ0I3WkdWbWJpd2dhV1JsYm5ScGRIa3NJR2x6VG05MFRtbHNmU0JtY205dElDY3VMMmx1WkdWNEp6dGNibWx0Y0c5eWRDQkpVSEp2Y0dWeWRIa2dabkp2YlNBbkxpOUpVSEp2Y0dWeWRIa25PMXh1YVcxd2IzSjBJRkJ5YjNCbGNuUjVJR1p5YjIwZ0p5NHZVSEp2Y0dWeWRIa25PMXh1WEc0dktpcGNiaUFxSUZWU1RDQnliM1YwWlhJdUlFTnZiblpsY25SeklHbHVZMjl0YVc1bklIQmhjblFnYjJZZ1ZWSk1JQ2hvWVhOb0tTQjBieUJoSUhSaGNtZGxkQ0J2WW1wbFkzUWdZVzVrSUhCaGMzTmxjeUIwWVdsc0lITjBjbWx1WnlCMGJ5QnBkRnh1SUNvZ1ptOXlJR1oxY25Sb1pYSWdjbTkxZEdsdVp5NWNiaUFxTDF4dVkyeGhjM01nVW05MWRHVnlQRlFnWlhoMFpXNWtjeUJFWlhOMGNtOTVZV0pzWlQ0Z1pYaDBaVzVrY3lCRGJHRnpjeUI3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkp2ZFhSbGNpQnVZVzFsTGlCTmRYTjBJR0psSUdWeGRXRnNJSFJ2SUhSb1pTQnliM1YwWlNCdVlXMWxJR2x1SUhSb1pTQmdjR0Z5Wlc1MFlDQnliM1YwWlhJdUlGSmxjWFZwY21Wa0lHWnZjaUJ3Y205d1pYSWdZR2RsZEVaMWJHeFFZWFJvWUNCaGJtUmNibHgwSUNvZ1lISmxaR2x5WldOMFlDQnRaWFJvYjJRZ2NISnZZMlZ6YzJsdVp5NGdVbTl2ZENCeWIzVjBaWElnWkc5bGN5QnViM1FnYUdGMlpTQmhJRzVoYldVdVhHNWNkQ0FxTDF4dVhIUnlaV0ZrYjI1c2VTQnVZVzFsT2lCemRISnBibWM3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkJoY21WdWRDQnliM1YwWlhJdUlGSmxjWFZwY21Wa0lHWnZjaUJ3Y205d1pYSWdZR2RsZEVaMWJHeFFZWFJvWUNCaGJtUWdZSEpsWkdseVpXTjBZQ0J0WlhSb2IyUWdjSEp2WTJWemMybHVaeTRnVW05dmRDQnliM1YwWlhJZ1pHOWxjeUJ1YjNRZ2FHRjJaVnh1WEhRZ0tpQmhJSEJoY21WdWRDNWNibHgwSUNvdlhHNWNkSEpsWVdSdmJteDVJSEJoY21WdWREb2dVbTkxZEdWeVBHRnVlVDQ3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkJoZEdnZ2RHaGhkQ0IwYUdVZ2NtOTFkR1Z5SUdseklHSnZkVzVrSUhSdkxpQlFZWFJvSUdseklHRWdabWx1WVd3Z2NHRnlkQ0J2WmlCVlVrd2dLR2hoYzJncElISmxiR1YyWVc1MElIUnZJSFJvYVhOY2JseDBJQ29nY205MWRHVnlMaUJCYm5rZ2NHRjBhQ0JqYUdGdVoyVWdjbVZ6ZFd4MGN5QnBiaUJnZFhCa1lYUmxZQ0J0WlhSb2IyUWdZMkZzYkM1Y2JseDBJQ292WEc1Y2RISmxZV1J2Ym14NUlIQmhkR2c2SUVKcGJtUmhZbXhsUEhOMGNtbHVaejQ3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkJoZEdnZ2MyVndZWEpoZEc5eUlHWjFibU4wYVc5dUlIVnpaV1FnWW5rZ2RHaGxJSEp2ZFhSbGNpNWNibHgwSUNvdlhHNWNkSEpsWVdSdmJteDVJSE5sY0dGeVlYUnZjam9nVW05MWRHVnlMbE5sY0dGeVlYUnZjanRjYmx4dVhIUXZLaXBjYmx4MElDb2dVR0YwYUNCcWIybHVaWElnWm5WdVkzUnBiMjRnZFhObFpDQmllU0IwYUdVZ2NtOTFkR1Z5TGx4dVhIUWdLaTljYmx4MGNtVmhaRzl1YkhrZ2FtOXBibVZ5T2lCU2IzVjBaWEl1U205cGJtVnlPMXh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlNiM1YwWlNCb1lXNWtiR1Z5SUdaMWJtTjBhVzl1SUhWelpXUWdZbmtnZEdobElISnZkWFJsY2k1Y2JseDBJQ292WEc1Y2RISmxZV1J2Ym14NUlHaGhibVJzWlhJNklGSnZkWFJsY2k1SVlXNWtiR1Z5UEZRK08xeHVYRzVjZEM4cUtseHVYSFFnS2lCZ2MyVndZWEpoZEc5eVlDd2dZR3B2YVc1bGNtQWdZVzVrSUdCb1lXNWtiR1Z5WUNCallXeHNJSE5qYjNCbExseHVYSFFnS2k5Y2JseDBjbVZoWkc5dWJIa2djMk52Y0dVNklHRnVlVHRjYmx4dVhIUndjbWwyWVhSbElGOTBZWEpuWlhRNklFbFFjbTl3WlhKMGVUeFVQanRjYmx4MGNISnBkbUYwWlNCZmNtOTFkR1U2SUVsUWNtOXdaWEowZVR4emRISnBibWMrSUQwZ2JtVjNJRkJ5YjNCbGNuUjVQSE4wY21sdVp6NG9LVHRjYmx4MGNISnBkbUYwWlNCZllYSm5PaUJKVUhKdmNHVnlkSGs4YzNSeWFXNW5QaUE5SUc1bGR5QlFjbTl3WlhKMGVUeHpkSEpwYm1jK0tDazdYRzVjZEhCeWFYWmhkR1VnWDNWd1pHRjBhVzVuT2lCaWIyOXNaV0Z1SUQwZ1ptRnNjMlU3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRU55WldGMFpYTWdjbTkxZEdWeUlHbHVjM1JoYm1ObExpQlFiR1ZoYzJVZ2JtOTBhV05sSUhSb1lYUWdkR2hsSUhKdmRYUmxjaUJrYjJWemJpZDBJSEJ5YjJObGMzTWdZM1Z5Y21WdWRDQnliM1YwWlNCcGJXMWxaR2xoZEdWc2VTQnZibHh1WEhRZ0tpQnBibWwwYVdGc2FYcGhkR2x2Ymk0Z1ZHOGdjSEp2WTJWemN5QjBhR1VnY205MWRHVXNJR05oYkd3Z1lIVndaR0YwWldBZ2JXVjBhRzlrTGx4dVhIUWdLaUJBY0dGeVlXMGdZMjl1Wm1sbklGSnZkWFJsY2lCamIyNW1hV2QxY21GMGFXOXVMbHh1WEhRZ0tpOWNibHgwWTI5dWMzUnlkV04wYjNJb1kyOXVabWxuT2lCU2IzVjBaWEl1UTI5dVptbG5QRlErSUQwZ2UzMHBJSHRjYmx4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEhSb2FYTXVibUZ0WlNBOUlHTnZibVpwWnk1dVlXMWxPMXh1WEhSY2RIUm9hWE11Y0dGeVpXNTBJRDBnWTI5dVptbG5MbkJoY21WdWREdGNibHgwWEhScFppQW9LSFJvYVhNdWJtRnRaU0E5UFNCdWRXeHNLU0FoUFQwZ0tIUm9hWE11Y0dGeVpXNTBJRDA5SUc1MWJHd3BLU0I3WEc1Y2RGeDBYSFIwYUhKdmR5QnVaWGNnUlhKeWIzSW9YQ0pTYjNWMFpYSWdZMjl1Wm1sbmRYSmhkR2x2YmlCbGNuSnZjam9nZVc5MUlHaGhkbVVnYzNCbFkybG1hV1ZrSUhKdmRYUmxjaUJ1WVcxbElHOXlJSEJoY21WdWRDd2dZblYwSUdoaGRtVnVKM1FnYzNCbFkybG1hV1ZrSUdGdWIzUm9aWEl1SUZSb1pYTmxJSFIzYnlCdmNIUnBiMjV6SUcxMWMzUWdZMjl0WlNCMGIyZGxkR2hsY2k1Y0lpazdYRzVjZEZ4MGZWeHVYSFJjZEhSb2FYTXVjR0YwYUNBOUlHTnZibVpwWnk1d1lYUm9JSHg4SUc1bGR5QlFjbTl3WlhKMGVUeHpkSEpwYm1jK0tDazdJQzh2SUhkbElHUnZiaWQwSUc5M2JpQnBkQ0JpWldOaGRYTmxJR2wwY3lCMllXeDFaU0JwY3lCaVpXbHVaeUIxYzJWa0lHbHVJR1JsYzNSeWIzbFBZbXBsWTNRZ2JXVjBhRzlrSUMwZ1lXWjBaWElnYjNkdVlXZGxJSEJ2YjJ3Z2NtVnNaV0Z6YVc1blhHNWNkRngwZEdocGN5NXpaWEJoY21GMGIzSWdQU0JTYjNWMFpYSXViV0ZyWlZObGNHRnlZWFJ2Y2loamIyNW1hV2N1YzJWd1lYSmhkRzl5S1R0Y2JseDBYSFIwYUdsekxtcHZhVzVsY2lBOUlGSnZkWFJsY2k1dFlXdGxTbTlwYm1WeUtHTnZibVpwWnk1cWIybHVaWElwTzF4dVhIUmNkSFJvYVhNdWFHRnVaR3hsY2lBOUlGSnZkWFJsY2k1dFlXdGxTR0Z1Wkd4bGNpaGpiMjVtYVdjdWFHRnVaR3hsY2lrN1hHNWNkRngwZEdocGN5NXpZMjl3WlNBOUlHTnZibVpwWnk1elkyOXdaU0I4ZkNCMGFHbHpPMXh1WEhSY2RIUm9hWE11WDNSaGNtZGxkQ0E5SUdOdmJtWnBaeTUwWVhKblpYUWdmSHdnZEdocGN5NXZkMjRvYm1WM0lGQnliM0JsY25SNVBGUStLQ2twTzF4dVhIUmNkSFJvYVhNdWIzZHVLSFJvYVhNdWNHRjBhQzVqYUdGdVoyVkZkbVZ1ZEM1c2FYTjBaVzRvZEdocGN5NTFjR1JoZEdVc0lIUm9hWE1wS1R0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlNiM1YwWlhJZ2RHRnlaMlYwTGlCTllXbHVJSEIxY25CdmMyVWdiMllnZEdobElISnZkWFJsY2lCcGN5QjBieUJqYjI1MlpYSjBJR0J3WVhSb1lDQjBieUJnZEdGeVoyVjBZQzRnU1c0Z2NHRnlkR2xqZFd4aGNpd2dWVWxTYjNWMFpYSmNibHgwSUNvZ1kzSmxZWFJsY3lCRGIyMXdiMjVsYm5RZ2FXNXpkR0Z1WTJWeklHSmhjMlZrSUc5dUlHTjFjbkpsYm5RZ1lIQmhkR2hnSUhaaGJIVmxJSE52SUhsdmRTQmpiM1ZzWkNCeVpXNWtaWElnZEdobGJTNWNibHgwSUNvdlhHNWNkR2RsZENCMFlYSm5aWFFvS1RvZ1FtbHVaR0ZpYkdVOFZENGdlMXh1WEhSY2RISmxkSFZ5YmlCMGFHbHpMbDkwWVhKblpYUTdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nUTNWeWNtVnVkQ0J5YjNWMFpTNGdSbWx5YzNRZ1kyaDFibXNnYjJZZ2RHaGxJSEJoZEdnZ1pHVjBaV04wWldRZ1lua2dZSE5sY0dGeVlYUnZjbUFnWm5WdVkzUnBiMjR1SUZsdmRTQmpZVzRnZDJGMFkyZ2dkR2hwY3lCd2NtOXdaWEowZVZ4dVhIUWdLaUIwYnlCaFkzUnBkbUYwWlNCaGJtUWdaR1ZoWTNScGRtRjBaU0JwZEdWdGN5QnBiaUI1YjNWeUlHMWxiblV1WEc1Y2RDQXFMMXh1WEhSblpYUWdjbTkxZEdVb0tUb2dRbWx1WkdGaWJHVThjM1J5YVc1blBpQjdYRzVjZEZ4MGNtVjBkWEp1SUhSb2FYTXVYM0p2ZFhSbE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkpsYldGcGJtUmxjaUJ2WmlCamRYSnlaVzUwSUhKdmRYUmxJR0ZtZEdWeUlHQnpaWEJoY21GMGIzSmdJR1oxYm1OMGFXOXVJR05oYkd3dUlGUm9hWE1nY0hKdmNHVnlkSGtnYVhNZ2NHRnpjMlZrSUhSdklHQm9ZVzVrYkdWeVlGeHVYSFFnS2lCbWRXNWpkR2x2YmlCaGJtUWdZMkZ1SUdKbElIQmhjM05sWkNCdmRtVnlJSFJ2SUdOb2FXeGtJR052YlhCdmJtVnVkSE1nWm05eUlHWjFjblJvWlhJZ2NtOTFkR2x1Wnk1Y2JseDBJQ292WEc1Y2RHZGxkQ0JoY21jb0tUb2dRbWx1WkdGaWJHVThjM1J5YVc1blBpQjdYRzVjZEZ4MGNtVjBkWEp1SUhSb2FYTXVYMkZ5Wnp0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkFhVzVvWlhKcGRFUnZZMXh1WEhRZ0tpOWNibHgwWkdWemRISnZlVTlpYW1WamRDZ3BJSHRjYmx4MFhIUnBaaUFvZEdocGN5NWZkWEJrWVhScGJtY3BJSHRjYmx4MFhIUmNkSFJvY205M0lHNWxkeUJGY25KdmNpaGNJbEp2ZFhSbGNpQmpZVzRnYm05MElHSmxJR1JsYzNSeWIzbGxaQ0JrZFhKcGJtY2dhWFJ6SUhWd1pHRjBaU0JqZVdOc1pTNWNJaWs3WEc1Y2RGeDBmVnh1WEhSY2RHTnZibk4wSUhSaGNtZGxkQ0E5SUhSb2FYTXVYM1JoY21kbGRDNW5aWFFvS1R0Y2JseDBYSFJwWmlBb2RHRnlaMlYwSUNFOUlHNTFiR3dwSUh0Y2JseDBYSFJjZEhSaGNtZGxkQzVrWlhOMGNtOTVLQ2s3WEc1Y2RGeDBmVnh1WEhSY2RITjFjR1Z5TG1SbGMzUnliM2xQWW1wbFkzUW9LVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCSmMzTjFaWE1nY205MWRHVWdjSEp2WTJWemMybHVaeTVjYmx4MElDb3ZYRzVjZEhWd1pHRjBaU2dwSUh0Y2JseDBYSFJwWmlBb2RHaHBjeTVmZFhCa1lYUnBibWNwSUh0Y2JseDBYSFJjZEhSb2NtOTNJRzVsZHlCRmNuSnZjaWhjSWtOaGJpZDBJSFZ3WkdGMFpTQnliM1YwWlhJZ1ltVmpZWFZ6WlNCcGRITWdkWEJrWVhSbElHTjVZMnhsSUdseklHRnNjbVZoWkhrZ1lXTjBhWFpsTGlCY0lpQXJYRzVjZEZ4MFhIUmNkRndpVTNWbloyVnpkQ0IxYzJsdVp5QlNiM1YwWlhJdVVtVmthWEpsWTNSdmNpQnZjaUJ0YjNacGJtY2dWVkpNSUhKbFpHbHlaV04wYVc5dUlIUnZJR0Z1SUdGemVXNWpjbTl1YjNWeklHTmhiR3hpWVdOckxsd2lLVHRjYmx4MFhIUjlYRzVjZEZ4MGRHaHBjeTVmZFhCa1lYUnBibWNnUFNCMGNuVmxPMXh1WEhSY2RHTnZibk4wSUhCaGRHZ2dQU0IwYUdsekxuQmhkR2d1WjJWMEtDazdYRzVjZEZ4MFkyOXVjM1FnY0dGcGNqb2djM1J5YVc1blcxMGdQU0FvY0dGMGFDQTlQU0J1ZFd4c0tTQS9JRzUxYkd3Z09pQjBhR2x6TG5ObGNHRnlZWFJ2Y2k1allXeHNLSFJvYVhNdWMyTnZjR1VzSUhCaGRHZ3BPMXh1WEhSY2RHTnZibk4wSUhKdmRYUmxJRDBnS0hCaGFYSWdJVDBnYm5Wc2JDa2dQeUFvY0dGcGNsc3dYU0I4ZkNCY0lsd2lLU0E2SUZ3aVhDSTdYRzVjZEZ4MFkyOXVjM1FnWVhKbklEMGdLSEJoYVhJZ0lUMGdiblZzYkNrZ1B5QW9jR0ZwY2xzeFhTQjhmQ0J1ZFd4c0tTQTZJRzUxYkd3N1hHNWNkRngwYVdZZ0tISnZkWFJsSUQwOVBTQjBhR2x6TG5KdmRYUmxMbWRsZENncEtTQjdYRzVjZEZ4MFhIUjBhR2x6TGw5aGNtY3VjMlYwS0dGeVp5azdYRzVjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEdOdmJuTjBJSFJoY21kbGRDQTlJSFJvYVhNdWRHRnlaMlYwTG1kbGRDZ3BPMXh1WEhSY2RGeDBhV1lnS0hSaGNtZGxkQ0FoUFNCdWRXeHNLU0I3WEc1Y2RGeDBYSFJjZEhSb2FYTXVYM1JoY21kbGRDNXpaWFFvYm5Wc2JDazdYRzVjZEZ4MFhIUmNkSFJoY21kbGRDNWtaWE4wY205NUtDazdYRzVjZEZ4MFhIUjlYRzVjZEZ4MFhIUjBhR2x6TGw5aGNtY3VjMlYwS0dGeVp5azdYRzVjZEZ4MFhIUjBhR2x6TGw5eWIzVjBaUzV6WlhRb2NtOTFkR1VwTzF4dVhIUmNkRngwZEdocGN5NWZkR0Z5WjJWMExuTmxkQ2gwYUdsekxtaGhibVJzWlhJdVkyRnNiQ2gwYUdsekxuTmpiM0JsTENCeWIzVjBaU3dnZEdocGN5NWZZWEpuS1NCOGZDQnVkV3hzS1R0Y2JseDBYSFI5WEc1Y2RGeDBkR2hwY3k1ZmRYQmtZWFJwYm1jZ1BTQm1ZV3h6WlR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlNaWFIxY201eklIUm9aU0J5WlhOMWJIUWdiMllnWUdwdmFXNWxjbUFnWm5WdVkzUnBiMjRnWTJGc2JDQm1iM0lnZEdocGN5QnliM1YwWlhJdVhHNWNkQ0FxSUVCd1lYSmhiU0J5YjNWMFpTQlNiM1YwWlNCdVlXMWxMbHh1WEhRZ0tpQkFjR0Z5WVcwZ1lYSm5JRkpsYldGcGJtUmxjaUJ2WmlCMGFHVWdjR0YwYUM1Y2JseDBJQ29nUUhKbGRIVnlibk1nUm5Wc2JDQndZWFJvTGx4dVhIUWdLaTljYmx4MGFtOXBiaWh5YjNWMFpUb2djM1J5YVc1bkxDQmhjbWM2SUhOMGNtbHVaeWs2SUhOMGNtbHVaeUI3WEc1Y2RGeDBjbVYwZFhKdUlIUm9hWE11YW05cGJtVnlMbU5oYkd3b2RHaHBjeTV6WTI5d1pTd2djbTkxZEdVc0lHRnlaeWs3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1VtVjBkWEp1Y3lCbWRXeHNJSEJoZEdnZ1lYTWdkR2hsSUhKbGMzVnNkQ0J2WmlCZ2FtOXBibVZ5WUNCbWRXNWpkR2x2YmlCallXeHNJR2x1SUdCd1lYSmxiblJnSUhKdmRYUmxjaUIzYVhSb0lHQnVZVzFsWUNCd1lYTnpaV1FnWVhOY2JseDBJQ29nWUhKdmRYUmxZQ0JoYm1RZ1lIQmhkR2hnSUhCaGMzTmxaQ0JoY3lCZ1lYSm5ZQzRnVW1WMGRYSnVjeUJnY0dGMGFHQWdhV1lnZEdocGN5QnBjeUIwYUdVZ2NtOXZkQ0J5YjNWMFpYSXVYRzVjZENBcUlFQndZWEpoYlNCd1lYUm9JRkJoZEdnZ2NtVnNZWFJwZG1VZ2RHOGdkR2hwY3lCeWIzVjBaWEl1WEc1Y2RDQXFJRUJ5WlhSMWNtNXpJRVoxYkd3Z2NHRjBhQ0J5Wld4aGRHbDJaU0IwYnlCMGFHVWdjbTl2ZENCeWIzVjBaWEl1WEc1Y2RDQXFMMXh1WEhSblpYUkdkV3hzVUdGMGFDaHdZWFJvT2lCemRISnBibWNwT2lCemRISnBibWNnZTF4dVhIUmNkSEpsZEhWeWJpQjBhR2x6TG5CaGNtVnVkQ0EvSUhSb2FYTXVjR0Z5Wlc1MExtZGxkRVoxYkd4UVlYUm9LSFJvYVhNdWNHRnlaVzUwTG1wdmFXNG9kR2hwY3k1dVlXMWxMQ0J3WVhSb0tTa2dPaUJ3WVhSb08xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRWx0YldWa2FXRjBaV3g1SUhCbGNtWnZjbTF6SUhSb1pTQnlaV1JwY21WamRHbHZiaXdnYVM1bExpQnpaWFJ6SUdCb1lYTm9ZQ0IwYnlCZ1oyVjBSblZzYkZCaGRHZ29jR0YwYUNsZ0xseHVYSFFnS2lCQWNHRnlZVzBnY0dGMGFDQlFZWFJvSUhKbGJHRjBhWFpsSUhSdklIUm9hWE1nY205MWRHVnlMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2NtVndiR0ZqWlZOMFlYUmxJRkpsY0d4aFkyVWdkR2hsSUdOMWNuSmxiblFnWW5KdmQzTmxjaUJvYVhOMGIzSnBZMkZzSUhOMFlYUmxJSEpoZEdobGNpQjBhR0Z1SUhCMWMyaHBibWNnWVNCdVpYY2djM1JoZEdVZ2RHOGdkR2hsSUhOMFlXTnJMbHh1WEhRZ0tpOWNibHgwY21Wa2FYSmxZM1FvY0dGMGFEb2djM1J5YVc1bkxDQnlaWEJzWVdObFUzUmhkR1UvT2lCaWIyOXNaV0Z1S1NCN1hHNWNkRngwVW05MWRHVnlMbkpsWkdseVpXTjBLSEJoZEdnc0lIUm9hWE1zSUhKbGNHeGhZMlZUZEdGMFpTazdYRzVjZEgxY2JuMWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdVbTkxZEdWeU8xeHVYRzV1WVcxbGMzQmhZMlVnVW05MWRHVnlJSHRjYmx4MEx5b3FYRzVjZENBcUlFUmxabUYxYkhRZ2RtRnNkV1VnYjJZZ1lITmxjR0Z5WVhSdmNtQXVYRzVjZENBcUwxeHVYSFJsZUhCdmNuUWdZMjl1YzNRZ1JFVkdRVlZNVkY5VFJWQkJVa0ZVVDFJZ1BTQXZYbHhjTHlvb1cxNC9YRnd2WFNzcEtEODZYRnd2S0M0cUtYd29YRncvTGlvcEtUOGtMenRjYmx4dVhIUXZLaXBjYmx4MElDb2dSR1ZtWVhWc2RDQjJZV3gxWlNCdlppQmdhbTlwYm1WeVlDNWNibHgwSUNvdlhHNWNkR1Y0Y0c5eWRDQmpiMjV6ZENCRVJVWkJWVXhVWDBwUFNVNUZVaUE5SUZ3aUwxd2lPMXh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlRhV2R1WVhSMWNtVWdiMllnWUhObGNHRnlZWFJ2Y21BZ1puVnVZM1JwYjI0dUlGUm9aU0JtZFc1amRHbHZiaUJ6Y0d4cGRITWdjR0YwYUNCMGJ5QnliM1YwWlNCaGJtUWdZWEpuZFcxbGJuUXVJRlJvWlhKbFptOXlaU3dnYVhRZ2JYVnpkRnh1WEhRZ0tpQnlaWFIxY200Z2RIZHZJSE4wY21sdVp5QjJZV3gxWlhNdUlFbG1JR1oxYm1OMGFXOXVJSEpsZEhWeWJuTWdiblZzYkN3Z2FYUWdhWE1nWVhOemRXMWxaQ0IwYnlCaVpTQmJYQ0pjSWl3Z2JuVnNiRjB1WEc1Y2RDQXFMMXh1WEhSbGVIQnZjblFnYVc1MFpYSm1ZV05sSUZObGNHRnlZWFJ2Y2lCN1hHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1FIQmhjbUZ0SUhCaGRHZ2dSblZzYkNCd1lYUm9MbHh1WEhSY2RDQXFJRUJ5WlhSMWNtNXpJRkp2ZFhSbElHRnVaQ0JoY21kMWJXVnVkQzVjYmx4MFhIUWdLaTljYmx4MFhIUW9jR0YwYURvZ2MzUnlhVzVuS1RvZ2MzUnlhVzVuVzEwN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dVMmxuYm1GMGRYSmxJRzltSUdCcWIybHVaWEpnSUdaMWJtTjBhVzl1TGlCVWFHVWdablZ1WTNScGIyNGdhbTlwYm5NZ2NtOTFkR1VnWVc1a0lHRnlaM1Z0Wlc1MElIUnZJR0VnY0dGMGFDNWNibHgwSUNvdlhHNWNkR1Y0Y0c5eWRDQnBiblJsY21aaFkyVWdTbTlwYm1WeUlIdGNibHgwWEhRdktpcGNibHgwWEhRZ0tpQkFjR0Z5WVcwZ2NtOTFkR1VnVW05MWRHVXVYRzVjZEZ4MElDb2dRSEJoY21GdElHRnlaeUJCY21kMWJXVnVkQzVjYmx4MFhIUWdLaUJBY21WMGRYSnVjeUJHZFd4c0lIQmhkR2d1WEc1Y2RGeDBJQ292WEc1Y2RGeDBLSEp2ZFhSbE9pQnpkSEpwYm1jc0lHRnlaem9nYzNSeWFXNW5LVG9nYzNSeWFXNW5PMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUZOcFoyNWhkSFZ5WlNCdlppQmdhR0Z1Wkd4bGNtQWdaMlZ1WlhKaGJDMXdkWEp3YjNObElHWjFibU4wYVc5dUxpQlVhR1VnWm5WdVkzUnBiMjRnYldGd2N5QjBhR1VnYzNCbFkybG1hV1ZrSUhKdmRYUmxJSFJ2SUdFZ2RHRnlaMlYwSUc5aWFtVmpkRnh1WEhRZ0tpQW9kWE4xWVd4c2VTd2dRMjl0Y0c5dVpXNTBLU0JoYm1RZ2NHRnpjMlZ6SUdGeVozVnRaVzUwSUhSdklHbDBJR1p2Y2lCbWRYSjBhR1Z5SUhKdmRYUnBibWN1WEc1Y2RDQXFMMXh1WEhSbGVIQnZjblFnYVc1MFpYSm1ZV05sSUVoaGJtUnNaWEk4VkQ0Z2UxeHVYSFJjZEM4cUtseHVYSFJjZENBcUlFQndZWEpoYlNCeWIzVjBaU0JTYjNWMFpTNWNibHgwWEhRZ0tpQkFjR0Z5WVcwZ1lYSm5JRUZ5WjNWdFpXNTBMbHh1WEhSY2RDQXFJRUJ5WlhSMWNtNXpJRlJoY21kbGRDQnZZbXBsWTNRdVhHNWNkRngwSUNvdlhHNWNkRngwS0hKdmRYUmxPaUJ6ZEhKcGJtY3NJR0Z5WnpvZ1FtbHVaR0ZpYkdVOGMzUnlhVzVuUGlrNklGUTdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nVTJsbmJtRjBkWEpsSUc5bUlHRWdjMmx1WjJ4bElISnZkWFJsSUdsdUlHQm9ZVzVrYkdWeVlDQnZZbXBsWTNRdUlGUm9aU0JtZFc1amRHbHZiaUJ0WVhCeklHRWdjMmx1WjJ4bElISnZkWFJsSUhSdklHRWdkR0Z5WjJWMFhHNWNkQ0FxSUc5aWFtVmpkQ0FvZFhOMVlXeHNlU3dnUTI5dGNHOXVaVzUwS1NCaGJtUWdjR0Z6YzJWeklHRnlaM1Z0Wlc1MElIUnZJR2wwSUdadmNpQm1kWEowYUdWeUlISnZkWFJwYm1jdVhHNWNkQ0FxTDF4dVhIUmxlSEJ2Y25RZ2FXNTBaWEptWVdObElGSnZkWFJsUEZRK0lIdGNibHgwWEhRdktpcGNibHgwWEhRZ0tpQkFjR0Z5WVcwZ1lYSm5JRUZ5WjNWdFpXNTBMbHh1WEhSY2RDQXFJRUJ5WlhSMWNtNXpJRlJoY21kbGRDQnZZbXBsWTNRdVhHNWNkRngwSUNvdlhHNWNkRngwS0dGeVp6b2dRbWx1WkdGaWJHVThjM1J5YVc1blBpazZJRlE3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1VtOTFkR1Z5SUdoaGJtUnNaWElnWTI5dVptbG5kWEpoZEdsdmJpQnZZbXBsWTNRdVhHNWNkQ0FxTDF4dVhIUmxlSEJ2Y25RZ2FXNTBaWEptWVdObElFaGhibVJzWlhKRGIyNW1hV2M4VkQ0Z2UxeHVYSFJjZEM4cUtseHVYSFJjZENBcUlFMWhjQ0J2WmlCemNHVmphV1pwWXlCeWIzVjBaU0JvWVc1a2JHVnljeTRnU1dZZ1kzVnljbVZ1ZENCeWIzVjBaU0JwY3lCd2NtVnpaVzUwSUdsdUlIUm9hWE1nWkdsamRHbHZibUZ5ZVN3Z2RHaGxJSEp2ZFhSbGNpQmpZV3hzY3lCcGRITmNibHgwWEhRZ0tpQmpiM0p5WlhOd2IyNWthVzVuSUdoaGJtUnNaWElnWVc1a0lIQmhjM05sY3lCaGNtZDFiV1Z1ZENCMGJ5QnBkQzRnVW05MWRHVWdZVzVrSUdGeVozVnRaVzUwSUhSb1pXMXpaV3gyWlhNZ1lYSmxJR052YlhCMWRHVmtJSGRwZEdnZ1lITmxjR0Z5WVhSdmNtQmNibHgwWEhRZ0tpQmpZV3hzWW1GamF5NWNibHgwWEhRZ0tpOWNibHgwWEhSeVpXRmtiMjVzZVNCeWIzVjBaWE0vT2lCRWFXTjBhVzl1WVhKNVBGSnZkWFJsUEZRK1BqdGNibHh1WEhSY2RDOHFLbHh1WEhSY2RDQXFJRWxtSUc1dmJtVWdiMllnZEdobElHQnliM1YwWlhOZ0lHMWhkR05vWlhNZ1kzVnljbVZ1ZENCeWIzVjBaU3dnZEdobElISnZkWFJsY2lCallXeHNjeUIwYUdseklHaGhibVJzWlhJZ1kyRnNiR0poWTJzZ1lXNWtJSEJoYzNObGN5QmliM1JvWEc1Y2RGeDBJQ29nY205MWRHVWdZVzVrSUdGeVozVnRaVzUwSUhSdklHbDBMaUJDZVNCa1pXWmhkV3gwTENCeVpYUjFjbTV6SUc1MWJHd2dabTl5SUdGdWVTQnBibkIxZEM1Y2JseDBYSFFnS2k5Y2JseDBYSFJ5WldGa2IyNXNlU0J1YjNSR2IzVnVaRDg2SUVoaGJtUnNaWEk4VkQ0N1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dVbTkxZEdWeUlHTnZibVpwWjNWeVlYUnBiMjRnYjJKcVpXTjBMbHh1WEhRZ0tpOWNibHgwWlhod2IzSjBJR2x1ZEdWeVptRmpaU0JEYjI1bWFXYzhWRDRnZTF4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUZKdmRYUmxjaUJ1WVcxbExpQlNiM1YwWlhJZ2JtRnRaU0JwY3lCaElHTm9kVzVySUc5bUlIUm9aU0J3WVhSb0lIUm9ZWFFnWTJGMWMyVmtJSFJvYVhNZ2NtOTFkR1VnZEc4Z1oyVjBJR2x1YVhScFlXeHBlbVZrTGlCU2IyOTBJSEp2ZFhSbGNseHVYSFJjZENBcUlHUnZaWE51SjNRZ2FHRjJaU0JoSUc1aGJXVXVYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2JtRnRaVDg2SUhOMGNtbHVaenRjYmx4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUZCaGNtVnVkQ0J5YjNWMFpYSXVJRWwwSUhCeWIzWnBaR1Z6SUdCblpYUkdkV3hzVUdGMGFHQWdZVzVrSUdCeVpXUnBjbVZqZEdBZ2QybDBhQ0JoSUdOc2RXVWdZV0p2ZFhRZ1lXeHNJSEJoY25SeklHOW1JSFJvWlNCd1lYUm9MaUJKWmx4dVhIUmNkQ0FxSUhsdmRYSWdjbTkxZEdWeUlIQnliM1pwWkdWeklIbHZkU0IzYVhSb0lIZHliMjVuSUhCaGRHaHpMQ0JqYUdWamF5QmdibUZ0WldBZ1lXNWtJR0J3WVhKbGJuUmdJRzltSUdGc2JDQnliM1YwWlhKeklHbHVJSGx2ZFhJZ2FHbGxjbUZ5WTJoNUlDMGdkR2hsZVZ4dVhIUmNkQ0FxSUdGeVpTQnNhV3RsYkhrZ1lYTnphV2R1WldRZ2RHOGdkM0p2Ym1jZ2RtRnNkV1Z6TGlCU2IyOTBJSEp2ZFhSbGNpQmtiMlZ6YmlkMElHaGhkbVVnWVNCd1lYSmxiblF1WEc1Y2RGeDBJQ292WEc1Y2RGeDBjbVZoWkc5dWJIa2djR0Z5Wlc1MFB6b2dVbTkxZEdWeVBHRnVlVDQ3WEc1Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCUVlYUm9JSFJ2SUdKcGJtUWdkR2hsSUhKdmRYUmxjaUIwYnk0Z1VtOXZkQ0J5YjNWMFpYSWdjMmh2ZFd4a0lIVnpkV0ZzYkhrZ1oyVjBJR0p2ZFc1a0lIUnZJR0JvWVhOb1lDQndjbTl3WlhKMGVTNGdRMmhwYkdRZ2NtOTFkR1Z5Y3lCemFHOTFiR1JjYmx4MFhIUWdLaUJ5WldObGFYWmxJR0J3WVhSb1lDQm1jbTl0SUhSb1pXbHlJSEJoY21WdWRITXVYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2NHRjBhRDg2SUVKcGJtUmhZbXhsUEhOMGNtbHVaejQ3WEc1Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCVVlYSm5aWFFnY0hKdmNHVnlkSGt1SUZKdmRYUmxjaUJ3ZFhSeklIUm9aU0J5WlhOMWJIUWdiMllnWUdoaGJtUnNaWEpnSUdaMWJtTjBhVzl1SUdOaGJHd2dkRzhnZEdGeVoyVjBJSEJ5YjNCbGNuUjVMaUJKWmlCZ2RHRnlaMlYwWUNCcGMxeHVYSFJjZENBcUlHOXRhWFIwWldRc0lIUm9aU0J5YjNWMFpYSWdZM0psWVhSbGN5QnBkQ0JoZFhSdmJXRjBhV05oYkd4NUxpQlNiM1YwWlhJZ1lYVjBiMjFoZEdsallXeHNlU0JqYjI1MGNtOXNjeUIwYUdVZ2JHbG1aU0IwYVcxbElHOW1JSGx2ZFhJZ2RHRnlaMlYwY3l4Y2JseDBYSFFnS2lCemJ5d2dhV1lnZVc5MUlIQmhjM01nZVc5MWNpQndjbVZqY21WaGRHVmtJR0IwWVhKblpYUmdJSEJ5YjNCbGNuUjVJSFJ2SUdFZ1VtOTFkR1Z5TENCdFlXdGxJSE4xY21VZ2RHaGhkQ0JwZENCcGN5QnViM1FnWVdkbmNtVm5ZWFJwYm1jZ2FYUnpJSFpoYkhWbExGeHVYSFJjZENBcUlHa3VaUzRnWUc5M2JsWmhiSFZsWUNCdFpYUm9iMlFnYVhNZ2JtOTBJR05oYkd4bFpDNWNibHgwWEhRZ0tpOWNibHgwWEhSeVpXRmtiMjVzZVNCMFlYSm5aWFEvT2lCSlVISnZjR1Z5ZEhrOFZENDdYRzVjYmx4MFhIUXZLaXBjYmx4MFhIUWdLaUJRWVhSb0lITmxjR0Z5WVhSdmNpQm1kVzVqZEdsdmJpNGdVR0Z5YzJWeklHbHVZMjl0YVc1bklIQmhkR2dnZEc4Z2RIZHZJSFJ2YTJWdWN6b2djbTkxZEdVZ1lXNWtJR0Z5WjNWdFpXNTBMaUJTYjNWMFpTQm5aWFJ6SUhWelpXUWdkRzljYmx4MFhIUWdLaUJ3Y205alpYTnpJR0VnYzJsdVoyeGxJSEp2ZFhScGJtY2djM1JsY0NCaGJtUWdZM0psWVhSbElHRWdkR0Z5WjJWMExDQmhjbWQxYldWdWRDQm5aWFJ6SUhCaGMzTmxaQ0IwYnlCMGFHVWdkR0Z5WjJWMElHWnZjaUJtZFhKMGFHVnlJSEp2ZFhScGJtY3VYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2MyVndZWEpoZEc5eVB6b2dVMlZ3WVhKaGRHOXlJSHdnVW1WblJYaHdPMXh1WEc1Y2RGeDBMeW9xWEc1Y2RGeDBJQ29nVUdGMGFDQnFiMmx1WlhJdUlFOXdjRzl6YVhSbElIUnZJR0J6WlhCaGNtRjBiM0pnTGlCVmMyVmtJR2x1SUdCblpYUkdkV3hzVUdGMGFHQWdZVzVrSUdCeVpXUnBjbVZqZEdBZ2JXVjBhRzlrY3lCMGJ5QndjbTl3WlhKc2VTQmlkV2xzWkNCMGFHVmNibHgwWEhRZ0tpQndZWFJvTGlCS2IybHVjeUJwYm1OdmJXbHVaeUJ5YjNWMFpTQmhibVFnWVhKbmRXMWxiblFnZEc4Z1lTQm1kV3hzSUhCaGRHZ3VYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2FtOXBibVZ5UHpvZ1NtOXBibVZ5SUh3Z2MzUnlhVzVuTzF4dVhHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1VtOTFkR1VnYUdGdVpHeGxjaTRnVFdGd2N5QjBhR1VnY205MWRHVWdjM1J5YVc1bklIUnZJR0VnZEdGeVoyVjBJRzlpYW1WamRDQmhibVFnY0dGemMyVnpJR0Z5WjNWdFpXNTBJSFJ2SUdsMElHWnZjaUJtZFhKMGFHVnlJSEp2ZFhScGJtY3VYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2FHRnVaR3hsY2o4NklFaGhibVJzWlhJOFZENGdmQ0JJWVc1a2JHVnlRMjl1Wm1sblBGUStPMXh1WEc1Y2RGeDBMeW9xWEc1Y2RGeDBJQ29nWUhObGNHRnlZWFJ2Y21Bc0lHQnFiMmx1WlhKZ0lHRnVaQ0JnYUdGdVpHeGxjbUFnWTJGc2JDQnpZMjl3WlM1Y2JseDBYSFFnS2k5Y2JseDBYSFJ5WldGa2IyNXNlU0J6WTI5d1pUODZJR0Z1ZVR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkpaaUJnYzJWd1lYSmhkRzl5WUNCcGN5QmhJR1oxYm1OMGFXOXVMQ0J5WlhSMWNtNXpJR2wwSUdsdGJXVmthV0YwWld4NUxpQkZiSE5sSUdOdmJuWmxjblJ6SUhSb1pTQnpjR1ZqYVdacFpXUWdjbVZuZFd4aGNpQmxlSEJ5WlhOemFXOXVJSFJ2WEc1Y2RDQXFJR0VnWm5WdVkzUnBiMjRnWW5rZ2RHaGxJR1p2Ykd4dmQybHVaeUJ5ZFd4bE9pQlVhR1VnWm1seWMzUWdkRzlyWlc0Z0tDUXhLU0J2WmlCd1lYUm9JR2x6SUhWelpXUWdZWE1nWVNCeWIzVjBaU3dnWVc1a0lIUm9aU0J1WlhoMElHNXZiaTF1ZFd4c0lIUnZhMlZ1WEc1Y2RDQXFJQ2drTWlCdmNpQm1kWEowYUdWeUtTQnBjeUIxYzJWa0lHRnpJR0Z1SUdGeVozVnRaVzUwTGlCSlppQndZWFJvSUdseklHNTFiR3dzSUdsMElHbHpJR0Z6YzNWdFpXUWdkRzhnWW1VZ1hDSmNJaTVjYmx4MElDb2dRSEJoY21GdElITmxjR0Z5WVhSdmNpQkdkVzVqZEdsdmJpQnZjaUJ5WldkMWJHRnlJR1Y0Y0hKbGMzTnBiMjR1WEc1Y2RDQXFJRUJ5WlhSMWNtNXpJRk5sY0dGeVlYUnZjaUJtZFc1amRHbHZiaTVjYmx4MElDb3ZYRzVjZEdWNGNHOXlkQ0JtZFc1amRHbHZiaUJ0WVd0bFUyVndZWEpoZEc5eUtITmxjR0Z5WVhSdmNqb2dVMlZ3WVhKaGRHOXlJSHdnVW1WblJYaHdJRDBnUkVWR1FWVk1WRjlUUlZCQlVrRlVUMUlwT2lCVFpYQmhjbUYwYjNJZ2UxeHVYSFJjZEdsbUlDaDBlWEJsYjJZZ2MyVndZWEpoZEc5eUlEMDlQU0JjSW1aMWJtTjBhVzl1WENJcElIdGNibHgwWEhSY2RISmxkSFZ5YmlCelpYQmhjbUYwYjNJN1hHNWNkRngwZlZ4dVhIUmNkSEpsZEhWeWJpQm1kVzVqZEdsdmJpQW9jR0YwYURvZ2MzUnlhVzVuS1NCN1hHNWNkRngwWEhSamIyNXpkQ0J5WlhOMWJIUWdQU0J6WlhCaGNtRjBiM0l1WlhobFl5aHdZWFJvSUh4OElGd2lYQ0lwTzF4dVhIUmNkRngwY21WMGRYSnVJSEpsYzNWc2RDQS9JRnR5WlhOMWJIUmJNVjBzSUdSbFptNG9RWEp5WVhsVmRHbHNjeTVtYVc1a0tISmxjM1ZzZEM1emJHbGpaU2d5S1N3Z2FYTk9iM1JPYVd3cExDQnVkV3hzS1YwZ09pQnVkV3hzTzF4dVhIUmNkSDA3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1NXWWdZR3B2YVc1bGNtQWdhWE1nWVNCbWRXNWpkR2x2Yml3Z2NtVjBkWEp1Y3lCcGRDQnBiVzFsWkdsaGRHVnNlUzRnUld4elpTQmpiMjUyWlhKMGN5QjBhR1VnYzNCbFkybG1hV1ZrSUhOMGNtbHVaeUIwYnlCaElHWjFibU4wYVc5dUlHSjVJSFJvWlZ4dVhIUWdLaUJtYjJ4c2IzZHBibWNnY25Wc1pUb2dhbTlwYm5NZ2FXNWpiMjFwYm1jZ2NtOTFkR1V2WVhKbmRXMWxiblFnY0dGcGNpQjJhV0VnZEdobElITndaV05wWm1sbFpDQnpkSEpwYm1jdUlFeGxZV1JwYm1jZ2FtOXBibVZ5SUhONWJXSnZiSE1nYVc0Z1lYSm5kVzFsYm5SY2JseDBJQ29nWVhKbElIUnlhVzF0WldRdUlFbG1JR0Z5WjNWdFpXNTBJSE4wWVhKMGN5QjNhWFJvSUZ3aVAxd2lMQ0JxYjJsdVpYSWdjM2x0WW05c0lHbHpJRzV2ZENCaFpHUmxaQzRnU1dZZ1lYSm5kVzFsYm5RZ2FYTWdiblZzYkNCdmNpQmliR0Z1YXl3Z2NtVjBkWEp1YzF4dVhIUWdLaUJ5YjNWMFpTNWNibHgwSUNvZ1FIQmhjbUZ0SUdwdmFXNWxjaUJHZFc1amRHbHZiaUJ2Y2lCelpYQmhjbUYwYVc5dUlHTm9ZWEpoWTNSbGNpNWNibHgwSUNvZ1FISmxkSFZ5Ym5NZ1NtOXBibVZ5SUdaMWJtTjBhVzl1TGx4dVhIUWdLaTljYmx4MFpYaHdiM0owSUdaMWJtTjBhVzl1SUcxaGEyVktiMmx1WlhJb2FtOXBibVZ5T2lCS2IybHVaWElnZkNCemRISnBibWNnUFNCRVJVWkJWVXhVWDBwUFNVNUZVaWs2SUVwdmFXNWxjaUI3WEc1Y2RGeDBhV1lnS0hSNWNHVnZaaUJxYjJsdVpYSWdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dlMXh1WEhSY2RGeDBjbVYwZFhKdUlHcHZhVzVsY2p0Y2JseDBYSFI5WEc1Y2RGeDBZMjl1YzNRZ2RISnBiVzFsY2lBOUlHNWxkeUJTWldkRmVIQW9YQ0plS0Q4NlhDSWdLeUJxYjJsdVpYSXVjbVZ3YkdGalpTZ3ZXMXhjWEZ4ZUpDb3JQeTRvS1h4YlhGeGRlMzFkTDJjc0lDZGNYRnhjSkNZbktTQXJJRndpS1NwY0lpazdYRzVjZEZ4MGNtVjBkWEp1SUdaMWJtTjBhVzl1SUNoeWIzVjBaU3dnWVhKbktTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z0lXRnlaeUEvSUhKdmRYUmxJRG9nS0dGeVp5NWphR0Z5UVhRb01Da2dQVDA5SUZ3aVAxd2lLU0EvSUNoeWIzVjBaU0FySUdGeVp5a2dPaUFvY205MWRHVWdLeUJxYjJsdVpYSWdLeUJoY21jdWNtVndiR0ZqWlNoMGNtbHRiV1Z5TENCY0lsd2lLU2s3WEc1Y2RGeDBmVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCSlppQm9ZVzVrYkdWeUlHbHpJR0VnWm5WdVkzUnBiMjRzSUhKbGRIVnlibk1nYVhRZ2FXMXRaV1JwWVhSbGJIa3VJRVZzYzJVZ1kyOXVkbVZ5ZEhNZ2RHaGxJSE53WldOcFptbGxaQ0J2WW1wbFkzUWdkRzhnWVNCbWRXNWpkR2x2Ymk1Y2JseDBJQ29nUUhCaGNtRnRJR2hoYm1Sc1pYSWdTR0Z1Wkd4bGNpQmpiMjVtYVdkMWNtRjBhVzl1SUc5aWFtVmpkQzVjYmx4MElDb2dRSEpsZEhWeWJuTWdTR0Z1Wkd4bGNpQm1kVzVqZEdsdmJpNWNibHgwSUNvdlhHNWNkR1Y0Y0c5eWRDQm1kVzVqZEdsdmJpQnRZV3RsU0dGdVpHeGxjanhVUGlob1lXNWtiR1Z5T2lCSVlXNWtiR1Z5UEZRK0lId2dTR0Z1Wkd4bGNrTnZibVpwWnp4VVBpQTlJSHQ5S1RvZ1NHRnVaR3hsY2p4VVBpQjdYRzVjZEZ4MGFXWWdLSFI1Y0dWdlppQm9ZVzVrYkdWeUlEMDlQU0JjSW1aMWJtTjBhVzl1WENJcElIdGNibHgwWEhSY2RISmxkSFZ5YmlCb1lXNWtiR1Z5TzF4dVhIUmNkSDFjYmx4MFhIUmpiMjV6ZENCeWIzVjBaWE1nUFNCb1lXNWtiR1Z5TG5KdmRYUmxjeUI4ZkNCN2ZUdGNibHgwWEhSeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0hSb2FYTTZJR0Z1ZVN3Z2NtOTFkR1U2SUhOMGNtbHVaeXdnWVhKbk9pQkNhVzVrWVdKc1pUeHpkSEpwYm1jK0tUb2dWQ0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNGdjbTkxZEdWelczSnZkWFJsWFNBL0lISnZkWFJsYzF0eWIzVjBaVjB1WTJGc2JDaDBhR2x6TENCaGNtY3BJRHBjYmx4MFhIUmNkRngwYUdGdVpHeGxjaTV1YjNSR2IzVnVaQ0EvSUdoaGJtUnNaWEl1Ym05MFJtOTFibVF1WTJGc2JDaDBhR2x6TENCeWIzVjBaU3dnWVhKbktTQTZJRzUxYkd3N1hHNWNkRngwZlR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlNaWFIxY201eklHWjFiR3dnY0dGMGFDQmhjeUIwYUdVZ2NtVnpkV3gwSUc5bUlHQnFiMmx1WlhKZ0lHWjFibU4wYVc5dUlHTmhiR3dnYVc0Z1lIQmhjbVZ1ZEdBZ2IyWWdZSEp2ZFhSbGNtQWdkMmwwYUNCZ2JtRnRaV0FnY0dGemMyVmtJR0Z6WEc1Y2RDQXFJR0J5YjNWMFpXQWdZVzVrSUdCd1lYUm9ZQ0J3WVhOelpXUWdZWE1nWUdGeVoyQXVJRkpsZEhWeWJuTWdZSEJoZEdoZ0lHbG1JSFJvYVhNZ2FYTWdkR2hsSUhKdmIzUWdjbTkxZEdWeUxseHVYSFFnS2lCQWNHRnlZVzBnY0dGMGFDQlFZWFJvSUhKbGJHRjBhWFpsSUhSdklHQnliM1YwWlhKZ0xseHVYSFFnS2lCQWNHRnlZVzBnY205MWRHVnlJRU52YlhCMWRHVWdablZzYkNCd1lYUm9JSEpsYkdGMGFYWmxJSFJ2SUhSb2FYTWdjbTkxZEdWeUxseHVYSFFnS2lCQWNtVjBkWEp1Y3lCR2RXeHNJSEJoZEdnZ2NtVnNZWFJwZG1VZ2RHOGdkR2hsSUdCeWIzVjBaWEpnTGx4dVhIUWdLaTljYmx4MFpYaHdiM0owSUdaMWJtTjBhVzl1SUdkbGRFWjFiR3hRWVhSb0tIQmhkR2c2SUhOMGNtbHVaeXdnY205MWRHVnlQem9nVW05MWRHVnlQR0Z1ZVQ0cElIdGNibHgwWEhSeVpYUjFjbTRnY205MWRHVnlJRDhnY205MWRHVnlMbWRsZEVaMWJHeFFZWFJvS0hCaGRHZ3BJRG9nY0dGMGFEdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJKYlcxbFpHbGhkR1ZzZVNCd1pYSm1iM0p0Y3lCMGFHVWdjbVZrYVhKbFkzUnBiMjRzSUdrdVpTNGdjMlYwY3lCZ2FHRnphR0FnZEc4Z1lHZGxkRVoxYkd4UVlYUm9LSEJoZEdnc0lISnZkWFJsY2lsZ0xseHVYSFFnS2lCQWNHRnlZVzBnY0dGMGFDQlFZWFJvSUhKbGJHRjBhWFpsSUhSdklHQnliM1YwWlhKZ0xseHVYSFFnS2lCQWNHRnlZVzBnY205MWRHVnlJRkpsWkdseVpXTjBJSEpsYkdGMGFYWmxJSFJ2SUhSb2FYTWdjbTkxZEdWeUxseHVYSFFnS2lCQWNHRnlZVzBnY21Wd2JHRmpaVk4wWVhSbElGSmxjR3hoWTJVZ2RHaGxJR04xY25KbGJuUWdZbkp2ZDNObGNpQm9hWE4wYjNKcFkyRnNJSE4wWVhSbElISmhkR2hsY2lCMGFHRnVJSEIxYzJocGJtY2dZU0J1WlhjZ2MzUmhkR1VnZEc4Z2RHaGxJSE4wWVdOckxseHVYSFFnS2k5Y2JseDBaWGh3YjNKMElHWjFibU4wYVc5dUlISmxaR2x5WldOMEtIQmhkR2c2SUhOMGNtbHVaeXdnY205MWRHVnlQem9nVW05MWRHVnlQR0Z1ZVQ0c0lISmxjR3hoWTJWVGRHRjBaVDg2SUdKdmIyeGxZVzRwSUh0Y2JseDBYSFIwY25rZ2UxeHVYSFJjZEZ4MGNHRjBhQ0E5SUdkbGRFWjFiR3hRWVhSb0tIQmhkR2dzSUhKdmRYUmxjaWs3WEc1Y2RGeDBYSFJwWmlBb2FHRnphQzUxY0dSaGRHbHVaeWtnZTF4dVhIUmNkRngwWEhSMGFISnZkeUJ1WlhjZ1JYSnliM0lvWENKVmNHUmhkR1VnWTNsamJHVWdhWE1nWVd4eVpXRmtlU0JoWTNScGRtVXVJRndpSUN0Y2JseDBYSFJjZEZ4MFhIUmNJbE4xWjJkbGMzUWdkWE5wYm1jZ1VtOTFkR1Z5TGxKbFpHbHlaV04wYjNJZ2IzSWdiVzkyYVc1bklGVlNUQ0J5WldScGNtVmpkR2x2YmlCMGJ5QmhiaUJoYzNsdVkzSnZibTkxY3lCallXeHNZbUZqYXk1Y0lpazdYRzVjZEZ4MFhIUjlYRzVjZEZ4MGZTQmpZWFJqYUNBb1pTa2dlMXh1WEhSY2RGeDBkR2h5YjNjZ2JtVjNJRVZ5Y205eUtGd2lRMkZ1SUc1dmRDQndaWEptYjNKdElGVlNUQ0J5WldScGNtVmpkR2x2YmlCMGJ5QmNJaUFySUhCaGRHZ2dLeUJjSWpvZ1hDSWdLeUJsTG0xbGMzTmhaMlVwTzF4dVhIUmNkSDFjYmx4MFhIUm9ZWE5vTG5ObGRDaHdZWFJvTENCeVpYQnNZV05sVTNSaGRHVXBPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUZKbFkyOXRiV1Z1WkdWa0lIZGhlU0IwYnlCd1pYSm1iM0p0SUdGdUlHRnplVzVqY205dWIzVnpJSEpsWkdseVpXTjBhVzl1SUdsdUlGSnZkWFJsY2lCZ2FHRnVaR3hsY21BZ1puVnVZM1JwYjI0dVhHNWNkQ0FxTDF4dVhIUmxlSEJ2Y25RZ1kyeGhjM01nVW1Wa2FYSmxZM1J2Y2lCbGVIUmxibVJ6SUVOdmJYQnZibVZ1ZENCN1hHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1EzSmxZWFJsY3lCaElHNWxkeUJ5WldScGNtVmpkRzl5TGx4dVhIUmNkQ0FxSUVCd1lYSmhiU0J3WVhSb0lGQmhkR2dnY21Wc1lYUnBkbVVnZEc4Z2NtOTFkR1Z5TGx4dVhIUmNkQ0FxSUVCd1lYSmhiU0J5YjNWMFpYSWdVbVZrYVhKbFkzUWdjbVZzWVhScGRtVWdkRzhnZEdocGN5QnliM1YwWlhJdVhHNWNkRngwSUNvZ1FIQmhjbUZ0SUhKbGNHeGhZMlZUZEdGMFpTQlNaWEJzWVdObElIUm9aU0JqZFhKeVpXNTBJR0p5YjNkelpYSWdhR2x6ZEc5eWFXTmhiQ0J6ZEdGMFpTQnlZWFJvWlhJZ2RHaGhiaUJ3ZFhOb2FXNW5JR0VnYm1WM0lITjBZWFJsSUhSdklIUm9aVnh1WEhSY2RDQXFJSE4wWVdOckxpQkVaV1poZFd4MGN5QjBieUIwY25WbExseHVYSFJjZENBcUwxeHVYSFJjZEdOdmJuTjBjblZqZEc5eUtIQnlhWFpoZEdVZ2NHRjBhRG9nYzNSeWFXNW5MQ0J3Y21sMllYUmxJSEp2ZFhSbGNqODZJRkp2ZFhSbGNqeGhibmsrTENCd2NtbDJZWFJsSUhKbGNHeGhZMlZUZEdGMFpUODZJR0p2YjJ4bFlXNHBJSHRjYmx4MFhIUmNkSE4xY0dWeUtDazdYRzVjZEZ4MFhIUmtaV1psY2lnd0xDQjBhR2x6TG05M2JpaHVaWGNnUTJGdVkyVnNWRzlyWlc0b0tTa3BMblJvWlc0b0tDa2dQVDRnZTF4dVhIUmNkRngwWEhSeVpXUnBjbVZqZENoMGFHbHpMbkJoZEdnc0lIUm9hWE11Y205MWRHVnlMQ0JrWldadUtIUm9hWE11Y21Wd2JHRmpaVk4wWVhSbExDQjBjblZsS1NrN1hHNWNkRngwWEhSOUtUdGNibHgwWEhSOVhHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dRM0psWVhSbGN5QmhJSEp2ZFhSbGNpQjBhR0YwSUcxaGJtRm5aWE1nZEhkdklHMWhjSEJwYm1jZ2IyWWdjSEp2Y0dWeWRHbGxjenBjYmx4MElDcGNibHgwSUNvZ0tpQmdjR0YwYUhOZ0lIZG9hV05vSUdWNGNHOXpaWE1nYzNSeWFXNW5JSEJoZEdnZ2NISnZjR1Z5ZEdsbGN5Qm1iM0lnWTJocGJHUWdjbTkxZEdWeWN5QnBaaUJ1WldOalpYTnpZWEo1TzF4dVhIUWdLaUFxSUdCbGVIQmhibVJsWkdBZ2QyaHBZMmdnWlhod2IzTmxjeUJpYjI5c1pXRnVJRndpWlhod1lXNWtaV1JjSWlCd2NtOXdaWEowYVdWeklHWnZjaUJqYUdsc1pDQlZTU0J3WVc1bGJITXVYRzVjZENBcVhHNWNkQ0FxSUZSb2FYTWdZV3hzYjNkeklIbHZkU0IwYnlCeVpXNWtaWElnZVc5MWNpQmpiMjUwWlc1MElHRnpJR0VnWm1sNFpXUWdiR2x6ZENCdlppQndZVzVsYkhNZ2NtVndjbVZ6Wlc1MGFXNW5JSFJvWlNCamIyNWpkWEp5Wlc1MElISnZkWFJsY3k1Y2JseDBJQ292WEc1Y2RHVjRjRzl5ZENCamJHRnpjeUJPYjJSbElHVjRkR1Z1WkhNZ1EyeGhjM01nZTF4dVhIUmNkSEJ5YVhaaGRHVWdYM0JoZEdoek9pQkVhV04wYVc5dVlYSjVQRWxRY205d1pYSjBlVHh6ZEhKcGJtYytQanRjYmx4MFhIUndjbWwyWVhSbElGOWxlSEJoYm1SbFpEb2dSR2xqZEdsdmJtRnllVHhKVUhKdmNHVnlkSGs4WW05dmJHVmhiajQrTzF4dVhIUmNkSEJ5YVhaaGRHVWdYMmx1YVhScFlXeHBlbVZrSUQwZ1ptRnNjMlU3SUM4dklIVnpaV1FnZEc4Z1lYVjBieTFoWTNScGRtRjBaU0IwYUdVZ1ptbHljM1FnY205MWRHVWdiMjRnYVc1cGRHbGhiR2w2WVhScGIyNWNibHgwWEhSd2NtbDJZWFJsSUY5MWNHUmhkR2x1WnlBOUlHWmhiSE5sT3lBdkx5QjFjMlZrSUhSdklIQnlaWFpsYm5RZ2NtVmthWEpsWTNScGIyNGdaWEp5YjNKY2JseHVYSFJjZEM4cUtseHVYSFJjZENBcUlFUmxabUYxYkhRZ2NtOTFkR1VnZEdocGN5QnViMlJsSUhkaGN5QnBibWwwYVdGc2FYcGxaQ0IzYVhSb0xseHVYSFJjZENBcUwxeHVYSFJjZEhKbFlXUnZibXg1SUdSbFptRjFiSFJTYjNWMFpUb2djM1J5YVc1bk8xeHVYRzVjZEZ4MEx5b3FYRzVjZEZ4MElDb2dVbTkxZEdWeUlIUm9ZWFFnYldGdVlXZGxjeUIwYUdseklHNXZaR1V1SUU1dlpHVWdZM0psWVhSbGN5QjBhR2x6SUhKdmRYUmxjaUJoZFhSdmJXRjBhV05oYkd4NUxpQlpiM1VnYzJodmRXeGtJSEJoYzNNZ2RHaHBjeUJ5YjNWMFpYSWdkRzljYmx4MFhIUWdLaUJqYUdsc1pDQmpiMjF3YjI1bGJuUnpJR0Z6SUhSb1pXbHlJSEJoY21WdWRDQnliM1YwWlhJZ1ptOXlJR1oxY25Sb1pYSWdjbTkxZEdsdVp5NWNibHgwWEhRZ0tpOWNibHgwWEhSeVpXRmtiMjVzZVNCeWIzVjBaWEk2SUZKdmRYUmxjanhFWlhOMGNtOTVZV0pzWlQ0N1hHNWNibHgwWEhRdktpcGNibHgwWEhRZ0tpQkRjbVZoZEdWeklISnZkWFJsY2lCdWIyUmxMQ0JoYzNOcFoyNXpJR2wwY3lCd2NtOXdaWEowYVdWeklIUnZJR2x1YVhScFlXd2dkbUZzZFdWeklHRnVaQ0J6ZEdGeWRITWdjM2x1WTJoeWIyNXBlbUYwYVc5dUxseHVYSFJjZENBcUlFQndZWEpoYlNCamIyNW1hV2NnVG05a1pTQmpiMjVtYVdkMWNtRjBhVzl1TGx4dVhIUmNkQ0FxTDF4dVhIUmNkR052Ym5OMGNuVmpkRzl5S0dOdmJtWnBaem9nVG05a1pTNURiMjVtYVdjcElIdGNibHgwWEhSY2RITjFjR1Z5S0NrN1hHNWNkRngwWEhSMGFHbHpMbVJsWm1GMWJIUlNiM1YwWlNBOUlHTnZibVpwWnk1a1pXWmhkV3gwVW05MWRHVTdYRzVjYmx4MFhIUmNkR052Ym5OMElISnZkWFJsVFdGd0lEMGdRWEp5WVhsVmRHbHNjeTVwYm1SbGVDaGpiMjVtYVdjdWNtOTFkR1Z6TENCcFpHVnVkR2wwZVNrN1hHNWNkRngwWEhSMGFHbHpMbDl3WVhSb2N5QTlJRVJwWTNScGIyNWhjbmxWZEdsc2N5NXRZWEFvY205MWRHVk5ZWEFzSUNncElEMCtJRzVsZHlCUWNtOXdaWEowZVR4emRISnBibWMrS0NrcE8xeHVYSFJjZEZ4MGRHaHBjeTVmWlhod1lXNWtaV1FnUFNCRWFXTjBhVzl1WVhKNVZYUnBiSE11YldGd0tISnZkWFJsVFdGd0xDQW9LU0E5UGlCdVpYY2dVSEp2Y0dWeWRIa29ZMjl1Wm1sbkxtVjRjR0Z1WkdWa0lEMDlQU0IwY25WbEtTazdYRzVjYmx4MFhIUmNkR2xtSUNoamIyNW1hV2N1Wlhod1lXNWtaV1FnSmlZZ0tIUjVjR1Z2WmlCamIyNW1hV2N1Wlhod1lXNWtaV1FnSVQwOUlGd2lZbTl2YkdWaGJsd2lLU2tnZTF4dVhIUmNkRngwWEhSamIyNW1hV2N1Wlhod1lXNWtaV1F1Wm05eVJXRmphQ2dvY205MWRHVXBJRDArSUh0Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TGw5bGVIQmhibVJsWkZ0eWIzVjBaVjB1YzJWMEtIUnlkV1VwTzF4dVhIUmNkRngwWEhSOUtUdGNibHgwWEhSY2RIMWNibHh1WEhSY2RGeDBSR2xqZEdsdmJtRnllVlYwYVd4ekxtWnZja1ZoWTJnb2RHaHBjeTVmWlhod1lXNWtaV1FzSUNobGVIQmhibVJsWkN3Z2NtOTFkR1VwSUQwK0lIdGNibHgwWEhSY2RGeDBkR2hwY3k1dmQyNG9aWGh3WVc1a1pXUXVZMmhoYm1kbFJYWmxiblF1YkdsemRHVnVLQ2h3WVhKaGJYTXBJRDArSUh0Y2JseDBYSFJjZEZ4MFhIUnBaaUFvY0dGeVlXMXpMblpoYkhWbElDWW1JQ0YwYUdsekxsOTFjR1JoZEdsdVp5a2dlMXh1WEhSY2RGeDBYSFJjZEZ4MGRHaHBjeTV5YjNWMFpYSXVjbVZrYVhKbFkzUW9jbTkxZEdVcE8xeHVYSFJjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkRngwZlNrcE8xeHVYSFJjZEZ4MGZTazdYRzVjYmx4MFhIUmNkSFJvYVhNdWNtOTFkR1Z5SUQwZ2RHaHBjeTV2ZDI0b2JtVjNJRkp2ZFhSbGNqeEVaWE4wY205NVlXSnNaVDRvZTF4dVhIUmNkRngwWEhSdVlXMWxPaUJqYjI1bWFXY3VibUZ0WlN4Y2JseDBYSFJjZEZ4MGNHRnlaVzUwT2lCamIyNW1hV2N1Y0dGeVpXNTBMRnh1WEhSY2RGeDBYSFJ3WVhSb09pQmpiMjVtYVdjdWNHRjBhQ3hjYmx4MFhIUmNkRngwYUdGdVpHeGxjam9nS0hKdmRYUmxMQ0JoY21jcElEMCtJSHRjYmx4MFhIUmNkRngwWEhSamIyNXpkQ0J3WVhSb0lEMGdkR2hwY3k1ZmNHRjBhSE5iY205MWRHVmRPMXh1WEhSY2RGeDBYSFJjZEdsbUlDZ2hjR0YwYUNrZ2UxeHVYSFJjZEZ4MFhIUmNkRngwY21WMGRYSnVJQ2doZEdocGN5NWZhVzVwZEdsaGJHbDZaV1FnSmlZZ2RHaHBjeTVrWldaaGRXeDBVbTkxZEdVcElEOWNibHgwWEhSY2RGeDBYSFJjZEZ4MGJtVjNJRkpsWkdseVpXTjBiM0lvZEdocGN5NWtaV1poZFd4MFVtOTFkR1VzSUhSb2FYTXVjbTkxZEdWeUtTQTZJRzUxYkd3N1hHNWNkRngwWEhSY2RGeDBmVnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVYM1Z3WkdGMGFXNW5JRDBnZEhKMVpUdGNibHgwWEhSY2RGeDBYSFJqYjI1emRDQmxlSEJoYm1SbGNpQTlJRzVsZHlCT2IyUmxSWGh3WVc1a1pYSW9kR2hwY3k1eWIzVjBaWElzSUdGeVp5d2djR0YwYUN3Z2RHaHBjeTVmWlhod1lXNWtaV1JiY205MWRHVmRLVHRjYmx4MFhIUmNkRngwWEhSMGFHbHpMbDkxY0dSaGRHbHVaeUE5SUdaaGJITmxPMXh1WEhSY2RGeDBYSFJjZEhKbGRIVnliaUJsZUhCaGJtUmxjanRjYmx4MFhIUmNkRngwZlZ4dVhIUmNkRngwZlNrcE8xeHVYSFJjZEZ4MGRHaHBjeTV5YjNWMFpYSXVkWEJrWVhSbEtDazdYRzVjZEZ4MFhIUjBhR2x6TGw5cGJtbDBhV0ZzYVhwbFpDQTlJSFJ5ZFdVN1hHNWNkRngwZlZ4dVhHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1VISnZkbWxrWlhNZ2NHRjBhSE1nZEc4Z1ltbHVaQ0JqYUdsc1pDQnliM1YwWlhKeklIUnZMQ0JpZVNCdVlXMWxMaUJQYm14NUlHOXVaU0J5YjNWMFpTQnBjeUJoWTNScGRtVWdZWFFnWVNCMGFXMWxMQ0JpZFhRZ2RHaGxhWElnY0dGMGFITmNibHgwWEhRZ0tpQmhiSGRoZVhNZ1pYaHBjM1FnY21WbllYSmtiR1Z6Y3lCdlppQjBhR1ZwY2lCaFkzUnBkbWwwZVM1Y2JseDBYSFFnS2k5Y2JseDBYSFJuWlhRZ2NHRjBhSE1vS1RvZ1JHbGpkR2x2Ym1GeWVUeENhVzVrWVdKc1pUeHpkSEpwYm1jK1BpQjdYRzVjZEZ4MFhIUnlaWFIxY200Z2RHaHBjeTVmY0dGMGFITTdYRzVjZEZ4MGZWeHVYRzVjZEZ4MEx5b3FYRzVjZEZ4MElDb2dVSEp2ZG1sa1pYTWdYQ0psZUhCaGJtUmxaRndpSUdac1lXZHpJSFJ2SUdKcGJtUWdZMmhwYkdRZ2NHRnVaV3h6SUhSdkxDQmllU0J1WVcxbExpQlRkWEJ3YjNKMElIUjNieTEzWVhrZ1ltbHVaR2x1Wnk1Y2JseDBYSFFnS2k5Y2JseDBYSFJuWlhRZ1pYaHdZVzVrWldRb0tUb2dSR2xqZEdsdmJtRnllVHhKVUhKdmNHVnlkSGs4WW05dmJHVmhiajQrSUh0Y2JseDBYSFJjZEhKbGRIVnliaUIwYUdsekxsOWxlSEJoYm1SbFpEdGNibHgwWEhSOVhHNWNkSDFjYmx4dVhIUmxlSEJ2Y25RZ2JtRnRaWE53WVdObElFNXZaR1VnZTF4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUZKdmRYUmxjaTVPYjJSbElHTnZibVpwWjNWeVlYUnBiMjR1WEc1Y2RGeDBJQ292WEc1Y2RGeDBaWGh3YjNKMElHbHVkR1Z5Wm1GalpTQkRiMjVtYVdjZ2UxeHVYSFJjZEZ4MEx5b3FYRzVjZEZ4MFhIUWdLaUJTYjNWMFpYSWdibUZ0WlM1Y2JseDBYSFJjZENBcUwxeHVYSFJjZEZ4MGNtVmhaRzl1YkhrZ2JtRnRaVDg2SUhOMGNtbHVaenRjYmx4dVhIUmNkRngwTHlvcVhHNWNkRngwWEhRZ0tpQlFZWEpsYm5RZ2NtOTFkR1Z5TGx4dVhIUmNkRngwSUNvdlhHNWNkRngwWEhSeVpXRmtiMjVzZVNCd1lYSmxiblEvT2lCU2IzVjBaWEk4WVc1NVBqdGNibHh1WEhSY2RGeDBMeW9xWEc1Y2RGeDBYSFFnS2lCUVlYUm9JSFJ2SUdKcGJtUWdkR2hsSUhKdmRYUmxjaUIwYnk1Y2JseDBYSFJjZENBcUwxeHVYSFJjZEZ4MGNtVmhaRzl1YkhrZ2NHRjBhRDg2SUVKcGJtUmhZbXhsUEhOMGNtbHVaejQ3WEc1Y2JseDBYSFJjZEM4cUtseHVYSFJjZEZ4MElDb2dSbWw0WldRZ2JHbHpkQ0J2WmlCeWIzVjBaWE1nZEc4Z2JXRnVZV2RsSUdKNUlIUm9hWE1nYm05a1pTNGdSbTl5SUdWMlpYSjVJRzVoYldVZ2FXNGdkR2hwY3lCc2FYTjBMQ0JqYjNKeVpYTndiMjVrYVc1bklIQnliM0JsY25ScFpYTWdkMmxzYkNCaVpWeHVYSFJjZEZ4MElDb2dZM0psWVhSbFpDQnBiaUJnY0dGMGFITmdJR0Z1WkNCZ1pYaHdZVzVrWldSZ0lHUnBZM1JwYjI1aGNtbGxjeUJ2WmlCMGFHVWdibTlrWlM1Y2JseDBYSFJjZENBcUwxeHVYSFJjZEZ4MGNtVmhaRzl1YkhrZ2NtOTFkR1Z6T2lCemRISnBibWRiWFR0Y2JseHVYSFJjZEZ4MEx5b3FYRzVjZEZ4MFhIUWdLaUJKYm1sMGFXRnNJRndpWlhod1lXNWtaV1JjSWlCemRHRjBkWE1nYjJZZ2NtOTFkR1Z6SUc5eUlHbHVhWFJwWVd3Z2NtOTFkR1Z6SUhSdklHVjRjR0Z1WkM0Z1JHVm1ZWFZzZEhNZ2RHOGdabUZzYzJVZ0tHRnNiQ0J5YjNWMFpYTWdZWEpsWEc1Y2RGeDBYSFFnS2lCamIyeHNZWEJ6WldRcExseHVYSFJjZEZ4MElDb3ZYRzVjZEZ4MFhIUnlaV0ZrYjI1c2VTQmxlSEJoYm1SbFpEODZJR0p2YjJ4bFlXNGdmQ0J6ZEhKcGJtZGJYVHRjYmx4dVhIUmNkRngwTHlvcVhHNWNkRngwWEhRZ0tpQkVaV1poZFd4MElISnZkWFJsTGlCSlppQjBhR1VnYVc1cGRHbGhiQ0J3WVhSb0lHbHpJR0pzWVc1cklDaGNJbHdpS1N3Z2RHaGxJSEp2ZFhSbGNpQndaWEptYjNKdGN5QmhJSEpsWkdseVpXTjBhVzl1SUhSdklIUm9hWE1nY205MWRHVXNJR2t1WlM1Y2JseDBYSFJjZENBcUlHVjRjR0Z1WkhNZ2IyNWxJRzltSUhSb1pTQndZVzVsYkhNdUlFUnZaWE51SjNRZ2QyOXlheUJoWm5SbGNpQnBibWwwYVdGc2FYcGhkR2x2Ymk1Y2JseDBYSFJjZENBcUwxeHVYSFJjZEZ4MGNtVmhaRzl1YkhrZ1pHVm1ZWFZzZEZKdmRYUmxQem9nYzNSeWFXNW5PMXh1WEhSY2RIMWNibHgwZlZ4dVhHNWNkR05zWVhOeklFNXZaR1ZGZUhCaGJtUmxjaUJsZUhSbGJtUnpJRU5zWVhOeklIdGNibHgwWEhSamIyNXpkSEoxWTNSdmNpaHdjbWwyWVhSbElISnZkWFJsY2pvZ1VtOTFkR1Z5UEdGdWVUNHNJSE52ZFhKalpWQmhkR2c2SUVKcGJtUmhZbXhsUEhOMGNtbHVaejRzWEc1Y2RGeDBYSFJjZEZ4MGRHRnlaMlYwVUdGMGFEb2dTVkJ5YjNCbGNuUjVQSE4wY21sdVp6NHNJR1Y0Y0dGdVpHVmtPaUJKVUhKdmNHVnlkSGs4WW05dmJHVmhiajRwSUh0Y2JseDBYSFJjZEhOMWNHVnlLQ2s3WEc1Y2RGeDBYSFIwYUdsekxtOTNiaWh1WlhjZ1EyOXdhV1Z5S0hOdmRYSmpaVkJoZEdnc0lIUmhjbWRsZEZCaGRHZ3BLVHRjYmx4MFhIUmNkR1Y0Y0dGdVpHVmtMbk5sZENoMGNuVmxLVHRjYmx4MFhIUmNkSFJvYVhNdWIzZHVLR1Y0Y0dGdVpHVmtMbU5vWVc1blpVVjJaVzUwTG14cGMzUmxiaWdvS1NBOVBpQjdYRzVjZEZ4MFhIUmNkSFJvYVhNdWNtOTFkR1Z5TG5KbFpHbHlaV04wS0Z3aVhDSXBYRzVjZEZ4MFhIUjlLU2s3WEc1Y2RGeDBmVnh1WEhSOVhHNTlYRzRpWFgwPSIsIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgUm91dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUm91dGVyXCIpKTtcclxuLyoqXHJcbiAqIFNob3J0aGFuZCBmb3IgUm91dGVyPENvbXBvbmVudD4uXHJcbiAqL1xyXG5jbGFzcyBVSVJvdXRlciBleHRlbmRzIFJvdXRlcl8xLmRlZmF1bHQge1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFVJUm91dGVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWVWxTYjNWMFpYSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VlVsU2IzVjBaWEl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBWQmMwSkZPenM3T3p0QlFVZEdMSE5FUVVFNFFqdEJRVVU1UWpzN1IwRkZSenRCUVVOSUxFMUJRWEZDTEZGQlFWTXNVMEZCVVN4blFrRkJhVUk3UTBGRGRFUTdRVUZFUkN3eVFrRkRReUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNU5TVlFnVEdsalpXNXpaVnh1WEc1RGIzQjVjbWxuYUhRZ0tHTXBJREl3TWpBZ1JXZHZjaUJPWlhCdmJXNTVZWE5qYUdsb1hHNWNibEJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhJR052Y0hsY2JtOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxJRndpVTI5bWRIZGhjbVZjSWlrc0lIUnZJR1JsWVd4Y2JtbHVJSFJvWlNCVGIyWjBkMkZ5WlNCM2FYUm9iM1YwSUhKbGMzUnlhV04wYVc5dUxDQnBibU5zZFdScGJtY2dkMmwwYUc5MWRDQnNhVzFwZEdGMGFXOXVJSFJvWlNCeWFXZG9kSE5jYm5SdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN3Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd4Y2JtTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUWdjR1Z5YzI5dWN5QjBieUIzYUc5dElIUm9aU0JUYjJaMGQyRnlaU0JwYzF4dVpuVnlibWx6YUdWa0lIUnZJR1J2SUhOdkxDQnpkV0pxWldOMElIUnZJSFJvWlNCbWIyeHNiM2RwYm1jZ1kyOXVaR2wwYVc5dWN6cGNibHh1VkdobElHRmliM1psSUdOdmNIbHlhV2RvZENCdWIzUnBZMlVnWVc1a0lIUm9hWE1nY0dWeWJXbHpjMmx2YmlCdWIzUnBZMlVnYzJoaGJHd2dZbVVnYVc1amJIVmtaV1FnYVc0Z1lXeHNYRzVqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dVhHNVVTRVVnVTA5R1ZGZEJVa1VnU1ZNZ1VGSlBWa2xFUlVRZ1hDSkJVeUJKVTF3aUxDQlhTVlJJVDFWVUlGZEJVbEpCVGxSWklFOUdJRUZPV1NCTFNVNUVMQ0JGV0ZCU1JWTlRJRTlTWEc1SlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1FsVlVJRTVQVkNCTVNVMUpWRVZFSUZSUElGUklSU0JYUVZKU1FVNVVTVVZUSUU5R0lFMUZVa05JUVU1VVFVSkpURWxVV1N4Y2JrWkpWRTVGVTFNZ1JrOVNJRUVnVUVGU1ZFbERWVXhCVWlCUVZWSlFUMU5GSUVGT1JDQk9UMDVKVGtaU1NVNUhSVTFGVGxRdUlFbE9JRTVQSUVWV1JVNVVJRk5JUVV4TUlGUklSVnh1UVZWVVNFOVNVeUJQVWlCRFQxQlpVa2xIU0ZRZ1NFOU1SRVZTVXlCQ1JTQk1TVUZDVEVVZ1JrOVNJRUZPV1NCRFRFRkpUU3dnUkVGTlFVZEZVeUJQVWlCUFZFaEZVbHh1VEVsQlFrbE1TVlJaTENCWFNFVlVTRVZTSUVsT0lFRk9JRUZEVkVsUFRpQlBSaUJEVDA1VVVrRkRWQ3dnVkU5U1ZDQlBVaUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTeGNiazlWVkNCUFJpQlBVaUJKVGlCRFQwNU9SVU5VU1U5T0lGZEpWRWdnVkVoRklGTlBSbFJYUVZKRklFOVNJRlJJUlNCVlUwVWdUMUlnVDFSSVJWSWdSRVZCVEVsT1IxTWdTVTRnVkVoRlhHNVRUMFpVVjBGU1JTNWNiaW92WEc1Y2JtbHRjRzl5ZENCRGIyMXdiMjVsYm5RZ1puSnZiU0JjSWk0dlEyOXRjRzl1Wlc1MFhDSTdYRzVwYlhCdmNuUWdVbTkxZEdWeUlHWnliMjBnWENJdUwxSnZkWFJsY2x3aU8xeHVYRzR2S2lwY2JpQXFJRk5vYjNKMGFHRnVaQ0JtYjNJZ1VtOTFkR1Z5UEVOdmJYQnZibVZ1ZEQ0dVhHNGdLaTljYm1WNGNHOXlkQ0JrWldaaGRXeDBJR05zWVhOeklGVkpVbTkxZEdWeUlHVjRkR1Z1WkhNZ1VtOTFkR1Z5UEVOdmJYQnZibVZ1ZEQ0Z2UxeHVmVnh1SWwxOSIsIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ2FuY2VsVG9rZW5fMSA9IHJlcXVpcmUoXCIuL0NhbmNlbFRva2VuXCIpO1xyXG4vKipcclxuICogUHJvbWlzZSB3cmFwcGVyIG92ZXIgc2V0VGltZW91dCBmdW5jdGlvbiB3aXRoIENhbmNlbFRva2VuIHN1cHBvcnQuIFJlc29sdmVzIHRoZSBwcm9taXNlIGFmdGVyIHNwZWNpZmllZFxyXG4gKiBwZXJpb2Qgb2YgdGltZS4gTmV2ZXIgcmVqZWN0cyB0aGUgcHJvbWlzZS4gSWYgdGhlIG9wZXJhdGlvbiBnZXRzIGNhbmNlbGxlZCB2aWEgdGhlIHRva2VuLCB0aGUgcHJvbWlzZSBuZXZlciBnZXRzXHJcbiAqIHJlc29sdmVkIG9yIHJlamVjdGVkLlxyXG4gKiBAcGFyYW0gbXMgVGltZW91dCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXHJcbiAqIEBwYXJhbSBjYW5jZWxUb2tlbiBDYW5jZWxsYXRpb24gdG9rZW4gdG8gYmluZCB0aGUgb3BlcmF0aW9uIHRvLlxyXG4gKiBAcmV0dXJucyBQcm9taXNlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRpbWVvdXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0XzEobXMsIGNhbmNlbFRva2VuKSB7XHJcbiAgICBsZXQgdGltZW91dDtcclxuICAgIHJldHVybiBDYW5jZWxUb2tlbl8xLnJ1bkFzeW5jKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9LCBjYW5jZWxUb2tlbik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laR1ZtWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZaR1ZtWlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCT3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wVkJjMEpGT3p0QlFVVkdMQ3REUVVGdlJEdEJRVVZ3UkRzN096czdPenRIUVU5SE8wRkJRMGdzYlVKQlFYbENMRVZCUVZjc1JVRkJSU3hYUVVGNVFqdEpRVU01UkN4SlFVRkpMRTlCUVdVc1EwRkJRenRKUVVOd1FpeFBRVUZQTEhOQ1FVRlJMRU5CUTJRc1EwRkJReXhQUVVGcFJDeEZRVUZGTEVWQlFVVTdVVUZEY2tRc1QwRkJUeXhIUVVGSExFMUJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8wbEJRekZETEVOQlFVTXNSVUZEUkN4SFFVRkhMRVZCUVVVN1VVRkRTaXhaUVVGWkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZEZGtJc1EwRkJReXhGUVVORUxGZEJRVmNzUTBGRFdDeERRVUZETzBGQlEwZ3NRMEZCUXp0QlFWaEVMRFJDUVZkRElpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeXBjYmsxSlZDQk1hV05sYm5ObFhHNWNia052Y0hseWFXZG9kQ0FvWXlrZ01qQXlNQ0JGWjI5eUlFNWxjRzl0Ym5saGMyTm9hV2hjYmx4dVVHVnliV2x6YzJsdmJpQnBjeUJvWlhKbFlua2daM0poYm5SbFpDd2dabkpsWlNCdlppQmphR0Z5WjJVc0lIUnZJR0Z1ZVNCd1pYSnpiMjRnYjJKMFlXbHVhVzVuSUdFZ1kyOXdlVnh1YjJZZ2RHaHBjeUJ6YjJaMGQyRnlaU0JoYm1RZ1lYTnpiMk5wWVhSbFpDQmtiMk4xYldWdWRHRjBhVzl1SUdacGJHVnpJQ2gwYUdVZ1hDSlRiMlowZDJGeVpWd2lLU3dnZEc4Z1pHVmhiRnh1YVc0Z2RHaGxJRk52Wm5SM1lYSmxJSGRwZEdodmRYUWdjbVZ6ZEhKcFkzUnBiMjRzSUdsdVkyeDFaR2x1WnlCM2FYUm9iM1YwSUd4cGJXbDBZWFJwYjI0Z2RHaGxJSEpwWjJoMGMxeHVkRzhnZFhObExDQmpiM0I1TENCdGIyUnBabmtzSUcxbGNtZGxMQ0J3ZFdKc2FYTm9MQ0JrYVhOMGNtbGlkWFJsTENCemRXSnNhV05sYm5ObExDQmhibVF2YjNJZ2MyVnNiRnh1WTI5d2FXVnpJRzltSUhSb1pTQlRiMlowZDJGeVpTd2dZVzVrSUhSdklIQmxjbTFwZENCd1pYSnpiMjV6SUhSdklIZG9iMjBnZEdobElGTnZablIzWVhKbElHbHpYRzVtZFhKdWFYTm9aV1FnZEc4Z1pHOGdjMjhzSUhOMVltcGxZM1FnZEc4Z2RHaGxJR1p2Ykd4dmQybHVaeUJqYjI1a2FYUnBiMjV6T2x4dVhHNVVhR1VnWVdKdmRtVWdZMjl3ZVhKcFoyaDBJRzV2ZEdsalpTQmhibVFnZEdocGN5QndaWEp0YVhOemFXOXVJRzV2ZEdsalpTQnphR0ZzYkNCaVpTQnBibU5zZFdSbFpDQnBiaUJoYkd4Y2JtTnZjR2xsY3lCdmNpQnpkV0p6ZEdGdWRHbGhiQ0J3YjNKMGFXOXVjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXVYRzVjYmxSSVJTQlRUMFpVVjBGU1JTQkpVeUJRVWs5V1NVUkZSQ0JjSWtGVElFbFRYQ0lzSUZkSlZFaFBWVlFnVjBGU1VrRk9WRmtnVDBZZ1FVNVpJRXRKVGtRc0lFVllVRkpGVTFNZ1QxSmNia2xOVUV4SlJVUXNJRWxPUTB4VlJFbE9SeUJDVlZRZ1RrOVVJRXhKVFVsVVJVUWdWRThnVkVoRklGZEJVbEpCVGxSSlJWTWdUMFlnVFVWU1EwaEJUbFJCUWtsTVNWUlpMRnh1UmtsVVRrVlRVeUJHVDFJZ1FTQlFRVkpVU1VOVlRFRlNJRkJWVWxCUFUwVWdRVTVFSUU1UFRrbE9SbEpKVGtkRlRVVk9WQzRnU1U0Z1RrOGdSVlpGVGxRZ1UwaEJURXdnVkVoRlhHNUJWVlJJVDFKVElFOVNJRU5QVUZsU1NVZElWQ0JJVDB4RVJWSlRJRUpGSUV4SlFVSk1SU0JHVDFJZ1FVNVpJRU5NUVVsTkxDQkVRVTFCUjBWVElFOVNJRTlVU0VWU1hHNU1TVUZDU1V4SlZGa3NJRmRJUlZSSVJWSWdTVTRnUVU0Z1FVTlVTVTlPSUU5R0lFTlBUbFJTUVVOVUxDQlVUMUpVSUU5U0lFOVVTRVZTVjBsVFJTd2dRVkpKVTBsT1J5QkdVazlOTEZ4dVQxVlVJRTlHSUU5U0lFbE9JRU5QVGs1RlExUkpUMDRnVjBsVVNDQlVTRVVnVTA5R1ZGZEJVa1VnVDFJZ1ZFaEZJRlZUUlNCUFVpQlBWRWhGVWlCRVJVRk1TVTVIVXlCSlRpQlVTRVZjYmxOUFJsUlhRVkpGTGx4dUtpOWNibHh1YVcxd2IzSjBJRU5oYm1ObGJGUnZhMlZ1TENCN2NuVnVRWE41Ym1OOUlHWnliMjBnWENJdUwwTmhibU5sYkZSdmEyVnVYQ0k3WEc1Y2JpOHFLbHh1SUNvZ1VISnZiV2x6WlNCM2NtRndjR1Z5SUc5MlpYSWdjMlYwVkdsdFpXOTFkQ0JtZFc1amRHbHZiaUIzYVhSb0lFTmhibU5sYkZSdmEyVnVJSE4xY0hCdmNuUXVJRkpsYzI5c2RtVnpJSFJvWlNCd2NtOXRhWE5sSUdGbWRHVnlJSE53WldOcFptbGxaRnh1SUNvZ2NHVnlhVzlrSUc5bUlIUnBiV1V1SUU1bGRtVnlJSEpsYW1WamRITWdkR2hsSUhCeWIyMXBjMlV1SUVsbUlIUm9aU0J2Y0dWeVlYUnBiMjRnWjJWMGN5QmpZVzVqWld4c1pXUWdkbWxoSUhSb1pTQjBiMnRsYml3Z2RHaGxJSEJ5YjIxcGMyVWdibVYyWlhJZ1oyVjBjMXh1SUNvZ2NtVnpiMngyWldRZ2IzSWdjbVZxWldOMFpXUXVYRzRnS2lCQWNHRnlZVzBnYlhNZ1ZHbHRaVzkxZENCa2RYSmhkR2x2YmlCcGJpQnRhV3hzYVhObFkyOXVaSE11WEc0Z0tpQkFjR0Z5WVcwZ1kyRnVZMlZzVkc5clpXNGdRMkZ1WTJWc2JHRjBhVzl1SUhSdmEyVnVJSFJ2SUdKcGJtUWdkR2hsSUc5d1pYSmhkR2x2YmlCMGJ5NWNiaUFxSUVCeVpYUjFjbTV6SUZCeWIyMXBjMlVnYjJKcVpXTjBJSEpsY0hKbGMyVnVkR2x1WnlCMGFHVWdkR2x0Wlc5MWRDNWNiaUFxTDF4dVpYaHdiM0owSUdSbFptRjFiSFFnWm5WdVkzUnBiMjRnS0cxelB6b2diblZ0WW1WeUxDQmpZVzVqWld4VWIydGxiajg2SUVOaGJtTmxiRlJ2YTJWdUtUb2dVSEp2YldselpUeDJiMmxrUGlCN1hHNWNkR3hsZENCMGFXMWxiM1YwT2lCdWRXMWlaWEk3WEc1Y2RISmxkSFZ5YmlCeWRXNUJjM2x1WXp4MmIybGtQaWhjYmx4MFhIUW9jbVZ6YjJ4MlpUb2dLSFpoYkhWbFB6b2dLRkJ5YjIxcGMyVThkbTlwWkQ0Z2ZDQjJiMmxrS1NrZ1BUNGdkbTlwWkNrZ1BUNGdlMXh1WEhSY2RGeDBkR2x0Wlc5MWRDQTlJSGRwYm1SdmR5NXpaWFJVYVcxbGIzVjBLSEpsYzI5c2RtVXNJRzF6S1R0Y2JseDBYSFI5TEZ4dVhIUmNkQ2dwSUQwK0lIdGNibHgwWEhSY2RHTnNaV0Z5VkdsdFpXOTFkQ2gwYVcxbGIzVjBLVHRjYmx4MFhIUjlMRnh1WEhSY2RHTmhibU5sYkZSdmEyVnVYRzVjZENrN1hHNTlYRzRpWFgwPSIsIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QganF1ZXJ5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImpxdWVyeVwiKSk7XHJcbmNvbnN0IFByb3BlcnR5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUHJvcGVydHlcIikpO1xyXG5jbGFzcyBIYXNoIGV4dGVuZHMgUHJvcGVydHlfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKGxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcclxuICAgICAgICB0aGlzLnJlZGlyZWN0aW9uRGV0ZWN0aW9uSW50ZXJ2YWwgPSAxMDAwO1xyXG4gICAgICAgIHRoaXMucmVkaXJlY3Rpb25EZXRlY3Rpb25MaW1pdCA9IDI1O1xyXG4gICAgICAgIHRoaXMucmVkaXJlY3Rpb25TdGFydFRpbWUgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgdGhpcy5yZWRpcmVjdGlvblVybHMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlZGlyZWN0aW9uTG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICBpZiAoaGFzaCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhhc2ggaXMgYSBzaW5nbGV0b24uIFVuYWJsZSB0byBjcmVhdGUgbW9yZSBpbnN0YW5jZXMuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoYXNoID0gdGhpcztcclxuICAgICAgICBqcXVlcnlfMS5kZWZhdWx0KHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXQobG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IHVwZGF0aW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGluZztcclxuICAgIH1cclxuICAgIHNldCh2YWx1ZSA9IFwiXCIsIHJlcGxhY2VTdGF0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZGlyZWN0aW9uTG9ja2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgaWYgKHRpbWUgLSB0aGlzLnJlZGlyZWN0aW9uU3RhcnRUaW1lIDwgdGhpcy5yZWRpcmVjdGlvbkRldGVjdGlvbkludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3Rpb25VcmxzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWRpcmVjdGlvblVybHMubGVuZ3RoID4gdGhpcy5yZWRpcmVjdGlvbkRldGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRW5kbGVzcyBVUkwgcmVkaXJlY3Rpb24gZGV0ZWN0ZWQuIFByZXZlbnRpbmcgYWxsIGZ1cnRoZXIgcmVkaXJlY3Rpb25zLiBTZWUgVVJMcyBiZWxvdy4gXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiSWYgdGhpcyBpbmZvcm1hdGlvbiBpcyBub3QgZW5vdWdoLCBwbGVhc2Ugc2V0IGJyZWFrcG9pbnQgdG8gdGhpcyBtZXRob2QgYW5kIGZpbmQgb3V0IHdoYXQgY2F1c2VzIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBcInVuZXhwZWN0ZWQgcmVkaXJlY3Rpb24gY2FsbHMuIFByb2JhYmx5IHlvdSBoYXZlIG1pc2NvbmZpZ3VyZWQgc29tZSByb3V0ZXIgLSBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwbGVhc2UgY2hlY2sgcm91dGVyIG5hbWVzIGFuZCBwYXJlbnRzLlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVkaXJlY3Rpb25VcmxzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3Rpb25Mb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0aW9uU3RhcnRUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdGlvblVybHMgPSBbdmFsdWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmIChyZXBsYWNlU3RhdGUgJiYgd2luZG93Lmhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcclxuICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgXCJcIiwgbG9jYXRpb24ucGF0aG5hbWUgKyBcIiNcIiArIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIiNcIiArIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jaGFuZ2VFdmVudC50cmlnZ2VyKHsgc2VuZGVyOiB0aGlzLCB2YWx1ZSwgb2xkVmFsdWUgfSk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogSW5zdGFuY2Ugb2YgSUhhc2ggc2luZ2xldG9uLiBQcm92aWRlcyBhIHRyYW5zcGFyZW50IFByb3BlcnR5LWNvbXBhdGlibGUgaW50ZXJmYWNlIG92ZXIgYGxvY2F0aW9uLmhhc2hgXHJcbiAqIG1hbmlwdWxhdGlvbnMuIFZhbHVlIG9mIHRoaXMgcHJvcGVydHkgaXMgYWx3YXlzIGVxdWFsIHRvIGBsb2NhdGlvbi5oYXNoYCB3aXRob3V0IGxlYWRpbmcgXCIjXCIgc3ltYm9sLlxyXG4gKiBIYXMgYSBidWlsdC1pbiBwcm90ZWN0aW9uIGFnYWluc3QgaW5maW5pdGUgcmVkaXJlY3Rpb25zLlxyXG4gKi9cclxubGV0IGhhc2ggPSBudWxsOyAvLyBBbiBleHRyYSB2YXJpYWJsZSBoZWxwcyBJbnRlbGxpU2Vuc2UgdG8gZmluZCB0aGlzIGltcG9ydFxyXG5uZXcgSGFzaCgpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBoYXNoO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhR0Z6YUM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OW9ZWE5vTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0RlFYTkNSVHM3T3pzN1FVRkZSaXh2UkVGQk5FSTdRVUZGTlVJc01FUkJRV3RETzBGQmQwSnNReXhOUVVGTkxFbEJRVXNzVTBGQlVTeHJRa0ZCWjBJN1NVRlhiRU03VVVGRFF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFWWm1MR2xEUVVFMFFpeEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTndReXc0UWtGQmVVSXNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkZlRU1zZVVKQlFXOUNMRWRCUVVjc1RVRkJUU3hEUVVGRExHbENRVUZwUWl4RFFVRkRPMUZCUTJoRUxHOUNRVUZsTEVkQlFXRXNSVUZCUlN4RFFVRkRPMUZCUXk5Q0xITkNRVUZwUWl4SFFVRkhMRXRCUVVzc1EwRkJRenRSUVVVeFFpeGpRVUZUTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCU1hwQ0xFbEJRVWtzU1VGQlNTeEpRVUZKTEVsQlFVa3NSVUZCUlR0WlFVTnFRaXhOUVVGTkxFbEJRVWtzUzBGQlN5eERRVUZETEhWRVFVRjFSQ3hEUVVGRExFTkJRVUU3VTBGRGVFVTdVVUZEUkN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRMW9zWjBKQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zV1VGQldTeEZRVUZGTEVkQlFVY3NSVUZCUlR0WlFVTndReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYmtNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVUXNTVUZCU1N4UlFVRlJPMUZCUTFnc1QwRkJUeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzBsQlEzWkNMRU5CUVVNN1NVRkZSQ3hIUVVGSExFTkJRVU1zVVVGQlowSXNSVUZCUlN4RlFVRkZMRmxCUVhOQ08xRkJRemRETEVsQlFVa3NTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTzFsQlF6TkNMRTlCUVU4N1UwRkRVRHRSUVVORUxFMUJRVTBzVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkROVUlzU1VGQlNTeFJRVUZSTEV0QlFVc3NTMEZCU3l4RlFVRkZPMWxCUTNaQ0xFOUJRVTg3VTBGRFVEdFJRVVZFTEUxQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hGUVVGRkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdVVUZEYkVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETEc5Q1FVRnZRaXhIUVVGSExFbEJRVWtzUTBGQlF5dzBRa0ZCTkVJc1JVRkJSVHRaUVVONlJTeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFpRVU5xUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhsUVVGbExFTkJRVU1zVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXl4NVFrRkJlVUlzUlVGQlJUdG5Ra0ZEYWtVc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eDVSa0ZCZVVZN2IwSkJRM1JITEcxSFFVRnRSenR2UWtGRGJrY3NPRVZCUVRoRk8yOUNRVU01UlN4M1EwRkJkME1zUTBGQlF5eERRVUZETzJkQ1FVTXpReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJRenRuUWtGRGJFTXNTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeEhRVUZITEVsQlFVa3NRMEZCUXp0blFrRkRPVUlzVDBGQlR6dGhRVU5RTzFOQlEwUTdZVUZCVFR0WlFVTk9MRWxCUVVrc1EwRkJReXh2UWtGQmIwSXNSMEZCUnl4SlFVRkpMRU5CUVVNN1dVRkRha01zU1VGQlNTeERRVUZETEdWQlFXVXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xTkJReTlDTzFGQlJVUXNTVUZCU1N4RFFVRkRMRk5CUVZNc1IwRkJSeXhKUVVGSkxFTkJRVU03VVVGRGRFSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU03VVVGRGJrSXNTVUZCU1N4WlFVRlpMRWxCUVVrc1RVRkJUU3hEUVVGRExFOUJRVThzU1VGQlNTeFBRVUZQTEVOQlFVTXNXVUZCV1N4RlFVRkZPMWxCUXpORUxFOUJRVThzUTBGQlF5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RlFVRkZMRVZCUVVVc1JVRkJSU3hSUVVGUkxFTkJRVU1zVVVGQlVTeEhRVUZITEVkQlFVY3NSMEZCUnl4TFFVRkxMRU5CUVVNc1EwRkJRenRUUVVOb1JUdGhRVUZOTzFsQlEwNHNVVUZCVVN4RFFVRkRMRWxCUVVrc1IwRkJSeXhIUVVGSExFZEJRVWNzUzBGQlN5eERRVUZETzFOQlF6VkNPMUZCUTBRc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUXl4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRkxFdEJRVXNzUlVGQlJTeFJRVUZSTEVWQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpORUxFbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NTMEZCU3l4RFFVRkRPMGxCUTNoQ0xFTkJRVU03UTBGRFJEdEJRVVZFT3pzN08wZEJTVWM3UVVGRFNDeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMRU5CUVVNc1EwRkJReXd5UkVGQk1rUTdRVUZEYmtZc1NVRkJTU3hKUVVGSkxFVkJRVVVzUTBGQlF6dEJRVU5ZTEd0Q1FVRmxMRWxCUVVrc1EwRkJReUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNU5TVlFnVEdsalpXNXpaVnh1WEc1RGIzQjVjbWxuYUhRZ0tHTXBJREl3TWpBZ1JXZHZjaUJPWlhCdmJXNTVZWE5qYUdsb1hHNWNibEJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhJR052Y0hsY2JtOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxJRndpVTI5bWRIZGhjbVZjSWlrc0lIUnZJR1JsWVd4Y2JtbHVJSFJvWlNCVGIyWjBkMkZ5WlNCM2FYUm9iM1YwSUhKbGMzUnlhV04wYVc5dUxDQnBibU5zZFdScGJtY2dkMmwwYUc5MWRDQnNhVzFwZEdGMGFXOXVJSFJvWlNCeWFXZG9kSE5jYm5SdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN3Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd4Y2JtTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUWdjR1Z5YzI5dWN5QjBieUIzYUc5dElIUm9aU0JUYjJaMGQyRnlaU0JwYzF4dVpuVnlibWx6YUdWa0lIUnZJR1J2SUhOdkxDQnpkV0pxWldOMElIUnZJSFJvWlNCbWIyeHNiM2RwYm1jZ1kyOXVaR2wwYVc5dWN6cGNibHh1VkdobElHRmliM1psSUdOdmNIbHlhV2RvZENCdWIzUnBZMlVnWVc1a0lIUm9hWE1nY0dWeWJXbHpjMmx2YmlCdWIzUnBZMlVnYzJoaGJHd2dZbVVnYVc1amJIVmtaV1FnYVc0Z1lXeHNYRzVqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dVhHNVVTRVVnVTA5R1ZGZEJVa1VnU1ZNZ1VGSlBWa2xFUlVRZ1hDSkJVeUJKVTF3aUxDQlhTVlJJVDFWVUlGZEJVbEpCVGxSWklFOUdJRUZPV1NCTFNVNUVMQ0JGV0ZCU1JWTlRJRTlTWEc1SlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1FsVlVJRTVQVkNCTVNVMUpWRVZFSUZSUElGUklSU0JYUVZKU1FVNVVTVVZUSUU5R0lFMUZVa05JUVU1VVFVSkpURWxVV1N4Y2JrWkpWRTVGVTFNZ1JrOVNJRUVnVUVGU1ZFbERWVXhCVWlCUVZWSlFUMU5GSUVGT1JDQk9UMDVKVGtaU1NVNUhSVTFGVGxRdUlFbE9JRTVQSUVWV1JVNVVJRk5JUVV4TUlGUklSVnh1UVZWVVNFOVNVeUJQVWlCRFQxQlpVa2xIU0ZRZ1NFOU1SRVZTVXlCQ1JTQk1TVUZDVEVVZ1JrOVNJRUZPV1NCRFRFRkpUU3dnUkVGTlFVZEZVeUJQVWlCUFZFaEZVbHh1VEVsQlFrbE1TVlJaTENCWFNFVlVTRVZTSUVsT0lFRk9JRUZEVkVsUFRpQlBSaUJEVDA1VVVrRkRWQ3dnVkU5U1ZDQlBVaUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTeGNiazlWVkNCUFJpQlBVaUJKVGlCRFQwNU9SVU5VU1U5T0lGZEpWRWdnVkVoRklGTlBSbFJYUVZKRklFOVNJRlJJUlNCVlUwVWdUMUlnVDFSSVJWSWdSRVZCVEVsT1IxTWdTVTRnVkVoRlhHNVRUMFpVVjBGU1JTNWNiaW92WEc1Y2JtbHRjRzl5ZENCcVVYVmxjbmtnWm5KdmJTQmNJbXB4ZFdWeWVWd2lPMXh1YVcxd2IzSjBJRWxRY205d1pYSjBlU0JtY205dElGd2lMaTlKVUhKdmNHVnlkSGxjSWp0Y2JtbHRjRzl5ZENCUWNtOXdaWEowZVNCbWNtOXRJRndpTGk5UWNtOXdaWEowZVZ3aU8xeHVYRzR2S2lwY2JpQXFJRWx1ZEdWeVptRmpaU0J2WmlCZ2FHRnphR0FnYjJKcVpXTjBMaUJGZUhSbGJuTnBiMjRnYjJZZ1NWQnliM0JsY25SNVBITjBjbWx1Wno0Z2FXNTBaWEptWVdObElIZHBkR2dnWUhWd1pHRjBhVzVuWUNCemRHRjBkWE1nYVc1a2FXTmhkRzl5SUdGdVpGeHVJQ29nWUhKbGNHeGhZMlZUZEdGMFpXQWdiM0IwYVc5dVlXd2djR0Z5WVcxbGRHVnlJRzltSUdCelpYUmdJRzFsZEdodlpDNWNiaUFxTDF4dVpYaHdiM0owSUdsdWRHVnlabUZqWlNCSlNHRnphQ0JsZUhSbGJtUnpJRWxRY205d1pYSjBlVHh6ZEhKcGJtYytJSHRjYmx4dVhIUXZLaXBjYmx4MElDb2dTVzVrYVdOaGRHVnpJR2xtSUdoaGMyZ2dZWE56YVdkdWJXVnVkQ0JwY3lCcGJpQndjbTluY21WemN5QmhkQ0IwYUdVZ2JXOXRaVzUwTGlCWGFHbHNaU0JnZFhCa1lYUnBibWRnSUdseklIUnlkV1VzSUdCc2IyTmhkR2x2Ymk1b1lYTm9ZRnh1WEhRZ0tpQm5aWFJ6SUcxdlpHbG1hV1ZrSUdGdVpDQmdZMmhoYm1kbFJYWmxiblJnSUdkbGRITWdkSEpwWjJkbGNtVmtMaUJEYUdWamEybHVaeUIwYUdseklHWnNZV2NnYVc0Z1kyOXljbVZ6Y0c5dVpHbHVaeUJsZG1WdWRDQm9ZVzVrYkdWeWN5QnRZWGtnY0hKbGRtVnVkRnh1WEhRZ0tpQnBibVpwYm1sMFpTQnNiMjl3Y3lCaGJtUWdkVzVsZUhCbFkzUmxaQ0JqWVd4c1ltRmpheUJqYjI1bWJHbGpkSE11WEc1Y2RDQXFMMXh1WEhSeVpXRmtiMjVzZVNCMWNHUmhkR2x1WnpvZ1ltOXZiR1ZoYmp0Y2JseHVYSFF2S2lwY2JseDBJQ29nUVhOemFXZHVjeUJnYkc5allYUnBiMjR1YUdGemFHQWdkRzhnWVNCdVpYY2dkbUZzZFdVZ1lXNWtJSFJ5YVdkblpYSnpJR0JqYUdGdVoyVkZkbVZ1ZEdBdUlGSnBjMlZ6SUdCMWNHUmhkR2x1WjJBZ1pteGhaeUIwYnlCd2NtVjJaVzUwWEc1Y2RDQXFJR2x1Wm1sdWFYUmxJR3h2YjNCeklHRnVaQ0JqWVd4c1ltRmpheUJqYjI1bWJHbGpkSE1nWkhWeWFXNW5JSFJvYVhNZ2RHbHRaUzVjYmx4MElDb2dRSEJoY21GdElIWmhiSFZsSUU1bGR5Qm9ZWE5vSUhaaGJIVmxJSFJ2SUdGemMybG5iaTVjYmx4MElDb2dRSEJoY21GdElISmxjR3hoWTJWVGRHRjBaU0JTWlhCc1lXTmxJSFJvWlNCamRYSnlaVzUwSUdKeWIzZHpaWElnYUdsemRHOXlhV05oYkNCemRHRjBaU0J5WVhSb1pYSWdkR2hoYmlCd2RYTm9hVzVuSUdFZ2JtVjNJSE4wWVhSbElIUnZJSFJvWlNCemRHRmpheTVjYmx4MElDb3ZYRzVjZEhObGRDaDJZV3gxWlRvZ2MzUnlhVzVuTENCeVpYQnNZV05sVTNSaGRHVS9PaUJpYjI5c1pXRnVLVG9nZG05cFpEdGNibjFjYmx4dVkyeGhjM01nU0dGemFDQmxlSFJsYm1SeklGQnliM0JsY25SNVBITjBjbWx1Wno0Z2FXMXdiR1Z0Wlc1MGN5QkpTR0Z6YUNCN1hHNWNibHgwY0hKcGRtRjBaU0J5WldGa2IyNXNlU0J5WldScGNtVmpkR2x2YmtSbGRHVmpkR2x2YmtsdWRHVnlkbUZzSUQwZ01UQXdNRHRjYmx4MGNISnBkbUYwWlNCeVpXRmtiMjVzZVNCeVpXUnBjbVZqZEdsdmJrUmxkR1ZqZEdsdmJreHBiV2wwSUQwZ01qVTdYRzVjYmx4MGNISnBkbUYwWlNCeVpXUnBjbVZqZEdsdmJsTjBZWEowVkdsdFpTQTlJRTUxYldKbGNpNU9SVWRCVkVsV1JWOUpUa1pKVGtsVVdUdGNibHgwY0hKcGRtRjBaU0J5WldScGNtVmpkR2x2YmxWeWJITTZJSE4wY21sdVoxdGRJRDBnVzEwN1hHNWNkSEJ5YVhaaGRHVWdjbVZrYVhKbFkzUnBiMjVNYjJOclpXUWdQU0JtWVd4elpUdGNibHh1WEhSd2NtbDJZWFJsSUY5MWNHUmhkR2x1WnlBOUlHWmhiSE5sTzF4dVhHNWNkR052Ym5OMGNuVmpkRzl5S0NrZ2UxeHVYSFJjZEhOMWNHVnlLR3h2WTJGMGFXOXVMbWhoYzJndWMzVmljM1J5S0RFcEtUdGNibHgwWEhScFppQW9hR0Z6YUNBaFBTQnVkV3hzS1NCN1hHNWNkRngwWEhSMGFISnZkeUJ1WlhjZ1JYSnliM0lvWENKSVlYTm9JR2x6SUdFZ2MybHVaMnhsZEc5dUxpQlZibUZpYkdVZ2RHOGdZM0psWVhSbElHMXZjbVVnYVc1emRHRnVZMlZ6TGx3aUtWeHVYSFJjZEgxY2JseDBYSFJvWVhOb0lEMGdkR2hwY3p0Y2JseDBYSFJxVVhWbGNua29kMmx1Wkc5M0tTNXZiaWhjSW1oaGMyaGphR0Z1WjJWY0lpd2dLQ2tnUFQ0Z2UxeHVYSFJjZEZ4MGRHaHBjeTV6WlhRb2JHOWpZWFJwYjI0dWFHRnphQzV6ZFdKemRISW9NU2twTzF4dVhIUmNkSDBwTzF4dVhIUjlYRzVjYmx4MFoyVjBJSFZ3WkdGMGFXNW5LQ2tnZTF4dVhIUmNkSEpsZEhWeWJpQjBhR2x6TGw5MWNHUmhkR2x1Wnp0Y2JseDBmVnh1WEc1Y2RITmxkQ2gyWVd4MVpUb2djM1J5YVc1bklEMGdYQ0pjSWl3Z2NtVndiR0ZqWlZOMFlYUmxQem9nWW05dmJHVmhiaWtnZTF4dVhIUmNkR2xtSUNoMGFHbHpMbkpsWkdseVpXTjBhVzl1VEc5amEyVmtLU0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNDdYRzVjZEZ4MGZWeHVYSFJjZEdOdmJuTjBJRzlzWkZaaGJIVmxJRDBnZEdocGN5NTJZV3gxWlR0Y2JseDBYSFJwWmlBb2IyeGtWbUZzZFdVZ1BUMDlJSFpoYkhWbEtTQjdYRzVjZEZ4MFhIUnlaWFIxY200N1hHNWNkRngwZlZ4dVhHNWNkRngwWTI5dWMzUWdkR2x0WlNBOUlHNWxkeUJFWVhSbEtDa3VaMlYwVkdsdFpTZ3BPMXh1WEhSY2RHbG1JQ2gwYVcxbElDMGdkR2hwY3k1eVpXUnBjbVZqZEdsdmJsTjBZWEowVkdsdFpTQThJSFJvYVhNdWNtVmthWEpsWTNScGIyNUVaWFJsWTNScGIyNUpiblJsY25aaGJDa2dlMXh1WEhSY2RGeDBkR2hwY3k1eVpXUnBjbVZqZEdsdmJsVnliSE11Y0hWemFDaDJZV3gxWlNrN1hHNWNkRngwWEhScFppQW9kR2hwY3k1eVpXUnBjbVZqZEdsdmJsVnliSE11YkdWdVozUm9JRDRnZEdocGN5NXlaV1JwY21WamRHbHZia1JsZEdWamRHbHZia3hwYldsMEtTQjdYRzVjZEZ4MFhIUmNkR052Ym5OdmJHVXVaWEp5YjNJb1hDSkZibVJzWlhOeklGVlNUQ0J5WldScGNtVmpkR2x2YmlCa1pYUmxZM1JsWkM0Z1VISmxkbVZ1ZEdsdVp5QmhiR3dnWm5WeWRHaGxjaUJ5WldScGNtVmpkR2x2Ym5NdUlGTmxaU0JWVWt4eklHSmxiRzkzTGlCY0lpQXJYRzVjZEZ4MFhIUmNkRngwWENKSlppQjBhR2x6SUdsdVptOXliV0YwYVc5dUlHbHpJRzV2ZENCbGJtOTFaMmdzSUhCc1pXRnpaU0J6WlhRZ1luSmxZV3R3YjJsdWRDQjBieUIwYUdseklHMWxkR2h2WkNCaGJtUWdabWx1WkNCdmRYUWdkMmhoZENCallYVnpaWE1nWENJZ0sxeHVYSFJjZEZ4MFhIUmNkRndpZFc1bGVIQmxZM1JsWkNCeVpXUnBjbVZqZEdsdmJpQmpZV3hzY3k0Z1VISnZZbUZpYkhrZ2VXOTFJR2hoZG1VZ2JXbHpZMjl1Wm1sbmRYSmxaQ0J6YjIxbElISnZkWFJsY2lBdElGd2lJQ3RjYmx4MFhIUmNkRngwWEhSY0luQnNaV0Z6WlNCamFHVmpheUJ5YjNWMFpYSWdibUZ0WlhNZ1lXNWtJSEJoY21WdWRITXVYQ0lwTzF4dVhIUmNkRngwWEhSamIyNXpiMnhsTG14dlp5aDBhR2x6TG5KbFpHbHlaV04wYVc5dVZYSnNjeWs3WEc1Y2RGeDBYSFJjZEhSb2FYTXVjbVZrYVhKbFkzUnBiMjVNYjJOclpXUWdQU0IwY25WbE8xeHVYSFJjZEZ4MFhIUnlaWFIxY200N1hHNWNkRngwWEhSOVhHNWNkRngwZlNCbGJITmxJSHRjYmx4MFhIUmNkSFJvYVhNdWNtVmthWEpsWTNScGIyNVRkR0Z5ZEZScGJXVWdQU0IwYVcxbE8xeHVYSFJjZEZ4MGRHaHBjeTV5WldScGNtVmpkR2x2YmxWeWJITWdQU0JiZG1Gc2RXVmRPMXh1WEhSY2RIMWNibHh1WEhSY2RIUm9hWE11WDNWd1pHRjBhVzVuSUQwZ2RISjFaVHRjYmx4MFhIUjBhR2x6TG5aaGJIVmxJRDBnZG1Gc2RXVTdYRzVjZEZ4MGFXWWdLSEpsY0d4aFkyVlRkR0YwWlNBbUppQjNhVzVrYjNjdWFHbHpkRzl5ZVNBbUppQm9hWE4wYjNKNUxuSmxjR3hoWTJWVGRHRjBaU2tnZTF4dVhIUmNkRngwYUdsemRHOXllUzV5WlhCc1lXTmxVM1JoZEdVb2JuVnNiQ3dnWENKY0lpd2diRzlqWVhScGIyNHVjR0YwYUc1aGJXVWdLeUJjSWlOY0lpQXJJSFpoYkhWbEtUdGNibHgwWEhSOUlHVnNjMlVnZTF4dVhIUmNkRngwYkc5allYUnBiMjR1YUdGemFDQTlJRndpSTF3aUlDc2dkbUZzZFdVN1hHNWNkRngwZlZ4dVhIUmNkSFJvYVhNdVgyTm9ZVzVuWlVWMlpXNTBMblJ5YVdkblpYSW9lM05sYm1SbGNqb2dkR2hwY3l3Z2RtRnNkV1VzSUc5c1pGWmhiSFZsZlNrN1hHNWNkRngwZEdocGN5NWZkWEJrWVhScGJtY2dQU0JtWVd4elpUdGNibHgwZlZ4dWZWeHVYRzR2S2lwY2JpQXFJRWx1YzNSaGJtTmxJRzltSUVsSVlYTm9JSE5wYm1kc1pYUnZiaTRnVUhKdmRtbGtaWE1nWVNCMGNtRnVjM0JoY21WdWRDQlFjbTl3WlhKMGVTMWpiMjF3WVhScFlteGxJR2x1ZEdWeVptRmpaU0J2ZG1WeUlHQnNiMk5oZEdsdmJpNW9ZWE5vWUZ4dUlDb2diV0Z1YVhCMWJHRjBhVzl1Y3k0Z1ZtRnNkV1VnYjJZZ2RHaHBjeUJ3Y205d1pYSjBlU0JwY3lCaGJIZGhlWE1nWlhGMVlXd2dkRzhnWUd4dlkyRjBhVzl1TG1oaGMyaGdJSGRwZEdodmRYUWdiR1ZoWkdsdVp5QmNJaU5jSWlCemVXMWliMnd1WEc0Z0tpQklZWE1nWVNCaWRXbHNkQzFwYmlCd2NtOTBaV04wYVc5dUlHRm5ZV2x1YzNRZ2FXNW1hVzVwZEdVZ2NtVmthWEpsWTNScGIyNXpMbHh1SUNvdlhHNXNaWFFnYUdGemFEb2dTVWhoYzJnZ1BTQnVkV3hzT3lBdkx5QkJiaUJsZUhSeVlTQjJZWEpwWVdKc1pTQm9aV3h3Y3lCSmJuUmxiR3hwVTJWdWMyVWdkRzhnWm1sdVpDQjBhR2x6SUdsdGNHOXlkRnh1Ym1WM0lFaGhjMmdvS1R0Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdoaGMyZzdYRzRpWFgwPSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2IGp3aWQ9XFxcImhlYWRlclxcXCI+PGZvcm0gandpZD1cXFwidXJsLWZvcm1cXFwiPjxiPkN1cnJlbnQgVVJMIGhhc2g6PC9iPiAjXFxuXFx0XFx0XFx0PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGp3aWQ9XFxcInVybFxcXCI+PGlucHV0IHR5cGU9XFxcInN1Ym1pdFxcXCIgdmFsdWU9XFxcIkNoYW5nZSBub3chXFxcIj48L2Zvcm0+PGRpdj48Yj5QYWdlczo8L2I+PGEgandpZD1cXFwicm91dGVcXFwiIGRhdGEtcm91dGU9XFxcImluYm94XFxcIj5JbmJveDwvYT4gfFxcblxcdFxcdFxcdDxhIGp3aWQ9XFxcInJvdXRlXFxcIiBkYXRhLXJvdXRlPVxcXCJjb21wb3NlXFxcIj5Db21wb3NlPC9hPiB8XFxuXFx0XFx0XFx0PGEgandpZD1cXFwicm91dGVcXFwiIGRhdGEtcm91dGU9XFxcInNldHRpbmdzXFxcIj5TZXR0aW5nczwvYT48L2Rpdj48L2Rpdj48ZGl2IGp3aWQ9XFxcInBhZ2VcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBiaW5kVmFsIGZyb20gXCJqd2lkZ2V0L2JpbmRWYWxcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgaGFzaCBmcm9tIFwiandpZGdldC9oYXNoXCI7XG5pbXBvcnQgUm91dGVyIGZyb20gXCJqd2lkZ2V0L1JvdXRlclwiO1xuaW1wb3J0IFN3aXRjaGVyIGZyb20gXCJqd2lkZ2V0L1N3aXRjaGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBVSVJvdXRlciBmcm9tIFwiandpZGdldC9VSVJvdXRlclwiO1xuaW1wb3J0IENvbXBvc2UgZnJvbSBcIi4vQ29tcG9zZVwiO1xuaW1wb3J0IEluYm94IGZyb20gXCIuL0luYm94XCI7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSBcIi4vTm90Rm91bmRcIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi9TZXR0aW5nc1wiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgcm91dGVyOiBVSVJvdXRlcjtcblxuXHRwcm90ZWN0ZWQgYmVmb3JlUmVuZGVyKCkge1xuXHRcdHN1cGVyLmJlZm9yZVJlbmRlcigpO1xuXHRcdHRoaXMucm91dGVyID0gdGhpcy5vd24obmV3IFVJUm91dGVyKHtcblx0XHRcdHBhdGg6IGhhc2gsXG5cdFx0XHRoYW5kbGVyOiB7XG5cdFx0XHRcdHJvdXRlczoge1xuXHRcdFx0XHRcdFwiaW5ib3hcIjogYXJnID0+IG5ldyBJbmJveChhcmcsIHRoaXMucm91dGVyKSxcblx0XHRcdFx0XHRcImNvbXBvc2VcIjogKCkgPT4gbmV3IENvbXBvc2UoKSxcblx0XHRcdFx0XHRcInNldHRpbmdzXCI6ICgpID0+IG5ldyBTZXR0aW5ncygpLFxuXHRcdFx0XHRcdFwiXCI6ICgpID0+IG5ldyBSb3V0ZXIuUmVkaXJlY3RvcihcImluYm94XCIsIHRoaXMucm91dGVyKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRub3RGb3VuZDogcm91dGUgPT4gbmV3IE5vdEZvdW5kKHJvdXRlKVxuXHRcdFx0fVxuXHRcdH0pKTtcblx0XHR0aGlzLnJvdXRlci51cGRhdGUoKTtcblx0fVxuXG5cdC8vIFRoaXMgbWV0aG9kIHNpbXVsYXRlcyBicm93c2VyIHF1ZXJ5IHN0cmluZyBzdWJtaXR0aW5nXG5cdHByb3RlY3RlZCByZW5kZXJVcmxGb3JtKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcInN1Ym1pdFwiLCBldmVudCA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bG9jYXRpb24uaGFzaCA9IFwiI1wiICsgdGhpcy5nZXRFbGVtZW50KFwidXJsXCIpLnZhbCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gVGhpcyBtZXRob2Qgc2ltdWxhdGVzIGJyb3dzZXIgcXVlcnkgc3RyaW5nIG91dHB1dFxuXHRwcm90ZWN0ZWQgcmVuZGVyVXJsKGVsOiBKUXVlcnkpIHtcblx0XHR0aGlzLm93bihiaW5kVmFsKGVsLCBoYXNoKSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyUGFnZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5yb3V0ZXIudGFyZ2V0O1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclJvdXRlKGVsOiBKUXVlcnkpIHtcblx0XHQvLyBBc3NpZ24gaHJlZiBhdHRyaWJ1dGVzIHVzaW5nIGdldEZ1bGxQYXRoIG1ldGhvZFxuXHRcdGNvbnN0IHJvdXRlciA9IHRoaXMucm91dGVyO1xuXHRcdGVsLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3Qgcm91dGUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXJvdXRlXCIpO1xuXHRcdFx0JCh0aGlzKS5hdHRyKFwiaHJlZlwiLCBcIiNcIiArIHJvdXRlci5nZXRGdWxsUGF0aChyb3V0ZSkpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gVGhlIG5leHQgc3RydWN0dXJlIGhpZ2hsaWdodHMgdGhlIGFjdGl2ZSBtZW51IGl0ZW1cblx0XHRjb25zdCBhY3RpdmVFbGVtZW50ID0gdGhpcy5yb3V0ZXIucm91dGUubWFwKHJvdXRlID0+IGVsLmZpbHRlcignW2RhdGEtcm91dGU9XCInICsgcm91dGUgKyAnXCJdJykpO1xuXHRcdG5ldyBTd2l0Y2hlcihhY3RpdmVFbGVtZW50LCB7XG5cdFx0XHRpbml0OiBlbCA9PiBlbC5jc3MoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIiksXG5cdFx0XHRkb25lOiBlbCA9PiBlbC5jc3MoXCJmb250LXdlaWdodFwiLCBcIlwiKVxuXHRcdH0pO1xuXHR9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZSgnPHRleHRhcmVhIGp3Y2xhc3M9XCJjb21wb3NlXCIgY29scz1cIjgwXCIgcm93cz1cIjVcIj5Db21wb3NlIGVtYWlsISAodG8gYmUgZmFpciwgdGhpcyB0ZXh0IGFyZWEgaGFzIG5vIHJlYWwgcHVycG9zZSk8L3RleHRhcmVhPicpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb3NlIGV4dGVuZHMgQ29tcG9uZW50IHtcbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQge21hcExpc3R9IGZyb20gXCJqd2lkZ2V0L21hcHBlci9saXN0XCI7XG5pbXBvcnQgUmVhZG9ubHlMaXN0IGZyb20gXCJqd2lkZ2V0L1JlYWRvbmx5TGlzdFwiO1xuaW1wb3J0IEVtYWlsIGZyb20gXCIuL0VtYWlsXCI7XG5pbXBvcnQgRW1haWxMaXN0SXRlbSBmcm9tIFwiLi9FbWFpbExpc3RJdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYWlsTGlzdCBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbWFpbHM6IFJlYWRvbmx5TGlzdDxFbWFpbD4pIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclJvb3QoZWw6IEpRdWVyeSkge1xuXHRcdGVsLmFkZENsYXNzKFwiZW1haWwtbGlzdFwiKTtcblx0XHRyZXR1cm4gdGhpcy5vd24obWFwTGlzdCh0aGlzLmVtYWlscywgZW1haWwgPT4gbmV3IEVtYWlsTGlzdEl0ZW0oZW1haWwpKSk7XG5cdH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBFbWFpbCBmcm9tIFwiLi9FbWFpbFwiO1xuXG5AdGVtcGxhdGUoJzxhIGp3Y2xhc3M9XCJlbWFpbC1saXN0LWl0ZW1cIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPjwvYT4nKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1haWxMaXN0SXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbWFpbDogRW1haWwpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclJvb3QoZWw6IEpRdWVyeSkge1xuXHRcdGVsLnRleHQodGhpcy5lbWFpbC5zdW1tYXJ5KS5hdHRyKFwiaHJlZlwiLCBcIiNpbmJveC9cIiArIHRoaXMuZW1haWwuaWQpO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJlbWFpbC1ub3QtZm91bmRcXFwiPjxkaXY+RW1haWwgd2l0aCBpZCA8c3BhbiBqd2lkPVxcXCJpZFxcXCI+PC9zcGFuPiBpcyBub3QgZm91bmQ8L2Rpdj48ZGl2PjxhIGp3aWQ9XFxcImJhY2tcXFwiIGhyZWY9XFxcIiNcXFwiPkJhY2s8L2E+PC9kaXY+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcImp3aWRnZXQvUm91dGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmU8c3RyaW5nPihcIi4vRW1haWxOb3RGb3VuZC5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1haWxOb3RGb3VuZCBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBpZDogc3RyaW5nKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJJZChlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dCh0aGlzLmlkKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJCYWNrKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcImNsaWNrXCIsIGV2ZW50ID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIEluIHRoaXMgcGFydGljdWxhciBjYXNlIHdlIGtub3cgdGhhdCB0aGVyZSBpcyBubyByb3V0ZXIgYmVsb3csIHNvIHdlIGNhbiBza2lwXG5cdFx0XHQvLyByb3V0ZXIgc2VsZWN0aW9uIG9uIHJlZGlyZWN0aW9uLiBUaGUgbmV4dCBjYWxsIHVzZXMgYSBjdXJyZW50IHRvcCByb3V0ZXJcblx0XHRcdFJvdXRlci5yZWRpcmVjdChcImluYm94XCIpO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJlbWFpbFxcXCI+PGgzIGp3aWQ9XFxcInN1bW1hcnlcXFwiPjwvaDM+PGRpdiBqd2lkPVxcXCJjb250ZW50XFxcIj48L2Rpdj48ZGl2PjxhIGp3aWQ9XFxcImJhY2tcXFwiIGhyZWY9XFxcIiNcXFwiPkJhY2s8L2E+PC9kaXY+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcImp3aWRnZXQvUm91dGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBFbWFpbCBmcm9tIFwiLi9FbWFpbFwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9FbWFpbFZpZXcuancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYWlsVmlldyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbWFpbDogRW1haWwsIHByaXZhdGUgcGFyZW50Um91dGVyOiBSb3V0ZXI8YW55Pikge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyU3VtbWFyeShlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dCh0aGlzLmVtYWlsLnN1bW1hcnkpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckNvbnRlbnQoZWw6IEpRdWVyeSkge1xuXHRcdGVsLmh0bWwodGhpcy5lbWFpbC5jb250ZW50KTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJCYWNrKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcImNsaWNrXCIsIGV2ZW50ID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIElmIHlvdSBkb24ndCBrbm93IGV4YWN0bHkgaG93IG1hbnkgcm91dGVycyBjYW4gYmUgYWJvdmUgb3IgYmVsb3cgdGhpcyBjb21wb25lbnQsXG5cdFx0XHQvLyB1c2luZyBwYXJlbnQgcm91dGVyIG9uIHJlZGlyZWN0aW9uIGlzIGEgc21hcnQgY2hvaWNlXG5cdFx0XHR0aGlzLnBhcmVudFJvdXRlci5yZWRpcmVjdChcIlwiKTtcblx0XHR9KTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiaW5ib3hcXFwiPjxoMj5JbmJveDwvaDI+PGRpdiBqd2lkPVxcXCJjb250ZW50XFxcIj48L2Rpdj48L2Rpdj5cXG5cIjsiLCJpbXBvcnQge1NJTEVOVH0gZnJvbSBcImp3aWRnZXRcIjtcbmltcG9ydCBCaW5kYWJsZSBmcm9tIFwiandpZGdldC9CaW5kYWJsZVwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBMaXN0IGZyb20gXCJqd2lkZ2V0L0xpc3RcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcImp3aWRnZXQvUm91dGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBVSVJvdXRlciBmcm9tIFwiandpZGdldC9VSVJvdXRlclwiO1xuaW1wb3J0IHtFTUFJTFN9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBFbWFpbExpc3QgZnJvbSBcIi4vRW1haWxMaXN0XCI7XG5pbXBvcnQgRW1haWxOb3RGb3VuZCBmcm9tIFwiLi9FbWFpbE5vdEZvdW5kXCI7XG5pbXBvcnQgRW1haWxWaWV3IGZyb20gXCIuL0VtYWlsVmlld1wiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9JbmJveC5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgcm91dGVyOiBVSVJvdXRlcjtcblx0cHJpdmF0ZSBlbWFpbHMgPSBuZXcgTGlzdChFTUFJTFMsIGVtYWlsID0+IGVtYWlsLmlkLCBTSUxFTlQpO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aDogQmluZGFibGU8c3RyaW5nPiwgcHJpdmF0ZSBwYXJlbnRSb3V0ZXI6IFJvdXRlcjxhbnk+KSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBiZWZvcmVSZW5kZXIoKSB7XG5cdFx0c3VwZXIuYmVmb3JlUmVuZGVyKCk7XG5cdFx0dGhpcy5yb3V0ZXIgPSB0aGlzLm93bihuZXcgVUlSb3V0ZXIoe1xuXHRcdFx0bmFtZTogXCJpbmJveFwiLFxuXHRcdFx0cGFyZW50OiB0aGlzLnBhcmVudFJvdXRlcixcblx0XHRcdHBhdGg6IHRoaXMucGF0aCxcblx0XHRcdGhhbmRsZXI6IGlkID0+IHtcblx0XHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgRW1haWxMaXN0KHRoaXMuZW1haWxzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCBlbWFpbCA9IHRoaXMuZW1haWxzLmZpbmQoZW1haWwgPT4gZW1haWwuaWQgPT09IGlkKTtcblx0XHRcdFx0cmV0dXJuIGVtYWlsICE9IG51bGwgPyBuZXcgRW1haWxWaWV3KGVtYWlsLCB0aGlzLnJvdXRlcikgOiBuZXcgRW1haWxOb3RGb3VuZChpZCk7XG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdHRoaXMucm91dGVyLnVwZGF0ZSgpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckNvbnRlbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMucm91dGVyLnRhcmdldDtcblx0fVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IHN0cmluZykge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyUm9vdChlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dCgnVGhlIHJlcXVlc3RlZCBwYWdlIFwiJyArIHRoaXMucm91dGUgKyAnXCIgaXMgbm90IGZvdW5kJyk7XG5cdH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKCc8ZGl2IGp3Y2xhc3M9XCJzZXR0aW5nc1wiPlRoZXJlXFwncyBub3RoaW5nIHRvIGNvbmZpZ3VyZSE8L2Rpdj4nKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBDb21wb25lbnQge1xufVxuIiwiZXhwb3J0IGNvbnN0IEVNQUlMUyA9IFtcblx0e1xuXHRcdGlkOiBcIjFcIixcblx0XHRzdW1tYXJ5OiBcIkhlbGxvXCIsXG5cdFx0Y29udGVudDogXCJIZWxsbyB0aGVyZSFcIlxuXHR9LCB7XG5cdFx0aWQ6IFwiMlwiLFxuXHRcdHN1bW1hcnk6IFwiUm91dGVyXCIsXG5cdFx0Y29udGVudDogXCJSb3V0ZXIgaXMgYW4gaW1wb3J0YW50IHBhcnQgb2YgYW55IHNpbmdsZSBwYWdlIGFwcGxpY2F0aW9uIVwiXG5cdH1cbl07XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcInJvdXRlclwiLCBbXCJpbmRleC50c1wiLCBcImRhdGEudHNcIiwgXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJDb21wb3NlLnRzXCIsXG5cdFx0XCJFbWFpbC50c1wiLCBcIkVtYWlsTGlzdC50c1wiLCBcIkVtYWlsTGlzdEl0ZW0udHNcIiwgXCJFbWFpbE5vdEZvdW5kLnRzXCIsIFwiRW1haWxOb3RGb3VuZC5qdy5odG1sXCIsIFwiRW1haWxWaWV3LnRzXCIsXG5cdFx0XCJFbWFpbFZpZXcuancuaHRtbFwiLCBcIkluYm94LnRzXCIsIFwiSW5ib3guancuaHRtbFwiLCBcIk5vdEZvdW5kLnRzXCIsIFwiU2V0dGluZ3MudHNcIl0pO1xuXG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==