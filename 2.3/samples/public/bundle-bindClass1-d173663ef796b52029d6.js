(self["webpackChunk"] = self["webpackChunk"] || []).push([["bindClass1"],{

/***/ "./bindClass1/Application.jw.html":
/*!****************************************!*\
  !*** ./bindClass1/Application.jw.html ***!
  \****************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"application\"><div><label><input jwid=\"checkbox\" type=\"checkbox\">Enable class</label></div><div jwid=\"rect\"></div></div>\n";

/***/ }),

/***/ "./bindClass1/Application.ts":
/*!***********************************!*\
  !*** ./bindClass1/Application.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var bindClass_1 = __importDefault(__webpack_require__(/*! jwidget/bindClass */ "../../main/dist/bindClass.js"));

var bindProp_1 = __importDefault(__webpack_require__(/*! jwidget/bindProp */ "../../main/dist/bindProp.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

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
exports.default = Application;

/***/ }),

/***/ "./bindClass1/index.ts":
/*!*****************************!*\
  !*** ./bindClass1/index.ts ***!
  \*****************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindClass1/Application.ts"));

__webpack_require__(/*! ./Application.styl */ "./bindClass1/Application.styl");

jquery_1.default(function () {
  initExample_1.default("bindClass1", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ }),

/***/ "./bindClass1/Application.styl":
/*!*************************************!*\
  !*** ./bindClass1/Application.styl ***!
  \*************************************/
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_bindProp_js-common_initExample_ts","main_dist_bindClass_js"], function() { return __webpack_exec__("./bindClass1/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kQ2xhc3MxL0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYmluZENsYXNzMS9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9iaW5kQ2xhc3MxL2luZGV4LnRzIiwid2VicGFjazovLy8uL2JpbmRDbGFzczEvQXBwbGljYXRpb24uc3R5bD82NjViIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsbUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQSxJQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsV0FFVyxvQkFBVyxFQUFYLEVBQXFCO0FBQzlCO0FBQ0EsVUFBTSxPQUFPLEdBQUcsbUJBQVMsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVQsRUFBc0MsU0FBdEMsQ0FBaEIsQ0FGOEIsQ0FJOUI7O0FBQ0EsMEJBQVUsRUFBVixFQUFjLFNBQWQsRUFBeUIsT0FBekI7QUFDQTtBQVJGOztBQUFBO0FBQUEsRUFBeUMsbUJBQXpDOztBQUFxQixXQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQUMsK0RBQUQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7a0JBQUEsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOckI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFlBQVosRUFBMEIsQ0FBQyxnQkFBRCxFQUFtQixxQkFBbkIsRUFBMEMsa0JBQTFDLEVBQThELFVBQTlELENBQTFCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRTs7Ozs7Ozs7Ozs7O0FDTEEiLCJmaWxlIjoiYnVuZGxlLWJpbmRDbGFzczEtZDE3MzY2M2VmNzk2YjUyMDI5ZDYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJhcHBsaWNhdGlvblxcXCI+PGRpdj48bGFiZWw+PGlucHV0IGp3aWQ9XFxcImNoZWNrYm94XFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCI+RW5hYmxlIGNsYXNzPC9sYWJlbD48L2Rpdj48ZGl2IGp3aWQ9XFxcInJlY3RcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsImltcG9ydCBiaW5kQ2xhc3MgZnJvbSBcImp3aWRnZXQvYmluZENsYXNzXCI7XG5pbXBvcnQgYmluZFByb3AgZnJvbSBcImp3aWRnZXQvYmluZFByb3BcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmUoXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIHJlbmRlclJlY3QoZWw6IEpRdWVyeSkge1xuXHRcdC8vIFdhdGNoIGNoZWNrYm94IHN0YXRlXG5cdFx0Y29uc3QgY2hlY2tlZCA9IGJpbmRQcm9wKHRoaXMuZ2V0RWxlbWVudChcImNoZWNrYm94XCIpLCBcImNoZWNrZWRcIik7XG5cblx0XHQvLyBCaW5kIFwiY2hlY2tlZFwiIENTUyBjbGFzcyB0byBjaGVja2VkIHByb3BlcnR5IHZhbHVlXG5cdFx0YmluZENsYXNzKGVsLCBcImNoZWNrZWRcIiwgY2hlY2tlZCk7XG5cdH1cbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBpbml0RXhhbXBsZSBmcm9tIFwiLi4vY29tbW9uL2luaXRFeGFtcGxlXCI7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4vQXBwbGljYXRpb25cIjtcbmltcG9ydCBcIi4vQXBwbGljYXRpb24uc3R5bFwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJiaW5kQ2xhc3MxXCIsIFtcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcIkFwcGxpY2F0aW9uLnN0eWxcIiwgXCJpbmRleC50c1wiXSk7XG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sInNvdXJjZVJvb3QiOiIifQ==