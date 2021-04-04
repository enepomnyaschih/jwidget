(self["webpackChunk"] = self["webpackChunk"] || []).push([["component"],{

/***/ "./component/MyComponent.jw.html":
/*!***************************************!*\
  !*** ./component/MyComponent.jw.html ***!
  \***************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"my-component\"><div jwid=\"hello-message\"></div><a href=\"#\" jwid=\"link\">Click me!</a></div>\n";

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

/***/ "./component/MyComponent.ts":
/*!**********************************!*\
  !*** ./component/MyComponent.ts ***!
  \**********************************/
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

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var MyComponent = /*#__PURE__*/function (_Component_1$default) {
  _inherits(MyComponent, _Component_1$default);

  var _super = _createSuper(MyComponent);

  function MyComponent(message, link) {
    var _this;

    _classCallCheck(this, MyComponent);

    _this = _super.call(this);
    _this.message = message;
    _this.link = link;
    return _this;
  }

  _createClass(MyComponent, [{
    key: "afterRender",
    value: function afterRender() {
      _get(_getPrototypeOf(MyComponent.prototype), "afterRender", this).call(this);

      this.getElement("hello-message").text(this.message);
      this.getElement("link").attr("href", this.link);
    }
  }]);

  return MyComponent;
}(Component_1.default);

MyComponent = __decorate([template_1.default(__webpack_require__(/*! ./MyComponent.jw.html */ "./component/MyComponent.jw.html"))], MyComponent);
exports.default = MyComponent;

/***/ }),

/***/ "./component/index.ts":
/*!****************************!*\
  !*** ./component/index.ts ***!
  \****************************/
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

var MyComponent_1 = __importDefault(__webpack_require__(/*! ./MyComponent */ "./component/MyComponent.ts"));

jquery_1.default(function () {
  initExample_1.default("component", ["MyComponent.ts", "MyComponent.jw.html", "index.ts"]);
  new MyComponent_1.default("Hello, World!", "javascript:alert('Hello!')").renderTo("body");
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js"], function() { return __webpack_exec__("./component/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnQvTXlDb21wb25lbnQuancuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21tb24vaW5pdEV4YW1wbGUudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50L015Q29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUVBLFNBQXdCLFdBQXhCLENBQW9DLElBQXBDLEVBQWtELEtBQWxELEVBQWlFO0FBQ2hFLE1BQU0sRUFBRSxHQUFHLGlCQUFFLCtEQUFGLENBQVg7QUFDQSxNQUFJLEtBQUssR0FBRyxJQUFaO0FBQ0EsT0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBUztBQUN0QixRQUFJLEtBQUosRUFBVztBQUNWLFdBQUssR0FBRyxLQUFSO0FBQ0EsS0FGRCxNQUVPO0FBQ04sUUFBRSxDQUFDLE1BQUgsQ0FBVSxJQUFWO0FBQ0E7O0FBQ0QsTUFBRSxDQUFDLE1BQUgsQ0FBVSxpQkFBRSx5QkFBRixFQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxDQUE2QyxNQUE3QyxnQkFBNEQsSUFBNUQsY0FBb0UsSUFBcEUsVUFBVjtBQUNBLEdBUEQ7QUFRQSxtQkFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixnSEFBbEIsRUFBb0ksT0FBcEksQ0FBNEksRUFBNUk7QUFDQTs7QUFaRCw4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7QUFDQTs7QUFHQSxJQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUVDLHVCQUFvQixPQUFwQixFQUE2QyxJQUE3QyxFQUF5RDtBQUFBOztBQUFBOztBQUN4RDtBQURtQjtBQUF5QjtBQUFZO0FBRXhEOztBQUpGO0FBQUE7QUFBQSxXQU1XLHVCQUFXO0FBQ3BCOztBQUNBLFdBQUssVUFBTCxDQUFnQixlQUFoQixFQUFpQyxJQUFqQyxDQUFzQyxLQUFLLE9BQTNDO0FBQ0EsV0FBSyxVQUFMLENBQWdCLE1BQWhCLEVBQXdCLElBQXhCLENBQTZCLE1BQTdCLEVBQXFDLEtBQUssSUFBMUM7QUFDQTtBQVZGOztBQUFBO0FBQUEsRUFBeUMsbUJBQXpDOztBQUFxQixXQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQUMsOERBQUQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7a0JBQUEsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKckI7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFdBQVosRUFBeUIsQ0FBQyxnQkFBRCxFQUFtQixxQkFBbkIsRUFBMEMsVUFBMUMsQ0FBekI7QUFDQSxNQUFJLHFCQUFKLENBQWdCLGVBQWhCLEVBQWlDLDRCQUFqQyxFQUErRCxRQUEvRCxDQUF3RSxNQUF4RTtBQUNBLENBSEQsRSIsImZpbGUiOiJidW5kbGUtY29tcG9uZW50LTUyNGFjZGNkMjMxMTczYjdkOGEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwibXktY29tcG9uZW50XFxcIj48ZGl2IGp3aWQ9XFxcImhlbGxvLW1lc3NhZ2VcXFwiPjwvZGl2PjxhIGhyZWY9XFxcIiNcXFwiIGp3aWQ9XFxcImxpbmtcXFwiPkNsaWNrIG1lITwvYT48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRFeGFtcGxlKG5hbWU6IHN0cmluZywgbGlua3M6IHN0cmluZ1tdKSB7XG5cdGNvbnN0IGVsID0gJCgnPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDsgd2lkdGg6IDYwMHB4XCI+PGI+U291cmNlOjwvYj4gPC9kaXY+Jyk7XG5cdGxldCBmaXJzdCA9IHRydWU7XG5cdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcblx0XHRpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmFwcGVuZCgnLCAnKTtcblx0XHR9XG5cdFx0ZWwuYXBwZW5kKCQoJzxhIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nKS50ZXh0KGxpbmspLmF0dHIoXCJocmVmXCIsIGBzcmMvJHtuYW1lfS8ke2xpbmt9LnR4dGApKTtcblx0fSk7XG5cdCQoXCJib2R5XCIpLnByZXBlbmQoJzxkaXY+PGI+RXhhbXBsZTwvYj48L2Rpdj48ZGl2PjxhIGhyZWY9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpXCI+UmVmcmVzaDwvYT48L2Rpdj48aHIgc3R5bGU9XCJjbGVhcjogYm90aFwiPicpLnByZXBlbmQoZWwpO1xufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZShcIi4vTXlDb21wb25lbnQuancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG1lc3NhZ2U6IHN0cmluZywgcHJpdmF0ZSBsaW5rOiBzdHJpbmcpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGFmdGVyUmVuZGVyKCkge1xuXHRcdHN1cGVyLmFmdGVyUmVuZGVyKCk7XG5cdFx0dGhpcy5nZXRFbGVtZW50KFwiaGVsbG8tbWVzc2FnZVwiKS50ZXh0KHRoaXMubWVzc2FnZSk7XG5cdFx0dGhpcy5nZXRFbGVtZW50KFwibGlua1wiKS5hdHRyKFwiaHJlZlwiLCB0aGlzLmxpbmspO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IE15Q29tcG9uZW50IGZyb20gXCIuL015Q29tcG9uZW50XCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcImNvbXBvbmVudFwiLCBbXCJNeUNvbXBvbmVudC50c1wiLCBcIk15Q29tcG9uZW50Lmp3Lmh0bWxcIiwgXCJpbmRleC50c1wiXSk7XG5cdG5ldyBNeUNvbXBvbmVudChcIkhlbGxvLCBXb3JsZCFcIiwgXCJqYXZhc2NyaXB0OmFsZXJ0KCdIZWxsbyEnKVwiKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=