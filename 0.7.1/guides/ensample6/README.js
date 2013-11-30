Ext.data.JsonP.ensample6({"guide":"<h1 id='ensample6-section-part-6.-project-infrastructure'>Part 6. Project infrastructure</h1>\n\n<p>Demo: <a href=\"http://enepomnyaschih.github.io/mt/6/\">http://enepomnyaschih.github.io/mt/6/</a></p>\n\n<p>Source: <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-6\">https://github.com/enepomnyaschih/mt/tree/mt-6</a> (Git branch)</p>\n\n<p>In this part, we'll improve project infrastructure: extract HTML templates into separate HTML file using\n<a href=\"https://github.com/enepomnyaschih/jwsdk/wiki/ru\">jWidget SDK</a> and will learn how to use\n<a href=\"http://learnboost.github.io/stylus/\">Stylus</a> CSS-preprocessor to make slicing easier and more convenient.</p>\n\n<p>Let's start with\n<a href=\"https://github.com/enepomnyaschih/jwsdk/wiki/jWidget-SDK-setup\">jWidget SDK installing by instruction</a> (steps 1-4).</p>\n\n<p>Next, create \"mt\" package for our project.</p>\n\n<p><strong>jwsdk-config/packages/mt.json</strong></p>\n\n<pre><code>{\n    \"requires\": [\n        \"thirdparty/reset.css\",\n        \"thirdparty/jquery/jquery-1.9.0.js|auto\",\n        \"thirdparty/jwidget/jwlib.js|auto\",\n        \"thirdparty/jwidget/jwui.js|auto\"\n    ],\n    \"resources\": [\n        \"mt/mt.js\",\n        \"mt/application/application.js\",\n        \"mt/application/application.css\",\n        \"mt/data/data.js\",\n        \"mt/data/profile.js\",\n        \"mt/data/tweet.js\",\n        \"mt/profilebox/profilebox.js\",\n        \"mt/profilebox/profilebox.css\",\n        \"mt/tweetfeed/tweetfeed.js\",\n        \"mt/tweetfeed/tweetfeed.css\",\n        \"mt/tweetview/tweetview.js\",\n        \"mt/tweetview/tweetview.css\",\n        \"boot.js\"\n    ]\n}\n</code></pre>\n\n<p>Create \"index\" page.</p>\n\n<p><strong>jwsdk-config/pages/index.json</strong></p>\n\n<pre><code>{\n    \"package\"  : \"mt\",\n    \"template\" : \"base\",\n    \"title\"    : \"Mini-Twitter\"\n}\n</code></pre>\n\n<p>Also we want to make sure that our project will work on <a href=\"http://pages.github.com/\">GitHub Pages</a>, but they don't\nsupport \".htaccess\" file. So let's transform global project configuration a little bit, to make sure that out\noutput HTML files will be generated in document root and all URLs will be relative.\nChange next options in jwsdk-config/config.json file:</p>\n\n<pre><code>    \"pagesUrl\"      : \"\",\n    \"urlPrefix\"     : \"\",\n</code></pre>\n\n<p>And delete public/.htaccess file.</p>\n\n<p>Compile project using \"debug\" script in project root.</p>\n\n<p><p><img src=\"guides/ensample6/debug.png\" alt=\"\" width=\"677\" height=\"343\"></p></p>\n\n<p>Open public/index.html and see that its content has been changed.</p>\n\n<p><strong>public/index.html</strong></p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"en\"&gt;\n    &lt;head&gt;\n        &lt;meta charset=\"utf-8\" /&gt;\n        &lt;meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /&gt;\n        &lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" /&gt;\n\n\n\n        &lt;title&gt;Mini-Twitter&lt;/title&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"thirdparty/reset.css?timestamp=1379314418\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/application/application.css?timestamp=1379409267\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/profilebox/profilebox.css?timestamp=1379409410\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/tweetfeed/tweetfeed.css?timestamp=1379402158\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/tweetview/tweetview.css?timestamp=1379401729\" /&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jquery/jquery-1.9.0.js?timestamp=1379314418\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwlib.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwui.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/mt.js?timestamp=1379314418\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/application/application.js?timestamp=1379414626\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/data.js?timestamp=1379424016\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/profile.js?timestamp=1379414626\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/tweet.js?timestamp=1379417140\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/profilebox/profilebox.js?timestamp=1379424016\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/tweetfeed/tweetfeed.js?timestamp=1379424016\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/tweetview/tweetview.js?timestamp=1379424018\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"boot.js?timestamp=1379414626\"&gt;&lt;/script&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n\n    &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>Run application in browser and you'll see that it works as before.</p>\n\n<p><p><img src=\"guides/ensample6/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>Now, the rule is simple: <strong>it is recommended to re-compile the project after each code or project configuration\nmodification.</strong> At least, to update timestamps of modified files to make sure that they won't be taken from\nbrowser cache. Other reasons why you must re-compile project before run, will be described later. Now, just\nkeep this rule in your mind, and you'll get used to have an opened console with \"debug\" command in history ready to go.</p>\n\n<p>jWidget SDK not just makes project development easy and fun: you'll be able to minify your code easily,\nadd dynamic script loading and perform other improvements/optimizations. For whoever is interested, you can\ntry to compile the project via \"release\" script:</p>\n\n<p><p><img src=\"guides/ensample6/release.png\" alt=\"\" width=\"677\" height=\"343\"></p></p>\n\n<p>Release compilation is performed quite longer, but it optimizes project loading drastically. Open an output\n\"index.html\" and you'll see that:</p>\n\n<p><strong>public/index.html</strong></p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"en\"&gt;\n    &lt;head&gt;\n        &lt;meta charset=\"utf-8\" /&gt;\n        &lt;meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /&gt;\n        &lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" /&gt;\n\n\n        &lt;!-- Insert production meta tags here --&gt;\n\n\n        &lt;title&gt;Mini-Twitter&lt;/title&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"thirdparty/reset.css?timestamp=1379314418\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"build/packages/mt.min.css?timestamp=1379490399\" /&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jquery/jquery-1.9.0.min.js?timestamp=1379314418\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwlib.min.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwui.min.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"build/packages/mt.min.js?timestamp=1379490400\"&gt;&lt;/script&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n\n        &lt;!-- Insert external services here --&gt;\n\n    &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>As you can see, \"mt\" package is merged into 2 minified files: mt.min.css and mt.min.js. Use release compilation\nbefore project push to production. If you'll run the application in browser, you'll see that it works as before.</p>\n\n<p><p><img src=\"guides/ensample6/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>Let's start our refactoring. First, let's extract HTML templates into separate files. We have <a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a> code\nblocks into each of next files:</p>\n\n<pre><code>public/\n    mt/\n        application/application.js\n        profilebox/profilebox.js\n        tweetfeed/tweetfeed.js\n        tweetview/tweetview.js\n</code></pre>\n\n<p>Just move HTML of these templates into separate files with jw.html extension.</p>\n\n<p><strong>public/mt/application/application.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-application\"&gt;\n    &lt;div jwid=\"wrap\"&gt;\n        &lt;div jwid=\"profile-box\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"tweets\"&gt;&lt;/div&gt;\n        &lt;div class=\"clear\"&gt;&lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p><strong>public/mt/profilebox/profilebox.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-profile-box\"&gt;\n    &lt;a jwid=\"top\" class=\"blocklink\" href=\"#\" target=\"_blank\"&gt;\n        &lt;div jwid=\"avatar\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"full-name\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"show-profile\"&gt;Show my profile&lt;/div&gt;\n        &lt;div class=\"clear\"&gt;&lt;/div&gt;\n    &lt;/a&gt;\n    &lt;div jwid=\"middle\"&gt;\n        &lt;a jwid=\"tweets\" class=\"blocklink mt-profile-box-count\" href=\"#\" target=\"_blank\"&gt;\n            &lt;div jwid=\"tweets-value\" class=\"mt-profile-box-count-value\"&gt;&lt;/div&gt;\n            &lt;div class=\"mt-profile-box-count-label\"&gt;TWEETS&lt;/div&gt;\n        &lt;/a&gt;\n        &lt;a jwid=\"following\" class=\"blocklink mt-profile-box-count mt-profile-box-count-border\" href=\"https://twitter.com/following\" target=\"_blank\"&gt;\n            &lt;div jwid=\"following-value\" class=\"mt-profile-box-count-value\"&gt;&lt;/div&gt;\n            &lt;div class=\"mt-profile-box-count-label\"&gt;FOLLOWING&lt;/div&gt;\n        &lt;/a&gt;\n        &lt;a jwid=\"followers\" class=\"blocklink mt-profile-box-count mt-profile-box-count-border\" href=\"https://twitter.com/followers\" target=\"_blank\"&gt;\n            &lt;div jwid=\"followers-value\" class=\"mt-profile-box-count-value\"&gt;&lt;/div&gt;\n            &lt;div class=\"mt-profile-box-count-label\"&gt;FOLLOWERS&lt;/div&gt;\n        &lt;/a&gt;\n        &lt;div class=\"clear\"&gt;&lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div jwid=\"bottom\"&gt;\n        &lt;form jwid=\"compose-form\"&gt;\n            &lt;div jwid=\"compose-fields\"&gt;\n                &lt;textarea jwid=\"compose-input\" type=\"text\" placeholder=\"Compose tweet...\"&gt;&lt;/textarea&gt;\n            &lt;/div&gt;\n            &lt;div jwid=\"compose-buttons\"&gt;\n                &lt;input jwid=\"compose-submit\" type=\"submit\" value=\"Tweet\"&gt;\n            &lt;/div&gt;\n        &lt;/form&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p><strong>public/mt/tweetfeed/tweetfeed.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-tweet-feed\"&gt;\n    &lt;div jwid=\"header\"&gt;Tweets&lt;/div&gt;\n    &lt;div jwid=\"tweets\"&gt;&lt;/div&gt;\n    &lt;div jwid=\"footer\"&gt;...&lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p><strong>public/mt/tweetview/tweetview.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-tweet\"&gt;\n    &lt;div jwid=\"avatar\"&gt;&lt;/div&gt;\n    &lt;div jwid=\"content\"&gt;\n        &lt;div jwid=\"header\"&gt;\n            &lt;div jwid=\"full-name\"&gt;&lt;/div&gt;\n            &lt;div jwid=\"short-name\"&gt;&lt;/div&gt;\n            &lt;div jwid=\"time\"&gt;&lt;/div&gt;\n            &lt;div class=\"clear\"&gt;&lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div jwid=\"text\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"buttons\"&gt;\n            &lt;a jwid=\"like\" class=\"mt-tweet-button\" href=\"#\"&gt;&lt;/a&gt;\n            &lt;a jwid=\"retweet\" class=\"mt-tweet-button\" href=\"#\"&gt;&lt;/a&gt;\n            &lt;a jwid=\"remove\" class=\"mt-tweet-button\" href=\"#\"&gt;Remove&lt;/a&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=\"clear\"&gt;&lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p>Next, remove all <a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a> calls from source js files.</p>\n\n<p>Add new files into jwsdk-config/packages/mt.json package configuration and bind them to corresponding\n<a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a> subclasses:</p>\n\n<pre><code>        // ...\n        \"mt/application/application.js\",\n        \"mt/application/application.jw.html : mt.Application\",\n        // ...\n        \"mt/profilebox/profilebox.js\",\n        \"mt/profilebox/profilebox.jw.html : mt.ProfileBox\",\n        // ...\n        \"mt/tweetfeed/tweetfeed.js\",\n        \"mt/tweetfeed/tweetfeed.jw.html : mt.TweetFeed\",\n        // ...\n        \"mt/tweetview/tweetview.js\",\n        \"mt/tweetview/tweetview.jw.html : mt.TweetView\",\n        // ...\n</code></pre>\n\n<p>Compile project with \"debug\" script and open it in browser. You'll see that it works as before.</p>\n\n<p><p><img src=\"guides/ensample6/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>What is the purpose of doing so? The answer is: it is convenient. We've unbound HTML from code. Now, you don't need\nto write infinite apostrophes/quotes around template rows and concatenate them. Also, HTML is highlighted very well\nin text editors. Compare:</p>\n\n<p><p><img src=\"guides/ensample6/editor.png\" alt=\"\" width=\"415\" height=\"128\"></p> <p><img src=\"guides/ensample6/editor-2.png\" alt=\"\" width=\"505\" height=\"178\"></p></p>\n\n<p>If you wonder how it works, open index.html and see by yourself.</p>\n\n<p>At next step, we'll introduce <a href=\"http://learnboost.github.io/stylus/\">Stylus</a> CSS-preprocessor to our project to\nmake CSS development easier. Setup <a href=\"http://nodejs.org/\">NodeJS</a> by instruction on the site and Stylus via\nNodeJS Package Manager:</p>\n\n<pre><code>npm install -g stylus\n</code></pre>\n\n<p>Let's create files with utility styles and constants of Stylus right away.</p>\n\n<p><strong>public/thirdparty/imports.styl</strong></p>\n\n<pre><code>vendor(prop, args)\n    -webkit-{prop} args\n    -moz-{prop} args\n    {prop} args\n\nborder-radius()\n    vendor('border-radius', arguments)\n\nbox-shadow()\n    vendor('box-shadow', arguments)\n\nxy(x, y)\n    left x\n    top y\n\nsize(w, h)\n    width w\n    height h\n\nlocation(x, y, w, h)\n    xy x y\n    size w h\n</code></pre>\n\n<p><strong>public/mt/imports.styl</strong></p>\n\n<pre><code>@import 'thirdparty/imports.styl'\n\nmt-sans-serif = Arial,sans-serif\nmt-hover-color = #0084B4\nmt-grid-border = 1px solid #E8E8E8\n\nmt-bold()\n    color #333\n    font-family mt-sans-serif\n    font-size 14px\n    font-weight bold\n    text-shadow 0 1px 0 white\n\nmt-light()\n    color #999\n    font-family mt-sans-serif\n    font-size 11px\n    text-shadow 0 1px 0 white\n\nmt-border()\n    border 1px solid rgba(0, 0, 0, 45%)\n    border-radius 6px\n</code></pre>\n\n<p>Now, let's re-write styles of all components to Stylus. Beauty will save the project! Look, how useful can be\nour CSS-class naming standard in this situation.</p>\n\n<p><strong>public/mt/application/application.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-html\n.mt-body\n    background #C0DEED\n\n.mt-application\n    font-family mt-sans-serif\n\n    &amp;-wrap\n        background rgba(100%, 100%, 100%, 50%)\n        margin 0 auto\n        padding 15px\n        width 868px\n\n    &amp;-profile-box\n        float left\n        width 302px\n\n    &amp;-tweets\n        float left\n        margin-left 13px\n</code></pre>\n\n<p><strong>public/mt/profilebox/profilebox.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-profile-box\n    grid-border = 1px solid #e8e8e8\n\n    mt-border()\n    background #f9f9f9\n\n    &amp;-top\n        border-bottom grid-border\n        padding 12px\n        padding-bottom 2px\n\n    &amp;-avatar\n        background transparent none no-repeat 0 0\n        border-radius 3px\n        float left\n        margin 0 10px 10px 0\n        size 32px 32px\n\n    &amp;-full-name\n        mt-bold()\n        padding-top 2px\n\n        .mt-profile-box-top:hover &amp;\n            color mt-hover-color\n            text-decoration underline\n\n    &amp;-show-profile\n        mt-light()\n\n    &amp;-count\n        float left\n        padding 7px 12px\n\n        &amp;-value\n            mt-bold()\n\n            .mt-profile-box-count:hover &amp;\n                color mt-hover-color\n\n        &amp;-label\n            mt-light()\n\n            .mt-profile-box-count:hover &amp;\n                color mt-hover-color\n\n        &amp;-border\n            border-left grid-border\n\n    &amp;-bottom\n        background #f5f5f5\n        border-radius 0 0 6px 6px\n        border-top grid-border\n        padding 10px 12px\n\n    &amp;-compose-input\n        border 1px solid #ccc\n        border-radius 3px\n        padding 8px\n        width 274px\n\n    &amp;-compose-buttons\n        text-align right\n\n    &amp;-compose-submit\n        mt-bold()\n        background #19AADF\n        border 1px solid #057ED0\n        border-radius 4px\n        color white\n        cursor pointer\n        padding 6px 10px\n        text-shadow 0 -1px 0 rgba(0, 0, 0, 45%)\n\n        &amp;:hover\n            background #09A0D7\n</code></pre>\n\n<p><strong>public/mt/tweetfeed/tweetfeed.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-tweet-feed\n    mt-border()\n    background white\n    width 522px\n\n    &amp;-header\n        mt-bold()\n        font-size 18px\n        padding 10px\n\n    &amp;-footer\n        border-top mt-grid-border\n        padding 8px\n        text-align center\n</code></pre>\n\n<p><strong>public/mt/tweetview/tweetview.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-tweet\n    background white\n    border-top mt-grid-border\n    font-size 14px\n    padding 12px\n\n    &amp;:hover\n        background #f5f5f5\n\n    &amp;-avatar\n        background transparent none no-repeat 0 0\n        border-radius 5px\n        float left\n        margin-right 10px\n        size 48px 48px\n\n    &amp;-content\n        float left\n        width 438px\n\n    &amp;-full-name\n        mt-bold()\n        float left\n        margin-right 4px\n\n    &amp;-short-name\n        mt-light()\n        float left\n\n    &amp;-time\n        mt-light()\n        float right\n\n    &amp;-text\n        padding 5px 0\n\n    &amp;-buttons\n        text-align right\n\n    &amp;-button\n        color #0084B4\n        cursor pointer\n        display inline-block\n\n    &amp;-like\n    &amp;-retweet\n        margin-right 10px\n\n    &amp;-like.active\n        color #FF9B00\n\n    &amp;-retweet.active\n        color #609928\n</code></pre>\n\n<p>Now let's remove source CSS-files and change jwsdk-config/packages/mt.json package configuration:</p>\n\n<pre><code>        // ...\n        \"mt/application/application.jw.html : mt.Application\",\n        \"mt/application/application.styl\",\n        // ...\n        \"mt/profilebox/profilebox.jw.html : mt.ProfileBox\",\n        \"mt/profilebox/profilebox.styl\",\n        // ...\n        \"mt/tweetfeed/tweetfeed.jw.html : mt.TweetFeed\",\n        \"mt/tweetfeed/tweetfeed.styl\",\n        // ...\n        \"mt/tweetview/tweetview.jw.html : mt.TweetView\",\n        \"mt/tweetview/tweetview.styl\",\n        // ...\n</code></pre>\n\n<p>Compile project and make sure that it works as before.</p>\n\n<p><p><img src=\"guides/ensample6/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>At last step, let's extract testing JSON data into separate JSON file.</p>\n\n<p><strong>public/data.json</strong></p>\n\n<pre><code>{\n    \"profile\": {\n        \"fullName\": \"Road Runner\",\n        \"shortName\": \"roadrunner\",\n        \"avatarUrl32\": \"backend/avatar-32.png\",\n        \"avatarUrl48\": \"backend/avatar-48.png\",\n        \"tweets\": 380,\n        \"following\": 21,\n        \"followers\": 27\n    },\n    \"tweets\": [\n        {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"jWidget documentation is here &lt;a href=\\\"https:\\/\\/enepomnyaschih.github.com/jwidget\\\" target=\\\"_blank\\\"&gt;enepomnyaschih.github.com/jwidget&lt;/a&gt;\",\n            \"timeAgo\": 215000,\n            \"like\": false,\n            \"retweet\": true\n        }, {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"Tweet feed is growing\",\n            \"timeAgo\": 515000,\n            \"like\": false,\n            \"retweet\": false\n        }\n    ]\n}\n</code></pre>\n\n<p><strong>public/boot.js</strong></p>\n\n<pre><code>var data;\nvar application;\n\n$(function() {\n    data = mt.Data.createByJson(dataJson);\n    application = new mt.Application(data);\n    application.renderTo(\"body\");\n});\n</code></pre>\n\n<p>Add next line into jwsdk-config/packages/mt.json package configuration:</p>\n\n<pre><code>        // ...\n        \"data.json : dataJson\",\n        \"boot.js\"\n    ]\n}\n</code></pre>\n\n<p>Compile project and make sure that it works as before.</p>\n\n<p><p><img src=\"guides/ensample6/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>We've got a project, developed by all jWidget standards. Now you have all skills neccessary to develop fully-capable\nModel-View applications based on jWidget.</p>\n\n<p>I hope that this guide was a bit useful for you. I'm happy if you'll select jWidget as a framework for your\nnext project. Please, send all remarks and offers to me by\nemail <a href=\"mailto:enepomnyaschih@gmail.com\">enepomnyaschih@gmail.com</a>.</p>\n","title":"Part 6. Project infrastructure"});