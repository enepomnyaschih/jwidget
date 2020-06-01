(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bindAttr~bindCss~bindHtml~bindRadio1~bindText~bindVal1~bindVal2~greeter~router"],{

/***/ "../../main/dist/bindVal.js":
/*!*******************************************!*\
  !*** C:/jwidget/git/main/dist/bindVal.js ***!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = __importDefault(__webpack_require__(/*! ./Class */ "../../main/dist/Class.js"));
const DomUtils_1 = __webpack_require__(/*! ./DomUtils */ "../../main/dist/DomUtils.js");
const index_1 = __webpack_require__(/*! ./index */ "../../main/dist/index.js");
const Property_1 = __importDefault(__webpack_require__(/*! ./Property */ "../../main/dist/Property.js"));
class ValueBinding extends Class_1.default {
    constructor(el, property, binding = index_1.UPDATE, simple) {
        super();
        if (typeof binding === "boolean") {
            simple = binding;
            binding = index_1.UPDATE;
        }
        if (binding & index_1.UPDATE) {
            this.own(new ValueUpdater(el, property));
        }
        if (binding & index_1.WATCH) {
            this.own(new ValueListener(el, { target: property, simple: simple }));
        }
    }
}
class ValueUpdater extends Class_1.default {
    constructor(el, property) {
        super();
        this.el = el;
        this.property = property;
        this._update();
        this.own(property.changeEvent.listen(this._update, this));
    }
    _update() {
        const value = this.property.get();
        if (this.el.val() !== value) {
            this.el.val(value).trigger("change");
        }
    }
}
class ValueListener extends Class_1.default {
    constructor(el, config = {}) {
        super();
        this.el = el;
        this.update = () => this._update();
        this._target = config.target || this.own(new Property_1.default());
        this._simple = config.simple || !DomUtils_1.isTextInput(el);
        this.update();
        this.el.bind("change", this.update);
        if (!this._simple) {
            this._timer = window.setInterval(this.update, 100);
        }
    }
    get target() {
        return this._target;
    }
    destroy() {
        if (!this._simple) {
            clearInterval(this._timer);
        }
        this.el.unbind("change", this.update);
        super.destroy();
    }
    _update() {
        this._target.set(this.el.val());
    }
}
function bindVal(el, value, binding, simple) {
    if (value != null && (typeof value !== "boolean")) {
        return new ValueBinding(el, value, binding, simple);
    }
    const target = new Property_1.default();
    return target.owning(new ValueListener(el, { target: target, simple: simple }));
}
exports.default = bindVal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZFZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW5kVmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXNCRTs7Ozs7QUFHRixvREFBNEI7QUFHNUIseUNBQXVDO0FBQ3ZDLG1DQUErQztBQUUvQywwREFBa0M7QUFFbEMsTUFBTSxZQUFhLFNBQVEsZUFBSztJQUcvQixZQUFZLEVBQVUsRUFBRSxRQUFhLEVBQUUsVUFBZSxjQUFNLEVBQUUsTUFBZ0I7UUFDN0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLE9BQU8sT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUNqQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxjQUFNLENBQUM7U0FDakI7UUFDRCxJQUFJLE9BQU8sR0FBRyxjQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUN6QztRQUNELElBQUksT0FBTyxHQUFHLGFBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztTQUNwRTtJQUNGLENBQUM7Q0FDRDtBQUVELE1BQU0sWUFBYSxTQUFRLGVBQUs7SUFDL0IsWUFBb0IsRUFBVSxFQUFVLFFBQXVCO1FBQzlELEtBQUssRUFBRSxDQUFDO1FBRFcsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWU7UUFFOUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVPLE9BQU87UUFDZCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxLQUFLLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0YsQ0FBQztDQUNEO0FBRUQsTUFBTSxhQUFjLFNBQVEsZUFBSztJQU1oQyxZQUFvQixFQUFVLEVBQUUsU0FBK0IsRUFBRTtRQUNoRSxLQUFLLEVBQUUsQ0FBQztRQURXLE9BQUUsR0FBRixFQUFFLENBQVE7UUFFN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxrQkFBUSxFQUFVLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxzQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbkQ7SUFDRixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbEIsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDRDtBQWtDRCxTQUF3QixPQUFPLENBQUMsRUFBVSxFQUFFLEtBQVUsRUFBRSxPQUFhLEVBQUUsTUFBWTtJQUNsRixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsRUFBRTtRQUNsRCxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3BEO0lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUSxFQUFVLENBQUM7SUFDdEMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBTkQsMEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDIwIEVnb3IgTmVwb21ueWFzY2hpaFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQmluZGFibGUgZnJvbSAnLi9CaW5kYWJsZSc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9DbGFzcyc7XG5pbXBvcnQgRGVzdHJveWFibGUgZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5pbXBvcnQgRGVzdHJveWFibGVCaW5kYWJsZSBmcm9tICcuL0Rlc3Ryb3lhYmxlQmluZGFibGUnO1xuaW1wb3J0IHtpc1RleHRJbnB1dH0gZnJvbSAnLi9Eb21VdGlscyc7XG5pbXBvcnQge0JpbmRpbmcsIFVQREFURSwgV0FUQ0h9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IElQcm9wZXJ0eSBmcm9tICcuL0lQcm9wZXJ0eSc7XG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi9Qcm9wZXJ0eSc7XG5cbmNsYXNzIFZhbHVlQmluZGluZyBleHRlbmRzIENsYXNzIHtcblx0Y29uc3RydWN0b3IoZWw6IEpRdWVyeSwgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pO1xuXHRjb25zdHJ1Y3RvcihlbDogSlF1ZXJ5LCBwcm9wZXJ0eTogSVByb3BlcnR5PHN0cmluZz4sIGJpbmRpbmc6IEJpbmRpbmcsIHNpbXBsZT86IGJvb2xlYW4pO1xuXHRjb25zdHJ1Y3RvcihlbDogSlF1ZXJ5LCBwcm9wZXJ0eTogYW55LCBiaW5kaW5nOiBhbnkgPSBVUERBVEUsIHNpbXBsZT86IGJvb2xlYW4pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgYmluZGluZyA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRcdHNpbXBsZSA9IGJpbmRpbmc7XG5cdFx0XHRiaW5kaW5nID0gVVBEQVRFO1xuXHRcdH1cblx0XHRpZiAoYmluZGluZyAmIFVQREFURSkge1xuXHRcdFx0dGhpcy5vd24obmV3IFZhbHVlVXBkYXRlcihlbCwgcHJvcGVydHkpKTtcblx0XHR9XG5cdFx0aWYgKGJpbmRpbmcgJiBXQVRDSCkge1xuXHRcdFx0dGhpcy5vd24obmV3IFZhbHVlTGlzdGVuZXIoZWwsIHt0YXJnZXQ6IHByb3BlcnR5LCBzaW1wbGU6IHNpbXBsZX0pKTtcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgVmFsdWVVcGRhdGVyIGV4dGVuZHMgQ2xhc3Mge1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBKUXVlcnksIHByaXZhdGUgcHJvcGVydHk6IEJpbmRhYmxlPGFueT4pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMub3duKHByb3BlcnR5LmNoYW5nZUV2ZW50Lmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZSgpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcGVydHkuZ2V0KCk7XG5cdFx0aWYgKHRoaXMuZWwudmFsKCkgIT09IHZhbHVlKSB7XG5cdFx0XHR0aGlzLmVsLnZhbCh2YWx1ZSkudHJpZ2dlcihcImNoYW5nZVwiKTtcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgVmFsdWVMaXN0ZW5lciBleHRlbmRzIENsYXNzIHtcblx0cHJpdmF0ZSBfdGFyZ2V0OiBJUHJvcGVydHk8c3RyaW5nPjtcblx0cHJpdmF0ZSBfc2ltcGxlOiBib29sZWFuO1xuXHRwcml2YXRlIF90aW1lcjogbnVtYmVyO1xuXHRwcml2YXRlIHVwZGF0ZTogKCkgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBKUXVlcnksIGNvbmZpZzogVmFsdWVMaXN0ZW5lci5Db25maWcgPSB7fSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy51cGRhdGUgPSAoKSA9PiB0aGlzLl91cGRhdGUoKTtcblx0XHR0aGlzLl90YXJnZXQgPSBjb25maWcudGFyZ2V0IHx8IHRoaXMub3duKG5ldyBQcm9wZXJ0eTxzdHJpbmc+KCkpO1xuXHRcdHRoaXMuX3NpbXBsZSA9IGNvbmZpZy5zaW1wbGUgfHwgIWlzVGV4dElucHV0KGVsKTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdHRoaXMuZWwuYmluZChcImNoYW5nZVwiLCB0aGlzLnVwZGF0ZSk7XG5cdFx0aWYgKCF0aGlzLl9zaW1wbGUpIHtcblx0XHRcdHRoaXMuX3RpbWVyID0gd2luZG93LnNldEludGVydmFsKHRoaXMudXBkYXRlLCAxMDApO1xuXHRcdH1cblx0fVxuXG5cdGdldCB0YXJnZXQoKTogQmluZGFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3RhcmdldDtcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0aWYgKCF0aGlzLl9zaW1wbGUpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5fdGltZXIpO1xuXHRcdH1cblx0XHR0aGlzLmVsLnVuYmluZChcImNoYW5nZVwiLCB0aGlzLnVwZGF0ZSk7XG5cdFx0c3VwZXIuZGVzdHJveSgpO1xuXHR9XG5cblx0X3VwZGF0ZSgpIHtcblx0XHR0aGlzLl90YXJnZXQuc2V0KDxhbnk+dGhpcy5lbC52YWwoKSk7XG5cdH1cbn1cblxubmFtZXNwYWNlIFZhbHVlTGlzdGVuZXIge1xuXHRleHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG5cdFx0cmVhZG9ubHkgdGFyZ2V0PzogSVByb3BlcnR5PHN0cmluZz47XG5cdFx0cmVhZG9ubHkgc2ltcGxlPzogYm9vbGVhbjtcblx0fVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcHJvcGVydHkgY29udGFpbmluZyBjdXJyZW50IERPTSBlbGVtZW50IHZhbHVlIGFuZCBzdGFydHMgd2F0Y2hpbmcgZm9yIGl0cyBtb2RpZmljYXRpb24uXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gc2ltcGxlIERpc2FibGUgbGl2ZSB3YXRjaCBieSB0aW1lci5cbiAqIEByZXR1cm5zIEJvdW5kIHByb3BlcnR5LiBZb3UgbXVzdCBkZXN0cm95IGl0IHRvIHN0b3AgdGhlIHN5bmNocm9uaXphdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFZhbChlbDogSlF1ZXJ5LCBzaW1wbGU/OiBib29sZWFuKTogRGVzdHJveWFibGVCaW5kYWJsZTxzdHJpbmc+O1xuXG4vKipcbiAqIFdhdGNoZXMgc3RyaW5nIHByb3BlcnR5IG1vZGlmaWNhdGlvbiBhbmQgdXBkYXRlcyB0aGUgRE9NIGVsZW1lbnQgdmFsdWUuXG4gKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0gdmFsdWUgRWxlbWVudCB2YWx1ZSB0byBhc3NpZ24uXG4gKiBAcmV0dXJucyBCaW5kaW5nIG9iamVjdC4gWW91IG11c3QgZGVzdHJveSBpdCB0byBzdG9wIHRoZSBzeW5jaHJvbml6YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRWYWwoZWw6IEpRdWVyeSwgdmFsdWU6IEJpbmRhYmxlPGFueT4pOiBEZXN0cm95YWJsZTtcblxuLyoqXG4gKiBXYXRjaGVzIHN0cmluZyBwcm9wZXJ0eSBtb2RpZmljYXRpb24gYW5kIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50IHZhbHVlIGFuZC9vciB2aWNlIHZlcnNhLlxuICogQHBhcmFtIGVsIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHZhbHVlIEVsZW1lbnQgdmFsdWUgdG8gcmVhZCBhbmQvb3Igd3JpdGUuXG4gKiBAcGFyYW0gYmluZGluZyBCaW5kaW5nIGRpcmVjdGlvbi5cbiAqIEBwYXJhbSBzaW1wbGUgRGlzYWJsZSBsaXZlIHdhdGNoIGJ5IHRpbWVyLlxuICogQHJldHVybnMgQmluZGluZyBvYmplY3QuIFlvdSBtdXN0IGRlc3Ryb3kgaXQgdG8gc3RvcCB0aGUgc3luY2hyb25pemF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kVmFsKGVsOiBKUXVlcnksIHZhbHVlOiBJUHJvcGVydHk8c3RyaW5nPiwgYmluZGluZzogQmluZGluZywgc2ltcGxlPzogYm9vbGVhbik6IERlc3Ryb3lhYmxlO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFZhbChlbDogSlF1ZXJ5LCB2YWx1ZTogYW55LCBiaW5kaW5nPzogYW55LCBzaW1wbGU/OiBhbnkpOiBEZXN0cm95YWJsZSB7XG5cdGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgIT09IFwiYm9vbGVhblwiKSkge1xuXHRcdHJldHVybiBuZXcgVmFsdWVCaW5kaW5nKGVsLCB2YWx1ZSwgYmluZGluZywgc2ltcGxlKTtcblx0fVxuXHRjb25zdCB0YXJnZXQgPSBuZXcgUHJvcGVydHk8c3RyaW5nPigpO1xuXHRyZXR1cm4gdGFyZ2V0Lm93bmluZyhuZXcgVmFsdWVMaXN0ZW5lcihlbCwge3RhcmdldDogdGFyZ2V0LCBzaW1wbGU6IHNpbXBsZX0pKTtcbn1cbiJdfQ==

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovandpZGdldC9naXQvbWFpbi9kaXN0L2JpbmRWYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQ0FBZ0MsbUJBQU8sQ0FBQyx5Q0FBUztBQUNqRCxtQkFBbUIsbUJBQU8sQ0FBQywrQ0FBWTtBQUN2QyxnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBUztBQUNqQyxtQ0FBbUMsbUJBQU8sQ0FBQywrQ0FBWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLG1DQUFtQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUNBQWlDO0FBQ2pGO0FBQ0E7QUFDQSwyQ0FBMkMsbW9UIiwiZmlsZSI6ImJ1bmRsZS1iaW5kQXR0cn5iaW5kQ3NzfmJpbmRIdG1sfmJpbmRSYWRpbzF+YmluZFRleHR+YmluZFZhbDF+YmluZFZhbDJ+Z3JlZXRlcn5yb3V0ZXItMWZkYTNmOWY0YjFmNDBlNmM2ZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLypcclxuTUlUIExpY2Vuc2VcclxuXHJcbkNvcHlyaWdodCAoYykgMjAyMCBFZ29yIE5lcG9tbnlhc2NoaWhcclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENsYXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2xhc3NcIikpO1xyXG5jb25zdCBEb21VdGlsc18xID0gcmVxdWlyZShcIi4vRG9tVXRpbHNcIik7XHJcbmNvbnN0IGluZGV4XzEgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcclxuY29uc3QgUHJvcGVydHlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qcm9wZXJ0eVwiKSk7XHJcbmNsYXNzIFZhbHVlQmluZGluZyBleHRlbmRzIENsYXNzXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgcHJvcGVydHksIGJpbmRpbmcgPSBpbmRleF8xLlVQREFURSwgc2ltcGxlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAodHlwZW9mIGJpbmRpbmcgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgIHNpbXBsZSA9IGJpbmRpbmc7XHJcbiAgICAgICAgICAgIGJpbmRpbmcgPSBpbmRleF8xLlVQREFURTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJpbmRpbmcgJiBpbmRleF8xLlVQREFURSkge1xyXG4gICAgICAgICAgICB0aGlzLm93bihuZXcgVmFsdWVVcGRhdGVyKGVsLCBwcm9wZXJ0eSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmluZGluZyAmIGluZGV4XzEuV0FUQ0gpIHtcclxuICAgICAgICAgICAgdGhpcy5vd24obmV3IFZhbHVlTGlzdGVuZXIoZWwsIHsgdGFyZ2V0OiBwcm9wZXJ0eSwgc2ltcGxlOiBzaW1wbGUgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5jbGFzcyBWYWx1ZVVwZGF0ZXIgZXh0ZW5kcyBDbGFzc18xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3IoZWwsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMub3duKHByb3BlcnR5LmNoYW5nZUV2ZW50Lmxpc3Rlbih0aGlzLl91cGRhdGUsIHRoaXMpKTtcclxuICAgIH1cclxuICAgIF91cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BlcnR5LmdldCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmVsLnZhbCgpICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnZhbCh2YWx1ZSkudHJpZ2dlcihcImNoYW5nZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgVmFsdWVMaXN0ZW5lciBleHRlbmRzIENsYXNzXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgY29uZmlnID0ge30pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZWwgPSBlbDtcclxuICAgICAgICB0aGlzLnVwZGF0ZSA9ICgpID0+IHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3RhcmdldCA9IGNvbmZpZy50YXJnZXQgfHwgdGhpcy5vd24obmV3IFByb3BlcnR5XzEuZGVmYXVsdCgpKTtcclxuICAgICAgICB0aGlzLl9zaW1wbGUgPSBjb25maWcuc2ltcGxlIHx8ICFEb21VdGlsc18xLmlzVGV4dElucHV0KGVsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZWwuYmluZChcImNoYW5nZVwiLCB0aGlzLnVwZGF0ZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zaW1wbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy51cGRhdGUsIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IHRhcmdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3NpbXBsZSkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3RpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbC51bmJpbmQoXCJjaGFuZ2VcIiwgdGhpcy51cGRhdGUpO1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIF91cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0LnNldCh0aGlzLmVsLnZhbCgpKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBiaW5kVmFsKGVsLCB2YWx1ZSwgYmluZGluZywgc2ltcGxlKSB7XHJcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlICE9PSBcImJvb2xlYW5cIikpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZhbHVlQmluZGluZyhlbCwgdmFsdWUsIGJpbmRpbmcsIHNpbXBsZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0YXJnZXQgPSBuZXcgUHJvcGVydHlfMS5kZWZhdWx0KCk7XHJcbiAgICByZXR1cm4gdGFyZ2V0Lm93bmluZyhuZXcgVmFsdWVMaXN0ZW5lcihlbCwgeyB0YXJnZXQ6IHRhcmdldCwgc2ltcGxlOiBzaW1wbGUgfSkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRWYWw7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVltbHVaRlpoYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OWlhVzVrVm1Gc0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVRzN096czdPenM3T3pzN096czdPenM3T3pzN096dEZRWE5DUlRzN096czdRVUZIUml4dlJFRkJORUk3UVVGSE5VSXNlVU5CUVhWRE8wRkJRM1pETEcxRFFVRXJRenRCUVVVdlF5d3dSRUZCYTBNN1FVRkZiRU1zVFVGQlRTeFpRVUZoTEZOQlFWRXNaVUZCU3p0SlFVY3ZRaXhaUVVGWkxFVkJRVlVzUlVGQlJTeFJRVUZoTEVWQlFVVXNWVUZCWlN4alFVRk5MRVZCUVVVc1RVRkJaMEk3VVVGRE4wVXNTMEZCU3l4RlFVRkZMRU5CUVVNN1VVRkRVaXhKUVVGSkxFOUJRVThzVDBGQlR5eExRVUZMTEZOQlFWTXNSVUZCUlR0WlFVTnFReXhOUVVGTkxFZEJRVWNzVDBGQlR5eERRVUZETzFsQlEycENMRTlCUVU4c1IwRkJSeXhqUVVGTkxFTkJRVU03VTBGRGFrSTdVVUZEUkN4SlFVRkpMRTlCUVU4c1IwRkJSeXhqUVVGTkxFVkJRVVU3V1VGRGNrSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxGbEJRVmtzUTBGQlF5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVONlF6dFJRVU5FTEVsQlFVa3NUMEZCVHl4SFFVRkhMR0ZCUVVzc1JVRkJSVHRaUVVOd1FpeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1lVRkJZU3hEUVVGRExFVkJRVVVzUlVGQlJTeEZRVUZETEUxQlFVMHNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUlVGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTndSVHRKUVVOR0xFTkJRVU03UTBGRFJEdEJRVVZFTEUxQlFVMHNXVUZCWVN4VFFVRlJMR1ZCUVVzN1NVRkRMMElzV1VGQmIwSXNSVUZCVlN4RlFVRlZMRkZCUVhWQ08xRkJRemxFTEV0QlFVc3NSVUZCUlN4RFFVRkRPMUZCUkZjc1QwRkJSU3hIUVVGR0xFVkJRVVVzUTBGQlVUdFJRVUZWTEdGQlFWRXNSMEZCVWl4UlFVRlJMRU5CUVdVN1VVRkZPVVFzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMUZCUTJZc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRNMFFzUTBGQlF6dEpRVVZQTEU5QlFVODdVVUZEWkN4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJ4RExFbEJRVWtzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRVZCUVVVc1MwRkJTeXhMUVVGTExFVkJRVVU3V1VGRE5VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xTkJRM0pETzBsQlEwWXNRMEZCUXp0RFFVTkVPMEZCUlVRc1RVRkJUU3hoUVVGakxGTkJRVkVzWlVGQlN6dEpRVTFvUXl4WlFVRnZRaXhGUVVGVkxFVkJRVVVzVTBGQkswSXNSVUZCUlR0UlFVTm9SU3hMUVVGTExFVkJRVVVzUTBGQlF6dFJRVVJYTEU5QlFVVXNSMEZCUml4RlFVRkZMRU5CUVZFN1VVRkZOMElzU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdVVUZEYmtNc1NVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eE5RVUZOTEVOQlFVTXNUVUZCVFN4SlFVRkpMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeHJRa0ZCVVN4RlFVRlZMRU5CUVVNc1EwRkJRenRSUVVOcVJTeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFbEJRVWtzUTBGQlF5eHpRa0ZCVnl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRMnBFTEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJRenRSUVVOa0xFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSU3hKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZEY0VNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVTdXVUZEYkVJc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eE5RVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTTdVMEZEYmtRN1NVRkRSaXhEUVVGRE8wbEJSVVFzU1VGQlNTeE5RVUZOTzFGQlExUXNUMEZCVHl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRE8wbEJRM0pDTEVOQlFVTTdTVUZGUkN4UFFVRlBPMUZCUTA0c1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVTdXVUZEYkVJc1lVRkJZU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTXpRanRSUVVORUxFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1JVRkJSU3hKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZEZEVNc1MwRkJTeXhEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETzBsQlEycENMRU5CUVVNN1NVRkZSQ3hQUVVGUE8xRkJRMDRzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVUwc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRPMGxCUTNSRExFTkJRVU03UTBGRFJEdEJRV3REUkN4VFFVRjNRaXhQUVVGUExFTkJRVU1zUlVGQlZTeEZRVUZGTEV0QlFWVXNSVUZCUlN4UFFVRmhMRVZCUVVVc1RVRkJXVHRKUVVOc1JpeEpRVUZKTEV0QlFVc3NTVUZCU1N4SlFVRkpMRWxCUVVrc1EwRkJReXhQUVVGUExFdEJRVXNzUzBGQlN5eFRRVUZUTEVOQlFVTXNSVUZCUlR0UlFVTnNSQ3hQUVVGUExFbEJRVWtzV1VGQldTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzB0QlEzQkVPMGxCUTBRc1RVRkJUU3hOUVVGTkxFZEJRVWNzU1VGQlNTeHJRa0ZCVVN4RlFVRlZMRU5CUVVNN1NVRkRkRU1zVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1lVRkJZU3hEUVVGRExFVkJRVVVzUlVGQlJTeEZRVUZETEUxQlFVMHNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUlVGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTXZSU3hEUVVGRE8wRkJUa1FzTUVKQlRVTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2x4dVRVbFVJRXhwWTJWdWMyVmNibHh1UTI5d2VYSnBaMmgwSUNoaktTQXlNREl3SUVWbmIzSWdUbVZ3YjIxdWVXRnpZMmhwYUZ4dVhHNVFaWEp0YVhOemFXOXVJR2x6SUdobGNtVmllU0JuY21GdWRHVmtMQ0JtY21WbElHOW1JR05vWVhKblpTd2dkRzhnWVc1NUlIQmxjbk52YmlCdlluUmhhVzVwYm1jZ1lTQmpiM0I1WEc1dlppQjBhR2x6SUhOdlpuUjNZWEpsSUdGdVpDQmhjM052WTJsaGRHVmtJR1J2WTNWdFpXNTBZWFJwYjI0Z1ptbHNaWE1nS0hSb1pTQmNJbE52Wm5SM1lYSmxYQ0lwTENCMGJ5QmtaV0ZzWEc1cGJpQjBhR1VnVTI5bWRIZGhjbVVnZDJsMGFHOTFkQ0J5WlhOMGNtbGpkR2x2Yml3Z2FXNWpiSFZrYVc1bklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpYRzUwYnlCMWMyVXNJR052Y0hrc0lHMXZaR2xtZVN3Z2JXVnlaMlVzSUhCMVlteHBjMmdzSUdScGMzUnlhV0oxZEdVc0lITjFZbXhwWTJWdWMyVXNJR0Z1WkM5dmNpQnpaV3hzWEc1amIzQnBaWE1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMQ0JoYm1RZ2RHOGdjR1Z5YldsMElIQmxjbk52Ym5NZ2RHOGdkMmh2YlNCMGFHVWdVMjltZEhkaGNtVWdhWE5jYm1aMWNtNXBjMmhsWkNCMGJ5QmtieUJ6Ynl3Z2MzVmlhbVZqZENCMGJ5QjBhR1VnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNWNibFJvWlNCaFltOTJaU0JqYjNCNWNtbG5hSFFnYm05MGFXTmxJR0Z1WkNCMGFHbHpJSEJsY20xcGMzTnBiMjRnYm05MGFXTmxJSE5vWVd4c0lHSmxJR2x1WTJ4MVpHVmtJR2x1SUdGc2JGeHVZMjl3YVdWeklHOXlJSE4xWW5OMFlXNTBhV0ZzSUhCdmNuUnBiMjV6SUc5bUlIUm9aU0JUYjJaMGQyRnlaUzVjYmx4dVZFaEZJRk5QUmxSWFFWSkZJRWxUSUZCU1QxWkpSRVZFSUZ3aVFWTWdTVk5jSWl3Z1YwbFVTRTlWVkNCWFFWSlNRVTVVV1NCUFJpQkJUbGtnUzBsT1JDd2dSVmhRVWtWVFV5QlBVbHh1U1UxUVRFbEZSQ3dnU1U1RFRGVkVTVTVISUVKVlZDQk9UMVFnVEVsTlNWUkZSQ0JVVHlCVVNFVWdWMEZTVWtGT1ZFbEZVeUJQUmlCTlJWSkRTRUZPVkVGQ1NVeEpWRmtzWEc1R1NWUk9SVk5USUVaUFVpQkJJRkJCVWxSSlExVk1RVklnVUZWU1VFOVRSU0JCVGtRZ1RrOU9TVTVHVWtsT1IwVk5SVTVVTGlCSlRpQk9UeUJGVmtWT1ZDQlRTRUZNVENCVVNFVmNia0ZWVkVoUFVsTWdUMUlnUTA5UVdWSkpSMGhVSUVoUFRFUkZVbE1nUWtVZ1RFbEJRa3hGSUVaUFVpQkJUbGtnUTB4QlNVMHNJRVJCVFVGSFJWTWdUMUlnVDFSSVJWSmNia3hKUVVKSlRFbFVXU3dnVjBoRlZFaEZVaUJKVGlCQlRpQkJRMVJKVDA0Z1QwWWdRMDlPVkZKQlExUXNJRlJQVWxRZ1QxSWdUMVJJUlZKWFNWTkZMQ0JCVWtsVFNVNUhJRVpTVDAwc1hHNVBWVlFnVDBZZ1QxSWdTVTRnUTA5T1RrVkRWRWxQVGlCWFNWUklJRlJJUlNCVFQwWlVWMEZTUlNCUFVpQlVTRVVnVlZORklFOVNJRTlVU0VWU0lFUkZRVXhKVGtkVElFbE9JRlJJUlZ4dVUwOUdWRmRCVWtVdVhHNHFMMXh1WEc1cGJYQnZjblFnUW1sdVpHRmliR1VnWm5KdmJTQW5MaTlDYVc1a1lXSnNaU2M3WEc1cGJYQnZjblFnUTJ4aGMzTWdabkp2YlNBbkxpOURiR0Z6Y3ljN1hHNXBiWEJ2Y25RZ1JHVnpkSEp2ZVdGaWJHVWdabkp2YlNBbkxpOUVaWE4wY205NVlXSnNaU2M3WEc1cGJYQnZjblFnUkdWemRISnZlV0ZpYkdWQ2FXNWtZV0pzWlNCbWNtOXRJQ2N1TDBSbGMzUnliM2xoWW14bFFtbHVaR0ZpYkdVbk8xeHVhVzF3YjNKMElIdHBjMVJsZUhSSmJuQjFkSDBnWm5KdmJTQW5MaTlFYjIxVmRHbHNjeWM3WEc1cGJYQnZjblFnZTBKcGJtUnBibWNzSUZWUVJFRlVSU3dnVjBGVVEwaDlJR1p5YjIwZ0p5NHZhVzVrWlhnbk8xeHVhVzF3YjNKMElFbFFjbTl3WlhKMGVTQm1jbTl0SUNjdUwwbFFjbTl3WlhKMGVTYzdYRzVwYlhCdmNuUWdVSEp2Y0dWeWRIa2dabkp2YlNBbkxpOVFjbTl3WlhKMGVTYzdYRzVjYm1Oc1lYTnpJRlpoYkhWbFFtbHVaR2x1WnlCbGVIUmxibVJ6SUVOc1lYTnpJSHRjYmx4MFkyOXVjM1J5ZFdOMGIzSW9aV3c2SUVwUmRXVnllU3dnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEdGdWVUNHBPMXh1WEhSamIyNXpkSEoxWTNSdmNpaGxiRG9nU2xGMVpYSjVMQ0J3Y205d1pYSjBlVG9nU1ZCeWIzQmxjblI1UEhOMGNtbHVaejRzSUdKcGJtUnBibWM2SUVKcGJtUnBibWNzSUhOcGJYQnNaVDg2SUdKdmIyeGxZVzRwTzF4dVhIUmpiMjV6ZEhKMVkzUnZjaWhsYkRvZ1NsRjFaWEo1TENCd2NtOXdaWEowZVRvZ1lXNTVMQ0JpYVc1a2FXNW5PaUJoYm5rZ1BTQlZVRVJCVkVVc0lITnBiWEJzWlQ4NklHSnZiMnhsWVc0cElIdGNibHgwWEhSemRYQmxjaWdwTzF4dVhIUmNkR2xtSUNoMGVYQmxiMllnWW1sdVpHbHVaeUE5UFQwZ1hDSmliMjlzWldGdVhDSXBJSHRjYmx4MFhIUmNkSE5wYlhCc1pTQTlJR0pwYm1ScGJtYzdYRzVjZEZ4MFhIUmlhVzVrYVc1bklEMGdWVkJFUVZSRk8xeHVYSFJjZEgxY2JseDBYSFJwWmlBb1ltbHVaR2x1WnlBbUlGVlFSRUZVUlNrZ2UxeHVYSFJjZEZ4MGRHaHBjeTV2ZDI0b2JtVjNJRlpoYkhWbFZYQmtZWFJsY2lobGJDd2djSEp2Y0dWeWRIa3BLVHRjYmx4MFhIUjlYRzVjZEZ4MGFXWWdLR0pwYm1ScGJtY2dKaUJYUVZSRFNDa2dlMXh1WEhSY2RGeDBkR2hwY3k1dmQyNG9ibVYzSUZaaGJIVmxUR2x6ZEdWdVpYSW9aV3dzSUh0MFlYSm5aWFE2SUhCeWIzQmxjblI1TENCemFXMXdiR1U2SUhOcGJYQnNaWDBwS1R0Y2JseDBYSFI5WEc1Y2RIMWNibjFjYmx4dVkyeGhjM01nVm1Gc2RXVlZjR1JoZEdWeUlHVjRkR1Z1WkhNZ1EyeGhjM01nZTF4dVhIUmpiMjV6ZEhKMVkzUnZjaWh3Y21sMllYUmxJR1ZzT2lCS1VYVmxjbmtzSUhCeWFYWmhkR1VnY0hKdmNHVnlkSGs2SUVKcGJtUmhZbXhsUEdGdWVUNHBJSHRjYmx4MFhIUnpkWEJsY2lncE8xeHVYSFJjZEhSb2FYTXVYM1Z3WkdGMFpTZ3BPMXh1WEhSY2RIUm9hWE11YjNkdUtIQnliM0JsY25SNUxtTm9ZVzVuWlVWMlpXNTBMbXhwYzNSbGJpaDBhR2x6TGw5MWNHUmhkR1VzSUhSb2FYTXBLVHRjYmx4MGZWeHVYRzVjZEhCeWFYWmhkR1VnWDNWd1pHRjBaU2dwSUh0Y2JseDBYSFJqYjI1emRDQjJZV3gxWlNBOUlIUm9hWE11Y0hKdmNHVnlkSGt1WjJWMEtDazdYRzVjZEZ4MGFXWWdLSFJvYVhNdVpXd3VkbUZzS0NrZ0lUMDlJSFpoYkhWbEtTQjdYRzVjZEZ4MFhIUjBhR2x6TG1Wc0xuWmhiQ2gyWVd4MVpTa3VkSEpwWjJkbGNpaGNJbU5vWVc1blpWd2lLVHRjYmx4MFhIUjlYRzVjZEgxY2JuMWNibHh1WTJ4aGMzTWdWbUZzZFdWTWFYTjBaVzVsY2lCbGVIUmxibVJ6SUVOc1lYTnpJSHRjYmx4MGNISnBkbUYwWlNCZmRHRnlaMlYwT2lCSlVISnZjR1Z5ZEhrOGMzUnlhVzVuUGp0Y2JseDBjSEpwZG1GMFpTQmZjMmx0Y0d4bE9pQmliMjlzWldGdU8xeHVYSFJ3Y21sMllYUmxJRjkwYVcxbGNqb2diblZ0WW1WeU8xeHVYSFJ3Y21sMllYUmxJSFZ3WkdGMFpUb2dLQ2tnUFQ0Z2RtOXBaRHRjYmx4dVhIUmpiMjV6ZEhKMVkzUnZjaWh3Y21sMllYUmxJR1ZzT2lCS1VYVmxjbmtzSUdOdmJtWnBaem9nVm1Gc2RXVk1hWE4wWlc1bGNpNURiMjVtYVdjZ1BTQjdmU2tnZTF4dVhIUmNkSE4xY0dWeUtDazdYRzVjZEZ4MGRHaHBjeTUxY0dSaGRHVWdQU0FvS1NBOVBpQjBhR2x6TGw5MWNHUmhkR1VvS1R0Y2JseDBYSFIwYUdsekxsOTBZWEpuWlhRZ1BTQmpiMjVtYVdjdWRHRnlaMlYwSUh4OElIUm9hWE11YjNkdUtHNWxkeUJRY205d1pYSjBlVHh6ZEhKcGJtYytLQ2twTzF4dVhIUmNkSFJvYVhNdVgzTnBiWEJzWlNBOUlHTnZibVpwWnk1emFXMXdiR1VnZkh3Z0lXbHpWR1Y0ZEVsdWNIVjBLR1ZzS1R0Y2JseDBYSFIwYUdsekxuVndaR0YwWlNncE8xeHVYSFJjZEhSb2FYTXVaV3d1WW1sdVpDaGNJbU5vWVc1blpWd2lMQ0IwYUdsekxuVndaR0YwWlNrN1hHNWNkRngwYVdZZ0tDRjBhR2x6TGw5emFXMXdiR1VwSUh0Y2JseDBYSFJjZEhSb2FYTXVYM1JwYldWeUlEMGdkMmx1Wkc5M0xuTmxkRWx1ZEdWeWRtRnNLSFJvYVhNdWRYQmtZWFJsTENBeE1EQXBPMXh1WEhSY2RIMWNibHgwZlZ4dVhHNWNkR2RsZENCMFlYSm5aWFFvS1RvZ1FtbHVaR0ZpYkdVOGMzUnlhVzVuUGlCN1hHNWNkRngwY21WMGRYSnVJSFJvYVhNdVgzUmhjbWRsZER0Y2JseDBmVnh1WEc1Y2RHUmxjM1J5YjNrb0tTQjdYRzVjZEZ4MGFXWWdLQ0YwYUdsekxsOXphVzF3YkdVcElIdGNibHgwWEhSY2RHTnNaV0Z5U1c1MFpYSjJZV3dvZEdocGN5NWZkR2x0WlhJcE8xeHVYSFJjZEgxY2JseDBYSFIwYUdsekxtVnNMblZ1WW1sdVpDaGNJbU5vWVc1blpWd2lMQ0IwYUdsekxuVndaR0YwWlNrN1hHNWNkRngwYzNWd1pYSXVaR1Z6ZEhKdmVTZ3BPMXh1WEhSOVhHNWNibHgwWDNWd1pHRjBaU2dwSUh0Y2JseDBYSFIwYUdsekxsOTBZWEpuWlhRdWMyVjBLRHhoYm5rK2RHaHBjeTVsYkM1MllXd29LU2s3WEc1Y2RIMWNibjFjYmx4dWJtRnRaWE53WVdObElGWmhiSFZsVEdsemRHVnVaWElnZTF4dVhIUmxlSEJ2Y25RZ2FXNTBaWEptWVdObElFTnZibVpwWnlCN1hHNWNkRngwY21WaFpHOXViSGtnZEdGeVoyVjBQem9nU1ZCeWIzQmxjblI1UEhOMGNtbHVaejQ3WEc1Y2RGeDBjbVZoWkc5dWJIa2djMmx0Y0d4bFB6b2dZbTl2YkdWaGJqdGNibHgwZlZ4dWZWeHVYRzR2S2lwY2JpQXFJRkpsZEhWeWJuTWdZU0J6ZEhKcGJtY2djSEp2Y0dWeWRIa2dZMjl1ZEdGcGJtbHVaeUJqZFhKeVpXNTBJRVJQVFNCbGJHVnRaVzUwSUhaaGJIVmxJR0Z1WkNCemRHRnlkSE1nZDJGMFkyaHBibWNnWm05eUlHbDBjeUJ0YjJScFptbGpZWFJwYjI0dVhHNGdLaUJBY0dGeVlXMGdaV3dnUkU5TklHVnNaVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdjMmx0Y0d4bElFUnBjMkZpYkdVZ2JHbDJaU0IzWVhSamFDQmllU0IwYVcxbGNpNWNiaUFxSUVCeVpYUjFjbTV6SUVKdmRXNWtJSEJ5YjNCbGNuUjVMaUJaYjNVZ2JYVnpkQ0JrWlhOMGNtOTVJR2wwSUhSdklITjBiM0FnZEdobElITjVibU5vY205dWFYcGhkR2x2Ymk1Y2JpQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdZbWx1WkZaaGJDaGxiRG9nU2xGMVpYSjVMQ0J6YVcxd2JHVS9PaUJpYjI5c1pXRnVLVG9nUkdWemRISnZlV0ZpYkdWQ2FXNWtZV0pzWlR4emRISnBibWMrTzF4dVhHNHZLaXBjYmlBcUlGZGhkR05vWlhNZ2MzUnlhVzVuSUhCeWIzQmxjblI1SUcxdlpHbG1hV05oZEdsdmJpQmhibVFnZFhCa1lYUmxjeUIwYUdVZ1JFOU5JR1ZzWlcxbGJuUWdkbUZzZFdVdVhHNGdLaUJBY0dGeVlXMGdaV3dnUkU5TklHVnNaVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdkbUZzZFdVZ1JXeGxiV1Z1ZENCMllXeDFaU0IwYnlCaGMzTnBaMjR1WEc0Z0tpQkFjbVYwZFhKdWN5QkNhVzVrYVc1bklHOWlhbVZqZEM0Z1dXOTFJRzExYzNRZ1pHVnpkSEp2ZVNCcGRDQjBieUJ6ZEc5d0lIUm9aU0J6ZVc1amFISnZibWw2WVhScGIyNHVYRzRnS2k5Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdaMWJtTjBhVzl1SUdKcGJtUldZV3dvWld3NklFcFJkV1Z5ZVN3Z2RtRnNkV1U2SUVKcGJtUmhZbXhsUEdGdWVUNHBPaUJFWlhOMGNtOTVZV0pzWlR0Y2JseHVMeW9xWEc0Z0tpQlhZWFJqYUdWeklITjBjbWx1WnlCd2NtOXdaWEowZVNCdGIyUnBabWxqWVhScGIyNGdZVzVrSUhWd1pHRjBaWE1nZEdobElFUlBUU0JsYkdWdFpXNTBJSFpoYkhWbElHRnVaQzl2Y2lCMmFXTmxJSFpsY25OaExseHVJQ29nUUhCaGNtRnRJR1ZzSUVSUFRTQmxiR1Z0Wlc1MExseHVJQ29nUUhCaGNtRnRJSFpoYkhWbElFVnNaVzFsYm5RZ2RtRnNkV1VnZEc4Z2NtVmhaQ0JoYm1RdmIzSWdkM0pwZEdVdVhHNGdLaUJBY0dGeVlXMGdZbWx1WkdsdVp5QkNhVzVrYVc1bklHUnBjbVZqZEdsdmJpNWNiaUFxSUVCd1lYSmhiU0J6YVcxd2JHVWdSR2x6WVdKc1pTQnNhWFpsSUhkaGRHTm9JR0o1SUhScGJXVnlMbHh1SUNvZ1FISmxkSFZ5Ym5NZ1FtbHVaR2x1WnlCdlltcGxZM1F1SUZsdmRTQnRkWE4wSUdSbGMzUnliM2tnYVhRZ2RHOGdjM1J2Y0NCMGFHVWdjM2x1WTJoeWIyNXBlbUYwYVc5dUxseHVJQ292WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUJpYVc1a1ZtRnNLR1ZzT2lCS1VYVmxjbmtzSUhaaGJIVmxPaUJKVUhKdmNHVnlkSGs4YzNSeWFXNW5QaXdnWW1sdVpHbHVaem9nUW1sdVpHbHVaeXdnYzJsdGNHeGxQem9nWW05dmJHVmhiaWs2SUVSbGMzUnliM2xoWW14bE8xeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z1ltbHVaRlpoYkNobGJEb2dTbEYxWlhKNUxDQjJZV3gxWlRvZ1lXNTVMQ0JpYVc1a2FXNW5Qem9nWVc1NUxDQnphVzF3YkdVL09pQmhibmtwT2lCRVpYTjBjbTk1WVdKc1pTQjdYRzVjZEdsbUlDaDJZV3gxWlNBaFBTQnVkV3hzSUNZbUlDaDBlWEJsYjJZZ2RtRnNkV1VnSVQwOUlGd2lZbTl2YkdWaGJsd2lLU2tnZTF4dVhIUmNkSEpsZEhWeWJpQnVaWGNnVm1Gc2RXVkNhVzVrYVc1bktHVnNMQ0IyWVd4MVpTd2dZbWx1WkdsdVp5d2djMmx0Y0d4bEtUdGNibHgwZlZ4dVhIUmpiMjV6ZENCMFlYSm5aWFFnUFNCdVpYY2dVSEp2Y0dWeWRIazhjM1J5YVc1blBpZ3BPMXh1WEhSeVpYUjFjbTRnZEdGeVoyVjBMbTkzYm1sdVp5aHVaWGNnVm1Gc2RXVk1hWE4wWlc1bGNpaGxiQ3dnZTNSaGNtZGxkRG9nZEdGeVoyVjBMQ0J6YVcxd2JHVTZJSE5wYlhCc1pYMHBLVHRjYm4xY2JpSmRmUT09Il0sInNvdXJjZVJvb3QiOiIifQ==