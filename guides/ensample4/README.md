# Part 4. Events

Demo: [http://enepomnyaschih.github.io/mt/1.4-4/](http://enepomnyaschih.github.io/mt/1.4-4/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-1.4-4](https://github.com/enepomnyaschih/mt/tree/mt-1.4-4) (Git branch)

We'll learn how to bind handlers to jQuery elements in scope of jWidget framework in this part.
Also, we'll create some model events and will learn how to listen and trigger them.

First, we must activate buttons Like/Unlike and Retweet/Unretweet.

{@img buttons.png}

What will happen on Like click?

1. View is intercepting "click" event using jQuery
1. View is accessing model via tweetData.setLike(value) method call
1. Model is checking whether "like" field has been changed. If not, exiting without changes
1. If "like" field has been changed, model is saving it and triggering "likeChangeEvent"
1. View is intercepting "likeChangeEvent" and updating

Notice that view can update by its own before step 2. But it is unneccessary, if view listens "likeChangeEvent".
And it must listen it by Model-View architecture because who knows, what client will want to change "like"
field in model by some another event? May be asynchronous data loader from server will want to do this,
or may be "like" will be added to some tweets by some other user actions? Anyway, event presence makes us
feel safe about the fact that the view will always be up-to-date.

One more notice: in other Model-View frameworks (I mean, MVC frameworks) like ExtJS, Controller is responsible for
event listening and handling. jWidget doesn't provide any features for such controllers implementation.

Events API is maximally optimized in jWidget in performance regard and implemented by all OOD main principles.
That's the reason why events API is very different in jWidget and jQuery.
jWidget event is implemented by class JW.Event. There is an adjacent class: JW.EventAttachment. Let's look how to use them.

So, let's start listening Like and Retweet button clicks. Let's follow the steps described above. First, bind to
click event using jQuery in mt.TweetView class:

**public/mt/tweetview/tweetview.js**

        renderLike: function(el) {
            el.toggleClass("active", this.tweetData.like).text(this.tweetData.like ? "Unlike" : "Like");
            el.click(this._onLikeClick);
        },
        
        renderRetweet: function(el) {
            el.toggleClass("active", this.tweetData.retweet).text(this.tweetData.retweet ? "Unretweet" : "Retweet");
            el.click(this._onRetweetClick);
        },
        
        _onLikeClick: function(event) {
            event.preventDefault();
            this.tweetData.setLike(!this.tweetData.like);
        },
        
        _onRetweetClick: function(event) {
            event.preventDefault();
            this.tweetData.setRetweet(!this.tweetData.retweet);
        },

If you already worked with JavaScript classes before, then you know why this code won't work.
The reason is that event handler doesn't know its call scope (this). This is a problem of JavaScript, which
we must live with. We must bind the call scope to these handlers using JW.inScope function to make them work.
By standard, you should do this in the constructor, before superclass constructor call:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        this._onLikeClick = JW.inScope(this._onLikeClick, this);
        this._onRetweetClick = JW.inScope(this._onRetweetClick, this);
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };

