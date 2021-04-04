(self["webpackChunk"] = self["webpackChunk"] || []).push([["bindVal1"],{

/***/ "./bindVal1/Application.jw.html":
/*!**************************************!*\
  !*** ./bindVal1/Application.jw.html ***!
  \**************************************/
/***/ (function(module) {

module.exports = "<div jwclass=\"application\"><div>Value:</div><textarea jwid=\"input\" rows=\"5\" cols=\"80\">Hello!</textarea><div>Output:</div><textarea jwid=\"output\" rows=\"5\" cols=\"80\" disabled></textarea></div>\n";

/***/ }),

/***/ "./bindVal1/Application.ts":
/*!*********************************!*\
  !*** ./bindVal1/Application.ts ***!
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

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

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
    key: "renderOutput",
    value: function renderOutput(el) {
      // Watch input element value
      var value = bindVal_1.default(this.getElement("input")); // Bind element value to property

      bindVal_1.default(el, value);
    }
  }]);

  return Application;
}(Component_1.default);

Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./bindVal1/Application.jw.html"))], Application);
exports.default = Application;

/***/ }),

/***/ "./bindVal1/index.ts":
/*!***************************!*\
  !*** ./bindVal1/index.ts ***!
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./bindVal1/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("bindVal1", ["Application.ts", "Application.jw.html", "index.ts"]);
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_bindVal_js"], function() { return __webpack_exec__("./bindVal1/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kVmFsMS9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uL2JpbmRWYWwxL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL2JpbmRWYWwxL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbW1vbi9pbml0RXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGtPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBR0EsSUFBcUIsV0FBckI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLFdBRVcsc0JBQWEsRUFBYixFQUF1QjtBQUNoQztBQUNBLFVBQU0sS0FBSyxHQUFHLGtCQUFnQixLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBaEIsQ0FBZCxDQUZnQyxDQUloQzs7QUFDQSx3QkFBUSxFQUFSLEVBQVksS0FBWjtBQUNBO0FBUkY7O0FBQUE7QUFBQSxFQUF5QyxtQkFBekM7O0FBQXFCLFdBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBQyw2REFBRCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtrQkFBQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xyQjs7QUFDQTs7QUFDQTs7QUFFQSxpQkFBRSxZQUFLO0FBQ04sd0JBQVksVUFBWixFQUF3QixDQUFDLGdCQUFELEVBQW1CLHFCQUFuQixFQUEwQyxVQUExQyxDQUF4QjtBQUNBLE1BQUkscUJBQUosR0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQSxDQUhELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7O0FBQ0E7O0FBQ0E7O0FBRUEsU0FBd0IsV0FBeEIsQ0FBb0MsSUFBcEMsRUFBa0QsS0FBbEQsRUFBaUU7QUFDaEUsTUFBTSxFQUFFLEdBQUcsaUJBQUUsK0RBQUYsQ0FBWDtBQUNBLE1BQUksS0FBSyxHQUFHLElBQVo7QUFDQSxPQUFLLENBQUMsT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFTO0FBQ3RCLFFBQUksS0FBSixFQUFXO0FBQ1YsV0FBSyxHQUFHLEtBQVI7QUFDQSxLQUZELE1BRU87QUFDTixRQUFFLENBQUMsTUFBSCxDQUFVLElBQVY7QUFDQTs7QUFDRCxNQUFFLENBQUMsTUFBSCxDQUFVLGlCQUFFLHlCQUFGLEVBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQTZDLE1BQTdDLGdCQUE0RCxJQUE1RCxjQUFvRSxJQUFwRSxVQUFWO0FBQ0EsR0FQRDtBQVFBLG1CQUFFLE1BQUYsRUFBVSxPQUFWLENBQWtCLGdIQUFsQixFQUFvSSxPQUFwSSxDQUE0SSxFQUE1STtBQUNBOztBQVpELDhCIiwiZmlsZSI6ImJ1bmRsZS1iaW5kVmFsMS03MmY5NjNhMWFiMGE2ODc5MDczYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGp3Y2xhc3M9XFxcImFwcGxpY2F0aW9uXFxcIj48ZGl2PlZhbHVlOjwvZGl2Pjx0ZXh0YXJlYSBqd2lkPVxcXCJpbnB1dFxcXCIgcm93cz1cXFwiNVxcXCIgY29scz1cXFwiODBcXFwiPkhlbGxvITwvdGV4dGFyZWE+PGRpdj5PdXRwdXQ6PC9kaXY+PHRleHRhcmVhIGp3aWQ9XFxcIm91dHB1dFxcXCIgcm93cz1cXFwiNVxcXCIgY29scz1cXFwiODBcXFwiIGRpc2FibGVkPjwvdGV4dGFyZWE+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IGJpbmRWYWwgZnJvbSBcImp3aWRnZXQvYmluZFZhbFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZShcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyT3V0cHV0KGVsOiBKUXVlcnkpIHtcblx0XHQvLyBXYXRjaCBpbnB1dCBlbGVtZW50IHZhbHVlXG5cdFx0Y29uc3QgdmFsdWUgPSBiaW5kVmFsPHN0cmluZz4odGhpcy5nZXRFbGVtZW50KFwiaW5wdXRcIikpO1xuXG5cdFx0Ly8gQmluZCBlbGVtZW50IHZhbHVlIHRvIHByb3BlcnR5XG5cdFx0YmluZFZhbChlbCwgdmFsdWUpO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcImJpbmRWYWwxXCIsIFtcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRFeGFtcGxlKG5hbWU6IHN0cmluZywgbGlua3M6IHN0cmluZ1tdKSB7XG5cdGNvbnN0IGVsID0gJCgnPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDsgd2lkdGg6IDYwMHB4XCI+PGI+U291cmNlOjwvYj4gPC9kaXY+Jyk7XG5cdGxldCBmaXJzdCA9IHRydWU7XG5cdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcblx0XHRpZiAoZmlyc3QpIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmFwcGVuZCgnLCAnKTtcblx0XHR9XG5cdFx0ZWwuYXBwZW5kKCQoJzxhIHRhcmdldD1cIl9ibGFua1wiPjwvYT4nKS50ZXh0KGxpbmspLmF0dHIoXCJocmVmXCIsIGBzcmMvJHtuYW1lfS8ke2xpbmt9LnR4dGApKTtcblx0fSk7XG5cdCQoXCJib2R5XCIpLnByZXBlbmQoJzxkaXY+PGI+RXhhbXBsZTwvYj48L2Rpdj48ZGl2PjxhIGhyZWY9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpXCI+UmVmcmVzaDwvYT48L2Rpdj48aHIgc3R5bGU9XCJjbGVhcjogYm90aFwiPicpLnByZXBlbmQoZWwpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==