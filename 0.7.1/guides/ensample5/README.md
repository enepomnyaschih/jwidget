# Part 5. Collection synchronizers

Demo: [http://enepomnyaschih.github.io/mt/5/](http://enepomnyaschih.github.io/mt/5/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-5](https://github.com/enepomnyaschih/mt/tree/mt-5) (Git plugin)

Now we'll switch to the most wonderful and important part of jWidget which makes jWidget special -
collection synchronizers.

In this example, we'll add a feature of new tweets posting and existing tweets removal.

Let's start with a bit of refactoring. We have a next code snippet in mt.TweetFeed class:

        renderTweets: function() {
            this.tweetViews = this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this);
            return this.tweetViews;
        },

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

    mt.TweetFeed = function(data) {
        mt.TweetFeed.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
        this._mapper = null;
    };
    
    JW.extend(mt.TweetFeed, JW.UI.Component, {
        /*
        mt.Data data;
        JW.AbstractArray.Mapper<mt.data.Tweet, mt.TweetView> _mapper;
        */
        
        renderTweets: function() {
            this._mapper = this.data.tweets.{@link JW.AbstractArray#createMapper createMapper}({
                {@link JW.AbstractCollection.Mapper#createItem createItem}: function(tweetData) {
                    return new mt.TweetView(tweetData);
                },
                {@link JW.AbstractCollection.Mapper#destroyItem destroyItem}: JW.destroy,
                {@link JW.AbstractCollection.Mapper#scope scope}: this
            });
            return this._mapper.{@link JW.AbstractArray.Mapper#property-target target};
        },
        
        // override
        {@link JW.UI.Component#destroyComponent destroyComponent}: function() {
            this._mapper.{@link JW.Class#destroy destroy}();
            this.{@link JW.Class#method-_super _super}();
        }
    });

Since our array of this.data.tweets is still simple (JW.Array), this code is completely equal to original one -
run the application in browser and you won't see any difference. But now we are able to replace simple array
in mt.Data with JW.ObservableArray, and synchronize view with model without view modification this way:

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.profile = null;
        this.tweets = new JW.ObservableArray();
    };

Try to open application in browser and run next command in console:

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
submit. Bind to jQuery.submit event in mt.ProfileBox:

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

Our next goal is to activate Remove button in tweets to remove them from feed. Open mt.TweetView class and bind
to button click:

    mt.TweetView = function(tweetData) {
        // ...
        this._onRemoveClick = JW.inScope(this._onRemoveClick, this);
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        // ...
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        // ...
        
        renderRemove: function(el) {
            el.click(this._onRemoveClick);
        },
        
        // ...
        
        _onRemoveClick: function(event) {
            event.preventDefault();
        },
        
        // ...
    });

We'll need access to mt.Data object to remove the tweet. Let's provide it:

    mt.TweetView = function(data, tweetData) {
        // ...
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
        this.tweetData = tweetData;
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        /*
        mt.Data data;
        ...
        */
        
        // ...
    });

Update code for mt.TweetView object creation in mt.TweetFeed:

                createItem: function(tweetData) {
                    return new mt.TweetView(this.data, tweetData);
                },

And finish _onRemoveClick method implementation in mt.TweetView class:

        _onRemoveClick: function(event) {
            event.preventDefault();
            this.data.tweets.{@link JW.AbstractArray#removeItem removeItem}(this.tweetData);
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
