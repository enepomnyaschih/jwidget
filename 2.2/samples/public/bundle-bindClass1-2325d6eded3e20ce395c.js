(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindClass1"],{

/***/ "../../main/dist/bindClass.js":
/*!*********************************************!*\
  !*** C:/jwidget/git/main/dist/bindClass.js ***!
  \*********************************************/
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
const Switcher_1 = __importDefault(__webpack_require__(/*! ./Switcher */ "../../main/dist/Switcher.js"));
class ClassNameUpdater extends Class_1.default {
    constructor(el, property) {
        super();
        this.el = el;
        this.own(new Switcher_1.default(property, {
            init: value => this.el.addClass(value),
            done: value => this.el.removeClass(value)
        }));
    }
}
class ClassUpdater extends Class_1.default {
    constructor(el, cls, property) {
        super();
        this.el = el;
        this.cls = cls;
        this.property = property;
        this._update();
        this.own(property.changeEvent.listen(this._update, this));
    }
    _update() {
        this.el.toggleClass(this.cls, !!this.property.get());
    }
}
function bindClass(el, a, b) {
    return (b != null) ? new ClassUpdater(el, a, b) : new ClassNameUpdater(el, a);
}
exports.default = bindClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZENsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2JpbmRDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQkU7Ozs7O0FBR0Ysb0RBQTRCO0FBRTVCLDBEQUFrQztBQUVsQyxNQUFNLGdCQUFpQixTQUFRLGVBQUs7SUFDbkMsWUFBb0IsRUFBVSxFQUFFLFFBQTBCO1FBQ3pELEtBQUssRUFBRSxDQUFDO1FBRFcsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUU3QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksa0JBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3RDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztTQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRDtBQUVELE1BQU0sWUFBYSxTQUFRLGVBQUs7SUFDL0IsWUFBb0IsRUFBVSxFQUFVLEdBQVcsRUFBVSxRQUF1QjtRQUNuRixLQUFLLEVBQUUsQ0FBQztRQURXLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUVuRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sT0FBTztRQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0Q7QUFrQkQsU0FBd0IsU0FBUyxDQUFDLEVBQVUsRUFBRSxDQUFNLEVBQUUsQ0FBTztJQUM1RCxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBRkQsNEJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5pbXBvcnQgU3dpdGNoZXIgZnJvbSAnLi9Td2l0Y2hlcic7XG5cbmNsYXNzIENsYXNzTmFtZVVwZGF0ZXIgZXh0ZW5kcyBDbGFzcyB7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEpRdWVyeSwgcHJvcGVydHk6IEJpbmRhYmxlPHN0cmluZz4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMub3duKG5ldyBTd2l0Y2hlcihwcm9wZXJ0eSwge1xuXHRcdFx0aW5pdDogdmFsdWUgPT4gdGhpcy5lbC5hZGRDbGFzcyh2YWx1ZSksXG5cdFx0XHRkb25lOiB2YWx1ZSA9PiB0aGlzLmVsLnJlbW92ZUNsYXNzKHZhbHVlKVxuXHRcdH0pKTtcblx0fVxufVxuXG5jbGFzcyBDbGFzc1VwZGF0ZXIgZXh0ZW5kcyBDbGFzcyB7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEpRdWVyeSwgcHJpdmF0ZSBjbHM6IHN0cmluZywgcHJpdmF0ZSBwcm9wZXJ0eTogQmluZGFibGU8YW55Pikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fdXBkYXRlKCk7XG5cdFx0dGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKHRoaXMuX3VwZGF0ZSwgdGhpcykpO1xuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlKCkge1xuXHRcdHRoaXMuZWwudG9nZ2xlQ2xhc3ModGhpcy5jbHMsICEhdGhpcy5wcm9wZXJ0eS5nZXQoKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBXYXRjaGVzIGJvb2xlYW4gcHJvcGVydHkgbW9kaWZpY2F0aW9uIGFuZCB1cGRhdGVzIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHByZXNlbmNlIGluIHRoZSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cbiAqIEBwYXJhbSBjbHMgQ1NTIGNsYXNzIG5hbWUuXG4gKiBAcGFyYW0gcHJvcGVydHkgQm9vbGVhbiBwcm9wZXJ0eSB0byBiaW5kIENTUyBjbGFzcyB0by5cbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZENsYXNzKGVsOiBKUXVlcnksIGNsczogc3RyaW5nLCBwcm9wZXJ0eTogQmluZGFibGU8YW55Pik6IERlc3Ryb3lhYmxlO1xuXG4vKipcbiAqIFdhdGNoZXMgc3RyaW5nIHByb3BlcnR5IG1vZGlmaWNhdGlvbiBhbmQgdXBkYXRlcyBDU1MgY2xhc3MgbmFtZSBpbiB0aGUgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gY2xzIENTUyBjbGFzcyBuYW1lLlxuICogQHJldHVybnMgQmluZGluZyBvYmplY3QuIFlvdSBtdXN0IGRlc3Ryb3kgaXQgdG8gc3RvcCB0aGUgc3luY2hyb25pemF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kQ2xhc3MoZWw6IEpRdWVyeSwgY2xzOiBCaW5kYWJsZTxzdHJpbmc+KTogRGVzdHJveWFibGU7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kQ2xhc3MoZWw6IEpRdWVyeSwgYTogYW55LCBiPzogYW55KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gKGIgIT0gbnVsbCkgPyBuZXcgQ2xhc3NVcGRhdGVyKGVsLCBhLCBiKSA6IG5ldyBDbGFzc05hbWVVcGRhdGVyKGVsLCBhKTtcbn1cbiJdfQ==

/***/ }),

