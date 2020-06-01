(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["request"],{

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

/***/ "../../main/dist/request.js":
/*!*******************************************!*\
  !*** C:/jwidget/git/main/dist/request.js ***!
  \*******************************************/
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
 * Promise wrapper over jQuery AJAX API functions with CancelToken support. Resolves the promise with request result on its
 * successful completion. Rejects the promise with XMLHttpRequest on request failure. If the operation gets
 * cancelled via the token, the promise never gets resolved or rejected.
 * @param xhr jQuery XML HTTP request wrapper object.
 * @param cancelToken Cancellation token to bind the operation to.
 * @returns Promise object representing the request.
 */
function request(xhr, cancelToken) {
    let aborted = false;
    return CancelToken_1.runAsync((resolve, reject) => {
        xhr.then(resolve, request => {
            if (!aborted) {
                reject(request);
            }
        });
    }, () => {
        aborted = true;
        xhr.abort();
    }, cancelToken);
}
exports.default = request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXNCRTs7QUFFRiwrQ0FBb0Q7QUFFcEQ7Ozs7Ozs7R0FPRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxHQUFjLEVBQUUsV0FBeUI7SUFDeEUsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLE9BQU8sc0JBQVEsQ0FDZCxDQUFDLE9BQStDLEVBQUUsTUFBNkIsRUFBRSxFQUFFO1FBQ2xGLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLEVBQ0QsR0FBRyxFQUFFO1FBQ0osT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUMsRUFDRCxXQUFXLENBQ1gsQ0FBQztBQUNILENBQUM7QUFoQkQsMEJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IENhbmNlbFRva2VuLCB7cnVuQXN5bmN9IGZyb20gXCIuL0NhbmNlbFRva2VuXCI7XG5cbi8qKlxuICogUHJvbWlzZSB3cmFwcGVyIG92ZXIgalF1ZXJ5IEFKQVggQVBJIGZ1bmN0aW9ucyB3aXRoIENhbmNlbFRva2VuIHN1cHBvcnQuIFJlc29sdmVzIHRoZSBwcm9taXNlIHdpdGggcmVxdWVzdCByZXN1bHQgb24gaXRzXG4gKiBzdWNjZXNzZnVsIGNvbXBsZXRpb24uIFJlamVjdHMgdGhlIHByb21pc2Ugd2l0aCBYTUxIdHRwUmVxdWVzdCBvbiByZXF1ZXN0IGZhaWx1cmUuIElmIHRoZSBvcGVyYXRpb24gZ2V0c1xuICogY2FuY2VsbGVkIHZpYSB0aGUgdG9rZW4sIHRoZSBwcm9taXNlIG5ldmVyIGdldHMgcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXG4gKiBAcGFyYW0geGhyIGpRdWVyeSBYTUwgSFRUUCByZXF1ZXN0IHdyYXBwZXIgb2JqZWN0LlxuICogQHBhcmFtIGNhbmNlbFRva2VuIENhbmNlbGxhdGlvbiB0b2tlbiB0byBiaW5kIHRoZSBvcGVyYXRpb24gdG8uXG4gKiBAcmV0dXJucyBQcm9taXNlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QoeGhyOiBKUXVlcnlYSFIsIGNhbmNlbFRva2VuPzogQ2FuY2VsVG9rZW4pOiBQcm9taXNlPGFueT4ge1xuXHRsZXQgYWJvcnRlZCA9IGZhbHNlO1xuXHRyZXR1cm4gcnVuQXN5bmM8YW55Pihcblx0XHQocmVzb2x2ZTogKHZhbHVlPzogKFByb21pc2U8YW55PiB8IGFueSkpID0+IHZvaWQsIHJlamVjdDogKGVycm9yPzogYW55KSA9PiB2b2lkKSA9PiB7XG5cdFx0XHR4aHIudGhlbihyZXNvbHZlLCByZXF1ZXN0ID0+IHtcblx0XHRcdFx0aWYgKCFhYm9ydGVkKSB7XG5cdFx0XHRcdFx0cmVqZWN0KHJlcXVlc3QpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdCgpID0+IHtcblx0XHRcdGFib3J0ZWQgPSB0cnVlO1xuXHRcdFx0eGhyLmFib3J0KCk7XG5cdFx0fSxcblx0XHRjYW5jZWxUb2tlblxuXHQpO1xufVxuIl19

/***/ }),

/***/ "./request/AjaxGreeter.ts":
/*!********************************!*\
  !*** ./request/AjaxGreeter.ts ***!
  \********************************/
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

