(self["webpackChunk"] = self["webpackChunk"] || []).push([["listen"],{

/***/ "./listen/Application.jw.html":
/*!************************************!*\
  !*** ./listen/Application.jw.html ***!
  \************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"application\"><div jwid=\"tip\">\n\t\tThis example demonstrates an easy way\n\t\tto aggregate jQuery event handlers inside components.\n\t\tHandler for \"mousemove\" event is aggregated inside component,\n\t\tso component destruction triggers event unbinding. Try it!\n\t</div><div jwid=\"buttons\"><button type=\"button\" jwid=\"destroy-button\">Destroy component</button></div></div>\n";

/***/ }),

/***/ "../../main/dist/listen.js":
/*!*********************************!*\
  !*** ../../main/dist/listen.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports) {

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var JQEventAttachment = /*#__PURE__*/function () {
  function JQEventAttachment(el, events, arg1, arg2) {
    _classCallCheck(this, JQEventAttachment);

    this.el = el;
    this.events = events;
    this.arg1 = arg1;
    this.arg2 = arg2;
    el.on(events, arg1, arg2);
  }

  _createClass(JQEventAttachment, [{
    key: "destroy",
    value: function destroy() {
      this.el.off(this.events, this.arg1, this.arg2);
    }
  }]);

  return JQEventAttachment;
}();

function listen(el, events, arg1, arg2) {
  return new JQEventAttachment(el, events, arg1, arg2);
}

exports.default = listen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JFOzs7Ozs7Ozs7Ozs7SUFJSSxpQjtBQUNMLDZCQUFvQixFQUFwQixFQUE2QyxNQUE3QyxFQUFxRSxJQUFyRSxFQUF3RixJQUF4RixFQUFrRztBQUFBOztBQUE5RSxTQUFBLEVBQUEsR0FBQSxFQUFBO0FBQXlCLFNBQUEsTUFBQSxHQUFBLE1BQUE7QUFBd0IsU0FBQSxJQUFBLEdBQUEsSUFBQTtBQUFtQixTQUFBLElBQUEsR0FBQSxJQUFBO0FBQ3ZGLElBQUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxNQUFOLEVBQWMsSUFBZCxFQUFvQixJQUFwQjtBQUNBOzs7O1dBRUQsbUJBQU87QUFDTixXQUFLLEVBQUwsQ0FBUSxHQUFSLENBQVksS0FBSyxNQUFqQixFQUF5QixLQUFLLElBQTlCLEVBQW9DLEtBQUssSUFBekM7QUFDQTs7Ozs7O0FBbUJGLFNBQXdCLE1BQXhCLENBQStCLEVBQS9CLEVBQWdELE1BQWhELEVBQWdFLElBQWhFLEVBQTJFLElBQTNFLEVBQXFGO0FBQ3BGLFNBQU8sSUFBSSxpQkFBSixDQUFzQixFQUF0QixFQUEwQixNQUExQixFQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxDQUFQO0FBQ0E7O0FBRkQsT0FBQSxDQUFBLE9BQUEsR0FBQSxNQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IERlc3Ryb3lhYmxlIGZyb20gJy4vRGVzdHJveWFibGUnO1xuXG5jbGFzcyBKUUV2ZW50QXR0YWNobWVudCBpbXBsZW1lbnRzIERlc3Ryb3lhYmxlIHtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbDogSlF1ZXJ5PGFueT4sIHByaXZhdGUgZXZlbnRzOiBzdHJpbmcsIHByaXZhdGUgYXJnMTogYW55LCBwcml2YXRlIGFyZzI/OiBhbnkpIHtcblx0XHRlbC5vbihldmVudHMsIGFyZzEsIGFyZzIpO1xuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmVsLm9mZih0aGlzLmV2ZW50cywgdGhpcy5hcmcxLCB0aGlzLmFyZzIpO1xuXHR9XG59XG5cbi8qKlxuICogQXR0YWNoZXMgaGFuZGxlciB0byBhbiBldmVudC4galdpZGdldCBleHRlbnNpb24gZm9yIGpRdWVyeSBcIm9uXCIgbWV0aG9kIHJldHVybmluZyB0aGUgZGVzdHJveWFibGUgZXZlbnQgYXR0YWNobWVudC5cbiAqXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gZXZlbnRzIE9uZSBvciBtb3JlIHNwYWNlLXNlcGFyYXRlZCBldmVudCB0eXBlcyBhbmQgb3B0aW9uYWwgbmFtZXNwYWNlcywgc3VjaCBhcyBcImNsaWNrXCIgb3IgXCJrZXlkb3duLm15UGx1Z2luXCIuXG4gKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLiBUaGUgdmFsdWUgYGZhbHNlYCBpcyBhbHNvIGFsbG93ZWQgYXMgYSBzaG9ydGhhbmQgZm9yIGEgZnVuY3Rpb24gdGhhdCBzaW1wbHkgZG9lcyBgcmV0dXJuIGZhbHNlYC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdGVuKGVsOiBKUXVlcnk8YW55PiwgZXZlbnRzOiBzdHJpbmcsIGhhbmRsZXI6IChldmVudE9iamVjdDogSlF1ZXJ5LkV2ZW50KSA9PiBhbnkpOiBEZXN0cm95YWJsZTtcblxuLyoqXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gZXZlbnRzIE9uZSBvciBtb3JlIHNwYWNlLXNlcGFyYXRlZCBldmVudCB0eXBlcyBhbmQgb3B0aW9uYWwgbmFtZXNwYWNlcywgc3VjaCBhcyBcImNsaWNrXCIgb3IgXCJrZXlkb3duLm15UGx1Z2luXCIuXG4gKiBAcGFyYW0gc2VsZWN0b3IgQSBzZWxlY3RvciBzdHJpbmcgdG8gZmlsdGVyIHRoZSBkZXNjZW5kYW50cyBvZiB0aGUgc2VsZWN0ZWQgZWxlbWVudHMgdGhhdCB0cmlnZ2VyIHRoZSBldmVudC4gSWYgdGhlIHNlbGVjdG9yIGlzIG51bGwgb3Igb21pdHRlZCwgdGhlIGV2ZW50IGlzIGFsd2F5cyB0cmlnZ2VyZWQgd2hlbiBpdCByZWFjaGVzIHRoZSBzZWxlY3RlZCBlbGVtZW50LlxuICogQHBhcmFtIGhhbmRsZXIgQSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC4gVGhlIHZhbHVlIGBmYWxzZWAgaXMgYWxzbyBhbGxvd2VkIGFzIGEgc2hvcnRoYW5kIGZvciBhIGZ1bmN0aW9uIHRoYXQgc2ltcGx5IGRvZXMgYHJldHVybiBmYWxzZWAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RlbihlbDogSlF1ZXJ5PGFueT4sIGV2ZW50czogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBoYW5kbGVyOiAoZXZlbnRPYmplY3Q6IEpRdWVyeS5FdmVudCkgPT4gYW55KTogRGVzdHJveWFibGU7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaXN0ZW4oZWw6IEpRdWVyeTxhbnk+LCBldmVudHM6IHN0cmluZywgYXJnMTogYW55LCBhcmcyPzogYW55KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IEpRRXZlbnRBdHRhY2htZW50KGVsLCBldmVudHMsIGFyZzEsIGFyZzIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

/***/ "./common/initExample.ts":
/*!*******************************!*\
  !*** ./common/initExample.ts ***!
  \*******************************/
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

/***/ "./listen/Application.ts":
/*!*******************************!*\
  !*** ./listen/Application.ts ***!
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

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var listen_1 = __importDefault(__webpack_require__(/*! jwidget/listen */ "../../main/dist/listen.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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
exports.default = Application;

/***/ }),

