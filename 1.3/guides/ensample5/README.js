Ext.data.JsonP.ensample5({"guide":"<h1 id='ensample5-section-part-5.-properties'>Part 5. Properties</h1>\n\n<p>Demo: <a href=\"http://enepomnyaschih.github.io/mt/1.3-5/\">http://enepomnyaschih.github.io/mt/1.3-5/</a></p>\n\n<p>Source: <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-1.3-5\">https://github.com/enepomnyaschih/mt/tree/mt-1.3-5</a> (Git branch)</p>\n\n<p>Now it's the time to learn a new layer of jWidget: the properties brought to us by class <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>. The <strong>property</strong>\nis any value which can notify the clients about its modification. So, <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a> is a class which has 2 methods:\n<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>, <a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a> - and an event <a href=\"#!/api/JW.Property-event-changeEvent\" rel=\"JW.Property-event-changeEvent\" class=\"docClass\">changeEvent</a>.\nWhenever you change the value of the property by <a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a> method call,\n<a href=\"#!/api/JW.Property-event-changeEvent\" rel=\"JW.Property-event-changeEvent\" class=\"docClass\">changeEvent</a> is triggered. The event is not triggered if the value is not changed in\nresult of <a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a> method call.</p>\n\n<p>So, in our Mini-Twitter example, we can simplify Like/Unlike and Retweet/Unretweet behaviour implementation by\nintroducing 2 boolean properties: like and retweet.</p>\n\n<p>First, let's change the model. We need to replace simple boolean fields with properties, and remove the corresponding\nevents and setting methods:</p>\n\n<p><strong>public/mt/data/tweet.js</strong></p>\n\n<pre><code>mt.data.Tweet = function(config) {\n    mt.data.Tweet.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.fullName = config.fullName; // string\n    this.shortName = config.shortName; // string\n    this.avatarUrl48 = config.avatarUrl48; // string\n    this.contentHtml = config.contentHtml; // string\n    this.time = config.time; // number\n    this.like = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(config.like)); // <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>&lt;boolean&gt;\n    this.retweet = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(config.retweet)); // <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>&lt;boolean&gt;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.data.Tweet, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>);\n\nmt.data.Tweet.createByJson = function(json) {\n    return new mt.data.Tweet(<a href=\"#!/api/JW-static-method-apply\" rel=\"JW-static-method-apply\" class=\"docClass\">JW.apply</a>({}, json, {\n        time: new Date().getTime() - json.timeAgo\n    }));\n};\n</code></pre>\n\n<p>We have removed quite a big chunk of code. Let's modify the view now. Instead of listening property change event\nmanually, we can utilize special mapper and updater classes.</p>\n\n<p><strong>Mapper</strong> builds a new property based on existing ones. In our particular case, we're gonna build string properties\nwith \"Like/Unlike\" and \"Retweet/Unretweet\" values. Mapper is created implicitly by\nmethods <a href=\"#!/api/JW.Property-method-S-S-mapValue\" rel=\"JW.Property-method-S-S-mapValue\" class=\"docClass\">$$mapValue</a> and <a href=\"#!/api/JW.Property-method-S-S-mapObject\" rel=\"JW.Property-method-S-S-mapObject\" class=\"docClass\">$$mapObject</a>.</p>\n\n<p><strong>Updater</strong> watches for a property modification and handles it some way. In our case, we're gonna update the text\ninside the buttons and change their CSS classes.</p>\n\n<p>You must constrain mapper and updater life time by component's life time, so don't forget to aggregate them.</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>    renderLike: function(el) {\n        var text = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.tweetData.like.<a href=\"#!/api/JW.Property-method-S-S-mapValue\" rel=\"JW.Property-method-S-S-mapValue\" class=\"docClass\">$$mapValue</a>(function(like) {\n            return like ? \"Unlike\" : \"Like\";\n        }, this));\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>(el, text));\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a>(el, \"active\", this.tweetData.like));\n        el.<a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a>(\"click\", this._onLikeClick, this);\n    },\n\n    renderRetweet: function(el) {\n        var text = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.tweetData.retweet.<a href=\"#!/api/JW.Property-method-S-S-mapValue\" rel=\"JW.Property-method-S-S-mapValue\" class=\"docClass\">$$mapValue</a>(function(retweet) {\n            return retweet ? \"Unretweet\" : \"Retweet\";\n        }, this));\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>(el, text));\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a>(el, \"active\", this.tweetData.retweet));\n        el.<a href=\"#!/api/jQuery-method-jwon\" rel=\"jQuery-method-jwon\" class=\"docClass\">jwon</a>(\"click\", this._onRetweetClick, this);\n    },\n\n    _onLikeClick: function(event) {\n        event.preventDefault();\n        this.tweetData.like.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(!this.tweetData.like.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n    },\n\n    _onRetweetClick: function(event) {\n        event.preventDefault();\n        this.tweetData.retweet.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(!this.tweetData.retweet.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n    },\n</code></pre>\n\n<p>And we can delete methods <code>_updateLike</code> and <code>_updateRetweet</code> - we don't use them anymore.</p>\n\n<p>The syntax of properties, functors and updaters is clean and straightforward. They let you make code shorter and\nmore readable. Take a look at <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a> documentation for full list of features.</p>\n","title":"Part 5. Properties"});