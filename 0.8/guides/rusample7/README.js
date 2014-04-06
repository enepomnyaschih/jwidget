Ext.data.JsonP.rusample7({"guide":"<h1 id='rusample7-section-%D0%A7%D0%B0%D1%81%D1%82%D1%8C-7.-%D0%98%D0%BD%D1%84%D1%80%D0%B0%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0'>Часть 7. Инфраструктура проекта</h1>\n\n<p>Демонстрация доступна по адресу\n<a href=\"http://enepomnyaschih.github.io/mt/0.8-7/\">http://enepomnyaschih.github.io/mt/0.8-7/</a></p>\n\n<p>Исходный код <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-0.8-7\">https://github.com/enepomnyaschih/mt/tree/mt-0.8-7</a> (ветка)</p>\n\n<p>Этот пример является продолжением предыдущей части.</p>\n\n<p>В этой части мы улучшим инфраструктуру нашего проекта: вынесем HTML-шаблоны в отдельные HTML-файлы с\nпомощью <a href=\"https://github.com/enepomnyaschih/jwsdk/wiki/ru\">jWidget SDK</a> и научимся использовать CSS-препроцессор\n<a href=\"http://learnboost.github.io/stylus/\">Stylus</a>, чтобы сделать верстку более удобной и приятной.</p>\n\n<p>Начнем с того, что\n<a href=\"https://github.com/enepomnyaschih/jwsdk/wiki/%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-jWidget-SDK\">установим jWidget SDK по инструкции</a>.\nИспользуйте шаблон <code>empty_project_html</code> на шаге 4.</p>\n\n<p>Далее, создаем пакет mt для нашего проекта.</p>\n\n<p><strong>jwsdk-config/packages/mt.json</strong></p>\n\n<pre><code>{\n    \"requires\": [\n        \"thirdparty/reset.css\",\n        \"thirdparty/jquery/jquery-1.9.0.js|auto\",\n        \"thirdparty/jwidget/jwlib.js|auto\",\n        \"thirdparty/jwidget/jwui.js|auto\"\n    ],\n    \"resources\": [\n        \"mt/mt.js\",\n        \"mt/application/application.js\",\n        \"mt/application/application.css\",\n        \"mt/data/data.js\",\n        \"mt/data/profile.js\",\n        \"mt/data/tweet.js\",\n        \"mt/profilebox/profilebox.js\",\n        \"mt/profilebox/profilebox.css\",\n        \"mt/tweetfeed/tweetfeed.js\",\n        \"mt/tweetfeed/tweetfeed.css\",\n        \"mt/tweetview/tweetview.js\",\n        \"mt/tweetview/tweetview.css\",\n        \"boot.js\"\n    ]\n}\n</code></pre>\n\n<p>Создаем страницу index.</p>\n\n<p><strong>jwsdk-config/pages/index.json</strong></p>\n\n<pre><code>{\n    \"package\"  : \"mt\",\n    \"template\" : \"base\",\n    \"title\"    : \"Mini-Twitter\"\n}\n</code></pre>\n\n<p>Еще мне хочется, чтобы проект работал на <a href=\"http://pages.github.com/\">GitHub Pages</a>, а они не поддерживают .htaccess.\nПоэтому немного подшаманим глобальную конфигурацию проекта, чтобы страница index компилировалась прямо в корень\nпроекта и все пути в ней были относительными. Изменим следующие опции в файле jwsdk-config/config.json:</p>\n\n<pre><code>    \"pagesUrl\"      : \"\",\n    \"urlPrefix\"     : \"\",\n</code></pre>\n\n<p>И удалим файл public/.htaccess.</p>\n\n<p>Откомпилируем проект из командной строки в корневой папке проекта:</p>\n\n<pre><code>jwsdk debug jwsdk-config\n</code></pre>\n\n<p><p><img src=\"guides/rusample7/debug.png\" alt=\"\" width=\"677\" height=\"343\"></p></p>\n\n<p>Откроем файл public/index.html и увидим, что его содержимое изменилось.</p>\n\n<p><strong>public/index.html</strong></p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"en\"&gt;\n    &lt;head&gt;\n        &lt;meta charset=\"utf-8\" /&gt;\n        &lt;meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /&gt;\n        &lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" /&gt;\n\n        &lt;title&gt;Mini-Twitter&lt;/title&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"thirdparty/reset.css?timestamp=1379314418\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/application/application.css?timestamp=1379409267\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/profilebox/profilebox.css?timestamp=1379409410\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/tweetfeed/tweetfeed.css?timestamp=1379402158\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mt/tweetview/tweetview.css?timestamp=1379401729\" /&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jquery/jquery-1.9.0.js?timestamp=1379314418\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwlib.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwui.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/mt.js?timestamp=1379314418\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/application/application.js?timestamp=1379414626\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/data.js?timestamp=1379424016\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/profile.js?timestamp=1379414626\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/data/tweet.js?timestamp=1379417140\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/profilebox/profilebox.js?timestamp=1379424016\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/tweetfeed/tweetfeed.js?timestamp=1379424016\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"mt/tweetview/tweetview.js?timestamp=1379424018\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"boot.js?timestamp=1379414626\"&gt;&lt;/script&gt;\n    &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>Запустите приложение в браузере и обнаружите, что работа приложения не изменилась.</p>\n\n<p><p><img src=\"guides/rusample7/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>Теперь правило простое: <strong>после каждого изменения кода или конфигурации проекта рекомендуется перекомпилировать\nпроект.</strong> Хотя бы для того, чтобы обновлялись timestamp'ы измененных файлов и перезатирался их кэш в браузере.\nДругие причины, зачем нужна постоянная пересборка, будут описаны позже. Сейчас просто возьмите это за правило,\nи очень скоро привыкнете держать наготове консоль с открытой папкой проекта и командой \"jwsdk debug jwsdk-config\" в\nистории.</p>\n\n<p>jWidget SDK не просто сделал разработку проекта простой и приятной: с его помощью мы теперь можем легко минимизировать\nкод, добавить динамическую загрузку скриптов и выполнить прочие улучшения/оптимизации. Кому интересно, можете\nпопробовать откомпилировать проект командой \"jwsdk release jwsdk-config\":</p>\n\n<p><p><img src=\"guides/rusample7/release.png\" alt=\"\" width=\"677\" height=\"343\"></p></p>\n\n<p>Релизная компиляция выполняется немного дольше, зато она значительно оптимизирует загрузку проекта. Откройте полученный\nфайл index.html и убедитесь в этом:</p>\n\n<p><strong>public/index.html</strong></p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"en\"&gt;\n    &lt;head&gt;\n        &lt;meta charset=\"utf-8\" /&gt;\n        &lt;meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /&gt;\n        &lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" /&gt;\n\n        &lt;!-- Insert production meta tags here --&gt;\n\n        &lt;title&gt;Mini-Twitter&lt;/title&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"thirdparty/reset.css?timestamp=1379314418\" /&gt;\n        &lt;link rel=\"stylesheet\" type=\"text/css\" href=\"build/packages/mt.min.css?timestamp=1379490399\" /&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n\n        &lt;!-- Insert external services here --&gt;\n\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jquery/jquery-1.9.0.min.js?timestamp=1379314418\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwlib.min.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"thirdparty/jwidget/jwui.min.js?timestamp=1379402641\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" charset=\"utf-8\" src=\"build/packages/mt.min.js?timestamp=1379490400\"&gt;&lt;/script&gt;\n    &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>Как видите, наш пакет mt утрамбован в два минимизированных файла: mt.min.css и mt.min.js. Используйте релизную\nсборку перед выкатыванием проекта в продакшен. Если вы запустите приложение в браузере, вы сможете убедиться в том,\nчто все работает так, как и прежде.</p>\n\n<p><p><img src=\"guides/rusample7/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>Начнем наш рефакторинг. Для начала вынесем HTML-шаблоны в отдельные файлы. У нас есть блоки <a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a> в каждом\nиз следующих файлов:</p>\n\n<pre><code>public/\n    mt/\n        application/application.js\n        profilebox/profilebox.js\n        tweetfeed/tweetfeed.js\n        tweetview/tweetview.js\n</code></pre>\n\n<p>Просто перенесем HTML этих шаблонов в отдельные файлы с расширением jw.html.</p>\n\n<p><strong>public/mt/application/application.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-application\"&gt;\n    &lt;div jwid=\"wrap\"&gt;\n        &lt;div jwid=\"profile-box\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"tweets\"&gt;&lt;/div&gt;\n        &lt;div class=\"clear\"&gt;&lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p><strong>public/mt/profilebox/profilebox.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-profile-box\"&gt;\n    &lt;a jwid=\"top\" class=\"blocklink\" href=\"#\" target=\"_blank\"&gt;\n        &lt;div jwid=\"avatar\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"full-name\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"show-profile\"&gt;Show my profile&lt;/div&gt;\n        &lt;div class=\"clear\"&gt;&lt;/div&gt;\n    &lt;/a&gt;\n    &lt;div jwid=\"middle\"&gt;\n        &lt;a jwid=\"count tweets\" class=\"blocklink\" href=\"#\" target=\"_blank\"&gt;\n            &lt;div jwid=\"count-value tweets-value\"&gt;&lt;/div&gt;\n            &lt;div jwid=\"count-label\"&gt;TWEETS&lt;/div&gt;\n        &lt;/a&gt;\n        &lt;a jwid=\"count count-border following\" class=\"blocklink\" href=\"https://twitter.com/following\" target=\"_blank\"&gt;\n            &lt;div jwid=\"count-value following-value\"&gt;&lt;/div&gt;\n            &lt;div jwid=\"count-label\"&gt;FOLLOWING&lt;/div&gt;\n        &lt;/a&gt;\n        &lt;a jwid=\"count count-border followers\" class=\"blocklink\" href=\"https://twitter.com/followers\" target=\"_blank\"&gt;\n            &lt;div jwid=\"count-value followers-value\"&gt;&lt;/div&gt;\n            &lt;div jwid=\"count-label\"&gt;FOLLOWERS&lt;/div&gt;\n        &lt;/a&gt;\n        &lt;div class=\"clear\"&gt;&lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div jwid=\"bottom\"&gt;\n        &lt;form jwid=\"compose-form\"&gt;\n            &lt;div jwid=\"compose-fields\"&gt;\n                &lt;textarea jwid=\"compose-input\" type=\"text\" placeholder=\"Compose tweet...\"&gt;&lt;/textarea&gt;\n            &lt;/div&gt;\n            &lt;div jwid=\"compose-buttons\"&gt;\n                &lt;input jwid=\"compose-submit\" type=\"submit\" value=\"Tweet\"&gt;\n            &lt;/div&gt;\n        &lt;/form&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p><strong>public/mt/tweetfeed/tweetfeed.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-tweet-feed\"&gt;\n    &lt;div jwid=\"header\"&gt;Tweets&lt;/div&gt;\n    &lt;div jwid=\"tweets\"&gt;&lt;/div&gt;\n    &lt;div jwid=\"footer\"&gt;...&lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p><strong>public/mt/tweetview/tweetview.jw.html</strong></p>\n\n<pre><code>&lt;div jwclass=\"mt-tweet\"&gt;\n    &lt;div jwid=\"avatar\"&gt;&lt;/div&gt;\n    &lt;div jwid=\"content\"&gt;\n        &lt;div jwid=\"header\"&gt;\n            &lt;div jwid=\"full-name\"&gt;&lt;/div&gt;\n            &lt;div jwid=\"short-name\"&gt;&lt;/div&gt;\n            &lt;div jwid=\"time\"&gt;&lt;/div&gt;\n            &lt;div class=\"clear\"&gt;&lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div jwid=\"text\"&gt;&lt;/div&gt;\n        &lt;div jwid=\"buttons\"&gt;\n            &lt;a jwid=\"button like\" href=\"#\"&gt;&lt;/a&gt;\n            &lt;a jwid=\"button retweet\" href=\"#\"&gt;&lt;/a&gt;\n            &lt;a jwid=\"button remove\" href=\"#\"&gt;Remove&lt;/a&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=\"clear\"&gt;&lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p>Далее, удалим все вызовы <a href=\"#!/api/JW.UI-static-method-template\" rel=\"JW.UI-static-method-template\" class=\"docClass\">JW.UI.template</a> из исходных js-файлов.</p>\n\n<p>Добавим новые файлы в конфигурацию пакета jwsdk-config/packages/mt.json, привязав их к классам наших\nвизуальных компонентов:</p>\n\n<pre><code>        // ...\n        \"mt/application/application.js\",\n        \"mt/application/application.jw.html : mt.Application\",\n        // ...\n        \"mt/profilebox/profilebox.js\",\n        \"mt/profilebox/profilebox.jw.html : mt.ProfileBox\",\n        // ...\n        \"mt/tweetfeed/tweetfeed.js\",\n        \"mt/tweetfeed/tweetfeed.jw.html : mt.TweetFeed\",\n        // ...\n        \"mt/tweetview/tweetview.js\",\n        \"mt/tweetview/tweetview.jw.html : mt.TweetView\",\n        // ...\n</code></pre>\n\n<p>Соберем проект командой \"jwsdk debug jwsdk-config\" и откроем в браузере. С удовлетворением обнаружим, что все работает так, как и прежде.</p>\n\n<p><p><img src=\"guides/rusample7/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>Зачем мы это сделали? Затем, что это удобнее. Мы отвязали HTML от кода. Теперь не надо писать вечные\nапострофы/кавычки вокруг строчек шаблона и соединять их плюсами. Еще, в текстовом редакторе работает подсветка HTML.\nСравните:</p>\n\n<p><p><img src=\"guides/rusample7/editor.png\" alt=\"\" width=\"415\" height=\"128\"></p> <p><img src=\"guides/rusample7/editor-2.png\" alt=\"\" width=\"505\" height=\"178\"></p></p>\n\n<p>Кому интересно, как это работает, откройте index.html и посмотрите сами.</p>\n\n<p>Следующим шагом мы прикрутим CSS-препроцессор <a href=\"http://learnboost.github.io/stylus/\">Stylus</a> к нашему проекту,\nчтобы проще было писать CSS. Установите <a href=\"http://nodejs.org/\">NodeJS</a> по инструкции на сайте и Stylus через\nNodeJS Package Manager:</p>\n\n<pre><code>npm install -g stylus\n</code></pre>\n\n<p>Давайте сразу создадим файлы с утилитарными стилями и константами Stylus.</p>\n\n<p><strong>public/thirdparty/imports.styl</strong></p>\n\n<pre><code>vendor(prop, args)\n    -webkit-{prop} args\n    -moz-{prop} args\n    {prop} args\n\nborder-radius()\n    vendor('border-radius', arguments)\n\nbox-shadow()\n    vendor('box-shadow', arguments)\n\nxy(x, y)\n    left x\n    top y\n\nsize(w, h)\n    width w\n    height h\n\nlocation(x, y, w, h)\n    xy x y\n    size w h\n</code></pre>\n\n<p><strong>public/mt/imports.styl</strong></p>\n\n<pre><code>@import 'thirdparty/imports.styl'\n\nmt-sans-serif = Arial,sans-serif\nmt-hover-color = #0084B4\nmt-grid-border = 1px solid #E8E8E8\n\nmt-bold()\n    color #333\n    font-family mt-sans-serif\n    font-size 14px\n    font-weight bold\n    text-shadow 0 1px 0 white\n\nmt-light()\n    color #999\n    font-family mt-sans-serif\n    font-size 11px\n    text-shadow 0 1px 0 white\n\nmt-border()\n    border 1px solid rgba(0, 0, 0, 45%)\n    border-radius 6px\n</code></pre>\n\n<p>Теперь перепишем стили всех компонентов на Stylus. Красота спасет проект! Посмотрите, какую пользу дает наш\nстандарт именования CSS-классов.</p>\n\n<p><strong>public/mt/application/application.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-html\n.mt-body\n    background #C0DEED\n\n.mt-application\n    font-family mt-sans-serif\n\n    &amp;-wrap\n        background rgba(100%, 100%, 100%, 50%)\n        margin 0 auto\n        padding 15px\n        width 868px\n\n    &amp;-profile-box\n        float left\n        width 302px\n\n    &amp;-tweets\n        float left\n        margin-left 13px\n</code></pre>\n\n<p><strong>public/mt/profilebox/profilebox.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-profile-box\n    grid-border = 1px solid #e8e8e8\n\n    mt-border()\n    background #f9f9f9\n\n    &amp;-top\n        border-bottom grid-border\n        padding 12px\n        padding-bottom 2px\n\n    &amp;-avatar\n        background transparent none no-repeat 0 0\n        border-radius 3px\n        float left\n        margin 0 10px 10px 0\n        size 32px 32px\n\n    &amp;-full-name\n        mt-bold()\n        padding-top 2px\n\n        .mt-profile-box-top:hover &amp;\n            color mt-hover-color\n            text-decoration underline\n\n    &amp;-show-profile\n        mt-light()\n\n    &amp;-count\n        float left\n        padding 7px 12px\n\n        &amp;-value\n            mt-bold()\n\n            .mt-profile-box-count:hover &amp;\n                color mt-hover-color\n\n        &amp;-label\n            mt-light()\n\n            .mt-profile-box-count:hover &amp;\n                color mt-hover-color\n\n        &amp;-border\n            border-left grid-border\n\n    &amp;-bottom\n        background #f5f5f5\n        border-radius 0 0 6px 6px\n        border-top grid-border\n        padding 10px 12px\n\n    &amp;-compose-input\n        border 1px solid #ccc\n        border-radius 3px\n        padding 8px\n        width 274px\n\n    &amp;-compose-buttons\n        text-align right\n\n    &amp;-compose-submit\n        mt-bold()\n        background #19AADF\n        border 1px solid #057ED0\n        border-radius 4px\n        color white\n        cursor pointer\n        padding 6px 10px\n        text-shadow 0 -1px 0 rgba(0, 0, 0, 45%)\n\n        &amp;:hover\n            background #09A0D7\n</code></pre>\n\n<p><strong>public/mt/tweetfeed/tweetfeed.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-tweet-feed\n    mt-border()\n    background white\n    width 522px\n\n    &amp;-header\n        mt-bold()\n        font-size 18px\n        padding 10px\n\n    &amp;-footer\n        border-top mt-grid-border\n        padding 8px\n        text-align center\n</code></pre>\n\n<p><strong>public/mt/tweetview/tweetview.styl</strong></p>\n\n<pre><code>@import 'mt/imports'\n\n.mt-tweet\n    background white\n    border-top mt-grid-border\n    font-size 14px\n    padding 12px\n\n    &amp;:hover\n        background #f5f5f5\n\n    &amp;-avatar\n        background transparent none no-repeat 0 0\n        border-radius 5px\n        float left\n        margin-right 10px\n        size 48px 48px\n\n    &amp;-content\n        float left\n        width 438px\n\n    &amp;-full-name\n        mt-bold()\n        float left\n        margin-right 4px\n\n    &amp;-short-name\n        mt-light()\n        float left\n\n    &amp;-time\n        mt-light()\n        float right\n\n    &amp;-text\n        padding 5px 0\n\n    &amp;-buttons\n        text-align right\n\n    &amp;-button\n        color #0084B4\n        cursor pointer\n        display inline-block\n\n    &amp;-like\n    &amp;-retweet\n        margin-right 10px\n\n    &amp;-like.active\n        color #FF9B00\n\n    &amp;-retweet.active\n        color #609928\n</code></pre>\n\n<p>Теперь смело удаляем исходные CSS-файлы и меняем конфигурацию пакета jwsdk-config/packages/mt.json:</p>\n\n<pre><code>        // ...\n        \"mt/application/application.jw.html : mt.Application\",\n        \"mt/application/application.styl\",\n        // ...\n        \"mt/profilebox/profilebox.jw.html : mt.ProfileBox\",\n        \"mt/profilebox/profilebox.styl\",\n        // ...\n        \"mt/tweetfeed/tweetfeed.jw.html : mt.TweetFeed\",\n        \"mt/tweetfeed/tweetfeed.styl\",\n        // ...\n        \"mt/tweetview/tweetview.jw.html : mt.TweetView\",\n        \"mt/tweetview/tweetview.styl\",\n        // ...\n</code></pre>\n\n<p>Снова собираем проект и убеждаемся в том, что функциональность не изменилась.</p>\n\n<p><p><img src=\"guides/rusample7/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>Последним шагом мы вынесем тестовые JSON-данные в отдельный JSON-файл.</p>\n\n<p><strong>public/data.json</strong></p>\n\n<pre><code>{\n    \"profile\": {\n        \"fullName\": \"Road Runner\",\n        \"shortName\": \"roadrunner\",\n        \"avatarUrl32\": \"backend/avatar-32.png\",\n        \"avatarUrl48\": \"backend/avatar-48.png\",\n        \"tweets\": 380,\n        \"following\": 21,\n        \"followers\": 27\n    },\n    \"tweets\": [\n        {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"jWidget documentation is here &lt;a href=\\\"https:\\/\\/enepomnyaschih.github.com/jwidget\\\" target=\\\"_blank\\\"&gt;enepomnyaschih.github.com/jwidget&lt;/a&gt;\",\n            \"timeAgo\": 215000,\n            \"like\": false,\n            \"retweet\": true\n        }, {\n            \"fullName\": \"Road Runner\",\n            \"shortName\": \"roadrunner\",\n            \"avatarUrl48\": \"backend/avatar-48.png\",\n            \"contentHtml\": \"Tweet feed is growing\",\n            \"timeAgo\": 515000,\n            \"like\": false,\n            \"retweet\": false\n        }\n    ]\n}\n</code></pre>\n\n<p><strong>public/boot.js</strong></p>\n\n<pre><code>var data;\nvar application;\n\n$(function() {\n    data = mt.Data.createByJson(dataJson);\n    application = new mt.Application(data);\n    application.renderTo(\"body\");\n});\n</code></pre>\n\n<p>Добавим следующую строку в конфигурацию пакета jwsdk-config/packages/mt.json:</p>\n\n<pre><code>        // ...\n        \"data.json : dataJson\",\n        \"boot.js\"\n    ]\n}\n</code></pre>\n\n<p>Соберем проект и убедимся в том, что все работает так же.</p>\n\n<p><p><img src=\"guides/rusample7/application.png\" alt=\"\" width=\"961\" height=\"299\"></p></p>\n\n<p>Мы получили проект, написанный по всем стандартам jWidget. Теперь вы владеете всеми навыками, необходимыми для\nразработки полноценных Model-View приложений на базе jWidget.</p>\n\n<p>Надеюсь, что это руководство оказалось для вас хотя бы чуточку полезным. Я счастлив, если вы выберете\njWidget в качестве фреймворка для вашего следующего проекта. Пожалуйста, присылайте все замечания и\nпредложения мне на почту <a href=\"mailto:enepomnyaschih@gmail.com\">enepomnyaschih@gmail.com</a>.</p>\n","title":"Часть 7. Инфраструктура проекта"});