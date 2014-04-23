Ext.data.JsonP.ensample4({"guide":"<h1 id='ensample4-section-part-4.-events'>Part 4. Events</h1>\n\n<p>Demo: <a href=\"http://enepomnyaschih.github.io/mt/0.9.0-4/\">http://enepomnyaschih.github.io/mt/0.9.0-4/</a></p>\n\n<p>Source: <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-4\">https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-4</a> (Git branch)</p>\n\n<p>We'll learn how to bind handlers to jQuery elements in scope of jWidget framework in this part.\nAlso, we'll create some model events and will learn how to listen and trigger them.</p>\n\n<p>First, we must activate buttons Like/Unlike and Retweet/Unretweet.</p>\n\n<p><p><img src=\"guides/ensample4/buttons.png\" alt=\"\" width=\"541\" height=\"178\"></p></p>\n\n<p>What will happen on Like click?</p>\n\n<ol>\n<li>View is intercepting \"click\" event using jQuery</li>\n<li>View is accessing model via tweetData.setLike(value) method call</li>\n<li>Model is checking whether \"like\" field has been changed. If not, exiting without changes</li>\n<li>If \"like\" field has been changed, model is saving it and triggering \"likeChangeEvent\"</li>\n<li>View is intercepting \"likeChangeEvent\" and updating</li>\n</ol>\n\n\n<p>Notice that view can update by its own before step 2. But it is unneccessary, if view listens \"likeChangeEvent\".\nAnd it must listen it by Model-View architecture because who knows, what client will want to change \"like\"\nfield in model by some another event? May be asynchronous data loader from server will want to do this,\nor may be \"like\" will be added to some tweets by some other user actions? Anyway, event presence makes us\nfeel safe about the fact that the view will always be up-to-date.</p>\n\n<p>One more notice: in other Model-View frameworks (I mean, MVC frameworks) like ExtJS, Controller is responsible for\nevent listening and handling. jWidget doesn't provide any features for such controllers implementation.\nMoreover, ExtJS implementation suffers in performance because of often CSS query calls, when it is unneccessary in\njWidget where everything works by direct references to elements.</p>\n\n<p>Events API is maximally optimized in jWidget in performance regard and implemented by all OOD main principles.\nThat's the reason why events API is very different in jWidget and jQuery.\njWidget event is implemented by class <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>. There are 2 adjacent classes: <a href=\"#!/api/JW.EventParams\" rel=\"JW.EventParams\" class=\"docClass\">JW.EventParams</a> and\n<a href=\"#!/api/JW.EventAttachment\" rel=\"JW.EventAttachment\" class=\"docClass\">JW.EventAttachment</a>. Let's look how to use them.</p>\n\n<p>So, let's start listening Like and Retweet button clicks. Let's follow the steps described above. First, bind to\nclick event using jQuery in mt.TweetView class:</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>    renderLike: function(el) {\n        el.toggleClass(\"active\", this.tweetData.like).text(this.tweetData.like ? \"Unlike\" : \"Like\");\n        el.click(this._onLikeClick);\n    },\n\n    renderRetweet: function(el) {\n        el.toggleClass(\"active\", this.tweetData.retweet).text(this.tweetData.retweet ? \"Unretweet\" : \"Retweet\");\n        el.click(this._onRetweetClick);\n    },\n\n    _onLikeClick: function(event) {\n        event.preventDefault();\n        this.tweetData.setLike(!this.tweetData.like);\n    },\n\n    _onRetweetClick: function(event) {\n        event.preventDefault();\n        this.tweetData.setRetweet(!this.tweetData.retweet);\n    },\n</code></pre>\n\n<p>If you already worked with JavaScript classes before, then you know why this code won't work.\nThe reason is that event handler doesn't know its call scope (this). This is a problem of JavaScript, which\nwe must live with. We must bind the call scope to these handlers using <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a> function to make them work.\nBy standard, you should do this in the constructor, before superclass constructor call:</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>mt.TweetView = function(tweetData) {\n    this._onLikeClick = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onLikeClick, this);\n    this._onRetweetClick = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onRetweetClick, this);\n    mt.TweetView.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweetData = tweetData;\n};\n</code></pre>\n\n<p>At the next step, we'll add methods setLike and setRetweet to the model. To implement them, we'll need likeChangeEvent and\nretweetChangeEvent, which we'll create and aggregate in the constructor:</p>\n\n<p><strong>public/mt/data/tweet.js</strong></p>\n\n<pre><code>mt.data.Tweet = function(config) {\n    mt.data.Tweet.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.fullName = config.fullName;\n    this.shortName = config.shortName;\n    this.avatarUrl48 = config.avatarUrl48;\n    this.contentHtml = config.contentHtml;\n    this.time = config.time;\n    this.like = config.like;\n    this.retweet = config.retweet;\n    this.likeChangeEvent = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>());\n    this.retweetChangeEvent = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>());\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.data.Tweet, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    /*\n    string fullName;\n    string shortName;\n    string contentHtml;\n    string avatarUrl48;\n    number time;\n    boolean like;\n    boolean retweet;\n    <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>&lt;<a href=\"#!/api/JW.ValueEventParams\" rel=\"JW.ValueEventParams\" class=\"docClass\">JW.ValueEventParams</a>&lt;boolean&gt;&gt; likeChangeEvent;\n    <a href=\"#!/api/JW.Event\" rel=\"JW.Event\" class=\"docClass\">JW.Event</a>&lt;<a href=\"#!/api/JW.ValueEventParams\" rel=\"JW.ValueEventParams\" class=\"docClass\">JW.ValueEventParams</a>&lt;boolean&gt;&gt; retweetChangeEvent;\n    */\n\n    setLike: function(value) {\n        if (this.like === value) {\n            return;\n        }\n        this.like = value;\n        this.likeChangeEvent.<a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a>(new <a href=\"#!/api/JW.ValueEventParams\" rel=\"JW.ValueEventParams\" class=\"docClass\">JW.ValueEventParams</a>(this, value));\n    },\n\n    setRetweet: function(value) {\n        if (this.retweet === value) {\n            return;\n        }\n        this.retweet = value;\n        this.retweetChangeEvent.<a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a>(new <a href=\"#!/api/JW.ValueEventParams\" rel=\"JW.ValueEventParams\" class=\"docClass\">JW.ValueEventParams</a>(this, value));\n    }\n});\n\nmt.data.Tweet.createByJson = function(json) {\n    return new mt.data.Tweet(<a href=\"#!/api/JW-static-method-apply\" rel=\"JW-static-method-apply\" class=\"docClass\">JW.apply</a>({}, json, {\n        time: new Date().getTime() - json.timeAgo\n    }));\n};\n</code></pre>\n\n<p>Event is triggered by <a href=\"#!/api/JW.Event-method-trigger\" rel=\"JW.Event-method-trigger\" class=\"docClass\">trigger</a> method, which takes <a href=\"#!/api/JW.EventParams\" rel=\"JW.EventParams\" class=\"docClass\">JW.EventParams</a> argument.\nIn this case it is <a href=\"#!/api/JW.ValueEventParams\" rel=\"JW.ValueEventParams\" class=\"docClass\">JW.ValueEventParams</a>, which takes 2 parameters: event sender (this) and some value.\nYou can extend your own subclasses of <a href=\"#!/api/JW.EventParams\" rel=\"JW.EventParams\" class=\"docClass\">JW.EventParams</a> for your event, but standard <a href=\"#!/api/JW.ValueEventParams\" rel=\"JW.ValueEventParams\" class=\"docClass\">JW.ValueEventParams</a>,\n<a href=\"#!/api/JW.ItemEventParams\" rel=\"JW.ItemEventParams\" class=\"docClass\">JW.ItemEventParams</a> and <a href=\"#!/api/JW.ItemValueEventParams\" rel=\"JW.ItemValueEventParams\" class=\"docClass\">JW.ItemValueEventParams</a> are enough in the majority of cases.</p>\n\n<p>jWidget event is essentially simple: all listeners are iterated and called one by one.\nThere are no any special features like bubbling, \"preventDefault\" or \"stopPropagation\". If you want to introduce\nsomething like this, implement it by yourself or find somewhere else.\njWidget is modest in this regard, but fast.</p>\n\n<p>Next, we must bind handlers to these events and update view in them. To prevent code duplication, let's\nextract element updating code of mt.TweetView into separate methods \"updateLike\" and \"updateRetweet\":</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>    renderLike: function(el) {\n        this._updateLike();\n        el.click(this._onLikeClick);\n    },\n\n    renderRetweet: function(el) {\n        this._updateRetweet();\n        el.click(this._onRetweetClick);\n    },\n\n    _updateLike: function() {\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"like\").\n            toggleClass(\"active\", this.tweetData.like).\n            text(this.tweetData.like ? \"Unlike\" : \"Like\");\n    },\n\n    _updateRetweet: function() {\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"retweet\").\n            toggleClass(\"active\", this.tweetData.retweet).\n            text(this.tweetData.retweet ? \"Unretweet\" : \"Retweet\");\n    },\n</code></pre>\n\n<p>Let's bind the handlers to \"likeChangeEvent\" and \"retweetChangeEvent\". We'll get event attachment objects which we must\naggregate:</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>mt.TweetView = function(tweetData) {\n    this._onLikeClick = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onLikeClick, this);\n    this._onRetweetClick = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onRetweetClick, this);\n    mt.TweetView.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweetData = tweetData;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.TweetView, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.data.Tweet tweetData;\n    */\n\n    // ... some code here\n\n    renderLike: function(el) {\n        this._updateLike();\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.tweetData.likeChangeEvent.<a href=\"#!/api/JW.Event-method-bind\" rel=\"JW.Event-method-bind\" class=\"docClass\">bind</a>(this._updateLike, this));\n        el.click(this._onLikeClick);\n    },\n\n    renderRetweet: function(el) {\n        this._updateRetweet();\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(this.tweetData.retweetChangeEvent.<a href=\"#!/api/JW.Event-method-bind\" rel=\"JW.Event-method-bind\" class=\"docClass\">bind</a>(this._updateRetweet, this));\n        el.click(this._onRetweetClick);\n    },\n\n    // ...\n</code></pre>\n\n<p>It must work! Try to execute it in browser or open link\n<a href=\"http://enepomnyaschih.github.io/mt/0.9.0-4/\">http://enepomnyaschih.github.io/mt/0.9.0-4/</a>\nand click Like/Unlike and Retweet/Unretweet buttons. Moreover, you can open browser console and run\nnext command:</p>\n\n<pre><code>data.tweets.<a href=\"#!/api/JW.AbstractArray-method-get\" rel=\"JW.AbstractArray-method-get\" class=\"docClass\">get</a>(0).setLike(true)\n</code></pre>\n\n<p>Your application will obediently update. Perhaps you don't feel all advantages that you've got with Model-View\narchitecture in this little application, but in bigger ones this ton of supporting code will pay off, you bet!</p>\n\n<p>Also, we'd like to finish mt.TweetView updating in this example. We didn't consider that tweet creation time\nis increasing:</p>\n\n<p><p><img src=\"guides/ensample4/time.png\" alt=\"\" width=\"425\" height=\"238\"></p></p>\n\n<p>We'll fix this now.</p>\n\n<p>We don't need to change model, modifications will impact mt.TweetView only:</p>\n\n<pre><code>mt.TweetView = function(tweetData) {\n    this._updateTime = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._updateTime, this);\n    this._onLikeClick = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onLikeClick, this);\n    this._onRetweetClick = <a href=\"#!/api/JW-static-method-inScope\" rel=\"JW-static-method-inScope\" class=\"docClass\">JW.inScope</a>(this._onRetweetClick, this);\n    mt.TweetView.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweetData = tweetData;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.TweetView, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.data.Tweet tweetData;\n    */\n\n    // ... code\n\n    renderTime: function() {\n        this._updateTime();\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Interval\" rel=\"JW.Interval\" class=\"docClass\">JW.Interval</a>(this._updateTime, 30000));\n    },\n\n    _updateTime: function() {\n        var timeAgo = new Date().getTime() - this.tweetData.time;\n        var text = this._getTimeString(timeAgo);\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"time\").text(text);\n    },\n\n    // ... code\n</code></pre>\n\n<p>Tweet publication time will be updated every 30 seconds now.</p>\n","title":"Part 4. Events"});