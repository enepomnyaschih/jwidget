# Part 7. Project infrastructure

Demo: [http://enepomnyaschih.github.io/mt/1.4-7/](http://enepomnyaschih.github.io/mt/1.4-7/)

Source: [https://github.com/enepomnyaschih/mt/tree/mt-1.4-7](https://github.com/enepomnyaschih/mt/tree/mt-1.4-7) (Git branch)

In this part, we'll improve the project infrastructure:

1. Resolve jQuery and jWidget project dependencies using [Bower](http://bower.io/) package manager.
1. Extract HTML templates into separate HTML files using [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/en).
1. Utilize [Stylus](http://learnboost.github.io/stylus/) CSS-preprocessor to exploit "jwclass" attribute.
1. Extract testing JSON data into separate JSON file using [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/en).

## Resolve project dependencies using Bower

It is a good practice to keep all thirdparties outside of project repository. This way, repository will contain
less files and it will simplify thirdparties updating process. [Bower](http://bower.io/) package manager
helps us with this.

Please setup [NodeJS](http://nodejs.org/) by instruction on the site. Next, run this
command to setup Bower via NodeJS Package Manager:

    npm install -g bower

Create public/bower.json file in repository folder.

**public/bower.json**

    {
        "name": "minitwitter",
        "version": "0.0.0",
        "dependencies": {
            "jquery": "~2.1.0",
            "jwidget": "~1.4.1"
        }
    }

Open bash terminal (in Windows: Git Bash) in public folder and execute command:

    bower install

Bower will resolve all project dependencies and put the libraries in public/bower_components folder. Edit
public/index.html to adjust paths to the libraries.

**public/index.html**

            ...
            <link rel="stylesheet" type="text/css" href="mt/tweetview/tweetview.css" />
            <script type="text/javascript" charset="utf-8" src="bower_components/jquery/dist/jquery.js"></script>
            <script type="text/javascript" charset="utf-8" src="bower_components/jwidget/jwlib.js"></script>
            <script type="text/javascript" charset="utf-8" src="bower_components/jwidget/jwui.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/mt.js"></script>
            ...

Run application in browser and you'll see that it works as before.

{@img application.png}

Let's do some cleanup. Delete folders public/thirdparty/jquery and public/thirdparty/jwidget since Bower downloads
them automatically now. Add public/bower_components to .gitignore file.

**.gitignore**

    /public/bower_components

Now you can commit your changes.

## Extract HTML templates using jWidget SDK

Install [jWidget SDK by instruction](https://github.com/enepomnyaschih/jwsdk/wiki/jWidget-SDK-setup). Use `empty_project_html`
as a template on step 4. Replace the existing .gitignore file, and then add "/public/bower_components" to it.

**.gitignore**

    /*.log
    /jwsdk-config/json
    /jwsdk-config/snippets
    /jwsdk-config/temp
    /public/bower_components
    /public/build
    /public/pages
    /.sass-cache

Next, create "mt" package for our project.

**jwsdk-config/packages/mt.json**

    {
        "requires": [
            "thirdparty/reset.css",
            "bower_components/jquery/dist/jquery.js|auto",
            "bower_components/jwidget/jwlib.js|auto",
            "bower_components/jwidget/jwui.js|auto"
        ],
        "resources": [
            "mt/mt.js",
            "mt/application/application.js",
            "mt/application/application.css",
            "mt/data/data.js",
            "mt/data/profile.js",
            "mt/data/tweet.js",
            "mt/profilebox/profilebox.js",
            "mt/profilebox/profilebox.css",
            "mt/tweetfeed/tweetfeed.js",
            "mt/tweetfeed/tweetfeed.css",
            "mt/tweetview/tweetview.js",
            "mt/tweetview/tweetview.css",
            "boot.js"
        ]
    }

Create "index" page.

**jwsdk-config/pages/index.json**

    {
        "package"  : "mt",
        "template" : "base",
        "title"    : "Mini-Twitter"
    }

Also we want to make sure that our project will work on [GitHub Pages](http://pages.github.com/), but they don't
support ".htaccess" file. So let's transform global project configuration a little bit, to make sure that our
output HTML files will be generated in document root and all URLs will be relative.
Change next options in jwsdk-config/config.json file:

        "pagesUrl"      : "",
        "urlPrefix"     : "",

And delete public/.htaccess file.

Compile project from command line in your project root directory:

    jwsdk debug jwsdk-config

{@img debug.png}

Open public/index.html and see that its content has been changed.

**public/index.html**

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=9" />
            
            <title>Mini-Twitter</title>
            <link rel="stylesheet" type="text/css" href="thirdparty/reset.css?timestamp=1379314418" />
            <link rel="stylesheet" type="text/css" href="mt/application/application.css?timestamp=1379409267" />
            <link rel="stylesheet" type="text/css" href="mt/profilebox/profilebox.css?timestamp=1379409410" />
            <link rel="stylesheet" type="text/css" href="mt/tweetfeed/tweetfeed.css?timestamp=1379402158" />
            <link rel="stylesheet" type="text/css" href="mt/tweetview/tweetview.css?timestamp=1379401729" />
        </head>
        <body>
            
            <script type="text/javascript" charset="utf-8" src="bower_components/jquery/dist/jquery.js?timestamp=1397723667"></script>
            <script type="text/javascript" charset="utf-8" src="bower_components/jwidget/jwlib.js?timestamp=1397723667"></script>
            <script type="text/javascript" charset="utf-8" src="bower_components/jwidget/jwui.js?timestamp=1397723667"></script>
            <script type="text/javascript" charset="utf-8" src="mt/mt.js?timestamp=1379314418"></script>
            <script type="text/javascript" charset="utf-8" src="mt/application/application.js?timestamp=1379414626"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/data.js?timestamp=1379424016"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/profile.js?timestamp=1379414626"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/tweet.js?timestamp=1379417140"></script>
            <script type="text/javascript" charset="utf-8" src="mt/profilebox/profilebox.js?timestamp=1379424016"></script>
            <script type="text/javascript" charset="utf-8" src="mt/tweetfeed/tweetfeed.js?timestamp=1379424016"></script>
            <script type="text/javascript" charset="utf-8" src="mt/tweetview/tweetview.js?timestamp=1379424018"></script>
            <script type="text/javascript" charset="utf-8" src="boot.js?timestamp=1379414626"></script>
        </body>
    </html>

Run application in browser and you'll see that it works as before.

{@img application.png}

Since public/index.html file is built automatically now, let's delete it and add to .gitignore, in place of
"/public/pages" line.

**.gitignore**

    /*.log
    /jwsdk-config/json
    /jwsdk-config/snippets
    /jwsdk-config/temp
    /public/bower_components
    /public/build
    /public/*.html
    /.sass-cache

Commit these changes to make sure that public/index.html is deleted from repository.

Now, the rule is simple: **it is recommended to re-compile the project after each code or project configuration
modification.** At least, to update timestamps of modified files to make sure that they won't be taken from
browser cache. Other reasons why you must re-compile project before run, will be described later. Now, just
keep this rule in your mind, and you'll get used to have an opened console with "jwsdk debug jwsdk-config" command
in history ready to go.

jWidget SDK not just makes project development easy and fun: you'll be able to minify your code easily,
add dynamic script loading and perform other improvements/optimizations. For whoever is interested, you can
try to compile the project via "jwsdk release jwsdk-config" command:

{@img release.png}

Release compilation is performed quite longer, but it optimizes project loading drastically. Open an output
"index.html" and you'll see that:

**public/index.html**

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=9" />
            
            <!-- Insert production meta tags here -->
            
            <title>Mini-Twitter</title>
            <link rel="stylesheet" type="text/css" href="thirdparty/reset.css?timestamp=1379314418" />
            <link rel="stylesheet" type="text/css" href="build/packages/mt.min.css?timestamp=1379490399" />
        </head>
        <body>
            
            <!-- Insert external services here -->
            
            <script type="text/javascript" charset="utf-8" src="bower_components/jquery/dist/jquery.min.js?timestamp=1397723667"></script>
            <script type="text/javascript" charset="utf-8" src="bower_components/jwidget/jwlib.min.js?timestamp=1397723667"></script>
            <script type="text/javascript" charset="utf-8" src="bower_components/jwidget/jwui.min.js?timestamp=1397723667"></script>
            <script type="text/javascript" charset="utf-8" src="build/packages/mt.min.js?timestamp=1379490400"></script>
        </body>
    </html>

As you can see, "mt" package is merged into 2 minified files: mt.min.css and mt.min.js. Use release compilation
before project push to production. If you'll run the application in browser, you'll see that it works as before.

{@img application.png}

Let's start our refactoring. First, let's extract HTML templates into separate files. We have JW.UI.template code
blocks in each of next files:

    public/
        mt/
            application/application.js
            profilebox/profilebox.js
            tweetfeed/tweetfeed.js
            tweetview/tweetview.js

Just move HTML of these templates into separate files with jw.html extension.

**public/mt/application/application.jw.html**

    <div jwclass="mt-application">
        <div jwid="wrap">
            <div jwid="profile-box"></div>
            <div jwid="tweets"></div>
            <div class="clear"></div>
        </div>
    </div>

**public/mt/profilebox/profilebox.jw.html**

    <div jwclass="mt-profile-box">
        <a jwid="top" class="blocklink" href="#" target="_blank">
            <div jwid="avatar"></div>
            <div jwid="full-name"></div>
            <div jwid="show-profile">Show my profile</div>
            <div class="clear"></div>
        </a>
        <div jwid="middle">
            <a jwid="count tweets" class="blocklink" href="#" target="_blank">
                <div jwid="count-value tweets-value"></div>
                <div jwid="count-label">TWEETS</div>
            </a>
            <a jwid="count count-border following" class="blocklink" href="https://twitter.com/following" target="_blank">
                <div jwid="count-value following-value"></div>
                <div jwid="count-label">FOLLOWING</div>
            </a>
            <a jwid="count count-border followers" class="blocklink" href="https://twitter.com/followers" target="_blank">
                <div jwid="count-value followers-value"></div>
                <div jwid="count-label">FOLLOWERS</div>
            </a>
            <div class="clear"></div>
        </div>
        <div jwid="bottom">
            <form jwid="compose-form">
                <div jwid="compose-fields">
                    <textarea jwid="compose-input" type="text" placeholder="Compose tweet..."></textarea>
                </div>
                <div jwid="compose-buttons">
                    <input jwid="compose-submit" type="submit" value="Tweet">
                </div>
            </form>
        </div>
    </div>

**public/mt/tweetfeed/tweetfeed.jw.html**

    <div jwclass="mt-tweet-feed">
        <div jwid="header">Tweets</div>
        <div jwid="tweets"></div>
        <div jwid="footer">...</div>
    </div>

**public/mt/tweetview/tweetview.jw.html**

    <div jwclass="mt-tweet">
        <div jwid="avatar"></div>
        <div jwid="content">
            <div jwid="header">
                <div jwid="full-name"></div>
                <div jwid="short-name"></div>
                <div jwid="time"></div>
                <div class="clear"></div>
            </div>
            <div jwid="text"></div>
            <div jwid="buttons">
                <a jwid="button like" href="#"></a>
                <a jwid="button retweet" href="#"></a>
                <a jwid="button remove" href="#">Remove</a>
            </div>
        </div>
        <div class="clear"></div>
    </div>

Please remove all JW.UI.template calls from source js files.

Add new files into jwsdk-config/packages/mt.json package configuration and bind them to corresponding
JW.UI.Component subclasses:

            // ...
            "mt/application/application.js",
            "mt/application/application.jw.html : mt.Application",
            // ...
            "mt/profilebox/profilebox.js",
            "mt/profilebox/profilebox.jw.html : mt.ProfileBox",
            // ...
            "mt/tweetfeed/tweetfeed.js",
            "mt/tweetfeed/tweetfeed.jw.html : mt.TweetFeed",
            // ...
            "mt/tweetview/tweetview.js",
            "mt/tweetview/tweetview.jw.html : mt.TweetView",
            // ...

Compile project with "jwsdk debug jwsdk-config" command and open it in browser. You'll see that it works as before.

{@img application.png}

What is the purpose of doing so? The answer is: it is convenient. We've unbound HTML from code. Now, you don't need
to write infinite apostrophes/quotes around template rows and concatenate them. Also, HTML is highlighted very well
in text editors. Compare:

{@img editor.png} {@img editor-2.png}

If you wonder how it works, open index.html and see by yourself.

## Utilize Stylus CSS preprocessor

At next step, we'll introduce [Stylus](http://learnboost.github.io/stylus/) CSS-preprocessor to our project to
make CSS development easier. Run this command to setup Stylus via NodeJS Package Manager:

    npm install -g stylus

Let's create files with utility styles and constants of Stylus right away.

**public/thirdparty/imports.styl**

    vendor(prop, args)
        -webkit-{prop} args
        -moz-{prop} args
        {prop} args
    
    border-radius()
        vendor('border-radius', arguments)
    
    box-shadow()
        vendor('box-shadow', arguments)
    
    xy(x, y)
        left x
        top y
    
    size(w, h)
        width w
        height h
    
    location(x, y, w, h)
        xy x y
        size w h

**public/mt/imports.styl**

    @import 'thirdparty/imports.styl'
    
    mt-sans-serif = Arial,sans-serif
    mt-hover-color = #0084B4
    mt-grid-border = 1px solid #E8E8E8
    
    mt-bold()
        color #333
        font-family mt-sans-serif
        font-size 14px
        font-weight bold
        text-shadow 0 1px 0 white
    
    mt-light()
        color #999
        font-family mt-sans-serif
        font-size 11px
        text-shadow 0 1px 0 white
    
    mt-border()
        border 1px solid rgba(0, 0, 0, 45%)
        border-radius 6px

Now, let's re-write styles of all components to Stylus. Beauty will save the project! Look, how useful can be
our CSS-class naming standard in this situation.

**public/mt/application/application.styl**

    @import 'mt/imports'
    
    .mt-html
    .mt-body
        background #C0DEED
    
    .mt-application
        font-family mt-sans-serif
        
        &-wrap
            background rgba(100%, 100%, 100%, 50%)
            margin 0 auto
            padding 15px
            width 868px
        
        &-profile-box
            float left
            width 302px
        
        &-tweets
            float left
            margin-left 13px

**public/mt/profilebox/profilebox.styl**

    @import 'mt/imports'
    
    .mt-profile-box
        grid-border = 1px solid #e8e8e8
        
        mt-border()
        background #f9f9f9
        
        &-top
            border-bottom grid-border
            padding 12px
            padding-bottom 2px
        
        &-avatar
            background transparent none no-repeat 0 0
            border-radius 3px
            float left
            margin 0 10px 10px 0
            size 32px 32px
        
        &-full-name
            mt-bold()
            padding-top 2px
            
            .mt-profile-box-top:hover &
                color mt-hover-color
                text-decoration underline
        
        &-show-profile
            mt-light()
        
        &-count
            float left
            padding 7px 12px
            
            &-value
                mt-bold()
                
                .mt-profile-box-count:hover &
                    color mt-hover-color
            
            &-label
                mt-light()
                
                .mt-profile-box-count:hover &
                    color mt-hover-color
            
            &-border
                border-left grid-border
        
        &-bottom
            background #f5f5f5
            border-radius 0 0 6px 6px
            border-top grid-border
            padding 10px 12px
        
        &-compose-input
            border 1px solid #ccc
            border-radius 3px
            padding 8px
            width 274px
        
        &-compose-buttons
            text-align right
        
        &-compose-submit
            mt-bold()
            background #19AADF
            border 1px solid #057ED0
            border-radius 4px
            color white
            cursor pointer
            padding 6px 10px
            text-shadow 0 -1px 0 rgba(0, 0, 0, 45%)
            
            &:hover
                background #09A0D7

**public/mt/tweetfeed/tweetfeed.styl**

    @import 'mt/imports'
    
    .mt-tweet-feed
        mt-border()
        background white
        width 522px
        
        &-header
            mt-bold()
            font-size 18px
            padding 10px
        
        &-footer
            border-top mt-grid-border
            padding 8px
            text-align center

**public/mt/tweetview/tweetview.styl**

    @import 'mt/imports'
    
    .mt-tweet
        background white
        border-top mt-grid-border
        font-size 14px
        padding 12px
        
        &:hover
            background #f5f5f5
        
        &-avatar
            background transparent none no-repeat 0 0
            border-radius 5px
            float left
            margin-right 10px
            size 48px 48px
        
        &-content
            float left
            width 438px
        
        &-full-name
            mt-bold()
            float left
            margin-right 4px
        
        &-short-name
            mt-light()
            float left
        
        &-time
            mt-light()
            float right
        
        &-text
            padding 5px 0
        
        &-buttons
            text-align right
        
        &-button
            color #0084B4
            cursor pointer
            display inline-block
        
        &-like
        &-retweet
            margin-right 10px
        
        &-like.active
            color #FF9B00
        
        &-retweet.active
            color #609928

Now let's remove source CSS-files and change jwsdk-config/packages/mt.json package configuration:

            // ...
            "mt/application/application.jw.html : mt.Application",
            "mt/application/application.styl",
            // ...
            "mt/profilebox/profilebox.jw.html : mt.ProfileBox",
            "mt/profilebox/profilebox.styl",
            // ...
            "mt/tweetfeed/tweetfeed.jw.html : mt.TweetFeed",
            "mt/tweetfeed/tweetfeed.styl",
            // ...
            "mt/tweetview/tweetview.jw.html : mt.TweetView",
            "mt/tweetview/tweetview.styl",
            // ...

Compile project and make sure that it works as before.

{@img application.png}

## Extract testing JSON data

At last step, let's extract testing JSON data into separate JSON file.

**public/data.json**

    {
        "profile": {
            "fullName": "Road Runner",
            "shortName": "roadrunner",
            "avatarUrl32": "backend/avatar-32.png",
            "avatarUrl48": "backend/avatar-48.png",
            "tweets": 380,
            "following": 21,
            "followers": 27
        },
        "tweets": [
            {
                "fullName": "Road Runner",
                "shortName": "roadrunner",
                "avatarUrl48": "backend/avatar-48.png",
                "contentHtml": "jWidget documentation is here <a href=\"https:\/\/enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
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
        ]
    }

**public/boot.js**

    var data;
    var application;
    
    $(function() {
        data = mt.Data.createByJson(dataJson);
        application = new mt.Application(data);
        application.renderTo("body");
    });

Add next line into jwsdk-config/packages/mt.json package configuration:

            // ...
            "data.json : dataJson",
            "boot.js"
        ]
    }

Compile project and make sure that it works as before.

{@img application.png}

We've got a project, developed by all jWidget standards. Now you have all skills neccessary to develop fully-capable
Model-View applications based on jWidget.

I hope that this guide was useful for you. I'm happy if you'll select jWidget as a framework for your
next project. Please, send all remarks and offers to me by
email [jwidgetproject@gmail.com](mailto:jwidgetproject@gmail.com).