/***/ "./request/Application.jw.html":
/*!*************************************!*\
  !*** ./request/Application.jw.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div><button type=\"button\" jwid=\"button\">Show greeter</button><div>Hellos displayed: <span jwid=\"count\"></span></div><div jwid=\"greeter\"></div></div>\n";

/***/ }),

/***/ "./request/Application.ts":
/*!********************************!*\
  !*** ./request/Application.ts ***!
  \********************************/
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

var AjaxGreeter_1 = __importDefault(__webpack_require__(/*! ./AjaxGreeter */ "./request/AjaxGreeter.ts"));

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

          _this2.greeter.set(new AjaxGreeter_1.default(_this2.count));
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

  Application = __decorate([template_1.default(__webpack_require__(/*! ./Application.jw.html */ "./request/Application.jw.html"))], Application);
  return Application;
}();

exports.default = Application;

/***/ }),

/***/ "./request/index.ts":
/*!**************************!*\
  !*** ./request/index.ts ***!
  \**************************/
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

var Application_1 = __importDefault(__webpack_require__(/*! ./Application */ "./request/Application.ts"));

jquery_1.default(function () {
  initExample_1.default("request", ["AjaxGreeter.ts", "Application.ts", "Application.jw.html", "index.ts"]);
  new Application_1.default().renderTo("body");
});

