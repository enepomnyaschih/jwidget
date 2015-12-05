# Часть 1. Модель и представление

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt/1.4-1/](http://enepomnyaschih.github.io/mt/1.4-1/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-1.4-1](https://github.com/enepomnyaschih/mt/tree/mt-1.4-1) (ветка)

Серия примеров jWidget покажет, как разработать свой собственный Twitter за несколько шагов с помощью jWidget.
Если вы хотите научиться разрабатывать мощные Model-View-приложения на jWidget, просим вас проделать все те же
самые шаги в строгом соответствии, не отклоняясь в сторону. Если мотивация какого-либо действия вам непонятна, то,
возможно, мы объясним ее на следующих шагах, но, в любом случае, не стоит сейчас делать что-либо по-своему.

В этом примере мы впервые познакомимся с моделью и представлением, напишем простой визуальный компонент,
который берет данные из модели для своего отображения.

Для начала скачаем [jQuery](http://jquery.com), два модуля
[jWidget](guides/endownload/jwidget.zip) и
[файл сброса стилей](https://raw.github.com/enepomnyaschih/mt1/master/public/thirdparty/reset.css).
Поместим их в папку thirdparty. Весь публичный контент, включая thirdparty, будем помещать в папку public.

Создадим папку public/mt (Mini-Twitter) и договоримся, что все файлы проекта будем помещать туда. Соответственно, заведем
пространство имен.

**public/mt/mt.js**

    var mt = {};

Добавим файлы с аватаром профиля
[public/backend/avatar-32.png](https://raw.github.com/enepomnyaschih/mt/master/public/backend/avatar-32.png) и
[public/backend/avatar-48.png](https://raw.github.com/enepomnyaschih/mt/master/public/backend/avatar-48.png).

Получится примерно такая структура файлов/папок:

    public/
        backend/
            avatar-32.png
            avatar-48.png
        mt/
            mt.js
        thirdparty/
            jquery/
                jquery-1.9.0.js
                jquery-1.9.0.min.js
            jwidget/
                jwlib.js
                jwlib.min.js
                jwui.js
                jwui.min.js
            reset.css

Создадим файл public/index.html со следующим содержимым:

**public/index.html**

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=9" />
            <title>Mini-Twitter</title>
            <link rel="stylesheet" type="text/css" href="thirdparty/reset.css" />
            <script type="text/javascript" charset="utf-8" src="thirdparty/jquery/jquery-1.9.0.js"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwlib.js"></script>
            <script type="text/javascript" charset="utf-8" src="thirdparty/jwidget/jwui.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/mt.js"></script>
        </head>
        <body>
            <div id="container" style="width: 302px;"></div>
        </body>
    </html>

Каркас проекта завершен, начнем разработку.

Наша задача - разработать компонент для отображения твита:

{@img tweet-view.png}

Определим, где здесь данные, т.е. то, что может быть различным для разных твитов:

{@img tweet-view-comments.png}

Заведем классы, которые хранят все эти данные. Заведем пространство имен mt.data для всех классов модели.

**public/mt/data/data.js**

    mt.data = {};

Теперь определим класс mt.data.Tweet, который будет моделью твита.

**public/mt/data/tweet.js**

    mt.data.Tweet = function(config) {
        mt.data.Tweet.{@link JW.Class#static-property-_super _super}.call(this);
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

Для чего мы копируем каждое поле в конструкторе по отдельности? Почему мы просто не напишем

    JW.apply(this, config);

Дело в том, что таким образом мы явно даем интерпретатору информацию о том, какие поля есть в данном классе,
что позволяет ему эффективно оптимизировать работу с этим классом (низкоуровневая оптимизация).

Разработка модели завершена. Перейдем к представлению. Определим компонент для твита.

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component);

Далее, компоненту необходимо задать HTML-шаблон. Это делается следующим образом.

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

Это самый обычный HTML, единственной особенностью которого является наличие специальных атрибутов jwclass и jwid.
jwclass - это корневой CSS-класс компонента, а также префикс для всех элементов, для которых задан jwid.
CSS-класс каждого элемента, для которого вы определите jwid, будет равен `<jwclass>-<jwid>`. Так,
приведенный выше шаблон раскроется в следующий фрагмент HTML:

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

Наличие общего префикса `mt-tweet-` у всех элементов компонента значительно упрощает верстку этого
компонента с использованием таких CSS-препроцессоров,
как [Sass](http://sass-lang.com/), [LESS](http://lesscss.org/) и [Stylus](http://learnboost.github.io/stylus/),
но подробнее об этом в следующих разделах.

Настало время впервые запустить наше приложение. Для приложения нужны тестовые данные и точка входа.
Определим их в файле boot.js.

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
        tweetView.{@link JW.UI.Component#renderTo renderTo}("#container");
    });

Как вы видите, мы сделали глобальные точки доступа к модели (tweetData) и представлению (tweetView). Это делать
не обязательно, но это сильно упрощает отладку, если что-то пойдет не так.

Добавим все созданные файлы в index.html:

**public/index.html**

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=9" />
            <title>Mini-Twitter</title>
            <link rel="stylesheet" type="text/css" href="thirdparty/reset.css" />
            <script type="text/javascript" charset="utf-8" src="thirdparty/jquery/jquery-1.9.0.js"></script>
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

И запустим приложение в браузере. Мы увидим нечто такое:

{@img result-1.png}

Как видите, структура компонента уже прослеживается, но не видно данных.
Нужно привязать данные к элементам компонента. Библиотека jWidget
не дает для этого никакого магического HTML-синтаксиса. Шаблон остается таким, как прежде, меняется лишь код.
Что реально дает нам jWidget, так это прямой и быстрый доступ к [jQuery-оберткам](http://api.jquery.com) над
HTML-элементами, для которых мы определили атрибут jwid. Этот доступ предоставляется в
методе {@link JW.UI.Component#afterRender} через метод {@link JW.UI.Component#getElement}:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        // override
        {@link JW.UI.Component#afterRender afterRender}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.UI.Component#getElement getElement}("avatar").css("background-image", "url(" + this.tweetData.avatarUrl48 + ")");
            var timeAgo = new Date().getTime() - this.tweetData.time;
            var text = this._getTimeString(timeAgo);
            this.{@link JW.UI.Component#getElement getElement}("time").text(text);
            this.{@link JW.UI.Component#getElement getElement}("full-name").text(this.tweetData.fullName);
            this.{@link JW.UI.Component#getElement getElement}("short-name").text("@" + this.tweetData.shortName);
            this.{@link JW.UI.Component#getElement getElement}("text").html(this.tweetData.contentHtml);
            this.{@link JW.UI.Component#getElement getElement}("like").toggleClass("active", this.tweetData.like).
                text(this.tweetData.like ? "Unlike" : "Like");
            this.{@link JW.UI.Component#getElement getElement}("retweet").toggleClass("active", this.tweetData.retweet).
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
    
    // ... здесь шаблон

Получим:

{@img result-2.png}

В целом, работает, но выглядит ужасно. Покажем чудеса верстки.

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

Добавим CSS-файл в index.html:

    <link rel="stylesheet" type="text/css" href="mt/tweetview/tweetview.css" />

В результате запуска приложения мы увидим то, что мы и хотели увидеть:

{@img tweet-view.png}

Рассмотрим еще кое-что. Попробуем оформить код компонента по-другому. Вместо того, чтобы обращаться к элементам
шаблона через метод {@link JW.UI.Component#getElement getElement}, давайте просто объявим методы `render<ChildId>`, где
`<ChildId>` - это "jwid" элемента, записанный в CamelCase с большой буквы:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
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
    
    // ... здесь шаблон

Этот код эквивалентен предыдущему. Количество строк увеличилось в 4 раза, но зато увеличилась и его читаемость.
Каждый отдельный элемент рендерится через свой отдельный метод.
Можете использовать тот или иной вариант, на ваш вкус. Лично я
предпочитаю использовать второй вариант. Он более гибкий: при наследовании компонента можно легко переопределить
рендеринг того или иного элемента простой перегрузкой соответствующего метода.
