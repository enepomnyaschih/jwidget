(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var n=$('<div style="float: right; width: 600px"><b>Source:</b> </div>'),r=!0;e.forEach(function(e){r?r=!1:n.append(", "),n.append($('<a target="_blank"></a>').text(e).attr("href","../src/"+t+"/"+e+".txt"))}),$("body").prepend('<div><b>Example</b></div><div><a href="javascript:location.reload()">Refresh</a></div><hr style="clear: both">').prepend(n)}},39:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(6),n(7);var r=n(2),o=n(44);n(68),$(function(){r.default("bindAttr",["Application.ts","Application.jw.html","Application.styl","index.ts"]),(new o.default).renderTo("body")})},44:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__decorate||function(t,e,n,r){var o,i=arguments.length,u=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(u=(i<3?o(u):i>3?o(e,n,u):o(e,n))||u);return i>3&&u&&Object.defineProperty(e,n,u),u};Object.defineProperty(e,"__esModule",{value:!0});var i=n(45),u=n(8),a=n(4),p=n(5),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.renderRect=function(t){var e=u.default(this.getElement("input"));i.default(t,"title",e)},e=o([p.default(n(67))],e)}(a.default);e.default=c},45:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){function e(e,n,r){var o=t.call(this)||this;return o.el=e,o.attr=n,o.property=r,o._update(),o.own(r.changeEvent.listen(o._update,o)),o}return r(e,t),e.prototype._update=function(){this.el.attr(this.attr,this.property.get())},e}(n(0).default);e.default=function(t,e,n){return new o(t,e,n)}},67:function(t,e){t.exports='<div jwclass="application"><div>"title" attribute: <input jwid="input" type="text" value="This is a tooltip!"></div><div jwid="rect">Modify as you wish and hover mouse to see a tooltip</div></div>\n'},68:function(t,e,n){},8:function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(9),u=n(1),a=n(3),p=function(t){function e(e,n,r,o){void 0===r&&(r=u.UPDATE);var i=t.call(this)||this;return"boolean"==typeof r&&(o=r,r=u.UPDATE),r&u.UPDATE&&i.own(new c(e,n)),r&u.WATCH&&i.own(new l(e,{target:n,simple:o})),i}return r(e,t),e}(o.default),c=function(t){function e(e,n){var r=t.call(this)||this;return r.el=e,r.property=n,r._update(),r.own(n.changeEvent.listen(r._update,r)),r}return r(e,t),e.prototype._update=function(){var t=this.property.get();this.el.val()!==t&&this.el.val(t).trigger("change")},e}(o.default),l=function(t){function e(e,n){void 0===n&&(n={});var r=t.call(this)||this;return r.el=e,r.update=function(){return r._update()},r._target=n.target||r.own(new a.default),r._simple=n.simple||!i.isTextInput(e),r.update(),r.el.bind("change",r.update),r._simple||(r._timer=window.setInterval(r.update,100)),r}return r(e,t),Object.defineProperty(e.prototype,"target",{get:function(){return this._target},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this._simple||clearInterval(this._timer),this.el.unbind("change",this.update),t.prototype.destroy.call(this)},e.prototype._update=function(){this._target.set(this.el.val())},e}(o.default);e.default=function(t,e,n,r){if(null!=e&&"boolean"!=typeof e)return new p(t,e,n,r);var o=new a.default;return o.owning(new l(t,{target:o,simple:r}))}}},[[39,1,0]]]);