/***/ })

},[["./request/index.ts","runtime","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~ad2f5299","vendors~bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~b~2f8443ff","bindAttr~bindClass1~bindClass2~bindCss~bindDisplay~bindHtml~bindProp1~bindProp2~bindRadio1~bindRadio~25c09681","defer~request~router"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRUZXh0LmpzIiwid2VicGFjazovLy9DOi9qd2lkZ2V0L2dpdC9tYWluL2Rpc3QvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JlcXVlc3QvQWpheEdyZWV0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcmVxdWVzdC9BcHBsaWNhdGlvbi5qdy5odG1sIiwid2VicGFjazovLy8uLi8uLi9zcmMvcmVxdWVzdC9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL3JlcXVlc3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQ0FBZ0MsbUJBQU8sQ0FBQyx5Q0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxtMUc7Ozs7Ozs7Ozs7OztBQ25EOUI7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxzQkFBc0IsbUJBQU8sQ0FBQyxxREFBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJDQUEyQyxtZ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hEM0M7O0FBQ0E7O0FBQ0E7O0FBRUE7O0lBRXFCLFc7Ozs7O0FBSXBCLHVCQUFvQixLQUFwQixFQUE0QztBQUFBOztBQUFBOztBQUMzQztBQURtQjtBQUZaLHdCQUFjLE1BQUssR0FBTCxDQUFTLElBQUkscUJBQUosRUFBVCxDQUFkO0FBRW9DO0FBRTNDOzs7OytCQUUwQixFLEVBQVU7Ozs7Ozs7QUFDcEMsa0JBQUUsQ0FBQyxJQUFILENBQVEsWUFBUjs7QUFDYSx1QkFBTSxrQkFBUSxpQkFBRSxHQUFGLENBQU0sbUJBQU4sQ0FBUixFQUFvQyxLQUFLLFdBQXpDLENBQU47OztBQUFQLG9CO0FBQ04sa0JBQUUsQ0FBQyxJQUFILENBQVEsSUFBSSxDQUFDLE9BQWI7QUFDQSxxQkFBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQUssS0FBTCxDQUFXLEdBQVgsS0FBbUIsQ0FBbEM7Ozs7Ozs7OztBQUNBOzs7O0VBYnVDLG1COztBQUF6Qyw4Qjs7Ozs7Ozs7Ozs7QUNOQSxtTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQSxNQUFxQixXQUFyQjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7OztBQUVTLG9CQUFRLE1BQUssR0FBTCxDQUFTLElBQUksa0JBQUosQ0FBYSxDQUFiLENBQVQsQ0FBUjtBQUNBLHNCQUFVLE1BQUssR0FBTCxDQUFTLElBQUksa0JBQUosRUFBVCxFQUFvQyxRQUFwQyxFQUFWO0FBSFQ7QUFtQkM7O0FBbkJEO0FBQUE7QUFBQSxtQ0FLd0IsRUFMeEIsRUFLa0M7QUFBQTs7QUFDaEMsVUFBRSxDQUFDLEVBQUgsQ0FBTSxPQUFOLEVBQWUsWUFBSztBQUNuQixZQUFFLENBQUMsSUFBSCxDQUFRLDRDQUFSOztBQUNBLGdCQUFJLENBQUMsT0FBTCxDQUFhLEdBQWIsQ0FBaUIsSUFBSSxxQkFBSixDQUFnQixNQUFJLENBQUMsS0FBckIsQ0FBakI7QUFDQSxTQUhEO0FBSUE7QUFWRjtBQUFBO0FBQUEsa0NBWXVCLEVBWnZCLEVBWWlDO0FBQy9CLDJCQUFTLEVBQVQsRUFBYSxLQUFLLEtBQWxCO0FBQ0E7QUFkRjtBQUFBO0FBQUEsc0NBZ0J3QjtBQUN0QixlQUFPLEtBQUssT0FBWjtBQUNBO0FBbEJGOztBQUFBO0FBQUEsSUFBeUMsbUJBQXpDOztBQUFxQixhQUFXLGVBRC9CLG1CQUFTLG1CQUFPLENBQVMsNERBQVQsQ0FBaEIsQ0FDK0IsR0FBWCxXQUFXLENBQVg7QUFtQnJCO0FBQUMsQ0FuQkQ7O2tCQUFxQixXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQckI7O0FBQ0E7O0FBQ0E7O0FBRUEsaUJBQUUsWUFBSztBQUNOLHdCQUFZLFNBQVosRUFBdUIsQ0FBQyxnQkFBRCxFQUFtQixnQkFBbkIsRUFBcUMscUJBQXJDLEVBQTRELFVBQTVELENBQXZCO0FBQ0EsTUFBSSxxQkFBSixHQUFrQixRQUFsQixDQUEyQixNQUEzQjtBQUNBLENBSEQsRSIsImZpbGUiOiJidW5kbGUtcmVxdWVzdC0xOTI5NjkyODQzM2FlZjJhZGFkYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5cclxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ2xhc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DbGFzc1wiKSk7XHJcbmNsYXNzIFRleHRVcGRhdGVyIGV4dGVuZHMgQ2xhc3NfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB0aGlzLl91cGRhdGUoKTtcclxuICAgICAgICB0aGlzLm93bihwcm9wZXJ0eS5jaGFuZ2VFdmVudC5saXN0ZW4odGhpcy5fdXBkYXRlLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBfdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZWxbMF0udGV4dENvbnRlbnQgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgaW5uZXIgdGV4dCBvZiB0aGUgRE9NIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSBlbCBET00gZWxlbWVudC5cclxuICogQHBhcmFtIHByb3BlcnR5IFRleHQgdmFsdWUuXHJcbiAqIEByZXR1cm5zIEJpbmRpbmcgb2JqZWN0LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIGJpbmRUZXh0KGVsLCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIG5ldyBUZXh0VXBkYXRlcihlbCwgcHJvcGVydHkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRUZXh0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZbWx1WkZSbGVIUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12WW1sdVpGUmxlSFF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBWQmMwSkZPenM3T3p0QlFVZEdMRzlFUVVFMFFqdEJRVWMxUWl4TlFVRk5MRmRCUVZrc1UwRkJVU3hsUVVGTE8wbEJRemxDTEZsQlFXOUNMRVZCUVZVc1JVRkJWU3hSUVVGMVFqdFJRVU01UkN4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVSWExFOUJRVVVzUjBGQlJpeEZRVUZGTEVOQlFWRTdVVUZCVlN4aFFVRlJMRWRCUVZJc1VVRkJVU3hEUVVGbE8xRkJSVGxFTEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRSUVVObUxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRmRCUVZjc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRek5FTEVOQlFVTTdTVUZGVHl4UFFVRlBPMUZCUTJRc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0SlFVTTVReXhEUVVGRE8wTkJRMFE3UVVGRlJEczdPenM3UjBGTFJ6dEJRVU5JTEZOQlFYZENMRkZCUVZFc1EwRkJReXhGUVVGVkxFVkJRVVVzVVVGQmRVSTdTVUZEYmtVc1QwRkJUeXhKUVVGSkxGZEJRVmNzUTBGQlF5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRkRU1zUTBGQlF6dEJRVVpFTERKQ1FVVkRJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlwY2JrMUpWQ0JNYVdObGJuTmxYRzVjYmtOdmNIbHlhV2RvZENBb1l5a2dNakF5TUNCRloyOXlJRTVsY0c5dGJubGhjMk5vYVdoY2JseHVVR1Z5YldsemMybHZiaUJwY3lCb1pYSmxZbmtnWjNKaGJuUmxaQ3dnWm5KbFpTQnZaaUJqYUdGeVoyVXNJSFJ2SUdGdWVTQndaWEp6YjI0Z2IySjBZV2x1YVc1bklHRWdZMjl3ZVZ4dWIyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVWdYQ0pUYjJaMGQyRnlaVndpS1N3Z2RHOGdaR1ZoYkZ4dWFXNGdkR2hsSUZOdlpuUjNZWEpsSUhkcGRHaHZkWFFnY21WemRISnBZM1JwYjI0c0lHbHVZMngxWkdsdVp5QjNhWFJvYjNWMElHeHBiV2wwWVhScGIyNGdkR2hsSUhKcFoyaDBjMXh1ZEc4Z2RYTmxMQ0JqYjNCNUxDQnRiMlJwWm5rc0lHMWxjbWRsTENCd2RXSnNhWE5vTENCa2FYTjBjbWxpZFhSbExDQnpkV0pzYVdObGJuTmxMQ0JoYm1RdmIzSWdjMlZzYkZ4dVkyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRDQndaWEp6YjI1eklIUnZJSGRvYjIwZ2RHaGxJRk52Wm5SM1lYSmxJR2x6WEc1bWRYSnVhWE5vWldRZ2RHOGdaRzhnYzI4c0lITjFZbXBsWTNRZ2RHOGdkR2hsSUdadmJHeHZkMmx1WnlCamIyNWthWFJwYjI1ek9seHVYRzVVYUdVZ1lXSnZkbVVnWTI5d2VYSnBaMmgwSUc1dmRHbGpaU0JoYm1RZ2RHaHBjeUJ3WlhKdGFYTnphVzl1SUc1dmRHbGpaU0J6YUdGc2JDQmlaU0JwYm1Oc2RXUmxaQ0JwYmlCaGJHeGNibU52Y0dsbGN5QnZjaUJ6ZFdKemRHRnVkR2xoYkNCd2IzSjBhVzl1Y3lCdlppQjBhR1VnVTI5bWRIZGhjbVV1WEc1Y2JsUklSU0JUVDBaVVYwRlNSU0JKVXlCUVVrOVdTVVJGUkNCY0lrRlRJRWxUWENJc0lGZEpWRWhQVlZRZ1YwRlNVa0ZPVkZrZ1QwWWdRVTVaSUV0SlRrUXNJRVZZVUZKRlUxTWdUMUpjYmtsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBZZ1RVVlNRMGhCVGxSQlFrbE1TVlJaTEZ4dVJrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNGdUazhnUlZaRlRsUWdVMGhCVEV3Z1ZFaEZYRzVCVlZSSVQxSlRJRTlTSUVOUFVGbFNTVWRJVkNCSVQweEVSVkpUSUVKRklFeEpRVUpNUlNCR1QxSWdRVTVaSUVOTVFVbE5MQ0JFUVUxQlIwVlRJRTlTSUU5VVNFVlNYRzVNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxGeHVUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGSUZWVFJTQlBVaUJQVkVoRlVpQkVSVUZNU1U1SFV5QkpUaUJVU0VWY2JsTlBSbFJYUVZKRkxseHVLaTljYmx4dWFXMXdiM0owSUVKcGJtUmhZbXhsSUdaeWIyMGdKeTR2UW1sdVpHRmliR1VuTzF4dWFXMXdiM0owSUVOc1lYTnpJR1p5YjIwZ0p5NHZRMnhoYzNNbk8xeHVhVzF3YjNKMElFUmxjM1J5YjNsaFlteGxJR1p5YjIwZ0p5NHZSR1Z6ZEhKdmVXRmliR1VuTzF4dVhHNWpiR0Z6Y3lCVVpYaDBWWEJrWVhSbGNpQmxlSFJsYm1SeklFTnNZWE56SUh0Y2JseDBZMjl1YzNSeWRXTjBiM0lvY0hKcGRtRjBaU0JsYkRvZ1NsRjFaWEo1TENCd2NtbDJZWFJsSUhCeWIzQmxjblI1T2lCQ2FXNWtZV0pzWlR4aGJuaytLU0I3WEc1Y2RGeDBjM1Z3WlhJb0tUdGNibHgwWEhSMGFHbHpMbDkxY0dSaGRHVW9LVHRjYmx4MFhIUjBhR2x6TG05M2JpaHdjbTl3WlhKMGVTNWphR0Z1WjJWRmRtVnVkQzVzYVhOMFpXNG9kR2hwY3k1ZmRYQmtZWFJsTENCMGFHbHpLU2s3WEc1Y2RIMWNibHh1WEhSd2NtbDJZWFJsSUY5MWNHUmhkR1VvS1NCN1hHNWNkRngwZEdocGN5NWxiRnN3WFM1MFpYaDBRMjl1ZEdWdWRDQTlJSFJvYVhNdWNISnZjR1Z5ZEhrdVoyVjBLQ2s3WEc1Y2RIMWNibjFjYmx4dUx5b3FYRzRnS2lCWFlYUmphR1Z6SUhOMGNtbHVaeUJ3Y205d1pYSjBlU0J0YjJScFptbGpZWFJwYjI0Z1lXNWtJSFZ3WkdGMFpYTWdhVzV1WlhJZ2RHVjRkQ0J2WmlCMGFHVWdSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ1pXd2dSRTlOSUdWc1pXMWxiblF1WEc0Z0tpQkFjR0Z5WVcwZ2NISnZjR1Z5ZEhrZ1ZHVjRkQ0IyWVd4MVpTNWNiaUFxSUVCeVpYUjFjbTV6SUVKcGJtUnBibWNnYjJKcVpXTjBMaUJaYjNVZ2JYVnpkQ0JrWlhOMGNtOTVJR2wwSUhSdklITjBiM0FnZEdobElITjVibU5vY205dWFYcGhkR2x2Ymk1Y2JpQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdZbWx1WkZSbGVIUW9aV3c2SUVwUmRXVnllU3dnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEdGdWVUNHBPaUJFWlhOMGNtOTVZV0pzWlNCN1hHNWNkSEpsZEhWeWJpQnVaWGNnVkdWNGRGVndaR0YwWlhJb1pXd3NJSEJ5YjNCbGNuUjVLVHRjYm4xY2JpSmRmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5Db3B5cmlnaHQgKGMpIDIwMjAgRWdvciBOZXBvbW55YXNjaGloXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW5jZWxUb2tlbl8xID0gcmVxdWlyZShcIi4vQ2FuY2VsVG9rZW5cIik7XHJcbi8qKlxyXG4gKiBQcm9taXNlIHdyYXBwZXIgb3ZlciBqUXVlcnkgQUpBWCBBUEkgZnVuY3Rpb25zIHdpdGggQ2FuY2VsVG9rZW4gc3VwcG9ydC4gUmVzb2x2ZXMgdGhlIHByb21pc2Ugd2l0aCByZXF1ZXN0IHJlc3VsdCBvbiBpdHNcclxuICogc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLiBSZWplY3RzIHRoZSBwcm9taXNlIHdpdGggWE1MSHR0cFJlcXVlc3Qgb24gcmVxdWVzdCBmYWlsdXJlLiBJZiB0aGUgb3BlcmF0aW9uIGdldHNcclxuICogY2FuY2VsbGVkIHZpYSB0aGUgdG9rZW4sIHRoZSBwcm9taXNlIG5ldmVyIGdldHMgcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXHJcbiAqIEBwYXJhbSB4aHIgalF1ZXJ5IFhNTCBIVFRQIHJlcXVlc3Qgd3JhcHBlciBvYmplY3QuXHJcbiAqIEBwYXJhbSBjYW5jZWxUb2tlbiBDYW5jZWxsYXRpb24gdG9rZW4gdG8gYmluZCB0aGUgb3BlcmF0aW9uIHRvLlxyXG4gKiBAcmV0dXJucyBQcm9taXNlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlcXVlc3QuXHJcbiAqL1xyXG5mdW5jdGlvbiByZXF1ZXN0KHhociwgY2FuY2VsVG9rZW4pIHtcclxuICAgIGxldCBhYm9ydGVkID0gZmFsc2U7XHJcbiAgICByZXR1cm4gQ2FuY2VsVG9rZW5fMS5ydW5Bc3luYygocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgeGhyLnRoZW4ocmVzb2x2ZSwgcmVxdWVzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYWJvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgeGhyLmFib3J0KCk7XHJcbiAgICB9LCBjYW5jZWxUb2tlbik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gcmVxdWVzdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY21WeGRXVnpkQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5eVpYRjFaWE4wTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0RlFYTkNSVHM3UVVGRlJpd3JRMEZCYjBRN1FVRkZjRVE3T3pzN096czdSMEZQUnp0QlFVTklMRk5CUVhkQ0xFOUJRVThzUTBGQlF5eEhRVUZqTEVWQlFVVXNWMEZCZVVJN1NVRkRlRVVzU1VGQlNTeFBRVUZQTEVkQlFVY3NTMEZCU3l4RFFVRkRPMGxCUTNCQ0xFOUJRVThzYzBKQlFWRXNRMEZEWkN4RFFVRkRMRTlCUVN0RExFVkJRVVVzVFVGQk5rSXNSVUZCUlN4RlFVRkZPMUZCUTJ4R0xFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRek5DTEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVN1owSkJRMklzVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMkZCUTJoQ08xRkJRMFlzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU2l4RFFVRkRMRVZCUTBRc1IwRkJSeXhGUVVGRk8xRkJRMG9zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTm1MRWRCUVVjc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dEpRVU5pTEVOQlFVTXNSVUZEUkN4WFFVRlhMRU5CUTFnc1EwRkJRenRCUVVOSUxFTkJRVU03UVVGb1FrUXNNRUpCWjBKRElpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeXBjYmsxSlZDQk1hV05sYm5ObFhHNWNia052Y0hseWFXZG9kQ0FvWXlrZ01qQXlNQ0JGWjI5eUlFNWxjRzl0Ym5saGMyTm9hV2hjYmx4dVVHVnliV2x6YzJsdmJpQnBjeUJvWlhKbFlua2daM0poYm5SbFpDd2dabkpsWlNCdlppQmphR0Z5WjJVc0lIUnZJR0Z1ZVNCd1pYSnpiMjRnYjJKMFlXbHVhVzVuSUdFZ1kyOXdlVnh1YjJZZ2RHaHBjeUJ6YjJaMGQyRnlaU0JoYm1RZ1lYTnpiMk5wWVhSbFpDQmtiMk4xYldWdWRHRjBhVzl1SUdacGJHVnpJQ2gwYUdVZ1hDSlRiMlowZDJGeVpWd2lLU3dnZEc4Z1pHVmhiRnh1YVc0Z2RHaGxJRk52Wm5SM1lYSmxJSGRwZEdodmRYUWdjbVZ6ZEhKcFkzUnBiMjRzSUdsdVkyeDFaR2x1WnlCM2FYUm9iM1YwSUd4cGJXbDBZWFJwYjI0Z2RHaGxJSEpwWjJoMGMxeHVkRzhnZFhObExDQmpiM0I1TENCdGIyUnBabmtzSUcxbGNtZGxMQ0J3ZFdKc2FYTm9MQ0JrYVhOMGNtbGlkWFJsTENCemRXSnNhV05sYm5ObExDQmhibVF2YjNJZ2MyVnNiRnh1WTI5d2FXVnpJRzltSUhSb1pTQlRiMlowZDJGeVpTd2dZVzVrSUhSdklIQmxjbTFwZENCd1pYSnpiMjV6SUhSdklIZG9iMjBnZEdobElGTnZablIzWVhKbElHbHpYRzVtZFhKdWFYTm9aV1FnZEc4Z1pHOGdjMjhzSUhOMVltcGxZM1FnZEc4Z2RHaGxJR1p2Ykd4dmQybHVaeUJqYjI1a2FYUnBiMjV6T2x4dVhHNVVhR1VnWVdKdmRtVWdZMjl3ZVhKcFoyaDBJRzV2ZEdsalpTQmhibVFnZEdocGN5QndaWEp0YVhOemFXOXVJRzV2ZEdsalpTQnphR0ZzYkNCaVpTQnBibU5zZFdSbFpDQnBiaUJoYkd4Y2JtTnZjR2xsY3lCdmNpQnpkV0p6ZEdGdWRHbGhiQ0J3YjNKMGFXOXVjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXVYRzVjYmxSSVJTQlRUMFpVVjBGU1JTQkpVeUJRVWs5V1NVUkZSQ0JjSWtGVElFbFRYQ0lzSUZkSlZFaFBWVlFnVjBGU1VrRk9WRmtnVDBZZ1FVNVpJRXRKVGtRc0lFVllVRkpGVTFNZ1QxSmNia2xOVUV4SlJVUXNJRWxPUTB4VlJFbE9SeUJDVlZRZ1RrOVVJRXhKVFVsVVJVUWdWRThnVkVoRklGZEJVbEpCVGxSSlJWTWdUMFlnVFVWU1EwaEJUbFJCUWtsTVNWUlpMRnh1UmtsVVRrVlRVeUJHVDFJZ1FTQlFRVkpVU1VOVlRFRlNJRkJWVWxCUFUwVWdRVTVFSUU1UFRrbE9SbEpKVGtkRlRVVk9WQzRnU1U0Z1RrOGdSVlpGVGxRZ1UwaEJURXdnVkVoRlhHNUJWVlJJVDFKVElFOVNJRU5QVUZsU1NVZElWQ0JJVDB4RVJWSlRJRUpGSUV4SlFVSk1SU0JHVDFJZ1FVNVpJRU5NUVVsTkxDQkVRVTFCUjBWVElFOVNJRTlVU0VWU1hHNU1TVUZDU1V4SlZGa3NJRmRJUlZSSVJWSWdTVTRnUVU0Z1FVTlVTVTlPSUU5R0lFTlBUbFJTUVVOVUxDQlVUMUpVSUU5U0lFOVVTRVZTVjBsVFJTd2dRVkpKVTBsT1J5QkdVazlOTEZ4dVQxVlVJRTlHSUU5U0lFbE9JRU5QVGs1RlExUkpUMDRnVjBsVVNDQlVTRVVnVTA5R1ZGZEJVa1VnVDFJZ1ZFaEZJRlZUUlNCUFVpQlBWRWhGVWlCRVJVRk1TVTVIVXlCSlRpQlVTRVZjYmxOUFJsUlhRVkpGTGx4dUtpOWNibHh1YVcxd2IzSjBJRU5oYm1ObGJGUnZhMlZ1TENCN2NuVnVRWE41Ym1OOUlHWnliMjBnWENJdUwwTmhibU5sYkZSdmEyVnVYQ0k3WEc1Y2JpOHFLbHh1SUNvZ1VISnZiV2x6WlNCM2NtRndjR1Z5SUc5MlpYSWdhbEYxWlhKNUlFRktRVmdnUVZCSklHWjFibU4wYVc5dWN5QjNhWFJvSUVOaGJtTmxiRlJ2YTJWdUlITjFjSEJ2Y25RdUlGSmxjMjlzZG1WeklIUm9aU0J3Y205dGFYTmxJSGRwZEdnZ2NtVnhkV1Z6ZENCeVpYTjFiSFFnYjI0Z2FYUnpYRzRnS2lCemRXTmpaWE56Wm5Wc0lHTnZiWEJzWlhScGIyNHVJRkpsYW1WamRITWdkR2hsSUhCeWIyMXBjMlVnZDJsMGFDQllUVXhJZEhSd1VtVnhkV1Z6ZENCdmJpQnlaWEYxWlhOMElHWmhhV3gxY21VdUlFbG1JSFJvWlNCdmNHVnlZWFJwYjI0Z1oyVjBjMXh1SUNvZ1kyRnVZMlZzYkdWa0lIWnBZU0IwYUdVZ2RHOXJaVzRzSUhSb1pTQndjbTl0YVhObElHNWxkbVZ5SUdkbGRITWdjbVZ6YjJ4MlpXUWdiM0lnY21WcVpXTjBaV1F1WEc0Z0tpQkFjR0Z5WVcwZ2VHaHlJR3BSZFdWeWVTQllUVXdnU0ZSVVVDQnlaWEYxWlhOMElIZHlZWEJ3WlhJZ2IySnFaV04wTGx4dUlDb2dRSEJoY21GdElHTmhibU5sYkZSdmEyVnVJRU5oYm1ObGJHeGhkR2x2YmlCMGIydGxiaUIwYnlCaWFXNWtJSFJvWlNCdmNHVnlZWFJwYjI0Z2RHOHVYRzRnS2lCQWNtVjBkWEp1Y3lCUWNtOXRhWE5sSUc5aWFtVmpkQ0J5WlhCeVpYTmxiblJwYm1jZ2RHaGxJSEpsY1hWbGMzUXVYRzRnS2k5Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdaMWJtTjBhVzl1SUhKbGNYVmxjM1FvZUdoeU9pQktVWFZsY25sWVNGSXNJR05oYm1ObGJGUnZhMlZ1UHpvZ1EyRnVZMlZzVkc5clpXNHBPaUJRY205dGFYTmxQR0Z1ZVQ0Z2UxeHVYSFJzWlhRZ1lXSnZjblJsWkNBOUlHWmhiSE5sTzF4dVhIUnlaWFIxY200Z2NuVnVRWE41Ym1NOFlXNTVQaWhjYmx4MFhIUW9jbVZ6YjJ4MlpUb2dLSFpoYkhWbFB6b2dLRkJ5YjIxcGMyVThZVzU1UGlCOElHRnVlU2twSUQwK0lIWnZhV1FzSUhKbGFtVmpkRG9nS0dWeWNtOXlQem9nWVc1NUtTQTlQaUIyYjJsa0tTQTlQaUI3WEc1Y2RGeDBYSFI0YUhJdWRHaGxiaWh5WlhOdmJIWmxMQ0J5WlhGMVpYTjBJRDArSUh0Y2JseDBYSFJjZEZ4MGFXWWdLQ0ZoWW05eWRHVmtLU0I3WEc1Y2RGeDBYSFJjZEZ4MGNtVnFaV04wS0hKbGNYVmxjM1FwTzF4dVhIUmNkRngwWEhSOVhHNWNkRngwWEhSOUtUdGNibHgwWEhSOUxGeHVYSFJjZENncElEMCtJSHRjYmx4MFhIUmNkR0ZpYjNKMFpXUWdQU0IwY25WbE8xeHVYSFJjZEZ4MGVHaHlMbUZpYjNKMEtDazdYRzVjZEZ4MGZTeGNibHgwWEhSallXNWpaV3hVYjJ0bGJseHVYSFFwTzF4dWZWeHVJbDE5IiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gXCJqd2lkZ2V0L0NhbmNlbFRva2VuXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJqd2lkZ2V0L0NvbXBvbmVudFwiO1xuaW1wb3J0IElQcm9wZXJ0eSBmcm9tIFwiandpZGdldC9JUHJvcGVydHlcIjtcbmltcG9ydCByZXF1ZXN0IGZyb20gXCJqd2lkZ2V0L3JlcXVlc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheEdyZWV0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgY2FuY2VsVG9rZW4gPSB0aGlzLm93bihuZXcgQ2FuY2VsVG9rZW4oKSk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb3VudDogSVByb3BlcnR5PG51bWJlcj4pIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGFzeW5jIHJlbmRlclJvb3QoZWw6IEpRdWVyeSkge1xuXHRcdGVsLnRleHQoXCJMb2FkaW5nLi4uXCIpO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0KCQuZ2V0KFwicmVxdWVzdC9kYXRhLmpzb25cIiksIHRoaXMuY2FuY2VsVG9rZW4pO1xuXHRcdGVsLnRleHQoZGF0YS5tZXNzYWdlKTtcblx0XHR0aGlzLmNvdW50LnNldCh0aGlzLmNvdW50LmdldCgpICsgMSk7XG5cdH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2PjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBqd2lkPVxcXCJidXR0b25cXFwiPlNob3cgZ3JlZXRlcjwvYnV0dG9uPjxkaXY+SGVsbG9zIGRpc3BsYXllZDogPHNwYW4gandpZD1cXFwiY291bnRcXFwiPjwvc3Bhbj48L2Rpdj48ZGl2IGp3aWQ9XFxcImdyZWV0ZXJcXFwiPjwvZGl2PjwvZGl2PlxcblwiOyIsImltcG9ydCBiaW5kVGV4dCBmcm9tIFwiandpZGdldC9iaW5kVGV4dFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiandpZGdldC9Db21wb25lbnRcIjtcbmltcG9ydCBQcm9wZXJ0eSBmcm9tIFwiandpZGdldC9Qcm9wZXJ0eVwiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCJqd2lkZ2V0L3RlbXBsYXRlXCI7XG5pbXBvcnQgQWpheEdyZWV0ZXIgZnJvbSBcIi4vQWpheEdyZWV0ZXJcIjtcblxuQHRlbXBsYXRlKHJlcXVpcmU8c3RyaW5nPihcIi4vQXBwbGljYXRpb24uancuaHRtbFwiKSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIGNvdW50ID0gdGhpcy5vd24obmV3IFByb3BlcnR5KDApKTtcblx0cHJpdmF0ZSBncmVldGVyID0gdGhpcy5vd24obmV3IFByb3BlcnR5PENvbXBvbmVudD4oKSkub3duVmFsdWUoKTtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyQnV0dG9uKGVsOiBKUXVlcnkpIHtcblx0XHRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGVsLnRleHQoXCJEZXN0cm95IGN1cnJlbnQgZ3JlZXRlciBhbmQgc2hvdyBhIG5ldyBvbmVcIik7XG5cdFx0XHR0aGlzLmdyZWV0ZXIuc2V0KG5ldyBBamF4R3JlZXRlcih0aGlzLmNvdW50KSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyQ291bnQoZWw6IEpRdWVyeSkge1xuXHRcdGJpbmRUZXh0KGVsLCB0aGlzLmNvdW50KTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJHcmVldGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdyZWV0ZXI7XG5cdH1cbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBpbml0RXhhbXBsZSBmcm9tIFwiLi4vY29tbW9uL2luaXRFeGFtcGxlXCI7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4vQXBwbGljYXRpb25cIjtcblxuJCgoKSA9PiB7XG5cdGluaXRFeGFtcGxlKFwicmVxdWVzdFwiLCBbXCJBamF4R3JlZXRlci50c1wiLCBcIkFwcGxpY2F0aW9uLnRzXCIsIFwiQXBwbGljYXRpb24uancuaHRtbFwiLCBcImluZGV4LnRzXCJdKTtcblx0bmV3IEFwcGxpY2F0aW9uKCkucmVuZGVyVG8oXCJib2R5XCIpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9