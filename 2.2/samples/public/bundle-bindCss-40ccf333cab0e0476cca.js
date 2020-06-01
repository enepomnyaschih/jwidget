(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindCss"],{

/***/ "../../main/dist/bindCss.js":
/*!*******************************************!*\
  !*** C:/jwidget/git/main/dist/bindCss.js ***!
  \*******************************************/
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
class CssUpdater extends Class_1.default {
    constructor(el, style, property) {
        super();
        this.el = el;
        this.style = style;
        this.property = property;
        this._update();
        this.own(property.changeEvent.listen(this._update, this));
    }
    _update() {
        this.el.css(this.style, this.property.get());
    }
}
/**
 * Watches string property modification and updates the specified CSS style of the DOM element.
 * @param el DOM element.
 * @param style CSS style name.
 * @param property Style value.
 * @returns Binding object. You must %destroy it to stop the synchronization.
 */
function bindCss(el, style, property) {
    return new CssUpdater(el, style, property);
}
exports.default = bindCss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZENzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kQ3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXNCRTs7Ozs7QUFHRixvREFBNEI7QUFHNUIsTUFBTSxVQUFXLFNBQVEsZUFBSztJQUM3QixZQUFvQixFQUFVLEVBQVUsS0FBYSxFQUFVLFFBQXVCO1FBQ3JGLEtBQUssRUFBRSxDQUFDO1FBRFcsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFlO1FBRXJGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxPQUFPO1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNEO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBd0IsT0FBTyxDQUFDLEVBQVUsRUFBRSxLQUFhLEVBQUUsUUFBdUI7SUFDakYsT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFGRCwwQkFFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBCaW5kYWJsZSBmcm9tICcuL0JpbmRhYmxlJztcbmltcG9ydCBDbGFzcyBmcm9tICcuL0NsYXNzJztcbmltcG9ydCBEZXN0cm95YWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcblxuY2xhc3MgQ3NzVXBkYXRlciBleHRlbmRzIENsYXNzIHtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbDogSlF1ZXJ5LCBwcml2YXRlIHN0eWxlOiBzdHJpbmcsIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMub3duKHByb3BlcnR5LmNoYW5nZUV2ZW50Lmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHR0aGlzLmVsLmNzcyh0aGlzLnN0eWxlLCB0aGlzLnByb3BlcnR5LmdldCgpKTtcblx0fVxufVxuXG4vKipcbiAqIFdhdGNoZXMgc3RyaW5nIHByb3BlcnR5IG1vZGlmaWNhdGlvbiBhbmQgdXBkYXRlcyB0aGUgc3BlY2lmaWVkIENTUyBzdHlsZSBvZiB0aGUgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gc3R5bGUgQ1NTIHN0eWxlIG5hbWUuXG4gKiBAcGFyYW0gcHJvcGVydHkgU3R5bGUgdmFsdWUuXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgJWRlc3Ryb3kgaXQgdG8gc3RvcCB0aGUgc3luY2hyb25pemF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kQ3NzKGVsOiBKUXVlcnksIHN0eWxlOiBzdHJpbmcsIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IENzc1VwZGF0ZXIoZWwsIHN0eWxlLCBwcm9wZXJ0eSk7XG59XG4iXX0=

/***/ }),

/***/ "./bindCss/Application.jw.html":
/*!*************************************!*\
  !*** ./bindCss/Application.jw.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div>\"background-color\" style: <input jwid=\"input\" type=\"text\" value=\"red\"></div><div jwid=\"rect\">Modify as you wish to see result here</div></div>\n";

/***/ }),

/***/ "./bindCss/Application.styl":
/*!**********************************!*\
  !*** ./bindCss/Application.styl ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./bindCss/Application.ts":
/*!********************************!*\
  !*** ./bindCss/Application.ts ***!
  \********************************/
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

