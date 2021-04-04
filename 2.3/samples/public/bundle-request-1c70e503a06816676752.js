(self["webpackChunk"] = self["webpackChunk"] || []).push([["request"],{

/***/ "./request/Application.jw.html":
/*!*************************************!*\
  !*** ./request/Application.jw.html ***!
  \*************************************/
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

/***/ "../../main/dist/request.js":
/*!**********************************!*\
  !*** ../../main/dist/request.js ***!
  \**********************************/
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
 * Promise wrapper over jQuery AJAX API functions with CancelToken support. Resolves the promise with request result on its
 * successful completion. Rejects the promise with XMLHttpRequest on request failure. If the operation gets
 * cancelled via the token, the promise never gets resolved or rejected.
 * @param xhr jQuery XML HTTP request wrapper object.
 * @param cancelToken Cancellation token to bind the operation to.
 * @returns Promise object representing the request.
 */


function request(xhr, cancelToken) {
  var aborted = false;
  return CancelToken_1.runAsync(function (resolve, reject) {
    xhr.then(resolve, function (request) {
      if (!aborted) {
        reject(request);
      }
    });
  }, function () {
    aborted = true;
    xhr.abort();
  }, cancelToken);
}

exports.default = request;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCRTs7Ozs7O0FBRUYsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUVBOzs7Ozs7O0FBT0c7OztBQUNILFNBQXdCLE9BQXhCLENBQWdDLEdBQWhDLEVBQWdELFdBQWhELEVBQXlFO0FBQ3hFLE1BQUksT0FBTyxHQUFHLEtBQWQ7QUFDQSxTQUFPLGFBQUEsQ0FBQSxRQUFBLENBQ04sVUFBQyxPQUFELEVBQWtELE1BQWxELEVBQW1GO0FBQ2xGLElBQUEsR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFULEVBQWtCLFVBQUEsT0FBTyxFQUFHO0FBQzNCLFVBQUksQ0FBQyxPQUFMLEVBQWM7QUFDYixRQUFBLE1BQU0sQ0FBQyxPQUFELENBQU47QUFDQTtBQUNELEtBSkQ7QUFLQSxHQVBLLEVBUU4sWUFBSztBQUNKLElBQUEsT0FBTyxHQUFHLElBQVY7QUFDQSxJQUFBLEdBQUcsQ0FBQyxLQUFKO0FBQ0EsR0FYSyxFQVlOLFdBWk0sQ0FBUDtBQWNBOztBQWhCRCxPQUFBLENBQUEsT0FBQSxHQUFBLE9BQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIxIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQ2FuY2VsVG9rZW4sIHtydW5Bc3luY30gZnJvbSBcIi4vQ2FuY2VsVG9rZW5cIjtcblxuLyoqXG4gKiBQcm9taXNlIHdyYXBwZXIgb3ZlciBqUXVlcnkgQUpBWCBBUEkgZnVuY3Rpb25zIHdpdGggQ2FuY2VsVG9rZW4gc3VwcG9ydC4gUmVzb2x2ZXMgdGhlIHByb21pc2Ugd2l0aCByZXF1ZXN0IHJlc3VsdCBvbiBpdHNcbiAqIHN1Y2Nlc3NmdWwgY29tcGxldGlvbi4gUmVqZWN0cyB0aGUgcHJvbWlzZSB3aXRoIFhNTEh0dHBSZXF1ZXN0IG9uIHJlcXVlc3QgZmFpbHVyZS4gSWYgdGhlIG9wZXJhdGlvbiBnZXRzXG4gKiBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0cyByZXNvbHZlZCBvciByZWplY3RlZC5cbiAqIEBwYXJhbSB4aHIgalF1ZXJ5IFhNTCBIVFRQIHJlcXVlc3Qgd3JhcHBlciBvYmplY3QuXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cbiAqIEByZXR1cm5zIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCh4aHI6IEpRdWVyeVhIUiwgY2FuY2VsVG9rZW4/OiBDYW5jZWxUb2tlbik6IFByb21pc2U8YW55PiB7XG5cdGxldCBhYm9ydGVkID0gZmFsc2U7XG5cdHJldHVybiBydW5Bc3luYzxhbnk+KFxuXHRcdChyZXNvbHZlOiAodmFsdWU/OiAoUHJvbWlzZTxhbnk+IHwgYW55KSkgPT4gdm9pZCwgcmVqZWN0OiAoZXJyb3I/OiBhbnkpID0+IHZvaWQpID0+IHtcblx0XHRcdHhoci50aGVuKHJlc29sdmUsIHJlcXVlc3QgPT4ge1xuXHRcdFx0XHRpZiAoIWFib3J0ZWQpIHtcblx0XHRcdFx0XHRyZWplY3QocmVxdWVzdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0KCkgPT4ge1xuXHRcdFx0YWJvcnRlZCA9IHRydWU7XG5cdFx0XHR4aHIuYWJvcnQoKTtcblx0XHR9LFxuXHRcdGNhbmNlbFRva2VuXG5cdCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "./request/AjaxGreeter.ts":
/*!********************************!*\
  !*** ./request/AjaxGreeter.ts ***!
  \********************************/
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

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js"));

var CancelToken_1 = __importDefault(__webpack_require__(/*! jwidget/CancelToken */ "../../main/dist/CancelToken.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var request_1 = __importDefault(__webpack_require__(/*! jwidget/request */ "../../main/dist/request.js"));

var AjaxGreeter = /*#__PURE__*/function (_Component_1$default) {
  _inherits(AjaxGreeter, _Component_1$default);

  var _super = _createSuper(AjaxGreeter);

  function AjaxGreeter(count) {
    var _this;

    _classCallCheck(this, AjaxGreeter);

    _this = _super.call(this);
    _this.count = count;
    _this.cancelToken = _this.own(new CancelToken_1.default());
    return _this;
  }

  _createClass(AjaxGreeter, [{
    key: "renderRoot",
    value: function renderRoot(el) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                el.text("Loading...");
                _context.next = 3;
                return request_1.default(jquery_1.default.get("request/data.json"), this.cancelToken);

              case 3:
                data = _context.sent;
                el.text(data.message);
                this.count.set(this.count.get() + 1);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);

  return AjaxGreeter;
}(Component_1.default);

exports.default = AjaxGreeter;

/***/ }),

/***/ "./request/Application.ts":
/*!********************************!*\
  !*** ./request/Application.ts ***!
  \********************************/
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

var AjaxGreeter_1 = __importDefault(__webpack_require__(/*! ./AjaxGreeter */ "./request/AjaxGreeter.ts"));

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

        _this2.greeter.set(new AjaxGreeter_1.default(_this2.count));
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

Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./request/Application.jw.html"))], Application);
exports.default = Application;

/***/ }),

/***/ "./request/index.ts":
/*!**************************!*\
  !*** ./request/index.ts ***!
  \**************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./request/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("request", ["AjaxGreeter.ts", "Application.ts", "Application.jw.html", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_stable_index_js-node_modules_jquery_dist_jquery_js-node_modules_-a4ae47","main_dist_Component_js-main_dist_template_js","main_dist_CancelToken_js-common_initExample_ts"], function() { return __webpack_exec__("./request/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXF1ZXN0L0FwcGxpY2F0aW9uLmp3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4uL21haW4vZGlzdC9iaW5kVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi4vbWFpbi9kaXN0L3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vcmVxdWVzdC9BamF4R3JlZXRlci50cyIsIndlYnBhY2s6Ly8vLi9yZXF1ZXN0L0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3JlcXVlc3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxtTDs7Ozs7Ozs7Ozs7QUNBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsMkJBQTJCLDJFQUEyRSxrQ0FBa0MsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLGtDQUFrQyw4SEFBOEgsR0FBRyxFQUFFLHFCQUFxQjs7QUFFeFgsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdkosMkNBQTJDLGdCQUFnQixrQkFBa0IsT0FBTywyQkFBMkIsd0RBQXdELGdDQUFnQyx1REFBdUQsMkRBQTJELEVBQUU7O0FBRTNULDZEQUE2RCxzRUFBc0UsOERBQThELG9CQUFvQjs7QUFFck4sMENBQTBDLCtEQUErRCwyRUFBMkUsRUFBRSx5RUFBeUUsZUFBZSxzREFBc0QsRUFBRSxFQUFFLHVEQUF1RDs7QUFFL1gsZ0NBQWdDLDRFQUE0RSxpQkFBaUIsVUFBVSxHQUFHLDhCQUE4Qjs7QUFFeEssZ0NBQWdDLDZEQUE2RCx5Q0FBeUMsOENBQThDLGlDQUFpQyxtREFBbUQseURBQXlELEVBQUUsT0FBTyx1Q0FBdUMsRUFBRSxpREFBaUQsR0FBRzs7QUFFdmEsaURBQWlELDBFQUEwRSxhQUFhLEVBQUUscUNBQXFDOztBQUUvSyx1Q0FBdUMsdUJBQXVCLHVGQUF1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QSxlQUFJLE1BQU0sQ0FBQyxLQUFELENBQVY7QUFBQSxPQUFwQixDQUFiO0FBQ0E7QUFkRjtBQUFBO0FBQUEsV0FnQlcseUJBQWE7QUFDdEIsYUFBTyxLQUFLLE9BQVo7QUFDQTtBQWxCRjs7QUFBQTtBQUFBLEVBQXlDLG1CQUF6Qzs7QUFBcUIsV0FBVyxlQUQvQixtQkFBUyxtQkFBTyxDQUFDLDREQUFELENBQWhCLENBQytCLEdBQVgsV0FBVyxDQUFYO2tCQUFBLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHJCOztBQUNBOztBQUNBOztBQUVBLGlCQUFFLFlBQUs7QUFDTix3QkFBWSxTQUFaLEVBQXVCLENBQUMsZ0JBQUQsRUFBbUIsZ0JBQW5CLEVBQXFDLHFCQUFyQyxFQUE0RCxVQUE1RCxDQUF2QjtBQUNBLE1BQUkscUJBQUosR0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQSxDQUhELEUiLCJmaWxlIjoiYnVuZGxlLXJlcXVlc3QtMWM3MGU1MDNhMDY4MTY2NzY3NTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgandpZD1cXFwiYnV0dG9uXFxcIj5TaG93IGdyZWV0ZXI8L2J1dHRvbj48ZGl2PkhlbGxvcyBkaXNwbGF5ZWQ6IDxzcGFuIGp3aWQ9XFxcImNvdW50XFxcIj48L3NwYW4+PC9kaXY+PGRpdiBqd2lkPVxcXCJncmVldGVyXFxcIj48L2Rpdj48L2Rpdj5cXG5cIjsiLCJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjEgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbnZhciBfX2ltcG9ydERlZmF1bHQgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19pbXBvcnREZWZhdWx0IHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgcmV0dXJuIG1vZCAmJiBtb2QuX19lc01vZHVsZSA/IG1vZCA6IHtcbiAgICBcImRlZmF1bHRcIjogbW9kXG4gIH07XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XG5cbnZhciBUZXh0VXBkYXRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NsYXNzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoVGV4dFVwZGF0ZXIsIF9DbGFzc18xJGRlZmF1bHQpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoVGV4dFVwZGF0ZXIpO1xuXG4gIGZ1bmN0aW9uIFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUZXh0VXBkYXRlcik7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIF90aGlzLmVsID0gZWw7XG4gICAgX3RoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAgIF90aGlzLl91cGRhdGUoKTtcblxuICAgIF90aGlzLm93bihwcm9wZXJ0eS5vbkNoYW5nZS5saXN0ZW4oX3RoaXMuX3VwZGF0ZSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUZXh0VXBkYXRlciwgW3tcbiAgICBrZXk6IFwiX3VwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgICAgdGhpcy5lbC50ZXh0KHRoaXMucHJvcGVydHkuZ2V0KCkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUZXh0VXBkYXRlcjtcbn0oQ2xhc3NfMS5kZWZhdWx0KTtcbi8qKlxyXG4gKiBCaW5kcyBpbm5lciB0ZXh0IG9mIGEgRE9NIGVsZW1lbnQgdG8gYSBzdHJpbmcgJVByb3BlcnR5LlxyXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBwcm9wZXJ0eSBUZXh0IHZhbHVlLlxyXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGJpbmRUZXh0KGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gbmV3IFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRUZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlpYVc1a1ZHVjRkQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGelFrVTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRkhSaXhKUVVGQkxFOUJRVUVzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRkJMRk5CUVVFc1EwRkJRU3hEUVVGQk96dEpRVWROTEZjN096czdPMEZCUTB3c2RVSkJRVzlDTEVWQlFYQkNMRVZCUVc5RUxGRkJRWEJFTEVWQlFUaEZPMEZCUVVFN08wRkJRVUU3TzBGQlF6ZEZPMEZCUkcxQ0xGVkJRVUVzUlVGQlFTeEhRVUZCTEVWQlFVRTdRVUZCWjBNc1ZVRkJRU3hSUVVGQkxFZEJRVUVzVVVGQlFUczdRVUZGYmtRc1ZVRkJTeXhQUVVGTU96dEJRVU5CTEZWQlFVc3NSMEZCVEN4RFFVRlRMRkZCUVZFc1EwRkJReXhSUVVGVUxFTkJRV3RDTEUxQlFXeENMRU5CUVhsQ0xFMUJRVXNzVDBGQk9VSXNaME5CUVZRN08wRkJTRFpGTzBGQlNUZEZPenM3TzFkQlJVOHNiVUpCUVU4N1FVRkRaQ3hYUVVGTExFVkJRVXdzUTBGQlVTeEpRVUZTTEVOQlFXRXNTMEZCU3l4UlFVRk1MRU5CUVdNc1IwRkJaQ3hGUVVGaU8wRkJRMEU3T3pzN1JVRlVkMElzVDBGQlFTeERRVUZCTEU4N1FVRlpNVUk3T3pzN08wRkJTMGM3T3p0QlFVTklMRk5CUVhkQ0xGRkJRWGhDTEVOQlFXbERMRVZCUVdwRExFVkJRWGxFTEZGQlFYcEVMRVZCUVcxR08wRkJRMnhHTEZOQlFVOHNTVUZCU1N4WFFVRktMRU5CUVdkQ0xFVkJRV2hDTEVWQlFXOUNMRkZCUVhCQ0xFTkJRVkE3UVVGRFFUczdRVUZHUkN4UFFVRkJMRU5CUVVFc1QwRkJRU3hIUVVGQkxGRkJRVUVpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHVUVWxVSUV4cFkyVnVjMlZjYmx4dVEyOXdlWEpwWjJoMElDaGpLU0F5TURJeElFVm5iM0lnVG1Wd2IyMXVlV0Z6WTJocGFGeHVYRzVRWlhKdGFYTnphVzl1SUdseklHaGxjbVZpZVNCbmNtRnVkR1ZrTENCbWNtVmxJRzltSUdOb1lYSm5aU3dnZEc4Z1lXNTVJSEJsY25OdmJpQnZZblJoYVc1cGJtY2dZU0JqYjNCNVhHNXZaaUIwYUdseklITnZablIzWVhKbElHRnVaQ0JoYzNOdlkybGhkR1ZrSUdSdlkzVnRaVzUwWVhScGIyNGdabWxzWlhNZ0tIUm9aU0JjSWxOdlpuUjNZWEpsWENJcExDQjBieUJrWldGc1hHNXBiaUIwYUdVZ1UyOW1kSGRoY21VZ2QybDBhRzkxZENCeVpYTjBjbWxqZEdsdmJpd2dhVzVqYkhWa2FXNW5JSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6WEc1MGJ5QjFjMlVzSUdOdmNIa3NJRzF2WkdsbWVTd2diV1Z5WjJVc0lIQjFZbXhwYzJnc0lHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c1hHNWpiM0JwWlhNZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTENCaGJtUWdkRzhnY0dWeWJXbDBJSEJsY25OdmJuTWdkRzhnZDJodmJTQjBhR1VnVTI5bWRIZGhjbVVnYVhOY2JtWjFjbTVwYzJobFpDQjBieUJrYnlCemJ5d2djM1ZpYW1WamRDQjBieUIwYUdVZ1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzVjYmxSb1pTQmhZbTkyWlNCamIzQjVjbWxuYUhRZ2JtOTBhV05sSUdGdVpDQjBhR2x6SUhCbGNtMXBjM05wYjI0Z2JtOTBhV05sSUhOb1lXeHNJR0psSUdsdVkyeDFaR1ZrSUdsdUlHRnNiRnh1WTI5d2FXVnpJRzl5SUhOMVluTjBZVzUwYVdGc0lIQnZjblJwYjI1eklHOW1JSFJvWlNCVGIyWjBkMkZ5WlM1Y2JseHVWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVeUJQVWx4dVNVMVFURWxGUkN3Z1NVNURURlZFU1U1SElFSlZWQ0JPVDFRZ1RFbE5TVlJGUkNCVVR5QlVTRVVnVjBGU1VrRk9WRWxGVXlCUFJpQk5SVkpEU0VGT1ZFRkNTVXhKVkZrc1hHNUdTVlJPUlZOVElFWlBVaUJCSUZCQlVsUkpRMVZNUVZJZ1VGVlNVRTlUUlNCQlRrUWdUazlPU1U1R1VrbE9SMFZOUlU1VUxpQkpUaUJPVHlCRlZrVk9WQ0JUU0VGTVRDQlVTRVZjYmtGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzSUVSQlRVRkhSVk1nVDFJZ1QxUklSVkpjYmt4SlFVSkpURWxVV1N3Z1YwaEZWRWhGVWlCSlRpQkJUaUJCUTFSSlQwNGdUMFlnUTA5T1ZGSkJRMVFzSUZSUFVsUWdUMUlnVDFSSVJWSlhTVk5GTENCQlVrbFRTVTVISUVaU1QwMHNYRzVQVlZRZ1QwWWdUMUlnU1U0Z1EwOU9Ua1ZEVkVsUFRpQlhTVlJJSUZSSVJTQlRUMFpVVjBGU1JTQlBVaUJVU0VVZ1ZWTkZJRTlTSUU5VVNFVlNJRVJGUVV4SlRrZFRJRWxPSUZSSVJWeHVVMDlHVkZkQlVrVXVYRzRxTDF4dVhHNXBiWEJ2Y25RZ1FtbHVaR0ZpYkdVZ1puSnZiU0FuTGk5Q2FXNWtZV0pzWlNjN1hHNXBiWEJ2Y25RZ1EyeGhjM01nWm5KdmJTQW5MaTlEYkdGemN5YzdYRzVwYlhCdmNuUWdSR1Z6ZEhKdmVXRmliR1VnWm5KdmJTQW5MaTlFWlhOMGNtOTVZV0pzWlNjN1hHNWNibU5zWVhOeklGUmxlSFJWY0dSaGRHVnlJR1Y0ZEdWdVpITWdRMnhoYzNNZ2UxeHVYSFJqYjI1emRISjFZM1J2Y2lod2NtbDJZWFJsSUdWc09pQlVaWGgwVlhCa1lYUmxja1ZzWlcxbGJuUXNJSEJ5YVhaaGRHVWdjSEp2Y0dWeWRIazZJRUpwYm1SaFlteGxQSE4wY21sdVp6NHBJSHRjYmx4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEhSb2FYTXVYM1Z3WkdGMFpTZ3BPMXh1WEhSY2RIUm9hWE11YjNkdUtIQnliM0JsY25SNUxtOXVRMmhoYm1kbExteHBjM1JsYmloMGFHbHpMbDkxY0dSaGRHVXNJSFJvYVhNcEtUdGNibHgwZlZ4dVhHNWNkSEJ5YVhaaGRHVWdYM1Z3WkdGMFpTZ3BJSHRjYmx4MFhIUjBhR2x6TG1Wc0xuUmxlSFFvZEdocGN5NXdjbTl3WlhKMGVTNW5aWFFvS1NrN1hHNWNkSDFjYm4xY2JseHVMeW9xWEc0Z0tpQkNhVzVrY3lCcGJtNWxjaUIwWlhoMElHOW1JR0VnUkU5TklHVnNaVzFsYm5RZ2RHOGdZU0J6ZEhKcGJtY2dKVkJ5YjNCbGNuUjVMbHh1SUNvZ1FIQmhjbUZ0SUdWc0lFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUhCeWIzQmxjblI1SUZSbGVIUWdkbUZzZFdVdVhHNGdLaUJBY21WMGRYSnVjeUJDYVc1a2FXNW5JRzlpYW1WamRDNGdXVzkxSUcxMWMzUWdaR1Z6ZEhKdmVTQnBkQ0IwYnlCemRHOXdJSFJvWlNCemVXNWphSEp2Ym1sNllYUnBiMjR1WEc0Z0tpOWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlHSnBibVJVWlhoMEtHVnNPaUJVWlhoMFZYQmtZWFJsY2tWc1pXMWxiblFzSUhCeWIzQmxjblI1T2lCQ2FXNWtZV0pzWlR4emRISnBibWMrS1RvZ1JHVnpkSEp2ZVdGaWJHVWdlMXh1WEhSeVpYUjFjbTRnYm1WM0lGUmxlSFJWY0dSaGRHVnlLR1ZzTENCd2NtOXdaWEowZVNrN1hHNTlYRzVjYm1WNGNHOXlkQ0JwYm5SbGNtWmhZMlVnVkdWNGRGVndaR0YwWlhKRmJHVnRaVzUwSUh0Y2JseDBkR1Y0ZENoMFpYaDBPaUJ6ZEhKcGJtY3BPaUIyYjJsa08xeHVmVnh1SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMSBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2FuY2VsVG9rZW5fMSA9IHJlcXVpcmUoXCIuL0NhbmNlbFRva2VuXCIpO1xuLyoqXHJcbiAqIFByb21pc2Ugd3JhcHBlciBvdmVyIGpRdWVyeSBBSkFYIEFQSSBmdW5jdGlvbnMgd2l0aCBDYW5jZWxUb2tlbiBzdXBwb3J0LiBSZXNvbHZlcyB0aGUgcHJvbWlzZSB3aXRoIHJlcXVlc3QgcmVzdWx0IG9uIGl0c1xyXG4gKiBzdWNjZXNzZnVsIGNvbXBsZXRpb24uIFJlamVjdHMgdGhlIHByb21pc2Ugd2l0aCBYTUxIdHRwUmVxdWVzdCBvbiByZXF1ZXN0IGZhaWx1cmUuIElmIHRoZSBvcGVyYXRpb24gZ2V0c1xyXG4gKiBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0cyByZXNvbHZlZCBvciByZWplY3RlZC5cclxuICogQHBhcmFtIHhociBqUXVlcnkgWE1MIEhUVFAgcmVxdWVzdCB3cmFwcGVyIG9iamVjdC5cclxuICogQHBhcmFtIGNhbmNlbFRva2VuIENhbmNlbGxhdGlvbiB0b2tlbiB0byBiaW5kIHRoZSBvcGVyYXRpb24gdG8uXHJcbiAqIEByZXR1cm5zIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVxdWVzdC5cclxuICovXG5cblxuZnVuY3Rpb24gcmVxdWVzdCh4aHIsIGNhbmNlbFRva2VuKSB7XG4gIHZhciBhYm9ydGVkID0gZmFsc2U7XG4gIHJldHVybiBDYW5jZWxUb2tlbl8xLnJ1bkFzeW5jKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB4aHIudGhlbihyZXNvbHZlLCBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24gKCkge1xuICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgIHhoci5hYm9ydCgpO1xuICB9LCBjYW5jZWxUb2tlbik7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJlcXVlc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OXlaWEYxWlhOMExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVRzN096czdPenM3T3pzN096czdPenM3T3pzN096dEJRWE5DUlRzN096czdPMEZCUlVZc1NVRkJRU3hoUVVGQkxFZEJRVUVzVDBGQlFTeERRVUZCTEdWQlFVRXNRMEZCUVR0QlFVVkJPenM3T3pzN08wRkJUMGM3T3p0QlFVTklMRk5CUVhkQ0xFOUJRWGhDTEVOQlFXZERMRWRCUVdoRExFVkJRV2RFTEZkQlFXaEVMRVZCUVhsRk8wRkJRM2hGTEUxQlFVa3NUMEZCVHl4SFFVRkhMRXRCUVdRN1FVRkRRU3hUUVVGUExHRkJRVUVzUTBGQlFTeFJRVUZCTEVOQlEwNHNWVUZCUXl4UFFVRkVMRVZCUVd0RUxFMUJRV3hFTEVWQlFXMUdPMEZCUTJ4R0xFbEJRVUVzUjBGQlJ5eERRVUZETEVsQlFVb3NRMEZCVXl4UFFVRlVMRVZCUVd0Q0xGVkJRVUVzVDBGQlR5eEZRVUZITzBGQlF6TkNMRlZCUVVrc1EwRkJReXhQUVVGTUxFVkJRV003UVVGRFlpeFJRVUZCTEUxQlFVMHNRMEZCUXl4UFFVRkVMRU5CUVU0N1FVRkRRVHRCUVVORUxFdEJTa1E3UVVGTFFTeEhRVkJMTEVWQlVVNHNXVUZCU3p0QlFVTktMRWxCUVVFc1QwRkJUeXhIUVVGSExFbEJRVlk3UVVGRFFTeEpRVUZCTEVkQlFVY3NRMEZCUXl4TFFVRktPMEZCUTBFc1IwRllTeXhGUVZsT0xGZEJXazBzUTBGQlVEdEJRV05CT3p0QlFXaENSQ3hQUVVGQkxFTkJRVUVzVDBGQlFTeEhRVUZCTEU5QlFVRWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2x4dVRVbFVJRXhwWTJWdWMyVmNibHh1UTI5d2VYSnBaMmgwSUNoaktTQXlNREl4SUVWbmIzSWdUbVZ3YjIxdWVXRnpZMmhwYUZ4dVhHNVFaWEp0YVhOemFXOXVJR2x6SUdobGNtVmllU0JuY21GdWRHVmtMQ0JtY21WbElHOW1JR05vWVhKblpTd2dkRzhnWVc1NUlIQmxjbk52YmlCdlluUmhhVzVwYm1jZ1lTQmpiM0I1WEc1dlppQjBhR2x6SUhOdlpuUjNZWEpsSUdGdVpDQmhjM052WTJsaGRHVmtJR1J2WTNWdFpXNTBZWFJwYjI0Z1ptbHNaWE1nS0hSb1pTQmNJbE52Wm5SM1lYSmxYQ0lwTENCMGJ5QmtaV0ZzWEc1cGJpQjBhR1VnVTI5bWRIZGhjbVVnZDJsMGFHOTFkQ0J5WlhOMGNtbGpkR2x2Yml3Z2FXNWpiSFZrYVc1bklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpYRzUwYnlCMWMyVXNJR052Y0hrc0lHMXZaR2xtZVN3Z2JXVnlaMlVzSUhCMVlteHBjMmdzSUdScGMzUnlhV0oxZEdVc0lITjFZbXhwWTJWdWMyVXNJR0Z1WkM5dmNpQnpaV3hzWEc1amIzQnBaWE1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMQ0JoYm1RZ2RHOGdjR1Z5YldsMElIQmxjbk52Ym5NZ2RHOGdkMmh2YlNCMGFHVWdVMjltZEhkaGNtVWdhWE5jYm1aMWNtNXBjMmhsWkNCMGJ5QmtieUJ6Ynl3Z2MzVmlhbVZqZENCMGJ5QjBhR1VnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNWNibFJvWlNCaFltOTJaU0JqYjNCNWNtbG5hSFFnYm05MGFXTmxJR0Z1WkNCMGFHbHpJSEJsY20xcGMzTnBiMjRnYm05MGFXTmxJSE5vWVd4c0lHSmxJR2x1WTJ4MVpHVmtJR2x1SUdGc2JGeHVZMjl3YVdWeklHOXlJSE4xWW5OMFlXNTBhV0ZzSUhCdmNuUnBiMjV6SUc5bUlIUm9aU0JUYjJaMGQyRnlaUzVjYmx4dVZFaEZJRk5QUmxSWFFWSkZJRWxUSUZCU1QxWkpSRVZFSUZ3aVFWTWdTVk5jSWl3Z1YwbFVTRTlWVkNCWFFWSlNRVTVVV1NCUFJpQkJUbGtnUzBsT1JDd2dSVmhRVWtWVFV5QlBVbHh1U1UxUVRFbEZSQ3dnU1U1RFRGVkVTVTVISUVKVlZDQk9UMVFnVEVsTlNWUkZSQ0JVVHlCVVNFVWdWMEZTVWtGT1ZFbEZVeUJQUmlCTlJWSkRTRUZPVkVGQ1NVeEpWRmtzWEc1R1NWUk9SVk5USUVaUFVpQkJJRkJCVWxSSlExVk1RVklnVUZWU1VFOVRSU0JCVGtRZ1RrOU9TVTVHVWtsT1IwVk5SVTVVTGlCSlRpQk9UeUJGVmtWT1ZDQlRTRUZNVENCVVNFVmNia0ZWVkVoUFVsTWdUMUlnUTA5UVdWSkpSMGhVSUVoUFRFUkZVbE1nUWtVZ1RFbEJRa3hGSUVaUFVpQkJUbGtnUTB4QlNVMHNJRVJCVFVGSFJWTWdUMUlnVDFSSVJWSmNia3hKUVVKSlRFbFVXU3dnVjBoRlZFaEZVaUJKVGlCQlRpQkJRMVJKVDA0Z1QwWWdRMDlPVkZKQlExUXNJRlJQVWxRZ1QxSWdUMVJJUlZKWFNWTkZMQ0JCVWtsVFNVNUhJRVpTVDAwc1hHNVBWVlFnVDBZZ1QxSWdTVTRnUTA5T1RrVkRWRWxQVGlCWFNWUklJRlJJUlNCVFQwWlVWMEZTUlNCUFVpQlVTRVVnVlZORklFOVNJRTlVU0VWU0lFUkZRVXhKVGtkVElFbE9JRlJJUlZ4dVUwOUdWRmRCVWtVdVhHNHFMMXh1WEc1cGJYQnZjblFnUTJGdVkyVnNWRzlyWlc0c0lIdHlkVzVCYzNsdVkzMGdabkp2YlNCY0lpNHZRMkZ1WTJWc1ZHOXJaVzVjSWp0Y2JseHVMeW9xWEc0Z0tpQlFjbTl0YVhObElIZHlZWEJ3WlhJZ2IzWmxjaUJxVVhWbGNua2dRVXBCV0NCQlVFa2dablZ1WTNScGIyNXpJSGRwZEdnZ1EyRnVZMlZzVkc5clpXNGdjM1Z3Y0c5eWRDNGdVbVZ6YjJ4MlpYTWdkR2hsSUhCeWIyMXBjMlVnZDJsMGFDQnlaWEYxWlhOMElISmxjM1ZzZENCdmJpQnBkSE5jYmlBcUlITjFZMk5sYzNObWRXd2dZMjl0Y0d4bGRHbHZiaTRnVW1WcVpXTjBjeUIwYUdVZ2NISnZiV2x6WlNCM2FYUm9JRmhOVEVoMGRIQlNaWEYxWlhOMElHOXVJSEpsY1hWbGMzUWdabUZwYkhWeVpTNGdTV1lnZEdobElHOXdaWEpoZEdsdmJpQm5aWFJ6WEc0Z0tpQmpZVzVqWld4c1pXUWdkbWxoSUhSb1pTQjBiMnRsYml3Z2RHaGxJSEJ5YjIxcGMyVWdibVYyWlhJZ1oyVjBjeUJ5WlhOdmJIWmxaQ0J2Y2lCeVpXcGxZM1JsWkM1Y2JpQXFJRUJ3WVhKaGJTQjRhSElnYWxGMVpYSjVJRmhOVENCSVZGUlFJSEpsY1hWbGMzUWdkM0poY0hCbGNpQnZZbXBsWTNRdVhHNGdLaUJBY0dGeVlXMGdZMkZ1WTJWc1ZHOXJaVzRnUTJGdVkyVnNiR0YwYVc5dUlIUnZhMlZ1SUhSdklHSnBibVFnZEdobElHOXdaWEpoZEdsdmJpQjBieTVjYmlBcUlFQnlaWFIxY201eklGQnliMjFwYzJVZ2IySnFaV04wSUhKbGNISmxjMlZ1ZEdsdVp5QjBhR1VnY21WeGRXVnpkQzVjYmlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z2NtVnhkV1Z6ZENoNGFISTZJRXBSZFdWeWVWaElVaXdnWTJGdVkyVnNWRzlyWlc0L09pQkRZVzVqWld4VWIydGxiaWs2SUZCeWIyMXBjMlU4WVc1NVBpQjdYRzVjZEd4bGRDQmhZbTl5ZEdWa0lEMGdabUZzYzJVN1hHNWNkSEpsZEhWeWJpQnlkVzVCYzNsdVl6eGhibmsrS0Z4dVhIUmNkQ2h5WlhOdmJIWmxPaUFvZG1Gc2RXVS9PaUFvVUhKdmJXbHpaVHhoYm5rK0lId2dZVzU1S1NrZ1BUNGdkbTlwWkN3Z2NtVnFaV04wT2lBb1pYSnliM0kvT2lCaGJua3BJRDArSUhadmFXUXBJRDArSUh0Y2JseDBYSFJjZEhob2NpNTBhR1Z1S0hKbGMyOXNkbVVzSUhKbGNYVmxjM1FnUFQ0Z2UxeHVYSFJjZEZ4MFhIUnBaaUFvSVdGaWIzSjBaV1FwSUh0Y2JseDBYSFJjZEZ4MFhIUnlaV3BsWTNRb2NtVnhkV1Z6ZENrN1hHNWNkRngwWEhSY2RIMWNibHgwWEhSY2RIMHBPMXh1WEhSY2RIMHNYRzVjZEZ4MEtDa2dQVDRnZTF4dVhIUmNkRngwWVdKdmNuUmxaQ0E5SUhSeWRXVTdYRzVjZEZ4MFhIUjRhSEl1WVdKdmNuUW9LVHRjYmx4MFhIUjlMRnh1WEhSY2RHTmhibU5sYkZSdmEyVnVYRzVjZENrN1hHNTlYRzRpWFN3aWMyOTFjbU5sVW05dmRDSTZJaUo5IiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gXCJqd2lkZ2V0L0NhbmNlbFRva2VuXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IElQcm9wZXJ0eSBmcm9tIFwiandpZGdldC9JUHJvcGVydHlcIjtcbmltcG9ydCByZXF1ZXN0IGZyb20gXCJqd2lkZ2V0L3JlcXVlc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheEdyZWV0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgY2FuY2VsVG9rZW4gPSB0aGlzLm93bihuZXcgQ2FuY2VsVG9rZW4oKSk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb3VudDogSVByb3BlcnR5PG51bWJlcj4pIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGFzeW5jIHJlbmRlclJvb3QoZWw6IEpRdWVyeSkge1xuXHRcdGVsLnRleHQoXCJMb2FkaW5nLi4uXCIpO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0KCQuZ2V0KFwicmVxdWVzdC9kYXRhLmpzb25cIiksIHRoaXMuY2FuY2VsVG9rZW4pO1xuXHRcdGVsLnRleHQoZGF0YS5tZXNzYWdlKTtcblx0XHR0aGlzLmNvdW50LnNldCh0aGlzLmNvdW50LmdldCgpICsgMSk7XG5cdH1cbn1cbiIsImltcG9ydCBiaW5kVGV4dCBmcm9tIFwiandpZGdldC9iaW5kVGV4dFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBQcm9wZXJ0eSBmcm9tIFwiandpZGdldC9Qcm9wZXJ0eVwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5pbXBvcnQgQWpheEdyZWV0ZXIgZnJvbSBcIi4vQWpheEdyZWV0ZXJcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmUoXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBjb3VudCA9IG5ldyBQcm9wZXJ0eSgwKTtcblx0cHJpdmF0ZSBncmVldGVyID0gdGhpcy5vd24obmV3IFByb3BlcnR5PENvbXBvbmVudD4oKSkub3duVmFsdWUoKTtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyQnV0dG9uKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGVsLnRleHQoXCJEZXN0cm95IGN1cnJlbnQgZ3JlZXRlciBhbmQgc2hvdyBhIG5ldyBvbmVcIik7XG5cdFx0XHR0aGlzLmdyZWV0ZXIuc2V0KG5ldyBBamF4R3JlZXRlcih0aGlzLmNvdW50KSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyQ291bnQoZWw6IEpRdWVyeSkge1xuXHRcdGJpbmRUZXh0KGVsLCB0aGlzLmNvdW50Lm1hcChjb3VudCA9PiBTdHJpbmcoY291bnQpKSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyR3JlZXRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5ncmVldGVyO1xuXHR9XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgaW5pdEV4YW1wbGUgZnJvbSBcIi4uL2NvbW1vbi9pbml0RXhhbXBsZVwiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL0FwcGxpY2F0aW9uXCI7XG5cbiQoKCkgPT4ge1xuXHRpbml0RXhhbXBsZShcInJlcXVlc3RcIiwgW1wiQWpheEdyZWV0ZXIudHNcIiwgXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJpbmRleC50c1wiXSk7XG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==