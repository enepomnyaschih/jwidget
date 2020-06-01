(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["component"],{

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

/***/ "./component/MyComponent.jw.html":
/*!***************************************!*\
  !*** ./component/MyComponent.jw.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"my-component\"><div jwid=\"hello-message\"></div><a href=\"#\" jwid=\"link\">Click me!</a></div>\n";

/***/ }),

/***/ "./component/MyComponent.ts":
/*!**********************************!*\
  !*** ./component/MyComponent.ts ***!
  \**********************************/
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

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var MyComponent =
/** @class */
function () {
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
  return MyComponent;
}();

exports.default = MyComponent;

/***/ }),

/***/ "./component/index.ts":
/*!****************************!*\
  !*** ./component/index.ts ***!
  \****************************/
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

var MyComponent_1 = __importDefault(__webpack_require__(/*! ./MyComponent */ "./component/MyComponent.ts"));

jquery_1.default(function () {
  initExample_1.default("component", ["MyComponent.ts", "MyComponent.jw.html", "index.ts"]);
  new MyComponent_1.default("Hello, World!", "javascript:alert('Hello!')").renderTo("body");
});

/***/ })

},[["./component/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2NvbW1vbi9pbml0RXhhbXBsZS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnQvTXlDb21wb25lbnQuancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2NvbXBvbmVudC9NeUNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2NvbXBvbmVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsU0FBd0IsV0FBeEIsQ0FBb0MsSUFBcEMsRUFBa0QsS0FBbEQsRUFBaUU7QUFDaEUsTUFBTSxFQUFFLEdBQUcsaUJBQUUsK0RBQUYsQ0FBWDtBQUNBLE1BQUksS0FBSyxHQUFHLElBQVo7QUFDQSxPQUFLLENBQUMsT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFTO0FBQ3RCLFFBQUksS0FBSixFQUFXO0FBQ1YsV0FBSyxHQUFHLEtBQVI7QUFDQSxLQUZELE1BRU87QUFDTixRQUFFLENBQUMsTUFBSCxDQUFVLElBQVY7QUFDQTs7QUFDRCxNQUFFLENBQUMsTUFBSCxDQUFVLGlCQUFFLHlCQUFGLEVBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQTZDLE1BQTdDLGdCQUE0RCxJQUE1RCxjQUFvRSxJQUFwRSxVQUFWO0FBQ0EsR0FQRDtBQVFBLG1CQUFFLE1BQUYsRUFBVSxPQUFWLENBQWtCLGdIQUFsQixFQUFvSSxPQUFwSSxDQUE0SSxFQUE1STtBQUNBOztBQVpELDhCOzs7Ozs7Ozs7OztBQ0pBLHFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQSxNQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUVDLHlCQUFvQixPQUFwQixFQUE2QyxJQUE3QyxFQUF5RDtBQUFBOztBQUFBOztBQUN4RDtBQURtQjtBQUF5QjtBQUFZO0FBRXhEOztBQUpGO0FBQUE7QUFBQSxvQ0FNc0I7QUFDcEI7O0FBQ0EsYUFBSyxVQUFMLENBQWdCLGVBQWhCLEVBQWlDLElBQWpDLENBQXNDLEtBQUssT0FBM0M7QUFDQSxhQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0IsSUFBeEIsQ0FBNkIsTUFBN0IsRUFBcUMsS0FBSyxJQUExQztBQUNBO0FBVkY7O0FBQUE7QUFBQSxJQUF5QyxtQkFBekM7O0FBQXFCLGFBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBUyw4REFBVCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtBQVdyQjtBQUFDLENBWEQ7O2tCQUFxQixXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKckI7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFdBQVosRUFBeUIsQ0FBQyxnQkFBRCxFQUFtQixxQkFBbkIsRUFBMEMsVUFBMUMsQ0FBekI7QUFDQSxNQUFJLHFCQUFKLENBQWdCLGVBQWhCLEVBQWlDLDRCQUFqQyxFQUErRCxRQUEvRCxDQUF3RSxNQUF4RTtBQUNBLENBSEQsRSIsImZpbGUiOiJidW5kbGUtY29tcG9uZW50LTc5MGQyMTkyZDhkYmU5NzBhOWM0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIjtcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0RXhhbXBsZShuYW1lOiBzdHJpbmcsIGxpbmtzOiBzdHJpbmdbXSkge1xuXHRjb25zdCBlbCA9ICQoJzxkaXYgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IHdpZHRoOiA2MDBweFwiPjxiPlNvdXJjZTo8L2I+IDwvZGl2PicpO1xuXHRsZXQgZmlyc3QgPSB0cnVlO1xuXHRsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG5cdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5hcHBlbmQoJywgJyk7XG5cdFx0fVxuXHRcdGVsLmFwcGVuZCgkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+JykudGV4dChsaW5rKS5hdHRyKFwiaHJlZlwiLCBgc3JjLyR7bmFtZX0vJHtsaW5rfS50eHRgKSk7XG5cdH0pO1xuXHQkKFwiYm9keVwiKS5wcmVwZW5kKCc8ZGl2PjxiPkV4YW1wbGU8L2I+PC9kaXY+PGRpdj48YSBocmVmPVwiamF2YXNjcmlwdDpsb2NhdGlvbi5yZWxvYWQoKVwiPlJlZnJlc2g8L2E+PC9kaXY+PGhyIHN0eWxlPVwiY2xlYXI6IGJvdGhcIj4nKS5wcmVwZW5kKGVsKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcIm15LWNvbXBvbmVudFxcXCI+PGRpdiBqd2lkPVxcXCJoZWxsby1tZXNzYWdlXFxcIj48L2Rpdj48YSBocmVmPVxcXCIjXFxcIiBqd2lkPVxcXCJsaW5rXFxcIj5DbGljayBtZSE8L2E+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9NeUNvbXBvbmVudC5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbWVzc2FnZTogc3RyaW5nLCBwcml2YXRlIGxpbms6IHN0cmluZykge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgYWZ0ZXJSZW5kZXIoKSB7XG5cdFx0c3VwZXIuYWZ0ZXJSZW5kZXIoKTtcblx0XHR0aGlzLmdldEVsZW1lbnQoXCJoZWxsby1tZXNzYWdlXCIpLnRleHQodGhpcy5tZXNzYWdlKTtcblx0XHR0aGlzLmdldEVsZW1lbnQoXCJsaW5rXCIpLmF0dHIoXCJocmVmXCIsIHRoaXMubGluayk7XG5cdH1cbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBpbml0RXhhbXBsZSBmcm9tIFwiLi4vY29tbW9uL2luaXRFeGFtcGxlXCI7XG5pbXBvcnQgTXlDb21wb25lbnQgZnJvbSBcIi4vTXlDb21wb25lbnRcIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiY29tcG9uZW50XCIsIFtcIk15Q29tcG9uZW50LnRzXCIsIFwiTXlDb21wb25lbnQuancuaHRtbFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IE15Q29tcG9uZW50KFwiSGVsbG8sIFdvcmxkIVwiLCBcImphdmFzY3JpcHQ6YWxlcnQoJ0hlbGxvIScpXCIpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==