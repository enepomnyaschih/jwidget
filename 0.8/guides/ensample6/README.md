﻿# Part 6. Collection synchronizers

Demo: [http://enepomnyaschih.github.io/mt/0.8-6/](http://enepomnyaschih.github.io/mt/0.8-6/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-0.8-6](https://github.com/enepomnyaschih/mt/tree/mt-0.8-6) (Git plugin)

Now we'll switch to the most wonderful and important part of jWidget which makes jWidget special -
collection synchronizers.

In this example, we'll add a feature of new tweets posting and existing tweets removal.

Let's start with a bit of refactoring. We have a next code snippet in mt.TweetFeed class:

**public/mt/tweetfeed/tweetfeed.js**

        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
        }

Just to remind, this code converts data array of mt.data.Tweet instances to view array of mt.TweetView instances,
and renders them into element with jwid="tweets".

You must understand that this code won't let us to install continuous synchronization of view array with data array:
data convertion is performed only once, at the moment of tweet feed rendering. Sure, you may bind listeners
to data array modification events manually (that's what you've got to do in other frameworks), but jWidget
offers much easier solution - use synchronizer for this.

Moreover, jWidget philosophy claims that
**there should be no difference between simple and observable collection manipulations. Although it is enough to
call some algorithm to convert one simple collection to another (here: {@link JW.AbstractArray#$map $map}),
it is recommended to instantiate a synchronizer instead.**

So, let's replace code of mt.TweetFeed with the next:

**public/mt/tweetfeed/tweetfeed.js**

        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#createMapper createMapper}({
                {@link JW.AbstractCollection.Mapper#createItem createItem}: function(tweetData) {
                    return new mt.TweetView(tweetData);
                },
                {@link JW.AbstractCollection.Mapper#destroyItem destroyItem}: JW.destroy,
                {@link JW.AbstractCollection.Mapper#scope scope}: this
            })).{@link JW.AbstractArray.Mapper#property-target target};
        }

Since our array of this.data.tweets is still simple (JW.Array), this code is completely equal to the original one -
run the application in browser and you won't see any difference. But now we are able to replace simple array
in mt.Data with JW.ObservableArray, and synchronize view with model without view modification this way:

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.profile = null;
        this.tweets = new JW.ObservableArray();
    };

Try to open application in browser and run the next command in console:

    data.tweets.{@link JW.AbstractArray#add add}(new mt.data.Tweet({
        fullName: "Road Runner",
        shortName: "roadrunner",
        avatarUrl48: "backend/avatar-48.png",
        contentHtml: "This is a new tweet!",
        time: new Date().getTime(),
        like: false,
        retweet: false
    }));

You'll see that a new tweet will appear at the end of tweet feed:

{@img result-1.png}

Notice that we didn't touch view by this command: we've just added an object into data array, but view has
updated correctly.

The only remaining part is to add code which will add a new object into data.tweets array on "Compose tweet" form
submit. Bind mt.ProfileBox to jQuery.submit event:

**public/mt/profilebox/profilebox.js**

    mt.ProfileBox = function(data) {
        this._onComposeSubmit = JW.inScope(this._onComposeSubmit, this);
        mt.ProfileBox.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
    };
    
    JW.extend(mt.ProfileBox, JW.UI.Component, {
        // ... code
        
        renderComposeForm: function(el) {
            el.submit(this._onComposeSubmit);
        },
        
        _onComposeSubmit: function(event) {
            event.preventDefault();
            var text = JW.String.trim(this.{@link JW.UI.Component#getElement getElement}("compose-input").val());
            if (!text) {
                return;
            }
            this.data.tweets.{@link JW.AbstractArray#add add}(new mt.data.Tweet({
                fullName: this.data.profile.fullName,
                shortName: this.data.profile.shortName,
                avatarUrl48: this.data.profile.avatarUrl48,
                contentHtml: text,
                time: new Date().getTime(),
                like: false,
                retweet: false
            }), 0);
            this.{@link JW.UI.Component#getElement getElement}("compose-input").val("")
        }
    });

And run our application. After text input and "Tweet" button click, we'll see a new tweet in tweet feed:

{@img result-2.png}

{@img result-3.png}

Our next goal is to activate Remove button in tweets to remove them from feed. Let's bind a handler to button click.
We'll need the access to mt.Data object to remove the tweet:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(data, tweetData) {
        this._updateTime = JW.inScope(this._updateTime, this);
        this._onLikeClick = JW.inScope(this._onLikeClick, this);
        this._onRetweetClick = JW.inScope(this._onRetweetClick, this);
        this._onRemoveClick = JW.inScope(this._onRemoveClick, this);
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
        this.tweetData = tweetData;
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        /*
        mt.Data data;
        mt.data.Tweet tweetData;
        */
        
        renderRemove: function(el) {
            el.click(this._onRemoveClick);
        },
        
        // ...
        
        _onRemoveClick: function(event) {
            event.preventDefault();
            this.data.tweets.{@link JW.AbstractArray#removeItem removeItem}(this.tweetData);
        },
        
        // ...
    });

Update mt.TweetView object construction arguments in mt.TweetFeed:

**public/mt/tweetfeed/tweetfeed.js**

                {@link JW.AbstractCollection.Mapper#createItem createItem}: function(tweetData) {
                    return new mt.TweetView(this.data, tweetData);
                },

Run application and try to click Remove button in tweet:

{@img result-4.png}

In this example we've reviewed a typical scenario of array item converter (JW.AbstractCollection.Mapper) usage,
but don't stop at this. You should try other synchronizers by your own, and I'm sure you'll find reasonable
use cases for majority of them. Find them in JW.AbstractCollection class description.

Notice that synchronizers usage is not constrained by view only. In my practice, synchronizers are used in model
more often than in view. For example, indexer will speed-up access to the items by key. Sorter can sort a set of
tweets by their publication date, and you won't need to think at what position to insert a new tweet in tweet feed.
There is a lot of scenarios, and I recommend you to try them in practice.

In next part, we'll improve infrastructure of our project: extract HTML templates into separate HTML files using
[jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru) and will learn how to use CSS-preprocessor
[Stylus](http://learnboost.github.io/stylus/) to make slicing easier and more convenient.