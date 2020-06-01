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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));
class TextUpdater extends Class_1.default {
    constructor(el, property) {
        super();
        this.el = el;
        this.property = property;
        this._update();
        this.own(property.changeEvent.listen(this._update, this));
    }
    _update() {
        this.el[0].textContent = this.property.get();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZFRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYmluZFRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0JFOzs7OztBQUdGLG9EQUE0QjtBQUc1QixNQUFNLFdBQVksU0FBUSxlQUFLO0lBQzlCLFlBQW9CLEVBQVUsRUFBVSxRQUF1QjtRQUM5RCxLQUFLLEVBQUUsQ0FBQztRQURXLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFlO1FBRTlELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxPQUFPO1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0Q7QUFFRDs7Ozs7R0FLRztBQUNILFNBQXdCLFFBQVEsQ0FBQyxFQUFVLEVBQUUsUUFBdUI7SUFDbkUsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUZELDJCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IEJpbmRhYmxlIGZyb20gJy4vQmluZGFibGUnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vQ2xhc3MnO1xuaW1wb3J0IERlc3Ryb3lhYmxlIGZyb20gJy4vRGVzdHJveWFibGUnO1xuXG5jbGFzcyBUZXh0VXBkYXRlciBleHRlbmRzIENsYXNzIHtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbDogSlF1ZXJ5LCBwcml2YXRlIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHR0aGlzLm93bihwcm9wZXJ0eS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGUoKSB7XG5cdFx0dGhpcy5lbFswXS50ZXh0Q29udGVudCA9IHRoaXMucHJvcGVydHkuZ2V0KCk7XG5cdH1cbn1cblxuLyoqXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgdGV4dCBvZiB0aGUgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gcHJvcGVydHkgVGV4dCB2YWx1ZS5cbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFRleHQoZWw6IEpRdWVyeSwgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pOiBEZXN0cm95YWJsZSB7XG5cdHJldHVybiBuZXcgVGV4dFVwZGF0ZXIoZWwsIHByb3BlcnR5KTtcbn1cbiJdfQ==

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRUZXh0LmpzIiwid2VicGFjazovLy8uL2JpbmRUZXh0L0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kVGV4dC9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2JpbmRUZXh0L2luZGV4LnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvY29tbW9uL2luaXRFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsZ0NBQWdDLG1CQUFPLENBQUMseUNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsbTFHOzs7Ozs7Ozs7OztBQ25EM0MsaUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7QUFBQTtBQUFBO0FBQUEsTUFBcUIsV0FBckI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1DQUV3QixFQUZ4QixFQUVrQztBQUNoQyxZQUFNLEtBQUssR0FBRyxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBZDtBQUNBLGFBQUssQ0FBQyxJQUFOLENBQVcsZUFBWCxFQUZnQyxDQUloQzs7QUFDQSxZQUFNLElBQUksR0FBRyxrQkFBUSxLQUFSLENBQWIsQ0FMZ0MsQ0FPaEM7O0FBQ0EsMkJBQVMsRUFBVCxFQUFhLElBQWI7QUFDQTtBQVhGOztBQUFBO0FBQUEsSUFBeUMsbUJBQXpDOztBQUFxQixhQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQVMsNkRBQVQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7QUFZckI7QUFBQyxDQVpEOztrQkFBcUIsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxVQUFaLEVBQXdCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLFVBQTFDLENBQXhCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7O0FBQ0E7O0FBQ0E7O0FBRUEsU0FBd0IsV0FBeEIsQ0FBb0MsSUFBcEMsRUFBa0QsS0FBbEQsRUFBaUU7QUFDaEUsTUFBTSxFQUFFLEdBQUcsaUJBQUUsK0RBQUYsQ0FBWDtBQUNBLE1BQUksS0FBSyxHQUFHLElBQVo7QUFDQSxPQUFLLENBQUMsT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFTO0FBQ3RCLFFBQUksS0FBSixFQUFXO0FBQ1YsV0FBSyxHQUFHLEtBQVI7QUFDQSxLQUZELE1BRU87QUFDTixRQUFFLENBQUMsTUFBSCxDQUFVLElBQVY7QUFDQTs7QUFDRCxNQUFFLENBQUMsTUFBSCxDQUFVLGlCQUFFLHlCQUFGLEVBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQTZDLE1BQTdDLGdCQUE0RCxJQUE1RCxjQUFvRSxJQUFwRSxVQUFWO0FBQ0EsR0FQRDtBQVFBLG1CQUFFLE1BQUYsRUFBVSxPQUFWLENBQWtCLGdIQUFsQixFQUFvSSxPQUFwSSxDQUE0SSxFQUE1STtBQUNBOztBQVpELDhCIiwiZmlsZSI6ImJ1bmRsZS1iaW5kVGV4dC00Y2IwZTAzNDEyMzYzYzVhODQ0MC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XHJcbmNsYXNzIFRleHRVcGRhdGVyIGV4dGVuZHMgQ2xhc3NfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB0aGlzLl91cGRhdGUoKTtcclxuICAgICAgICB0aGlzLm93bihwcm9wZXJ0eS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBfdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZWxbMF0udGV4dENvbnRlbnQgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgdGV4dCBvZiB0aGUgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXHJcbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIGJpbmRUZXh0KGVsLCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIG5ldyBUZXh0VXBkYXRlcihlbCwgcHJvcGVydHkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRUZXh0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZbWx1WkZSbGVIUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12WW1sdVpGUmxlSFF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBWQmMwSkZPenM3T3p0QlFVZEdMRzlFUVVFMFFqdEJRVWMxUWl4TlFVRk5MRmRCUVZrc1UwRkJVU3hsUVVGTE8wbEJRemxDTEZsQlFXOUNMRVZCUVZVc1JVRkJWU3hSUVVGMVFqdFJRVU01UkN4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVSWExFOUJRVVVzUjBGQlJpeEZRVUZGTEVOQlFWRTdVVUZCVlN4aFFVRlJMRWRCUVZJc1VVRkJVU3hEUVVGbE8xRkJSVGxFTEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRSUVVObUxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRmRCUVZjc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRek5FTEVOQlFVTTdTVUZGVHl4UFFVRlBPMUZCUTJRc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0SlFVTTVReXhEUVVGRE8wTkJRMFE3UVVGRlJEczdPenM3UjBGTFJ6dEJRVU5JTEZOQlFYZENMRkZCUVZFc1EwRkJReXhGUVVGVkxFVkJRVVVzVVVGQmRVSTdTVUZEYmtVc1QwRkJUeXhKUVVGSkxGZEJRVmNzUTBGQlF5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRkRU1zUTBGQlF6dEJRVVpFTERKQ1FVVkRJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlwY2JrMUpWQ0JNYVdObGJuTmxYRzVjYmtOdmNIbHlhV2RvZENBb1l5a2dNakF5TUNCRloyOXlJRTVsY0c5dGJubGhjMk5vYVdoY2JseHVVR1Z5YldsemMybHZiaUJwY3lCb1pYSmxZbmtnWjNKaGJuUmxaQ3dnWm5KbFpTQnZaaUJqYUdGeVoyVXNJSFJ2SUdGdWVTQndaWEp6YjI0Z2IySjBZV2x1YVc1bklHRWdZMjl3ZVZ4dWIyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVWdYQ0pUYjJaMGQyRnlaVndpS1N3Z2RHOGdaR1ZoYkZ4dWFXNGdkR2hsSUZOdlpuUjNZWEpsSUhkcGRHaHZkWFFnY21WemRISnBZM1JwYjI0c0lHbHVZMngxWkdsdVp5QjNhWFJvYjNWMElHeHBiV2wwWVhScGIyNGdkR2hsSUhKcFoyaDBjMXh1ZEc4Z2RYTmxMQ0JqYjNCNUxDQnRiMlJwWm5rc0lHMWxjbWRsTENCd2RXSnNhWE5vTENCa2FYTjBjbWxpZFhSbExDQnpkV0pzYVdObGJuTmxMQ0JoYm1RdmIzSWdjMlZzYkZ4dVkyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRDQndaWEp6YjI1eklIUnZJSGRvYjIwZ2RHaGxJRk52Wm5SM1lYSmxJR2x6WEc1bWRYSnVhWE5vWldRZ2RHOGdaRzhnYzI4c0lITjFZbXBsWTNRZ2RHOGdkR2hsSUdadmJHeHZkMmx1WnlCamIyNWthWFJwYjI1ek9seHVYRzVVYUdVZ1lXSnZkbVVnWTI5d2VYSnBaMmgwSUc1dmRHbGpaU0JoYm1RZ2RHaHBjeUJ3WlhKdGFYTnphVzl1SUc1dmRHbGpaU0J6YUdGc2JDQmlaU0JwYm1Oc2RXUmxaQ0JwYmlCaGJHeGNibU52Y0dsbGN5QnZjaUJ6ZFdKemRHRnVkR2xoYkNCd2IzSjBhVzl1Y3lCdlppQjBhR1VnVTI5bWRIZGhjbVV1WEc1Y2JsUklSU0JUVDBaVVYwRlNSU0JKVXlCUVVrOVdTVVJGUkNCY0lrRlRJRWxUWENJc0lGZEpWRWhQVlZRZ1YwRlNVa0ZPVkZrZ1QwWWdRVTVaSUV0SlRrUXNJRVZZVUZKRlUxTWdUMUpjYmtsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBZZ1RVVlNRMGhCVGxSQlFrbE1TVlJaTEZ4dVJrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzVCVlZSSVQxSlRJRTlTSUVOUFVGbFNTVWRJVkNCSVQweEVSVkpUSUVKRklFeEpRVUpNUlNCR1QxSWdRVTVaSUVOTVFVbE5MQ0JFUVUxQlIwVlRJRTlTSUU5VVNFVlNYRzVNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxGeHVUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUaUJVU0VWY2JsTlBSbFJYUVZKRkxseHVLaTljYmx4dWFXMXdiM0owSUVKcGJtUmhZbXhsSUdaeWIyMGdKeTR2UW1sdVpHRmliR1VuTzF4dWFXMXdiM0owSUVOc1lYTnpJR1p5YjIwZ0p5NHZRMnhoYzNNbk8xeHVhVzF3YjNKMElFUmxjM1J5YjNsaFlteGxJR1p5YjIwZ0p5NHZSR1Z6ZEhKdmVXRmliR1VuTzF4dVhHNWpiR0Z6Y3lCVVpYaDBWWEJrWVhSbGNpQmxlSFJsYm1SeklFTnNZWE56SUh0Y2JseDBZMjl1YzNSeWRXTjBiM0lvY0hKcGRtRjBaU0JsYkRvZ1NsRjFaWEo1TENCd2NtbDJZWFJsSUhCeWIzQmxjblI1T2lCQ2FXNWtZV0pzWlR4aGJuaytLU0I3WEc1Y2RGeDBjM1Z3WlhJb0tUdGNibHgwWEhSMGFHbHpMbDkxY0dSaGRHVW9LVHRjYmx4MFhIUjBhR2x6TG05M2JpaHdjbTl3WlhKMGVTNWphR0Z1WjJWRmRtVnVkQzVzYVhOMFpXNG9kR2hwY3k1ZmRYQmtZWFJsTENCMGFHbHpLU2s3WEc1Y2RIMWNibHh1WEhSd2NtbDJZWFJsSUY5MWNHUmhkR1VvS1NCN1hHNWNkRngwZEdocGN5NWxiRnN3WFM1MFpYaDBRMjl1ZEdWdWRDQTlJSFJvYVhNdWNISnZjR1Z5ZEhrdVoyVjBLQ2s3WEc1Y2RIMWNibjFjYmx4dUx5b3FYRzRnS2lCWFlYUmphR1Z6SUhOMGNtbHVaeUJ3Y205d1pYSjBlU0J0YjJScFptbGpZWFJwYjI0Z1lXNWtJSFZ3WkdGMFpYTWdhVzV1WlhJZ2RHVjRkQ0J2WmlCMGFHVWdSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ1pXd2dSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ2NISnZjR1Z5ZEhrZ1ZHVjRkQ0IyWVd4MVpTNWNiaUFxSUVCeVpYUjFjbTV6SUVKcGJtUnBibWNnYjJKcVpXTjBMaUJaYjNVZ2JYVnpkQ0JrWlhOMGNtOTVJR2wwSUhSdklITjBiM0FnZEdobElITjVibU5vY205dWFYcGhkR2x2Ymk1Y2JpQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdZbWx1WkZSbGVIUW9aV3c2SUVwUmRXVnllU3dnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEdGdWVUNHBPaUJFWlhOMGNtOTVZV0pzWlNCN1hHNWNkSEpsZEhWeWJpQnVaWGNnVkdWNGRGVndaR0YwWlhJb1pXd3NJSEJ5YjNCbGNuUjVLVHRjYm4xY2JpSmRmUT09IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiYXBwbGljYXRpb25cXFwiPjxkaXY+VGV4dDo8L2Rpdj48dGV4dGFyZWEgandpZD1cXFwiaW5wdXRcXFwiIHJvd3M9XFxcIjVcXFwiIGNvbHM9XFxcIjgwXFxcIj48L3RleHRhcmVhPjxkaXY+T3V0cHV0OjwvZGl2PjxkaXYgandpZD1cXFwib3V0cHV0XFxcIj48L2Rpdj48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgYmluZFRleHQgZnJvbSBcImp3aWRnZXQvYmluZFRleHRcIjtcbmltcG9ydCBiaW5kVmFsIGZyb20gXCJqd2lkZ2V0L2JpbmRWYWxcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmU8c3RyaW5nPihcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyT3V0cHV0KGVsOiBKUXVlcnkpIHtcblx0XHRjb25zdCBpbnB1dCA9IHRoaXMuZ2V0RWxlbWVudChcImlucHV0XCIpO1xuXHRcdGlucHV0Lmh0bWwoJzxiPkhlbGxvITwvYj4nKTtcblxuXHRcdC8vIFdhdGNoIGlucHV0IHZhbHVlXG5cdFx0Y29uc3QgdGV4dCA9IGJpbmRWYWwoaW5wdXQpO1xuXG5cdFx0Ly8gQmluZCBpbm5lciBIVE1MIHRvIGh0bWwgcHJvcGVydHkgdmFsdWVcblx0XHRiaW5kVGV4dChlbCwgdGV4dCk7XG5cdH1cbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBpbml0RXhhbXBsZSBmcm9tIFwiLi4vY29tbW9uL2luaXRFeGFtcGxlXCI7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4vQXBwbGljYXRpb25cIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiYmluZFRleHRcIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiaW5kZXgudHNcIl0pO1xuXHRuZXcgQXBwbGljYXRpb24oKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBcImNvcmUtanMvc3RhYmxlXCI7XG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEV4YW1wbGUobmFtZTogc3RyaW5nLCBsaW5rczogc3RyaW5nW10pIHtcblx0Y29uc3QgZWwgPSAkKCc8ZGl2IHN0eWxlPVwiZmxvYXQ6IHJpZ2h0OyB3aWR0aDogNjAwcHhcIj48Yj5Tb3VyY2U6PC9iPiA8L2Rpdj4nKTtcblx0bGV0IGZpcnN0ID0gdHJ1ZTtcblx0bGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuXHRcdGlmIChmaXJzdCkge1xuXHRcdFx0Zmlyc3QgPSBmYWxzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuYXBwZW5kKCcsICcpO1xuXHRcdH1cblx0XHRlbC5hcHBlbmQoJCgnPGEgdGFyZ2V0PVwiX2JsYW5rXCI+PC9hPicpLnRleHQobGluaykuYXR0cihcImhyZWZcIiwgYHNyYy8ke25hbWV9LyR7bGlua30udHh0YCkpO1xuXHR9KTtcblx0JChcImJvZHlcIikucHJlcGVuZCgnPGRpdj48Yj5FeGFtcGxlPC9iPjwvZGl2PjxkaXY+PGEgaHJlZj1cImphdmFzY3JpcHQ6bG9jYXRpb24ucmVsb2FkKClcIj5SZWZyZXNoPC9hPjwvZGl2PjxociBzdHlsZT1cImNsZWFyOiBib3RoXCI+JykucHJlcGVuZChlbCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9