Ext.data.JsonP.rusample1({"guide":"<h1 id='rusample1-section-%D0%A7%D0%B0%D1%81%D1%82%D1%8C-1.-%D0%9C%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C-%D0%B8-%D0%BF%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5'>Часть 1. Модель и представление</h1>\n\n<p>Демонстрация доступна по адресу\n<a href=\"http://enepomnyaschih.github.io/mt/1/\">http://enepomnyaschih.github.io/mt/1/</a></p>\n\n<p>Исходный код <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-1\">https://github.com/enepomnyaschih/mt/tree/mt-1</a> (ветка)</p>\n\n<p>Серия примеров jWidget покажет, как разработать свой собственный Twitter за несколько шагов с помощью jWidget.\nЕсли вы хотите научиться разрабатывать мощные Model-View-приложения на jWidget, просим вас проделать все те же\nсамые шаги в строгом соответствии, не отклоняясь в сторону. Если мотивация какого-либо действия вам непонятна, то,\nвозможно, мы объясним ее на следующих шагах, но, в любом случае, не стоит сейчас делать что-либо по-своему.</p>\n\n<p>В этом примере мы впервые познакомимся с моделью и представлением, напишем простой визуальный компонент,\nкоторый берет данные из модели для своего отображения.</p>\n\n<p>Для начала скачаем <a href=\"http://jquery.com\">jQuery</a>, два модуля\n<a href=\"guides/endownload/jwidget.zip\">jWidget</a> и\n<a href=\"https://raw.github.com/enepomnyaschih/mt1/master/public/thirdparty/reset.css\">файл сброса стилей</a>.\nПоместим их в папку thirdparty. Весь публичный контент, включая thirdparty, будем помещать в папку public.</p>\n\n<p>Создадим папку public/mt (Mini-Twitter) и договоримся, что все файлы проекта будем помещать туда. Соответственно, заведем\nпространство имен.</p>\n\n<p><strong>public/mt/mt.js</strong></p>\n\n<pre><code>var mt = {};\n</code></pre>\n\n<p>Добавим файлы с аватаром профиля\n<a href=\"https://raw.github.com/enepomnyaschih/mt/master/public/backend/avatar-32.png\">public/backend/avatar-32.png</a> и\n<a href=\"https://raw.github.com/enepomnyaschih/mt/master/public/backend/avatar-48.png\">public/backend/avatar-48.png</a>.</p>\n\n<p>Получится примерно такая структура файлов/папок:</p>\n\n<pre><code>public/\n    backend/\n        avatar-32.png\n        avatar-48.png\n    mt/\n        mt.js\n    thirdparty/\n        jquery/\n            jquery-1.9.0.js\n            jquery-1.9.0.min.js\n        jwidget/\n            jwlib.js\n            jwlib.min.js\n            jwui.js\n            jwui.min.js\n        reset.css\n</code></pre>\n\n<p>Создадим файл public/index.html со следующим содержимым:</p>\n\n<p><strong>public/index.html</strong></p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"en\"&gt;\n    &lt;head&gt;\n        &lt;meta charset=\"utf-8\" /&gt;\n        &lt;meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /&gt;\n        &lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" /&gt;\n        &lt;title&gt;Mini-Twitter&lt;/title&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"thirdparty/reset.css\" /&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jquery/jquery-1.9.0.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwlib.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwui.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/mt.js\"&gt;&lt;/script&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n        &lt;div id=\"container\" style=\"width: 302px;\"&gt;&lt;/div&gt;\n    &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>Каркас проекта завершен, начнем разработку.</p>\n\n<p>Наша задача - разработать компонент для отображения твита:</p>\n\n<p><p><img src=\"guides/rusample1/tweet-view.png\" alt=\"\" width=\"521\" height=\"80\"></p></p>\n\n<p>Определим, где здесь данные, т.е. то, что может быть различным для разных твитов:</p>\n\n<p><p><img src=\"guides/rusample1/tweet-view-comments.png\" alt=\"\" width=\"1023\" height=\"248\"></p></p>\n\n<p>Заведем классы, которые хранят все эти данные. Заведем пространство имен mt.data для всех классов модели.</p>\n\n<p><strong>public/mt/data/data.js</strong></p>\n\n<pre><code>mt.data = {};\n</code></pre>\n\n<p>Теперь определим класс mt.data.Tweet, который будет моделью твита.</p>\n\n<p><strong>public/mt/data/tweet.js</strong></p>\n\n<pre><code>mt.data.Tweet = function(config) {\n    mt.data.Tweet.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.fullName = config.fullName;\n    this.shortName = config.shortName;\n    this.avatarUrl48 = config.avatarUrl48;\n    this.contentHtml = config.contentHtml;\n    this.time = config.time;\n    this.like = config.like;\n    this.retweet = config.retweet;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.data.Tweet, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>, {\n    /*\n    string fullName;\n    string shortName;\n    string contentHtml;\n    string avatarUrl48;\n    number time;\n    boolean like;\n    boolean retweet;\n    */\n});\n\nmt.data.Tweet.createByJson = function(json) {\n    return new mt.data.Tweet(<a href=\"#!/api/JW-static-method-apply\" rel=\"JW-static-method-apply\" class=\"docClass\">JW.apply</a>({}, json, {\n        time: new Date().getTime() - json.timeAgo\n    }));\n};\n</code></pre>\n\n<p>Для чего мы копируем каждое поле в конструкторе по отдельности? Почему мы просто не напишем</p>\n\n<pre><code><a href=\"#!/api/JW-static-method-apply\" rel=\"JW-static-method-apply\" class=\"docClass\">JW.apply</a>(this, config);\n</code></pre>\n\n<p>Дело в том, что таким образом мы явно даем интерпретатору информацию о том, какие поля есть в данном классе,\nчто позволяет ему эффективно оптимизировать работу с этим классом (низкоуровневая оптимизация).</p>\n\n<p>Разработка модели завершена. Перейдем к представлению. Определим компонент для твита.</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>mt.TweetView = function(tweetData) {\n    mt.TweetView.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweetData = tweetData;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.TweetView, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.data.Tweet tweetData;\n    */\n});\n</code></pre>\n\n<p>Далее, компоненту необходимо задать HTML-шаблон. Это делается следующим образом.</p>\n\n<pre><code><a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a>(mt.TweetView, {\n    main:\n        '&lt;div jwclass=\"mt-tweet\"&gt;' +\n            '&lt;div jwid=\"avatar\"&gt;&lt;/div&gt;' +\n            '&lt;div jwid=\"content\"&gt;' +\n                '&lt;div jwid=\"header\"&gt;' +\n                    '&lt;div jwid=\"full-name\"&gt;&lt;/div&gt;' +\n                    '&lt;div jwid=\"short-name\"&gt;&lt;/div&gt;' +\n                    '&lt;div jwid=\"time\"&gt;&lt;/div&gt;' +\n                    '&lt;div class=\"clear\"&gt;&lt;/div&gt;' +\n                '&lt;/div&gt;' +\n                '&lt;div jwid=\"text\"&gt;&lt;/div&gt;' +\n                '&lt;div jwid=\"buttons\"&gt;' +\n                    '&lt;a jwid=\"like\" class=\"mt-tweet-button\" href=\"#\"&gt;&lt;/a&gt;' +\n                    '&lt;a jwid=\"retweet\" class=\"mt-tweet-button\" href=\"#\"&gt;&lt;/a&gt;' +\n                    '&lt;a jwid=\"remove\" class=\"mt-tweet-button\" href=\"#\"&gt;Remove&lt;/a&gt;' +\n                '&lt;/div&gt;' +\n            '&lt;/div&gt;' +\n            '&lt;div class=\"clear\"&gt;&lt;/div&gt;' +\n        '&lt;/div&gt;'\n});\n</code></pre>\n\n<p>Это самый обычный HTML, единственной особенностью которого является наличие специальных атрибутов jwclass и jwid.\njwclass - это корневой CSS-класс компонента, а также префикс для всех элементов, для которых задан jwid.\nCSS-класс каждого элемента, для которого вы определите jwid, будет равен <code>&lt;jwclass&gt;-&lt;jwid&gt;</code>. Так,\nприведенный выше шаблон раскроется в следующий фрагмент HTML:</p>\n\n<pre><code>&lt;div class=\"mt-tweet\"&gt;\n    &lt;div class=\"mt-tweet-avatar\"&gt;&lt;/div&gt;\n    &lt;div class=\"mt-tweet-content\"&gt;\n        &lt;div class=\"mt-tweet-header\"&gt;\n            &lt;div class=\"mt-tweet-full-name\"&gt;&lt;/div&gt;\n            &lt;div class=\"mt-tweet-short-name\"&gt;&lt;/div&gt;\n            &lt;div class=\"mt-tweet-time\"&gt;&lt;/div&gt;\n            &lt;div class=\"clear\"&gt;&lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=\"mt-tweet-text\"&gt;&lt;/div&gt;\n        &lt;div class=\"mt-tweet-buttons\"&gt;\n            &lt;a class=\"mt-tweet-button mt-tweet-like\" href=\"#\"&gt;&lt;/a&gt;\n            &lt;a class=\"mt-tweet-button mt-tweet-retweet\" href=\"#\"&gt;&lt;/a&gt;\n            &lt;a class=\"mt-tweet-button mt-tweet-remove\" href=\"#\"&gt;Remove&lt;/a&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=\"clear\"&gt;&lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p>Наличие общего префикса <code>mt-tweet-</code> у всех элементов компонента значительно упрощает верстку этого\nкомпонента с использованием таких CSS-препроцессоров, как <a href=\"http://lesscss.org/\">LESS</a> и\n<a href=\"http://learnboost.github.io/stylus/\">Stylus</a> (только не Sass - он не поддерживает нотацию <code>&amp;-suffix</code>),\nно подробнее об этом в следующих разделах.</p>\n\n<p>Настало время впервые запустить наше приложение. Для приложения нужны тестовые данные и точка входа.\nОпределим их в файле boot.js.</p>\n\n<p><strong>public/boot.js</strong></p>\n\n<pre><code>var tweetData;\nvar tweetView;\n\n$(function() {\n    tweetData = mt.data.Tweet.createByJson({\n        \"fullName\": \"Road Runner\",\n        \"shortName\": \"roadrunner\",\n        \"avatarUrl48\": \"backend/avatar-48.png\",\n        \"contentHtml\": \"jWidget documentation is here &lt;a href=\\\"https://enepomnyaschih.github.com/jwidget\\\" \" +\n            \"target=\\\"_blank\\\"&gt;enepomnyaschih.github.com/jwidget&lt;/a&gt;\",\n        \"timeAgo\": 215000,\n        \"like\": false,\n        \"retweet\": true\n    });\n    tweetView = new mt.TweetView(tweetData);\n    tweetView.<a href=\"#!/api/JW.UI.Component-method-renderTo\" rel=\"JW.UI.Component-method-renderTo\" class=\"docClass\">renderTo</a>(\"#container\");\n});\n</code></pre>\n\n<p>Как вы видите, мы сделали глобальные точки доступа к модели (tweetData) и представлению (tweetView). Это делать\nне обязательно, но это сильно упрощает отладку, если что-то пойдет не так.</p>\n\n<p>Добавим все созданные файлы в index.html:</p>\n\n<p><strong>public/index.html</strong></p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"en\"&gt;\n    &lt;head&gt;\n        &lt;meta charset=\"utf-8\" /&gt;\n        &lt;meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /&gt;\n        &lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" /&gt;\n        &lt;title&gt;Mini-Twitter&lt;/title&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"thirdparty/reset.css\" /&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jquery/jquery-1.9.0.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwlib.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwui.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/mt.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/data.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/profile.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/tweetview/tweetview.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"boot.js\"&gt;&lt;/script&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n        &lt;div id=\"container\" style=\"width: 302px;\"&gt;&lt;/div&gt;\n    &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>И запустим приложение в браузере. Мы увидим нечто такое:</p>\n\n<p><p><img src=\"guides/rusample1/result-1.png\" alt=\"\" width=\"538\" height=\"466\"></p></p>\n\n<p>Как видите, структура компонента уже прослеживается, но не видно данных.\nНужно привязать данные к элементам компонента. Библиотека jWidget\nне дает для этого никакого магического HTML-синтаксиса. Шаблон остается таким, как прежде, меняется лишь код.\nЧто реально дает нам jWidget, так это прямой и быстрый доступ к <a href=\"http://api.jquery.com\">jQuery-оберткам</a> над\nHTML-элементами, для которых мы определили атрибут jwid. Этот доступ предоставляется в\nметоде <a href=\"#!/api/JW.UI.Component-method-renderComponent\" rel=\"JW.UI.Component-method-renderComponent\" class=\"docClass\">JW.UI.Component.renderComponent</a> через метод <a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">JW.UI.Component.getElement</a>:</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>mt.TweetView = function(tweetData) {\n    mt.TweetView.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweetData = tweetData;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.TweetView, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.data.Tweet tweetData;\n    */\n\n    // override\n    <a href=\"#!/api/JW.UI.Component-method-renderComponent\" rel=\"JW.UI.Component-method-renderComponent\" class=\"docClass\">renderComponent</a>: function() {\n        this.<a href=\"#!/api/JW.Class-method-_super\" rel=\"JW.Class-method-_super\" class=\"docClass\">_super</a>();\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"avatar\").css(\"background-image\", \"url(\" + this.tweetData.avatarUrl48 + \")\");\n        var timeAgo = new Date().getTime() - this.tweetData.time;\n        var text = this._getTimeString(timeAgo);\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"time\").text(text);\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"full-name\").text(this.tweetData.fullName);\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"short-name\").text(\"@\" + this.tweetData.shortName);\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"text\").html(this.tweetData.contentHtml);\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"like\").toggleClass(\"active\", this.tweetData.like).\n            text(this.tweetData.like ? \"Unlike\" : \"Like\");\n        this.<a href=\"#!/api/JW.UI.Component-method-getElement\" rel=\"JW.UI.Component-method-getElement\" class=\"docClass\">getElement</a>(\"retweet\").toggleClass(\"active\", this.tweetData.retweet).\n            text(this.tweetData.retweet ? \"Unretweet\" : \"Retweet\");\n    },\n\n    _getTimeString: function(timeAgo) {\n        var minutes = timeAgo / 60000;\n        if (minutes &lt; 1) {\n            return \"Just now\";\n        }\n        if (minutes &lt; 60) {\n            return Math.floor(minutes) + \"m\";\n        }\n        var hours = minutes / 60;\n        if (hours &lt; 24) {\n            return Math.round(hours) + \"h\";\n        }\n\n        function pad(value) {\n            return (value &lt; 10) ? (\"0\" + value) : String(value);\n        }\n\n        var date = new Date(new Date().getTime() - timeAgo);\n        return date.getDate() + \".\" + pad(date.getMonth());\n    }\n});\n\n// ... здесь шаблон\n</code></pre>\n\n<p>Получим:</p>\n\n<p><p><img src=\"guides/rusample1/result-2.png\" alt=\"\" width=\"222\" height=\"122\"></p></p>\n\n<p>В целом, работает, но выглядит ужасно. Покажем чудеса верстки.</p>\n\n<p><strong>public/mt/tweetview/tweetview.css</strong></p>\n\n<pre><code>.mt-tweet-full-name {\n  color: #333;\n  font-family: Arial, sans-serif;\n  font-size: 14px;\n  font-weight: bold;\n  text-shadow: 0 1px 0 #fff;\n}\n.mt-tweet-short-name,\n.mt-tweet-time {\n  color: #999;\n  font-family: Arial, sans-serif;\n  font-size: 11px;\n  text-shadow: 0 1px 0 #fff;\n}\n.mt-tweet {\n  background: #fff;\n  border-top: 1px solid #e8e8e8;\n  font-family: Arial,sans-serif;\n  font-size: 14px;\n  padding: 12px;\n  width: 520px;\n}\n.mt-tweet:hover {\n  background: #f5f5f5;\n}\n.mt-tweet-avatar {\n  background: transparent none no-repeat 0 0;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n  float: left;\n  margin-right: 10px;\n  width: 48px;\n  height: 48px;\n}\n.mt-tweet-content {\n  float: left;\n  width: 438px;\n}\n.mt-tweet-full-name {\n  float: left;\n  margin-right: 4px;\n}\n.mt-tweet-short-name {\n  float: left;\n}\n.mt-tweet-time {\n  float: right;\n}\n.mt-tweet-text {\n  padding: 5px 0;\n}\n.mt-tweet-buttons {\n  text-align: right;\n}\n.mt-tweet-button {\n  color: #0084b4;\n  cursor: pointer;\n  display: inline-block;\n}\n.mt-tweet-like,\n.mt-tweet-retweet {\n  margin-right: 10px;\n}\n.mt-tweet-like.active {\n  color: #ff9b00;\n}\n.mt-tweet-retweet.active {\n  color: #609928;\n}\n</code></pre>\n\n<p>Добавим CSS-файл в index.html:</p>\n\n<pre><code>&lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/tweetview/tweetview.css\" /&gt;\n</code></pre>\n\n<p>В результате запуска приложения мы увидим то, что мы и хотели увидеть:</p>\n\n<p><p><img src=\"guides/rusample1/tweet-view.png\" alt=\"\" width=\"521\" height=\"80\"></p></p>\n\n<p>Рассмотрим еще кое-что. Попробуем оформить код компонента по-другому:</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>mt.TweetView = function(tweetData) {\n    mt.TweetView.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.tweetData = tweetData;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.TweetView, <a href=\"#!/api/JW.UI.Component\" rel=\"JW.UI.Component\" class=\"docClass\">JW.UI.Component</a>, {\n    /*\n    mt.data.Tweet tweetData;\n    */\n\n    renderAvatar: function(el) {\n        el.css(\"background-image\", \"url(\" + this.tweetData.avatarUrl48 + \")\");\n    },\n\n    renderTime: function(el) {\n        var timeAgo = new Date().getTime() - this.tweetData.time;\n        var text = this._getTimeString(timeAgo);\n        el.text(text);\n    },\n\n    renderFullName: function(el) {\n        el.text(this.tweetData.fullName);\n    },\n\n    renderShortName: function(el) {\n        el.text(\"@\" + this.tweetData.shortName);\n    },\n\n    renderText: function(el) {\n        el.html(this.tweetData.contentHtml);\n    },\n\n    renderLike: function(el) {\n        el.toggleClass(\"active\", this.tweetData.like).text(this.tweetData.like ? \"Unlike\" : \"Like\");\n    },\n\n    renderRetweet: function(el) {\n        el.toggleClass(\"active\", this.tweetData.retweet).text(this.tweetData.retweet ? \"Unretweet\" : \"Retweet\");\n    },\n\n    _getTimeString: function(timeAgo) {\n        var minutes = timeAgo / 60000;\n        if (minutes &lt; 1) {\n            return \"Just now\";\n        }\n        if (minutes &lt; 60) {\n            return Math.floor(minutes) + \"m\";\n        }\n        var hours = minutes / 60;\n        if (hours &lt; 24) {\n            return Math.round(hours) + \"h\";\n        }\n\n        function pad(value) {\n            return (value &lt; 10) ? (\"0\" + value) : String(value);\n        }\n\n        var date = new Date(new Date().getTime() - timeAgo);\n        return date.getDate() + \".\" + pad(date.getMonth());\n    }\n});\n\n// ... здесь шаблон\n</code></pre>\n\n<p>Этот код эквивалентен предыдущему. Количество строк увеличилось в 4 раза, но зато увеличилась и его читаемость.\nКаждый отдельный элемент рендерится через свой отдельный метод <code>render&lt;ChildId&gt;</code>, где <code>&lt;ChildId&gt;</code> равен jwid,\nзаписанному в CamelCase. Можете использовать тот или иной вариант, на ваш вкус. Лично я, автор библиотеки,\nпредпочитаю использовать второй вариант. Он более гибкий: при наследовании компонента можно легко переопределить\nрендеринг того или иного элемента простой перегрузкой соответствующего метода.</p>\n","title":"Часть 1. Модель и представление"});