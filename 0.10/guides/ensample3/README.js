Ext.data.JsonP.ensample3({"guide":"<h1 id='ensample3-section-part-3.-named-child-components'>Part 3. Named child components</h1>\n\n<p>Demo: <a href=\"http://enepomnyaschih.github.io/mt/0.9.0-3/\">http://enepomnyaschih.github.io/mt/0.9.0-3/</a></p>\n\n<p>Source: <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-3\">https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-3</a> (Git branch)</p>\n\n<p>In this sample we'll learn how to render child components, which don't belong to arrays.</p>\n\n<p>Examples of such components are user profile panel and tweet feed - child components of application:</p>\n\n<p><p><img src=\"guides/ensample3/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>First, let's implement mt.Application class, which will be root view of our application.</p>\n\n<p><strong>public/mt/application/application.js</strong></p>\n\n<pre><code>mt.Application = function(data) {\n    mt.Application.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.data = data;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.Application, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.Data data;\n    */\n\n    renderTweets: function() {\n        return this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new mt.TweetFeed(this.data));\n    },\n\n    // override\n    <a href=\"#!/api/JW.UI.Component-method-renderComponent\" rel=\"JW.UI.Component-method-renderComponent\" class=\"docClass\">renderComponent</a>: function() {\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n        $(\"html\").addClass(\"mt-html\");\n        $(\"body\").addClass(\"mt-body\");\n    }\n});\n\n<a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a>(mt.Application, {\n    main:\n        '&lt;div jwclass=\"mt-application\"&gt;' +\n            '&lt;div jwid=\"wrap\"&gt;' +\n                '&lt;div jwid=\"profile-box\"&gt;&lt;/div&gt;' +\n                '&lt;div jwid=\"tweets\"&gt;&lt;/div&gt;' +\n                '&lt;div class=\"clear\"&gt;&lt;/div&gt;' +\n            '&lt;/div&gt;' +\n        '&lt;/div&gt;'\n});\n</code></pre>\n\n<p>Once again, we see method <code>render&lt;ChildId&gt;</code> (renderTweets), and once again it does something new. This time, it\ncreates and returns an instance of mt.TweetFeed class. It means that a new component mt.TweetFeed will be\nrendered at the place of element with jwid=\"tweets\". This element will be completely replaced with new component,\nand all its CSS classes (here: mt-application-tweets) will be copied into root element of the component.</p>\n\n<p>Let's review some details of this feature.</p>\n\n<p><strong>First</strong>, it is important to understand that after instantiation of mt.TweetFeed class object this component\nis not rendered yet. It means that it doesn't have HTML elements and capability to add child components.\nComponent will be rendered automatically somewhere inside framework, later. But if you really need to perform\nsome additional actions with the rendered component (for example, add a CSS-class),\nyou can render it explicitly using <a href=\"#!/api/JW.UI.Component-method-render\" rel=\"JW.UI.Component-method-render\" class=\"docClass\">render</a> method:</p>\n\n<pre><code>    renderTweets: function(el) {\n        var tweetFeed = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new mt.TweetFeed(this.data));\n        tweetFeed.<a href=\"#!/api/JW.UI.Component-method-render\" rel=\"JW.UI.Component-method-render\" class=\"docClass\">render</a>(el);\n        tweetFeed.<a href=\"#!/api/JW.UI.Component-property-el\" rel=\"JW.UI.Component-property-el\" class=\"docClass\">el</a>.addClass(\"my-extra-class\");\n        return tweetFeed;\n    },\n</code></pre>\n\n<p>Argument \"el\" is optional to pass, but recommended. Some components may use\n<a href=\"#!/api/JW.UI.Component-property-replacedEl\" rel=\"JW.UI.Component-property-replacedEl\" class=\"docClass\">replacedEl</a> field to render their content - \"el\" argument determines its value.</p>\n\n<p><strong>Second</strong>, like in the previous parts, we must find a way to add a child component without\n<code>render&lt;ChildId&gt;</code> method definition. You can do it using <a href=\"#!/api/JW.UI.Component-property-children\" rel=\"JW.UI.Component-property-children\" class=\"docClass\">children</a> observable map:</p>\n\n<pre><code>    // override\n    <a href=\"#!/api/JW.UI.Component-method-renderComponent\" rel=\"JW.UI.Component-method-renderComponent\" class=\"docClass\">renderComponent</a>: function() {\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n        this.<a href=\"#!/api/JW.UI.Component-property-children\" rel=\"JW.UI.Component-property-children\" class=\"docClass\">children</a>.<a href=\"#!/api/JW.AbstractMap-method-set\" rel=\"JW.AbstractMap-method-set\" class=\"docClass\">set</a>(this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new mt.TweetFeed(this.data)), \"tweets\");\n    },\n</code></pre>\n\n<p>Select the way you like more.</p>\n\n<p>Add CSS.</p>\n\n<p><strong>public/mt/application/application.css</strong></p>\n\n<pre><code>.mt-html,\n.mt-body {\n  background: #c0deed;\n}\n.mt-application {\n  font-family: Arial, sans-serif;\n}\n.mt-application-wrap {\n  background: rgba(255,255,255,0.5);\n  margin: 0 auto;\n  padding: 15px;\n  width: 868px;\n}\n.mt-application-profile-box {\n  float: left;\n  width: 302px;\n}\n.mt-application-tweets {\n  float: left;\n  margin-left: 13px;\n}\n</code></pre>\n\n<p>Update index.html:</p>\n\n<pre><code>        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/application/application.css\" /&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/application/application.js\"&gt;&lt;/script&gt;\n</code></pre>\n\n<p>Update boot.js:</p>\n\n<pre><code>var data;\nvar application;\n\n$(function() {\n    data = mt.Data.createByJson([\n        {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"jWidget documentation is here &lt;a href=\\\"https://enepomnyaschih.github.com/jwidget\\\" target=\\\"_blank\\\"&gt;enepomnyaschih.github.com/jwidget&lt;/a&gt;\",\n            \"timeAgo\": 215000,\n            \"like\": false,\n            \"retweet\": true\n        }, {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"Tweet feed is growing\",\n            \"timeAgo\": 515000,\n            \"like\": false,\n            \"retweet\": false\n        }\n    ]);\n    application = new mt.Application(data);\n    application.<a href=\"#!/api/JW.UI.Component-method-renderTo\" rel=\"JW.UI.Component-method-renderTo\" class=\"docClass\">renderTo</a>(\"body\");\n});\n</code></pre>\n\n<p>We'll see the next result:</p>\n\n<p><p><img src=\"guides/ensample3/result-1.png\" alt=\"\" width=\"971\" height=\"308\"></p></p>\n\n<p>Profile panel is remaining to implement.</p>\n\n<p>Let's start with model once again. We need data about current user profile. Let's extend mt.Data class:</p>\n\n<p><strong>public/mt/data/data.js</strong></p>\n\n<pre><code>mt.Data = function() {\n    mt.Data.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.profile = null;\n    this.tweets = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>()).<a href=\"#!/api/JW.AbstractCollection-method-ownItems\" rel=\"JW.AbstractCollection-method-ownItems\" class=\"docClass\">ownItems</a>();\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.Data, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    /*\n    mt.data.Profile profile;\n    <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>&lt;mt.data.Tweet&gt; tweets;\n    */\n});\n\nmt.Data.createByJson = function(json) {\n    var data = new mt.Data();\n    data.profile = data.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(mt.data.Profile.createByJson(json.profile));\n    data.tweets.<a href=\"#!/api/JW.AbstractArray-method-addAll\" rel=\"JW.AbstractArray-method-addAll\" class=\"docClass\">addAll</a>(<a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a>(json.tweets, mt.data.Tweet.createByJson));\n    return data;\n};\n\nmt.data = {};\n</code></pre>\n\n<p>Now, implement mt.data.Profile class.</p>\n\n<p><strong>public/mt/data/profile.js</strong></p>\n\n<pre><code>mt.data.Profile = function(config) {\n    mt.data.Profile.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.fullName = config.fullName;\n    this.shortName = config.shortName;\n    this.avatarUrl32 = config.avatarUrl32;\n    this.avatarUrl48 = config.avatarUrl48;\n    this.tweets = config.tweets;\n    this.following = config.following;\n    this.followers = config.followers;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.data.Profile, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    /*\n    string fullName;\n    string shortName;\n    string avatarUrl32;\n    string avatarUrl48;\n    number tweets;\n    number following;\n    number followers;\n    */\n});\n\nmt.data.Profile.createByJson = function(json) {\n    return new mt.data.Profile(json);\n};\n</code></pre>\n\n<p>Switch to view. Add profile panel rendering method to mt.Application:</p>\n\n<pre><code>    renderProfileBox: function() {\n        return this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new mt.ProfileBox(this.data));\n    },\n</code></pre>\n\n<p>Implement this component.</p>\n\n<p><strong>public/mt/profilebox/profilebox.js</strong></p>\n\n<pre><code>mt.ProfileBox = function(data) {\n    mt.ProfileBox.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.data = data;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.ProfileBox, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.Data data;\n    */\n\n    renderTop: function(el) {\n        el.attr(\"href\", \"https://twitter.com/\" + this.data.profile.shortName);\n    },\n\n    renderAvatar: function(el) {\n        el.css(\"background-image\", \"url(\" + this.data.profile.avatarUrl32 + \")\");\n    },\n\n    renderFullName: function(el) {\n        el.text(this.data.profile.fullName);\n    },\n\n    renderTweets: function(el) {\n        el.attr(\"href\", \"https://twitter.com/\" + this.data.profile.shortName);\n    },\n\n    renderTweetsValue: function(el) {\n        el.text(this.data.profile.tweets);\n    },\n\n    renderFollowingValue: function(el) {\n        el.text(this.data.profile.following);\n    },\n\n    renderFollowersValue: function(el) {\n        el.text(this.data.profile.followers);\n    }\n});\n\n<a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a>(mt.ProfileBox, {\n    main:\n        '&lt;div jwclass=\"mt-profile-box\"&gt;' +\n            '&lt;a jwid=\"top\" class=\"blocklink\" href=\"#\" target=\"_blank\"&gt;' +\n                '&lt;div jwid=\"avatar\"&gt;&lt;/div&gt;' +\n                '&lt;div jwid=\"full-name\"&gt;&lt;/div&gt;' +\n                '&lt;div jwid=\"show-profile\"&gt;Show my profile&lt;/div&gt;' +\n                '&lt;div class=\"clear\"&gt;&lt;/div&gt;' +\n            '&lt;/a&gt;' +\n            '&lt;div jwid=\"middle\"&gt;' +\n                '&lt;a jwid=\"count tweets\" class=\"blocklink\" href=\"#\" target=\"_blank\"&gt;' +\n                    '&lt;div jwid=\"count-value tweets-value\"&gt;&lt;/div&gt;' +\n                    '&lt;div jwid=\"count-label\"&gt;TWEETS&lt;/div&gt;' +\n                '&lt;/a&gt;' +\n                '&lt;a jwid=\"count count-border following\" class=\"blocklink\" href=\"https://twitter.com/following\" target=\"_blank\"&gt;' +\n                    '&lt;div jwid=\"count-value following-value\"&gt;&lt;/div&gt;' +\n                    '&lt;div jwid=\"count-label\"&gt;FOLLOWING&lt;/div&gt;' +\n                '&lt;/a&gt;' +\n                '&lt;a jwid=\"count count-border followers\" class=\"blocklink\" href=\"https://twitter.com/followers\" target=\"_blank\"&gt;' +\n                    '&lt;div jwid=\"count-value followers-value\"&gt;&lt;/div&gt;' +\n                    '&lt;div jwid=\"count-label\"&gt;FOLLOWERS&lt;/div&gt;' +\n                '&lt;/a&gt;' +\n                '&lt;div class=\"clear\"&gt;&lt;/div&gt;' +\n            '&lt;/div&gt;' +\n            '&lt;div jwid=\"bottom\"&gt;' +\n                '&lt;form jwid=\"compose-form\"&gt;' +\n                    '&lt;div jwid=\"compose-fields\"&gt;' +\n                        '&lt;textarea jwid=\"compose-input\" type=\"text\" placeholder=\"Compose tweet...\"&gt;&lt;/textarea&gt;' +\n                    '&lt;/div&gt;' +\n                    '&lt;div jwid=\"compose-buttons\"&gt;' +\n                        '&lt;input jwid=\"compose-submit\" type=\"submit\" value=\"Tweet\"&gt;' +\n                    '&lt;/div&gt;' +\n                '&lt;/form&gt;' +\n            '&lt;/div&gt;' +\n        '&lt;/div&gt;'\n});\n</code></pre>\n\n<p>Add CSS:</p>\n\n<p><strong>public/mt/profilebox/profilebox.css</strong></p>\n\n<pre><code>.mt-profile-box-full-name,\n.mt-profile-box-count-value,\n.mt-profile-box-compose-submit {\n  color: #333;\n  font-family: Arial, sans-serif;\n  font-size: 14px;\n  font-weight: bold;\n  text-shadow: 0 1px 0 #fff;\n}\n.mt-profile-box-show-profile,\n.mt-profile-box-count-label {\n  color: #999;\n  font-family: Arial, sans-serif;\n  font-size: 11px;\n  text-shadow: 0 1px 0 #fff;\n}\n.mt-profile-box {\n  border: 1px solid rgba(0,0,0,0.45);\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n}\n.mt-profile-box {\n  background: #f9f9f9;\n}\n.mt-profile-box-top {\n  border-bottom: 1px solid #e8e8e8;\n  padding: 12px;\n  padding-bottom: 2px;\n}\n.mt-profile-box-avatar {\n  background: transparent none no-repeat 0 0;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  float: left;\n  margin: 0 10px 10px 0;\n  width: 32px;\n  height: 32px;\n}\n.mt-profile-box-full-name {\n  padding-top: 2px;\n}\n.mt-profile-box-top:hover .mt-profile-box-full-name {\n  color: #0084b4;\n  text-decoration: underline;\n}\n.mt-profile-box-count {\n  float: left;\n  padding: 7px 12px;\n}\n.mt-profile-box-count:hover .mt-profile-box-count-value {\n  color: #0084b4;\n}\n.mt-profile-box-count:hover .mt-profile-box-count-label {\n  color: #0084b4;\n}\n.mt-profile-box-count-border {\n  border-left: 1px solid #e8e8e8;\n}\n.mt-profile-box-bottom {\n  background: #f5f5f5;\n  -webkit-border-radius: 0 0 6px 6px;\n  -moz-border-radius: 0 0 6px 6px;\n  border-radius: 0 0 6px 6px;\n  border-top: 1px solid #e8e8e8;\n  padding: 10px 12px;\n}\n.mt-profile-box-compose-input {\n  border: 1px solid #ccc;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  padding: 8px;\n  width: 274px;\n}\n.mt-profile-box-compose-buttons {\n  text-align: right;\n}\n.mt-profile-box-compose-submit {\n  background: #19aadf;\n  border: 1px solid #057ed0;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  color: #fff;\n  cursor: pointer;\n  padding: 6px 10px;\n  text-shadow: 0 -1px 0 rgba(0,0,0,0.45);\n}\n.mt-profile-box-compose-submit:hover {\n  background: #09a0d7;\n}\n</code></pre>\n\n<p>Update index.html:</p>\n\n<pre><code>        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/profilebox/profilebox.css\" /&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/profilebox/profilebox.js\"&gt;&lt;/script&gt;\n</code></pre>\n\n<p>Update boot.js:</p>\n\n<pre><code>var data;\nvar application;\n\n$(function() {\n    data = mt.Data.createByJson({\n        \"profile\": {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl32\": \"backend/avatar-32.png\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"tweets\": 380,\n            \"following\": 21,\n            \"followers\": 27\n        },\n        \"tweets\": [\n            {\n                \"fullName\": \"Road Runner\",\n                \"shortName\": \"roadrunner\",\n                \"avatarUrl48\": \"backend/avatar-48.png\",\n                \"contentHtml\": \"jWidget documentation is here &lt;a href=\\\"https://enepomnyaschih.github.com/jwidget\\\" target=\\\"_blank\\\"&gt;enepomnyaschih.github.com/jwidget&lt;/a&gt;\",\n                \"timeAgo\": 215000,\n                \"like\": false,\n                \"retweet\": true\n            }, {\n                \"fullName\": \"Road Runner\",\n                \"shortName\": \"roadrunner\",\n                \"avatarUrl48\": \"backend/avatar-48.png\",\n                \"contentHtml\": \"Tweet feed is growing\",\n                \"timeAgo\": 515000,\n                \"like\": false,\n                \"retweet\": false\n            }\n        ]\n    });\n    application = new mt.Application(data);\n    application.<a href=\"#!/api/JW.UI.Component-method-renderTo\" rel=\"JW.UI.Component-method-renderTo\" class=\"docClass\">renderTo</a>(\"body\");\n});\n</code></pre>\n\n<p>Here is the result, which represents original requirements:</p>\n\n<p><p><img src=\"guides/ensample3/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>We've learned how to render components and add them into each other. Now it's the time to add a bit of dynamics into\nour application. We'll describe this in next part.</p>\n","title":"Part 3. Named child components"});