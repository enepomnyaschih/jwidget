(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),r(24),r(28),r(31);var n=r(33),o=r(38);$(function(){var e=n.default.createByJson({profile:{fullName:"Road Runner",shortName:"roadrunner",avatarUrl32:"backend/avatar-32.png",avatarUrl48:"backend/avatar-48.png",tweets:380,following:21,followers:27},tweets:[{fullName:"Road Runner",shortName:"roadrunner",avatarUrl48:"backend/avatar-48.png",contentHtml:'jWidget documentation is here <a href="https://enepomnyaschih.github.com/jwidget" target="_blank">enepomnyaschih.github.com/jwidget</a>',timeAgo:215e3,like:!1,retweet:!0},{fullName:"Road Runner",shortName:"roadrunner",avatarUrl48:"backend/avatar-48.png",contentHtml:"Tweet feed is growing",timeAgo:515e3,like:!1,retweet:!1}]});new o.default(e).renderTo("body"),window.data=e})},31:function(e,t,r){},33:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(34),o=function(){function e(e,t){void 0===t&&(t=[]),this.profile=e,this.tweets=t}return e.createByJson=function(t){return new e(t.profile,(t.tweets||[]).map(n.default.createByJson))},e}();t.default=o},34:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o=r(8),i=function(){function e(e){this._likeChangeEvent=new o.default,this._retweetChangeEvent=new o.default,this.fullName=e.fullName,this.shortName=e.shortName,this.avatarUrl48=e.avatarUrl48,this.contentHtml=e.contentHtml,this.time=e.time,this._like=e.like,this._retweet=e.retweet}return Object.defineProperty(e.prototype,"like",{get:function(){return this._like},set:function(e){this._like!==e&&(this._like=e,this._likeChangeEvent.trigger(e))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"likeChangeEvent",{get:function(){return this._likeChangeEvent},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"retweet",{get:function(){return this._retweet},set:function(e){this._retweet!==e&&(this._retweet=e,this._retweetChangeEvent.trigger(e))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"retweetChangeEvent",{get:function(){return this._retweetChangeEvent},enumerable:!0,configurable:!0}),e.createByJson=function(t){return new e(n({},t,{time:(new Date).getTime()-t.timeAgo}))},e}();t.default=i},38:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a};Object.defineProperty(t,"__esModule",{value:!0});var i=r(11),a=r(13),u=r(59),c=r(61),l=function(e){function t(t){var r=e.call(this)||this;return r.data=t,r}return n(t,e),t.prototype.renderProfileBox=function(){return this.own(new u.default(this.data.profile))},t.prototype.renderTweets=function(){return this.own(new c.default(this.data.tweets))},t.prototype.afterRender=function(){e.prototype.afterRender.call(this),$("html").addClass("mt-html"),$("body").addClass("mt-body")},t=o([a.default(r(65))],t)}(i.default);t.default=l},59:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a};Object.defineProperty(t,"__esModule",{value:!0});var i=r(11),a=r(13),u=function(e){function t(t){var r=e.call(this)||this;return r.profile=t,r}return n(t,e),t.prototype.renderTop=function(e){e.attr("href","https://twitter.com/"+this.profile.shortName)},t.prototype.renderAvatar=function(e){e.css("background-image","url("+this.profile.avatarUrl32+")")},t.prototype.renderFullName=function(e){e.text(this.profile.fullName)},t.prototype.renderTweets=function(e){e.attr("href","https://twitter.com/"+this.profile.shortName)},t.prototype.renderTweetsValue=function(e){e.text(this.profile.tweets)},t.prototype.renderFollowingValue=function(e){e.text(this.profile.following)},t.prototype.renderFollowersValue=function(e){e.text(this.profile.followers)},t=o([a.default(r(60))],t)}(i.default);t.default=u},60:function(e,t){e.exports='<div jwclass="mt-profile-box"><a jwid="top" class="blocklink" href="#"><div jwid="avatar"></div><div jwid="full-name"></div><div jwid="show-profile">Show my profile</div></a><div jwid="middle"><a jwid="count tweets" class="blocklink" href="#"><div jwid="count-value tweets-value"></div><div jwid="count-label">TWEETS</div></a><a jwid="count count-border following" class="blocklink" href="#"><div jwid="count-value following-value"></div><div jwid="count-label">FOLLOWING</div></a><a jwid="count count-border followers" class="blocklink" href="#"><div jwid="count-value followers-value"></div><div jwid="count-label">FOLLOWERS</div></a></div><div jwid="bottom"><form jwid="compose-form"><div jwid="compose-fields"><textarea jwid="compose-input" placeholder="Compose tweet..."></textarea></div><div jwid="compose-buttons"><input jwid="compose-submit" type="submit" value="Tweet"></div></form></div></div>\n'},61:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a};Object.defineProperty(t,"__esModule",{value:!0});var i=r(11),a=r(5),u=r(13),c=r(62),l=function(e){function t(t){var r=e.call(this)||this;return r.tweets=t,r}return n(t,e),t.prototype.renderTweets=function(){var e=this.tweets.map(function(e){return new c.default(e)});return this.own(new a.default(e)).ownItems()},t=o([u.default(r(64))],t)}(i.default);t.default=l},62:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a};Object.defineProperty(t,"__esModule",{value:!0});var i=r(11),a=r(13),u=function(e){function t(t){var r=e.call(this)||this;return r.tweet=t,r}return n(t,e),t.prototype.renderAvatar=function(e){e.css("background-image","url("+this.tweet.avatarUrl48+")")},t.prototype.renderTime=function(e){var t=(new Date).getTime()-this.tweet.time,r=this._getTimeString(t);e.text(r)},t.prototype.renderFullName=function(e){e.text(this.tweet.fullName)},t.prototype.renderShortName=function(e){e.text("@"+this.tweet.shortName)},t.prototype.renderText=function(e){e.html(this.tweet.contentHtml)},t.prototype.renderLike=function(e){var t=this;this._updateLike(),this.tweet.likeChangeEvent.listen(function(){return t._updateLike()}),e.on("click",function(e){e.preventDefault(),t.tweet.like=!t.tweet.like})},t.prototype.renderRetweet=function(e){var t=this;this._updateRetweet(),this.tweet.retweetChangeEvent.listen(function(){return t._updateRetweet()}),e.on("click",function(e){e.preventDefault(),t.tweet.retweet=!t.tweet.retweet})},t.prototype._updateLike=function(){this.getElement("like").toggleClass("active",this.tweet.like).text(this.tweet.like?"Unlike":"Like")},t.prototype._updateRetweet=function(){this.getElement("retweet").toggleClass("active",this.tweet.retweet).text(this.tweet.retweet?"Unretweet":"Retweet")},t.prototype._getTimeString=function(e){var t=e/6e4;if(t<1)return"Just now";if(t<60)return Math.floor(t)+"m";var r=t/60;if(r<24)return Math.round(r)+"h";var n=new Date((new Date).getTime()-e);return n.getDate()+"."+function(e){return e<10?"0"+e:String(e)}(n.getMonth())},t=o([a.default(r(63))],t)}(i.default);t.default=u},63:function(e,t){e.exports='<div jwclass="mt-tweet"><div jwid="avatar"></div><div jwid="content"><div jwid="header"><div jwid="full-name"></div><div jwid="short-name"></div><div jwid="time"></div></div><div jwid="text"></div><div jwid="buttons"><a jwid="button like" href="#"></a><a jwid="button retweet" href="#"></a><a jwid="button remove" href="#">Remove</a></div></div></div>\n'},64:function(e,t){e.exports='<div jwclass="mt-tweet-feed"><div jwid="header">Tweets</div><div jwid="tweets"></div><div jwid="footer">...</div></div>\n'},65:function(e,t){e.exports='<div jwclass="mt-application"><div jwid="wrap"><div jwid="profile-box"></div><div jwid="tweets"></div></div></div>\n'}},[[23,2,1]]]);