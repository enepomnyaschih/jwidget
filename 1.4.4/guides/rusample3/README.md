# Часть 3. Именованные дочерние компоненты

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt/1.4-3/](http://enepomnyaschih.github.io/mt/1.4-3/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-1.4-3](https://github.com/enepomnyaschih/mt/tree/mt-1.4-3) (ветка)

В этом примере мы научимся рендерить дочерние компоненты, которые не находятся в массивах.

Примерами таких компонентов могут служить панель профиля пользователя и лента твитов - дочерние компоненты приложения:

{@img application.png}

Для начала реализуем класс mt.Application, который будем корневым представлением
нашего приложения.

**public/mt/application/application.js**

    mt.Application = function(data) {
        mt.Application.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data; // mt.Data
    };
    
    JW.extend(mt.Application, JW.UI.Component, {
        renderTweets: function() {
            return this.{@link JW.Class#own own}(new mt.TweetFeed(this.data));
        },
        
        // override
        {@link JW.UI.Component#afterRender afterRender}: function() {
            this.{@link JW.Class#method-_super _super}();
            $("html").addClass("mt-html");
            $("body").addClass("mt-body");
        }
    });
    
    JW.UI.template(mt.Application, {
        main:
            '<div jwclass="mt-application">' +
                '<div jwid="wrap">' +
                    '<div jwid="profile-box"></div>' +
                    '<div jwid="tweets"></div>' +
                    '<div class="clear"></div>' +
                '</div>' +
            '</div>'
    });

И вновь мы встретили метод `render<ChildId>` (renderTweets), и вновь он делает что-то новое. На этот раз он
конструирует и возвращает экземпляр класса mt.TweetFeed.
Это означает, что новый компонент mt.TweetFeed будет отрендерен на место элемента с jwid="tweets".
Этот элемент будет полностью замещен компонентом, а все его CSS-классы (здесь: mt-application-tweets) будут
скопированы в корневой элемент компонента.

Теперь рассмотрим некоторые вариации этой возможности.

**Во-первых**, важно понимать, что после конструирования
экземпляра mt.TweetFeed этот компонент еще не отрендерен. Это значит, что у него нет HTML-элемента и возможности
добавлять дочерние компоненты. Компонент будет отрендерен автоматически лишь где-то внутри фреймворка. Но если
вам все же нужно проделать какие-то дополнительные действия с отрендеренным компонентом (например, добавить
CSS-класс), можно сделать это явно с помощью метода {@link JW.UI.Component#render render}:

        renderTweets: function(el) {
            var tweetFeed = this.{@link JW.Class#own own}(new mt.TweetFeed(this.data));
            tweetFeed.{@link JW.UI.Component#render render}();
            tweetFeed.{@link JW.UI.Component#el el}.addClass("my-extra-class");
            return tweetFeed;
        },

**Во-вторых**, как и в предыдущих частях, мы должны найти способ добавлять дочерние компоненты, не привязываясь к
методу `render<ChildId>`. Делается это с помощью оповещающего словаря {@link JW.UI.Component#children children}:

        // override
        {@link JW.UI.Component#afterRender afterRender}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.UI.Component#children children}.{@link JW.AbstractMap#set set}(this.{@link JW.Class#own own}(new mt.TweetFeed(this.data)), "tweets");
        },

Выбирайте тот способ, какой вам больше нравится.

Добавим CSS.

**public/mt/application/application.css**

    .mt-html,
    .mt-body {
      background: #c0deed;
    }
    .mt-application {
      font-family: Arial, sans-serif;
    }
    .mt-application-wrap {
      background: rgba(255,255,255,0.5);
      margin: 0 auto;
      padding: 15px;
      width: 868px;
    }
    .mt-application-profile-box {
      float: left;
      width: 302px;
    }
    .mt-application-tweets {
      float: left;
      margin-left: 13px;
    }

Обновим index.html:

            <link rel="stylesheet" type="text/css" href="mt/application/application.css" />
            <script type="text/javascript" charset="utf-8" src="mt/application/application.js"></script>

Обновим boot.js:

    var data;
    var application;
    
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
        application = new mt.Application(data);
        application.{@link JW.UI.Component#renderTo renderTo}("body");
    });

В результате запуска приложения мы увидим следующее:

{@img result-1.png}

Осталось реализовать панель профиля.

И вновь начнем с модели. Нам нужны данные о профиле текущего пользователя. Расширим класс mt.Data:

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.profile = null; // mt.data.Profile
        this.tweets = this.{@link JW.Class#own own}(new JW.Array()).{@link JW.AbstractCollection#ownItems ownItems}(); // JW.AbstractArray<mt.data.Tweet>
    };
    
    JW.extend(mt.Data, JW.Class);
    
    mt.Data.createByJson = function(json) {
        var data = new mt.Data();
        data.profile = data.{@link JW.Class#own own}(mt.data.Profile.createByJson(json.profile));
        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json.tweets, mt.data.Tweet.createByJson));
        return data;
    };
    
    mt.data = {};

Теперь реализуем класс mt.data.Profile.

**public/mt/data/profile.js**

    mt.data.Profile = function(config) {
        mt.data.Profile.{@link JW.Class#static-property-_super _super}.call(this);
        this.fullName = config.fullName; // string
        this.shortName = config.shortName; // string
        this.avatarUrl32 = config.avatarUrl32; // string
        this.avatarUrl48 = config.avatarUrl48; // string
        this.tweets = config.tweets; // number
        this.following = config.following; // number
        this.followers = config.followers; // number
    };
    
    JW.extend(mt.data.Profile, JW.Class);
    
    mt.data.Profile.createByJson = function(json) {
        return new mt.data.Profile(json);
    };

Перейдем к представлению. Добавим в mt.Application метод рендеринга панели профиля:

        renderProfileBox: function() {
            return this.{@link JW.Class#own own}(new mt.ProfileBox(this.data));
        },

Реализуем этот компонент.

**public/mt/profilebox/profilebox.js**

    mt.ProfileBox = function(data) {
        mt.ProfileBox.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data; // mt.Data
    };
    
    JW.extend(mt.ProfileBox, JW.UI.Component, {
        renderTop: function(el) {
            el.attr("href", "https://twitter.com/" + this.data.profile.shortName);
        },
        
        renderAvatar: function(el) {
            el.css("background-image", "url(" + this.data.profile.avatarUrl32 + ")");
        },
        
        renderFullName: function(el) {
            el.text(this.data.profile.fullName);
        },
        
        renderTweets: function(el) {
            el.attr("href", "https://twitter.com/" + this.data.profile.shortName);
        },
        
        renderTweetsValue: function(el) {
            el.text(this.data.profile.tweets);
        },
        
        renderFollowingValue: function(el) {
            el.text(this.data.profile.following);
        },
        
        renderFollowersValue: function(el) {
            el.text(this.data.profile.followers);
        }
    });
    
    JW.UI.template(mt.ProfileBox, {
        main:
            '<div jwclass="mt-profile-box">' +
                '<a jwid="top" class="blocklink" href="#" target="_blank">' +
                    '<div jwid="avatar"></div>' +
                    '<div jwid="full-name"></div>' +
                    '<div jwid="show-profile">Show my profile</div>' +
                    '<div class="clear"></div>' +
                '</a>' +
                '<div jwid="middle">' +
                    '<a jwid="count tweets" class="blocklink" href="#" target="_blank">' +
                        '<div jwid="count-value tweets-value"></div>' +
                        '<div jwid="count-label">TWEETS</div>' +
                    '</a>' +
                    '<a jwid="count count-border following" class="blocklink" href="https://twitter.com/following" target="_blank">' +
                        '<div jwid="count-value following-value"></div>' +
                        '<div jwid="count-label">FOLLOWING</div>' +
                    '</a>' +
                    '<a jwid="count count-border followers" class="blocklink" href="https://twitter.com/followers" target="_blank">' +
                        '<div jwid="count-value followers-value"></div>' +
                        '<div jwid="count-label">FOLLOWERS</div>' +
                    '</a>' +
                    '<div class="clear"></div>' +
                '</div>' +
                '<div jwid="bottom">' +
                    '<form jwid="compose-form">' +
                        '<div jwid="compose-fields">' +
                            '<textarea jwid="compose-input" type="text" placeholder="Compose tweet..."></textarea>' +
                        '</div>' +
                        '<div jwid="compose-buttons">' +
                            '<input jwid="compose-submit" type="submit" value="Tweet">' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>'
    });

Сразу добавим CSS:

**public/mt/profilebox/profilebox.css**

    .mt-profile-box-full-name,
    .mt-profile-box-count-value,
    .mt-profile-box-compose-submit {
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
      text-shadow: 0 1px 0 #fff;
    }
    .mt-profile-box-show-profile,
    .mt-profile-box-count-label {
      color: #999;
      font-family: Arial, sans-serif;
      font-size: 11px;
      text-shadow: 0 1px 0 #fff;
    }
    .mt-profile-box {
      border: 1px solid rgba(0,0,0,0.45);
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }
    .mt-profile-box {
      background: #f9f9f9;
    }
    .mt-profile-box-top {
      border-bottom: 1px solid #e8e8e8;
      padding: 12px;
      padding-bottom: 2px;
    }
    .mt-profile-box-avatar {
      background: transparent none no-repeat 0 0;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      float: left;
      margin: 0 10px 10px 0;
      width: 32px;
      height: 32px;
    }
    .mt-profile-box-full-name {
      padding-top: 2px;
    }
    .mt-profile-box-top:hover .mt-profile-box-full-name {
      color: #0084b4;
      text-decoration: underline;
    }
    .mt-profile-box-count {
      float: left;
      padding: 7px 12px;
    }
    .mt-profile-box-count:hover .mt-profile-box-count-value {
      color: #0084b4;
    }
    .mt-profile-box-count:hover .mt-profile-box-count-label {
      color: #0084b4;
    }
    .mt-profile-box-count-border {
      border-left: 1px solid #e8e8e8;
    }
    .mt-profile-box-bottom {
      background: #f5f5f5;
      -webkit-border-radius: 0 0 6px 6px;
      -moz-border-radius: 0 0 6px 6px;
      border-radius: 0 0 6px 6px;
      border-top: 1px solid #e8e8e8;
      padding: 10px 12px;
    }
    .mt-profile-box-compose-input {
      border: 1px solid #ccc;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      padding: 8px;
      width: 274px;
    }
    .mt-profile-box-compose-buttons {
      text-align: right;
    }
    .mt-profile-box-compose-submit {
      background: #19aadf;
      border: 1px solid #057ed0;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      padding: 6px 10px;
      text-shadow: 0 -1px 0 rgba(0,0,0,0.45);
    }
    .mt-profile-box-compose-submit:hover {
      background: #09a0d7;
    }

Обновим index.html:

            <link rel="stylesheet" type="text/css" href="mt/profilebox/profilebox.css" />
            <script type="text/javascript" charset="utf-8" src="mt/profilebox/profilebox.js"></script>

Обновим boot.js:

    var data;
    var application;
    
    $(function() {
        data = mt.Data.createByJson({
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
            ]
        });
        application = new mt.Application(data);
        application.{@link JW.UI.Component#renderTo renderTo}("body");
    });

В результате запуска мы увидим то, что от нас и требовалось:

{@img application.png}

Мы научились рендерить компоненты и добавлять их друг в друга. Настало время добавить в наше приложение немного
динамики. Рассмотрим это в следующей части.
