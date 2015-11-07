# Часть 2. Дочерние компоненты, массивы

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt/1.4-2/](http://enepomnyaschih.github.io/mt/1.4-2/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-1.4-2](https://github.com/enepomnyaschih/mt/tree/mt-1.4-2) (ветка)

Этот пример является продолжением предыдущей части.

В этом примере мы познакомимся с [JW.AbstractArray](#!/guide/rujwabstractcollection), воспользуемся его алгоритмами
{@link JW.AbstractArray#method-map map} и {@link JW.AbstractArray#method-$map $map}
и научимся добавлять списки дочерних компонентов.

Наша задача - отрендерить массив твитов, которые мы реализовали в предыдущей части.

{@img tweet-feed.png}

Как и в первый раз, начнем с модели. Твиты необходимо разместить в массиве. Для этого, определим класс mt.Data,
который будет содержать этот массив.

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweets = new JW.Array(); // JW.AbstractArray<mt.data.Tweet>
    };
    
    JW.extend(mt.Data, JW.Class, {
        // override
        {@link JW.Class#destroyObject destroyObject}: function() {
            this.tweets.{@link JW.AbstractArray#$clear $clear}().{@link JW.AbstractArray#each each}(JW.destroy); // очищаем массив и уничтожаем элементы
            this.tweets.{@link JW.AbstractArray#destroy destroy}(); // уничтожаем массив
            this.{@link JW.Class#method-_super _super}();
        }
    });
    
    mt.Data.createByJson = function(json) {
        var data = new mt.Data();
        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json, mt.data.Tweet.createByJson));
        return data;
    };
    
    mt.data = {};

Как вы видите, массив мы сконструировали как экземпляр JW.Array, но в списке полей объявили как JW.AbstractArray.
Это мы сделали для гибкости. Возможно, в будущем мы заменим реализацию массива на JW.ObservableArray.

Десериализация осуществляется с помощью статического метода {@link JW.Array#static-method-map JW.Array.map}.
Метод принимает нативный массив (Array) в качестве первого аргумента и функцию-коллбек в качестве второго аргумента.
Функция-коллбек mt.data.Tweet.createByJson превращает объект типа Object (JSON) в объект типа mt.data.Tweet,
мы реализовали ее в предыдущей части.

В результате вызова метода {@link JW.Array#static-method-map JW.Array.map} мы получим нативный массив (Array)
объектов типа mt.data.Tweet. Передавая его в метод {@link JW.AbstractArray#addAll addAll} массива data.tweets,
мы заполняем этот массив:

        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json, mt.data.Tweet.createByJson));

Поскольку мы конструируем объект this.tweets в конструкторе mt.Data, мы **обязаны** уничтожить его в деструкторе.
Это часть философии jWidget. Все объекты должен уничтожать тот, кто их создает. Так, если мы уничтожим объект
mt.Data методом destroy, все вложенные объекты также гарантированно будут уничтожены.

        // override
        {@link JW.Class#destroy destroy}: function() {
            this.tweets.{@link JW.AbstractArray#$clear $clear}().{@link JW.AbstractArray#each each}(JW.destroy); // очищаем массив и уничтожаем элементы
            this.tweets.{@link JW.AbstractArray#destroy destroy}(); // уничтожаем массив
            this.{@link JW.Class#method-_super _super}();
        }

Мы можем избавиться от метода "destroy", используя **механизм агрегирования объектов** в jWidget. Если объект A агрегирует
объект B, то объект B будет уничтожен автоматически при уничтожении объекта A. Мы можем агрегировать объект с помощью
метода {@link JW.Class#own}, и мы можем агрегировать элементы массива с помощью метода
{@link JW.AbstractCollection#ownItems}:

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweets = this.{@link JW.Class#own own}(new JW.Array()).{@link JW.AbstractCollection#ownItems ownItems}(); // JW.AbstractArray<mt.data.Tweet>
    };
    
    JW.extend(mt.Data, JW.Class);
    
    mt.Data.createByJson = function(json) {
        var data = new mt.Data();
        data.tweets.{@link JW.AbstractArray#addAll addAll}({@link JW.Array#static-method-map JW.Array.map}(json, mt.data.Tweet.createByJson));
        return data;
    };
    
    mt.data = {};

Теперь перейдем к представлению. Определим класс mt.TweetFeed для представления ленты твитов.

**public/mt/tweetfeed/tweetfeed.js**

    mt.TweetFeed = function(data) {
        mt.TweetFeed.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data; // mt.Data
    };
    
    JW.extend(mt.TweetFeed, JW.UI.Component, {
        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
        }
    });
    
    JW.UI.template(mt.TweetFeed, {
        main:
            '<div jwclass="mt-tweet-feed">' +
                '<div jwid="header">Tweets</div>' +
                '<div jwid="tweets"></div>' +
                '<div jwid="footer">...</div>' +
            '</div>'
    });

Остановимся подробнее на методе renderTweets. По аналогии с компонентом mt.TweetView, мы определили метод
`render<ChildId>` для элемента с jwid="tweets". Но теперь этот метод не просто наполняет элемент данными,
а рендерит внутрь него массив дочерних компонентов.

Этот массив создается из данных с помощью метода конвертирования элементов коллекции
{@link JW.AbstractArray#method-$map $map}. Мы уже рассматривали статический метод
{@link JW.Array#static-method-map JW.Array.map}. Рассмотрим их отличия:

- Во-первых, один из этих методов динамический (instance method), второй - статический (static method). **Все
коллекции jWidget имеют общий набор статических методов для нативных коллекций JavaScript (Array, Object) и
динамических методов для коллекций jWidget ([JW.AbstractArray](#!/guide/rujwabstractarray),
[JW.AbstractMap](#!/guide/rujwabstractmap), [JW.AbstractSet](#!/guide/rujwabstractset)). Статические методы
находятся в классах JW.Array, JW.Map, JW.Set и принимают нативную коллекцию в качестве первого аргумента.**
- Во-вторых, метод {@link JW.Array#static-method-map JW.Array.map} возвращает нативный массив JavaScript (Array), а
метод {@link JW.AbstractArray#method-$map $map} возвращает массив jWidget (JW.Array). **Все методы, названия которых
начинаются со знака доллара $, возвращают коллекции jWidget. Все остальные методы возвращают нативные коллекции
JavaScript или другие значения.**

Оба правила введены для удобства. Каждый алгоритм имеет множество реализаций, на которые наложены строгие стандарты
именования методов. Используйте ту реализацию, которая удобнее в данной конкретной ситуации.

В нашем примере метод {@link JW.AbstractArray#method-$map $map} принимает функцию-коллбек в качестве первого аргумента,
которая превращает объект типа mt.data.Tweet в объект типа mt.TweetView:

        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
        }

Вторым аргументом метод принимает контекст вызова функции-коллбека (this). Правило здесь простое:
**всегда, когда вы передаете функцию в качестве аргумента функции, следующим аргументом передается контекст
вызова этой функции.**

В результате мы получаем JW.Array, содержащий объекты типа mt.TweetView, который мы возвращаем на выходе из
метода renderTweets. Тем самым мы просим фреймворк отрендерить дочерние компоненты внутрь элемента с jwid="tweets".

Далее, добавим CSS-файл.

**public/mt/tweetfeed/tweetfeed.css**

    .mt-tweet-feed-header {
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
      text-shadow: 0 1px 0 #fff;
    }
    .mt-tweet-feed {
      border: 1px solid rgba(0,0,0,0.45);
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }
    .mt-tweet-feed {
      background: #fff;
      width: 522px;
    }
    .mt-tweet-feed-header {
      font-size: 18px;
      padding: 10px;
    }
    .mt-tweet-feed-footer {
      border-top: 1px solid #e8e8e8;
      padding: 8px;
      text-align: center;
    }

Добавим новые файлы в index.html:

    <link rel="stylesheet" type="text/css" href="mt/tweetfeed/tweetfeed.css" />
    <script type="text/javascript" charset="utf-8" src="mt/tweetfeed/tweetfeed.js"></script>

Остается только подставить новые тестовые данные.

**public/boot.js**

    var data;
    var tweetFeed;
    
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
        tweetFeed = new mt.TweetFeed(data);
        tweetFeed.{@link JW.UI.Component#renderTo renderTo}("#container");
    });

Запустив приложение в браузере, мы увидим то, что от нас и требовалось.

Рассмотрим еще один способ добавления списка дочерних компонентов, без использования метода `render<ChildId>`.
Удалим метод renderTweets и перегрузим метод {@link JW.UI.Component#afterRender afterRender}:

        // override
        {@link JW.UI.Component#afterRender afterRender}: function() {
            this.{@link JW.Class#method-_super _super}();
            var tweetViews = this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this).{@link JW.AbstractCollection#ownItems ownItems}();
            this.{@link JW.UI.Component#addArray addArray}(tweetViews, "tweets");
        },

Этот код эквивалентен предыдущему, только список дочерних компонентов добавляется методом
{@link JW.UI.Component#addArray addArray}. Вторым аргументом этот метод принимает jwid элемента, внутрь которого
отрендерить массив компонентов, переданный первым аргументом. Если второй аргумент не передать, массив отрендерится
внутрь корневого элемента. Используйте тот вариант, который вам больше нравится.

Недостаток всего примера заключается в том, что массив твитов фиксирован. Мы не сможем добавлять и удалять твиты
динамически. Мы научимся этому в следующих примерах.
