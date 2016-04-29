# Часть 6. Синхронизаторы коллекций

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt/1.4-6/](http://enepomnyaschih.github.io/mt/1.4-6/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-1.4-6](https://github.com/enepomnyaschih/mt/tree/mt-1.4-6) (ветка)

Этот пример является продолжением предыдущей части.

Теперь переходим к самому интересному и самому важному, ради чего только одного стоит использовать фреймворк jWidget -
к синхронизаторам коллекций.

В данном примере мы добавим возможность постить новые твиты и удалять существующие.

Для начала проведем небольшой рефакторинг. Сейчас у нас есть следующий код в классе mt.TweetFeed:

**public/mt/tweetfeed/tweetfeed.js**

        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$map $map}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this)).{@link JW.AbstractCollection#ownItems ownItems}();
        }

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

        renderTweets: function() {
            return this.{@link JW.Class#own own}(this.data.tweets.{@link JW.AbstractArray#$$mapObjects $$mapObjects}(function(tweetData) {
                return new mt.TweetView(tweetData);
            }, this));
        }

Метод {@link JW.AbstractArray#$$mapObjects $$mapObjects} неявно создает внутри себя синхронизатор - конвертер элементов
(JW.AbstractCollection.Mapper). Поэтому теперь все изменения в коллекции данных будут корректно отслеживаться, и
представление будет обновляться.

**Замечание:** Метод {@link JW.AbstractArray#$$mapObjects $$mapObjects} запускает деструктор дочернего элемента при
его удалении из коллекции. Этого хватает в большинстве случаев. Если вас данное поведение не устраивает, рассмотрите
методы {@link JW.AbstractArray#$$mapValues $$mapValues} и {@link JW.AbstractArray#createMapper createMapper}.

Поскольку наш массив this.data.tweets пока простой (JW.Array), этот код эквивалентен предыдущему - запустите
приложение в браузере, и вы не заметите разницы. Зато теперь мы получили возможность заменить реализацию массива
в mt.Data на JW.ObservableArray, и, не меняя кода представления, синхронизировать его с моделью:

**public/mt/data/data.js**

    mt.Data = function() {
        mt.Data.{@link JW.Class#static-property-_super _super}.call(this);
        this.profile = null; // mt.data.Profile
        this.tweets = new JW.ObservableArray(); // JW.AbstractArray<mt.data.Tweet>
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

**public/mt/profilebox/profilebox.js**

        renderComposeForm: function(el) {
            el.{@link jQuery#jwon jwon}("submit", this._onComposeSubmit, this);
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

И запустим наше приложение. После ввода текста и нажатия кнопки "Tweet" мы увидим новый твит в начале ленты твитов:

{@img result-2.png}

{@img result-3.png}

Наша следующая задача - активировать кнопки Remove у твитов, чтобы корректно удалять их из ленты. Подпишемся на клик
по кнопке. Для удаления твита нам понадобится доступ к объекту mt.Data:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(data, tweetData) {
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.data = data; // mt.Data
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        renderRemove: function(el) {
            el.{@link jQuery#jwon jwon}("click", this._onRemoveClick, this);
        },
        
        // ...
        
        _onRemoveClick: function(event) {
            event.preventDefault();
            this.data.tweets.{@link JW.AbstractArray#removeItem removeItem}(this.tweetData);
        },
        
        // ...
    });

Обновите аргументы конструирования объекта mt.TweetView в mt.TweetFeed:

**public/mt/tweetfeed/tweetfeed.js**

                return new mt.TweetView(this.data, tweetData);

Запустите приложение и попробуйте кликнуть по кнопке Remove у твита:

{@img result-4.png}

В данном примере мы рассмотрели типичный сценарий использования конвертера элементов [JW.AbstractCollection.Mapper](#!/guide/rujwabstractcollectionmapper),
но не стоит на этом останавливаться. Познакомьтесь с другими синхронизаторами самостоятельно, и, я уверен, вы
найдете разумное применение для большинства из них. Ищите их в описании класса [JW.AbstractCollection](#!/guide/rujwabstractcollection).

Замечу, что использование синхронизаторов не ограничивается представлением. В моей практике, синхронизаторы чаще
всего, наоборот, используются в модели. Так, индексатор ускорит доступ к элементу массива по ключу. А сортировщик,
например, сможет отсортировать множество твитов по дате публикации, и нам больше не надо будет думать, в какое место
ленты твитов вставить очередной твит. Сценариев использования множество, рекомендую вам опробовать их на практике.

В следующей части мы улучшим инфраструктуру нашего проекта: вынесем HTML-шаблоны в отдельные HTML-файлы с
помощью [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru) и научимся использовать CSS-препроцессор
[Stylus](http://learnboost.github.io/stylus/), чтобы сделать верстку более удобной и приятной.
