(self["webpackChunk"] = self["webpackChunk"] || []).push([["bindVal2"],{

/***/ "./bindVal2/Application.jw.html":
/*!**************************************!*\
  !*** ./bindVal2/Application.jw.html ***!
  \**************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"application\"><div>This sample demonstrates how to bind two inputs to a single string property.</div><div><input jwid=\"first\" type=\"text\"></div><div><input jwid=\"second\" type=\"text\"></div></div>\n";

/***/ }),

/***/ "./bindVal2/Application.ts":
/*!*********************************!*\
  !*** ./bindVal2/Application.ts ***!
  \*********************************/
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

var jwidget_1 = __webpack_require__(/*! jwidget */ "../../main/dist/index.js");

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var Property_1 = __importDefault(__webpack_require__(/*! jwidget/Property */ "../../main/dist/Property.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var Application = /*#__PURE__*/function (_Component_1$default) {
  _inherits(Application, _Component_1$default);

  var _super = _createSuper(Application);

  function Application() {
    var _this;

    _classCallCheck(this, Application);

    _this = _super.apply(this, arguments);
    _this.value = new Property_1.default("Input some text");
    return _this;
  }

  _createClass(Application, [{
    key: "renderFirst",
    value: function renderFirst(el) {
      bindVal_1.default(el, this.value, jwidget_1.TWOWAY);
    }
  }, {
    key: "renderSecond",
    value: function renderSecond(el) {
      bindVal_1.default(el, this.value, jwidget_1.TWOWAY);
    }
  }]);

  return Application;
}(Component_1.default);

Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindVal2/Application.jw.html"))], Application);
exports.default = Application;

/***/ }),

