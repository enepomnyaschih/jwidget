(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindHtml"],{

/***/ "../../main/dist/bindHtml.js":
/*!********************************************!*\
  !*** C:/jwidget/git/main/dist/bindHtml.js ***!
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

var HtmlUpdater = /*#__PURE__*/function (_Class_1$default) {
  _inherits(HtmlUpdater, _Class_1$default);

  var _super = _createSuper(HtmlUpdater);

  /**
   * @param el DOM element.
   * @param property Source property.
   */
  function HtmlUpdater(el, property) {
    var _this;

    _classCallCheck(this, HtmlUpdater);

    _this = _super.call(this);
    _this.el = el;
    _this.property = property;

    _this._update();

    _this.own(property.changeEvent.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(HtmlUpdater, [{
    key: "_update",
    value: function _update() {
      this.el.html(this.property.get());
    }
  }]);

  return HtmlUpdater;
}(Class_1.default);
/**
 * Watches string property modification and updates inner HTML of the DOM element.
 * @param el DOM element.
 * @param property HTML value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */


function bindHtml(el, property) {
  return new HtmlUpdater(el, property);
}

exports.default = bindHtml;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kSHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQUEsT0FBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0lBR00sVzs7Ozs7QUFDTDs7OztBQUlBLHVCQUFvQixFQUFwQixFQUF3QyxRQUF4QyxFQUErRDtBQUFBOztBQUFBOztBQUM5RDtBQURtQixVQUFBLEVBQUEsR0FBQSxFQUFBO0FBQW9CLFVBQUEsUUFBQSxHQUFBLFFBQUE7O0FBRXZDLFVBQUssT0FBTDs7QUFDQSxVQUFLLEdBQUwsQ0FBUyxRQUFRLENBQUMsV0FBVCxDQUFxQixNQUFyQixDQUE0QixNQUFLLE9BQWpDLGdDQUFUOztBQUg4RDtBQUk5RDs7Ozs4QkFFYztBQUNkLFdBQUssRUFBTCxDQUFRLElBQVIsQ0FBYSxLQUFLLFFBQUwsQ0FBYyxHQUFkLEVBQWI7QUFDQTs7OztFQWJ3QixPQUFBLENBQUEsTztBQWdCMUI7Ozs7Ozs7O0FBTUEsU0FBd0IsUUFBeEIsQ0FBaUMsRUFBakMsRUFBNkMsUUFBN0MsRUFBb0U7QUFDbkUsU0FBTyxJQUFJLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsUUFBcEIsQ0FBUDtBQUNBOztBQUZELE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBCaW5kYWJsZSBmcm9tICcuL0JpbmRhYmxlJztcbmltcG9ydCBDbGFzcyBmcm9tICcuL0NsYXNzJztcbmltcG9ydCBEZXN0cm95YWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcblxuY2xhc3MgSHRtbFVwZGF0ZXIgZXh0ZW5kcyBDbGFzcyB7XG5cdC8qKlxuXHQgKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG5cdCAqIEBwYXJhbSBwcm9wZXJ0eSBTb3VyY2UgcHJvcGVydHkuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBKUXVlcnksIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMub3duKHByb3BlcnR5LmNoYW5nZUV2ZW50Lmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHR0aGlzLmVsLmh0bWwodGhpcy5wcm9wZXJ0eS5nZXQoKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgSFRNTCBvZiB0aGUgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gcHJvcGVydHkgSFRNTCB2YWx1ZS5cbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZEh0bWwoZWw6IEpRdWVyeSwgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pOiBEZXN0cm95YWJsZSB7XG5cdHJldHVybiBuZXcgSHRtbFVwZGF0ZXIoZWwsIHByb3BlcnR5KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=

/***/ }),

/***/ "./bindHtml/Application.jw.html":
/*!**************************************!*\
  !*** ./bindHtml/Application.jw.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div>HTML:</div><textarea jwid=\"input\" rows=\"5\" cols=\"80\"></textarea><div>Output:</div><div jwid=\"output\"></div></div>\n";

/***/ }),

