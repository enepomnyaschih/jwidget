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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));

var Property_1 = __importDefault(__webpack_require__(/*! ./Property */ "../../main/dist/Property.js"));
/**
 * Listens source `Bindable` modification and copies its value to target property.
 *
 * @param T Property value type.
 */


var Copier = /*#__PURE__*/function (_Class_1$default) {
  _inherits(Copier, _Class_1$default);

  var _super = _createSuper(Copier);

  /**
   * @param source Source bindable.
   * @param target Target property.
   */
  function Copier(source, target) {
    var _this;

    _classCallCheck(this, Copier);

    _this = _super.call(this);
    _this.source = source;
    _this._targetCreated = target == null;
    _this._target = target == null ? new Property_1.default(null, source.silent) : target;

    _this._update();

    _this.own(_this.source.changeEvent.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }
  /**
   * Target property.
   */


  _createClass(Copier, [{
    key: "destroyObject",

    /**
     * @inheritDoc
     */
    value: function destroyObject() {
      if (this._targetCreated) {
        this._target.destroy();
      }

      this._target = null;

      _get(_getPrototypeOf(Copier.prototype), "destroyObject", this).call(this);
    }
  }, {
    key: "_update",
    value: function _update() {
      this._target.set(this.source.get());
    }
  }, {
    key: "target",
    get: function get() {
      return this._target;
    }
  }]);

  return Copier;
}(Class_1.default);

exports.default = Copier;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db3BpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBQSxPQUFBLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQTs7QUFFQSxJQUFBLFVBQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBO0FBRUE7Ozs7Ozs7SUFLTSxNOzs7OztBQUlMOzs7O0FBSUEsa0JBQXFCLE1BQXJCLEVBQTBDLE1BQTFDLEVBQStEO0FBQUE7O0FBQUE7O0FBQzlEO0FBRG9CLFVBQUEsTUFBQSxHQUFBLE1BQUE7QUFFcEIsVUFBSyxjQUFMLEdBQXNCLE1BQU0sSUFBSSxJQUFoQztBQUNBLFVBQUssT0FBTCxHQUFnQixNQUFNLElBQUksSUFBWCxHQUFtQixJQUFJLFVBQUEsQ0FBQSxPQUFKLENBQWdCLElBQWhCLEVBQXNCLE1BQU0sQ0FBQyxNQUE3QixDQUFuQixHQUEwRCxNQUF6RTs7QUFDQSxVQUFLLE9BQUw7O0FBQ0EsVUFBSyxHQUFMLENBQVMsTUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixNQUF4QixDQUErQixNQUFLLE9BQXBDLGdDQUFUOztBQUw4RDtBQU05RDtBQUVEOzs7Ozs7OztBQU9BOzs7b0NBR3VCO0FBQ3RCLFVBQUksS0FBSyxjQUFULEVBQXlCO0FBQ3hCLGFBQUssT0FBTCxDQUFhLE9BQWI7QUFDQTs7QUFDRCxXQUFLLE9BQUwsR0FBZSxJQUFmOztBQUNBO0FBQ0E7Ozs4QkFFYztBQUNkLFdBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsS0FBSyxNQUFMLENBQVksR0FBWixFQUFqQjtBQUNBOzs7d0JBakJTO0FBQ1QsYUFBTyxLQUFLLE9BQVo7QUFDQTs7OztFQXJCc0IsT0FBQSxDQUFBLE87O0FBdUN4QixPQUFBLENBQUEsT0FBQSxHQUFlLE1BQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgSVByb3BlcnR5IGZyb20gJy4vSVByb3BlcnR5JztcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuL1Byb3BlcnR5JztcblxuLyoqXG4gKiBMaXN0ZW5zIHNvdXJjZSBgQmluZGFibGVgIG1vZGlmaWNhdGlvbiBhbmQgY29waWVzIGl0cyB2YWx1ZSB0byB0YXJnZXQgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIFQgUHJvcGVydHkgdmFsdWUgdHlwZS5cbiAqL1xuY2xhc3MgQ29waWVyPFY+IGV4dGVuZHMgQ2xhc3Mge1xuXHRwcml2YXRlIF90YXJnZXRDcmVhdGVkOiBib29sZWFuO1xuXHRwcml2YXRlIF90YXJnZXQ6IElQcm9wZXJ0eTxWPjtcblxuXHQvKipcblx0ICogQHBhcmFtIHNvdXJjZSBTb3VyY2UgYmluZGFibGUuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IHByb3BlcnR5LlxuXHQgKi9cblx0Y29uc3RydWN0b3IocmVhZG9ubHkgc291cmNlOiBCaW5kYWJsZTxWPiwgdGFyZ2V0PzogSVByb3BlcnR5PFY+KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl90YXJnZXRDcmVhdGVkID0gdGFyZ2V0ID09IG51bGw7XG5cdFx0dGhpcy5fdGFyZ2V0ID0gKHRhcmdldCA9PSBudWxsKSA/IG5ldyBQcm9wZXJ0eTxWPihudWxsLCBzb3VyY2Uuc2lsZW50KSA6IHRhcmdldDtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHR0aGlzLm93bih0aGlzLnNvdXJjZS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XG5cdH1cblxuXHQvKipcblx0ICogVGFyZ2V0IHByb3BlcnR5LlxuXHQgKi9cblx0Z2V0IHRhcmdldCgpOiBCaW5kYWJsZTxWPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3RhcmdldDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHJvdGVjdGVkIGRlc3Ryb3lPYmplY3QoKSB7XG5cdFx0aWYgKHRoaXMuX3RhcmdldENyZWF0ZWQpIHtcblx0XHRcdHRoaXMuX3RhcmdldC5kZXN0cm95KCk7XG5cdFx0fVxuXHRcdHRoaXMuX3RhcmdldCA9IG51bGw7XG5cdFx0c3VwZXIuZGVzdHJveU9iamVjdCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlKCkge1xuXHRcdHRoaXMuX3RhcmdldC5zZXQodGhpcy5zb3VyY2UuZ2V0KCkpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvcGllcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ArrayUtils = __importStar(__webpack_require__(/*! ./ArrayUtils */ "../../main/dist/ArrayUtils.js"));

var CancelToken_1 = __importDefault(__webpack_require__(/*! ./CancelToken */ "../../main/dist/CancelToken.js"));

var Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));

var Component_1 = __importDefault(__webpack_require__(/*! ./Component */ "../../main/dist/Component.js"));

var Copier_1 = __importDefault(__webpack_require__(/*! ./Copier */ "../../main/dist/Copier.js"));

var defer_1 = __importDefault(__webpack_require__(/*! ./defer */ "../../main/dist/defer.js"));

var DictionaryUtils = __importStar(__webpack_require__(/*! ./DictionaryUtils */ "../../main/dist/DictionaryUtils.js"));

var hash_1 = __importDefault(__webpack_require__(/*! ./hash */ "../../main/dist/hash.js"));

var index_1 = __webpack_require__(/*! ./index */ "../../main/dist/index.js");

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

    _this.own(_this.path.changeEvent.listen(_this.update, _assertThisInitialized(_this)));

    return _this;
  }
  /**
   * Router target. Main purpose of the router is to convert `path` to `target`. In particular, UIRouter
   * creates Component instances based on current `path` value so you could render them.
   */


  _createClass(Router, [{
    key: "destroyObject",

    /**
     * @inheritDoc
     */
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
      if (this._updating) {
        throw new Error("Can't update router because its update cycle is already active. " + "Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
      }

      this._updating = true;
      var path = this.path.get();
      var pair = path == null ? null : this.separator.call(this.scope, path);
      var route = pair != null ? pair[0] || "" : "";
      var arg = pair != null ? pair[1] || null : null;

      if (route === this.route.get()) {
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
    /**
     * Immediately performs the redirection, i.e. sets `hash` to `getFullPath(path)`.
     * @param path Path relative to this router.
     * @param replaceState Replace the current browser historical state rather than pushing a new state to the stack.
     */

  }, {
    key: "redirect",
    value: function redirect(path, replaceState) {
      Router.redirect(path, this, replaceState);
    }
  }, {
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
      var result = separator.exec(path || "");
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
        throw new Error("Update cycle is already active. " + "Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
      }
    } catch (e) {
      throw new Error("Can not perform URL redirection to " + path + ": " + e.message);
    }

    hash_1.default.set(path, replaceState);
  }

  Router.redirect = redirect;
  /**
   * Recommended way to perform an asyncronous redirection in Router `handler` function.
   */

  var Redirector = /*#__PURE__*/function (_Component_1$default) {
    _inherits(Redirector, _Component_1$default);

    var _super2 = _createSuper(Redirector);

    /**
     * Creates a new redirector.
     * @param path Path relative to router.
     * @param router Redirect relative to this router.
     * @param replaceState Replace the current browser historical state rather than pushing a new state to the
     * stack. Defaults to true.
     */
    function Redirector(path, router, replaceState) {
      var _this2;

      _classCallCheck(this, Redirector);

      _this2 = _super2.call(this);
      _this2.path = path;
      _this2.router = router;
      _this2.replaceState = replaceState;
      defer_1.default(0, _this2.own(new CancelToken_1.default())).then(function () {
        redirect(_this2.path, _this2.router, index_1.defn(_this2.replaceState, true));
      });
      return _this2;
    }

    return Redirector;
  }(Component_1.default);

  Router.Redirector = Redirector;
  /**
   * Creates a router that manages two mapping of properties:
   *
   * * `paths` which exposes string path properties for child routers if neccessary;
   * * `expanded` which exposes boolean "expanded" properties for child UI panels.
   *
   * This allows you to render your content as a fixed list of panels representing the concurrent routes.
   */

  var Node = /*#__PURE__*/function (_Class_1$default2) {
    _inherits(Node, _Class_1$default2);

    var _super3 = _createSuper(Node);

    /**
     * Creates router node, assigns its properties to initial values and starts synchronization.
     * @param config Node configuration.
     */
    function Node(config) {
      var _this3;

      _classCallCheck(this, Node);

      _this3 = _super3.call(this);
      _this3._initialized = false; // used to auto-activate the first route on initialization

      _this3._updating = false; // used to prevent redirection error

      _this3.defaultRoute = config.defaultRoute;
      var routeMap = ArrayUtils.index(config.routes, index_1.identity);
      _this3._paths = DictionaryUtils.map(routeMap, function () {
        return new Property_1.default();
      });
      _this3._expanded = DictionaryUtils.map(routeMap, function () {
        return new Property_1.default(config.expanded === true);
      });

      if (config.expanded && typeof config.expanded !== "boolean") {
        config.expanded.forEach(function (route) {
          _this3._expanded[route].set(true);
        });
      }

      DictionaryUtils.forEach(_this3._expanded, function (expanded, route) {
        _this3.own(expanded.changeEvent.listen(function (params) {
          if (params.value && !_this3._updating) {
            _this3.router.redirect(route);
          }
        }));
      });
      _this3.router = _this3.own(new Router({
        name: config.name,
        parent: config.parent,
        path: config.path,
        handler: function handler(route, arg) {
          var path = _this3._paths[route];

          if (!path) {
            return !_this3._initialized && _this3.defaultRoute ? new Redirector(_this3.defaultRoute, _this3.router) : null;
          }

          _this3._updating = true;
          var expander = new NodeExpander(_this3.router, arg, path, _this3._expanded[route]);
          _this3._updating = false;
          return expander;
        }
      }));

      _this3.router.update();

      _this3._initialized = true;
      return _this3;
    }
    /**
     * Provides paths to bind child routers to, by name. Only one route is active at a time, but their paths
     * always exist regardless of their activity.
     */


    _createClass(Node, [{
      key: "paths",
      get: function get() {
        return this._paths;
      }
      /**
       * Provides "expanded" flags to bind child panels to, by name. Support two-way binding.
       */

    }, {
      key: "expanded",
      get: function get() {
        return this._expanded;
      }
    }]);

    return Node;
  }(Class_1.default);

  Router.Node = Node;

  var NodeExpander = /*#__PURE__*/function (_Class_1$default3) {
    _inherits(NodeExpander, _Class_1$default3);

    var _super4 = _createSuper(NodeExpander);

    function NodeExpander(router, sourcePath, targetPath, expanded) {
      var _this4;

      _classCallCheck(this, NodeExpander);

      _this4 = _super4.call(this);
      _this4.router = router;

      _this4.own(new Copier_1.default(sourcePath, targetPath));

      expanded.set(true);

      _this4.own(expanded.changeEvent.listen(function () {
        _this4.router.redirect("");
      }));

      return _this4;
    }

    return NodeExpander;
  }(Class_1.default);
})(Router || (Router = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQUEsVUFBQSxHQUFBLFlBQUEsQ0FBQSxPQUFBLENBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUEsSUFBQSxhQUFBLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLE9BQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsV0FBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLE9BQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztBQUdBLElBQUEsZUFBQSxHQUFBLFlBQUEsQ0FBQSxPQUFBLENBQUEsbUJBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsTUFBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQTs7QUFFQSxJQUFBLFVBQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBO0FBRUE7Ozs7OztJQUlNLE07Ozs7O0FBNkNMOzs7OztBQUtBLG9CQUF5QztBQUFBOztBQUFBLFFBQTdCLE1BQTZCLHVFQUFGLEVBQUU7O0FBQUE7O0FBQ3hDO0FBVk8sVUFBQSxNQUFBLEdBQTRCLElBQUksVUFBQSxDQUFBLE9BQUosRUFBNUI7QUFDQSxVQUFBLElBQUEsR0FBMEIsSUFBSSxVQUFBLENBQUEsT0FBSixFQUExQjtBQUNB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QjtBQUNBLE9BRlEsQ0FBVDs7QUFKNkQ7QUFPN0Q7O0FBaFhhO0FBQUEsSUF1V1ksT0FBQSxDQUFBLE9BdldaO0FBa1hmLENBbFhELEVBQVUsTUFBTSxLQUFOLE1BQU0sR0FBQSxFQUFBLENBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0ICogYXMgQXJyYXlVdGlscyBmcm9tICcuL0FycmF5VXRpbHMnO1xuaW1wb3J0IEJpbmRhYmxlIGZyb20gJy4vQmluZGFibGUnO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gXCIuL0NhbmNlbFRva2VuXCI7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50JztcbmltcG9ydCBDb3BpZXIgZnJvbSAnLi9Db3BpZXInO1xuaW1wb3J0IGRlZmVyIGZyb20gXCIuL2RlZmVyXCI7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5pbXBvcnQgRGljdGlvbmFyeSBmcm9tICcuL0RpY3Rpb25hcnknO1xuaW1wb3J0ICogYXMgRGljdGlvbmFyeVV0aWxzIGZyb20gJy4vRGljdGlvbmFyeVV0aWxzJztcbmltcG9ydCBoYXNoIGZyb20gJy4vaGFzaCc7XG5pbXBvcnQge2RlZm4sIGlkZW50aXR5LCBpc05vdE5pbH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgSVByb3BlcnR5IGZyb20gJy4vSVByb3BlcnR5JztcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuL1Byb3BlcnR5JztcblxuLyoqXG4gKiBVUkwgcm91dGVyLiBDb252ZXJ0cyBpbmNvbWluZyBwYXJ0IG9mIFVSTCAoaGFzaCkgdG8gYSB0YXJnZXQgb2JqZWN0IGFuZCBwYXNzZXMgdGFpbCBzdHJpbmcgdG8gaXRcbiAqIGZvciBmdXJ0aGVyIHJvdXRpbmcuXG4gKi9cbmNsYXNzIFJvdXRlcjxUIGV4dGVuZHMgRGVzdHJveWFibGU+IGV4dGVuZHMgQ2xhc3Mge1xuXG5cdC8qKlxuXHQgKiBSb3V0ZXIgbmFtZS4gTXVzdCBiZSBlcXVhbCB0byB0aGUgcm91dGUgbmFtZSBpbiB0aGUgYHBhcmVudGAgcm91dGVyLiBSZXF1aXJlZCBmb3IgcHJvcGVyIGBnZXRGdWxsUGF0aGAgYW5kXG5cdCAqIGByZWRpcmVjdGAgbWV0aG9kIHByb2Nlc3NpbmcuIFJvb3Qgcm91dGVyIGRvZXMgbm90IGhhdmUgYSBuYW1lLlxuXHQgKi9cblx0cmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBQYXJlbnQgcm91dGVyLiBSZXF1aXJlZCBmb3IgcHJvcGVyIGBnZXRGdWxsUGF0aGAgYW5kIGByZWRpcmVjdGAgbWV0aG9kIHByb2Nlc3NpbmcuIFJvb3Qgcm91dGVyIGRvZXMgbm90IGhhdmVcblx0ICogYSBwYXJlbnQuXG5cdCAqL1xuXHRyZWFkb25seSBwYXJlbnQ6IFJvdXRlcjxhbnk+O1xuXG5cdC8qKlxuXHQgKiBQYXRoIHRoYXQgdGhlIHJvdXRlciBpcyBib3VuZCB0by4gUGF0aCBpcyBhIGZpbmFsIHBhcnQgb2YgVVJMIChoYXNoKSByZWxldmFudCB0byB0aGlzXG5cdCAqIHJvdXRlci4gQW55IHBhdGggY2hhbmdlIHJlc3VsdHMgaW4gYHVwZGF0ZWAgbWV0aG9kIGNhbGwuXG5cdCAqL1xuXHRyZWFkb25seSBwYXRoOiBCaW5kYWJsZTxzdHJpbmc+O1xuXG5cdC8qKlxuXHQgKiBQYXRoIHNlcGFyYXRvciBmdW5jdGlvbiB1c2VkIGJ5IHRoZSByb3V0ZXIuXG5cdCAqL1xuXHRyZWFkb25seSBzZXBhcmF0b3I6IFJvdXRlci5TZXBhcmF0b3I7XG5cblx0LyoqXG5cdCAqIFBhdGggam9pbmVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIHJvdXRlci5cblx0ICovXG5cdHJlYWRvbmx5IGpvaW5lcjogUm91dGVyLkpvaW5lcjtcblxuXHQvKipcblx0ICogUm91dGUgaGFuZGxlciBmdW5jdGlvbiB1c2VkIGJ5IHRoZSByb3V0ZXIuXG5cdCAqL1xuXHRyZWFkb25seSBoYW5kbGVyOiBSb3V0ZXIuSGFuZGxlcjxUPjtcblxuXHQvKipcblx0ICogYHNlcGFyYXRvcmAsIGBqb2luZXJgIGFuZCBgaGFuZGxlcmAgY2FsbCBzY29wZS5cblx0ICovXG5cdHJlYWRvbmx5IHNjb3BlOiBhbnk7XG5cblx0cHJpdmF0ZSBfdGFyZ2V0OiBJUHJvcGVydHk8VD47XG5cdHByaXZhdGUgX3JvdXRlOiBJUHJvcGVydHk8c3RyaW5nPiA9IG5ldyBQcm9wZXJ0eTxzdHJpbmc+KCk7XG5cdHByaXZhdGUgX2FyZzogSVByb3BlcnR5PHN0cmluZz4gPSBuZXcgUHJvcGVydHk8c3RyaW5nPigpO1xuXHRwcml2YXRlIF91cGRhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIHJvdXRlciBpbnN0YW5jZS4gUGxlYXNlIG5vdGljZSB0aGF0IHRoZSByb3V0ZXIgZG9lc24ndCBwcm9jZXNzIGN1cnJlbnQgcm91dGUgaW1tZWRpYXRlbHkgb25cblx0ICogaW5pdGlhbGl6YXRpb24uIFRvIHByb2Nlc3MgdGhlIHJvdXRlLCBjYWxsIGB1cGRhdGVgIG1ldGhvZC5cblx0ICogQHBhcmFtIGNvbmZpZyBSb3V0ZXIgY29uZmlndXJhdGlvbi5cblx0ICovXG5cdGNvbnN0cnVjdG9yKGNvbmZpZzogUm91dGVyLkNvbmZpZzxUPiA9IHt9KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSBjb25maWcubmFtZTtcblx0XHR0aGlzLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQ7XG5cdFx0aWYgKCh0aGlzLm5hbWUgPT0gbnVsbCkgIT09ICh0aGlzLnBhcmVudCA9PSBudWxsKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUm91dGVyIGNvbmZpZ3VyYXRpb24gZXJyb3I6IHlvdSBoYXZlIHNwZWNpZmllZCByb3V0ZXIgbmFtZSBvciBwYXJlbnQsIGJ1dCBoYXZlbid0IHNwZWNpZmllZCBhbm90aGVyLiBUaGVzZSB0d28gb3B0aW9ucyBtdXN0IGNvbWUgdG9nZXRoZXIuXCIpO1xuXHRcdH1cblx0XHR0aGlzLnBhdGggPSBjb25maWcucGF0aCB8fCBuZXcgUHJvcGVydHk8c3RyaW5nPigpOyAvLyB3ZSBkb24ndCBvd24gaXQgYmVjYXVzZSBpdHMgdmFsdWUgaXMgYmVpbmcgdXNlZCBpbiBkZXN0cm95T2JqZWN0IG1ldGhvZCAtIGFmdGVyIG93bmFnZSBwb29sIHJlbGVhc2luZ1xuXHRcdHRoaXMuc2VwYXJhdG9yID0gUm91dGVyLm1ha2VTZXBhcmF0b3IoY29uZmlnLnNlcGFyYXRvcik7XG5cdFx0dGhpcy5qb2luZXIgPSBSb3V0ZXIubWFrZUpvaW5lcihjb25maWcuam9pbmVyKTtcblx0XHR0aGlzLmhhbmRsZXIgPSBSb3V0ZXIubWFrZUhhbmRsZXIoY29uZmlnLmhhbmRsZXIpO1xuXHRcdHRoaXMuc2NvcGUgPSBjb25maWcuc2NvcGUgfHwgdGhpcztcblx0XHR0aGlzLl90YXJnZXQgPSBjb25maWcudGFyZ2V0IHx8IHRoaXMub3duKG5ldyBQcm9wZXJ0eTxUPigpKTtcblx0XHR0aGlzLm93bih0aGlzLnBhdGguY2hhbmdlRXZlbnQubGlzdGVuKHRoaXMudXBkYXRlLCB0aGlzKSk7XG5cdH1cblxuXHQvKipcblx0ICogUm91dGVyIHRhcmdldC4gTWFpbiBwdXJwb3NlIG9mIHRoZSByb3V0ZXIgaXMgdG8gY29udmVydCBgcGF0aGAgdG8gYHRhcmdldGAuIEluIHBhcnRpY3VsYXIsIFVJUm91dGVyXG5cdCAqIGNyZWF0ZXMgQ29tcG9uZW50IGluc3RhbmNlcyBiYXNlZCBvbiBjdXJyZW50IGBwYXRoYCB2YWx1ZSBzbyB5b3UgY291bGQgcmVuZGVyIHRoZW0uXG5cdCAqL1xuXHRnZXQgdGFyZ2V0KCk6IEJpbmRhYmxlPFQ+IHtcblx0XHRyZXR1cm4gdGhpcy5fdGFyZ2V0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEN1cnJlbnQgcm91dGUuIEZpcnN0IGNodW5rIG9mIHRoZSBwYXRoIGRldGVjdGVkIGJ5IGBzZXBhcmF0b3JgIGZ1bmN0aW9uLiBZb3UgY2FuIHdhdGNoIHRoaXMgcHJvcGVydHlcblx0ICogdG8gYWN0aXZhdGUgYW5kIGRlYWN0aXZhdGUgaXRlbXMgaW4geW91ciBtZW51LlxuXHQgKi9cblx0Z2V0IHJvdXRlKCk6IEJpbmRhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9yb3V0ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1haW5kZXIgb2YgY3VycmVudCByb3V0ZSBhZnRlciBgc2VwYXJhdG9yYCBmdW5jdGlvbiBjYWxsLiBUaGlzIHByb3BlcnR5IGlzIHBhc3NlZCB0byBgaGFuZGxlcmBcblx0ICogZnVuY3Rpb24gYW5kIGNhbiBiZSBwYXNzZWQgb3ZlciB0byBjaGlsZCBjb21wb25lbnRzIGZvciBmdXJ0aGVyIHJvdXRpbmcuXG5cdCAqL1xuXHRnZXQgYXJnKCk6IEJpbmRhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9hcmc7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdGRlc3Ryb3lPYmplY3QoKSB7XG5cdFx0aWYgKHRoaXMuX3VwZGF0aW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZXIgY2FuIG5vdCBiZSBkZXN0cm95ZWQgZHVyaW5nIGl0cyB1cGRhdGUgY3ljbGUuXCIpO1xuXHRcdH1cblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLl90YXJnZXQuZ2V0KCk7XG5cdFx0aWYgKHRhcmdldCAhPSBudWxsKSB7XG5cdFx0XHR0YXJnZXQuZGVzdHJveSgpO1xuXHRcdH1cblx0XHRzdXBlci5kZXN0cm95T2JqZWN0KCk7XG5cdH1cblxuXHQvKipcblx0ICogSXNzdWVzIHJvdXRlIHByb2Nlc3NpbmcuXG5cdCAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0aWYgKHRoaXMuX3VwZGF0aW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCB1cGRhdGUgcm91dGVyIGJlY2F1c2UgaXRzIHVwZGF0ZSBjeWNsZSBpcyBhbHJlYWR5IGFjdGl2ZS4gXCIgK1xuXHRcdFx0XHRcIlN1Z2dlc3QgdXNpbmcgUm91dGVyLlJlZGlyZWN0b3Igb3IgbW92aW5nIFVSTCByZWRpcmVjdGlvbiB0byBhbiBhc3luY3Jvbm91cyBjYWxsYmFjay5cIik7XG5cdFx0fVxuXHRcdHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcblx0XHRjb25zdCBwYXRoID0gdGhpcy5wYXRoLmdldCgpO1xuXHRcdGNvbnN0IHBhaXI6IHN0cmluZ1tdID0gKHBhdGggPT0gbnVsbCkgPyBudWxsIDogdGhpcy5zZXBhcmF0b3IuY2FsbCh0aGlzLnNjb3BlLCBwYXRoKTtcblx0XHRjb25zdCByb3V0ZSA9IChwYWlyICE9IG51bGwpID8gKHBhaXJbMF0gfHwgXCJcIikgOiBcIlwiO1xuXHRcdGNvbnN0IGFyZyA9IChwYWlyICE9IG51bGwpID8gKHBhaXJbMV0gfHwgbnVsbCkgOiBudWxsO1xuXHRcdGlmIChyb3V0ZSA9PT0gdGhpcy5yb3V0ZS5nZXQoKSkge1xuXHRcdFx0dGhpcy5fYXJnLnNldChhcmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldC5nZXQoKTtcblx0XHRcdGlmICh0YXJnZXQgIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl90YXJnZXQuc2V0KG51bGwpO1xuXHRcdFx0XHR0YXJnZXQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYXJnLnNldChhcmcpO1xuXHRcdFx0dGhpcy5fcm91dGUuc2V0KHJvdXRlKTtcblx0XHRcdHRoaXMuX3RhcmdldC5zZXQodGhpcy5oYW5kbGVyLmNhbGwodGhpcy5zY29wZSwgcm91dGUsIHRoaXMuX2FyZykgfHwgbnVsbCk7XG5cdFx0fVxuXHRcdHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgZm9yIHRoaXMgcm91dGVyLlxuXHQgKiBAcGFyYW0gcm91dGUgUm91dGUgbmFtZS5cblx0ICogQHBhcmFtIGFyZyBSZW1haW5kZXIgb2YgdGhlIHBhdGguXG5cdCAqIEByZXR1cm5zIEZ1bGwgcGF0aC5cblx0ICovXG5cdGpvaW4ocm91dGU6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLmpvaW5lci5jYWxsKHRoaXMuc2NvcGUsIHJvdXRlLCBhcmcpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgZnVsbCBwYXRoIGFzIHRoZSByZXN1bHQgb2YgYGpvaW5lcmAgZnVuY3Rpb24gY2FsbCBpbiBgcGFyZW50YCByb3V0ZXIgd2l0aCBgbmFtZWAgcGFzc2VkIGFzXG5cdCAqIGByb3V0ZWAgYW5kIGBwYXRoYCBwYXNzZWQgYXMgYGFyZ2AuIFJldHVybnMgYHBhdGhgIGlmIHRoaXMgaXMgdGhlIHJvb3Qgcm91dGVyLlxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxuXHQgKiBAcmV0dXJucyBGdWxsIHBhdGggcmVsYXRpdmUgdG8gdGhlIHJvb3Qgcm91dGVyLlxuXHQgKi9cblx0Z2V0RnVsbFBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5nZXRGdWxsUGF0aCh0aGlzLnBhcmVudC5qb2luKHRoaXMubmFtZSwgcGF0aCkpIDogcGF0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbW1lZGlhdGVseSBwZXJmb3JtcyB0aGUgcmVkaXJlY3Rpb24sIGkuZS4gc2V0cyBgaGFzaGAgdG8gYGdldEZ1bGxQYXRoKHBhdGgpYC5cblx0ICogQHBhcmFtIHBhdGggUGF0aCByZWxhdGl2ZSB0byB0aGlzIHJvdXRlci5cblx0ICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZSBzdGFjay5cblx0ICovXG5cdHJlZGlyZWN0KHBhdGg6IHN0cmluZywgcmVwbGFjZVN0YXRlPzogYm9vbGVhbikge1xuXHRcdFJvdXRlci5yZWRpcmVjdChwYXRoLCB0aGlzLCByZXBsYWNlU3RhdGUpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcblxubmFtZXNwYWNlIFJvdXRlciB7XG5cdC8qKlxuXHQgKiBEZWZhdWx0IHZhbHVlIG9mIGBzZXBhcmF0b3JgLlxuXHQgKi9cblx0ZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VQQVJBVE9SID0gL15cXC8qKFteP1xcL10rKSg/OlxcLyguKil8KFxcPy4qKSk/JC87XG5cblx0LyoqXG5cdCAqIERlZmF1bHQgdmFsdWUgb2YgYGpvaW5lcmAuXG5cdCAqL1xuXHRleHBvcnQgY29uc3QgREVGQVVMVF9KT0lORVIgPSBcIi9cIjtcblxuXHQvKipcblx0ICogU2lnbmF0dXJlIG9mIGBzZXBhcmF0b3JgIGZ1bmN0aW9uLiBUaGUgZnVuY3Rpb24gc3BsaXRzIHBhdGggdG8gcm91dGUgYW5kIGFyZ3VtZW50LiBUaGVyZWZvcmUsIGl0IG11c3Rcblx0ICogcmV0dXJuIHR3byBzdHJpbmcgdmFsdWVzLiBJZiBmdW5jdGlvbiByZXR1cm5zIG51bGwsIGl0IGlzIGFzc3VtZWQgdG8gYmUgW1wiXCIsIG51bGxdLlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBTZXBhcmF0b3Ige1xuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSBwYXRoIEZ1bGwgcGF0aC5cblx0XHQgKiBAcmV0dXJucyBSb3V0ZSBhbmQgYXJndW1lbnQuXG5cdFx0ICovXG5cdFx0KHBhdGg6IHN0cmluZyk6IHN0cmluZ1tdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNpZ25hdHVyZSBvZiBgam9pbmVyYCBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIGpvaW5zIHJvdXRlIGFuZCBhcmd1bWVudCB0byBhIHBhdGguXG5cdCAqL1xuXHRleHBvcnQgaW50ZXJmYWNlIEpvaW5lciB7XG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIHJvdXRlIFJvdXRlLlxuXHRcdCAqIEBwYXJhbSBhcmcgQXJndW1lbnQuXG5cdFx0ICogQHJldHVybnMgRnVsbCBwYXRoLlxuXHRcdCAqL1xuXHRcdChyb3V0ZTogc3RyaW5nLCBhcmc6IHN0cmluZyk6IHN0cmluZztcblx0fVxuXG5cdC8qKlxuXHQgKiBTaWduYXR1cmUgb2YgYGhhbmRsZXJgIGdlbmVyYWwtcHVycG9zZSBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIG1hcHMgdGhlIHNwZWNpZmllZCByb3V0ZSB0byBhIHRhcmdldCBvYmplY3Rcblx0ICogKHVzdWFsbHksIENvbXBvbmVudCkgYW5kIHBhc3NlcyBhcmd1bWVudCB0byBpdCBmb3IgZnVydGhlciByb3V0aW5nLlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBIYW5kbGVyPFQ+IHtcblx0XHQvKipcblx0XHQgKiBAcGFyYW0gcm91dGUgUm91dGUuXG5cdFx0ICogQHBhcmFtIGFyZyBBcmd1bWVudC5cblx0XHQgKiBAcmV0dXJucyBUYXJnZXQgb2JqZWN0LlxuXHRcdCAqL1xuXHRcdChyb3V0ZTogc3RyaW5nLCBhcmc6IEJpbmRhYmxlPHN0cmluZz4pOiBUO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNpZ25hdHVyZSBvZiBhIHNpbmdsZSByb3V0ZSBpbiBgaGFuZGxlcmAgb2JqZWN0LiBUaGUgZnVuY3Rpb24gbWFwcyBhIHNpbmdsZSByb3V0ZSB0byBhIHRhcmdldFxuXHQgKiBvYmplY3QgKHVzdWFsbHksIENvbXBvbmVudCkgYW5kIHBhc3NlcyBhcmd1bWVudCB0byBpdCBmb3IgZnVydGhlciByb3V0aW5nLlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBSb3V0ZTxUPiB7XG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIGFyZyBBcmd1bWVudC5cblx0XHQgKiBAcmV0dXJucyBUYXJnZXQgb2JqZWN0LlxuXHRcdCAqL1xuXHRcdChhcmc6IEJpbmRhYmxlPHN0cmluZz4pOiBUO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdXRlciBoYW5kbGVyIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBIYW5kbGVyQ29uZmlnPFQ+IHtcblx0XHQvKipcblx0XHQgKiBNYXAgb2Ygc3BlY2lmaWMgcm91dGUgaGFuZGxlcnMuIElmIGN1cnJlbnQgcm91dGUgaXMgcHJlc2VudCBpbiB0aGlzIGRpY3Rpb25hcnksIHRoZSByb3V0ZXIgY2FsbHMgaXRzXG5cdFx0ICogY29ycmVzcG9uZGluZyBoYW5kbGVyIGFuZCBwYXNzZXMgYXJndW1lbnQgdG8gaXQuIFJvdXRlIGFuZCBhcmd1bWVudCB0aGVtc2VsdmVzIGFyZSBjb21wdXRlZCB3aXRoIGBzZXBhcmF0b3JgXG5cdFx0ICogY2FsbGJhY2suXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgcm91dGVzPzogRGljdGlvbmFyeTxSb3V0ZTxUPj47XG5cblx0XHQvKipcblx0XHQgKiBJZiBub25lIG9mIHRoZSBgcm91dGVzYCBtYXRjaGVzIGN1cnJlbnQgcm91dGUsIHRoZSByb3V0ZXIgY2FsbHMgdGhpcyBoYW5kbGVyIGNhbGxiYWNrIGFuZCBwYXNzZXMgYm90aFxuXHRcdCAqIHJvdXRlIGFuZCBhcmd1bWVudCB0byBpdC4gQnkgZGVmYXVsdCwgcmV0dXJucyBudWxsIGZvciBhbnkgaW5wdXQuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgbm90Rm91bmQ/OiBIYW5kbGVyPFQ+O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdXRlciBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnPFQ+IHtcblx0XHQvKipcblx0XHQgKiBSb3V0ZXIgbmFtZS4gUm91dGVyIG5hbWUgaXMgYSBjaHVuayBvZiB0aGUgcGF0aCB0aGF0IGNhdXNlZCB0aGlzIHJvdXRlIHRvIGdldCBpbml0aWFsaXplZC4gUm9vdCByb3V0ZXJcblx0XHQgKiBkb2Vzbid0IGhhdmUgYSBuYW1lLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IG5hbWU/OiBzdHJpbmc7XG5cblx0XHQvKipcblx0XHQgKiBQYXJlbnQgcm91dGVyLiBJdCBwcm92aWRlcyBgZ2V0RnVsbFBhdGhgIGFuZCBgcmVkaXJlY3RgIHdpdGggYSBjbHVlIGFib3V0IGFsbCBwYXJ0cyBvZiB0aGUgcGF0aC4gSWZcblx0XHQgKiB5b3VyIHJvdXRlciBwcm92aWRlcyB5b3Ugd2l0aCB3cm9uZyBwYXRocywgY2hlY2sgYG5hbWVgIGFuZCBgcGFyZW50YCBvZiBhbGwgcm91dGVycyBpbiB5b3VyIGhpZXJhcmNoeSAtIHRoZXlcblx0XHQgKiBhcmUgbGlrZWx5IGFzc2lnbmVkIHRvIHdyb25nIHZhbHVlcy4gUm9vdCByb3V0ZXIgZG9lc24ndCBoYXZlIGEgcGFyZW50LlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IHBhcmVudD86IFJvdXRlcjxhbnk+O1xuXG5cdFx0LyoqXG5cdFx0ICogUGF0aCB0byBiaW5kIHRoZSByb3V0ZXIgdG8uIFJvb3Qgcm91dGVyIHNob3VsZCB1c3VhbGx5IGdldCBib3VuZCB0byBgaGFzaGAgcHJvcGVydHkuIENoaWxkIHJvdXRlcnMgc2hvdWxkXG5cdFx0ICogcmVjZWl2ZSBgcGF0aGAgZnJvbSB0aGVpciBwYXJlbnRzLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IHBhdGg/OiBCaW5kYWJsZTxzdHJpbmc+O1xuXG5cdFx0LyoqXG5cdFx0ICogVGFyZ2V0IHByb3BlcnR5LiBSb3V0ZXIgcHV0cyB0aGUgcmVzdWx0IG9mIGBoYW5kbGVyYCBmdW5jdGlvbiBjYWxsIHRvIHRhcmdldCBwcm9wZXJ0eS4gSWYgYHRhcmdldGAgaXNcblx0XHQgKiBvbWl0dGVkLCB0aGUgcm91dGVyIGNyZWF0ZXMgaXQgYXV0b21hdGljYWxseS4gUm91dGVyIGF1dG9tYXRpY2FsbHkgY29udHJvbHMgdGhlIGxpZmUgdGltZSBvZiB5b3VyIHRhcmdldHMsXG5cdFx0ICogc28sIGlmIHlvdSBwYXNzIHlvdXIgcHJlY3JlYXRlZCBgdGFyZ2V0YCBwcm9wZXJ0eSB0byBhIFJvdXRlciwgbWFrZSBzdXJlIHRoYXQgaXQgaXMgbm90IGFnZ3JlZ2F0aW5nIGl0cyB2YWx1ZSxcblx0XHQgKiBpLmUuIGBvd25WYWx1ZWAgbWV0aG9kIGlzIG5vdCBjYWxsZWQuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgdGFyZ2V0PzogSVByb3BlcnR5PFQ+O1xuXG5cdFx0LyoqXG5cdFx0ICogUGF0aCBzZXBhcmF0b3IgZnVuY3Rpb24uIFBhcnNlcyBpbmNvbWluZyBwYXRoIHRvIHR3byB0b2tlbnM6IHJvdXRlIGFuZCBhcmd1bWVudC4gUm91dGUgZ2V0cyB1c2VkIHRvXG5cdFx0ICogcHJvY2VzcyBhIHNpbmdsZSByb3V0aW5nIHN0ZXAgYW5kIGNyZWF0ZSBhIHRhcmdldCwgYXJndW1lbnQgZ2V0cyBwYXNzZWQgdG8gdGhlIHRhcmdldCBmb3IgZnVydGhlciByb3V0aW5nLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IHNlcGFyYXRvcj86IFNlcGFyYXRvciB8IFJlZ0V4cDtcblxuXHRcdC8qKlxuXHRcdCAqIFBhdGggam9pbmVyLiBPcHBvc2l0ZSB0byBgc2VwYXJhdG9yYC4gVXNlZCBpbiBgZ2V0RnVsbFBhdGhgIGFuZCBgcmVkaXJlY3RgIG1ldGhvZHMgdG8gcHJvcGVybHkgYnVpbGQgdGhlXG5cdFx0ICogcGF0aC4gSm9pbnMgaW5jb21pbmcgcm91dGUgYW5kIGFyZ3VtZW50IHRvIGEgZnVsbCBwYXRoLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IGpvaW5lcj86IEpvaW5lciB8IHN0cmluZztcblxuXHRcdC8qKlxuXHRcdCAqIFJvdXRlIGhhbmRsZXIuIE1hcHMgdGhlIHJvdXRlIHN0cmluZyB0byBhIHRhcmdldCBvYmplY3QgYW5kIHBhc3NlcyBhcmd1bWVudCB0byBpdCBmb3IgZnVydGhlciByb3V0aW5nLlxuXHRcdCAqL1xuXHRcdHJlYWRvbmx5IGhhbmRsZXI/OiBIYW5kbGVyPFQ+IHwgSGFuZGxlckNvbmZpZzxUPjtcblxuXHRcdC8qKlxuXHRcdCAqIGBzZXBhcmF0b3JgLCBgam9pbmVyYCBhbmQgYGhhbmRsZXJgIGNhbGwgc2NvcGUuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgc2NvcGU/OiBhbnk7XG5cdH1cblxuXHQvKipcblx0ICogSWYgYHNlcGFyYXRvcmAgaXMgYSBmdW5jdGlvbiwgcmV0dXJucyBpdCBpbW1lZGlhdGVseS4gRWxzZSBjb252ZXJ0cyB0aGUgc3BlY2lmaWVkIHJlZ3VsYXIgZXhwcmVzc2lvbiB0b1xuXHQgKiBhIGZ1bmN0aW9uIGJ5IHRoZSBmb2xsb3dpbmcgcnVsZTogVGhlIGZpcnN0IHRva2VuICgkMSkgb2YgcGF0aCBpcyB1c2VkIGFzIGEgcm91dGUsIGFuZCB0aGUgbmV4dCBub24tbnVsbCB0b2tlblxuXHQgKiAoJDIgb3IgZnVydGhlcikgaXMgdXNlZCBhcyBhbiBhcmd1bWVudC4gSWYgcGF0aCBpcyBudWxsLCBpdCBpcyBhc3N1bWVkIHRvIGJlIFwiXCIuXG5cdCAqIEBwYXJhbSBzZXBhcmF0b3IgRnVuY3Rpb24gb3IgcmVndWxhciBleHByZXNzaW9uLlxuXHQgKiBAcmV0dXJucyBTZXBhcmF0b3IgZnVuY3Rpb24uXG5cdCAqL1xuXHRleHBvcnQgZnVuY3Rpb24gbWFrZVNlcGFyYXRvcihzZXBhcmF0b3I6IFNlcGFyYXRvciB8IFJlZ0V4cCA9IERFRkFVTFRfU0VQQVJBVE9SKTogU2VwYXJhdG9yIHtcblx0XHRpZiAodHlwZW9mIHNlcGFyYXRvciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRyZXR1cm4gc2VwYXJhdG9yO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHBhdGg6IHN0cmluZykge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gc2VwYXJhdG9yLmV4ZWMocGF0aCB8fCBcIlwiKTtcblx0XHRcdHJldHVybiByZXN1bHQgPyBbcmVzdWx0WzFdLCBkZWZuKEFycmF5VXRpbHMuZmluZChyZXN1bHQuc2xpY2UoMiksIGlzTm90TmlsKSwgbnVsbCldIDogbnVsbDtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIGBqb2luZXJgIGlzIGEgZnVuY3Rpb24sIHJldHVybnMgaXQgaW1tZWRpYXRlbHkuIEVsc2UgY29udmVydHMgdGhlIHNwZWNpZmllZCBzdHJpbmcgdG8gYSBmdW5jdGlvbiBieSB0aGVcblx0ICogZm9sbG93aW5nIHJ1bGU6IGpvaW5zIGluY29taW5nIHJvdXRlL2FyZ3VtZW50IHBhaXIgdmlhIHRoZSBzcGVjaWZpZWQgc3RyaW5nLiBMZWFkaW5nIGpvaW5lciBzeW1ib2xzIGluIGFyZ3VtZW50XG5cdCAqIGFyZSB0cmltbWVkLiBJZiBhcmd1bWVudCBzdGFydHMgd2l0aCBcIj9cIiwgam9pbmVyIHN5bWJvbCBpcyBub3QgYWRkZWQuIElmIGFyZ3VtZW50IGlzIG51bGwgb3IgYmxhbmssIHJldHVybnNcblx0ICogcm91dGUuXG5cdCAqIEBwYXJhbSBqb2luZXIgRnVuY3Rpb24gb3Igc2VwYXJhdGlvbiBjaGFyYWN0ZXIuXG5cdCAqIEByZXR1cm5zIEpvaW5lciBmdW5jdGlvbi5cblx0ICovXG5cdGV4cG9ydCBmdW5jdGlvbiBtYWtlSm9pbmVyKGpvaW5lcjogSm9pbmVyIHwgc3RyaW5nID0gREVGQVVMVF9KT0lORVIpOiBKb2luZXIge1xuXHRcdGlmICh0eXBlb2Ygam9pbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHJldHVybiBqb2luZXI7XG5cdFx0fVxuXHRcdGNvbnN0IHRyaW1tZXIgPSBuZXcgUmVnRXhwKFwiXig/OlwiICsgam9pbmVyLnJlcGxhY2UoL1tcXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJykgKyBcIikqXCIpO1xuXHRcdHJldHVybiBmdW5jdGlvbiAocm91dGUsIGFyZykge1xuXHRcdFx0cmV0dXJuICFhcmcgPyByb3V0ZSA6IChhcmcuY2hhckF0KDApID09PSBcIj9cIikgPyAocm91dGUgKyBhcmcpIDogKHJvdXRlICsgam9pbmVyICsgYXJnLnJlcGxhY2UodHJpbW1lciwgXCJcIikpO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogSWYgaGFuZGxlciBpcyBhIGZ1bmN0aW9uLCByZXR1cm5zIGl0IGltbWVkaWF0ZWx5LiBFbHNlIGNvbnZlcnRzIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHRvIGEgZnVuY3Rpb24uXG5cdCAqIEBwYXJhbSBoYW5kbGVyIEhhbmRsZXIgY29uZmlndXJhdGlvbiBvYmplY3QuXG5cdCAqIEByZXR1cm5zIEhhbmRsZXIgZnVuY3Rpb24uXG5cdCAqL1xuXHRleHBvcnQgZnVuY3Rpb24gbWFrZUhhbmRsZXI8VD4oaGFuZGxlcjogSGFuZGxlcjxUPiB8IEhhbmRsZXJDb25maWc8VD4gPSB7fSk6IEhhbmRsZXI8VD4ge1xuXHRcdGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRyZXR1cm4gaGFuZGxlcjtcblx0XHR9XG5cdFx0Y29uc3Qgcm91dGVzID0gaGFuZGxlci5yb3V0ZXMgfHwge307XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh0aGlzOiBhbnksIHJvdXRlOiBzdHJpbmcsIGFyZzogQmluZGFibGU8c3RyaW5nPik6IFQge1xuXHRcdFx0cmV0dXJuIHJvdXRlc1tyb3V0ZV0gPyByb3V0ZXNbcm91dGVdLmNhbGwodGhpcywgYXJnKSA6XG5cdFx0XHRcdGhhbmRsZXIubm90Rm91bmQgPyBoYW5kbGVyLm5vdEZvdW5kLmNhbGwodGhpcywgcm91dGUsIGFyZykgOiBudWxsO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBmdWxsIHBhdGggYXMgdGhlIHJlc3VsdCBvZiBgam9pbmVyYCBmdW5jdGlvbiBjYWxsIGluIGBwYXJlbnRgIG9mIGByb3V0ZXJgIHdpdGggYG5hbWVgIHBhc3NlZCBhc1xuXHQgKiBgcm91dGVgIGFuZCBgcGF0aGAgcGFzc2VkIGFzIGBhcmdgLiBSZXR1cm5zIGBwYXRoYCBpZiB0aGlzIGlzIHRoZSByb290IHJvdXRlci5cblx0ICogQHBhcmFtIHBhdGggUGF0aCByZWxhdGl2ZSB0byBgcm91dGVyYC5cblx0ICogQHBhcmFtIHJvdXRlciBDb21wdXRlIGZ1bGwgcGF0aCByZWxhdGl2ZSB0byB0aGlzIHJvdXRlci5cblx0ICogQHJldHVybnMgRnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoZSBgcm91dGVyYC5cblx0ICovXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsUGF0aChwYXRoOiBzdHJpbmcsIHJvdXRlcj86IFJvdXRlcjxhbnk+KSB7XG5cdFx0cmV0dXJuIHJvdXRlciA/IHJvdXRlci5nZXRGdWxsUGF0aChwYXRoKSA6IHBhdGg7XG5cdH1cblxuXHQvKipcblx0ICogSW1tZWRpYXRlbHkgcGVyZm9ybXMgdGhlIHJlZGlyZWN0aW9uLCBpLmUuIHNldHMgYGhhc2hgIHRvIGBnZXRGdWxsUGF0aChwYXRoLCByb3V0ZXIpYC5cblx0ICogQHBhcmFtIHBhdGggUGF0aCByZWxhdGl2ZSB0byBgcm91dGVyYC5cblx0ICogQHBhcmFtIHJvdXRlciBSZWRpcmVjdCByZWxhdGl2ZSB0byB0aGlzIHJvdXRlci5cblx0ICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZSBzdGFjay5cblx0ICovXG5cdGV4cG9ydCBmdW5jdGlvbiByZWRpcmVjdChwYXRoOiBzdHJpbmcsIHJvdXRlcj86IFJvdXRlcjxhbnk+LCByZXBsYWNlU3RhdGU/OiBib29sZWFuKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHBhdGggPSBnZXRGdWxsUGF0aChwYXRoLCByb3V0ZXIpO1xuXHRcdFx0aWYgKGhhc2gudXBkYXRpbmcpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVXBkYXRlIGN5Y2xlIGlzIGFscmVhZHkgYWN0aXZlLiBcIiArXG5cdFx0XHRcdFx0XCJTdWdnZXN0IHVzaW5nIFJvdXRlci5SZWRpcmVjdG9yIG9yIG1vdmluZyBVUkwgcmVkaXJlY3Rpb24gdG8gYW4gYXN5bmNyb25vdXMgY2FsbGJhY2suXCIpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbiBub3QgcGVyZm9ybSBVUkwgcmVkaXJlY3Rpb24gdG8gXCIgKyBwYXRoICsgXCI6IFwiICsgZS5tZXNzYWdlKTtcblx0XHR9XG5cdFx0aGFzaC5zZXQocGF0aCwgcmVwbGFjZVN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWNvbW1lbmRlZCB3YXkgdG8gcGVyZm9ybSBhbiBhc3luY3Jvbm91cyByZWRpcmVjdGlvbiBpbiBSb3V0ZXIgYGhhbmRsZXJgIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZXhwb3J0IGNsYXNzIFJlZGlyZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYSBuZXcgcmVkaXJlY3Rvci5cblx0XHQgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHJvdXRlci5cblx0XHQgKiBAcGFyYW0gcm91dGVyIFJlZGlyZWN0IHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxuXHRcdCAqIEBwYXJhbSByZXBsYWNlU3RhdGUgUmVwbGFjZSB0aGUgY3VycmVudCBicm93c2VyIGhpc3RvcmljYWwgc3RhdGUgcmF0aGVyIHRoYW4gcHVzaGluZyBhIG5ldyBzdGF0ZSB0byB0aGVcblx0XHQgKiBzdGFjay4gRGVmYXVsdHMgdG8gdHJ1ZS5cblx0XHQgKi9cblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGg6IHN0cmluZywgcHJpdmF0ZSByb3V0ZXI/OiBSb3V0ZXI8YW55PiwgcHJpdmF0ZSByZXBsYWNlU3RhdGU/OiBib29sZWFuKSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0ZGVmZXIoMCwgdGhpcy5vd24obmV3IENhbmNlbFRva2VuKCkpKS50aGVuKCgpID0+IHtcblx0XHRcdFx0cmVkaXJlY3QodGhpcy5wYXRoLCB0aGlzLnJvdXRlciwgZGVmbih0aGlzLnJlcGxhY2VTdGF0ZSwgdHJ1ZSkpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSByb3V0ZXIgdGhhdCBtYW5hZ2VzIHR3byBtYXBwaW5nIG9mIHByb3BlcnRpZXM6XG5cdCAqXG5cdCAqICogYHBhdGhzYCB3aGljaCBleHBvc2VzIHN0cmluZyBwYXRoIHByb3BlcnRpZXMgZm9yIGNoaWxkIHJvdXRlcnMgaWYgbmVjY2Vzc2FyeTtcblx0ICogKiBgZXhwYW5kZWRgIHdoaWNoIGV4cG9zZXMgYm9vbGVhbiBcImV4cGFuZGVkXCIgcHJvcGVydGllcyBmb3IgY2hpbGQgVUkgcGFuZWxzLlxuXHQgKlxuXHQgKiBUaGlzIGFsbG93cyB5b3UgdG8gcmVuZGVyIHlvdXIgY29udGVudCBhcyBhIGZpeGVkIGxpc3Qgb2YgcGFuZWxzIHJlcHJlc2VudGluZyB0aGUgY29uY3VycmVudCByb3V0ZXMuXG5cdCAqL1xuXHRleHBvcnQgY2xhc3MgTm9kZSBleHRlbmRzIENsYXNzIHtcblx0XHRwcml2YXRlIF9wYXRoczogRGljdGlvbmFyeTxJUHJvcGVydHk8c3RyaW5nPj47XG5cdFx0cHJpdmF0ZSBfZXhwYW5kZWQ6IERpY3Rpb25hcnk8SVByb3BlcnR5PGJvb2xlYW4+Pjtcblx0XHRwcml2YXRlIF9pbml0aWFsaXplZCA9IGZhbHNlOyAvLyB1c2VkIHRvIGF1dG8tYWN0aXZhdGUgdGhlIGZpcnN0IHJvdXRlIG9uIGluaXRpYWxpemF0aW9uXG5cdFx0cHJpdmF0ZSBfdXBkYXRpbmcgPSBmYWxzZTsgLy8gdXNlZCB0byBwcmV2ZW50IHJlZGlyZWN0aW9uIGVycm9yXG5cblx0XHQvKipcblx0XHQgKiBEZWZhdWx0IHJvdXRlIHRoaXMgbm9kZSB3YXMgaW5pdGlhbGl6ZWQgd2l0aC5cblx0XHQgKi9cblx0XHRyZWFkb25seSBkZWZhdWx0Um91dGU6IHN0cmluZztcblxuXHRcdC8qKlxuXHRcdCAqIFJvdXRlciB0aGF0IG1hbmFnZXMgdGhpcyBub2RlLiBOb2RlIGNyZWF0ZXMgdGhpcyByb3V0ZXIgYXV0b21hdGljYWxseS4gWW91IHNob3VsZCBwYXNzIHRoaXMgcm91dGVyIHRvXG5cdFx0ICogY2hpbGQgY29tcG9uZW50cyBhcyB0aGVpciBwYXJlbnQgcm91dGVyIGZvciBmdXJ0aGVyIHJvdXRpbmcuXG5cdFx0ICovXG5cdFx0cmVhZG9ubHkgcm91dGVyOiBSb3V0ZXI8RGVzdHJveWFibGU+O1xuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyByb3V0ZXIgbm9kZSwgYXNzaWducyBpdHMgcHJvcGVydGllcyB0byBpbml0aWFsIHZhbHVlcyBhbmQgc3RhcnRzIHN5bmNocm9uaXphdGlvbi5cblx0XHQgKiBAcGFyYW0gY29uZmlnIE5vZGUgY29uZmlndXJhdGlvbi5cblx0XHQgKi9cblx0XHRjb25zdHJ1Y3Rvcihjb25maWc6IE5vZGUuQ29uZmlnKSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0dGhpcy5kZWZhdWx0Um91dGUgPSBjb25maWcuZGVmYXVsdFJvdXRlO1xuXG5cdFx0XHRjb25zdCByb3V0ZU1hcCA9IEFycmF5VXRpbHMuaW5kZXgoY29uZmlnLnJvdXRlcywgaWRlbnRpdHkpO1xuXHRcdFx0dGhpcy5fcGF0aHMgPSBEaWN0aW9uYXJ5VXRpbHMubWFwKHJvdXRlTWFwLCAoKSA9PiBuZXcgUHJvcGVydHk8c3RyaW5nPigpKTtcblx0XHRcdHRoaXMuX2V4cGFuZGVkID0gRGljdGlvbmFyeVV0aWxzLm1hcChyb3V0ZU1hcCwgKCkgPT4gbmV3IFByb3BlcnR5KGNvbmZpZy5leHBhbmRlZCA9PT0gdHJ1ZSkpO1xuXG5cdFx0XHRpZiAoY29uZmlnLmV4cGFuZGVkICYmICh0eXBlb2YgY29uZmlnLmV4cGFuZGVkICE9PSBcImJvb2xlYW5cIikpIHtcblx0XHRcdFx0Y29uZmlnLmV4cGFuZGVkLmZvckVhY2goKHJvdXRlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fZXhwYW5kZWRbcm91dGVdLnNldCh0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdERpY3Rpb25hcnlVdGlscy5mb3JFYWNoKHRoaXMuX2V4cGFuZGVkLCAoZXhwYW5kZWQsIHJvdXRlKSA9PiB7XG5cdFx0XHRcdHRoaXMub3duKGV4cGFuZGVkLmNoYW5nZUV2ZW50Lmxpc3RlbigocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHBhcmFtcy52YWx1ZSAmJiAhdGhpcy5fdXBkYXRpbmcpIHtcblx0XHRcdFx0XHRcdHRoaXMucm91dGVyLnJlZGlyZWN0KHJvdXRlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLnJvdXRlciA9IHRoaXMub3duKG5ldyBSb3V0ZXI8RGVzdHJveWFibGU+KHtcblx0XHRcdFx0bmFtZTogY29uZmlnLm5hbWUsXG5cdFx0XHRcdHBhcmVudDogY29uZmlnLnBhcmVudCxcblx0XHRcdFx0cGF0aDogY29uZmlnLnBhdGgsXG5cdFx0XHRcdGhhbmRsZXI6IChyb3V0ZSwgYXJnKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcGF0aCA9IHRoaXMuX3BhdGhzW3JvdXRlXTtcblx0XHRcdFx0XHRpZiAoIXBhdGgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoIXRoaXMuX2luaXRpYWxpemVkICYmIHRoaXMuZGVmYXVsdFJvdXRlKSA/XG5cdFx0XHRcdFx0XHRcdG5ldyBSZWRpcmVjdG9yKHRoaXMuZGVmYXVsdFJvdXRlLCB0aGlzLnJvdXRlcikgOiBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl91cGRhdGluZyA9IHRydWU7XG5cdFx0XHRcdFx0Y29uc3QgZXhwYW5kZXIgPSBuZXcgTm9kZUV4cGFuZGVyKHRoaXMucm91dGVyLCBhcmcsIHBhdGgsIHRoaXMuX2V4cGFuZGVkW3JvdXRlXSk7XG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gZXhwYW5kZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0pKTtcblx0XHRcdHRoaXMucm91dGVyLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFByb3ZpZGVzIHBhdGhzIHRvIGJpbmQgY2hpbGQgcm91dGVycyB0bywgYnkgbmFtZS4gT25seSBvbmUgcm91dGUgaXMgYWN0aXZlIGF0IGEgdGltZSwgYnV0IHRoZWlyIHBhdGhzXG5cdFx0ICogYWx3YXlzIGV4aXN0IHJlZ2FyZGxlc3Mgb2YgdGhlaXIgYWN0aXZpdHkuXG5cdFx0ICovXG5cdFx0Z2V0IHBhdGhzKCk6IERpY3Rpb25hcnk8QmluZGFibGU8c3RyaW5nPj4ge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3BhdGhzO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFByb3ZpZGVzIFwiZXhwYW5kZWRcIiBmbGFncyB0byBiaW5kIGNoaWxkIHBhbmVscyB0bywgYnkgbmFtZS4gU3VwcG9ydCB0d28td2F5IGJpbmRpbmcuXG5cdFx0ICovXG5cdFx0Z2V0IGV4cGFuZGVkKCk6IERpY3Rpb25hcnk8SVByb3BlcnR5PGJvb2xlYW4+PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcblx0XHQvKipcblx0XHQgKiBSb3V0ZXIuTm9kZSBjb25maWd1cmF0aW9uLlxuXHRcdCAqL1xuXHRcdGV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogUm91dGVyIG5hbWUuXG5cdFx0XHQgKi9cblx0XHRcdHJlYWRvbmx5IG5hbWU/OiBzdHJpbmc7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUGFyZW50IHJvdXRlci5cblx0XHRcdCAqL1xuXHRcdFx0cmVhZG9ubHkgcGFyZW50PzogUm91dGVyPGFueT47XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUGF0aCB0byBiaW5kIHRoZSByb3V0ZXIgdG8uXG5cdFx0XHQgKi9cblx0XHRcdHJlYWRvbmx5IHBhdGg/OiBCaW5kYWJsZTxzdHJpbmc+O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEZpeGVkIGxpc3Qgb2Ygcm91dGVzIHRvIG1hbmFnZSBieSB0aGlzIG5vZGUuIEZvciBldmVyeSBuYW1lIGluIHRoaXMgbGlzdCwgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIHdpbGwgYmVcblx0XHRcdCAqIGNyZWF0ZWQgaW4gYHBhdGhzYCBhbmQgYGV4cGFuZGVkYCBkaWN0aW9uYXJpZXMgb2YgdGhlIG5vZGUuXG5cdFx0XHQgKi9cblx0XHRcdHJlYWRvbmx5IHJvdXRlczogc3RyaW5nW107XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSW5pdGlhbCBcImV4cGFuZGVkXCIgc3RhdHVzIG9mIHJvdXRlcyBvciBpbml0aWFsIHJvdXRlcyB0byBleHBhbmQuIERlZmF1bHRzIHRvIGZhbHNlIChhbGwgcm91dGVzIGFyZVxuXHRcdFx0ICogY29sbGFwc2VkKS5cblx0XHRcdCAqL1xuXHRcdFx0cmVhZG9ubHkgZXhwYW5kZWQ/OiBib29sZWFuIHwgc3RyaW5nW107XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogRGVmYXVsdCByb3V0ZS4gSWYgdGhlIGluaXRpYWwgcGF0aCBpcyBibGFuayAoXCJcIiksIHRoZSByb3V0ZXIgcGVyZm9ybXMgYSByZWRpcmVjdGlvbiB0byB0aGlzIHJvdXRlLCBpLmUuXG5cdFx0XHQgKiBleHBhbmRzIG9uZSBvZiB0aGUgcGFuZWxzLiBEb2Vzbid0IHdvcmsgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG5cdFx0XHQgKi9cblx0XHRcdHJlYWRvbmx5IGRlZmF1bHRSb3V0ZT86IHN0cmluZztcblx0XHR9XG5cdH1cblxuXHRjbGFzcyBOb2RlRXhwYW5kZXIgZXh0ZW5kcyBDbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjxhbnk+LCBzb3VyY2VQYXRoOiBCaW5kYWJsZTxzdHJpbmc+LFxuXHRcdFx0XHRcdHRhcmdldFBhdGg6IElQcm9wZXJ0eTxzdHJpbmc+LCBleHBhbmRlZDogSVByb3BlcnR5PGJvb2xlYW4+KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0dGhpcy5vd24obmV3IENvcGllcihzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSk7XG5cdFx0XHRleHBhbmRlZC5zZXQodHJ1ZSk7XG5cdFx0XHR0aGlzLm93bihleHBhbmRlZC5jaGFuZ2VFdmVudC5saXN0ZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJvdXRlci5yZWRpcmVjdChcIlwiKVxuXHRcdFx0fSkpO1xuXHRcdH1cblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VSVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBQSxRQUFBLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTtBQUVBOzs7OztJQUdxQixROzs7Ozs7Ozs7Ozs7RUFBaUIsUUFBQSxDQUFBLE87O0FBQXRDLE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgUm91dGVyIGZyb20gXCIuL1JvdXRlclwiO1xuXG4vKipcbiAqIFNob3J0aGFuZCBmb3IgUm91dGVyPENvbXBvbmVudD4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUm91dGVyIGV4dGVuZHMgUm91dGVyPENvbXBvbmVudD4ge1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    timeout = window.setTimeout(resolve, ms);
  }, function () {
    clearTimeout(timeout);
  }, cancelToken);
}

