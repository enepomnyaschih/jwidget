# Part 2. Arrays of child components

Demo: [http://enepomnyaschih.github.io/mt/1.4-2/](http://enepomnyaschih.github.io/mt/1.4-2/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-1.4-2](https://github.com/enepomnyaschih/mt/tree/mt-1.4-2) (Git branch)

In this part, we'll meet JW.AbstractArray. We will try its algorithms
{@link JW.AbstractArray#method-map map} and {@link JW.AbstractArray#method-$map $map}
and will learn how to add child UI component arrays.

Our goal is to render an array of tweets, which we've developed in the previous part.

{@img tweet-feed.png}

Like in the first sample, let's start with the model. We must put several tweets into an array. Let's define a class mt.Data
for this. It will contain an array of the tweets.

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweets = new JW.Array(); // JW.AbstractArray<mt.data.Tweet>
    };
    
    JW.extend(mt.Data, JW.Class, {
        // override
        {@link JW.Class#destroyObject destroyObject}: function() {
            this.tweets.{@link JW.AbstractArray#$clear $clear}().{@link JW.AbstractArray#each each}(JW.destroy); // clear array and destroy items
            this.tweets.{@link JW.AbstractArray#destroy destroy}(); // destroy array
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
The method takes a native Array as a first argument and a callback function as a second argument.
The callback function mt.data.Tweet.createByJson converts an Object (JSON) into a mt.data.Tweet instance,
that we've implemented in the previous part.

As the result of {@link JW.Array#static-method-map JW.Array.map} method call we've got a native JS Array of mt.data.Tweet
instances. We pass it into {@link JW.AbstractArray#addAll addAll} method of data.tweets array in order to fill it in:

        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json, mt.data.Tweet.createByJson));

Since we construct this.tweets object in constructor of mt.Data, we **must** destroy it in destructor.
This is a part of jWidget philosophy. Object creator must destroy it. So, if we'll destroy mt.Data instance by
{@link JW.Class#destroy destroy} method, all the included objects will be destroyed as well.

        // override
        {@link JW.Class#destroy destroy}: function() {
            this.tweets.{@link JW.AbstractArray#$clear $clear}().{@link JW.AbstractArray#each each}(JW.destroy); // clear array and destroy items
            this.tweets.{@link JW.AbstractArray#destroy destroy}(); // destroy array
            this.{@link JW.Class#method-_super _super}();
        }

We can get rid of "destroy" method by using jWidget **object aggregation feature**. If object A aggregates object B, then object B
will be destroyed automatically on object A destruction. We can aggregate an object using method
{@link JW.Class#own} and we can aggregate the items of an array using method {@link JW.AbstractCollection#ownItems}:

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweets = this.{@link JW.Class#own own}(new JW.Array()).{@link JW.AbstractCollection#ownItems ownItems}(); // JW.AbstractArray<mt.data.Tweet>
    };
    
    JW.extend(mt.Data, JW.Class);
    
    mt.Data.createByJson = function(json) {
        var data = new mt.Data();
        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json, mt.data.Tweet.createByJson));
        return data;
    };
    
    mt.data = {};

Let's continue with the view. Define class mt.TweetFeed for tweet feed view.

**public/mt/tweetfeed/tweetfeed.js**

    mt.TweetFeed = function(data) {
        mt.TweetFeed.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data; // mt.Data
    };
    
    JW.extend(mt.TweetFeed, JW.UI.Component, {
        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
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

- First, the one method is an instance method, and the second one is a static method. **All collections of jWidget have a common
set of static methods for native JavaScript collections (Array, Object) and instance methods for jWidget
collections (JW.AbstractArray, JW.AbstractMap, JW.AbstractSet). Static methods are defined in
JW.Array, JW.Map, JW.Set and take native collection as a first argument.**
- Second, {@link JW.Array#static-method-map JW.Array.map} method returns a native JavaScript Array, when
{@link JW.AbstractArray#method-$map $map} method returns JW.Array. **All methods which names start from $ symbol
return jWidget collections. All other methods return native JavaScript collections or other values.**

Both rules are introduced for convenience. Each algorithm has multiple implementations, which are constrained by
fixed naming convention. Use one implementation which is more convenient in this particular situation.

In our sample, {@link JW.AbstractArray#method-$map $map} method takes callback function as a first argument,
and this function converts mt.data.Tweet instance into mt.TweetView instance:

        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
        }

In second argument, method takes callback function call context (this). The rule is simple:
**whenever you pass a function as a function argument, you can optionally pass its call context as a next argument.**

As result we'll get JW.Array instance, which contains mt.TweetView instances. We return this array as
renderTweets method result. By doing this, we ask the framework to render the child components into element with jwid="tweets".

Next, let's create a CSS file.

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
let's remove renderTweets method and override {@link JW.UI.Component#afterRender afterRender} method instead:

        // override
        {@link JW.UI.Component#afterRender afterRender}: function() {
            this.{@link JW.Class#method-_super _super}();
            var tweetViews = this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this).{@link JW.AbstractCollection#ownItems ownItems}();
            this.{@link JW.UI.Component#addArray addArray}(tweetViews, "tweets");
        },

This code is equivalent to previous one, but child component list is added dynamically by
{@link JW.UI.Component#addArray addArray} method. This method takes element "jwid" as second argument, which should be
used as container for child components, passed in first argument. If we won't pass second argument, the array will be
rendered into root element. Use the way you like more. I'll stick to first way, using `render<ChildId>` method.

Disadvantage of this entire sample is that tweet array is fixed. We are unable to add or remove specific tweets
dynamically. We'll learn it in future.
