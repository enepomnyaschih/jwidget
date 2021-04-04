(self["webpackChunk"] = self["webpackChunk"] || []).push([["router"],{

/***/ "./router/Application.jw.html":
/*!************************************!*\
  !*** ./router/Application.jw.html ***!
  \************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"application\"><div jwid=\"header\"><form jwid=\"url-form\"><b>Current URL hash:</b> #\n\t\t\t<input type=\"text\" jwid=\"url\"><input type=\"submit\" value=\"Change now!\"></form><div><b>Pages:</b><a jwid=\"route\" data-route=\"inbox\">Inbox</a> |\n\t\t\t<a jwid=\"route\" data-route=\"compose\">Compose</a> |\n\t\t\t<a jwid=\"route\" data-route=\"settings\">Settings</a></div></div><div jwid=\"page\"></div></div>\n";

/***/ }),

/***/ "./router/EmailNotFound.jw.html":
/*!**************************************!*\
  !*** ./router/EmailNotFound.jw.html ***!
  \**************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"email-not-found\"><div>Email with id <span jwid=\"id\"></span> is not found</div><div><a jwid=\"back\" href=\"#\">Back</a></div></div>\n";

/***/ }),

/***/ "./router/EmailView.jw.html":
/*!**********************************!*\
  !*** ./router/EmailView.jw.html ***!
  \**********************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"email\"><h3 jwid=\"summary\"></h3><div jwid=\"content\"></div><div><a jwid=\"back\" href=\"#\">Back</a></div></div>\n";

/***/ }),

/***/ "./router/Inbox.jw.html":
/*!******************************!*\
  !*** ./router/Inbox.jw.html ***!
  \******************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"inbox\"><h2>Inbox</h2><div jwid=\"content\"></div></div>\n";

/***/ }),

/***/ "../../main/dist/RouteRedirector.js":
/*!******************************************!*\
  !*** ../../main/dist/RouteRedirector.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.redirectRoute = void 0;

var CancelToken_1 = __importDefault(__webpack_require__(/*! ./CancelToken */ "../../main/dist/CancelToken.js"));

var Component_1 = __importDefault(__webpack_require__(/*! ./Component */ "../../main/dist/Component.js"));

var defer_1 = __importDefault(__webpack_require__(/*! ./defer */ "../../main/dist/defer.js"));

var hash_1 = __importDefault(__webpack_require__(/*! ./hash */ "../../main/dist/hash.js"));

var Router_1 = __importDefault(__webpack_require__(/*! ./Router */ "../../main/dist/Router.js"));
/**
 * Recommended way to perform an asyncronous redirection in Router `handler` function.
 */


var RouteRedirector = /*#__PURE__*/function (_Component_1$default) {
  _inherits(RouteRedirector, _Component_1$default);

  var _super = _createSuper(RouteRedirector);

  /**
   * Creates a new redirector.
   * @param path Path relative to router.
   * @param router Redirect relative to this router.
   * @param replaceState Replace the current browser historical state rather than pushing a new state to the
   * stack. Defaults to true.
   */
  function RouteRedirector(path, router) {
    var _this;

    var replaceState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, RouteRedirector);

    _this = _super.call(this);
    _this.path = path;
    _this.router = router;
    _this.replaceState = replaceState;
    defer_1.default(0, _this.own(new CancelToken_1.default())).then(function () {
      redirectRoute(_this.path, _this.router, _this.replaceState);
    });
    return _this;
  }

  return RouteRedirector;
}(Component_1.default);

exports.default = RouteRedirector;
/**
 * Immediately performs the redirection, i.e. sets `hash` to `getFullPath(path, router)`.
 * @param path Path relative to `router`.
 * @param router Redirect relative to this router. By default, performs a global redirection.
 * @param replaceState Replace the current browser historical state rather than pushing a new state to the stack.
 */

function redirectRoute(path, router, replaceState) {
  try {
    path = Router_1.default.getFullPath(path, router);

    if (hash_1.default.updating) {
      throw new Error("Update cycle is already active. " + "Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
    }
  } catch (e) {
    throw new Error("Can not perform URL redirection to " + path + ": " + e.message);
  }

  hash_1.default.set(path, replaceState);
}

exports.redirectRoute = redirectRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZVJlZGlyZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUYsSUFBQSxhQUFBLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFdBQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsT0FBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxNQUFBLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBO0FBRUE7O0FBRUc7OztJQUNrQixlOzs7OztBQUNwQjs7Ozs7O0FBTUc7QUFDSCwyQkFBb0IsSUFBcEIsRUFBMEMsTUFBMUMsRUFBMkY7QUFBQTs7QUFBQSxRQUFuQixZQUFtQix1RUFBSixJQUFJOztBQUFBOztBQUMxRjtBQURtQixVQUFBLElBQUEsR0FBQSxJQUFBO0FBQXNCLFVBQUEsTUFBQSxHQUFBLE1BQUE7QUFBOEIsVUFBQSxZQUFBLEdBQUEsWUFBQTtBQUV2RSxJQUFBLE9BQUEsQ0FBQSxPQUFBLENBQU0sQ0FBTixFQUFTLE1BQUssR0FBTCxDQUFTLElBQUksYUFBQSxDQUFBLE9BQUosRUFBVCxDQUFULEVBQXNDLElBQXRDLENBQTJDLFlBQUs7QUFDL0MsTUFBQSxhQUFhLENBQUMsTUFBSyxJQUFOLEVBQVksTUFBSyxNQUFqQixFQUF5QixNQUFLLFlBQTlCLENBQWI7QUFDQSxLQUZEO0FBRjBGO0FBSzFGOzs7RUFiMkMsV0FBQSxDQUFBLE87O0FBQTdDLE9BQUEsQ0FBQSxPQUFBLEdBQUEsZUFBQTtBQWdCQTs7Ozs7QUFLRzs7QUFDSCxTQUFnQixhQUFoQixDQUE4QixJQUE5QixFQUE0QyxNQUE1QyxFQUFrRSxZQUFsRSxFQUF3RjtBQUN2RixNQUFJO0FBQ0gsSUFBQSxJQUFJLEdBQUcsUUFBQSxDQUFBLE9BQUEsQ0FBTyxXQUFQLENBQW1CLElBQW5CLEVBQXlCLE1BQXpCLENBQVA7O0FBQ0EsUUFBSSxNQUFBLENBQUEsT0FBQSxDQUFLLFFBQVQsRUFBbUI7QUFDbEIsWUFBTSxJQUFJLEtBQUosQ0FBVSxxQ0FDZix1RkFESyxDQUFOO0FBRUE7QUFDRCxHQU5ELENBTUUsT0FBTyxDQUFQLEVBQVU7QUFDWCxVQUFNLElBQUksS0FBSixDQUFVLHdDQUF3QyxJQUF4QyxHQUErQyxJQUEvQyxHQUFzRCxDQUFDLENBQUMsT0FBbEUsQ0FBTjtBQUNBOztBQUNELEVBQUEsTUFBQSxDQUFBLE9BQUEsQ0FBSyxHQUFMLENBQVMsSUFBVCxFQUFlLFlBQWY7QUFDQTs7QUFYRCxPQUFBLENBQUEsYUFBQSxHQUFBLGFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSBcIi4vQ2FuY2VsVG9rZW5cIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9Db21wb25lbnQnO1xuaW1wb3J0IGRlZmVyIGZyb20gXCIuL2RlZmVyXCI7XG5pbXBvcnQgaGFzaCBmcm9tICcuL2hhc2gnO1xuaW1wb3J0IFJvdXRlciBmcm9tIFwiLi9Sb3V0ZXJcIjtcblxuLyoqXG4gKiBSZWNvbW1lbmRlZCB3YXkgdG8gcGVyZm9ybSBhbiBhc3luY3Jvbm91cyByZWRpcmVjdGlvbiBpbiBSb3V0ZXIgYGhhbmRsZXJgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZVJlZGlyZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyByZWRpcmVjdG9yLlxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHJvdXRlci5cblx0ICogQHBhcmFtIHJvdXRlciBSZWRpcmVjdCByZWxhdGl2ZSB0byB0aGlzIHJvdXRlci5cblx0ICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZVxuXHQgKiBzdGFjay4gRGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aDogc3RyaW5nLCBwcml2YXRlIHJvdXRlcj86IFJvdXRlcjxhbnk+LCBwcml2YXRlIHJlcGxhY2VTdGF0ZSA9IHRydWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdGRlZmVyKDAsIHRoaXMub3duKG5ldyBDYW5jZWxUb2tlbigpKSkudGhlbigoKSA9PiB7XG5cdFx0XHRyZWRpcmVjdFJvdXRlKHRoaXMucGF0aCwgdGhpcy5yb3V0ZXIsIHRoaXMucmVwbGFjZVN0YXRlKTtcblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEltbWVkaWF0ZWx5IHBlcmZvcm1zIHRoZSByZWRpcmVjdGlvbiwgaS5lLiBzZXRzIGBoYXNoYCB0byBgZ2V0RnVsbFBhdGgocGF0aCwgcm91dGVyKWAuXG4gKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIGByb3V0ZXJgLlxuICogQHBhcmFtIHJvdXRlciBSZWRpcmVjdCByZWxhdGl2ZSB0byB0aGlzIHJvdXRlci4gQnkgZGVmYXVsdCwgcGVyZm9ybXMgYSBnbG9iYWwgcmVkaXJlY3Rpb24uXG4gKiBAcGFyYW0gcmVwbGFjZVN0YXRlIFJlcGxhY2UgdGhlIGN1cnJlbnQgYnJvd3NlciBoaXN0b3JpY2FsIHN0YXRlIHJhdGhlciB0aGFuIHB1c2hpbmcgYSBuZXcgc3RhdGUgdG8gdGhlIHN0YWNrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVkaXJlY3RSb3V0ZShwYXRoOiBzdHJpbmcsIHJvdXRlcj86IFJvdXRlcjxhbnk+LCByZXBsYWNlU3RhdGU/OiBib29sZWFuKSB7XG5cdHRyeSB7XG5cdFx0cGF0aCA9IFJvdXRlci5nZXRGdWxsUGF0aChwYXRoLCByb3V0ZXIpO1xuXHRcdGlmIChoYXNoLnVwZGF0aW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgY3ljbGUgaXMgYWxyZWFkeSBhY3RpdmUuIFwiICtcblx0XHRcdFx0XCJTdWdnZXN0IHVzaW5nIFJvdXRlci5SZWRpcmVjdG9yIG9yIG1vdmluZyBVUkwgcmVkaXJlY3Rpb24gdG8gYW4gYXN5bmNyb25vdXMgY2FsbGJhY2suXCIpO1xuXHRcdH1cblx0fSBjYXRjaCAoZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbiBub3QgcGVyZm9ybSBVUkwgcmVkaXJlY3Rpb24gdG8gXCIgKyBwYXRoICsgXCI6IFwiICsgZS5tZXNzYWdlKTtcblx0fVxuXHRoYXNoLnNldChwYXRoLCByZXBsYWNlU3RhdGUpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

/***/ "../../main/dist/Router.js":
/*!*********************************!*\
  !*** ../../main/dist/Router.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));

var Property_1 = __importDefault(__webpack_require__(/*! ./Property */ "../../main/dist/Property.js"));
/**
 * URL router. Converts incoming part of URL (hash) to a target object and passes tail string to it
 * for further routing.
 */


var Router = /*#__PURE__*/function (_Class_1$default) {
  _inherits(Router, _Class_1$default);

  var _super = _createSuper(Router);

  /**
   * Creates router instance. Please notice that the router doesn't process current route immediately on
   * initialization. To process the route, call `update` method.
   * @param config Router configuration.
   */
  function Router() {
    var _this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Router);

    _this = _super.call(this);
    _this._route = new Property_1.default();
    _this._arg = new Property_1.default();
    _this._updating = false;
    _this.name = config.name;
    _this.parent = config.parent;

    if (_this.name == null !== (_this.parent == null)) {
      throw new Error("Router configuration error: you have specified router name or parent, but haven't specified another. These two options must come together.");
    }

    _this.path = config.path || new Property_1.default(); // we don't own it because its value is being used in destroyObject method - after ownage pool releasing

    _this.separator = Router.makeSeparator(config.separator);
    _this.joiner = Router.makeJoiner(config.joiner);
    _this.handler = Router.makeHandler(config.handler);
    _this.scope = config.scope || _assertThisInitialized(_this);
    _this._target = config.target || _this.own(new Property_1.default());

    _this.own(_this.path.onChange.listen(function () {
      return _this.update();
    }));

    return _this;
  }
  /**
   * Router target. Main purpose of the router is to convert `path` to `target`. In particular, UIRouter
   * creates Component instances based on current `path` value so you could render them.
   */


  _createClass(Router, [{
    key: "target",
    get: function get() {
      return this._target;
    }
    /**
     * Current route. First chunk of the path detected by `separator` function. You can watch this property
     * to activate and deactivate items in your menu.
     */

  }, {
    key: "route",
    get: function get() {
      return this._route;
    }
    /**
     * Remainder of current route after `separator` function call. This property is passed to `handler`
     * function and can be passed over to child components for further routing.
     */

  }, {
    key: "arg",
    get: function get() {
      return this._arg;
    }
  }, {
    key: "destroyObject",
    value: function destroyObject() {
      if (this._updating) {
        throw new Error("Router can not be destroyed during its update cycle.");
      }

      var target = this._target.get();

      if (target != null) {
        target.destroy();
      }

      _get(_getPrototypeOf(Router.prototype), "destroyObject", this).call(this);
    }
    /**
     * Issues route processing.
     */

  }, {
    key: "update",
    value: function update() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this._updating) {
        throw new Error("Can't update router because its update cycle is already active. " + "Consider using RouteRedirector or moving URL redirection to an asyncronous callback.");
      }

      this._updating = true;
      var path = this.path.get();
      var pair = path == null ? null : this.separator.call(this.scope, path);
      var route = pair != null ? pair[0] || "" : "";
      var arg = pair != null ? pair[1] || null : null;

      if (!force && route === this.route.get()) {
        this._arg.set(arg);
      } else {
        var target = this.target.get();

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

  }, {
    key: "join",
    value: function join(route, arg) {
      return this.joiner.call(this.scope, route, arg);
    }
    /**
     * Returns full path as the result of `joiner` function call in `parent` router with `name` passed as
     * `route` and `path` passed as `arg`. Returns `path` if this is the root router.
     * @param path Path relative to this router.
     * @returns Full path relative to the root router.
     */

  }, {
    key: "getFullPath",
    value: function getFullPath(path) {
      return this.parent ? this.parent.getFullPath(this.parent.join(this.name, path)) : path;
    }
  }]);

  return Router;
}(Class_1.default);

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

  function makeSeparator() {
    var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Router.DEFAULT_SEPARATOR;

    if (typeof separator === "function") {
      return separator;
    }

    return function (path) {
      var _a;

      var result = separator.exec(path || "");
      return result ? [result[1], (_a = result.slice(2).find(function (x) {
        return x != null;
      })) !== null && _a !== void 0 ? _a : null] : null;
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

  function makeJoiner() {
    var joiner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Router.DEFAULT_JOINER;

    if (typeof joiner === "function") {
      return joiner;
    }

    var trimmer = new RegExp("^(?:" + joiner.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + ")*");
    return function (route, arg) {
      return !arg ? route : arg.charAt(0) === "?" ? route + arg : route + joiner + arg.replace(trimmer, "");
    };
  }

  Router.makeJoiner = makeJoiner;
  /**
   * If handler is a function, returns it immediately. Else converts the specified object to a function.
   * @param handler Handler configuration object.
   * @returns Handler function.
   */

  function makeHandler() {
    var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof handler === "function") {
      return handler;
    }

    var routes = handler.routes || {};
    return function (route, arg) {
      return routes[route] ? routes[route].call(this, arg) : handler.notFound ? handler.notFound.call(this, route, arg) : null;
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
})(Router || (Router = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTFDLEVBQThEO0FBQzdELFdBQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFQLENBQW1CLElBQW5CLENBQUgsR0FBOEIsSUFBM0M7QUFDQTs7QUFGZSxFQUFBLE1BQUEsQ0FBQSxXQUFBLEdBQVcsV0FBWDtBQUdoQixDQW5NRCxFQUFVLE1BQU0sS0FBTixNQUFNLEdBQUEsRUFBQSxDQUFoQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjEgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBCaW5kYWJsZSBmcm9tICcuL0JpbmRhYmxlJztcbmltcG9ydCBDbGFzcyBmcm9tICcuL0NsYXNzJztcbmltcG9ydCBEZXN0cm95YWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcbmltcG9ydCBJUHJvcGVydHkgZnJvbSAnLi9JUHJvcGVydHknO1xuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4vUHJvcGVydHknO1xuXG4vKipcbiAqIFVSTCByb3V0ZXIuIENvbnZlcnRzIGluY29taW5nIHBhcnQgb2YgVVJMIChoYXNoKSB0byBhIHRhcmdldCBvYmplY3QgYW5kIHBhc3NlcyB0YWlsIHN0cmluZyB0byBpdFxuICogZm9yIGZ1cnRoZXIgcm91dGluZy5cbiAqL1xuY2xhc3MgUm91dGVyPFQgZXh0ZW5kcyBEZXN0cm95YWJsZT4gZXh0ZW5kcyBDbGFzcyB7XG5cblx0LyoqXG5cdCAqIFJvdXRlciBuYW1lLiBNdXN0IGJlIGVxdWFsIHRvIHRoZSByb3V0ZSBuYW1lIGluIHRoZSBgcGFyZW50YCByb3V0ZXIuIFJlcXVpcmVkIGZvciBwcm9wZXIgYGdldEZ1bGxQYXRoYCBhbmRcblx0ICogYHJlZGlyZWN0YCBtZXRob2QgcHJvY2Vzc2luZy4gUm9vdCByb3V0ZXIgZG9lcyBub3QgaGF2ZSBhIG5hbWUuXG5cdCAqL1xuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFBhcmVudCByb3V0ZXIuIFJlcXVpcmVkIGZvciBwcm9wZXIgYGdldEZ1bGxQYXRoYCBhbmQgYHJlZGlyZWN0YCBtZXRob2QgcHJvY2Vzc2luZy4gUm9vdCByb3V0ZXIgZG9lcyBub3QgaGF2ZVxuXHQgKiBhIHBhcmVudC5cblx0ICovXG5cdHJlYWRvbmx5IHBhcmVudDogUm91dGVyPGFueT47XG5cblx0LyoqXG5cdCAqIFBhdGggdGhhdCB0aGUgcm91dGVyIGlzIGJvdW5kIHRvLiBQYXRoIGlzIGEgZmluYWwgcGFydCBvZiBVUkwgKGhhc2gpIHJlbGV2YW50IHRvIHRoaXNcblx0ICogcm91dGVyLiBBbnkgcGF0aCBjaGFuZ2UgcmVzdWx0cyBpbiBgdXBkYXRlYCBtZXRob2QgY2FsbC5cblx0ICovXG5cdHJlYWRvbmx5IHBhdGg6IEJpbmRhYmxlPHN0cmluZz47XG5cblx0LyoqXG5cdCAqIFBhdGggc2VwYXJhdG9yIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIHJvdXRlci5cblx0ICovXG5cdHJlYWRvbmx5IHNlcGFyYXRvcjogUm91dGVyLlNlcGFyYXRvcjtcblxuXHQvKipcblx0ICogUGF0aCBqb2luZXIgZnVuY3Rpb24gdXNlZCBieSB0aGUgcm91dGVyLlxuXHQgKi9cblx0cmVhZG9ubHkgam9pbmVyOiBSb3V0ZXIuSm9pbmVyO1xuXG5cdC8qKlxuXHQgKiBSb3V0ZSBoYW5kbGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIHJvdXRlci5cblx0ICovXG5cdHJlYWRvbmx5IGhhbmRsZXI6IFJvdXRlci5IYW5kbGVyPFQ+O1xuXG5cdC8qKlxuXHQgKiBgc2VwYXJhdG9yYCwgYGpvaW5lcmAgYW5kIGBoYW5kbGVyYCBjYWxsIHNjb3BlLlxuXHQgKi9cblx0cmVhZG9ubHkgc2NvcGU6IGFueTtcblxuXHRwcml2YXRlIF90YXJnZXQ6IElQcm9wZXJ0eTxUPjtcblx0cHJpdmF0ZSBfcm91dGU6IElQcm9wZXJ0eTxzdHJpbmc+ID0gbmV3IFByb3BlcnR5PHN0cmluZz4oKTtcblx0cHJpdmF0ZSBfYXJnOiBJUHJvcGVydHk8c3RyaW5nPiA9IG5ldyBQcm9wZXJ0eTxzdHJpbmc+KCk7XG5cdHByaXZhdGUgX3VwZGF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgcm91dGVyIGluc3RhbmNlLiBQbGVhc2Ugbm90aWNlIHRoYXQgdGhlIHJvdXRlciBkb2Vzbid0IHByb2Nlc3MgY3VycmVudCByb3V0ZSBpbW1lZGlhdGVseSBvblxuXHQgKiBpbml0aWFsaXphdGlvbi4gVG8gcHJvY2VzcyB0aGUgcm91dGUsIGNhbGwgYHVwZGF0ZWAgbWV0aG9kLlxuXHQgKiBAcGFyYW0gY29uZmlnIFJvdXRlciBjb25maWd1cmF0aW9uLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY29uZmlnOiBSb3V0ZXIuQ29uZmlnPFQ+ID0ge30pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuXHRcdHRoaXMucGFyZW50ID0gY29uZmlnLnBhcmVudDtcblx0XHRpZiAoKHRoaXMubmFtZSA9PSBudWxsKSAhPT0gKHRoaXMucGFyZW50ID09IG51bGwpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZXIgY29uZmlndXJhdGlvbiBlcnJvcjogeW91IGhhdmUgc3BlY2lmaWVkIHJvdXRlciBuYW1lIG9yIHBhcmVudCwgYnV0IGhhdmVuJ3Qgc3BlY2lmaWVkIGFub3RoZXIuIFRoZXNlIHR3byBvcHRpb25zIG11c3QgY29tZSB0b2dldGhlci5cIik7XG5cdFx0fVxuXHRcdHRoaXMucGF0aCA9IGNvbmZpZy5wYXRoIHx8IG5ldyBQcm9wZXJ0eTxzdHJpbmc+KCk7IC8vIHdlIGRvbid0IG93biBpdCBiZWNhdXNlIGl0cyB2YWx1ZSBpcyBiZWluZyB1c2VkIGluIGRlc3Ryb3lPYmplY3QgbWV0aG9kIC0gYWZ0ZXIgb3duYWdlIHBvb2wgcmVsZWFzaW5nXG5cdFx0dGhpcy5zZXBhcmF0b3IgPSBSb3V0ZXIubWFrZVNlcGFyYXRvcihjb25maWcuc2VwYXJhdG9yKTtcblx0XHR0aGlzLmpvaW5lciA9IFJvdXRlci5tYWtlSm9pbmVyKGNvbmZpZy5qb2luZXIpO1xuXHRcdHRoaXMuaGFuZGxlciA9IFJvdXRlci5tYWtlSGFuZGxlcihjb25maWcuaGFuZGxlcik7XG5cdFx0dGhpcy5zY29wZSA9IGNvbmZpZy5zY29wZSB8fCB0aGlzO1xuXHRcdHRoaXMuX3RhcmdldCA9IGNvbmZpZy50YXJnZXQgfHwgdGhpcy5vd24obmV3IFByb3BlcnR5PFQ+KCkpO1xuXHRcdHRoaXMub3duKHRoaXMucGF0aC5vbkNoYW5nZS5saXN0ZW4oKCkgPT4gdGhpcy51cGRhdGUoKSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdXRlciB0YXJnZXQuIE1haW4gcHVycG9zZSBvZiB0aGUgcm91dGVyIGlzIHRvIGNvbnZlcnQgYHBhdGhgIHRvIGB0YXJnZXRgLiBJbiBwYXJ0aWN1bGFyLCBVSVJvdXRlclxuXHQgKiBjcmVhdGVzIENvbXBvbmVudCBpbnN0YW5jZXMgYmFzZWQgb24gY3VycmVudCBgcGF0aGAgdmFsdWUgc28geW91IGNvdWxkIHJlbmRlciB0aGVtLlxuXHQgKi9cblx0Z2V0IHRhcmdldCgpOiBCaW5kYWJsZTxUPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3RhcmdldDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDdXJyZW50IHJvdXRlLiBGaXJzdCBjaHVuayBvZiB0aGUgcGF0aCBkZXRlY3RlZCBieSBgc2VwYXJhdG9yYCBmdW5jdGlvbi4gWW91IGNhbiB3YXRjaCB0aGlzIHByb3BlcnR5XG5cdCAqIHRvIGFjdGl2YXRlIGFuZCBkZWFjdGl2YXRlIGl0ZW1zIGluIHlvdXIgbWVudS5cblx0ICovXG5cdGdldCByb3V0ZSgpOiBCaW5kYWJsZTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gdGhpcy5fcm91dGU7XG5cdH1cblxuXHQvKipcblx0ICogUmVtYWluZGVyIG9mIGN1cnJlbnQgcm91dGUgYWZ0ZXIgYHNlcGFyYXRvcmAgZnVuY3Rpb24gY2FsbC4gVGhpcyBwcm9wZXJ0eSBpcyBwYXNzZWQgdG8gYGhhbmRsZXJgXG5cdCAqIGZ1bmN0aW9uIGFuZCBjYW4gYmUgcGFzc2VkIG92ZXIgdG8gY2hpbGQgY29tcG9uZW50cyBmb3IgZnVydGhlciByb3V0aW5nLlxuXHQgKi9cblx0Z2V0IGFyZygpOiBCaW5kYWJsZTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gdGhpcy5fYXJnO1xuXHR9XG5cblx0ZGVzdHJveU9iamVjdCgpIHtcblx0XHRpZiAodGhpcy5fdXBkYXRpbmcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJvdXRlciBjYW4gbm90IGJlIGRlc3Ryb3llZCBkdXJpbmcgaXRzIHVwZGF0ZSBjeWNsZS5cIik7XG5cdFx0fVxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuX3RhcmdldC5nZXQoKTtcblx0XHRpZiAodGFyZ2V0ICE9IG51bGwpIHtcblx0XHRcdHRhcmdldC5kZXN0cm95KCk7XG5cdFx0fVxuXHRcdHN1cGVyLmRlc3Ryb3lPYmplY3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJc3N1ZXMgcm91dGUgcHJvY2Vzc2luZy5cblx0ICovXG5cdHVwZGF0ZShmb3JjZSA9IGZhbHNlKSB7XG5cdFx0aWYgKHRoaXMuX3VwZGF0aW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCB1cGRhdGUgcm91dGVyIGJlY2F1c2UgaXRzIHVwZGF0ZSBjeWNsZSBpcyBhbHJlYWR5IGFjdGl2ZS4gXCIgK1xuXHRcdFx0XHRcIkNvbnNpZGVyIHVzaW5nIFJvdXRlUmVkaXJlY3RvciBvciBtb3ZpbmcgVVJMIHJlZGlyZWN0aW9uIHRvIGFuIGFzeW5jcm9ub3VzIGNhbGxiYWNrLlwiKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xuXHRcdGNvbnN0IHBhdGggPSB0aGlzLnBhdGguZ2V0KCk7XG5cdFx0Y29uc3QgcGFpcjogc3RyaW5nW10gPSAocGF0aCA9PSBudWxsKSA/IG51bGwgOiB0aGlzLnNlcGFyYXRvci5jYWxsKHRoaXMuc2NvcGUsIHBhdGgpO1xuXHRcdGNvbnN0IHJvdXRlID0gKHBhaXIgIT0gbnVsbCkgPyAocGFpclswXSB8fCBcIlwiKSA6IFwiXCI7XG5cdFx0Y29uc3QgYXJnID0gKHBhaXIgIT0gbnVsbCkgPyAocGFpclsxXSB8fCBudWxsKSA6IG51bGw7XG5cdFx0aWYgKCFmb3JjZSAmJiByb3V0ZSA9PT0gdGhpcy5yb3V0ZS5nZXQoKSkge1xuXHRcdFx0dGhpcy5fYXJnLnNldChhcmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldC5nZXQoKTtcblx0XHRcdGlmICh0YXJnZXQgIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl90YXJnZXQuc2V0KG51bGwpO1xuXHRcdFx0XHR0YXJnZXQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYXJnLnNldChhcmcpO1xuXHRcdFx0dGhpcy5fcm91dGUuc2V0KHJvdXRlKTtcblx0XHRcdHRoaXMuX3RhcmdldC5zZXQodGhpcy5oYW5kbGVyLmNhbGwodGhpcy5zY29wZSwgcm91dGUsIHRoaXMuX2FyZykgfHwgbnVsbCk7XG5cdFx0fVxuXHRcdHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgZm9yIHRoaXMgcm91dGVyLlxuXHQgKiBAcGFyYW0gcm91dGUgUm91dGUgbmFtZS5cblx0ICogQHBhcmFtIGFyZyBSZW1haW5kZXIgb2YgdGhlIHBhdGguXG5cdCAqIEByZXR1cm5zIEZ1bGwgcGF0aC5cblx0ICovXG5cdGpvaW4ocm91dGU6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLmpvaW5lci5jYWxsKHRoaXMuc2NvcGUsIHJvdXRlLCBhcmcpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgZnVsbCBwYXRoIGFzIHRoZSByZXN1bHQgb2YgYGpvaW5lcmAgZnVuY3Rpb24gY2FsbCBpbiBgcGFyZW50YCByb3V0ZXIgd2l0aCBgbmFtZWAgcGFzc2VkIGFzXG5cdCAqIGByb3V0ZWAgYW5kIGBwYXRoYCBwYXNzZWQgYXMgYGFyZ2AuIFJldHVybnMgYHBhdGhgIGlmIHRoaXMgaXMgdGhlIHJvb3Qgcm91dGVyLlxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxuXHQgKiBAcmV0dXJucyBGdWxsIHBhdGggcmVsYXRpdmUgdG8gdGhlIHJvb3Qgcm91dGVyLlxuXHQgKi9cblx0Z2V0RnVsbFBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5nZXRGdWxsUGF0aCh0aGlzLnBhcmVudC5qb2luKHRoaXMubmFtZSwgcGF0aCkpIDogcGF0aDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG5cbm5hbWVzcGFjZSBSb3V0ZXIge1xuXHQvKipcblx0ICogRGVmYXVsdCB2YWx1ZSBvZiBgc2VwYXJhdG9yYC5cblx0ICovXG5cdGV4cG9ydCBjb25zdCBERUZBVUxUX1NFUEFSQVRPUiA9IC9eXFwvKihbXj9cXC9dKykoPzpcXC8oLiopfChcXD8uKikpPyQvO1xuXG5cdC8qKlxuXHQgKiBEZWZhdWx0IHZhbHVlIG9mIGBqb2luZXJgLlxuXHQgKi9cblx0ZXhwb3J0IGNvbnN0IERFRkFVTFRfSk9JTkVSID0gXCIvXCI7XG5cblx0LyoqXG5cdCAqIFNpZ25hdHVyZSBvZiBgc2VwYXJhdG9yYCBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIHNwbGl0cyBwYXRoIHRvIHJvdXRlIGFuZCBhcmd1bWVudC4gVGhlcmVmb3JlLCBpdCBtdXN0XG5cdCAqIHJldHVybiB0d28gc3RyaW5nIHZhbHVlcy4gSWYgZnVuY3Rpb24gcmV0dXJucyBudWxsLCBpdCBpcyBhc3N1bWVkIHRvIGJlIFtcIlwiLCBudWxsXS5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgU2VwYXJhdG9yIHtcblx0XHQvKipcblx0XHQgKiBAcGFyYW0gcGF0aCBGdWxsIHBhdGguXG5cdFx0ICogQHJldHVybnMgUm91dGUgYW5kIGFyZ3VtZW50LlxuXHRcdCAqL1xuXHRcdChwYXRoOiBzdHJpbmcpOiBzdHJpbmdbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaWduYXR1cmUgb2YgYGpvaW5lcmAgZnVuY3Rpb24uIFRoZSBmdW5jdGlvbiBqb2lucyByb3V0ZSBhbmQgYXJndW1lbnQgdG8gYSBwYXRoLlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBKb2luZXIge1xuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSByb3V0ZSBSb3V0ZS5cblx0XHQgKiBAcGFyYW0gYXJnIEFyZ3VtZW50LlxuXHRcdCAqIEByZXR1cm5zIEZ1bGwgcGF0aC5cblx0XHQgKi9cblx0XHQocm91dGU6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBzdHJpbmc7XG5cdH1cblxuXHQvKipcblx0ICogU2lnbmF0dXJlIG9mIGBoYW5kbGVyYCBnZW5lcmFsLXB1cnBvc2UgZnVuY3Rpb24uIFRoZSBmdW5jdGlvbiBtYXBzIHRoZSBzcGVjaWZpZWQgcm91dGUgdG8gYSB0YXJnZXQgb2JqZWN0XG5cdCAqICh1c3VhbGx5LCBDb21wb25lbnQpIGFuZCBwYXNzZXMgYXJndW1lbnQgdG8gaXQgZm9yIGZ1cnRoZXIgcm91dGluZy5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgSGFuZGxlcjxUPiB7XG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIHJvdXRlIFJvdXRlLlxuXHRcdCAqIEBwYXJhbSBhcmcgQXJndW1lbnQuXG5cdFx0ICogQHJldHVybnMgVGFyZ2V0IG9iamVjdC5cblx0XHQgKi9cblx0XHQocm91dGU6IHN0cmluZywgYXJnOiBCaW5kYWJsZTxzdHJpbmc+KTogVDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaWduYXR1cmUgb2YgYSBzaW5nbGUgcm91dGUgaW4gYGhhbmRsZXJgIG9iamVjdC4gVGhlIGZ1bmN0aW9uIG1hcHMgYSBzaW5nbGUgcm91dGUgdG8gYSB0YXJnZXRcblx0ICogb2JqZWN0ICh1c3VhbGx5LCBDb21wb25lbnQpIGFuZCBwYXNzZXMgYXJndW1lbnQgdG8gaXQgZm9yIGZ1cnRoZXIgcm91dGluZy5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgUm91dGU8VD4ge1xuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSBhcmcgQXJndW1lbnQuXG5cdFx0ICogQHJldHVybnMgVGFyZ2V0IG9iamVjdC5cblx0XHQgKi9cblx0XHQoYXJnOiBCaW5kYWJsZTxzdHJpbmc+KTogVDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3V0ZXIgaGFuZGxlciBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgSGFuZGxlckNvbmZpZzxUPiB7XG5cdFx0LyoqXG5cdFx0ICogTWFwIG9mIHNwZWNpZmljIHJvdXRlIGhhbmRsZXJzLiBJZiBjdXJyZW50IHJvdXRlIGlzIHByZXNlbnQgaW4gdGhpcyBkaWN0aW9uYXJ5LCB0aGUgcm91dGVyIGNhbGxzIGl0c1xuXHRcdCAqIGNvcnJlc3BvbmRpbmcgaGFuZGxlciBhbmQgcGFzc2VzIGFyZ3VtZW50IHRvIGl0LiBSb3V0ZSBhbmQgYXJndW1lbnQgdGhlbXNlbHZlcyBhcmUgY29tcHV0ZWQgd2l0aCBgc2VwYXJhdG9yYFxuXHRcdCAqIGNhbGxiYWNrLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IHJvdXRlcz86IHtcblx0XHRcdHJlYWRvbmx5IFtrZXk6IHN0cmluZ106IFJvdXRlPFQ+O1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBJZiBub25lIG9mIHRoZSBgcm91dGVzYCBtYXRjaGVzIGN1cnJlbnQgcm91dGUsIHRoZSByb3V0ZXIgY2FsbHMgdGhpcyBoYW5kbGVyIGNhbGxiYWNrIGFuZCBwYXNzZXMgYm90aFxuXHRcdCAqIHJvdXRlIGFuZCBhcmd1bWVudCB0byBpdC4gQnkgZGVmYXVsdCwgcmV0dXJucyBudWxsIGZvciBhbnkgaW5wdXQuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgbm90Rm91bmQ/OiBIYW5kbGVyPFQ+O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdXRlciBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnPFQ+IHtcblx0XHQvKipcblx0XHQgKiBSb3V0ZXIgbmFtZS4gUm91dGVyIG5hbWUgaXMgYSBjaHVuayBvZiB0aGUgcGF0aCB0aGF0IGNhdXNlZCB0aGlzIHJvdXRlIHRvIGdldCBpbml0aWFsaXplZC4gUm9vdCByb3V0ZXJcblx0XHQgKiBkb2Vzbid0IGhhdmUgYSBuYW1lLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IG5hbWU/OiBzdHJpbmc7XG5cblx0XHQvKipcblx0XHQgKiBQYXJlbnQgcm91dGVyLiBJdCBwcm92aWRlcyBgZ2V0RnVsbFBhdGhgIGFuZCBgcmVkaXJlY3RgIHdpdGggYSBjbHVlIGFib3V0IGFsbCBwYXJ0cyBvZiB0aGUgcGF0aC4gSWZcblx0XHQgKiB5b3VyIHJvdXRlciBwcm92aWRlcyB5b3Ugd2l0aCB3cm9uZyBwYXRocywgY2hlY2sgYG5hbWVgIGFuZCBgcGFyZW50YCBvZiBhbGwgcm91dGVycyBpbiB5b3VyIGhpZXJhcmNoeSAtIHRoZXlcblx0XHQgKiBhcmUgbGlrZWx5IGFzc2lnbmVkIHRvIHdyb25nIHZhbHVlcy4gUm9vdCByb3V0ZXIgZG9lc24ndCBoYXZlIGEgcGFyZW50LlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IHBhcmVudD86IFJvdXRlcjxhbnk+O1xuXG5cdFx0LyoqXG5cdFx0ICogUGF0aCB0byBiaW5kIHRoZSByb3V0ZXIgdG8uIFJvb3Qgcm91dGVyIHNob3VsZCB1c3VhbGx5IGdldCBib3VuZCB0byBgaGFzaGAgcHJvcGVydHkuIENoaWxkIHJvdXRlcnMgc2hvdWxkXG5cdFx0ICogcmVjZWl2ZSBgcGF0aGAgZnJvbSB0aGVpciBwYXJlbnRzLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IHBhdGg/OiBCaW5kYWJsZTxzdHJpbmc+O1xuXG5cdFx0LyoqXG5cdFx0ICogVGFyZ2V0IHByb3BlcnR5LiBSb3V0ZXIgcHV0cyB0aGUgcmVzdWx0IG9mIGBoYW5kbGVyYCBmdW5jdGlvbiBjYWxsIHRvIHRhcmdldCBwcm9wZXJ0eS4gSWYgYHRhcmdldGAgaXNcblx0XHQgKiBvbWl0dGVkLCB0aGUgcm91dGVyIGNyZWF0ZXMgaXQgYXV0b21hdGljYWxseS4gUm91dGVyIGF1dG9tYXRpY2FsbHkgY29udHJvbHMgdGhlIGxpZmUgdGltZSBvZiB5b3VyIHRhcmdldHMsXG5cdFx0ICogc28sIGlmIHlvdSBwYXNzIHlvdXIgcHJlY3JlYXRlZCBgdGFyZ2V0YCBwcm9wZXJ0eSB0byBhIFJvdXRlciwgbWFrZSBzdXJlIHRoYXQgaXQgaXMgbm90IGFnZ3JlZ2F0aW5nIGl0cyB2YWx1ZSxcblx0XHQgKiBpLmUuIGBvd25WYWx1ZWAgbWV0aG9kIGlzIG5vdCBjYWxsZWQuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgdGFyZ2V0PzogSVByb3BlcnR5PFQ+O1xuXG5cdFx0LyoqXG5cdFx0ICogUGF0aCBzZXBhcmF0b3IgZnVuY3Rpb24uIFBhcnNlcyBpbmNvbWluZyBwYXRoIHRvIHR3byB0b2tlbnM6IHJvdXRlIGFuZCBhcmd1bWVudC4gUm91dGUgZ2V0cyB1c2VkIHRvXG5cdFx0ICogcHJvY2VzcyBhIHNpbmdsZSByb3V0aW5nIHN0ZXAgYW5kIGNyZWF0ZSBhIHRhcmdldCwgYXJndW1lbnQgZ2V0cyBwYXNzZWQgdG8gdGhlIHRhcmdldCBmb3IgZnVydGhlciByb3V0aW5nLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IHNlcGFyYXRvcj86IFNlcGFyYXRvciB8IFJlZ0V4cDtcblxuXHRcdC8qKlxuXHRcdCAqIFBhdGggam9pbmVyLiBPcHBvc2l0ZSB0byBgc2VwYXJhdG9yYC4gVXNlZCBpbiBgZ2V0RnVsbFBhdGhgIGFuZCBgcmVkaXJlY3RgIG1ldGhvZHMgdG8gcHJvcGVybHkgYnVpbGQgdGhlXG5cdFx0ICogcGF0aC4gSm9pbnMgaW5jb21pbmcgcm91dGUgYW5kIGFyZ3VtZW50IHRvIGEgZnVsbCBwYXRoLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IGpvaW5lcj86IEpvaW5lciB8IHN0cmluZztcblxuXHRcdC8qKlxuXHRcdCAqIFJvdXRlIGhhbmRsZXIuIE1hcHMgdGhlIHJvdXRlIHN0cmluZyB0byBhIHRhcmdldCBvYmplY3QgYW5kIHBhc3NlcyBhcmd1bWVudCB0byBpdCBmb3IgZnVydGhlciByb3V0aW5nLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IGhhbmRsZXI/OiBIYW5kbGVyPFQ+IHwgSGFuZGxlckNvbmZpZzxUPjtcblxuXHRcdC8qKlxuXHRcdCAqIGBzZXBhcmF0b3JgLCBgam9pbmVyYCBhbmQgYGhhbmRsZXJgIGNhbGwgc2NvcGUuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgc2NvcGU/OiBhbnk7XG5cdH1cblxuXHQvKipcblx0ICogSWYgYHNlcGFyYXRvcmAgaXMgYSBmdW5jdGlvbiwgcmV0dXJucyBpdCBpbW1lZGlhdGVseS4gRWxzZSBjb252ZXJ0cyB0aGUgc3BlY2lmaWVkIHJlZ3VsYXIgZXhwcmVzc2lvbiB0b1xuXHQgKiBhIGZ1bmN0aW9uIGJ5IHRoZSBmb2xsb3dpbmcgcnVsZTogVGhlIGZpcnN0IHRva2VuICgkMSkgb2YgcGF0aCBpcyB1c2VkIGFzIGEgcm91dGUsIGFuZCB0aGUgbmV4dCBub24tbnVsbCB0b2tlblxuXHQgKiAoJDIgb3IgZnVydGhlcikgaXMgdXNlZCBhcyBhbiBhcmd1bWVudC4gSWYgcGF0aCBpcyBudWxsLCBpdCBpcyBhc3N1bWVkIHRvIGJlIFwiXCIuXG5cdCAqIEBwYXJhbSBzZXBhcmF0b3IgRnVuY3Rpb24gb3IgcmVndWxhciBleHByZXNzaW9uLlxuXHQgKiBAcmV0dXJucyBTZXBhcmF0b3IgZnVuY3Rpb24uXG5cdCAqL1xuXHRleHBvcnQgZnVuY3Rpb24gbWFrZVNlcGFyYXRvcihzZXBhcmF0b3I6IFNlcGFyYXRvciB8IFJlZ0V4cCA9IERFRkFVTFRfU0VQQVJBVE9SKTogU2VwYXJhdG9yIHtcblx0XHRpZiAodHlwZW9mIHNlcGFyYXRvciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRyZXR1cm4gc2VwYXJhdG9yO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHBhdGg6IHN0cmluZykge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gc2VwYXJhdG9yLmV4ZWMocGF0aCB8fCBcIlwiKTtcblx0XHRcdHJldHVybiByZXN1bHQgPyBbcmVzdWx0WzFdLCByZXN1bHQuc2xpY2UoMikuZmluZCh4ID0+IHggIT0gbnVsbCkgPz8gbnVsbF0gOiBudWxsO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogSWYgYGpvaW5lcmAgaXMgYSBmdW5jdGlvbiwgcmV0dXJucyBpdCBpbW1lZGlhdGVseS4gRWxzZSBjb252ZXJ0cyB0aGUgc3BlY2lmaWVkIHN0cmluZyB0byBhIGZ1bmN0aW9uIGJ5IHRoZVxuXHQgKiBmb2xsb3dpbmcgcnVsZTogam9pbnMgaW5jb21pbmcgcm91dGUvYXJndW1lbnQgcGFpciB2aWEgdGhlIHNwZWNpZmllZCBzdHJpbmcuIExlYWRpbmcgam9pbmVyIHN5bWJvbHMgaW4gYXJndW1lbnRcblx0ICogYXJlIHRyaW1tZWQuIElmIGFyZ3VtZW50IHN0YXJ0cyB3aXRoIFwiP1wiLCBqb2luZXIgc3ltYm9sIGlzIG5vdCBhZGRlZC4gSWYgYXJndW1lbnQgaXMgbnVsbCBvciBibGFuaywgcmV0dXJuc1xuXHQgKiByb3V0ZS5cblx0ICogQHBhcmFtIGpvaW5lciBGdW5jdGlvbiBvciBzZXBhcmF0aW9uIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMgSm9pbmVyIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZXhwb3J0IGZ1bmN0aW9uIG1ha2VKb2luZXIoam9pbmVyOiBKb2luZXIgfCBzdHJpbmcgPSBERUZBVUxUX0pPSU5FUik6IEpvaW5lciB7XG5cdFx0aWYgKHR5cGVvZiBqb2luZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0cmV0dXJuIGpvaW5lcjtcblx0XHR9XG5cdFx0Y29uc3QgdHJpbW1lciA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBqb2luZXIucmVwbGFjZSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSArIFwiKSpcIik7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChyb3V0ZSwgYXJnKSB7XG5cdFx0XHRyZXR1cm4gIWFyZyA/IHJvdXRlIDogKGFyZy5jaGFyQXQoMCkgPT09IFwiP1wiKSA/IChyb3V0ZSArIGFyZykgOiAocm91dGUgKyBqb2luZXIgKyBhcmcucmVwbGFjZSh0cmltbWVyLCBcIlwiKSk7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiBoYW5kbGVyIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCBvYmplY3QgdG8gYSBmdW5jdGlvbi5cblx0ICogQHBhcmFtIGhhbmRsZXIgSGFuZGxlciBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICogQHJldHVybnMgSGFuZGxlciBmdW5jdGlvbi5cblx0ICovXG5cdGV4cG9ydCBmdW5jdGlvbiBtYWtlSGFuZGxlcjxUPihoYW5kbGVyOiBIYW5kbGVyPFQ+IHwgSGFuZGxlckNvbmZpZzxUPiA9IHt9KTogSGFuZGxlcjxUPiB7XG5cdFx0aWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHJldHVybiBoYW5kbGVyO1xuXHRcdH1cblx0XHRjb25zdCByb3V0ZXMgPSBoYW5kbGVyLnJvdXRlcyB8fCB7fTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHRoaXM6IGFueSwgcm91dGU6IHN0cmluZywgYXJnOiBCaW5kYWJsZTxzdHJpbmc+KTogVCB7XG5cdFx0XHRyZXR1cm4gcm91dGVzW3JvdXRlXSA/IHJvdXRlc1tyb3V0ZV0uY2FsbCh0aGlzLCBhcmcpIDpcblx0XHRcdFx0aGFuZGxlci5ub3RGb3VuZCA/IGhhbmRsZXIubm90Rm91bmQuY2FsbCh0aGlzLCByb3V0ZSwgYXJnKSA6IG51bGw7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGZ1bGwgcGF0aCBhcyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgaW4gYHBhcmVudGAgb2YgYHJvdXRlcmAgd2l0aCBgbmFtZWAgcGFzc2VkIGFzXG5cdCAqIGByb3V0ZWAgYW5kIGBwYXRoYCBwYXNzZWQgYXMgYGFyZ2AuIFJldHVybnMgYHBhdGhgIGlmIHRoaXMgaXMgdGhlIHJvb3Qgcm91dGVyLlxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIGByb3V0ZXJgLlxuXHQgKiBAcGFyYW0gcm91dGVyIENvbXB1dGUgZnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxuXHQgKiBAcmV0dXJucyBGdWxsIHBhdGggcmVsYXRpdmUgdG8gdGhlIGByb3V0ZXJgLlxuXHQgKi9cblx0ZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxQYXRoKHBhdGg6IHN0cmluZywgcm91dGVyPzogUm91dGVyPGFueT4pIHtcblx0XHRyZXR1cm4gcm91dGVyID8gcm91dGVyLmdldEZ1bGxQYXRoKHBhdGgpIDogcGF0aDtcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

/***/ "../../main/dist/UIRouter.js":
/*!***********************************!*\
  !*** ../../main/dist/UIRouter.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Router_1 = __importDefault(__webpack_require__(/*! ./Router */ "../../main/dist/Router.js"));
/**
 * Shorthand for Router<Component>.
 */


var UIRouter = /*#__PURE__*/function (_Router_1$default) {
  _inherits(UIRouter, _Router_1$default);

  var _super = _createSuper(UIRouter);

  function UIRouter() {
    _classCallCheck(this, UIRouter);

    return _super.apply(this, arguments);
  }

  return UIRouter;
}(Router_1.default);

exports.default = UIRouter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VSVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdGLElBQUEsUUFBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBQUE7QUFFQTs7QUFFRzs7O0lBQ2tCLFE7Ozs7Ozs7Ozs7OztFQUFpQixRQUFBLENBQUEsTzs7QUFBdEMsT0FBQSxDQUFBLE9BQUEsR0FBQSxRQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9Db21wb25lbnRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcIi4vUm91dGVyXCI7XG5cbi8qKlxuICogU2hvcnRoYW5kIGZvciBSb3V0ZXI8Q29tcG9uZW50Pi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlSb3V0ZXIgZXh0ZW5kcyBSb3V0ZXI8Q29tcG9uZW50PiB7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "../../main/dist/defer.js":
/*!********************************!*\
  !*** ../../main/dist/defer.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var CancelToken_1 = __webpack_require__(/*! ./CancelToken */ "../../main/dist/CancelToken.js");
