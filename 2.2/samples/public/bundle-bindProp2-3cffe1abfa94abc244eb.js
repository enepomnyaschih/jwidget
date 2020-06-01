(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindProp2"],{

/***/ "./bindProp2/Application.jw.html":
/*!***************************************!*\
  !*** ./bindProp2/Application.jw.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div>This sample demonstrates how to bind two checkboxes to a single boolean property.</div><div><label><input jwid=\"first\" type=\"checkbox\">First checkbox</label></div><div><label><input jwid=\"second\" type=\"checkbox\">Second checkbox</label></div></div>\n";

/***/ }),

/***/ "./bindProp2/Application.ts":
/*!**********************************!*\
  !*** ./bindProp2/Application.ts ***!
  \**********************************/
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

var jwidget_1 = __webpack_require__(/*! jwidget */ "../../main/dist/index.js");

var bindProp_1 = __importDefault(__webpack_require__(/*! jwidget/bindProp */ "../../main/dist/bindProp.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var Property_1 = __importDefault(__webpack_require__(/*! jwidget/Property */ "../../main/dist/Property.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var Application =
/** @class */
function () {
  var Application = /*#__PURE__*/function (_Component_1$default) {
    _inherits(Application, _Component_1$default);

    var _super = _createSuper(Application);

    function Application() {
      var _this;

      _classCallCheck(this, Application);

      _this = _super.apply(this, arguments);
      _this.value = new Property_1.default(false);
      return _this;
    }

    _createClass(Application, [{
      key: "renderFirst",
      value: function renderFirst(el) {
        bindProp_1.default(el, "checked", this.value, jwidget_1.TWOWAY);
      }
    }, {
      key: "renderSecond",
      value: function renderSecond(el) {
        bindProp_1.default(el, "checked", this.value, jwidget_1.TWOWAY);
      }
    }]);

    return Application;
  }(Component_1.default);

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindProp2/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindProp2/index.ts":
/*!****************************!*\
  !*** ./bindProp2/index.ts ***!
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindProp2/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("bindProp2", ["Application.ts", "Application.jw.html", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},[["./bindProp2/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindClass1~bindDisplay~bindProp1~bindProp2"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kUHJvcDIvQXBwbGljYXRpb24uancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2JpbmRQcm9wMi9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2JpbmRQcm9wMi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1VDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQSxNQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7OztBQUVTLG9CQUFRLElBQUksa0JBQUosQ0FBYSxLQUFiLENBQVI7QUFGVDtBQVdDOztBQVhEO0FBQUE7QUFBQSxrQ0FJdUIsRUFKdkIsRUFJaUM7QUFDL0IsMkJBQVMsRUFBVCxFQUFhLFNBQWIsRUFBd0IsS0FBSyxLQUE3QixFQUFvQyxnQkFBcEM7QUFDQTtBQU5GO0FBQUE7QUFBQSxtQ0FRd0IsRUFSeEIsRUFRa0M7QUFDaEMsMkJBQVMsRUFBVCxFQUFhLFNBQWIsRUFBd0IsS0FBSyxLQUE3QixFQUFvQyxnQkFBcEM7QUFDQTtBQVZGOztBQUFBO0FBQUEsSUFBeUMsbUJBQXpDOztBQUFxQixhQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQVMsOERBQVQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7QUFXckI7QUFBQyxDQVhEOztrQkFBcUIsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHJCOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxXQUFaLEVBQXlCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLFVBQTFDLENBQXpCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRSIsImZpbGUiOiJidW5kbGUtYmluZFByb3AyLTNjZmZlMWFiZmE5NGFiYzI0NGViLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiYXBwbGljYXRpb25cXFwiPjxkaXY+VGhpcyBzYW1wbGUgZGVtb25zdHJhdGVzIGhvdyB0byBiaW5kIHR3byBjaGVja2JveGVzIHRvIGEgc2luZ2xlIGJvb2xlYW4gcHJvcGVydHkuPC9kaXY+PGRpdj48bGFiZWw+PGlucHV0IGp3aWQ9XFxcImZpcnN0XFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCI+Rmlyc3QgY2hlY2tib3g8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPjxpbnB1dCBqd2lkPVxcXCJzZWNvbmRcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIj5TZWNvbmQgY2hlY2tib3g8L2xhYmVsPjwvZGl2PjwvZGl2PlxcblwiOyIsImltcG9ydCB7VFdPV0FZfSBmcm9tIFwiandpZGdldFwiO1xuaW1wb3J0IGJpbmRQcm9wIGZyb20gXCJqd2lkZ2V0L2JpbmRQcm9wXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IFByb3BlcnR5IGZyb20gXCJqd2lkZ2V0L1Byb3BlcnR5XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmU8c3RyaW5nPihcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHZhbHVlID0gbmV3IFByb3BlcnR5KGZhbHNlKTtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyRmlyc3QoZWw6IEpRdWVyeSkge1xuXHRcdGJpbmRQcm9wKGVsLCBcImNoZWNrZWRcIiwgdGhpcy52YWx1ZSwgVFdPV0FZKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJTZWNvbmQoZWw6IEpRdWVyeSkge1xuXHRcdGJpbmRQcm9wKGVsLCBcImNoZWNrZWRcIiwgdGhpcy52YWx1ZSwgVFdPV0FZKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJiaW5kUHJvcDJcIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiaW5kZXgudHNcIl0pO1xuXHRuZXcgQXBwbGljYXRpb24oKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=