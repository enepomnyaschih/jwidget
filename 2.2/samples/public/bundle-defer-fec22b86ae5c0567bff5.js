(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["defer"],{

/***/ "../../main/dist/bindText.js":
/*!********************************************!*\
  !*** C:/jwidget/git/main/dist/bindText.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    _this.own(property.changeEvent.listen(_this._update, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(TextUpdater, [{
    key: "_update",
    value: function _update() {
      this.el[0].textContent = this.property.get();
    }
  }]);

  return TextUpdater;
}(Class_1.default);
/**
 * Watches string property modification and updates inner text of the DOM element.
 * @param el DOM element.
 * @param property Text value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */


function bindText(el, property) {
  return new TextUpdater(el, property);
}

exports.default = bindText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQUEsT0FBQSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0lBR00sVzs7Ozs7QUFDTCx1QkFBb0IsRUFBcEIsRUFBd0MsUUFBeEMsRUFBK0Q7QUFBQTs7QUFBQTs7QUFDOUQ7QUFEbUIsVUFBQSxFQUFBLEdBQUEsRUFBQTtBQUFvQixVQUFBLFFBQUEsR0FBQSxRQUFBOztBQUV2QyxVQUFLLE9BQUw7O0FBQ0EsVUFBSyxHQUFMLENBQVMsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsQ0FBNEIsTUFBSyxPQUFqQyxnQ0FBVDs7QUFIOEQ7QUFJOUQ7Ozs7OEJBRWM7QUFDZCxXQUFLLEVBQUwsQ0FBUSxDQUFSLEVBQVcsV0FBWCxHQUF5QixLQUFLLFFBQUwsQ0FBYyxHQUFkLEVBQXpCO0FBQ0E7Ozs7RUFUd0IsT0FBQSxDQUFBLE87QUFZMUI7Ozs7Ozs7O0FBTUEsU0FBd0IsUUFBeEIsQ0FBaUMsRUFBakMsRUFBNkMsUUFBN0MsRUFBb0U7QUFDbkUsU0FBTyxJQUFJLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsUUFBcEIsQ0FBUDtBQUNBOztBQUZELE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBCaW5kYWJsZSBmcm9tICcuL0JpbmRhYmxlJztcbmltcG9ydCBDbGFzcyBmcm9tICcuL0NsYXNzJztcbmltcG9ydCBEZXN0cm95YWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcblxuY2xhc3MgVGV4dFVwZGF0ZXIgZXh0ZW5kcyBDbGFzcyB7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEpRdWVyeSwgcHJpdmF0ZSBwcm9wZXJ0eTogQmluZGFibGU8YW55Pikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fdXBkYXRlKCk7XG5cdFx0dGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKHRoaXMuX3VwZGF0ZSwgdGhpcykpO1xuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlKCkge1xuXHRcdHRoaXMuZWxbMF0udGV4dENvbnRlbnQgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xuXHR9XG59XG5cbi8qKlxuICogV2F0Y2hlcyBzdHJpbmcgcHJvcGVydHkgbW9kaWZpY2F0aW9uIGFuZCB1cGRhdGVzIGlubmVyIHRleHQgb2YgdGhlIERPTSBlbGVtZW50LlxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRUZXh0KGVsOiBKUXVlcnksIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KTogRGVzdHJveWFibGUge1xuXHRyZXR1cm4gbmV3IFRleHRVcGRhdGVyKGVsLCBwcm9wZXJ0eSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "../../main/dist/defer.js":
/*!*****************************************!*\
  !*** C:/jwidget/git/main/dist/defer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    timeout = window.setTimeout(resolve, ms);
  }, function () {
    clearTimeout(timeout);
  }, cancelToken);
}

exports.default = default_1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUVBOzs7Ozs7Ozs7O0FBUUEsU0FBQSxTQUFBLENBQXlCLEVBQXpCLEVBQXNDLFdBQXRDLEVBQStEO0FBQzlELE1BQUksT0FBSjtBQUNBLFNBQU8sYUFBQSxDQUFBLFFBQUEsQ0FDTixVQUFDLE9BQUQsRUFBc0Q7QUFDckQsSUFBQSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsT0FBbEIsRUFBMkIsRUFBM0IsQ0FBVjtBQUNBLEdBSEssRUFJTixZQUFLO0FBQ0osSUFBQSxZQUFZLENBQUMsT0FBRCxDQUFaO0FBQ0EsR0FOSyxFQU9OLFdBUE0sQ0FBUDtBQVNBOztBQVhELE9BQUEsQ0FBQSxPQUFBLEdBQUEsU0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbmltcG9ydCBDYW5jZWxUb2tlbiwge3J1bkFzeW5jfSBmcm9tIFwiLi9DYW5jZWxUb2tlblwiO1xuXG4vKipcbiAqIFByb21pc2Ugd3JhcHBlciBvdmVyIHNldFRpbWVvdXQgZnVuY3Rpb24gd2l0aCBDYW5jZWxUb2tlbiBzdXBwb3J0LiBSZXNvbHZlcyB0aGUgcHJvbWlzZSBhZnRlciBzcGVjaWZpZWRcbiAqIHBlcmlvZCBvZiB0aW1lLiBOZXZlciByZWplY3RzIHRoZSBwcm9taXNlLiBJZiB0aGUgb3BlcmF0aW9uIGdldHMgY2FuY2VsbGVkIHZpYSB0aGUgdG9rZW4sIHRoZSBwcm9taXNlIG5ldmVyIGdldHNcbiAqIHJlc29sdmVkIG9yIHJlamVjdGVkLlxuICogQHBhcmFtIG1zIFRpbWVvdXQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICogQHBhcmFtIGNhbmNlbFRva2VuIENhbmNlbGxhdGlvbiB0b2tlbiB0byBiaW5kIHRoZSBvcGVyYXRpb24gdG8uXG4gKiBAcmV0dXJucyBQcm9taXNlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRpbWVvdXQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChtcz86IG51bWJlciwgY2FuY2VsVG9rZW4/OiBDYW5jZWxUb2tlbik6IFByb21pc2U8dm9pZD4ge1xuXHRsZXQgdGltZW91dDogbnVtYmVyO1xuXHRyZXR1cm4gcnVuQXN5bmM8dm9pZD4oXG5cdFx0KHJlc29sdmU6ICh2YWx1ZT86IChQcm9taXNlPHZvaWQ+IHwgdm9pZCkpID0+IHZvaWQpID0+IHtcblx0XHRcdHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XG5cdFx0fSxcblx0XHQoKSA9PiB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0fSxcblx0XHRjYW5jZWxUb2tlblxuXHQpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

/***/ "./defer/Application.jw.html":
/*!***********************************!*\
  !*** ./defer/Application.jw.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div><button type=\"button\" jwid=\"button\">Show greeter</button><div>Hellos displayed: <span jwid=\"count\"></span></div><div jwid=\"greeter\"></div></div>\n";

/***/ }),