/***/ "./bindHtml/Application.ts":
/*!*********************************!*\
  !*** ./bindHtml/Application.ts ***!
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

var bindHtml_1 = __importDefault(__webpack_require__(/*! jwidget/bindHtml */ "../../main/dist/bindHtml.js"));

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
      key: "renderOutput",
      value: function renderOutput(el) {
        var input = this.getElement("input");
        input.html('<b>Hello!</b>'); // Watch input value

        var html = bindVal_1.default(input); // Bind inner HTML to html property value

        bindHtml_1.default(el, html);
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindHtml/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindHtml/index.ts":
/*!***************************!*\
  !*** ./bindHtml/index.ts ***!
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindHtml/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("bindHtml", ["Application.ts", "Application.jw.html", "index.ts"]);
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

},[["./bindHtml/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRIdG1sLmpzIiwid2VicGFjazovLy8uL2JpbmRIdG1sL0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kSHRtbC9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2JpbmRIdG1sL2luZGV4LnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvY29tbW9uL2luaXRFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsMkJBQTJCLDJFQUEyRSxrQ0FBa0MsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLGtDQUFrQyw4SEFBOEgsR0FBRyxFQUFFLHFCQUFxQjs7QUFFeFgsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdkosMkNBQTJDLGdCQUFnQixrQkFBa0IsT0FBTywyQkFBMkIsd0RBQXdELGdDQUFnQyx1REFBdUQsMkRBQTJELEVBQUU7O0FBRTNULDZEQUE2RCxzRUFBc0UsOERBQThELG9CQUFvQjs7QUFFck4sMENBQTBDLCtEQUErRCwyRUFBMkUsRUFBRSx5RUFBeUUsZUFBZSxzREFBc0QsRUFBRSxFQUFFLHVEQUF1RDs7QUFFL1gsZ0NBQWdDLDRFQUE0RSxpQkFBaUIsVUFBVSxHQUFHLDhCQUE4Qjs7QUFFeEssZ0NBQWdDLDZEQUE2RCx5Q0FBeUMsOENBQThDLGlDQUFpQyxtREFBbUQseURBQXlELEVBQUUsT0FBTyx1Q0FBdUMsRUFBRSxpREFBaUQsR0FBRzs7QUFFdmEsaURBQWlELDBFQUEwRSxhQUFhLEVBQUUscUNBQXFDOztBQUUvSyx1Q0FBdUMsdUJBQXVCLHVGQUF1RixFQUFFLGFBQWE7O0FBRXBLLHNDQUFzQyx3RUFBd0UsMENBQTBDLDhDQUE4QyxNQUFNLHdFQUF3RSxHQUFHLGFBQWEsRUFBRSxZQUFZLGNBQWMsRUFBRTs7QUFFbFUsNkJBQTZCLGdHQUFnRyxnREFBZ0QsR0FBRywyQkFBMkI7O0FBRTNNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsOEJBQThCLG1CQUFPLENBQUMseUNBQVM7O0FBRS9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLGNBQWMsbThHOzs7Ozs7Ozs7OztBQzFHekQsaUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7QUFBQTtBQUFBO0FBQUEsTUFBcUIsV0FBckI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1DQUV3QixFQUZ4QixFQUVrQztBQUNoQyxZQUFNLEtBQUssR0FBRyxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBZDtBQUNBLGFBQUssQ0FBQyxJQUFOLENBQVcsZUFBWCxFQUZnQyxDQUloQzs7QUFDQSxZQUFNLElBQUksR0FBRyxrQkFBUSxLQUFSLENBQWIsQ0FMZ0MsQ0FPaEM7O0FBQ0EsMkJBQVMsRUFBVCxFQUFhLElBQWI7QUFDQTtBQVhGOztBQUFBO0FBQUEsSUFBeUMsbUJBQXpDOztBQUFxQixhQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQVMsNkRBQVQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7QUFZckI7QUFBQyxDQVpEOztrQkFBcUIsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxVQUFaLEVBQXdCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLFVBQTFDLENBQXhCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7O0FBQ0E7O0FBQ0E7O0FBRUEsU0FBd0IsV0FBeEIsQ0FBb0MsSUFBcEMsRUFBa0QsS0FBbEQsRUFBaUU7QUFDaEUsTUFBTSxFQUFFLEdBQUcsaUJBQUUsK0RBQUYsQ0FBWDtBQUNBLE1BQUksS0FBSyxHQUFHLElBQVo7QUFDQSxPQUFLLENBQUMsT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFTO0FBQ3RCLFFBQUksS0FBSixFQUFXO0FBQ1YsV0FBSyxHQUFHLEtBQVI7QUFDQSxLQUZELE1BRU87QUFDTixRQUFFLENBQUMsTUFBSCxDQUFVLElBQVY7QUFDQTs7QUFDRCxNQUFFLENBQUMsTUFBSCxDQUFVLGlCQUFFLHlCQUFGLEVBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQTZDLE1BQTdDLGdCQUE0RCxJQUE1RCxjQUFvRSxJQUFwRSxVQUFWO0FBQ0EsR0FQRDtBQVFBLG1CQUFFLE1BQUYsRUFBVSxPQUFWLENBQWtCLGdIQUFsQixFQUFvSSxPQUFwSSxDQUE0SSxFQUE1STtBQUNBOztBQVpELDhCIiwiZmlsZSI6ImJ1bmRsZS1iaW5kSHRtbC1jOWQ0OGEzZDM5MzFmODMxNDJiZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbnZhciBfX2ltcG9ydERlZmF1bHQgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19pbXBvcnREZWZhdWx0IHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgcmV0dXJuIG1vZCAmJiBtb2QuX19lc01vZHVsZSA/IG1vZCA6IHtcbiAgICBcImRlZmF1bHRcIjogbW9kXG4gIH07XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XG5cbnZhciBIdG1sVXBkYXRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoSHRtbFVwZGF0ZXIsIF9DbGFzc18xJGRlZmF1bHQpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoSHRtbFVwZGF0ZXIpO1xuXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICAgKiBAcGFyYW0gcHJvcGVydHkgU291cmNlIHByb3BlcnR5LlxyXG4gICAqL1xuICBmdW5jdGlvbiBIdG1sVXBkYXRlcihlbCwgcHJvcGVydHkpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSHRtbFVwZGF0ZXIpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5lbCA9IGVsO1xuICAgIF90aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICBfdGhpcy5fdXBkYXRlKCk7XG5cbiAgICBfdGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKF90aGlzLl91cGRhdGUsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSHRtbFVwZGF0ZXIsIFt7XG4gICAga2V5OiBcIl91cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICAgIHRoaXMuZWwuaHRtbCh0aGlzLnByb3BlcnR5LmdldCgpKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSHRtbFVwZGF0ZXI7XG59KENsYXNzXzEuZGVmYXVsdCk7XG4vKipcclxuICogV2F0Y2hlcyBzdHJpbmcgcHJvcGVydHkgbW9kaWZpY2F0aW9uIGFuZCB1cGRhdGVzIGlubmVyIEhUTUwgb2YgdGhlIERPTSBlbGVtZW50LlxyXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBwcm9wZXJ0eSBIVE1MIHZhbHVlLlxyXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGJpbmRIdG1sKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gbmV3IEh0bWxVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRIdG1sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlpYVc1a1NIUnRiQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMEZCZVVKQkxFbEJRVUVzVDBGQlFTeEhRVUZCTEdWQlFVRXNRMEZCUVN4UFFVRkJMRU5CUVVFc1UwRkJRU3hEUVVGQkxFTkJRVUU3TzBsQlIwMHNWenM3T3pzN1FVRkRURHM3T3p0QlFVbEJMSFZDUVVGdlFpeEZRVUZ3UWl4RlFVRjNReXhSUVVGNFF5eEZRVUVyUkR0QlFVRkJPenRCUVVGQk96dEJRVU01UkR0QlFVUnRRaXhWUVVGQkxFVkJRVUVzUjBGQlFTeEZRVUZCTzBGQlFXOUNMRlZCUVVFc1VVRkJRU3hIUVVGQkxGRkJRVUU3TzBGQlJYWkRMRlZCUVVzc1QwRkJURHM3UVVGRFFTeFZRVUZMTEVkQlFVd3NRMEZCVXl4UlFVRlJMRU5CUVVNc1YwRkJWQ3hEUVVGeFFpeE5RVUZ5UWl4RFFVRTBRaXhOUVVGTExFOUJRV3BETEdkRFFVRlVPenRCUVVnNFJEdEJRVWs1UkRzN096czRRa0ZGWXp0QlFVTmtMRmRCUVVzc1JVRkJUQ3hEUVVGUkxFbEJRVklzUTBGQllTeExRVUZMTEZGQlFVd3NRMEZCWXl4SFFVRmtMRVZCUVdJN1FVRkRRVHM3T3p0RlFXSjNRaXhQUVVGQkxFTkJRVUVzVHp0QlFXZENNVUk3T3pzN096czdPMEZCVFVFc1UwRkJkMElzVVVGQmVFSXNRMEZCYVVNc1JVRkJha01zUlVGQk5rTXNVVUZCTjBNc1JVRkJiMFU3UVVGRGJrVXNVMEZCVHl4SlFVRkpMRmRCUVVvc1EwRkJaMElzUlVGQmFFSXNSVUZCYjBJc1VVRkJjRUlzUTBGQlVEdEJRVU5CT3p0QlFVWkVMRTlCUVVFc1EwRkJRU3hQUVVGQkxFZEJRVUVzVVVGQlFTSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxWEc1TlNWUWdUR2xqWlc1elpWeHVYRzVEYjNCNWNtbG5hSFFnS0dNcElESXdNakFnUldkdmNpQk9aWEJ2Ylc1NVlYTmphR2xvWEc1Y2JsQmxjbTFwYzNOcGIyNGdhWE1nYUdWeVpXSjVJR2R5WVc1MFpXUXNJR1p5WldVZ2IyWWdZMmhoY21kbExDQjBieUJoYm5rZ2NHVnljMjl1SUc5aWRHRnBibWx1WnlCaElHTnZjSGxjYm05bUlIUm9hWE1nYzI5bWRIZGhjbVVnWVc1a0lHRnpjMjlqYVdGMFpXUWdaRzlqZFcxbGJuUmhkR2x2YmlCbWFXeGxjeUFvZEdobElGd2lVMjltZEhkaGNtVmNJaWtzSUhSdklHUmxZV3hjYm1sdUlIUm9aU0JUYjJaMGQyRnlaU0IzYVhSb2IzVjBJSEpsYzNSeWFXTjBhVzl1TENCcGJtTnNkV1JwYm1jZ2QybDBhRzkxZENCc2FXMXBkR0YwYVc5dUlIUm9aU0J5YVdkb2RITmNiblJ2SUhWelpTd2dZMjl3ZVN3Z2JXOWthV1o1TENCdFpYSm5aU3dnY0hWaWJHbHphQ3dnWkdsemRISnBZblYwWlN3Z2MzVmliR2xqWlc1elpTd2dZVzVrTDI5eUlITmxiR3hjYm1OdmNHbGxjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXNJR0Z1WkNCMGJ5QndaWEp0YVhRZ2NHVnljMjl1Y3lCMGJ5QjNhRzl0SUhSb1pTQlRiMlowZDJGeVpTQnBjMXh1Wm5WeWJtbHphR1ZrSUhSdklHUnZJSE52TENCemRXSnFaV04wSUhSdklIUm9aU0JtYjJ4c2IzZHBibWNnWTI5dVpHbDBhVzl1Y3pwY2JseHVWR2hsSUdGaWIzWmxJR052Y0hseWFXZG9kQ0J1YjNScFkyVWdZVzVrSUhSb2FYTWdjR1Z5YldsemMybHZiaUJ1YjNScFkyVWdjMmhoYkd3Z1ltVWdhVzVqYkhWa1pXUWdhVzRnWVd4c1hHNWpiM0JwWlhNZ2IzSWdjM1ZpYzNSaGJuUnBZV3dnY0c5eWRHbHZibk1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMbHh1WEc1VVNFVWdVMDlHVkZkQlVrVWdTVk1nVUZKUFZrbEVSVVFnWENKQlV5QkpVMXdpTENCWFNWUklUMVZVSUZkQlVsSkJUbFJaSUU5R0lFRk9XU0JMU1U1RUxDQkZXRkJTUlZOVElFOVNYRzVKVFZCTVNVVkVMQ0JKVGtOTVZVUkpUa2NnUWxWVUlFNVBWQ0JNU1UxSlZFVkVJRlJQSUZSSVJTQlhRVkpTUVU1VVNVVlRJRTlHSUUxRlVrTklRVTVVUVVKSlRFbFVXU3hjYmtaSlZFNUZVMU1nUms5U0lFRWdVRUZTVkVsRFZVeEJVaUJRVlZKUVQxTkZJRUZPUkNCT1QwNUpUa1pTU1U1SFJVMUZUbFF1SUVsT0lFNVBJRVZXUlU1VUlGTklRVXhNSUZSSVJWeHVRVlZVU0U5U1V5QlBVaUJEVDFCWlVrbEhTRlFnU0U5TVJFVlNVeUJDUlNCTVNVRkNURVVnUms5U0lFRk9XU0JEVEVGSlRTd2dSRUZOUVVkRlV5QlBVaUJQVkVoRlVseHVURWxCUWtsTVNWUlpMQ0JYU0VWVVNFVlNJRWxPSUVGT0lFRkRWRWxQVGlCUFJpQkRUMDVVVWtGRFZDd2dWRTlTVkNCUFVpQlBWRWhGVWxkSlUwVXNJRUZTU1ZOSlRrY2dSbEpQVFN4Y2JrOVZWQ0JQUmlCUFVpQkpUaUJEVDA1T1JVTlVTVTlPSUZkSlZFZ2dWRWhGSUZOUFJsUlhRVkpGSUU5U0lGUklSU0JWVTBVZ1QxSWdUMVJJUlZJZ1JFVkJURWxPUjFNZ1NVNGdWRWhGWEc1VFQwWlVWMEZTUlM1Y2Jpb3ZYRzVjYm1sdGNHOXlkQ0JDYVc1a1lXSnNaU0JtY205dElDY3VMMEpwYm1SaFlteGxKenRjYm1sdGNHOXlkQ0JEYkdGemN5Qm1jbTl0SUNjdUwwTnNZWE56Snp0Y2JtbHRjRzl5ZENCRVpYTjBjbTk1WVdKc1pTQm1jbTl0SUNjdUwwUmxjM1J5YjNsaFlteGxKenRjYmx4dVkyeGhjM01nU0hSdGJGVndaR0YwWlhJZ1pYaDBaVzVrY3lCRGJHRnpjeUI3WEc1Y2RDOHFLbHh1WEhRZ0tpQkFjR0Z5WVcwZ1pXd2dSRTlOSUdWc1pXMWxiblF1WEc1Y2RDQXFJRUJ3WVhKaGJTQndjbTl3WlhKMGVTQlRiM1Z5WTJVZ2NISnZjR1Z5ZEhrdVhHNWNkQ0FxTDF4dVhIUmpiMjV6ZEhKMVkzUnZjaWh3Y21sMllYUmxJR1ZzT2lCS1VYVmxjbmtzSUhCeWFYWmhkR1VnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEdGdWVUNHBJSHRjYmx4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEhSb2FYTXVYM1Z3WkdGMFpTZ3BPMXh1WEhSY2RIUm9hWE11YjNkdUtIQnliM0JsY25SNUxtTm9ZVzVuWlVWMlpXNTBMbXhwYzNSbGJpaDBhR2x6TGw5MWNHUmhkR1VzSUhSb2FYTXBLVHRjYmx4MGZWeHVYRzVjZEhCeWFYWmhkR1VnWDNWd1pHRjBaU2dwSUh0Y2JseDBYSFIwYUdsekxtVnNMbWgwYld3b2RHaHBjeTV3Y205d1pYSjBlUzVuWlhRb0tTazdYRzVjZEgxY2JuMWNibHh1THlvcVhHNGdLaUJYWVhSamFHVnpJSE4wY21sdVp5QndjbTl3WlhKMGVTQnRiMlJwWm1sallYUnBiMjRnWVc1a0lIVndaR0YwWlhNZ2FXNXVaWElnU0ZSTlRDQnZaaUIwYUdVZ1JFOU5JR1ZzWlcxbGJuUXVYRzRnS2lCQWNHRnlZVzBnWld3Z1JFOU5JR1ZzWlcxbGJuUXVYRzRnS2lCQWNHRnlZVzBnY0hKdmNHVnlkSGtnU0ZSTlRDQjJZV3gxWlM1Y2JpQXFJRUJ5WlhSMWNtNXpJRUpwYm1ScGJtY2diMkpxWldOMExpQlpiM1VnYlhWemRDQmtaWE4wY205NUlHbDBJSFJ2SUhOMGIzQWdkR2hsSUhONWJtTm9jbTl1YVhwaGRHbHZiaTVjYmlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z1ltbHVaRWgwYld3b1pXdzZJRXBSZFdWeWVTd2djSEp2Y0dWeWRIazZJRUpwYm1SaFlteGxQR0Z1ZVQ0cE9pQkVaWE4wY205NVlXSnNaU0I3WEc1Y2RISmxkSFZ5YmlCdVpYY2dTSFJ0YkZWd1pHRjBaWElvWld3c0lIQnliM0JsY25SNUtUdGNibjFjYmlKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2PkhUTUw6PC9kaXY+PHRleHRhcmVhIGp3aWQ9XFxcImlucHV0XFxcIiByb3dzPVxcXCI1XFxcIiBjb2xzPVxcXCI4MFxcXCI+PC90ZXh0YXJlYT48ZGl2Pk91dHB1dDo8L2Rpdj48ZGl2IGp3aWQ9XFxcIm91dHB1dFxcXCI+PC9kaXY+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IGJpbmRIdG1sIGZyb20gXCJqd2lkZ2V0L2JpbmRIdG1sXCI7XG5pbXBvcnQgYmluZFZhbCBmcm9tIFwiandpZGdldC9iaW5kVmFsXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZShyZXF1aXJlPHN0cmluZz4oXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIHJlbmRlck91dHB1dChlbDogSlF1ZXJ5KSB7XG5cdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmdldEVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRpbnB1dC5odG1sKCc8Yj5IZWxsbyE8L2I+Jyk7XG5cblx0XHQvLyBXYXRjaCBpbnB1dCB2YWx1ZVxuXHRcdGNvbnN0IGh0bWwgPSBiaW5kVmFsKGlucHV0KTtcblxuXHRcdC8vIEJpbmQgaW5uZXIgSFRNTCB0byBodG1sIHByb3BlcnR5IHZhbHVlXG5cdFx0YmluZEh0bWwoZWwsIGh0bWwpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcImJpbmRIdG1sXCIsIFtcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRFeGFtcGxlKG5hbWU6IHN0cmluZywgbGlua3M6IHN0cmluZ1tdKSB7XG5cdGNvbnN0IGVsID0gJCgnPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDsgd2lkdGg6IDYwMHB4XCI+PGI+U291cmNlOjwvYj4gPC9kaXY+Jyk7XG5cdGxldCBmaXJzdCA9IHRydWU7XG5cdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcblx0XHRpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmFwcGVuZCgnLCAnKTtcblx0XHR9XG5cdFx0ZWwuYXBwZW5kKCQoJzxhIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nKS50ZXh0KGxpbmspLmF0dHIoXCJocmVmXCIsIGBzcmMvJHtuYW1lfS8ke2xpbmt9LnR4dGApKTtcblx0fSk7XG5cdCQoXCJib2R5XCIpLnByZXBlbmQoJzxkaXY+PGI+RXhhbXBsZTwvYj48L2Rpdj48ZGl2PjxhIGhyZWY9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpXCI+UmVmcmVzaDwvYT48L2Rpdj48aHIgc3R5bGU9XCJjbGVhcjogYm90aFwiPicpLnByZXBlbmQoZWwpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==