exports.default = default_1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUVBOzs7Ozs7Ozs7O0FBUUEsU0FBQSxTQUFBLENBQXlCLEVBQXpCLEVBQXNDLFdBQXRDLEVBQStEO0FBQzlELE1BQUksT0FBSjtBQUNBLFNBQU8sYUFBQSxDQUFBLFFBQUEsQ0FDTixVQUFDLE9BQUQsRUFBc0Q7QUFDckQsSUFBQSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsT0FBbEIsRUFBMkIsRUFBM0IsQ0FBVjtBQUNBLEdBSEssRUFJTixZQUFLO0FBQ0osSUFBQSxZQUFZLENBQUMsT0FBRCxDQUFaO0FBQ0EsR0FOSyxFQU9OLFdBUE0sQ0FBUDtBQVNBOztBQVhELE9BQUEsQ0FBQSxPQUFBLEdBQUEsU0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBDYW5jZWxUb2tlbiwge3J1bkFzeW5jfSBmcm9tIFwiLi9DYW5jZWxUb2tlblwiO1xuXG4vKipcbiAqIFByb21pc2Ugd3JhcHBlciBvdmVyIHNldFRpbWVvdXQgZnVuY3Rpb24gd2l0aCBDYW5jZWxUb2tlbiBzdXBwb3J0LiBSZXNvbHZlcyB0aGUgcHJvbWlzZSBhZnRlciBzcGVjaWZpZWRcbiAqIHBlcmlvZCBvZiB0aW1lLiBOZXZlciByZWplY3RzIHRoZSBwcm9taXNlLiBJZiB0aGUgb3BlcmF0aW9uIGdldHMgY2FuY2VsbGVkIHZpYSB0aGUgdG9rZW4sIHRoZSBwcm9taXNlIG5ldmVyIGdldHNcbiAqIHJlc29sdmVkIG9yIHJlamVjdGVkLlxuICogQHBhcmFtIG1zIFRpbWVvdXQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICogQHBhcmFtIGNhbmNlbFRva2VuIENhbmNlbGxhdGlvbiB0b2tlbiB0byBiaW5kIHRoZSBvcGVyYXRpb24gdG8uXG4gKiBAcmV0dXJucyBQcm9taXNlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRpbWVvdXQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChtcz86IG51bWJlciwgY2FuY2VsVG9rZW4/OiBDYW5jZWxUb2tlbik6IFByb21pc2U8dm9pZD4ge1xuXHRsZXQgdGltZW91dDogbnVtYmVyO1xuXHRyZXR1cm4gcnVuQXN5bmM8dm9pZD4oXG5cdFx0KHJlc29sdmU6ICh2YWx1ZT86IChQcm9taXNlPHZvaWQ+IHwgdm9pZCkpID0+IHZvaWQpID0+IHtcblx0XHRcdHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XG5cdFx0fSxcblx0XHQoKSA9PiB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0fSxcblx0XHRjYW5jZWxUb2tlblxuXHQpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

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

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

      this._changeEvent.trigger({
        sender: this,
        value: value,
        oldValue: oldValue
      });

      this._updating = false;
    }
  }, {
    key: "updating",
    get: function get() {
      return this._updating;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBWjtBQUNBOzs7O0VBeEJpQixVQUFBLENBQUEsTztBQWdFbkI7Ozs7Ozs7QUFLQSxJQUFJLElBQUksR0FBVSxJQUFsQixDLENBQXdCOztBQUN4QixJQUFJLElBQUo7QUFDQSxPQUFBLENBQUEsT0FBQSxHQUFlLElBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgalF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBJUHJvcGVydHkgZnJvbSBcIi4vSVByb3BlcnR5XCI7XG5pbXBvcnQgUHJvcGVydHkgZnJvbSBcIi4vUHJvcGVydHlcIjtcblxuLyoqXG4gKiBJbnRlcmZhY2Ugb2YgYGhhc2hgIG9iamVjdC4gRXh0ZW5zaW9uIG9mIElQcm9wZXJ0eTxzdHJpbmc+IGludGVyZmFjZSB3aXRoIGB1cGRhdGluZ2Agc3RhdHVzIGluZGljYXRvciBhbmRcbiAqIGByZXBsYWNlU3RhdGVgIG9wdGlvbmFsIHBhcmFtZXRlciBvZiBgc2V0YCBtZXRob2QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUhhc2ggZXh0ZW5kcyBJUHJvcGVydHk8c3RyaW5nPiB7XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiBoYXNoIGFzc2lnbm1lbnQgaXMgaW4gcHJvZ3Jlc3MgYXQgdGhlIG1vbWVudC4gV2hpbGUgYHVwZGF0aW5nYCBpcyB0cnVlLCBgbG9jYXRpb24uaGFzaGBcblx0ICogZ2V0cyBtb2RpZmllZCBhbmQgYGNoYW5nZUV2ZW50YCBnZXRzIHRyaWdnZXJlZC4gQ2hlY2tpbmcgdGhpcyBmbGFnIGluIGNvcnJlc3BvbmRpbmcgZXZlbnQgaGFuZGxlcnMgbWF5IHByZXZlbnRcblx0ICogaW5maW5pdGUgbG9vcHMgYW5kIHVuZXhwZWN0ZWQgY2FsbGJhY2sgY29uZmxpY3RzLlxuXHQgKi9cblx0cmVhZG9ubHkgdXBkYXRpbmc6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEFzc2lnbnMgYGxvY2F0aW9uLmhhc2hgIHRvIGEgbmV3IHZhbHVlIGFuZCB0cmlnZ2VycyBgY2hhbmdlRXZlbnRgLiBSaXNlcyBgdXBkYXRpbmdgIGZsYWcgdG8gcHJldmVudFxuXHQgKiBpbmZpbml0ZSBsb29wcyBhbmQgY2FsbGJhY2sgY29uZmxpY3RzIGR1cmluZyB0aGlzIHRpbWUuXG5cdCAqIEBwYXJhbSB2YWx1ZSBOZXcgaGFzaCB2YWx1ZSB0byBhc3NpZ24uXG5cdCAqIEBwYXJhbSByZXBsYWNlU3RhdGUgUmVwbGFjZSB0aGUgY3VycmVudCBicm93c2VyIGhpc3RvcmljYWwgc3RhdGUgcmF0aGVyIHRoYW4gcHVzaGluZyBhIG5ldyBzdGF0ZSB0byB0aGUgc3RhY2suXG5cdCAqL1xuXHRzZXQodmFsdWU6IHN0cmluZywgcmVwbGFjZVN0YXRlPzogYm9vbGVhbik6IHZvaWQ7XG59XG5cbmNsYXNzIEhhc2ggZXh0ZW5kcyBQcm9wZXJ0eTxzdHJpbmc+IGltcGxlbWVudHMgSUhhc2gge1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgcmVkaXJlY3Rpb25EZXRlY3Rpb25JbnRlcnZhbCA9IDEwMDA7XG5cdHByaXZhdGUgcmVhZG9ubHkgcmVkaXJlY3Rpb25EZXRlY3Rpb25MaW1pdCA9IDI1O1xuXG5cdHByaXZhdGUgcmVkaXJlY3Rpb25TdGFydFRpbWUgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cdHByaXZhdGUgcmVkaXJlY3Rpb25VcmxzOiBzdHJpbmdbXSA9IFtdO1xuXHRwcml2YXRlIHJlZGlyZWN0aW9uTG9ja2VkID0gZmFsc2U7XG5cblx0cHJpdmF0ZSBfdXBkYXRpbmcgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcihsb2NhdGlvbi5oYXNoLnN1YnN0cigxKSk7XG5cdFx0aWYgKGhhc2ggIT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSGFzaCBpcyBhIHNpbmdsZXRvbi4gVW5hYmxlIHRvIGNyZWF0ZSBtb3JlIGluc3RhbmNlcy5cIilcblx0XHR9XG5cdFx0aGFzaCA9IHRoaXM7XG5cdFx0alF1ZXJ5KHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsICgpID0+IHtcblx0XHRcdHRoaXMuc2V0KGxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcblx0XHR9KTtcblx0fVxuXG5cdGdldCB1cGRhdGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5fdXBkYXRpbmc7XG5cdH1cblxuXHRzZXQodmFsdWU6IHN0cmluZyA9IFwiXCIsIHJlcGxhY2VTdGF0ZT86IGJvb2xlYW4pIHtcblx0XHRpZiAodGhpcy5yZWRpcmVjdGlvbkxvY2tlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG5cdFx0aWYgKG9sZFZhbHVlID09PSB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0XHRpZiAodGltZSAtIHRoaXMucmVkaXJlY3Rpb25TdGFydFRpbWUgPCB0aGlzLnJlZGlyZWN0aW9uRGV0ZWN0aW9uSW50ZXJ2YWwpIHtcblx0XHRcdHRoaXMucmVkaXJlY3Rpb25VcmxzLnB1c2godmFsdWUpO1xuXHRcdFx0aWYgKHRoaXMucmVkaXJlY3Rpb25VcmxzLmxlbmd0aCA+IHRoaXMucmVkaXJlY3Rpb25EZXRlY3Rpb25MaW1pdCkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRW5kbGVzcyBVUkwgcmVkaXJlY3Rpb24gZGV0ZWN0ZWQuIFByZXZlbnRpbmcgYWxsIGZ1cnRoZXIgcmVkaXJlY3Rpb25zLiBTZWUgVVJMcyBiZWxvdy4gXCIgK1xuXHRcdFx0XHRcdFwiSWYgdGhpcyBpbmZvcm1hdGlvbiBpcyBub3QgZW5vdWdoLCBwbGVhc2Ugc2V0IGJyZWFrcG9pbnQgdG8gdGhpcyBtZXRob2QgYW5kIGZpbmQgb3V0IHdoYXQgY2F1c2VzIFwiICtcblx0XHRcdFx0XHRcInVuZXhwZWN0ZWQgcmVkaXJlY3Rpb24gY2FsbHMuIFByb2JhYmx5IHlvdSBoYXZlIG1pc2NvbmZpZ3VyZWQgc29tZSByb3V0ZXIgLSBcIiArXG5cdFx0XHRcdFx0XCJwbGVhc2UgY2hlY2sgcm91dGVyIG5hbWVzIGFuZCBwYXJlbnRzLlwiKTtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5yZWRpcmVjdGlvblVybHMpO1xuXHRcdFx0XHR0aGlzLnJlZGlyZWN0aW9uTG9ja2VkID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnJlZGlyZWN0aW9uU3RhcnRUaW1lID0gdGltZTtcblx0XHRcdHRoaXMucmVkaXJlY3Rpb25VcmxzID0gW3ZhbHVlXTtcblx0XHR9XG5cblx0XHR0aGlzLl91cGRhdGluZyA9IHRydWU7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHRcdGlmIChyZXBsYWNlU3RhdGUgJiYgd2luZG93Lmhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcblx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIGxvY2F0aW9uLnBhdGhuYW1lICsgXCIjXCIgKyB2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxvY2F0aW9uLmhhc2ggPSBcIiNcIiArIHZhbHVlO1xuXHRcdH1cblx0XHR0aGlzLl9jaGFuZ2VFdmVudC50cmlnZ2VyKHtzZW5kZXI6IHRoaXMsIHZhbHVlLCBvbGRWYWx1ZX0pO1xuXHRcdHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG5cdH1cbn1cblxuLyoqXG4gKiBJbnN0YW5jZSBvZiBJSGFzaCBzaW5nbGV0b24uIFByb3ZpZGVzIGEgdHJhbnNwYXJlbnQgUHJvcGVydHktY29tcGF0aWJsZSBpbnRlcmZhY2Ugb3ZlciBgbG9jYXRpb24uaGFzaGBcbiAqIG1hbmlwdWxhdGlvbnMuIFZhbHVlIG9mIHRoaXMgcHJvcGVydHkgaXMgYWx3YXlzIGVxdWFsIHRvIGBsb2NhdGlvbi5oYXNoYCB3aXRob3V0IGxlYWRpbmcgXCIjXCIgc3ltYm9sLlxuICogSGFzIGEgYnVpbHQtaW4gcHJvdGVjdGlvbiBhZ2FpbnN0IGluZmluaXRlIHJlZGlyZWN0aW9ucy5cbiAqL1xubGV0IGhhc2g6IElIYXNoID0gbnVsbDsgLy8gQW4gZXh0cmEgdmFyaWFibGUgaGVscHMgSW50ZWxsaVNlbnNlIHRvIGZpbmQgdGhpcyBpbXBvcnRcbm5ldyBIYXNoKCk7XG5leHBvcnQgZGVmYXVsdCBoYXNoO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L0NvcGllci5qcyIsIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L1JvdXRlci5qcyIsIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L1VJUm91dGVyLmpzIiwid2VicGFjazovLy9DOi9qd2lkZ2V0L2dpdC9tYWluL2Rpc3QvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vL0M6L2p3aWRnZXQvZ2l0L21haW4vZGlzdC9oYXNoLmpzIiwid2VicGFjazovLy8uL3JvdXRlci9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uLi8uLi9zcmMvcm91dGVyL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvcm91dGVyL0NvbXBvc2UudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvRW1haWxMaXN0LnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvcm91dGVyL0VtYWlsTGlzdEl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVyL0VtYWlsTm90Rm91bmQuancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JvdXRlci9FbWFpbE5vdEZvdW5kLnRzIiwid2VicGFjazovLy8uL3JvdXRlci9FbWFpbFZpZXcuancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JvdXRlci9FbWFpbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVyL0luYm94Lmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvSW5ib3gudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvTm90Rm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9yb3V0ZXIvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JvdXRlci9pbmRleC50cyJdLCJuYW1lcyI6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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUVBQXVFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrQ0FBa0M7O0FBRWxDLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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LElBQUgsQ0FBUSx5QkFBeUIsS0FBSyxLQUE5QixHQUFzQyxnQkFBOUM7QUFDQTs7OztFQVJvQyxtQjs7QUFBdEMsMkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQSxNQUFxQixRQUFyQjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLElBQXNDLG1CQUF0Qzs7QUFBcUIsVUFBUSxlQUQ1QixtQkFBUyw4REFBVCxDQUM0QixHQUFSLFFBQVEsQ0FBUjtBQUNyQjtBQUFDLENBREQ7O2tCQUFxQixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUixpQkFBUyxDQUNyQjtBQUNDLElBQUUsRUFBRSxHQURMO0FBRUMsU0FBTyxFQUFFLE9BRlY7QUFHQyxTQUFPLEVBQUU7QUFIVixDQURxQixFQUtsQjtBQUNGLElBQUUsRUFBRSxHQURGO0FBRUYsU0FBTyxFQUFFLFFBRlA7QUFHRixTQUFPLEVBQUU7QUFIUCxDQUxrQixDQUFULEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FiOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxRQUFaLEVBQXNCLENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0IsZ0JBQXhCLEVBQTBDLHFCQUExQyxFQUFpRSxZQUFqRSxFQUNyQixVQURxQixFQUNULGNBRFMsRUFDTyxrQkFEUCxFQUMyQixrQkFEM0IsRUFDK0MsdUJBRC9DLEVBQ3dFLGNBRHhFLEVBRXJCLG1CQUZxQixFQUVBLFVBRkEsRUFFWSxlQUZaLEVBRTZCLGFBRjdCLEVBRTRDLGFBRjVDLENBQXRCO0FBSUEsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBTkQsRSIsImZpbGUiOiJidW5kbGUtcm91dGVyLTg4OWNmMTlmZDYwMDY2OTI4MGY1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkgeyBfZ2V0ID0gUmVmbGVjdC5nZXQ7IH0gZWxzZSB7IF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IHZhciBiYXNlID0gX3N1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7IGlmICghYmFzZSkgcmV0dXJuOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwgcHJvcGVydHkpOyBpZiAoZGVzYy5nZXQpIHsgcmV0dXJuIGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpOyB9IHJldHVybiBkZXNjLnZhbHVlOyB9OyB9IHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7IH1cblxuZnVuY3Rpb24gX3N1cGVyUHJvcEJhc2Uob2JqZWN0LCBwcm9wZXJ0eSkgeyB3aGlsZSAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkgeyBvYmplY3QgPSBfZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgYnJlYWs7IH0gcmV0dXJuIG9iamVjdDsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxudmFyIF9faW1wb3J0RGVmYXVsdCA9IHZvaWQgMCAmJiAodm9pZCAwKS5fX2ltcG9ydERlZmF1bHQgfHwgZnVuY3Rpb24gKG1vZCkge1xuICByZXR1cm4gbW9kICYmIG1vZC5fX2VzTW9kdWxlID8gbW9kIDoge1xuICAgIFwiZGVmYXVsdFwiOiBtb2RcbiAgfTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBDbGFzc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NsYXNzXCIpKTtcblxudmFyIFByb3BlcnR5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUHJvcGVydHlcIikpO1xuLyoqXHJcbiAqIExpc3RlbnMgc291cmNlIGBCaW5kYWJsZWAgbW9kaWZpY2F0aW9uIGFuZCBjb3BpZXMgaXRzIHZhbHVlIHRvIHRhcmdldCBwcm9wZXJ0eS5cclxuICpcclxuICogQHBhcmFtIFQgUHJvcGVydHkgdmFsdWUgdHlwZS5cclxuICovXG5cblxudmFyIENvcGllciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQ29waWVyLCBfQ2xhc3NfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKENvcGllcik7XG5cbiAgLyoqXHJcbiAgICogQHBhcmFtIHNvdXJjZSBTb3VyY2UgYmluZGFibGUuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgcHJvcGVydHkuXHJcbiAgICovXG4gIGZ1bmN0aW9uIENvcGllcihzb3VyY2UsIHRhcmdldCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb3BpZXIpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgX3RoaXMuX3RhcmdldENyZWF0ZWQgPSB0YXJnZXQgPT0gbnVsbDtcbiAgICBfdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0ID09IG51bGwgPyBuZXcgUHJvcGVydHlfMS5kZWZhdWx0KG51bGwsIHNvdXJjZS5zaWxlbnQpIDogdGFyZ2V0O1xuXG4gICAgX3RoaXMuX3VwZGF0ZSgpO1xuXG4gICAgX3RoaXMub3duKF90aGlzLnNvdXJjZS5jaGFuZ2VFdmVudC5saXN0ZW4oX3RoaXMuX3VwZGF0ZSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICAvKipcclxuICAgKiBUYXJnZXQgcHJvcGVydHkuXHJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoQ29waWVyLCBbe1xuICAgIGtleTogXCJkZXN0cm95T2JqZWN0XCIsXG5cbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0RG9jXHJcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveU9iamVjdCgpIHtcbiAgICAgIGlmICh0aGlzLl90YXJnZXRDcmVhdGVkKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldC5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RhcmdldCA9IG51bGw7XG5cbiAgICAgIF9nZXQoX2dldFByb3RvdHlwZU9mKENvcGllci5wcm90b3R5cGUpLCBcImRlc3Ryb3lPYmplY3RcIiwgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3VwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgICAgdGhpcy5fdGFyZ2V0LnNldCh0aGlzLnNvdXJjZS5nZXQoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRhcmdldFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29waWVyO1xufShDbGFzc18xLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb3BpZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OURiM0JwWlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCT3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdRVUY1UWtFc1NVRkJRU3hQUVVGQkxFZEJRVUVzWlVGQlFTeERRVUZCTEU5QlFVRXNRMEZCUVN4VFFVRkJMRU5CUVVFc1EwRkJRVHM3UVVGRlFTeEpRVUZCTEZWQlFVRXNSMEZCUVN4bFFVRkJMRU5CUVVFc1QwRkJRU3hEUVVGQkxGbEJRVUVzUTBGQlFTeERRVUZCTzBGQlJVRTdPenM3T3pzN1NVRkxUU3hOT3pzN096dEJRVWxNT3pzN08wRkJTVUVzYTBKQlFYRkNMRTFCUVhKQ0xFVkJRVEJETEUxQlFURkRMRVZCUVN0RU8wRkJRVUU3TzBGQlFVRTdPMEZCUXpsRU8wRkJSRzlDTEZWQlFVRXNUVUZCUVN4SFFVRkJMRTFCUVVFN1FVRkZjRUlzVlVGQlN5eGpRVUZNTEVkQlFYTkNMRTFCUVUwc1NVRkJTU3hKUVVGb1F6dEJRVU5CTEZWQlFVc3NUMEZCVEN4SFFVRm5RaXhOUVVGTkxFbEJRVWtzU1VGQldDeEhRVUZ0UWl4SlFVRkpMRlZCUVVFc1EwRkJRU3hQUVVGS0xFTkJRV2RDTEVsQlFXaENMRVZCUVhOQ0xFMUJRVTBzUTBGQlF5eE5RVUUzUWl4RFFVRnVRaXhIUVVFd1JDeE5RVUY2UlRzN1FVRkRRU3hWUVVGTExFOUJRVXc3TzBGQlEwRXNWVUZCU3l4SFFVRk1MRU5CUVZNc1RVRkJTeXhOUVVGTUxFTkJRVmtzVjBGQldpeERRVUYzUWl4TlFVRjRRaXhEUVVFclFpeE5RVUZMTEU5QlFYQkRMR2REUVVGVU96dEJRVXc0UkR0QlFVMDVSRHRCUVVWRU96czdPenM3T3p0QlFVOUJPenM3YjBOQlIzVkNPMEZCUTNSQ0xGVkJRVWtzUzBGQlN5eGpRVUZVTEVWQlFYbENPMEZCUTNoQ0xHRkJRVXNzVDBGQlRDeERRVUZoTEU5QlFXSTdRVUZEUVRzN1FVRkRSQ3hYUVVGTExFOUJRVXdzUjBGQlpTeEpRVUZtT3p0QlFVTkJPMEZCUTBFN096czRRa0ZGWXp0QlFVTmtMRmRCUVVzc1QwRkJUQ3hEUVVGaExFZEJRV0lzUTBGQmFVSXNTMEZCU3l4TlFVRk1MRU5CUVZrc1IwRkJXaXhGUVVGcVFqdEJRVU5CT3pzN2QwSkJha0pUTzBGQlExUXNZVUZCVHl4TFFVRkxMRTlCUVZvN1FVRkRRVHM3T3p0RlFYSkNjMElzVDBGQlFTeERRVUZCTEU4N08wRkJkVU40UWl4UFFVRkJMRU5CUVVFc1QwRkJRU3hIUVVGbExFMUJRV1lpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHVUVWxVSUV4cFkyVnVjMlZjYmx4dVEyOXdlWEpwWjJoMElDaGpLU0F5TURJd0lFVm5iM0lnVG1Wd2IyMXVlV0Z6WTJocGFGeHVYRzVRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNXZaaUIwYUdseklITnZablIzWVhKbElHRnVaQ0JoYzNOdlkybGhkR1ZrSUdSdlkzVnRaVzUwWVhScGIyNGdabWxzWlhNZ0tIUm9aU0JjSWxOdlpuUjNZWEpsWENJcExDQjBieUJrWldGc1hHNXBiaUIwYUdVZ1UyOW1kSGRoY21VZ2QybDBhRzkxZENCeVpYTjBjbWxqZEdsdmJpd2dhVzVqYkhWa2FXNW5JSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6WEc1MGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNWpiM0JwWlhNZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTENCaGJtUWdkRzhnY0dWeWJXbDBJSEJsY25OdmJuTWdkRzhnZDJodmJTQjBhR1VnVTI5bWRIZGhjbVVnYVhOY2JtWjFjbTVwYzJobFpDQjBieUJrYnlCemJ5d2djM1ZpYW1WamRDQjBieUIwYUdVZ1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzVjYmxSb1pTQmhZbTkyWlNCamIzQjVjbWxuYUhRZ2JtOTBhV05sSUdGdVpDQjBhR2x6SUhCbGNtMXBjM05wYjI0Z2JtOTBhV05sSUhOb1lXeHNJR0psSUdsdVkyeDFaR1ZrSUdsdUlHRnNiRnh1WTI5d2FXVnpJRzl5SUhOMVluTjBZVzUwYVdGc0lIQnZjblJwYjI1eklHOW1JSFJvWlNCVGIyWjBkMkZ5WlM1Y2JseHVWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVeUJQVWx4dVNVMVFURWxGUkN3Z1NVNURURlZFU1U1SElFSlZWQ0JPVDFRZ1RFbE5TVlJGUkNCVVR5QlVTRVVnVjBGU1VrRk9WRWxGVXlCUFJpQk5SVkpEU0VGT1ZFRkNTVXhKVkZrc1hHNUdTVlJPUlZOVElFWlBVaUJCSUZCQlVsUkpRMVZNUVZJZ1VGVlNVRTlUUlNCQlRrUWdUazlPU1U1R1VrbE9SMFZOUlU1VUxpQkpUaUJPVHlCRlZrVk9WQ0JUU0VGTVRDQlVTRVZjYmtGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzSUVSQlRVRkhSVk1nVDFJZ1QxUklSVkpjYmt4SlFVSkpURWxVV1N3Z1YwaEZWRWhGVWlCSlRpQkJUaUJCUTFSSlQwNGdUMFlnUTA5T1ZGSkJRMVFzSUZSUFVsUWdUMUlnVDFSSVJWSlhTVk5GTENCQlVrbFRTVTVISUVaU1QwMHNYRzVQVlZRZ1QwWWdUMUlnU1U0Z1EwOU9Ua1ZEVkVsUFRpQlhTVlJJSUZSSVJTQlRUMFpVVjBGU1JTQlBVaUJVU0VVZ1ZWTkZJRTlTSUU5VVNFVlNJRVJGUVV4SlRrZFRJRWxPSUZSSVJWeHVVMDlHVkZkQlVrVXVYRzRxTDF4dVhHNXBiWEJ2Y25RZ1FtbHVaR0ZpYkdVZ1puSnZiU0FuTGk5Q2FXNWtZV0pzWlNjN1hHNXBiWEJ2Y25RZ1EyeGhjM01nWm5KdmJTQW5MaTlEYkdGemN5YzdYRzVwYlhCdmNuUWdTVkJ5YjNCbGNuUjVJR1p5YjIwZ0p5NHZTVkJ5YjNCbGNuUjVKenRjYm1sdGNHOXlkQ0JRY205d1pYSjBlU0JtY205dElDY3VMMUJ5YjNCbGNuUjVKenRjYmx4dUx5b3FYRzRnS2lCTWFYTjBaVzV6SUhOdmRYSmpaU0JnUW1sdVpHRmliR1ZnSUcxdlpHbG1hV05oZEdsdmJpQmhibVFnWTI5d2FXVnpJR2wwY3lCMllXeDFaU0IwYnlCMFlYSm5aWFFnY0hKdmNHVnlkSGt1WEc0Z0tseHVJQ29nUUhCaGNtRnRJRlFnVUhKdmNHVnlkSGtnZG1Gc2RXVWdkSGx3WlM1Y2JpQXFMMXh1WTJ4aGMzTWdRMjl3YVdWeVBGWStJR1Y0ZEdWdVpITWdRMnhoYzNNZ2UxeHVYSFJ3Y21sMllYUmxJRjkwWVhKblpYUkRjbVZoZEdWa09pQmliMjlzWldGdU8xeHVYSFJ3Y21sMllYUmxJRjkwWVhKblpYUTZJRWxRY205d1pYSjBlVHhXUGp0Y2JseHVYSFF2S2lwY2JseDBJQ29nUUhCaGNtRnRJSE52ZFhKalpTQlRiM1Z5WTJVZ1ltbHVaR0ZpYkdVdVhHNWNkQ0FxSUVCd1lYSmhiU0IwWVhKblpYUWdWR0Z5WjJWMElIQnliM0JsY25SNUxseHVYSFFnS2k5Y2JseDBZMjl1YzNSeWRXTjBiM0lvY21WaFpHOXViSGtnYzI5MWNtTmxPaUJDYVc1a1lXSnNaVHhXUGl3Z2RHRnlaMlYwUHpvZ1NWQnliM0JsY25SNVBGWStLU0I3WEc1Y2RGeDBjM1Z3WlhJb0tUdGNibHgwWEhSMGFHbHpMbDkwWVhKblpYUkRjbVZoZEdWa0lEMGdkR0Z5WjJWMElEMDlJRzUxYkd3N1hHNWNkRngwZEdocGN5NWZkR0Z5WjJWMElEMGdLSFJoY21kbGRDQTlQU0J1ZFd4c0tTQS9JRzVsZHlCUWNtOXdaWEowZVR4V1BpaHVkV3hzTENCemIzVnlZMlV1YzJsc1pXNTBLU0E2SUhSaGNtZGxkRHRjYmx4MFhIUjBhR2x6TGw5MWNHUmhkR1VvS1R0Y2JseDBYSFIwYUdsekxtOTNiaWgwYUdsekxuTnZkWEpqWlM1amFHRnVaMlZGZG1WdWRDNXNhWE4wWlc0b2RHaHBjeTVmZFhCa1lYUmxMQ0IwYUdsektTazdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nVkdGeVoyVjBJSEJ5YjNCbGNuUjVMbHh1WEhRZ0tpOWNibHgwWjJWMElIUmhjbWRsZENncE9pQkNhVzVrWVdKc1pUeFdQaUI3WEc1Y2RGeDBjbVYwZFhKdUlIUm9hWE11WDNSaGNtZGxkRHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCQWFXNW9aWEpwZEVSdlkxeHVYSFFnS2k5Y2JseDBjSEp2ZEdWamRHVmtJR1JsYzNSeWIzbFBZbXBsWTNRb0tTQjdYRzVjZEZ4MGFXWWdLSFJvYVhNdVgzUmhjbWRsZEVOeVpXRjBaV1FwSUh0Y2JseDBYSFJjZEhSb2FYTXVYM1JoY21kbGRDNWtaWE4wY205NUtDazdYRzVjZEZ4MGZWeHVYSFJjZEhSb2FYTXVYM1JoY21kbGRDQTlJRzUxYkd3N1hHNWNkRngwYzNWd1pYSXVaR1Z6ZEhKdmVVOWlhbVZqZENncE8xeHVYSFI5WEc1Y2JseDBjSEpwZG1GMFpTQmZkWEJrWVhSbEtDa2dlMXh1WEhSY2RIUm9hWE11WDNSaGNtZGxkQzV6WlhRb2RHaHBjeTV6YjNWeVkyVXVaMlYwS0NrcE8xeHVYSFI5WEc1OVhHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElFTnZjR2xsY2p0Y2JpSmRMQ0p6YjNWeVkyVlNiMjkwSWpvaUluMD0iLCJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIFJlZmxlY3QuZ2V0KSB7IF9nZXQgPSBSZWZsZWN0LmdldDsgfSBlbHNlIHsgX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgdmFyIGJhc2UgPSBfc3VwZXJQcm9wQmFzZSh0YXJnZXQsIHByb3BlcnR5KTsgaWYgKCFiYXNlKSByZXR1cm47IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7IGlmIChkZXNjLmdldCkgeyByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7IH0gcmV0dXJuIGRlc2MudmFsdWU7IH07IH0gcmV0dXJuIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIgfHwgdGFyZ2V0KTsgfVxuXG5mdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7IHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7IG9iamVjdCA9IF9nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhazsgfSByZXR1cm4gb2JqZWN0OyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19jcmVhdGVCaW5kaW5nID0gdm9pZCAwICYmICh2b2lkIDApLl9fY3JlYXRlQmluZGluZyB8fCAoT2JqZWN0LmNyZWF0ZSA/IGZ1bmN0aW9uIChvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIG1ba107XG4gICAgfVxuICB9KTtcbn0gOiBmdW5jdGlvbiAobywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19zZXRNb2R1bGVEZWZhdWx0IHx8IChPYmplY3QuY3JlYXRlID8gZnVuY3Rpb24gKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdlxuICB9KTtcbn0gOiBmdW5jdGlvbiAobywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcblxudmFyIF9faW1wb3J0U3RhciA9IHZvaWQgMCAmJiAodm9pZCAwKS5fX2ltcG9ydFN0YXIgfHwgZnVuY3Rpb24gKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgfVxuXG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBfX2ltcG9ydERlZmF1bHQgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19pbXBvcnREZWZhdWx0IHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgcmV0dXJuIG1vZCAmJiBtb2QuX19lc01vZHVsZSA/IG1vZCA6IHtcbiAgICBcImRlZmF1bHRcIjogbW9kXG4gIH07XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQXJyYXlVdGlscyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9BcnJheVV0aWxzXCIpKTtcblxudmFyIENhbmNlbFRva2VuXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2FuY2VsVG9rZW5cIikpO1xuXG52YXIgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XG5cbnZhciBDb21wb25lbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db21wb25lbnRcIikpO1xuXG52YXIgQ29waWVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ29waWVyXCIpKTtcblxudmFyIGRlZmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZGVmZXJcIikpO1xuXG52YXIgRGljdGlvbmFyeVV0aWxzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL0RpY3Rpb25hcnlVdGlsc1wiKSk7XG5cbnZhciBoYXNoXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vaGFzaFwiKSk7XG5cbnZhciBpbmRleF8xID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XG5cbnZhciBQcm9wZXJ0eV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Byb3BlcnR5XCIpKTtcbi8qKlxyXG4gKiBVUkwgcm91dGVyLiBDb252ZXJ0cyBpbmNvbWluZyBwYXJ0IG9mIFVSTCAoaGFzaCkgdG8gYSB0YXJnZXQgb2JqZWN0IGFuZCBwYXNzZXMgdGFpbCBzdHJpbmcgdG8gaXRcclxuICogZm9yIGZ1cnRoZXIgcm91dGluZy5cclxuICovXG5cblxudmFyIFJvdXRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoUm91dGVyLCBfQ2xhc3NfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFJvdXRlcik7XG5cbiAgLyoqXHJcbiAgICogQ3JlYXRlcyByb3V0ZXIgaW5zdGFuY2UuIFBsZWFzZSBub3RpY2UgdGhhdCB0aGUgcm91dGVyIGRvZXNuJ3QgcHJvY2VzcyBjdXJyZW50IHJvdXRlIGltbWVkaWF0ZWx5IG9uXHJcbiAgICogaW5pdGlhbGl6YXRpb24uIFRvIHByb2Nlc3MgdGhlIHJvdXRlLCBjYWxsIGB1cGRhdGVgIG1ldGhvZC5cclxuICAgKiBAcGFyYW0gY29uZmlnIFJvdXRlciBjb25maWd1cmF0aW9uLlxyXG4gICAqL1xuICBmdW5jdGlvbiBSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGVyKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgX3RoaXMuX3JvdXRlID0gbmV3IFByb3BlcnR5XzEuZGVmYXVsdCgpO1xuICAgIF90aGlzLl9hcmcgPSBuZXcgUHJvcGVydHlfMS5kZWZhdWx0KCk7XG4gICAgX3RoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG4gICAgX3RoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuICAgIF90aGlzLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQ7XG5cbiAgICBpZiAoX3RoaXMubmFtZSA9PSBudWxsICE9PSAoX3RoaXMucGFyZW50ID09IG51bGwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZXIgY29uZmlndXJhdGlvbiBlcnJvcjogeW91IGhhdmUgc3BlY2lmaWVkIHJvdXRlciBuYW1lIG9yIHBhcmVudCwgYnV0IGhhdmVuJ3Qgc3BlY2lmaWVkIGFub3RoZXIuIFRoZXNlIHR3byBvcHRpb25zIG11c3QgY29tZSB0b2dldGhlci5cIik7XG4gICAgfVxuXG4gICAgX3RoaXMucGF0aCA9IGNvbmZpZy5wYXRoIHx8IG5ldyBQcm9wZXJ0eV8xLmRlZmF1bHQoKTsgLy8gd2UgZG9uJ3Qgb3duIGl0IGJlY2F1c2UgaXRzIHZhbHVlIGlzIGJlaW5nIHVzZWQgaW4gZGVzdHJveU9iamVjdCBtZXRob2QgLSBhZnRlciBvd25hZ2UgcG9vbCByZWxlYXNpbmdcblxuICAgIF90aGlzLnNlcGFyYXRvciA9IFJvdXRlci5tYWtlU2VwYXJhdG9yKGNvbmZpZy5zZXBhcmF0b3IpO1xuICAgIF90aGlzLmpvaW5lciA9IFJvdXRlci5tYWtlSm9pbmVyKGNvbmZpZy5qb2luZXIpO1xuICAgIF90aGlzLmhhbmRsZXIgPSBSb3V0ZXIubWFrZUhhbmRsZXIoY29uZmlnLmhhbmRsZXIpO1xuICAgIF90aGlzLnNjb3BlID0gY29uZmlnLnNjb3BlIHx8IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgIF90aGlzLl90YXJnZXQgPSBjb25maWcudGFyZ2V0IHx8IF90aGlzLm93bihuZXcgUHJvcGVydHlfMS5kZWZhdWx0KCkpO1xuXG4gICAgX3RoaXMub3duKF90aGlzLnBhdGguY2hhbmdlRXZlbnQubGlzdGVuKF90aGlzLnVwZGF0ZSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICAvKipcclxuICAgKiBSb3V0ZXIgdGFyZ2V0LiBNYWluIHB1cnBvc2Ugb2YgdGhlIHJvdXRlciBpcyB0byBjb252ZXJ0IGBwYXRoYCB0byBgdGFyZ2V0YC4gSW4gcGFydGljdWxhciwgVUlSb3V0ZXJcclxuICAgKiBjcmVhdGVzIENvbXBvbmVudCBpbnN0YW5jZXMgYmFzZWQgb24gY3VycmVudCBgcGF0aGAgdmFsdWUgc28geW91IGNvdWxkIHJlbmRlciB0aGVtLlxyXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFJvdXRlciwgW3tcbiAgICBrZXk6IFwiZGVzdHJveU9iamVjdFwiLFxuXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3lPYmplY3QoKSB7XG4gICAgICBpZiAodGhpcy5fdXBkYXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm91dGVyIGNhbiBub3QgYmUgZGVzdHJveWVkIGR1cmluZyBpdHMgdXBkYXRlIGN5Y2xlLlwiKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldC5nZXQoKTtcblxuICAgICAgaWYgKHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgIHRhcmdldC5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIF9nZXQoX2dldFByb3RvdHlwZU9mKFJvdXRlci5wcm90b3R5cGUpLCBcImRlc3Ryb3lPYmplY3RcIiwgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBJc3N1ZXMgcm91dGUgcHJvY2Vzc2luZy5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIGlmICh0aGlzLl91cGRhdGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCB1cGRhdGUgcm91dGVyIGJlY2F1c2UgaXRzIHVwZGF0ZSBjeWNsZSBpcyBhbHJlYWR5IGFjdGl2ZS4gXCIgKyBcIlN1Z2dlc3QgdXNpbmcgUm91dGVyLlJlZGlyZWN0b3Igb3IgbW92aW5nIFVSTCByZWRpcmVjdGlvbiB0byBhbiBhc3luY3Jvbm91cyBjYWxsYmFjay5cIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcbiAgICAgIHZhciBwYXRoID0gdGhpcy5wYXRoLmdldCgpO1xuICAgICAgdmFyIHBhaXIgPSBwYXRoID09IG51bGwgPyBudWxsIDogdGhpcy5zZXBhcmF0b3IuY2FsbCh0aGlzLnNjb3BlLCBwYXRoKTtcbiAgICAgIHZhciByb3V0ZSA9IHBhaXIgIT0gbnVsbCA/IHBhaXJbMF0gfHwgXCJcIiA6IFwiXCI7XG4gICAgICB2YXIgYXJnID0gcGFpciAhPSBudWxsID8gcGFpclsxXSB8fCBudWxsIDogbnVsbDtcblxuICAgICAgaWYgKHJvdXRlID09PSB0aGlzLnJvdXRlLmdldCgpKSB7XG4gICAgICAgIHRoaXMuX2FyZy5zZXQoYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldC5nZXQoKTtcblxuICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl90YXJnZXQuc2V0KG51bGwpO1xuXG4gICAgICAgICAgdGFyZ2V0LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FyZy5zZXQoYXJnKTtcblxuICAgICAgICB0aGlzLl9yb3V0ZS5zZXQocm91dGUpO1xuXG4gICAgICAgIHRoaXMuX3RhcmdldC5zZXQodGhpcy5oYW5kbGVyLmNhbGwodGhpcy5zY29wZSwgcm91dGUsIHRoaXMuX2FyZykgfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgZm9yIHRoaXMgcm91dGVyLlxyXG4gICAgICogQHBhcmFtIHJvdXRlIFJvdXRlIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gYXJnIFJlbWFpbmRlciBvZiB0aGUgcGF0aC5cclxuICAgICAqIEByZXR1cm5zIEZ1bGwgcGF0aC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiam9pblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBqb2luKHJvdXRlLCBhcmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmpvaW5lci5jYWxsKHRoaXMuc2NvcGUsIHJvdXRlLCBhcmcpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJldHVybnMgZnVsbCBwYXRoIGFzIHRoZSByZXN1bHQgb2YgYGpvaW5lcmAgZnVuY3Rpb24gY2FsbCBpbiBgcGFyZW50YCByb3V0ZXIgd2l0aCBgbmFtZWAgcGFzc2VkIGFzXHJcbiAgICAgKiBgcm91dGVgIGFuZCBgcGF0aGAgcGFzc2VkIGFzIGBhcmdgLiBSZXR1cm5zIGBwYXRoYCBpZiB0aGlzIGlzIHRoZSByb290IHJvdXRlci5cclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXHJcbiAgICAgKiBAcmV0dXJucyBGdWxsIHBhdGggcmVsYXRpdmUgdG8gdGhlIHJvb3Qgcm91dGVyLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRGdWxsUGF0aFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGdWxsUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5nZXRGdWxsUGF0aCh0aGlzLnBhcmVudC5qb2luKHRoaXMubmFtZSwgcGF0aCkpIDogcGF0aDtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBJbW1lZGlhdGVseSBwZXJmb3JtcyB0aGUgcmVkaXJlY3Rpb24sIGkuZS4gc2V0cyBgaGFzaGAgdG8gYGdldEZ1bGxQYXRoKHBhdGgpYC5cclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXHJcbiAgICAgKiBAcGFyYW0gcmVwbGFjZVN0YXRlIFJlcGxhY2UgdGhlIGN1cnJlbnQgYnJvd3NlciBoaXN0b3JpY2FsIHN0YXRlIHJhdGhlciB0aGFuIHB1c2hpbmcgYSBuZXcgc3RhdGUgdG8gdGhlIHN0YWNrLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZWRpcmVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWRpcmVjdChwYXRoLCByZXBsYWNlU3RhdGUpIHtcbiAgICAgIFJvdXRlci5yZWRpcmVjdChwYXRoLCB0aGlzLCByZXBsYWNlU3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0YXJnZXRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCByb3V0ZS4gRmlyc3QgY2h1bmsgb2YgdGhlIHBhdGggZGV0ZWN0ZWQgYnkgYHNlcGFyYXRvcmAgZnVuY3Rpb24uIFlvdSBjYW4gd2F0Y2ggdGhpcyBwcm9wZXJ0eVxyXG4gICAgICogdG8gYWN0aXZhdGUgYW5kIGRlYWN0aXZhdGUgaXRlbXMgaW4geW91ciBtZW51LlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyb3V0ZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlbWFpbmRlciBvZiBjdXJyZW50IHJvdXRlIGFmdGVyIGBzZXBhcmF0b3JgIGZ1bmN0aW9uIGNhbGwuIFRoaXMgcHJvcGVydHkgaXMgcGFzc2VkIHRvIGBoYW5kbGVyYFxyXG4gICAgICogZnVuY3Rpb24gYW5kIGNhbiBiZSBwYXNzZWQgb3ZlciB0byBjaGlsZCBjb21wb25lbnRzIGZvciBmdXJ0aGVyIHJvdXRpbmcuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImFyZ1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FyZztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUm91dGVyO1xufShDbGFzc18xLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSb3V0ZXI7XG5cbihmdW5jdGlvbiAoUm91dGVyKSB7XG4gIC8qKlxyXG4gICAqIERlZmF1bHQgdmFsdWUgb2YgYHNlcGFyYXRvcmAuXHJcbiAgICovXG4gIFJvdXRlci5ERUZBVUxUX1NFUEFSQVRPUiA9IC9eXFwvKihbXj9cXC9dKykoPzpcXC8oLiopfChcXD8uKikpPyQvO1xuICAvKipcclxuICAgKiBEZWZhdWx0IHZhbHVlIG9mIGBqb2luZXJgLlxyXG4gICAqL1xuXG4gIFJvdXRlci5ERUZBVUxUX0pPSU5FUiA9IFwiL1wiO1xuICAvKipcclxuICAgKiBJZiBgc2VwYXJhdG9yYCBpcyBhIGZ1bmN0aW9uLCByZXR1cm5zIGl0IGltbWVkaWF0ZWx5LiBFbHNlIGNvbnZlcnRzIHRoZSBzcGVjaWZpZWQgcmVndWxhciBleHByZXNzaW9uIHRvXHJcbiAgICogYSBmdW5jdGlvbiBieSB0aGUgZm9sbG93aW5nIHJ1bGU6IFRoZSBmaXJzdCB0b2tlbiAoJDEpIG9mIHBhdGggaXMgdXNlZCBhcyBhIHJvdXRlLCBhbmQgdGhlIG5leHQgbm9uLW51bGwgdG9rZW5cclxuICAgKiAoJDIgb3IgZnVydGhlcikgaXMgdXNlZCBhcyBhbiBhcmd1bWVudC4gSWYgcGF0aCBpcyBudWxsLCBpdCBpcyBhc3N1bWVkIHRvIGJlIFwiXCIuXHJcbiAgICogQHBhcmFtIHNlcGFyYXRvciBGdW5jdGlvbiBvciByZWd1bGFyIGV4cHJlc3Npb24uXHJcbiAgICogQHJldHVybnMgU2VwYXJhdG9yIGZ1bmN0aW9uLlxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VTZXBhcmF0b3IoKSB7XG4gICAgdmFyIHNlcGFyYXRvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogUm91dGVyLkRFRkFVTFRfU0VQQVJBVE9SO1xuXG4gICAgaWYgKHR5cGVvZiBzZXBhcmF0b3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBzZXBhcmF0b3IuZXhlYyhwYXRoIHx8IFwiXCIpO1xuICAgICAgcmV0dXJuIHJlc3VsdCA/IFtyZXN1bHRbMV0sIGluZGV4XzEuZGVmbihBcnJheVV0aWxzLmZpbmQocmVzdWx0LnNsaWNlKDIpLCBpbmRleF8xLmlzTm90TmlsKSwgbnVsbCldIDogbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgUm91dGVyLm1ha2VTZXBhcmF0b3IgPSBtYWtlU2VwYXJhdG9yO1xuICAvKipcclxuICAgKiBJZiBgam9pbmVyYCBpcyBhIGZ1bmN0aW9uLCByZXR1cm5zIGl0IGltbWVkaWF0ZWx5LiBFbHNlIGNvbnZlcnRzIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHRvIGEgZnVuY3Rpb24gYnkgdGhlXHJcbiAgICogZm9sbG93aW5nIHJ1bGU6IGpvaW5zIGluY29taW5nIHJvdXRlL2FyZ3VtZW50IHBhaXIgdmlhIHRoZSBzcGVjaWZpZWQgc3RyaW5nLiBMZWFkaW5nIGpvaW5lciBzeW1ib2xzIGluIGFyZ3VtZW50XHJcbiAgICogYXJlIHRyaW1tZWQuIElmIGFyZ3VtZW50IHN0YXJ0cyB3aXRoIFwiP1wiLCBqb2luZXIgc3ltYm9sIGlzIG5vdCBhZGRlZC4gSWYgYXJndW1lbnQgaXMgbnVsbCBvciBibGFuaywgcmV0dXJuc1xyXG4gICAqIHJvdXRlLlxyXG4gICAqIEBwYXJhbSBqb2luZXIgRnVuY3Rpb24gb3Igc2VwYXJhdGlvbiBjaGFyYWN0ZXIuXHJcbiAgICogQHJldHVybnMgSm9pbmVyIGZ1bmN0aW9uLlxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VKb2luZXIoKSB7XG4gICAgdmFyIGpvaW5lciA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogUm91dGVyLkRFRkFVTFRfSk9JTkVSO1xuXG4gICAgaWYgKHR5cGVvZiBqb2luZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIGpvaW5lcjtcbiAgICB9XG5cbiAgICB2YXIgdHJpbW1lciA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBqb2luZXIucmVwbGFjZSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSArIFwiKSpcIik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyb3V0ZSwgYXJnKSB7XG4gICAgICByZXR1cm4gIWFyZyA/IHJvdXRlIDogYXJnLmNoYXJBdCgwKSA9PT0gXCI/XCIgPyByb3V0ZSArIGFyZyA6IHJvdXRlICsgam9pbmVyICsgYXJnLnJlcGxhY2UodHJpbW1lciwgXCJcIik7XG4gICAgfTtcbiAgfVxuXG4gIFJvdXRlci5tYWtlSm9pbmVyID0gbWFrZUpvaW5lcjtcbiAgLyoqXHJcbiAgICogSWYgaGFuZGxlciBpcyBhIGZ1bmN0aW9uLCByZXR1cm5zIGl0IGltbWVkaWF0ZWx5LiBFbHNlIGNvbnZlcnRzIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHRvIGEgZnVuY3Rpb24uXHJcbiAgICogQHBhcmFtIGhhbmRsZXIgSGFuZGxlciBjb25maWd1cmF0aW9uIG9iamVjdC5cclxuICAgKiBAcmV0dXJucyBIYW5kbGVyIGZ1bmN0aW9uLlxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VIYW5kbGVyKCkge1xuICAgIHZhciBoYW5kbGVyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gaGFuZGxlcjtcbiAgICB9XG5cbiAgICB2YXIgcm91dGVzID0gaGFuZGxlci5yb3V0ZXMgfHwge307XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyb3V0ZSwgYXJnKSB7XG4gICAgICByZXR1cm4gcm91dGVzW3JvdXRlXSA/IHJvdXRlc1tyb3V0ZV0uY2FsbCh0aGlzLCBhcmcpIDogaGFuZGxlci5ub3RGb3VuZCA/IGhhbmRsZXIubm90Rm91bmQuY2FsbCh0aGlzLCByb3V0ZSwgYXJnKSA6IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIFJvdXRlci5tYWtlSGFuZGxlciA9IG1ha2VIYW5kbGVyO1xuICAvKipcclxuICAgKiBSZXR1cm5zIGZ1bGwgcGF0aCBhcyB0aGUgcmVzdWx0IG9mIGBqb2luZXJgIGZ1bmN0aW9uIGNhbGwgaW4gYHBhcmVudGAgb2YgYHJvdXRlcmAgd2l0aCBgbmFtZWAgcGFzc2VkIGFzXHJcbiAgICogYHJvdXRlYCBhbmQgYHBhdGhgIHBhc3NlZCBhcyBgYXJnYC4gUmV0dXJucyBgcGF0aGAgaWYgdGhpcyBpcyB0aGUgcm9vdCByb3V0ZXIuXHJcbiAgICogQHBhcmFtIHBhdGggUGF0aCByZWxhdGl2ZSB0byBgcm91dGVyYC5cclxuICAgKiBAcGFyYW0gcm91dGVyIENvbXB1dGUgZnVsbCBwYXRoIHJlbGF0aXZlIHRvIHRoaXMgcm91dGVyLlxyXG4gICAqIEByZXR1cm5zIEZ1bGwgcGF0aCByZWxhdGl2ZSB0byB0aGUgYHJvdXRlcmAuXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0RnVsbFBhdGgocGF0aCwgcm91dGVyKSB7XG4gICAgcmV0dXJuIHJvdXRlciA/IHJvdXRlci5nZXRGdWxsUGF0aChwYXRoKSA6IHBhdGg7XG4gIH1cblxuICBSb3V0ZXIuZ2V0RnVsbFBhdGggPSBnZXRGdWxsUGF0aDtcbiAgLyoqXHJcbiAgICogSW1tZWRpYXRlbHkgcGVyZm9ybXMgdGhlIHJlZGlyZWN0aW9uLCBpLmUuIHNldHMgYGhhc2hgIHRvIGBnZXRGdWxsUGF0aChwYXRoLCByb3V0ZXIpYC5cclxuICAgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIGByb3V0ZXJgLlxyXG4gICAqIEBwYXJhbSByb3V0ZXIgUmVkaXJlY3QgcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXHJcbiAgICogQHBhcmFtIHJlcGxhY2VTdGF0ZSBSZXBsYWNlIHRoZSBjdXJyZW50IGJyb3dzZXIgaGlzdG9yaWNhbCBzdGF0ZSByYXRoZXIgdGhhbiBwdXNoaW5nIGEgbmV3IHN0YXRlIHRvIHRoZSBzdGFjay5cclxuICAgKi9cblxuICBmdW5jdGlvbiByZWRpcmVjdChwYXRoLCByb3V0ZXIsIHJlcGxhY2VTdGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICBwYXRoID0gZ2V0RnVsbFBhdGgocGF0aCwgcm91dGVyKTtcblxuICAgICAgaWYgKGhhc2hfMS5kZWZhdWx0LnVwZGF0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVwZGF0ZSBjeWNsZSBpcyBhbHJlYWR5IGFjdGl2ZS4gXCIgKyBcIlN1Z2dlc3QgdXNpbmcgUm91dGVyLlJlZGlyZWN0b3Igb3IgbW92aW5nIFVSTCByZWRpcmVjdGlvbiB0byBhbiBhc3luY3Jvbm91cyBjYWxsYmFjay5cIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG5vdCBwZXJmb3JtIFVSTCByZWRpcmVjdGlvbiB0byBcIiArIHBhdGggKyBcIjogXCIgKyBlLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhc2hfMS5kZWZhdWx0LnNldChwYXRoLCByZXBsYWNlU3RhdGUpO1xuICB9XG5cbiAgUm91dGVyLnJlZGlyZWN0ID0gcmVkaXJlY3Q7XG4gIC8qKlxyXG4gICAqIFJlY29tbWVuZGVkIHdheSB0byBwZXJmb3JtIGFuIGFzeW5jcm9ub3VzIHJlZGlyZWN0aW9uIGluIFJvdXRlciBgaGFuZGxlcmAgZnVuY3Rpb24uXHJcbiAgICovXG5cbiAgdmFyIFJlZGlyZWN0b3IgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Db21wb25lbnRfMSRkZWZhdWx0KSB7XG4gICAgX2luaGVyaXRzKFJlZGlyZWN0b3IsIF9Db21wb25lbnRfMSRkZWZhdWx0KTtcblxuICAgIHZhciBfc3VwZXIyID0gX2NyZWF0ZVN1cGVyKFJlZGlyZWN0b3IpO1xuXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHJlZGlyZWN0b3IuXHJcbiAgICAgKiBAcGFyYW0gcGF0aCBQYXRoIHJlbGF0aXZlIHRvIHJvdXRlci5cclxuICAgICAqIEBwYXJhbSByb3V0ZXIgUmVkaXJlY3QgcmVsYXRpdmUgdG8gdGhpcyByb3V0ZXIuXHJcbiAgICAgKiBAcGFyYW0gcmVwbGFjZVN0YXRlIFJlcGxhY2UgdGhlIGN1cnJlbnQgYnJvd3NlciBoaXN0b3JpY2FsIHN0YXRlIHJhdGhlciB0aGFuIHB1c2hpbmcgYSBuZXcgc3RhdGUgdG8gdGhlXHJcbiAgICAgKiBzdGFjay4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlZGlyZWN0b3IocGF0aCwgcm91dGVyLCByZXBsYWNlU3RhdGUpIHtcbiAgICAgIHZhciBfdGhpczI7XG5cbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWRpcmVjdG9yKTtcblxuICAgICAgX3RoaXMyID0gX3N1cGVyMi5jYWxsKHRoaXMpO1xuICAgICAgX3RoaXMyLnBhdGggPSBwYXRoO1xuICAgICAgX3RoaXMyLnJvdXRlciA9IHJvdXRlcjtcbiAgICAgIF90aGlzMi5yZXBsYWNlU3RhdGUgPSByZXBsYWNlU3RhdGU7XG4gICAgICBkZWZlcl8xLmRlZmF1bHQoMCwgX3RoaXMyLm93bihuZXcgQ2FuY2VsVG9rZW5fMS5kZWZhdWx0KCkpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVkaXJlY3QoX3RoaXMyLnBhdGgsIF90aGlzMi5yb3V0ZXIsIGluZGV4XzEuZGVmbihfdGhpczIucmVwbGFjZVN0YXRlLCB0cnVlKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBfdGhpczI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlZGlyZWN0b3I7XG4gIH0oQ29tcG9uZW50XzEuZGVmYXVsdCk7XG5cbiAgUm91dGVyLlJlZGlyZWN0b3IgPSBSZWRpcmVjdG9yO1xuICAvKipcclxuICAgKiBDcmVhdGVzIGEgcm91dGVyIHRoYXQgbWFuYWdlcyB0d28gbWFwcGluZyBvZiBwcm9wZXJ0aWVzOlxyXG4gICAqXHJcbiAgICogKiBgcGF0aHNgIHdoaWNoIGV4cG9zZXMgc3RyaW5nIHBhdGggcHJvcGVydGllcyBmb3IgY2hpbGQgcm91dGVycyBpZiBuZWNjZXNzYXJ5O1xyXG4gICAqICogYGV4cGFuZGVkYCB3aGljaCBleHBvc2VzIGJvb2xlYW4gXCJleHBhbmRlZFwiIHByb3BlcnRpZXMgZm9yIGNoaWxkIFVJIHBhbmVscy5cclxuICAgKlxyXG4gICAqIFRoaXMgYWxsb3dzIHlvdSB0byByZW5kZXIgeW91ciBjb250ZW50IGFzIGEgZml4ZWQgbGlzdCBvZiBwYW5lbHMgcmVwcmVzZW50aW5nIHRoZSBjb25jdXJyZW50IHJvdXRlcy5cclxuICAgKi9cblxuICB2YXIgTm9kZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdDIpIHtcbiAgICBfaW5oZXJpdHMoTm9kZSwgX0NsYXNzXzEkZGVmYXVsdDIpO1xuXG4gICAgdmFyIF9zdXBlcjMgPSBfY3JlYXRlU3VwZXIoTm9kZSk7XG5cbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgcm91dGVyIG5vZGUsIGFzc2lnbnMgaXRzIHByb3BlcnRpZXMgdG8gaW5pdGlhbCB2YWx1ZXMgYW5kIHN0YXJ0cyBzeW5jaHJvbml6YXRpb24uXHJcbiAgICAgKiBAcGFyYW0gY29uZmlnIE5vZGUgY29uZmlndXJhdGlvbi5cclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE5vZGUoY29uZmlnKSB7XG4gICAgICB2YXIgX3RoaXMzO1xuXG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm9kZSk7XG5cbiAgICAgIF90aGlzMyA9IF9zdXBlcjMuY2FsbCh0aGlzKTtcbiAgICAgIF90aGlzMy5faW5pdGlhbGl6ZWQgPSBmYWxzZTsgLy8gdXNlZCB0byBhdXRvLWFjdGl2YXRlIHRoZSBmaXJzdCByb3V0ZSBvbiBpbml0aWFsaXphdGlvblxuXG4gICAgICBfdGhpczMuX3VwZGF0aW5nID0gZmFsc2U7IC8vIHVzZWQgdG8gcHJldmVudCByZWRpcmVjdGlvbiBlcnJvclxuXG4gICAgICBfdGhpczMuZGVmYXVsdFJvdXRlID0gY29uZmlnLmRlZmF1bHRSb3V0ZTtcbiAgICAgIHZhciByb3V0ZU1hcCA9IEFycmF5VXRpbHMuaW5kZXgoY29uZmlnLnJvdXRlcywgaW5kZXhfMS5pZGVudGl0eSk7XG4gICAgICBfdGhpczMuX3BhdGhzID0gRGljdGlvbmFyeVV0aWxzLm1hcChyb3V0ZU1hcCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5XzEuZGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgICBfdGhpczMuX2V4cGFuZGVkID0gRGljdGlvbmFyeVV0aWxzLm1hcChyb3V0ZU1hcCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5XzEuZGVmYXVsdChjb25maWcuZXhwYW5kZWQgPT09IHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChjb25maWcuZXhwYW5kZWQgJiYgdHlwZW9mIGNvbmZpZy5leHBhbmRlZCAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgY29uZmlnLmV4cGFuZGVkLmZvckVhY2goZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgX3RoaXMzLl9leHBhbmRlZFtyb3V0ZV0uc2V0KHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgRGljdGlvbmFyeVV0aWxzLmZvckVhY2goX3RoaXMzLl9leHBhbmRlZCwgZnVuY3Rpb24gKGV4cGFuZGVkLCByb3V0ZSkge1xuICAgICAgICBfdGhpczMub3duKGV4cGFuZGVkLmNoYW5nZUV2ZW50Lmxpc3RlbihmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy52YWx1ZSAmJiAhX3RoaXMzLl91cGRhdGluZykge1xuICAgICAgICAgICAgX3RoaXMzLnJvdXRlci5yZWRpcmVjdChyb3V0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICAgIF90aGlzMy5yb3V0ZXIgPSBfdGhpczMub3duKG5ldyBSb3V0ZXIoe1xuICAgICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgICAgcGFyZW50OiBjb25maWcucGFyZW50LFxuICAgICAgICBwYXRoOiBjb25maWcucGF0aCxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyb3V0ZSwgYXJnKSB7XG4gICAgICAgICAgdmFyIHBhdGggPSBfdGhpczMuX3BhdGhzW3JvdXRlXTtcblxuICAgICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuICFfdGhpczMuX2luaXRpYWxpemVkICYmIF90aGlzMy5kZWZhdWx0Um91dGUgPyBuZXcgUmVkaXJlY3RvcihfdGhpczMuZGVmYXVsdFJvdXRlLCBfdGhpczMucm91dGVyKSA6IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMzLl91cGRhdGluZyA9IHRydWU7XG4gICAgICAgICAgdmFyIGV4cGFuZGVyID0gbmV3IE5vZGVFeHBhbmRlcihfdGhpczMucm91dGVyLCBhcmcsIHBhdGgsIF90aGlzMy5fZXhwYW5kZWRbcm91dGVdKTtcbiAgICAgICAgICBfdGhpczMuX3VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGV4cGFuZGVyO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIF90aGlzMy5yb3V0ZXIudXBkYXRlKCk7XG5cbiAgICAgIF90aGlzMy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIF90aGlzMztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBwYXRocyB0byBiaW5kIGNoaWxkIHJvdXRlcnMgdG8sIGJ5IG5hbWUuIE9ubHkgb25lIHJvdXRlIGlzIGFjdGl2ZSBhdCBhIHRpbWUsIGJ1dCB0aGVpciBwYXRoc1xyXG4gICAgICogYWx3YXlzIGV4aXN0IHJlZ2FyZGxlc3Mgb2YgdGhlaXIgYWN0aXZpdHkuXHJcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKE5vZGUsIFt7XG4gICAgICBrZXk6IFwicGF0aHNcIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aHM7XG4gICAgICB9XG4gICAgICAvKipcclxuICAgICAgICogUHJvdmlkZXMgXCJleHBhbmRlZFwiIGZsYWdzIHRvIGJpbmQgY2hpbGQgcGFuZWxzIHRvLCBieSBuYW1lLiBTdXBwb3J0IHR3by13YXkgYmluZGluZy5cclxuICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiZXhwYW5kZWRcIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIE5vZGU7XG4gIH0oQ2xhc3NfMS5kZWZhdWx0KTtcblxuICBSb3V0ZXIuTm9kZSA9IE5vZGU7XG5cbiAgdmFyIE5vZGVFeHBhbmRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdDMpIHtcbiAgICBfaW5oZXJpdHMoTm9kZUV4cGFuZGVyLCBfQ2xhc3NfMSRkZWZhdWx0Myk7XG5cbiAgICB2YXIgX3N1cGVyNCA9IF9jcmVhdGVTdXBlcihOb2RlRXhwYW5kZXIpO1xuXG4gICAgZnVuY3Rpb24gTm9kZUV4cGFuZGVyKHJvdXRlciwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZXhwYW5kZWQpIHtcbiAgICAgIHZhciBfdGhpczQ7XG5cbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOb2RlRXhwYW5kZXIpO1xuXG4gICAgICBfdGhpczQgPSBfc3VwZXI0LmNhbGwodGhpcyk7XG4gICAgICBfdGhpczQucm91dGVyID0gcm91dGVyO1xuXG4gICAgICBfdGhpczQub3duKG5ldyBDb3BpZXJfMS5kZWZhdWx0KHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpKTtcblxuICAgICAgZXhwYW5kZWQuc2V0KHRydWUpO1xuXG4gICAgICBfdGhpczQub3duKGV4cGFuZGVkLmNoYW5nZUV2ZW50Lmxpc3RlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzNC5yb3V0ZXIucmVkaXJlY3QoXCJcIik7XG4gICAgICB9KSk7XG5cbiAgICAgIHJldHVybiBfdGhpczQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5vZGVFeHBhbmRlcjtcbiAgfShDbGFzc18xLmRlZmF1bHQpO1xufSkoUm91dGVyIHx8IChSb3V0ZXIgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlTYjNWMFpYSXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMEZCZDBKQkxFbEJRVUVzVlVGQlFTeEhRVUZCTEZsQlFVRXNRMEZCUVN4UFFVRkJMRU5CUVVFc1kwRkJRU3hEUVVGQkxFTkJRVUU3TzBGQlJVRXNTVUZCUVN4aFFVRkJMRWRCUVVFc1pVRkJRU3hEUVVGQkxFOUJRVUVzUTBGQlFTeGxRVUZCTEVOQlFVRXNRMEZCUVRzN1FVRkRRU3hKUVVGQkxFOUJRVUVzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRkJMRk5CUVVFc1EwRkJRU3hEUVVGQk96dEJRVU5CTEVsQlFVRXNWMEZCUVN4SFFVRkJMR1ZCUVVFc1EwRkJRU3hQUVVGQkxFTkJRVUVzWVVGQlFTeERRVUZCTEVOQlFVRTdPMEZCUTBFc1NVRkJRU3hSUVVGQkxFZEJRVUVzWlVGQlFTeERRVUZCTEU5QlFVRXNRMEZCUVN4VlFVRkJMRU5CUVVFc1EwRkJRVHM3UVVGRFFTeEpRVUZCTEU5QlFVRXNSMEZCUVN4bFFVRkJMRU5CUVVFc1QwRkJRU3hEUVVGQkxGTkJRVUVzUTBGQlFTeERRVUZCT3p0QlFVZEJMRWxCUVVFc1pVRkJRU3hIUVVGQkxGbEJRVUVzUTBGQlFTeFBRVUZCTEVOQlFVRXNiVUpCUVVFc1EwRkJRU3hEUVVGQk96dEJRVU5CTEVsQlFVRXNUVUZCUVN4SFFVRkJMR1ZCUVVFc1EwRkJRU3hQUVVGQkxFTkJRVUVzVVVGQlFTeERRVUZCTEVOQlFVRTdPMEZCUTBFc1NVRkJRU3hQUVVGQkxFZEJRVUVzVDBGQlFTeERRVUZCTEZOQlFVRXNRMEZCUVRzN1FVRkZRU3hKUVVGQkxGVkJRVUVzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRkJMRmxCUVVFc1EwRkJRU3hEUVVGQk8wRkJSVUU3T3pzN096dEpRVWxOTEUwN096czdPMEZCTmtOTU96czdPenRCUVV0QkxHOUNRVUY1UXp0QlFVRkJPenRCUVVGQkxGRkJRVGRDTEUxQlFUWkNMSFZGUVVGR0xFVkJRVVU3TzBGQlFVRTdPMEZCUTNoRE8wRkJWazhzVlVGQlFTeE5RVUZCTEVkQlFUUkNMRWxCUVVrc1ZVRkJRU3hEUVVGQkxFOUJRVW9zUlVGQk5VSTdRVUZEUVN4VlFVRkJMRWxCUVVFc1IwRkJNRUlzU1VGQlNTeFZRVUZCTEVOQlFVRXNUMEZCU2l4RlFVRXhRanRCUVVOQkxGVkJRVUVzVTBGQlFTeEhRVUZ4UWl4TFFVRnlRanRCUVZOUUxGVkJRVXNzU1VGQlRDeEhRVUZaTEUxQlFVMHNRMEZCUXl4SlFVRnVRanRCUVVOQkxGVkJRVXNzVFVGQlRDeEhRVUZqTEUxQlFVMHNRMEZCUXl4TlFVRnlRanM3UVVGRFFTeFJRVUZMTEUxQlFVc3NTVUZCVEN4SlFVRmhMRWxCUVdRc1RVRkJlVUlzVFVGQlN5eE5RVUZNTEVsQlFXVXNTVUZCZUVNc1EwRkJTaXhGUVVGdFJEdEJRVU5zUkN4WlFVRk5MRWxCUVVrc1MwRkJTaXhEUVVGVkxEUkpRVUZXTEVOQlFVNDdRVUZEUVRzN1FVRkRSQ3hWUVVGTExFbEJRVXdzUjBGQldTeE5RVUZOTEVOQlFVTXNTVUZCVUN4SlFVRmxMRWxCUVVrc1ZVRkJRU3hEUVVGQkxFOUJRVW9zUlVGQk0wSXNRMEZRZDBNc1EwRlBWenM3UVVGRGJrUXNWVUZCU3l4VFFVRk1MRWRCUVdsQ0xFMUJRVTBzUTBGQlF5eGhRVUZRTEVOQlFYRkNMRTFCUVUwc1EwRkJReXhUUVVFMVFpeERRVUZxUWp0QlFVTkJMRlZCUVVzc1RVRkJUQ3hIUVVGakxFMUJRVTBzUTBGQlF5eFZRVUZRTEVOQlFXdENMRTFCUVUwc1EwRkJReXhOUVVGNlFpeERRVUZrTzBGQlEwRXNWVUZCU3l4UFFVRk1MRWRCUVdVc1RVRkJUU3hEUVVGRExGZEJRVkFzUTBGQmJVSXNUVUZCVFN4RFFVRkRMRTlCUVRGQ0xFTkJRV1k3UVVGRFFTeFZRVUZMTEV0QlFVd3NSMEZCWVN4TlFVRk5MRU5CUVVNc1MwRkJVQ3hwUTBGQllqdEJRVU5CTEZWQlFVc3NUMEZCVEN4SFFVRmxMRTFCUVUwc1EwRkJReXhOUVVGUUxFbEJRV2xDTEUxQlFVc3NSMEZCVEN4RFFVRlRMRWxCUVVrc1ZVRkJRU3hEUVVGQkxFOUJRVW9zUlVGQlZDeERRVUZvUXpzN1FVRkRRU3hWUVVGTExFZEJRVXdzUTBGQlV5eE5RVUZMTEVsQlFVd3NRMEZCVlN4WFFVRldMRU5CUVhOQ0xFMUJRWFJDTEVOQlFUWkNMRTFCUVVzc1RVRkJiRU1zWjBOQlFWUTdPMEZCWW5kRE8wRkJZM2hETzBGQlJVUTdPenM3T3pzN096dEJRWGRDUVRzN08yOURRVWRoTzBGQlExb3NWVUZCU1N4TFFVRkxMRk5CUVZRc1JVRkJiMEk3UVVGRGJrSXNZMEZCVFN4SlFVRkpMRXRCUVVvc1EwRkJWU3h6UkVGQlZpeERRVUZPTzBGQlEwRTdPMEZCUTBRc1ZVRkJUU3hOUVVGTkxFZEJRVWNzUzBGQlN5eFBRVUZNTEVOQlFXRXNSMEZCWWl4RlFVRm1PenRCUVVOQkxGVkJRVWtzVFVGQlRTeEpRVUZKTEVsQlFXUXNSVUZCYjBJN1FVRkRia0lzVVVGQlFTeE5RVUZOTEVOQlFVTXNUMEZCVUR0QlFVTkJPenRCUVVORU8wRkJRMEU3UVVGRlJEczdPenM3T3paQ1FVZE5PMEZCUTB3c1ZVRkJTU3hMUVVGTExGTkJRVlFzUlVGQmIwSTdRVUZEYmtJc1kwRkJUU3hKUVVGSkxFdEJRVW9zUTBGQlZTeHhSVUZEWml4MVJrRkVTeXhEUVVGT08wRkJSVUU3TzBGQlEwUXNWMEZCU3l4VFFVRk1MRWRCUVdsQ0xFbEJRV3BDTzBGQlEwRXNWVUZCVFN4SlFVRkpMRWRCUVVjc1MwRkJTeXhKUVVGTUxFTkJRVlVzUjBGQlZpeEZRVUZpTzBGQlEwRXNWVUZCVFN4SlFVRkpMRWRCUVdNc1NVRkJTU3hKUVVGSkxFbEJRVlFzUjBGQmFVSXNTVUZCYWtJc1IwRkJkMElzUzBGQlN5eFRRVUZNTEVOQlFXVXNTVUZCWml4RFFVRnZRaXhMUVVGTExFdEJRWHBDTEVWQlFXZERMRWxCUVdoRExFTkJRUzlETzBGQlEwRXNWVUZCVFN4TFFVRkxMRWRCUVVrc1NVRkJTU3hKUVVGSkxFbEJRVlFzUjBGQmEwSXNTVUZCU1N4RFFVRkRMRU5CUVVRc1EwRkJTaXhKUVVGWExFVkJRVGRDTEVkQlFXMURMRVZCUVdwRU8wRkJRMEVzVlVGQlRTeEhRVUZITEVkQlFVa3NTVUZCU1N4SlFVRkpMRWxCUVZRc1IwRkJhMElzU1VGQlNTeERRVUZETEVOQlFVUXNRMEZCU2l4SlFVRlhMRWxCUVRkQ0xFZEJRWEZETEVsQlFXcEVPenRCUVVOQkxGVkJRVWtzUzBGQlN5eExRVUZMTEV0QlFVc3NTMEZCVEN4RFFVRlhMRWRCUVZnc1JVRkJaQ3hGUVVGblF6dEJRVU12UWl4aFFVRkxMRWxCUVV3c1EwRkJWU3hIUVVGV0xFTkJRV01zUjBGQlpEdEJRVU5CTEU5QlJrUXNUVUZGVHp0QlFVTk9MRmxCUVUwc1RVRkJUU3hIUVVGSExFdEJRVXNzVFVGQlRDeERRVUZaTEVkQlFWb3NSVUZCWmpzN1FVRkRRU3haUVVGSkxFMUJRVTBzU1VGQlNTeEpRVUZrTEVWQlFXOUNPMEZCUTI1Q0xHVkJRVXNzVDBGQlRDeERRVUZoTEVkQlFXSXNRMEZCYVVJc1NVRkJha0k3TzBGQlEwRXNWVUZCUVN4TlFVRk5MRU5CUVVNc1QwRkJVRHRCUVVOQk96dEJRVU5FTEdGQlFVc3NTVUZCVEN4RFFVRlZMRWRCUVZZc1EwRkJZeXhIUVVGa096dEJRVU5CTEdGQlFVc3NUVUZCVEN4RFFVRlpMRWRCUVZvc1EwRkJaMElzUzBGQmFFSTdPMEZCUTBFc1lVRkJTeXhQUVVGTUxFTkJRV0VzUjBGQllpeERRVUZwUWl4TFFVRkxMRTlCUVV3c1EwRkJZU3hKUVVGaUxFTkJRV3RDTEV0QlFVc3NTMEZCZGtJc1JVRkJPRUlzUzBGQk9VSXNSVUZCY1VNc1MwRkJTeXhKUVVFeFF5eExRVUZ0UkN4SlFVRndSVHRCUVVOQk96dEJRVU5FTEZkQlFVc3NVMEZCVEN4SFFVRnBRaXhMUVVGcVFqdEJRVU5CTzBGQlJVUTdPenM3T3pzN096dDVRa0ZOU3l4TExFVkJRV1VzUnl4RlFVRlhPMEZCUXpsQ0xHRkJRVThzUzBGQlN5eE5RVUZNTEVOQlFWa3NTVUZCV2l4RFFVRnBRaXhMUVVGTExFdEJRWFJDTEVWQlFUWkNMRXRCUVRkQ0xFVkJRVzlETEVkQlFYQkRMRU5CUVZBN1FVRkRRVHRCUVVWRU96czdPenM3T3pzN1owTkJUVmtzU1N4RlFVRlpPMEZCUTNaQ0xHRkJRVThzUzBGQlN5eE5RVUZNTEVkQlFXTXNTMEZCU3l4TlFVRk1MRU5CUVZrc1YwRkJXaXhEUVVGM1FpeExRVUZMTEUxQlFVd3NRMEZCV1N4SlFVRmFMRU5CUVdsQ0xFdEJRVXNzU1VGQmRFSXNSVUZCTkVJc1NVRkJOVUlzUTBGQmVFSXNRMEZCWkN4SFFVRXlSU3hKUVVGc1JqdEJRVU5CTzBGQlJVUTdPenM3T3pzN096WkNRVXRUTEVrc1JVRkJZeXhaTEVWQlFYTkNPMEZCUXpWRExFMUJRVUVzVFVGQlRTeERRVUZETEZGQlFWQXNRMEZCWjBJc1NVRkJhRUlzUlVGQmMwSXNTVUZCZEVJc1JVRkJORUlzV1VGQk5VSTdRVUZEUVRzN08zZENRWHBHVXp0QlFVTlVMR0ZCUVU4c1MwRkJTeXhQUVVGYU8wRkJRMEU3UVVGRlJEczdPenM3T3p0M1FrRkpVenRCUVVOU0xHRkJRVThzUzBGQlN5eE5RVUZhTzBGQlEwRTdRVUZGUkRzN096czdPenQzUWtGSlR6dEJRVU5PTEdGQlFVOHNTMEZCU3l4SlFVRmFPMEZCUTBFN096czdSVUY0UmpCRExFOUJRVUVzUTBGQlFTeFBPenRCUVd0TE5VTXNUMEZCUVN4RFFVRkJMRTlCUVVFc1IwRkJaU3hOUVVGbU96dEJRVVZCTEVOQlFVRXNWVUZCVlN4TlFVRldMRVZCUVdkQ08wRkJRMlk3T3p0QlFVZGhMRVZCUVVFc1RVRkJRU3hEUVVGQkxHbENRVUZCTEVkQlFXOUNMR3REUVVGd1FqdEJRVVZpT3pzN08wRkJSMkVzUlVGQlFTeE5RVUZCTEVOQlFVRXNZMEZCUVN4SFFVRnBRaXhIUVVGcVFqdEJRVEpJWWpzN096czdPenM3UVVGUFFTeFhRVUZuUWl4aFFVRm9RaXhIUVVFclJUdEJRVUZCTEZGQlFXcEVMRk5CUVdsRUxIVkZRVUZxUWl4TlFVRkJMRU5CUVVFc2FVSkJRV2xDT3p0QlFVTTVSU3hSUVVGSkxFOUJRVThzVTBGQlVDeExRVUZ4UWl4VlFVRjZRaXhGUVVGeFF6dEJRVU53UXl4aFFVRlBMRk5CUVZBN1FVRkRRVHM3UVVGRFJDeFhRVUZQTEZWQlFWVXNTVUZCVml4RlFVRnpRanRCUVVNMVFpeFZRVUZOTEUxQlFVMHNSMEZCUnl4VFFVRlRMRU5CUVVNc1NVRkJWaXhEUVVGbExFbEJRVWtzU1VGQlNTeEZRVUYyUWl4RFFVRm1PMEZCUTBFc1lVRkJUeXhOUVVGTkxFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUkN4RFFVRlFMRVZCUVZrc1QwRkJRU3hEUVVGQkxFbEJRVUVzUTBGQlN5eFZRVUZWTEVOQlFVTXNTVUZCV0N4RFFVRm5RaXhOUVVGTkxFTkJRVU1zUzBGQlVDeERRVUZoTEVOQlFXSXNRMEZCYUVJc1JVRkJhVU1zVDBGQlFTeERRVUZCTEZGQlFXcERMRU5CUVV3c1JVRkJhVVFzU1VGQmFrUXNRMEZCV2l4RFFVRklMRWRCUVhsRkxFbEJRWFJHTzBGQlEwRXNTMEZJUkR0QlFVbEJPenRCUVZKbExFVkJRVUVzVFVGQlFTeERRVUZCTEdGQlFVRXNSMEZCWVN4aFFVRmlPMEZCVldoQ096czdPenM3T3pzN1FVRlJRU3hYUVVGblFpeFZRVUZvUWl4SFFVRnRSVHRCUVVGQkxGRkJRWGhETEUxQlFYZERMSFZGUVVGa0xFMUJRVUVzUTBGQlFTeGpRVUZqT3p0QlFVTnNSU3hSUVVGSkxFOUJRVThzVFVGQlVDeExRVUZyUWl4VlFVRjBRaXhGUVVGclF6dEJRVU5xUXl4aFFVRlBMRTFCUVZBN1FVRkRRVHM3UVVGRFJDeFJRVUZOTEU5QlFVOHNSMEZCUnl4SlFVRkpMRTFCUVVvc1EwRkJWeXhUUVVGVExFMUJRVTBzUTBGQlF5eFBRVUZRTEVOQlFXVXNjVUpCUVdZc1JVRkJjME1zVFVGQmRFTXNRMEZCVkN4SFFVRjVSQ3hKUVVGd1JTeERRVUZvUWp0QlFVTkJMRmRCUVU4c1ZVRkJWU3hMUVVGV0xFVkJRV2xDTEVkQlFXcENMRVZCUVc5Q08wRkJRekZDTEdGQlFVOHNRMEZCUXl4SFFVRkVMRWRCUVU4c1MwRkJVQ3hIUVVGblFpeEhRVUZITEVOQlFVTXNUVUZCU2l4RFFVRlhMRU5CUVZnc1RVRkJhMElzUjBGQmJrSXNSMEZCTWtJc1MwRkJTeXhIUVVGSExFZEJRVzVETEVkQlFUSkRMRXRCUVVzc1IwRkJSeXhOUVVGU0xFZEJRV2xDTEVkQlFVY3NRMEZCUXl4UFFVRktMRU5CUVZrc1QwRkJXaXhGUVVGeFFpeEZRVUZ5UWl4RFFVRnNSanRCUVVOQkxFdEJSa1E3UVVGSFFUczdRVUZTWlN4RlFVRkJMRTFCUVVFc1EwRkJRU3hWUVVGQkxFZEJRVlVzVlVGQlZqdEJRVlZvUWpzN096czdPMEZCUzBFc1YwRkJaMElzVjBGQmFFSXNSMEZCTUVVN1FVRkJRU3hSUVVFelF5eFBRVUV5UXl4MVJVRkJSaXhGUVVGRk96dEJRVU42UlN4UlFVRkpMRTlCUVU4c1QwRkJVQ3hMUVVGdFFpeFZRVUYyUWl4RlFVRnRRenRCUVVOc1F5eGhRVUZQTEU5QlFWQTdRVUZEUVRzN1FVRkRSQ3hSUVVGTkxFMUJRVTBzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUVUZCVWl4SlFVRnJRaXhGUVVGcVF6dEJRVU5CTEZkQlFVOHNWVUZCY1VJc1MwRkJja0lzUlVGQmIwTXNSMEZCY0VNc1JVRkJlVVE3UVVGREwwUXNZVUZCVHl4TlFVRk5MRU5CUVVNc1MwRkJSQ3hEUVVGT0xFZEJRV2RDTEUxQlFVMHNRMEZCUXl4TFFVRkVMRU5CUVU0c1EwRkJZeXhKUVVGa0xFTkJRVzFDTEVsQlFXNUNMRVZCUVhsQ0xFZEJRWHBDTEVOQlFXaENMRWRCUTA0c1QwRkJUeXhEUVVGRExGRkJRVklzUjBGQmJVSXNUMEZCVHl4RFFVRkRMRkZCUVZJc1EwRkJhVUlzU1VGQmFrSXNRMEZCYzBJc1NVRkJkRUlzUlVGQk5FSXNTMEZCTlVJc1JVRkJiVU1zUjBGQmJrTXNRMEZCYmtJc1IwRkJOa1FzU1VGRU9VUTdRVUZGUVN4TFFVaEVPMEZCU1VFN08wRkJWR1VzUlVGQlFTeE5RVUZCTEVOQlFVRXNWMEZCUVN4SFFVRlhMRmRCUVZnN1FVRlhhRUk3T3pzN096czdPMEZCVDBFc1YwRkJaMElzVjBGQmFFSXNRMEZCTkVJc1NVRkJOVUlzUlVGQk1FTXNUVUZCTVVNc1JVRkJPRVE3UVVGRE4wUXNWMEZCVHl4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRExGZEJRVkFzUTBGQmJVSXNTVUZCYmtJc1EwRkJTQ3hIUVVFNFFpeEpRVUV6UXp0QlFVTkJPenRCUVVabExFVkJRVUVzVFVGQlFTeERRVUZCTEZkQlFVRXNSMEZCVnl4WFFVRllPMEZCU1doQ096czdPenM3TzBGQlRVRXNWMEZCWjBJc1VVRkJhRUlzUTBGQmVVSXNTVUZCZWtJc1JVRkJkVU1zVFVGQmRrTXNSVUZCTmtRc1dVRkJOMFFzUlVGQmJVWTdRVUZEYkVZc1VVRkJTVHRCUVVOSUxFMUJRVUVzU1VGQlNTeEhRVUZITEZkQlFWY3NRMEZCUXl4SlFVRkVMRVZCUVU4c1RVRkJVQ3hEUVVGc1FqczdRVUZEUVN4VlFVRkpMRTFCUVVFc1EwRkJRU3hQUVVGQkxFTkJRVXNzVVVGQlZDeEZRVUZ0UWp0QlFVTnNRaXhqUVVGTkxFbEJRVWtzUzBGQlNpeERRVUZWTEhGRFFVTm1MSFZHUVVSTExFTkJRVTQ3UVVGRlFUdEJRVU5FTEV0QlRrUXNRMEZOUlN4UFFVRlBMRU5CUVZBc1JVRkJWVHRCUVVOWUxGbEJRVTBzU1VGQlNTeExRVUZLTEVOQlFWVXNkME5CUVhkRExFbEJRWGhETEVkQlFTdERMRWxCUVM5RExFZEJRWE5FTEVOQlFVTXNRMEZCUXl4UFFVRnNSU3hEUVVGT08wRkJRMEU3TzBGQlEwUXNTVUZCUVN4TlFVRkJMRU5CUVVFc1QwRkJRU3hEUVVGTExFZEJRVXdzUTBGQlV5eEpRVUZVTEVWQlFXVXNXVUZCWmp0QlFVTkJPenRCUVZobExFVkJRVUVzVFVGQlFTeERRVUZCTEZGQlFVRXNSMEZCVVN4UlFVRlNPMEZCWVdoQ096czdPMEZCY2s1bExFMUJkMDVHTEZWQmVFNUZPMEZCUVVFN08wRkJRVUU3TzBGQmVVNWtPenM3T3pzN08wRkJUMEVzZDBKQlFXOUNMRWxCUVhCQ0xFVkJRVEJETEUxQlFURkRMRVZCUVhkRkxGbEJRWGhGTEVWQlFUaEdPMEZCUVVFN08wRkJRVUU3TzBGQlF6ZEdPMEZCUkcxQ0xHRkJRVUVzU1VGQlFTeEhRVUZCTEVsQlFVRTdRVUZCYzBJc1lVRkJRU3hOUVVGQkxFZEJRVUVzVFVGQlFUdEJRVUU0UWl4aFFVRkJMRmxCUVVFc1IwRkJRU3haUVVGQk8wRkJSWFpGTEUxQlFVRXNUMEZCUVN4RFFVRkJMRTlCUVVFc1EwRkJUU3hEUVVGT0xFVkJRVk1zVDBGQlN5eEhRVUZNTEVOQlFWTXNTVUZCU1N4aFFVRkJMRU5CUVVFc1QwRkJTaXhGUVVGVUxFTkJRVlFzUlVGQmMwTXNTVUZCZEVNc1EwRkJNa01zV1VGQlN6dEJRVU12UXl4UlFVRkJMRkZCUVZFc1EwRkJReXhQUVVGTExFbEJRVTRzUlVGQldTeFBRVUZMTEUxQlFXcENMRVZCUVhsQ0xFOUJRVUVzUTBGQlFTeEpRVUZCTEVOQlFVc3NUMEZCU3l4WlFVRldMRVZCUVhkQ0xFbEJRWGhDTEVOQlFYcENMRU5CUVZJN1FVRkRRU3hQUVVaRU8wRkJSalpHTzBGQlN6ZEdPenRCUVhKUFlUdEJRVUZCTEVsQmQwNXBRaXhYUVVGQkxFTkJRVUVzVDBGNFRtcENPenRCUVhkT1JpeEZRVUZCTEUxQlFVRXNRMEZCUVN4VlFVRkJMRWRCUVZVc1ZVRkJWanRCUVdkQ1lqczdPenM3T3pzN08wRkJlRTlsTEUxQloxQkdMRWxCYUZCRk8wRkJRVUU3TzBGQlFVRTdPMEZCYVZGa096czdPMEZCU1VFc2EwSkJRVmtzVFVGQldpeEZRVUVyUWp0QlFVRkJPenRCUVVGQk96dEJRVU01UWp0QlFXNUNUeXhoUVVGQkxGbEJRVUVzUjBGQlpTeExRVUZtTEVOQmEwSjFRaXhEUVd4Q1JEczdRVUZEZEVJc1lVRkJRU3hUUVVGQkxFZEJRVmtzUzBGQldpeERRV2xDZFVJc1EwRnFRa283TzBGQmJVSXhRaXhoUVVGTExGbEJRVXdzUjBGQmIwSXNUVUZCVFN4RFFVRkRMRmxCUVROQ08wRkJSVUVzVlVGQlRTeFJRVUZSTEVkQlFVY3NWVUZCVlN4RFFVRkRMRXRCUVZnc1EwRkJhVUlzVFVGQlRTeERRVUZETEUxQlFYaENMRVZCUVdkRExFOUJRVUVzUTBGQlFTeFJRVUZvUXl4RFFVRnFRanRCUVVOQkxHRkJRVXNzVFVGQlRDeEhRVUZqTEdWQlFXVXNRMEZCUXl4SFFVRm9RaXhEUVVGdlFpeFJRVUZ3UWl4RlFVRTRRanRCUVVGQkxHVkJRVTBzU1VGQlNTeFZRVUZCTEVOQlFVRXNUMEZCU2l4RlFVRk9PMEZCUVVFc1QwRkJPVUlzUTBGQlpEdEJRVU5CTEdGQlFVc3NVMEZCVEN4SFFVRnBRaXhsUVVGbExFTkJRVU1zUjBGQmFFSXNRMEZCYjBJc1VVRkJjRUlzUlVGQk9FSTdRVUZCUVN4bFFVRk5MRWxCUVVrc1ZVRkJRU3hEUVVGQkxFOUJRVW9zUTBGQllTeE5RVUZOTEVOQlFVTXNVVUZCVUN4TFFVRnZRaXhKUVVGcVF5eERRVUZPTzBGQlFVRXNUMEZCT1VJc1EwRkJha0k3TzBGQlJVRXNWVUZCU1N4TlFVRk5MRU5CUVVNc1VVRkJVQ3hKUVVGdlFpeFBRVUZQTEUxQlFVMHNRMEZCUXl4UlFVRmtMRXRCUVRKQ0xGTkJRVzVFTEVWQlFTdEVPMEZCUXpsRUxGRkJRVUVzVFVGQlRTeERRVUZETEZGQlFWQXNRMEZCWjBJc1QwRkJhRUlzUTBGQmQwSXNWVUZCUXl4TFFVRkVMRVZCUVZVN1FVRkRha01zYVVKQlFVc3NVMEZCVEN4RFFVRmxMRXRCUVdZc1JVRkJjMElzUjBGQmRFSXNRMEZCTUVJc1NVRkJNVUk3UVVGRFFTeFRRVVpFTzBGQlIwRTdPMEZCUlVRc1RVRkJRU3hsUVVGbExFTkJRVU1zVDBGQmFFSXNRMEZCZDBJc1QwRkJTeXhUUVVFM1FpeEZRVUYzUXl4VlFVRkRMRkZCUVVRc1JVRkJWeXhMUVVGWUxFVkJRVzlDTzBGQlF6TkVMR1ZCUVVzc1IwRkJUQ3hEUVVGVExGRkJRVkVzUTBGQlF5eFhRVUZVTEVOQlFYRkNMRTFCUVhKQ0xFTkJRVFJDTEZWQlFVTXNUVUZCUkN4RlFVRlhPMEZCUXk5RExHTkJRVWtzVFVGQlRTeERRVUZETEV0QlFWQXNTVUZCWjBJc1EwRkJReXhQUVVGTExGTkJRVEZDTEVWQlFYRkRPMEZCUTNCRExHMUNRVUZMTEUxQlFVd3NRMEZCV1N4UlFVRmFMRU5CUVhGQ0xFdEJRWEpDTzBGQlEwRTdRVUZEUkN4VFFVcFJMRU5CUVZRN1FVRkxRU3hQUVU1RU8wRkJVVUVzWVVGQlN5eE5RVUZNTEVkQlFXTXNUMEZCU3l4SFFVRk1MRU5CUVZNc1NVRkJTU3hOUVVGS0xFTkJRWGRDTzBGQlF6bERMRkZCUVVFc1NVRkJTU3hGUVVGRkxFMUJRVTBzUTBGQlF5eEpRVVJwUXp0QlFVVTVReXhSUVVGQkxFMUJRVTBzUlVGQlJTeE5RVUZOTEVOQlFVTXNUVUZHSzBJN1FVRkhPVU1zVVVGQlFTeEpRVUZKTEVWQlFVVXNUVUZCVFN4RFFVRkRMRWxCU0dsRE8wRkJTVGxETEZGQlFVRXNUMEZCVHl4RlFVRkZMR2xDUVVGRExFdEJRVVFzUlVGQlVTeEhRVUZTTEVWQlFXVTdRVUZEZGtJc1kwRkJUU3hKUVVGSkxFZEJRVWNzVDBGQlN5eE5RVUZNTEVOQlFWa3NTMEZCV2l4RFFVRmlPenRCUVVOQkxHTkJRVWtzUTBGQlF5eEpRVUZNTEVWQlFWYzdRVUZEVml4dFFrRkJVU3hEUVVGRExFOUJRVXNzV1VGQlRpeEpRVUZ6UWl4UFFVRkxMRmxCUVRWQ0xFZEJRMDRzU1VGQlNTeFZRVUZLTEVOQlFXVXNUMEZCU3l4WlFVRndRaXhGUVVGclF5eFBRVUZMTEUxQlFYWkRMRU5CUkUwc1IwRkRNa01zU1VGRWJFUTdRVUZGUVRzN1FVRkRSQ3hwUWtGQlN5eFRRVUZNTEVkQlFXbENMRWxCUVdwQ08wRkJRMEVzWTBGQlRTeFJRVUZSTEVkQlFVY3NTVUZCU1N4WlFVRktMRU5CUVdsQ0xFOUJRVXNzVFVGQmRFSXNSVUZCT0VJc1IwRkJPVUlzUlVGQmJVTXNTVUZCYmtNc1JVRkJlVU1zVDBGQlN5eFRRVUZNTEVOQlFXVXNTMEZCWml4RFFVRjZReXhEUVVGcVFqdEJRVU5CTEdsQ1FVRkxMRk5CUVV3c1IwRkJhVUlzUzBGQmFrSTdRVUZEUVN4cFFrRkJUeXhSUVVGUU8wRkJRMEU3UVVGa05rTXNUMEZCZUVJc1EwRkJWQ3hEUVVGa096dEJRV2RDUVN4aFFVRkxMRTFCUVV3c1EwRkJXU3hOUVVGYU96dEJRVU5CTEdGQlFVc3NXVUZCVEN4SFFVRnZRaXhKUVVGd1FqdEJRWFpET0VJN1FVRjNRemxDTzBGQlJVUTdPenM3T3p0QlFTOVRZenRCUVVGQk8wRkJRVUVzTUVKQmJWUk1PMEZCUTFJc1pVRkJUeXhMUVVGTExFMUJRVm83UVVGRFFUdEJRVVZFT3pzN08wRkJkbFJqTzBGQlFVRTdRVUZCUVN3d1FrRXdWRVk3UVVGRFdDeGxRVUZQTEV0QlFVc3NVMEZCV2p0QlFVTkJPMEZCTlZSaE96dEJRVUZCTzBGQlFVRXNTVUZuVUZjc1QwRkJRU3hEUVVGQkxFOUJhRkJZT3p0QlFXZFFSaXhGUVVGQkxFMUJRVUVzUTBGQlFTeEpRVUZCTEVkQlFVa3NTVUZCU2pzN1FVRm9VRVVzVFVGMVYxUXNXVUYyVjFNN1FVRkJRVHM3UVVGQlFUczdRVUYzVjJRc01FSkJRVzlDTEUxQlFYQkNMRVZCUVhsRExGVkJRWHBETEVWQlEwY3NWVUZFU0N4RlFVTnJReXhSUVVSc1F5eEZRVU00UkR0QlFVRkJPenRCUVVGQk96dEJRVU0zUkR0QlFVWnRRaXhoUVVGQkxFMUJRVUVzUjBGQlFTeE5RVUZCT3p0QlFVZHVRaXhoUVVGTExFZEJRVXdzUTBGQlV5eEpRVUZKTEZGQlFVRXNRMEZCUVN4UFFVRktMRU5CUVZjc1ZVRkJXQ3hGUVVGMVFpeFZRVUYyUWl4RFFVRlVPenRCUVVOQkxFMUJRVUVzVVVGQlVTeERRVUZETEVkQlFWUXNRMEZCWVN4SlFVRmlPenRCUVVOQkxHRkJRVXNzUjBGQlRDeERRVUZUTEZGQlFWRXNRMEZCUXl4WFFVRlVMRU5CUVhGQ0xFMUJRWEpDTEVOQlFUUkNMRmxCUVVzN1FVRkRla01zWlVGQlN5eE5RVUZNTEVOQlFWa3NVVUZCV2l4RFFVRnhRaXhGUVVGeVFqdEJRVU5CTEU5QlJsRXNRMEZCVkRzN1FVRktOa1E3UVVGUE4wUTdPMEZCYUZoaE8wRkJRVUVzU1VGMVYxa3NUMEZCUVN4RFFVRkJMRTlCZGxkYU8wRkJhMWhtTEVOQmJGaEVMRVZCUVZVc1RVRkJUU3hMUVVGT0xFMUJRVTBzUjBGQlFTeEZRVUZCTEVOQlFXaENJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlwY2JrMUpWQ0JNYVdObGJuTmxYRzVjYmtOdmNIbHlhV2RvZENBb1l5a2dNakF5TUNCRloyOXlJRTVsY0c5dGJubGhjMk5vYVdoY2JseHVVR1Z5YldsemMybHZiaUJwY3lCb1pYSmxZbmtnWjNKaGJuUmxaQ3dnWm5KbFpTQnZaaUJqYUdGeVoyVXNJSFJ2SUdGdWVTQndaWEp6YjI0Z2IySjBZV2x1YVc1bklHRWdZMjl3ZVZ4dWIyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVWdYQ0pUYjJaMGQyRnlaVndpS1N3Z2RHOGdaR1ZoYkZ4dWFXNGdkR2hsSUZOdlpuUjNZWEpsSUhkcGRHaHZkWFFnY21WemRISnBZM1JwYjI0c0lHbHVZMngxWkdsdVp5QjNhWFJvYjNWMElHeHBiV2wwWVhScGIyNGdkR2hsSUhKcFoyaDBjMXh1ZEc4Z2RYTmxMQ0JqYjNCNUxDQnRiMlJwWm5rc0lHMWxjbWRsTENCd2RXSnNhWE5vTENCa2FYTjBjbWxpZFhSbExDQnpkV0pzYVdObGJuTmxMQ0JoYm1RdmIzSWdjMlZzYkZ4dVkyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRDQndaWEp6YjI1eklIUnZJSGRvYjIwZ2RHaGxJRk52Wm5SM1lYSmxJR2x6WEc1bWRYSnVhWE5vWldRZ2RHOGdaRzhnYzI4c0lITjFZbXBsWTNRZ2RHOGdkR2hsSUdadmJHeHZkMmx1WnlCamIyNWthWFJwYjI1ek9seHVYRzVVYUdVZ1lXSnZkbVVnWTI5d2VYSnBaMmgwSUc1dmRHbGpaU0JoYm1RZ2RHaHBjeUJ3WlhKdGFYTnphVzl1SUc1dmRHbGpaU0J6YUdGc2JDQmlaU0JwYm1Oc2RXUmxaQ0JwYmlCaGJHeGNibU52Y0dsbGN5QnZjaUJ6ZFdKemRHRnVkR2xoYkNCd2IzSjBhVzl1Y3lCdlppQjBhR1VnVTI5bWRIZGhjbVV1WEc1Y2JsUklSU0JUVDBaVVYwRlNSU0JKVXlCUVVrOVdTVVJGUkNCY0lrRlRJRWxUWENJc0lGZEpWRWhQVlZRZ1YwRlNVa0ZPVkZrZ1QwWWdRVTVaSUV0SlRrUXNJRVZZVUZKRlUxTWdUMUpjYmtsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBZZ1RVVlNRMGhCVGxSQlFrbE1TVlJaTEZ4dVJrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzVCVlZSSVQxSlRJRTlTSUVOUFVGbFNTVWRJVkNCSVQweEVSVkpUSUVKRklFeEpRVUpNUlNCR1QxSWdRVTVaSUVOTVFVbE5MQ0JFUVUxQlIwVlRJRTlTSUU5VVNFVlNYRzVNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxGeHVUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUaUJVU0VWY2JsTlBSbFJYUVZKRkxseHVLaTljYmx4dWFXMXdiM0owSUNvZ1lYTWdRWEp5WVhsVmRHbHNjeUJtY205dElDY3VMMEZ5Y21GNVZYUnBiSE1uTzF4dWFXMXdiM0owSUVKcGJtUmhZbXhsSUdaeWIyMGdKeTR2UW1sdVpHRmliR1VuTzF4dWFXMXdiM0owSUVOaGJtTmxiRlJ2YTJWdUlHWnliMjBnWENJdUwwTmhibU5sYkZSdmEyVnVYQ0k3WEc1cGJYQnZjblFnUTJ4aGMzTWdabkp2YlNBbkxpOURiR0Z6Y3ljN1hHNXBiWEJ2Y25RZ1EyOXRjRzl1Wlc1MElHWnliMjBnSnk0dlEyOXRjRzl1Wlc1MEp6dGNibWx0Y0c5eWRDQkRiM0JwWlhJZ1puSnZiU0FuTGk5RGIzQnBaWEluTzF4dWFXMXdiM0owSUdSbFptVnlJR1p5YjIwZ1hDSXVMMlJsWm1WeVhDSTdYRzVwYlhCdmNuUWdSR1Z6ZEhKdmVXRmliR1VnWm5KdmJTQW5MaTlFWlhOMGNtOTVZV0pzWlNjN1hHNXBiWEJ2Y25RZ1JHbGpkR2x2Ym1GeWVTQm1jbTl0SUNjdUwwUnBZM1JwYjI1aGNua25PMXh1YVcxd2IzSjBJQ29nWVhNZ1JHbGpkR2x2Ym1GeWVWVjBhV3h6SUdaeWIyMGdKeTR2UkdsamRHbHZibUZ5ZVZWMGFXeHpKenRjYm1sdGNHOXlkQ0JvWVhOb0lHWnliMjBnSnk0dmFHRnphQ2M3WEc1cGJYQnZjblFnZTJSbFptNHNJR2xrWlc1MGFYUjVMQ0JwYzA1dmRFNXBiSDBnWm5KdmJTQW5MaTlwYm1SbGVDYzdYRzVwYlhCdmNuUWdTVkJ5YjNCbGNuUjVJR1p5YjIwZ0p5NHZTVkJ5YjNCbGNuUjVKenRjYm1sdGNHOXlkQ0JRY205d1pYSjBlU0JtY205dElDY3VMMUJ5YjNCbGNuUjVKenRjYmx4dUx5b3FYRzRnS2lCVlVrd2djbTkxZEdWeUxpQkRiMjUyWlhKMGN5QnBibU52YldsdVp5QndZWEowSUc5bUlGVlNUQ0FvYUdGemFDa2dkRzhnWVNCMFlYSm5aWFFnYjJKcVpXTjBJR0Z1WkNCd1lYTnpaWE1nZEdGcGJDQnpkSEpwYm1jZ2RHOGdhWFJjYmlBcUlHWnZjaUJtZFhKMGFHVnlJSEp2ZFhScGJtY3VYRzRnS2k5Y2JtTnNZWE56SUZKdmRYUmxjanhVSUdWNGRHVnVaSE1nUkdWemRISnZlV0ZpYkdVK0lHVjRkR1Z1WkhNZ1EyeGhjM01nZTF4dVhHNWNkQzhxS2x4dVhIUWdLaUJTYjNWMFpYSWdibUZ0WlM0Z1RYVnpkQ0JpWlNCbGNYVmhiQ0IwYnlCMGFHVWdjbTkxZEdVZ2JtRnRaU0JwYmlCMGFHVWdZSEJoY21WdWRHQWdjbTkxZEdWeUxpQlNaWEYxYVhKbFpDQm1iM0lnY0hKdmNHVnlJR0JuWlhSR2RXeHNVR0YwYUdBZ1lXNWtYRzVjZENBcUlHQnlaV1JwY21WamRHQWdiV1YwYUc5a0lIQnliMk5sYzNOcGJtY3VJRkp2YjNRZ2NtOTFkR1Z5SUdSdlpYTWdibTkwSUdoaGRtVWdZU0J1WVcxbExseHVYSFFnS2k5Y2JseDBjbVZoWkc5dWJIa2dibUZ0WlRvZ2MzUnlhVzVuTzF4dVhHNWNkQzhxS2x4dVhIUWdLaUJRWVhKbGJuUWdjbTkxZEdWeUxpQlNaWEYxYVhKbFpDQm1iM0lnY0hKdmNHVnlJR0JuWlhSR2RXeHNVR0YwYUdBZ1lXNWtJR0J5WldScGNtVmpkR0FnYldWMGFHOWtJSEJ5YjJObGMzTnBibWN1SUZKdmIzUWdjbTkxZEdWeUlHUnZaWE1nYm05MElHaGhkbVZjYmx4MElDb2dZU0J3WVhKbGJuUXVYRzVjZENBcUwxeHVYSFJ5WldGa2IyNXNlU0J3WVhKbGJuUTZJRkp2ZFhSbGNqeGhibmsrTzF4dVhHNWNkQzhxS2x4dVhIUWdLaUJRWVhSb0lIUm9ZWFFnZEdobElISnZkWFJsY2lCcGN5QmliM1Z1WkNCMGJ5NGdVR0YwYUNCcGN5QmhJR1pwYm1Gc0lIQmhjblFnYjJZZ1ZWSk1JQ2hvWVhOb0tTQnlaV3hsZG1GdWRDQjBieUIwYUdselhHNWNkQ0FxSUhKdmRYUmxjaTRnUVc1NUlIQmhkR2dnWTJoaGJtZGxJSEpsYzNWc2RITWdhVzRnWUhWd1pHRjBaV0FnYldWMGFHOWtJR05oYkd3dVhHNWNkQ0FxTDF4dVhIUnlaV0ZrYjI1c2VTQndZWFJvT2lCQ2FXNWtZV0pzWlR4emRISnBibWMrTzF4dVhHNWNkQzhxS2x4dVhIUWdLaUJRWVhSb0lITmxjR0Z5WVhSdmNpQm1kVzVqZEdsdmJpQjFjMlZrSUdKNUlIUm9aU0J5YjNWMFpYSXVYRzVjZENBcUwxeHVYSFJ5WldGa2IyNXNlU0J6WlhCaGNtRjBiM0k2SUZKdmRYUmxjaTVUWlhCaGNtRjBiM0k3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkJoZEdnZ2FtOXBibVZ5SUdaMWJtTjBhVzl1SUhWelpXUWdZbmtnZEdobElISnZkWFJsY2k1Y2JseDBJQ292WEc1Y2RISmxZV1J2Ym14NUlHcHZhVzVsY2pvZ1VtOTFkR1Z5TGtwdmFXNWxjanRjYmx4dVhIUXZLaXBjYmx4MElDb2dVbTkxZEdVZ2FHRnVaR3hsY2lCbWRXNWpkR2x2YmlCMWMyVmtJR0o1SUhSb1pTQnliM1YwWlhJdVhHNWNkQ0FxTDF4dVhIUnlaV0ZrYjI1c2VTQm9ZVzVrYkdWeU9pQlNiM1YwWlhJdVNHRnVaR3hsY2p4VVBqdGNibHh1WEhRdktpcGNibHgwSUNvZ1lITmxjR0Z5WVhSdmNtQXNJR0JxYjJsdVpYSmdJR0Z1WkNCZ2FHRnVaR3hsY21BZ1kyRnNiQ0J6WTI5d1pTNWNibHgwSUNvdlhHNWNkSEpsWVdSdmJteDVJSE5qYjNCbE9pQmhibms3WEc1Y2JseDBjSEpwZG1GMFpTQmZkR0Z5WjJWME9pQkpVSEp2Y0dWeWRIazhWRDQ3WEc1Y2RIQnlhWFpoZEdVZ1gzSnZkWFJsT2lCSlVISnZjR1Z5ZEhrOGMzUnlhVzVuUGlBOUlHNWxkeUJRY205d1pYSjBlVHh6ZEhKcGJtYytLQ2s3WEc1Y2RIQnlhWFpoZEdVZ1gyRnlaem9nU1ZCeWIzQmxjblI1UEhOMGNtbHVaejRnUFNCdVpYY2dVSEp2Y0dWeWRIazhjM1J5YVc1blBpZ3BPMXh1WEhSd2NtbDJZWFJsSUY5MWNHUmhkR2x1WnpvZ1ltOXZiR1ZoYmlBOUlHWmhiSE5sTzF4dVhHNWNkQzhxS2x4dVhIUWdLaUJEY21WaGRHVnpJSEp2ZFhSbGNpQnBibk4wWVc1alpTNGdVR3hsWVhObElHNXZkR2xqWlNCMGFHRjBJSFJvWlNCeWIzVjBaWElnWkc5bGMyNG5kQ0J3Y205alpYTnpJR04xY25KbGJuUWdjbTkxZEdVZ2FXMXRaV1JwWVhSbGJIa2diMjVjYmx4MElDb2dhVzVwZEdsaGJHbDZZWFJwYjI0dUlGUnZJSEJ5YjJObGMzTWdkR2hsSUhKdmRYUmxMQ0JqWVd4c0lHQjFjR1JoZEdWZ0lHMWxkR2h2WkM1Y2JseDBJQ29nUUhCaGNtRnRJR052Ym1acFp5QlNiM1YwWlhJZ1kyOXVabWxuZFhKaGRHbHZiaTVjYmx4MElDb3ZYRzVjZEdOdmJuTjBjblZqZEc5eUtHTnZibVpwWnpvZ1VtOTFkR1Z5TGtOdmJtWnBaenhVUGlBOUlIdDlLU0I3WEc1Y2RGeDBjM1Z3WlhJb0tUdGNibHgwWEhSMGFHbHpMbTVoYldVZ1BTQmpiMjVtYVdjdWJtRnRaVHRjYmx4MFhIUjBhR2x6TG5CaGNtVnVkQ0E5SUdOdmJtWnBaeTV3WVhKbGJuUTdYRzVjZEZ4MGFXWWdLQ2gwYUdsekxtNWhiV1VnUFQwZ2JuVnNiQ2tnSVQwOUlDaDBhR2x6TG5CaGNtVnVkQ0E5UFNCdWRXeHNLU2tnZTF4dVhIUmNkRngwZEdoeWIzY2dibVYzSUVWeWNtOXlLRndpVW05MWRHVnlJR052Ym1acFozVnlZWFJwYjI0Z1pYSnliM0k2SUhsdmRTQm9ZWFpsSUhOd1pXTnBabWxsWkNCeWIzVjBaWElnYm1GdFpTQnZjaUJ3WVhKbGJuUXNJR0oxZENCb1lYWmxiaWQwSUhOd1pXTnBabWxsWkNCaGJtOTBhR1Z5TGlCVWFHVnpaU0IwZDI4Z2IzQjBhVzl1Y3lCdGRYTjBJR052YldVZ2RHOW5aWFJvWlhJdVhDSXBPMXh1WEhSY2RIMWNibHgwWEhSMGFHbHpMbkJoZEdnZ1BTQmpiMjVtYVdjdWNHRjBhQ0I4ZkNCdVpYY2dVSEp2Y0dWeWRIazhjM1J5YVc1blBpZ3BPeUF2THlCM1pTQmtiMjRuZENCdmQyNGdhWFFnWW1WallYVnpaU0JwZEhNZ2RtRnNkV1VnYVhNZ1ltVnBibWNnZFhObFpDQnBiaUJrWlhOMGNtOTVUMkpxWldOMElHMWxkR2h2WkNBdElHRm1kR1Z5SUc5M2JtRm5aU0J3YjI5c0lISmxiR1ZoYzJsdVoxeHVYSFJjZEhSb2FYTXVjMlZ3WVhKaGRHOXlJRDBnVW05MWRHVnlMbTFoYTJWVFpYQmhjbUYwYjNJb1kyOXVabWxuTG5ObGNHRnlZWFJ2Y2lrN1hHNWNkRngwZEdocGN5NXFiMmx1WlhJZ1BTQlNiM1YwWlhJdWJXRnJaVXB2YVc1bGNpaGpiMjVtYVdjdWFtOXBibVZ5S1R0Y2JseDBYSFIwYUdsekxtaGhibVJzWlhJZ1BTQlNiM1YwWlhJdWJXRnJaVWhoYm1Sc1pYSW9ZMjl1Wm1sbkxtaGhibVJzWlhJcE8xeHVYSFJjZEhSb2FYTXVjMk52Y0dVZ1BTQmpiMjVtYVdjdWMyTnZjR1VnZkh3Z2RHaHBjenRjYmx4MFhIUjBhR2x6TGw5MFlYSm5aWFFnUFNCamIyNW1hV2N1ZEdGeVoyVjBJSHg4SUhSb2FYTXViM2R1S0c1bGR5QlFjbTl3WlhKMGVUeFVQaWdwS1R0Y2JseDBYSFIwYUdsekxtOTNiaWgwYUdsekxuQmhkR2d1WTJoaGJtZGxSWFpsYm5RdWJHbHpkR1Z1S0hSb2FYTXVkWEJrWVhSbExDQjBhR2x6S1NrN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dVbTkxZEdWeUlIUmhjbWRsZEM0Z1RXRnBiaUJ3ZFhKd2IzTmxJRzltSUhSb1pTQnliM1YwWlhJZ2FYTWdkRzhnWTI5dWRtVnlkQ0JnY0dGMGFHQWdkRzhnWUhSaGNtZGxkR0F1SUVsdUlIQmhjblJwWTNWc1lYSXNJRlZKVW05MWRHVnlYRzVjZENBcUlHTnlaV0YwWlhNZ1EyOXRjRzl1Wlc1MElHbHVjM1JoYm1ObGN5QmlZWE5sWkNCdmJpQmpkWEp5Wlc1MElHQndZWFJvWUNCMllXeDFaU0J6YnlCNWIzVWdZMjkxYkdRZ2NtVnVaR1Z5SUhSb1pXMHVYRzVjZENBcUwxeHVYSFJuWlhRZ2RHRnlaMlYwS0NrNklFSnBibVJoWW14bFBGUStJSHRjYmx4MFhIUnlaWFIxY200Z2RHaHBjeTVmZEdGeVoyVjBPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUVOMWNuSmxiblFnY205MWRHVXVJRVpwY25OMElHTm9kVzVySUc5bUlIUm9aU0J3WVhSb0lHUmxkR1ZqZEdWa0lHSjVJR0J6WlhCaGNtRjBiM0pnSUdaMWJtTjBhVzl1TGlCWmIzVWdZMkZ1SUhkaGRHTm9JSFJvYVhNZ2NISnZjR1Z5ZEhsY2JseDBJQ29nZEc4Z1lXTjBhWFpoZEdVZ1lXNWtJR1JsWVdOMGFYWmhkR1VnYVhSbGJYTWdhVzRnZVc5MWNpQnRaVzUxTGx4dVhIUWdLaTljYmx4MFoyVjBJSEp2ZFhSbEtDazZJRUpwYm1SaFlteGxQSE4wY21sdVp6NGdlMXh1WEhSY2RISmxkSFZ5YmlCMGFHbHpMbDl5YjNWMFpUdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJTWlcxaGFXNWtaWElnYjJZZ1kzVnljbVZ1ZENCeWIzVjBaU0JoWm5SbGNpQmdjMlZ3WVhKaGRHOXlZQ0JtZFc1amRHbHZiaUJqWVd4c0xpQlVhR2x6SUhCeWIzQmxjblI1SUdseklIQmhjM05sWkNCMGJ5QmdhR0Z1Wkd4bGNtQmNibHgwSUNvZ1puVnVZM1JwYjI0Z1lXNWtJR05oYmlCaVpTQndZWE56WldRZ2IzWmxjaUIwYnlCamFHbHNaQ0JqYjIxd2IyNWxiblJ6SUdadmNpQm1kWEowYUdWeUlISnZkWFJwYm1jdVhHNWNkQ0FxTDF4dVhIUm5aWFFnWVhKbktDazZJRUpwYm1SaFlteGxQSE4wY21sdVp6NGdlMXh1WEhSY2RISmxkSFZ5YmlCMGFHbHpMbDloY21jN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dRR2x1YUdWeWFYUkViMk5jYmx4MElDb3ZYRzVjZEdSbGMzUnliM2xQWW1wbFkzUW9LU0I3WEc1Y2RGeDBhV1lnS0hSb2FYTXVYM1Z3WkdGMGFXNW5LU0I3WEc1Y2RGeDBYSFIwYUhKdmR5QnVaWGNnUlhKeWIzSW9YQ0pTYjNWMFpYSWdZMkZ1SUc1dmRDQmlaU0JrWlhOMGNtOTVaV1FnWkhWeWFXNW5JR2wwY3lCMWNHUmhkR1VnWTNsamJHVXVYQ0lwTzF4dVhIUmNkSDFjYmx4MFhIUmpiMjV6ZENCMFlYSm5aWFFnUFNCMGFHbHpMbDkwWVhKblpYUXVaMlYwS0NrN1hHNWNkRngwYVdZZ0tIUmhjbWRsZENBaFBTQnVkV3hzS1NCN1hHNWNkRngwWEhSMFlYSm5aWFF1WkdWemRISnZlU2dwTzF4dVhIUmNkSDFjYmx4MFhIUnpkWEJsY2k1a1pYTjBjbTk1VDJKcVpXTjBLQ2s3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1NYTnpkV1Z6SUhKdmRYUmxJSEJ5YjJObGMzTnBibWN1WEc1Y2RDQXFMMXh1WEhSMWNHUmhkR1VvS1NCN1hHNWNkRngwYVdZZ0tIUm9hWE11WDNWd1pHRjBhVzVuS1NCN1hHNWNkRngwWEhSMGFISnZkeUJ1WlhjZ1JYSnliM0lvWENKRFlXNG5kQ0IxY0dSaGRHVWdjbTkxZEdWeUlHSmxZMkYxYzJVZ2FYUnpJSFZ3WkdGMFpTQmplV05zWlNCcGN5QmhiSEpsWVdSNUlHRmpkR2wyWlM0Z1hDSWdLMXh1WEhSY2RGeDBYSFJjSWxOMVoyZGxjM1FnZFhOcGJtY2dVbTkxZEdWeUxsSmxaR2x5WldOMGIzSWdiM0lnYlc5MmFXNW5JRlZTVENCeVpXUnBjbVZqZEdsdmJpQjBieUJoYmlCaGMzbHVZM0p2Ym05MWN5QmpZV3hzWW1GamF5NWNJaWs3WEc1Y2RGeDBmVnh1WEhSY2RIUm9hWE11WDNWd1pHRjBhVzVuSUQwZ2RISjFaVHRjYmx4MFhIUmpiMjV6ZENCd1lYUm9JRDBnZEdocGN5NXdZWFJvTG1kbGRDZ3BPMXh1WEhSY2RHTnZibk4wSUhCaGFYSTZJSE4wY21sdVoxdGRJRDBnS0hCaGRHZ2dQVDBnYm5Wc2JDa2dQeUJ1ZFd4c0lEb2dkR2hwY3k1elpYQmhjbUYwYjNJdVkyRnNiQ2gwYUdsekxuTmpiM0JsTENCd1lYUm9LVHRjYmx4MFhIUmpiMjV6ZENCeWIzVjBaU0E5SUNod1lXbHlJQ0U5SUc1MWJHd3BJRDhnS0hCaGFYSmJNRjBnZkh3Z1hDSmNJaWtnT2lCY0lsd2lPMXh1WEhSY2RHTnZibk4wSUdGeVp5QTlJQ2h3WVdseUlDRTlJRzUxYkd3cElEOGdLSEJoYVhKYk1WMGdmSHdnYm5Wc2JDa2dPaUJ1ZFd4c08xeHVYSFJjZEdsbUlDaHliM1YwWlNBOVBUMGdkR2hwY3k1eWIzVjBaUzVuWlhRb0tTa2dlMXh1WEhSY2RGeDBkR2hwY3k1ZllYSm5Mbk5sZENoaGNtY3BPMXh1WEhSY2RIMGdaV3h6WlNCN1hHNWNkRngwWEhSamIyNXpkQ0IwWVhKblpYUWdQU0IwYUdsekxuUmhjbWRsZEM1blpYUW9LVHRjYmx4MFhIUmNkR2xtSUNoMFlYSm5aWFFnSVQwZ2JuVnNiQ2tnZTF4dVhIUmNkRngwWEhSMGFHbHpMbDkwWVhKblpYUXVjMlYwS0c1MWJHd3BPMXh1WEhSY2RGeDBYSFIwWVhKblpYUXVaR1Z6ZEhKdmVTZ3BPMXh1WEhSY2RGeDBmVnh1WEhSY2RGeDBkR2hwY3k1ZllYSm5Mbk5sZENoaGNtY3BPMXh1WEhSY2RGeDBkR2hwY3k1ZmNtOTFkR1V1YzJWMEtISnZkWFJsS1R0Y2JseDBYSFJjZEhSb2FYTXVYM1JoY21kbGRDNXpaWFFvZEdocGN5NW9ZVzVrYkdWeUxtTmhiR3dvZEdocGN5NXpZMjl3WlN3Z2NtOTFkR1VzSUhSb2FYTXVYMkZ5WnlrZ2ZId2diblZzYkNrN1hHNWNkRngwZlZ4dVhIUmNkSFJvYVhNdVgzVndaR0YwYVc1bklEMGdabUZzYzJVN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dVbVYwZFhKdWN5QjBhR1VnY21WemRXeDBJRzltSUdCcWIybHVaWEpnSUdaMWJtTjBhVzl1SUdOaGJHd2dabTl5SUhSb2FYTWdjbTkxZEdWeUxseHVYSFFnS2lCQWNHRnlZVzBnY205MWRHVWdVbTkxZEdVZ2JtRnRaUzVjYmx4MElDb2dRSEJoY21GdElHRnlaeUJTWlcxaGFXNWtaWElnYjJZZ2RHaGxJSEJoZEdndVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUVaMWJHd2djR0YwYUM1Y2JseDBJQ292WEc1Y2RHcHZhVzRvY205MWRHVTZJSE4wY21sdVp5d2dZWEpuT2lCemRISnBibWNwT2lCemRISnBibWNnZTF4dVhIUmNkSEpsZEhWeWJpQjBhR2x6TG1wdmFXNWxjaTVqWVd4c0tIUm9hWE11YzJOdmNHVXNJSEp2ZFhSbExDQmhjbWNwTzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGSmxkSFZ5Ym5NZ1puVnNiQ0J3WVhSb0lHRnpJSFJvWlNCeVpYTjFiSFFnYjJZZ1lHcHZhVzVsY21BZ1puVnVZM1JwYjI0Z1kyRnNiQ0JwYmlCZ2NHRnlaVzUwWUNCeWIzVjBaWElnZDJsMGFDQmdibUZ0WldBZ2NHRnpjMlZrSUdGelhHNWNkQ0FxSUdCeWIzVjBaV0FnWVc1a0lHQndZWFJvWUNCd1lYTnpaV1FnWVhNZ1lHRnlaMkF1SUZKbGRIVnlibk1nWUhCaGRHaGdJR2xtSUhSb2FYTWdhWE1nZEdobElISnZiM1FnY205MWRHVnlMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2NHRjBhQ0JRWVhSb0lISmxiR0YwYVhabElIUnZJSFJvYVhNZ2NtOTFkR1Z5TGx4dVhIUWdLaUJBY21WMGRYSnVjeUJHZFd4c0lIQmhkR2dnY21Wc1lYUnBkbVVnZEc4Z2RHaGxJSEp2YjNRZ2NtOTFkR1Z5TGx4dVhIUWdLaTljYmx4MFoyVjBSblZzYkZCaGRHZ29jR0YwYURvZ2MzUnlhVzVuS1RvZ2MzUnlhVzVuSUh0Y2JseDBYSFJ5WlhSMWNtNGdkR2hwY3k1d1lYSmxiblFnUHlCMGFHbHpMbkJoY21WdWRDNW5aWFJHZFd4c1VHRjBhQ2gwYUdsekxuQmhjbVZ1ZEM1cWIybHVLSFJvYVhNdWJtRnRaU3dnY0dGMGFDa3BJRG9nY0dGMGFEdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJKYlcxbFpHbGhkR1ZzZVNCd1pYSm1iM0p0Y3lCMGFHVWdjbVZrYVhKbFkzUnBiMjRzSUdrdVpTNGdjMlYwY3lCZ2FHRnphR0FnZEc4Z1lHZGxkRVoxYkd4UVlYUm9LSEJoZEdncFlDNWNibHgwSUNvZ1FIQmhjbUZ0SUhCaGRHZ2dVR0YwYUNCeVpXeGhkR2wyWlNCMGJ5QjBhR2x6SUhKdmRYUmxjaTVjYmx4MElDb2dRSEJoY21GdElISmxjR3hoWTJWVGRHRjBaU0JTWlhCc1lXTmxJSFJvWlNCamRYSnlaVzUwSUdKeWIzZHpaWElnYUdsemRHOXlhV05oYkNCemRHRjBaU0J5WVhSb1pYSWdkR2hoYmlCd2RYTm9hVzVuSUdFZ2JtVjNJSE4wWVhSbElIUnZJSFJvWlNCemRHRmpheTVjYmx4MElDb3ZYRzVjZEhKbFpHbHlaV04wS0hCaGRHZzZJSE4wY21sdVp5d2djbVZ3YkdGalpWTjBZWFJsUHpvZ1ltOXZiR1ZoYmlrZ2UxeHVYSFJjZEZKdmRYUmxjaTV5WldScGNtVmpkQ2h3WVhSb0xDQjBhR2x6TENCeVpYQnNZV05sVTNSaGRHVXBPMXh1WEhSOVhHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRkp2ZFhSbGNqdGNibHh1Ym1GdFpYTndZV05sSUZKdmRYUmxjaUI3WEc1Y2RDOHFLbHh1WEhRZ0tpQkVaV1poZFd4MElIWmhiSFZsSUc5bUlHQnpaWEJoY21GMGIzSmdMbHh1WEhRZ0tpOWNibHgwWlhod2IzSjBJR052Ym5OMElFUkZSa0ZWVEZSZlUwVlFRVkpCVkU5U0lEMGdMMTVjWEM4cUtGdGVQMXhjTDEwcktTZy9PbHhjTHlndUtpbDhLRnhjUHk0cUtTay9KQzg3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRVJsWm1GMWJIUWdkbUZzZFdVZ2IyWWdZR3B2YVc1bGNtQXVYRzVjZENBcUwxeHVYSFJsZUhCdmNuUWdZMjl1YzNRZ1JFVkdRVlZNVkY5S1QwbE9SVklnUFNCY0lpOWNJanRjYmx4dVhIUXZLaXBjYmx4MElDb2dVMmxuYm1GMGRYSmxJRzltSUdCelpYQmhjbUYwYjNKZ0lHWjFibU4wYVc5dUxpQlVhR1VnWm5WdVkzUnBiMjRnYzNCc2FYUnpJSEJoZEdnZ2RHOGdjbTkxZEdVZ1lXNWtJR0Z5WjNWdFpXNTBMaUJVYUdWeVpXWnZjbVVzSUdsMElHMTFjM1JjYmx4MElDb2djbVYwZFhKdUlIUjNieUJ6ZEhKcGJtY2dkbUZzZFdWekxpQkpaaUJtZFc1amRHbHZiaUJ5WlhSMWNtNXpJRzUxYkd3c0lHbDBJR2x6SUdGemMzVnRaV1FnZEc4Z1ltVWdXMXdpWENJc0lHNTFiR3hkTGx4dVhIUWdLaTljYmx4MFpYaHdiM0owSUdsdWRHVnlabUZqWlNCVFpYQmhjbUYwYjNJZ2UxeHVYSFJjZEM4cUtseHVYSFJjZENBcUlFQndZWEpoYlNCd1lYUm9JRVoxYkd3Z2NHRjBhQzVjYmx4MFhIUWdLaUJBY21WMGRYSnVjeUJTYjNWMFpTQmhibVFnWVhKbmRXMWxiblF1WEc1Y2RGeDBJQ292WEc1Y2RGeDBLSEJoZEdnNklITjBjbWx1WnlrNklITjBjbWx1WjF0ZE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRk5wWjI1aGRIVnlaU0J2WmlCZ2FtOXBibVZ5WUNCbWRXNWpkR2x2Ymk0Z1ZHaGxJR1oxYm1OMGFXOXVJR3B2YVc1eklISnZkWFJsSUdGdVpDQmhjbWQxYldWdWRDQjBieUJoSUhCaGRHZ3VYRzVjZENBcUwxeHVYSFJsZUhCdmNuUWdhVzUwWlhKbVlXTmxJRXB2YVc1bGNpQjdYRzVjZEZ4MEx5b3FYRzVjZEZ4MElDb2dRSEJoY21GdElISnZkWFJsSUZKdmRYUmxMbHh1WEhSY2RDQXFJRUJ3WVhKaGJTQmhjbWNnUVhKbmRXMWxiblF1WEc1Y2RGeDBJQ29nUUhKbGRIVnlibk1nUm5Wc2JDQndZWFJvTGx4dVhIUmNkQ0FxTDF4dVhIUmNkQ2h5YjNWMFpUb2djM1J5YVc1bkxDQmhjbWM2SUhOMGNtbHVaeWs2SUhOMGNtbHVaenRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCVGFXZHVZWFIxY21VZ2IyWWdZR2hoYm1Sc1pYSmdJR2RsYm1WeVlXd3RjSFZ5Y0c5elpTQm1kVzVqZEdsdmJpNGdWR2hsSUdaMWJtTjBhVzl1SUcxaGNITWdkR2hsSUhOd1pXTnBabWxsWkNCeWIzVjBaU0IwYnlCaElIUmhjbWRsZENCdlltcGxZM1JjYmx4MElDb2dLSFZ6ZFdGc2JIa3NJRU52YlhCdmJtVnVkQ2tnWVc1a0lIQmhjM05sY3lCaGNtZDFiV1Z1ZENCMGJ5QnBkQ0JtYjNJZ1puVnlkR2hsY2lCeWIzVjBhVzVuTGx4dVhIUWdLaTljYmx4MFpYaHdiM0owSUdsdWRHVnlabUZqWlNCSVlXNWtiR1Z5UEZRK0lIdGNibHgwWEhRdktpcGNibHgwWEhRZ0tpQkFjR0Z5WVcwZ2NtOTFkR1VnVW05MWRHVXVYRzVjZEZ4MElDb2dRSEJoY21GdElHRnlaeUJCY21kMWJXVnVkQzVjYmx4MFhIUWdLaUJBY21WMGRYSnVjeUJVWVhKblpYUWdiMkpxWldOMExseHVYSFJjZENBcUwxeHVYSFJjZENoeWIzVjBaVG9nYzNSeWFXNW5MQ0JoY21jNklFSnBibVJoWW14bFBITjBjbWx1Wno0cE9pQlVPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUZOcFoyNWhkSFZ5WlNCdlppQmhJSE5wYm1kc1pTQnliM1YwWlNCcGJpQmdhR0Z1Wkd4bGNtQWdiMkpxWldOMExpQlVhR1VnWm5WdVkzUnBiMjRnYldGd2N5QmhJSE5wYm1kc1pTQnliM1YwWlNCMGJ5QmhJSFJoY21kbGRGeHVYSFFnS2lCdlltcGxZM1FnS0hWemRXRnNiSGtzSUVOdmJYQnZibVZ1ZENrZ1lXNWtJSEJoYzNObGN5QmhjbWQxYldWdWRDQjBieUJwZENCbWIzSWdablZ5ZEdobGNpQnliM1YwYVc1bkxseHVYSFFnS2k5Y2JseDBaWGh3YjNKMElHbHVkR1Z5Wm1GalpTQlNiM1YwWlR4VVBpQjdYRzVjZEZ4MEx5b3FYRzVjZEZ4MElDb2dRSEJoY21GdElHRnlaeUJCY21kMWJXVnVkQzVjYmx4MFhIUWdLaUJBY21WMGRYSnVjeUJVWVhKblpYUWdiMkpxWldOMExseHVYSFJjZENBcUwxeHVYSFJjZENoaGNtYzZJRUpwYm1SaFlteGxQSE4wY21sdVp6NHBPaUJVTzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGSnZkWFJsY2lCb1lXNWtiR1Z5SUdOdmJtWnBaM1Z5WVhScGIyNGdiMkpxWldOMExseHVYSFFnS2k5Y2JseDBaWGh3YjNKMElHbHVkR1Z5Wm1GalpTQklZVzVrYkdWeVEyOXVabWxuUEZRK0lIdGNibHgwWEhRdktpcGNibHgwWEhRZ0tpQk5ZWEFnYjJZZ2MzQmxZMmxtYVdNZ2NtOTFkR1VnYUdGdVpHeGxjbk11SUVsbUlHTjFjbkpsYm5RZ2NtOTFkR1VnYVhNZ2NISmxjMlZ1ZENCcGJpQjBhR2x6SUdScFkzUnBiMjVoY25rc0lIUm9aU0J5YjNWMFpYSWdZMkZzYkhNZ2FYUnpYRzVjZEZ4MElDb2dZMjl5Y21WemNHOXVaR2x1WnlCb1lXNWtiR1Z5SUdGdVpDQndZWE56WlhNZ1lYSm5kVzFsYm5RZ2RHOGdhWFF1SUZKdmRYUmxJR0Z1WkNCaGNtZDFiV1Z1ZENCMGFHVnRjMlZzZG1WeklHRnlaU0JqYjIxd2RYUmxaQ0IzYVhSb0lHQnpaWEJoY21GMGIzSmdYRzVjZEZ4MElDb2dZMkZzYkdKaFkyc3VYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2NtOTFkR1Z6UHpvZ1JHbGpkR2x2Ym1GeWVUeFNiM1YwWlR4VVBqNDdYRzVjYmx4MFhIUXZLaXBjYmx4MFhIUWdLaUJKWmlCdWIyNWxJRzltSUhSb1pTQmdjbTkxZEdWellDQnRZWFJqYUdWeklHTjFjbkpsYm5RZ2NtOTFkR1VzSUhSb1pTQnliM1YwWlhJZ1kyRnNiSE1nZEdocGN5Qm9ZVzVrYkdWeUlHTmhiR3hpWVdOcklHRnVaQ0J3WVhOelpYTWdZbTkwYUZ4dVhIUmNkQ0FxSUhKdmRYUmxJR0Z1WkNCaGNtZDFiV1Z1ZENCMGJ5QnBkQzRnUW5rZ1pHVm1ZWFZzZEN3Z2NtVjBkWEp1Y3lCdWRXeHNJR1p2Y2lCaGJua2dhVzV3ZFhRdVhHNWNkRngwSUNvdlhHNWNkRngwY21WaFpHOXViSGtnYm05MFJtOTFibVEvT2lCSVlXNWtiR1Z5UEZRK08xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRkp2ZFhSbGNpQmpiMjVtYVdkMWNtRjBhVzl1SUc5aWFtVmpkQzVjYmx4MElDb3ZYRzVjZEdWNGNHOXlkQ0JwYm5SbGNtWmhZMlVnUTI5dVptbG5QRlErSUh0Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCU2IzVjBaWElnYm1GdFpTNGdVbTkxZEdWeUlHNWhiV1VnYVhNZ1lTQmphSFZ1YXlCdlppQjBhR1VnY0dGMGFDQjBhR0YwSUdOaGRYTmxaQ0IwYUdseklISnZkWFJsSUhSdklHZGxkQ0JwYm1sMGFXRnNhWHBsWkM0Z1VtOXZkQ0J5YjNWMFpYSmNibHgwWEhRZ0tpQmtiMlZ6YmlkMElHaGhkbVVnWVNCdVlXMWxMbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlHNWhiV1UvT2lCemRISnBibWM3WEc1Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCUVlYSmxiblFnY205MWRHVnlMaUJKZENCd2NtOTJhV1JsY3lCZ1oyVjBSblZzYkZCaGRHaGdJR0Z1WkNCZ2NtVmthWEpsWTNSZ0lIZHBkR2dnWVNCamJIVmxJR0ZpYjNWMElHRnNiQ0J3WVhKMGN5QnZaaUIwYUdVZ2NHRjBhQzRnU1daY2JseDBYSFFnS2lCNWIzVnlJSEp2ZFhSbGNpQndjbTkyYVdSbGN5QjViM1VnZDJsMGFDQjNjbTl1WnlCd1lYUm9jeXdnWTJobFkyc2dZRzVoYldWZ0lHRnVaQ0JnY0dGeVpXNTBZQ0J2WmlCaGJHd2djbTkxZEdWeWN5QnBiaUI1YjNWeUlHaHBaWEpoY21Ob2VTQXRJSFJvWlhsY2JseDBYSFFnS2lCaGNtVWdiR2xyWld4NUlHRnpjMmxuYm1Wa0lIUnZJSGR5YjI1bklIWmhiSFZsY3k0Z1VtOXZkQ0J5YjNWMFpYSWdaRzlsYzI0bmRDQm9ZWFpsSUdFZ2NHRnlaVzUwTGx4dVhIUmNkQ0FxTDF4dVhIUmNkSEpsWVdSdmJteDVJSEJoY21WdWREODZJRkp2ZFhSbGNqeGhibmsrTzF4dVhHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1VHRjBhQ0IwYnlCaWFXNWtJSFJvWlNCeWIzVjBaWElnZEc4dUlGSnZiM1FnY205MWRHVnlJSE5vYjNWc1pDQjFjM1ZoYkd4NUlHZGxkQ0JpYjNWdVpDQjBieUJnYUdGemFHQWdjSEp2Y0dWeWRIa3VJRU5vYVd4a0lISnZkWFJsY25NZ2MyaHZkV3hrWEc1Y2RGeDBJQ29nY21WalpXbDJaU0JnY0dGMGFHQWdabkp2YlNCMGFHVnBjaUJ3WVhKbGJuUnpMbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlIQmhkR2cvT2lCQ2FXNWtZV0pzWlR4emRISnBibWMrTzF4dVhHNWNkRngwTHlvcVhHNWNkRngwSUNvZ1ZHRnlaMlYwSUhCeWIzQmxjblI1TGlCU2IzVjBaWElnY0hWMGN5QjBhR1VnY21WemRXeDBJRzltSUdCb1lXNWtiR1Z5WUNCbWRXNWpkR2x2YmlCallXeHNJSFJ2SUhSaGNtZGxkQ0J3Y205d1pYSjBlUzRnU1dZZ1lIUmhjbWRsZEdBZ2FYTmNibHgwWEhRZ0tpQnZiV2wwZEdWa0xDQjBhR1VnY205MWRHVnlJR055WldGMFpYTWdhWFFnWVhWMGIyMWhkR2xqWVd4c2VTNGdVbTkxZEdWeUlHRjFkRzl0WVhScFkyRnNiSGtnWTI5dWRISnZiSE1nZEdobElHeHBabVVnZEdsdFpTQnZaaUI1YjNWeUlIUmhjbWRsZEhNc1hHNWNkRngwSUNvZ2MyOHNJR2xtSUhsdmRTQndZWE56SUhsdmRYSWdjSEpsWTNKbFlYUmxaQ0JnZEdGeVoyVjBZQ0J3Y205d1pYSjBlU0IwYnlCaElGSnZkWFJsY2l3Z2JXRnJaU0J6ZFhKbElIUm9ZWFFnYVhRZ2FYTWdibTkwSUdGblozSmxaMkYwYVc1bklHbDBjeUIyWVd4MVpTeGNibHgwWEhRZ0tpQnBMbVV1SUdCdmQyNVdZV3gxWldBZ2JXVjBhRzlrSUdseklHNXZkQ0JqWVd4c1pXUXVYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2RHRnlaMlYwUHpvZ1NWQnliM0JsY25SNVBGUStPMXh1WEc1Y2RGeDBMeW9xWEc1Y2RGeDBJQ29nVUdGMGFDQnpaWEJoY21GMGIzSWdablZ1WTNScGIyNHVJRkJoY25ObGN5QnBibU52YldsdVp5QndZWFJvSUhSdklIUjNieUIwYjJ0bGJuTTZJSEp2ZFhSbElHRnVaQ0JoY21kMWJXVnVkQzRnVW05MWRHVWdaMlYwY3lCMWMyVmtJSFJ2WEc1Y2RGeDBJQ29nY0hKdlkyVnpjeUJoSUhOcGJtZHNaU0J5YjNWMGFXNW5JSE4wWlhBZ1lXNWtJR055WldGMFpTQmhJSFJoY21kbGRDd2dZWEpuZFcxbGJuUWdaMlYwY3lCd1lYTnpaV1FnZEc4Z2RHaGxJSFJoY21kbGRDQm1iM0lnWm5WeWRHaGxjaUJ5YjNWMGFXNW5MbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlITmxjR0Z5WVhSdmNqODZJRk5sY0dGeVlYUnZjaUI4SUZKbFowVjRjRHRjYmx4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUZCaGRHZ2dhbTlwYm1WeUxpQlBjSEJ2YzJsMFpTQjBieUJnYzJWd1lYSmhkRzl5WUM0Z1ZYTmxaQ0JwYmlCZ1oyVjBSblZzYkZCaGRHaGdJR0Z1WkNCZ2NtVmthWEpsWTNSZ0lHMWxkR2h2WkhNZ2RHOGdjSEp2Y0dWeWJIa2dZblZwYkdRZ2RHaGxYRzVjZEZ4MElDb2djR0YwYUM0Z1NtOXBibk1nYVc1amIyMXBibWNnY205MWRHVWdZVzVrSUdGeVozVnRaVzUwSUhSdklHRWdablZzYkNCd1lYUm9MbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlHcHZhVzVsY2o4NklFcHZhVzVsY2lCOElITjBjbWx1Wnp0Y2JseHVYSFJjZEM4cUtseHVYSFJjZENBcUlGSnZkWFJsSUdoaGJtUnNaWEl1SUUxaGNITWdkR2hsSUhKdmRYUmxJSE4wY21sdVp5QjBieUJoSUhSaGNtZGxkQ0J2WW1wbFkzUWdZVzVrSUhCaGMzTmxjeUJoY21kMWJXVnVkQ0IwYnlCcGRDQm1iM0lnWm5WeWRHaGxjaUJ5YjNWMGFXNW5MbHh1WEhSY2RDQXFMMXh1WEhSY2RISmxZV1J2Ym14NUlHaGhibVJzWlhJL09pQklZVzVrYkdWeVBGUStJSHdnU0dGdVpHeGxja052Ym1acFp6eFVQanRjYmx4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUdCelpYQmhjbUYwYjNKZ0xDQmdhbTlwYm1WeVlDQmhibVFnWUdoaGJtUnNaWEpnSUdOaGJHd2djMk52Y0dVdVhHNWNkRngwSUNvdlhHNWNkRngwY21WaFpHOXViSGtnYzJOdmNHVS9PaUJoYm5rN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dTV1lnWUhObGNHRnlZWFJ2Y21BZ2FYTWdZU0JtZFc1amRHbHZiaXdnY21WMGRYSnVjeUJwZENCcGJXMWxaR2xoZEdWc2VTNGdSV3h6WlNCamIyNTJaWEowY3lCMGFHVWdjM0JsWTJsbWFXVmtJSEpsWjNWc1lYSWdaWGh3Y21WemMybHZiaUIwYjF4dVhIUWdLaUJoSUdaMWJtTjBhVzl1SUdKNUlIUm9aU0JtYjJ4c2IzZHBibWNnY25Wc1pUb2dWR2hsSUdacGNuTjBJSFJ2YTJWdUlDZ2tNU2tnYjJZZ2NHRjBhQ0JwY3lCMWMyVmtJR0Z6SUdFZ2NtOTFkR1VzSUdGdVpDQjBhR1VnYm1WNGRDQnViMjR0Ym5Wc2JDQjBiMnRsYmx4dVhIUWdLaUFvSkRJZ2IzSWdablZ5ZEdobGNpa2dhWE1nZFhObFpDQmhjeUJoYmlCaGNtZDFiV1Z1ZEM0Z1NXWWdjR0YwYUNCcGN5QnVkV3hzTENCcGRDQnBjeUJoYzNOMWJXVmtJSFJ2SUdKbElGd2lYQ0l1WEc1Y2RDQXFJRUJ3WVhKaGJTQnpaWEJoY21GMGIzSWdSblZ1WTNScGIyNGdiM0lnY21WbmRXeGhjaUJsZUhCeVpYTnphVzl1TGx4dVhIUWdLaUJBY21WMGRYSnVjeUJUWlhCaGNtRjBiM0lnWm5WdVkzUnBiMjR1WEc1Y2RDQXFMMXh1WEhSbGVIQnZjblFnWm5WdVkzUnBiMjRnYldGclpWTmxjR0Z5WVhSdmNpaHpaWEJoY21GMGIzSTZJRk5sY0dGeVlYUnZjaUI4SUZKbFowVjRjQ0E5SUVSRlJrRlZURlJmVTBWUVFWSkJWRTlTS1RvZ1UyVndZWEpoZEc5eUlIdGNibHgwWEhScFppQW9kSGx3Wlc5bUlITmxjR0Z5WVhSdmNpQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z2MyVndZWEpoZEc5eU8xeHVYSFJjZEgxY2JseDBYSFJ5WlhSMWNtNGdablZ1WTNScGIyNGdLSEJoZEdnNklITjBjbWx1WnlrZ2UxeHVYSFJjZEZ4MFkyOXVjM1FnY21WemRXeDBJRDBnYzJWd1lYSmhkRzl5TG1WNFpXTW9jR0YwYUNCOGZDQmNJbHdpS1R0Y2JseDBYSFJjZEhKbGRIVnliaUJ5WlhOMWJIUWdQeUJiY21WemRXeDBXekZkTENCa1pXWnVLRUZ5Y21GNVZYUnBiSE11Wm1sdVpDaHlaWE4xYkhRdWMyeHBZMlVvTWlrc0lHbHpUbTkwVG1sc0tTd2diblZzYkNsZElEb2diblZzYkR0Y2JseDBYSFI5TzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlFbG1JR0JxYjJsdVpYSmdJR2x6SUdFZ1puVnVZM1JwYjI0c0lISmxkSFZ5Ym5NZ2FYUWdhVzF0WldScFlYUmxiSGt1SUVWc2MyVWdZMjl1ZG1WeWRITWdkR2hsSUhOd1pXTnBabWxsWkNCemRISnBibWNnZEc4Z1lTQm1kVzVqZEdsdmJpQmllU0IwYUdWY2JseDBJQ29nWm05c2JHOTNhVzVuSUhKMWJHVTZJR3B2YVc1eklHbHVZMjl0YVc1bklISnZkWFJsTDJGeVozVnRaVzUwSUhCaGFYSWdkbWxoSUhSb1pTQnpjR1ZqYVdacFpXUWdjM1J5YVc1bkxpQk1aV0ZrYVc1bklHcHZhVzVsY2lCemVXMWliMnh6SUdsdUlHRnlaM1Z0Wlc1MFhHNWNkQ0FxSUdGeVpTQjBjbWx0YldWa0xpQkpaaUJoY21kMWJXVnVkQ0J6ZEdGeWRITWdkMmwwYUNCY0lqOWNJaXdnYW05cGJtVnlJSE41YldKdmJDQnBjeUJ1YjNRZ1lXUmtaV1F1SUVsbUlHRnlaM1Z0Wlc1MElHbHpJRzUxYkd3Z2IzSWdZbXhoYm1zc0lISmxkSFZ5Ym5OY2JseDBJQ29nY205MWRHVXVYRzVjZENBcUlFQndZWEpoYlNCcWIybHVaWElnUm5WdVkzUnBiMjRnYjNJZ2MyVndZWEpoZEdsdmJpQmphR0Z5WVdOMFpYSXVYRzVjZENBcUlFQnlaWFIxY201eklFcHZhVzVsY2lCbWRXNWpkR2x2Ymk1Y2JseDBJQ292WEc1Y2RHVjRjRzl5ZENCbWRXNWpkR2x2YmlCdFlXdGxTbTlwYm1WeUtHcHZhVzVsY2pvZ1NtOXBibVZ5SUh3Z2MzUnlhVzVuSUQwZ1JFVkdRVlZNVkY5S1QwbE9SVklwT2lCS2IybHVaWElnZTF4dVhIUmNkR2xtSUNoMGVYQmxiMllnYW05cGJtVnlJRDA5UFNCY0ltWjFibU4wYVc5dVhDSXBJSHRjYmx4MFhIUmNkSEpsZEhWeWJpQnFiMmx1WlhJN1hHNWNkRngwZlZ4dVhIUmNkR052Ym5OMElIUnlhVzF0WlhJZ1BTQnVaWGNnVW1WblJYaHdLRndpWGlnL09sd2lJQ3NnYW05cGJtVnlMbkpsY0d4aFkyVW9MMXRjWEZ4Y1hpUXFLejh1S0NsOFcxeGNYWHQ5WFM5bkxDQW5YRnhjWENRbUp5a2dLeUJjSWlrcVhDSXBPMXh1WEhSY2RISmxkSFZ5YmlCbWRXNWpkR2x2YmlBb2NtOTFkR1VzSUdGeVp5a2dlMXh1WEhSY2RGeDBjbVYwZFhKdUlDRmhjbWNnUHlCeWIzVjBaU0E2SUNoaGNtY3VZMmhoY2tGMEtEQXBJRDA5UFNCY0lqOWNJaWtnUHlBb2NtOTFkR1VnS3lCaGNtY3BJRG9nS0hKdmRYUmxJQ3NnYW05cGJtVnlJQ3NnWVhKbkxuSmxjR3hoWTJVb2RISnBiVzFsY2l3Z1hDSmNJaWtwTzF4dVhIUmNkSDA3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1NXWWdhR0Z1Wkd4bGNpQnBjeUJoSUdaMWJtTjBhVzl1TENCeVpYUjFjbTV6SUdsMElHbHRiV1ZrYVdGMFpXeDVMaUJGYkhObElHTnZiblpsY25SeklIUm9aU0J6Y0dWamFXWnBaV1FnYjJKcVpXTjBJSFJ2SUdFZ1puVnVZM1JwYjI0dVhHNWNkQ0FxSUVCd1lYSmhiU0JvWVc1a2JHVnlJRWhoYm1Sc1pYSWdZMjl1Wm1sbmRYSmhkR2x2YmlCdlltcGxZM1F1WEc1Y2RDQXFJRUJ5WlhSMWNtNXpJRWhoYm1Sc1pYSWdablZ1WTNScGIyNHVYRzVjZENBcUwxeHVYSFJsZUhCdmNuUWdablZ1WTNScGIyNGdiV0ZyWlVoaGJtUnNaWEk4VkQ0b2FHRnVaR3hsY2pvZ1NHRnVaR3hsY2p4VVBpQjhJRWhoYm1Sc1pYSkRiMjVtYVdjOFZENGdQU0I3ZlNrNklFaGhibVJzWlhJOFZENGdlMXh1WEhSY2RHbG1JQ2gwZVhCbGIyWWdhR0Z1Wkd4bGNpQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z2FHRnVaR3hsY2p0Y2JseDBYSFI5WEc1Y2RGeDBZMjl1YzNRZ2NtOTFkR1Z6SUQwZ2FHRnVaR3hsY2k1eWIzVjBaWE1nZkh3Z2UzMDdYRzVjZEZ4MGNtVjBkWEp1SUdaMWJtTjBhVzl1SUNoMGFHbHpPaUJoYm5rc0lISnZkWFJsT2lCemRISnBibWNzSUdGeVp6b2dRbWx1WkdGaWJHVThjM1J5YVc1blBpazZJRlFnZTF4dVhIUmNkRngwY21WMGRYSnVJSEp2ZFhSbGMxdHliM1YwWlYwZ1B5QnliM1YwWlhOYmNtOTFkR1ZkTG1OaGJHd29kR2hwY3l3Z1lYSm5LU0E2WEc1Y2RGeDBYSFJjZEdoaGJtUnNaWEl1Ym05MFJtOTFibVFnUHlCb1lXNWtiR1Z5TG01dmRFWnZkVzVrTG1OaGJHd29kR2hwY3l3Z2NtOTFkR1VzSUdGeVp5a2dPaUJ1ZFd4c08xeHVYSFJjZEgwN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dVbVYwZFhKdWN5Qm1kV3hzSUhCaGRHZ2dZWE1nZEdobElISmxjM1ZzZENCdlppQmdhbTlwYm1WeVlDQm1kVzVqZEdsdmJpQmpZV3hzSUdsdUlHQndZWEpsYm5SZ0lHOW1JR0J5YjNWMFpYSmdJSGRwZEdnZ1lHNWhiV1ZnSUhCaGMzTmxaQ0JoYzF4dVhIUWdLaUJnY205MWRHVmdJR0Z1WkNCZ2NHRjBhR0FnY0dGemMyVmtJR0Z6SUdCaGNtZGdMaUJTWlhSMWNtNXpJR0J3WVhSb1lDQnBaaUIwYUdseklHbHpJSFJvWlNCeWIyOTBJSEp2ZFhSbGNpNWNibHgwSUNvZ1FIQmhjbUZ0SUhCaGRHZ2dVR0YwYUNCeVpXeGhkR2wyWlNCMGJ5QmdjbTkxZEdWeVlDNWNibHgwSUNvZ1FIQmhjbUZ0SUhKdmRYUmxjaUJEYjIxd2RYUmxJR1oxYkd3Z2NHRjBhQ0J5Wld4aGRHbDJaU0IwYnlCMGFHbHpJSEp2ZFhSbGNpNWNibHgwSUNvZ1FISmxkSFZ5Ym5NZ1JuVnNiQ0J3WVhSb0lISmxiR0YwYVhabElIUnZJSFJvWlNCZ2NtOTFkR1Z5WUM1Y2JseDBJQ292WEc1Y2RHVjRjRzl5ZENCbWRXNWpkR2x2YmlCblpYUkdkV3hzVUdGMGFDaHdZWFJvT2lCemRISnBibWNzSUhKdmRYUmxjajg2SUZKdmRYUmxjanhoYm5rK0tTQjdYRzVjZEZ4MGNtVjBkWEp1SUhKdmRYUmxjaUEvSUhKdmRYUmxjaTVuWlhSR2RXeHNVR0YwYUNod1lYUm9LU0E2SUhCaGRHZzdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nU1cxdFpXUnBZWFJsYkhrZ2NHVnlabTl5YlhNZ2RHaGxJSEpsWkdseVpXTjBhVzl1TENCcExtVXVJSE5sZEhNZ1lHaGhjMmhnSUhSdklHQm5aWFJHZFd4c1VHRjBhQ2h3WVhSb0xDQnliM1YwWlhJcFlDNWNibHgwSUNvZ1FIQmhjbUZ0SUhCaGRHZ2dVR0YwYUNCeVpXeGhkR2wyWlNCMGJ5QmdjbTkxZEdWeVlDNWNibHgwSUNvZ1FIQmhjbUZ0SUhKdmRYUmxjaUJTWldScGNtVmpkQ0J5Wld4aGRHbDJaU0IwYnlCMGFHbHpJSEp2ZFhSbGNpNWNibHgwSUNvZ1FIQmhjbUZ0SUhKbGNHeGhZMlZUZEdGMFpTQlNaWEJzWVdObElIUm9aU0JqZFhKeVpXNTBJR0p5YjNkelpYSWdhR2x6ZEc5eWFXTmhiQ0J6ZEdGMFpTQnlZWFJvWlhJZ2RHaGhiaUJ3ZFhOb2FXNW5JR0VnYm1WM0lITjBZWFJsSUhSdklIUm9aU0J6ZEdGamF5NWNibHgwSUNvdlhHNWNkR1Y0Y0c5eWRDQm1kVzVqZEdsdmJpQnlaV1JwY21WamRDaHdZWFJvT2lCemRISnBibWNzSUhKdmRYUmxjajg2SUZKdmRYUmxjanhoYm5rK0xDQnlaWEJzWVdObFUzUmhkR1UvT2lCaWIyOXNaV0Z1S1NCN1hHNWNkRngwZEhKNUlIdGNibHgwWEhSY2RIQmhkR2dnUFNCblpYUkdkV3hzVUdGMGFDaHdZWFJvTENCeWIzVjBaWElwTzF4dVhIUmNkRngwYVdZZ0tHaGhjMmd1ZFhCa1lYUnBibWNwSUh0Y2JseDBYSFJjZEZ4MGRHaHliM2NnYm1WM0lFVnljbTl5S0Z3aVZYQmtZWFJsSUdONVkyeGxJR2x6SUdGc2NtVmhaSGtnWVdOMGFYWmxMaUJjSWlBclhHNWNkRngwWEhSY2RGeDBYQ0pUZFdkblpYTjBJSFZ6YVc1bklGSnZkWFJsY2k1U1pXUnBjbVZqZEc5eUlHOXlJRzF2ZG1sdVp5QlZVa3dnY21Wa2FYSmxZM1JwYjI0Z2RHOGdZVzRnWVhONWJtTnliMjV2ZFhNZ1kyRnNiR0poWTJzdVhDSXBPMXh1WEhSY2RGeDBmVnh1WEhSY2RIMGdZMkYwWTJnZ0tHVXBJSHRjYmx4MFhIUmNkSFJvY205M0lHNWxkeUJGY25KdmNpaGNJa05oYmlCdWIzUWdjR1Z5Wm05eWJTQlZVa3dnY21Wa2FYSmxZM1JwYjI0Z2RHOGdYQ0lnS3lCd1lYUm9JQ3NnWENJNklGd2lJQ3NnWlM1dFpYTnpZV2RsS1R0Y2JseDBYSFI5WEc1Y2RGeDBhR0Z6YUM1elpYUW9jR0YwYUN3Z2NtVndiR0ZqWlZOMFlYUmxLVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCU1pXTnZiVzFsYm1SbFpDQjNZWGtnZEc4Z2NHVnlabTl5YlNCaGJpQmhjM2x1WTNKdmJtOTFjeUJ5WldScGNtVmpkR2x2YmlCcGJpQlNiM1YwWlhJZ1lHaGhibVJzWlhKZ0lHWjFibU4wYVc5dUxseHVYSFFnS2k5Y2JseDBaWGh3YjNKMElHTnNZWE56SUZKbFpHbHlaV04wYjNJZ1pYaDBaVzVrY3lCRGIyMXdiMjVsYm5RZ2UxeHVYSFJjZEM4cUtseHVYSFJjZENBcUlFTnlaV0YwWlhNZ1lTQnVaWGNnY21Wa2FYSmxZM1J2Y2k1Y2JseDBYSFFnS2lCQWNHRnlZVzBnY0dGMGFDQlFZWFJvSUhKbGJHRjBhWFpsSUhSdklISnZkWFJsY2k1Y2JseDBYSFFnS2lCQWNHRnlZVzBnY205MWRHVnlJRkpsWkdseVpXTjBJSEpsYkdGMGFYWmxJSFJ2SUhSb2FYTWdjbTkxZEdWeUxseHVYSFJjZENBcUlFQndZWEpoYlNCeVpYQnNZV05sVTNSaGRHVWdVbVZ3YkdGalpTQjBhR1VnWTNWeWNtVnVkQ0JpY205M2MyVnlJR2hwYzNSdmNtbGpZV3dnYzNSaGRHVWdjbUYwYUdWeUlIUm9ZVzRnY0hWemFHbHVaeUJoSUc1bGR5QnpkR0YwWlNCMGJ5QjBhR1ZjYmx4MFhIUWdLaUJ6ZEdGamF5NGdSR1ZtWVhWc2RITWdkRzhnZEhKMVpTNWNibHgwWEhRZ0tpOWNibHgwWEhSamIyNXpkSEoxWTNSdmNpaHdjbWwyWVhSbElIQmhkR2c2SUhOMGNtbHVaeXdnY0hKcGRtRjBaU0J5YjNWMFpYSS9PaUJTYjNWMFpYSThZVzU1UGl3Z2NISnBkbUYwWlNCeVpYQnNZV05sVTNSaGRHVS9PaUJpYjI5c1pXRnVLU0I3WEc1Y2RGeDBYSFJ6ZFhCbGNpZ3BPMXh1WEhSY2RGeDBaR1ZtWlhJb01Dd2dkR2hwY3k1dmQyNG9ibVYzSUVOaGJtTmxiRlJ2YTJWdUtDa3BLUzUwYUdWdUtDZ3BJRDArSUh0Y2JseDBYSFJjZEZ4MGNtVmthWEpsWTNRb2RHaHBjeTV3WVhSb0xDQjBhR2x6TG5KdmRYUmxjaXdnWkdWbWJpaDBhR2x6TG5KbGNHeGhZMlZUZEdGMFpTd2dkSEoxWlNrcE8xeHVYSFJjZEZ4MGZTazdYRzVjZEZ4MGZWeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRU55WldGMFpYTWdZU0J5YjNWMFpYSWdkR2hoZENCdFlXNWhaMlZ6SUhSM2J5QnRZWEJ3YVc1bklHOW1JSEJ5YjNCbGNuUnBaWE02WEc1Y2RDQXFYRzVjZENBcUlDb2dZSEJoZEdoellDQjNhR2xqYUNCbGVIQnZjMlZ6SUhOMGNtbHVaeUJ3WVhSb0lIQnliM0JsY25ScFpYTWdabTl5SUdOb2FXeGtJSEp2ZFhSbGNuTWdhV1lnYm1WalkyVnpjMkZ5ZVR0Y2JseDBJQ29nS2lCZ1pYaHdZVzVrWldSZ0lIZG9hV05vSUdWNGNHOXpaWE1nWW05dmJHVmhiaUJjSW1WNGNHRnVaR1ZrWENJZ2NISnZjR1Z5ZEdsbGN5Qm1iM0lnWTJocGJHUWdWVWtnY0dGdVpXeHpMbHh1WEhRZ0tseHVYSFFnS2lCVWFHbHpJR0ZzYkc5M2N5QjViM1VnZEc4Z2NtVnVaR1Z5SUhsdmRYSWdZMjl1ZEdWdWRDQmhjeUJoSUdacGVHVmtJR3hwYzNRZ2IyWWdjR0Z1Wld4eklISmxjSEpsYzJWdWRHbHVaeUIwYUdVZ1kyOXVZM1Z5Y21WdWRDQnliM1YwWlhNdVhHNWNkQ0FxTDF4dVhIUmxlSEJ2Y25RZ1kyeGhjM01nVG05a1pTQmxlSFJsYm1SeklFTnNZWE56SUh0Y2JseDBYSFJ3Y21sMllYUmxJRjl3WVhSb2N6b2dSR2xqZEdsdmJtRnllVHhKVUhKdmNHVnlkSGs4YzNSeWFXNW5QajQ3WEc1Y2RGeDBjSEpwZG1GMFpTQmZaWGh3WVc1a1pXUTZJRVJwWTNScGIyNWhjbms4U1ZCeWIzQmxjblI1UEdKdmIyeGxZVzQrUGp0Y2JseDBYSFJ3Y21sMllYUmxJRjlwYm1sMGFXRnNhWHBsWkNBOUlHWmhiSE5sT3lBdkx5QjFjMlZrSUhSdklHRjFkRzh0WVdOMGFYWmhkR1VnZEdobElHWnBjbk4wSUhKdmRYUmxJRzl1SUdsdWFYUnBZV3hwZW1GMGFXOXVYRzVjZEZ4MGNISnBkbUYwWlNCZmRYQmtZWFJwYm1jZ1BTQm1ZV3h6WlRzZ0x5OGdkWE5sWkNCMGJ5QndjbVYyWlc1MElISmxaR2x5WldOMGFXOXVJR1Z5Y205eVhHNWNibHgwWEhRdktpcGNibHgwWEhRZ0tpQkVaV1poZFd4MElISnZkWFJsSUhSb2FYTWdibTlrWlNCM1lYTWdhVzVwZEdsaGJHbDZaV1FnZDJsMGFDNWNibHgwWEhRZ0tpOWNibHgwWEhSeVpXRmtiMjVzZVNCa1pXWmhkV3gwVW05MWRHVTZJSE4wY21sdVp6dGNibHh1WEhSY2RDOHFLbHh1WEhSY2RDQXFJRkp2ZFhSbGNpQjBhR0YwSUcxaGJtRm5aWE1nZEdocGN5QnViMlJsTGlCT2IyUmxJR055WldGMFpYTWdkR2hwY3lCeWIzVjBaWElnWVhWMGIyMWhkR2xqWVd4c2VTNGdXVzkxSUhOb2IzVnNaQ0J3WVhOeklIUm9hWE1nY205MWRHVnlJSFJ2WEc1Y2RGeDBJQ29nWTJocGJHUWdZMjl0Y0c5dVpXNTBjeUJoY3lCMGFHVnBjaUJ3WVhKbGJuUWdjbTkxZEdWeUlHWnZjaUJtZFhKMGFHVnlJSEp2ZFhScGJtY3VYRzVjZEZ4MElDb3ZYRzVjZEZ4MGNtVmhaRzl1YkhrZ2NtOTFkR1Z5T2lCU2IzVjBaWEk4UkdWemRISnZlV0ZpYkdVK08xeHVYRzVjZEZ4MEx5b3FYRzVjZEZ4MElDb2dRM0psWVhSbGN5QnliM1YwWlhJZ2JtOWtaU3dnWVhOemFXZHVjeUJwZEhNZ2NISnZjR1Z5ZEdsbGN5QjBieUJwYm1sMGFXRnNJSFpoYkhWbGN5QmhibVFnYzNSaGNuUnpJSE41Ym1Ob2NtOXVhWHBoZEdsdmJpNWNibHgwWEhRZ0tpQkFjR0Z5WVcwZ1kyOXVabWxuSUU1dlpHVWdZMjl1Wm1sbmRYSmhkR2x2Ymk1Y2JseDBYSFFnS2k5Y2JseDBYSFJqYjI1emRISjFZM1J2Y2loamIyNW1hV2M2SUU1dlpHVXVRMjl1Wm1sbktTQjdYRzVjZEZ4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEZ4MGRHaHBjeTVrWldaaGRXeDBVbTkxZEdVZ1BTQmpiMjVtYVdjdVpHVm1ZWFZzZEZKdmRYUmxPMXh1WEc1Y2RGeDBYSFJqYjI1emRDQnliM1YwWlUxaGNDQTlJRUZ5Y21GNVZYUnBiSE11YVc1a1pYZ29ZMjl1Wm1sbkxuSnZkWFJsY3l3Z2FXUmxiblJwZEhrcE8xeHVYSFJjZEZ4MGRHaHBjeTVmY0dGMGFITWdQU0JFYVdOMGFXOXVZWEo1VlhScGJITXViV0Z3S0hKdmRYUmxUV0Z3TENBb0tTQTlQaUJ1WlhjZ1VISnZjR1Z5ZEhrOGMzUnlhVzVuUGlncEtUdGNibHgwWEhSY2RIUm9hWE11WDJWNGNHRnVaR1ZrSUQwZ1JHbGpkR2x2Ym1GeWVWVjBhV3h6TG0xaGNDaHliM1YwWlUxaGNDd2dLQ2tnUFQ0Z2JtVjNJRkJ5YjNCbGNuUjVLR052Ym1acFp5NWxlSEJoYm1SbFpDQTlQVDBnZEhKMVpTa3BPMXh1WEc1Y2RGeDBYSFJwWmlBb1kyOXVabWxuTG1WNGNHRnVaR1ZrSUNZbUlDaDBlWEJsYjJZZ1kyOXVabWxuTG1WNGNHRnVaR1ZrSUNFOVBTQmNJbUp2YjJ4bFlXNWNJaWtwSUh0Y2JseDBYSFJjZEZ4MFkyOXVabWxuTG1WNGNHRnVaR1ZrTG1admNrVmhZMmdvS0hKdmRYUmxLU0E5UGlCN1hHNWNkRngwWEhSY2RGeDBkR2hwY3k1ZlpYaHdZVzVrWldSYmNtOTFkR1ZkTG5ObGRDaDBjblZsS1R0Y2JseDBYSFJjZEZ4MGZTazdYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkRVJwWTNScGIyNWhjbmxWZEdsc2N5NW1iM0pGWVdOb0tIUm9hWE11WDJWNGNHRnVaR1ZrTENBb1pYaHdZVzVrWldRc0lISnZkWFJsS1NBOVBpQjdYRzVjZEZ4MFhIUmNkSFJvYVhNdWIzZHVLR1Y0Y0dGdVpHVmtMbU5vWVc1blpVVjJaVzUwTG14cGMzUmxiaWdvY0dGeVlXMXpLU0E5UGlCN1hHNWNkRngwWEhSY2RGeDBhV1lnS0hCaGNtRnRjeTUyWVd4MVpTQW1KaUFoZEdocGN5NWZkWEJrWVhScGJtY3BJSHRjYmx4MFhIUmNkRngwWEhSY2RIUm9hWE11Y205MWRHVnlMbkpsWkdseVpXTjBLSEp2ZFhSbEtUdGNibHgwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEgwcEtUdGNibHgwWEhSY2RIMHBPMXh1WEc1Y2RGeDBYSFIwYUdsekxuSnZkWFJsY2lBOUlIUm9hWE11YjNkdUtHNWxkeUJTYjNWMFpYSThSR1Z6ZEhKdmVXRmliR1UrS0h0Y2JseDBYSFJjZEZ4MGJtRnRaVG9nWTI5dVptbG5MbTVoYldVc1hHNWNkRngwWEhSY2RIQmhjbVZ1ZERvZ1kyOXVabWxuTG5CaGNtVnVkQ3hjYmx4MFhIUmNkRngwY0dGMGFEb2dZMjl1Wm1sbkxuQmhkR2dzWEc1Y2RGeDBYSFJjZEdoaGJtUnNaWEk2SUNoeWIzVjBaU3dnWVhKbktTQTlQaUI3WEc1Y2RGeDBYSFJjZEZ4MFkyOXVjM1FnY0dGMGFDQTlJSFJvYVhNdVgzQmhkR2h6VzNKdmRYUmxYVHRjYmx4MFhIUmNkRngwWEhScFppQW9JWEJoZEdncElIdGNibHgwWEhSY2RGeDBYSFJjZEhKbGRIVnliaUFvSVhSb2FYTXVYMmx1YVhScFlXeHBlbVZrSUNZbUlIUm9hWE11WkdWbVlYVnNkRkp2ZFhSbEtTQS9YRzVjZEZ4MFhIUmNkRngwWEhSY2RHNWxkeUJTWldScGNtVmpkRzl5S0hSb2FYTXVaR1ZtWVhWc2RGSnZkWFJsTENCMGFHbHpMbkp2ZFhSbGNpa2dPaUJ1ZFd4c08xeHVYSFJjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkRngwWEhSMGFHbHpMbDkxY0dSaGRHbHVaeUE5SUhSeWRXVTdYRzVjZEZ4MFhIUmNkRngwWTI5dWMzUWdaWGh3WVc1a1pYSWdQU0J1WlhjZ1RtOWtaVVY0Y0dGdVpHVnlLSFJvYVhNdWNtOTFkR1Z5TENCaGNtY3NJSEJoZEdnc0lIUm9hWE11WDJWNGNHRnVaR1ZrVzNKdmRYUmxYU2s3WEc1Y2RGeDBYSFJjZEZ4MGRHaHBjeTVmZFhCa1lYUnBibWNnUFNCbVlXeHpaVHRjYmx4MFhIUmNkRngwWEhSeVpYUjFjbTRnWlhod1lXNWtaWEk3WEc1Y2RGeDBYSFJjZEgxY2JseDBYSFJjZEgwcEtUdGNibHgwWEhSY2RIUm9hWE11Y205MWRHVnlMblZ3WkdGMFpTZ3BPMXh1WEhSY2RGeDBkR2hwY3k1ZmFXNXBkR2xoYkdsNlpXUWdQU0IwY25WbE8xeHVYSFJjZEgxY2JseHVYSFJjZEM4cUtseHVYSFJjZENBcUlGQnliM1pwWkdWeklIQmhkR2h6SUhSdklHSnBibVFnWTJocGJHUWdjbTkxZEdWeWN5QjBieXdnWW5rZ2JtRnRaUzRnVDI1c2VTQnZibVVnY205MWRHVWdhWE1nWVdOMGFYWmxJR0YwSUdFZ2RHbHRaU3dnWW5WMElIUm9aV2x5SUhCaGRHaHpYRzVjZEZ4MElDb2dZV3gzWVhseklHVjRhWE4wSUhKbFoyRnlaR3hsYzNNZ2IyWWdkR2hsYVhJZ1lXTjBhWFpwZEhrdVhHNWNkRngwSUNvdlhHNWNkRngwWjJWMElIQmhkR2h6S0NrNklFUnBZM1JwYjI1aGNuazhRbWx1WkdGaWJHVThjM1J5YVc1blBqNGdlMXh1WEhSY2RGeDBjbVYwZFhKdUlIUm9hWE11WDNCaGRHaHpPMXh1WEhSY2RIMWNibHh1WEhSY2RDOHFLbHh1WEhSY2RDQXFJRkJ5YjNacFpHVnpJRndpWlhod1lXNWtaV1JjSWlCbWJHRm5jeUIwYnlCaWFXNWtJR05vYVd4a0lIQmhibVZzY3lCMGJ5d2dZbmtnYm1GdFpTNGdVM1Z3Y0c5eWRDQjBkMjh0ZDJGNUlHSnBibVJwYm1jdVhHNWNkRngwSUNvdlhHNWNkRngwWjJWMElHVjRjR0Z1WkdWa0tDazZJRVJwWTNScGIyNWhjbms4U1ZCeWIzQmxjblI1UEdKdmIyeGxZVzQrUGlCN1hHNWNkRngwWEhSeVpYUjFjbTRnZEdocGN5NWZaWGh3WVc1a1pXUTdYRzVjZEZ4MGZWeHVYSFI5WEc1Y2JseDBaWGh3YjNKMElHNWhiV1Z6Y0dGalpTQk9iMlJsSUh0Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCU2IzVjBaWEl1VG05a1pTQmpiMjVtYVdkMWNtRjBhVzl1TGx4dVhIUmNkQ0FxTDF4dVhIUmNkR1Y0Y0c5eWRDQnBiblJsY21aaFkyVWdRMjl1Wm1sbklIdGNibHgwWEhSY2RDOHFLbHh1WEhSY2RGeDBJQ29nVW05MWRHVnlJRzVoYldVdVhHNWNkRngwWEhRZ0tpOWNibHgwWEhSY2RISmxZV1J2Ym14NUlHNWhiV1UvT2lCemRISnBibWM3WEc1Y2JseDBYSFJjZEM4cUtseHVYSFJjZEZ4MElDb2dVR0Z5Wlc1MElISnZkWFJsY2k1Y2JseDBYSFJjZENBcUwxeHVYSFJjZEZ4MGNtVmhaRzl1YkhrZ2NHRnlaVzUwUHpvZ1VtOTFkR1Z5UEdGdWVUNDdYRzVjYmx4MFhIUmNkQzhxS2x4dVhIUmNkRngwSUNvZ1VHRjBhQ0IwYnlCaWFXNWtJSFJvWlNCeWIzVjBaWElnZEc4dVhHNWNkRngwWEhRZ0tpOWNibHgwWEhSY2RISmxZV1J2Ym14NUlIQmhkR2cvT2lCQ2FXNWtZV0pzWlR4emRISnBibWMrTzF4dVhHNWNkRngwWEhRdktpcGNibHgwWEhSY2RDQXFJRVpwZUdWa0lHeHBjM1FnYjJZZ2NtOTFkR1Z6SUhSdklHMWhibUZuWlNCaWVTQjBhR2x6SUc1dlpHVXVJRVp2Y2lCbGRtVnllU0J1WVcxbElHbHVJSFJvYVhNZ2JHbHpkQ3dnWTI5eWNtVnpjRzl1WkdsdVp5QndjbTl3WlhKMGFXVnpJSGRwYkd3Z1ltVmNibHgwWEhSY2RDQXFJR055WldGMFpXUWdhVzRnWUhCaGRHaHpZQ0JoYm1RZ1lHVjRjR0Z1WkdWa1lDQmthV04wYVc5dVlYSnBaWE1nYjJZZ2RHaGxJRzV2WkdVdVhHNWNkRngwWEhRZ0tpOWNibHgwWEhSY2RISmxZV1J2Ym14NUlISnZkWFJsY3pvZ2MzUnlhVzVuVzEwN1hHNWNibHgwWEhSY2RDOHFLbHh1WEhSY2RGeDBJQ29nU1c1cGRHbGhiQ0JjSW1WNGNHRnVaR1ZrWENJZ2MzUmhkSFZ6SUc5bUlISnZkWFJsY3lCdmNpQnBibWwwYVdGc0lISnZkWFJsY3lCMGJ5QmxlSEJoYm1RdUlFUmxabUYxYkhSeklIUnZJR1poYkhObElDaGhiR3dnY205MWRHVnpJR0Z5WlZ4dVhIUmNkRngwSUNvZ1kyOXNiR0Z3YzJWa0tTNWNibHgwWEhSY2RDQXFMMXh1WEhSY2RGeDBjbVZoWkc5dWJIa2daWGh3WVc1a1pXUS9PaUJpYjI5c1pXRnVJSHdnYzNSeWFXNW5XMTA3WEc1Y2JseDBYSFJjZEM4cUtseHVYSFJjZEZ4MElDb2dSR1ZtWVhWc2RDQnliM1YwWlM0Z1NXWWdkR2hsSUdsdWFYUnBZV3dnY0dGMGFDQnBjeUJpYkdGdWF5QW9YQ0pjSWlrc0lIUm9aU0J5YjNWMFpYSWdjR1Z5Wm05eWJYTWdZU0J5WldScGNtVmpkR2x2YmlCMGJ5QjBhR2x6SUhKdmRYUmxMQ0JwTG1VdVhHNWNkRngwWEhRZ0tpQmxlSEJoYm1SeklHOXVaU0J2WmlCMGFHVWdjR0Z1Wld4ekxpQkViMlZ6YmlkMElIZHZjbXNnWVdaMFpYSWdhVzVwZEdsaGJHbDZZWFJwYjI0dVhHNWNkRngwWEhRZ0tpOWNibHgwWEhSY2RISmxZV1J2Ym14NUlHUmxabUYxYkhSU2IzVjBaVDg2SUhOMGNtbHVaenRjYmx4MFhIUjlYRzVjZEgxY2JseHVYSFJqYkdGemN5Qk9iMlJsUlhod1lXNWtaWElnWlhoMFpXNWtjeUJEYkdGemN5QjdYRzVjZEZ4MFkyOXVjM1J5ZFdOMGIzSW9jSEpwZG1GMFpTQnliM1YwWlhJNklGSnZkWFJsY2p4aGJuaytMQ0J6YjNWeVkyVlFZWFJvT2lCQ2FXNWtZV0pzWlR4emRISnBibWMrTEZ4dVhIUmNkRngwWEhSY2RIUmhjbWRsZEZCaGRHZzZJRWxRY205d1pYSjBlVHh6ZEhKcGJtYytMQ0JsZUhCaGJtUmxaRG9nU1ZCeWIzQmxjblI1UEdKdmIyeGxZVzQrS1NCN1hHNWNkRngwWEhSemRYQmxjaWdwTzF4dVhIUmNkRngwZEdocGN5NXZkMjRvYm1WM0lFTnZjR2xsY2loemIzVnlZMlZRWVhSb0xDQjBZWEpuWlhSUVlYUm9LU2s3WEc1Y2RGeDBYSFJsZUhCaGJtUmxaQzV6WlhRb2RISjFaU2s3WEc1Y2RGeDBYSFIwYUdsekxtOTNiaWhsZUhCaGJtUmxaQzVqYUdGdVoyVkZkbVZ1ZEM1c2FYTjBaVzRvS0NrZ1BUNGdlMXh1WEhSY2RGeDBYSFIwYUdsekxuSnZkWFJsY2k1eVpXUnBjbVZqZENoY0lsd2lLVnh1WEhSY2RGeDBmU2twTzF4dVhIUmNkSDFjYmx4MGZWeHVmVnh1SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19pbXBvcnREZWZhdWx0ID0gdm9pZCAwICYmICh2b2lkIDApLl9faW1wb3J0RGVmYXVsdCB8fCBmdW5jdGlvbiAobW9kKSB7XG4gIHJldHVybiBtb2QgJiYgbW9kLl9fZXNNb2R1bGUgPyBtb2QgOiB7XG4gICAgXCJkZWZhdWx0XCI6IG1vZFxuICB9O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIFJvdXRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1JvdXRlclwiKSk7XG4vKipcclxuICogU2hvcnRoYW5kIGZvciBSb3V0ZXI8Q29tcG9uZW50Pi5cclxuICovXG5cblxudmFyIFVJUm91dGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfUm91dGVyXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoVUlSb3V0ZXIsIF9Sb3V0ZXJfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFVJUm91dGVyKTtcblxuICBmdW5jdGlvbiBVSVJvdXRlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVUlSb3V0ZXIpO1xuXG4gICAgcmV0dXJuIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIFVJUm91dGVyO1xufShSb3V0ZXJfMS5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVUlSb3V0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVZTVkp2ZFhSbGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGNVFrRXNTVUZCUVN4UlFVRkJMRWRCUVVFc1pVRkJRU3hEUVVGQkxFOUJRVUVzUTBGQlFTeFZRVUZCTEVOQlFVRXNRMEZCUVR0QlFVVkJPenM3T3p0SlFVZHhRaXhST3pzN096czdPenM3T3pzN1JVRkJhVUlzVVVGQlFTeERRVUZCTEU4N08wRkJRWFJETEU5QlFVRXNRMEZCUVN4UFFVRkJMRWRCUVVFc1VVRkJRU0lzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNU5TVlFnVEdsalpXNXpaVnh1WEc1RGIzQjVjbWxuYUhRZ0tHTXBJREl3TWpBZ1JXZHZjaUJPWlhCdmJXNTVZWE5qYUdsb1hHNWNibEJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhJR052Y0hsY2JtOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxJRndpVTI5bWRIZGhjbVZjSWlrc0lIUnZJR1JsWVd4Y2JtbHVJSFJvWlNCVGIyWjBkMkZ5WlNCM2FYUm9iM1YwSUhKbGMzUnlhV04wYVc5dUxDQnBibU5zZFdScGJtY2dkMmwwYUc5MWRDQnNhVzFwZEdGMGFXOXVJSFJvWlNCeWFXZG9kSE5jYm5SdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN3Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd4Y2JtTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUWdjR1Z5YzI5dWN5QjBieUIzYUc5dElIUm9aU0JUYjJaMGQyRnlaU0JwYzF4dVpuVnlibWx6YUdWa0lIUnZJR1J2SUhOdkxDQnpkV0pxWldOMElIUnZJSFJvWlNCbWIyeHNiM2RwYm1jZ1kyOXVaR2wwYVc5dWN6cGNibHh1VkdobElHRmliM1psSUdOdmNIbHlhV2RvZENCdWIzUnBZMlVnWVc1a0lIUm9hWE1nY0dWeWJXbHpjMmx2YmlCdWIzUnBZMlVnYzJoaGJHd2dZbVVnYVc1amJIVmtaV1FnYVc0Z1lXeHNYRzVqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dVhHNVVTRVVnVTA5R1ZGZEJVa1VnU1ZNZ1VGSlBWa2xFUlVRZ1hDSkJVeUJKVTF3aUxDQlhTVlJJVDFWVUlGZEJVbEpCVGxSWklFOUdJRUZPV1NCTFNVNUVMQ0JGV0ZCU1JWTlRJRTlTWEc1SlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1FsVlVJRTVQVkNCTVNVMUpWRVZFSUZSUElGUklSU0JYUVZKU1FVNVVTVVZUSUU5R0lFMUZVa05JUVU1VVFVSkpURWxVV1N4Y2JrWkpWRTVGVTFNZ1JrOVNJRUVnVUVGU1ZFbERWVXhCVWlCUVZWSlFUMU5GSUVGT1JDQk9UMDVKVGtaU1NVNUhSVTFGVGxRdUlFbE9JRTVQSUVWV1JVNVVJRk5JUVV4TUlGUklSVnh1UVZWVVNFOVNVeUJQVWlCRFQxQlpVa2xIU0ZRZ1NFOU1SRVZTVXlCQ1JTQk1TVUZDVEVVZ1JrOVNJRUZPV1NCRFRFRkpUU3dnUkVGTlFVZEZVeUJQVWlCUFZFaEZVbHh1VEVsQlFrbE1TVlJaTENCWFNFVlVTRVZTSUVsT0lFRk9JRUZEVkVsUFRpQlBSaUJEVDA1VVVrRkRWQ3dnVkU5U1ZDQlBVaUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTeGNiazlWVkNCUFJpQlBVaUJKVGlCRFQwNU9SVU5VU1U5T0lGZEpWRWdnVkVoRklGTlBSbFJYUVZKRklFOVNJRlJJUlNCVlUwVWdUMUlnVDFSSVJWSWdSRVZCVEVsT1IxTWdTVTRnVkVoRlhHNVRUMFpVVjBGU1JTNWNiaW92WEc1Y2JtbHRjRzl5ZENCRGIyMXdiMjVsYm5RZ1puSnZiU0JjSWk0dlEyOXRjRzl1Wlc1MFhDSTdYRzVwYlhCdmNuUWdVbTkxZEdWeUlHWnliMjBnWENJdUwxSnZkWFJsY2x3aU8xeHVYRzR2S2lwY2JpQXFJRk5vYjNKMGFHRnVaQ0JtYjNJZ1VtOTFkR1Z5UEVOdmJYQnZibVZ1ZEQ0dVhHNGdLaTljYm1WNGNHOXlkQ0JrWldaaGRXeDBJR05zWVhOeklGVkpVbTkxZEdWeUlHVjRkR1Z1WkhNZ1VtOTFkR1Z5UEVOdmJYQnZibVZ1ZEQ0Z2UxeHVmVnh1SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2FuY2VsVG9rZW5fMSA9IHJlcXVpcmUoXCIuL0NhbmNlbFRva2VuXCIpO1xuLyoqXHJcbiAqIFByb21pc2Ugd3JhcHBlciBvdmVyIHNldFRpbWVvdXQgZnVuY3Rpb24gd2l0aCBDYW5jZWxUb2tlbiBzdXBwb3J0LiBSZXNvbHZlcyB0aGUgcHJvbWlzZSBhZnRlciBzcGVjaWZpZWRcclxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xyXG4gKiByZXNvbHZlZCBvciByZWplY3RlZC5cclxuICogQHBhcmFtIG1zIFRpbWVvdXQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxyXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cclxuICogQHJldHVybnMgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSB0aW1lb3V0LlxyXG4gKi9cblxuXG5mdW5jdGlvbiBkZWZhdWx0XzEobXMsIGNhbmNlbFRva2VuKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gQ2FuY2VsVG9rZW5fMS5ydW5Bc3luYyhmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XG4gIH0sIGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH0sIGNhbmNlbFRva2VuKTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlrWldabGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRjNRa0VzU1VGQlFTeGhRVUZCTEVkQlFVRXNUMEZCUVN4RFFVRkJMR1ZCUVVFc1EwRkJRVHRCUVVWQk96czdPenM3T3pzN08wRkJVVUVzVTBGQlFTeFRRVUZCTEVOQlFYbENMRVZCUVhwQ0xFVkJRWE5ETEZkQlFYUkRMRVZCUVN0RU8wRkJRemxFTEUxQlFVa3NUMEZCU2p0QlFVTkJMRk5CUVU4c1lVRkJRU3hEUVVGQkxGRkJRVUVzUTBGRFRpeFZRVUZETEU5QlFVUXNSVUZCYzBRN1FVRkRja1FzU1VGQlFTeFBRVUZQTEVkQlFVY3NUVUZCVFN4RFFVRkRMRlZCUVZBc1EwRkJhMElzVDBGQmJFSXNSVUZCTWtJc1JVRkJNMElzUTBGQlZqdEJRVU5CTEVkQlNFc3NSVUZKVGl4WlFVRkxPMEZCUTBvc1NVRkJRU3haUVVGWkxFTkJRVU1zVDBGQlJDeERRVUZhTzBGQlEwRXNSMEZPU3l4RlFVOU9MRmRCVUUwc1EwRkJVRHRCUVZOQk96dEJRVmhFTEU5QlFVRXNRMEZCUVN4UFFVRkJMRWRCUVVFc1UwRkJRU0lzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNU5TVlFnVEdsalpXNXpaVnh1WEc1RGIzQjVjbWxuYUhRZ0tHTXBJREl3TWpBZ1JXZHZjaUJPWlhCdmJXNTVZWE5qYUdsb1hHNWNibEJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhJR052Y0hsY2JtOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxJRndpVTI5bWRIZGhjbVZjSWlrc0lIUnZJR1JsWVd4Y2JtbHVJSFJvWlNCVGIyWjBkMkZ5WlNCM2FYUm9iM1YwSUhKbGMzUnlhV04wYVc5dUxDQnBibU5zZFdScGJtY2dkMmwwYUc5MWRDQnNhVzFwZEdGMGFXOXVJSFJvWlNCeWFXZG9kSE5jYm5SdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN3Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd4Y2JtTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUWdjR1Z5YzI5dWN5QjBieUIzYUc5dElIUm9aU0JUYjJaMGQyRnlaU0JwYzF4dVpuVnlibWx6YUdWa0lIUnZJR1J2SUhOdkxDQnpkV0pxWldOMElIUnZJSFJvWlNCbWIyeHNiM2RwYm1jZ1kyOXVaR2wwYVc5dWN6cGNibHh1VkdobElHRmliM1psSUdOdmNIbHlhV2RvZENCdWIzUnBZMlVnWVc1a0lIUm9hWE1nY0dWeWJXbHpjMmx2YmlCdWIzUnBZMlVnYzJoaGJHd2dZbVVnYVc1amJIVmtaV1FnYVc0Z1lXeHNYRzVqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dVhHNVVTRVVnVTA5R1ZGZEJVa1VnU1ZNZ1VGSlBWa2xFUlVRZ1hDSkJVeUJKVTF3aUxDQlhTVlJJVDFWVUlGZEJVbEpCVGxSWklFOUdJRUZPV1NCTFNVNUVMQ0JGV0ZCU1JWTlRJRTlTWEc1SlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1FsVlVJRTVQVkNCTVNVMUpWRVZFSUZSUElGUklSU0JYUVZKU1FVNVVTVVZUSUU5R0lFMUZVa05JUVU1VVFVSkpURWxVV1N4Y2JrWkpWRTVGVTFNZ1JrOVNJRUVnVUVGU1ZFbERWVXhCVWlCUVZWSlFUMU5GSUVGT1JDQk9UMDVKVGtaU1NVNUhSVTFGVGxRdUlFbE9JRTVQSUVWV1JVNVVJRk5JUVV4TUlGUklSVnh1UVZWVVNFOVNVeUJQVWlCRFQxQlpVa2xIU0ZRZ1NFOU1SRVZTVXlCQ1JTQk1TVUZDVEVVZ1JrOVNJRUZPV1NCRFRFRkpUU3dnUkVGTlFVZEZVeUJQVWlCUFZFaEZVbHh1VEVsQlFrbE1TVlJaTENCWFNFVlVTRVZTSUVsT0lFRk9JRUZEVkVsUFRpQlBSaUJEVDA1VVVrRkRWQ3dnVkU5U1ZDQlBVaUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTeGNiazlWVkNCUFJpQlBVaUJKVGlCRFQwNU9SVU5VU1U5T0lGZEpWRWdnVkVoRklGTlBSbFJYUVZKRklFOVNJRlJJUlNCVlUwVWdUMUlnVDFSSVJWSWdSRVZCVEVsT1IxTWdTVTRnVkVoRlhHNVRUMFpVVjBGU1JTNWNiaW92WEc1Y2JtbHRjRzl5ZENCRFlXNWpaV3hVYjJ0bGJpd2dlM0oxYmtGemVXNWpmU0JtY205dElGd2lMaTlEWVc1alpXeFViMnRsYmx3aU8xeHVYRzR2S2lwY2JpQXFJRkJ5YjIxcGMyVWdkM0poY0hCbGNpQnZkbVZ5SUhObGRGUnBiV1Z2ZFhRZ1puVnVZM1JwYjI0Z2QybDBhQ0JEWVc1alpXeFViMnRsYmlCemRYQndiM0owTGlCU1pYTnZiSFpsY3lCMGFHVWdjSEp2YldselpTQmhablJsY2lCemNHVmphV1pwWldSY2JpQXFJSEJsY21sdlpDQnZaaUIwYVcxbExpQk9aWFpsY2lCeVpXcGxZM1J6SUhSb1pTQndjbTl0YVhObExpQkpaaUIwYUdVZ2IzQmxjbUYwYVc5dUlHZGxkSE1nWTJGdVkyVnNiR1ZrSUhacFlTQjBhR1VnZEc5clpXNHNJSFJvWlNCd2NtOXRhWE5sSUc1bGRtVnlJR2RsZEhOY2JpQXFJSEpsYzI5c2RtVmtJRzl5SUhKbGFtVmpkR1ZrTGx4dUlDb2dRSEJoY21GdElHMXpJRlJwYldWdmRYUWdaSFZ5WVhScGIyNGdhVzRnYldsc2JHbHpaV052Ym1SekxseHVJQ29nUUhCaGNtRnRJR05oYm1ObGJGUnZhMlZ1SUVOaGJtTmxiR3hoZEdsdmJpQjBiMnRsYmlCMGJ5QmlhVzVrSUhSb1pTQnZjR1Z5WVhScGIyNGdkRzh1WEc0Z0tpQkFjbVYwZFhKdWN5QlFjbTl0YVhObElHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUhScGJXVnZkWFF1WEc0Z0tpOWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlDaHRjejg2SUc1MWJXSmxjaXdnWTJGdVkyVnNWRzlyWlc0L09pQkRZVzVqWld4VWIydGxiaWs2SUZCeWIyMXBjMlU4ZG05cFpENGdlMXh1WEhSc1pYUWdkR2x0Wlc5MWREb2diblZ0WW1WeU8xeHVYSFJ5WlhSMWNtNGdjblZ1UVhONWJtTThkbTlwWkQ0b1hHNWNkRngwS0hKbGMyOXNkbVU2SUNoMllXeDFaVDg2SUNoUWNtOXRhWE5sUEhadmFXUStJSHdnZG05cFpDa3BJRDArSUhadmFXUXBJRDArSUh0Y2JseDBYSFJjZEhScGJXVnZkWFFnUFNCM2FXNWtiM2N1YzJWMFZHbHRaVzkxZENoeVpYTnZiSFpsTENCdGN5azdYRzVjZEZ4MGZTeGNibHgwWEhRb0tTQTlQaUI3WEc1Y2RGeDBYSFJqYkdWaGNsUnBiV1Z2ZFhRb2RHbHRaVzkxZENrN1hHNWNkRngwZlN4Y2JseDBYSFJqWVc1alpXeFViMnRsYmx4dVhIUXBPMXh1ZlZ4dUlsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19pbXBvcnREZWZhdWx0ID0gdm9pZCAwICYmICh2b2lkIDApLl9faW1wb3J0RGVmYXVsdCB8fCBmdW5jdGlvbiAobW9kKSB7XG4gIHJldHVybiBtb2QgJiYgbW9kLl9fZXNNb2R1bGUgPyBtb2QgOiB7XG4gICAgXCJkZWZhdWx0XCI6IG1vZFxuICB9O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGpxdWVyeV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXG52YXIgUHJvcGVydHlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qcm9wZXJ0eVwiKSk7XG5cbnZhciBIYXNoID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfUHJvcGVydHlfMSRkZWZhdWx0KSB7XG4gIF9pbmhlcml0cyhIYXNoLCBfUHJvcGVydHlfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKEhhc2gpO1xuXG4gIGZ1bmN0aW9uIEhhc2goKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEhhc2gpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBsb2NhdGlvbi5oYXNoLnN1YnN0cigxKSk7XG4gICAgX3RoaXMucmVkaXJlY3Rpb25EZXRlY3Rpb25JbnRlcnZhbCA9IDEwMDA7XG4gICAgX3RoaXMucmVkaXJlY3Rpb25EZXRlY3Rpb25MaW1pdCA9IDI1O1xuICAgIF90aGlzLnJlZGlyZWN0aW9uU3RhcnRUaW1lID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuICAgIF90aGlzLnJlZGlyZWN0aW9uVXJscyA9IFtdO1xuICAgIF90aGlzLnJlZGlyZWN0aW9uTG9ja2VkID0gZmFsc2U7XG4gICAgX3RoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaGFzaCAhPSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIYXNoIGlzIGEgc2luZ2xldG9uLiBVbmFibGUgdG8gY3JlYXRlIG1vcmUgaW5zdGFuY2VzLlwiKTtcbiAgICB9XG5cbiAgICBoYXNoID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyk7XG4gICAganF1ZXJ5XzEuZGVmYXVsdCh3aW5kb3cpLm9uKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5zZXQobG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhIYXNoLCBbe1xuICAgIGtleTogXCJzZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0KCkge1xuICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBcIlwiO1xuICAgICAgdmFyIHJlcGxhY2VTdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodGhpcy5yZWRpcmVjdGlvbkxvY2tlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgIGlmIChvbGRWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICBpZiAodGltZSAtIHRoaXMucmVkaXJlY3Rpb25TdGFydFRpbWUgPCB0aGlzLnJlZGlyZWN0aW9uRGV0ZWN0aW9uSW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5yZWRpcmVjdGlvblVybHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVkaXJlY3Rpb25VcmxzLmxlbmd0aCA+IHRoaXMucmVkaXJlY3Rpb25EZXRlY3Rpb25MaW1pdCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFbmRsZXNzIFVSTCByZWRpcmVjdGlvbiBkZXRlY3RlZC4gUHJldmVudGluZyBhbGwgZnVydGhlciByZWRpcmVjdGlvbnMuIFNlZSBVUkxzIGJlbG93LiBcIiArIFwiSWYgdGhpcyBpbmZvcm1hdGlvbiBpcyBub3QgZW5vdWdoLCBwbGVhc2Ugc2V0IGJyZWFrcG9pbnQgdG8gdGhpcyBtZXRob2QgYW5kIGZpbmQgb3V0IHdoYXQgY2F1c2VzIFwiICsgXCJ1bmV4cGVjdGVkIHJlZGlyZWN0aW9uIGNhbGxzLiBQcm9iYWJseSB5b3UgaGF2ZSBtaXNjb25maWd1cmVkIHNvbWUgcm91dGVyIC0gXCIgKyBcInBsZWFzZSBjaGVjayByb3V0ZXIgbmFtZXMgYW5kIHBhcmVudHMuXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVkaXJlY3Rpb25VcmxzKTtcbiAgICAgICAgICB0aGlzLnJlZGlyZWN0aW9uTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVkaXJlY3Rpb25TdGFydFRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLnJlZGlyZWN0aW9uVXJscyA9IFt2YWx1ZV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgaWYgKHJlcGxhY2VTdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeSAmJiBoaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCBsb2NhdGlvbi5wYXRobmFtZSArIFwiI1wiICsgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiI1wiICsgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NoYW5nZUV2ZW50LnRyaWdnZXIoe1xuICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRpbmdcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl91cGRhdGluZztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSGFzaDtcbn0oUHJvcGVydHlfMS5kZWZhdWx0KTtcbi8qKlxyXG4gKiBJbnN0YW5jZSBvZiBJSGFzaCBzaW5nbGV0b24uIFByb3ZpZGVzIGEgdHJhbnNwYXJlbnQgUHJvcGVydHktY29tcGF0aWJsZSBpbnRlcmZhY2Ugb3ZlciBgbG9jYXRpb24uaGFzaGBcclxuICogbWFuaXB1bGF0aW9ucy4gVmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBhbHdheXMgZXF1YWwgdG8gYGxvY2F0aW9uLmhhc2hgIHdpdGhvdXQgbGVhZGluZyBcIiNcIiBzeW1ib2wuXHJcbiAqIEhhcyBhIGJ1aWx0LWluIHByb3RlY3Rpb24gYWdhaW5zdCBpbmZpbml0ZSByZWRpcmVjdGlvbnMuXHJcbiAqL1xuXG5cbnZhciBoYXNoID0gbnVsbDsgLy8gQW4gZXh0cmEgdmFyaWFibGUgaGVscHMgSW50ZWxsaVNlbnNlIHRvIGZpbmQgdGhpcyBpbXBvcnRcblxubmV3IEhhc2goKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGhhc2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OW9ZWE5vTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGM1FrRXNTVUZCUVN4UlFVRkJMRWRCUVVFc1pVRkJRU3hEUVVGQkxFOUJRVUVzUTBGQlFTeFJRVUZCTEVOQlFVRXNRMEZCUVRzN1FVRkZRU3hKUVVGQkxGVkJRVUVzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRkJMRmxCUVVFc1EwRkJRU3hEUVVGQk96dEpRWGRDVFN4Sk96czdPenRCUVZkTUxHdENRVUZCTzBGQlFVRTdPMEZCUVVFN08wRkJRME1zT0VKQlFVMHNVVUZCVVN4RFFVRkRMRWxCUVZRc1EwRkJZeXhOUVVGa0xFTkJRWEZDTEVOQlFYSkNMRU5CUVU0N1FVRldaMElzVlVGQlFTdzBRa0ZCUVN4SFFVRXJRaXhKUVVFdlFqdEJRVU5CTEZWQlFVRXNlVUpCUVVFc1IwRkJORUlzUlVGQk5VSTdRVUZGVkN4VlFVRkJMRzlDUVVGQkxFZEJRWFZDTEUxQlFVMHNRMEZCUXl4cFFrRkJPVUk3UVVGRFFTeFZRVUZCTEdWQlFVRXNSMEZCTkVJc1JVRkJOVUk3UVVGRFFTeFZRVUZCTEdsQ1FVRkJMRWRCUVc5Q0xFdEJRWEJDTzBGQlJVRXNWVUZCUVN4VFFVRkJMRWRCUVZrc1MwRkJXanM3UVVGSlVDeFJRVUZKTEVsQlFVa3NTVUZCU1N4SlFVRmFMRVZCUVd0Q08wRkJRMnBDTEZsQlFVMHNTVUZCU1N4TFFVRktMRU5CUVZVc2RVUkJRVllzUTBGQlRqdEJRVU5CT3p0QlFVTkVMRWxCUVVFc1NVRkJTU3huUTBGQlNqdEJRVU5CTEVsQlFVRXNVVUZCUVN4RFFVRkJMRTlCUVVFc1EwRkJUeXhOUVVGUUxFVkJRV1VzUlVGQlppeERRVUZyUWl4WlFVRnNRaXhGUVVGblF5eFpRVUZMTzBGQlEzQkRMRmxCUVVzc1IwRkJUQ3hEUVVGVExGRkJRVkVzUTBGQlF5eEpRVUZVTEVOQlFXTXNUVUZCWkN4RFFVRnhRaXhEUVVGeVFpeERRVUZVTzBGQlEwRXNTMEZHUkR0QlFVNUVPMEZCVTBNN096czdNRUpCVFRaRE8wRkJRVUVzVlVGQk1VTXNTMEZCTUVNc2RVVkJRVEZDTEVWQlFUQkNPMEZCUVVFc1ZVRkJkRUlzV1VGQmMwSTdPMEZCUXpkRExGVkJRVWtzUzBGQlN5eHBRa0ZCVkN4RlFVRTBRanRCUVVNelFqdEJRVU5CT3p0QlFVTkVMRlZCUVUwc1VVRkJVU3hIUVVGSExFdEJRVXNzUzBGQmRFSTdPMEZCUTBFc1ZVRkJTU3hSUVVGUkxFdEJRVXNzUzBGQmFrSXNSVUZCZDBJN1FVRkRka0k3UVVGRFFUczdRVUZGUkN4VlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFbEJRVW9zUjBGQlZ5eFBRVUZZTEVWQlFXSTdPMEZCUTBFc1ZVRkJTU3hKUVVGSkxFZEJRVWNzUzBGQlN5eHZRa0ZCV2l4SFFVRnRReXhMUVVGTExEUkNRVUUxUXl4RlFVRXdSVHRCUVVONlJTeGhRVUZMTEdWQlFVd3NRMEZCY1VJc1NVRkJja0lzUTBGQk1FSXNTMEZCTVVJN08wRkJRMEVzV1VGQlNTeExRVUZMTEdWQlFVd3NRMEZCY1VJc1RVRkJja0lzUjBGQk9FSXNTMEZCU3l4NVFrRkJka01zUlVGQmEwVTdRVUZEYWtVc1ZVRkJRU3hQUVVGUExFTkJRVU1zUzBGQlVpeERRVUZqTERSR1FVTmlMRzFIUVVSaExFZEJSV0lzT0VWQlJtRXNSMEZIWWl4M1EwRklSRHRCUVVsQkxGVkJRVUVzVDBGQlR5eERRVUZETEVkQlFWSXNRMEZCV1N4TFFVRkxMR1ZCUVdwQ08wRkJRMEVzWlVGQlN5eHBRa0ZCVEN4SFFVRjVRaXhKUVVGNlFqdEJRVU5CTzBGQlEwRTdRVUZEUkN4UFFWaEVMRTFCVjA4N1FVRkRUaXhoUVVGTExHOUNRVUZNTEVkQlFUUkNMRWxCUVRWQ08wRkJRMEVzWVVGQlN5eGxRVUZNTEVkQlFYVkNMRU5CUVVNc1MwRkJSQ3hEUVVGMlFqdEJRVU5CT3p0QlFVVkVMRmRCUVVzc1UwRkJUQ3hIUVVGcFFpeEpRVUZxUWp0QlFVTkJMRmRCUVVzc1MwRkJUQ3hIUVVGaExFdEJRV0k3TzBGQlEwRXNWVUZCU1N4WlFVRlpMRWxCUVVrc1RVRkJUU3hEUVVGRExFOUJRWFpDTEVsQlFXdERMRTlCUVU4c1EwRkJReXhaUVVFNVF5eEZRVUUwUkR0QlFVTXpSQ3hSUVVGQkxFOUJRVThzUTBGQlF5eFpRVUZTTEVOQlFYRkNMRWxCUVhKQ0xFVkJRVEpDTEVWQlFUTkNMRVZCUVN0Q0xGRkJRVkVzUTBGQlF5eFJRVUZVTEVkQlFXOUNMRWRCUVhCQ0xFZEJRVEJDTEV0QlFYcEVPMEZCUTBFc1QwRkdSQ3hOUVVWUE8wRkJRMDRzVVVGQlFTeFJRVUZSTEVOQlFVTXNTVUZCVkN4SFFVRm5RaXhOUVVGTkxFdEJRWFJDTzBGQlEwRTdPMEZCUTBRc1YwRkJTeXhaUVVGTUxFTkJRV3RDTEU5QlFXeENMRU5CUVRCQ08wRkJRVU1zVVVGQlFTeE5RVUZOTEVWQlFVVXNTVUZCVkR0QlFVRmxMRkZCUVVFc1MwRkJTeXhGUVVGTUxFdEJRV1k3UVVGQmMwSXNVVUZCUVN4UlFVRlJMRVZCUVZJN1FVRkJkRUlzVDBGQk1VSTdPMEZCUTBFc1YwRkJTeXhUUVVGTUxFZEJRV2xDTEV0QlFXcENPMEZCUTBFN096dDNRa0YyUTFjN1FVRkRXQ3hoUVVGUExFdEJRVXNzVTBGQldqdEJRVU5CT3pzN08wVkJlRUpwUWl4VlFVRkJMRU5CUVVFc1R6dEJRV2RGYmtJN096czdPenM3UVVGTFFTeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRnNRaXhETEVOQlFYZENPenRCUVVONFFpeEpRVUZKTEVsQlFVbzdRVUZEUVN4UFFVRkJMRU5CUVVFc1QwRkJRU3hIUVVGbExFbEJRV1lpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHVUVWxVSUV4cFkyVnVjMlZjYmx4dVEyOXdlWEpwWjJoMElDaGpLU0F5TURJd0lFVm5iM0lnVG1Wd2IyMXVlV0Z6WTJocGFGeHVYRzVRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNXZaaUIwYUdseklITnZablIzWVhKbElHRnVaQ0JoYzNOdlkybGhkR1ZrSUdSdlkzVnRaVzUwWVhScGIyNGdabWxzWlhNZ0tIUm9aU0JjSWxOdlpuUjNZWEpsWENJcExDQjBieUJrWldGc1hHNXBiaUIwYUdVZ1UyOW1kSGRoY21VZ2QybDBhRzkxZENCeVpYTjBjbWxqZEdsdmJpd2dhVzVqYkhWa2FXNW5JSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6WEc1MGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNWpiM0JwWlhNZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTENCaGJtUWdkRzhnY0dWeWJXbDBJSEJsY25OdmJuTWdkRzhnZDJodmJTQjBhR1VnVTI5bWRIZGhjbVVnYVhOY2JtWjFjbTVwYzJobFpDQjBieUJrYnlCemJ5d2djM1ZpYW1WamRDQjBieUIwYUdVZ1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzVjYmxSb1pTQmhZbTkyWlNCamIzQjVjbWxuYUhRZ2JtOTBhV05sSUdGdVpDQjBhR2x6SUhCbGNtMXBjM05wYjI0Z2JtOTBhV05sSUhOb1lXeHNJR0psSUdsdVkyeDFaR1ZrSUdsdUlHRnNiRnh1WTI5d2FXVnpJRzl5SUhOMVluTjBZVzUwYVdGc0lIQnZjblJwYjI1eklHOW1JSFJvWlNCVGIyWjBkMkZ5WlM1Y2JseHVWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVeUJQVWx4dVNVMVFURWxGUkN3Z1NVNURURlZFU1U1SElFSlZWQ0JPVDFRZ1RFbE5TVlJGUkNCVVR5QlVTRVVnVjBGU1VrRk9WRWxGVXlCUFJpQk5SVkpEU0VGT1ZFRkNTVXhKVkZrc1hHNUdTVlJPUlZOVElFWlBVaUJCSUZCQlVsUkpRMVZNUVZJZ1VGVlNVRTlUUlNCQlRrUWdUazlPU1U1R1VrbE9SMFZOUlU1VUxpQkpUaUJPVHlCRlZrVk9WQ0JUU0VGTVRDQlVTRVZjYmtGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzSUVSQlRVRkhSVk1nVDFJZ1QxUklSVkpjYmt4SlFVSkpURWxVV1N3Z1YwaEZWRWhGVWlCSlRpQkJUaUJCUTFSSlQwNGdUMFlnUTA5T1ZGSkJRMVFzSUZSUFVsUWdUMUlnVDFSSVJWSlhTVk5GTENCQlVrbFRTVTVISUVaU1QwMHNYRzVQVlZRZ1QwWWdUMUlnU1U0Z1EwOU9Ua1ZEVkVsUFRpQlhTVlJJSUZSSVJTQlRUMFpVVjBGU1JTQlBVaUJVU0VVZ1ZWTkZJRTlTSUU5VVNFVlNJRVJGUVV4SlRrZFRJRWxPSUZSSVJWeHVVMDlHVkZkQlVrVXVYRzRxTDF4dVhHNXBiWEJ2Y25RZ2FsRjFaWEo1SUdaeWIyMGdYQ0pxY1hWbGNubGNJanRjYm1sdGNHOXlkQ0JKVUhKdmNHVnlkSGtnWm5KdmJTQmNJaTR2U1ZCeWIzQmxjblI1WENJN1hHNXBiWEJ2Y25RZ1VISnZjR1Z5ZEhrZ1puSnZiU0JjSWk0dlVISnZjR1Z5ZEhsY0lqdGNibHh1THlvcVhHNGdLaUJKYm5SbGNtWmhZMlVnYjJZZ1lHaGhjMmhnSUc5aWFtVmpkQzRnUlhoMFpXNXphVzl1SUc5bUlFbFFjbTl3WlhKMGVUeHpkSEpwYm1jK0lHbHVkR1Z5Wm1GalpTQjNhWFJvSUdCMWNHUmhkR2x1WjJBZ2MzUmhkSFZ6SUdsdVpHbGpZWFJ2Y2lCaGJtUmNiaUFxSUdCeVpYQnNZV05sVTNSaGRHVmdJRzl3ZEdsdmJtRnNJSEJoY21GdFpYUmxjaUJ2WmlCZ2MyVjBZQ0J0WlhSb2IyUXVYRzRnS2k5Y2JtVjRjRzl5ZENCcGJuUmxjbVpoWTJVZ1NVaGhjMmdnWlhoMFpXNWtjeUJKVUhKdmNHVnlkSGs4YzNSeWFXNW5QaUI3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRWx1WkdsallYUmxjeUJwWmlCb1lYTm9JR0Z6YzJsbmJtMWxiblFnYVhNZ2FXNGdjSEp2WjNKbGMzTWdZWFFnZEdobElHMXZiV1Z1ZEM0Z1YyaHBiR1VnWUhWd1pHRjBhVzVuWUNCcGN5QjBjblZsTENCZ2JHOWpZWFJwYjI0dWFHRnphR0JjYmx4MElDb2daMlYwY3lCdGIyUnBabWxsWkNCaGJtUWdZR05vWVc1blpVVjJaVzUwWUNCblpYUnpJSFJ5YVdkblpYSmxaQzRnUTJobFkydHBibWNnZEdocGN5Qm1iR0ZuSUdsdUlHTnZjbkpsYzNCdmJtUnBibWNnWlhabGJuUWdhR0Z1Wkd4bGNuTWdiV0Y1SUhCeVpYWmxiblJjYmx4MElDb2dhVzVtYVc1cGRHVWdiRzl2Y0hNZ1lXNWtJSFZ1Wlhod1pXTjBaV1FnWTJGc2JHSmhZMnNnWTI5dVpteHBZM1J6TGx4dVhIUWdLaTljYmx4MGNtVmhaRzl1YkhrZ2RYQmtZWFJwYm1jNklHSnZiMnhsWVc0N1hHNWNibHgwTHlvcVhHNWNkQ0FxSUVGemMybG5ibk1nWUd4dlkyRjBhVzl1TG1oaGMyaGdJSFJ2SUdFZ2JtVjNJSFpoYkhWbElHRnVaQ0IwY21sbloyVnljeUJnWTJoaGJtZGxSWFpsYm5SZ0xpQlNhWE5sY3lCZ2RYQmtZWFJwYm1kZ0lHWnNZV2NnZEc4Z2NISmxkbVZ1ZEZ4dVhIUWdLaUJwYm1acGJtbDBaU0JzYjI5d2N5QmhibVFnWTJGc2JHSmhZMnNnWTI5dVpteHBZM1J6SUdSMWNtbHVaeUIwYUdseklIUnBiV1V1WEc1Y2RDQXFJRUJ3WVhKaGJTQjJZV3gxWlNCT1pYY2dhR0Z6YUNCMllXeDFaU0IwYnlCaGMzTnBaMjR1WEc1Y2RDQXFJRUJ3WVhKaGJTQnlaWEJzWVdObFUzUmhkR1VnVW1Wd2JHRmpaU0IwYUdVZ1kzVnljbVZ1ZENCaWNtOTNjMlZ5SUdocGMzUnZjbWxqWVd3Z2MzUmhkR1VnY21GMGFHVnlJSFJvWVc0Z2NIVnphR2x1WnlCaElHNWxkeUJ6ZEdGMFpTQjBieUIwYUdVZ2MzUmhZMnN1WEc1Y2RDQXFMMXh1WEhSelpYUW9kbUZzZFdVNklITjBjbWx1Wnl3Z2NtVndiR0ZqWlZOMFlYUmxQem9nWW05dmJHVmhiaWs2SUhadmFXUTdYRzU5WEc1Y2JtTnNZWE56SUVoaGMyZ2daWGgwWlc1a2N5QlFjbTl3WlhKMGVUeHpkSEpwYm1jK0lHbHRjR3hsYldWdWRITWdTVWhoYzJnZ2UxeHVYRzVjZEhCeWFYWmhkR1VnY21WaFpHOXViSGtnY21Wa2FYSmxZM1JwYjI1RVpYUmxZM1JwYjI1SmJuUmxjblpoYkNBOUlERXdNREE3WEc1Y2RIQnlhWFpoZEdVZ2NtVmhaRzl1YkhrZ2NtVmthWEpsWTNScGIyNUVaWFJsWTNScGIyNU1hVzFwZENBOUlESTFPMXh1WEc1Y2RIQnlhWFpoZEdVZ2NtVmthWEpsWTNScGIyNVRkR0Z5ZEZScGJXVWdQU0JPZFcxaVpYSXVUa1ZIUVZSSlZrVmZTVTVHU1U1SlZGazdYRzVjZEhCeWFYWmhkR1VnY21Wa2FYSmxZM1JwYjI1VmNteHpPaUJ6ZEhKcGJtZGJYU0E5SUZ0ZE8xeHVYSFJ3Y21sMllYUmxJSEpsWkdseVpXTjBhVzl1VEc5amEyVmtJRDBnWm1Gc2MyVTdYRzVjYmx4MGNISnBkbUYwWlNCZmRYQmtZWFJwYm1jZ1BTQm1ZV3h6WlR0Y2JseHVYSFJqYjI1emRISjFZM1J2Y2lncElIdGNibHgwWEhSemRYQmxjaWhzYjJOaGRHbHZiaTVvWVhOb0xuTjFZbk4wY2lneEtTazdYRzVjZEZ4MGFXWWdLR2hoYzJnZ0lUMGdiblZzYkNrZ2UxeHVYSFJjZEZ4MGRHaHliM2NnYm1WM0lFVnljbTl5S0Z3aVNHRnphQ0JwY3lCaElITnBibWRzWlhSdmJpNGdWVzVoWW14bElIUnZJR055WldGMFpTQnRiM0psSUdsdWMzUmhibU5sY3k1Y0lpbGNibHgwWEhSOVhHNWNkRngwYUdGemFDQTlJSFJvYVhNN1hHNWNkRngwYWxGMVpYSjVLSGRwYm1SdmR5a3ViMjRvWENKb1lYTm9ZMmhoYm1kbFhDSXNJQ2dwSUQwK0lIdGNibHgwWEhSY2RIUm9hWE11YzJWMEtHeHZZMkYwYVc5dUxtaGhjMmd1YzNWaWMzUnlLREVwS1R0Y2JseDBYSFI5S1R0Y2JseDBmVnh1WEc1Y2RHZGxkQ0IxY0dSaGRHbHVaeWdwSUh0Y2JseDBYSFJ5WlhSMWNtNGdkR2hwY3k1ZmRYQmtZWFJwYm1jN1hHNWNkSDFjYmx4dVhIUnpaWFFvZG1Gc2RXVTZJSE4wY21sdVp5QTlJRndpWENJc0lISmxjR3hoWTJWVGRHRjBaVDg2SUdKdmIyeGxZVzRwSUh0Y2JseDBYSFJwWmlBb2RHaHBjeTV5WldScGNtVmpkR2x2Ymt4dlkydGxaQ2tnZTF4dVhIUmNkRngwY21WMGRYSnVPMXh1WEhSY2RIMWNibHgwWEhSamIyNXpkQ0J2YkdSV1lXeDFaU0E5SUhSb2FYTXVkbUZzZFdVN1hHNWNkRngwYVdZZ0tHOXNaRlpoYkhWbElEMDlQU0IyWVd4MVpTa2dlMXh1WEhSY2RGeDBjbVYwZFhKdU8xeHVYSFJjZEgxY2JseHVYSFJjZEdOdmJuTjBJSFJwYldVZ1BTQnVaWGNnUkdGMFpTZ3BMbWRsZEZScGJXVW9LVHRjYmx4MFhIUnBaaUFvZEdsdFpTQXRJSFJvYVhNdWNtVmthWEpsWTNScGIyNVRkR0Z5ZEZScGJXVWdQQ0IwYUdsekxuSmxaR2x5WldOMGFXOXVSR1YwWldOMGFXOXVTVzUwWlhKMllXd3BJSHRjYmx4MFhIUmNkSFJvYVhNdWNtVmthWEpsWTNScGIyNVZjbXh6TG5CMWMyZ29kbUZzZFdVcE8xeHVYSFJjZEZ4MGFXWWdLSFJvYVhNdWNtVmthWEpsWTNScGIyNVZjbXh6TG14bGJtZDBhQ0ErSUhSb2FYTXVjbVZrYVhKbFkzUnBiMjVFWlhSbFkzUnBiMjVNYVcxcGRDa2dlMXh1WEhSY2RGeDBYSFJqYjI1emIyeGxMbVZ5Y205eUtGd2lSVzVrYkdWemN5QlZVa3dnY21Wa2FYSmxZM1JwYjI0Z1pHVjBaV04wWldRdUlGQnlaWFpsYm5ScGJtY2dZV3hzSUdaMWNuUm9aWElnY21Wa2FYSmxZM1JwYjI1ekxpQlRaV1VnVlZKTWN5QmlaV3h2ZHk0Z1hDSWdLMXh1WEhSY2RGeDBYSFJjZEZ3aVNXWWdkR2hwY3lCcGJtWnZjbTFoZEdsdmJpQnBjeUJ1YjNRZ1pXNXZkV2RvTENCd2JHVmhjMlVnYzJWMElHSnlaV0ZyY0c5cGJuUWdkRzhnZEdocGN5QnRaWFJvYjJRZ1lXNWtJR1pwYm1RZ2IzVjBJSGRvWVhRZ1kyRjFjMlZ6SUZ3aUlDdGNibHgwWEhSY2RGeDBYSFJjSW5WdVpYaHdaV04wWldRZ2NtVmthWEpsWTNScGIyNGdZMkZzYkhNdUlGQnliMkpoWW14NUlIbHZkU0JvWVhabElHMXBjMk52Ym1acFozVnlaV1FnYzI5dFpTQnliM1YwWlhJZ0xTQmNJaUFyWEc1Y2RGeDBYSFJjZEZ4MFhDSndiR1ZoYzJVZ1kyaGxZMnNnY205MWRHVnlJRzVoYldWeklHRnVaQ0J3WVhKbGJuUnpMbHdpS1R0Y2JseDBYSFJjZEZ4MFkyOXVjMjlzWlM1c2IyY29kR2hwY3k1eVpXUnBjbVZqZEdsdmJsVnliSE1wTzF4dVhIUmNkRngwWEhSMGFHbHpMbkpsWkdseVpXTjBhVzl1VEc5amEyVmtJRDBnZEhKMVpUdGNibHgwWEhSY2RGeDBjbVYwZFhKdU8xeHVYSFJjZEZ4MGZWeHVYSFJjZEgwZ1pXeHpaU0I3WEc1Y2RGeDBYSFIwYUdsekxuSmxaR2x5WldOMGFXOXVVM1JoY25SVWFXMWxJRDBnZEdsdFpUdGNibHgwWEhSY2RIUm9hWE11Y21Wa2FYSmxZM1JwYjI1VmNteHpJRDBnVzNaaGJIVmxYVHRjYmx4MFhIUjlYRzVjYmx4MFhIUjBhR2x6TGw5MWNHUmhkR2x1WnlBOUlIUnlkV1U3WEc1Y2RGeDBkR2hwY3k1MllXeDFaU0E5SUhaaGJIVmxPMXh1WEhSY2RHbG1JQ2h5WlhCc1lXTmxVM1JoZEdVZ0ppWWdkMmx1Wkc5M0xtaHBjM1J2Y25rZ0ppWWdhR2x6ZEc5eWVTNXlaWEJzWVdObFUzUmhkR1VwSUh0Y2JseDBYSFJjZEdocGMzUnZjbmt1Y21Wd2JHRmpaVk4wWVhSbEtHNTFiR3dzSUZ3aVhDSXNJR3h2WTJGMGFXOXVMbkJoZEdodVlXMWxJQ3NnWENJalhDSWdLeUIyWVd4MVpTazdYRzVjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEd4dlkyRjBhVzl1TG1oaGMyZ2dQU0JjSWlOY0lpQXJJSFpoYkhWbE8xeHVYSFJjZEgxY2JseDBYSFIwYUdsekxsOWphR0Z1WjJWRmRtVnVkQzUwY21sbloyVnlLSHR6Wlc1a1pYSTZJSFJvYVhNc0lIWmhiSFZsTENCdmJHUldZV3gxWlgwcE8xeHVYSFJjZEhSb2FYTXVYM1Z3WkdGMGFXNW5JRDBnWm1Gc2MyVTdYRzVjZEgxY2JuMWNibHh1THlvcVhHNGdLaUJKYm5OMFlXNWpaU0J2WmlCSlNHRnphQ0J6YVc1bmJHVjBiMjR1SUZCeWIzWnBaR1Z6SUdFZ2RISmhibk53WVhKbGJuUWdVSEp2Y0dWeWRIa3RZMjl0Y0dGMGFXSnNaU0JwYm5SbGNtWmhZMlVnYjNabGNpQmdiRzlqWVhScGIyNHVhR0Z6YUdCY2JpQXFJRzFoYm1sd2RXeGhkR2x2Ym5NdUlGWmhiSFZsSUc5bUlIUm9hWE1nY0hKdmNHVnlkSGtnYVhNZ1lXeDNZWGx6SUdWeGRXRnNJSFJ2SUdCc2IyTmhkR2x2Ymk1b1lYTm9ZQ0IzYVhSb2IzVjBJR3hsWVdScGJtY2dYQ0lqWENJZ2MzbHRZbTlzTGx4dUlDb2dTR0Z6SUdFZ1luVnBiSFF0YVc0Z2NISnZkR1ZqZEdsdmJpQmhaMkZwYm5OMElHbHVabWx1YVhSbElISmxaR2x5WldOMGFXOXVjeTVjYmlBcUwxeHViR1YwSUdoaGMyZzZJRWxJWVhOb0lEMGdiblZzYkRzZ0x5OGdRVzRnWlhoMGNtRWdkbUZ5YVdGaWJHVWdhR1ZzY0hNZ1NXNTBaV3hzYVZObGJuTmxJSFJ2SUdacGJtUWdkR2hwY3lCcGJYQnZjblJjYm01bGR5QklZWE5vS0NrN1hHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCb1lYTm9PMXh1SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2IGp3aWQ9XFxcImhlYWRlclxcXCI+PGZvcm0gandpZD1cXFwidXJsLWZvcm1cXFwiPjxiPkN1cnJlbnQgVVJMIGhhc2g6PC9iPiAjXFxuXFx0XFx0XFx0PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGp3aWQ9XFxcInVybFxcXCI+PGlucHV0IHR5cGU9XFxcInN1Ym1pdFxcXCIgdmFsdWU9XFxcIkNoYW5nZSBub3chXFxcIj48L2Zvcm0+PGRpdj48Yj5QYWdlczo8L2I+PGEgandpZD1cXFwicm91dGVcXFwiIGRhdGEtcm91dGU9XFxcImluYm94XFxcIj5JbmJveDwvYT4gfFxcblxcdFxcdFxcdDxhIGp3aWQ9XFxcInJvdXRlXFxcIiBkYXRhLXJvdXRlPVxcXCJjb21wb3NlXFxcIj5Db21wb3NlPC9hPiB8XFxuXFx0XFx0XFx0PGEgandpZD1cXFwicm91dGVcXFwiIGRhdGEtcm91dGU9XFxcInNldHRpbmdzXFxcIj5TZXR0aW5nczwvYT48L2Rpdj48L2Rpdj48ZGl2IGp3aWQ9XFxcInBhZ2VcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBiaW5kVmFsIGZyb20gXCJqd2lkZ2V0L2JpbmRWYWxcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgaGFzaCBmcm9tIFwiandpZGdldC9oYXNoXCI7XG5pbXBvcnQgUm91dGVyIGZyb20gXCJqd2lkZ2V0L1JvdXRlclwiO1xuaW1wb3J0IFN3aXRjaGVyIGZyb20gXCJqd2lkZ2V0L1N3aXRjaGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBVSVJvdXRlciBmcm9tIFwiandpZGdldC9VSVJvdXRlclwiO1xuaW1wb3J0IENvbXBvc2UgZnJvbSBcIi4vQ29tcG9zZVwiO1xuaW1wb3J0IEluYm94IGZyb20gXCIuL0luYm94XCI7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSBcIi4vTm90Rm91bmRcIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi9TZXR0aW5nc1wiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgcm91dGVyOiBVSVJvdXRlcjtcblxuXHRwcm90ZWN0ZWQgYmVmb3JlUmVuZGVyKCkge1xuXHRcdHN1cGVyLmJlZm9yZVJlbmRlcigpO1xuXHRcdHRoaXMucm91dGVyID0gdGhpcy5vd24obmV3IFVJUm91dGVyKHtcblx0XHRcdHBhdGg6IGhhc2gsXG5cdFx0XHRoYW5kbGVyOiB7XG5cdFx0XHRcdHJvdXRlczoge1xuXHRcdFx0XHRcdFwiaW5ib3hcIjogYXJnID0+IG5ldyBJbmJveChhcmcsIHRoaXMucm91dGVyKSxcblx0XHRcdFx0XHRcImNvbXBvc2VcIjogKCkgPT4gbmV3IENvbXBvc2UoKSxcblx0XHRcdFx0XHRcInNldHRpbmdzXCI6ICgpID0+IG5ldyBTZXR0aW5ncygpLFxuXHRcdFx0XHRcdFwiXCI6ICgpID0+IG5ldyBSb3V0ZXIuUmVkaXJlY3RvcihcImluYm94XCIsIHRoaXMucm91dGVyKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRub3RGb3VuZDogcm91dGUgPT4gbmV3IE5vdEZvdW5kKHJvdXRlKVxuXHRcdFx0fVxuXHRcdH0pKTtcblx0XHR0aGlzLnJvdXRlci51cGRhdGUoKTtcblx0fVxuXG5cdC8vIFRoaXMgbWV0aG9kIHNpbXVsYXRlcyBicm93c2VyIHF1ZXJ5IHN0cmluZyBzdWJtaXR0aW5nXG5cdHByb3RlY3RlZCByZW5kZXJVcmxGb3JtKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcInN1Ym1pdFwiLCBldmVudCA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bG9jYXRpb24uaGFzaCA9IFwiI1wiICsgdGhpcy5nZXRFbGVtZW50KFwidXJsXCIpLnZhbCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gVGhpcyBtZXRob2Qgc2ltdWxhdGVzIGJyb3dzZXIgcXVlcnkgc3RyaW5nIG91dHB1dFxuXHRwcm90ZWN0ZWQgcmVuZGVyVXJsKGVsOiBKUXVlcnkpIHtcblx0XHR0aGlzLm93bihiaW5kVmFsKGVsLCBoYXNoKSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyUGFnZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5yb3V0ZXIudGFyZ2V0O1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclJvdXRlKGVsOiBKUXVlcnkpIHtcblx0XHQvLyBBc3NpZ24gaHJlZiBhdHRyaWJ1dGVzIHVzaW5nIGdldEZ1bGxQYXRoIG1ldGhvZFxuXHRcdGNvbnN0IHJvdXRlciA9IHRoaXMucm91dGVyO1xuXHRcdGVsLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3Qgcm91dGUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXJvdXRlXCIpO1xuXHRcdFx0JCh0aGlzKS5hdHRyKFwiaHJlZlwiLCBcIiNcIiArIHJvdXRlci5nZXRGdWxsUGF0aChyb3V0ZSkpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gVGhlIG5leHQgc3RydWN0dXJlIGhpZ2hsaWdodHMgdGhlIGFjdGl2ZSBtZW51IGl0ZW1cblx0XHRjb25zdCBhY3RpdmVFbGVtZW50ID0gdGhpcy5yb3V0ZXIucm91dGUubWFwKHJvdXRlID0+IGVsLmZpbHRlcignW2RhdGEtcm91dGU9XCInICsgcm91dGUgKyAnXCJdJykpO1xuXHRcdG5ldyBTd2l0Y2hlcihhY3RpdmVFbGVtZW50LCB7XG5cdFx0XHRpbml0OiBlbCA9PiBlbC5jc3MoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIiksXG5cdFx0XHRkb25lOiBlbCA9PiBlbC5jc3MoXCJmb250LXdlaWdodFwiLCBcIlwiKVxuXHRcdH0pO1xuXHR9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZSgnPHRleHRhcmVhIGp3Y2xhc3M9XCJjb21wb3NlXCIgY29scz1cIjgwXCIgcm93cz1cIjVcIj5Db21wb3NlIGVtYWlsISAodG8gYmUgZmFpciwgdGhpcyB0ZXh0IGFyZWEgaGFzIG5vIHJlYWwgcHVycG9zZSk8L3RleHRhcmVhPicpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb3NlIGV4dGVuZHMgQ29tcG9uZW50IHtcbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQge21hcExpc3R9IGZyb20gXCJqd2lkZ2V0L21hcHBlci9saXN0XCI7XG5pbXBvcnQgUmVhZG9ubHlMaXN0IGZyb20gXCJqd2lkZ2V0L1JlYWRvbmx5TGlzdFwiO1xuaW1wb3J0IEVtYWlsIGZyb20gXCIuL0VtYWlsXCI7XG5pbXBvcnQgRW1haWxMaXN0SXRlbSBmcm9tIFwiLi9FbWFpbExpc3RJdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYWlsTGlzdCBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbWFpbHM6IFJlYWRvbmx5TGlzdDxFbWFpbD4pIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclJvb3QoZWw6IEpRdWVyeSkge1xuXHRcdGVsLmFkZENsYXNzKFwiZW1haWwtbGlzdFwiKTtcblx0XHRyZXR1cm4gdGhpcy5vd24obWFwTGlzdCh0aGlzLmVtYWlscywgZW1haWwgPT4gbmV3IEVtYWlsTGlzdEl0ZW0oZW1haWwpKSk7XG5cdH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBFbWFpbCBmcm9tIFwiLi9FbWFpbFwiO1xuXG5AdGVtcGxhdGUoJzxhIGp3Y2xhc3M9XCJlbWFpbC1saXN0LWl0ZW1cIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPjwvYT4nKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1haWxMaXN0SXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbWFpbDogRW1haWwpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclJvb3QoZWw6IEpRdWVyeSkge1xuXHRcdGVsLnRleHQodGhpcy5lbWFpbC5zdW1tYXJ5KS5hdHRyKFwiaHJlZlwiLCBcIiNpbmJveC9cIiArIHRoaXMuZW1haWwuaWQpO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJlbWFpbC1ub3QtZm91bmRcXFwiPjxkaXY+RW1haWwgd2l0aCBpZCA8c3BhbiBqd2lkPVxcXCJpZFxcXCI+PC9zcGFuPiBpcyBub3QgZm91bmQ8L2Rpdj48ZGl2PjxhIGp3aWQ9XFxcImJhY2tcXFwiIGhyZWY9XFxcIiNcXFwiPkJhY2s8L2E+PC9kaXY+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcImp3aWRnZXQvUm91dGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmU8c3RyaW5nPihcIi4vRW1haWxOb3RGb3VuZC5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1haWxOb3RGb3VuZCBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBpZDogc3RyaW5nKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJJZChlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dCh0aGlzLmlkKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJCYWNrKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcImNsaWNrXCIsIGV2ZW50ID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIEluIHRoaXMgcGFydGljdWxhciBjYXNlIHdlIGtub3cgdGhhdCB0aGVyZSBpcyBubyByb3V0ZXIgYmVsb3csIHNvIHdlIGNhbiBza2lwXG5cdFx0XHQvLyByb3V0ZXIgc2VsZWN0aW9uIG9uIHJlZGlyZWN0aW9uLiBUaGUgbmV4dCBjYWxsIHVzZXMgYSBjdXJyZW50IHRvcCByb3V0ZXJcblx0XHRcdFJvdXRlci5yZWRpcmVjdChcImluYm94XCIpO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJlbWFpbFxcXCI+PGgzIGp3aWQ9XFxcInN1bW1hcnlcXFwiPjwvaDM+PGRpdiBqd2lkPVxcXCJjb250ZW50XFxcIj48L2Rpdj48ZGl2PjxhIGp3aWQ9XFxcImJhY2tcXFwiIGhyZWY9XFxcIiNcXFwiPkJhY2s8L2E+PC9kaXY+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcImp3aWRnZXQvUm91dGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBFbWFpbCBmcm9tIFwiLi9FbWFpbFwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9FbWFpbFZpZXcuancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYWlsVmlldyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbWFpbDogRW1haWwsIHByaXZhdGUgcGFyZW50Um91dGVyOiBSb3V0ZXI8YW55Pikge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyU3VtbWFyeShlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dCh0aGlzLmVtYWlsLnN1bW1hcnkpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckNvbnRlbnQoZWw6IEpRdWVyeSkge1xuXHRcdGVsLmh0bWwodGhpcy5lbWFpbC5jb250ZW50KTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJCYWNrKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcImNsaWNrXCIsIGV2ZW50ID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIElmIHlvdSBkb24ndCBrbm93IGV4YWN0bHkgaG93IG1hbnkgcm91dGVycyBjYW4gYmUgYWJvdmUgb3IgYmVsb3cgdGhpcyBjb21wb25lbnQsXG5cdFx0XHQvLyB1c2luZyBwYXJlbnQgcm91dGVyIG9uIHJlZGlyZWN0aW9uIGlzIGEgc21hcnQgY2hvaWNlXG5cdFx0XHR0aGlzLnBhcmVudFJvdXRlci5yZWRpcmVjdChcIlwiKTtcblx0XHR9KTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiaW5ib3hcXFwiPjxoMj5JbmJveDwvaDI+PGRpdiBqd2lkPVxcXCJjb250ZW50XFxcIj48L2Rpdj48L2Rpdj5cXG5cIjsiLCJpbXBvcnQge1NJTEVOVH0gZnJvbSBcImp3aWRnZXRcIjtcbmltcG9ydCBCaW5kYWJsZSBmcm9tIFwiandpZGdldC9CaW5kYWJsZVwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBMaXN0IGZyb20gXCJqd2lkZ2V0L0xpc3RcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcImp3aWRnZXQvUm91dGVyXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBVSVJvdXRlciBmcm9tIFwiandpZGdldC9VSVJvdXRlclwiO1xuaW1wb3J0IHtFTUFJTFN9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBFbWFpbExpc3QgZnJvbSBcIi4vRW1haWxMaXN0XCI7XG5pbXBvcnQgRW1haWxOb3RGb3VuZCBmcm9tIFwiLi9FbWFpbE5vdEZvdW5kXCI7XG5pbXBvcnQgRW1haWxWaWV3IGZyb20gXCIuL0VtYWlsVmlld1wiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9JbmJveC5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgcm91dGVyOiBVSVJvdXRlcjtcblx0cHJpdmF0ZSBlbWFpbHMgPSBuZXcgTGlzdChFTUFJTFMsIGVtYWlsID0+IGVtYWlsLmlkLCBTSUxFTlQpO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aDogQmluZGFibGU8c3RyaW5nPiwgcHJpdmF0ZSBwYXJlbnRSb3V0ZXI6IFJvdXRlcjxhbnk+KSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBiZWZvcmVSZW5kZXIoKSB7XG5cdFx0c3VwZXIuYmVmb3JlUmVuZGVyKCk7XG5cdFx0dGhpcy5yb3V0ZXIgPSB0aGlzLm93bihuZXcgVUlSb3V0ZXIoe1xuXHRcdFx0bmFtZTogXCJpbmJveFwiLFxuXHRcdFx0cGFyZW50OiB0aGlzLnBhcmVudFJvdXRlcixcblx0XHRcdHBhdGg6IHRoaXMucGF0aCxcblx0XHRcdGhhbmRsZXI6IGlkID0+IHtcblx0XHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgRW1haWxMaXN0KHRoaXMuZW1haWxzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCBlbWFpbCA9IHRoaXMuZW1haWxzLmZpbmQoZW1haWwgPT4gZW1haWwuaWQgPT09IGlkKTtcblx0XHRcdFx0cmV0dXJuIGVtYWlsICE9IG51bGwgPyBuZXcgRW1haWxWaWV3KGVtYWlsLCB0aGlzLnJvdXRlcikgOiBuZXcgRW1haWxOb3RGb3VuZChpZCk7XG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdHRoaXMucm91dGVyLnVwZGF0ZSgpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckNvbnRlbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMucm91dGVyLnRhcmdldDtcblx0fVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IHN0cmluZykge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyUm9vdChlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dCgnVGhlIHJlcXVlc3RlZCBwYWdlIFwiJyArIHRoaXMucm91dGUgKyAnXCIgaXMgbm90IGZvdW5kJyk7XG5cdH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKCc8ZGl2IGp3Y2xhc3M9XCJzZXR0aW5nc1wiPlRoZXJlXFwncyBub3RoaW5nIHRvIGNvbmZpZ3VyZSE8L2Rpdj4nKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBDb21wb25lbnQge1xufVxuIiwiZXhwb3J0IGNvbnN0IEVNQUlMUyA9IFtcblx0e1xuXHRcdGlkOiBcIjFcIixcblx0XHRzdW1tYXJ5OiBcIkhlbGxvXCIsXG5cdFx0Y29udGVudDogXCJIZWxsbyB0aGVyZSFcIlxuXHR9LCB7XG5cdFx0aWQ6IFwiMlwiLFxuXHRcdHN1bW1hcnk6IFwiUm91dGVyXCIsXG5cdFx0Y29udGVudDogXCJSb3V0ZXIgaXMgYW4gaW1wb3J0YW50IHBhcnQgb2YgYW55IHNpbmdsZSBwYWdlIGFwcGxpY2F0aW9uIVwiXG5cdH1cbl07XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcInJvdXRlclwiLCBbXCJpbmRleC50c1wiLCBcImRhdGEudHNcIiwgXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJDb21wb3NlLnRzXCIsXG5cdFx0XCJFbWFpbC50c1wiLCBcIkVtYWlsTGlzdC50c1wiLCBcIkVtYWlsTGlzdEl0ZW0udHNcIiwgXCJFbWFpbE5vdEZvdW5kLnRzXCIsIFwiRW1haWxOb3RGb3VuZC5qdy5odG1sXCIsIFwiRW1haWxWaWV3LnRzXCIsXG5cdFx0XCJFbWFpbFZpZXcuancuaHRtbFwiLCBcIkluYm94LnRzXCIsIFwiSW5ib3guancuaHRtbFwiLCBcIk5vdEZvdW5kLnRzXCIsIFwiU2V0dGluZ3MudHNcIl0pO1xuXG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==