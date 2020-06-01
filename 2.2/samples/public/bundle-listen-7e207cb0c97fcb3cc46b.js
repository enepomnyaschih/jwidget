(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["listen"],{

/***/ "../../main/dist/listen.js":
/*!******************************************!*\
  !*** C:/jwidget/git/main/dist/listen.js ***!
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
Object.defineProperty(exports, "__esModule", { value: true });
class JQEventAttachment {
    constructor(el, events, arg1, arg2) {
        this.el = el;
        this.events = events;
        this.arg1 = arg1;
        this.arg2 = arg2;
        el.on(events, arg1, arg2);
    }
    destroy() {
        this.el.off(this.events, this.arg1, this.arg2);
    }
}
function listen(el, events, arg1, arg2) {
    return new JQEventAttachment(el, events, arg1, arg2);
}
exports.default = listen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Rlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzQkU7O0FBSUYsTUFBTSxpQkFBaUI7SUFDdEIsWUFBb0IsRUFBZSxFQUFVLE1BQWMsRUFBVSxJQUFTLEVBQVUsSUFBVTtRQUE5RSxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQUs7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2pHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTztRQUNOLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNEO0FBa0JELFNBQXdCLE1BQU0sQ0FBQyxFQUFlLEVBQUUsTUFBYyxFQUFFLElBQVMsRUFBRSxJQUFVO0lBQ3BGLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRkQseUJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5cbmNsYXNzIEpRRXZlbnRBdHRhY2htZW50IGltcGxlbWVudHMgRGVzdHJveWFibGUge1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBKUXVlcnk8YW55PiwgcHJpdmF0ZSBldmVudHM6IHN0cmluZywgcHJpdmF0ZSBhcmcxOiBhbnksIHByaXZhdGUgYXJnMj86IGFueSkge1xuXHRcdGVsLm9uKGV2ZW50cywgYXJnMSwgYXJnMik7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuZWwub2ZmKHRoaXMuZXZlbnRzLCB0aGlzLmFyZzEsIHRoaXMuYXJnMik7XG5cdH1cbn1cblxuLyoqXG4gKiBBdHRhY2hlcyBoYW5kbGVyIHRvIGFuIGV2ZW50LiBqV2lkZ2V0IGV4dGVuc2lvbiBmb3IgalF1ZXJ5IFwib25cIiBtZXRob2QgcmV0dXJuaW5nIHRoZSBkZXN0cm95YWJsZSBldmVudCBhdHRhY2htZW50LlxuICpcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cbiAqIEBwYXJhbSBldmVudHMgT25lIG9yIG1vcmUgc3BhY2Utc2VwYXJhdGVkIGV2ZW50IHR5cGVzIGFuZCBvcHRpb25hbCBuYW1lc3BhY2VzLCBzdWNoIGFzIFwiY2xpY2tcIiBvciBcImtleWRvd24ubXlQbHVnaW5cIi5cbiAqIEBwYXJhbSBoYW5kbGVyIEEgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuIFRoZSB2YWx1ZSBgZmFsc2VgIGlzIGFsc28gYWxsb3dlZCBhcyBhIHNob3J0aGFuZCBmb3IgYSBmdW5jdGlvbiB0aGF0IHNpbXBseSBkb2VzIGByZXR1cm4gZmFsc2VgLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaXN0ZW4oZWw6IEpRdWVyeTxhbnk+LCBldmVudHM6IHN0cmluZywgaGFuZGxlcjogKGV2ZW50T2JqZWN0OiBKUXVlcnkuRXZlbnQpID0+IGFueSk6IERlc3Ryb3lhYmxlO1xuXG4vKipcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cbiAqIEBwYXJhbSBldmVudHMgT25lIG9yIG1vcmUgc3BhY2Utc2VwYXJhdGVkIGV2ZW50IHR5cGVzIGFuZCBvcHRpb25hbCBuYW1lc3BhY2VzLCBzdWNoIGFzIFwiY2xpY2tcIiBvciBcImtleWRvd24ubXlQbHVnaW5cIi5cbiAqIEBwYXJhbSBzZWxlY3RvciBBIHNlbGVjdG9yIHN0cmluZyB0byBmaWx0ZXIgdGhlIGRlc2NlbmRhbnRzIG9mIHRoZSBzZWxlY3RlZCBlbGVtZW50cyB0aGF0IHRyaWdnZXIgdGhlIGV2ZW50LiBJZiB0aGUgc2VsZWN0b3IgaXMgbnVsbCBvciBvbWl0dGVkLCB0aGUgZXZlbnQgaXMgYWx3YXlzIHRyaWdnZXJlZCB3aGVuIGl0IHJlYWNoZXMgdGhlIHNlbGVjdGVkIGVsZW1lbnQuXG4gKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLiBUaGUgdmFsdWUgYGZhbHNlYCBpcyBhbHNvIGFsbG93ZWQgYXMgYSBzaG9ydGhhbmQgZm9yIGEgZnVuY3Rpb24gdGhhdCBzaW1wbHkgZG9lcyBgcmV0dXJuIGZhbHNlYC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdGVuKGVsOiBKUXVlcnk8YW55PiwgZXZlbnRzOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcsIGhhbmRsZXI6IChldmVudE9iamVjdDogSlF1ZXJ5LkV2ZW50KSA9PiBhbnkpOiBEZXN0cm95YWJsZTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RlbihlbDogSlF1ZXJ5PGFueT4sIGV2ZW50czogc3RyaW5nLCBhcmcxOiBhbnksIGFyZzI/OiBhbnkpOiBEZXN0cm95YWJsZSB7XG5cdHJldHVybiBuZXcgSlFFdmVudEF0dGFjaG1lbnQoZWwsIGV2ZW50cywgYXJnMSwgYXJnMik7XG59XG4iXX0=

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

/***/ }),