/***/ "./defer/Application.ts":
/*!******************************!*\
  !*** ./defer/Application.ts ***!
  \******************************/
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

var bindText_1 = __importDefault(__webpack_require__(/*! jwidget/bindText */ "../../main/dist/bindText.js"));

var Component_1 = __importDefault(__webpack_require__(/*! jwidget/Component */ "../../main/dist/Component.js"));

var Property_1 = __importDefault(__webpack_require__(/*! jwidget/Property */ "../../main/dist/Property.js"));

var template_1 = __importDefault(__webpack_require__(/*! jwidget/template */ "../../main/dist/template.js"));

var DelayedGreeter_1 = __importDefault(__webpack_require__(/*! ./DelayedGreeter */ "./defer/DelayedGreeter.ts"));

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
      _this.count = _this.own(new Property_1.default(0));
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
        bindText_1.default(el, this.count);
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
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./defer/DelayedGreeter.ts":
/*!*********************************!*\
  !*** ./defer/DelayedGreeter.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./defer/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("defer", ["DelayedGreeter.ts", "Application.ts", "Application.jw.html", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},[["./defer/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","defer~request~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRUZXh0LmpzIiwid2VicGFjazovLy9DOi9qd2lkZ2V0L2dpdC9tYWluL2Rpc3QvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGVmZXIvQXBwbGljYXRpb24uancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2RlZmVyL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvZGVmZXIvRGVsYXllZEdyZWV0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9kZWZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJCQUEyQiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRXhYLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFOztBQUUzVCw2REFBNkQsc0VBQXNFLDhEQUE4RCxvQkFBb0I7O0FBRXJOLDBDQUEwQywrREFBK0QsMkVBQTJFLEVBQUUseUVBQXlFLGVBQWUsc0RBQXNELEVBQUUsRUFBRSx1REFBdUQ7O0FBRS9YLGdDQUFnQyw0RUFBNEUsaUJBQWlCLFVBQVUsR0FBRyw4QkFBOEI7O0FBRXhLLGdDQUFnQyw2REFBNkQseUNBQXlDLDhDQUE4QyxpQ0FBaUMsbURBQW1ELHlEQUF5RCxFQUFFLE9BQU8sdUNBQXVDLEVBQUUsaURBQWlELEdBQUc7O0FBRXZhLGlEQUFpRCwwRUFBMEUsYUFBYSxFQUFFLHFDQUFxQzs7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SUFBSCxDQUFRLFFBQVI7QUFDQSxxQkFBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQUssS0FBTCxDQUFXLEdBQVgsS0FBbUIsQ0FBbEM7Ozs7Ozs7OztBQUNBOzs7O0VBYjBDLG1COztBQUE1QyxpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLE9BQVosRUFBcUIsQ0FBQyxtQkFBRCxFQUFzQixnQkFBdEIsRUFBd0MscUJBQXhDLEVBQStELFVBQS9ELENBQXJCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRSIsImZpbGUiOiJidW5kbGUtZGVmZXItZmVjMjJiODZhZTVjMDU2N2JmZjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG52YXIgX19pbXBvcnREZWZhdWx0ID0gdm9pZCAwICYmICh2b2lkIDApLl9faW1wb3J0RGVmYXVsdCB8fCBmdW5jdGlvbiAobW9kKSB7XG4gIHJldHVybiBtb2QgJiYgbW9kLl9fZXNNb2R1bGUgPyBtb2QgOiB7XG4gICAgXCJkZWZhdWx0XCI6IG1vZFxuICB9O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xuXG52YXIgVGV4dFVwZGF0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9DbGFzc18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKFRleHRVcGRhdGVyLCBfQ2xhc3NfMSRkZWZhdWx0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFRleHRVcGRhdGVyKTtcblxuICBmdW5jdGlvbiBUZXh0VXBkYXRlcihlbCwgcHJvcGVydHkpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGV4dFVwZGF0ZXIpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5lbCA9IGVsO1xuICAgIF90aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICBfdGhpcy5fdXBkYXRlKCk7XG5cbiAgICBfdGhpcy5vd24ocHJvcGVydHkuY2hhbmdlRXZlbnQubGlzdGVuKF90aGlzLl91cGRhdGUsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV4dFVwZGF0ZXIsIFt7XG4gICAga2V5OiBcIl91cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICAgIHRoaXMuZWxbMF0udGV4dENvbnRlbnQgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUZXh0VXBkYXRlcjtcbn0oQ2xhc3NfMS5kZWZhdWx0KTtcbi8qKlxyXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgdGV4dCBvZiB0aGUgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXHJcbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cclxuICovXG5cblxuZnVuY3Rpb24gYmluZFRleHQoZWwsIHByb3BlcnR5KSB7XG4gIHJldHVybiBuZXcgVGV4dFVwZGF0ZXIoZWwsIHByb3BlcnR5KTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gYmluZFRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OWlhVzVrVkdWNGRDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJlVUpCTEVsQlFVRXNUMEZCUVN4SFFVRkJMR1ZCUVVFc1EwRkJRU3hQUVVGQkxFTkJRVUVzVTBGQlFTeERRVUZCTEVOQlFVRTdPMGxCUjAwc1Z6czdPenM3UVVGRFRDeDFRa0ZCYjBJc1JVRkJjRUlzUlVGQmQwTXNVVUZCZUVNc1JVRkJLMFE3UVVGQlFUczdRVUZCUVRzN1FVRkRPVVE3UVVGRWJVSXNWVUZCUVN4RlFVRkJMRWRCUVVFc1JVRkJRVHRCUVVGdlFpeFZRVUZCTEZGQlFVRXNSMEZCUVN4UlFVRkJPenRCUVVWMlF5eFZRVUZMTEU5QlFVdzdPMEZCUTBFc1ZVRkJTeXhIUVVGTUxFTkJRVk1zVVVGQlVTeERRVUZETEZkQlFWUXNRMEZCY1VJc1RVRkJja0lzUTBGQk5FSXNUVUZCU3l4UFFVRnFReXhuUTBGQlZEczdRVUZJT0VRN1FVRkpPVVE3T3pzN09FSkJSV003UVVGRFpDeFhRVUZMTEVWQlFVd3NRMEZCVVN4RFFVRlNMRVZCUVZjc1YwRkJXQ3hIUVVGNVFpeExRVUZMTEZGQlFVd3NRMEZCWXl4SFFVRmtMRVZCUVhwQ08wRkJRMEU3T3pzN1JVRlVkMElzVDBGQlFTeERRVUZCTEU4N1FVRlpNVUk3T3pzN096czdPMEZCVFVFc1UwRkJkMElzVVVGQmVFSXNRMEZCYVVNc1JVRkJha01zUlVGQk5rTXNVVUZCTjBNc1JVRkJiMFU3UVVGRGJrVXNVMEZCVHl4SlFVRkpMRmRCUVVvc1EwRkJaMElzUlVGQmFFSXNSVUZCYjBJc1VVRkJjRUlzUTBGQlVEdEJRVU5CT3p0QlFVWkVMRTlCUVVFc1EwRkJRU3hQUVVGQkxFZEJRVUVzVVVGQlFTSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxWEc1TlNWUWdUR2xqWlc1elpWeHVYRzVEYjNCNWNtbG5hSFFnS0dNcElESXdNakFnUldkdmNpQk9aWEJ2Ylc1NVlYTmphR2xvWEc1Y2JsQmxjbTFwYzNOcGIyNGdhWE1nYUdWeVpXSjVJR2R5WVc1MFpXUXNJR1p5WldVZ2IyWWdZMmhoY21kbExDQjBieUJoYm5rZ2NHVnljMjl1SUc5aWRHRnBibWx1WnlCaElHTnZjSGxjYm05bUlIUm9hWE1nYzI5bWRIZGhjbVVnWVc1a0lHRnpjMjlqYVdGMFpXUWdaRzlqZFcxbGJuUmhkR2x2YmlCbWFXeGxjeUFvZEdobElGd2lVMjltZEhkaGNtVmNJaWtzSUhSdklHUmxZV3hjYm1sdUlIUm9aU0JUYjJaMGQyRnlaU0IzYVhSb2IzVjBJSEpsYzNSeWFXTjBhVzl1TENCcGJtTnNkV1JwYm1jZ2QybDBhRzkxZENCc2FXMXBkR0YwYVc5dUlIUm9aU0J5YVdkb2RITmNiblJ2SUhWelpTd2dZMjl3ZVN3Z2JXOWthV1o1TENCdFpYSm5aU3dnY0hWaWJHbHphQ3dnWkdsemRISnBZblYwWlN3Z2MzVmliR2xqWlc1elpTd2dZVzVrTDI5eUlITmxiR3hjYm1OdmNHbGxjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXNJR0Z1WkNCMGJ5QndaWEp0YVhRZ2NHVnljMjl1Y3lCMGJ5QjNhRzl0SUhSb1pTQlRiMlowZDJGeVpTQnBjMXh1Wm5WeWJtbHphR1ZrSUhSdklHUnZJSE52TENCemRXSnFaV04wSUhSdklIUm9aU0JtYjJ4c2IzZHBibWNnWTI5dVpHbDBhVzl1Y3pwY2JseHVWR2hsSUdGaWIzWmxJR052Y0hseWFXZG9kQ0J1YjNScFkyVWdZVzVrSUhSb2FYTWdjR1Z5YldsemMybHZiaUJ1YjNScFkyVWdjMmhoYkd3Z1ltVWdhVzVqYkhWa1pXUWdhVzRnWVd4c1hHNWpiM0JwWlhNZ2IzSWdjM1ZpYzNSaGJuUnBZV3dnY0c5eWRHbHZibk1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMbHh1WEc1VVNFVWdVMDlHVkZkQlVrVWdTVk1nVUZKUFZrbEVSVVFnWENKQlV5QkpVMXdpTENCWFNWUklUMVZVSUZkQlVsSkJUbFJaSUU5R0lFRk9XU0JMU1U1RUxDQkZXRkJTUlZOVElFOVNYRzVKVFZCTVNVVkVMQ0JKVGtOTVZVUkpUa2NnUWxWVUlFNVBWQ0JNU1UxSlZFVkVJRlJQSUZSSVJTQlhRVkpTUVU1VVNVVlRJRTlHSUUxRlVrTklRVTVVUVVKSlRFbFVXU3hjYmtaSlZFNUZVMU1nUms5U0lFRWdVRUZTVkVsRFZVeEJVaUJRVlZKUVQxTkZJRUZPUkNCT1QwNUpUa1pTU1U1SFJVMUZUbFF1SUVsT0lFNVBJRVZXUlU1VUlGTklRVXhNSUZSSVJWeHVRVlZVU0U5U1V5QlBVaUJEVDFCWlVrbEhTRlFnU0U5TVJFVlNVeUJDUlNCTVNVRkNURVVnUms5U0lFRk9XU0JEVEVGSlRTd2dSRUZOUVVkRlV5QlBVaUJQVkVoRlVseHVURWxCUWtsTVNWUlpMQ0JYU0VWVVNFVlNJRWxPSUVGT0lFRkRWRWxQVGlCUFJpQkRUMDVVVWtGRFZDd2dWRTlTVkNCUFVpQlBWRWhGVWxkSlUwVXNJRUZTU1ZOSlRrY2dSbEpQVFN4Y2JrOVZWQ0JQUmlCUFVpQkpUaUJEVDA1T1JVTlVTVTlPSUZkSlZFZ2dWRWhGSUZOUFJsUlhRVkpGSUU5U0lGUklSU0JWVTBVZ1QxSWdUMVJJUlZJZ1JFVkJURWxPUjFNZ1NVNGdWRWhGWEc1VFQwWlVWMEZTUlM1Y2Jpb3ZYRzVjYm1sdGNHOXlkQ0JDYVc1a1lXSnNaU0JtY205dElDY3VMMEpwYm1SaFlteGxKenRjYm1sdGNHOXlkQ0JEYkdGemN5Qm1jbTl0SUNjdUwwTnNZWE56Snp0Y2JtbHRjRzl5ZENCRVpYTjBjbTk1WVdKc1pTQm1jbTl0SUNjdUwwUmxjM1J5YjNsaFlteGxKenRjYmx4dVkyeGhjM01nVkdWNGRGVndaR0YwWlhJZ1pYaDBaVzVrY3lCRGJHRnpjeUI3WEc1Y2RHTnZibk4wY25WamRHOXlLSEJ5YVhaaGRHVWdaV3c2SUVwUmRXVnllU3dnY0hKcGRtRjBaU0J3Y205d1pYSjBlVG9nUW1sdVpHRmliR1U4WVc1NVBpa2dlMXh1WEhSY2RITjFjR1Z5S0NrN1hHNWNkRngwZEdocGN5NWZkWEJrWVhSbEtDazdYRzVjZEZ4MGRHaHBjeTV2ZDI0b2NISnZjR1Z5ZEhrdVkyaGhibWRsUlhabGJuUXViR2x6ZEdWdUtIUm9hWE11WDNWd1pHRjBaU3dnZEdocGN5a3BPMXh1WEhSOVhHNWNibHgwY0hKcGRtRjBaU0JmZFhCa1lYUmxLQ2tnZTF4dVhIUmNkSFJvYVhNdVpXeGJNRjB1ZEdWNGRFTnZiblJsYm5RZ1BTQjBhR2x6TG5CeWIzQmxjblI1TG1kbGRDZ3BPMXh1WEhSOVhHNTlYRzVjYmk4cUtseHVJQ29nVjJGMFkyaGxjeUJ6ZEhKcGJtY2djSEp2Y0dWeWRIa2diVzlrYVdacFkyRjBhVzl1SUdGdVpDQjFjR1JoZEdWeklHbHVibVZ5SUhSbGVIUWdiMllnZEdobElFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUdWc0lFUlBUU0JsYkdWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUhCeWIzQmxjblI1SUZSbGVIUWdkbUZzZFdVdVhHNGdLaUJBY21WMGRYSnVjeUJDYVc1a2FXNW5JRzlpYW1WamRDNGdXVzkxSUcxMWMzUWdaR1Z6ZEhKdmVTQnBkQ0IwYnlCemRHOXdJSFJvWlNCemVXNWphSEp2Ym1sNllYUnBiMjR1WEc0Z0tpOWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlHSnBibVJVWlhoMEtHVnNPaUJLVVhWbGNua3NJSEJ5YjNCbGNuUjVPaUJDYVc1a1lXSnNaVHhoYm5rK0tUb2dSR1Z6ZEhKdmVXRmliR1VnZTF4dVhIUnlaWFIxY200Z2JtVjNJRlJsZUhSVmNHUmhkR1Z5S0dWc0xDQndjbTl3WlhKMGVTazdYRzU5WEc0aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSIsIlwidXNlIHN0cmljdFwiO1xuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ2FuY2VsVG9rZW5fMSA9IHJlcXVpcmUoXCIuL0NhbmNlbFRva2VuXCIpO1xuLyoqXHJcbiAqIFByb21pc2Ugd3JhcHBlciBvdmVyIHNldFRpbWVvdXQgZnVuY3Rpb24gd2l0aCBDYW5jZWxUb2tlbiBzdXBwb3J0LiBSZXNvbHZlcyB0aGUgcHJvbWlzZSBhZnRlciBzcGVjaWZpZWRcclxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xyXG4gKiByZXNvbHZlZCBvciByZWplY3RlZC5cclxuICogQHBhcmFtIG1zIFRpbWVvdXQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxyXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cclxuICogQHJldHVybnMgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSB0aW1lb3V0LlxyXG4gKi9cblxuXG5mdW5jdGlvbiBkZWZhdWx0XzEobXMsIGNhbmNlbFRva2VuKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gQ2FuY2VsVG9rZW5fMS5ydW5Bc3luYyhmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XG4gIH0sIGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH0sIGNhbmNlbFRva2VuKTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlrWldabGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRjNRa0VzU1VGQlFTeGhRVUZCTEVkQlFVRXNUMEZCUVN4RFFVRkJMR1ZCUVVFc1EwRkJRVHRCUVVWQk96czdPenM3T3pzN08wRkJVVUVzVTBGQlFTeFRRVUZCTEVOQlFYbENMRVZCUVhwQ0xFVkJRWE5ETEZkQlFYUkRMRVZCUVN0RU8wRkJRemxFTEUxQlFVa3NUMEZCU2p0QlFVTkJMRk5CUVU4c1lVRkJRU3hEUVVGQkxGRkJRVUVzUTBGRFRpeFZRVUZETEU5QlFVUXNSVUZCYzBRN1FVRkRja1FzU1VGQlFTeFBRVUZQTEVkQlFVY3NUVUZCVFN4RFFVRkRMRlZCUVZBc1EwRkJhMElzVDBGQmJFSXNSVUZCTWtJc1JVRkJNMElzUTBGQlZqdEJRVU5CTEVkQlNFc3NSVUZKVGl4WlFVRkxPMEZCUTBvc1NVRkJRU3haUVVGWkxFTkJRVU1zVDBGQlJDeERRVUZhTzBGQlEwRXNSMEZPU3l4RlFVOU9MRmRCVUUwc1EwRkJVRHRCUVZOQk96dEJRVmhFTEU5QlFVRXNRMEZCUVN4UFFVRkJMRWRCUVVFc1UwRkJRU0lzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNU5TVlFnVEdsalpXNXpaVnh1WEc1RGIzQjVjbWxuYUhRZ0tHTXBJREl3TWpBZ1JXZHZjaUJPWlhCdmJXNTVZWE5qYUdsb1hHNWNibEJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhJR052Y0hsY2JtOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxJRndpVTI5bWRIZGhjbVZjSWlrc0lIUnZJR1JsWVd4Y2JtbHVJSFJvWlNCVGIyWjBkMkZ5WlNCM2FYUm9iM1YwSUhKbGMzUnlhV04wYVc5dUxDQnBibU5zZFdScGJtY2dkMmwwYUc5MWRDQnNhVzFwZEdGMGFXOXVJSFJvWlNCeWFXZG9kSE5jYm5SdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN3Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd4Y2JtTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUWdjR1Z5YzI5dWN5QjBieUIzYUc5dElIUm9aU0JUYjJaMGQyRnlaU0JwYzF4dVpuVnlibWx6YUdWa0lIUnZJR1J2SUhOdkxDQnpkV0pxWldOMElIUnZJSFJvWlNCbWIyeHNiM2RwYm1jZ1kyOXVaR2wwYVc5dWN6cGNibHh1VkdobElHRmliM1psSUdOdmNIbHlhV2RvZENCdWIzUnBZMlVnWVc1a0lIUm9hWE1nY0dWeWJXbHpjMmx2YmlCdWIzUnBZMlVnYzJoaGJHd2dZbVVnYVc1amJIVmtaV1FnYVc0Z1lXeHNYRzVqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dVhHNVVTRVVnVTA5R1ZGZEJVa1VnU1ZNZ1VGSlBWa2xFUlVRZ1hDSkJVeUJKVTF3aUxDQlhTVlJJVDFWVUlGZEJVbEpCVGxSWklFOUdJRUZPV1NCTFNVNUVMQ0JGV0ZCU1JWTlRJRTlTWEc1SlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1FsVlVJRTVQVkNCTVNVMUpWRVZFSUZSUElGUklSU0JYUVZKU1FVNVVTVVZUSUU5R0lFMUZVa05JUVU1VVFVSkpURWxVV1N4Y2JrWkpWRTVGVTFNZ1JrOVNJRUVnVUVGU1ZFbERWVXhCVWlCUVZWSlFUMU5GSUVGT1JDQk9UMDVKVGtaU1NVNUhSVTFGVGxRdUlFbE9JRTVQSUVWV1JVNVVJRk5JUVV4TUlGUklSVnh1UVZWVVNFOVNVeUJQVWlCRFQxQlpVa2xIU0ZRZ1NFOU1SRVZTVXlCQ1JTQk1TVUZDVEVVZ1JrOVNJRUZPV1NCRFRFRkpUU3dnUkVGTlFVZEZVeUJQVWlCUFZFaEZVbHh1VEVsQlFrbE1TVlJaTENCWFNFVlVTRVZTSUVsT0lFRk9JRUZEVkVsUFRpQlBSaUJEVDA1VVVrRkRWQ3dnVkU5U1ZDQlBVaUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTeGNiazlWVkNCUFJpQlBVaUJKVGlCRFQwNU9SVU5VU1U5T0lGZEpWRWdnVkVoRklGTlBSbFJYUVZKRklFOVNJRlJJUlNCVlUwVWdUMUlnVDFSSVJWSWdSRVZCVEVsT1IxTWdTVTRnVkVoRlhHNVRUMFpVVjBGU1JTNWNiaW92WEc1Y2JtbHRjRzl5ZENCRFlXNWpaV3hVYjJ0bGJpd2dlM0oxYmtGemVXNWpmU0JtY205dElGd2lMaTlEWVc1alpXeFViMnRsYmx3aU8xeHVYRzR2S2lwY2JpQXFJRkJ5YjIxcGMyVWdkM0poY0hCbGNpQnZkbVZ5SUhObGRGUnBiV1Z2ZFhRZ1puVnVZM1JwYjI0Z2QybDBhQ0JEWVc1alpXeFViMnRsYmlCemRYQndiM0owTGlCU1pYTnZiSFpsY3lCMGFHVWdjSEp2YldselpTQmhablJsY2lCemNHVmphV1pwWldSY2JpQXFJSEJsY21sdlpDQnZaaUIwYVcxbExpQk9aWFpsY2lCeVpXcGxZM1J6SUhSb1pTQndjbTl0YVhObExpQkpaaUIwYUdVZ2IzQmxjbUYwYVc5dUlHZGxkSE1nWTJGdVkyVnNiR1ZrSUhacFlTQjBhR1VnZEc5clpXNHNJSFJvWlNCd2NtOXRhWE5sSUc1bGRtVnlJR2RsZEhOY2JpQXFJSEpsYzI5c2RtVmtJRzl5SUhKbGFtVmpkR1ZrTGx4dUlDb2dRSEJoY21GdElHMXpJRlJwYldWdmRYUWdaSFZ5WVhScGIyNGdhVzRnYldsc2JHbHpaV052Ym1SekxseHVJQ29nUUhCaGNtRnRJR05oYm1ObGJGUnZhMlZ1SUVOaGJtTmxiR3hoZEdsdmJpQjBiMnRsYmlCMGJ5QmlhVzVrSUhSb1pTQnZjR1Z5WVhScGIyNGdkRzh1WEc0Z0tpQkFjbVYwZFhKdWN5QlFjbTl0YVhObElHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUhScGJXVnZkWFF1WEc0Z0tpOWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlDaHRjejg2SUc1MWJXSmxjaXdnWTJGdVkyVnNWRzlyWlc0L09pQkRZVzVqWld4VWIydGxiaWs2SUZCeWIyMXBjMlU4ZG05cFpENGdlMXh1WEhSc1pYUWdkR2x0Wlc5MWREb2diblZ0WW1WeU8xeHVYSFJ5WlhSMWNtNGdjblZ1UVhONWJtTThkbTlwWkQ0b1hHNWNkRngwS0hKbGMyOXNkbVU2SUNoMllXeDFaVDg2SUNoUWNtOXRhWE5sUEhadmFXUStJSHdnZG05cFpDa3BJRDArSUhadmFXUXBJRDArSUh0Y2JseDBYSFJjZEhScGJXVnZkWFFnUFNCM2FXNWtiM2N1YzJWMFZHbHRaVzkxZENoeVpYTnZiSFpsTENCdGN5azdYRzVjZEZ4MGZTeGNibHgwWEhRb0tTQTlQaUI3WEc1Y2RGeDBYSFJqYkdWaGNsUnBiV1Z2ZFhRb2RHbHRaVzkxZENrN1hHNWNkRngwZlN4Y2JseDBYSFJqWVc1alpXeFViMnRsYmx4dVhIUXBPMXh1ZlZ4dUlsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgandpZD1cXFwiYnV0dG9uXFxcIj5TaG93IGdyZWV0ZXI8L2J1dHRvbj48ZGl2PkhlbGxvcyBkaXNwbGF5ZWQ6IDxzcGFuIGp3aWQ9XFxcImNvdW50XFxcIj48L3NwYW4+PC9kaXY+PGRpdiBqd2lkPVxcXCJncmVldGVyXFxcIj48L2Rpdj48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgYmluZFRleHQgZnJvbSBcImp3aWRnZXQvYmluZFRleHRcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgUHJvcGVydHkgZnJvbSBcImp3aWRnZXQvUHJvcGVydHlcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiandpZGdldC90ZW1wbGF0ZVwiO1xuaW1wb3J0IERlbGF5ZWRHcmVldGVyIGZyb20gXCIuL0RlbGF5ZWRHcmVldGVyXCI7XG5cbkB0ZW1wbGF0ZShyZXF1aXJlPHN0cmluZz4oXCIuL0FwcGxpY2F0aW9uLmp3Lmh0bWxcIikpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBjb3VudCA9IHRoaXMub3duKG5ldyBQcm9wZXJ0eSgwKSk7XG5cdHByaXZhdGUgZ3JlZXRlciA9IHRoaXMub3duKG5ldyBQcm9wZXJ0eTxDb21wb25lbnQ+KCkpLm93blZhbHVlKCk7XG5cblx0cHJvdGVjdGVkIHJlbmRlckJ1dHRvbihlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRlbC50ZXh0KFwiRGVzdHJveSBjdXJyZW50IGdyZWV0ZXIgYW5kIHNob3cgYSBuZXcgb25lXCIpO1xuXHRcdFx0dGhpcy5ncmVldGVyLnNldChuZXcgRGVsYXllZEdyZWV0ZXIodGhpcy5jb3VudCkpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckNvdW50KGVsOiBKUXVlcnkpIHtcblx0XHRiaW5kVGV4dChlbCwgdGhpcy5jb3VudCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyR3JlZXRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5ncmVldGVyO1xuXHR9XG59XG4iLCJpbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSBcImp3aWRnZXQvQ2FuY2VsVG9rZW5cIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcImp3aWRnZXQvQ29tcG9uZW50XCI7XG5pbXBvcnQgZGVmZXIgZnJvbSBcImp3aWRnZXQvZGVmZXJcIjtcbmltcG9ydCBJUHJvcGVydHkgZnJvbSBcImp3aWRnZXQvSVByb3BlcnR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGF5ZWRHcmVldGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIGNhbmNlbFRva2VuID0gdGhpcy5vd24obmV3IENhbmNlbFRva2VuKCkpO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgY291bnQ6IElQcm9wZXJ0eTxudW1iZXI+KSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBhc3luYyByZW5kZXJSb290KGVsOiBKUXVlcnkpIHtcblx0XHRlbC50ZXh0KFwiV2FpdC4uLlwiKTtcblx0XHRhd2FpdCBkZWZlcigxMDAwLCB0aGlzLmNhbmNlbFRva2VuKTtcblx0XHRlbC50ZXh0KFwiSGVsbG8hXCIpO1xuXHRcdHRoaXMuY291bnQuc2V0KHRoaXMuY291bnQuZ2V0KCkgKyAxKTtcblx0fVxufVxuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGluaXRFeGFtcGxlIGZyb20gXCIuLi9jb21tb24vaW5pdEV4YW1wbGVcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9BcHBsaWNhdGlvblwiO1xuXG4kKCgpID0+IHtcblx0aW5pdEV4YW1wbGUoXCJkZWZlclwiLCBbXCJEZWxheWVkR3JlZXRlci50c1wiLCBcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9