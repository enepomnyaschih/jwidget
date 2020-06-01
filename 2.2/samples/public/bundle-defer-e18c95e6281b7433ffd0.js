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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));
class TextUpdater extends Class_1.default {
    constructor(el, property) {
        super();
        this.el = el;
        this.property = property;
        this._update();
        this.own(property.changeEvent.listen(this._update, this));
    }
    _update() {
        this.el[0].textContent = this.property.get();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZFRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYmluZFRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0JFOzs7OztBQUdGLG9EQUE0QjtBQUc1QixNQUFNLFdBQVksU0FBUSxlQUFLO0lBQzlCLFlBQW9CLEVBQVUsRUFBVSxRQUF1QjtRQUM5RCxLQUFLLEVBQUUsQ0FBQztRQURXLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFlO1FBRTlELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxPQUFPO1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0Q7QUFFRDs7Ozs7R0FLRztBQUNILFNBQXdCLFFBQVEsQ0FBQyxFQUFVLEVBQUUsUUFBdUI7SUFDbkUsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUZELDJCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IEJpbmRhYmxlIGZyb20gJy4vQmluZGFibGUnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vQ2xhc3MnO1xuaW1wb3J0IERlc3Ryb3lhYmxlIGZyb20gJy4vRGVzdHJveWFibGUnO1xuXG5jbGFzcyBUZXh0VXBkYXRlciBleHRlbmRzIENsYXNzIHtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbDogSlF1ZXJ5LCBwcml2YXRlIHByb3BlcnR5OiBCaW5kYWJsZTxhbnk+KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHR0aGlzLm93bihwcm9wZXJ0eS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGUoKSB7XG5cdFx0dGhpcy5lbFswXS50ZXh0Q29udGVudCA9IHRoaXMucHJvcGVydHkuZ2V0KCk7XG5cdH1cbn1cblxuLyoqXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgdGV4dCBvZiB0aGUgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gcHJvcGVydHkgVGV4dCB2YWx1ZS5cbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFRleHQoZWw6IEpRdWVyeSwgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pOiBEZXN0cm95YWJsZSB7XG5cdHJldHVybiBuZXcgVGV4dFVwZGF0ZXIoZWwsIHByb3BlcnR5KTtcbn1cbiJdfQ==

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
Object.defineProperty(exports, "__esModule", { value: true });
const CancelToken_1 = __webpack_require__(/*! ./CancelToken */ "../../main/dist/CancelToken.js");
/**
 * Promise wrapper over setTimeout function with CancelToken support. Resolves the promise after specified
 * period of time. Never rejects the promise. If the operation gets cancelled via the token, the promise never gets
 * resolved or rejected.
 * @param ms Timeout duration in milliseconds.
 * @param cancelToken Cancellation token to bind the operation to.
 * @returns Promise object representing the timeout.
 */
function default_1(ms, cancelToken) {
    let timeout;
    return CancelToken_1.runAsync((resolve) => {
        timeout = window.setTimeout(resolve, ms);
    }, () => {
        clearTimeout(timeout);
    }, cancelToken);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0JFOztBQUVGLCtDQUFvRDtBQUVwRDs7Ozs7OztHQU9HO0FBQ0gsbUJBQXlCLEVBQVcsRUFBRSxXQUF5QjtJQUM5RCxJQUFJLE9BQWUsQ0FBQztJQUNwQixPQUFPLHNCQUFRLENBQ2QsQ0FBQyxPQUFpRCxFQUFFLEVBQUU7UUFDckQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUMsRUFDRCxHQUFHLEVBQUU7UUFDSixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxFQUNELFdBQVcsQ0FDWCxDQUFDO0FBQ0gsQ0FBQztBQVhELDRCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IENhbmNlbFRva2VuLCB7cnVuQXN5bmN9IGZyb20gXCIuL0NhbmNlbFRva2VuXCI7XG5cbi8qKlxuICogUHJvbWlzZSB3cmFwcGVyIG92ZXIgc2V0VGltZW91dCBmdW5jdGlvbiB3aXRoIENhbmNlbFRva2VuIHN1cHBvcnQuIFJlc29sdmVzIHRoZSBwcm9taXNlIGFmdGVyIHNwZWNpZmllZFxuICogcGVyaW9kIG9mIHRpbWUuIE5ldmVyIHJlamVjdHMgdGhlIHByb21pc2UuIElmIHRoZSBvcGVyYXRpb24gZ2V0cyBjYW5jZWxsZWQgdmlhIHRoZSB0b2tlbiwgdGhlIHByb21pc2UgbmV2ZXIgZ2V0c1xuICogcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXG4gKiBAcGFyYW0gbXMgVGltZW91dCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0gY2FuY2VsVG9rZW4gQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGJpbmQgdGhlIG9wZXJhdGlvbiB0by5cbiAqIEByZXR1cm5zIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdGltZW91dC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG1zPzogbnVtYmVyLCBjYW5jZWxUb2tlbj86IENhbmNlbFRva2VuKTogUHJvbWlzZTx2b2lkPiB7XG5cdGxldCB0aW1lb3V0OiBudW1iZXI7XG5cdHJldHVybiBydW5Bc3luYzx2b2lkPihcblx0XHQocmVzb2x2ZTogKHZhbHVlPzogKFByb21pc2U8dm9pZD4gfCB2b2lkKSkgPT4gdm9pZCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcblx0XHR9LFxuXHRcdCgpID0+IHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR9LFxuXHRcdGNhbmNlbFRva2VuXG5cdCk7XG59XG4iXX0=

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRUZXh0LmpzIiwid2VicGFjazovLy9DOi9qd2lkZ2V0L2dpdC9tYWluL2Rpc3QvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGVmZXIvQXBwbGljYXRpb24uancuaHRtbCIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL2RlZmVyL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvZGVmZXIvRGVsYXllZEdyZWV0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9kZWZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGdDQUFnQyxtQkFBTyxDQUFDLHlDQUFTO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG0xRzs7Ozs7Ozs7Ozs7O0FDbkQ5QjtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELHNCQUFzQixtQkFBTyxDQUFDLHFEQUFlO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMkNBQTJDLHVtRzs7Ozs7Ozs7Ozs7QUMzQzNDLG1MOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBO0FBQUE7QUFBQTtBQUFBLE1BQXFCLFdBQXJCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7O0FBRVMsb0JBQVEsTUFBSyxHQUFMLENBQVMsSUFBSSxrQkFBSixDQUFhLENBQWIsQ0FBVCxDQUFSO0FBQ0Esc0JBQVUsTUFBSyxHQUFMLENBQVMsSUFBSSxrQkFBSixFQUFULEVBQW9DLFFBQXBDLEVBQVY7QUFIVDtBQW1CQzs7QUFuQkQ7QUFBQTtBQUFBLG1DQUt3QixFQUx4QixFQUtrQztBQUFBOztBQUNoQyxVQUFFLENBQUMsRUFBSCxDQUFNLE9BQU4sRUFBZSxZQUFLO0FBQ25CLFlBQUUsQ0FBQyxJQUFILENBQVEsNENBQVI7O0FBQ0EsZ0JBQUksQ0FBQyxPQUFMLENBQWEsR0FBYixDQUFpQixJQUFJLHdCQUFKLENBQW1CLE1BQUksQ0FBQyxLQUF4QixDQUFqQjtBQUNBLFNBSEQ7QUFJQTtBQVZGO0FBQUE7QUFBQSxrQ0FZdUIsRUFadkIsRUFZaUM7QUFDL0IsMkJBQVMsRUFBVCxFQUFhLEtBQUssS0FBbEI7QUFDQTtBQWRGO0FBQUE7QUFBQSxzQ0FnQndCO0FBQ3RCLGVBQU8sS0FBSyxPQUFaO0FBQ0E7QUFsQkY7O0FBQUE7QUFBQSxJQUF5QyxtQkFBekM7O0FBQXFCLGFBQVcsZUFEL0IsbUJBQVMsbUJBQU8sQ0FBUywwREFBVCxDQUFoQixDQUMrQixHQUFYLFdBQVcsQ0FBWDtBQW1CckI7QUFBQyxDQW5CRDs7a0JBQXFCLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ByQjs7QUFDQTs7QUFDQTs7SUFHcUIsYzs7Ozs7QUFJcEIsMEJBQW9CLEtBQXBCLEVBQTRDO0FBQUE7O0FBQUE7O0FBQzNDO0FBRG1CO0FBRlosd0JBQWMsTUFBSyxHQUFMLENBQVMsSUFBSSxxQkFBSixFQUFULENBQWQ7QUFFb0M7QUFFM0M7Ozs7K0JBRTBCLEUsRUFBVTs7Ozs7O0FBQ3BDLGtCQUFFLENBQUMsSUFBSCxDQUFRLFNBQVI7O0FBQ0EsdUJBQU0sZ0JBQU0sSUFBTixFQUFZLEtBQUssV0FBakIsQ0FBTjs7O0FBQ0Esa0JBQUUsQ0FBQyxJQUFILENBQVEsUUFBUjtBQUNBLHFCQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBSyxLQUFMLENBQVcsR0FBWCxLQUFtQixDQUFsQzs7Ozs7Ozs7O0FBQ0E7Ozs7RUFiMEMsbUI7O0FBQTVDLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7QUFDQTs7QUFDQTs7QUFFQSxpQkFBRSxZQUFLO0FBQ04sd0JBQVksT0FBWixFQUFxQixDQUFDLG1CQUFELEVBQXNCLGdCQUF0QixFQUF3QyxxQkFBeEMsRUFBK0QsVUFBL0QsQ0FBckI7QUFDQSxNQUFJLHFCQUFKLEdBQWtCLFFBQWxCLENBQTJCLE1BQTNCO0FBQ0EsQ0FIRCxFIiwiZmlsZSI6ImJ1bmRsZS1kZWZlci1lMThjOTVlNjI4MWI3NDMzZmZkMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XHJcbmNsYXNzIFRleHRVcGRhdGVyIGV4dGVuZHMgQ2xhc3NfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB0aGlzLl91cGRhdGUoKTtcclxuICAgICAgICB0aGlzLm93bihwcm9wZXJ0eS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBfdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZWxbMF0udGV4dENvbnRlbnQgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgdGV4dCBvZiB0aGUgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXHJcbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIGJpbmRUZXh0KGVsLCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIG5ldyBUZXh0VXBkYXRlcihlbCwgcHJvcGVydHkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRUZXh0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZbWx1WkZSbGVIUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12WW1sdVpGUmxlSFF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBWQmMwSkZPenM3T3p0QlFVZEdMRzlFUVVFMFFqdEJRVWMxUWl4TlFVRk5MRmRCUVZrc1UwRkJVU3hsUVVGTE8wbEJRemxDTEZsQlFXOUNMRVZCUVZVc1JVRkJWU3hSUVVGMVFqdFJRVU01UkN4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVSWExFOUJRVVVzUjBGQlJpeEZRVUZGTEVOQlFWRTdVVUZCVlN4aFFVRlJMRWRCUVZJc1VVRkJVU3hEUVVGbE8xRkJSVGxFTEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRSUVVObUxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRmRCUVZjc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRek5FTEVOQlFVTTdTVUZGVHl4UFFVRlBPMUZCUTJRc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0SlFVTTVReXhEUVVGRE8wTkJRMFE3UVVGRlJEczdPenM3UjBGTFJ6dEJRVU5JTEZOQlFYZENMRkZCUVZFc1EwRkJReXhGUVVGVkxFVkJRVVVzVVVGQmRVSTdTVUZEYmtVc1QwRkJUeXhKUVVGSkxGZEJRVmNzUTBGQlF5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRkRU1zUTBGQlF6dEJRVVpFTERKQ1FVVkRJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlwY2JrMUpWQ0JNYVdObGJuTmxYRzVjYmtOdmNIbHlhV2RvZENBb1l5a2dNakF5TUNCRloyOXlJRTVsY0c5dGJubGhjMk5vYVdoY2JseHVVR1Z5YldsemMybHZiaUJwY3lCb1pYSmxZbmtnWjNKaGJuUmxaQ3dnWm5KbFpTQnZaaUJqYUdGeVoyVXNJSFJ2SUdGdWVTQndaWEp6YjI0Z2IySjBZV2x1YVc1bklHRWdZMjl3ZVZ4dWIyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVWdYQ0pUYjJaMGQyRnlaVndpS1N3Z2RHOGdaR1ZoYkZ4dWFXNGdkR2hsSUZOdlpuUjNZWEpsSUhkcGRHaHZkWFFnY21WemRISnBZM1JwYjI0c0lHbHVZMngxWkdsdVp5QjNhWFJvYjNWMElHeHBiV2wwWVhScGIyNGdkR2hsSUhKcFoyaDBjMXh1ZEc4Z2RYTmxMQ0JqYjNCNUxDQnRiMlJwWm5rc0lHMWxjbWRsTENCd2RXSnNhWE5vTENCa2FYTjBjbWxpZFhSbExDQnpkV0pzYVdObGJuTmxMQ0JoYm1RdmIzSWdjMlZzYkZ4dVkyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRDQndaWEp6YjI1eklIUnZJSGRvYjIwZ2RHaGxJRk52Wm5SM1lYSmxJR2x6WEc1bWRYSnVhWE5vWldRZ2RHOGdaRzhnYzI4c0lITjFZbXBsWTNRZ2RHOGdkR2hsSUdadmJHeHZkMmx1WnlCamIyNWthWFJwYjI1ek9seHVYRzVVYUdVZ1lXSnZkbVVnWTI5d2VYSnBaMmgwSUc1dmRHbGpaU0JoYm1RZ2RHaHBjeUJ3WlhKdGFYTnphVzl1SUc1dmRHbGpaU0J6YUdGc2JDQmlaU0JwYm1Oc2RXUmxaQ0JwYmlCaGJHeGNibU52Y0dsbGN5QnZjaUJ6ZFdKemRHRnVkR2xoYkNCd2IzSjBhVzl1Y3lCdlppQjBhR1VnVTI5bWRIZGhjbVV1WEc1Y2JsUklSU0JUVDBaVVYwRlNSU0JKVXlCUVVrOVdTVVJGUkNCY0lrRlRJRWxUWENJc0lGZEpWRWhQVlZRZ1YwRlNVa0ZPVkZrZ1QwWWdRVTVaSUV0SlRrUXNJRVZZVUZKRlUxTWdUMUpjYmtsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBZZ1RVVlNRMGhCVGxSQlFrbE1TVlJaTEZ4dVJrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzVCVlZSSVQxSlRJRTlTSUVOUFVGbFNTVWRJVkNCSVQweEVSVkpUSUVKRklFeEpRVUpNUlNCR1QxSWdRVTVaSUVOTVFVbE5MQ0JFUVUxQlIwVlRJRTlTSUU5VVNFVlNYRzVNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxGeHVUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUaUJVU0VWY2JsTlBSbFJYUVZKRkxseHVLaTljYmx4dWFXMXdiM0owSUVKcGJtUmhZbXhsSUdaeWIyMGdKeTR2UW1sdVpHRmliR1VuTzF4dWFXMXdiM0owSUVOc1lYTnpJR1p5YjIwZ0p5NHZRMnhoYzNNbk8xeHVhVzF3YjNKMElFUmxjM1J5YjNsaFlteGxJR1p5YjIwZ0p5NHZSR1Z6ZEhKdmVXRmliR1VuTzF4dVhHNWpiR0Z6Y3lCVVpYaDBWWEJrWVhSbGNpQmxlSFJsYm1SeklFTnNZWE56SUh0Y2JseDBZMjl1YzNSeWRXTjBiM0lvY0hKcGRtRjBaU0JsYkRvZ1NsRjFaWEo1TENCd2NtbDJZWFJsSUhCeWIzQmxjblI1T2lCQ2FXNWtZV0pzWlR4aGJuaytLU0I3WEc1Y2RGeDBjM1Z3WlhJb0tUdGNibHgwWEhSMGFHbHpMbDkxY0dSaGRHVW9LVHRjYmx4MFhIUjBhR2x6TG05M2JpaHdjbTl3WlhKMGVTNWphR0Z1WjJWRmRtVnVkQzVzYVhOMFpXNG9kR2hwY3k1ZmRYQmtZWFJsTENCMGFHbHpLU2s3WEc1Y2RIMWNibHh1WEhSd2NtbDJZWFJsSUY5MWNHUmhkR1VvS1NCN1hHNWNkRngwZEdocGN5NWxiRnN3WFM1MFpYaDBRMjl1ZEdWdWRDQTlJSFJvYVhNdWNISnZjR1Z5ZEhrdVoyVjBLQ2s3WEc1Y2RIMWNibjFjYmx4dUx5b3FYRzRnS2lCWFlYUmphR1Z6SUhOMGNtbHVaeUJ3Y205d1pYSjBlU0J0YjJScFptbGpZWFJwYjI0Z1lXNWtJSFZ3WkdGMFpYTWdhVzV1WlhJZ2RHVjRkQ0J2WmlCMGFHVWdSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ1pXd2dSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ2NISnZjR1Z5ZEhrZ1ZHVjRkQ0IyWVd4MVpTNWNiaUFxSUVCeVpYUjFjbTV6SUVKcGJtUnBibWNnYjJKcVpXTjBMaUJaYjNVZ2JYVnpkQ0JrWlhOMGNtOTVJR2wwSUhSdklITjBiM0FnZEdobElITjVibU5vY205dWFYcGhkR2x2Ymk1Y2JpQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdZbWx1WkZSbGVIUW9aV3c2SUVwUmRXVnllU3dnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEdGdWVUNHBPaUJFWlhOMGNtOTVZV0pzWlNCN1hHNWNkSEpsZEhWeWJpQnVaWGNnVkdWNGRGVndaR0YwWlhJb1pXd3NJSEJ5YjNCbGNuUjVLVHRjYm4xY2JpSmRmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW5jZWxUb2tlbl8xID0gcmVxdWlyZShcIi4vQ2FuY2VsVG9rZW5cIik7XHJcbi8qKlxyXG4gKiBQcm9taXNlIHdyYXBwZXIgb3ZlciBzZXRUaW1lb3V0IGZ1bmN0aW9uIHdpdGggQ2FuY2VsVG9rZW4gc3VwcG9ydC4gUmVzb2x2ZXMgdGhlIHByb21pc2UgYWZ0ZXIgc3BlY2lmaWVkXHJcbiAqIHBlcmlvZCBvZiB0aW1lLiBOZXZlciByZWplY3RzIHRoZSBwcm9taXNlLiBJZiB0aGUgb3BlcmF0aW9uIGdldHMgY2FuY2VsbGVkIHZpYSB0aGUgdG9rZW4sIHRoZSBwcm9taXNlIG5ldmVyIGdldHNcclxuICogcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXHJcbiAqIEBwYXJhbSBtcyBUaW1lb3V0IGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcy5cclxuICogQHBhcmFtIGNhbmNlbFRva2VuIENhbmNlbGxhdGlvbiB0b2tlbiB0byBiaW5kIHRoZSBvcGVyYXRpb24gdG8uXHJcbiAqIEByZXR1cm5zIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdGltZW91dC5cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRfMShtcywgY2FuY2VsVG9rZW4pIHtcclxuICAgIGxldCB0aW1lb3V0O1xyXG4gICAgcmV0dXJuIENhbmNlbFRva2VuXzEucnVuQXN5bmMoKHJlc29sdmUpID0+IHtcclxuICAgICAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH0sIGNhbmNlbFRva2VuKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpHVm1aWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlpHVm1aWEl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBWQmMwSkZPenRCUVVWR0xDdERRVUZ2UkR0QlFVVndSRHM3T3pzN096dEhRVTlITzBGQlEwZ3NiVUpCUVhsQ0xFVkJRVmNzUlVGQlJTeFhRVUY1UWp0SlFVTTVSQ3hKUVVGSkxFOUJRV1VzUTBGQlF6dEpRVU53UWl4UFFVRlBMSE5DUVVGUkxFTkJRMlFzUTBGQlF5eFBRVUZwUkN4RlFVRkZMRVZCUVVVN1VVRkRja1FzVDBGQlR5eEhRVUZITEUxQlFVMHNRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzBsQlF6RkRMRU5CUVVNc1JVRkRSQ3hIUVVGSExFVkJRVVU3VVVGRFNpeFpRVUZaTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRka0lzUTBGQlF5eEZRVU5FTEZkQlFWY3NRMEZEV0N4RFFVRkRPMEZCUTBnc1EwRkJRenRCUVZoRUxEUkNRVmRESWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5cGNiazFKVkNCTWFXTmxibk5sWEc1Y2JrTnZjSGx5YVdkb2RDQW9ZeWtnTWpBeU1DQkZaMjl5SUU1bGNHOXRibmxoYzJOb2FXaGNibHh1VUdWeWJXbHpjMmx2YmlCcGN5Qm9aWEpsWW5rZ1ozSmhiblJsWkN3Z1puSmxaU0J2WmlCamFHRnlaMlVzSUhSdklHRnVlU0J3WlhKemIyNGdiMkowWVdsdWFXNW5JR0VnWTI5d2VWeHViMllnZEdocGN5QnpiMlowZDJGeVpTQmhibVFnWVhOemIyTnBZWFJsWkNCa2IyTjFiV1Z1ZEdGMGFXOXVJR1pwYkdWeklDaDBhR1VnWENKVGIyWjBkMkZ5WlZ3aUtTd2dkRzhnWkdWaGJGeHVhVzRnZEdobElGTnZablIzWVhKbElIZHBkR2h2ZFhRZ2NtVnpkSEpwWTNScGIyNHNJR2x1WTJ4MVpHbHVaeUIzYVhSb2IzVjBJR3hwYldsMFlYUnBiMjRnZEdobElISnBaMmgwYzF4dWRHOGdkWE5sTENCamIzQjVMQ0J0YjJScFpua3NJRzFsY21kbExDQndkV0pzYVhOb0xDQmthWE4wY21saWRYUmxMQ0J6ZFdKc2FXTmxibk5sTENCaGJtUXZiM0lnYzJWc2JGeHVZMjl3YVdWeklHOW1JSFJvWlNCVGIyWjBkMkZ5WlN3Z1lXNWtJSFJ2SUhCbGNtMXBkQ0J3WlhKemIyNXpJSFJ2SUhkb2IyMGdkR2hsSUZOdlpuUjNZWEpsSUdselhHNW1kWEp1YVhOb1pXUWdkRzhnWkc4Z2MyOHNJSE4xWW1wbFkzUWdkRzhnZEdobElHWnZiR3h2ZDJsdVp5QmpiMjVrYVhScGIyNXpPbHh1WEc1VWFHVWdZV0p2ZG1VZ1kyOXdlWEpwWjJoMElHNXZkR2xqWlNCaGJtUWdkR2hwY3lCd1pYSnRhWE56YVc5dUlHNXZkR2xqWlNCemFHRnNiQ0JpWlNCcGJtTnNkV1JsWkNCcGJpQmhiR3hjYm1OdmNHbGxjeUJ2Y2lCemRXSnpkR0Z1ZEdsaGJDQndiM0owYVc5dWN5QnZaaUIwYUdVZ1UyOW1kSGRoY21VdVhHNWNibFJJUlNCVFQwWlVWMEZTUlNCSlV5QlFVazlXU1VSRlJDQmNJa0ZUSUVsVFhDSXNJRmRKVkVoUFZWUWdWMEZTVWtGT1ZGa2dUMFlnUVU1WklFdEpUa1FzSUVWWVVGSkZVMU1nVDFKY2JrbE5VRXhKUlVRc0lFbE9RMHhWUkVsT1J5QkNWVlFnVGs5VUlFeEpUVWxVUlVRZ1ZFOGdWRWhGSUZkQlVsSkJUbFJKUlZNZ1QwWWdUVVZTUTBoQlRsUkJRa2xNU1ZSWkxGeHVSa2xVVGtWVFV5QkdUMUlnUVNCUVFWSlVTVU5WVEVGU0lGQlZVbEJQVTBVZ1FVNUVJRTVQVGtsT1JsSkpUa2RGVFVWT1ZDNGdTVTRnVGs4Z1JWWkZUbFFnVTBoQlRFd2dWRWhGWEc1QlZWUklUMUpUSUU5U0lFTlBVRmxTU1VkSVZDQklUMHhFUlZKVElFSkZJRXhKUVVKTVJTQkdUMUlnUVU1WklFTk1RVWxOTENCRVFVMUJSMFZUSUU5U0lFOVVTRVZTWEc1TVNVRkNTVXhKVkZrc0lGZElSVlJJUlZJZ1NVNGdRVTRnUVVOVVNVOU9JRTlHSUVOUFRsUlNRVU5VTENCVVQxSlVJRTlTSUU5VVNFVlNWMGxUUlN3Z1FWSkpVMGxPUnlCR1VrOU5MRnh1VDFWVUlFOUdJRTlTSUVsT0lFTlBUazVGUTFSSlQwNGdWMGxVU0NCVVNFVWdVMDlHVkZkQlVrVWdUMUlnVkVoRklGVlRSU0JQVWlCUFZFaEZVaUJFUlVGTVNVNUhVeUJKVGlCVVNFVmNibE5QUmxSWFFWSkZMbHh1S2k5Y2JseHVhVzF3YjNKMElFTmhibU5sYkZSdmEyVnVMQ0I3Y25WdVFYTjVibU45SUdaeWIyMGdYQ0l1TDBOaGJtTmxiRlJ2YTJWdVhDSTdYRzVjYmk4cUtseHVJQ29nVUhKdmJXbHpaU0IzY21Gd2NHVnlJRzkyWlhJZ2MyVjBWR2x0Wlc5MWRDQm1kVzVqZEdsdmJpQjNhWFJvSUVOaGJtTmxiRlJ2YTJWdUlITjFjSEJ2Y25RdUlGSmxjMjlzZG1WeklIUm9aU0J3Y205dGFYTmxJR0ZtZEdWeUlITndaV05wWm1sbFpGeHVJQ29nY0dWeWFXOWtJRzltSUhScGJXVXVJRTVsZG1WeUlISmxhbVZqZEhNZ2RHaGxJSEJ5YjIxcGMyVXVJRWxtSUhSb1pTQnZjR1Z5WVhScGIyNGdaMlYwY3lCallXNWpaV3hzWldRZ2RtbGhJSFJvWlNCMGIydGxiaXdnZEdobElIQnliMjFwYzJVZ2JtVjJaWElnWjJWMGMxeHVJQ29nY21WemIyeDJaV1FnYjNJZ2NtVnFaV04wWldRdVhHNGdLaUJBY0dGeVlXMGdiWE1nVkdsdFpXOTFkQ0JrZFhKaGRHbHZiaUJwYmlCdGFXeHNhWE5sWTI5dVpITXVYRzRnS2lCQWNHRnlZVzBnWTJGdVkyVnNWRzlyWlc0Z1EyRnVZMlZzYkdGMGFXOXVJSFJ2YTJWdUlIUnZJR0pwYm1RZ2RHaGxJRzl3WlhKaGRHbHZiaUIwYnk1Y2JpQXFJRUJ5WlhSMWNtNXpJRkJ5YjIxcGMyVWdiMkpxWldOMElISmxjSEpsYzJWdWRHbHVaeUIwYUdVZ2RHbHRaVzkxZEM1Y2JpQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdLRzF6UHpvZ2JuVnRZbVZ5TENCallXNWpaV3hVYjJ0bGJqODZJRU5oYm1ObGJGUnZhMlZ1S1RvZ1VISnZiV2x6WlR4MmIybGtQaUI3WEc1Y2RHeGxkQ0IwYVcxbGIzVjBPaUJ1ZFcxaVpYSTdYRzVjZEhKbGRIVnliaUJ5ZFc1QmMzbHVZengyYjJsa1BpaGNibHgwWEhRb2NtVnpiMngyWlRvZ0tIWmhiSFZsUHpvZ0tGQnliMjFwYzJVOGRtOXBaRDRnZkNCMmIybGtLU2tnUFQ0Z2RtOXBaQ2tnUFQ0Z2UxeHVYSFJjZEZ4MGRHbHRaVzkxZENBOUlIZHBibVJ2ZHk1elpYUlVhVzFsYjNWMEtISmxjMjlzZG1Vc0lHMXpLVHRjYmx4MFhIUjlMRnh1WEhSY2RDZ3BJRDArSUh0Y2JseDBYSFJjZEdOc1pXRnlWR2x0Wlc5MWRDaDBhVzFsYjNWMEtUdGNibHgwWEhSOUxGeHVYSFJjZEdOaGJtTmxiRlJ2YTJWdVhHNWNkQ2s3WEc1OVhHNGlYWDA9IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXY+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGp3aWQ9XFxcImJ1dHRvblxcXCI+U2hvdyBncmVldGVyPC9idXR0b24+PGRpdj5IZWxsb3MgZGlzcGxheWVkOiA8c3BhbiBqd2lkPVxcXCJjb3VudFxcXCI+PC9zcGFuPjwvZGl2PjxkaXYgandpZD1cXFwiZ3JlZXRlclxcXCI+PC9kaXY+PC9kaXY+XFxuXCI7IiwiaW1wb3J0IGJpbmRUZXh0IGZyb20gXCJqd2lkZ2V0L2JpbmRUZXh0XCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IFByb3BlcnR5IGZyb20gXCJqd2lkZ2V0L1Byb3BlcnR5XCI7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcImp3aWRnZXQvdGVtcGxhdGVcIjtcbmltcG9ydCBEZWxheWVkR3JlZXRlciBmcm9tIFwiLi9EZWxheWVkR3JlZXRlclwiO1xuXG5AdGVtcGxhdGUocmVxdWlyZTxzdHJpbmc+KFwiLi9BcHBsaWNhdGlvbi5qdy5odG1sXCIpKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgY291bnQgPSB0aGlzLm93bihuZXcgUHJvcGVydHkoMCkpO1xuXHRwcml2YXRlIGdyZWV0ZXIgPSB0aGlzLm93bihuZXcgUHJvcGVydHk8Q29tcG9uZW50PigpKS5vd25WYWx1ZSgpO1xuXG5cdHByb3RlY3RlZCByZW5kZXJCdXR0b24oZWw6IEpRdWVyeSkge1xuXHRcdGVsLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZWwudGV4dChcIkRlc3Ryb3kgY3VycmVudCBncmVldGVyIGFuZCBzaG93IGEgbmV3IG9uZVwiKTtcblx0XHRcdHRoaXMuZ3JlZXRlci5zZXQobmV3IERlbGF5ZWRHcmVldGVyKHRoaXMuY291bnQpKTtcblx0XHR9KTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJDb3VudChlbDogSlF1ZXJ5KSB7XG5cdFx0YmluZFRleHQoZWwsIHRoaXMuY291bnQpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckdyZWV0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ3JlZXRlcjtcblx0fVxufVxuIiwiaW1wb3J0IENhbmNlbFRva2VuIGZyb20gXCJqd2lkZ2V0L0NhbmNlbFRva2VuXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IGRlZmVyIGZyb20gXCJqd2lkZ2V0L2RlZmVyXCI7XG5pbXBvcnQgSVByb3BlcnR5IGZyb20gXCJqd2lkZ2V0L0lQcm9wZXJ0eVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxheWVkR3JlZXRlciBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBjYW5jZWxUb2tlbiA9IHRoaXMub3duKG5ldyBDYW5jZWxUb2tlbigpKTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGNvdW50OiBJUHJvcGVydHk8bnVtYmVyPikge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgYXN5bmMgcmVuZGVyUm9vdChlbDogSlF1ZXJ5KSB7XG5cdFx0ZWwudGV4dChcIldhaXQuLi5cIik7XG5cdFx0YXdhaXQgZGVmZXIoMTAwMCwgdGhpcy5jYW5jZWxUb2tlbik7XG5cdFx0ZWwudGV4dChcIkhlbGxvIVwiKTtcblx0XHR0aGlzLmNvdW50LnNldCh0aGlzLmNvdW50LmdldCgpICsgMSk7XG5cdH1cbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBpbml0RXhhbXBsZSBmcm9tIFwiLi4vY29tbW9uL2luaXRFeGFtcGxlXCI7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4vQXBwbGljYXRpb25cIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwiZGVmZXJcIiwgW1wiRGVsYXllZEdyZWV0ZXIudHNcIiwgXCJBcHBsaWNhdGlvbi50c1wiLCBcIkFwcGxpY2F0aW9uLmp3Lmh0bWxcIiwgXCJpbmRleC50c1wiXSk7XG5cdG5ldyBBcHBsaWNhdGlvbigpLnJlbmRlclRvKFwiYm9keVwiKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==