/**
 * Promise wrapper over setTimeout function with CancelToken support. Resolves the promise after specified
 * period of time. Never rejects the promise. If the operation gets cancelled via the token, the promise never gets
 * resolved or rejected.
 * @param ms Timeout duration in milliseconds.
 * @param cancelToken Cancellation token to bind the operation to.
 * @returns Promise object representing the timeout.
 */


function default_1(ms, cancelToken) {
  var timeout;
  return CancelToken_1.runAsync(function (resolve) {
    timeout = setTimeout(resolve, ms);
  }, function () {
    clearTimeout(timeout);
  }, cancelToken);
}

exports.default = default_1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkU7Ozs7OztBQUVGLElBQUEsYUFBQSxHQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUE7QUFFQTs7Ozs7OztBQU9HOzs7QUFDSCxTQUFBLFNBQUEsQ0FBeUIsRUFBekIsRUFBc0MsV0FBdEMsRUFBK0Q7QUFDOUQsTUFBSSxPQUFKO0FBQ0EsU0FBTyxhQUFBLENBQUEsUUFBQSxDQUNOLFVBQUEsT0FBTyxFQUFHO0FBQ1QsSUFBQSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQUQsRUFBVSxFQUFWLENBQXBCO0FBQ0EsR0FISyxFQUlOLFlBQUs7QUFDSixJQUFBLFlBQVksQ0FBQyxPQUFELENBQVo7QUFDQSxHQU5LLEVBT04sV0FQTSxDQUFQO0FBU0E7O0FBWEQsT0FBQSxDQUFBLE9BQUEsR0FBQSxTQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IENhbmNlbFRva2VuLCB7cnVuQXN5bmN9IGZyb20gXCIuL0NhbmNlbFRva2VuXCI7XG5cbi8qKlxuICogUHJvbWlzZSB3cmFwcGVyIG92ZXIgc2V0VGltZW91dCBmdW5jdGlvbiB3aXRoIENhbmNlbFRva2VuIHN1cHBvcnQuIFJlc29sdmVzIHRoZSBwcm9taXNlIGFmdGVyIHNwZWNpZmllZFxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xuICogcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXG4gKiBAcGFyYW0gbXMgVGltZW91dCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cbiAqIEByZXR1cm5zIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdGltZW91dC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG1zPzogbnVtYmVyLCBjYW5jZWxUb2tlbj86IENhbmNlbFRva2VuKTogUHJvbWlzZTx2b2lkPiB7XG5cdGxldCB0aW1lb3V0OiBhbnk7XG5cdHJldHVybiBydW5Bc3luYzx2b2lkPihcblx0XHRyZXNvbHZlID0+IHtcblx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcblx0XHR9LFxuXHRcdCgpID0+IHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR9LFxuXHRcdGNhbmNlbFRva2VuXG5cdCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "../../main/dist/hash.js":
/*!*******************************!*\
  !*** ../../main/dist/hash.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var Property_1 = __importDefault(__webpack_require__(/*! ./Property */ "../../main/dist/Property.js"));

var Hash = /*#__PURE__*/function (_Property_1$default) {
  _inherits(Hash, _Property_1$default);

  var _super = _createSuper(Hash);

  function Hash() {
    var _this;

    _classCallCheck(this, Hash);

    _this = _super.call(this, location.hash.substr(1));
    _this.redirectionDetectionInterval = 1000;
    _this.redirectionDetectionLimit = 25;
    _this.redirectionStartTime = Number.NEGATIVE_INFINITY;
    _this.redirectionUrls = [];
    _this.redirectionLocked = false;
    _this._updating = false;

    if (hash != null) {
      throw new Error("Hash is a singleton. Unable to create more instances.");
    }

    hash = _assertThisInitialized(_this);
    jquery_1.default(window).on("hashchange", function () {
      _this.set(location.hash.substr(1));
    });
    return _this;
  }

  _createClass(Hash, [{
    key: "updating",
    get: function get() {
      return this._updating;
    }
  }, {
    key: "set",
    value: function set() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var replaceState = arguments.length > 1 ? arguments[1] : undefined;

      if (this.redirectionLocked) {
        return;
      }

      var oldValue = this.value;

      if (oldValue === value) {
        return;
      }

      var time = new Date().getTime();

      if (time - this.redirectionStartTime < this.redirectionDetectionInterval) {
        this.redirectionUrls.push(value);

        if (this.redirectionUrls.length > this.redirectionDetectionLimit) {
          console.error("Endless URL redirection detected. Preventing all further redirections. See URLs below. " + "If this information is not enough, please set breakpoint to this method and find out what causes " + "unexpected redirection calls. Probably you have misconfigured some router - " + "please check router names and parents.");
          console.log(this.redirectionUrls);
          this.redirectionLocked = true;
          return;
        }
      } else {
        this.redirectionStartTime = time;
        this.redirectionUrls = [value];
      }

      this._updating = true;
      this.value = value;

      if (replaceState && window.history && history.replaceState) {
        history.replaceState(null, "", location.pathname + "#" + value);
      } else {
        location.hash = "#" + value;
      }

      this._onChange.dispatch({
        sender: this,
        value: value,
        oldValue: oldValue
      });

      this._updating = false;
    }
  }]);

  return Hash;
}(Property_1.default);
/**
 * Instance of IHash singleton. Provides a transparent Property-compatible interface over `location.hash`
 * manipulations. Value of this property is always equal to `location.hash` without leading "#" symbol.
 * Has a built-in protection against infinite redirections.
 */


var hash = null; // An extra variable helps IntelliSense to find this import

new Hash();
exports.default = hash;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxHQUFpQixLQUFqQjtBQUNBOzs7O0VBN0RpQixVQUFBLENBQUEsTztBQWdFbkI7Ozs7QUFJRzs7O0FBQ0gsSUFBSSxJQUFJLEdBQVUsSUFBbEIsQyxDQUF3Qjs7QUFDeEIsSUFBSSxJQUFKO0FBQ0EsT0FBQSxDQUFBLE9BQUEsR0FBZSxJQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IGpRdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgSVByb3BlcnR5IGZyb20gXCIuL0lQcm9wZXJ0eVwiO1xuaW1wb3J0IFByb3BlcnR5IGZyb20gXCIuL1Byb3BlcnR5XCI7XG5cbi8qKlxuICogSW50ZXJmYWNlIG9mIGBoYXNoYCBvYmplY3QuIEV4dGVuc2lvbiBvZiBJUHJvcGVydHk8c3RyaW5nPiBpbnRlcmZhY2Ugd2l0aCBgdXBkYXRpbmdgIHN0YXR1cyBpbmRpY2F0b3IgYW5kXG4gKiBgcmVwbGFjZVN0YXRlYCBvcHRpb25hbCBwYXJhbWV0ZXIgb2YgYHNldGAgbWV0aG9kLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElIYXNoIGV4dGVuZHMgSVByb3BlcnR5PHN0cmluZz4ge1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgaGFzaCBhc3NpZ25tZW50IGlzIGluIHByb2dyZXNzIGF0IHRoZSBtb21lbnQuIFdoaWxlIGB1cGRhdGluZ2AgaXMgdHJ1ZSwgYGxvY2F0aW9uLmhhc2hgXG5cdCAqIGdldHMgbW9kaWZpZWQgYW5kIGEgY2hhbmdlIG1lc3NhZ2UgZ2V0cyBkaXNwYXRjaGVkLiBDaGVja2luZyB0aGlzIGZsYWcgaW4gY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVycyBtYXkgcHJldmVudFxuXHQgKiBpbmZpbml0ZSBsb29wcyBhbmQgdW5leHBlY3RlZCBjYWxsYmFjayBjb25mbGljdHMuXG5cdCAqL1xuXHRyZWFkb25seSB1cGRhdGluZzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQXNzaWducyBgbG9jYXRpb24uaGFzaGAgdG8gYSBuZXcgdmFsdWUgYW5kIGRpc3BhdGNoZXMgYSBjaGFuZ2UgbWVzc2FnZS4gUmFpc2VzIGB1cGRhdGluZ2AgZmxhZyB0byBwcmV2ZW50XG5cdCAqIGluZmluaXRlIGxvb3BzIGFuZCBjYWxsYmFjayBjb25mbGljdHMgZHVyaW5nIHRoaXMgdGltZS5cblx0ICogQHBhcmFtIHZhbHVlIE5ldyBoYXNoIHZhbHVlIHRvIGFzc2lnbi5cblx0ICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZSBzdGFjay5cblx0ICovXG5cdHNldCh2YWx1ZTogc3RyaW5nLCByZXBsYWNlU3RhdGU/OiBib29sZWFuKTogdm9pZDtcbn1cblxuY2xhc3MgSGFzaCBleHRlbmRzIFByb3BlcnR5PHN0cmluZz4gaW1wbGVtZW50cyBJSGFzaCB7XG5cblx0cHJpdmF0ZSByZWFkb25seSByZWRpcmVjdGlvbkRldGVjdGlvbkludGVydmFsID0gMTAwMDtcblx0cHJpdmF0ZSByZWFkb25seSByZWRpcmVjdGlvbkRldGVjdGlvbkxpbWl0ID0gMjU7XG5cblx0cHJpdmF0ZSByZWRpcmVjdGlvblN0YXJ0VGltZSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblx0cHJpdmF0ZSByZWRpcmVjdGlvblVybHM6IHN0cmluZ1tdID0gW107XG5cdHByaXZhdGUgcmVkaXJlY3Rpb25Mb2NrZWQgPSBmYWxzZTtcblxuXHRwcml2YXRlIF91cGRhdGluZyA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKGxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcblx0XHRpZiAoaGFzaCAhPSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJIYXNoIGlzIGEgc2luZ2xldG9uLiBVbmFibGUgdG8gY3JlYXRlIG1vcmUgaW5zdGFuY2VzLlwiKVxuXHRcdH1cblx0XHRoYXNoID0gdGhpcztcblx0XHRqUXVlcnkod2luZG93KS5vbihcImhhc2hjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0dGhpcy5zZXQobG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0IHVwZGF0aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl91cGRhdGluZztcblx0fVxuXG5cdHNldCh2YWx1ZTogc3RyaW5nID0gXCJcIiwgcmVwbGFjZVN0YXRlPzogYm9vbGVhbikge1xuXHRcdGlmICh0aGlzLnJlZGlyZWN0aW9uTG9ja2VkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcblx0XHRpZiAob2xkVmFsdWUgPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdGlmICh0aW1lIC0gdGhpcy5yZWRpcmVjdGlvblN0YXJ0VGltZSA8IHRoaXMucmVkaXJlY3Rpb25EZXRlY3Rpb25JbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5yZWRpcmVjdGlvblVybHMucHVzaCh2YWx1ZSk7XG5cdFx0XHRpZiAodGhpcy5yZWRpcmVjdGlvblVybHMubGVuZ3RoID4gdGhpcy5yZWRpcmVjdGlvbkRldGVjdGlvbkxpbWl0KSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFbmRsZXNzIFVSTCByZWRpcmVjdGlvbiBkZXRlY3RlZC4gUHJldmVudGluZyBhbGwgZnVydGhlciByZWRpcmVjdGlvbnMuIFNlZSBVUkxzIGJlbG93LiBcIiArXG5cdFx0XHRcdFx0XCJJZiB0aGlzIGluZm9ybWF0aW9uIGlzIG5vdCBlbm91Z2gsIHBsZWFzZSBzZXQgYnJlYWtwb2ludCB0byB0aGlzIG1ldGhvZCBhbmQgZmluZCBvdXQgd2hhdCBjYXVzZXMgXCIgK1xuXHRcdFx0XHRcdFwidW5leHBlY3RlZCByZWRpcmVjdGlvbiBjYWxscy4gUHJvYmFibHkgeW91IGhhdmUgbWlzY29uZmlndXJlZCBzb21lIHJvdXRlciAtIFwiICtcblx0XHRcdFx0XHRcInBsZWFzZSBjaGVjayByb3V0ZXIgbmFtZXMgYW5kIHBhcmVudHMuXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnJlZGlyZWN0aW9uVXJscyk7XG5cdFx0XHRcdHRoaXMucmVkaXJlY3Rpb25Mb2NrZWQgPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVkaXJlY3Rpb25TdGFydFRpbWUgPSB0aW1lO1xuXHRcdFx0dGhpcy5yZWRpcmVjdGlvblVybHMgPSBbdmFsdWVdO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0aWYgKHJlcGxhY2VTdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeSAmJiBoaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgXCJcIiwgbG9jYXRpb24ucGF0aG5hbWUgKyBcIiNcIiArIHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bG9jYXRpb24uaGFzaCA9IFwiI1wiICsgdmFsdWU7XG5cdFx0fVxuXHRcdHRoaXMuX29uQ2hhbmdlLmRpc3BhdGNoKHtzZW5kZXI6IHRoaXMsIHZhbHVlLCBvbGRWYWx1ZX0pO1xuXHRcdHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG5cdH1cbn1cblxuLyoqXG4gKiBJbnN0YW5jZSBvZiBJSGFzaCBzaW5nbGV0b24uIFByb3ZpZGVzIGEgdHJhbnNwYXJlbnQgUHJvcGVydHktY29tcGF0aWJsZSBpbnRlcmZhY2Ugb3ZlciBgbG9jYXRpb24uaGFzaGBcbiAqIG1hbmlwdWxhdGlvbnMuIFZhbHVlIG9mIHRoaXMgcHJvcGVydHkgaXMgYWx3YXlzIGVxdWFsIHRvIGBsb2NhdGlvbi5oYXNoYCB3aXRob3V0IGxlYWRpbmcgXCIjXCIgc3ltYm9sLlxuICogSGFzIGEgYnVpbHQtaW4gcHJvdGVjdGlvbiBhZ2FpbnN0IGluZmluaXRlIHJlZGlyZWN0aW9ucy5cbiAqL1xubGV0IGhhc2g6IElIYXNoID0gbnVsbDsgLy8gQW4gZXh0cmEgdmFyaWFibGUgaGVscHMgSW50ZWxsaVNlbnNlIHRvIGZpbmQgdGhpcyBpbXBvcnRcbm5ldyBIYXNoKCk7XG5leHBvcnQgZGVmYXVsdCBoYXNoO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