/***/ "./listen/index.ts":
/*!*************************!*\
  !*** ./listen/index.ts ***!
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./listen/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./listen/Application.styl");

jquery_1.default(function () {
  initExample_1.default("listen", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]); // Keep output outside of application, to demonstate that
  // event handler is unbound on application destruction.

  jquery_1.default("body").append('<div class="output-box">' + 'Mouse coordinates: <span class="output"></span>' + '<div>');
  new Application_1.default().renderTo("body");
});

/***/ }),

/***/ "./listen/Application.styl":
/*!*********************************!*\
  !*** ./listen/Application.styl ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js"], function() { return __webpack_exec__("./listen/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saXN0ZW4vQXBwbGljYXRpb24uancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vbWFpbi9kaXN0L2xpc3Rlbi5qcyIsIndlYnBhY2s6Ly8vLi9jb21tb24vaW5pdEV4YW1wbGUudHMiLCJ3ZWJwYWNrOi8vLy4vbGlzdGVuL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL2xpc3Rlbi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saXN0ZW4vQXBwbGljYXRpb24uc3R5bD85MjU1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc2E7Ozs7Ozs7Ozs7O0FDQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdkosMkNBQTJDLGdCQUFnQixrQkFBa0IsT0FBTywyQkFBMkIsd0RBQXdELGdDQUFnQyx1REFBdUQsMkRBQTJELEVBQUU7O0FBRTNULDZEQUE2RCxzRUFBc0UsOERBQThELG9CQUFvQjs7QUFFck4sOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2YsMkNBQTJDLGNBQWMsK21KOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEekQ7O0FBQ0E7O0FBQ0E7O0FBRUEsU0FBd0IsV0FBeEIsQ0FBb0MsSUFBcEMsRUFBa0QsS0FBbEQsRUFBaUU7QUFDaEUsTUFBTSxFQUFFLEdBQUcsaUJBQUUsK0RBQUYsQ0FBWDtBQUNBLE1BQUksS0FBSyxHQUFHLElBQVo7QUFDQSxPQUFLLENBQUMsT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFTO0FBQ3RCLFFBQUksS0FBSixFQUFXO0FBQ1YsV0FBSyxHQUFHLEtBQVI7QUFDQSxLQUZELE1BRU87QUFDTixRQUFFLENBQUMsTUFBSCxDQUFVLElBQVY7QUFDQTs7QUFDRCxNQUFFLENBQUMsTUFBSCxDQUFVLGlCQUFFLHlCQUFGLEVBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQTZDLE1BQTdDLGdCQUE0RCxJQUE1RCxjQUFvRSxJQUFwRSxVQUFWO0FBQ0EsR0FQRDtBQVFBLG1CQUFFLE1BQUYsRUFBVSxPQUFWLENBQWtCLGdIQUFsQixFQUFvSSxPQUFwSSxDQUE0SSxFQUE1STtBQUNBOztBQVpELDhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBOztBQUNBOztBQUNBOztBQUNBOztBQUdBLElBQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxXQUVXLHdCQUFZO0FBQ3JCOztBQUVBLHVCQUFFLE1BQUYsRUFBVSxHQUFWLEdBSHFCLENBSXJCOztBQUNBLFdBQUssR0FBTCxDQUFTLGlCQUFPLGlCQUFFLE1BQUYsQ0FBUCxFQUFrQixXQUFsQixFQUErQixlQUFLLEVBQUc7QUFDL0MseUJBQUUsU0FBRixFQUFhLElBQWIsQ0FBa0IsS0FBSyxDQUFDLEtBQU4sR0FBYyxHQUFkLEdBQW9CLEtBQUssQ0FBQyxLQUE1QztBQUNBLE9BRlEsQ0FBVDtBQUdBO0FBVkY7QUFBQTtBQUFBLFdBWVcsNkJBQW9CLEVBQXBCLEVBQThCO0FBQUE7O0FBQ3ZDO0FBQ0EsUUFBRSxDQUFDLEVBQUgsQ0FBTSxPQUFOLEVBQWU7QUFBQSxlQUFNLEtBQUksQ0FBQyxPQUFMLEVBQU47QUFBQSxPQUFmO0FBQ0E7QUFmRjs7QUFBQTtBQUFBLEVBQXlDLG1CQUF6Qzs7QUFBcUIsV0FBVyxlQUQvQixtQkFBUyxtQkFBTyxDQUFDLDJEQUFELENBQWhCLENBQytCLEdBQVgsV0FBVyxDQUFYO2tCQUFBLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOztBQUNBOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxRQUFaLEVBQXNCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLGtCQUExQyxFQUE4RCxVQUE5RCxDQUF0QixFQURNLENBR047QUFDQTs7QUFDQSxtQkFBRSxNQUFGLEVBQVUsTUFBVixDQUNDLDZCQUNBLGlEQURBLEdBRUEsT0FIRDtBQU1BLE1BQUkscUJBQUosR0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQSxDQVpELEU7Ozs7Ozs7Ozs7OztBQ0xBIiwiZmlsZSI6ImJ1bmRsZS1saXN0ZW4tOGM1NzAzMzY4MTU5YjFiNzY3ZTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJhcHBsaWNhdGlvblxcXCI+PGRpdiBqd2lkPVxcXCJ0aXBcXFwiPlxcblxcdFxcdFRoaXMgZXhhbXBsZSBkZW1vbnN0cmF0ZXMgYW4gZWFzeSB3YXlcXG5cXHRcXHR0byBhZ2dyZWdhdGUgalF1ZXJ5IGV2ZW50IGhhbmRsZXJzIGluc2lkZSBjb21wb25lbnRzLlxcblxcdFxcdEhhbmRsZXIgZm9yIFxcXCJtb3VzZW1vdmVcXFwiIGV2ZW50IGlzIGFnZ3JlZ2F0ZWQgaW5zaWRlIGNvbXBvbmVudCxcXG5cXHRcXHRzbyBjb21wb25lbnQgZGVzdHJ1Y3Rpb24gdHJpZ2dlcnMgZXZlbnQgdW5iaW5kaW5nLiBUcnkgaXQhXFxuXFx0PC9kaXY+PGRpdiBqd2lkPVxcXCJidXR0b25zXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgandpZD1cXFwiZGVzdHJveS1idXR0b25cXFwiPkRlc3Ryb3kgY29tcG9uZW50PC9idXR0b24+PC9kaXY+PC9kaXY+XFxuXCI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEpRRXZlbnRBdHRhY2htZW50ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSlFFdmVudEF0dGFjaG1lbnQoZWwsIGV2ZW50cywgYXJnMSwgYXJnMikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBKUUV2ZW50QXR0YWNobWVudCk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gICAgdGhpcy5hcmcxID0gYXJnMTtcbiAgICB0aGlzLmFyZzIgPSBhcmcyO1xuICAgIGVsLm9uKGV2ZW50cywgYXJnMSwgYXJnMik7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSlFFdmVudEF0dGFjaG1lbnQsIFt7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZWwub2ZmKHRoaXMuZXZlbnRzLCB0aGlzLmFyZzEsIHRoaXMuYXJnMik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEpRRXZlbnRBdHRhY2htZW50O1xufSgpO1xuXG5mdW5jdGlvbiBsaXN0ZW4oZWwsIGV2ZW50cywgYXJnMSwgYXJnMikge1xuICByZXR1cm4gbmV3IEpRRXZlbnRBdHRhY2htZW50KGVsLCBldmVudHMsIGFyZzEsIGFyZzIpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBsaXN0ZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OXNhWE4wWlc0dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCT3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJjMEpGT3pzN096czdPenM3T3pzN1NVRkpTU3hwUWp0QlFVTk1MRFpDUVVGdlFpeEZRVUZ3UWl4RlFVRTJReXhOUVVFM1F5eEZRVUZ4UlN4SlFVRnlSU3hGUVVGM1JpeEpRVUY0Uml4RlFVRnJSenRCUVVGQk96dEJRVUU1UlN4VFFVRkJMRVZCUVVFc1IwRkJRU3hGUVVGQk8wRkJRWGxDTEZOQlFVRXNUVUZCUVN4SFFVRkJMRTFCUVVFN1FVRkJkMElzVTBGQlFTeEpRVUZCTEVkQlFVRXNTVUZCUVR0QlFVRnRRaXhUUVVGQkxFbEJRVUVzUjBGQlFTeEpRVUZCTzBGQlEzWkdMRWxCUVVFc1JVRkJSU3hEUVVGRExFVkJRVWdzUTBGQlRTeE5RVUZPTEVWQlFXTXNTVUZCWkN4RlFVRnZRaXhKUVVGd1FqdEJRVU5CT3pzN08xZEJSVVFzYlVKQlFVODdRVUZEVGl4WFFVRkxMRVZCUVV3c1EwRkJVU3hIUVVGU0xFTkJRVmtzUzBGQlN5eE5RVUZxUWl4RlFVRjVRaXhMUVVGTExFbEJRVGxDTEVWQlFXOURMRXRCUVVzc1NVRkJla003UVVGRFFUczdPenM3TzBGQmJVSkdMRk5CUVhkQ0xFMUJRWGhDTEVOQlFTdENMRVZCUVM5Q0xFVkJRV2RFTEUxQlFXaEVMRVZCUVdkRkxFbEJRV2hGTEVWQlFUSkZMRWxCUVRORkxFVkJRWEZHTzBGQlEzQkdMRk5CUVU4c1NVRkJTU3hwUWtGQlNpeERRVUZ6UWl4RlFVRjBRaXhGUVVFd1FpeE5RVUV4UWl4RlFVRnJReXhKUVVGc1F5eEZRVUYzUXl4SlFVRjRReXhEUVVGUU8wRkJRMEU3TzBGQlJrUXNUMEZCUVN4RFFVRkJMRTlCUVVFc1IwRkJRU3hOUVVGQklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeXBjYmsxSlZDQk1hV05sYm5ObFhHNWNia052Y0hseWFXZG9kQ0FvWXlrZ01qQXlNU0JGWjI5eUlFNWxjRzl0Ym5saGMyTm9hV2hjYmx4dVVHVnliV2x6YzJsdmJpQnBjeUJvWlhKbFlua2daM0poYm5SbFpDd2dabkpsWlNCdlppQmphR0Z5WjJVc0lIUnZJR0Z1ZVNCd1pYSnpiMjRnYjJKMFlXbHVhVzVuSUdFZ1kyOXdlVnh1YjJZZ2RHaHBjeUJ6YjJaMGQyRnlaU0JoYm1RZ1lYTnpiMk5wWVhSbFpDQmtiMk4xYldWdWRHRjBhVzl1SUdacGJHVnpJQ2gwYUdVZ1hDSlRiMlowZDJGeVpWd2lLU3dnZEc4Z1pHVmhiRnh1YVc0Z2RHaGxJRk52Wm5SM1lYSmxJSGRwZEdodmRYUWdjbVZ6ZEhKcFkzUnBiMjRzSUdsdVkyeDFaR2x1WnlCM2FYUm9iM1YwSUd4cGJXbDBZWFJwYjI0Z2RHaGxJSEpwWjJoMGMxeHVkRzhnZFhObExDQmpiM0I1TENCdGIyUnBabmtzSUcxbGNtZGxMQ0J3ZFdKc2FYTm9MQ0JrYVhOMGNtbGlkWFJsTENCemRXSnNhV05sYm5ObExDQmhibVF2YjNJZ2MyVnNiRnh1WTI5d2FXVnpJRzltSUhSb1pTQlRiMlowZDJGeVpTd2dZVzVrSUhSdklIQmxjbTFwZENCd1pYSnpiMjV6SUhSdklIZG9iMjBnZEdobElGTnZablIzWVhKbElHbHpYRzVtZFhKdWFYTm9aV1FnZEc4Z1pHOGdjMjhzSUhOMVltcGxZM1FnZEc4Z2RHaGxJR1p2Ykd4dmQybHVaeUJqYjI1a2FYUnBiMjV6T2x4dVhHNVVhR1VnWVdKdmRtVWdZMjl3ZVhKcFoyaDBJRzV2ZEdsalpTQmhibVFnZEdocGN5QndaWEp0YVhOemFXOXVJRzV2ZEdsalpTQnphR0ZzYkNCaVpTQnBibU5zZFdSbFpDQnBiaUJoYkd4Y2JtTnZjR2xsY3lCdmNpQnpkV0p6ZEdGdWRHbGhiQ0J3YjNKMGFXOXVjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXVYRzVjYmxSSVJTQlRUMFpVVjBGU1JTQkpVeUJRVWs5V1NVUkZSQ0JjSWtGVElFbFRYQ0lzSUZkSlZFaFBWVlFnVjBGU1VrRk9WRmtnVDBZZ1FVNVpJRXRKVGtRc0lFVllVRkpGVTFNZ1QxSmNia2xOVUV4SlJVUXNJRWxPUTB4VlJFbE9SeUJDVlZRZ1RrOVVJRXhKVFVsVVJVUWdWRThnVkVoRklGZEJVbEpCVGxSSlJWTWdUMFlnVFVWU1EwaEJUbFJCUWtsTVNWUlpMRnh1UmtsVVRrVlRVeUJHVDFJZ1FTQlFRVkpVU1VOVlRFRlNJRkJWVWxCUFUwVWdRVTVFSUU1UFRrbE9SbEpKVGtkRlRVVk9WQzRnU1U0Z1RrOGdSVlpGVGxRZ1UwaEJURXdnVkVoRlhHNUJWVlJJVDFKVElFOVNJRU5QVUZsU1NVZElWQ0JJVDB4RVJWSlRJRUpGSUV4SlFVSk1SU0JHVDFJZ1FVNVpJRU5NUVVsTkxDQkVRVTFCUjBWVElFOVNJRTlVU0VWU1hHNU1TVUZDU1V4SlZGa3NJRmRJUlZSSVJWSWdTVTRnUVU0Z1FVTlVTVTlPSUU5R0lFTlBUbFJTUVVOVUxDQlVUMUpVSUU5U0lFOVVTRVZTVjBsVFJTd2dRVkpKVTBsT1J5QkdVazlOTEZ4dVQxVlVJRTlHSUU5U0lFbE9JRU5QVGs1RlExUkpUMDRnVjBsVVNDQlVTRVVnVTA5R1ZGZEJVa1VnVDFJZ1ZFaEZJRlZUUlNCUFVpQlBWRWhGVWlCRVJVRk1TVTVIVXlCSlRpQlVTRVZjYmxOUFJsUlhRVkpGTGx4dUtpOWNibHh1YVcxd2IzSjBJRVJsYzNSeWIzbGhZbXhsSUdaeWIyMGdKeTR2UkdWemRISnZlV0ZpYkdVbk8xeHVYRzVqYkdGemN5QktVVVYyWlc1MFFYUjBZV05vYldWdWRDQnBiWEJzWlcxbGJuUnpJRVJsYzNSeWIzbGhZbXhsSUh0Y2JseDBZMjl1YzNSeWRXTjBiM0lvY0hKcGRtRjBaU0JsYkRvZ1NsRjFaWEo1UEdGdWVUNHNJSEJ5YVhaaGRHVWdaWFpsYm5Sek9pQnpkSEpwYm1jc0lIQnlhWFpoZEdVZ1lYSm5NVG9nWVc1NUxDQndjbWwyWVhSbElHRnlaekkvT2lCaGJua3BJSHRjYmx4MFhIUmxiQzV2YmlobGRtVnVkSE1zSUdGeVp6RXNJR0Z5WnpJcE8xeHVYSFI5WEc1Y2JseDBaR1Z6ZEhKdmVTZ3BJSHRjYmx4MFhIUjBhR2x6TG1Wc0xtOW1aaWgwYUdsekxtVjJaVzUwY3l3Z2RHaHBjeTVoY21jeExDQjBhR2x6TG1GeVp6SXBPMXh1WEhSOVhHNTlYRzVjYmk4cUtseHVJQ29nUVhSMFlXTm9aWE1nYUdGdVpHeGxjaUIwYnlCaGJpQmxkbVZ1ZEM0Z2FsZHBaR2RsZENCbGVIUmxibk5wYjI0Z1ptOXlJR3BSZFdWeWVTQmNJbTl1WENJZ2JXVjBhRzlrSUhKbGRIVnlibWx1WnlCMGFHVWdaR1Z6ZEhKdmVXRmliR1VnWlhabGJuUWdZWFIwWVdOb2JXVnVkQzVjYmlBcVhHNGdLaUJBY0dGeVlXMGdaV3dnUkU5TklHVnNaVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdaWFpsYm5SeklFOXVaU0J2Y2lCdGIzSmxJSE53WVdObExYTmxjR0Z5WVhSbFpDQmxkbVZ1ZENCMGVYQmxjeUJoYm1RZ2IzQjBhVzl1WVd3Z2JtRnRaWE53WVdObGN5d2djM1ZqYUNCaGN5QmNJbU5zYVdOclhDSWdiM0lnWENKclpYbGtiM2R1TG0xNVVHeDFaMmx1WENJdVhHNGdLaUJBY0dGeVlXMGdhR0Z1Wkd4bGNpQkJJR1oxYm1OMGFXOXVJSFJ2SUdWNFpXTjFkR1VnZDJobGJpQjBhR1VnWlhabGJuUWdhWE1nZEhKcFoyZGxjbVZrTGlCVWFHVWdkbUZzZFdVZ1lHWmhiSE5sWUNCcGN5QmhiSE52SUdGc2JHOTNaV1FnWVhNZ1lTQnphRzl5ZEdoaGJtUWdabTl5SUdFZ1puVnVZM1JwYjI0Z2RHaGhkQ0J6YVcxd2JIa2daRzlsY3lCZ2NtVjBkWEp1SUdaaGJITmxZQzVjYmlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z2JHbHpkR1Z1S0dWc09pQktVWFZsY25rOFlXNTVQaXdnWlhabGJuUnpPaUJ6ZEhKcGJtY3NJR2hoYm1Sc1pYSTZJQ2hsZG1WdWRFOWlhbVZqZERvZ1NsRjFaWEo1TGtWMlpXNTBLU0E5UGlCaGJua3BPaUJFWlhOMGNtOTVZV0pzWlR0Y2JseHVMeW9xWEc0Z0tpQkFjR0Z5WVcwZ1pXd2dSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ1pYWmxiblJ6SUU5dVpTQnZjaUJ0YjNKbElITndZV05sTFhObGNHRnlZWFJsWkNCbGRtVnVkQ0IwZVhCbGN5QmhibVFnYjNCMGFXOXVZV3dnYm1GdFpYTndZV05sY3l3Z2MzVmphQ0JoY3lCY0ltTnNhV05yWENJZ2IzSWdYQ0pyWlhsa2IzZHVMbTE1VUd4MVoybHVYQ0l1WEc0Z0tpQkFjR0Z5WVcwZ2MyVnNaV04wYjNJZ1FTQnpaV3hsWTNSdmNpQnpkSEpwYm1jZ2RHOGdabWxzZEdWeUlIUm9aU0JrWlhOalpXNWtZVzUwY3lCdlppQjBhR1VnYzJWc1pXTjBaV1FnWld4bGJXVnVkSE1nZEdoaGRDQjBjbWxuWjJWeUlIUm9aU0JsZG1WdWRDNGdTV1lnZEdobElITmxiR1ZqZEc5eUlHbHpJRzUxYkd3Z2IzSWdiMjFwZEhSbFpDd2dkR2hsSUdWMlpXNTBJR2x6SUdGc2QyRjVjeUIwY21sbloyVnlaV1FnZDJobGJpQnBkQ0J5WldGamFHVnpJSFJvWlNCelpXeGxZM1JsWkNCbGJHVnRaVzUwTGx4dUlDb2dRSEJoY21GdElHaGhibVJzWlhJZ1FTQm1kVzVqZEdsdmJpQjBieUJsZUdWamRYUmxJSGRvWlc0Z2RHaGxJR1YyWlc1MElHbHpJSFJ5YVdkblpYSmxaQzRnVkdobElIWmhiSFZsSUdCbVlXeHpaV0FnYVhNZ1lXeHpieUJoYkd4dmQyVmtJR0Z6SUdFZ2MyaHZjblJvWVc1a0lHWnZjaUJoSUdaMWJtTjBhVzl1SUhSb1lYUWdjMmx0Y0d4NUlHUnZaWE1nWUhKbGRIVnliaUJtWVd4elpXQXVYRzRnS2k5Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdaMWJtTjBhVzl1SUd4cGMzUmxiaWhsYkRvZ1NsRjFaWEo1UEdGdWVUNHNJR1YyWlc1MGN6b2djM1J5YVc1bkxDQnpaV3hsWTNSdmNqb2djM1J5YVc1bkxDQm9ZVzVrYkdWeU9pQW9aWFpsYm5SUFltcGxZM1E2SUVwUmRXVnllUzVGZG1WdWRDa2dQVDRnWVc1NUtUb2dSR1Z6ZEhKdmVXRmliR1U3WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUJzYVhOMFpXNG9aV3c2SUVwUmRXVnllVHhoYm5rK0xDQmxkbVZ1ZEhNNklITjBjbWx1Wnl3Z1lYSm5NVG9nWVc1NUxDQmhjbWN5UHpvZ1lXNTVLVG9nUkdWemRISnZlV0ZpYkdVZ2UxeHVYSFJ5WlhSMWNtNGdibVYzSUVwUlJYWmxiblJCZEhSaFkyaHRaVzUwS0dWc0xDQmxkbVZ1ZEhNc0lHRnlaekVzSUdGeVp6SXBPMXh1ZlZ4dUlsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT0iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRFeGFtcGxlKG5hbWU6IHN0cmluZywgbGlua3M6IHN0cmluZ1tdKSB7XG5cdGNvbnN0IGVsID0gJCgnPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDsgd2lkdGg6IDYwMHB4XCI+PGI+U291cmNlOjwvYj4gPC9kaXY+Jyk7XG5cdGxldCBmaXJzdCA9IHRydWU7XG5cdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcblx0XHRpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmFwcGVuZCgnLCAnKTtcblx0XHR9XG5cdFx0ZWwuYXBwZW5kKCQoJzxhIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nKS50ZXh0KGxpbmspLmF0dHIoXCJocmVmXCIsIGBzcmMvJHtuYW1lfS8ke2xpbmt9LnR4dGApKTtcblx0fSk7XG5cdCQoXCJib2R5XCIpLnByZXBlbmQoJzxkaXY+PGI+RXhhbXBsZTwvYj48L2Rpdj48ZGl2PjxhIGhyZWY9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpXCI+UmVmcmVzaDwvYT48L2Rpdj48aHIgc3R5bGU9XCJjbGVhcjogYm90aFwiPicpLnByZXBlbmQoZWwpO1xufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBsaXN0ZW4gZnJvbSBcImp3aWRnZXQvbGlzdGVuXCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmUoXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIGJlZm9yZVJlbmRlcigpIHtcblx0XHRzdXBlci5iZWZvcmVSZW5kZXIoKTtcblxuXHRcdCQoXCJib2R5XCIpLnZhbCgpO1xuXHRcdC8vIEJpbmQgYSBoYW5kbGVyIHRvIFwibW91c2Vtb3ZlXCIgZXZlbnQgYW5kIGFnZ3JlZ2F0ZSB0aGUgYXR0YWNobWVudFxuXHRcdHRoaXMub3duKGxpc3RlbigkKHdpbmRvdyksIFwibW91c2Vtb3ZlXCIsIGV2ZW50ID0+IHtcblx0XHRcdCQoXCIub3V0cHV0XCIpLnRleHQoZXZlbnQucGFnZVggKyBcIjpcIiArIGV2ZW50LnBhZ2VZKTtcblx0XHR9KSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyRGVzdHJveUJ1dHRvbihlbDogSlF1ZXJ5KSB7XG5cdFx0Ly8gT24gYnV0dG9uIGNsaWNrLCBkZXN0cm95IHRoaXMgY29tcG9uZW50XG5cdFx0ZWwub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLmRlc3Ryb3koKSk7XG5cdH1cbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBpbml0RXhhbXBsZSBmcm9tIFwiLi4vY29tbW9uL2luaXRFeGFtcGxlXCI7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4vQXBwbGljYXRpb25cIjtcbmltcG9ydCBcIi4vQXBwbGljYXRpb24uc3R5bFwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJsaXN0ZW5cIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiQXBwbGljYXRpb24uc3R5bFwiLCBcImluZGV4LnRzXCJdKTtcblxuXHQvLyBLZWVwIG91dHB1dCBvdXRzaWRlIG9mIGFwcGxpY2F0aW9uLCB0byBkZW1vbnN0YXRlIHRoYXRcblx0Ly8gZXZlbnQgaGFuZGxlciBpcyB1bmJvdW5kIG9uIGFwcGxpY2F0aW9uIGRlc3RydWN0aW9uLlxuXHQkKFwiYm9keVwiKS5hcHBlbmQoXG5cdFx0JzxkaXYgY2xhc3M9XCJvdXRwdXQtYm94XCI+JyArXG5cdFx0J01vdXNlIGNvb3JkaW5hdGVzOiA8c3BhbiBjbGFzcz1cIm91dHB1dFwiPjwvc3Bhbj4nICtcblx0XHQnPGRpdj4nXG5cdCk7XG5cblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9