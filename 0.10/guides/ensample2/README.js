Ext.data.JsonP.ensample2({"guide":"<h1 id='ensample2-section-part-2.-arrays-of-child-components'>Part 2. Arrays of child components</h1>\n\n<p>Demo: <a href=\"http://enepomnyaschih.github.io/mt/0.9.0-2/\">http://enepomnyaschih.github.io/mt/0.9.0-2/</a></p>\n\n<p>Source: <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-2\">https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-2</a> (Git branch)</p>\n\n<p>In this part, we'll meet <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>. We will try its algorithms\n<a href=\"#!/api/JW.AbstractArray-method-map\" rel=\"JW.AbstractArray-method-map\" class=\"docClass\">map</a> and <a href=\"#!/api/JW.AbstractArray-method-S-map\" rel=\"JW.AbstractArray-method-S-map\" class=\"docClass\">$map</a>\nand will learn how to add child UI component arrays.</p>\n\n<p>Our goal is to render an array of tweets, which we've developed in the previous part.</p>\n\n<p><p><img src=\"guides/ensample2/tweet-feed.png\" alt=\"\" width=\"522\" height=\"247\"></p></p>\n\n<p>Like in the first sample, let's start with the model. We must put several tweets into an array. Let's define a class mt.Data\nfor this. It will contain an array of the tweets.</p>\n\n<p><strong>public/mt/data/data.js</strong></p>\n\n<pre><code>mt.Data = function() {\n    mt.Data.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweets = new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>();\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.Data, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    /*\n    <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>&lt;mt.data.Tweet&gt; tweets;\n    */\n\n    // override\n    <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>: function() {\n        this.tweets.<a href=\"#!/api/JW.AbstractArray-method-S-clear\" rel=\"JW.AbstractArray-method-S-clear\" class=\"docClass\">$clear</a>().<a href=\"#!/api/JW.AbstractArray-method-each\" rel=\"JW.AbstractArray-method-each\" class=\"docClass\">each</a>(<a href=\"#!/api/JW-static-method-destroy\" rel=\"JW-static-method-destroy\" class=\"docClass\">JW.destroy</a>); // clear array and destroy items\n        this.tweets.<a href=\"#!/api/JW.AbstractArray-method-destroy\" rel=\"JW.AbstractArray-method-destroy\" class=\"docClass\">destroy</a>(); // destroy array\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n    }\n});\n\nmt.Data.createByJson = function(json) {\n    var data = new mt.Data();\n    data.tweets.<a href=\"#!/api/JW.AbstractArray-method-addAll\" rel=\"JW.AbstractArray-method-addAll\" class=\"docClass\">addAll</a>(<a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a>(json, mt.data.Tweet.createByJson));\n    return data;\n};\n\nmt.data = {};\n</code></pre>\n\n<p>You can see that we've defined <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>, but instantiated it as <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>. It is done for flexibility.\nProbably in future we'll replace the implementation of array with <a href=\"#!/api/JW.ObservableArray\" rel=\"JW.ObservableArray\" class=\"docClass\">JW.ObservableArray</a>.</p>\n\n<p>Deserialization is performed via static method <a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a>.\nThe method takes a native Array as a first argument and a callback function as a second argument.\nThe callback function mt.data.Tweet.createByJson converts an Object (JSON) into a mt.data.Tweet instance,\nthat we've implemented in the previous part.</p>\n\n<p>As the result of <a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a> method call we've got a native JS Array of mt.data.Tweet\ninstances. We pass it into <a href=\"#!/api/JW.AbstractArray-method-addAll\" rel=\"JW.AbstractArray-method-addAll\" class=\"docClass\">addAll</a> method of data.tweets array in order to fill it in:</p>\n\n<pre><code>    data.tweets.<a href=\"#!/api/JW.AbstractArray-method-addAll\" rel=\"JW.AbstractArray-method-addAll\" class=\"docClass\">addAll</a>(<a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a>(json, mt.data.Tweet.createByJson));\n</code></pre>\n\n<p>Since we construct this.tweets object in constructor of mt.Data, we <strong>must</strong> destroy it in destructor.\nThis is a part of jWidget philosophy. Object creator must destroy it. So, if we'll destroy mt.Data instance by\n<a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a> method, all the included objects will be destroyed as well.</p>\n\n<pre><code>    // override\n    <a href=\"#!/api/JW.Class-method-destroy\" rel=\"JW.Class-method-destroy\" class=\"docClass\">destroy</a>: function() {\n        this.tweets.<a href=\"#!/api/JW.AbstractArray-method-S-clear\" rel=\"JW.AbstractArray-method-S-clear\" class=\"docClass\">$clear</a>().<a href=\"#!/api/JW.AbstractArray-method-each\" rel=\"JW.AbstractArray-method-each\" class=\"docClass\">each</a>(<a href=\"#!/api/JW-static-method-destroy\" rel=\"JW-static-method-destroy\" class=\"docClass\">JW.destroy</a>); // clear array and destroy items\n        this.tweets.<a href=\"#!/api/JW.AbstractArray-method-destroy\" rel=\"JW.AbstractArray-method-destroy\" class=\"docClass\">destroy</a>(); // destroy array\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n    }\n</code></pre>\n\n<p>We can get rid of \"destroy\" method by using jWidget <strong>object aggregation feature</strong>. If object A aggregates object B, then object B\nwill be destroyed automatically on object A destruction. We can aggregate an object using method\n<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">JW.Class.own</a> and we can aggregate the items of an array using method <a href=\"#!/api/JW.AbstractCollection-method-ownItems\" rel=\"JW.AbstractCollection-method-ownItems\" class=\"docClass\">JW.AbstractCollection.ownItems</a>:</p>\n\n<p><strong>public/mt/data/data.js</strong></p>\n\n<pre><code>mt.Data = function() {\n    mt.Data.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweets = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>()).<a href=\"#!/api/JW.AbstractCollection-method-ownItems\" rel=\"JW.AbstractCollection-method-ownItems\" class=\"docClass\">ownItems</a>();\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.Data, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    /*\n    <a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>&lt;mt.data.Tweet&gt; tweets;\n    */\n});\n\nmt.Data.createByJson = function(json) {\n    var data = new mt.Data();\n    data.tweets.<a href=\"#!/api/JW.AbstractArray-method-addAll\" rel=\"JW.AbstractArray-method-addAll\" class=\"docClass\">addAll</a>(<a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a>(json, mt.data.Tweet.createByJson));\n    return data;\n};\n\nmt.data = {};\n</code></pre>\n\n<p>Let's continue with the view. Define class mt.TweetFeed for tweet feed view.</p>\n\n<p><strong>public/mt/tweetfeed/tweetfeed.js</strong></p>\n\n<pre><code>mt.TweetFeed = function(data) {\n    mt.TweetFeed.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.data = data;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.TweetFeed, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.Data data;\n    */\n\n    renderTweets: function() {\n        return this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.data.tweets.<a href=\"#!/api/JW.AbstractArray-method-S-map\" rel=\"JW.AbstractArray-method-S-map\" class=\"docClass\">$map</a>(function(tweetData) {\n            return new mt.TweetView(tweetData);\n        }, this)).<a href=\"#!/api/JW.AbstractCollection-method-ownItems\" rel=\"JW.AbstractCollection-method-ownItems\" class=\"docClass\">ownItems</a>();\n    }\n});\n\n<a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a>(mt.TweetFeed, {\n    main:\n        '&lt;div jwclass=\"mt-tweet-feed\"&gt;' +\n            '&lt;div jwid=\"header\"&gt;Tweets&lt;/div&gt;' +\n            '&lt;div jwid=\"tweets\"&gt;&lt;/div&gt;' +\n            '&lt;div jwid=\"footer\"&gt;...&lt;/div&gt;' +\n        '&lt;/div&gt;'\n});\n</code></pre>\n\n<p>Let's review renderTweets method in details. Similarly to mt.TweetView component, we've defined method\n<code>render&lt;ChildId&gt;</code> for element with jwid=\"tweets\". But now this method not just fills the element with data,\nbut renders an array of child components into it.</p>\n\n<p>This array is created from data via collection item convertion method\n<a href=\"#!/api/JW.AbstractArray-method-S-map\" rel=\"JW.AbstractArray-method-S-map\" class=\"docClass\">$map</a>. We already used\n<a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a> before. Let's review their difference:</p>\n\n<ul>\n<li>First, the one method is an instance method, and the second one is a static method. <strong>All collections of jWidget have a common\nset of static methods for native JavaScript collections (Array, Object) and instance methods for jWidget\ncollections (<a href=\"#!/api/JW.AbstractArray\" rel=\"JW.AbstractArray\" class=\"docClass\">JW.AbstractArray</a>, <a href=\"#!/api/JW.AbstractMap\" rel=\"JW.AbstractMap\" class=\"docClass\">JW.AbstractMap</a>, <a href=\"#!/api/JW.AbstractSet\" rel=\"JW.AbstractSet\" class=\"docClass\">JW.AbstractSet</a>). Static methods are defined in\n<a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>, <a href=\"#!/api/JW.Map\" rel=\"JW.Map\" class=\"docClass\">JW.Map</a>, <a href=\"#!/api/JW.Set\" rel=\"JW.Set\" class=\"docClass\">JW.Set</a> and take native collection as a first argument.</strong></li>\n<li>Second, <a href=\"#!/api/JW.Array-static-method-map\" rel=\"JW.Array-static-method-map\" class=\"docClass\">JW.Array.map</a> method returns a native JavaScript Array, when\n<a href=\"#!/api/JW.AbstractArray-method-S-map\" rel=\"JW.AbstractArray-method-S-map\" class=\"docClass\">$map</a> method returns <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a>. <strong>All methods which names start from $ symbol\nreturn jWidget collections. All other methods return native JavaScript collections or other values.</strong></li>\n</ul>\n\n\n<p>Both rules are introduced for convenience. Each algorithm has multiple implementations, which are constrained by\nfixed naming convention. Use one implementation which is more convenient in this particular situation.</p>\n\n<p>In our sample, <a href=\"#!/api/JW.AbstractArray-method-S-map\" rel=\"JW.AbstractArray-method-S-map\" class=\"docClass\">$map</a> method takes callback function as a first argument,\nand this function converts mt.data.Tweet instance into mt.TweetView instance:</p>\n\n<pre><code>    renderTweets: function() {\n        return this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.data.tweets.<a href=\"#!/api/JW.AbstractArray-method-S-map\" rel=\"JW.AbstractArray-method-S-map\" class=\"docClass\">$map</a>(function(tweetData) {\n            return new mt.TweetView(tweetData);\n        }, this)).<a href=\"#!/api/JW.AbstractCollection-method-ownItems\" rel=\"JW.AbstractCollection-method-ownItems\" class=\"docClass\">ownItems</a>();\n    }\n</code></pre>\n\n<p>In second argument, method takes callback function call context (this). The rule is simple:\n<strong>whenever you pass a function as a function argument, you can optionally pass its call context as a next argument.</strong></p>\n\n<p>As result we'll get <a href=\"#!/api/JW.Array\" rel=\"JW.Array\" class=\"docClass\">JW.Array</a> instance, which contains mt.TweetView instances. We return this array as\nrenderTweets method result. By doing this, we ask the framework to render the child components into element with jwid=\"tweets\".</p>\n\n<p>Next, let's create a CSS file.</p>\n\n<p><strong>public/mt/tweetfeed/tweetfeed.css</strong></p>\n\n<pre><code>.mt-tweet-feed-header {\n  color: #333;\n  font-family: Arial, sans-serif;\n  font-size: 14px;\n  font-weight: bold;\n  text-shadow: 0 1px 0 #fff;\n}\n.mt-tweet-feed {\n  border: 1px solid rgba(0,0,0,0.45);\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n}\n.mt-tweet-feed {\n  background: #fff;\n  width: 522px;\n}\n.mt-tweet-feed-header {\n  font-size: 18px;\n  padding: 10px;\n}\n.mt-tweet-feed-footer {\n  border-top: 1px solid #e8e8e8;\n  padding: 8px;\n  text-align: center;\n}\n</code></pre>\n\n<p>Add new files into index.html:</p>\n\n<pre><code>&lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/tweetfeed/tweetfeed.css\" /&gt;\n&lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/tweetfeed/tweetfeed.js\"&gt;&lt;/script&gt;\n</code></pre>\n\n<p>And prepare new test data.</p>\n\n<p><strong>public/boot.js</strong></p>\n\n<pre><code>var data;\nvar tweetFeed;\n\n$(function() {\n    data = mt.Data.createByJson([\n        {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"jWidget documentation is here &lt;a href=\\\"https://enepomnyaschih.github.com/jwidget\\\" target=\\\"_blank\\\"&gt;enepomnyaschih.github.com/jwidget&lt;/a&gt;\",\n            \"timeAgo\": 215000,\n            \"like\": false,\n            \"retweet\": true\n        }, {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"Tweet feed is growing\",\n            \"timeAgo\": 515000,\n            \"like\": false,\n            \"retweet\": false\n        }\n    ]);\n    tweetFeed = new mt.TweetFeed(data);\n    tweetFeed.<a href=\"#!/api/JW.UI.Component-method-renderTo\" rel=\"JW.UI.Component-method-renderTo\" class=\"docClass\">renderTo</a>(\"#container\");\n});\n</code></pre>\n\n<p>If we'll execute the application in browser, we'll see what was required.</p>\n\n<p>Let's review one more way of child components adding, without <code>render&lt;ChildId&gt;</code> method definition.\nlet's remove renderTweets method and override <a href=\"#!/api/JW.UI.Component-method-renderComponent\" rel=\"JW.UI.Component-method-renderComponent\" class=\"docClass\">renderComponent</a> method instead:</p>\n\n<pre><code>    // override\n    <a href=\"#!/api/JW.UI.Component-method-renderComponent\" rel=\"JW.UI.Component-method-renderComponent\" class=\"docClass\">renderComponent</a>: function() {\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n        var tweetViews = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.data.tweets.<a href=\"#!/api/JW.AbstractArray-method-S-map\" rel=\"JW.AbstractArray-method-S-map\" class=\"docClass\">$map</a>(function(tweetData) {\n            return new mt.TweetView(tweetData);\n        }, this).<a href=\"#!/api/JW.AbstractCollection-method-ownItems\" rel=\"JW.AbstractCollection-method-ownItems\" class=\"docClass\">ownItems</a>();\n        this.<a href=\"#!/api/JW.UI.Component-method-addArray\" rel=\"JW.UI.Component-method-addArray\" class=\"docClass\">addArray</a>(tweetViews, \"tweets\");\n    },\n</code></pre>\n\n<p>This code is equivalent to previous one, but child component list is added dynamically by\n<a href=\"#!/api/JW.UI.Component-method-addArray\" rel=\"JW.UI.Component-method-addArray\" class=\"docClass\">addArray</a> method. This method takes element \"jwid\" as second argument, which should be\nused as container for child components, passed in first argument. If we won't pass second argument, the array will be\nrendered into root element. Use the way you like more. I'll stick to first way, using <code>render&lt;ChildId&gt;</code> method.</p>\n\n<p>Disadvantage of this entire sample is that tweet array is fixed. We are unable to add or remove specific tweets\ndynamically. We'll learn it in future.</p>\n","title":"Part 2. Arrays of child components"});