# Часть 6. Инфраструктура проекта

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt/0.8-6/](http://enepomnyaschih.github.io/mt/0.8-6/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-0.8-6](https://github.com/enepomnyaschih/mt/tree/mt-0.8-6) (ветка)

Этот пример является продолжением предыдущей части.

В этой части мы улучшим инфраструктуру нашего проекта: вынесем HTML-шаблоны в отдельные HTML-файлы с
помощью [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru) и научимся использовать CSS-препроцессор
[Stylus](http://learnboost.github.io/stylus/), чтобы сделать верстку более удобной и приятной.

Начнем с того, что
[установим jWidget SDK по инструкции](https://github.com/enepomnyaschih/jwsdk/wiki/Установка-jWidget-SDK) (шаги 1-4).

Далее, создадим пакет mt для нашего проекта.

**jwsdk-config/packages/mt.json**

    {
        "requires": [
            "thirdparty/reset.css",
            "thirdparty/jquery/jquery-1.9.0.js|auto",
            "thirdparty/jwidget/jwlib.js|auto",
            "thirdparty/jwidget/jwui.js|auto"
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

Создадим страницу index.

**jwsdk-config/pages/index.json**

    {
        "package"  : "mt",
        "template" : "base",
        "title"    : "Mini-Twitter"
    }

Еще мне хочется, чтобы проект работал на [GitHub Pages](http://pages.github.com/), а они не поддерживают .htaccess.
Поэтому немного подшаманим глобальную конфигурацию проекта, чтобы страница index компилировалась прямо в корень
проекта и все пути в ней были относительными. Изменим следующие опции в файле jwsdk-config/config.json:

        "pagesUrl"      : "",
        "urlPrefix"     : "",

И удалим файл public/.htaccess.

Откомпилируем проект запуском скрипта debug в корне проекта.

{@img debug.png}

Откроем файл public/index.html и увидим, что его содержимое изменилось.

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
            <script type="text/javascript" charset="utf-8" src="thirdparty/jquery/jquery-1.9.0.js?timestamp=1379314418"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwlib.js?timestamp=1379402641"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwui.js?timestamp=1379402641"></script>
            <script type="text/javascript" charset="utf-8" src="mt/mt.js?timestamp=1379314418"></script>
            <script type="text/javascript" charset="utf-8" src="mt/application/application.js?timestamp=1379414626"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/data.js?timestamp=1379424016"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/profile.js?timestamp=1379414626"></script>
            <script type="text/javascript" charset="utf-8" src="mt/data/tweet.js?timestamp=1379417140"></script>
            <script type="text/javascript" charset="utf-8" src="mt/profilebox/profilebox.js?timestamp=1379424016"></script>
            <script type="text/javascript" charset="utf-8" src="mt/tweetfeed/tweetfeed.js?timestamp=1379424016"></script>
            <script type="text/javascript" charset="utf-8" src="mt/tweetview/tweetview.js?timestamp=1379424018"></script>
            <script type="text/javascript" charset="utf-8" src="boot.js?timestamp=1379414626"></script>
        </head>
        <body>
            
        </body>
    </html>

Запустите приложение в браузере и обнаружите, что работа приложения не изменилась.

{@img application.png}

Теперь правило простое: **после каждого изменения кода или конфигурации проекта рекомендуется перекомпилировать
проект.** Хотя бы для того, чтобы обновлялись timestamp'ы измененных файлов и перезатирался их кэш в браузере.
Другие причины, зачем нужна постоянная пересборка, будут описаны позже. Сейчас просто возьмите это за правило,
и очень скоро привыкнете держать наготове консоль с открытой папкой проекта и командой debug в истории.

jWidget SDK не просто сделал разработку проекта простой и приятной: с его помощью мы теперь можем легко минимизировать
код, добавить динамическую загрузку скриптов и выполнить прочие улучшения/оптимизации. Кому интересно, можете
попробовать откомпилировать проект скриптом release:

{@img release.png}

Релизная компиляция выполняется немного дольше, зато она значительно оптимизирует загрузку проекта. Откройте полученный
файл index.html и убедитесь в этом:

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
            <script type="text/javascript" charset="utf-8" src="thirdparty/jquery/jquery-1.9.0.min.js?timestamp=1379314418"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwlib.min.js?timestamp=1379402641"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwui.min.js?timestamp=1379402641"></script>
            <script type="text/javascript" charset="utf-8" src="build/packages/mt.min.js?timestamp=1379490400"></script>
        </head>
        <body>
            
            <!-- Insert external services here -->
            
        </body>
    </html>

Как видите, наш пакет mt утрамбован в два минимизированных файла: mt.min.css и mt.min.js. Используйте релизную
сборку перед выкатыванием проекта в продакшен. Если вы запустите приложение в браузере, вы сможете убедиться в том,
что все работает так, как и прежде.

{@img application.png}

Начнем наш рефакторинг. Для начала вынесем HTML-шаблоны в отдельные файлы. У нас есть блоки JW.UI.template в каждом
из следующих файлов:

    public/
        mt/
            application/application.js
            profilebox/profilebox.js
            tweetfeed/tweetfeed.js
            tweetview/tweetview.js

Просто перенесем HTML этих шаблонов в отдельные файлы с расширением jw.html.

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
            <a jwid="tweets" class="blocklink mt-profile-box-count" href="#" target="_blank">
                <div jwid="tweets-value" class="mt-profile-box-count-value"></div>
                <div class="mt-profile-box-count-label">TWEETS</div>
            </a>
            <a jwid="following" class="blocklink mt-profile-box-count mt-profile-box-count-border" href="https://twitter.com/following" target="_blank">
                <div jwid="following-value" class="mt-profile-box-count-value"></div>
                <div class="mt-profile-box-count-label">FOLLOWING</div>
            </a>
            <a jwid="followers" class="blocklink mt-profile-box-count mt-profile-box-count-border" href="https://twitter.com/followers" target="_blank">
                <div jwid="followers-value" class="mt-profile-box-count-value"></div>
                <div class="mt-profile-box-count-label">FOLLOWERS</div>
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
                <a jwid="like" class="mt-tweet-button" href="#"></a>
                <a jwid="retweet" class="mt-tweet-button" href="#"></a>
                <a jwid="remove" class="mt-tweet-button" href="#">Remove</a>
            </div>
        </div>
        <div class="clear"></div>
    </div>

Далее, удалим все вызовы JW.UI.template из исходных js-файлов.

Добавим новые файлы в конфигурацию пакета jwsdk-config/packages/mt.json, привязав их к классам наших
визуальных компонентов:

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

Соберем проект скриптом debug и откроем в браузере. С удовлетворением обнаружим, что все работает так, как и прежде.

{@img application.png}

Зачем мы это сделали? Затем, что это удобнее. Мы отвязали HTML от кода. Теперь не надо писать вечные
апострофы/кавычки вокруг строчек шаблона и соединять их плюсами. Еще, в текстовом редакторе работает подсветка HTML.
Сравните:

{@img editor.png} {@img editor-2.png}

Кому интересно, как это работает, откройте index.html и посмотрите сами.

Следующим шагом мы прикрутим CSS-препроцессор [Stylus](http://learnboost.github.io/stylus/) к нашему проекту,
чтобы проще было писать CSS. Установите [NodeJS](http://nodejs.org/) по инструкции на сайте и Stylus через
NodeJS Package Manager:

    npm install -g stylus

Давайте сразу создадим файлы с утилитарными стилями и константами Stylus.

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

Теперь перепишем стили всех компонентов на Stylus. Красота спасет проект! Посмотрите, какую пользу дает наш
стандарт именования CSS-классов.

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

Теперь смело удаляем исходные CSS-файлы и меняем конфигурацию пакета jwsdk-config/packages/mt.json:

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

Снова собираем проект скриптом debug и убеждаемся в том, что функциональность не изменилась.

{@img application.png}

Последним шагом мы вынесем тестовые JSON-данные в отдельный JSON-файл.

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

Добавим следующую строку в конфигурацию пакета jwsdk-config/packages/mt.json:

            // ...
            "data.json : dataJson",
            "boot.js"
        ]
    }

Запустим скрипт debug и убедимся в том, что все работает так же.

{@img application.png}

Мы получили проект, написанный по всем стандартам jWidget. Теперь вы владеете всеми навыками, необходимыми для
разработки полноценных Model-View приложений на базе jWidget.

Надеюсь, что это руководство оказалось для вас хотя бы чуточку полезным. Я счастлив, если вы выберете
jWidget в качестве фреймворка для вашего следующего проекта. Пожалуйста, присылайте все замечания и
предложения мне на почту [enepomnyaschih@gmail.com](mailto:enepomnyaschih@gmail.com).
