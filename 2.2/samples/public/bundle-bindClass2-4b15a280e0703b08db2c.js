(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindClass2"],{

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

/***/ "./bindClass2/Application.jw.html":
/*!****************************************!*\
  !*** ./bindClass2/Application.jw.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div jwid=\"colors\"><div><label><input type=\"radio\" name=\"color\" value=\"red\">Add \"red\" class</label></div><div><label><input type=\"radio\" name=\"color\" value=\"green\">Add \"green\" class</label></div><div><label><input type=\"radio\" name=\"color\" value=\"blue\">Add \"blue\" class</label></div></div><div jwid=\"rect\"></div></div>\n";

/***/ }),

/***/ "./bindClass2/Application.styl":
/*!*************************************!*\
  !*** ./bindClass2/Application.styl ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./bindClass2/Application.ts":
/*!***********************************!*\
  !*** ./bindClass2/Application.ts ***!
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

var bindRadio_1 = __importDefault(__webpack_require__(/*! jwidget/bindRadio */ "../../main/dist/bindRadio.js"));

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
        // Watch radio button selection
        var color = bindRadio_1.default(this.getElement("colors"), "color"); // Bind CSS class name to color property value

        bindClass_1.default(el, color);
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindClass2/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindClass2/index.ts":
/*!*****************************!*\
  !*** ./bindClass2/index.ts ***!
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindClass2/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./bindClass2/Application.styl");

jquery_1.default(function () {
  initExample_1.default("bindClass2", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},[["./bindClass2/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindClass2~bindRadio1~bindRadio2"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9iaW5kQ2xhc3MyL0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYmluZENsYXNzMi9BcHBsaWNhdGlvbi5zdHlsPzc1OGUiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kQ2xhc3MyL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvYmluZENsYXNzMi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGdDQUFnQyxtQkFBTyxDQUFDLHlDQUFTO0FBQ2pELG1DQUFtQyxtQkFBTyxDQUFDLCtDQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHVvSzs7Ozs7Ozs7Ozs7QUN6RDNDLDZZOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUdBO0FBQUE7QUFBQTtBQUFBLE1BQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQ0FFc0IsRUFGdEIsRUFFZ0M7QUFDOUI7QUFDQSxZQUFNLEtBQUssR0FBRyxvQkFBVSxLQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBVixFQUFxQyxPQUFyQyxDQUFkLENBRjhCLENBSTlCOztBQUNBLDRCQUFVLEVBQVYsRUFBYyxLQUFkO0FBQ0E7QUFSRjs7QUFBQTtBQUFBLElBQXlDLG1CQUF6Qzs7QUFBcUIsYUFBVyxlQUQvQixtQkFBUyxtQkFBTyxDQUFTLCtEQUFULENBQWhCLENBQytCLEdBQVgsV0FBVyxDQUFYO0FBU3JCO0FBQUMsQ0FURDs7a0JBQXFCLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05yQjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxpQkFBRSxZQUFLO0FBQ04sd0JBQVksWUFBWixFQUEwQixDQUFDLGdCQUFELEVBQW1CLHFCQUFuQixFQUEwQyxrQkFBMUMsRUFBOEQsVUFBOUQsQ0FBMUI7QUFDQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FIRCxFIiwiZmlsZSI6ImJ1bmRsZS1iaW5kQ2xhc3MyLTRiMTVhMjgwZTA3MDNiMDhkYjJjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDbGFzc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NsYXNzXCIpKTtcclxuY29uc3QgU3dpdGNoZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Td2l0Y2hlclwiKSk7XHJcbmNsYXNzIENsYXNzTmFtZVVwZGF0ZXIgZXh0ZW5kcyBDbGFzc18xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3IoZWwsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgICAgdGhpcy5vd24obmV3IFN3aXRjaGVyXzEuZGVmYXVsdChwcm9wZXJ0eSwge1xyXG4gICAgICAgICAgICBpbml0OiB2YWx1ZSA9PiB0aGlzLmVsLmFkZENsYXNzKHZhbHVlKSxcclxuICAgICAgICAgICAgZG9uZTogdmFsdWUgPT4gdGhpcy5lbC5yZW1vdmVDbGFzcyh2YWx1ZSlcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ2xhc3NVcGRhdGVyIGV4dGVuZHMgQ2xhc3NfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBjbHMsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgICAgdGhpcy5jbHMgPSBjbHM7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMub3duKHByb3BlcnR5LmNoYW5nZUV2ZW50Lmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcclxuICAgIH1cclxuICAgIF91cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5lbC50b2dnbGVDbGFzcyh0aGlzLmNscywgISF0aGlzLnByb3BlcnR5LmdldCgpKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBiaW5kQ2xhc3MoZWwsIGEsIGIpIHtcclxuICAgIHJldHVybiAoYiAhPSBudWxsKSA/IG5ldyBDbGFzc1VwZGF0ZXIoZWwsIGEsIGIpIDogbmV3IENsYXNzTmFtZVVwZGF0ZXIoZWwsIGEpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRDbGFzcztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWW1sdVpFTnNZWE56TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwySnBibVJEYkdGemN5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdSVUZ6UWtVN096czdPMEZCUjBZc2IwUkJRVFJDTzBGQlJUVkNMREJFUVVGclF6dEJRVVZzUXl4TlFVRk5MR2RDUVVGcFFpeFRRVUZSTEdWQlFVczdTVUZEYmtNc1dVRkJiMElzUlVGQlZTeEZRVUZGTEZGQlFUQkNPMUZCUTNwRUxFdEJRVXNzUlVGQlJTeERRVUZETzFGQlJGY3NUMEZCUlN4SFFVRkdMRVZCUVVVc1EwRkJVVHRSUVVVM1FpeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc2EwSkJRVkVzUTBGQlF5eFJRVUZSTEVWQlFVVTdXVUZETDBJc1NVRkJTU3hGUVVGRkxFdEJRVXNzUTBGQlF5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1EwRkJReXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlEzUkRMRWxCUVVrc1JVRkJSU3hMUVVGTExFTkJRVU1zUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1YwRkJWeXhEUVVGRExFdEJRVXNzUTBGQlF6dFRRVU42UXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03UTBGRFJEdEJRVVZFTEUxQlFVMHNXVUZCWVN4VFFVRlJMR1ZCUVVzN1NVRkRMMElzV1VGQmIwSXNSVUZCVlN4RlFVRlZMRWRCUVZjc1JVRkJWU3hSUVVGMVFqdFJRVU51Uml4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVSWExFOUJRVVVzUjBGQlJpeEZRVUZGTEVOQlFWRTdVVUZCVlN4UlFVRkhMRWRCUVVnc1IwRkJSeXhEUVVGUk8xRkJRVlVzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWlR0UlFVVnVSaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdVVUZEWml4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eFhRVUZYTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTXpSQ3hEUVVGRE8wbEJSVThzVDBGQlR6dFJRVU5rTEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXp0SlFVTjBSQ3hEUVVGRE8wTkJRMFE3UVVGclFrUXNVMEZCZDBJc1UwRkJVeXhEUVVGRExFVkJRVlVzUlVGQlJTeERRVUZOTEVWQlFVVXNRMEZCVHp0SlFVTTFSQ3hQUVVGUExFTkJRVU1zUTBGQlF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxGbEJRVmtzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEdkQ1FVRm5RaXhEUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTXZSU3hEUVVGRE8wRkJSa1FzTkVKQlJVTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2x4dVRVbFVJRXhwWTJWdWMyVmNibHh1UTI5d2VYSnBaMmgwSUNoaktTQXlNREl3SUVWbmIzSWdUbVZ3YjIxdWVXRnpZMmhwYUZ4dVhHNVFaWEp0YVhOemFXOXVJR2x6SUdobGNtVmllU0JuY21GdWRHVmtMQ0JtY21WbElHOW1JR05vWVhKblpTd2dkRzhnWVc1NUlIQmxjbk52YmlCdlluUmhhVzVwYm1jZ1lTQmpiM0I1WEc1dlppQjBhR2x6SUhOdlpuUjNZWEpsSUdGdVpDQmhjM052WTJsaGRHVmtJR1J2WTNWdFpXNTBZWFJwYjI0Z1ptbHNaWE1nS0hSb1pTQmNJbE52Wm5SM1lYSmxYQ0lwTENCMGJ5QmtaV0ZzWEc1cGJpQjBhR1VnVTI5bWRIZGhjbVVnZDJsMGFHOTFkQ0J5WlhOMGNtbGpkR2x2Yml3Z2FXNWpiSFZrYVc1bklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpYRzUwYnlCMWMyVXNJR052Y0hrc0lHMXZaR2xtZVN3Z2JXVnlaMlVzSUhCMVlteHBjMmdzSUdScGMzUnlhV0oxZEdVc0lITjFZbXhwWTJWdWMyVXNJR0Z1WkM5dmNpQnpaV3hzWEc1amIzQnBaWE1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMQ0JoYm1RZ2RHOGdjR1Z5YldsMElIQmxjbk52Ym5NZ2RHOGdkMmh2YlNCMGFHVWdVMjltZEhkaGNtVWdhWE5jYm1aMWNtNXBjMmhsWkNCMGJ5QmtieUJ6Ynl3Z2MzVmlhbVZqZENCMGJ5QjBhR1VnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNWNibFJvWlNCaFltOTJaU0JqYjNCNWNtbG5hSFFnYm05MGFXTmxJR0Z1WkNCMGFHbHpJSEJsY20xcGMzTnBiMjRnYm05MGFXTmxJSE5vWVd4c0lHSmxJR2x1WTJ4MVpHVmtJR2x1SUdGc2JGeHVZMjl3YVdWeklHOXlJSE4xWW5OMFlXNTBhV0ZzSUhCdmNuUnBiMjV6SUc5bUlIUm9aU0JUYjJaMGQyRnlaUzVjYmx4dVZFaEZJRk5QUmxSWFFWSkZJRWxUSUZCU1QxWkpSRVZFSUZ3aVFWTWdTVk5jSWl3Z1YwbFVTRTlWVkNCWFFWSlNRVTVVV1NCUFJpQkJUbGtnUzBsT1JDd2dSVmhRVWtWVFV5QlBVbHh1U1UxUVRFbEZSQ3dnU1U1RFRGVkVTVTVISUVKVlZDQk9UMVFnVEVsTlNWUkZSQ0JVVHlCVVNFVWdWMEZTVWtGT1ZFbEZVeUJQUmlCTlJWSkRTRUZPVkVGQ1NVeEpWRmtzWEc1R1NWUk9SVk5USUVaUFVpQkJJRkJCVWxSSlExVk1RVklnVUZWU1VFOVRSU0JCVGtRZ1RrOU9TVTVHVWtsT1IwVk5SVTVVTGlCSlRpQk9UeUJGVmtWT1ZDQlRTRUZNVENCVVNFVmNia0ZWVkVoUFVsTWdUMUlnUTA5UVdWSkpSMGhVSUVoUFRFUkZVbE1nUWtVZ1RFbEJRa3hGSUVaUFVpQkJUbGtnUTB4QlNVMHNJRVJCVFVGSFJWTWdUMUlnVDFSSVJWSmNia3hKUVVKSlRFbFVXU3dnVjBoRlZFaEZVaUJKVGlCQlRpQkJRMVJKVDA0Z1QwWWdRMDlPVkZKQlExUXNJRlJQVWxRZ1QxSWdUMVJJUlZKWFNWTkZMQ0JCVWtsVFNVNUhJRVpTVDAwc1hHNVBWVlFnVDBZZ1QxSWdTVTRnUTA5T1RrVkRWRWxQVGlCWFNWUklJRlJJUlNCVFQwWlVWMEZTUlNCUFVpQlVTRVVnVlZORklFOVNJRTlVU0VWU0lFUkZRVXhKVGtkVElFbE9JRlJJUlZ4dVUwOUdWRmRCVWtVdVhHNHFMMXh1WEc1cGJYQnZjblFnUW1sdVpHRmliR1VnWm5KdmJTQW5MaTlDYVc1a1lXSnNaU2M3WEc1cGJYQnZjblFnUTJ4aGMzTWdabkp2YlNBbkxpOURiR0Z6Y3ljN1hHNXBiWEJ2Y25RZ1JHVnpkSEp2ZVdGaWJHVWdabkp2YlNBbkxpOUVaWE4wY205NVlXSnNaU2M3WEc1cGJYQnZjblFnVTNkcGRHTm9aWElnWm5KdmJTQW5MaTlUZDJsMFkyaGxjaWM3WEc1Y2JtTnNZWE56SUVOc1lYTnpUbUZ0WlZWd1pHRjBaWElnWlhoMFpXNWtjeUJEYkdGemN5QjdYRzVjZEdOdmJuTjBjblZqZEc5eUtIQnlhWFpoZEdVZ1pXdzZJRXBSZFdWeWVTd2djSEp2Y0dWeWRIazZJRUpwYm1SaFlteGxQSE4wY21sdVp6NHBJSHRjYmx4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEhSb2FYTXViM2R1S0c1bGR5QlRkMmwwWTJobGNpaHdjbTl3WlhKMGVTd2dlMXh1WEhSY2RGeDBhVzVwZERvZ2RtRnNkV1VnUFQ0Z2RHaHBjeTVsYkM1aFpHUkRiR0Z6Y3loMllXeDFaU2tzWEc1Y2RGeDBYSFJrYjI1bE9pQjJZV3gxWlNBOVBpQjBhR2x6TG1Wc0xuSmxiVzkyWlVOc1lYTnpLSFpoYkhWbEtWeHVYSFJjZEgwcEtUdGNibHgwZlZ4dWZWeHVYRzVqYkdGemN5QkRiR0Z6YzFWd1pHRjBaWElnWlhoMFpXNWtjeUJEYkdGemN5QjdYRzVjZEdOdmJuTjBjblZqZEc5eUtIQnlhWFpoZEdVZ1pXdzZJRXBSZFdWeWVTd2djSEpwZG1GMFpTQmpiSE02SUhOMGNtbHVaeXdnY0hKcGRtRjBaU0J3Y205d1pYSjBlVG9nUW1sdVpHRmliR1U4WVc1NVBpa2dlMXh1WEhSY2RITjFjR1Z5S0NrN1hHNWNkRngwZEdocGN5NWZkWEJrWVhSbEtDazdYRzVjZEZ4MGRHaHBjeTV2ZDI0b2NISnZjR1Z5ZEhrdVkyaGhibWRsUlhabGJuUXViR2x6ZEdWdUtIUm9hWE11WDNWd1pHRjBaU3dnZEdocGN5a3BPMXh1WEhSOVhHNWNibHgwY0hKcGRtRjBaU0JmZFhCa1lYUmxLQ2tnZTF4dVhIUmNkSFJvYVhNdVpXd3VkRzluWjJ4bFEyeGhjM01vZEdocGN5NWpiSE1zSUNFaGRHaHBjeTV3Y205d1pYSjBlUzVuWlhRb0tTazdYRzVjZEgxY2JuMWNibHh1THlvcVhHNGdLaUJYWVhSamFHVnpJR0p2YjJ4bFlXNGdjSEp2Y0dWeWRIa2diVzlrYVdacFkyRjBhVzl1SUdGdVpDQjFjR1JoZEdWeklIUm9aU0J6Y0dWamFXWnBaV1FnUTFOVElHTnNZWE56SUhCeVpYTmxibU5sSUdsdUlIUm9aU0JFVDAwZ1pXeGxiV1Z1ZEM1Y2JpQXFJRUJ3WVhKaGJTQmxiQ0JFVDAwZ1pXeGxiV1Z1ZEM1Y2JpQXFJRUJ3WVhKaGJTQmpiSE1nUTFOVElHTnNZWE56SUc1aGJXVXVYRzRnS2lCQWNHRnlZVzBnY0hKdmNHVnlkSGtnUW05dmJHVmhiaUJ3Y205d1pYSjBlU0IwYnlCaWFXNWtJRU5UVXlCamJHRnpjeUIwYnk1Y2JpQXFJRUJ5WlhSMWNtNXpJRUpwYm1ScGJtY2diMkpxWldOMExpQlpiM1VnYlhWemRDQmtaWE4wY205NUlHbDBJSFJ2SUhOMGIzQWdkR2hsSUhONWJtTm9jbTl1YVhwaGRHbHZiaTVjYmlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z1ltbHVaRU5zWVhOektHVnNPaUJLVVhWbGNua3NJR05zY3pvZ2MzUnlhVzVuTENCd2NtOXdaWEowZVRvZ1FtbHVaR0ZpYkdVOFlXNTVQaWs2SUVSbGMzUnliM2xoWW14bE8xeHVYRzR2S2lwY2JpQXFJRmRoZEdOb1pYTWdjM1J5YVc1bklIQnliM0JsY25SNUlHMXZaR2xtYVdOaGRHbHZiaUJoYm1RZ2RYQmtZWFJsY3lCRFUxTWdZMnhoYzNNZ2JtRnRaU0JwYmlCMGFHVWdSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ1pXd2dSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ1kyeHpJRU5UVXlCamJHRnpjeUJ1WVcxbExseHVJQ29nUUhKbGRIVnlibk1nUW1sdVpHbHVaeUJ2WW1wbFkzUXVJRmx2ZFNCdGRYTjBJR1JsYzNSeWIza2dhWFFnZEc4Z2MzUnZjQ0IwYUdVZ2MzbHVZMmh5YjI1cGVtRjBhVzl1TGx4dUlDb3ZYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQmlhVzVrUTJ4aGMzTW9aV3c2SUVwUmRXVnllU3dnWTJ4ek9pQkNhVzVrWVdKc1pUeHpkSEpwYm1jK0tUb2dSR1Z6ZEhKdmVXRmliR1U3WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUJpYVc1a1EyeGhjM01vWld3NklFcFJkV1Z5ZVN3Z1lUb2dZVzU1TENCaVB6b2dZVzU1S1RvZ1JHVnpkSEp2ZVdGaWJHVWdlMXh1WEhSeVpYUjFjbTRnS0dJZ0lUMGdiblZzYkNrZ1B5QnVaWGNnUTJ4aGMzTlZjR1JoZEdWeUtHVnNMQ0JoTENCaUtTQTZJRzVsZHlCRGJHRnpjMDVoYldWVmNHUmhkR1Z5S0dWc0xDQmhLVHRjYm4xY2JpSmRmUT09IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiYXBwbGljYXRpb25cXFwiPjxkaXYgandpZD1cXFwiY29sb3JzXFxcIj48ZGl2PjxsYWJlbD48aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcImNvbG9yXFxcIiB2YWx1ZT1cXFwicmVkXFxcIj5BZGQgXFxcInJlZFxcXCIgY2xhc3M8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPjxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwiY29sb3JcXFwiIHZhbHVlPVxcXCJncmVlblxcXCI+QWRkIFxcXCJncmVlblxcXCIgY2xhc3M8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPjxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwiY29sb3JcXFwiIHZhbHVlPVxcXCJibHVlXFxcIj5BZGQgXFxcImJsdWVcXFwiIGNsYXNzPC9sYWJlbD48L2Rpdj48L2Rpdj48ZGl2IGp3aWQ9XFxcInJlY3RcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBiaW5kQ2xhc3MgZnJvbSBcImp3aWRnZXQvYmluZENsYXNzXCI7XG5pbXBvcnQgYmluZFJhZGlvIGZyb20gXCJqd2lkZ2V0L2JpbmRSYWRpb1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByb3RlY3RlZCByZW5kZXJSZWN0KGVsOiBKUXVlcnkpIHtcblx0XHQvLyBXYXRjaCByYWRpbyBidXR0b24gc2VsZWN0aW9uXG5cdFx0Y29uc3QgY29sb3IgPSBiaW5kUmFkaW8odGhpcy5nZXRFbGVtZW50KFwiY29sb3JzXCIpLCBcImNvbG9yXCIpO1xuXG5cdFx0Ly8gQmluZCBDU1MgY2xhc3MgbmFtZSB0byBjb2xvciBwcm9wZXJ0eSB2YWx1ZVxuXHRcdGJpbmRDbGFzcyhlbCwgY29sb3IpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgXCIuL0FwcGxpY2F0aW9uLnN0eWxcIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiYmluZENsYXNzMlwiLCBbXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJBcHBsaWNhdGlvbi5zdHlsXCIsIFwiaW5kZXgudHNcIl0pO1xuXHRuZXcgQXBwbGljYXRpb24oKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=