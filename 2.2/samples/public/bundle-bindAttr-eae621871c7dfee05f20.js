(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindAttr"],{

/***/ "../../main/dist/bindAttr.js":
/*!********************************************!*\
  !*** C:/jwidget/git/main/dist/bindAttr.js ***!
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

var Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));

var AttrUpdater = /*#__PURE__*/function (_Class_1$default) {
  _inherits(AttrUpdater, _Class_1$default);

  var _super = _createSuper(AttrUpdater);

  function AttrUpdater(el, attr, property) {
    var _this;

    _classCallCheck(this, AttrUpdater);

    _this = _super.call(this);
    _this.el = el;
    _this.attr = attr;
    _this.property = property;

    _this._update();

    _this.own(property.changeEvent.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(AttrUpdater, [{
    key: "_update",
    value: function _update() {
      this.el.attr(this.attr, this.property.get());
    }
  }]);

  return AttrUpdater;
}(Class_1.default);
/**
 * Watches string property modification and updates the specified attribute of the DOM element.
 * Destroy the returned object to stop synchronization.
 * @param el DOM element.
 * @param attr Attribute name.
 * @param property Attribute value to assign.
 */


function bindAttr(el, attr, property) {
  return new AttrUpdater(el, attr, property);
}

exports.default = bindAttr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kQXR0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQUEsT0FBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0lBR00sVzs7Ozs7QUFDTCx1QkFBb0IsRUFBcEIsRUFBd0MsSUFBeEMsRUFBOEQsUUFBOUQsRUFBcUY7QUFBQTs7QUFBQTs7QUFDcEY7QUFEbUIsVUFBQSxFQUFBLEdBQUEsRUFBQTtBQUFvQixVQUFBLElBQUEsR0FBQSxJQUFBO0FBQXNCLFVBQUEsUUFBQSxHQUFBLFFBQUE7O0FBRTdELFVBQUssT0FBTDs7QUFDQSxVQUFLLEdBQUwsQ0FBUyxRQUFRLENBQUMsV0FBVCxDQUFxQixNQUFyQixDQUE0QixNQUFLLE9BQWpDLGdDQUFUOztBQUhvRjtBQUlwRjs7Ozs4QkFFYztBQUNkLFdBQUssRUFBTCxDQUFRLElBQVIsQ0FBYSxLQUFLLElBQWxCLEVBQXdCLEtBQUssUUFBTCxDQUFjLEdBQWQsRUFBeEI7QUFDQTs7OztFQVR3QixPQUFBLENBQUEsTztBQVkxQjs7Ozs7Ozs7O0FBT0EsU0FBd0IsUUFBeEIsQ0FBaUMsRUFBakMsRUFBNkMsSUFBN0MsRUFBMkQsUUFBM0QsRUFBa0Y7QUFDakYsU0FBTyxJQUFJLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsSUFBcEIsRUFBMEIsUUFBMUIsQ0FBUDtBQUNBOztBQUZELE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBCaW5kYWJsZSBmcm9tICcuL0JpbmRhYmxlJztcbmltcG9ydCBDbGFzcyBmcm9tICcuL0NsYXNzJztcbmltcG9ydCBEZXN0cm95YWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcblxuY2xhc3MgQXR0clVwZGF0ZXIgZXh0ZW5kcyBDbGFzcyB7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEpRdWVyeSwgcHJpdmF0ZSBhdHRyOiBzdHJpbmcsIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMub3duKHByb3BlcnR5LmNoYW5nZUV2ZW50Lmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHR0aGlzLmVsLmF0dHIodGhpcy5hdHRyLCB0aGlzLnByb3BlcnR5LmdldCgpKTtcblx0fVxufVxuXG4vKipcbiAqIFdhdGNoZXMgc3RyaW5nIHByb3BlcnR5IG1vZGlmaWNhdGlvbiBhbmQgdXBkYXRlcyB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZSBvZiB0aGUgRE9NIGVsZW1lbnQuXG4gKiBEZXN0cm95IHRoZSByZXR1cm5lZCBvYmplY3QgdG8gc3RvcCBzeW5jaHJvbml6YXRpb24uXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAqIEBwYXJhbSBwcm9wZXJ0eSBBdHRyaWJ1dGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kQXR0cihlbDogSlF1ZXJ5LCBhdHRyOiBzdHJpbmcsIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IEF0dHJVcGRhdGVyKGVsLCBhdHRyLCBwcm9wZXJ0eSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "./bindAttr/Application.jw.html":
/*!**************************************!*\
  !*** ./bindAttr/Application.jw.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div>\"title\" attribute: <input jwid=\"input\" type=\"text\" value=\"This is a tooltip!\"></div><div jwid=\"rect\">Modify as you wish and hover mouse to see a tooltip</div></div>\n";

/***/ }),

/***/ "./bindAttr/Application.styl":
/*!***********************************!*\
  !*** ./bindAttr/Application.styl ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./bindAttr/Application.ts":
/*!*********************************!*\
  !*** ./bindAttr/Application.ts ***!
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

var bindAttr_1 = __importDefault(__webpack_require__(/*! jwidget/bindAttr */ "../../main/dist/bindAttr.js"));

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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
      key: "renderRect",
      value: function renderRect(el) {
        // Watch input value
        var title = bindVal_1.default(this.getElement("input")); // Bind rectangle "title" attribute to title property value

        bindAttr_1.default(el, "title", title);
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindAttr/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindAttr/index.ts":
/*!***************************!*\
  !*** ./bindAttr/index.ts ***!
  \***************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindAttr/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./bindAttr/Application.styl");

jquery_1.default(function () {
  initExample_1.default("bindAttr", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ }),

/***/ "./common/initExample.ts":
/*!*******************************!*\
  !*** ./common/initExample.ts ***!
  \*******************************/
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

__webpack_require__(/*! core-js/stable */ "../../node_modules/core-js/stable/index.js");

__webpack_require__(/*! regenerator-runtime/runtime */ "../../node_modules/regenerator-runtime/runtime.js");

function initExample(name, links) {
  var el = jquery_1.default('<div style="float: right; width: 600px"><b>Source:</b> </div>');
  var first = true;
  links.forEach(function (link) {
    if (first) {
      first = false;
    } else {
      el.append(', ');
    }

    el.append(jquery_1.default('<a target="_blank"></a>').text(link).attr("href", "src/".concat(name, "/").concat(link, ".txt")));
  });
  jquery_1.default("body").prepend('<div><b>Example</b></div><div><a href="javascript:location.reload()">Refresh</a></div><hr style="clear: both">').prepend(el);
}

exports.default = initExample;

/***/ })

},[["./bindAttr/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRBdHRyLmpzIiwid2VicGFjazovLy8uL2JpbmRBdHRyL0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYmluZEF0dHIvQXBwbGljYXRpb24uc3R5bD9hNDM5Iiwid2VicGFjazovLy8uLi8uLi9zcmMvYmluZEF0dHIvQXBwbGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kQXR0ci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2NvbW1vbi9pbml0RXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJCQUEyQiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRXhYLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFOztBQUUzVCw2REFBNkQsc0VBQXNFLDhEQUE4RCxvQkFBb0I7O0FBRXJOLDBDQUEwQywrREFBK0QsMkVBQTJFLEVBQUUseUVBQXlFLGVBQWUsc0RBQXNELEVBQUUsRUFBRSx1REFBdUQ7O0FBRS9YLGdDQUFnQyw0RUFBNEUsaUJBQWlCLFVBQVUsR0FBRyw4QkFBOEI7O0FBRXhLLGdDQUFnQyw2REFBNkQseUNBQXlDLDhDQUE4QyxpQ0FBaUMsbURBQW1ELHlEQUF5RCxFQUFFLE9BQU8sdUNBQXVDLEVBQUUsaURBQWlELEdBQUc7O0FBRXZhLGlEQUFpRCwwRUFBMEUsYUFBYSxFQUFFLHFDQUFxQzs7QUFFL0ssdUNBQXVDLHVCQUF1Qix1RkFBdUYsRUFBRSxhQUFhOztBQUVwSyxzQ0FBc0Msd0VBQXdFLDBDQUEwQyw4Q0FBOEMsTUFBTSx3RUFBd0UsR0FBRyxhQUFhLEVBQUUsWUFBWSxjQUFjLEVBQUU7O0FBRWxVLDZCQUE2QixnR0FBZ0csZ0RBQWdELEdBQUcsMkJBQTJCOztBQUUzTTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELDhCQUE4QixtQkFBTyxDQUFDLHlDQUFTOztBQUUvQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLGNBQWMsK2lIOzs7Ozs7Ozs7OztBQ3hHekQsc087Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7QUFBQTtBQUFBO0FBQUEsTUFBcUIsV0FBckI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQUVzQixFQUZ0QixFQUVnQztBQUM5QjtBQUNBLFlBQU0sS0FBSyxHQUFHLGtCQUFRLEtBQUssVUFBTCxDQUFnQixPQUFoQixDQUFSLENBQWQsQ0FGOEIsQ0FJOUI7O0FBQ0EsMkJBQVMsRUFBVCxFQUFhLE9BQWIsRUFBc0IsS0FBdEI7QUFDQTtBQVJGOztBQUFBO0FBQUEsSUFBeUMsbUJBQXpDOztBQUFxQixhQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQVMsNkRBQVQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7QUFTckI7QUFBQyxDQVREOztrQkFBcUIsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOztBQUNBOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxVQUFaLEVBQXdCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLGtCQUExQyxFQUE4RCxVQUE5RCxDQUF4QjtBQUNBLE1BQUkscUJBQUosR0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQSxDQUhELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBOztBQUNBOztBQUNBOztBQUVBLFNBQXdCLFdBQXhCLENBQW9DLElBQXBDLEVBQWtELEtBQWxELEVBQWlFO0FBQ2hFLE1BQU0sRUFBRSxHQUFHLGlCQUFFLCtEQUFGLENBQVg7QUFDQSxNQUFJLEtBQUssR0FBRyxJQUFaO0FBQ0EsT0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBUztBQUN0QixRQUFJLEtBQUosRUFBVztBQUNWLFdBQUssR0FBRyxLQUFSO0FBQ0EsS0FGRCxNQUVPO0FBQ04sUUFBRSxDQUFDLE1BQUgsQ0FBVSxJQUFWO0FBQ0E7O0FBQ0QsTUFBRSxDQUFDLE1BQUgsQ0FBVSxpQkFBRSx5QkFBRixFQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxDQUE2QyxNQUE3QyxnQkFBNEQsSUFBNUQsY0FBb0UsSUFBcEUsVUFBVjtBQUNBLEdBUEQ7QUFRQSxtQkFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixnSEFBbEIsRUFBb0ksT0FBcEksQ0FBNEksRUFBNUk7QUFDQTs7QUFaRCw4QiIsImZpbGUiOiJidW5kbGUtYmluZEF0dHItZWFlNjIxODcxYzdkZmVlMDVmMjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19pbXBvcnREZWZhdWx0ID0gdm9pZCAwICYmICh2b2lkIDApLl9faW1wb3J0RGVmYXVsdCB8fCBmdW5jdGlvbiAobW9kKSB7XG4gIHJldHVybiBtb2QgJiYgbW9kLl9fZXNNb2R1bGUgPyBtb2QgOiB7XG4gICAgXCJkZWZhdWx0XCI6IG1vZFxuICB9O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xuXG52YXIgQXR0clVwZGF0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9DbGFzc18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKEF0dHJVcGRhdGVyLCBfQ2xhc3NfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKEF0dHJVcGRhdGVyKTtcblxuICBmdW5jdGlvbiBBdHRyVXBkYXRlcihlbCwgYXR0ciwgcHJvcGVydHkpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXR0clVwZGF0ZXIpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5lbCA9IGVsO1xuICAgIF90aGlzLmF0dHIgPSBhdHRyO1xuICAgIF90aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICBfdGhpcy5fdXBkYXRlKCk7XG5cbiAgICBfdGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKF90aGlzLl91cGRhdGUsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXR0clVwZGF0ZXIsIFt7XG4gICAga2V5OiBcIl91cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICAgIHRoaXMuZWwuYXR0cih0aGlzLmF0dHIsIHRoaXMucHJvcGVydHkuZ2V0KCkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBdHRyVXBkYXRlcjtcbn0oQ2xhc3NfMS5kZWZhdWx0KTtcbi8qKlxyXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGUgb2YgdGhlIERPTSBlbGVtZW50LlxyXG4gKiBEZXN0cm95IHRoZSByZXR1cm5lZCBvYmplY3QgdG8gc3RvcCBzeW5jaHJvbml6YXRpb24uXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIGF0dHIgQXR0cmlidXRlIG5hbWUuXHJcbiAqIEBwYXJhbSBwcm9wZXJ0eSBBdHRyaWJ1dGUgdmFsdWUgdG8gYXNzaWduLlxyXG4gKi9cblxuXG5mdW5jdGlvbiBiaW5kQXR0cihlbCwgYXR0ciwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIG5ldyBBdHRyVXBkYXRlcihlbCwgYXR0ciwgcHJvcGVydHkpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBiaW5kQXR0cjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5aWFXNWtRWFIwY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBGQmVVSkJMRWxCUVVFc1QwRkJRU3hIUVVGQkxHVkJRVUVzUTBGQlFTeFBRVUZCTEVOQlFVRXNVMEZCUVN4RFFVRkJMRU5CUVVFN08wbEJSMDBzVnpzN096czdRVUZEVEN4MVFrRkJiMElzUlVGQmNFSXNSVUZCZDBNc1NVRkJlRU1zUlVGQk9FUXNVVUZCT1VRc1JVRkJjVVk3UVVGQlFUczdRVUZCUVRzN1FVRkRjRVk3UVVGRWJVSXNWVUZCUVN4RlFVRkJMRWRCUVVFc1JVRkJRVHRCUVVGdlFpeFZRVUZCTEVsQlFVRXNSMEZCUVN4SlFVRkJPMEZCUVhOQ0xGVkJRVUVzVVVGQlFTeEhRVUZCTEZGQlFVRTdPMEZCUlRkRUxGVkJRVXNzVDBGQlREczdRVUZEUVN4VlFVRkxMRWRCUVV3c1EwRkJVeXhSUVVGUkxFTkJRVU1zVjBGQlZDeERRVUZ4UWl4TlFVRnlRaXhEUVVFMFFpeE5RVUZMTEU5QlFXcERMR2REUVVGVU96dEJRVWh2Ump0QlFVbHdSanM3T3pzNFFrRkZZenRCUVVOa0xGZEJRVXNzUlVGQlRDeERRVUZSTEVsQlFWSXNRMEZCWVN4TFFVRkxMRWxCUVd4Q0xFVkJRWGRDTEV0QlFVc3NVVUZCVEN4RFFVRmpMRWRCUVdRc1JVRkJlRUk3UVVGRFFUczdPenRGUVZSM1FpeFBRVUZCTEVOQlFVRXNUenRCUVZreFFqczdPenM3T3pzN08wRkJUMEVzVTBGQmQwSXNVVUZCZUVJc1EwRkJhVU1zUlVGQmFrTXNSVUZCTmtNc1NVRkJOME1zUlVGQk1rUXNVVUZCTTBRc1JVRkJhMFk3UVVGRGFrWXNVMEZCVHl4SlFVRkpMRmRCUVVvc1EwRkJaMElzUlVGQmFFSXNSVUZCYjBJc1NVRkJjRUlzUlVGQk1FSXNVVUZCTVVJc1EwRkJVRHRCUVVOQk96dEJRVVpFTEU5QlFVRXNRMEZCUVN4UFFVRkJMRWRCUVVFc1VVRkJRU0lzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNU5TVlFnVEdsalpXNXpaVnh1WEc1RGIzQjVjbWxuYUhRZ0tHTXBJREl3TWpBZ1JXZHZjaUJPWlhCdmJXNTVZWE5qYUdsb1hHNWNibEJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhJR052Y0hsY2JtOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxJRndpVTI5bWRIZGhjbVZjSWlrc0lIUnZJR1JsWVd4Y2JtbHVJSFJvWlNCVGIyWjBkMkZ5WlNCM2FYUm9iM1YwSUhKbGMzUnlhV04wYVc5dUxDQnBibU5zZFdScGJtY2dkMmwwYUc5MWRDQnNhVzFwZEdGMGFXOXVJSFJvWlNCeWFXZG9kSE5jYm5SdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN3Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd4Y2JtTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUWdjR1Z5YzI5dWN5QjBieUIzYUc5dElIUm9aU0JUYjJaMGQyRnlaU0JwYzF4dVpuVnlibWx6YUdWa0lIUnZJR1J2SUhOdkxDQnpkV0pxWldOMElIUnZJSFJvWlNCbWIyeHNiM2RwYm1jZ1kyOXVaR2wwYVc5dWN6cGNibHh1VkdobElHRmliM1psSUdOdmNIbHlhV2RvZENCdWIzUnBZMlVnWVc1a0lIUm9hWE1nY0dWeWJXbHpjMmx2YmlCdWIzUnBZMlVnYzJoaGJHd2dZbVVnYVc1amJIVmtaV1FnYVc0Z1lXeHNYRzVqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dVhHNVVTRVVnVTA5R1ZGZEJVa1VnU1ZNZ1VGSlBWa2xFUlVRZ1hDSkJVeUJKVTF3aUxDQlhTVlJJVDFWVUlGZEJVbEpCVGxSWklFOUdJRUZPV1NCTFNVNUVMQ0JGV0ZCU1JWTlRJRTlTWEc1SlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1FsVlVJRTVQVkNCTVNVMUpWRVZFSUZSUElGUklSU0JYUVZKU1FVNVVTVVZUSUU5R0lFMUZVa05JUVU1VVFVSkpURWxVV1N4Y2JrWkpWRTVGVTFNZ1JrOVNJRUVnVUVGU1ZFbERWVXhCVWlCUVZWSlFUMU5GSUVGT1JDQk9UMDVKVGtaU1NVNUhSVTFGVGxRdUlFbE9JRTVQSUVWV1JVNVVJRk5JUVV4TUlGUklSVnh1UVZWVVNFOVNVeUJQVWlCRFQxQlpVa2xIU0ZRZ1NFOU1SRVZTVXlCQ1JTQk1TVUZDVEVVZ1JrOVNJRUZPV1NCRFRFRkpUU3dnUkVGTlFVZEZVeUJQVWlCUFZFaEZVbHh1VEVsQlFrbE1TVlJaTENCWFNFVlVTRVZTSUVsT0lFRk9JRUZEVkVsUFRpQlBSaUJEVDA1VVVrRkRWQ3dnVkU5U1ZDQlBVaUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTeGNiazlWVkNCUFJpQlBVaUJKVGlCRFQwNU9SVU5VU1U5T0lGZEpWRWdnVkVoRklGTlBSbFJYUVZKRklFOVNJRlJJUlNCVlUwVWdUMUlnVDFSSVJWSWdSRVZCVEVsT1IxTWdTVTRnVkVoRlhHNVRUMFpVVjBGU1JTNWNiaW92WEc1Y2JtbHRjRzl5ZENCQ2FXNWtZV0pzWlNCbWNtOXRJQ2N1TDBKcGJtUmhZbXhsSnp0Y2JtbHRjRzl5ZENCRGJHRnpjeUJtY205dElDY3VMME5zWVhOekp6dGNibWx0Y0c5eWRDQkVaWE4wY205NVlXSnNaU0JtY205dElDY3VMMFJsYzNSeWIzbGhZbXhsSnp0Y2JseHVZMnhoYzNNZ1FYUjBjbFZ3WkdGMFpYSWdaWGgwWlc1a2N5QkRiR0Z6Y3lCN1hHNWNkR052Ym5OMGNuVmpkRzl5S0hCeWFYWmhkR1VnWld3NklFcFJkV1Z5ZVN3Z2NISnBkbUYwWlNCaGRIUnlPaUJ6ZEhKcGJtY3NJSEJ5YVhaaGRHVWdjSEp2Y0dWeWRIazZJRUpwYm1SaFlteGxQR0Z1ZVQ0cElIdGNibHgwWEhSemRYQmxjaWdwTzF4dVhIUmNkSFJvYVhNdVgzVndaR0YwWlNncE8xeHVYSFJjZEhSb2FYTXViM2R1S0hCeWIzQmxjblI1TG1Ob1lXNW5aVVYyWlc1MExteHBjM1JsYmloMGFHbHpMbDkxY0dSaGRHVXNJSFJvYVhNcEtUdGNibHgwZlZ4dVhHNWNkSEJ5YVhaaGRHVWdYM1Z3WkdGMFpTZ3BJSHRjYmx4MFhIUjBhR2x6TG1Wc0xtRjBkSElvZEdocGN5NWhkSFJ5TENCMGFHbHpMbkJ5YjNCbGNuUjVMbWRsZENncEtUdGNibHgwZlZ4dWZWeHVYRzR2S2lwY2JpQXFJRmRoZEdOb1pYTWdjM1J5YVc1bklIQnliM0JsY25SNUlHMXZaR2xtYVdOaGRHbHZiaUJoYm1RZ2RYQmtZWFJsY3lCMGFHVWdjM0JsWTJsbWFXVmtJR0YwZEhKcFluVjBaU0J2WmlCMGFHVWdSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkVaWE4wY205NUlIUm9aU0J5WlhSMWNtNWxaQ0J2WW1wbFkzUWdkRzhnYzNSdmNDQnplVzVqYUhKdmJtbDZZWFJwYjI0dVhHNGdLaUJBY0dGeVlXMGdaV3dnUkU5TklHVnNaVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdZWFIwY2lCQmRIUnlhV0oxZEdVZ2JtRnRaUzVjYmlBcUlFQndZWEpoYlNCd2NtOXdaWEowZVNCQmRIUnlhV0oxZEdVZ2RtRnNkV1VnZEc4Z1lYTnphV2R1TGx4dUlDb3ZYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQmlhVzVrUVhSMGNpaGxiRG9nU2xGMVpYSjVMQ0JoZEhSeU9pQnpkSEpwYm1jc0lIQnliM0JsY25SNU9pQkNhVzVrWVdKc1pUeGhibmsrS1RvZ1JHVnpkSEp2ZVdGaWJHVWdlMXh1WEhSeVpYUjFjbTRnYm1WM0lFRjBkSEpWY0dSaGRHVnlLR1ZzTENCaGRIUnlMQ0J3Y205d1pYSjBlU2s3WEc1OVhHNGlYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjkiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJhcHBsaWNhdGlvblxcXCI+PGRpdj5cXFwidGl0bGVcXFwiIGF0dHJpYnV0ZTogPGlucHV0IGp3aWQ9XFxcImlucHV0XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiB2YWx1ZT1cXFwiVGhpcyBpcyBhIHRvb2x0aXAhXFxcIj48L2Rpdj48ZGl2IGp3aWQ9XFxcInJlY3RcXFwiPk1vZGlmeSBhcyB5b3Ugd2lzaCBhbmQgaG92ZXIgbW91c2UgdG8gc2VlIGEgdG9vbHRpcDwvZGl2PjwvZGl2PlxcblwiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBiaW5kQXR0ciBmcm9tIFwiandpZGdldC9iaW5kQXR0clwiO1xuaW1wb3J0IGJpbmRWYWwgZnJvbSBcImp3aWRnZXQvYmluZFZhbFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByb3RlY3RlZCByZW5kZXJSZWN0KGVsOiBKUXVlcnkpIHtcblx0XHQvLyBXYXRjaCBpbnB1dCB2YWx1ZVxuXHRcdGNvbnN0IHRpdGxlID0gYmluZFZhbCh0aGlzLmdldEVsZW1lbnQoXCJpbnB1dFwiKSk7XG5cblx0XHQvLyBCaW5kIHJlY3RhbmdsZSBcInRpdGxlXCIgYXR0cmlidXRlIHRvIHRpdGxlIHByb3BlcnR5IHZhbHVlXG5cdFx0YmluZEF0dHIoZWwsIFwidGl0bGVcIiwgdGl0bGUpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgXCIuL0FwcGxpY2F0aW9uLnN0eWxcIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiYmluZEF0dHJcIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiQXBwbGljYXRpb24uc3R5bFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRFeGFtcGxlKG5hbWU6IHN0cmluZywgbGlua3M6IHN0cmluZ1tdKSB7XG5cdGNvbnN0IGVsID0gJCgnPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDsgd2lkdGg6IDYwMHB4XCI+PGI+U291cmNlOjwvYj4gPC9kaXY+Jyk7XG5cdGxldCBmaXJzdCA9IHRydWU7XG5cdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcblx0XHRpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmFwcGVuZCgnLCAnKTtcblx0XHR9XG5cdFx0ZWwuYXBwZW5kKCQoJzxhIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nKS50ZXh0KGxpbmspLmF0dHIoXCJocmVmXCIsIGBzcmMvJHtuYW1lfS8ke2xpbmt9LnR4dGApKTtcblx0fSk7XG5cdCQoXCJib2R5XCIpLnByZXBlbmQoJzxkaXY+PGI+RXhhbXBsZTwvYj48L2Rpdj48ZGl2PjxhIGhyZWY9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpXCI+UmVmcmVzaDwvYT48L2Rpdj48aHIgc3R5bGU9XCJjbGVhcjogYm90aFwiPicpLnByZXBlbmQoZWwpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==