Alternative solution - utilize method {@link jQuery#jwon jwon}:

        renderLike: function(el) {
            el.toggleClass("active", this.tweetData.like).text(this.tweetData.like ? "Unlike" : "Like");
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },

        renderRetweet: function(el) {
            el.toggleClass("active", this.tweetData.retweet).text(this.tweetData.retweet ? "Unretweet" : "Retweet");
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },

Second solution is more versatile, so let's stick to it.

At the next step, we'll add methods setLike and setRetweet to the model. To implement them, we'll need likeChangeEvent and
retweetChangeEvent, which we'll create and aggregate in the constructor:

**public/mt/data/tweet.js**

    mt.data.Tweet = function(config) {
        mt.data.Tweet.{@link JW.Class#static-property-_super _super}.call(this);
        this.fullName = config.fullName; // string
        this.shortName = config.shortName; // string
        this.avatarUrl48 = config.avatarUrl48; // string
        this.contentHtml = config.contentHtml; // string
        this.time = config.time; // number
        this.like = config.like; // number
        this.retweet = config.retweet; // number
        this.likeChangeEvent = this.{@link JW.Class#own own}(new JW.Event()); // JW.Event<boolean>
        this.retweetChangeEvent = this.{@link JW.Class#own own}(new JW.Event()); // JW.Event<boolean>
    };
    
    JW.extend(mt.data.Tweet, JW.Class, {
        setLike: function(value) {
            if (this.like === value) {
                return;
            }
            this.like = value;
            this.likeChangeEvent.{@link JW.Event#trigger trigger}(value);
        },
        
        setRetweet: function(value) {
            if (this.retweet === value) {
                return;
            }
            this.retweet = value;
            this.retweetChangeEvent.{@link JW.Event#trigger trigger}(value);
        }
    });
    
    mt.data.Tweet.createByJson = function(json) {
        return new mt.data.Tweet(JW.apply({}, json, {
            time: new Date().getTime() - json.timeAgo
        }));
    };

Event is triggered by {@link JW.Event#trigger trigger} method, which takes arbitrary argument to
pass to event listeners. In this case it is boolean.
jWidget event is very simple: all listeners are iterated and called one by one.
There are no any special features like bubbling, "preventDefault" or "stopPropagation". If you want to introduce
something like this, implement it by yourself or find something else.
jWidget is modest in this regard, but fast.

Next, we must bind handlers to these events and update view in them. To prevent code duplication, let's
extract element updating code of mt.TweetView into separate methods "updateLike" and "updateRetweet":

**public/mt/tweetview/tweetview.js**

        renderLike: function(el) {
            this._updateLike();
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },
        
        renderRetweet: function(el) {
            this._updateRetweet();
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },
        
        _updateLike: function() {
            this.{@link JW.UI.Component#getElement getElement}("like").
                toggleClass("active", this.tweetData.like).
                text(this.tweetData.like ? "Unlike" : "Like");
        },
        
        _updateRetweet: function() {
            this.{@link JW.UI.Component#getElement getElement}("retweet").
                toggleClass("active", this.tweetData.retweet).
                text(this.tweetData.retweet ? "Unretweet" : "Retweet");
        },

Let's bind the handlers to "likeChangeEvent" and "retweetChangeEvent". We'll get event attachment objects which we must
aggregate:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        // ... some code here
        
        renderLike: function(el) {
            this._updateLike();
            this.{@link JW.Class#own own}(this.tweetData.likeChangeEvent.{@link JW.Event#bind bind}(this._updateLike, this));
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },
        
        renderRetweet: function(el) {
            this._updateRetweet();
            this.{@link JW.Class#own own}(this.tweetData.retweetChangeEvent.{@link JW.Event#bind bind}(this._updateRetweet, this));
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },
        
        // ...

It must work! Try to execute it in browser or open link
[http://enepomnyaschih.github.io/mt/1.4-4/](http://enepomnyaschih.github.io/mt/1.4-4/)
and click Like/Unlike and Retweet/Unretweet buttons. Moreover, you can open browser console and run
next command:

    data.tweets.{@link JW.AbstractArray#get get}(0).setLike(true)

Your application will obediently update. Perhaps you don't feel all advantages that you've got with Model-View
architecture in this little application, but in bigger ones this ton of supporting code will pay off, you bet!

Also, we'd like to finish mt.TweetView updating in this example. We didn't consider that tweet creation time
is increasing:

{@img time.png}

We'll fix this now.

We don't need to change model, modifications will impact mt.TweetView only:

**public/mt/tweetview/tweetview.js**

        // ... code
        
        renderTime: function() {
            this._updateTime();
            this.{@link JW.Class#own own}(new JW.Interval(this._updateTime, this, 30000));
        },
        
        _updateTime: function() {
            var timeAgo = new Date().getTime() - this.tweetData.time;
            var text = this._getTimeString(timeAgo);
            this.{@link JW.UI.Component#getElement getElement}("time").text(text);
        },
        
        // ... code

Tweet publication time will be updated every 30 seconds now.
