(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindVal1"],{

/***/ "./bindVal1/Application.jw.html":
/*!**************************************!*\
  !*** ./bindVal1/Application.jw.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div jwclass=\"application\"><div>Value:</div><textarea jwid=\"input\" rows=\"5\" cols=\"80\">Hello!</textarea><div>Output:</div><textarea jwid=\"output\" rows=\"5\" cols=\"80\" disabled></textarea></div>\n";

/***/ }),

/***/ "./bindVal1/Application.ts":
/*!*********************************!*\
  !*** ./bindVal1/Application.ts ***!
  \*********************************/
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

var bindVal_1 = __importDefault(__webpack_require__(/*! jwidget/bindVal */ "../../main/dist/bindVal.js"));

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
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./bindVal1/index.ts":
/*!***************************!*\
  !*** ./bindVal1/index.ts ***!
  \***************************/
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

/***/ })

},[["./bindVal1/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW5kVmFsMS9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uLi8uLi9zcmMvYmluZFZhbDEvQXBwbGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9iaW5kVmFsMS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2NvbW1vbi9pbml0RXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxrTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQSxNQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUNBRXdCLEVBRnhCLEVBRWtDO0FBQ2hDO0FBQ0EsWUFBTSxLQUFLLEdBQUcsa0JBQVEsS0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQVIsQ0FBZCxDQUZnQyxDQUloQzs7QUFDQSwwQkFBUSxFQUFSLEVBQVksS0FBWjtBQUNBO0FBUkY7O0FBQUE7QUFBQSxJQUF5QyxtQkFBekM7O0FBQXFCLGFBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBUyw2REFBVCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtBQVNyQjtBQUFDLENBVEQ7O2tCQUFxQixXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMckI7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFVBQVosRUFBd0IsQ0FBQyxnQkFBRCxFQUFtQixxQkFBbkIsRUFBMEMsVUFBMUMsQ0FBeEI7QUFDQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FIRCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7QUFDQTs7QUFDQTs7QUFFQSxTQUF3QixXQUF4QixDQUFvQyxJQUFwQyxFQUFrRCxLQUFsRCxFQUFpRTtBQUNoRSxNQUFNLEVBQUUsR0FBRyxpQkFBRSwrREFBRixDQUFYO0FBQ0EsTUFBSSxLQUFLLEdBQUcsSUFBWjtBQUNBLE9BQUssQ0FBQyxPQUFOLENBQWMsVUFBQyxJQUFELEVBQVM7QUFDdEIsUUFBSSxLQUFKLEVBQVc7QUFDVixXQUFLLEdBQUcsS0FBUjtBQUNBLEtBRkQsTUFFTztBQUNOLFFBQUUsQ0FBQyxNQUFILENBQVUsSUFBVjtBQUNBOztBQUNELE1BQUUsQ0FBQyxNQUFILENBQVUsaUJBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFBd0MsSUFBeEMsQ0FBNkMsTUFBN0MsZ0JBQTRELElBQTVELGNBQW9FLElBQXBFLFVBQVY7QUFDQSxHQVBEO0FBUUEsbUJBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsZ0hBQWxCLEVBQW9JLE9BQXBJLENBQTRJLEVBQTVJO0FBQ0E7O0FBWkQsOEIiLCJmaWxlIjoiYnVuZGxlLWJpbmRWYWwxLTAzODQ0MDdmNDJlZDRmYTFiYzFiLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgandjbGFzcz1cXFwiYXBwbGljYXRpb25cXFwiPjxkaXY+VmFsdWU6PC9kaXY+PHRleHRhcmVhIGp3aWQ9XFxcImlucHV0XFxcIiByb3dzPVxcXCI1XFxcIiBjb2xzPVxcXCI4MFxcXCI+SGVsbG8hPC90ZXh0YXJlYT48ZGl2Pk91dHB1dDo8L2Rpdj48dGV4dGFyZWEgandpZD1cXFwib3V0cHV0XFxcIiByb3dzPVxcXCI1XFxcIiBjb2xzPVxcXCI4MFxcXCIgZGlzYWJsZWQ+PC90ZXh0YXJlYT48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgYmluZFZhbCBmcm9tIFwiandpZGdldC9iaW5kVmFsXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5cbkB0ZW1wbGF0ZShyZXF1aXJlPHN0cmluZz4oXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJvdGVjdGVkIHJlbmRlck91dHB1dChlbDogSlF1ZXJ5KSB7XG5cdFx0Ly8gV2F0Y2ggaW5wdXQgZWxlbWVudCB2YWx1ZVxuXHRcdGNvbnN0IHZhbHVlID0gYmluZFZhbCh0aGlzLmdldEVsZW1lbnQoXCJpbnB1dFwiKSk7XG5cblx0XHQvLyBCaW5kIGVsZW1lbnQgdmFsdWUgdG8gcHJvcGVydHlcblx0XHRiaW5kVmFsKGVsLCB2YWx1ZSk7XG5cdH1cbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBpbml0RXhhbXBsZSBmcm9tIFwiLi4vY29tbW9uL2luaXRFeGFtcGxlXCI7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4vQXBwbGljYXRpb25cIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiYmluZFZhbDFcIiwgW1wiQXBwbGljYXRpb24udHNcIiwgXCJBcHBsaWNhdGlvbi5qdy5odG1sXCIsIFwiaW5kZXgudHNcIl0pO1xuXHRuZXcgQXBwbGljYXRpb24oKS5yZW5kZXJUbyhcImJvZHlcIik7XG59KTtcbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBcImNvcmUtanMvc3RhYmxlXCI7XG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEV4YW1wbGUobmFtZTogc3RyaW5nLCBsaW5rczogc3RyaW5nW10pIHtcblx0Y29uc3QgZWwgPSAkKCc8ZGl2IHN0eWxlPVwiZmxvYXQ6IHJpZ2h0OyB3aWR0aDogNjAwcHhcIj48Yj5Tb3VyY2U6PC9iPiA8L2Rpdj4nKTtcblx0bGV0IGZpcnN0ID0gdHJ1ZTtcblx0bGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuXHRcdGlmIChmaXJzdCkge1xuXHRcdFx0Zmlyc3QgPSBmYWxzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuYXBwZW5kKCcsICcpO1xuXHRcdH1cblx0XHRlbC5hcHBlbmQoJCgnPGEgdGFyZ2V0PVwiX2JsYW5rXCI+PC9hPicpLnRleHQobGluaykuYXR0cihcImhyZWZcIiwgYHNyYy8ke25hbWV9LyR7bGlua30udHh0YCkpO1xuXHR9KTtcblx0JChcImJvZHlcIikucHJlcGVuZCgnPGRpdj48Yj5FeGFtcGxlPC9iPjwvZGl2PjxkaXY+PGEgaHJlZj1cImphdmFzY3JpcHQ6bG9jYXRpb24ucmVsb2FkKClcIj5SZWZyZXNoPC9hPjwvZGl2PjxociBzdHlsZT1cImNsZWFyOiBib3RoXCI+JykucHJlcGVuZChlbCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9