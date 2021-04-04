(self["webpackChunk"] = self["webpackChunk"] || []).push([["defer"],{

/***/ "./defer/Application.jw.html":
/*!***********************************!*\
  !*** ./defer/Application.jw.html ***!
  \***********************************/
/***/ (function(module) {

module.exports = "<div><button type=\"button\" jwid=\"button\">Show greeter</button><div>Hellos displayed: <span jwid=\"count\"></span></div><div jwid=\"greeter\"></div></div>\n";

/***/ }),

/***/ "../../main/dist/bindText.js":
/*!***********************************!*\
  !*** ../../main/dist/bindText.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));

var TextUpdater = /*#__PURE__*/function (_Class_1$default) {
  _inherits(TextUpdater, _Class_1$default);

  var _super = _createSuper(TextUpdater);

  function TextUpdater(el, property) {
    var _this;

    _classCallCheck(this, TextUpdater);

    _this = _super.call(this);
    _this.el = el;
    _this.property = property;

    _this._update();

    _this.own(property.onChange.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(TextUpdater, [{
    key: "_update",
    value: function _update() {
      this.el.text(this.property.get());
    }
  }]);

  return TextUpdater;
}(Class_1.default);
/**
 * Binds inner text of a DOM element to a string %Property.
 * @param el DOM element.
 * @param property Text value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */


function bindText(el, property) {
  return new TextUpdater(el, property);
}

exports.default = bindText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRixJQUFBLE9BQUEsR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztJQUdNLFc7Ozs7O0FBQ0wsdUJBQW9CLEVBQXBCLEVBQW9ELFFBQXBELEVBQThFO0FBQUE7O0FBQUE7O0FBQzdFO0FBRG1CLFVBQUEsRUFBQSxHQUFBLEVBQUE7QUFBZ0MsVUFBQSxRQUFBLEdBQUEsUUFBQTs7QUFFbkQsVUFBSyxPQUFMOztBQUNBLFVBQUssR0FBTCxDQUFTLFFBQVEsQ0FBQyxRQUFULENBQWtCLE1BQWxCLENBQXlCLE1BQUssT0FBOUIsZ0NBQVQ7O0FBSDZFO0FBSTdFOzs7O1dBRU8sbUJBQU87QUFDZCxXQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsS0FBSyxRQUFMLENBQWMsR0FBZCxFQUFiO0FBQ0E7Ozs7RUFUd0IsT0FBQSxDQUFBLE87QUFZMUI7Ozs7O0FBS0c7OztBQUNILFNBQXdCLFFBQXhCLENBQWlDLEVBQWpDLEVBQXlELFFBQXpELEVBQW1GO0FBQ2xGLFNBQU8sSUFBSSxXQUFKLENBQWdCLEVBQWhCLEVBQW9CLFFBQXBCLENBQVA7QUFDQTs7QUFGRCxPQUFBLENBQUEsT0FBQSxHQUFBLFFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5cbmNsYXNzIFRleHRVcGRhdGVyIGV4dGVuZHMgQ2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBUZXh0VXBkYXRlckVsZW1lbnQsIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPHN0cmluZz4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMub3duKHByb3BlcnR5Lm9uQ2hhbmdlLmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHR0aGlzLmVsLnRleHQodGhpcy5wcm9wZXJ0eS5nZXQoKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBpbm5lciB0ZXh0IG9mIGEgRE9NIGVsZW1lbnQgdG8gYSBzdHJpbmcgJVByb3BlcnR5LlxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRUZXh0KGVsOiBUZXh0VXBkYXRlckVsZW1lbnQsIHByb3BlcnR5OiBCaW5kYWJsZTxzdHJpbmc+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFVwZGF0ZXJFbGVtZW50IHtcblx0dGV4dCh0ZXh0OiBzdHJpbmcpOiB2b2lkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

/***/ "../../main/dist/defer.js":
/*!********************************!*\
  !*** ../../main/dist/defer.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var CancelToken_1 = __webpack_require__(/*! ./CancelToken */ "../../main/dist/CancelToken.js");
/**
 * Promise wrapper over setTimeout function with CancelToken support. Resolves the promise after specified
 * period of time. Never rejects the promise. If the operation gets cancelled via the token, the promise never gets
 * resolved or rejected.
 * @param ms Timeout duration in milliseconds.
 * @param cancelToken Cancellation token to bind the operation to.
 * @returns Promise object representing the timeout.
 */


function default_1(ms, cancelToken) {
  var timeout;
  return CancelToken_1.runAsync(function (resolve) {
    timeout = setTimeout(resolve, ms);
  }, function () {
    clearTimeout(timeout);
  }, cancelToken);
}

exports.default = default_1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkU7Ozs7OztBQUVGLElBQUEsYUFBQSxHQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUE7QUFFQTs7Ozs7OztBQU9HOzs7QUFDSCxTQUFBLFNBQUEsQ0FBeUIsRUFBekIsRUFBc0MsV0FBdEMsRUFBK0Q7QUFDOUQsTUFBSSxPQUFKO0FBQ0EsU0FBTyxhQUFBLENBQUEsUUFBQSxDQUNOLFVBQUEsT0FBTyxFQUFHO0FBQ1QsSUFBQSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQUQsRUFBVSxFQUFWLENBQXBCO0FBQ0EsR0FISyxFQUlOLFlBQUs7QUFDSixJQUFBLFlBQVksQ0FBQyxPQUFELENBQVo7QUFDQSxHQU5LLEVBT04sV0FQTSxDQUFQO0FBU0E7O0FBWEQsT0FBQSxDQUFBLE9BQUEsR0FBQSxTQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IENhbmNlbFRva2VuLCB7cnVuQXN5bmN9IGZyb20gXCIuL0NhbmNlbFRva2VuXCI7XG5cbi8qKlxuICogUHJvbWlzZSB3cmFwcGVyIG92ZXIgc2V0VGltZW91dCBmdW5jdGlvbiB3aXRoIENhbmNlbFRva2VuIHN1cHBvcnQuIFJlc29sdmVzIHRoZSBwcm9taXNlIGFmdGVyIHNwZWNpZmllZFxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xuICogcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXG4gKiBAcGFyYW0gbXMgVGltZW91dCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cbiAqIEByZXR1cm5zIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdGltZW91dC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG1zPzogbnVtYmVyLCBjYW5jZWxUb2tlbj86IENhbmNlbFRva2VuKTogUHJvbWlzZTx2b2lkPiB7XG5cdGxldCB0aW1lb3V0OiBhbnk7XG5cdHJldHVybiBydW5Bc3luYzx2b2lkPihcblx0XHRyZXNvbHZlID0+IHtcblx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcblx0XHR9LFxuXHRcdCgpID0+IHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR9LFxuXHRcdGNhbmNlbFRva2VuXG5cdCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "./defer/Application.ts":
/*!******************************!*\
  !*** ./defer/Application.ts ***!
  \******************************/
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

var bindText_1 = __importDefault(__webpack_require__(/*! jwidget/bindText */ "../../main/dist/bindText.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var Property_1 = __importDefault(__webpack_require__(/*! jwidget/Property */ "../../main/dist/Property.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var DelayedGreeter_1 = __importDefault(__webpack_require__(/*! ./DelayedGreeter */ "./defer/DelayedGreeter.ts"));

var Application = /*#__PURE__*/function (_Component_1$default) {
  _inherits(Application, _Component_1$default);

  var _super = _createSuper(Application);

  function Application() {
    var _this;

    _classCallCheck(this, Application);

    _this = _super.apply(this, arguments);
    _this.count = new Property_1.default(0);
    _this.greeter = _this.own(new Property_1.default()).ownValue();
    return _this;
  }

  _createClass(Application, [{
    key: "renderButton",
    value: function renderButton(el) {
      var _this2 = this;

      el.on("click", function () {
        el.text("Destroy current greeter and show a new one");

        _this2.greeter.set(new DelayedGreeter_1.default(_this2.count));
      });
    }
  }, {
    key: "renderCount",
    value: function renderCount(el) {
      bindText_1.default(el, this.count.map(function (count) {
        return String(count);
      }));
    }
  }, {
    key: "renderGreeter",
    value: function renderGreeter() {
      return this.greeter;
    }
  }]);

  return Application;
}(Component_1.default);

Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./defer/Application.jw.html"))], Application);
exports.default = Application;

/***/ }),

/***/ "./defer/DelayedGreeter.ts":
/*!*********************************!*\
  !*** ./defer/DelayedGreeter.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var CancelToken_1 = __importDefault(__webpack_require__(/*! jwidget/CancelToken */ "../../main/dist/CancelToken.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var defer_1 = __importDefault(__webpack_require__(/*! jwidget/defer */ "../../main/dist/defer.js"));

var DelayedGreeter = /*#__PURE__*/function (_Component_1$default) {
  _inherits(DelayedGreeter, _Component_1$default);

  var _super = _createSuper(DelayedGreeter);

  function DelayedGreeter(count) {
    var _this;

    _classCallCheck(this, DelayedGreeter);

    _this = _super.call(this);
    _this.count = count;
    _this.cancelToken = _this.own(new CancelToken_1.default());
    return _this;
  }

  _createClass(DelayedGreeter, [{
    key: "renderRoot",
    value: function renderRoot(el) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                el.text("Wait...");
                _context.next = 3;
                return defer_1.default(1000, this.cancelToken);

              case 3:
                el.text("Hello!");
                this.count.set(this.count.get() + 1);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);

  return DelayedGreeter;
}(Component_1.default);

exports.default = DelayedGreeter;

/***/ }),

/***/ "./defer/index.ts":
/*!************************!*\
  !*** ./defer/index.ts ***!
  \************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./defer/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("defer", ["DelayedGreeter.ts", "Application.ts", "Application.jw.html", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_CancelToken_js-common_initExample_ts"], function() { return __webpack_exec__("./defer/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZWZlci9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uLi9tYWluL2Rpc3QvYmluZFRleHQuanMiLCJ3ZWJwYWNrOi8vLy4uL21haW4vZGlzdC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vLi9kZWZlci9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9kZWZlci9EZWxheWVkR3JlZXRlci50cyIsIndlYnBhY2s6Ly8vLi9kZWZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLG1MOzs7Ozs7Ozs7OztBQ0FhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QiwyQkFBMkIsMkVBQTJFLGtDQUFrQyxtQkFBbUIsR0FBRyxFQUFFLE9BQU8sa0NBQWtDLDhIQUE4SCxHQUFHLEVBQUUscUJBQXFCOztBQUV4WCxpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SiwyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRTs7QUFFM1QsNkRBQTZELHNFQUFzRSw4REFBOEQsb0JBQW9COztBQUVyTiwwQ0FBMEMsK0RBQStELDJFQUEyRSxFQUFFLHlFQUF5RSxlQUFlLHNEQUFzRCxFQUFFLEVBQUUsdURBQXVEOztBQUUvWCxnQ0FBZ0MsNEVBQTRFLGlCQUFpQixVQUFVLEdBQUcsOEJBQThCOztBQUV4SyxnQ0FBZ0MsNkRBQTZELHlDQUF5Qyw4Q0FBOEMsaUNBQWlDLG1EQUFtRCx5REFBeUQsRUFBRSxPQUFPLHVDQUF1QyxFQUFFLGlEQUFpRCxHQUFHOztBQUV2YSxpREFBaUQsMEVBQTBFLGFBQWEsRUFBRSxxQ0FBcUM7O0FBRS9LLHVDQUF1Qyx1QkFBdUIsdUZBQXVGLEVBQUUsYUFBYTs7QUFFcEssc0NBQXNDLHdFQUF3RSwwQ0FBMEMsOENBQThDLE1BQU0sNkVBQTZFLEdBQUcsYUFBYSxFQUFFLFlBQVksY0FBYyxFQUFFOztBQUV2VSw2QkFBNkIsZ0dBQWdHLGdEQUFnRCxHQUFHLDJCQUEyQjs7QUFFM007QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7O0FBRUYsOEJBQThCLG1CQUFPLENBQUMseUNBQVM7O0FBRS9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2YsMkNBQTJDLGNBQWMsbThHOzs7Ozs7Ozs7OztBQ3RHNUM7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDOztBQUVGLG9CQUFvQixtQkFBTyxDQUFDLHFEQUFlO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBLGVBQWU7QUFDZiwyQ0FBMkMsY0FBYywyakc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRHpEOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBLElBQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7O0FBRVMsa0JBQVEsSUFBSSxrQkFBSixDQUFhLENBQWIsQ0FBUjtBQUNBLG9CQUFVLE1BQUssR0FBTCxDQUFTLElBQUksa0JBQUosRUFBVCxFQUFvQyxRQUFwQyxFQUFWO0FBSFQ7QUFtQkM7O0FBbkJEO0FBQUE7QUFBQSxXQUtXLHNCQUFhLEVBQWIsRUFBdUI7QUFBQTs7QUFDaEMsUUFBRSxDQUFDLEVBQUgsQ0FBTSxPQUFOLEVBQWUsWUFBSztBQUNuQixVQUFFLENBQUMsSUFBSCxDQUFRLDRDQUFSOztBQUNBLGNBQUksQ0FBQyxPQUFMLENBQWEsR0FBYixDQUFpQixJQUFJLHdCQUFKLENBQW1CLE1BQUksQ0FBQyxLQUF4QixDQUFqQjtBQUNBLE9BSEQ7QUFJQTtBQVZGO0FBQUE7QUFBQSxXQVlXLHFCQUFZLEVBQVosRUFBc0I7QUFDL0IseUJBQVMsRUFBVCxFQUFhLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxlQUFLO0FBQUEsZUFBSSxNQUFNLENBQUMsS0FBRCxDQUFWO0FBQUEsT0FBcEIsQ0FBYjtBQUNBO0FBZEY7QUFBQTtBQUFBLFdBZ0JXLHlCQUFhO0FBQ3RCLGFBQU8sS0FBSyxPQUFaO0FBQ0E7QUFsQkY7O0FBQUE7QUFBQSxFQUF5QyxtQkFBekM7O0FBQXFCLFdBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBQywwREFBRCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtrQkFBQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ByQjs7QUFDQTs7QUFDQTs7SUFHcUIsYzs7Ozs7QUFJcEIsMEJBQW9CLEtBQXBCLEVBQTRDO0FBQUE7O0FBQUE7O0FBQzNDO0FBRG1CO0FBRlosd0JBQWMsTUFBSyxHQUFMLENBQVMsSUFBSSxxQkFBSixFQUFULENBQWQ7QUFFb0M7QUFFM0M7Ozs7V0FFZSxvQkFBVyxFQUFYLEVBQXFCOzs7Ozs7QUFDcEMsa0JBQUUsQ0FBQyxJQUFILENBQVEsU0FBUjs7QUFDQSx1QkFBTSxnQkFBTSxJQUFOLEVBQVksS0FBSyxXQUFqQixDQUFOOzs7QUFDQSxrQkFBRSxDQUFDLElBQUgsQ0FBUSxRQUFSO0FBQ0EscUJBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEtBQW1CLENBQWxDOzs7Ozs7Ozs7QUFDQTs7OztFQWIwQyxtQjs7QUFBNUMsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLE9BQVosRUFBcUIsQ0FBQyxtQkFBRCxFQUFzQixnQkFBdEIsRUFBd0MscUJBQXhDLEVBQStELFVBQS9ELENBQXJCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRSIsImZpbGUiOiJidW5kbGUtZGVmZXItZjZmODVlMTUwMDMxOGRiNjdlZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgandpZD1cXFwiYnV0dG9uXFxcIj5TaG93IGdyZWV0ZXI8L2J1dHRvbj48ZGl2PkhlbGxvcyBkaXNwbGF5ZWQ6IDxzcGFuIGp3aWQ9XFxcImNvdW50XFxcIj48L3NwYW4+PC9kaXY+PGRpdiBqd2lkPVxcXCJncmVldGVyXFxcIj48L2Rpdj48L2Rpdj5cXG5cIjsiLCJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjEgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbnZhciBfX2ltcG9ydERlZmF1bHQgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19pbXBvcnREZWZhdWx0IHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgcmV0dXJuIG1vZCAmJiBtb2QuX19lc01vZHVsZSA/IG1vZCA6IHtcbiAgICBcImRlZmF1bHRcIjogbW9kXG4gIH07XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XG5cbnZhciBUZXh0VXBkYXRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoVGV4dFVwZGF0ZXIsIF9DbGFzc18xJGRlZmF1bHQpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoVGV4dFVwZGF0ZXIpO1xuXG4gIGZ1bmN0aW9uIFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUZXh0VXBkYXRlcik7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIF90aGlzLmVsID0gZWw7XG4gICAgX3RoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAgIF90aGlzLl91cGRhdGUoKTtcblxuICAgIF90aGlzLm93bihwcm9wZXJ0eS5vbkNoYW5nZS5saXN0ZW4oX3RoaXMuX3VwZGF0ZSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUZXh0VXBkYXRlciwgW3tcbiAgICBrZXk6IFwiX3VwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgICAgdGhpcy5lbC50ZXh0KHRoaXMucHJvcGVydHkuZ2V0KCkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUZXh0VXBkYXRlcjtcbn0oQ2xhc3NfMS5kZWZhdWx0KTtcbi8qKlxyXG4gKiBCaW5kcyBpbm5lciB0ZXh0IG9mIGEgRE9NIGVsZW1lbnQgdG8gYSBzdHJpbmcgJVByb3BlcnR5LlxyXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBwcm9wZXJ0eSBUZXh0IHZhbHVlLlxyXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGJpbmRUZXh0KGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gbmV3IFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRUZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlpYVc1a1ZHVjRkQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGelFrVTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRkhSaXhKUVVGQkxFOUJRVUVzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRkJMRk5CUVVFc1EwRkJRU3hEUVVGQk96dEpRVWROTEZjN096czdPMEZCUTB3c2RVSkJRVzlDTEVWQlFYQkNMRVZCUVc5RUxGRkJRWEJFTEVWQlFUaEZPMEZCUVVFN08wRkJRVUU3TzBGQlF6ZEZPMEZCUkcxQ0xGVkJRVUVzUlVGQlFTeEhRVUZCTEVWQlFVRTdRVUZCWjBNc1ZVRkJRU3hSUVVGQkxFZEJRVUVzVVVGQlFUczdRVUZGYmtRc1ZVRkJTeXhQUVVGTU96dEJRVU5CTEZWQlFVc3NSMEZCVEN4RFFVRlRMRkZCUVZFc1EwRkJReXhSUVVGVUxFTkJRV3RDTEUxQlFXeENMRU5CUVhsQ0xFMUJRVXNzVDBGQk9VSXNaME5CUVZRN08wRkJTRFpGTzBGQlNUZEZPenM3TzFkQlJVOHNiVUpCUVU4N1FVRkRaQ3hYUVVGTExFVkJRVXdzUTBGQlVTeEpRVUZTTEVOQlFXRXNTMEZCU3l4UlFVRk1MRU5CUVdNc1IwRkJaQ3hGUVVGaU8wRkJRMEU3T3pzN1JVRlVkMElzVDBGQlFTeERRVUZCTEU4N1FVRlpNVUk3T3pzN08wRkJTMGM3T3p0QlFVTklMRk5CUVhkQ0xGRkJRWGhDTEVOQlFXbERMRVZCUVdwRExFVkJRWGxFTEZGQlFYcEVMRVZCUVcxR08wRkJRMnhHTEZOQlFVOHNTVUZCU1N4WFFVRktMRU5CUVdkQ0xFVkJRV2hDTEVWQlFXOUNMRkZCUVhCQ0xFTkJRVkE3UVVGRFFUczdRVUZHUkN4UFFVRkJMRU5CUVVFc1QwRkJRU3hIUVVGQkxGRkJRVUVpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHVUVWxVSUV4cFkyVnVjMlZjYmx4dVEyOXdlWEpwWjJoMElDaGpLU0F5TURJeElFVm5iM0lnVG1Wd2IyMXVlV0Z6WTJocGFGeHVYRzVRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNXZaaUIwYUdseklITnZablIzWVhKbElHRnVaQ0JoYzNOdlkybGhkR1ZrSUdSdlkzVnRaVzUwWVhScGIyNGdabWxzWlhNZ0tIUm9aU0JjSWxOdlpuUjNZWEpsWENJcExDQjBieUJrWldGc1hHNXBiaUIwYUdVZ1UyOW1kSGRoY21VZ2QybDBhRzkxZENCeVpYTjBjbWxqZEdsdmJpd2dhVzVqYkhWa2FXNW5JSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6WEc1MGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNWpiM0JwWlhNZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTENCaGJtUWdkRzhnY0dWeWJXbDBJSEJsY25OdmJuTWdkRzhnZDJodmJTQjBhR1VnVTI5bWRIZGhjbVVnYVhOY2JtWjFjbTVwYzJobFpDQjBieUJrYnlCemJ5d2djM1ZpYW1WamRDQjBieUIwYUdVZ1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzVjYmxSb1pTQmhZbTkyWlNCamIzQjVjbWxuYUhRZ2JtOTBhV05sSUdGdVpDQjBhR2x6SUhCbGNtMXBjM05wYjI0Z2JtOTBhV05sSUhOb1lXeHNJR0psSUdsdVkyeDFaR1ZrSUdsdUlHRnNiRnh1WTI5d2FXVnpJRzl5SUhOMVluTjBZVzUwYVdGc0lIQnZjblJwYjI1eklHOW1JSFJvWlNCVGIyWjBkMkZ5WlM1Y2JseHVWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVeUJQVWx4dVNVMVFURWxGUkN3Z1NVNURURlZFU1U1SElFSlZWQ0JPVDFRZ1RFbE5TVlJGUkNCVVR5QlVTRVVnVjBGU1VrRk9WRWxGVXlCUFJpQk5SVkpEU0VGT1ZFRkNTVXhKVkZrc1hHNUdTVlJPUlZOVElFWlBVaUJCSUZCQlVsUkpRMVZNUVZJZ1VGVlNVRTlUUlNCQlRrUWdUazlPU1U1R1VrbE9SMFZOUlU1VUxpQkpUaUJPVHlCRlZrVk9WQ0JUU0VGTVRDQlVTRVZjYmtGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzSUVSQlRVRkhSVk1nVDFJZ1QxUklSVkpjYmt4SlFVSkpURWxVV1N3Z1YwaEZWRWhGVWlCSlRpQkJUaUJCUTFSSlQwNGdUMFlnUTA5T1ZGSkJRMVFzSUZSUFVsUWdUMUlnVDFSSVJWSlhTVk5GTENCQlVrbFRTVTVISUVaU1QwMHNYRzVQVlZRZ1QwWWdUMUlnU1U0Z1EwOU9Ua1ZEVkVsUFRpQlhTVlJJSUZSSVJTQlRUMFpVVjBGU1JTQlBVaUJVU0VVZ1ZWTkZJRTlTSUU5VVNFVlNJRVJGUVV4SlRrZFRJRWxPSUZSSVJWeHVVMDlHVkZkQlVrVXVYRzRxTDF4dVhHNXBiWEJ2Y25RZ1FtbHVaR0ZpYkdVZ1puSnZiU0FuTGk5Q2FXNWtZV0pzWlNjN1hHNXBiWEJ2Y25RZ1EyeGhjM01nWm5KdmJTQW5MaTlEYkdGemN5YzdYRzVwYlhCdmNuUWdSR1Z6ZEhKdmVXRmliR1VnWm5KdmJTQW5MaTlFWlhOMGNtOTVZV0pzWlNjN1hHNWNibU5zWVhOeklGUmxlSFJWY0dSaGRHVnlJR1Y0ZEdWdVpITWdRMnhoYzNNZ2UxeHVYSFJqYjI1emRISjFZM1J2Y2lod2NtbDJZWFJsSUdWc09pQlVaWGgwVlhCa1lYUmxja1ZzWlcxbGJuUXNJSEJ5YVhaaGRHVWdjSEp2Y0dWeWRIazZJRUpwYm1SaFlteGxQSE4wY21sdVp6NHBJSHRjYmx4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEhSb2FYTXVYM1Z3WkdGMFpTZ3BPMXh1WEhSY2RIUm9hWE11YjNkdUtIQnliM0JsY25SNUxtOXVRMmhoYm1kbExteHBjM1JsYmloMGFHbHpMbDkxY0dSaGRHVXNJSFJvYVhNcEtUdGNibHgwZlZ4dVhHNWNkSEJ5YVhaaGRHVWdYM1Z3WkdGMFpTZ3BJSHRjYmx4MFhIUjBhR2x6TG1Wc0xuUmxlSFFvZEdocGN5NXdjbTl3WlhKMGVTNW5aWFFvS1NrN1hHNWNkSDFjYm4xY2JseHVMeW9xWEc0Z0tpQkNhVzVrY3lCcGJtNWxjaUIwWlhoMElHOW1JR0VnUkU5TklHVnNaVzFsYm5RZ2RHOGdZU0J6ZEhKcGJtY2dKVkJ5YjNCbGNuUjVMbHh1SUNvZ1FIQmhjbUZ0SUdWc0lFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUhCeWIzQmxjblI1SUZSbGVIUWdkbUZzZFdVdVhHNGdLaUJBY21WMGRYSnVjeUJDYVc1a2FXNW5JRzlpYW1WamRDNGdXVzkxSUcxMWMzUWdaR1Z6ZEhKdmVTQnBkQ0IwYnlCemRHOXdJSFJvWlNCemVXNWphSEp2Ym1sNllYUnBiMjR1WEc0Z0tpOWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlHSnBibVJVWlhoMEtHVnNPaUJVWlhoMFZYQmtZWFJsY2tWc1pXMWxiblFzSUhCeWIzQmxjblI1T2lCQ2FXNWtZV0pzWlR4emRISnBibWMrS1RvZ1JHVnpkSEp2ZVdGaWJHVWdlMXh1WEhSeVpYUjFjbTRnYm1WM0lGUmxlSFJWY0dSaGRHVnlLR1ZzTENCd2NtOXdaWEowZVNrN1hHNTlYRzVjYm1WNGNHOXlkQ0JwYm5SbGNtWmhZMlVnVkdWNGRGVndaR0YwWlhKRmJHVnRaVzUwSUh0Y2JseDBkR1Y0ZENoMFpYaDBPaUJ6ZEhKcGJtY3BPaUIyYjJsa08xeHVmVnh1SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2FuY2VsVG9rZW5fMSA9IHJlcXVpcmUoXCIuL0NhbmNlbFRva2VuXCIpO1xuLyoqXHJcbiAqIFByb21pc2Ugd3JhcHBlciBvdmVyIHNldFRpbWVvdXQgZnVuY3Rpb24gd2l0aCBDYW5jZWxUb2tlbiBzdXBwb3J0LiBSZXNvbHZlcyB0aGUgcHJvbWlzZSBhZnRlciBzcGVjaWZpZWRcclxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xyXG4gKiByZXNvbHZlZCBvciByZWplY3RlZC5cclxuICogQHBhcmFtIG1zIFRpbWVvdXQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxyXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cclxuICogQHJldHVybnMgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSB0aW1lb3V0LlxyXG4gKi9cblxuXG5mdW5jdGlvbiBkZWZhdWx0XzEobXMsIGNhbmNlbFRva2VuKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gQ2FuY2VsVG9rZW5fMS5ydW5Bc3luYyhmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcbiAgfSwgZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfSwgY2FuY2VsVG9rZW4pO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OWtaV1psY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRnpRa1U3T3pzN096dEJRVVZHTEVsQlFVRXNZVUZCUVN4SFFVRkJMRTlCUVVFc1EwRkJRU3hsUVVGQkxFTkJRVUU3UVVGRlFUczdPenM3T3p0QlFVOUhPenM3UVVGRFNDeFRRVUZCTEZOQlFVRXNRMEZCZVVJc1JVRkJla0lzUlVGQmMwTXNWMEZCZEVNc1JVRkJLMFE3UVVGRE9VUXNUVUZCU1N4UFFVRktPMEZCUTBFc1UwRkJUeXhoUVVGQkxFTkJRVUVzVVVGQlFTeERRVU5PTEZWQlFVRXNUMEZCVHl4RlFVRkhPMEZCUTFRc1NVRkJRU3hQUVVGUExFZEJRVWNzVlVGQlZTeERRVUZETEU5QlFVUXNSVUZCVlN4RlFVRldMRU5CUVhCQ08wRkJRMEVzUjBGSVN5eEZRVWxPTEZsQlFVczdRVUZEU2l4SlFVRkJMRmxCUVZrc1EwRkJReXhQUVVGRUxFTkJRVm83UVVGRFFTeEhRVTVMTEVWQlQwNHNWMEZRVFN4RFFVRlFPMEZCVTBFN08wRkJXRVFzVDBGQlFTeERRVUZCTEU5QlFVRXNSMEZCUVN4VFFVRkJJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlwY2JrMUpWQ0JNYVdObGJuTmxYRzVjYmtOdmNIbHlhV2RvZENBb1l5a2dNakF5TVNCRloyOXlJRTVsY0c5dGJubGhjMk5vYVdoY2JseHVVR1Z5YldsemMybHZiaUJwY3lCb1pYSmxZbmtnWjNKaGJuUmxaQ3dnWm5KbFpTQnZaaUJqYUdGeVoyVXNJSFJ2SUdGdWVTQndaWEp6YjI0Z2IySjBZV2x1YVc1bklHRWdZMjl3ZVZ4dWIyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVWdYQ0pUYjJaMGQyRnlaVndpS1N3Z2RHOGdaR1ZoYkZ4dWFXNGdkR2hsSUZOdlpuUjNZWEpsSUhkcGRHaHZkWFFnY21WemRISnBZM1JwYjI0c0lHbHVZMngxWkdsdVp5QjNhWFJvYjNWMElHeHBiV2wwWVhScGIyNGdkR2hsSUhKcFoyaDBjMXh1ZEc4Z2RYTmxMQ0JqYjNCNUxDQnRiMlJwWm5rc0lHMWxjbWRsTENCd2RXSnNhWE5vTENCa2FYTjBjbWxpZFhSbExDQnpkV0pzYVdObGJuTmxMQ0JoYm1RdmIzSWdjMlZzYkZ4dVkyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRDQndaWEp6YjI1eklIUnZJSGRvYjIwZ2RHaGxJRk52Wm5SM1lYSmxJR2x6WEc1bWRYSnVhWE5vWldRZ2RHOGdaRzhnYzI4c0lITjFZbXBsWTNRZ2RHOGdkR2hsSUdadmJHeHZkMmx1WnlCamIyNWthWFJwYjI1ek9seHVYRzVVYUdVZ1lXSnZkbVVnWTI5d2VYSnBaMmgwSUc1dmRHbGpaU0JoYm1RZ2RHaHBjeUJ3WlhKdGFYTnphVzl1SUc1dmRHbGpaU0J6YUdGc2JDQmlaU0JwYm1Oc2RXUmxaQ0JwYmlCaGJHeGNibU52Y0dsbGN5QnZjaUJ6ZFdKemRHRnVkR2xoYkNCd2IzSjBhVzl1Y3lCdlppQjBhR1VnVTI5bWRIZGhjbVV1WEc1Y2JsUklSU0JUVDBaVVYwRlNSU0JKVXlCUVVrOVdTVVJGUkNCY0lrRlRJRWxUWENJc0lGZEpWRWhQVlZRZ1YwRlNVa0ZPVkZrZ1QwWWdRVTVaSUV0SlRrUXNJRVZZVUZKRlUxTWdUMUpjYmtsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBZZ1RVVlNRMGhCVGxSQlFrbE1TVlJaTEZ4dVJrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzVCVlZSSVQxSlRJRTlTSUVOUFVGbFNTVWRJVkNCSVQweEVSVkpUSUVKRklFeEpRVUpNUlNCR1QxSWdRVTVaSUVOTVFVbE5MQ0JFUVUxQlIwVlRJRTlTSUU5VVNFVlNYRzVNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxGeHVUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUaUJVU0VWY2JsTlBSbFJYUVZKRkxseHVLaTljYmx4dWFXMXdiM0owSUVOaGJtTmxiRlJ2YTJWdUxDQjdjblZ1UVhONWJtTjlJR1p5YjIwZ1hDSXVMME5oYm1ObGJGUnZhMlZ1WENJN1hHNWNiaThxS2x4dUlDb2dVSEp2YldselpTQjNjbUZ3Y0dWeUlHOTJaWElnYzJWMFZHbHRaVzkxZENCbWRXNWpkR2x2YmlCM2FYUm9JRU5oYm1ObGJGUnZhMlZ1SUhOMWNIQnZjblF1SUZKbGMyOXNkbVZ6SUhSb1pTQndjbTl0YVhObElHRm1kR1Z5SUhOd1pXTnBabWxsWkZ4dUlDb2djR1Z5YVc5a0lHOW1JSFJwYldVdUlFNWxkbVZ5SUhKbGFtVmpkSE1nZEdobElIQnliMjFwYzJVdUlFbG1JSFJvWlNCdmNHVnlZWFJwYjI0Z1oyVjBjeUJqWVc1alpXeHNaV1FnZG1saElIUm9aU0IwYjJ0bGJpd2dkR2hsSUhCeWIyMXBjMlVnYm1WMlpYSWdaMlYwYzF4dUlDb2djbVZ6YjJ4MlpXUWdiM0lnY21WcVpXTjBaV1F1WEc0Z0tpQkFjR0Z5WVcwZ2JYTWdWR2x0Wlc5MWRDQmtkWEpoZEdsdmJpQnBiaUJ0YVd4c2FYTmxZMjl1WkhNdVhHNGdLaUJBY0dGeVlXMGdZMkZ1WTJWc1ZHOXJaVzRnUTJGdVkyVnNiR0YwYVc5dUlIUnZhMlZ1SUhSdklHSnBibVFnZEdobElHOXdaWEpoZEdsdmJpQjBieTVjYmlBcUlFQnlaWFIxY201eklGQnliMjFwYzJVZ2IySnFaV04wSUhKbGNISmxjMlZ1ZEdsdVp5QjBhR1VnZEdsdFpXOTFkQzVjYmlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z0tHMXpQem9nYm5WdFltVnlMQ0JqWVc1alpXeFViMnRsYmo4NklFTmhibU5sYkZSdmEyVnVLVG9nVUhKdmJXbHpaVHgyYjJsa1BpQjdYRzVjZEd4bGRDQjBhVzFsYjNWME9pQmhibms3WEc1Y2RISmxkSFZ5YmlCeWRXNUJjM2x1WXp4MmIybGtQaWhjYmx4MFhIUnlaWE52YkhabElEMCtJSHRjYmx4MFhIUmNkSFJwYldWdmRYUWdQU0J6WlhSVWFXMWxiM1YwS0hKbGMyOXNkbVVzSUcxektUdGNibHgwWEhSOUxGeHVYSFJjZENncElEMCtJSHRjYmx4MFhIUmNkR05zWldGeVZHbHRaVzkxZENoMGFXMWxiM1YwS1R0Y2JseDBYSFI5TEZ4dVhIUmNkR05oYm1ObGJGUnZhMlZ1WEc1Y2RDazdYRzU5WEc0aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSIsImltcG9ydCBiaW5kVGV4dCBmcm9tIFwiandpZGdldC9iaW5kVGV4dFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBQcm9wZXJ0eSBmcm9tIFwiandpZGdldC9Qcm9wZXJ0eVwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5pbXBvcnQgRGVsYXllZEdyZWV0ZXIgZnJvbSBcIi4vRGVsYXllZEdyZWV0ZXJcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmUoXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBjb3VudCA9IG5ldyBQcm9wZXJ0eSgwKTtcblx0cHJpdmF0ZSBncmVldGVyID0gdGhpcy5vd24obmV3IFByb3BlcnR5PENvbXBvbmVudD4oKSkub3duVmFsdWUoKTtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyQnV0dG9uKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGVsLnRleHQoXCJEZXN0cm95IGN1cnJlbnQgZ3JlZXRlciBhbmQgc2hvdyBhIG5ldyBvbmVcIik7XG5cdFx0XHR0aGlzLmdyZWV0ZXIuc2V0KG5ldyBEZWxheWVkR3JlZXRlcih0aGlzLmNvdW50KSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyQ291bnQoZWw6IEpRdWVyeSkge1xuXHRcdGJpbmRUZXh0KGVsLCB0aGlzLmNvdW50Lm1hcChjb3VudCA9PiBTdHJpbmcoY291bnQpKSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyR3JlZXRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5ncmVldGVyO1xuXHR9XG59XG4iLCJpbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSBcImp3aWRnZXQvQ2FuY2VsVG9rZW5cIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgZGVmZXIgZnJvbSBcImp3aWRnZXQvZGVmZXJcIjtcbmltcG9ydCBJUHJvcGVydHkgZnJvbSBcImp3aWRnZXQvSVByb3BlcnR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGF5ZWRHcmVldGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIGNhbmNlbFRva2VuID0gdGhpcy5vd24obmV3IENhbmNlbFRva2VuKCkpO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgY291bnQ6IElQcm9wZXJ0eTxudW1iZXI+KSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBhc3luYyByZW5kZXJSb290KGVsOiBKUXVlcnkpIHtcblx0XHRlbC50ZXh0KFwiV2FpdC4uLlwiKTtcblx0XHRhd2FpdCBkZWZlcigxMDAwLCB0aGlzLmNhbmNlbFRva2VuKTtcblx0XHRlbC50ZXh0KFwiSGVsbG8hXCIpO1xuXHRcdHRoaXMuY291bnQuc2V0KHRoaXMuY291bnQuZ2V0KCkgKyAxKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJkZWZlclwiLCBbXCJEZWxheWVkR3JlZXRlci50c1wiLCBcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9