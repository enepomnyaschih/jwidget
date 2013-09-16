# Пример 1. Модель и представление

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt1/public/](http://enepomnyaschih.github.io/mt1/public/)

Исходный код [https://github.com/enepomnyaschih/mt1](https://github.com/enepomnyaschih/mt1)

Серия примеров jWidget покажет, как разработать свой собственный Twitter за несколько шагов с помощью jWidget.

В этом примере мы впервые познакомимся с моделью и представлением, напишем простой визуальный компонент,
который берет данные из модели для своего отображения.

Для начала скачаем [jQuery](http://jquery.com), два модуля
[jWidget](https://github.com/enepomnyaschih/jwidget/wiki/Скачать-jWidget) и
[файл сброса стилей](https://raw.github.com/enepomnyaschih/mt1/master/public/thirdparty/reset.css).
Поместим их в папку thirdparty. Весь публичный контент, включая thirdparty, будем помещать в папку public.

Создадим папку public/mt (Mini-Twitter) и договоримся, что все файлы проекта будем помещать туда. Соответственно, заведем
пространство имен.

**public/mt/mt.js**

    var mt = {};

Добавим иконку [public/mt/favicon.png](https://raw.github.com/enepomnyaschih/mt1/master/public/mt/favicon.png)
для нашей страницы и файлы с аватаром профиля
[public/backend/avatar-32.png](https://raw.github.com/enepomnyaschih/mt1/master/public/backend/avatar-32.png) и
[public/backend/avatar-48.png](https://raw.github.com/enepomnyaschih/mt1/master/public/backend/avatar-48.png).

Получится примерно такая структура файлов/папок:

    public/
        backend/
            avatar-32.png
            avatar-48.png
        mt/
            favicon.png
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

Наша задача - разработать компонент для отображения информации о профиле пользователя:

{@img profile-box.png}

Определим, где здесь данные, т.е. то, что может быть различным для разных пользователей:

{@img profile-box-comments.png}

Заведем классы, которые хранят все эти данные. Сначала заведем класс mt.Data, который будет олицетворять модель
всего приложения. Сейчас у него будет только одно поле profile, но спустя некоторое время мы добавим еще.

**public/mt/data/data.js**

    // Конструктор
    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.profile = null;
    };
    
    // Наследуем mt.Data от JW.Class
    JW.extend(mt.Data, JW.Class, {
        /*
        Перечисляем все поля:
        mt.data.Profile profile;
        */
    });
    
    // Заводим функцию для десериализации из JSON
    mt.Data.createByJson = function(json) {
        var data = new mt.Data();
        data.profile = mt.data.Profile.createByJson(json.profile);
        return data;
    };

    mt.data = {};

Теперь определим класс mt.data.Profile, который будет моделью профиля пользователя.

**public/mt/data/profile.js**

    mt.data.Profile = function(config) {
        mt.data.Profile.{@link JW.Class#static-property-_super _super}.call(this);
        // Определяем каждое поле в конструкторе явно, чтобы интерпретатор мог оптимизировать
        // выполнение этого кода (низкоуровневая оптимизация)
        this.fullName = config.fullName;
        this.shortName = config.shortName;
        this.avatarUrl32 = config.avatarUrl32;
        this.avatarUrl48 = config.avatarUrl48;
        this.tweets = config.tweets;
        this.following = config.following;
        this.followers = config.followers;
    };
    
    JW.extend(mt.data.Profile, JW.Class, {
        /*
        string fullName;
        string shortName;
        string avatarUrl32;
        string avatarUrl48;
        number tweets;
        number following;
        number followers;
        */
    });
    
    mt.data.Profile.createByJson = function(json) {
        return new mt.data.Profile(json);
    };

Разработка модели завершена. Перейдем к представлению. Определим компонент для профиля пользователя.

**public/mt/profilebox/profilebox.js**

    // Конструктор по модели
    mt.ProfileBox = function(data) {
        mt.ProfileBox.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
    };
    
    JW.extend(mt.ProfileBox, JW.UI.Component, {
        /*
        mt.Data data;
        */
    });

Далее, компоненту необходимо задать HTML-шаблон. Это делается следующим образом.

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
                    '<a jwid="tweets" class="blocklink mt-profile-box-count" href="#" target="_blank">' +
                        '<div jwid="tweets-value" class="mt-profile-box-count-value"></div>' +
                        '<div class="mt-profile-box-count-label">TWEETS</div>' +
                    '</a>' +
                    '<a jwid="following" class="blocklink mt-profile-box-count mt-profile-box-count-border" href="https://twitter.com/following" target="_blank">' +
                        '<div jwid="following-value" class="mt-profile-box-count-value"></div>' +
                        '<div class="mt-profile-box-count-label">FOLLOWING</div>' +
                    '</a>' +
                    '<a jwid="followers" class="blocklink mt-profile-box-count mt-profile-box-count-border" href="https://twitter.com/followers" target="_blank">' +
                        '<div jwid="followers-value" class="mt-profile-box-count-value"></div>' +
                        '<div class="mt-profile-box-count-label">FOLLOWERS</div>' +
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

Это самый обычный HTML, единственной особенностью которого является наличие специальных атрибутов jwclass и jwid.
jwclass - это корневой CSS-класс компонента, а также префикс для всех элементов, для которых задан jwid.
CSS-класс каждого элемента, для которого вы определите jwid, будет равен `<jwclass>-<jwid>`. Так,
приведенный выше шаблон раскроется в следующий фрагмент HTML:

    <div class="mt-profile-box">
        <a class="blocklink mt-profile-box-top" href="#" target="_blank">
            <div class="mt-profile-box-avatar"></div>
            <div class="mt-profile-box-full-name"></div>
            <div class="mt-profile-box-show-profile">Show my profile</div>
            <div class="clear"></div>
        </a>
        <div class="mt-profile-box-middle">
            <a class="blocklink mt-profile-box-count mt-profile-box-tweets" href="#" target="_blank">
                <div class="mt-profile-box-count-value mt-profile-box-tweets-value"></div>
                <div class="mt-profile-box-count-label">TWEETS</div>
            </a>
            <a class="blocklink mt-profile-box-count mt-profile-box-count-border mt-profile-box-following" href="https://twitter.com/following" target="_blank">
                <div class="mt-profile-box-count-value mt-profile-box-following-value"></div>
                <div class="mt-profile-box-count-label">FOLLOWING</div>
            </a>
            <a class="blocklink mt-profile-box-count mt-profile-box-count-border mt-profile-box-followers" href="https://twitter.com/followers" target="_blank">
                <div class="mt-profile-box-count-value mt-profile-box-followers-value"></div>
                <div class="mt-profile-box-count-label">FOLLOWERS</div>
            </a>
            <div class="clear"></div>
        </div>
        <div class="mt-profile-box-bottom">
            <form class="mt-profile-box-compose-form">
                <div class="mt-profile-box-compose-fields">
                    <textarea class="mt-profile-box-compose-input" type="text" placeholder="Compose tweet..."></textarea>
                </div>
                <div class="mt-profile-box-compose-buttons">
                    <input class="mt-profile-box-compose-submit" type="submit" value="Tweet">
                </div>
            </form>
        </div>
    </div>

Наличие общего префикса `mt-profile-box-` у всех элементов компонента значительно упрощает верстку этого
компонента с использованием таких CSS-препроцессоров, как [LESS](http://lesscss.org/) и
[Stylus](http://learnboost.github.io/stylus/) (только не Sass - он не поддерживает нотацию `&-suffix`),
но подробнее об этом в следующих разделах.

Настало время впервые запустить наше приложение. Для приложения нужны тестовые данные и точка входа.
Определим их в файле boot.js.

**public/boot.js**

    var data;
    var profileBox;
    
    $(function() {
        data = mt.Data.createByJson({
            "profile": {
                "fullName": "Egor Nepomnyaschih",
                "shortName": "enepomnyaschih",
                "avatarUrl32": "backend/avatar-32.png",
                "avatarUrl48": "backend/avatar-48.png",
                "tweets": 380,
                "following": 21,
                "followers": 27
            }
        });
        profileBox = new mt.ProfileBox(data);
        profileBox.{@link JW.UI.Component#renderTo renderTo}("#container");
    });

Как вы видите, мы сделали глобальные точки доступа к модели (data) и представлению (profileBox). Это делать
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
            <script type="text/javascript" charset="utf-8" src="mt/data/profile.js"></script>
            <script type="text/javascript" charset="utf-8" src="mt/profilebox/profilebox.js"></script>
            <script type="text/javascript" charset="utf-8" src="boot.js"></script>
        </head>
        <body>
            <div id="container" style="width: 302px;"></div>
        </body>
    </html>

И запустим приложение в браузере. Мы увидим нечто такое:

{@img result-1.png}

Как видите, структура компонента уже прослеживается, но выглядит он просто ужасно. Покажем чудеса верстки.

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
      background: #f9f9f9;
      border: 1px solid rgba(0,0,0,0.45);
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
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

Добавим CSS-файл в index.html:

    <link rel="stylesheet" type="text/css" href="mt/profilebox/profilebox.css" />

Получим:

{@img result-2.png}

Выглядит гораздо лучше, но еще не видно данных. Нужно привязать данные к элементам компонента. Библиотека jWidget
не дает для этого никакого магического HTML-синтаксиса. Шаблон остается таким, как прежде, меняется лишь код.
Что реально дает нам jWidget, так это прямой и быстрый доступ к [jQuery-оберткам](http://api.jquery.com) над
HTML-элементами, для которых мы определили атрибут jwid. Этот доступ предоставляется в
методе {@link JW.UI.Component#renderComponent} через метод {@link JW.UI.Component#getElement}:

**public/mt/profilebox/profilebox.js**

    mt.ProfileBox = function(data) {
        mt.ProfileBox.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
    };
    
    JW.extend(mt.ProfileBox, JW.UI.Component, {
        /*
        mt.Data data;
        */
        
        // override
        {@link JW.UI.Component#renderComponent renderComponent}: function() {
            this.{@link JW.Class#method-_super _super}();
            this.{@link JW.UI.Component#getElement getElement}("top").attr("href", "https://twitter.com/" + this.data.profile.shortName);
            this.{@link JW.UI.Component#getElement getElement}("avatar").css("background-image", "url(" + this.data.profile.avatarUrl32 + ")");
            this.{@link JW.UI.Component#getElement getElement}("full-name").text(this.data.profile.fullName);
            this.{@link JW.UI.Component#getElement getElement}("tweets").attr("href", "https://twitter.com/" + this.data.profile.shortName);
            this.{@link JW.UI.Component#getElement getElement}("tweets-value").text(this.data.profile.tweets);
            this.{@link JW.UI.Component#getElement getElement}("following-value").text(this.data.profile.following);
            this.{@link JW.UI.Component#getElement getElement}("followers-value").text(this.data.profile.followers);
        }
    });
    
    // ... здесь шаблон

В результате запуска приложения мы увидим то, что мы и хотели увидеть:

{@img profile-box.png}

Попробуем оформить тот же самый код по-другому:

**public/mt/profilebox/profilebox.js**

    mt.ProfileBox = function(data) {
        mt.ProfileBox.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
    };
    
    JW.extend(mt.ProfileBox, JW.UI.Component, {
        /*
        mt.Data data;
        */
        
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
    
    // ... здесь шаблон

Этот код эквивалентен предыдущему. Количество строк увеличилось в 4 раза, но зато увеличилась и его читаемость.
Каждый отдельный элемент рендерится через свой отдельный метод `render<ChildId>`, где `<ChildId>` равен jwid,
записанному в CamelCase. Можете использовать тот или иной вариант, на ваш вкус. Лично я, автор библиотеки,
предпочитаю использовать второй вариант. Он более гибкий: при наследовании компонента можно легко переопределить
рендеринг того или иного элемента простой перегрузкой соответствующего метода.
