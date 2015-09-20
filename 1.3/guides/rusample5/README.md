# Часть 5. Свойства

Демонстрация доступна по адресу
[http://enepomnyaschih.github.io/mt/1.3-5/](http://enepomnyaschih.github.io/mt/1.3-5/)

Исходный код [https://github.com/enepomnyaschih/mt/tree/mt-1.3-5](https://github.com/enepomnyaschih/mt/tree/mt-1.3-5) (Git branch)

Пришло время познакомиться с еще одним слоем jWidget: свойствами, которые предоставляются нам классом [JW.Property](#!/guide/rujwproperty).
Свойство - это любое значение, которое может оповещать клиенты о своем изменении. Таким образом, [JW.Property](#!/guide/rujwproperty) - это
класс с 2 методами: {@link JW.Property#get get}, {@link JW.Property#set set} - и событием
{@link JW.Property#changeEvent changeEvent}. Всякий раз, когда вы меняете значение свойства вызовом метода
{@link JW.Property#set set}, выбрасывается событие {@link JW.Property#changeEvent changeEvent}. Событие не
выбрасывается, если в результате вызова метода {@link JW.Property#set set} значение свойства не поменялось.

Итак, в нашем примере с Мини-Твиттером, мы можем упростить реализацию поведения Like/Unlike и Retweet/Unretweet
путем введения 2 булевых свойств: like и retweet.

Начнем с модели. Нам нужно заменить простые булевые поля свойствами, и удалить соответствующие события и методы
изменения их значений:

**public/mt/data/tweet.js**

    mt.data.Tweet = function(config) {
        mt.data.Tweet.{@link JW.Class#static-property-_super _super}.call(this);
        this.fullName = config.fullName; // string
        this.shortName = config.shortName; // string
        this.avatarUrl48 = config.avatarUrl48; // string
        this.contentHtml = config.contentHtml; // string
        this.time = config.time; // number
        this.like = this.{@link JW.Class#own own}(new JW.Property(config.like)); // JW.Property<boolean>
        this.retweet = this.{@link JW.Class#own own}(new JW.Property(config.retweet)); // JW.Property<boolean>
    };
    
    JW.extend(mt.data.Tweet, JW.Class);
    
    mt.data.Tweet.createByJson = function(json) {
        return new mt.data.Tweet(JW.apply({}, json, {
            time: new Date().getTime() - json.timeAgo
        }));
    };

Мы избавились от весомого куска кода. Давайте перейдем к представлению, и посмотрим, что можно сделать там.
Вместо того, чтобы прослушивать событие изменения свойства вручную, давайте воспользуемся специальными классами
маппера и апдейтера.

**Маппер** строит новое свойство на базе существующих. В нашем конкретном случае, мы планируем построить
строковые свойства, содержащие значения "Like/Unlike" и "Retweet/Unretweet". Маппер неявно создается
методами {@link JW.Property#$$mapValue $$mapValue} и {@link JW.Property#$$mapObject $$mapObject}.

**Апдейтер** прослушивает изменения свойства и обрабатывает их каким-то способом. В нашем случае, мы планируем
обновлять текст внутри кнопок и менять набор их CSS классов.

Время жизни маппера и апдейтера надо ограничить временем жизни компонента, поэтому не забудьте их заагрегировать.

**public/mt/tweetview/tweetview.js**

        renderLike: function(el) {
            var text = this.{@link JW.Class#own own}(this.tweetData.like.{@link JW.Property#$$mapValue $$mapValue}(function(like) {
                return like ? "Unlike" : "Like";
            }, this));
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
            this.{@link JW.Class#own own}(new JW.UI.ClassUpdater(el, "active", this.tweetData.like));
            el.{@link jQuery#jwon jwon}("click", this._onLikeClick, this);
        },
        
        renderRetweet: function(el) {
            var text = this.{@link JW.Class#own own}(this.tweetData.retweet.{@link JW.Property#$$mapValue $$mapValue}(function(retweet) {
                return retweet ? "Unretweet" : "Retweet";
            }, this));
            this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
            this.{@link JW.Class#own own}(new JW.UI.ClassUpdater(el, "active", this.tweetData.retweet));
            el.{@link jQuery#jwon jwon}("click", this._onRetweetClick, this);
        },
        
        _onLikeClick: function(event) {
            event.preventDefault();
            this.tweetData.like.{@link JW.Property#set set}(!this.tweetData.like.{@link JW.Property#get get}());
        },
        
        _onRetweetClick: function(event) {
            event.preventDefault();
            this.tweetData.retweet.{@link JW.Property#set set}(!this.tweetData.retweet.{@link JW.Property#get get}());
        },

И теперь мы можем удалить методы `_updateLike` и `_updateRetweet` - они нам больше не нужны.

С точки зрения синтаксиса, свойства, функторы и апдейтеры очень понятны и просты. Они позволяют вам сделать код
более коротким и читаемым. Посмотрите на документацию [JW.Property](#!/guide/rujwproperty) для полного списка возможностей.