/***/ "./bindVal2/index.ts":
/*!***************************!*\
  !*** ./bindVal2/index.ts ***!
  \***************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindVal2/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("bindVal2", ["Application.ts", "Application.jw.html", "index.ts"]);
  new Application_1.default().renderTo("body");
});

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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_bindVal_js"], function() { return __webpack_exec__("./bindVal2/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kVmFsMi9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uL2JpbmRWYWwyL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL2JpbmRWYWwyL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbW1vbi9pbml0RXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLCtPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0EsSUFBcUIsV0FBckI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBOzs7QUFFUyxrQkFBUSxJQUFJLGtCQUFKLENBQWEsaUJBQWIsQ0FBUjtBQUZUO0FBV0M7O0FBWEQ7QUFBQTtBQUFBLFdBSVcscUJBQVksRUFBWixFQUFzQjtBQUMvQix3QkFBUSxFQUFSLEVBQVksS0FBSyxLQUFqQixFQUF3QixnQkFBeEI7QUFDQTtBQU5GO0FBQUE7QUFBQSxXQVFXLHNCQUFhLEVBQWIsRUFBdUI7QUFDaEMsd0JBQVEsRUFBUixFQUFZLEtBQUssS0FBakIsRUFBd0IsZ0JBQXhCO0FBQ0E7QUFWRjs7QUFBQTtBQUFBLEVBQXlDLG1CQUF6Qzs7QUFBcUIsV0FBVyxlQUQvQixtQkFBUyxtQkFBTyxDQUFDLDZEQUFELENBQWhCLENBQytCLEdBQVgsV0FBVyxDQUFYO2tCQUFBLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHJCOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxVQUFaLEVBQXdCLENBQUMsZ0JBQUQsRUFBbUIscUJBQW5CLEVBQTBDLFVBQTFDLENBQXhCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7QUFDQTs7QUFDQTs7QUFFQSxTQUF3QixXQUF4QixDQUFvQyxJQUFwQyxFQUFrRCxLQUFsRCxFQUFpRTtBQUNoRSxNQUFNLEVBQUUsR0FBRyxpQkFBRSwrREFBRixDQUFYO0FBQ0EsTUFBSSxLQUFLLEdBQUcsSUFBWjtBQUNBLE9BQUssQ0FBQyxPQUFOLENBQWMsVUFBQyxJQUFELEVBQVM7QUFDdEIsUUFBSSxLQUFKLEVBQVc7QUFDVixXQUFLLEdBQUcsS0FBUjtBQUNBLEtBRkQsTUFFTztBQUNOLFFBQUUsQ0FBQyxNQUFILENBQVUsSUFBVjtBQUNBOztBQUNELE1BQUUsQ0FBQyxNQUFILENBQVUsaUJBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFBd0MsSUFBeEMsQ0FBNkMsTUFBN0MsZ0JBQTRELElBQTVELGNBQW9FLElBQXBFLFVBQVY7QUFDQSxHQVBEO0FBUUEsbUJBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsZ0hBQWxCLEVBQW9JLE9BQXBJLENBQTRJLEVBQTVJO0FBQ0E7O0FBWkQsOEIiLCJmaWxlIjoiYnVuZGxlLWJpbmRWYWwyLTMzMGMyNjQxMzQ3NjQ3MzNiYTJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiYXBwbGljYXRpb25cXFwiPjxkaXY+VGhpcyBzYW1wbGUgZGVtb25zdHJhdGVzIGhvdyB0byBiaW5kIHR3byBpbnB1dHMgdG8gYSBzaW5nbGUgc3RyaW5nIHByb3BlcnR5LjwvZGl2PjxkaXY+PGlucHV0IGp3aWQ9XFxcImZpcnN0XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIj48L2Rpdj48ZGl2PjxpbnB1dCBqd2lkPVxcXCJzZWNvbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsImltcG9ydCB7VFdPV0FZfSBmcm9tIFwiandpZGdldFwiO1xuaW1wb3J0IGJpbmRWYWwgZnJvbSBcImp3aWRnZXQvYmluZFZhbFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBQcm9wZXJ0eSBmcm9tIFwiandpZGdldC9Qcm9wZXJ0eVwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZShyZXF1aXJlKFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgdmFsdWUgPSBuZXcgUHJvcGVydHkoXCJJbnB1dCBzb21lIHRleHRcIik7XG5cblx0cHJvdGVjdGVkIHJlbmRlckZpcnN0KGVsOiBKUXVlcnkpIHtcblx0XHRiaW5kVmFsKGVsLCB0aGlzLnZhbHVlLCBUV09XQVkpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclNlY29uZChlbDogSlF1ZXJ5KSB7XG5cdFx0YmluZFZhbChlbCwgdGhpcy52YWx1ZSwgVFdPV0FZKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJiaW5kVmFsMlwiLCBbXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJpbmRleC50c1wiXSk7XG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIjtcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0RXhhbXBsZShuYW1lOiBzdHJpbmcsIGxpbmtzOiBzdHJpbmdbXSkge1xuXHRjb25zdCBlbCA9ICQoJzxkaXYgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IHdpZHRoOiA2MDBweFwiPjxiPlNvdXJjZTo8L2I+IDwvZGl2PicpO1xuXHRsZXQgZmlyc3QgPSB0cnVlO1xuXHRsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG5cdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5hcHBlbmQoJywgJyk7XG5cdFx0fVxuXHRcdGVsLmFwcGVuZCgkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+JykudGV4dChsaW5rKS5hdHRyKFwiaHJlZlwiLCBgc3JjLyR7bmFtZX0vJHtsaW5rfS50eHRgKSk7XG5cdH0pO1xuXHQkKFwiYm9keVwiKS5wcmVwZW5kKCc8ZGl2PjxiPkV4YW1wbGU8L2I+PC9kaXY+PGRpdj48YSBocmVmPVwiamF2YXNjcmlwdDpsb2NhdGlvbi5yZWxvYWQoKVwiPlJlZnJlc2g8L2E+PC9kaXY+PGhyIHN0eWxlPVwiY2xlYXI6IGJvdGhcIj4nKS5wcmVwZW5kKGVsKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=