var bindCss_1 = __importDefault(__webpack_require__(/*! jwidget/bindCss */ "../../main/dist/bindCss.js"));

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
        var color = bindVal_1.default(this.getElement("input")); // Bind background color style to color property value

        bindCss_1.default(el, "background-color", color);
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindCss/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindCss/index.ts":
/*!**************************!*\
  !*** ./bindCss/index.ts ***!
  \**************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindCss/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./bindCss/Application.styl");

jquery_1.default(function () {
  initExample_1.default("bindCss", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
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

},[["./bindCss/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRDc3MuanMiLCJ3ZWJwYWNrOi8vLy4vYmluZENzcy9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uL2JpbmRDc3MvQXBwbGljYXRpb24uc3R5bD9kMDdhIiwid2VicGFjazovLy8uLi8uLi9zcmMvYmluZENzcy9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2JpbmRDc3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9jb21tb24vaW5pdEV4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQ0FBZ0MsbUJBQU8sQ0FBQyx5Q0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsK2hIOzs7Ozs7Ozs7OztBQ3JEM0MsZ047Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7QUFBQTtBQUFBO0FBQUEsTUFBcUIsV0FBckI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQUVzQixFQUZ0QixFQUVnQztBQUM5QjtBQUNBLFlBQU0sS0FBSyxHQUFHLGtCQUFRLEtBQUssVUFBTCxDQUFnQixPQUFoQixDQUFSLENBQWQsQ0FGOEIsQ0FJOUI7O0FBQ0EsMEJBQVEsRUFBUixFQUFZLGtCQUFaLEVBQWdDLEtBQWhDO0FBQ0E7QUFSRjs7QUFBQTtBQUFBLElBQXlDLG1CQUF6Qzs7QUFBcUIsYUFBVyxlQUQvQixtQkFBUyxtQkFBTyxDQUFTLDREQUFULENBQWhCLENBQytCLEdBQVgsV0FBVyxDQUFYO0FBU3JCO0FBQUMsQ0FURDs7a0JBQXFCLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05yQjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxpQkFBRSxZQUFLO0FBQ04sd0JBQVksU0FBWixFQUF1QixDQUFDLGdCQUFELEVBQW1CLHFCQUFuQixFQUEwQyxrQkFBMUMsRUFBOEQsVUFBOUQsQ0FBdkI7QUFDQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FIRCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7QUFDQTs7QUFDQTs7QUFFQSxTQUF3QixXQUF4QixDQUFvQyxJQUFwQyxFQUFrRCxLQUFsRCxFQUFpRTtBQUNoRSxNQUFNLEVBQUUsR0FBRyxpQkFBRSwrREFBRixDQUFYO0FBQ0EsTUFBSSxLQUFLLEdBQUcsSUFBWjtBQUNBLE9BQUssQ0FBQyxPQUFOLENBQWMsVUFBQyxJQUFELEVBQVM7QUFDdEIsUUFBSSxLQUFKLEVBQVc7QUFDVixXQUFLLEdBQUcsS0FBUjtBQUNBLEtBRkQsTUFFTztBQUNOLFFBQUUsQ0FBQyxNQUFILENBQVUsSUFBVjtBQUNBOztBQUNELE1BQUUsQ0FBQyxNQUFILENBQVUsaUJBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFBd0MsSUFBeEMsQ0FBNkMsTUFBN0MsZ0JBQTRELElBQTVELGNBQW9FLElBQXBFLFVBQVY7QUFDQSxHQVBEO0FBUUEsbUJBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsZ0hBQWxCLEVBQW9JLE9BQXBJLENBQTRJLEVBQTVJO0FBQ0E7O0FBWkQsOEIiLCJmaWxlIjoiYnVuZGxlLWJpbmRDc3MtNDBjY2YzMzNjYWIwZTA0NzZjY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xyXG5jbGFzcyBDc3NVcGRhdGVyIGV4dGVuZHMgQ2xhc3NfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBzdHlsZSwgcHJvcGVydHkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZWwgPSBlbDtcclxuICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMub3duKHByb3BlcnR5LmNoYW5nZUV2ZW50Lmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcclxuICAgIH1cclxuICAgIF91cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5jc3ModGhpcy5zdHlsZSwgdGhpcy5wcm9wZXJ0eS5nZXQoKSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFdhdGNoZXMgc3RyaW5nIHByb3BlcnR5IG1vZGlmaWNhdGlvbiBhbmQgdXBkYXRlcyB0aGUgc3BlY2lmaWVkIENTUyBzdHlsZSBvZiB0aGUgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIHN0eWxlIENTUyBzdHlsZSBuYW1lLlxyXG4gKiBAcGFyYW0gcHJvcGVydHkgU3R5bGUgdmFsdWUuXHJcbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCAlZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5kQ3NzKGVsLCBzdHlsZSwgcHJvcGVydHkpIHtcclxuICAgIHJldHVybiBuZXcgQ3NzVXBkYXRlcihlbCwgc3R5bGUsIHByb3BlcnR5KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBiaW5kQ3NzO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZbWx1WkVOemN5NXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlpYVc1a1EzTnpMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUczdPenM3T3pzN096czdPenM3T3pzN096czdPenRGUVhOQ1JUczdPenM3UVVGSFJpeHZSRUZCTkVJN1FVRkhOVUlzVFVGQlRTeFZRVUZYTEZOQlFWRXNaVUZCU3p0SlFVTTNRaXhaUVVGdlFpeEZRVUZWTEVWQlFWVXNTMEZCWVN4RlFVRlZMRkZCUVhWQ08xRkJRM0pHTEV0QlFVc3NSVUZCUlN4RFFVRkRPMUZCUkZjc1QwRkJSU3hIUVVGR0xFVkJRVVVzUTBGQlVUdFJRVUZWTEZWQlFVc3NSMEZCVEN4TFFVRkxMRU5CUVZFN1VVRkJWU3hoUVVGUkxFZEJRVklzVVVGQlVTeERRVUZsTzFGQlJYSkdMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6dFJRVU5tTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1VVRkJVU3hEUVVGRExGZEJRVmNzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlF6TkVMRU5CUVVNN1NVRkZUeXhQUVVGUE8xRkJRMlFzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU03U1VGRE9VTXNRMEZCUXp0RFFVTkVPMEZCUlVRN096czdPenRIUVUxSE8wRkJRMGdzVTBGQmQwSXNUMEZCVHl4RFFVRkRMRVZCUVZVc1JVRkJSU3hMUVVGaExFVkJRVVVzVVVGQmRVSTdTVUZEYWtZc1QwRkJUeXhKUVVGSkxGVkJRVlVzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhEUVVGRE8wRkJRelZETEVOQlFVTTdRVUZHUkN3d1FrRkZReUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNU5TVlFnVEdsalpXNXpaVnh1WEc1RGIzQjVjbWxuYUhRZ0tHTXBJREl3TWpBZ1JXZHZjaUJPWlhCdmJXNTVZWE5qYUdsb1hHNWNibEJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhJR052Y0hsY2JtOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxJRndpVTI5bWRIZGhjbVZjSWlrc0lIUnZJR1JsWVd4Y2JtbHVJSFJvWlNCVGIyWjBkMkZ5WlNCM2FYUm9iM1YwSUhKbGMzUnlhV04wYVc5dUxDQnBibU5zZFdScGJtY2dkMmwwYUc5MWRDQnNhVzFwZEdGMGFXOXVJSFJvWlNCeWFXZG9kSE5jYm5SdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN3Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd4Y2JtTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUWdjR1Z5YzI5dWN5QjBieUIzYUc5dElIUm9aU0JUYjJaMGQyRnlaU0JwYzF4dVpuVnlibWx6YUdWa0lIUnZJR1J2SUhOdkxDQnpkV0pxWldOMElIUnZJSFJvWlNCbWIyeHNiM2RwYm1jZ1kyOXVaR2wwYVc5dWN6cGNibHh1VkdobElHRmliM1psSUdOdmNIbHlhV2RvZENCdWIzUnBZMlVnWVc1a0lIUm9hWE1nY0dWeWJXbHpjMmx2YmlCdWIzUnBZMlVnYzJoaGJHd2dZbVVnYVc1amJIVmtaV1FnYVc0Z1lXeHNYRzVqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dVhHNVVTRVVnVTA5R1ZGZEJVa1VnU1ZNZ1VGSlBWa2xFUlVRZ1hDSkJVeUJKVTF3aUxDQlhTVlJJVDFWVUlGZEJVbEpCVGxSWklFOUdJRUZPV1NCTFNVNUVMQ0JGV0ZCU1JWTlRJRTlTWEc1SlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1FsVlVJRTVQVkNCTVNVMUpWRVZFSUZSUElGUklSU0JYUVZKU1FVNVVTVVZUSUU5R0lFMUZVa05JUVU1VVFVSkpURWxVV1N4Y2JrWkpWRTVGVTFNZ1JrOVNJRUVnVUVGU1ZFbERWVXhCVWlCUVZWSlFUMU5GSUVGT1JDQk9UMDVKVGtaU1NVNUhSVTFGVGxRdUlFbE9JRTVQSUVWV1JVNVVJRk5JUVV4TUlGUklSVnh1UVZWVVNFOVNVeUJQVWlCRFQxQlpVa2xIU0ZRZ1NFOU1SRVZTVXlCQ1JTQk1TVUZDVEVVZ1JrOVNJRUZPV1NCRFRFRkpUU3dnUkVGTlFVZEZVeUJQVWlCUFZFaEZVbHh1VEVsQlFrbE1TVlJaTENCWFNFVlVTRVZTSUVsT0lFRk9JRUZEVkVsUFRpQlBSaUJEVDA1VVVrRkRWQ3dnVkU5U1ZDQlBVaUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTeGNiazlWVkNCUFJpQlBVaUJKVGlCRFQwNU9SVU5VU1U5T0lGZEpWRWdnVkVoRklGTlBSbFJYUVZKRklFOVNJRlJJUlNCVlUwVWdUMUlnVDFSSVJWSWdSRVZCVEVsT1IxTWdTVTRnVkVoRlhHNVRUMFpVVjBGU1JTNWNiaW92WEc1Y2JtbHRjRzl5ZENCQ2FXNWtZV0pzWlNCbWNtOXRJQ2N1TDBKcGJtUmhZbXhsSnp0Y2JtbHRjRzl5ZENCRGJHRnpjeUJtY205dElDY3VMME5zWVhOekp6dGNibWx0Y0c5eWRDQkVaWE4wY205NVlXSnNaU0JtY205dElDY3VMMFJsYzNSeWIzbGhZbXhsSnp0Y2JseHVZMnhoYzNNZ1EzTnpWWEJrWVhSbGNpQmxlSFJsYm1SeklFTnNZWE56SUh0Y2JseDBZMjl1YzNSeWRXTjBiM0lvY0hKcGRtRjBaU0JsYkRvZ1NsRjFaWEo1TENCd2NtbDJZWFJsSUhOMGVXeGxPaUJ6ZEhKcGJtY3NJSEJ5YVhaaGRHVWdjSEp2Y0dWeWRIazZJRUpwYm1SaFlteGxQR0Z1ZVQ0cElIdGNibHgwWEhSemRYQmxjaWdwTzF4dVhIUmNkSFJvYVhNdVgzVndaR0YwWlNncE8xeHVYSFJjZEhSb2FYTXViM2R1S0hCeWIzQmxjblI1TG1Ob1lXNW5aVVYyWlc1MExteHBjM1JsYmloMGFHbHpMbDkxY0dSaGRHVXNJSFJvYVhNcEtUdGNibHgwZlZ4dVhHNWNkSEJ5YVhaaGRHVWdYM1Z3WkdGMFpTZ3BJSHRjYmx4MFhIUjBhR2x6TG1Wc0xtTnpjeWgwYUdsekxuTjBlV3hsTENCMGFHbHpMbkJ5YjNCbGNuUjVMbWRsZENncEtUdGNibHgwZlZ4dWZWeHVYRzR2S2lwY2JpQXFJRmRoZEdOb1pYTWdjM1J5YVc1bklIQnliM0JsY25SNUlHMXZaR2xtYVdOaGRHbHZiaUJoYm1RZ2RYQmtZWFJsY3lCMGFHVWdjM0JsWTJsbWFXVmtJRU5UVXlCemRIbHNaU0J2WmlCMGFHVWdSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ1pXd2dSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ2MzUjViR1VnUTFOVElITjBlV3hsSUc1aGJXVXVYRzRnS2lCQWNHRnlZVzBnY0hKdmNHVnlkSGtnVTNSNWJHVWdkbUZzZFdVdVhHNGdLaUJBY21WMGRYSnVjeUJDYVc1a2FXNW5JRzlpYW1WamRDNGdXVzkxSUcxMWMzUWdKV1JsYzNSeWIza2dhWFFnZEc4Z2MzUnZjQ0IwYUdVZ2MzbHVZMmh5YjI1cGVtRjBhVzl1TGx4dUlDb3ZYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQmlhVzVrUTNOektHVnNPaUJLVVhWbGNua3NJSE4wZVd4bE9pQnpkSEpwYm1jc0lIQnliM0JsY25SNU9pQkNhVzVrWVdKc1pUeGhibmsrS1RvZ1JHVnpkSEp2ZVdGaWJHVWdlMXh1WEhSeVpYUjFjbTRnYm1WM0lFTnpjMVZ3WkdGMFpYSW9aV3dzSUhOMGVXeGxMQ0J3Y205d1pYSjBlU2s3WEc1OVhHNGlYWDA9IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiYXBwbGljYXRpb25cXFwiPjxkaXY+XFxcImJhY2tncm91bmQtY29sb3JcXFwiIHN0eWxlOiA8aW5wdXQgandpZD1cXFwiaW5wdXRcXFwiIHR5cGU9XFxcInRleHRcXFwiIHZhbHVlPVxcXCJyZWRcXFwiPjwvZGl2PjxkaXYgandpZD1cXFwicmVjdFxcXCI+TW9kaWZ5IGFzIHlvdSB3aXNoIHRvIHNlZSByZXN1bHQgaGVyZTwvZGl2PjwvZGl2PlxcblwiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBiaW5kQ3NzIGZyb20gXCJqd2lkZ2V0L2JpbmRDc3NcIjtcbmltcG9ydCBiaW5kVmFsIGZyb20gXCJqd2lkZ2V0L2JpbmRWYWxcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmU8c3RyaW5nPihcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyUmVjdChlbDogSlF1ZXJ5KSB7XG5cdFx0Ly8gV2F0Y2ggaW5wdXQgdmFsdWVcblx0XHRjb25zdCBjb2xvciA9IGJpbmRWYWwodGhpcy5nZXRFbGVtZW50KFwiaW5wdXRcIikpO1xuXG5cdFx0Ly8gQmluZCBiYWNrZ3JvdW5kIGNvbG9yIHN0eWxlIHRvIGNvbG9yIHByb3BlcnR5IHZhbHVlXG5cdFx0YmluZENzcyhlbCwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGNvbG9yKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuaW1wb3J0IFwiLi9BcHBsaWNhdGlvbi5zdHlsXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcImJpbmRDc3NcIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiQXBwbGljYXRpb24uc3R5bFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRFeGFtcGxlKG5hbWU6IHN0cmluZywgbGlua3M6IHN0cmluZ1tdKSB7XG5cdGNvbnN0IGVsID0gJCgnPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDsgd2lkdGg6IDYwMHB4XCI+PGI+U291cmNlOjwvYj4gPC9kaXY+Jyk7XG5cdGxldCBmaXJzdCA9IHRydWU7XG5cdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcblx0XHRpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmFwcGVuZCgnLCAnKTtcblx0XHR9XG5cdFx0ZWwuYXBwZW5kKCQoJzxhIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nKS50ZXh0KGxpbmspLmF0dHIoXCJocmVmXCIsIGBzcmMvJHtuYW1lfS8ke2xpbmt9LnR4dGApKTtcblx0fSk7XG5cdCQoXCJib2R5XCIpLnByZXBlbmQoJzxkaXY+PGI+RXhhbXBsZTwvYj48L2Rpdj48ZGl2PjxhIGhyZWY9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpXCI+UmVmcmVzaDwvYT48L2Rpdj48aHIgc3R5bGU9XCJjbGVhcjogYm90aFwiPicpLnByZXBlbmQoZWwpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==