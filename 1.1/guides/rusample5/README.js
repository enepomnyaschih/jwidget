Ext.data.JsonP.rusample5({"guide":"<h1 id='rusample5-section-%D0%A7%D0%B0%D1%81%D1%82%D1%8C-5.-%D0%A1%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0'>Часть 5. Свойства</h1>\n\n<p>Демонстрация доступна по адресу\n<a href=\"http://enepomnyaschih.github.io/mt/1.0.0-5/\">http://enepomnyaschih.github.io/mt/1.0.0-5/</a></p>\n\n<p>Исходный код <a href=\"https://github.com/enepomnyaschih/mt/tree/mt-1.0.0-5\">https://github.com/enepomnyaschih/mt/tree/mt-1.0.0-5</a> (Git branch)</p>\n\n<p>Пришло время познакомиться с еще одним слоем jWidget: свойствами, которые предоставляются нам классом <a href=\"#!/guide/rujwproperty\">JW.Property</a>.\nСвойство - это любое значение, которое может оповещать клиенты о своем изменении. Таким образом, <a href=\"#!/guide/rujwproperty\">JW.Property</a> - это\nкласс с 2 методами: <a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>, <a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a> - и событием\n<a href=\"#!/api/JW.Property-event-changeEvent\" rel=\"JW.Property-event-changeEvent\" class=\"docClass\">changeEvent</a>. Всякий раз, когда вы меняете значение свойства вызовом метода\n<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>, выбрасывается событие <a href=\"#!/api/JW.Property-event-changeEvent\" rel=\"JW.Property-event-changeEvent\" class=\"docClass\">changeEvent</a>. Событие не\nвыбрасывается, если в результате вызова метода <a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a> значение свойства не поменялось.</p>\n\n<p>Итак, в нашем примере с Мини-Твиттером, мы можем упростить реализацию поведения Like/Unlike и Retweet/Unretweet\nпутем введения 2 булевых свойств: like и retweet.</p>\n\n<p>Начнем с модели. Нам нужно заменить простые булевые поля свойствами, и удалить соответствующие события и методы\nизменения их значений:</p>\n\n<p><strong>public/mt/data/tweet.js</strong></p>\n\n<pre><code>mt.data.Tweet = function(config) {\n    mt.data.Tweet.<a href=\"#!/api/JW.Class-static-property-_super\" rel=\"JW.Class-static-property-_super\" class=\"docClass\">_super</a>.call(this);\n    this.fullName = config.fullName; // string\n    this.shortName = config.shortName; // string\n    this.avatarUrl48 = config.avatarUrl48; // string\n    this.contentHtml = config.contentHtml; // string\n    this.time = config.time; // number\n    this.like = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(config.like)); // <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>&lt;boolean&gt;\n    this.retweet = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>(config.retweet)); // <a href=\"#!/api/JW.Property\" rel=\"JW.Property\" class=\"docClass\">JW.Property</a>&lt;boolean&gt;\n};\n\n<a href=\"#!/api/JW-static-method-extend\" rel=\"JW-static-method-extend\" class=\"docClass\">JW.extend</a>(mt.data.Tweet, <a href=\"#!/api/JW.Class\" rel=\"JW.Class\" class=\"docClass\">JW.Class</a>);\n\nmt.data.Tweet.createByJson = function(json) {\n    return new mt.data.Tweet(<a href=\"#!/api/JW-static-method-apply\" rel=\"JW-static-method-apply\" class=\"docClass\">JW.apply</a>({}, json, {\n        time: new Date().getTime() - json.timeAgo\n    }));\n};\n</code></pre>\n\n<p>Мы избавились от весомого куска кода. Давайте перейдем к представлению, и посмотрим, что можно сделать там.\nВместо того, чтобы прослушивать событие изменения свойства вручную, давайте воспользуемся специальными классами\nфунктора и апдейтера.</p>\n\n<p><strong>Функтор</strong> строит новое свойство на базе существующих. В нашем конкретном случае, мы планируем построить\nстроковые свойства, содержащие значения \"Like/Unlike\" и \"Retweet/Unretweet\".</p>\n\n<p><strong>Апдейтер</strong> прослушивает изменения свойства и обрабатывает их каким-то способом. В нашем случае, мы планируем\nобновлять текст внутри кнопок и менять набор их CSS классов.</p>\n\n<p><strong>public/mt/tweetview/tweetview.js</strong></p>\n\n<pre><code>    renderLike: function(el) {\n        var text = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a>([this.tweetData.like], function(like) {\n            return like ? \"Unlike\" : \"Like\";\n        }, this)).<a href=\"#!/api/JW.Functor-property-target\" rel=\"JW.Functor-property-target\" class=\"docClass\">target</a>;\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>(el, text));\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a>(el, \"active\", this.tweetData.like));\n        el.click(this._onLikeClick);\n    },\n\n    renderRetweet: function(el) {\n        var text = this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.Functor\" rel=\"JW.Functor\" class=\"docClass\">JW.Functor</a>([this.tweetData.retweet], function(retweet) {\n            return retweet ? \"Unretweet\" : \"Retweet\";\n        }, this)).<a href=\"#!/api/JW.Functor-property-target\" rel=\"JW.Functor-property-target\" class=\"docClass\">target</a>;\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.TextUpdater\" rel=\"JW.UI.TextUpdater\" class=\"docClass\">JW.UI.TextUpdater</a>(el, text));\n        this.<a href=\"#!/api/JW.Class-method-own\" rel=\"JW.Class-method-own\" class=\"docClass\">own</a>(new <a href=\"#!/api/JW.UI.ClassUpdater\" rel=\"JW.UI.ClassUpdater\" class=\"docClass\">JW.UI.ClassUpdater</a>(el, \"active\", this.tweetData.retweet));\n        el.click(this._onRetweetClick);\n    },\n\n    _onLikeClick: function(event) {\n        event.preventDefault();\n        this.tweetData.like.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(!this.tweetData.like.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n    },\n\n    _onRetweetClick: function(event) {\n        event.preventDefault();\n        this.tweetData.retweet.<a href=\"#!/api/JW.Property-method-set\" rel=\"JW.Property-method-set\" class=\"docClass\">set</a>(!this.tweetData.retweet.<a href=\"#!/api/JW.Property-method-get\" rel=\"JW.Property-method-get\" class=\"docClass\">get</a>());\n    },\n</code></pre>\n\n<p>И теперь мы можем удалить методы <code>_updateLike</code> и <code>_updateRetweet</code> - они нам больше не нужны.</p>\n\n<p>С точки зрения синтаксиса, свойства, функторы и апдейтеры очень понятны и просты. Они позволяют вам сделать код\nболее коротким и читаемым. Посмотрите на документацию <a href=\"#!/guide/rujwproperty\">JW.Property</a> для полного списка возможностей.</p>\n","title":"Часть 5. Свойства"});