/***/ "./bindClass1/Application.jw.html":
/*!****************************************!*\
  !*** ./bindClass1/Application.jw.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div><label><input jwid=\"checkbox\" type=\"checkbox\">Enable class</label></div><div jwid=\"rect\"></div></div>\n";

/***/ }),

/***/ "./bindClass1/Application.styl":
/*!*************************************!*\
  !*** ./bindClass1/Application.styl ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./bindClass1/Application.ts":
/*!***********************************!*\
  !*** ./bindClass1/Application.ts ***!
  \***********************************/
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

var bindClass_1 = __importDefault(__webpack_require__(/*! jwidget/bindClass */ "../../main/dist/bindClass.js"));

var bindProp_1 = __importDefault(__webpack_require__(/*! jwidget/bindProp */ "../../main/dist/bindProp.js"));

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
        // Watch checkbox state
        var checked = bindProp_1.default(this.getElement("checkbox"), "checked"); // Bind "checked" CSS class to checked property value

        bindClass_1.default(el, "checked", checked);
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindClass1/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindClass1/index.ts":
/*!*****************************!*\
  !*** ./bindClass1/index.ts ***!
  \*****************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindClass1/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./bindClass1/Application.styl");

jquery_1.default(function () {
  initExample_1.default("bindClass1", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},[["./bindClass1/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindClass1~bindDisplay~bindProp1~bindProp2"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9iaW5kQ2xhc3MxL0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYmluZENsYXNzMS9BcHBsaWNhdGlvbi5zdHlsP2VhNmUiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kQ2xhc3MxL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvYmluZENsYXNzMS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGdDQUFnQyxtQkFBTyxDQUFDLHlDQUFTO0FBQ2pELG1DQUFtQyxtQkFBTyxDQUFDLCtDQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHVvSzs7Ozs7Ozs7Ozs7QUN6RDNDLG1LOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUdBO0FBQUE7QUFBQTtBQUFBLE1BQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQ0FFc0IsRUFGdEIsRUFFZ0M7QUFDOUI7QUFDQSxZQUFNLE9BQU8sR0FBRyxtQkFBUyxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBVCxFQUFzQyxTQUF0QyxDQUFoQixDQUY4QixDQUk5Qjs7QUFDQSw0QkFBVSxFQUFWLEVBQWMsU0FBZCxFQUF5QixPQUF6QjtBQUNBO0FBUkY7O0FBQUE7QUFBQSxJQUF5QyxtQkFBekM7O0FBQXFCLGFBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBUywrREFBVCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtBQVNyQjtBQUFDLENBVEQ7O2tCQUFxQixXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOckI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFlBQVosRUFBMEIsQ0FBQyxnQkFBRCxFQUFtQixxQkFBbkIsRUFBMEMsa0JBQTFDLEVBQThELFVBQTlELENBQTFCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRSIsImZpbGUiOiJidW5kbGUtYmluZENsYXNzMS0yMzI1ZDZlZGVkM2UyMGNlMzk1Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XHJcbmNvbnN0IFN3aXRjaGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3dpdGNoZXJcIikpO1xyXG5jbGFzcyBDbGFzc05hbWVVcGRhdGVyIGV4dGVuZHMgQ2xhc3NfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgIHRoaXMub3duKG5ldyBTd2l0Y2hlcl8xLmRlZmF1bHQocHJvcGVydHksIHtcclxuICAgICAgICAgICAgaW5pdDogdmFsdWUgPT4gdGhpcy5lbC5hZGRDbGFzcyh2YWx1ZSksXHJcbiAgICAgICAgICAgIGRvbmU6IHZhbHVlID0+IHRoaXMuZWwucmVtb3ZlQ2xhc3ModmFsdWUpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIENsYXNzVXBkYXRlciBleHRlbmRzIENsYXNzXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgY2xzLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgIHRoaXMuY2xzID0gY2xzO1xyXG4gICAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB0aGlzLl91cGRhdGUoKTtcclxuICAgICAgICB0aGlzLm93bihwcm9wZXJ0eS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBfdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZWwudG9nZ2xlQ2xhc3ModGhpcy5jbHMsICEhdGhpcy5wcm9wZXJ0eS5nZXQoKSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYmluZENsYXNzKGVsLCBhLCBiKSB7XHJcbiAgICByZXR1cm4gKGIgIT0gbnVsbCkgPyBuZXcgQ2xhc3NVcGRhdGVyKGVsLCBhLCBiKSA6IG5ldyBDbGFzc05hbWVVcGRhdGVyKGVsLCBhKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBiaW5kQ2xhc3M7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVltbHVaRU5zWVhOekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMkpwYm1SRGJHRnpjeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UlVGelFrVTdPenM3TzBGQlIwWXNiMFJCUVRSQ08wRkJSVFZDTERCRVFVRnJRenRCUVVWc1F5eE5RVUZOTEdkQ1FVRnBRaXhUUVVGUkxHVkJRVXM3U1VGRGJrTXNXVUZCYjBJc1JVRkJWU3hGUVVGRkxGRkJRVEJDTzFGQlEzcEVMRXRCUVVzc1JVRkJSU3hEUVVGRE8xRkJSRmNzVDBGQlJTeEhRVUZHTEVWQlFVVXNRMEZCVVR0UlFVVTNRaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NhMEpCUVZFc1EwRkJReXhSUVVGUkxFVkJRVVU3V1VGREwwSXNTVUZCU1N4RlFVRkZMRXRCUVVzc1EwRkJReXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM1JETEVsQlFVa3NSVUZCUlN4TFFVRkxMRU5CUVVNc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RFFVRkRMRXRCUVVzc1EwRkJRenRUUVVONlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTk1MRU5CUVVNN1EwRkRSRHRCUVVWRUxFMUJRVTBzV1VGQllTeFRRVUZSTEdWQlFVczdTVUZETDBJc1dVRkJiMElzUlVGQlZTeEZRVUZWTEVkQlFWY3NSVUZCVlN4UlFVRjFRanRSUVVOdVJpeExRVUZMTEVWQlFVVXNRMEZCUXp0UlFVUlhMRTlCUVVVc1IwRkJSaXhGUVVGRkxFTkJRVkU3VVVGQlZTeFJRVUZITEVkQlFVZ3NSMEZCUnl4RFFVRlJPMUZCUVZVc1lVRkJVU3hIUVVGU0xGRkJRVkVzUTBGQlpUdFJRVVZ1Uml4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03VVVGRFppeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhYUVVGWExFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU16UkN4RFFVRkRPMGxCUlU4c1QwRkJUenRSUVVOa0xFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVU4wUkN4RFFVRkRPME5CUTBRN1FVRnJRa1FzVTBGQmQwSXNVMEZCVXl4RFFVRkRMRVZCUVZVc1JVRkJSU3hEUVVGTkxFVkJRVVVzUTBGQlR6dEpRVU0xUkN4UFFVRlBMRU5CUVVNc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRmxCUVZrc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxHZENRVUZuUWl4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dEJRVU12UlN4RFFVRkRPMEZCUmtRc05FSkJSVU1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHVUVWxVSUV4cFkyVnVjMlZjYmx4dVEyOXdlWEpwWjJoMElDaGpLU0F5TURJd0lFVm5iM0lnVG1Wd2IyMXVlV0Z6WTJocGFGeHVYRzVRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNXZaaUIwYUdseklITnZablIzWVhKbElHRnVaQ0JoYzNOdlkybGhkR1ZrSUdSdlkzVnRaVzUwWVhScGIyNGdabWxzWlhNZ0tIUm9aU0JjSWxOdlpuUjNZWEpsWENJcExDQjBieUJrWldGc1hHNXBiaUIwYUdVZ1UyOW1kSGRoY21VZ2QybDBhRzkxZENCeVpYTjBjbWxqZEdsdmJpd2dhVzVqYkhWa2FXNW5JSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6WEc1MGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNWpiM0JwWlhNZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTENCaGJtUWdkRzhnY0dWeWJXbDBJSEJsY25OdmJuTWdkRzhnZDJodmJTQjBhR1VnVTI5bWRIZGhjbVVnYVhOY2JtWjFjbTVwYzJobFpDQjBieUJrYnlCemJ5d2djM1ZpYW1WamRDQjBieUIwYUdVZ1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzVjYmxSb1pTQmhZbTkyWlNCamIzQjVjbWxuYUhRZ2JtOTBhV05sSUdGdVpDQjBhR2x6SUhCbGNtMXBjM05wYjI0Z2JtOTBhV05sSUhOb1lXeHNJR0psSUdsdVkyeDFaR1ZrSUdsdUlHRnNiRnh1WTI5d2FXVnpJRzl5SUhOMVluTjBZVzUwYVdGc0lIQnZjblJwYjI1eklHOW1JSFJvWlNCVGIyWjBkMkZ5WlM1Y2JseHVWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVeUJQVWx4dVNVMVFURWxGUkN3Z1NVNURURlZFU1U1SElFSlZWQ0JPVDFRZ1RFbE5TVlJGUkNCVVR5QlVTRVVnVjBGU1VrRk9WRWxGVXlCUFJpQk5SVkpEU0VGT1ZFRkNTVXhKVkZrc1hHNUdTVlJPUlZOVElFWlBVaUJCSUZCQlVsUkpRMVZNUVZJZ1VGVlNVRTlUUlNCQlRrUWdUazlPU1U1R1VrbE9SMFZOUlU1VUxpQkpUaUJPVHlCRlZrVk9WQ0JUU0VGTVRDQlVTRVZjYmtGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzSUVSQlRVRkhSVk1nVDFJZ1QxUklSVkpjYmt4SlFVSkpURWxVV1N3Z1YwaEZWRWhGVWlCSlRpQkJUaUJCUTFSSlQwNGdUMFlnUTA5T1ZGSkJRMVFzSUZSUFVsUWdUMUlnVDFSSVJWSlhTVk5GTENCQlVrbFRTVTVISUVaU1QwMHNYRzVQVlZRZ1QwWWdUMUlnU1U0Z1EwOU9Ua1ZEVkVsUFRpQlhTVlJJSUZSSVJTQlRUMFpVVjBGU1JTQlBVaUJVU0VVZ1ZWTkZJRTlTSUU5VVNFVlNJRVJGUVV4SlRrZFRJRWxPSUZSSVJWeHVVMDlHVkZkQlVrVXVYRzRxTDF4dVhHNXBiWEJ2Y25RZ1FtbHVaR0ZpYkdVZ1puSnZiU0FuTGk5Q2FXNWtZV0pzWlNjN1hHNXBiWEJ2Y25RZ1EyeGhjM01nWm5KdmJTQW5MaTlEYkdGemN5YzdYRzVwYlhCdmNuUWdSR1Z6ZEhKdmVXRmliR1VnWm5KdmJTQW5MaTlFWlhOMGNtOTVZV0pzWlNjN1hHNXBiWEJ2Y25RZ1UzZHBkR05vWlhJZ1puSnZiU0FuTGk5VGQybDBZMmhsY2ljN1hHNWNibU5zWVhOeklFTnNZWE56VG1GdFpWVndaR0YwWlhJZ1pYaDBaVzVrY3lCRGJHRnpjeUI3WEc1Y2RHTnZibk4wY25WamRHOXlLSEJ5YVhaaGRHVWdaV3c2SUVwUmRXVnllU3dnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEhOMGNtbHVaejRwSUh0Y2JseDBYSFJ6ZFhCbGNpZ3BPMXh1WEhSY2RIUm9hWE11YjNkdUtHNWxkeUJUZDJsMFkyaGxjaWh3Y205d1pYSjBlU3dnZTF4dVhIUmNkRngwYVc1cGREb2dkbUZzZFdVZ1BUNGdkR2hwY3k1bGJDNWhaR1JEYkdGemN5aDJZV3gxWlNrc1hHNWNkRngwWEhSa2IyNWxPaUIyWVd4MVpTQTlQaUIwYUdsekxtVnNMbkpsYlc5MlpVTnNZWE56S0haaGJIVmxLVnh1WEhSY2RIMHBLVHRjYmx4MGZWeHVmVnh1WEc1amJHRnpjeUJEYkdGemMxVndaR0YwWlhJZ1pYaDBaVzVrY3lCRGJHRnpjeUI3WEc1Y2RHTnZibk4wY25WamRHOXlLSEJ5YVhaaGRHVWdaV3c2SUVwUmRXVnllU3dnY0hKcGRtRjBaU0JqYkhNNklITjBjbWx1Wnl3Z2NISnBkbUYwWlNCd2NtOXdaWEowZVRvZ1FtbHVaR0ZpYkdVOFlXNTVQaWtnZTF4dVhIUmNkSE4xY0dWeUtDazdYRzVjZEZ4MGRHaHBjeTVmZFhCa1lYUmxLQ2s3WEc1Y2RGeDBkR2hwY3k1dmQyNG9jSEp2Y0dWeWRIa3VZMmhoYm1kbFJYWmxiblF1YkdsemRHVnVLSFJvYVhNdVgzVndaR0YwWlN3Z2RHaHBjeWtwTzF4dVhIUjlYRzVjYmx4MGNISnBkbUYwWlNCZmRYQmtZWFJsS0NrZ2UxeHVYSFJjZEhSb2FYTXVaV3d1ZEc5bloyeGxRMnhoYzNNb2RHaHBjeTVqYkhNc0lDRWhkR2hwY3k1d2NtOXdaWEowZVM1blpYUW9LU2s3WEc1Y2RIMWNibjFjYmx4dUx5b3FYRzRnS2lCWFlYUmphR1Z6SUdKdmIyeGxZVzRnY0hKdmNHVnlkSGtnYlc5a2FXWnBZMkYwYVc5dUlHRnVaQ0IxY0dSaGRHVnpJSFJvWlNCemNHVmphV1pwWldRZ1ExTlRJR05zWVhOeklIQnlaWE5sYm1ObElHbHVJSFJvWlNCRVQwMGdaV3hsYldWdWRDNWNiaUFxSUVCd1lYSmhiU0JsYkNCRVQwMGdaV3hsYldWdWRDNWNiaUFxSUVCd1lYSmhiU0JqYkhNZ1ExTlRJR05zWVhOeklHNWhiV1V1WEc0Z0tpQkFjR0Z5WVcwZ2NISnZjR1Z5ZEhrZ1FtOXZiR1ZoYmlCd2NtOXdaWEowZVNCMGJ5QmlhVzVrSUVOVFV5QmpiR0Z6Y3lCMGJ5NWNiaUFxSUVCeVpYUjFjbTV6SUVKcGJtUnBibWNnYjJKcVpXTjBMaUJaYjNVZ2JYVnpkQ0JrWlhOMGNtOTVJR2wwSUhSdklITjBiM0FnZEdobElITjVibU5vY205dWFYcGhkR2x2Ymk1Y2JpQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdZbWx1WkVOc1lYTnpLR1ZzT2lCS1VYVmxjbmtzSUdOc2N6b2djM1J5YVc1bkxDQndjbTl3WlhKMGVUb2dRbWx1WkdGaWJHVThZVzU1UGlrNklFUmxjM1J5YjNsaFlteGxPMXh1WEc0dktpcGNiaUFxSUZkaGRHTm9aWE1nYzNSeWFXNW5JSEJ5YjNCbGNuUjVJRzF2WkdsbWFXTmhkR2x2YmlCaGJtUWdkWEJrWVhSbGN5QkRVMU1nWTJ4aGMzTWdibUZ0WlNCcGJpQjBhR1VnUkU5TklHVnNaVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdaV3dnUkU5TklHVnNaVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdZMnh6SUVOVFV5QmpiR0Z6Y3lCdVlXMWxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ1FtbHVaR2x1WnlCdlltcGxZM1F1SUZsdmRTQnRkWE4wSUdSbGMzUnliM2tnYVhRZ2RHOGdjM1J2Y0NCMGFHVWdjM2x1WTJoeWIyNXBlbUYwYVc5dUxseHVJQ292WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUJpYVc1a1EyeGhjM01vWld3NklFcFJkV1Z5ZVN3Z1kyeHpPaUJDYVc1a1lXSnNaVHh6ZEhKcGJtYytLVG9nUkdWemRISnZlV0ZpYkdVN1hHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlCaWFXNWtRMnhoYzNNb1pXdzZJRXBSZFdWeWVTd2dZVG9nWVc1NUxDQmlQem9nWVc1NUtUb2dSR1Z6ZEhKdmVXRmliR1VnZTF4dVhIUnlaWFIxY200Z0tHSWdJVDBnYm5Wc2JDa2dQeUJ1WlhjZ1EyeGhjM05WY0dSaGRHVnlLR1ZzTENCaExDQmlLU0E2SUc1bGR5QkRiR0Z6YzA1aGJXVlZjR1JoZEdWeUtHVnNMQ0JoS1R0Y2JuMWNiaUpkZlE9PSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2PjxsYWJlbD48aW5wdXQgandpZD1cXFwiY2hlY2tib3hcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIj5FbmFibGUgY2xhc3M8L2xhYmVsPjwvZGl2PjxkaXYgandpZD1cXFwicmVjdFxcXCI+PC9kaXY+PC9kaXY+XFxuXCI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGJpbmRDbGFzcyBmcm9tIFwiandpZGdldC9iaW5kQ2xhc3NcIjtcbmltcG9ydCBiaW5kUHJvcCBmcm9tIFwiandpZGdldC9iaW5kUHJvcFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByb3RlY3RlZCByZW5kZXJSZWN0KGVsOiBKUXVlcnkpIHtcblx0XHQvLyBXYXRjaCBjaGVja2JveCBzdGF0ZVxuXHRcdGNvbnN0IGNoZWNrZWQgPSBiaW5kUHJvcCh0aGlzLmdldEVsZW1lbnQoXCJjaGVja2JveFwiKSwgXCJjaGVja2VkXCIpO1xuXG5cdFx0Ly8gQmluZCBcImNoZWNrZWRcIiBDU1MgY2xhc3MgdG8gY2hlY2tlZCBwcm9wZXJ0eSB2YWx1ZVxuXHRcdGJpbmRDbGFzcyhlbCwgXCJjaGVja2VkXCIsIGNoZWNrZWQpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgXCIuL0FwcGxpY2F0aW9uLnN0eWxcIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiYmluZENsYXNzMVwiLCBbXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJBcHBsaWNhdGlvbi5zdHlsXCIsIFwiaW5kZXgudHNcIl0pO1xuXHRuZXcgQXBwbGljYXRpb24oKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=