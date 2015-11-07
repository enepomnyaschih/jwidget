# Часть 4. События

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt/1.4-4/](http://enepomnyaschih.github.io/mt/1.4-4/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-1.4-4](https://github.com/enepomnyaschih/mt/tree/mt-1.4-4) (ветка)

В этом примере мы научимся подписываться на события элементов jQuery в рамках фреймворка jWidget, а также
научимся создавать события модели, прослушивать их и выбрасывать.

Первая задача, которая перед нами стоит - активировать кнопки Like/Unlike и Retweet/Unretweet.

{@img buttons.png}

Что должно происходить при клике по кнопке Like?

1. Представление перехватывает событие click с помощью jQuery
1. Представление обращается к модели с помощью метода tweetData.setLike(value)
1. Модель проверяет, изменилось ли значение поля like. Если значение совпадает, выходит без изменений
1. Если значение like изменилось, модель его запоминает и выбрасывает событие likeChangeEvent
1. Представление перехватывает событие likeChangeEvent и обновляется

Заметим, что перед шагом 2 представление может обновиться самостоятельно, до вызова метода модели. Но это ни к чему,
если представление прослушивает событие likeChangeEvent, а прослушивать его оно обязано по архитектуре Model-View,
ведь кто знает, какому еще клиенту захочется менять значение свойства like в модели? Может быть, асинхронный
подгрузчик данных с сервера захочет выполнить это действие, а может быть для некоторых твитов будет автоматически
добавляться like при некотором действии пользователя? В любом случае, наличие события нас обезопасивает:
представление всегда в курсе событий и будет вовремя обновляться.

Еще одно замечание: в других Model-View (а если точнее, MVC) фреймворках наподобие ExtJS ответственность за
прослушку событий и их обработку берет на себя контроллер (Controller). jWidget не предоставляет возможностей
для реализации подобного рода контроллеров.

API для работы с событиями в jWidget максимально оптимизирован в плане производительности и реализован по
всем принципам ООП. Поэтому API для работы с событиями кардинально отличается в jWidget по сравнению с jQuery.
Событие в jWidget реализует класс [JW.Event](#!/guide/rujwevent). Есть еще один смежный класс:
подписка на событие JW.EventAttachment. Сейчас мы рассмотрим, как ими пользоваться.

Итак, начнем обработку клика по Like или Retweet. Пойдем по шагам, описанным выше. Сначала подпишемся на событие
клика с помощью jQuery в классе mt.TweetView:

**public/mt/tweetview/tweetview.js**

        renderLike: function(el) {
            el.toggleClass("active", this.tweetData.like).text(this.tweetData.like ? "Unlike" : "Like");
            el.click(this._onLikeClick);
        },
        
        renderRetweet: function(el) {
            el.toggleClass("active", this.tweetData.retweet).text(this.tweetData.retweet ? "Unretweet" : "Retweet");
            el.click(this._onRetweetClick);
        },
        
        _onLikeClick: function(event) {
            event.preventDefault();
            this.tweetData.setLike(!this.tweetData.like);
        },
        
        _onRetweetClick: function(event) {
            event.preventDefault();
            this.tweetData.setRetweet(!this.tweetData.retweet);
        },

Кому уже приходилось работать с классами в JavaScript, тот наверняка может сказать, что этот код работать не будет.
Связано это с тем, что у обработчика события не определен контекст вызова (this). Это особенность JavaScript,
с которой мы вынуждены смириться. Чтобы заставить этот код работать, закрепим контекст вызова этих функций
с помощью функции JW.inScope. По стандарту, это следует делать в конструкторе, до вызова конструктора базового класса:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        this._onLikeClick = JW.inScope(this._onLikeClick, this);
        this._onRetweetClick = JW.inScope(this._onRetweetClick, this);
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };

Другой способ - воспользоваться методом {@link jQuery#jwon jwon}:

        renderLike: function(el) {
            el.toggleClass("active", this.tweetData.like).text(this.tweetData.like ? "Unlike" : "Like");
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },

        renderRetweet: function(el) {
            el.toggleClass("active", this.tweetData.retweet).text(this.tweetData.retweet ? "Unretweet" : "Retweet");
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },

Второй способ более универсальный, давайте следовать ему.

Следующим шагом добавим методы setLike и setRetweet в модель. Для реализации методов необходимы события
likeChangeEvent и retweetChangeEvent, которые мы создадим и заагрегируем в конструкторе mt.data.Tweet:

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
        this.likeChangeEvent = this.{@link JW.Class#own own}(new JW.Event()); // JW.Event<boolean>
        this.retweetChangeEvent = this.{@link JW.Class#own own}(new JW.Event()); // JW.Event<boolean>
    };
    
    JW.extend(mt.data.Tweet, JW.Class, {
        setLike: function(value) {
            if (this.like === value) {
                return;
            }
            this.like = value;
            this.likeChangeEvent.{@link JW.Event#trigger trigger}(value);
        },
        
        setRetweet: function(value) {
            if (this.retweet === value) {
                return;
            }
            this.retweet = value;
            this.retweetChangeEvent.{@link JW.Event#trigger trigger}(value);
        }
    });
    
    mt.data.Tweet.createByJson = function(json) {
        return new mt.data.Tweet(JW.apply({}, json, {
            time: new Date().getTime() - json.timeAgo
        }));
    };

Событие выбрасывается методом {@link JW.Event#trigger trigger}, который принимает произвольный аргумент,
передаваемый в обработчики этого события, в данном случае - boolean.
Событие jWidget крайне простое: циклом перебираются и вызываются все обработчики, которые на него подписаны.
Нет никаких возможностей типа bubbling, preventDefault или stopPropagation. Если хотите наворотить что-то
подобное - напишите сами или найдите где-нибудь в другом месте. jWidget в этом плане очень скромен, зато быстр.

Следующим шагом мы должны подписаться на эти события и обновлять представление. Чтобы не дублировать код, вынесем
реализацию обновления элементов mt.TweetView в отдельные методы updateLike и updateRetweet:

**public/mt/tweetview/tweetview.js**

        renderLike: function(el) {
            this._updateLike();
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },
        
        renderRetweet: function(el) {
            this._updateRetweet();
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },
        
        _updateLike: function() {
            this.{@link JW.UI.Component#getElement getElement}("like").
                toggleClass("active", this.tweetData.like).
                text(this.tweetData.like ? "Unlike" : "Like");
        },
        
        _updateRetweet: function() {
            this.{@link JW.UI.Component#getElement getElement}("retweet").
                toggleClass("active", this.tweetData.retweet).
                text(this.tweetData.retweet ? "Unretweet" : "Retweet");
        },

Подпишемся на события likeChangeEvent и retweetChangeEvent. На выходе мы получим объекты подписки, которые
необходимо заагрегировать:

**public/mt/tweetview/tweetview.js**

    mt.TweetView = function(tweetData) {
        mt.TweetView.{@link JW.Class#static-property-_super _super}.call(this);
        this.tweetData = tweetData; // mt.data.Tweet
    };
    
    JW.extend(mt.TweetView, JW.UI.Component, {
        // ... какой-то код
        
        renderLike: function(el) {
            this._updateLike();
            this.{@link JW.Class#own own}(this.tweetData.likeChangeEvent.{@link JW.Event#bind bind}(this._updateLike, this));
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },
        
        renderRetweet: function(el) {
            this._updateRetweet();
            this.{@link JW.Class#own own}(this.tweetData.retweetChangeEvent.{@link JW.Event#bind bind}(this._updateRetweet, this));
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },
        
        // ...

Наш код должен работать! Попробуйте запустить его в браузере или откройте ссылку
[http://enepomnyaschih.github.io/mt/1.4-4/](http://enepomnyaschih.github.io/mt/1.4-4/)
и покликайте по кнопкам Like/Unlike и Retweet/Unretweet. Более того, вы можете открыть консоль браузера и
запустить такую команду:

    data.tweets.{@link JW.AbstractArray#get get}(0).setLike(true)

Ваше приложение послушно обновится. Возможно, на таком простом примере еще не ощущаются все преимущества, которые
вы получаете с архитектурой Model-View, но в более крупных приложениях эта тонна вспомогательного кода
по работе с событиями действительно окупает себя.

Еще в этом примере хотелось бы завершить обновление представления mt.TweetView. Мы не учли, что время создания
твита со временем возрастает:

{@img time.png}

Сейчас мы сделаем так, чтобы эта метка обновлялась по таймеру.

Менять модель не нужно, изменения затронут только представление mt.TweetView:

**public/mt/tweetview/tweetview.js**

        // ... код
        
        renderTime: function() {
            this._updateTime();
            this.{@link JW.Class#own own}(new JW.Interval(this._updateTime, this, 30000));
        },
        
        _updateTime: function() {
            var timeAgo = new Date().getTime() - this.tweetData.time;
            var text = this._getTimeString(timeAgo);
            this.{@link JW.UI.Component#getElement getElement}("time").text(text);
        },
        
        // ... код

Теперь время публикации твита будет обновляться каждые 30 секунд.
