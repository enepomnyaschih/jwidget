(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindClass1"],{

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

},[["./bindClass1/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindClass1~bindDisplay~bindProp1~bindProp2","bindClass1~bindClass2"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kQ2xhc3MxL0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYmluZENsYXNzMS9BcHBsaWNhdGlvbi5zdHlsP2VhNmUiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kQ2xhc3MxL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvYmluZENsYXNzMS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtSzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQSxNQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsaUNBRXNCLEVBRnRCLEVBRWdDO0FBQzlCO0FBQ0EsWUFBTSxPQUFPLEdBQUcsbUJBQVMsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVQsRUFBc0MsU0FBdEMsQ0FBaEIsQ0FGOEIsQ0FJOUI7O0FBQ0EsNEJBQVUsRUFBVixFQUFjLFNBQWQsRUFBeUIsT0FBekI7QUFDQTtBQVJGOztBQUFBO0FBQUEsSUFBeUMsbUJBQXpDOztBQUFxQixhQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQVMsK0RBQVQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7QUFTckI7QUFBQyxDQVREOztrQkFBcUIsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOztBQUNBOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxZQUFaLEVBQTBCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLGtCQUExQyxFQUE4RCxVQUE5RCxDQUExQjtBQUNBLE1BQUkscUJBQUosR0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQSxDQUhELEUiLCJmaWxlIjoiYnVuZGxlLWJpbmRDbGFzczEtODhkOTZiNGY2NTM1MGU0MTRlMDYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBqd2NsYXNzPVxcXCJhcHBsaWNhdGlvblxcXCI+PGRpdj48bGFiZWw+PGlucHV0IGp3aWQ9XFxcImNoZWNrYm94XFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCI+RW5hYmxlIGNsYXNzPC9sYWJlbD48L2Rpdj48ZGl2IGp3aWQ9XFxcInJlY3RcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBiaW5kQ2xhc3MgZnJvbSBcImp3aWRnZXQvYmluZENsYXNzXCI7XG5pbXBvcnQgYmluZFByb3AgZnJvbSBcImp3aWRnZXQvYmluZFByb3BcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmU8c3RyaW5nPihcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyUmVjdChlbDogSlF1ZXJ5KSB7XG5cdFx0Ly8gV2F0Y2ggY2hlY2tib3ggc3RhdGVcblx0XHRjb25zdCBjaGVja2VkID0gYmluZFByb3AodGhpcy5nZXRFbGVtZW50KFwiY2hlY2tib3hcIiksIFwiY2hlY2tlZFwiKTtcblxuXHRcdC8vIEJpbmQgXCJjaGVja2VkXCIgQ1NTIGNsYXNzIHRvIGNoZWNrZWQgcHJvcGVydHkgdmFsdWVcblx0XHRiaW5kQ2xhc3MoZWwsIFwiY2hlY2tlZFwiLCBjaGVja2VkKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuaW1wb3J0IFwiLi9BcHBsaWNhdGlvbi5zdHlsXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcImJpbmRDbGFzczFcIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiQXBwbGljYXRpb24uc3R5bFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9