(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindText"],{

/***/ "../../main/dist/bindText.js":
/*!********************************************!*\
  !*** C:/jwidget/git/main/dist/bindText.js ***!
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

var TextUpdater = /*#__PURE__*/function (_Class_1$default) {
  _inherits(TextUpdater, _Class_1$default);

  var _super = _createSuper(TextUpdater);

  function TextUpdater(el, property) {
    var _this;

    _classCallCheck(this, TextUpdater);

    _this = _super.call(this);
    _this.el = el;
    _this.property = property;

    _this._update();

    _this.own(property.changeEvent.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(TextUpdater, [{
    key: "_update",
    value: function _update() {
      this.el[0].textContent = this.property.get();
    }
  }]);

  return TextUpdater;
}(Class_1.default);
/**
 * Watches string property modification and updates inner text of the DOM element.
 * @param el DOM element.
 * @param property Text value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */


function bindText(el, property) {
  return new TextUpdater(el, property);
}

exports.default = bindText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQUEsT0FBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0lBR00sVzs7Ozs7QUFDTCx1QkFBb0IsRUFBcEIsRUFBd0MsUUFBeEMsRUFBK0Q7QUFBQTs7QUFBQTs7QUFDOUQ7QUFEbUIsVUFBQSxFQUFBLEdBQUEsRUFBQTtBQUFvQixVQUFBLFFBQUEsR0FBQSxRQUFBOztBQUV2QyxVQUFLLE9BQUw7O0FBQ0EsVUFBSyxHQUFMLENBQVMsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsQ0FBNEIsTUFBSyxPQUFqQyxnQ0FBVDs7QUFIOEQ7QUFJOUQ7Ozs7OEJBRWM7QUFDZCxXQUFLLEVBQUwsQ0FBUSxDQUFSLEVBQVcsV0FBWCxHQUF5QixLQUFLLFFBQUwsQ0FBYyxHQUFkLEVBQXpCO0FBQ0E7Ozs7RUFUd0IsT0FBQSxDQUFBLE87QUFZMUI7Ozs7Ozs7O0FBTUEsU0FBd0IsUUFBeEIsQ0FBaUMsRUFBakMsRUFBNkMsUUFBN0MsRUFBb0U7QUFDbkUsU0FBTyxJQUFJLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsUUFBcEIsQ0FBUDtBQUNBOztBQUZELE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBCaW5kYWJsZSBmcm9tICcuL0JpbmRhYmxlJztcbmltcG9ydCBDbGFzcyBmcm9tICcuL0NsYXNzJztcbmltcG9ydCBEZXN0cm95YWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcblxuY2xhc3MgVGV4dFVwZGF0ZXIgZXh0ZW5kcyBDbGFzcyB7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEpRdWVyeSwgcHJpdmF0ZSBwcm9wZXJ0eTogQmluZGFibGU8YW55Pikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fdXBkYXRlKCk7XG5cdFx0dGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKHRoaXMuX3VwZGF0ZSwgdGhpcykpO1xuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlKCkge1xuXHRcdHRoaXMuZWxbMF0udGV4dENvbnRlbnQgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xuXHR9XG59XG5cbi8qKlxuICogV2F0Y2hlcyBzdHJpbmcgcHJvcGVydHkgbW9kaWZpY2F0aW9uIGFuZCB1cGRhdGVzIGlubmVyIHRleHQgb2YgdGhlIERPTSBlbGVtZW50LlxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRUZXh0KGVsOiBKUXVlcnksIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "./bindText/Application.jw.html":
/*!**************************************!*\
  !*** ./bindText/Application.jw.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div>Text:</div><textarea jwid=\"input\" rows=\"5\" cols=\"80\"></textarea><div>Output:</div><div jwid=\"output\"></div></div>\n";

/***/ }),

/***/ "./bindText/Application.ts":
/*!*********************************!*\
  !*** ./bindText/Application.ts ***!
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

var bindText_1 = __importDefault(__webpack_require__(/*! jwidget/bindText */ "../../main/dist/bindText.js"));

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

        var text = bindVal_1.default(input); // Bind inner HTML to html property value

        bindText_1.default(el, text);
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindText/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindText/index.ts":
/*!***************************!*\
  !*** ./bindText/index.ts ***!
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindText/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("bindText", ["Application.ts", "Application.jw.html", "index.ts"]);
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

},[["./bindText/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRUZXh0LmpzIiwid2VicGFjazovLy8uL2JpbmRUZXh0L0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kVGV4dC9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2JpbmRUZXh0L2luZGV4LnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvY29tbW9uL2luaXRFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsMkJBQTJCLDJFQUEyRSxrQ0FBa0MsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLGtDQUFrQyw4SEFBOEgsR0FBRyxFQUFFLHFCQUFxQjs7QUFFeFgsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdkosMkNBQTJDLGdCQUFnQixrQkFBa0IsT0FBTywyQkFBMkIsd0RBQXdELGdDQUFnQyx1REFBdUQsMkRBQTJELEVBQUU7O0FBRTNULDZEQUE2RCxzRUFBc0UsOERBQThELG9CQUFvQjs7QUFFck4sMENBQTBDLCtEQUErRCwyRUFBMkUsRUFBRSx5RUFBeUUsZUFBZSxzREFBc0QsRUFBRSxFQUFFLHVEQUF1RDs7QUFFL1gsZ0NBQWdDLDRFQUE0RSxpQkFBaUIsVUFBVSxHQUFHLDhCQUE4Qjs7QUFFeEssZ0NBQWdDLDZEQUE2RCx5Q0FBeUMsOENBQThDLGlDQUFpQyxtREFBbUQseURBQXlELEVBQUUsT0FBTyx1Q0FBdUMsRUFBRSxpREFBaUQsR0FBRzs7QUFFdmEsaURBQWlELDBFQUEwRSxhQUFhLEVBQUUscUNBQXFDOztBQUUvSyx1Q0FBdUMsdUJBQXVCLHVGQUF1RixFQUFFLGFBQWE7O0FBRXBLLHNDQUFzQyx3RUFBd0UsMENBQTBDLDhDQUE4QyxNQUFNLHdFQUF3RSxHQUFHLGFBQWEsRUFBRSxZQUFZLGNBQWMsRUFBRTs7QUFFbFUsNkJBQTZCLGdHQUFnRyxnREFBZ0QsR0FBRywyQkFBMkI7O0FBRTNNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsOEJBQThCLG1CQUFPLENBQUMseUNBQVM7O0FBRS9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxjQUFjLHUyRzs7Ozs7Ozs7Ozs7QUN0R3pELGlMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUdBO0FBQUE7QUFBQTtBQUFBLE1BQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQ0FFd0IsRUFGeEIsRUFFa0M7QUFDaEMsWUFBTSxLQUFLLEdBQUcsS0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQWQ7QUFDQSxhQUFLLENBQUMsSUFBTixDQUFXLGVBQVgsRUFGZ0MsQ0FJaEM7O0FBQ0EsWUFBTSxJQUFJLEdBQUcsa0JBQVEsS0FBUixDQUFiLENBTGdDLENBT2hDOztBQUNBLDJCQUFTLEVBQVQsRUFBYSxJQUFiO0FBQ0E7QUFYRjs7QUFBQTtBQUFBLElBQXlDLG1CQUF6Qzs7QUFBcUIsYUFBVyxlQUQvQixtQkFBUyxtQkFBTyxDQUFTLDZEQUFULENBQWhCLENBQytCLEdBQVgsV0FBVyxDQUFYO0FBWXJCO0FBQUMsQ0FaRDs7a0JBQXFCLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05yQjs7QUFDQTs7QUFDQTs7QUFFQSxpQkFBRSxZQUFLO0FBQ04sd0JBQVksVUFBWixFQUF3QixDQUFDLGdCQUFELEVBQW1CLHFCQUFuQixFQUEwQyxVQUExQyxDQUF4QjtBQUNBLE1BQUkscUJBQUosR0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQSxDQUhELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBOztBQUNBOztBQUNBOztBQUVBLFNBQXdCLFdBQXhCLENBQW9DLElBQXBDLEVBQWtELEtBQWxELEVBQWlFO0FBQ2hFLE1BQU0sRUFBRSxHQUFHLGlCQUFFLCtEQUFGLENBQVg7QUFDQSxNQUFJLEtBQUssR0FBRyxJQUFaO0FBQ0EsT0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBUztBQUN0QixRQUFJLEtBQUosRUFBVztBQUNWLFdBQUssR0FBRyxLQUFSO0FBQ0EsS0FGRCxNQUVPO0FBQ04sUUFBRSxDQUFDLE1BQUgsQ0FBVSxJQUFWO0FBQ0E7O0FBQ0QsTUFBRSxDQUFDLE1BQUgsQ0FBVSxpQkFBRSx5QkFBRixFQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxDQUE2QyxNQUE3QyxnQkFBNEQsSUFBNUQsY0FBb0UsSUFBcEUsVUFBVjtBQUNBLEdBUEQ7QUFRQSxtQkFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixnSEFBbEIsRUFBb0ksT0FBcEksQ0FBNEksRUFBNUk7QUFDQTs7QUFaRCw4QiIsImZpbGUiOiJidW5kbGUtYmluZFRleHQtMzc3ODRmMGJkMDMwMzYyMTU2OGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19pbXBvcnREZWZhdWx0ID0gdm9pZCAwICYmICh2b2lkIDApLl9faW1wb3J0RGVmYXVsdCB8fCBmdW5jdGlvbiAobW9kKSB7XG4gIHJldHVybiBtb2QgJiYgbW9kLl9fZXNNb2R1bGUgPyBtb2QgOiB7XG4gICAgXCJkZWZhdWx0XCI6IG1vZFxuICB9O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xuXG52YXIgVGV4dFVwZGF0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9DbGFzc18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKFRleHRVcGRhdGVyLCBfQ2xhc3NfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFRleHRVcGRhdGVyKTtcblxuICBmdW5jdGlvbiBUZXh0VXBkYXRlcihlbCwgcHJvcGVydHkpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGV4dFVwZGF0ZXIpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5lbCA9IGVsO1xuICAgIF90aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICBfdGhpcy5fdXBkYXRlKCk7XG5cbiAgICBfdGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKF90aGlzLl91cGRhdGUsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV4dFVwZGF0ZXIsIFt7XG4gICAga2V5OiBcIl91cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICAgIHRoaXMuZWxbMF0udGV4dENvbnRlbnQgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUZXh0VXBkYXRlcjtcbn0oQ2xhc3NfMS5kZWZhdWx0KTtcbi8qKlxyXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgdGV4dCBvZiB0aGUgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXHJcbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cclxuICovXG5cblxuZnVuY3Rpb24gYmluZFRleHQoZWwsIHByb3BlcnR5KSB7XG4gIHJldHVybiBuZXcgVGV4dFVwZGF0ZXIoZWwsIHByb3BlcnR5KTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gYmluZFRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OWlhVzVrVkdWNGRDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJlVUpCTEVsQlFVRXNUMEZCUVN4SFFVRkJMR1ZCUVVFc1EwRkJRU3hQUVVGQkxFTkJRVUVzVTBGQlFTeERRVUZCTEVOQlFVRTdPMGxCUjAwc1Z6czdPenM3UVVGRFRDeDFRa0ZCYjBJc1JVRkJjRUlzUlVGQmQwTXNVVUZCZUVNc1JVRkJLMFE3UVVGQlFUczdRVUZCUVRzN1FVRkRPVVE3UVVGRWJVSXNWVUZCUVN4RlFVRkJMRWRCUVVFc1JVRkJRVHRCUVVGdlFpeFZRVUZCTEZGQlFVRXNSMEZCUVN4UlFVRkJPenRCUVVWMlF5eFZRVUZMTEU5QlFVdzdPMEZCUTBFc1ZVRkJTeXhIUVVGTUxFTkJRVk1zVVVGQlVTeERRVUZETEZkQlFWUXNRMEZCY1VJc1RVRkJja0lzUTBGQk5FSXNUVUZCU3l4UFFVRnFReXhuUTBGQlZEczdRVUZJT0VRN1FVRkpPVVE3T3pzN09FSkJSV003UVVGRFpDeFhRVUZMTEVWQlFVd3NRMEZCVVN4RFFVRlNMRVZCUVZjc1YwRkJXQ3hIUVVGNVFpeExRVUZMTEZGQlFVd3NRMEZCWXl4SFFVRmtMRVZCUVhwQ08wRkJRMEU3T3pzN1JVRlVkMElzVDBGQlFTeERRVUZCTEU4N1FVRlpNVUk3T3pzN096czdPMEZCVFVFc1UwRkJkMElzVVVGQmVFSXNRMEZCYVVNc1JVRkJha01zUlVGQk5rTXNVVUZCTjBNc1JVRkJiMFU3UVVGRGJrVXNVMEZCVHl4SlFVRkpMRmRCUVVvc1EwRkJaMElzUlVGQmFFSXNSVUZCYjBJc1VVRkJjRUlzUTBGQlVEdEJRVU5CT3p0QlFVWkVMRTlCUVVFc1EwRkJRU3hQUVVGQkxFZEJRVUVzVVVGQlFTSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxWEc1TlNWUWdUR2xqWlc1elpWeHVYRzVEYjNCNWNtbG5hSFFnS0dNcElESXdNakFnUldkdmNpQk9aWEJ2Ylc1NVlYTmphR2xvWEc1Y2JsQmxjbTFwYzNOcGIyNGdhWE1nYUdWeVpXSjVJR2R5WVc1MFpXUXNJR1p5WldVZ2IyWWdZMmhoY21kbExDQjBieUJoYm5rZ2NHVnljMjl1SUc5aWRHRnBibWx1WnlCaElHTnZjSGxjYm05bUlIUm9hWE1nYzI5bWRIZGhjbVVnWVc1a0lHRnpjMjlqYVdGMFpXUWdaRzlqZFcxbGJuUmhkR2x2YmlCbWFXeGxjeUFvZEdobElGd2lVMjltZEhkaGNtVmNJaWtzSUhSdklHUmxZV3hjYm1sdUlIUm9aU0JUYjJaMGQyRnlaU0IzYVhSb2IzVjBJSEpsYzNSeWFXTjBhVzl1TENCcGJtTnNkV1JwYm1jZ2QybDBhRzkxZENCc2FXMXBkR0YwYVc5dUlIUm9aU0J5YVdkb2RITmNiblJ2SUhWelpTd2dZMjl3ZVN3Z2JXOWthV1o1TENCdFpYSm5aU3dnY0hWaWJHbHphQ3dnWkdsemRISnBZblYwWlN3Z2MzVmliR2xqWlc1elpTd2dZVzVrTDI5eUlITmxiR3hjYm1OdmNHbGxjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXNJR0Z1WkNCMGJ5QndaWEp0YVhRZ2NHVnljMjl1Y3lCMGJ5QjNhRzl0SUhSb1pTQlRiMlowZDJGeVpTQnBjMXh1Wm5WeWJtbHphR1ZrSUhSdklHUnZJSE52TENCemRXSnFaV04wSUhSdklIUm9aU0JtYjJ4c2IzZHBibWNnWTI5dVpHbDBhVzl1Y3pwY2JseHVWR2hsSUdGaWIzWmxJR052Y0hseWFXZG9kQ0J1YjNScFkyVWdZVzVrSUhSb2FYTWdjR1Z5YldsemMybHZiaUJ1YjNScFkyVWdjMmhoYkd3Z1ltVWdhVzVqYkhWa1pXUWdhVzRnWVd4c1hHNWpiM0JwWlhNZ2IzSWdjM1ZpYzNSaGJuUnBZV3dnY0c5eWRHbHZibk1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMbHh1WEc1VVNFVWdVMDlHVkZkQlVrVWdTVk1nVUZKUFZrbEVSVVFnWENKQlV5QkpVMXdpTENCWFNWUklUMVZVSUZkQlVsSkJUbFJaSUU5R0lFRk9XU0JMU1U1RUxDQkZXRkJTUlZOVElFOVNYRzVKVFZCTVNVVkVMQ0JKVGtOTVZVUkpUa2NnUWxWVUlFNVBWQ0JNU1UxSlZFVkVJRlJQSUZSSVJTQlhRVkpTUVU1VVNVVlRJRTlHSUUxRlVrTklRVTVVUVVKSlRFbFVXU3hjYmtaSlZFNUZVMU1nUms5U0lFRWdVRUZTVkVsRFZVeEJVaUJRVlZKUVQxTkZJRUZPUkNCT1QwNUpUa1pTU1U1SFJVMUZUbFF1SUVsT0lFNVBJRVZXUlU1VUlGTklRVXhNSUZSSVJWeHVRVlZVU0U5U1V5QlBVaUJEVDFCWlVrbEhTRlFnU0U5TVJFVlNVeUJDUlNCTVNVRkNURVVnUms5U0lFRk9XU0JEVEVGSlRTd2dSRUZOUVVkRlV5QlBVaUJQVkVoRlVseHVURWxCUWtsTVNWUlpMQ0JYU0VWVVNFVlNJRWxPSUVGT0lFRkRWRWxQVGlCUFJpQkRUMDVVVWtGRFZDd2dWRTlTVkNCUFVpQlBWRWhGVWxkSlUwVXNJRUZTU1ZOSlRrY2dSbEpQVFN4Y2JrOVZWQ0JQUmlCUFVpQkpUaUJEVDA1T1JVTlVTVTlPSUZkSlZFZ2dWRWhGSUZOUFJsUlhRVkpGSUU5U0lGUklSU0JWVTBVZ1QxSWdUMVJJUlZJZ1JFVkJURWxPUjFNZ1NVNGdWRWhGWEc1VFQwWlVWMEZTUlM1Y2Jpb3ZYRzVjYm1sdGNHOXlkQ0JDYVc1a1lXSnNaU0JtY205dElDY3VMMEpwYm1SaFlteGxKenRjYm1sdGNHOXlkQ0JEYkdGemN5Qm1jbTl0SUNjdUwwTnNZWE56Snp0Y2JtbHRjRzl5ZENCRVpYTjBjbTk1WVdKc1pTQm1jbTl0SUNjdUwwUmxjM1J5YjNsaFlteGxKenRjYmx4dVkyeGhjM01nVkdWNGRGVndaR0YwWlhJZ1pYaDBaVzVrY3lCRGJHRnpjeUI3WEc1Y2RHTnZibk4wY25WamRHOXlLSEJ5YVhaaGRHVWdaV3c2SUVwUmRXVnllU3dnY0hKcGRtRjBaU0J3Y205d1pYSjBlVG9nUW1sdVpHRmliR1U4WVc1NVBpa2dlMXh1WEhSY2RITjFjR1Z5S0NrN1hHNWNkRngwZEdocGN5NWZkWEJrWVhSbEtDazdYRzVjZEZ4MGRHaHBjeTV2ZDI0b2NISnZjR1Z5ZEhrdVkyaGhibWRsUlhabGJuUXViR2x6ZEdWdUtIUm9hWE11WDNWd1pHRjBaU3dnZEdocGN5a3BPMXh1WEhSOVhHNWNibHgwY0hKcGRtRjBaU0JmZFhCa1lYUmxLQ2tnZTF4dVhIUmNkSFJvYVhNdVpXeGJNRjB1ZEdWNGRFTnZiblJsYm5RZ1BTQjBhR2x6TG5CeWIzQmxjblI1TG1kbGRDZ3BPMXh1WEhSOVhHNTlYRzVjYmk4cUtseHVJQ29nVjJGMFkyaGxjeUJ6ZEhKcGJtY2djSEp2Y0dWeWRIa2diVzlrYVdacFkyRjBhVzl1SUdGdVpDQjFjR1JoZEdWeklHbHVibVZ5SUhSbGVIUWdiMllnZEdobElFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUdWc0lFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUhCeWIzQmxjblI1SUZSbGVIUWdkbUZzZFdVdVhHNGdLaUJBY21WMGRYSnVjeUJDYVc1a2FXNW5JRzlpYW1WamRDNGdXVzkxSUcxMWMzUWdaR1Z6ZEhKdmVTQnBkQ0IwYnlCemRHOXdJSFJvWlNCemVXNWphSEp2Ym1sNllYUnBiMjR1WEc0Z0tpOWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlHSnBibVJVWlhoMEtHVnNPaUJLVVhWbGNua3NJSEJ5YjNCbGNuUjVPaUJDYVc1a1lXSnNaVHhoYm5rK0tUb2dSR1Z6ZEhKdmVXRmliR1VnZTF4dVhIUnlaWFIxY200Z2JtVjNJRlJsZUhSVmNHUmhkR1Z5S0dWc0xDQndjbTl3WlhKMGVTazdYRzU5WEc0aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2PlRleHQ6PC9kaXY+PHRleHRhcmVhIGp3aWQ9XFxcImlucHV0XFxcIiByb3dzPVxcXCI1XFxcIiBjb2xzPVxcXCI4MFxcXCI+PC90ZXh0YXJlYT48ZGl2Pk91dHB1dDo8L2Rpdj48ZGl2IGp3aWQ9XFxcIm91dHB1dFxcXCI+PC9kaXY+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IGJpbmRUZXh0IGZyb20gXCJqd2lkZ2V0L2JpbmRUZXh0XCI7XG5pbXBvcnQgYmluZFZhbCBmcm9tIFwiandpZGdldC9iaW5kVmFsXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZShyZXF1aXJlPHN0cmluZz4oXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIHJlbmRlck91dHB1dChlbDogSlF1ZXJ5KSB7XG5cdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmdldEVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRpbnB1dC5odG1sKCc8Yj5IZWxsbyE8L2I+Jyk7XG5cblx0XHQvLyBXYXRjaCBpbnB1dCB2YWx1ZVxuXHRcdGNvbnN0IHRleHQgPSBiaW5kVmFsKGlucHV0KTtcblxuXHRcdC8vIEJpbmQgaW5uZXIgSFRNTCB0byBodG1sIHByb3BlcnR5IHZhbHVlXG5cdFx0YmluZFRleHQoZWwsIHRleHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcImJpbmRUZXh0XCIsIFtcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRFeGFtcGxlKG5hbWU6IHN0cmluZywgbGlua3M6IHN0cmluZ1tdKSB7XG5cdGNvbnN0IGVsID0gJCgnPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDsgd2lkdGg6IDYwMHB4XCI+PGI+U291cmNlOjwvYj4gPC9kaXY+Jyk7XG5cdGxldCBmaXJzdCA9IHRydWU7XG5cdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcblx0XHRpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmFwcGVuZCgnLCAnKTtcblx0XHR9XG5cdFx0ZWwuYXBwZW5kKCQoJzxhIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nKS50ZXh0KGxpbmspLmF0dHIoXCJocmVmXCIsIGBzcmMvJHtuYW1lfS8ke2xpbmt9LnR4dGApKTtcblx0fSk7XG5cdCQoXCJib2R5XCIpLnByZXBlbmQoJzxkaXY+PGI+RXhhbXBsZTwvYj48L2Rpdj48ZGl2PjxhIGhyZWY9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpXCI+UmVmcmVzaDwvYT48L2Rpdj48aHIgc3R5bGU9XCJjbGVhcjogYm90aFwiPicpLnByZXBlbmQoZWwpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==