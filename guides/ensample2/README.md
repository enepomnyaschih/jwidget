# Part 2. Arrays of child components

Demo: [http://enepomnyaschih.github.io/mt/0.8-2/](http://enepomnyaschih.github.io/mt/0.8-2/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-0.8-2](https://github.com/enepomnyaschih/mt/tree/mt-0.8-2) (Git branch)

In this part, we'll meet JW.AbstractArray, will try its algorithms
{@link JW.AbstractArray#method-map map} and {@link JW.AbstractArray#method-$map $map}
and will learn how to add child UI component arrays.

Our goal is to render an array of tweets, which we've developed in previous part.

{@img tweet-feed.png}

Like in the first sample, let's start with model. We must put several tweets into array. Let's define class mt.Data
for this. It will contain an array of tweets.

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweets = new JW.Array();
    };
    
    JW.extend(mt.Data, JW.Class, {
        /*
        JW.AbstractArray<mt.data.Tweet> tweets;
        */
        
        // override
        {@link JW.Class#destroy destroy}: function() {
            this.tweets.{@link JW.AbstractArray#destroy destroy}();
            this.{@link JW.Class#method-_super _super}();
        }
    });
    
    mt.Data.createByJson = function(json) {
        var data = new mt.Data();
        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json, mt.data.Tweet.createByJson));
        return data;
    };
    
    mt.data = {};

You can see that we've defined JW.AbstractArray, but instantiated it as JW.Array. It is done for flexibility.
Probably in future we'll replace the implementation of array with JW.ObservableArray.

Deserialization is performed via static method {@link JW.Array#static-method-map JW.Array.map}.
Method takes native Array as first argument and callback function as second argument.
Callback function mt.data.Tweet.createByJson converts Object (JSON) into mt.data.Tweet instance,
and we've implemented it in previous part:

    mt.data.Tweet.createByJson = function(json) {
        return new mt.data.Tweet(JW.apply({}, json, {
            time: new Date().getTime() - json.timeAgo
        }));
    };

As result of {@link JW.Array#static-method-map JW.Array.map} method call we've got a native JS Array of mt.data.Tweet
instances. We pass it into {@link JW.AbstractArray#addAll addAll} method of data.tweets array in order to fill it in:

        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json, mt.data.Tweet.createByJson));

Since we construct this.tweets object in constructor of mt.Data, we **must** destroy it in destructor.
This is a part of jWidget philosophy. Object creator must destroy it. So, if we'll destroy mt.Data instance by
{@link JW.Class#destroy destroy} method, all included objects will be destroyed as well.

        // override
        {@link JW.Class#destroy destroy}: function() {
            this.tweets.{@link JW.AbstractArray#destroy destroy}();
            this.{@link JW.Class#method-_super _super}();
        }

Let's continue with view. Define class mt.TweetFeed for tweet feed view.

**public/mt/tweetfeed/tweetfeed.js**

    mt.TweetFeed = function(data) {
        mt.TweetFeed.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
        this.tweetViews = null;
    };
    
    JW.extend(mt.TweetFeed, JW.UI.Component, {
        /*
        mt.Data data;
        JW.AbstractArray<mt.TweetView> tweetViews;
        */
        
        renderTweets: function() {
            this.tweetViews = this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this);
            return this.tweetViews;
        },
        
        // override
        {@link JW.UI.Component#destroyComponent destroyComponent}: function() {
            this.tweetViews.{@link JW.AbstractArray#each each}(JW.destroy);
            this.{@link JW.Class#method-_super _super}();
        }
    });
    
    JW.UI.template(mt.TweetFeed, {
        main:
            '<div jwclass="mt-tweet-feed">' +
                '<div jwid="header">Tweets</div>' +
                '<div jwid="tweets"></div>' +
                '<div jwid="footer">...</div>' +
            '</div>'
    });

Let's review renderTweets method in details. Similarly to mt.TweetView component, we've defined method
`render<ChildId>` for element with jwid="tweets". But now this method not just fills the element with data,
but renders an array of child components into it.

This array is created from data via collection item convertion method
{@link JW.AbstractArray#method-$map $map}. We already used
{@link JW.Array#static-method-map JW.Array.map} before. Let's review their difference:

- First, one method is instance method, second one is static method. **All collection of jWidget have common
set of static methods for native JavaScript collections (Array, Object) and instance methods for jWidget
collections (JW.AbstractArray, JW.AbstractMap, JW.AbstractSet). Static methods are defined in
JW.Array, JW.Map, JW.Set and take native collection as first argument.**
- Second, {@link JW.Array#static-method-map JW.Array.map} method returns a native JavaScript Array, when
{@link JW.AbstractArray#method-$map $map} method returns JW.Array. **All methods which names start from $ symbol
return jWidget collections. All other methods return native JavaScript collections or other values.**

Both rules are introduced for convenience. Each algorithm has multiple implementations, which are constrained by
fixed naming convention. Use one implementation which is more convenient in this particular situation.

In our sample, {@link JW.AbstractArray#method-$map $map} method takes callback function as first argument,
and this function converts mt.data.Tweet instance into mt.TweetView instance:

            this.tweetViews = this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this);

In second argument, method takes callback function call context (this). The rule is simple:
**whenever you pass a function as function argument, you can optionally pass its call context as next argument.**

As result we'll get JW.Array instance, which contains mt.TweetView instances. We return this array as
renderTweets method result:

            return this.tweetViews;

As result, we ask the framework to render this.tweetViews components into element with jwid="tweets".

Next, let's create CSS file.

**public/mt/tweetfeed/tweetfeed.css**

    .mt-tweet-feed-header {
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
      text-shadow: 0 1px 0 #fff;
    }
    .mt-tweet-feed {
      border: 1px solid rgba(0,0,0,0.45);
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }
    .mt-tweet-feed {
      background: #fff;
      width: 522px;
    }
    .mt-tweet-feed-header {
      font-size: 18px;
      padding: 10px;
    }
    .mt-tweet-feed-footer {
      border-top: 1px solid #e8e8e8;
      padding: 8px;
      text-align: center;
    }

Add new files into index.html:

    <link rel="stylesheet" type="text/css" href="mt/tweetfeed/tweetfeed.css" />
    <script type="text/javascript" charset="utf-8" src="mt/tweetfeed/tweetfeed.js"></script>

And prepare new test data.

**public/boot.js**

    var data;
    var tweetFeed;
    
    $(function() {
        data = mt.Data.createByJson([
            {
                "fullName": "Road Runner",
                "shortName": "roadrunner",
                "avatarUrl48": "backend/avatar-48.png",
                "contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
                "timeAgo": 215000,
                "like": false,
                "retweet": true
            }, {
                "fullName": "Road Runner",
                "shortName": "roadrunner",
                "avatarUrl48": "backend/avatar-48.png",
                "contentHtml": "Tweet feed is growing",
                "timeAgo": 515000,
                "like": false,
                "retweet": false
            }
        ]);
        tweetFeed = new mt.TweetFeed(data);
        tweetFeed.{@link JW.UI.Component#renderTo renderTo}("#container");
    });

If we'll execute the application in browser, we'll see what was required.

Let's review one more way of child components adding, without `render<ChildId>` method definition.
let's remove renderTweets method and override {@link JW.UI.Component#renderComponent renderComponent} method instead:

        // override
        {@link JW.UI.Component#renderComponent renderComponent}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.tweetViews = this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this);
            this.{@link JW.UI.Component#addArray addArray}(this.tweetViews, "tweets");
        },

This code is equivalent to previous one, but child component list is added dynamically by
{@link JW.UI.Component#addArray addArray} method. This method takes element "jwid" as second argument, which should be
used as container for child components, passed in first argument. If we won't pass second argument, the array will be
rendered into root element. Use the way you like more. I'll stick to first way, using `render<ChildId>` method.

Disadvantage of this entire sample is that tweet array is fixed. We are unable to add or remove specific tweets
dynamically. We'll learn it in future.
