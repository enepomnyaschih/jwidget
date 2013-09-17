# Часть 5. Синхронизаторы коллекций

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt5/public/](http://enepomnyaschih.github.io/mt5/public/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-5](https://github.com/enepomnyaschih/mt/tree/mt-5) (ветка)

Этот пример является продолжением предыдущей части.

Теперь переходим к самому интересному и самому важному, ради чего только одного стоит использовать фреймворк jWidget -
к синхронизаторам коллекций.

В данном примере мы добавим возможность постить новые твиты и удалять существующие.

Для начала проведем небольшой рефакторинг. Сейчас у нас есть следующий код в классе mt.TweetFeed:

        renderTweets: function() {
            this.tweetViews = this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this);
            return this.tweetViews;
        },

Напомню, что этот код конвертирует массив данных mt.data.Tweet в массив представлений mt.TweetView и
рендерит их внутрь элемента с jwid="tweets".

Надо понимать, что такой код не позволит нам легко наладить постоянную синхронизацию массива представлений с
массивом данных: конвертирование данных в представления осуществляется только один раз, в момент рендеринга
ленты твитов. Можно, конечно, вручную подписаться на все события JW.ObservableArray и вручную их обрабатывать
(в других фреймворках вам так и пришлось бы поступить), но jWidget предлагает более легкое решение -
воспользоваться синхронизатором.

Более того, философия jWidget гласит, что
**не должно быть разницы в подходах между простой и оповещающей коллекцией. Несмотря на то, что для
корректного преобразования простых коллекций друг в друга достаточно просто запустить некоторый алгоритм
(здесь: {@link JW.AbstractArray#$map $map}), все равно рекомендуется вместо этого создать синхронизатор.**

Итак, перейдем к делу. Заменим код mt.TweetFeed следующим.

**public/mt/tweetfeed/tweetfeed.js**

    mt.TweetFeed = function(data) {
        mt.TweetFeed.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
        this._mapper = null;
    };
    
    JW.extend(mt.TweetFeed, JW.UI.Component, {
        /*
        mt.Data data;
        JW.AbstractArray.Mapper<mt.data.Tweet, mt.TweetView> _mapper;
        */
        
        renderTweets: function() {
            this._mapper = this.data.tweets.{@link JW.AbstractArray#createMapper createMapper}({
                createItem: function(tweetData) {
                    return new mt.TweetView(tweetData);
                },
                destroyItem: JW.destroy,
                scope: this
            });
            return this._mapper.{@link JW.AbstractArray.Mapper#property-target target};
        },
        
        // override
        {@link JW.UI.Component#destroyComponent destroyComponent}: function() {
            this._mapper.{@link JW.Class#destroy destroy}();
            this.{@link JW.Class#method-_super _super}();
        }
    });

Поскольку наш массив this.data.tweets пока простой (JW.Array), этот код эквивалентен предыдущему - запустите
приложение в браузере, и вы не заметите разницы. Зато теперь мы получили возможность заменить реализацию массива
в mt.Data на JW.ObservableArray, и, не меняя кода представления, синхронизировать его с моделью:

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.profile = null;
        this.tweets = new JW.ObservableArray();
    };

Попробуйте открыть приложение в браузере и выполнить следующую команду в консоли:

    data.tweets.{@link JW.AbstractArray#add add}(new mt.data.Tweet({
        fullName: "Road Runner",
        shortName: "roadrunner",
        avatarUrl48: "backend/avatar-48.png",
        contentHtml: "This is a new tweet!",
        time: new Date().getTime(),
        like: false,
        retweet: false
    }));

Вы увидите, как в конце ленты твитов появится новый твит:

{@img result-1.png}

Заметьте, что своей командой мы никак не затронули
представление: мы просто добавили объект в массив данных, но представление все равно корректно обновилось.

Остается только добавить код, который будет добавлять новый объект в data.tweets по сабмиту формы
Compose tweet. Подпишемся на событие jQuery.submit в mt.ProfileBox:

    mt.ProfileBox = function(data) {
        this._onComposeSubmit = JW.inScope(this._onComposeSubmit, this);
        mt.ProfileBox.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
    };
    
    JW.extend(mt.ProfileBox, JW.UI.Component, {
        // ... код
        
        renderComposeForm: function(el) {
            el.submit(this._onComposeSubmit);
        },
        
        _onComposeSubmit: function(event) {
            event.preventDefault();
            var text = JW.String.trim(this.{@link JW.UI.Component#getElement getElement}("compose-input").val());
            if (!text) {
                return;
            }
            this.data.tweets.{@link JW.AbstractArray#add add}(new mt.data.Tweet({
                fullName: this.data.profile.fullName,
                shortName: this.data.profile.shortName,
                avatarUrl48: this.data.profile.avatarUrl48,
                contentHtml: text,
                time: new Date().getTime(),
                like: false,
                retweet: false
            }), 0);
            this.{@link JW.UI.Component#getElement getElement}("compose-input").val("")
        }
    });

И запустим наше приложение. После ввода текста и нажатия кнопки "Tweet" мы увидим новый твит в начале ленты твитов:

{@img result-2.png}

{@img result-3.png}

Наша следующая задача - активировать кнопки Remove у твитов, чтобы корректно удалять их из ленты. Откроем
класс mt.TweetView и подпишемся на клик по кнопке:

    mt.TweetView = function(tweetData) {
        // ...
        this._onRemoveClick = JW.inScope(this._onRemoveClick, this);
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        // ...
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        // ...
        
        renderRemove: function(el) {
            el.click(this._onRemoveClick);
        },
        
        // ...
        
        _onRemoveClick: function(event) {
            event.preventDefault();
        },
        
        // ...
    });

Для удаления твита нам понадобится доступ к объекту mt.Data. Предоставим его:

    mt.TweetView = function(data, tweetData) {
        // ...
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data;
        this.tweetData = tweetData;
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        /*
        mt.Data data;
        ...
        */
        
        // ...
    });

Обновим код создания объектов mt.TweetView в mt.TweetFeed:

                createItem: function(tweetData) {
                    return new mt.TweetView(this.data, tweetData);
                },

И завершим реализацию метода _onRemoveClick класса mt.TweetView:

        _onRemoveClick: function(event) {
            event.preventDefault();
            this.data.tweets.{@link JW.AbstractArray#removeItem removeItem}(this.tweetData);
        },

Запустите приложение и попробуйте кликнуть по кнопке Remove у твита:

{@img result-4.png}

В данном примере мы рассмотрели типичный сценарий использования конвертера элементов JW.AbstractCollection.Mapper,
но не стоит на этом останавливаться. Познакомьтесь с другими синхронизаторами самостоятельно, и, я уверен, вы
найдете разумное применение для большинства из них. Ищите их в описании класса JW.AbstractCollection.

Замечу, что использование синхронизаторов не ограничивается представлением. В моей практике, синхронизаторы чаще
всего, наоборот, используются в модели. Так, индексатор ускорит доступ к элементу массива по ключу. А сортировщик,
например, сможет отсортировать множество твитов по дате публикации, и нам больше не надо будет думать, в какое место
ленты твитов вставить очередной твит. Сценариев использования множество, рекомендую вам опробовать их на практике.

В следующей части мы улучшим инфраструктуру нашего проекта: вынесем HTML-шаблоны в отдельные HTML-файлы с
помощью [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru) и научимся использовать CSS-препроцессор
[Stylus](http://learnboost.github.io/stylus/), чтобы сделать верстку более удобной и приятной.