/***/ "./router/Application.ts":
/*!*******************************!*\
  !*** ./router/Application.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var hash_1 = __importDefault(__webpack_require__(/*! jwidget/hash */ "../../main/dist/hash.js"));

var RouteRedirector_1 = __importDefault(__webpack_require__(/*! jwidget/RouteRedirector */ "../../main/dist/RouteRedirector.js"));

var Switcher_1 = __importDefault(__webpack_require__(/*! jwidget/Switcher */ "../../main/dist/Switcher.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var UIRouter_1 = __importDefault(__webpack_require__(/*! jwidget/UIRouter */ "../../main/dist/UIRouter.js"));

var Compose_1 = __importDefault(__webpack_require__(/*! ./Compose */ "./router/Compose.ts"));

var Inbox_1 = __importDefault(__webpack_require__(/*! ./Inbox */ "./router/Inbox.ts"));

var NotFound_1 = __importDefault(__webpack_require__(/*! ./NotFound */ "./router/NotFound.ts"));

var Settings_1 = __importDefault(__webpack_require__(/*! ./Settings */ "./router/Settings.ts"));

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
              return new RouteRedirector_1.default("inbox", _this.router);
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
exports.default = Application;

/***/ }),

/***/ "./router/Compose.ts":
/*!***************************!*\
  !*** ./router/Compose.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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
exports.default = Compose;

/***/ }),

/***/ "./router/EmailList.ts":
/*!*****************************!*\
  !*** ./router/EmailList.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jwidget_1 = __webpack_require__(/*! jwidget */ "../../main/dist/index.js");

var ArrayMapper_1 = __webpack_require__(/*! jwidget/collection/ArrayMapper */ "../../main/dist/collection/ArrayMapper.js");

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

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
      return this.own(ArrayMapper_1.startMappingArray(this.emails, function (email) {
        return new EmailListItem_1.default(email);
      }, {
        destroy: jwidget_1.destroy
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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
exports.default = EmailListItem;

/***/ }),

/***/ "./router/EmailNotFound.ts":
/*!*********************************!*\
  !*** ./router/EmailNotFound.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var RouteRedirector_1 = __webpack_require__(/*! jwidget/RouteRedirector */ "../../main/dist/RouteRedirector.js");

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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

        RouteRedirector_1.redirectRoute("inbox");
      });
    }
  }]);

  return EmailNotFound;
}(Component_1.default);

EmailNotFound = __decorate([template_1.default(__webpack_require__(/*! ./EmailNotFound.jw.html */ "./router/EmailNotFound.jw.html"))], EmailNotFound);
exports.default = EmailNotFound;

/***/ }),

/***/ "./router/EmailView.ts":
/*!*****************************!*\
  !*** ./router/EmailView.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var RouteRedirector_1 = __webpack_require__(/*! jwidget/RouteRedirector */ "../../main/dist/RouteRedirector.js");

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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

        RouteRedirector_1.redirectRoute("", _this2.parentRouter);
      });
    }
  }]);

  return EmailView;
}(Component_1.default);

EmailView = __decorate([template_1.default(__webpack_require__(/*! ./EmailView.jw.html */ "./router/EmailView.jw.html"))], EmailView);
exports.default = EmailView;

/***/ }),

/***/ "./router/Inbox.ts":
/*!*************************!*\
  !*** ./router/Inbox.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var BindableArray_1 = __importDefault(__webpack_require__(/*! jwidget/BindableArray */ "../../main/dist/BindableArray.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var UIRouter_1 = __importDefault(__webpack_require__(/*! jwidget/UIRouter */ "../../main/dist/UIRouter.js"));

var data_1 = __webpack_require__(/*! ./data */ "./router/data.ts");

var EmailList_1 = __importDefault(__webpack_require__(/*! ./EmailList */ "./router/EmailList.ts"));

var EmailNotFound_1 = __importDefault(__webpack_require__(/*! ./EmailNotFound */ "./router/EmailNotFound.ts"));

var EmailView_1 = __importDefault(__webpack_require__(/*! ./EmailView */ "./router/EmailView.ts"));

var Inbox = /*#__PURE__*/function (_Component_1$default) {
  _inherits(Inbox, _Component_1$default);

  var _super = _createSuper(Inbox);

  function Inbox(path, parentRouter) {
    var _this;

    _classCallCheck(this, Inbox);

    _this = _super.call(this);
    _this.path = path;
    _this.parentRouter = parentRouter;
    _this.emails = new BindableArray_1.default(data_1.EMAILS, true);
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
exports.default = Inbox;

/***/ }),

/***/ "./router/NotFound.ts":
/*!****************************!*\
  !*** ./router/NotFound.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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
exports.default = Settings;

/***/ }),

