# Part 5. Properties

Demo: [http://enepomnyaschih.github.io/mt/0.9.0-5/](http://enepomnyaschih.github.io/mt/0.9.0-5/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-5](https://github.com/enepomnyaschih/mt/tree/mt-0.9.0-5) (Git branch)

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
        this.fullName = config.fullName;
        this.shortName = config.shortName;
        this.avatarUrl48 = config.avatarUrl48;
        this.contentHtml = config.contentHtml;
        this.time = config.time;
        this.like = this.{@link JW.Class#own own}(new JW.Property(config.like));
        this.retweet = this.{@link JW.Class#own own}(new JW.Property(config.retweet));
    };
    
    JW.extend(mt.data.Tweet, JW.Class, {
        /*
        string fullName;
        string shortName;
        string contentHtml;
        string avatarUrl48;
        number time;
        JW.Property<boolean> like;
        JW.Property<boolean> retweet;
        */
    });
    
    mt.data.Tweet.createByJson = function(json) {
        return new mt.data.Tweet(JW.apply({}, json, {
            time: new Date().getTime() - json.timeAgo
        }));
    };

We have removed quite a big chunk of code. Let's modify the view now. Instead of listening property change event
manually, we can utilize special functor and updater classes.

**Functor** builds a new property based on existing ones. In our particular case, we're gonna build string properties
with "Like/Unlike" and "Retweet/Unretweet" values.

**Updater** watches for a property modification and handles it some way. In our case, we're gonna update the text
inside the buttons and change their CSS classes.

**public/mt/tweetview/tweetview.js**

        renderLike: function(el) {
            var text = this.{@link JW.Class#own own}(new JW.Functor([this.tweetData.like], function(like) {
                return like ? "Unlike" : "Like";
            }, this)).{@link JW.Functor#property-target target};
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
            this.{@link JW.Class#own own}(new JW.UI.ClassUpdater(el, "active", this.tweetData.like));
            el.click(this._onLikeClick);
        },
        
        renderRetweet: function(el) {
            var text = this.{@link JW.Class#own own}(new JW.Functor([this.tweetData.retweet], function(retweet) {
                return retweet ? "Unretweet" : "Retweet";
            }, this)).{@link JW.Functor#property-target target};
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
            this.{@link JW.Class#own own}(new JW.UI.ClassUpdater(el, "active", this.tweetData.retweet));
            el.click(this._onRetweetClick);
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

The syntax of properties, functors and updaters is clean and straightforward. They let you make code shorter and
more readable. Take a look at JW.Property documentation for full list of features.
