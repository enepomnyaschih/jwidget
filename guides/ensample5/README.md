# Part 5. Properties

Demo: [http://enepomnyaschih.github.io/mt/1.4-5/](http://enepomnyaschih.github.io/mt/1.4-5/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-1.4-5](https://github.com/enepomnyaschih/mt/tree/mt-1.4-5) (Git branch)

Now it's the time to learn a new layer of jWidget: the properties brought to us by class JW.Property. The **property**
is any value which can notify the clients about its modification. So, JW.Property is a class which has 2 methods:
{@link JW.Property#get get}, {@link JW.Property#set set} - and an event {@link JW.Property#changeEvent changeEvent}.
Whenever you change the value of the property by {@link JW.Property#set set} method call,
{@link JW.Property#changeEvent changeEvent} is triggered. The event is not triggered if the value is not changed in
result of {@link JW.Property#set set} method call.

So, in our Mini-Twitter example, we can simplify Like/Unlike and Retweet/Unretweet behaviour implementation by
introducing 2 boolean properties: like and retweet.

First, let's change the model. We need to replace simple boolean fields with properties, and remove the corresponding
events and setting methods:

**public/mt/data/tweet.js**

    mt.data.Tweet = function(config) {
        mt.data.Tweet.{@link JW.Class#static-property-_super _super}.call(this);
        this.fullName = config.fullName; // string
        this.shortName = config.shortName; // string
        this.avatarUrl48 = config.avatarUrl48; // string
        this.contentHtml = config.contentHtml; // string
        this.time = config.time; // number
        this.like = this.{@link JW.Class#own own}(new JW.Property(config.like)); // JW.Property<boolean>
        this.retweet = this.{@link JW.Class#own own}(new JW.Property(config.retweet)); // JW.Property<boolean>
    };
    
    JW.extend(mt.data.Tweet, JW.Class);
    
    mt.data.Tweet.createByJson = function(json) {
        return new mt.data.Tweet(JW.apply({}, json, {
            time: new Date().getTime() - json.timeAgo
        }));
    };

We have removed quite a big chunk of code. Let's modify the view now. Instead of listening property change event
manually, we can utilize property bindings.

First, we're going to build string properties with "Like/Unlike" and "Retweet/Unretweet" values from
original boolean properties. To do so, we can use method {@link JW.Property#$$mapValue $$mapValue}.

Second, we're going to bind DOM elements to all these properties using {@link jQuery jQuery} extension methods.

You must constrain bindings' life time by component's life time, so don't forget to aggregate them.

**public/mt/tweetview/tweetview.js**

        renderLike: function(el) {
            var text = this.{@link JW.Class#own own}(this.tweetData.like.{@link JW.Property#$$mapValue $$mapValue}(function(like) {
                return like ? "Unlike" : "Like";
            }, this));
            this.{@link JW.Class#own own}(el.{@link jQuery#jwtext jwtext}(text));
            this.{@link JW.Class#own own}(el.{@link jQuery#jwclass jwclass}("active", this.tweetData.like));
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },
        
        renderRetweet: function(el) {
            var text = this.{@link JW.Class#own own}(this.tweetData.retweet.{@link JW.Property#$$mapValue $$mapValue}(function(retweet) {
                return retweet ? "Unretweet" : "Retweet";
            }, this));
            this.{@link JW.Class#own own}(el.{@link jQuery#jwtext jwtext}(text));
            this.{@link JW.Class#own own}(el.{@link jQuery#jwclass jwclass}("active", this.tweetData.retweet));
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },
        
        _onLikeClick: function(event) {
            event.preventDefault();
            this.tweetData.like.{@link JW.Property#set set}(!this.tweetData.like.{@link JW.Property#get get}());
        },
        
        _onRetweetClick: function(event) {
            event.preventDefault();
            this.tweetData.retweet.{@link JW.Property#set set}(!this.tweetData.retweet.{@link JW.Property#get get}());
        },

And we can delete methods `_updateLike` and `_updateRetweet` - we don't use them anymore.

The syntax of properties and bindings is clean and straightforward. They let you make code shorter and
more readable. Take a look at JW.Property and {@link jQuery jQuery extension} documentation for full list of features.