/***/ "./router/data.ts":
/*!************************!*\
  !*** ./router/data.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var initExample_1 = __importDefault(__webpack_require__(/*! ../common/initExample */ "./common/initExample.ts"));

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./router/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("router", ["index.ts", "data.ts", "Application.ts", "Application.jw.html", "Compose.ts", "Email.ts", "EmailList.ts", "EmailListItem.ts", "EmailNotFound.ts", "EmailNotFound.jw.html", "EmailView.ts", "EmailView.jw.html", "Inbox.ts", "Inbox.jw.html", "NotFound.ts", "Settings.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_bindVal_js","main_dist_CancelToken_js-common_initExample_ts"], function() { return __webpack_exec__("./router/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yb3V0ZXIvQXBwbGljYXRpb24uancuaHRtbCIsIndlYnBhY2s6Ly8vLi9yb3V0ZXIvRW1haWxOb3RGb3VuZC5qdy5odG1sIiwid2VicGFjazovLy8uL3JvdXRlci9FbWFpbFZpZXcuancuaHRtbCIsIndlYnBhY2s6Ly8vLi9yb3V0ZXIvSW5ib3guancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vbWFpbi9kaXN0L1JvdXRlUmVkaXJlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vbWFpbi9kaXN0L1JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi4vbWFpbi9kaXN0L1VJUm91dGVyLmpzIiwid2VicGFjazovLy8uLi9tYWluL2Rpc3QvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL21haW4vZGlzdC9oYXNoLmpzIiwid2VicGFjazovLy8uL3JvdXRlci9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9yb3V0ZXIvQ29tcG9zZS50cyIsIndlYnBhY2s6Ly8vLi9yb3V0ZXIvRW1haWxMaXN0LnRzIiwid2VicGFjazovLy8uL3JvdXRlci9FbWFpbExpc3RJdGVtLnRzIiwid2VicGFjazovLy8uL3JvdXRlci9FbWFpbE5vdEZvdW5kLnRzIiwid2VicGFjazovLy8uL3JvdXRlci9FbWFpbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVyL0luYm94LnRzIiwid2VicGFjazovLy8uL3JvdXRlci9Ob3RGb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9yb3V0ZXIvU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVyL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsbWM7Ozs7Ozs7Ozs7QUNBQSwySzs7Ozs7Ozs7OztBQ0FBLHdKOzs7Ozs7Ozs7O0FDQUEsNkY7Ozs7Ozs7Ozs7O0FDQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDaEM7QUFEbUI7QUFBYTtBQUVoQzs7OztXQUVTLG9CQUFXLEVBQVgsRUFBcUI7QUFDOUIsUUFBRSxDQUFDLElBQUgsQ0FBUSx5QkFBeUIsS0FBSyxLQUE5QixHQUFzQyxnQkFBOUM7QUFDQTs7OztFQVJvQyxtQjs7QUFBdEMsMkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBOztBQUNBOztBQUdBLElBQXFCLFFBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUEsRUFBc0MsbUJBQXRDOztBQUFxQixRQUFRLGVBRDVCLG1CQUFTLDhEQUFULENBQzRCLEdBQVIsUUFBUSxDQUFSO2tCQUFBLFE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlIsaUJBQVMsQ0FDckI7QUFDQyxJQUFFLEVBQUUsR0FETDtBQUVDLFNBQU8sRUFBRSxPQUZWO0FBR0MsU0FBTyxFQUFFO0FBSFYsQ0FEcUIsRUFLbEI7QUFDRixJQUFFLEVBQUUsR0FERjtBQUVGLFNBQU8sRUFBRSxRQUZQO0FBR0YsU0FBTyxFQUFFO0FBSFAsQ0FMa0IsQ0FBVCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FiOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxRQUFaLEVBQXNCLENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0IsZ0JBQXhCLEVBQTBDLHFCQUExQyxFQUFpRSxZQUFqRSxFQUNyQixVQURxQixFQUNULGNBRFMsRUFDTyxrQkFEUCxFQUMyQixrQkFEM0IsRUFDK0MsdUJBRC9DLEVBQ3dFLGNBRHhFLEVBRXJCLG1CQUZxQixFQUVBLFVBRkEsRUFFWSxlQUZaLEVBRTZCLGFBRjdCLEVBRTRDLGFBRjVDLENBQXRCO0FBSUEsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBTkQsRSIsImZpbGUiOiJidW5kbGUtcm91dGVyLTI0NjRlM2I2ZDY3MTdjMWY1ZDcwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiYXBwbGljYXRpb25cXFwiPjxkaXYgandpZD1cXFwiaGVhZGVyXFxcIj48Zm9ybSBqd2lkPVxcXCJ1cmwtZm9ybVxcXCI+PGI+Q3VycmVudCBVUkwgaGFzaDo8L2I+ICNcXG5cXHRcXHRcXHQ8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgandpZD1cXFwidXJsXFxcIj48aW5wdXQgdHlwZT1cXFwic3VibWl0XFxcIiB2YWx1ZT1cXFwiQ2hhbmdlIG5vdyFcXFwiPjwvZm9ybT48ZGl2PjxiPlBhZ2VzOjwvYj48YSBqd2lkPVxcXCJyb3V0ZVxcXCIgZGF0YS1yb3V0ZT1cXFwiaW5ib3hcXFwiPkluYm94PC9hPiB8XFxuXFx0XFx0XFx0PGEgandpZD1cXFwicm91dGVcXFwiIGRhdGEtcm91dGU9XFxcImNvbXBvc2VcXFwiPkNvbXBvc2U8L2E+IHxcXG5cXHRcXHRcXHQ8YSBqd2lkPVxcXCJyb3V0ZVxcXCIgZGF0YS1yb3V0ZT1cXFwic2V0dGluZ3NcXFwiPlNldHRpbmdzPC9hPjwvZGl2PjwvZGl2PjxkaXYgandpZD1cXFwicGFnZVxcXCI+PC9kaXY+PC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiZW1haWwtbm90LWZvdW5kXFxcIj48ZGl2PkVtYWlsIHdpdGggaWQgPHNwYW4gandpZD1cXFwiaWRcXFwiPjwvc3Bhbj4gaXMgbm90IGZvdW5kPC9kaXY+PGRpdj48YSBqd2lkPVxcXCJiYWNrXFxcIiBocmVmPVxcXCIjXFxcIj5CYWNrPC9hPjwvZGl2PjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImVtYWlsXFxcIj48aDMgandpZD1cXFwic3VtbWFyeVxcXCI+PC9oMz48ZGl2IGp3aWQ9XFxcImNvbnRlbnRcXFwiPjwvZGl2PjxkaXY+PGEgandpZD1cXFwiYmFja1xcXCIgaHJlZj1cXFwiI1xcXCI+QmFjazwvYT48L2Rpdj48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJpbmJveFxcXCI+PGgyPkluYm94PC9oMj48ZGl2IGp3aWQ9XFxcImNvbnRlbnRcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbnZhciBfX2ltcG9ydERlZmF1bHQgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19pbXBvcnREZWZhdWx0IHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgcmV0dXJuIG1vZCAmJiBtb2QuX19lc01vZHVsZSA/IG1vZCA6IHtcbiAgICBcImRlZmF1bHRcIjogbW9kXG4gIH07XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZWRpcmVjdFJvdXRlID0gdm9pZCAwO1xuXG52YXIgQ2FuY2VsVG9rZW5fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW5jZWxUb2tlblwiKSk7XG5cbnZhciBDb21wb25lbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db21wb25lbnRcIikpO1xuXG52YXIgZGVmZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9kZWZlclwiKSk7XG5cbnZhciBoYXNoXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vaGFzaFwiKSk7XG5cbnZhciBSb3V0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Sb3V0ZXJcIikpO1xuLyoqXHJcbiAqIFJlY29tbWVuZGVkIHdheSB0byBwZXJmb3JtIGFuIGFzeW5jcm9ub3VzIHJlZGlyZWN0aW9uIGluIFJvdXRlciBgaGFuZGxlcmAgZnVuY3Rpb24uXHJcbiAqL1xuXG5cbnZhciBSb3V0ZVJlZGlyZWN0b3IgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Db21wb25lbnRfMSRkZWZhdWx0KSB7XG4gIF9pbmhlcml0cyhSb3V0ZVJlZGlyZWN0b3IsIF9Db21wb25lbnRfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFJvdXRlUmVkaXJlY3Rvcik7XG5cbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyByZWRpcmVjdG9yLlxyXG4gICAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gcm91dGVyLlxyXG4gICAqIEBwYXJhbSByb3V0ZXIgUmVkaXJlY3QgcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXHJcbiAgICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZVxyXG4gICAqIHN0YWNrLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAqL1xuICBmdW5jdGlvbiBSb3V0ZVJlZGlyZWN0b3IocGF0aCwgcm91dGVyKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIHJlcGxhY2VTdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogdHJ1ZTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSb3V0ZVJlZGlyZWN0b3IpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5wYXRoID0gcGF0aDtcbiAgICBfdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgX3RoaXMucmVwbGFjZVN0YXRlID0gcmVwbGFjZVN0YXRlO1xuICAgIGRlZmVyXzEuZGVmYXVsdCgwLCBfdGhpcy5vd24obmV3IENhbmNlbFRva2VuXzEuZGVmYXVsdCgpKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZWRpcmVjdFJvdXRlKF90aGlzLnBhdGgsIF90aGlzLnJvdXRlciwgX3RoaXMucmVwbGFjZVN0YXRlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICByZXR1cm4gUm91dGVSZWRpcmVjdG9yO1xufShDb21wb25lbnRfMS5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVSZWRpcmVjdG9yO1xuLyoqXHJcbiAqIEltbWVkaWF0ZWx5IHBlcmZvcm1zIHRoZSByZWRpcmVjdGlvbiwgaS5lLiBzZXRzIGBoYXNoYCB0byBgZ2V0RnVsbFBhdGgocGF0aCwgcm91dGVyKWAuXHJcbiAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gYHJvdXRlcmAuXHJcbiAqIEBwYXJhbSByb3V0ZXIgUmVkaXJlY3QgcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuIEJ5IGRlZmF1bHQsIHBlcmZvcm1zIGEgZ2xvYmFsIHJlZGlyZWN0aW9uLlxyXG4gKiBAcGFyYW0gcmVwbGFjZVN0YXRlIFJlcGxhY2UgdGhlIGN1cnJlbnQgYnJvd3NlciBoaXN0b3JpY2FsIHN0YXRlIHJhdGhlciB0aGFuIHB1c2hpbmcgYSBuZXcgc3RhdGUgdG8gdGhlIHN0YWNrLlxyXG4gKi9cblxuZnVuY3Rpb24gcmVkaXJlY3RSb3V0ZShwYXRoLCByb3V0ZXIsIHJlcGxhY2VTdGF0ZSkge1xuICB0cnkge1xuICAgIHBhdGggPSBSb3V0ZXJfMS5kZWZhdWx0LmdldEZ1bGxQYXRoKHBhdGgsIHJvdXRlcik7XG5cbiAgICBpZiAoaGFzaF8xLmRlZmF1bHQudXBkYXRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVwZGF0ZSBjeWNsZSBpcyBhbHJlYWR5IGFjdGl2ZS4gXCIgKyBcIlN1Z2dlc3QgdXNpbmcgUm91dGVyLlJlZGlyZWN0b3Igb3IgbW92aW5nIFVSTCByZWRpcmVjdGlvbiB0byBhbiBhc3luY3Jvbm91cyBjYWxsYmFjay5cIik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG5vdCBwZXJmb3JtIFVSTCByZWRpcmVjdGlvbiB0byBcIiArIHBhdGggKyBcIjogXCIgKyBlLm1lc3NhZ2UpO1xuICB9XG5cbiAgaGFzaF8xLmRlZmF1bHQuc2V0KHBhdGgsIHJlcGxhY2VTdGF0ZSk7XG59XG5cbmV4cG9ydHMucmVkaXJlY3RSb3V0ZSA9IHJlZGlyZWN0Um91dGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVNiM1YwWlZKbFpHbHlaV04wYjNJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCT3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJjMEpGT3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJSVVlzU1VGQlFTeGhRVUZCTEVkQlFVRXNaVUZCUVN4RFFVRkJMRTlCUVVFc1EwRkJRU3hsUVVGQkxFTkJRVUVzUTBGQlFUczdRVUZEUVN4SlFVRkJMRmRCUVVFc1IwRkJRU3hsUVVGQkxFTkJRVUVzVDBGQlFTeERRVUZCTEdGQlFVRXNRMEZCUVN4RFFVRkJPenRCUVVOQkxFbEJRVUVzVDBGQlFTeEhRVUZCTEdWQlFVRXNRMEZCUVN4UFFVRkJMRU5CUVVFc1UwRkJRU3hEUVVGQkxFTkJRVUU3TzBGQlEwRXNTVUZCUVN4TlFVRkJMRWRCUVVFc1pVRkJRU3hEUVVGQkxFOUJRVUVzUTBGQlFTeFJRVUZCTEVOQlFVRXNRMEZCUVRzN1FVRkRRU3hKUVVGQkxGRkJRVUVzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRkJMRlZCUVVFc1EwRkJRU3hEUVVGQk8wRkJSVUU3TzBGQlJVYzdPenRKUVVOclFpeGxPenM3T3p0QlFVTndRanM3T3pzN08wRkJUVWM3UVVGRFNDd3lRa0ZCYjBJc1NVRkJjRUlzUlVGQk1FTXNUVUZCTVVNc1JVRkJNa1k3UVVGQlFUczdRVUZCUVN4UlFVRnVRaXhaUVVGdFFpeDFSVUZCU2l4SlFVRkpPenRCUVVGQk96dEJRVU14Ump0QlFVUnRRaXhWUVVGQkxFbEJRVUVzUjBGQlFTeEpRVUZCTzBGQlFYTkNMRlZCUVVFc1RVRkJRU3hIUVVGQkxFMUJRVUU3UVVGQk9FSXNWVUZCUVN4WlFVRkJMRWRCUVVFc1dVRkJRVHRCUVVWMlJTeEpRVUZCTEU5QlFVRXNRMEZCUVN4UFFVRkJMRU5CUVUwc1EwRkJUaXhGUVVGVExFMUJRVXNzUjBGQlRDeERRVUZUTEVsQlFVa3NZVUZCUVN4RFFVRkJMRTlCUVVvc1JVRkJWQ3hEUVVGVUxFVkJRWE5ETEVsQlFYUkRMRU5CUVRKRExGbEJRVXM3UVVGREwwTXNUVUZCUVN4aFFVRmhMRU5CUVVNc1RVRkJTeXhKUVVGT0xFVkJRVmtzVFVGQlN5eE5RVUZxUWl4RlFVRjVRaXhOUVVGTExGbEJRVGxDTEVOQlFXSTdRVUZEUVN4TFFVWkVPMEZCUmpCR08wRkJTekZHT3pzN1JVRmlNa01zVjBGQlFTeERRVUZCTEU4N08wRkJRVGRETEU5QlFVRXNRMEZCUVN4UFFVRkJMRWRCUVVFc1pVRkJRVHRCUVdkQ1FUczdPenM3UVVGTFJ6czdRVUZEU0N4VFFVRm5RaXhoUVVGb1FpeERRVUU0UWl4SlFVRTVRaXhGUVVFMFF5eE5RVUUxUXl4RlFVRnJSU3haUVVGc1JTeEZRVUYzUmp0QlFVTjJSaXhOUVVGSk8wRkJRMGdzU1VGQlFTeEpRVUZKTEVkQlFVY3NVVUZCUVN4RFFVRkJMRTlCUVVFc1EwRkJUeXhYUVVGUUxFTkJRVzFDTEVsQlFXNUNMRVZCUVhsQ0xFMUJRWHBDTEVOQlFWQTdPMEZCUTBFc1VVRkJTU3hOUVVGQkxFTkJRVUVzVDBGQlFTeERRVUZMTEZGQlFWUXNSVUZCYlVJN1FVRkRiRUlzV1VGQlRTeEpRVUZKTEV0QlFVb3NRMEZCVlN4eFEwRkRaaXgxUmtGRVN5eERRVUZPTzBGQlJVRTdRVUZEUkN4SFFVNUVMRU5CVFVVc1QwRkJUeXhEUVVGUUxFVkJRVlU3UVVGRFdDeFZRVUZOTEVsQlFVa3NTMEZCU2l4RFFVRlZMSGREUVVGM1F5eEpRVUY0UXl4SFFVRXJReXhKUVVFdlF5eEhRVUZ6UkN4RFFVRkRMRU5CUVVNc1QwRkJiRVVzUTBGQlRqdEJRVU5CT3p0QlFVTkVMRVZCUVVFc1RVRkJRU3hEUVVGQkxFOUJRVUVzUTBGQlN5eEhRVUZNTEVOQlFWTXNTVUZCVkN4RlFVRmxMRmxCUVdZN1FVRkRRVHM3UVVGWVJDeFBRVUZCTEVOQlFVRXNZVUZCUVN4SFFVRkJMR0ZCUVVFaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLbHh1VFVsVUlFeHBZMlZ1YzJWY2JseHVRMjl3ZVhKcFoyaDBJQ2hqS1NBeU1ESXhJRVZuYjNJZ1RtVndiMjF1ZVdGelkyaHBhRnh1WEc1UVpYSnRhWE56YVc5dUlHbHpJR2hsY21WaWVTQm5jbUZ1ZEdWa0xDQm1jbVZsSUc5bUlHTm9ZWEpuWlN3Z2RHOGdZVzU1SUhCbGNuTnZiaUJ2WW5SaGFXNXBibWNnWVNCamIzQjVYRzV2WmlCMGFHbHpJSE52Wm5SM1lYSmxJR0Z1WkNCaGMzTnZZMmxoZEdWa0lHUnZZM1Z0Wlc1MFlYUnBiMjRnWm1sc1pYTWdLSFJvWlNCY0lsTnZablIzWVhKbFhDSXBMQ0IwYnlCa1pXRnNYRzVwYmlCMGFHVWdVMjltZEhkaGNtVWdkMmwwYUc5MWRDQnlaWE4wY21samRHbHZiaXdnYVc1amJIVmthVzVuSUhkcGRHaHZkWFFnYkdsdGFYUmhkR2x2YmlCMGFHVWdjbWxuYUhSelhHNTBieUIxYzJVc0lHTnZjSGtzSUcxdlpHbG1lU3dnYldWeVoyVXNJSEIxWW14cGMyZ3NJR1JwYzNSeWFXSjFkR1VzSUhOMVlteHBZMlZ1YzJVc0lHRnVaQzl2Y2lCelpXeHNYRzVqYjNCcFpYTWdiMllnZEdobElGTnZablIzWVhKbExDQmhibVFnZEc4Z2NHVnliV2wwSUhCbGNuTnZibk1nZEc4Z2QyaHZiU0IwYUdVZ1UyOW1kSGRoY21VZ2FYTmNibVoxY201cGMyaGxaQ0IwYnlCa2J5QnpieXdnYzNWaWFtVmpkQ0IwYnlCMGFHVWdabTlzYkc5M2FXNW5JR052Ym1ScGRHbHZibk02WEc1Y2JsUm9aU0JoWW05MlpTQmpiM0I1Y21sbmFIUWdibTkwYVdObElHRnVaQ0IwYUdseklIQmxjbTFwYzNOcGIyNGdibTkwYVdObElITm9ZV3hzSUdKbElHbHVZMngxWkdWa0lHbHVJR0ZzYkZ4dVkyOXdhV1Z6SUc5eUlITjFZbk4wWVc1MGFXRnNJSEJ2Y25ScGIyNXpJRzltSUhSb1pTQlRiMlowZDJGeVpTNWNibHh1VkVoRklGTlBSbFJYUVZKRklFbFRJRkJTVDFaSlJFVkVJRndpUVZNZ1NWTmNJaXdnVjBsVVNFOVZWQ0JYUVZKU1FVNVVXU0JQUmlCQlRsa2dTMGxPUkN3Z1JWaFFVa1ZUVXlCUFVseHVTVTFRVEVsRlJDd2dTVTVEVEZWRVNVNUhJRUpWVkNCT1QxUWdURWxOU1ZSRlJDQlVUeUJVU0VVZ1YwRlNVa0ZPVkVsRlV5QlBSaUJOUlZKRFNFRk9WRUZDU1V4SlZGa3NYRzVHU1ZST1JWTlRJRVpQVWlCQklGQkJVbFJKUTFWTVFWSWdVRlZTVUU5VFJTQkJUa1FnVGs5T1NVNUdVa2xPUjBWTlJVNVVMaUJKVGlCT1R5QkZWa1ZPVkNCVFNFRk1UQ0JVU0VWY2JrRlZWRWhQVWxNZ1QxSWdRMDlRV1ZKSlIwaFVJRWhQVEVSRlVsTWdRa1VnVEVsQlFreEZJRVpQVWlCQlRsa2dRMHhCU1Uwc0lFUkJUVUZIUlZNZ1QxSWdUMVJJUlZKY2JreEpRVUpKVEVsVVdTd2dWMGhGVkVoRlVpQkpUaUJCVGlCQlExUkpUMDRnVDBZZ1EwOU9WRkpCUTFRc0lGUlBVbFFnVDFJZ1QxUklSVkpYU1ZORkxDQkJVa2xUU1U1SElFWlNUMDBzWEc1UFZWUWdUMFlnVDFJZ1NVNGdRMDlPVGtWRFZFbFBUaUJYU1ZSSUlGUklSU0JUVDBaVVYwRlNSU0JQVWlCVVNFVWdWVk5GSUU5U0lFOVVTRVZTSUVSRlFVeEpUa2RUSUVsT0lGUklSVnh1VTA5R1ZGZEJVa1V1WEc0cUwxeHVYRzVwYlhCdmNuUWdRMkZ1WTJWc1ZHOXJaVzRnWm5KdmJTQmNJaTR2UTJGdVkyVnNWRzlyWlc1Y0lqdGNibWx0Y0c5eWRDQkRiMjF3YjI1bGJuUWdabkp2YlNBbkxpOURiMjF3YjI1bGJuUW5PMXh1YVcxd2IzSjBJR1JsWm1WeUlHWnliMjBnWENJdUwyUmxabVZ5WENJN1hHNXBiWEJ2Y25RZ2FHRnphQ0JtY205dElDY3VMMmhoYzJnbk8xeHVhVzF3YjNKMElGSnZkWFJsY2lCbWNtOXRJRndpTGk5U2IzVjBaWEpjSWp0Y2JseHVMeW9xWEc0Z0tpQlNaV052YlcxbGJtUmxaQ0IzWVhrZ2RHOGdjR1Z5Wm05eWJTQmhiaUJoYzNsdVkzSnZibTkxY3lCeVpXUnBjbVZqZEdsdmJpQnBiaUJTYjNWMFpYSWdZR2hoYm1Sc1pYSmdJR1oxYm1OMGFXOXVMbHh1SUNvdlhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCamJHRnpjeUJTYjNWMFpWSmxaR2x5WldOMGIzSWdaWGgwWlc1a2N5QkRiMjF3YjI1bGJuUWdlMXh1WEhRdktpcGNibHgwSUNvZ1EzSmxZWFJsY3lCaElHNWxkeUJ5WldScGNtVmpkRzl5TGx4dVhIUWdLaUJBY0dGeVlXMGdjR0YwYUNCUVlYUm9JSEpsYkdGMGFYWmxJSFJ2SUhKdmRYUmxjaTVjYmx4MElDb2dRSEJoY21GdElISnZkWFJsY2lCU1pXUnBjbVZqZENCeVpXeGhkR2wyWlNCMGJ5QjBhR2x6SUhKdmRYUmxjaTVjYmx4MElDb2dRSEJoY21GdElISmxjR3hoWTJWVGRHRjBaU0JTWlhCc1lXTmxJSFJvWlNCamRYSnlaVzUwSUdKeWIzZHpaWElnYUdsemRHOXlhV05oYkNCemRHRjBaU0J5WVhSb1pYSWdkR2hoYmlCd2RYTm9hVzVuSUdFZ2JtVjNJSE4wWVhSbElIUnZJSFJvWlZ4dVhIUWdLaUJ6ZEdGamF5NGdSR1ZtWVhWc2RITWdkRzhnZEhKMVpTNWNibHgwSUNvdlhHNWNkR052Ym5OMGNuVmpkRzl5S0hCeWFYWmhkR1VnY0dGMGFEb2djM1J5YVc1bkxDQndjbWwyWVhSbElISnZkWFJsY2o4NklGSnZkWFJsY2p4aGJuaytMQ0J3Y21sMllYUmxJSEpsY0d4aFkyVlRkR0YwWlNBOUlIUnlkV1VwSUh0Y2JseDBYSFJ6ZFhCbGNpZ3BPMXh1WEhSY2RHUmxabVZ5S0RBc0lIUm9hWE11YjNkdUtHNWxkeUJEWVc1alpXeFViMnRsYmlncEtTa3VkR2hsYmlnb0tTQTlQaUI3WEc1Y2RGeDBYSFJ5WldScGNtVmpkRkp2ZFhSbEtIUm9hWE11Y0dGMGFDd2dkR2hwY3k1eWIzVjBaWElzSUhSb2FYTXVjbVZ3YkdGalpWTjBZWFJsS1R0Y2JseDBYSFI5S1R0Y2JseDBmVnh1ZlZ4dVhHNHZLaXBjYmlBcUlFbHRiV1ZrYVdGMFpXeDVJSEJsY21admNtMXpJSFJvWlNCeVpXUnBjbVZqZEdsdmJpd2dhUzVsTGlCelpYUnpJR0JvWVhOb1lDQjBieUJnWjJWMFJuVnNiRkJoZEdnb2NHRjBhQ3dnY205MWRHVnlLV0F1WEc0Z0tpQkFjR0Z5WVcwZ2NHRjBhQ0JRWVhSb0lISmxiR0YwYVhabElIUnZJR0J5YjNWMFpYSmdMbHh1SUNvZ1FIQmhjbUZ0SUhKdmRYUmxjaUJTWldScGNtVmpkQ0J5Wld4aGRHbDJaU0IwYnlCMGFHbHpJSEp2ZFhSbGNpNGdRbmtnWkdWbVlYVnNkQ3dnY0dWeVptOXliWE1nWVNCbmJHOWlZV3dnY21Wa2FYSmxZM1JwYjI0dVhHNGdLaUJBY0dGeVlXMGdjbVZ3YkdGalpWTjBZWFJsSUZKbGNHeGhZMlVnZEdobElHTjFjbkpsYm5RZ1luSnZkM05sY2lCb2FYTjBiM0pwWTJGc0lITjBZWFJsSUhKaGRHaGxjaUIwYUdGdUlIQjFjMmhwYm1jZ1lTQnVaWGNnYzNSaGRHVWdkRzhnZEdobElITjBZV05yTGx4dUlDb3ZYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdjbVZrYVhKbFkzUlNiM1YwWlNod1lYUm9PaUJ6ZEhKcGJtY3NJSEp2ZFhSbGNqODZJRkp2ZFhSbGNqeGhibmsrTENCeVpYQnNZV05sVTNSaGRHVS9PaUJpYjI5c1pXRnVLU0I3WEc1Y2RIUnllU0I3WEc1Y2RGeDBjR0YwYUNBOUlGSnZkWFJsY2k1blpYUkdkV3hzVUdGMGFDaHdZWFJvTENCeWIzVjBaWElwTzF4dVhIUmNkR2xtSUNob1lYTm9MblZ3WkdGMGFXNW5LU0I3WEc1Y2RGeDBYSFIwYUhKdmR5QnVaWGNnUlhKeWIzSW9YQ0pWY0dSaGRHVWdZM2xqYkdVZ2FYTWdZV3h5WldGa2VTQmhZM1JwZG1VdUlGd2lJQ3RjYmx4MFhIUmNkRngwWENKVGRXZG5aWE4wSUhWemFXNW5JRkp2ZFhSbGNpNVNaV1JwY21WamRHOXlJRzl5SUcxdmRtbHVaeUJWVWt3Z2NtVmthWEpsWTNScGIyNGdkRzhnWVc0Z1lYTjVibU55YjI1dmRYTWdZMkZzYkdKaFkyc3VYQ0lwTzF4dVhIUmNkSDFjYmx4MGZTQmpZWFJqYUNBb1pTa2dlMXh1WEhSY2RIUm9jbTkzSUc1bGR5QkZjbkp2Y2loY0lrTmhiaUJ1YjNRZ2NHVnlabTl5YlNCVlVrd2djbVZrYVhKbFkzUnBiMjRnZEc4Z1hDSWdLeUJ3WVhSb0lDc2dYQ0k2SUZ3aUlDc2daUzV0WlhOellXZGxLVHRjYmx4MGZWeHVYSFJvWVhOb0xuTmxkQ2h3WVhSb0xDQnlaWEJzWVdObFUzUmhkR1VwTzF4dWZWeHVJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkgeyBfZ2V0ID0gUmVmbGVjdC5nZXQ7IH0gZWxzZSB7IF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IHZhciBiYXNlID0gX3N1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7IGlmICghYmFzZSkgcmV0dXJuOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwgcHJvcGVydHkpOyBpZiAoZGVzYy5nZXQpIHsgcmV0dXJuIGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpOyB9IHJldHVybiBkZXNjLnZhbHVlOyB9OyB9IHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7IH1cblxuZnVuY3Rpb24gX3N1cGVyUHJvcEJhc2Uob2JqZWN0LCBwcm9wZXJ0eSkgeyB3aGlsZSAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkgeyBvYmplY3QgPSBfZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgYnJlYWs7IH0gcmV0dXJuIG9iamVjdDsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19pbXBvcnREZWZhdWx0ID0gdm9pZCAwICYmICh2b2lkIDApLl9faW1wb3J0RGVmYXVsdCB8fCBmdW5jdGlvbiAobW9kKSB7XG4gIHJldHVybiBtb2QgJiYgbW9kLl9fZXNNb2R1bGUgPyBtb2QgOiB7XG4gICAgXCJkZWZhdWx0XCI6IG1vZFxuICB9O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xuXG52YXIgUHJvcGVydHlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qcm9wZXJ0eVwiKSk7XG4vKipcclxuICogVVJMIHJvdXRlci4gQ29udmVydHMgaW5jb21pbmcgcGFydCBvZiBVUkwgKGhhc2gpIHRvIGEgdGFyZ2V0IG9iamVjdCBhbmQgcGFzc2VzIHRhaWwgc3RyaW5nIHRvIGl0XHJcbiAqIGZvciBmdXJ0aGVyIHJvdXRpbmcuXHJcbiAqL1xuXG5cbnZhciBSb3V0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9DbGFzc18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKFJvdXRlciwgX0NsYXNzXzEkZGVmYXVsdCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihSb3V0ZXIpO1xuXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgcm91dGVyIGluc3RhbmNlLiBQbGVhc2Ugbm90aWNlIHRoYXQgdGhlIHJvdXRlciBkb2Vzbid0IHByb2Nlc3MgY3VycmVudCByb3V0ZSBpbW1lZGlhdGVseSBvblxyXG4gICAqIGluaXRpYWxpemF0aW9uLiBUbyBwcm9jZXNzIHRoZSByb3V0ZSwgY2FsbCBgdXBkYXRlYCBtZXRob2QuXHJcbiAgICogQHBhcmFtIGNvbmZpZyBSb3V0ZXIgY29uZmlndXJhdGlvbi5cclxuICAgKi9cbiAgZnVuY3Rpb24gUm91dGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJvdXRlcik7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIF90aGlzLl9yb3V0ZSA9IG5ldyBQcm9wZXJ0eV8xLmRlZmF1bHQoKTtcbiAgICBfdGhpcy5fYXJnID0gbmV3IFByb3BlcnR5XzEuZGVmYXVsdCgpO1xuICAgIF90aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgIF90aGlzLm5hbWUgPSBjb25maWcubmFtZTtcbiAgICBfdGhpcy5wYXJlbnQgPSBjb25maWcucGFyZW50O1xuXG4gICAgaWYgKF90aGlzLm5hbWUgPT0gbnVsbCAhPT0gKF90aGlzLnBhcmVudCA9PSBudWxsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm91dGVyIGNvbmZpZ3VyYXRpb24gZXJyb3I6IHlvdSBoYXZlIHNwZWNpZmllZCByb3V0ZXIgbmFtZSBvciBwYXJlbnQsIGJ1dCBoYXZlbid0IHNwZWNpZmllZCBhbm90aGVyLiBUaGVzZSB0d28gb3B0aW9ucyBtdXN0IGNvbWUgdG9nZXRoZXIuXCIpO1xuICAgIH1cblxuICAgIF90aGlzLnBhdGggPSBjb25maWcucGF0aCB8fCBuZXcgUHJvcGVydHlfMS5kZWZhdWx0KCk7IC8vIHdlIGRvbid0IG93biBpdCBiZWNhdXNlIGl0cyB2YWx1ZSBpcyBiZWluZyB1c2VkIGluIGRlc3Ryb3lPYmplY3QgbWV0aG9kIC0gYWZ0ZXIgb3duYWdlIHBvb2wgcmVsZWFzaW5nXG5cbiAgICBfdGhpcy5zZXBhcmF0b3IgPSBSb3V0ZXIubWFrZVNlcGFyYXRvcihjb25maWcuc2VwYXJhdG9yKTtcbiAgICBfdGhpcy5qb2luZXIgPSBSb3V0ZXIubWFrZUpvaW5lcihjb25maWcuam9pbmVyKTtcbiAgICBfdGhpcy5oYW5kbGVyID0gUm91dGVyLm1ha2VIYW5kbGVyKGNvbmZpZy5oYW5kbGVyKTtcbiAgICBfdGhpcy5zY29wZSA9IGNvbmZpZy5zY29wZSB8fCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKTtcbiAgICBfdGhpcy5fdGFyZ2V0ID0gY29uZmlnLnRhcmdldCB8fCBfdGhpcy5vd24obmV3IFByb3BlcnR5XzEuZGVmYXVsdCgpKTtcblxuICAgIF90aGlzLm93bihfdGhpcy5wYXRoLm9uQ2hhbmdlLmxpc3RlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMudXBkYXRlKCk7XG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxyXG4gICAqIFJvdXRlciB0YXJnZXQuIE1haW4gcHVycG9zZSBvZiB0aGUgcm91dGVyIGlzIHRvIGNvbnZlcnQgYHBhdGhgIHRvIGB0YXJnZXRgLiBJbiBwYXJ0aWN1bGFyLCBVSVJvdXRlclxyXG4gICAqIGNyZWF0ZXMgQ29tcG9uZW50IGluc3RhbmNlcyBiYXNlZCBvbiBjdXJyZW50IGBwYXRoYCB2YWx1ZSBzbyB5b3UgY291bGQgcmVuZGVyIHRoZW0uXHJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoUm91dGVyLCBbe1xuICAgIGtleTogXCJ0YXJnZXRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCByb3V0ZS4gRmlyc3QgY2h1bmsgb2YgdGhlIHBhdGggZGV0ZWN0ZWQgYnkgYHNlcGFyYXRvcmAgZnVuY3Rpb24uIFlvdSBjYW4gd2F0Y2ggdGhpcyBwcm9wZXJ0eVxyXG4gICAgICogdG8gYWN0aXZhdGUgYW5kIGRlYWN0aXZhdGUgaXRlbXMgaW4geW91ciBtZW51LlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyb3V0ZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlbWFpbmRlciBvZiBjdXJyZW50IHJvdXRlIGFmdGVyIGBzZXBhcmF0b3JgIGZ1bmN0aW9uIGNhbGwuIFRoaXMgcHJvcGVydHkgaXMgcGFzc2VkIHRvIGBoYW5kbGVyYFxyXG4gICAgICogZnVuY3Rpb24gYW5kIGNhbiBiZSBwYXNzZWQgb3ZlciB0byBjaGlsZCBjb21wb25lbnRzIGZvciBmdXJ0aGVyIHJvdXRpbmcuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImFyZ1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FyZztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVzdHJveU9iamVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95T2JqZWN0KCkge1xuICAgICAgaWYgKHRoaXMuX3VwZGF0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdXRlciBjYW4gbm90IGJlIGRlc3Ryb3llZCBkdXJpbmcgaXRzIHVwZGF0ZSBjeWNsZS5cIik7XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXQuZ2V0KCk7XG5cbiAgICAgIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICB0YXJnZXQuZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBfZ2V0KF9nZXRQcm90b3R5cGVPZihSb3V0ZXIucHJvdG90eXBlKSwgXCJkZXN0cm95T2JqZWN0XCIsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogSXNzdWVzIHJvdXRlIHByb2Nlc3NpbmcuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgZm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5fdXBkYXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgdXBkYXRlIHJvdXRlciBiZWNhdXNlIGl0cyB1cGRhdGUgY3ljbGUgaXMgYWxyZWFkeSBhY3RpdmUuIFwiICsgXCJDb25zaWRlciB1c2luZyBSb3V0ZVJlZGlyZWN0b3Igb3IgbW92aW5nIFVSTCByZWRpcmVjdGlvbiB0byBhbiBhc3luY3Jvbm91cyBjYWxsYmFjay5cIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcbiAgICAgIHZhciBwYXRoID0gdGhpcy5wYXRoLmdldCgpO1xuICAgICAgdmFyIHBhaXIgPSBwYXRoID09IG51bGwgPyBudWxsIDogdGhpcy5zZXBhcmF0b3IuY2FsbCh0aGlzLnNjb3BlLCBwYXRoKTtcbiAgICAgIHZhciByb3V0ZSA9IHBhaXIgIT0gbnVsbCA/IHBhaXJbMF0gfHwgXCJcIiA6IFwiXCI7XG4gICAgICB2YXIgYXJnID0gcGFpciAhPSBudWxsID8gcGFpclsxXSB8fCBudWxsIDogbnVsbDtcblxuICAgICAgaWYgKCFmb3JjZSAmJiByb3V0ZSA9PT0gdGhpcy5yb3V0ZS5nZXQoKSkge1xuICAgICAgICB0aGlzLl9hcmcuc2V0KGFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQuZ2V0KCk7XG5cbiAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fdGFyZ2V0LnNldChudWxsKTtcblxuICAgICAgICAgIHRhcmdldC5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hcmcuc2V0KGFyZyk7XG5cbiAgICAgICAgdGhpcy5fcm91dGUuc2V0KHJvdXRlKTtcblxuICAgICAgICB0aGlzLl90YXJnZXQuc2V0KHRoaXMuaGFuZGxlci5jYWxsKHRoaXMuc2NvcGUsIHJvdXRlLCB0aGlzLl9hcmcpIHx8IG51bGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBgam9pbmVyYCBmdW5jdGlvbiBjYWxsIGZvciB0aGlzIHJvdXRlci5cclxuICAgICAqIEBwYXJhbSByb3V0ZSBSb3V0ZSBuYW1lLlxyXG4gICAgICogQHBhcmFtIGFyZyBSZW1haW5kZXIgb2YgdGhlIHBhdGguXHJcbiAgICAgKiBAcmV0dXJucyBGdWxsIHBhdGguXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImpvaW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gam9pbihyb3V0ZSwgYXJnKSB7XG4gICAgICByZXR1cm4gdGhpcy5qb2luZXIuY2FsbCh0aGlzLnNjb3BlLCByb3V0ZSwgYXJnKTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGZ1bGwgcGF0aCBhcyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgaW4gYHBhcmVudGAgcm91dGVyIHdpdGggYG5hbWVgIHBhc3NlZCBhc1xyXG4gICAgICogYHJvdXRlYCBhbmQgYHBhdGhgIHBhc3NlZCBhcyBgYXJnYC4gUmV0dXJucyBgcGF0aGAgaWYgdGhpcyBpcyB0aGUgcm9vdCByb3V0ZXIuXHJcbiAgICAgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxyXG4gICAgICogQHJldHVybnMgRnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoZSByb290IHJvdXRlci5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RnVsbFBhdGhcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RnVsbFBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZ2V0RnVsbFBhdGgodGhpcy5wYXJlbnQuam9pbih0aGlzLm5hbWUsIHBhdGgpKSA6IHBhdGg7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFJvdXRlcjtcbn0oQ2xhc3NfMS5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xuXG4oZnVuY3Rpb24gKFJvdXRlcikge1xuICAvKipcclxuICAgKiBEZWZhdWx0IHZhbHVlIG9mIGBzZXBhcmF0b3JgLlxyXG4gICAqL1xuICBSb3V0ZXIuREVGQVVMVF9TRVBBUkFUT1IgPSAvXlxcLyooW14/XFwvXSspKD86XFwvKC4qKXwoXFw/LiopKT8kLztcbiAgLyoqXHJcbiAgICogRGVmYXVsdCB2YWx1ZSBvZiBgam9pbmVyYC5cclxuICAgKi9cblxuICBSb3V0ZXIuREVGQVVMVF9KT0lORVIgPSBcIi9cIjtcbiAgLyoqXHJcbiAgICogSWYgYHNlcGFyYXRvcmAgaXMgYSBmdW5jdGlvbiwgcmV0dXJucyBpdCBpbW1lZGlhdGVseS4gRWxzZSBjb252ZXJ0cyB0aGUgc3BlY2lmaWVkIHJlZ3VsYXIgZXhwcmVzc2lvbiB0b1xyXG4gICAqIGEgZnVuY3Rpb24gYnkgdGhlIGZvbGxvd2luZyBydWxlOiBUaGUgZmlyc3QgdG9rZW4gKCQxKSBvZiBwYXRoIGlzIHVzZWQgYXMgYSByb3V0ZSwgYW5kIHRoZSBuZXh0IG5vbi1udWxsIHRva2VuXHJcbiAgICogKCQyIG9yIGZ1cnRoZXIpIGlzIHVzZWQgYXMgYW4gYXJndW1lbnQuIElmIHBhdGggaXMgbnVsbCwgaXQgaXMgYXNzdW1lZCB0byBiZSBcIlwiLlxyXG4gICAqIEBwYXJhbSBzZXBhcmF0b3IgRnVuY3Rpb24gb3IgcmVndWxhciBleHByZXNzaW9uLlxyXG4gICAqIEByZXR1cm5zIFNlcGFyYXRvciBmdW5jdGlvbi5cclxuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlU2VwYXJhdG9yKCkge1xuICAgIHZhciBzZXBhcmF0b3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFJvdXRlci5ERUZBVUxUX1NFUEFSQVRPUjtcblxuICAgIGlmICh0eXBlb2Ygc2VwYXJhdG9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBzZXBhcmF0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICB2YXIgX2E7XG5cbiAgICAgIHZhciByZXN1bHQgPSBzZXBhcmF0b3IuZXhlYyhwYXRoIHx8IFwiXCIpO1xuICAgICAgcmV0dXJuIHJlc3VsdCA/IFtyZXN1bHRbMV0sIChfYSA9IHJlc3VsdC5zbGljZSgyKS5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4ICE9IG51bGw7XG4gICAgICB9KSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogbnVsbF0gOiBudWxsO1xuICAgIH07XG4gIH1cblxuICBSb3V0ZXIubWFrZVNlcGFyYXRvciA9IG1ha2VTZXBhcmF0b3I7XG4gIC8qKlxyXG4gICAqIElmIGBqb2luZXJgIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCBzdHJpbmcgdG8gYSBmdW5jdGlvbiBieSB0aGVcclxuICAgKiBmb2xsb3dpbmcgcnVsZTogam9pbnMgaW5jb21pbmcgcm91dGUvYXJndW1lbnQgcGFpciB2aWEgdGhlIHNwZWNpZmllZCBzdHJpbmcuIExlYWRpbmcgam9pbmVyIHN5bWJvbHMgaW4gYXJndW1lbnRcclxuICAgKiBhcmUgdHJpbW1lZC4gSWYgYXJndW1lbnQgc3RhcnRzIHdpdGggXCI/XCIsIGpvaW5lciBzeW1ib2wgaXMgbm90IGFkZGVkLiBJZiBhcmd1bWVudCBpcyBudWxsIG9yIGJsYW5rLCByZXR1cm5zXHJcbiAgICogcm91dGUuXHJcbiAgICogQHBhcmFtIGpvaW5lciBGdW5jdGlvbiBvciBzZXBhcmF0aW9uIGNoYXJhY3Rlci5cclxuICAgKiBAcmV0dXJucyBKb2luZXIgZnVuY3Rpb24uXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZUpvaW5lcigpIHtcbiAgICB2YXIgam9pbmVyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBSb3V0ZXIuREVGQVVMVF9KT0lORVI7XG5cbiAgICBpZiAodHlwZW9mIGpvaW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gam9pbmVyO1xuICAgIH1cblxuICAgIHZhciB0cmltbWVyID0gbmV3IFJlZ0V4cChcIl4oPzpcIiArIGpvaW5lci5yZXBsYWNlKC9bXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpICsgXCIpKlwiKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJvdXRlLCBhcmcpIHtcbiAgICAgIHJldHVybiAhYXJnID8gcm91dGUgOiBhcmcuY2hhckF0KDApID09PSBcIj9cIiA/IHJvdXRlICsgYXJnIDogcm91dGUgKyBqb2luZXIgKyBhcmcucmVwbGFjZSh0cmltbWVyLCBcIlwiKTtcbiAgICB9O1xuICB9XG5cbiAgUm91dGVyLm1ha2VKb2luZXIgPSBtYWtlSm9pbmVyO1xuICAvKipcclxuICAgKiBJZiBoYW5kbGVyIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCBvYmplY3QgdG8gYSBmdW5jdGlvbi5cclxuICAgKiBAcGFyYW0gaGFuZGxlciBIYW5kbGVyIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxyXG4gICAqIEByZXR1cm5zIEhhbmRsZXIgZnVuY3Rpb24uXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZUhhbmRsZXIoKSB7XG4gICAgdmFyIGhhbmRsZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyO1xuICAgIH1cblxuICAgIHZhciByb3V0ZXMgPSBoYW5kbGVyLnJvdXRlcyB8fCB7fTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJvdXRlLCBhcmcpIHtcbiAgICAgIHJldHVybiByb3V0ZXNbcm91dGVdID8gcm91dGVzW3JvdXRlXS5jYWxsKHRoaXMsIGFyZykgOiBoYW5kbGVyLm5vdEZvdW5kID8gaGFuZGxlci5ub3RGb3VuZC5jYWxsKHRoaXMsIHJvdXRlLCBhcmcpIDogbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgUm91dGVyLm1ha2VIYW5kbGVyID0gbWFrZUhhbmRsZXI7XG4gIC8qKlxyXG4gICAqIFJldHVybnMgZnVsbCBwYXRoIGFzIHRoZSByZXN1bHQgb2YgYGpvaW5lcmAgZnVuY3Rpb24gY2FsbCBpbiBgcGFyZW50YCBvZiBgcm91dGVyYCB3aXRoIGBuYW1lYCBwYXNzZWQgYXNcclxuICAgKiBgcm91dGVgIGFuZCBgcGF0aGAgcGFzc2VkIGFzIGBhcmdgLiBSZXR1cm5zIGBwYXRoYCBpZiB0aGlzIGlzIHRoZSByb290IHJvdXRlci5cclxuICAgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIGByb3V0ZXJgLlxyXG4gICAqIEBwYXJhbSByb3V0ZXIgQ29tcHV0ZSBmdWxsIHBhdGggcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXHJcbiAgICogQHJldHVybnMgRnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoZSBgcm91dGVyYC5cclxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRGdWxsUGF0aChwYXRoLCByb3V0ZXIpIHtcbiAgICByZXR1cm4gcm91dGVyID8gcm91dGVyLmdldEZ1bGxQYXRoKHBhdGgpIDogcGF0aDtcbiAgfVxuXG4gIFJvdXRlci5nZXRGdWxsUGF0aCA9IGdldEZ1bGxQYXRoO1xufSkoUm91dGVyIHx8IChSb3V0ZXIgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlTYjNWMFpYSXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk96czdPenM3T3pzN096czdPenM3T3pzN096czdPMEZCYzBKRk96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096dEJRVWRHTEVsQlFVRXNUMEZCUVN4SFFVRkJMR1ZCUVVFc1EwRkJRU3hQUVVGQkxFTkJRVUVzVTBGQlFTeERRVUZCTEVOQlFVRTdPMEZCUjBFc1NVRkJRU3hWUVVGQkxFZEJRVUVzWlVGQlFTeERRVUZCTEU5QlFVRXNRMEZCUVN4WlFVRkJMRU5CUVVFc1EwRkJRVHRCUVVWQk96czdRVUZIUnpzN08wbEJRMGNzVFRzN096czdRVUUyUTB3N096czdRVUZKUnp0QlFVTklMRzlDUVVGNVF6dEJRVUZCT3p0QlFVRkJMRkZCUVRkQ0xFMUJRVFpDTEhWRlFVRkdMRVZCUVVVN08wRkJRVUU3TzBGQlEzaERPMEZCVms4c1ZVRkJRU3hOUVVGQkxFZEJRVFJDTEVsQlFVa3NWVUZCUVN4RFFVRkJMRTlCUVVvc1JVRkJOVUk3UVVGRFFTeFZRVUZCTEVsQlFVRXNSMEZCTUVJc1NVRkJTU3hWUVVGQkxFTkJRVUVzVDBGQlNpeEZRVUV4UWp0QlFVTkJMRlZCUVVFc1UwRkJRU3hIUVVGeFFpeExRVUZ5UWp0QlFWTlFMRlZCUVVzc1NVRkJUQ3hIUVVGWkxFMUJRVTBzUTBGQlF5eEpRVUZ1UWp0QlFVTkJMRlZCUVVzc1RVRkJUQ3hIUVVGakxFMUJRVTBzUTBGQlF5eE5RVUZ5UWpzN1FVRkRRU3hSUVVGTExFMUJRVXNzU1VGQlRDeEpRVUZoTEVsQlFXUXNUVUZCZVVJc1RVRkJTeXhOUVVGTUxFbEJRV1VzU1VGQmVFTXNRMEZCU2l4RlFVRnRSRHRCUVVOc1JDeFpRVUZOTEVsQlFVa3NTMEZCU2l4RFFVRlZMRFJKUVVGV0xFTkJRVTQ3UVVGRFFUczdRVUZEUkN4VlFVRkxMRWxCUVV3c1IwRkJXU3hOUVVGTkxFTkJRVU1zU1VGQlVDeEpRVUZsTEVsQlFVa3NWVUZCUVN4RFFVRkJMRTlCUVVvc1JVRkJNMElzUTBGUWQwTXNRMEZQVnpzN1FVRkRia1FzVlVGQlN5eFRRVUZNTEVkQlFXbENMRTFCUVUwc1EwRkJReXhoUVVGUUxFTkJRWEZDTEUxQlFVMHNRMEZCUXl4VFFVRTFRaXhEUVVGcVFqdEJRVU5CTEZWQlFVc3NUVUZCVEN4SFFVRmpMRTFCUVUwc1EwRkJReXhWUVVGUUxFTkJRV3RDTEUxQlFVMHNRMEZCUXl4TlFVRjZRaXhEUVVGa08wRkJRMEVzVlVGQlN5eFBRVUZNTEVkQlFXVXNUVUZCVFN4RFFVRkRMRmRCUVZBc1EwRkJiVUlzVFVGQlRTeERRVUZETEU5QlFURkNMRU5CUVdZN1FVRkRRU3hWUVVGTExFdEJRVXdzUjBGQllTeE5RVUZOTEVOQlFVTXNTMEZCVUN4cFEwRkJZanRCUVVOQkxGVkJRVXNzVDBGQlRDeEhRVUZsTEUxQlFVMHNRMEZCUXl4TlFVRlFMRWxCUVdsQ0xFMUJRVXNzUjBGQlRDeERRVUZUTEVsQlFVa3NWVUZCUVN4RFFVRkJMRTlCUVVvc1JVRkJWQ3hEUVVGb1F6czdRVUZEUVN4VlFVRkxMRWRCUVV3c1EwRkJVeXhOUVVGTExFbEJRVXdzUTBGQlZTeFJRVUZXTEVOQlFXMUNMRTFCUVc1Q0xFTkJRVEJDTzBGQlFVRXNZVUZCVFN4TlFVRkxMRTFCUVV3c1JVRkJUanRCUVVGQkxFdEJRVEZDTEVOQlFWUTdPMEZCWW5kRE8wRkJZM2hETzBGQlJVUTdPenRCUVVkSE96czdPenRUUVVOSUxHVkJRVlU3UVVGRFZDeGhRVUZQTEV0QlFVc3NUMEZCV2p0QlFVTkJPMEZCUlVRN096dEJRVWRIT3pzN08xTkJRMGdzWlVGQlV6dEJRVU5TTEdGQlFVOHNTMEZCU3l4TlFVRmFPMEZCUTBFN1FVRkZSRHM3TzBGQlIwYzdPenM3VTBGRFNDeGxRVUZQTzBGQlEwNHNZVUZCVHl4TFFVRkxMRWxCUVZvN1FVRkRRVHM3TzFkQlJVUXNlVUpCUVdFN1FVRkRXaXhWUVVGSkxFdEJRVXNzVTBGQlZDeEZRVUZ2UWp0QlFVTnVRaXhqUVVGTkxFbEJRVWtzUzBGQlNpeERRVUZWTEhORVFVRldMRU5CUVU0N1FVRkRRVHM3UVVGRFJDeFZRVUZOTEUxQlFVMHNSMEZCUnl4TFFVRkxMRTlCUVV3c1EwRkJZU3hIUVVGaUxFVkJRV1k3TzBGQlEwRXNWVUZCU1N4TlFVRk5MRWxCUVVrc1NVRkJaQ3hGUVVGdlFqdEJRVU51UWl4UlFVRkJMRTFCUVUwc1EwRkJReXhQUVVGUU8wRkJRMEU3TzBGQlEwUTdRVUZEUVR0QlFVVkVPenRCUVVWSE96czdPMWRCUTBnc2EwSkJRVzlDTzBGQlFVRXNWVUZCWWl4TFFVRmhMSFZGUVVGTUxFdEJRVXM3TzBGQlEyNUNMRlZCUVVrc1MwRkJTeXhUUVVGVUxFVkJRVzlDTzBGQlEyNUNMR05CUVUwc1NVRkJTU3hMUVVGS0xFTkJRVlVzY1VWQlEyWXNjMFpCUkVzc1EwRkJUanRCUVVWQk96dEJRVU5FTEZkQlFVc3NVMEZCVEN4SFFVRnBRaXhKUVVGcVFqdEJRVU5CTEZWQlFVMHNTVUZCU1N4SFFVRkhMRXRCUVVzc1NVRkJUQ3hEUVVGVkxFZEJRVllzUlVGQllqdEJRVU5CTEZWQlFVMHNTVUZCU1N4SFFVRmpMRWxCUVVrc1NVRkJTU3hKUVVGVUxFZEJRV2xDTEVsQlFXcENMRWRCUVhkQ0xFdEJRVXNzVTBGQlRDeERRVUZsTEVsQlFXWXNRMEZCYjBJc1MwRkJTeXhMUVVGNlFpeEZRVUZuUXl4SlFVRm9ReXhEUVVFdlF6dEJRVU5CTEZWQlFVMHNTMEZCU3l4SFFVRkpMRWxCUVVrc1NVRkJTU3hKUVVGVUxFZEJRV3RDTEVsQlFVa3NRMEZCUXl4RFFVRkVMRU5CUVVvc1NVRkJWeXhGUVVFM1FpeEhRVUZ0UXl4RlFVRnFSRHRCUVVOQkxGVkJRVTBzUjBGQlJ5eEhRVUZKTEVsQlFVa3NTVUZCU1N4SlFVRlVMRWRCUVd0Q0xFbEJRVWtzUTBGQlF5eERRVUZFTEVOQlFVb3NTVUZCVnl4SlFVRTNRaXhIUVVGeFF5eEpRVUZxUkRzN1FVRkRRU3hWUVVGSkxFTkJRVU1zUzBGQlJDeEpRVUZWTEV0QlFVc3NTMEZCU3l4TFFVRkxMRXRCUVV3c1EwRkJWeXhIUVVGWUxFVkJRWGhDTEVWQlFUQkRPMEZCUTNwRExHRkJRVXNzU1VGQlRDeERRVUZWTEVkQlFWWXNRMEZCWXl4SFFVRmtPMEZCUTBFc1QwRkdSQ3hOUVVWUE8wRkJRMDRzV1VGQlRTeE5RVUZOTEVkQlFVY3NTMEZCU3l4TlFVRk1MRU5CUVZrc1IwRkJXaXhGUVVGbU96dEJRVU5CTEZsQlFVa3NUVUZCVFN4SlFVRkpMRWxCUVdRc1JVRkJiMEk3UVVGRGJrSXNaVUZCU3l4UFFVRk1MRU5CUVdFc1IwRkJZaXhEUVVGcFFpeEpRVUZxUWpzN1FVRkRRU3hWUVVGQkxFMUJRVTBzUTBGQlF5eFBRVUZRTzBGQlEwRTdPMEZCUTBRc1lVRkJTeXhKUVVGTUxFTkJRVlVzUjBGQlZpeERRVUZqTEVkQlFXUTdPMEZCUTBFc1lVRkJTeXhOUVVGTUxFTkJRVmtzUjBGQldpeERRVUZuUWl4TFFVRm9RanM3UVVGRFFTeGhRVUZMTEU5QlFVd3NRMEZCWVN4SFFVRmlMRU5CUVdsQ0xFdEJRVXNzVDBGQlRDeERRVUZoTEVsQlFXSXNRMEZCYTBJc1MwRkJTeXhMUVVGMlFpeEZRVUU0UWl4TFFVRTVRaXhGUVVGeFF5eExRVUZMTEVsQlFURkRMRXRCUVcxRUxFbEJRWEJGTzBGQlEwRTdPMEZCUTBRc1YwRkJTeXhUUVVGTUxFZEJRV2xDTEV0QlFXcENPMEZCUTBFN1FVRkZSRHM3T3pzN1FVRkxSenM3T3p0WFFVTklMR05CUVVzc1MwRkJUQ3hGUVVGdlFpeEhRVUZ3UWl4RlFVRXJRanRCUVVNNVFpeGhRVUZQTEV0QlFVc3NUVUZCVEN4RFFVRlpMRWxCUVZvc1EwRkJhVUlzUzBGQlN5eExRVUYwUWl4RlFVRTJRaXhMUVVFM1FpeEZRVUZ2UXl4SFFVRndReXhEUVVGUU8wRkJRMEU3UVVGRlJEczdPenM3UVVGTFJ6czdPenRYUVVOSUxIRkNRVUZaTEVsQlFWb3NSVUZCZDBJN1FVRkRka0lzWVVGQlR5eExRVUZMTEUxQlFVd3NSMEZCWXl4TFFVRkxMRTFCUVV3c1EwRkJXU3hYUVVGYUxFTkJRWGRDTEV0QlFVc3NUVUZCVEN4RFFVRlpMRWxCUVZvc1EwRkJhVUlzUzBGQlN5eEpRVUYwUWl4RlFVRTBRaXhKUVVFMVFpeERRVUY0UWl4RFFVRmtMRWRCUVRKRkxFbEJRV3hHTzBGQlEwRTdPenM3UlVGdVNqQkRMRTlCUVVFc1EwRkJRU3hQT3p0QlFYTktOVU1zVDBGQlFTeERRVUZCTEU5QlFVRXNSMEZCWlN4TlFVRm1PenRCUVVWQkxFTkJRVUVzVlVGQlZTeE5RVUZXTEVWQlFXZENPMEZCUTJZN08wRkJSVWM3UVVGRFZTeEZRVUZCTEUxQlFVRXNRMEZCUVN4cFFrRkJRU3hIUVVGdlFpeHJRMEZCY0VJN1FVRkZZanM3UVVGRlJ6czdRVUZEVlN4RlFVRkJMRTFCUVVFc1EwRkJRU3hqUVVGQkxFZEJRV2xDTEVkQlFXcENPMEZCTmtoaU96czdPenM3UVVGTlJ6czdRVUZEU0N4WFFVRm5RaXhoUVVGb1FpeEhRVUVyUlR0QlFVRkJMRkZCUVdwRUxGTkJRV2xFTEhWRlFVRnFRaXhOUVVGQkxFTkJRVUVzYVVKQlFXbENPenRCUVVNNVJTeFJRVUZKTEU5QlFVOHNVMEZCVUN4TFFVRnhRaXhWUVVGNlFpeEZRVUZ4UXp0QlFVTndReXhoUVVGUExGTkJRVkE3UVVGRFFUczdRVUZEUkN4WFFVRlBMRlZCUVZVc1NVRkJWaXhGUVVGelFqczdPMEZCUXpWQ0xGVkJRVTBzVFVGQlRTeEhRVUZITEZOQlFWTXNRMEZCUXl4SlFVRldMRU5CUVdVc1NVRkJTU3hKUVVGSkxFVkJRWFpDTEVOQlFXWTdRVUZEUVN4aFFVRlBMRTFCUVUwc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZFTEVOQlFWQXNSVUZCV1N4RFFVRkJMRVZCUVVFc1IwRkJRU3hOUVVGTkxFTkJRVU1zUzBGQlVDeERRVUZoTEVOQlFXSXNSVUZCWjBJc1NVRkJhRUlzUTBGQmNVSXNWVUZCUVN4RFFVRkRPMEZCUVVFc1pVRkJTU3hEUVVGRExFbEJRVWtzU1VGQlZEdEJRVUZCTEU5QlFYUkNMRU5CUVVFc1RVRkJiME1zU1VGQmNFTXNTVUZCYjBNc1JVRkJRU3hMUVVGQkxFdEJRVUVzUTBGQmNFTXNSMEZCYjBNc1JVRkJjRU1zUjBGQmQwTXNTVUZCY0VRc1EwRkJTQ3hIUVVFclJDeEpRVUUxUlR0QlFVTkJMRXRCU0VRN1FVRkpRVHM3UVVGU1pTeEZRVUZCTEUxQlFVRXNRMEZCUVN4aFFVRkJMRWRCUVdFc1lVRkJZanRCUVZWb1FqczdPenM3T3p0QlFVOUhPenRCUVVOSUxGZEJRV2RDTEZWQlFXaENMRWRCUVcxRk8wRkJRVUVzVVVGQmVFTXNUVUZCZDBNc2RVVkJRV1FzVFVGQlFTeERRVUZCTEdOQlFXTTdPMEZCUTJ4RkxGRkJRVWtzVDBGQlR5eE5RVUZRTEV0QlFXdENMRlZCUVhSQ0xFVkJRV3RETzBGQlEycERMR0ZCUVU4c1RVRkJVRHRCUVVOQk96dEJRVU5FTEZGQlFVMHNUMEZCVHl4SFFVRkhMRWxCUVVrc1RVRkJTaXhEUVVGWExGTkJRVk1zVFVGQlRTeERRVUZETEU5QlFWQXNRMEZCWlN4eFFrRkJaaXhGUVVGelF5eE5RVUYwUXl4RFFVRlVMRWRCUVhsRUxFbEJRWEJGTEVOQlFXaENPMEZCUTBFc1YwRkJUeXhWUVVGVkxFdEJRVllzUlVGQmFVSXNSMEZCYWtJc1JVRkJiMEk3UVVGRE1VSXNZVUZCVHl4RFFVRkRMRWRCUVVRc1IwRkJUeXhMUVVGUUxFZEJRV2RDTEVkQlFVY3NRMEZCUXl4TlFVRktMRU5CUVZjc1EwRkJXQ3hOUVVGclFpeEhRVUZ1UWl4SFFVRXlRaXhMUVVGTExFZEJRVWNzUjBGQmJrTXNSMEZCTWtNc1MwRkJTeXhIUVVGSExFMUJRVklzUjBGQmFVSXNSMEZCUnl4RFFVRkRMRTlCUVVvc1EwRkJXU3hQUVVGYUxFVkJRWEZDTEVWQlFYSkNMRU5CUVd4R08wRkJRMEVzUzBGR1JEdEJRVWRCT3p0QlFWSmxMRVZCUVVFc1RVRkJRU3hEUVVGQkxGVkJRVUVzUjBGQlZTeFZRVUZXTzBGQlZXaENPenM3TzBGQlNVYzdPMEZCUTBnc1YwRkJaMElzVjBGQmFFSXNSMEZCTUVVN1FVRkJRU3hSUVVFelF5eFBRVUV5UXl4MVJVRkJSaXhGUVVGRk96dEJRVU42UlN4UlFVRkpMRTlCUVU4c1QwRkJVQ3hMUVVGdFFpeFZRVUYyUWl4RlFVRnRRenRCUVVOc1F5eGhRVUZQTEU5QlFWQTdRVUZEUVRzN1FVRkRSQ3hSUVVGTkxFMUJRVTBzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUVUZCVWl4SlFVRnJRaXhGUVVGcVF6dEJRVU5CTEZkQlFVOHNWVUZCY1VJc1MwRkJja0lzUlVGQmIwTXNSMEZCY0VNc1JVRkJlVVE3UVVGREwwUXNZVUZCVHl4TlFVRk5MRU5CUVVNc1MwRkJSQ3hEUVVGT0xFZEJRV2RDTEUxQlFVMHNRMEZCUXl4TFFVRkVMRU5CUVU0c1EwRkJZeXhKUVVGa0xFTkJRVzFDTEVsQlFXNUNMRVZCUVhsQ0xFZEJRWHBDTEVOQlFXaENMRWRCUTA0c1QwRkJUeXhEUVVGRExGRkJRVklzUjBGQmJVSXNUMEZCVHl4RFFVRkRMRkZCUVZJc1EwRkJhVUlzU1VGQmFrSXNRMEZCYzBJc1NVRkJkRUlzUlVGQk5FSXNTMEZCTlVJc1JVRkJiVU1zUjBGQmJrTXNRMEZCYmtJc1IwRkJOa1FzU1VGRU9VUTdRVUZGUVN4TFFVaEVPMEZCU1VFN08wRkJWR1VzUlVGQlFTeE5RVUZCTEVOQlFVRXNWMEZCUVN4SFFVRlhMRmRCUVZnN1FVRlhhRUk3T3pzN096dEJRVTFIT3p0QlFVTklMRmRCUVdkQ0xGZEJRV2hDTEVOQlFUUkNMRWxCUVRWQ0xFVkJRVEJETEUxQlFURkRMRVZCUVRoRU8wRkJRemRFTEZkQlFVOHNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhYUVVGUUxFTkJRVzFDTEVsQlFXNUNMRU5CUVVnc1IwRkJPRUlzU1VGQk0wTTdRVUZEUVRzN1FVRkdaU3hGUVVGQkxFMUJRVUVzUTBGQlFTeFhRVUZCTEVkQlFWY3NWMEZCV0R0QlFVZG9RaXhEUVc1TlJDeEZRVUZWTEUxQlFVMHNTMEZCVGl4TlFVRk5MRWRCUVVFc1JVRkJRU3hEUVVGb1FpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxWEc1TlNWUWdUR2xqWlc1elpWeHVYRzVEYjNCNWNtbG5hSFFnS0dNcElESXdNakVnUldkdmNpQk9aWEJ2Ylc1NVlYTmphR2xvWEc1Y2JsQmxjbTFwYzNOcGIyNGdhWE1nYUdWeVpXSjVJR2R5WVc1MFpXUXNJR1p5WldVZ2IyWWdZMmhoY21kbExDQjBieUJoYm5rZ2NHVnljMjl1SUc5aWRHRnBibWx1WnlCaElHTnZjSGxjYm05bUlIUm9hWE1nYzI5bWRIZGhjbVVnWVc1a0lHRnpjMjlqYVdGMFpXUWdaRzlqZFcxbGJuUmhkR2x2YmlCbWFXeGxjeUFvZEdobElGd2lVMjltZEhkaGNtVmNJaWtzSUhSdklHUmxZV3hjYm1sdUlIUm9aU0JUYjJaMGQyRnlaU0IzYVhSb2IzVjBJSEpsYzNSeWFXTjBhVzl1TENCcGJtTnNkV1JwYm1jZ2QybDBhRzkxZENCc2FXMXBkR0YwYVc5dUlIUm9aU0J5YVdkb2RITmNiblJ2SUhWelpTd2dZMjl3ZVN3Z2JXOWthV1o1TENCdFpYSm5aU3dnY0hWaWJHbHphQ3dnWkdsemRISnBZblYwWlN3Z2MzVmliR2xqWlc1elpTd2dZVzVrTDI5eUlITmxiR3hjYm1OdmNHbGxjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXNJR0Z1WkNCMGJ5QndaWEp0YVhRZ2NHVnljMjl1Y3lCMGJ5QjNhRzl0SUhSb1pTQlRiMlowZDJGeVpTQnBjMXh1Wm5WeWJtbHphR1ZrSUhSdklHUnZJSE52TENCemRXSnFaV04wSUhSdklIUm9aU0JtYjJ4c2IzZHBibWNnWTI5dVpHbDBhVzl1Y3pwY2JseHVWR2hsSUdGaWIzWmxJR052Y0hseWFXZG9kQ0J1YjNScFkyVWdZVzVrSUhSb2FYTWdjR1Z5YldsemMybHZiaUJ1YjNScFkyVWdjMmhoYkd3Z1ltVWdhVzVqYkhWa1pXUWdhVzRnWVd4c1hHNWpiM0JwWlhNZ2IzSWdjM1ZpYzNSaGJuUnBZV3dnY0c5eWRHbHZibk1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMbHh1WEc1VVNFVWdVMDlHVkZkQlVrVWdTVk1nVUZKUFZrbEVSVVFnWENKQlV5QkpVMXdpTENCWFNWUklUMVZVSUZkQlVsSkJUbFJaSUU5R0lFRk9XU0JMU1U1RUxDQkZXRkJTUlZOVElFOVNYRzVKVFZCTVNVVkVMQ0JKVGtOTVZVUkpUa2NnUWxWVUlFNVBWQ0JNU1UxSlZFVkVJRlJQSUZSSVJTQlhRVkpTUVU1VVNVVlRJRTlHSUUxRlVrTklRVTVVUVVKSlRFbFVXU3hjYmtaSlZFNUZVMU1nUms5U0lFRWdVRUZTVkVsRFZVeEJVaUJRVlZKUVQxTkZJRUZPUkNCT1QwNUpUa1pTU1U1SFJVMUZUbFF1SUVsT0lFNVBJRVZXUlU1VUlGTklRVXhNSUZSSVJWeHVRVlZVU0U5U1V5QlBVaUJEVDFCWlVrbEhTRlFnU0U5TVJFVlNVeUJDUlNCTVNVRkNURVVnUms5U0lFRk9XU0JEVEVGSlRTd2dSRUZOUVVkRlV5QlBVaUJQVkVoRlVseHVURWxCUWtsTVNWUlpMQ0JYU0VWVVNFVlNJRWxPSUVGT0lFRkRWRWxQVGlCUFJpQkRUMDVVVWtGRFZDd2dWRTlTVkNCUFVpQlBWRWhGVWxkSlUwVXNJRUZTU1ZOSlRrY2dSbEpQVFN4Y2JrOVZWQ0JQUmlCUFVpQkpUaUJEVDA1T1JVTlVTVTlPSUZkSlZFZ2dWRWhGSUZOUFJsUlhRVkpGSUU5U0lGUklSU0JWVTBVZ1QxSWdUMVJJUlZJZ1JFVkJURWxPUjFNZ1NVNGdWRWhGWEc1VFQwWlVWMEZTUlM1Y2Jpb3ZYRzVjYm1sdGNHOXlkQ0JDYVc1a1lXSnNaU0JtY205dElDY3VMMEpwYm1SaFlteGxKenRjYm1sdGNHOXlkQ0JEYkdGemN5Qm1jbTl0SUNjdUwwTnNZWE56Snp0Y2JtbHRjRzl5ZENCRVpYTjBjbTk1WVdKc1pTQm1jbTl0SUNjdUwwUmxjM1J5YjNsaFlteGxKenRjYm1sdGNHOXlkQ0JKVUhKdmNHVnlkSGtnWm5KdmJTQW5MaTlKVUhKdmNHVnlkSGtuTzF4dWFXMXdiM0owSUZCeWIzQmxjblI1SUdaeWIyMGdKeTR2VUhKdmNHVnlkSGtuTzF4dVhHNHZLaXBjYmlBcUlGVlNUQ0J5YjNWMFpYSXVJRU52Ym5abGNuUnpJR2x1WTI5dGFXNW5JSEJoY25RZ2IyWWdWVkpNSUNob1lYTm9LU0IwYnlCaElIUmhjbWRsZENCdlltcGxZM1FnWVc1a0lIQmhjM05sY3lCMFlXbHNJSE4wY21sdVp5QjBieUJwZEZ4dUlDb2dabTl5SUdaMWNuUm9aWElnY205MWRHbHVaeTVjYmlBcUwxeHVZMnhoYzNNZ1VtOTFkR1Z5UEZRZ1pYaDBaVzVrY3lCRVpYTjBjbTk1WVdKc1pUNGdaWGgwWlc1a2N5QkRiR0Z6Y3lCN1hHNWNibHgwTHlvcVhHNWNkQ0FxSUZKdmRYUmxjaUJ1WVcxbExpQk5kWE4wSUdKbElHVnhkV0ZzSUhSdklIUm9aU0J5YjNWMFpTQnVZVzFsSUdsdUlIUm9aU0JnY0dGeVpXNTBZQ0J5YjNWMFpYSXVJRkpsY1hWcGNtVmtJR1p2Y2lCd2NtOXdaWElnWUdkbGRFWjFiR3hRWVhSb1lDQmhibVJjYmx4MElDb2dZSEpsWkdseVpXTjBZQ0J0WlhSb2IyUWdjSEp2WTJWemMybHVaeTRnVW05dmRDQnliM1YwWlhJZ1pHOWxjeUJ1YjNRZ2FHRjJaU0JoSUc1aGJXVXVYRzVjZENBcUwxeHVYSFJ5WldGa2IyNXNlU0J1WVcxbE9pQnpkSEpwYm1jN1hHNWNibHgwTHlvcVhHNWNkQ0FxSUZCaGNtVnVkQ0J5YjNWMFpYSXVJRkpsY1hWcGNtVmtJR1p2Y2lCd2NtOXdaWElnWUdkbGRFWjFiR3hRWVhSb1lDQmhibVFnWUhKbFpHbHlaV04wWUNCdFpYUm9iMlFnY0hKdlkyVnpjMmx1Wnk0Z1VtOXZkQ0J5YjNWMFpYSWdaRzlsY3lCdWIzUWdhR0YyWlZ4dVhIUWdLaUJoSUhCaGNtVnVkQzVjYmx4MElDb3ZYRzVjZEhKbFlXUnZibXg1SUhCaGNtVnVkRG9nVW05MWRHVnlQR0Z1ZVQ0N1hHNWNibHgwTHlvcVhHNWNkQ0FxSUZCaGRHZ2dkR2hoZENCMGFHVWdjbTkxZEdWeUlHbHpJR0p2ZFc1a0lIUnZMaUJRWVhSb0lHbHpJR0VnWm1sdVlXd2djR0Z5ZENCdlppQlZVa3dnS0doaGMyZ3BJSEpsYkdWMllXNTBJSFJ2SUhSb2FYTmNibHgwSUNvZ2NtOTFkR1Z5TGlCQmJua2djR0YwYUNCamFHRnVaMlVnY21WemRXeDBjeUJwYmlCZ2RYQmtZWFJsWUNCdFpYUm9iMlFnWTJGc2JDNWNibHgwSUNvdlhHNWNkSEpsWVdSdmJteDVJSEJoZEdnNklFSnBibVJoWW14bFBITjBjbWx1Wno0N1hHNWNibHgwTHlvcVhHNWNkQ0FxSUZCaGRHZ2djMlZ3WVhKaGRHOXlJR1oxYm1OMGFXOXVJSFZ6WldRZ1lua2dkR2hsSUhKdmRYUmxjaTVjYmx4MElDb3ZYRzVjZEhKbFlXUnZibXg1SUhObGNHRnlZWFJ2Y2pvZ1VtOTFkR1Z5TGxObGNHRnlZWFJ2Y2p0Y2JseHVYSFF2S2lwY2JseDBJQ29nVUdGMGFDQnFiMmx1WlhJZ1puVnVZM1JwYjI0Z2RYTmxaQ0JpZVNCMGFHVWdjbTkxZEdWeUxseHVYSFFnS2k5Y2JseDBjbVZoWkc5dWJIa2dhbTlwYm1WeU9pQlNiM1YwWlhJdVNtOXBibVZ5TzF4dVhHNWNkQzhxS2x4dVhIUWdLaUJTYjNWMFpTQm9ZVzVrYkdWeUlHWjFibU4wYVc5dUlIVnpaV1FnWW5rZ2RHaGxJSEp2ZFhSbGNpNWNibHgwSUNvdlhHNWNkSEpsWVdSdmJteDVJR2hoYm1Sc1pYSTZJRkp2ZFhSbGNpNUlZVzVrYkdWeVBGUStPMXh1WEc1Y2RDOHFLbHh1WEhRZ0tpQmdjMlZ3WVhKaGRHOXlZQ3dnWUdwdmFXNWxjbUFnWVc1a0lHQm9ZVzVrYkdWeVlDQmpZV3hzSUhOamIzQmxMbHh1WEhRZ0tpOWNibHgwY21WaFpHOXViSGtnYzJOdmNHVTZJR0Z1ZVR0Y2JseHVYSFJ3Y21sMllYUmxJRjkwWVhKblpYUTZJRWxRY205d1pYSjBlVHhVUGp0Y2JseDBjSEpwZG1GMFpTQmZjbTkxZEdVNklFbFFjbTl3WlhKMGVUeHpkSEpwYm1jK0lEMGdibVYzSUZCeWIzQmxjblI1UEhOMGNtbHVaejRvS1R0Y2JseDBjSEpwZG1GMFpTQmZZWEpuT2lCSlVISnZjR1Z5ZEhrOGMzUnlhVzVuUGlBOUlHNWxkeUJRY205d1pYSjBlVHh6ZEhKcGJtYytLQ2s3WEc1Y2RIQnlhWFpoZEdVZ1gzVndaR0YwYVc1bk9pQmliMjlzWldGdUlEMGdabUZzYzJVN1hHNWNibHgwTHlvcVhHNWNkQ0FxSUVOeVpXRjBaWE1nY205MWRHVnlJR2x1YzNSaGJtTmxMaUJRYkdWaGMyVWdibTkwYVdObElIUm9ZWFFnZEdobElISnZkWFJsY2lCa2IyVnpiaWQwSUhCeWIyTmxjM01nWTNWeWNtVnVkQ0J5YjNWMFpTQnBiVzFsWkdsaGRHVnNlU0J2Ymx4dVhIUWdLaUJwYm1sMGFXRnNhWHBoZEdsdmJpNGdWRzhnY0hKdlkyVnpjeUIwYUdVZ2NtOTFkR1VzSUdOaGJHd2dZSFZ3WkdGMFpXQWdiV1YwYUc5a0xseHVYSFFnS2lCQWNHRnlZVzBnWTI5dVptbG5JRkp2ZFhSbGNpQmpiMjVtYVdkMWNtRjBhVzl1TGx4dVhIUWdLaTljYmx4MFkyOXVjM1J5ZFdOMGIzSW9ZMjl1Wm1sbk9pQlNiM1YwWlhJdVEyOXVabWxuUEZRK0lEMGdlMzBwSUh0Y2JseDBYSFJ6ZFhCbGNpZ3BPMXh1WEhSY2RIUm9hWE11Ym1GdFpTQTlJR052Ym1acFp5NXVZVzFsTzF4dVhIUmNkSFJvYVhNdWNHRnlaVzUwSUQwZ1kyOXVabWxuTG5CaGNtVnVkRHRjYmx4MFhIUnBaaUFvS0hSb2FYTXVibUZ0WlNBOVBTQnVkV3hzS1NBaFBUMGdLSFJvYVhNdWNHRnlaVzUwSUQwOUlHNTFiR3dwS1NCN1hHNWNkRngwWEhSMGFISnZkeUJ1WlhjZ1JYSnliM0lvWENKU2IzVjBaWElnWTI5dVptbG5kWEpoZEdsdmJpQmxjbkp2Y2pvZ2VXOTFJR2hoZG1VZ2MzQmxZMmxtYVdWa0lISnZkWFJsY2lCdVlXMWxJRzl5SUhCaGNtVnVkQ3dnWW5WMElHaGhkbVZ1SjNRZ2MzQmxZMmxtYVdWa0lHRnViM1JvWlhJdUlGUm9aWE5sSUhSM2J5QnZjSFJwYjI1eklHMTFjM1FnWTI5dFpTQjBiMmRsZEdobGNpNWNJaWs3WEc1Y2RGeDBmVnh1WEhSY2RIUm9hWE11Y0dGMGFDQTlJR052Ym1acFp5NXdZWFJvSUh4OElHNWxkeUJRY205d1pYSjBlVHh6ZEhKcGJtYytLQ2s3SUM4dklIZGxJR1J2YmlkMElHOTNiaUJwZENCaVpXTmhkWE5sSUdsMGN5QjJZV3gxWlNCcGN5QmlaV2x1WnlCMWMyVmtJR2x1SUdSbGMzUnliM2xQWW1wbFkzUWdiV1YwYUc5a0lDMGdZV1owWlhJZ2IzZHVZV2RsSUhCdmIyd2djbVZzWldGemFXNW5YRzVjZEZ4MGRHaHBjeTV6WlhCaGNtRjBiM0lnUFNCU2IzVjBaWEl1YldGclpWTmxjR0Z5WVhSdmNpaGpiMjVtYVdjdWMyVndZWEpoZEc5eUtUdGNibHgwWEhSMGFHbHpMbXB2YVc1bGNpQTlJRkp2ZFhSbGNpNXRZV3RsU205cGJtVnlLR052Ym1acFp5NXFiMmx1WlhJcE8xeHVYSFJjZEhSb2FYTXVhR0Z1Wkd4bGNpQTlJRkp2ZFhSbGNpNXRZV3RsU0dGdVpHeGxjaWhqYjI1bWFXY3VhR0Z1Wkd4bGNpazdYRzVjZEZ4MGRHaHBjeTV6WTI5d1pTQTlJR052Ym1acFp5NXpZMjl3WlNCOGZDQjBhR2x6TzF4dVhIUmNkSFJvYVhNdVgzUmhjbWRsZENBOUlHTnZibVpwWnk1MFlYSm5aWFFnZkh3Z2RHaHBjeTV2ZDI0b2JtVjNJRkJ5YjNCbGNuUjVQRlErS0NrcE8xeHVYSFJjZEhSb2FYTXViM2R1S0hSb2FYTXVjR0YwYUM1dmJrTm9ZVzVuWlM1c2FYTjBaVzRvS0NrZ1BUNGdkR2hwY3k1MWNHUmhkR1VvS1NrcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkp2ZFhSbGNpQjBZWEpuWlhRdUlFMWhhVzRnY0hWeWNHOXpaU0J2WmlCMGFHVWdjbTkxZEdWeUlHbHpJSFJ2SUdOdmJuWmxjblFnWUhCaGRHaGdJSFJ2SUdCMFlYSm5aWFJnTGlCSmJpQndZWEowYVdOMWJHRnlMQ0JWU1ZKdmRYUmxjbHh1WEhRZ0tpQmpjbVZoZEdWeklFTnZiWEJ2Ym1WdWRDQnBibk4wWVc1alpYTWdZbUZ6WldRZ2IyNGdZM1Z5Y21WdWRDQmdjR0YwYUdBZ2RtRnNkV1VnYzI4Z2VXOTFJR052ZFd4a0lISmxibVJsY2lCMGFHVnRMbHh1WEhRZ0tpOWNibHgwWjJWMElIUmhjbWRsZENncE9pQkNhVzVrWVdKc1pUeFVQaUI3WEc1Y2RGeDBjbVYwZFhKdUlIUm9hWE11WDNSaGNtZGxkRHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCRGRYSnlaVzUwSUhKdmRYUmxMaUJHYVhKemRDQmphSFZ1YXlCdlppQjBhR1VnY0dGMGFDQmtaWFJsWTNSbFpDQmllU0JnYzJWd1lYSmhkRzl5WUNCbWRXNWpkR2x2Ymk0Z1dXOTFJR05oYmlCM1lYUmphQ0IwYUdseklIQnliM0JsY25SNVhHNWNkQ0FxSUhSdklHRmpkR2wyWVhSbElHRnVaQ0JrWldGamRHbDJZWFJsSUdsMFpXMXpJR2x1SUhsdmRYSWdiV1Z1ZFM1Y2JseDBJQ292WEc1Y2RHZGxkQ0J5YjNWMFpTZ3BPaUJDYVc1a1lXSnNaVHh6ZEhKcGJtYytJSHRjYmx4MFhIUnlaWFIxY200Z2RHaHBjeTVmY205MWRHVTdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nVW1WdFlXbHVaR1Z5SUc5bUlHTjFjbkpsYm5RZ2NtOTFkR1VnWVdaMFpYSWdZSE5sY0dGeVlYUnZjbUFnWm5WdVkzUnBiMjRnWTJGc2JDNGdWR2hwY3lCd2NtOXdaWEowZVNCcGN5QndZWE56WldRZ2RHOGdZR2hoYm1Sc1pYSmdYRzVjZENBcUlHWjFibU4wYVc5dUlHRnVaQ0JqWVc0Z1ltVWdjR0Z6YzJWa0lHOTJaWElnZEc4Z1kyaHBiR1FnWTI5dGNHOXVaVzUwY3lCbWIzSWdablZ5ZEdobGNpQnliM1YwYVc1bkxseHVYSFFnS2k5Y2JseDBaMlYwSUdGeVp5Z3BPaUJDYVc1a1lXSnNaVHh6ZEhKcGJtYytJSHRjYmx4MFhIUnlaWFIxY200Z2RHaHBjeTVmWVhKbk8xeHVYSFI5WEc1Y2JseDBaR1Z6ZEhKdmVVOWlhbVZqZENncElIdGNibHgwWEhScFppQW9kR2hwY3k1ZmRYQmtZWFJwYm1jcElIdGNibHgwWEhSY2RIUm9jbTkzSUc1bGR5QkZjbkp2Y2loY0lsSnZkWFJsY2lCallXNGdibTkwSUdKbElHUmxjM1J5YjNsbFpDQmtkWEpwYm1jZ2FYUnpJSFZ3WkdGMFpTQmplV05zWlM1Y0lpazdYRzVjZEZ4MGZWeHVYSFJjZEdOdmJuTjBJSFJoY21kbGRDQTlJSFJvYVhNdVgzUmhjbWRsZEM1blpYUW9LVHRjYmx4MFhIUnBaaUFvZEdGeVoyVjBJQ0U5SUc1MWJHd3BJSHRjYmx4MFhIUmNkSFJoY21kbGRDNWtaWE4wY205NUtDazdYRzVjZEZ4MGZWeHVYSFJjZEhOMWNHVnlMbVJsYzNSeWIzbFBZbXBsWTNRb0tUdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJKYzNOMVpYTWdjbTkxZEdVZ2NISnZZMlZ6YzJsdVp5NWNibHgwSUNvdlhHNWNkSFZ3WkdGMFpTaG1iM0pqWlNBOUlHWmhiSE5sS1NCN1hHNWNkRngwYVdZZ0tIUm9hWE11WDNWd1pHRjBhVzVuS1NCN1hHNWNkRngwWEhSMGFISnZkeUJ1WlhjZ1JYSnliM0lvWENKRFlXNG5kQ0IxY0dSaGRHVWdjbTkxZEdWeUlHSmxZMkYxYzJVZ2FYUnpJSFZ3WkdGMFpTQmplV05zWlNCcGN5QmhiSEpsWVdSNUlHRmpkR2wyWlM0Z1hDSWdLMXh1WEhSY2RGeDBYSFJjSWtOdmJuTnBaR1Z5SUhWemFXNW5JRkp2ZFhSbFVtVmthWEpsWTNSdmNpQnZjaUJ0YjNacGJtY2dWVkpNSUhKbFpHbHlaV04wYVc5dUlIUnZJR0Z1SUdGemVXNWpjbTl1YjNWeklHTmhiR3hpWVdOckxsd2lLVHRjYmx4MFhIUjlYRzVjZEZ4MGRHaHBjeTVmZFhCa1lYUnBibWNnUFNCMGNuVmxPMXh1WEhSY2RHTnZibk4wSUhCaGRHZ2dQU0IwYUdsekxuQmhkR2d1WjJWMEtDazdYRzVjZEZ4MFkyOXVjM1FnY0dGcGNqb2djM1J5YVc1blcxMGdQU0FvY0dGMGFDQTlQU0J1ZFd4c0tTQS9JRzUxYkd3Z09pQjBhR2x6TG5ObGNHRnlZWFJ2Y2k1allXeHNLSFJvYVhNdWMyTnZjR1VzSUhCaGRHZ3BPMXh1WEhSY2RHTnZibk4wSUhKdmRYUmxJRDBnS0hCaGFYSWdJVDBnYm5Wc2JDa2dQeUFvY0dGcGNsc3dYU0I4ZkNCY0lsd2lLU0E2SUZ3aVhDSTdYRzVjZEZ4MFkyOXVjM1FnWVhKbklEMGdLSEJoYVhJZ0lUMGdiblZzYkNrZ1B5QW9jR0ZwY2xzeFhTQjhmQ0J1ZFd4c0tTQTZJRzUxYkd3N1hHNWNkRngwYVdZZ0tDRm1iM0pqWlNBbUppQnliM1YwWlNBOVBUMGdkR2hwY3k1eWIzVjBaUzVuWlhRb0tTa2dlMXh1WEhSY2RGeDBkR2hwY3k1ZllYSm5Mbk5sZENoaGNtY3BPMXh1WEhSY2RIMGdaV3h6WlNCN1hHNWNkRngwWEhSamIyNXpkQ0IwWVhKblpYUWdQU0IwYUdsekxuUmhjbWRsZEM1blpYUW9LVHRjYmx4MFhIUmNkR2xtSUNoMFlYSm5aWFFnSVQwZ2JuVnNiQ2tnZTF4dVhIUmNkRngwWEhSMGFHbHpMbDkwWVhKblpYUXVjMlYwS0c1MWJHd3BPMXh1WEhSY2RGeDBYSFIwWVhKblpYUXVaR1Z6ZEhKdmVTZ3BPMXh1WEhSY2RGeDBmVnh1WEhSY2RGeDBkR2hwY3k1ZllYSm5Mbk5sZENoaGNtY3BPMXh1WEhSY2RGeDBkR2hwY3k1ZmNtOTFkR1V1YzJWMEtISnZkWFJsS1R0Y2JseDBYSFJjZEhSb2FYTXVYM1JoY21kbGRDNXpaWFFvZEdocGN5NW9ZVzVrYkdWeUxtTmhiR3dvZEdocGN5NXpZMjl3WlN3Z2NtOTFkR1VzSUhSb2FYTXVYMkZ5WnlrZ2ZId2diblZzYkNrN1hHNWNkRngwZlZ4dVhIUmNkSFJvYVhNdVgzVndaR0YwYVc1bklEMGdabUZzYzJVN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dVbVYwZFhKdWN5QjBhR1VnY21WemRXeDBJRzltSUdCcWIybHVaWEpnSUdaMWJtTjBhVzl1SUdOaGJHd2dabTl5SUhSb2FYTWdjbTkxZEdWeUxseHVYSFFnS2lCQWNHRnlZVzBnY205MWRHVWdVbTkxZEdVZ2JtRnRaUzVjYmx4MElDb2dRSEJoY21GdElHRnlaeUJTWlcxaGFXNWtaWElnYjJZZ2RHaGxJSEJoZEdndVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUVaMWJHd2djR0YwYUM1Y2JseDBJQ292WEc1Y2RHcHZhVzRvY205MWRHVTZJSE4wY21sdVp5d2dZWEpuT2lCemRISnBibWNwT2lCemRISnBibWNnZTF4dVhIUmNkSEpsZEhWeWJpQjBhR2x6TG1wdmFXNWxjaTVqWVd4c0tIUm9hWE11YzJOdmNHVXNJSEp2ZFhSbExDQmhjbWNwTzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGSmxkSFZ5Ym5NZ1puVnNiQ0J3WVhSb0lHRnpJSFJvWlNCeVpYTjFiSFFnYjJZZ1lHcHZhVzVsY21BZ1puVnVZM1JwYjI0Z1kyRnNiQ0JwYmlCZ2NHRnlaVzUwWUNCeWIzVjBaWElnZDJsMGFDQmdibUZ0WldBZ2NHRnpjMlZrSUdGelhHNWNkQ0FxSUdCeWIzVjBaV0FnWVc1a0lHQndZWFJvWUNCd1lYTnpaV1FnWVhNZ1lHRnlaMkF1SUZKbGRIVnlibk1nWUhCaGRHaGdJR2xtSUhSb2FYTWdhWE1nZEdobElISnZiM1FnY205MWRHVnlMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2NHRjBhQ0JRWVhSb0lISmxiR0YwYVhabElIUnZJSFJvYVhNZ2NtOTFkR1Z5TGx4dVhIUWdLaUJBY21WMGRYSnVjeUJHZFd4c0lIQmhkR2dnY21Wc1lYUnBkbVVnZEc4Z2RHaGxJSEp2YjNRZ2NtOTFkR1Z5TGx4dVhIUWdLaTljYmx4MFoyVjBSblZzYkZCaGRHZ29jR0YwYURvZ2MzUnlhVzVuS1RvZ2MzUnlhVzVuSUh0Y2JseDBYSFJ5WlhSMWNtNGdkR2hwY3k1d1lYSmxiblFnUHlCMGFHbHpMbkJoY21WdWRDNW5aWFJHZFd4c1VHRjBhQ2gwYUdsekxuQmhjbVZ1ZEM1cWIybHVLSFJvYVhNdWJtRnRaU3dnY0dGMGFDa3BJRG9nY0dGMGFEdGNibHgwZlZ4dWZWeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQlNiM1YwWlhJN1hHNWNibTVoYldWemNHRmpaU0JTYjNWMFpYSWdlMXh1WEhRdktpcGNibHgwSUNvZ1JHVm1ZWFZzZENCMllXeDFaU0J2WmlCZ2MyVndZWEpoZEc5eVlDNWNibHgwSUNvdlhHNWNkR1Y0Y0c5eWRDQmpiMjV6ZENCRVJVWkJWVXhVWDFORlVFRlNRVlJQVWlBOUlDOWVYRnd2S2loYlhqOWNYQzlkS3lrb1B6cGNYQzhvTGlvcGZDaGNYRDh1S2lrcFB5UXZPMXh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkVaV1poZFd4MElIWmhiSFZsSUc5bUlHQnFiMmx1WlhKZ0xseHVYSFFnS2k5Y2JseDBaWGh3YjNKMElHTnZibk4wSUVSRlJrRlZURlJmU2s5SlRrVlNJRDBnWENJdlhDSTdYRzVjYmx4MEx5b3FYRzVjZENBcUlGTnBaMjVoZEhWeVpTQnZaaUJnYzJWd1lYSmhkRzl5WUNCbWRXNWpkR2x2Ymk0Z1ZHaGxJR1oxYm1OMGFXOXVJSE53YkdsMGN5QndZWFJvSUhSdklISnZkWFJsSUdGdVpDQmhjbWQxYldWdWRDNGdWR2hsY21WbWIzSmxMQ0JwZENCdGRYTjBYRzVjZENBcUlISmxkSFZ5YmlCMGQyOGdjM1J5YVc1bklIWmhiSFZsY3k0Z1NXWWdablZ1WTNScGIyNGdjbVYwZFhKdWN5QnVkV3hzTENCcGRDQnBjeUJoYzNOMWJXVmtJSFJ2SUdKbElGdGNJbHdpTENCdWRXeHNYUzVjYmx4MElDb3ZYRzVjZEdWNGNHOXlkQ0JwYm5SbGNtWmhZMlVnVTJWd1lYSmhkRzl5SUh0Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCQWNHRnlZVzBnY0dGMGFDQkdkV3hzSUhCaGRHZ3VYRzVjZEZ4MElDb2dRSEpsZEhWeWJuTWdVbTkxZEdVZ1lXNWtJR0Z5WjNWdFpXNTBMbHh1WEhSY2RDQXFMMXh1WEhSY2RDaHdZWFJvT2lCemRISnBibWNwT2lCemRISnBibWRiWFR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlRhV2R1WVhSMWNtVWdiMllnWUdwdmFXNWxjbUFnWm5WdVkzUnBiMjR1SUZSb1pTQm1kVzVqZEdsdmJpQnFiMmx1Y3lCeWIzVjBaU0JoYm1RZ1lYSm5kVzFsYm5RZ2RHOGdZU0J3WVhSb0xseHVYSFFnS2k5Y2JseDBaWGh3YjNKMElHbHVkR1Z5Wm1GalpTQktiMmx1WlhJZ2UxeHVYSFJjZEM4cUtseHVYSFJjZENBcUlFQndZWEpoYlNCeWIzVjBaU0JTYjNWMFpTNWNibHgwWEhRZ0tpQkFjR0Z5WVcwZ1lYSm5JRUZ5WjNWdFpXNTBMbHh1WEhSY2RDQXFJRUJ5WlhSMWNtNXpJRVoxYkd3Z2NHRjBhQzVjYmx4MFhIUWdLaTljYmx4MFhIUW9jbTkxZEdVNklITjBjbWx1Wnl3Z1lYSm5PaUJ6ZEhKcGJtY3BPaUJ6ZEhKcGJtYzdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nVTJsbmJtRjBkWEpsSUc5bUlHQm9ZVzVrYkdWeVlDQm5aVzVsY21Gc0xYQjFjbkJ2YzJVZ1puVnVZM1JwYjI0dUlGUm9aU0JtZFc1amRHbHZiaUJ0WVhCeklIUm9aU0J6Y0dWamFXWnBaV1FnY205MWRHVWdkRzhnWVNCMFlYSm5aWFFnYjJKcVpXTjBYRzVjZENBcUlDaDFjM1ZoYkd4NUxDQkRiMjF3YjI1bGJuUXBJR0Z1WkNCd1lYTnpaWE1nWVhKbmRXMWxiblFnZEc4Z2FYUWdabTl5SUdaMWNuUm9aWElnY205MWRHbHVaeTVjYmx4MElDb3ZYRzVjZEdWNGNHOXlkQ0JwYm5SbGNtWmhZMlVnU0dGdVpHeGxjanhVUGlCN1hHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1FIQmhjbUZ0SUhKdmRYUmxJRkp2ZFhSbExseHVYSFJjZENBcUlFQndZWEpoYlNCaGNtY2dRWEpuZFcxbGJuUXVYRzVjZEZ4MElDb2dRSEpsZEhWeWJuTWdWR0Z5WjJWMElHOWlhbVZqZEM1Y2JseDBYSFFnS2k5Y2JseDBYSFFvY205MWRHVTZJSE4wY21sdVp5d2dZWEpuT2lCQ2FXNWtZV0pzWlR4emRISnBibWMrS1RvZ1ZEdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJUYVdkdVlYUjFjbVVnYjJZZ1lTQnphVzVuYkdVZ2NtOTFkR1VnYVc0Z1lHaGhibVJzWlhKZ0lHOWlhbVZqZEM0Z1ZHaGxJR1oxYm1OMGFXOXVJRzFoY0hNZ1lTQnphVzVuYkdVZ2NtOTFkR1VnZEc4Z1lTQjBZWEpuWlhSY2JseDBJQ29nYjJKcVpXTjBJQ2gxYzNWaGJHeDVMQ0JEYjIxd2IyNWxiblFwSUdGdVpDQndZWE56WlhNZ1lYSm5kVzFsYm5RZ2RHOGdhWFFnWm05eUlHWjFjblJvWlhJZ2NtOTFkR2x1Wnk1Y2JseDBJQ292WEc1Y2RHVjRjRzl5ZENCcGJuUmxjbVpoWTJVZ1VtOTFkR1U4VkQ0Z2UxeHVYSFJjZEM4cUtseHVYSFJjZENBcUlFQndZWEpoYlNCaGNtY2dRWEpuZFcxbGJuUXVYRzVjZEZ4MElDb2dRSEpsZEhWeWJuTWdWR0Z5WjJWMElHOWlhbVZqZEM1Y2JseDBYSFFnS2k5Y2JseDBYSFFvWVhKbk9pQkNhVzVrWVdKc1pUeHpkSEpwYm1jK0tUb2dWRHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCU2IzVjBaWElnYUdGdVpHeGxjaUJqYjI1bWFXZDFjbUYwYVc5dUlHOWlhbVZqZEM1Y2JseDBJQ292WEc1Y2RHVjRjRzl5ZENCcGJuUmxjbVpoWTJVZ1NHRnVaR3hsY2tOdmJtWnBaenhVUGlCN1hHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1RXRndJRzltSUhOd1pXTnBabWxqSUhKdmRYUmxJR2hoYm1Sc1pYSnpMaUJKWmlCamRYSnlaVzUwSUhKdmRYUmxJR2x6SUhCeVpYTmxiblFnYVc0Z2RHaHBjeUJrYVdOMGFXOXVZWEo1TENCMGFHVWdjbTkxZEdWeUlHTmhiR3h6SUdsMGMxeHVYSFJjZENBcUlHTnZjbkpsYzNCdmJtUnBibWNnYUdGdVpHeGxjaUJoYm1RZ2NHRnpjMlZ6SUdGeVozVnRaVzUwSUhSdklHbDBMaUJTYjNWMFpTQmhibVFnWVhKbmRXMWxiblFnZEdobGJYTmxiSFpsY3lCaGNtVWdZMjl0Y0hWMFpXUWdkMmwwYUNCZ2MyVndZWEpoZEc5eVlGeHVYSFJjZENBcUlHTmhiR3hpWVdOckxseHVYSFJjZENBcUwxeHVYSFJjZEhKbFlXUnZibXg1SUhKdmRYUmxjejg2SUh0Y2JseDBYSFJjZEhKbFlXUnZibXg1SUZ0clpYazZJSE4wY21sdVoxMDZJRkp2ZFhSbFBGUStPMXh1WEhSY2RIMDdYRzVjYmx4MFhIUXZLaXBjYmx4MFhIUWdLaUJKWmlCdWIyNWxJRzltSUhSb1pTQmdjbTkxZEdWellDQnRZWFJqYUdWeklHTjFjbkpsYm5RZ2NtOTFkR1VzSUhSb1pTQnliM1YwWlhJZ1kyRnNiSE1nZEdocGN5Qm9ZVzVrYkdWeUlHTmhiR3hpWVdOcklHRnVaQ0J3WVhOelpYTWdZbTkwYUZ4dVhIUmNkQ0FxSUhKdmRYUmxJR0Z1WkNCaGNtZDFiV1Z1ZENCMGJ5QnBkQzRnUW5rZ1pHVm1ZWFZzZEN3Z2NtVjBkWEp1Y3lCdWRXeHNJR1p2Y2lCaGJua2dhVzV3ZFhRdVhHNWNkRngwSUNvdlhHNWNkRngwY21WaFpHOXViSGtnYm05MFJtOTFibVEvT2lCSVlXNWtiR1Z5UEZRK08xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkp2ZFhSbGNpQmpiMjVtYVdkMWNtRjBhVzl1SUc5aWFtVmpkQzVjYmx4MElDb3ZYRzVjZEdWNGNHOXlkQ0JwYm5SbGNtWmhZMlVnUTI5dVptbG5QRlErSUh0Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCU2IzVjBaWElnYm1GdFpTNGdVbTkxZEdWeUlHNWhiV1VnYVhNZ1lTQmphSFZ1YXlCdlppQjBhR1VnY0dGMGFDQjBhR0YwSUdOaGRYTmxaQ0IwYUdseklISnZkWFJsSUhSdklHZGxkQ0JwYm1sMGFXRnNhWHBsWkM0Z1VtOXZkQ0J5YjNWMFpYSmNibHgwWEhRZ0tpQmtiMlZ6YmlkMElHaGhkbVVnWVNCdVlXMWxMbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlHNWhiV1UvT2lCemRISnBibWM3WEc1Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCUVlYSmxiblFnY205MWRHVnlMaUJKZENCd2NtOTJhV1JsY3lCZ1oyVjBSblZzYkZCaGRHaGdJR0Z1WkNCZ2NtVmthWEpsWTNSZ0lIZHBkR2dnWVNCamJIVmxJR0ZpYjNWMElHRnNiQ0J3WVhKMGN5QnZaaUIwYUdVZ2NHRjBhQzRnU1daY2JseDBYSFFnS2lCNWIzVnlJSEp2ZFhSbGNpQndjbTkyYVdSbGN5QjViM1VnZDJsMGFDQjNjbTl1WnlCd1lYUm9jeXdnWTJobFkyc2dZRzVoYldWZ0lHRnVaQ0JnY0dGeVpXNTBZQ0J2WmlCaGJHd2djbTkxZEdWeWN5QnBiaUI1YjNWeUlHaHBaWEpoY21Ob2VTQXRJSFJvWlhsY2JseDBYSFFnS2lCaGNtVWdiR2xyWld4NUlHRnpjMmxuYm1Wa0lIUnZJSGR5YjI1bklIWmhiSFZsY3k0Z1VtOXZkQ0J5YjNWMFpYSWdaRzlsYzI0bmRDQm9ZWFpsSUdFZ2NHRnlaVzUwTGx4dVhIUmNkQ0FxTDF4dVhIUmNkSEpsWVdSdmJteDVJSEJoY21WdWREODZJRkp2ZFhSbGNqeGhibmsrTzF4dVhHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1VHRjBhQ0IwYnlCaWFXNWtJSFJvWlNCeWIzVjBaWElnZEc4dUlGSnZiM1FnY205MWRHVnlJSE5vYjNWc1pDQjFjM1ZoYkd4NUlHZGxkQ0JpYjNWdVpDQjBieUJnYUdGemFHQWdjSEp2Y0dWeWRIa3VJRU5vYVd4a0lISnZkWFJsY25NZ2MyaHZkV3hrWEc1Y2RGeDBJQ29nY21WalpXbDJaU0JnY0dGMGFHQWdabkp2YlNCMGFHVnBjaUJ3WVhKbGJuUnpMbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlIQmhkR2cvT2lCQ2FXNWtZV0pzWlR4emRISnBibWMrTzF4dVhHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1ZHRnlaMlYwSUhCeWIzQmxjblI1TGlCU2IzVjBaWElnY0hWMGN5QjBhR1VnY21WemRXeDBJRzltSUdCb1lXNWtiR1Z5WUNCbWRXNWpkR2x2YmlCallXeHNJSFJ2SUhSaGNtZGxkQ0J3Y205d1pYSjBlUzRnU1dZZ1lIUmhjbWRsZEdBZ2FYTmNibHgwWEhRZ0tpQnZiV2wwZEdWa0xDQjBhR1VnY205MWRHVnlJR055WldGMFpYTWdhWFFnWVhWMGIyMWhkR2xqWVd4c2VTNGdVbTkxZEdWeUlHRjFkRzl0WVhScFkyRnNiSGtnWTI5dWRISnZiSE1nZEdobElHeHBabVVnZEdsdFpTQnZaaUI1YjNWeUlIUmhjbWRsZEhNc1hHNWNkRngwSUNvZ2MyOHNJR2xtSUhsdmRTQndZWE56SUhsdmRYSWdjSEpsWTNKbFlYUmxaQ0JnZEdGeVoyVjBZQ0J3Y205d1pYSjBlU0IwYnlCaElGSnZkWFJsY2l3Z2JXRnJaU0J6ZFhKbElIUm9ZWFFnYVhRZ2FYTWdibTkwSUdGblozSmxaMkYwYVc1bklHbDBjeUIyWVd4MVpTeGNibHgwWEhRZ0tpQnBMbVV1SUdCdmQyNVdZV3gxWldBZ2JXVjBhRzlrSUdseklHNXZkQ0JqWVd4c1pXUXVYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2RHRnlaMlYwUHpvZ1NWQnliM0JsY25SNVBGUStPMXh1WEc1Y2RGeDBMeW9xWEc1Y2RGeDBJQ29nVUdGMGFDQnpaWEJoY21GMGIzSWdablZ1WTNScGIyNHVJRkJoY25ObGN5QnBibU52YldsdVp5QndZWFJvSUhSdklIUjNieUIwYjJ0bGJuTTZJSEp2ZFhSbElHRnVaQ0JoY21kMWJXVnVkQzRnVW05MWRHVWdaMlYwY3lCMWMyVmtJSFJ2WEc1Y2RGeDBJQ29nY0hKdlkyVnpjeUJoSUhOcGJtZHNaU0J5YjNWMGFXNW5JSE4wWlhBZ1lXNWtJR055WldGMFpTQmhJSFJoY21kbGRDd2dZWEpuZFcxbGJuUWdaMlYwY3lCd1lYTnpaV1FnZEc4Z2RHaGxJSFJoY21kbGRDQm1iM0lnWm5WeWRHaGxjaUJ5YjNWMGFXNW5MbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlITmxjR0Z5WVhSdmNqODZJRk5sY0dGeVlYUnZjaUI4SUZKbFowVjRjRHRjYmx4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUZCaGRHZ2dhbTlwYm1WeUxpQlBjSEJ2YzJsMFpTQjBieUJnYzJWd1lYSmhkRzl5WUM0Z1ZYTmxaQ0JwYmlCZ1oyVjBSblZzYkZCaGRHaGdJR0Z1WkNCZ2NtVmthWEpsWTNSZ0lHMWxkR2h2WkhNZ2RHOGdjSEp2Y0dWeWJIa2dZblZwYkdRZ2RHaGxYRzVjZEZ4MElDb2djR0YwYUM0Z1NtOXBibk1nYVc1amIyMXBibWNnY205MWRHVWdZVzVrSUdGeVozVnRaVzUwSUhSdklHRWdablZzYkNCd1lYUm9MbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlHcHZhVzVsY2o4NklFcHZhVzVsY2lCOElITjBjbWx1Wnp0Y2JseHVYSFJjZEM4cUtseHVYSFJjZENBcUlGSnZkWFJsSUdoaGJtUnNaWEl1SUUxaGNITWdkR2hsSUhKdmRYUmxJSE4wY21sdVp5QjBieUJoSUhSaGNtZGxkQ0J2WW1wbFkzUWdZVzVrSUhCaGMzTmxjeUJoY21kMWJXVnVkQ0IwYnlCcGRDQm1iM0lnWm5WeWRHaGxjaUJ5YjNWMGFXNW5MbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlHaGhibVJzWlhJL09pQklZVzVrYkdWeVBGUStJSHdnU0dGdVpHeGxja052Ym1acFp6eFVQanRjYmx4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUdCelpYQmhjbUYwYjNKZ0xDQmdhbTlwYm1WeVlDQmhibVFnWUdoaGJtUnNaWEpnSUdOaGJHd2djMk52Y0dVdVhHNWNkRngwSUNvdlhHNWNkRngwY21WaFpHOXViSGtnYzJOdmNHVS9PaUJoYm5rN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dTV1lnWUhObGNHRnlZWFJ2Y21BZ2FYTWdZU0JtZFc1amRHbHZiaXdnY21WMGRYSnVjeUJwZENCcGJXMWxaR2xoZEdWc2VTNGdSV3h6WlNCamIyNTJaWEowY3lCMGFHVWdjM0JsWTJsbWFXVmtJSEpsWjNWc1lYSWdaWGh3Y21WemMybHZiaUIwYjF4dVhIUWdLaUJoSUdaMWJtTjBhVzl1SUdKNUlIUm9aU0JtYjJ4c2IzZHBibWNnY25Wc1pUb2dWR2hsSUdacGNuTjBJSFJ2YTJWdUlDZ2tNU2tnYjJZZ2NHRjBhQ0JwY3lCMWMyVmtJR0Z6SUdFZ2NtOTFkR1VzSUdGdVpDQjBhR1VnYm1WNGRDQnViMjR0Ym5Wc2JDQjBiMnRsYmx4dVhIUWdLaUFvSkRJZ2IzSWdablZ5ZEdobGNpa2dhWE1nZFhObFpDQmhjeUJoYmlCaGNtZDFiV1Z1ZEM0Z1NXWWdjR0YwYUNCcGN5QnVkV3hzTENCcGRDQnBjeUJoYzNOMWJXVmtJSFJ2SUdKbElGd2lYQ0l1WEc1Y2RDQXFJRUJ3WVhKaGJTQnpaWEJoY21GMGIzSWdSblZ1WTNScGIyNGdiM0lnY21WbmRXeGhjaUJsZUhCeVpYTnphVzl1TGx4dVhIUWdLaUJBY21WMGRYSnVjeUJUWlhCaGNtRjBiM0lnWm5WdVkzUnBiMjR1WEc1Y2RDQXFMMXh1WEhSbGVIQnZjblFnWm5WdVkzUnBiMjRnYldGclpWTmxjR0Z5WVhSdmNpaHpaWEJoY21GMGIzSTZJRk5sY0dGeVlYUnZjaUI4SUZKbFowVjRjQ0E5SUVSRlJrRlZURlJmVTBWUVFWSkJWRTlTS1RvZ1UyVndZWEpoZEc5eUlIdGNibHgwWEhScFppQW9kSGx3Wlc5bUlITmxjR0Z5WVhSdmNpQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z2MyVndZWEpoZEc5eU8xeHVYSFJjZEgxY2JseDBYSFJ5WlhSMWNtNGdablZ1WTNScGIyNGdLSEJoZEdnNklITjBjbWx1WnlrZ2UxeHVYSFJjZEZ4MFkyOXVjM1FnY21WemRXeDBJRDBnYzJWd1lYSmhkRzl5TG1WNFpXTW9jR0YwYUNCOGZDQmNJbHdpS1R0Y2JseDBYSFJjZEhKbGRIVnliaUJ5WlhOMWJIUWdQeUJiY21WemRXeDBXekZkTENCeVpYTjFiSFF1YzJ4cFkyVW9NaWt1Wm1sdVpDaDRJRDArSUhnZ0lUMGdiblZzYkNrZ1B6OGdiblZzYkYwZ09pQnVkV3hzTzF4dVhIUmNkSDA3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1NXWWdZR3B2YVc1bGNtQWdhWE1nWVNCbWRXNWpkR2x2Yml3Z2NtVjBkWEp1Y3lCcGRDQnBiVzFsWkdsaGRHVnNlUzRnUld4elpTQmpiMjUyWlhKMGN5QjBhR1VnYzNCbFkybG1hV1ZrSUhOMGNtbHVaeUIwYnlCaElHWjFibU4wYVc5dUlHSjVJSFJvWlZ4dVhIUWdLaUJtYjJ4c2IzZHBibWNnY25Wc1pUb2dhbTlwYm5NZ2FXNWpiMjFwYm1jZ2NtOTFkR1V2WVhKbmRXMWxiblFnY0dGcGNpQjJhV0VnZEdobElITndaV05wWm1sbFpDQnpkSEpwYm1jdUlFeGxZV1JwYm1jZ2FtOXBibVZ5SUhONWJXSnZiSE1nYVc0Z1lYSm5kVzFsYm5SY2JseDBJQ29nWVhKbElIUnlhVzF0WldRdUlFbG1JR0Z5WjNWdFpXNTBJSE4wWVhKMGN5QjNhWFJvSUZ3aVAxd2lMQ0JxYjJsdVpYSWdjM2x0WW05c0lHbHpJRzV2ZENCaFpHUmxaQzRnU1dZZ1lYSm5kVzFsYm5RZ2FYTWdiblZzYkNCdmNpQmliR0Z1YXl3Z2NtVjBkWEp1YzF4dVhIUWdLaUJ5YjNWMFpTNWNibHgwSUNvZ1FIQmhjbUZ0SUdwdmFXNWxjaUJHZFc1amRHbHZiaUJ2Y2lCelpYQmhjbUYwYVc5dUlHTm9ZWEpoWTNSbGNpNWNibHgwSUNvZ1FISmxkSFZ5Ym5NZ1NtOXBibVZ5SUdaMWJtTjBhVzl1TGx4dVhIUWdLaTljYmx4MFpYaHdiM0owSUdaMWJtTjBhVzl1SUcxaGEyVktiMmx1WlhJb2FtOXBibVZ5T2lCS2IybHVaWElnZkNCemRISnBibWNnUFNCRVJVWkJWVXhVWDBwUFNVNUZVaWs2SUVwdmFXNWxjaUI3WEc1Y2RGeDBhV1lnS0hSNWNHVnZaaUJxYjJsdVpYSWdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dlMXh1WEhSY2RGeDBjbVYwZFhKdUlHcHZhVzVsY2p0Y2JseDBYSFI5WEc1Y2RGeDBZMjl1YzNRZ2RISnBiVzFsY2lBOUlHNWxkeUJTWldkRmVIQW9YQ0plS0Q4NlhDSWdLeUJxYjJsdVpYSXVjbVZ3YkdGalpTZ3ZXMXhjWEZ4ZUpDb3JQeTRvS1h4YlhGeGRlMzFkTDJjc0lDZGNYRnhjSkNZbktTQXJJRndpS1NwY0lpazdYRzVjZEZ4MGNtVjBkWEp1SUdaMWJtTjBhVzl1SUNoeWIzVjBaU3dnWVhKbktTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z0lXRnlaeUEvSUhKdmRYUmxJRG9nS0dGeVp5NWphR0Z5UVhRb01Da2dQVDA5SUZ3aVAxd2lLU0EvSUNoeWIzVjBaU0FySUdGeVp5a2dPaUFvY205MWRHVWdLeUJxYjJsdVpYSWdLeUJoY21jdWNtVndiR0ZqWlNoMGNtbHRiV1Z5TENCY0lsd2lLU2s3WEc1Y2RGeDBmVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCSlppQm9ZVzVrYkdWeUlHbHpJR0VnWm5WdVkzUnBiMjRzSUhKbGRIVnlibk1nYVhRZ2FXMXRaV1JwWVhSbGJIa3VJRVZzYzJVZ1kyOXVkbVZ5ZEhNZ2RHaGxJSE53WldOcFptbGxaQ0J2WW1wbFkzUWdkRzhnWVNCbWRXNWpkR2x2Ymk1Y2JseDBJQ29nUUhCaGNtRnRJR2hoYm1Sc1pYSWdTR0Z1Wkd4bGNpQmpiMjVtYVdkMWNtRjBhVzl1SUc5aWFtVmpkQzVjYmx4MElDb2dRSEpsZEhWeWJuTWdTR0Z1Wkd4bGNpQm1kVzVqZEdsdmJpNWNibHgwSUNvdlhHNWNkR1Y0Y0c5eWRDQm1kVzVqZEdsdmJpQnRZV3RsU0dGdVpHeGxjanhVUGlob1lXNWtiR1Z5T2lCSVlXNWtiR1Z5UEZRK0lId2dTR0Z1Wkd4bGNrTnZibVpwWnp4VVBpQTlJSHQ5S1RvZ1NHRnVaR3hsY2p4VVBpQjdYRzVjZEZ4MGFXWWdLSFI1Y0dWdlppQm9ZVzVrYkdWeUlEMDlQU0JjSW1aMWJtTjBhVzl1WENJcElIdGNibHgwWEhSY2RISmxkSFZ5YmlCb1lXNWtiR1Z5TzF4dVhIUmNkSDFjYmx4MFhIUmpiMjV6ZENCeWIzVjBaWE1nUFNCb1lXNWtiR1Z5TG5KdmRYUmxjeUI4ZkNCN2ZUdGNibHgwWEhSeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0hSb2FYTTZJR0Z1ZVN3Z2NtOTFkR1U2SUhOMGNtbHVaeXdnWVhKbk9pQkNhVzVrWVdKc1pUeHpkSEpwYm1jK0tUb2dWQ0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNGdjbTkxZEdWelczSnZkWFJsWFNBL0lISnZkWFJsYzF0eWIzVjBaVjB1WTJGc2JDaDBhR2x6TENCaGNtY3BJRHBjYmx4MFhIUmNkRngwYUdGdVpHeGxjaTV1YjNSR2IzVnVaQ0EvSUdoaGJtUnNaWEl1Ym05MFJtOTFibVF1WTJGc2JDaDBhR2x6TENCeWIzVjBaU3dnWVhKbktTQTZJRzUxYkd3N1hHNWNkRngwZlR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlNaWFIxY201eklHWjFiR3dnY0dGMGFDQmhjeUIwYUdVZ2NtVnpkV3gwSUc5bUlHQnFiMmx1WlhKZ0lHWjFibU4wYVc5dUlHTmhiR3dnYVc0Z1lIQmhjbVZ1ZEdBZ2IyWWdZSEp2ZFhSbGNtQWdkMmwwYUNCZ2JtRnRaV0FnY0dGemMyVmtJR0Z6WEc1Y2RDQXFJR0J5YjNWMFpXQWdZVzVrSUdCd1lYUm9ZQ0J3WVhOelpXUWdZWE1nWUdGeVoyQXVJRkpsZEhWeWJuTWdZSEJoZEdoZ0lHbG1JSFJvYVhNZ2FYTWdkR2hsSUhKdmIzUWdjbTkxZEdWeUxseHVYSFFnS2lCQWNHRnlZVzBnY0dGMGFDQlFZWFJvSUhKbGJHRjBhWFpsSUhSdklHQnliM1YwWlhKZ0xseHVYSFFnS2lCQWNHRnlZVzBnY205MWRHVnlJRU52YlhCMWRHVWdablZzYkNCd1lYUm9JSEpsYkdGMGFYWmxJSFJ2SUhSb2FYTWdjbTkxZEdWeUxseHVYSFFnS2lCQWNtVjBkWEp1Y3lCR2RXeHNJSEJoZEdnZ2NtVnNZWFJwZG1VZ2RHOGdkR2hsSUdCeWIzVjBaWEpnTGx4dVhIUWdLaTljYmx4MFpYaHdiM0owSUdaMWJtTjBhVzl1SUdkbGRFWjFiR3hRWVhSb0tIQmhkR2c2SUhOMGNtbHVaeXdnY205MWRHVnlQem9nVW05MWRHVnlQR0Z1ZVQ0cElIdGNibHgwWEhSeVpYUjFjbTRnY205MWRHVnlJRDhnY205MWRHVnlMbWRsZEVaMWJHeFFZWFJvS0hCaGRHZ3BJRG9nY0dGMGFEdGNibHgwZlZ4dWZWeHVJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxudmFyIF9faW1wb3J0RGVmYXVsdCA9IHZvaWQgMCAmJiAodm9pZCAwKS5fX2ltcG9ydERlZmF1bHQgfHwgZnVuY3Rpb24gKG1vZCkge1xuICByZXR1cm4gbW9kICYmIG1vZC5fX2VzTW9kdWxlID8gbW9kIDoge1xuICAgIFwiZGVmYXVsdFwiOiBtb2RcbiAgfTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBSb3V0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Sb3V0ZXJcIikpO1xuLyoqXHJcbiAqIFNob3J0aGFuZCBmb3IgUm91dGVyPENvbXBvbmVudD4uXHJcbiAqL1xuXG5cbnZhciBVSVJvdXRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1JvdXRlcl8xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKFVJUm91dGVyLCBfUm91dGVyXzEkZGVmYXVsdCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihVSVJvdXRlcik7XG5cbiAgZnVuY3Rpb24gVUlSb3V0ZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFVJUm91dGVyKTtcblxuICAgIHJldHVybiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBVSVJvdXRlcjtcbn0oUm91dGVyXzEuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFVJUm91dGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlWU1ZKdmRYUmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGelFrVTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenRCUVVkR0xFbEJRVUVzVVVGQlFTeEhRVUZCTEdWQlFVRXNRMEZCUVN4UFFVRkJMRU5CUVVFc1ZVRkJRU3hEUVVGQkxFTkJRVUU3UVVGRlFUczdRVUZGUnpzN08wbEJRMnRDTEZFN096czdPenM3T3pzN096dEZRVUZwUWl4UlFVRkJMRU5CUVVFc1R6czdRVUZCZEVNc1QwRkJRU3hEUVVGQkxFOUJRVUVzUjBGQlFTeFJRVUZCSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5cGNiazFKVkNCTWFXTmxibk5sWEc1Y2JrTnZjSGx5YVdkb2RDQW9ZeWtnTWpBeU1TQkZaMjl5SUU1bGNHOXRibmxoYzJOb2FXaGNibHh1VUdWeWJXbHpjMmx2YmlCcGN5Qm9aWEpsWW5rZ1ozSmhiblJsWkN3Z1puSmxaU0J2WmlCamFHRnlaMlVzSUhSdklHRnVlU0J3WlhKemIyNGdiMkowWVdsdWFXNW5JR0VnWTI5d2VWeHViMllnZEdocGN5QnpiMlowZDJGeVpTQmhibVFnWVhOemIyTnBZWFJsWkNCa2IyTjFiV1Z1ZEdGMGFXOXVJR1pwYkdWeklDaDBhR1VnWENKVGIyWjBkMkZ5WlZ3aUtTd2dkRzhnWkdWaGJGeHVhVzRnZEdobElGTnZablIzWVhKbElIZHBkR2h2ZFhRZ2NtVnpkSEpwWTNScGIyNHNJR2x1WTJ4MVpHbHVaeUIzYVhSb2IzVjBJR3hwYldsMFlYUnBiMjRnZEdobElISnBaMmgwYzF4dWRHOGdkWE5sTENCamIzQjVMQ0J0YjJScFpua3NJRzFsY21kbExDQndkV0pzYVhOb0xDQmthWE4wY21saWRYUmxMQ0J6ZFdKc2FXTmxibk5sTENCaGJtUXZiM0lnYzJWc2JGeHVZMjl3YVdWeklHOW1JSFJvWlNCVGIyWjBkMkZ5WlN3Z1lXNWtJSFJ2SUhCbGNtMXBkQ0J3WlhKemIyNXpJSFJ2SUhkb2IyMGdkR2hsSUZOdlpuUjNZWEpsSUdselhHNW1kWEp1YVhOb1pXUWdkRzhnWkc4Z2MyOHNJSE4xWW1wbFkzUWdkRzhnZEdobElHWnZiR3h2ZDJsdVp5QmpiMjVrYVhScGIyNXpPbHh1WEc1VWFHVWdZV0p2ZG1VZ1kyOXdlWEpwWjJoMElHNXZkR2xqWlNCaGJtUWdkR2hwY3lCd1pYSnRhWE56YVc5dUlHNXZkR2xqWlNCemFHRnNiQ0JpWlNCcGJtTnNkV1JsWkNCcGJpQmhiR3hjYm1OdmNHbGxjeUJ2Y2lCemRXSnpkR0Z1ZEdsaGJDQndiM0owYVc5dWN5QnZaaUIwYUdVZ1UyOW1kSGRoY21VdVhHNWNibFJJUlNCVFQwWlVWMEZTUlNCSlV5QlFVazlXU1VSRlJDQmNJa0ZUSUVsVFhDSXNJRmRKVkVoUFZWUWdWMEZTVWtGT1ZGa2dUMFlnUVU1WklFdEpUa1FzSUVWWVVGSkZVMU1nVDFKY2JrbE5VRXhKUlVRc0lFbE9RMHhWUkVsT1J5QkNWVlFnVGs5VUlFeEpUVWxVUlVRZ1ZFOGdWRWhGSUZkQlVsSkJUbFJKUlZNZ1QwWWdUVVZTUTBoQlRsUkJRa2xNU1ZSWkxGeHVSa2xVVGtWVFV5QkdUMUlnUVNCUVFWSlVTVU5WVEVGU0lGQlZVbEJQVTBVZ1FVNUVJRTVQVGtsT1JsSkpUa2RGVFVWT1ZDNGdTVTRnVGs4Z1JWWkZUbFFnVTBoQlRFd2dWRWhGWEc1QlZWUklUMUpUSUU5U0lFTlBVRmxTU1VkSVZDQklUMHhFUlZKVElFSkZJRXhKUVVKTVJTQkdUMUlnUVU1WklFTk1RVWxOTENCRVFVMUJSMFZUSUU5U0lFOVVTRVZTWEc1TVNVRkNTVXhKVkZrc0lGZElSVlJJUlZJZ1NVNGdRVTRnUVVOVVNVOU9JRTlHSUVOUFRsUlNRVU5VTENCVVQxSlVJRTlTSUU5VVNFVlNWMGxUUlN3Z1FWSkpVMGxPUnlCR1VrOU5MRnh1VDFWVUlFOUdJRTlTSUVsT0lFTlBUazVGUTFSSlQwNGdWMGxVU0NCVVNFVWdVMDlHVkZkQlVrVWdUMUlnVkVoRklGVlRSU0JQVWlCUFZFaEZVaUJFUlVGTVNVNUhVeUJKVGlCVVNFVmNibE5QUmxSWFFWSkZMbHh1S2k5Y2JseHVhVzF3YjNKMElFTnZiWEJ2Ym1WdWRDQm1jbTl0SUZ3aUxpOURiMjF3YjI1bGJuUmNJanRjYm1sdGNHOXlkQ0JTYjNWMFpYSWdabkp2YlNCY0lpNHZVbTkxZEdWeVhDSTdYRzVjYmk4cUtseHVJQ29nVTJodmNuUm9ZVzVrSUdadmNpQlNiM1YwWlhJOFEyOXRjRzl1Wlc1MFBpNWNiaUFxTDF4dVpYaHdiM0owSUdSbFptRjFiSFFnWTJ4aGMzTWdWVWxTYjNWMFpYSWdaWGgwWlc1a2N5QlNiM1YwWlhJOFEyOXRjRzl1Wlc1MFBpQjdYRzU5WEc0aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2FuY2VsVG9rZW5fMSA9IHJlcXVpcmUoXCIuL0NhbmNlbFRva2VuXCIpO1xuLyoqXHJcbiAqIFByb21pc2Ugd3JhcHBlciBvdmVyIHNldFRpbWVvdXQgZnVuY3Rpb24gd2l0aCBDYW5jZWxUb2tlbiBzdXBwb3J0LiBSZXNvbHZlcyB0aGUgcHJvbWlzZSBhZnRlciBzcGVjaWZpZWRcclxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xyXG4gKiByZXNvbHZlZCBvciByZWplY3RlZC5cclxuICogQHBhcmFtIG1zIFRpbWVvdXQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxyXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cclxuICogQHJldHVybnMgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSB0aW1lb3V0LlxyXG4gKi9cblxuXG5mdW5jdGlvbiBkZWZhdWx0XzEobXMsIGNhbmNlbFRva2VuKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gQ2FuY2VsVG9rZW5fMS5ydW5Bc3luYyhmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcbiAgfSwgZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfSwgY2FuY2VsVG9rZW4pO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OWtaV1psY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRnpRa1U3T3pzN096dEJRVVZHTEVsQlFVRXNZVUZCUVN4SFFVRkJMRTlCUVVFc1EwRkJRU3hsUVVGQkxFTkJRVUU3UVVGRlFUczdPenM3T3p0QlFVOUhPenM3UVVGRFNDeFRRVUZCTEZOQlFVRXNRMEZCZVVJc1JVRkJla0lzUlVGQmMwTXNWMEZCZEVNc1JVRkJLMFE3UVVGRE9VUXNUVUZCU1N4UFFVRktPMEZCUTBFc1UwRkJUeXhoUVVGQkxFTkJRVUVzVVVGQlFTeERRVU5PTEZWQlFVRXNUMEZCVHl4RlFVRkhPMEZCUTFRc1NVRkJRU3hQUVVGUExFZEJRVWNzVlVGQlZTeERRVUZETEU5QlFVUXNSVUZCVlN4RlFVRldMRU5CUVhCQ08wRkJRMEVzUjBGSVN5eEZRVWxPTEZsQlFVczdRVUZEU2l4SlFVRkJMRmxCUVZrc1EwRkJReXhQUVVGRUxFTkJRVm83UVVGRFFTeEhRVTVMTEVWQlQwNHNWMEZRVFN4RFFVRlFPMEZCVTBFN08wRkJXRVFzVDBGQlFTeERRVUZCTEU5QlFVRXNSMEZCUVN4VFFVRkJJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlwY2JrMUpWQ0JNYVdObGJuTmxYRzVjYmtOdmNIbHlhV2RvZENBb1l5a2dNakF5TVNCRloyOXlJRTVsY0c5dGJubGhjMk5vYVdoY2JseHVVR1Z5YldsemMybHZiaUJwY3lCb1pYSmxZbmtnWjNKaGJuUmxaQ3dnWm5KbFpTQnZaaUJqYUdGeVoyVXNJSFJ2SUdGdWVTQndaWEp6YjI0Z2IySjBZV2x1YVc1bklHRWdZMjl3ZVZ4dWIyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVWdYQ0pUYjJaMGQyRnlaVndpS1N3Z2RHOGdaR1ZoYkZ4dWFXNGdkR2hsSUZOdlpuUjNZWEpsSUhkcGRHaHZkWFFnY21WemRISnBZM1JwYjI0c0lHbHVZMngxWkdsdVp5QjNhWFJvYjNWMElHeHBiV2wwWVhScGIyNGdkR2hsSUhKcFoyaDBjMXh1ZEc4Z2RYTmxMQ0JqYjNCNUxDQnRiMlJwWm5rc0lHMWxjbWRsTENCd2RXSnNhWE5vTENCa2FYTjBjbWxpZFhSbExDQnpkV0pzYVdObGJuTmxMQ0JoYm1RdmIzSWdjMlZzYkZ4dVkyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRDQndaWEp6YjI1eklIUnZJSGRvYjIwZ2RHaGxJRk52Wm5SM1lYSmxJR2x6WEc1bWRYSnVhWE5vWldRZ2RHOGdaRzhnYzI4c0lITjFZbXBsWTNRZ2RHOGdkR2hsSUdadmJHeHZkMmx1WnlCamIyNWthWFJwYjI1ek9seHVYRzVVYUdVZ1lXSnZkbVVnWTI5d2VYSnBaMmgwSUc1dmRHbGpaU0JoYm1RZ2RHaHBjeUJ3WlhKdGFYTnphVzl1SUc1dmRHbGpaU0J6YUdGc2JDQmlaU0JwYm1Oc2RXUmxaQ0JwYmlCaGJHeGNibU52Y0dsbGN5QnZjaUJ6ZFdKemRHRnVkR2xoYkNCd2IzSjBhVzl1Y3lCdlppQjBhR1VnVTI5bWRIZGhjbVV1WEc1Y2JsUklSU0JUVDBaVVYwRlNSU0JKVXlCUVVrOVdTVVJGUkNCY0lrRlRJRWxUWENJc0lGZEpWRWhQVlZRZ1YwRlNVa0ZPVkZrZ1QwWWdRVTVaSUV0SlRrUXNJRVZZVUZKRlUxTWdUMUpjYmtsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBZZ1RVVlNRMGhCVGxSQlFrbE1TVlJaTEZ4dVJrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzVCVlZSSVQxSlRJRTlTSUVOUFVGbFNTVWRJVkNCSVQweEVSVkpUSUVKRklFeEpRVUpNUlNCR1QxSWdRVTVaSUVOTVFVbE5MQ0JFUVUxQlIwVlRJRTlTSUU5VVNFVlNYRzVNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxGeHVUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUaUJVU0VWY2JsTlBSbFJYUVZKRkxseHVLaTljYmx4dWFXMXdiM0owSUVOaGJtTmxiRlJ2YTJWdUxDQjdjblZ1UVhONWJtTjlJR1p5YjIwZ1hDSXVMME5oYm1ObGJGUnZhMlZ1WENJN1hHNWNiaThxS2x4dUlDb2dVSEp2YldselpTQjNjbUZ3Y0dWeUlHOTJaWElnYzJWMFZHbHRaVzkxZENCbWRXNWpkR2x2YmlCM2FYUm9JRU5oYm1ObGJGUnZhMlZ1SUhOMWNIQnZjblF1SUZKbGMyOXNkbVZ6SUhSb1pTQndjbTl0YVhObElHRm1kR1Z5SUhOd1pXTnBabWxsWkZ4dUlDb2djR1Z5YVc5a0lHOW1JSFJwYldVdUlFNWxkbVZ5SUhKbGFtVmpkSE1nZEdobElIQnliMjFwYzJVdUlFbG1JSFJvWlNCdmNHVnlZWFJwYjI0Z1oyVjBjeUJqWVc1alpXeHNaV1FnZG1saElIUm9aU0IwYjJ0bGJpd2dkR2hsSUhCeWIyMXBjMlVnYm1WMlpYSWdaMlYwYzF4dUlDb2djbVZ6YjJ4MlpXUWdiM0lnY21WcVpXTjBaV1F1WEc0Z0tpQkFjR0Z5WVcwZ2JYTWdWR2x0Wlc5MWRDQmtkWEpoZEdsdmJpQnBiaUJ0YVd4c2FYTmxZMjl1WkhNdVhHNGdLaUJBY0dGeVlXMGdZMkZ1WTJWc1ZHOXJaVzRnUTJGdVkyVnNiR0YwYVc5dUlIUnZhMlZ1SUhSdklHSnBibVFnZEdobElHOXdaWEpoZEdsdmJpQjBieTVjYmlBcUlFQnlaWFIxY201eklGQnliMjFwYzJVZ2IySnFaV04wSUhKbGNISmxjMlZ1ZEdsdVp5QjBhR1VnZEdsdFpXOTFkQzVjYmlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z0tHMXpQem9nYm5WdFltVnlMQ0JqWVc1alpXeFViMnRsYmo4NklFTmhibU5sYkZSdmEyVnVLVG9nVUhKdmJXbHpaVHgyYjJsa1BpQjdYRzVjZEd4bGRDQjBhVzFsYjNWME9pQmhibms3WEc1Y2RISmxkSFZ5YmlCeWRXNUJjM2x1WXp4MmIybGtQaWhjYmx4MFhIUnlaWE52YkhabElEMCtJSHRjYmx4MFhIUmNkSFJwYldWdmRYUWdQU0J6WlhSVWFXMWxiM1YwS0hKbGMyOXNkbVVzSUcxektUdGNibHgwWEhSOUxGeHVYSFJjZENncElEMCtJSHRjYmx4MFhIUmNkR05zWldGeVZHbHRaVzkxZENoMGFXMWxiM1YwS1R0Y2JseDBYSFI5TEZ4dVhIUmNkR05oYm1ObGJGUnZhMlZ1WEc1Y2RDazdYRzU5WEc0aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxudmFyIF9faW1wb3J0RGVmYXVsdCA9IHZvaWQgMCAmJiAodm9pZCAwKS5fX2ltcG9ydERlZmF1bHQgfHwgZnVuY3Rpb24gKG1vZCkge1xuICByZXR1cm4gbW9kICYmIG1vZC5fX2VzTW9kdWxlID8gbW9kIDoge1xuICAgIFwiZGVmYXVsdFwiOiBtb2RcbiAgfTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBqcXVlcnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblxudmFyIFByb3BlcnR5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUHJvcGVydHlcIikpO1xuXG52YXIgSGFzaCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1Byb3BlcnR5XzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoSGFzaCwgX1Byb3BlcnR5XzEkZGVmYXVsdCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihIYXNoKTtcblxuICBmdW5jdGlvbiBIYXNoKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBIYXNoKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgbG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xuICAgIF90aGlzLnJlZGlyZWN0aW9uRGV0ZWN0aW9uSW50ZXJ2YWwgPSAxMDAwO1xuICAgIF90aGlzLnJlZGlyZWN0aW9uRGV0ZWN0aW9uTGltaXQgPSAyNTtcbiAgICBfdGhpcy5yZWRpcmVjdGlvblN0YXJ0VGltZSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICBfdGhpcy5yZWRpcmVjdGlvblVybHMgPSBbXTtcbiAgICBfdGhpcy5yZWRpcmVjdGlvbkxvY2tlZCA9IGZhbHNlO1xuICAgIF90aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuXG4gICAgaWYgKGhhc2ggIT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGFzaCBpcyBhIHNpbmdsZXRvbi4gVW5hYmxlIHRvIGNyZWF0ZSBtb3JlIGluc3RhbmNlcy5cIik7XG4gICAgfVxuXG4gICAgaGFzaCA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgIGpxdWVyeV8xLmRlZmF1bHQod2luZG93KS5vbihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2V0KGxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSGFzaCwgW3tcbiAgICBrZXk6IFwidXBkYXRpbmdcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl91cGRhdGluZztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldCgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogXCJcIjtcbiAgICAgIHZhciByZXBsYWNlU3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHRoaXMucmVkaXJlY3Rpb25Mb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICBpZiAob2xkVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgaWYgKHRpbWUgLSB0aGlzLnJlZGlyZWN0aW9uU3RhcnRUaW1lIDwgdGhpcy5yZWRpcmVjdGlvbkRldGVjdGlvbkludGVydmFsKSB7XG4gICAgICAgIHRoaXMucmVkaXJlY3Rpb25VcmxzLnB1c2godmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlZGlyZWN0aW9uVXJscy5sZW5ndGggPiB0aGlzLnJlZGlyZWN0aW9uRGV0ZWN0aW9uTGltaXQpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRW5kbGVzcyBVUkwgcmVkaXJlY3Rpb24gZGV0ZWN0ZWQuIFByZXZlbnRpbmcgYWxsIGZ1cnRoZXIgcmVkaXJlY3Rpb25zLiBTZWUgVVJMcyBiZWxvdy4gXCIgKyBcIklmIHRoaXMgaW5mb3JtYXRpb24gaXMgbm90IGVub3VnaCwgcGxlYXNlIHNldCBicmVha3BvaW50IHRvIHRoaXMgbWV0aG9kIGFuZCBmaW5kIG91dCB3aGF0IGNhdXNlcyBcIiArIFwidW5leHBlY3RlZCByZWRpcmVjdGlvbiBjYWxscy4gUHJvYmFibHkgeW91IGhhdmUgbWlzY29uZmlndXJlZCBzb21lIHJvdXRlciAtIFwiICsgXCJwbGVhc2UgY2hlY2sgcm91dGVyIG5hbWVzIGFuZCBwYXJlbnRzLlwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlZGlyZWN0aW9uVXJscyk7XG4gICAgICAgICAgdGhpcy5yZWRpcmVjdGlvbkxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlZGlyZWN0aW9uU3RhcnRUaW1lID0gdGltZTtcbiAgICAgICAgdGhpcy5yZWRpcmVjdGlvblVybHMgPSBbdmFsdWVdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIGlmIChyZXBsYWNlU3RhdGUgJiYgd2luZG93Lmhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgXCJcIiwgbG9jYXRpb24ucGF0aG5hbWUgKyBcIiNcIiArIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIiNcIiArIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9vbkNoYW5nZS5kaXNwYXRjaCh7XG4gICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBIYXNoO1xufShQcm9wZXJ0eV8xLmRlZmF1bHQpO1xuLyoqXHJcbiAqIEluc3RhbmNlIG9mIElIYXNoIHNpbmdsZXRvbi4gUHJvdmlkZXMgYSB0cmFuc3BhcmVudCBQcm9wZXJ0eS1jb21wYXRpYmxlIGludGVyZmFjZSBvdmVyIGBsb2NhdGlvbi5oYXNoYFxyXG4gKiBtYW5pcHVsYXRpb25zLiBWYWx1ZSBvZiB0aGlzIHByb3BlcnR5IGlzIGFsd2F5cyBlcXVhbCB0byBgbG9jYXRpb24uaGFzaGAgd2l0aG91dCBsZWFkaW5nIFwiI1wiIHN5bWJvbC5cclxuICogSGFzIGEgYnVpbHQtaW4gcHJvdGVjdGlvbiBhZ2FpbnN0IGluZmluaXRlIHJlZGlyZWN0aW9ucy5cclxuICovXG5cblxudmFyIGhhc2ggPSBudWxsOyAvLyBBbiBleHRyYSB2YXJpYWJsZSBoZWxwcyBJbnRlbGxpU2Vuc2UgdG8gZmluZCB0aGlzIGltcG9ydFxuXG5uZXcgSGFzaCgpO1xuZXhwb3J0cy5kZWZhdWx0ID0gaGFzaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5b1lYTm9MblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUczdPenM3T3pzN096czdPenM3T3pzN096czdPenRCUVhOQ1JUczdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0QlFVVkdMRWxCUVVFc1VVRkJRU3hIUVVGQkxHVkJRVUVzUTBGQlFTeFBRVUZCTEVOQlFVRXNVVUZCUVN4RFFVRkJMRU5CUVVFN08wRkJSVUVzU1VGQlFTeFZRVUZCTEVkQlFVRXNaVUZCUVN4RFFVRkJMRTlCUVVFc1EwRkJRU3haUVVGQkxFTkJRVUVzUTBGQlFUczdTVUYzUWswc1NUczdPenM3UVVGWFRDeHJRa0ZCUVR0QlFVRkJPenRCUVVGQk96dEJRVU5ETERoQ1FVRk5MRkZCUVZFc1EwRkJReXhKUVVGVUxFTkJRV01zVFVGQlpDeERRVUZ4UWl4RFFVRnlRaXhEUVVGT08wRkJWbWRDTEZWQlFVRXNORUpCUVVFc1IwRkJLMElzU1VGQkwwSTdRVUZEUVN4VlFVRkJMSGxDUVVGQkxFZEJRVFJDTEVWQlFUVkNPMEZCUlZRc1ZVRkJRU3h2UWtGQlFTeEhRVUYxUWl4TlFVRk5MRU5CUVVNc2FVSkJRVGxDTzBGQlEwRXNWVUZCUVN4bFFVRkJMRWRCUVRSQ0xFVkJRVFZDTzBGQlEwRXNWVUZCUVN4cFFrRkJRU3hIUVVGdlFpeExRVUZ3UWp0QlFVVkJMRlZCUVVFc1UwRkJRU3hIUVVGWkxFdEJRVm83TzBGQlNWQXNVVUZCU1N4SlFVRkpMRWxCUVVrc1NVRkJXaXhGUVVGclFqdEJRVU5xUWl4WlFVRk5MRWxCUVVrc1MwRkJTaXhEUVVGVkxIVkVRVUZXTEVOQlFVNDdRVUZEUVRzN1FVRkRSQ3hKUVVGQkxFbEJRVWtzWjBOQlFVbzdRVUZEUVN4SlFVRkJMRkZCUVVFc1EwRkJRU3hQUVVGQkxFTkJRVThzVFVGQlVDeEZRVUZsTEVWQlFXWXNRMEZCYTBJc1dVRkJiRUlzUlVGQlowTXNXVUZCU3p0QlFVTndReXhaUVVGTExFZEJRVXdzUTBGQlV5eFJRVUZSTEVOQlFVTXNTVUZCVkN4RFFVRmpMRTFCUVdRc1EwRkJjVUlzUTBGQmNrSXNRMEZCVkR0QlFVTkJMRXRCUmtRN1FVRk9SRHRCUVZORE96czdPMU5CUlVRc1pVRkJXVHRCUVVOWUxHRkJRVThzUzBGQlN5eFRRVUZhTzBGQlEwRTdPenRYUVVWRUxHVkJRVGhETzBGQlFVRXNWVUZCTVVNc1MwRkJNRU1zZFVWQlFURkNMRVZCUVRCQ08wRkJRVUVzVlVGQmRFSXNXVUZCYzBJN08wRkJRemRETEZWQlFVa3NTMEZCU3l4cFFrRkJWQ3hGUVVFMFFqdEJRVU16UWp0QlFVTkJPenRCUVVORUxGVkJRVTBzVVVGQlVTeEhRVUZITEV0QlFVc3NTMEZCZEVJN08wRkJRMEVzVlVGQlNTeFJRVUZSTEV0QlFVc3NTMEZCYWtJc1JVRkJkMEk3UVVGRGRrSTdRVUZEUVRzN1FVRkZSQ3hWUVVGTkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVsQlFVb3NSMEZCVnl4UFFVRllMRVZCUVdJN08wRkJRMEVzVlVGQlNTeEpRVUZKTEVkQlFVY3NTMEZCU3l4dlFrRkJXaXhIUVVGdFF5eExRVUZMTERSQ1FVRTFReXhGUVVFd1JUdEJRVU42UlN4aFFVRkxMR1ZCUVV3c1EwRkJjVUlzU1VGQmNrSXNRMEZCTUVJc1MwRkJNVUk3TzBGQlEwRXNXVUZCU1N4TFFVRkxMR1ZCUVV3c1EwRkJjVUlzVFVGQmNrSXNSMEZCT0VJc1MwRkJTeXg1UWtGQmRrTXNSVUZCYTBVN1FVRkRha1VzVlVGQlFTeFBRVUZQTEVOQlFVTXNTMEZCVWl4RFFVRmpMRFJHUVVOaUxHMUhRVVJoTEVkQlJXSXNPRVZCUm1Fc1IwRkhZaXgzUTBGSVJEdEJRVWxCTEZWQlFVRXNUMEZCVHl4RFFVRkRMRWRCUVZJc1EwRkJXU3hMUVVGTExHVkJRV3BDTzBGQlEwRXNaVUZCU3l4cFFrRkJUQ3hIUVVGNVFpeEpRVUY2UWp0QlFVTkJPMEZCUTBFN1FVRkRSQ3hQUVZoRUxFMUJWMDg3UVVGRFRpeGhRVUZMTEc5Q1FVRk1MRWRCUVRSQ0xFbEJRVFZDTzBGQlEwRXNZVUZCU3l4bFFVRk1MRWRCUVhWQ0xFTkJRVU1zUzBGQlJDeERRVUYyUWp0QlFVTkJPenRCUVVWRUxGZEJRVXNzVTBGQlRDeEhRVUZwUWl4SlFVRnFRanRCUVVOQkxGZEJRVXNzUzBGQlRDeEhRVUZoTEV0QlFXSTdPMEZCUTBFc1ZVRkJTU3haUVVGWkxFbEJRVWtzVFVGQlRTeERRVUZETEU5QlFYWkNMRWxCUVd0RExFOUJRVThzUTBGQlF5eFpRVUU1UXl4RlFVRTBSRHRCUVVNelJDeFJRVUZCTEU5QlFVOHNRMEZCUXl4WlFVRlNMRU5CUVhGQ0xFbEJRWEpDTEVWQlFUSkNMRVZCUVROQ0xFVkJRU3RDTEZGQlFWRXNRMEZCUXl4UlFVRlVMRWRCUVc5Q0xFZEJRWEJDTEVkQlFUQkNMRXRCUVhwRU8wRkJRMEVzVDBGR1JDeE5RVVZQTzBGQlEwNHNVVUZCUVN4UlFVRlJMRU5CUVVNc1NVRkJWQ3hIUVVGblFpeE5RVUZOTEV0QlFYUkNPMEZCUTBFN08wRkJRMFFzVjBGQlN5eFRRVUZNTEVOQlFXVXNVVUZCWml4RFFVRjNRanRCUVVGRExGRkJRVUVzVFVGQlRTeEZRVUZGTEVsQlFWUTdRVUZCWlN4UlFVRkJMRXRCUVVzc1JVRkJUQ3hMUVVGbU8wRkJRWE5DTEZGQlFVRXNVVUZCVVN4RlFVRlNPMEZCUVhSQ0xFOUJRWGhDT3p0QlFVTkJMRmRCUVVzc1UwRkJUQ3hIUVVGcFFpeExRVUZxUWp0QlFVTkJPenM3TzBWQk4wUnBRaXhWUVVGQkxFTkJRVUVzVHp0QlFXZEZia0k3T3pzN1FVRkpSenM3TzBGQlEwZ3NTVUZCU1N4SlFVRkpMRWRCUVZVc1NVRkJiRUlzUXl4RFFVRjNRanM3UVVGRGVFSXNTVUZCU1N4SlFVRktPMEZCUTBFc1QwRkJRU3hEUVVGQkxFOUJRVUVzUjBGQlpTeEpRVUZtSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5cGNiazFKVkNCTWFXTmxibk5sWEc1Y2JrTnZjSGx5YVdkb2RDQW9ZeWtnTWpBeU1TQkZaMjl5SUU1bGNHOXRibmxoYzJOb2FXaGNibHh1VUdWeWJXbHpjMmx2YmlCcGN5Qm9aWEpsWW5rZ1ozSmhiblJsWkN3Z1puSmxaU0J2WmlCamFHRnlaMlVzSUhSdklHRnVlU0J3WlhKemIyNGdiMkowWVdsdWFXNW5JR0VnWTI5d2VWeHViMllnZEdocGN5QnpiMlowZDJGeVpTQmhibVFnWVhOemIyTnBZWFJsWkNCa2IyTjFiV1Z1ZEdGMGFXOXVJR1pwYkdWeklDaDBhR1VnWENKVGIyWjBkMkZ5WlZ3aUtTd2dkRzhnWkdWaGJGeHVhVzRnZEdobElGTnZablIzWVhKbElIZHBkR2h2ZFhRZ2NtVnpkSEpwWTNScGIyNHNJR2x1WTJ4MVpHbHVaeUIzYVhSb2IzVjBJR3hwYldsMFlYUnBiMjRnZEdobElISnBaMmgwYzF4dWRHOGdkWE5sTENCamIzQjVMQ0J0YjJScFpua3NJRzFsY21kbExDQndkV0pzYVhOb0xDQmthWE4wY21saWRYUmxMQ0J6ZFdKc2FXTmxibk5sTENCaGJtUXZiM0lnYzJWc2JGeHVZMjl3YVdWeklHOW1JSFJvWlNCVGIyWjBkMkZ5WlN3Z1lXNWtJSFJ2SUhCbGNtMXBkQ0J3WlhKemIyNXpJSFJ2SUhkb2IyMGdkR2hsSUZOdlpuUjNZWEpsSUdselhHNW1kWEp1YVhOb1pXUWdkRzhnWkc4Z2MyOHNJSE4xWW1wbFkzUWdkRzhnZEdobElHWnZiR3h2ZDJsdVp5QmpiMjVrYVhScGIyNXpPbHh1WEc1VWFHVWdZV0p2ZG1VZ1kyOXdlWEpwWjJoMElHNXZkR2xqWlNCaGJtUWdkR2hwY3lCd1pYSnRhWE56YVc5dUlHNXZkR2xqWlNCemFHRnNiQ0JpWlNCcGJtTnNkV1JsWkNCcGJpQmhiR3hjYm1OdmNHbGxjeUJ2Y2lCemRXSnpkR0Z1ZEdsaGJDQndiM0owYVc5dWN5QnZaaUIwYUdVZ1UyOW1kSGRoY21VdVhHNWNibFJJUlNCVFQwWlVWMEZTUlNCSlV5QlFVazlXU1VSRlJDQmNJa0ZUSUVsVFhDSXNJRmRKVkVoUFZWUWdWMEZTVWtGT1ZGa2dUMFlnUVU1WklFdEpUa1FzSUVWWVVGSkZVMU1nVDFKY2JrbE5VRXhKUlVRc0lFbE9RMHhWUkVsT1J5QkNWVlFnVGs5VUlFeEpUVWxVUlVRZ1ZFOGdWRWhGSUZkQlVsSkJUbFJKUlZNZ1QwWWdUVVZTUTBoQlRsUkJRa2xNU1ZSWkxGeHVSa2xVVGtWVFV5QkdUMUlnUVNCUVFWSlVTVU5WVEVGU0lGQlZVbEJQVTBVZ1FVNUVJRTVQVGtsT1JsSkpUa2RGVFVWT1ZDNGdTVTRnVGs4Z1JWWkZUbFFnVTBoQlRFd2dWRWhGWEc1QlZWUklUMUpUSUU5U0lFTlBVRmxTU1VkSVZDQklUMHhFUlZKVElFSkZJRXhKUVVKTVJTQkdUMUlnUVU1WklFTk1RVWxOTENCRVFVMUJSMFZUSUU5U0lFOVVTRVZTWEc1TVNVRkNTVXhKVkZrc0lGZElSVlJJUlZJZ1NVNGdRVTRnUVVOVVNVOU9JRTlHSUVOUFRsUlNRVU5VTENCVVQxSlVJRTlTSUU5VVNFVlNWMGxUUlN3Z1FWSkpVMGxPUnlCR1VrOU5MRnh1VDFWVUlFOUdJRTlTSUVsT0lFTlBUazVGUTFSSlQwNGdWMGxVU0NCVVNFVWdVMDlHVkZkQlVrVWdUMUlnVkVoRklGVlRSU0JQVWlCUFZFaEZVaUJFUlVGTVNVNUhVeUJKVGlCVVNFVmNibE5QUmxSWFFWSkZMbHh1S2k5Y2JseHVhVzF3YjNKMElHcFJkV1Z5ZVNCbWNtOXRJRndpYW5GMVpYSjVYQ0k3WEc1cGJYQnZjblFnU1ZCeWIzQmxjblI1SUdaeWIyMGdYQ0l1TDBsUWNtOXdaWEowZVZ3aU8xeHVhVzF3YjNKMElGQnliM0JsY25SNUlHWnliMjBnWENJdUwxQnliM0JsY25SNVhDSTdYRzVjYmk4cUtseHVJQ29nU1c1MFpYSm1ZV05sSUc5bUlHQm9ZWE5vWUNCdlltcGxZM1F1SUVWNGRHVnVjMmx2YmlCdlppQkpVSEp2Y0dWeWRIazhjM1J5YVc1blBpQnBiblJsY21aaFkyVWdkMmwwYUNCZ2RYQmtZWFJwYm1kZ0lITjBZWFIxY3lCcGJtUnBZMkYwYjNJZ1lXNWtYRzRnS2lCZ2NtVndiR0ZqWlZOMFlYUmxZQ0J2Y0hScGIyNWhiQ0J3WVhKaGJXVjBaWElnYjJZZ1lITmxkR0FnYldWMGFHOWtMbHh1SUNvdlhHNWxlSEJ2Y25RZ2FXNTBaWEptWVdObElFbElZWE5vSUdWNGRHVnVaSE1nU1ZCeWIzQmxjblI1UEhOMGNtbHVaejRnZTF4dVhHNWNkQzhxS2x4dVhIUWdLaUJKYm1ScFkyRjBaWE1nYVdZZ2FHRnphQ0JoYzNOcFoyNXRaVzUwSUdseklHbHVJSEJ5YjJkeVpYTnpJR0YwSUhSb1pTQnRiMjFsYm5RdUlGZG9hV3hsSUdCMWNHUmhkR2x1WjJBZ2FYTWdkSEoxWlN3Z1lHeHZZMkYwYVc5dUxtaGhjMmhnWEc1Y2RDQXFJR2RsZEhNZ2JXOWthV1pwWldRZ1lXNWtJR0VnWTJoaGJtZGxJRzFsYzNOaFoyVWdaMlYwY3lCa2FYTndZWFJqYUdWa0xpQkRhR1ZqYTJsdVp5QjBhR2x6SUdac1lXY2dhVzRnWTI5eWNtVnpjRzl1WkdsdVp5QmxkbVZ1ZENCb1lXNWtiR1Z5Y3lCdFlYa2djSEpsZG1WdWRGeHVYSFFnS2lCcGJtWnBibWwwWlNCc2IyOXdjeUJoYm1RZ2RXNWxlSEJsWTNSbFpDQmpZV3hzWW1GamF5QmpiMjVtYkdsamRITXVYRzVjZENBcUwxeHVYSFJ5WldGa2IyNXNlU0IxY0dSaGRHbHVaem9nWW05dmJHVmhianRjYmx4dVhIUXZLaXBjYmx4MElDb2dRWE56YVdkdWN5QmdiRzlqWVhScGIyNHVhR0Z6YUdBZ2RHOGdZU0J1WlhjZ2RtRnNkV1VnWVc1a0lHUnBjM0JoZEdOb1pYTWdZU0JqYUdGdVoyVWdiV1Z6YzJGblpTNGdVbUZwYzJWeklHQjFjR1JoZEdsdVoyQWdabXhoWnlCMGJ5QndjbVYyWlc1MFhHNWNkQ0FxSUdsdVptbHVhWFJsSUd4dmIzQnpJR0Z1WkNCallXeHNZbUZqYXlCamIyNW1iR2xqZEhNZ1pIVnlhVzVuSUhSb2FYTWdkR2x0WlM1Y2JseDBJQ29nUUhCaGNtRnRJSFpoYkhWbElFNWxkeUJvWVhOb0lIWmhiSFZsSUhSdklHRnpjMmxuYmk1Y2JseDBJQ29nUUhCaGNtRnRJSEpsY0d4aFkyVlRkR0YwWlNCU1pYQnNZV05sSUhSb1pTQmpkWEp5Wlc1MElHSnliM2R6WlhJZ2FHbHpkRzl5YVdOaGJDQnpkR0YwWlNCeVlYUm9aWElnZEdoaGJpQndkWE5vYVc1bklHRWdibVYzSUhOMFlYUmxJSFJ2SUhSb1pTQnpkR0ZqYXk1Y2JseDBJQ292WEc1Y2RITmxkQ2gyWVd4MVpUb2djM1J5YVc1bkxDQnlaWEJzWVdObFUzUmhkR1UvT2lCaWIyOXNaV0Z1S1RvZ2RtOXBaRHRjYm4xY2JseHVZMnhoYzNNZ1NHRnphQ0JsZUhSbGJtUnpJRkJ5YjNCbGNuUjVQSE4wY21sdVp6NGdhVzF3YkdWdFpXNTBjeUJKU0dGemFDQjdYRzVjYmx4MGNISnBkbUYwWlNCeVpXRmtiMjVzZVNCeVpXUnBjbVZqZEdsdmJrUmxkR1ZqZEdsdmJrbHVkR1Z5ZG1Gc0lEMGdNVEF3TUR0Y2JseDBjSEpwZG1GMFpTQnlaV0ZrYjI1c2VTQnlaV1JwY21WamRHbHZia1JsZEdWamRHbHZia3hwYldsMElEMGdNalU3WEc1Y2JseDBjSEpwZG1GMFpTQnlaV1JwY21WamRHbHZibE4wWVhKMFZHbHRaU0E5SUU1MWJXSmxjaTVPUlVkQlZFbFdSVjlKVGtaSlRrbFVXVHRjYmx4MGNISnBkbUYwWlNCeVpXUnBjbVZqZEdsdmJsVnliSE02SUhOMGNtbHVaMXRkSUQwZ1cxMDdYRzVjZEhCeWFYWmhkR1VnY21Wa2FYSmxZM1JwYjI1TWIyTnJaV1FnUFNCbVlXeHpaVHRjYmx4dVhIUndjbWwyWVhSbElGOTFjR1JoZEdsdVp5QTlJR1poYkhObE8xeHVYRzVjZEdOdmJuTjBjblZqZEc5eUtDa2dlMXh1WEhSY2RITjFjR1Z5S0d4dlkyRjBhVzl1TG1oaGMyZ3VjM1ZpYzNSeUtERXBLVHRjYmx4MFhIUnBaaUFvYUdGemFDQWhQU0J1ZFd4c0tTQjdYRzVjZEZ4MFhIUjBhSEp2ZHlCdVpYY2dSWEp5YjNJb1hDSklZWE5vSUdseklHRWdjMmx1WjJ4bGRHOXVMaUJWYm1GaWJHVWdkRzhnWTNKbFlYUmxJRzF2Y21VZ2FXNXpkR0Z1WTJWekxsd2lLVnh1WEhSY2RIMWNibHgwWEhSb1lYTm9JRDBnZEdocGN6dGNibHgwWEhScVVYVmxjbmtvZDJsdVpHOTNLUzV2YmloY0ltaGhjMmhqYUdGdVoyVmNJaXdnS0NrZ1BUNGdlMXh1WEhSY2RGeDBkR2hwY3k1elpYUW9iRzlqWVhScGIyNHVhR0Z6YUM1emRXSnpkSElvTVNrcE8xeHVYSFJjZEgwcE8xeHVYSFI5WEc1Y2JseDBaMlYwSUhWd1pHRjBhVzVuS0NrZ2UxeHVYSFJjZEhKbGRIVnliaUIwYUdsekxsOTFjR1JoZEdsdVp6dGNibHgwZlZ4dVhHNWNkSE5sZENoMllXeDFaVG9nYzNSeWFXNW5JRDBnWENKY0lpd2djbVZ3YkdGalpWTjBZWFJsUHpvZ1ltOXZiR1ZoYmlrZ2UxeHVYSFJjZEdsbUlDaDBhR2x6TG5KbFpHbHlaV04wYVc5dVRHOWphMlZrS1NCN1hHNWNkRngwWEhSeVpYUjFjbTQ3WEc1Y2RGeDBmVnh1WEhSY2RHTnZibk4wSUc5c1pGWmhiSFZsSUQwZ2RHaHBjeTUyWVd4MVpUdGNibHgwWEhScFppQW9iMnhrVm1Gc2RXVWdQVDA5SUhaaGJIVmxLU0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNDdYRzVjZEZ4MGZWeHVYRzVjZEZ4MFkyOXVjM1FnZEdsdFpTQTlJRzVsZHlCRVlYUmxLQ2t1WjJWMFZHbHRaU2dwTzF4dVhIUmNkR2xtSUNoMGFXMWxJQzBnZEdocGN5NXlaV1JwY21WamRHbHZibE4wWVhKMFZHbHRaU0E4SUhSb2FYTXVjbVZrYVhKbFkzUnBiMjVFWlhSbFkzUnBiMjVKYm5SbGNuWmhiQ2tnZTF4dVhIUmNkRngwZEdocGN5NXlaV1JwY21WamRHbHZibFZ5YkhNdWNIVnphQ2gyWVd4MVpTazdYRzVjZEZ4MFhIUnBaaUFvZEdocGN5NXlaV1JwY21WamRHbHZibFZ5YkhNdWJHVnVaM1JvSUQ0Z2RHaHBjeTV5WldScGNtVmpkR2x2YmtSbGRHVmpkR2x2Ymt4cGJXbDBLU0I3WEc1Y2RGeDBYSFJjZEdOdmJuTnZiR1V1WlhKeWIzSW9YQ0pGYm1Sc1pYTnpJRlZTVENCeVpXUnBjbVZqZEdsdmJpQmtaWFJsWTNSbFpDNGdVSEpsZG1WdWRHbHVaeUJoYkd3Z1puVnlkR2hsY2lCeVpXUnBjbVZqZEdsdmJuTXVJRk5sWlNCVlVreHpJR0psYkc5M0xpQmNJaUFyWEc1Y2RGeDBYSFJjZEZ4MFhDSkpaaUIwYUdseklHbHVabTl5YldGMGFXOXVJR2x6SUc1dmRDQmxibTkxWjJnc0lIQnNaV0Z6WlNCelpYUWdZbkpsWVd0d2IybHVkQ0IwYnlCMGFHbHpJRzFsZEdodlpDQmhibVFnWm1sdVpDQnZkWFFnZDJoaGRDQmpZWFZ6WlhNZ1hDSWdLMXh1WEhSY2RGeDBYSFJjZEZ3aWRXNWxlSEJsWTNSbFpDQnlaV1JwY21WamRHbHZiaUJqWVd4c2N5NGdVSEp2WW1GaWJIa2dlVzkxSUdoaGRtVWdiV2x6WTI5dVptbG5kWEpsWkNCemIyMWxJSEp2ZFhSbGNpQXRJRndpSUN0Y2JseDBYSFJjZEZ4MFhIUmNJbkJzWldGelpTQmphR1ZqYXlCeWIzVjBaWElnYm1GdFpYTWdZVzVrSUhCaGNtVnVkSE11WENJcE8xeHVYSFJjZEZ4MFhIUmpiMjV6YjJ4bExteHZaeWgwYUdsekxuSmxaR2x5WldOMGFXOXVWWEpzY3lrN1hHNWNkRngwWEhSY2RIUm9hWE11Y21Wa2FYSmxZM1JwYjI1TWIyTnJaV1FnUFNCMGNuVmxPMXh1WEhSY2RGeDBYSFJ5WlhSMWNtNDdYRzVjZEZ4MFhIUjlYRzVjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEhSb2FYTXVjbVZrYVhKbFkzUnBiMjVUZEdGeWRGUnBiV1VnUFNCMGFXMWxPMXh1WEhSY2RGeDBkR2hwY3k1eVpXUnBjbVZqZEdsdmJsVnliSE1nUFNCYmRtRnNkV1ZkTzF4dVhIUmNkSDFjYmx4dVhIUmNkSFJvYVhNdVgzVndaR0YwYVc1bklEMGdkSEoxWlR0Y2JseDBYSFIwYUdsekxuWmhiSFZsSUQwZ2RtRnNkV1U3WEc1Y2RGeDBhV1lnS0hKbGNHeGhZMlZUZEdGMFpTQW1KaUIzYVc1a2IzY3VhR2x6ZEc5eWVTQW1KaUJvYVhOMGIzSjVMbkpsY0d4aFkyVlRkR0YwWlNrZ2UxeHVYSFJjZEZ4MGFHbHpkRzl5ZVM1eVpYQnNZV05sVTNSaGRHVW9iblZzYkN3Z1hDSmNJaXdnYkc5allYUnBiMjR1Y0dGMGFHNWhiV1VnS3lCY0lpTmNJaUFySUhaaGJIVmxLVHRjYmx4MFhIUjlJR1ZzYzJVZ2UxeHVYSFJjZEZ4MGJHOWpZWFJwYjI0dWFHRnphQ0E5SUZ3aUkxd2lJQ3NnZG1Gc2RXVTdYRzVjZEZ4MGZWeHVYSFJjZEhSb2FYTXVYMjl1UTJoaGJtZGxMbVJwYzNCaGRHTm9LSHR6Wlc1a1pYSTZJSFJvYVhNc0lIWmhiSFZsTENCdmJHUldZV3gxWlgwcE8xeHVYSFJjZEhSb2FYTXVYM1Z3WkdGMGFXNW5JRDBnWm1Gc2MyVTdYRzVjZEgxY2JuMWNibHh1THlvcVhHNGdLaUJKYm5OMFlXNWpaU0J2WmlCSlNHRnphQ0J6YVc1bmJHVjBiMjR1SUZCeWIzWnBaR1Z6SUdFZ2RISmhibk53WVhKbGJuUWdVSEp2Y0dWeWRIa3RZMjl0Y0dGMGFXSnNaU0JwYm5SbGNtWmhZMlVnYjNabGNpQmdiRzlqWVhScGIyNHVhR0Z6YUdCY2JpQXFJRzFoYm1sd2RXeGhkR2x2Ym5NdUlGWmhiSFZsSUc5bUlIUm9hWE1nY0hKdmNHVnlkSGtnYVhNZ1lXeDNZWGx6SUdWeGRXRnNJSFJ2SUdCc2IyTmhkR2x2Ymk1b1lYTm9ZQ0IzYVhSb2IzVjBJR3hsWVdScGJtY2dYQ0lqWENJZ2MzbHRZbTlzTGx4dUlDb2dTR0Z6SUdFZ1luVnBiSFF0YVc0Z2NISnZkR1ZqZEdsdmJpQmhaMkZwYm5OMElHbHVabWx1YVhSbElISmxaR2x5WldOMGFXOXVjeTVjYmlBcUwxeHViR1YwSUdoaGMyZzZJRWxJWVhOb0lEMGdiblZzYkRzZ0x5OGdRVzRnWlhoMGNtRWdkbUZ5YVdGaWJHVWdhR1ZzY0hNZ1NXNTBaV3hzYVZObGJuTmxJSFJ2SUdacGJtUWdkR2hwY3lCcGJYQnZjblJjYm01bGR5QklZWE5vS0NrN1hHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCb1lYTm9PMXh1SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBiaW5kVmFsIGZyb20gXCJqd2lkZ2V0L2JpbmRWYWxcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgaGFzaCBmcm9tIFwiandpZGdldC9oYXNoXCI7XG5pbXBvcnQgUm91dGVSZWRpcmVjdG9yIGZyb20gXCJqd2lkZ2V0L1JvdXRlUmVkaXJlY3RvclwiO1xuaW1wb3J0IFN3aXRjaGVyIGZyb20gXCJqd2lkZ2V0L1N3aXRjaGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBVSVJvdXRlciBmcm9tIFwiandpZGdldC9VSVJvdXRlclwiO1xuaW1wb3J0IENvbXBvc2UgZnJvbSBcIi4vQ29tcG9zZVwiO1xuaW1wb3J0IEluYm94IGZyb20gXCIuL0luYm94XCI7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSBcIi4vTm90Rm91bmRcIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi9TZXR0aW5nc1wiO1xuXG5AdGVtcGxhdGUocmVxdWlyZShcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHJvdXRlcjogVUlSb3V0ZXI7XG5cblx0cHJvdGVjdGVkIGJlZm9yZVJlbmRlcigpIHtcblx0XHRzdXBlci5iZWZvcmVSZW5kZXIoKTtcblx0XHR0aGlzLnJvdXRlciA9IHRoaXMub3duKG5ldyBVSVJvdXRlcih7XG5cdFx0XHRwYXRoOiBoYXNoLFxuXHRcdFx0aGFuZGxlcjoge1xuXHRcdFx0XHRyb3V0ZXM6IHtcblx0XHRcdFx0XHRcImluYm94XCI6IGFyZyA9PiBuZXcgSW5ib3goYXJnLCB0aGlzLnJvdXRlciksXG5cdFx0XHRcdFx0XCJjb21wb3NlXCI6ICgpID0+IG5ldyBDb21wb3NlKCksXG5cdFx0XHRcdFx0XCJzZXR0aW5nc1wiOiAoKSA9PiBuZXcgU2V0dGluZ3MoKSxcblx0XHRcdFx0XHRcIlwiOiAoKSA9PiBuZXcgUm91dGVSZWRpcmVjdG9yKFwiaW5ib3hcIiwgdGhpcy5yb3V0ZXIpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG5vdEZvdW5kOiByb3V0ZSA9PiBuZXcgTm90Rm91bmQocm91dGUpXG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdHRoaXMucm91dGVyLnVwZGF0ZSgpO1xuXHR9XG5cblx0Ly8gVGhpcyBtZXRob2Qgc2ltdWxhdGVzIGJyb3dzZXIgcXVlcnkgc3RyaW5nIHN1Ym1pdHRpbmdcblx0cHJvdGVjdGVkIHJlbmRlclVybEZvcm0oZWw6IEpRdWVyeSkge1xuXHRcdGVsLm9uKFwic3VibWl0XCIsIGV2ZW50ID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRsb2NhdGlvbi5oYXNoID0gXCIjXCIgKyB0aGlzLmdldEVsZW1lbnQoXCJ1cmxcIikudmFsKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBUaGlzIG1ldGhvZCBzaW11bGF0ZXMgYnJvd3NlciBxdWVyeSBzdHJpbmcgb3V0cHV0XG5cdHByb3RlY3RlZCByZW5kZXJVcmwoZWw6IEpRdWVyeSkge1xuXHRcdHRoaXMub3duKGJpbmRWYWwoZWwsIGhhc2gpKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJQYWdlKCkge1xuXHRcdHJldHVybiB0aGlzLnJvdXRlci50YXJnZXQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyUm91dGUoZWw6IEpRdWVyeSkge1xuXHRcdC8vIEFzc2lnbiBocmVmIGF0dHJpYnV0ZXMgdXNpbmcgZ2V0RnVsbFBhdGggbWV0aG9kXG5cdFx0Y29uc3Qgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG5cdFx0ZWwuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCByb3V0ZSA9ICQodGhpcykuYXR0cihcImRhdGEtcm91dGVcIik7XG5cdFx0XHQkKHRoaXMpLmF0dHIoXCJocmVmXCIsIFwiI1wiICsgcm91dGVyLmdldEZ1bGxQYXRoKHJvdXRlKSk7XG5cdFx0fSk7XG5cblx0XHQvLyBUaGUgbmV4dCBzdHJ1Y3R1cmUgaGlnaGxpZ2h0cyB0aGUgYWN0aXZlIG1lbnUgaXRlbVxuXHRcdGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSB0aGlzLnJvdXRlci5yb3V0ZS5tYXAocm91dGUgPT4gZWwuZmlsdGVyKCdbZGF0YS1yb3V0ZT1cIicgKyByb3V0ZSArICdcIl0nKSk7XG5cdFx0bmV3IFN3aXRjaGVyKGFjdGl2ZUVsZW1lbnQsIHtcblx0XHRcdGluaXQ6IGVsID0+IGVsLmNzcyhcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKSxcblx0XHRcdGRvbmU6IGVsID0+IGVsLmNzcyhcImZvbnQtd2VpZ2h0XCIsIFwiXCIpXG5cdFx0fSk7XG5cdH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKCc8dGV4dGFyZWEgandjbGFzcz1cImNvbXBvc2VcIiBjb2xzPVwiODBcIiByb3dzPVwiNVwiPkNvbXBvc2UgZW1haWwhICh0byBiZSBmYWlyLCB0aGlzIHRleHQgYXJlYSBoYXMgbm8gcmVhbCBwdXJwb3NlKTwvdGV4dGFyZWE+JylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2UgZXh0ZW5kcyBDb21wb25lbnQge1xufVxuIiwiaW1wb3J0IHtkZXN0cm95fSBmcm9tIFwiandpZGdldFwiO1xuaW1wb3J0IHtzdGFydE1hcHBpbmdBcnJheX0gZnJvbSBcImp3aWRnZXQvY29sbGVjdGlvbi9BcnJheU1hcHBlclwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBSZWFkb25seUJpbmRhYmxlQXJyYXkgZnJvbSBcImp3aWRnZXQvUmVhZG9ubHlCaW5kYWJsZUFycmF5XCI7XG5pbXBvcnQgRW1haWwgZnJvbSBcIi4vRW1haWxcIjtcbmltcG9ydCBFbWFpbExpc3RJdGVtIGZyb20gXCIuL0VtYWlsTGlzdEl0ZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1haWxMaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVtYWlsczogUmVhZG9ubHlCaW5kYWJsZUFycmF5PEVtYWlsPikge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyUm9vdChlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwuYWRkQ2xhc3MoXCJlbWFpbC1saXN0XCIpO1xuXHRcdHJldHVybiB0aGlzLm93bihzdGFydE1hcHBpbmdBcnJheSh0aGlzLmVtYWlscywgZW1haWwgPT4gbmV3IEVtYWlsTGlzdEl0ZW0oZW1haWwpLCB7ZGVzdHJveX0pKTtcblx0fVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuaW1wb3J0IEVtYWlsIGZyb20gXCIuL0VtYWlsXCI7XG5cbkB0ZW1wbGF0ZSgnPGEgandjbGFzcz1cImVtYWlsLWxpc3QtaXRlbVwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7XCI+PC9hPicpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWFpbExpc3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVtYWlsOiBFbWFpbCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyUm9vdChlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dCh0aGlzLmVtYWlsLnN1bW1hcnkpLmF0dHIoXCJocmVmXCIsIFwiI2luYm94L1wiICsgdGhpcy5lbWFpbC5pZCk7XG5cdH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQge3JlZGlyZWN0Um91dGV9IGZyb20gXCJqd2lkZ2V0L1JvdXRlUmVkaXJlY3RvclwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZShyZXF1aXJlKFwiLi9FbWFpbE5vdEZvdW5kLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWFpbE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGlkOiBzdHJpbmcpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlcklkKGVsOiBKUXVlcnkpIHtcblx0XHRlbC50ZXh0KHRoaXMuaWQpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckJhY2soZWw6IEpRdWVyeSkge1xuXHRcdGVsLm9uKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Ly8gSW4gdGhpcyBwYXJ0aWN1bGFyIGNhc2Ugd2Uga25vdyB0aGF0IHRoZXJlIGlzIG5vIHJvdXRlciBiZWxvdywgc28gd2UgY2FuIHNraXBcblx0XHRcdC8vIHJvdXRlciBzZWxlY3Rpb24gb24gcmVkaXJlY3Rpb24uIFRoZSBuZXh0IGNhbGwgdXNlcyBhIGN1cnJlbnQgdG9wIHJvdXRlclxuXHRcdFx0cmVkaXJlY3RSb3V0ZShcImluYm94XCIpO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IFJvdXRlciBmcm9tIFwiandpZGdldC9Sb3V0ZXJcIjtcbmltcG9ydCB7cmVkaXJlY3RSb3V0ZX0gZnJvbSBcImp3aWRnZXQvUm91dGVSZWRpcmVjdG9yXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBFbWFpbCBmcm9tIFwiLi9FbWFpbFwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZShcIi4vRW1haWxWaWV3Lmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWFpbFZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZW1haWw6IEVtYWlsLCBwcml2YXRlIHBhcmVudFJvdXRlcjogUm91dGVyPGFueT4pIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclN1bW1hcnkoZWw6IEpRdWVyeSkge1xuXHRcdGVsLnRleHQodGhpcy5lbWFpbC5zdW1tYXJ5KTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJDb250ZW50KGVsOiBKUXVlcnkpIHtcblx0XHRlbC5odG1sKHRoaXMuZW1haWwuY29udGVudCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyQmFjayhlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwub24oXCJjbGlja1wiLCBldmVudCA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQvLyBJZiB5b3UgZG9uJ3Qga25vdyBleGFjdGx5IGhvdyBtYW55IHJvdXRlcnMgY2FuIGJlIGFib3ZlIG9yIGJlbG93IHRoaXMgY29tcG9uZW50LFxuXHRcdFx0Ly8gdXNpbmcgcGFyZW50IHJvdXRlciBvbiByZWRpcmVjdGlvbiBpcyBhIHNtYXJ0IGNob2ljZVxuXHRcdFx0cmVkaXJlY3RSb3V0ZShcIlwiLCB0aGlzLnBhcmVudFJvdXRlcik7XG5cdFx0fSk7XG5cdH1cbn1cbiIsImltcG9ydCBCaW5kYWJsZSBmcm9tIFwiandpZGdldC9CaW5kYWJsZVwiO1xuaW1wb3J0IEJpbmRhYmxlQXJyYXkgZnJvbSBcImp3aWRnZXQvQmluZGFibGVBcnJheVwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcImp3aWRnZXQvUm91dGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBVSVJvdXRlciBmcm9tIFwiandpZGdldC9VSVJvdXRlclwiO1xuaW1wb3J0IHtFTUFJTFN9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBFbWFpbExpc3QgZnJvbSBcIi4vRW1haWxMaXN0XCI7XG5pbXBvcnQgRW1haWxOb3RGb3VuZCBmcm9tIFwiLi9FbWFpbE5vdEZvdW5kXCI7XG5pbXBvcnQgRW1haWxWaWV3IGZyb20gXCIuL0VtYWlsVmlld1wiO1xuXG5AdGVtcGxhdGUocmVxdWlyZShcIi4vSW5ib3guancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHJvdXRlcjogVUlSb3V0ZXI7XG5cdHByaXZhdGUgZW1haWxzID0gbmV3IEJpbmRhYmxlQXJyYXkoRU1BSUxTLCB0cnVlKTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGg6IEJpbmRhYmxlPHN0cmluZz4sIHByaXZhdGUgcGFyZW50Um91dGVyOiBSb3V0ZXI8YW55Pikge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgYmVmb3JlUmVuZGVyKCkge1xuXHRcdHN1cGVyLmJlZm9yZVJlbmRlcigpO1xuXHRcdHRoaXMucm91dGVyID0gdGhpcy5vd24obmV3IFVJUm91dGVyKHtcblx0XHRcdG5hbWU6IFwiaW5ib3hcIixcblx0XHRcdHBhcmVudDogdGhpcy5wYXJlbnRSb3V0ZXIsXG5cdFx0XHRwYXRoOiB0aGlzLnBhdGgsXG5cdFx0XHRoYW5kbGVyOiBpZCA9PiB7XG5cdFx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEVtYWlsTGlzdCh0aGlzLmVtYWlscyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgZW1haWwgPSB0aGlzLmVtYWlscy5maW5kKGVtYWlsID0+IGVtYWlsLmlkID09PSBpZCk7XG5cdFx0XHRcdHJldHVybiBlbWFpbCAhPSBudWxsID8gbmV3IEVtYWlsVmlldyhlbWFpbCwgdGhpcy5yb3V0ZXIpIDogbmV3IEVtYWlsTm90Rm91bmQoaWQpO1xuXHRcdFx0fVxuXHRcdH0pKTtcblx0XHR0aGlzLnJvdXRlci51cGRhdGUoKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJDb250ZW50KCkge1xuXHRcdHJldHVybiB0aGlzLnJvdXRlci50YXJnZXQ7XG5cdH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBzdHJpbmcpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclJvb3QoZWw6IEpRdWVyeSkge1xuXHRcdGVsLnRleHQoJ1RoZSByZXF1ZXN0ZWQgcGFnZSBcIicgKyB0aGlzLnJvdXRlICsgJ1wiIGlzIG5vdCBmb3VuZCcpO1xuXHR9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZSgnPGRpdiBqd2NsYXNzPVwic2V0dGluZ3NcIj5UaGVyZVxcJ3Mgbm90aGluZyB0byBjb25maWd1cmUhPC9kaXY+JylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzIGV4dGVuZHMgQ29tcG9uZW50IHtcbn1cbiIsImV4cG9ydCBjb25zdCBFTUFJTFMgPSBbXG5cdHtcblx0XHRpZDogXCIxXCIsXG5cdFx0c3VtbWFyeTogXCJIZWxsb1wiLFxuXHRcdGNvbnRlbnQ6IFwiSGVsbG8gdGhlcmUhXCJcblx0fSwge1xuXHRcdGlkOiBcIjJcIixcblx0XHRzdW1tYXJ5OiBcIlJvdXRlclwiLFxuXHRcdGNvbnRlbnQ6IFwiUm91dGVyIGlzIGFuIGltcG9ydGFudCBwYXJ0IG9mIGFueSBzaW5nbGUgcGFnZSBhcHBsaWNhdGlvbiFcIlxuXHR9XG5dO1xuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJyb3V0ZXJcIiwgW1wiaW5kZXgudHNcIiwgXCJkYXRhLnRzXCIsIFwiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiQ29tcG9zZS50c1wiLFxuXHRcdFwiRW1haWwudHNcIiwgXCJFbWFpbExpc3QudHNcIiwgXCJFbWFpbExpc3RJdGVtLnRzXCIsIFwiRW1haWxOb3RGb3VuZC50c1wiLCBcIkVtYWlsTm90Rm91bmQuancuaHRtbFwiLCBcIkVtYWlsVmlldy50c1wiLFxuXHRcdFwiRW1haWxWaWV3Lmp3Lmh0bWxcIiwgXCJJbmJveC50c1wiLCBcIkluYm94Lmp3Lmh0bWxcIiwgXCJOb3RGb3VuZC50c1wiLCBcIlNldHRpbmdzLnRzXCJdKTtcblxuXHRuZXcgQXBwbGljYXRpb24oKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=