/***/ "./listen/Application.jw.html":
/*!************************************!*\
  !*** ./listen/Application.jw.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div jwid=\"tip\">\n\t\tThis example demonstrates an easy way\n\t\tto aggregate jQuery event handlers inside components.\n\t\tHandler for \"mousemove\" event is aggregated inside component,\n\t\tso component destruction triggers event unbinding. Try it!\n\t</div><div jwid=\"buttons\"><button type=\"button\" jwid=\"destroy-button\">Destroy component</button></div></div>\n";

/***/ }),

/***/ "./listen/Application.styl":
/*!*********************************!*\
  !*** ./listen/Application.styl ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./listen/Application.ts":
/*!*******************************!*\
  !*** ./listen/Application.ts ***!
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

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var listen_1 = __importDefault(__webpack_require__(/*! jwidget/listen */ "../../main/dist/listen.js"));

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
      key: "beforeRender",
      value: function beforeRender() {
        _get(_getPrototypeOf(Application.prototype), "beforeRender", this).call(this);

        jquery_1.default("body").val(); // Bind a handler to "mousemove" event and aggregate the attachment

        this.own(listen_1.default(jquery_1.default(window), "mousemove", function (event) {
          jquery_1.default(".output").text(event.pageX + ":" + event.pageY);
        }));
      }
    }, {
      key: "renderDestroyButton",
      value: function renderDestroyButton(el) {
        var _this = this;

        // On button click, destroy this component
        el.on("click", function () {
          return _this.destroy();
        });
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./listen/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./listen/index.ts":
/*!*************************!*\
  !*** ./listen/index.ts ***!
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./listen/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./listen/Application.styl");

jquery_1.default(function () {
  initExample_1.default("listen", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]); // Keep output outside of application, to demonstate that
  // event handler is unbound on application destruction.

  jquery_1.default("body").append('<div class="output-box">' + 'Mouse coordinates: <span class="output"></span>' + '<div>');
  new Application_1.default().renderTo("body");
});

/***/ })

},[["./listen/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2xpc3Rlbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2NvbW1vbi9pbml0RXhhbXBsZS50cyIsIndlYnBhY2s6Ly8vLi9saXN0ZW4vQXBwbGljYXRpb24uancuaHRtbCIsIndlYnBhY2s6Ly8vLi9saXN0ZW4vQXBwbGljYXRpb24uc3R5bD81ZGYyIiwid2VicGFjazovLy8uLi8uLi9zcmMvbGlzdGVuL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvbGlzdGVuL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLCttSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekMzQzs7QUFDQTs7QUFDQTs7QUFFQSxTQUF3QixXQUF4QixDQUFvQyxJQUFwQyxFQUFrRCxLQUFsRCxFQUFpRTtBQUNoRSxNQUFNLEVBQUUsR0FBRyxpQkFBRSwrREFBRixDQUFYO0FBQ0EsTUFBSSxLQUFLLEdBQUcsSUFBWjtBQUNBLE9BQUssQ0FBQyxPQUFOLENBQWMsVUFBQyxJQUFELEVBQVM7QUFDdEIsUUFBSSxLQUFKLEVBQVc7QUFDVixXQUFLLEdBQUcsS0FBUjtBQUNBLEtBRkQsTUFFTztBQUNOLFFBQUUsQ0FBQyxNQUFILENBQVUsSUFBVjtBQUNBOztBQUNELE1BQUUsQ0FBQyxNQUFILENBQVUsaUJBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFBd0MsSUFBeEMsQ0FBNkMsTUFBN0MsZ0JBQTRELElBQTVELGNBQW9FLElBQXBFLFVBQVY7QUFDQSxHQVBEO0FBUUEsbUJBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsZ0hBQWxCLEVBQW9JLE9BQXBJLENBQTRJLEVBQTVJO0FBQ0E7O0FBWkQsOEI7Ozs7Ozs7Ozs7O0FDSkEsc2E7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUdBO0FBQUE7QUFBQTtBQUFBLE1BQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FFdUI7QUFDckI7O0FBRUEseUJBQUUsTUFBRixFQUFVLEdBQVYsR0FIcUIsQ0FJckI7O0FBQ0EsYUFBSyxHQUFMLENBQVMsaUJBQU8saUJBQUUsTUFBRixDQUFQLEVBQWtCLFdBQWxCLEVBQStCLGVBQUssRUFBRztBQUMvQywyQkFBRSxTQUFGLEVBQWEsSUFBYixDQUFrQixLQUFLLENBQUMsS0FBTixHQUFjLEdBQWQsR0FBb0IsS0FBSyxDQUFDLEtBQTVDO0FBQ0EsU0FGUSxDQUFUO0FBR0E7QUFWRjtBQUFBO0FBQUEsMENBWStCLEVBWi9CLEVBWXlDO0FBQUE7O0FBQ3ZDO0FBQ0EsVUFBRSxDQUFDLEVBQUgsQ0FBTSxPQUFOLEVBQWU7QUFBQSxpQkFBTSxLQUFJLENBQUMsT0FBTCxFQUFOO0FBQUEsU0FBZjtBQUNBO0FBZkY7O0FBQUE7QUFBQSxJQUF5QyxtQkFBekM7O0FBQXFCLGFBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBUywyREFBVCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtBQWdCckI7QUFBQyxDQWhCRDs7a0JBQXFCLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05yQjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxpQkFBRSxZQUFLO0FBQ04sd0JBQVksUUFBWixFQUFzQixDQUFDLGdCQUFELEVBQW1CLHFCQUFuQixFQUEwQyxrQkFBMUMsRUFBOEQsVUFBOUQsQ0FBdEIsRUFETSxDQUdOO0FBQ0E7O0FBQ0EsbUJBQUUsTUFBRixFQUFVLE1BQVYsQ0FDQyw2QkFDQSxpREFEQSxHQUVBLE9BSEQ7QUFNQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FaRCxFIiwiZmlsZSI6ImJ1bmRsZS1saXN0ZW4tN2UyMDdjYjBjOTdmY2IzY2M0NmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIEpRRXZlbnRBdHRhY2htZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBldmVudHMsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XHJcbiAgICAgICAgdGhpcy5hcmcxID0gYXJnMTtcclxuICAgICAgICB0aGlzLmFyZzIgPSBhcmcyO1xyXG4gICAgICAgIGVsLm9uKGV2ZW50cywgYXJnMSwgYXJnMik7XHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuZWwub2ZmKHRoaXMuZXZlbnRzLCB0aGlzLmFyZzEsIHRoaXMuYXJnMik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbGlzdGVuKGVsLCBldmVudHMsIGFyZzEsIGFyZzIpIHtcclxuICAgIHJldHVybiBuZXcgSlFFdmVudEF0dGFjaG1lbnQoZWwsIGV2ZW50cywgYXJnMSwgYXJnMik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbGlzdGVuO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liR2x6ZEdWdUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMnhwYzNSbGJpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdSVUZ6UWtVN08wRkJTVVlzVFVGQlRTeHBRa0ZCYVVJN1NVRkRkRUlzV1VGQmIwSXNSVUZCWlN4RlFVRlZMRTFCUVdNc1JVRkJWU3hKUVVGVExFVkJRVlVzU1VGQlZUdFJRVUU1UlN4UFFVRkZMRWRCUVVZc1JVRkJSU3hEUVVGaE8xRkJRVlVzVjBGQlRTeEhRVUZPTEUxQlFVMHNRMEZCVVR0UlFVRlZMRk5CUVVrc1IwRkJTaXhKUVVGSkxFTkJRVXM3VVVGQlZTeFRRVUZKTEVkQlFVb3NTVUZCU1N4RFFVRk5PMUZCUTJwSExFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU16UWl4RFFVRkRPMGxCUlVRc1QwRkJUenRSUVVOT0xFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRGFFUXNRMEZCUXp0RFFVTkVPMEZCYTBKRUxGTkJRWGRDTEUxQlFVMHNRMEZCUXl4RlFVRmxMRVZCUVVVc1RVRkJZeXhGUVVGRkxFbEJRVk1zUlVGQlJTeEpRVUZWTzBsQlEzQkdMRTlCUVU4c1NVRkJTU3hwUWtGQmFVSXNRMEZCUXl4RlFVRkZMRVZCUVVVc1RVRkJUU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTjBSQ3hEUVVGRE8wRkJSa1FzZVVKQlJVTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2x4dVRVbFVJRXhwWTJWdWMyVmNibHh1UTI5d2VYSnBaMmgwSUNoaktTQXlNREl3SUVWbmIzSWdUbVZ3YjIxdWVXRnpZMmhwYUZ4dVhHNVFaWEp0YVhOemFXOXVJR2x6SUdobGNtVmllU0JuY21GdWRHVmtMQ0JtY21WbElHOW1JR05vWVhKblpTd2dkRzhnWVc1NUlIQmxjbk52YmlCdlluUmhhVzVwYm1jZ1lTQmpiM0I1WEc1dlppQjBhR2x6SUhOdlpuUjNZWEpsSUdGdVpDQmhjM052WTJsaGRHVmtJR1J2WTNWdFpXNTBZWFJwYjI0Z1ptbHNaWE1nS0hSb1pTQmNJbE52Wm5SM1lYSmxYQ0lwTENCMGJ5QmtaV0ZzWEc1cGJpQjBhR1VnVTI5bWRIZGhjbVVnZDJsMGFHOTFkQ0J5WlhOMGNtbGpkR2x2Yml3Z2FXNWpiSFZrYVc1bklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpYRzUwYnlCMWMyVXNJR052Y0hrc0lHMXZaR2xtZVN3Z2JXVnlaMlVzSUhCMVlteHBjMmdzSUdScGMzUnlhV0oxZEdVc0lITjFZbXhwWTJWdWMyVXNJR0Z1WkM5dmNpQnpaV3hzWEc1amIzQnBaWE1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMQ0JoYm1RZ2RHOGdjR1Z5YldsMElIQmxjbk52Ym5NZ2RHOGdkMmh2YlNCMGFHVWdVMjltZEhkaGNtVWdhWE5jYm1aMWNtNXBjMmhsWkNCMGJ5QmtieUJ6Ynl3Z2MzVmlhbVZqZENCMGJ5QjBhR1VnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNWNibFJvWlNCaFltOTJaU0JqYjNCNWNtbG5hSFFnYm05MGFXTmxJR0Z1WkNCMGFHbHpJSEJsY20xcGMzTnBiMjRnYm05MGFXTmxJSE5vWVd4c0lHSmxJR2x1WTJ4MVpHVmtJR2x1SUdGc2JGeHVZMjl3YVdWeklHOXlJSE4xWW5OMFlXNTBhV0ZzSUhCdmNuUnBiMjV6SUc5bUlIUm9aU0JUYjJaMGQyRnlaUzVjYmx4dVZFaEZJRk5QUmxSWFFWSkZJRWxUSUZCU1QxWkpSRVZFSUZ3aVFWTWdTVk5jSWl3Z1YwbFVTRTlWVkNCWFFWSlNRVTVVV1NCUFJpQkJUbGtnUzBsT1JDd2dSVmhRVWtWVFV5QlBVbHh1U1UxUVRFbEZSQ3dnU1U1RFRGVkVTVTVISUVKVlZDQk9UMVFnVEVsTlNWUkZSQ0JVVHlCVVNFVWdWMEZTVWtGT1ZFbEZVeUJQUmlCTlJWSkRTRUZPVkVGQ1NVeEpWRmtzWEc1R1NWUk9SVk5USUVaUFVpQkJJRkJCVWxSSlExVk1RVklnVUZWU1VFOVRSU0JCVGtRZ1RrOU9TVTVHVWtsT1IwVk5SVTVVTGlCSlRpQk9UeUJGVmtWT1ZDQlRTRUZNVENCVVNFVmNia0ZWVkVoUFVsTWdUMUlnUTA5UVdWSkpSMGhVSUVoUFRFUkZVbE1nUWtVZ1RFbEJRa3hGSUVaUFVpQkJUbGtnUTB4QlNVMHNJRVJCVFVGSFJWTWdUMUlnVDFSSVJWSmNia3hKUVVKSlRFbFVXU3dnVjBoRlZFaEZVaUJKVGlCQlRpQkJRMVJKVDA0Z1QwWWdRMDlPVkZKQlExUXNJRlJQVWxRZ1QxSWdUMVJJUlZKWFNWTkZMQ0JCVWtsVFNVNUhJRVpTVDAwc1hHNVBWVlFnVDBZZ1QxSWdTVTRnUTA5T1RrVkRWRWxQVGlCWFNWUklJRlJJUlNCVFQwWlVWMEZTUlNCUFVpQlVTRVVnVlZORklFOVNJRTlVU0VWU0lFUkZRVXhKVGtkVElFbE9JRlJJUlZ4dVUwOUdWRmRCVWtVdVhHNHFMMXh1WEc1cGJYQnZjblFnUkdWemRISnZlV0ZpYkdVZ1puSnZiU0FuTGk5RVpYTjBjbTk1WVdKc1pTYzdYRzVjYm1Oc1lYTnpJRXBSUlhabGJuUkJkSFJoWTJodFpXNTBJR2x0Y0d4bGJXVnVkSE1nUkdWemRISnZlV0ZpYkdVZ2UxeHVYSFJqYjI1emRISjFZM1J2Y2lod2NtbDJZWFJsSUdWc09pQktVWFZsY25rOFlXNTVQaXdnY0hKcGRtRjBaU0JsZG1WdWRITTZJSE4wY21sdVp5d2djSEpwZG1GMFpTQmhjbWN4T2lCaGJua3NJSEJ5YVhaaGRHVWdZWEpuTWo4NklHRnVlU2tnZTF4dVhIUmNkR1ZzTG05dUtHVjJaVzUwY3l3Z1lYSm5NU3dnWVhKbk1pazdYRzVjZEgxY2JseHVYSFJrWlhOMGNtOTVLQ2tnZTF4dVhIUmNkSFJvYVhNdVpXd3ViMlptS0hSb2FYTXVaWFpsYm5SekxDQjBhR2x6TG1GeVp6RXNJSFJvYVhNdVlYSm5NaWs3WEc1Y2RIMWNibjFjYmx4dUx5b3FYRzRnS2lCQmRIUmhZMmhsY3lCb1lXNWtiR1Z5SUhSdklHRnVJR1YyWlc1MExpQnFWMmxrWjJWMElHVjRkR1Z1YzJsdmJpQm1iM0lnYWxGMVpYSjVJRndpYjI1Y0lpQnRaWFJvYjJRZ2NtVjBkWEp1YVc1bklIUm9aU0JrWlhOMGNtOTVZV0pzWlNCbGRtVnVkQ0JoZEhSaFkyaHRaVzUwTGx4dUlDcGNiaUFxSUVCd1lYSmhiU0JsYkNCRVQwMGdaV3hsYldWdWRDNWNiaUFxSUVCd1lYSmhiU0JsZG1WdWRITWdUMjVsSUc5eUlHMXZjbVVnYzNCaFkyVXRjMlZ3WVhKaGRHVmtJR1YyWlc1MElIUjVjR1Z6SUdGdVpDQnZjSFJwYjI1aGJDQnVZVzFsYzNCaFkyVnpMQ0J6ZFdOb0lHRnpJRndpWTJ4cFkydGNJaUJ2Y2lCY0ltdGxlV1J2ZDI0dWJYbFFiSFZuYVc1Y0lpNWNiaUFxSUVCd1lYSmhiU0JvWVc1a2JHVnlJRUVnWm5WdVkzUnBiMjRnZEc4Z1pYaGxZM1YwWlNCM2FHVnVJSFJvWlNCbGRtVnVkQ0JwY3lCMGNtbG5aMlZ5WldRdUlGUm9aU0IyWVd4MVpTQmdabUZzYzJWZ0lHbHpJR0ZzYzI4Z1lXeHNiM2RsWkNCaGN5QmhJSE5vYjNKMGFHRnVaQ0JtYjNJZ1lTQm1kVzVqZEdsdmJpQjBhR0YwSUhOcGJYQnNlU0JrYjJWeklHQnlaWFIxY200Z1ptRnNjMlZnTGx4dUlDb3ZYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQnNhWE4wWlc0b1pXdzZJRXBSZFdWeWVUeGhibmsrTENCbGRtVnVkSE02SUhOMGNtbHVaeXdnYUdGdVpHeGxjam9nS0dWMlpXNTBUMkpxWldOME9pQktVWFZsY25rdVJYWmxiblFwSUQwK0lHRnVlU2s2SUVSbGMzUnliM2xoWW14bE8xeHVYRzR2S2lwY2JpQXFJRUJ3WVhKaGJTQmxiQ0JFVDAwZ1pXeGxiV1Z1ZEM1Y2JpQXFJRUJ3WVhKaGJTQmxkbVZ1ZEhNZ1QyNWxJRzl5SUcxdmNtVWdjM0JoWTJVdGMyVndZWEpoZEdWa0lHVjJaVzUwSUhSNWNHVnpJR0Z1WkNCdmNIUnBiMjVoYkNCdVlXMWxjM0JoWTJWekxDQnpkV05vSUdGeklGd2lZMnhwWTJ0Y0lpQnZjaUJjSW10bGVXUnZkMjR1YlhsUWJIVm5hVzVjSWk1Y2JpQXFJRUJ3WVhKaGJTQnpaV3hsWTNSdmNpQkJJSE5sYkdWamRHOXlJSE4wY21sdVp5QjBieUJtYVd4MFpYSWdkR2hsSUdSbGMyTmxibVJoYm5SeklHOW1JSFJvWlNCelpXeGxZM1JsWkNCbGJHVnRaVzUwY3lCMGFHRjBJSFJ5YVdkblpYSWdkR2hsSUdWMlpXNTBMaUJKWmlCMGFHVWdjMlZzWldOMGIzSWdhWE1nYm5Wc2JDQnZjaUJ2YldsMGRHVmtMQ0IwYUdVZ1pYWmxiblFnYVhNZ1lXeDNZWGx6SUhSeWFXZG5aWEpsWkNCM2FHVnVJR2wwSUhKbFlXTm9aWE1nZEdobElITmxiR1ZqZEdWa0lHVnNaVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdhR0Z1Wkd4bGNpQkJJR1oxYm1OMGFXOXVJSFJ2SUdWNFpXTjFkR1VnZDJobGJpQjBhR1VnWlhabGJuUWdhWE1nZEhKcFoyZGxjbVZrTGlCVWFHVWdkbUZzZFdVZ1lHWmhiSE5sWUNCcGN5QmhiSE52SUdGc2JHOTNaV1FnWVhNZ1lTQnphRzl5ZEdoaGJtUWdabTl5SUdFZ1puVnVZM1JwYjI0Z2RHaGhkQ0J6YVcxd2JIa2daRzlsY3lCZ2NtVjBkWEp1SUdaaGJITmxZQzVjYmlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z2JHbHpkR1Z1S0dWc09pQktVWFZsY25rOFlXNTVQaXdnWlhabGJuUnpPaUJ6ZEhKcGJtY3NJSE5sYkdWamRHOXlPaUJ6ZEhKcGJtY3NJR2hoYm1Sc1pYSTZJQ2hsZG1WdWRFOWlhbVZqZERvZ1NsRjFaWEo1TGtWMlpXNTBLU0E5UGlCaGJua3BPaUJFWlhOMGNtOTVZV0pzWlR0Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdaMWJtTjBhVzl1SUd4cGMzUmxiaWhsYkRvZ1NsRjFaWEo1UEdGdWVUNHNJR1YyWlc1MGN6b2djM1J5YVc1bkxDQmhjbWN4T2lCaGJua3NJR0Z5WnpJL09pQmhibmtwT2lCRVpYTjBjbTk1WVdKc1pTQjdYRzVjZEhKbGRIVnliaUJ1WlhjZ1NsRkZkbVZ1ZEVGMGRHRmphRzFsYm5Rb1pXd3NJR1YyWlc1MGN5d2dZWEpuTVN3Z1lYSm5NaWs3WEc1OVhHNGlYWDA9IiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIjtcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0RXhhbXBsZShuYW1lOiBzdHJpbmcsIGxpbmtzOiBzdHJpbmdbXSkge1xuXHRjb25zdCBlbCA9ICQoJzxkaXYgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IHdpZHRoOiA2MDBweFwiPjxiPlNvdXJjZTo8L2I+IDwvZGl2PicpO1xuXHRsZXQgZmlyc3QgPSB0cnVlO1xuXHRsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG5cdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5hcHBlbmQoJywgJyk7XG5cdFx0fVxuXHRcdGVsLmFwcGVuZCgkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+JykudGV4dChsaW5rKS5hdHRyKFwiaHJlZlwiLCBgc3JjLyR7bmFtZX0vJHtsaW5rfS50eHRgKSk7XG5cdH0pO1xuXHQkKFwiYm9keVwiKS5wcmVwZW5kKCc8ZGl2PjxiPkV4YW1wbGU8L2I+PC9kaXY+PGRpdj48YSBocmVmPVwiamF2YXNjcmlwdDpsb2NhdGlvbi5yZWxvYWQoKVwiPlJlZnJlc2g8L2E+PC9kaXY+PGhyIHN0eWxlPVwiY2xlYXI6IGJvdGhcIj4nKS5wcmVwZW5kKGVsKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2IGp3aWQ9XFxcInRpcFxcXCI+XFxuXFx0XFx0VGhpcyBleGFtcGxlIGRlbW9uc3RyYXRlcyBhbiBlYXN5IHdheVxcblxcdFxcdHRvIGFnZ3JlZ2F0ZSBqUXVlcnkgZXZlbnQgaGFuZGxlcnMgaW5zaWRlIGNvbXBvbmVudHMuXFxuXFx0XFx0SGFuZGxlciBmb3IgXFxcIm1vdXNlbW92ZVxcXCIgZXZlbnQgaXMgYWdncmVnYXRlZCBpbnNpZGUgY29tcG9uZW50LFxcblxcdFxcdHNvIGNvbXBvbmVudCBkZXN0cnVjdGlvbiB0cmlnZ2VycyBldmVudCB1bmJpbmRpbmcuIFRyeSBpdCFcXG5cXHQ8L2Rpdj48ZGl2IGp3aWQ9XFxcImJ1dHRvbnNcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBqd2lkPVxcXCJkZXN0cm95LWJ1dHRvblxcXCI+RGVzdHJveSBjb21wb25lbnQ8L2J1dHRvbj48L2Rpdj48L2Rpdj5cXG5cIjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IGxpc3RlbiBmcm9tIFwiandpZGdldC9saXN0ZW5cIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByb3RlY3RlZCBiZWZvcmVSZW5kZXIoKSB7XG5cdFx0c3VwZXIuYmVmb3JlUmVuZGVyKCk7XG5cblx0XHQkKFwiYm9keVwiKS52YWwoKTtcblx0XHQvLyBCaW5kIGEgaGFuZGxlciB0byBcIm1vdXNlbW92ZVwiIGV2ZW50IGFuZCBhZ2dyZWdhdGUgdGhlIGF0dGFjaG1lbnRcblx0XHR0aGlzLm93bihsaXN0ZW4oJCh3aW5kb3cpLCBcIm1vdXNlbW92ZVwiLCBldmVudCA9PiB7XG5cdFx0XHQkKFwiLm91dHB1dFwiKS50ZXh0KGV2ZW50LnBhZ2VYICsgXCI6XCIgKyBldmVudC5wYWdlWSk7XG5cdFx0fSkpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckRlc3Ryb3lCdXR0b24oZWw6IEpRdWVyeSkge1xuXHRcdC8vIE9uIGJ1dHRvbiBjbGljaywgZGVzdHJveSB0aGlzIGNvbXBvbmVudFxuXHRcdGVsLm9uKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5kZXN0cm95KCkpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgXCIuL0FwcGxpY2F0aW9uLnN0eWxcIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwibGlzdGVuXCIsIFtcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcIkFwcGxpY2F0aW9uLnN0eWxcIiwgXCJpbmRleC50c1wiXSk7XG5cblx0Ly8gS2VlcCBvdXRwdXQgb3V0c2lkZSBvZiBhcHBsaWNhdGlvbiwgdG8gZGVtb25zdGF0ZSB0aGF0XG5cdC8vIGV2ZW50IGhhbmRsZXIgaXMgdW5ib3VuZCBvbiBhcHBsaWNhdGlvbiBkZXN0cnVjdGlvbi5cblx0JChcImJvZHlcIikuYXBwZW5kKFxuXHRcdCc8ZGl2IGNsYXNzPVwib3V0cHV0LWJveFwiPicgK1xuXHRcdCdNb3VzZSBjb29yZGluYXRlczogPHNwYW4gY2xhc3M9XCJvdXRwdXRcIj48L3NwYW4+JyArXG5cdFx0JzxkaXY+J1xuXHQpO1xuXG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==