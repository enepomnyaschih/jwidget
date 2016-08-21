# Part 1. Model and view

Demo: [http://enepomnyaschih.github.io/mt/2.0-1/](http://enepomnyaschih.github.io/mt/2.0-1/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-2.0-1](https://github.com/enepomnyaschih/mt/tree/mt-2.0-1) (Git branch)

This jWidget samples series shows you a way to develop an own Twitter in several steps using jWidget
and TypeScript.
If you want to learn how to develop powerful Model-View-applications with jWidget, please follow these steps
accurately in the same order. If motivation of some action is unclear for you, then probably we'll explain it
at the next steps. Please don't deviate from this strategy yet.

In the first sample we take a look at model and view. We will develop a simple UI component which takes data
from a model to render itself.

First, download [jQuery](http://jquery.com), jquery.d.ts file from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/jquery) repository, [jWidget](guides/endownload/jwidget.zip) and
[style resetting file](https://raw.github.com/enepomnyaschih/mt1/master/public/thirdparty/reset.css).
Drop them to "thirdparty" folder. All public content, including "thirdparty", should be located in "public" folder.
Unzip jwidget.zip and rename "jwidget-files" folder to "jwidget".

Create folder "public/mt" (Mini-Twitter). We will create all project-specific source files there.

Download profile avatar files
[public/backend/avatar-32.png](https://raw.github.com/enepomnyaschih/mt/master/public/backend/avatar-32.png) and
[public/backend/avatar-48.png](https://raw.github.com/enepomnyaschih/mt/master/public/backend/avatar-48.png) to
"public/backend" folder.

We'll get the next file/folder structure:

    public/
        backend/
            avatar-32.png
            avatar-48.png
        mt/
        scripts/
            jquery/
                jquery.js
                jquery.min.js
                jquery.d.ts
            jwidget/
                jwlib.js
                jwlib.min.js
                jwlib.d.ts
                jwui.js
                jwui.min.js
                jwui.d.ts
            reset.css

Create file public/index.html with next content:

**public/index.html**

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=9" />
            <title>Mini-Twitter</title>
            <link rel="stylesheet" type="text/css" href="thirdparty/reset.css" />
            <script type="text/javascript" charset="utf-8" src="thirdparty/jquery/jquery.js"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwlib.js"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwui.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/mt.js"></script>
        </head>
        <body>
            <div id="container" style="width: 302px;"></div>
        </body>
    </html>

Project skeleton is prepared, so let's start the development.

Our goal is to implement a component for tweet representation:

{@img tweet-view.png}

Let's find out, what is the data here, i.e. what can be different for a couple of different tweets:

{@img tweet-view-comments.png}

Let's create classes, which store this data. Define namespace mt.data for all model classes.

**public/mt/data/data.js**

    mt.data = {};

Let's implement class mt.data.Tweet, which will be tweet model.

**public/mt/data/tweet.js**

    mt.data.Tweet = function(config) {
        mt.data.Tweet._super.call(this);
        this.fullName = config.fullName; // string
        this.shortName = config.shortName; // string
        this.avatarUrl48 = config.avatarUrl48; // string
        this.contentHtml = config.contentHtml; // string
        this.time = config.time; // number
        this.like = config.like; // boolean
        this.retweet = config.retweet; // boolean
    };
    
    JW.extend(mt.data.Tweet, JW.Class);
    
    mt.data.Tweet.createByJson = function(json) {
        return new mt.data.Tweet(JW.apply({}, json, {
            time: new Date().getTime() - json.timeAgo
        }));
    };

We copy each field one by one in constructor by intent instead of using

    JW.apply(this, config);

The reason is that this lets the browser to properly optimize the class.

Model development is finished. Let's start view development. Define tweet component.

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView._super.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component);

Next, we need to bind an HTML template to this component. It can be done next way.

    JW.UI.template(mt.TweetView, {
        main:
            '<div jwclass="mt-tweet">' +
                '<div jwid="avatar"></div>' +
                '<div jwid="content">' +
                    '<div jwid="header">' +
                        '<div jwid="full-name"></div>' +
                        '<div jwid="short-name"></div>' +
                        '<div jwid="time"></div>' +
                        '<div class="clear"></div>' +
                    '</div>' +
                    '<div jwid="text"></div>' +
                    '<div jwid="buttons">' +
                        '<a jwid="button like" href="#"></a>' +
                        '<a jwid="button retweet" href="#"></a>' +
                        '<a jwid="button remove" href="#">Remove</a>' +
                    '</div>' +
                '</div>' +
                '<div class="clear"></div>' +
            '</div>'
    });

This is usual HTML except one thing: special attributes "jwclass" and "jwid".
"jwclass" is a root CSS-class of the component, and the prefix for all elements which have "jwid" defined.
CSS-class of each element with "jwid" will be `<jwclass>-<jwid>`. So,
the template above will expand to the next HTML:

    <div class="mt-tweet">
        <div class="mt-tweet-avatar"></div>
        <div class="mt-tweet-content">
            <div class="mt-tweet-header">
                <div class="mt-tweet-full-name"></div>
                <div class="mt-tweet-short-name"></div>
                <div class="mt-tweet-time"></div>
                <div class="clear"></div>
            </div>
            <div class="mt-tweet-text"></div>
            <div class="mt-tweet-buttons">
                <a class="mt-tweet-button mt-tweet-like" href="#"></a>
                <a class="mt-tweet-button mt-tweet-retweet" href="#"></a>
                <a class="mt-tweet-button mt-tweet-remove" href="#">Remove</a>
            </div>
        </div>
        <div class="clear"></div>
    </div>

Presence of a common prefix `mt-tweet-` in all elements simplifies component slicing via various CSS-preprocessors
like [Sass](http://sass-lang.com/), [LESS](http://lesscss.org/) and [Stylus](http://learnboost.github.io/stylus/),
but we'll explain it in details later.

It is time to execute our application. To do it, we need testing data and a main entry point.
Let's define them in boot.js file.

**public/boot.js**

    var tweetData;
    var tweetView;

    $(function() {
        tweetData = mt.data.Tweet.createByJson({
            "fullName": "Road Runner",
            "shortName": "roadrunner",
            "avatarUrl48": "backend/avatar-48.png",
            "contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" " +
                "target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
            "timeAgo": 215000,
            "like": false,
            "retweet": true
        });
        tweetView = new mt.TweetView(tweetData);
        tweetView.renderTo("#container");
    });

As you can see, we've provided global access points to model (tweetData) and view (tweetView). This is optional step
which will simplify application debugging a lot if error will happen.

Add all created files into index.html:

**public/index.html**

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=9" />
            <title>Mini-Twitter</title>
            <link rel="stylesheet" type="text/css" href="thirdparty/reset.css" />
            <script type="text/javascript" charset="utf-8" src="thirdparty/jquery/jquery.js"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwlib.js"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwui.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/mt.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/data.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/tweet.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/tweetview/tweetview.js"></script>
            <script type="text/javascript" charset="utf-8" src="boot.js"></script>
        </head>
        <body>
            <div id="container" style="width: 302px;"></div>
        </body>
    </html>

And execute the application in browser. You'll see something like this:

{@img result-1.png}

As you can see, our component has a structure but doesn't have any data.
Let's bind the component elements to the data. jWidget framework doesn't provide any magic HTML syntax for this.
So, the template won't be changed, but we'll add some code in JS. The real tool that jWidget provides for us
is direct and fast access to [jQuery-wrappers](http://api.jquery.com) of all HTML elements having
`jwid` attribute defined. You can access these elements inside method `afterRender`
via method `getElement`:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView._super.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        // override
        afterRender: function() {
            this._super();
            this.getElement("avatar").css("background-image", "url(" + this.tweetData.avatarUrl48 + ")");
            var timeAgo = new Date().getTime() - this.tweetData.time;
            var text = this._getTimeString(timeAgo);
            this.getElement("time").text(text);
            this.getElement("full-name").text(this.tweetData.fullName);
            this.getElement("short-name").text("@" + this.tweetData.shortName);
            this.getElement("text").html(this.tweetData.contentHtml);
            this.getElement("like").toggleClass("active", this.tweetData.like).
                text(this.tweetData.like ? "Unlike" : "Like");
            this.getElement("retweet").toggleClass("active", this.tweetData.retweet).
                text(this.tweetData.retweet ? "Unretweet" : "Retweet");
        },
        
        _getTimeString: function(timeAgo) {
            var minutes = timeAgo / 60000;
            if (minutes < 1) {
                return "Just now";
            }
            if (minutes < 60) {
                return Math.floor(minutes) + "m";
            }
            var hours = minutes / 60;
            if (hours < 24) {
                return Math.round(hours) + "h";
            }
            
            function pad(value) {
                return (value < 10) ? ("0" + value) : String(value);
            }
            
            var date = new Date(new Date().getTime() - timeAgo);
            return date.getDate() + "." + pad(date.getMonth());
        }
    });
    
    // ... template

Result:

{@img result-2.png}

Works well, but looks poor. Let's demonstrate the magic of slicing.

**public/mt/tweetview/tweetview.css**

    .mt-tweet-full-name {
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
      text-shadow: 0 1px 0 #fff;
    }
    .mt-tweet-short-name,
    .mt-tweet-time {
      color: #999;
      font-family: Arial, sans-serif;
      font-size: 11px;
      text-shadow: 0 1px 0 #fff;
    }
    .mt-tweet {
      background: #fff;
      border-top: 1px solid #e8e8e8;
      font-family: Arial,sans-serif;
      font-size: 14px;
      padding: 12px;
      width: 520px;
    }
    .mt-tweet:hover {
      background: #f5f5f5;
    }
    .mt-tweet-avatar {
      background: transparent none no-repeat 0 0;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      float: left;
      margin-right: 10px;
      width: 48px;
      height: 48px;
    }
    .mt-tweet-content {
      float: left;
      width: 438px;
    }
    .mt-tweet-full-name {
      float: left;
      margin-right: 4px;
    }
    .mt-tweet-short-name {
      float: left;
    }
    .mt-tweet-time {
      float: right;
    }
    .mt-tweet-text {
      padding: 5px 0;
    }
    .mt-tweet-buttons {
      text-align: right;
    }
    .mt-tweet-button {
      color: #0084b4;
      cursor: pointer;
      display: inline-block;
    }
    .mt-tweet-like,
    .mt-tweet-retweet {
      margin-right: 10px;
    }
    .mt-tweet-like.active {
      color: #ff9b00;
    }
    .mt-tweet-retweet.active {
      color: #609928;
    }

Add the CSS-file into index.html:

    <link rel="stylesheet" type="text/css" href="mt/tweetview/tweetview.css" />

As result, we'll see what we wanted to:

{@img tweet-view.png}

Let's review one more thing. We can write JS code of the component the next way. Instead of accessing the elements
using getElement` method, let's just define methods `render<ChildId>`, where `<ChildId>` is
"jwid" of an element written in CapitalizedCamelCase:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView._super.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        renderAvatar: function(el) {
            el.css("background-image", "url(" + this.tweetData.avatarUrl48 + ")");
        },
        
        renderTime: function(el) {
            var timeAgo = new Date().getTime() - this.tweetData.time;
            var text = this._getTimeString(timeAgo);
            el.text(text);
        },
        
        renderFullName: function(el) {
            el.text(this.tweetData.fullName);
        },
        
        renderShortName: function(el) {
            el.text("@" + this.tweetData.shortName);
        },
        
        renderText: function(el) {
            el.html(this.tweetData.contentHtml);
        },
        
        renderLike: function(el) {
            el.toggleClass("active", this.tweetData.like).text(this.tweetData.like ? "Unlike" : "Like");
        },
        
        renderRetweet: function(el) {
            el.toggleClass("active", this.tweetData.retweet).text(this.tweetData.retweet ? "Unretweet" : "Retweet");
        },
        
        _getTimeString: function(timeAgo) {
            var minutes = timeAgo / 60000;
            if (minutes < 1) {
                return "Just now";
            }
            if (minutes < 60) {
                return Math.floor(minutes) + "m";
            }
            var hours = minutes / 60;
            if (hours < 24) {
                return Math.round(hours) + "h";
            }
            
            function pad(value) {
                return (value < 10) ? ("0" + value) : String(value);
            }
            
            var date = new Date(new Date().getTime() - timeAgo);
            return date.getDate() + "." + pad(date.getMonth());
        }
    });
    
    // ... template

This code is equivalent to the first one. There is 4 times more code, but it became more readable. Each specific
element is rendered via its own method.
You can use one way or another. I prefer second way because it is more flexible: you can override any
element rendering in an inherited component class. Let's stick to this way in future samples.
